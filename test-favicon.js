const http = require('http');

async function testFavicon() {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('🔍 FAVICON CONFIGURATION TEST');
        console.log('==============================');
        
        // Look for favicon links in the HTML head
        const faviconLinks = [
          ...data.matchAll(/<link[^>]+rel=["`'](?:icon|shortcut icon|apple-touch-icon)["`'][^>]*>/gi)
        ];
        
        console.log(`📋 Found ${faviconLinks.length} favicon-related links:\n`);
        
        faviconLinks.forEach((match, index) => {
          console.log(`Link ${index + 1}: ${match[0]}`);
        });
        
        // Check for specific assets
        if (data.includes('logo-favicon.svg')) {
          console.log('\n✅ Custom favicon SVG found in HTML');
        } else {
          console.log('\n❌ Custom favicon SVG not found in HTML');
        }
        
        if (data.includes('favicon.ico')) {
          console.log('⚠️  Old favicon.ico still referenced');
        } else {
          console.log('✅ Old favicon.ico not referenced');
        }
        
        resolve();
      });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

testFavicon().catch(console.error);