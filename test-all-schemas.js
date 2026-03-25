const http = require('http');

async function testAllSchemas(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET'
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const jsonLdMatches = [...data.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
        
        console.log(`🔍 Testing: ${path}`);
        console.log(`📋 Found ${jsonLdMatches.length} structured data schemas\n`);
        
        jsonLdMatches.forEach((match, index) => {
          try {
            const jsonData = JSON.parse(match[1]);
            console.log(`Schema ${index + 1}: ${jsonData['@type']}`);
            console.log(`Name: ${jsonData.name || "N/A"}`);
            
            if (jsonData['@type'] === 'Service') {
              console.log(`🔍 SERVICE SCHEMA DETAILS:`);
              console.log(`Provider Type: ${jsonData.provider?.['@type']}`);
              console.log(`Provider Name: ${jsonData.provider?.name}`);
              console.log(`Provider URL: ${jsonData.provider?.url}`);
              console.log(`Has Address: ${!!jsonData.provider?.address}`);
              if (!jsonData.provider?.address) {
                console.log('❌ ISSUE: Missing address field in Service provider');
              }
            }
            console.log('---'.repeat(20));
          } catch (e) {
            console.log(`❌ Invalid JSON in schema ${index + 1}`);
            console.log('---'.repeat(20));
          }
        });
        resolve();
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

testAllSchemas('/diensten/tuinonderhoud').catch(console.error);