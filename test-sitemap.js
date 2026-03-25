// Quick sitemap test script
const https = require('https');
const http = require('http');

async function fetchSitemap(url) {
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
          headers: response.headers,
          content: data,
          contentLength: data.length
        });
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    request.setTimeout(5000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testSitemap() {
  console.log('🗺️  Testing sitemap URL structure...\n');
  
  const testUrls = [
    'http://localhost:3000/sitemap.xml',
    'http://localhost:3002/sitemap.xml'
  ];
  
  for (const url of testUrls) {
    console.log(`Testing: ${url}`);
    try {
      const result = await fetchSitemap(url);
      
      console.log(`✅ Status: ${result.statusCode}`);
      console.log(`✅ Content-Type: ${result.headers['content-type'] || 'Not specified'}`);
      console.log(`✅ Content-Length: ${result.contentLength} bytes`);
      
      // Extract some example URLs from the sitemap
      const urlMatches = result.content.match(/<loc>(.*?)<\/loc>/g);
      if (urlMatches) {
        console.log('✅ Sample sitemap URLs:');
        const sampleUrls = urlMatches.slice(0, 8).map(match => 
          match.replace('<loc>', '').replace('</loc>', '').trim()
        );
        
        sampleUrls.forEach(url => {
          const isDutch = !url.includes('/en/');
          const hasNlPrefix = url.includes('/nl/');
          const status = isDutch && !hasNlPrefix ? '✅ CORRECT' : 
                         !isDutch && url.includes('/en/') ? '✅ CORRECT' : 
                         '❌ WRONG';
          console.log(`  ${status}: ${url}`);
        });
        
        // Count URL patterns
        const allUrls = urlMatches.map(match => 
          match.replace('<loc>', '').replace('</loc>', '').trim()
        );
        
        const dutchUrls = allUrls.filter(url => !url.includes('/en/') && !url.includes('/nl/'));
        const englishUrls = allUrls.filter(url => url.includes('/en/'));
        const wrongNlUrls = allUrls.filter(url => url.includes('/nl/'));
        
        console.log(`\n📊 URL Analysis:`);
        console.log(`  ✅ Dutch URLs (no prefix): ${dutchUrls.length}`);
        console.log(`  ✅ English URLs (/en/): ${englishUrls.length}`);
        console.log(`  ${wrongNlUrls.length > 0 ? '❌' : '✅'} Wrong /nl/ URLs: ${wrongNlUrls.length}`);
        
        if (wrongNlUrls.length > 0) {
          console.log('  Wrong URLs found:', wrongNlUrls.slice(0, 3));
        }
      }
      
      return true;
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}\n`);
    }
  }
  
  return false;
}

testSitemap().then(success => {
  if (!success) {
    console.log('⚠️  Could not connect to development server.');
  }
  process.exit(success ? 0 : 1);
});