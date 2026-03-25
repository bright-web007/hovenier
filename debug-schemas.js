const http = require('http');

async function fetchPageSchemas(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          // Extract all JSON-LD scripts
          const jsonLdRegex = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
          const matches = [...data.matchAll(jsonLdRegex)];
          
          console.log(`\n🔍 Testing: ${path}`);
          console.log(`📋 Found ${matches.length} structured data schemas\n`);
          
          matches.forEach((match, index) => {
            try {
              const jsonData = JSON.parse(match[1]);
              console.log(`Schema ${index + 1}: ${jsonData['@type']}`);
              console.log(JSON.stringify(jsonData, null, 2));
              console.log('---'.repeat(20));
            } catch (parseError) {
              console.log(`❌ Schema ${index + 1}: Invalid JSON`);
              console.log(`Raw content: ${match[1].substring(0, 200)}...`);
              console.log('---'.repeat(20));
            }
          });
          
          resolve(matches);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function debugSchemas() {
  console.log('🔍 DEBUGGING STRUCTURED DATA SCHEMAS');
  console.log('=====================================');

  // Test the problematic pages from SEMrush
  const testPages = [
    '/diensten/groendak',
    '/diensten/stratenmaker', 
    '/diensten/tuinonderhoud',
    '/diensten/tuinontwerp',
    '/diensten/tuin-aanleggen',
    '/kosten'
  ];

  for (const page of testPages) {
    try {
      await fetchPageSchemas(page);
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
    } catch (error) {
      console.log(`❌ Error testing ${page}: ${error.message}`);
    }
  }
}

// Run the debug
debugSchemas().catch(console.error);