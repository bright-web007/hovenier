// Comprehensive schema validation for all pages
const https = require('https');
const http = require('http');

// Test configuration
const BASE_URLS = [
  'http://localhost:3000',
  'http://localhost:3002'
];

const PAGES_TO_TEST = [
  // Main service directory
  { path: '/diensten', type: 'ServiceSchema', lang: 'nl' },
  { path: '/en/diensten', type: 'ServiceSchema', lang: 'en' },
  
  // Individual service pages  
  { path: '/diensten/groendak', type: 'LocalBusiness', lang: 'nl' },
  { path: '/en/diensten/groendak', type: 'LocalBusiness', lang: 'en' },
  { path: '/diensten/stratenmaker', type: 'LocalBusiness', lang: 'nl' },
  { path: '/en/diensten/stratenmaker', type: 'LocalBusiness', lang: 'en' },
  { path: '/diensten/tuinonderhoud', type: 'LocalBusiness', lang: 'nl' },
  { path: '/en/diensten/tuinonderhoud', type: 'LocalBusiness', lang: 'en' },
  { path: '/diensten/tuinontwerp', type: 'LocalBusiness', lang: 'nl' },
  { path: '/en/diensten/tuinontwerp', type: 'LocalBusiness', lang: 'en' },
  { path: '/diensten/tuin-aanleggen', type: 'LocalBusiness', lang: 'nl' },
  { path: '/en/diensten/tuin-aanleggen', type: 'LocalBusiness', lang: 'en' },
  
  // Cost pages
  { path: '/kosten', type: 'ServiceSchema', lang: 'nl' },
  { path: '/en/kosten', type: 'ServiceSchema', lang: 'en' },
];

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const request = protocol.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          content: data
        });
      });
    });
    
    request.on('error', reject);
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

function extractStructuredData(html) {
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gs;
  const matches = [];
  let match;
  
  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const jsonData = JSON.parse(match[1].trim());
      matches.push(jsonData);
    } catch (error) {
      console.warn('Failed to parse JSON-LD:', error.message);
    }
  }
  
  return matches;
}

function validateAddressFields(schema) {
  const issues = [];
  
  if (schema['@type'] === 'LocalBusiness') {
    if (!schema.address) {
      issues.push('Missing address object');
    } else {
      if (!schema.address['@type'] || schema.address['@type'] !== 'PostalAddress') {
        issues.push('Address missing @type or not PostalAddress');
      }
      if (!schema.address.addressLocality) {
        issues.push('Missing addressLocality');
      }
      if (!schema.address.postalCode) {
        issues.push('Missing postalCode');
      }
      if (!schema.address.addressRegion) {
        issues.push('Missing addressRegion');
      }
      if (!schema.address.addressCountry) {
        issues.push('Missing addressCountry');
      }
    }
  } else if (schema['@type'] === 'Service' && schema.provider) {
    if (schema.provider['@type'] === 'LocalBusiness') {
      if (!schema.provider.address) {
        issues.push('Service provider missing address object');
      } else {
        if (!schema.provider.address['@type'] || schema.provider.address['@type'] !== 'PostalAddress') {
          issues.push('Provider address missing @type or not PostalAddress');
        }
        if (!schema.provider.address.addressLocality) {
          issues.push('Provider missing addressLocality');
        }
        if (!schema.provider.address.postalCode) {
          issues.push('Provider missing postalCode');
        }
        if (!schema.provider.address.addressRegion) {
          issues.push('Provider missing addressRegion');
        }
        if (!schema.provider.address.addressCountry) {
          issues.push('Provider missing addressCountry');
        }
      }
    }
  }
  
  return issues;
}

function validateSchemaStructure(schemas, expectedType) {
  const issues = [];
  let relevantSchema = null;
  
  // Find the schema we're looking for
  if (expectedType === 'LocalBusiness') {
    relevantSchema = schemas.find(s => s['@type'] === 'LocalBusiness');
  } else if (expectedType === 'ServiceSchema') {
    relevantSchema = schemas.find(s => s['@type'] === 'Service' || s['@type'] === 'LocalBusiness');
  }
  
  if (!relevantSchema) {
    issues.push(`No ${expectedType} schema found`);
    return { issues, schema: null };
  }
  
  // Validate address fields
  const addressIssues = validateAddressFields(relevantSchema);
  issues.push(...addressIssues);
  
  return { issues, schema: relevantSchema };
}

async function testPage(baseUrl, page) {
  const url = `${baseUrl}${page.path}`;
  console.log(`\n🔍 Testing: ${page.path} (${page.lang})`);
  
  try {
    const response = await fetchPage(url);
    
    if (response.statusCode !== 200) {
      console.log(`❌ HTTP ${response.statusCode}`);
      return { success: false, issues: [`HTTP ${response.statusCode}`] };
    }
    
    const schemas = extractStructuredData(response.content);
    console.log(`   📋 Found ${schemas.length} structured data schemas`);
    
    if (schemas.length === 0) {
      console.log(`❌ No structured data found`);
      return { success: false, issues: ['No structured data found'] };
    }
    
    const validation = validateSchemaStructure(schemas, page.type);
    
    if (validation.issues.length === 0) {
      console.log(`✅ Valid schema with complete address`);
      if (validation.schema) {
        const addr = validation.schema.address || validation.schema.provider?.address;
        if (addr) {
          console.log(`   📍 ${addr.addressLocality}, ${addr.postalCode}, ${addr.addressRegion}, ${addr.addressCountry}`);
        }
      }
      return { success: true, issues: [] };
    } else {
      console.log(`❌ Validation issues:`);
      validation.issues.forEach(issue => console.log(`   - ${issue}`));
      return { success: false, issues: validation.issues };
    }
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return { success: false, issues: [error.message] };
  }
}

async function runValidation() {
  console.log('🔍 COMPREHENSIVE SCHEMA VALIDATION');
  console.log('=====================================\n');
  
  let testableBaseUrl = null;
  
  // Find a working base URL
  for (const baseUrl of BASE_URLS) {
    console.log(`🔌 Testing connection to ${baseUrl}...`);
    try {
      const response = await fetchPage(baseUrl);
      if (response.statusCode === 200) {
        console.log(`✅ Connected to ${baseUrl}`);
        testableBaseUrl = baseUrl;
        break;
      }
    } catch (error) {
      console.log(`❌ Failed to connect to ${baseUrl}: ${error.message}`);
    }
  }
  
  if (!testableBaseUrl) {
    console.log('\n❌ No development server available. Please run `npm run dev` first.');
    return;
  }
  
  console.log(`\n📋 Testing ${PAGES_TO_TEST.length} pages...\n`);
  
  const results = {
    passed: 0,
    failed: 0,
    issues: []
  };
  
  for (const page of PAGES_TO_TEST) {
    const result = await testPage(testableBaseUrl, page);
    
    if (result.success) {
      results.passed++;
    } else {
      results.failed++;
      results.issues.push({
        page: page.path,
        lang: page.lang,
        type: page.type,
        issues: result.issues
      });
    }
  }
  
  console.log('\n📊 VALIDATION SUMMARY');
  console.log('====================');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📄 Total: ${PAGES_TO_TEST.length}`);
  
  if (results.failed > 0) {
    console.log('\n🔴 ISSUES FOUND:');
    results.issues.forEach(issue => {
      console.log(`\n❌ ${issue.page} (${issue.type}, ${issue.lang}):`);
      issue.issues.forEach(i => console.log(`   - ${i}`));
    });
    console.log('\n⚠️  These issues may cause SEMrush structured data validation errors.');
  } else {
    console.log('\n🎉 All pages passed validation!');
    console.log('✅ All LocalBusiness and Service schemas have complete address fields.');
    console.log('✅ This should resolve SEMrush structured data validation errors.');
  }
  
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run the validation
runValidation().catch(error => {
  console.error('❌ Validation script failed:', error);
  process.exit(1);
});