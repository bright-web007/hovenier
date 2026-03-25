const http = require('http');

async function testServiceSchema(path) {
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
        jsonLdMatches.forEach((match, index) => {
          try {
            const jsonData = JSON.parse(match[1]);
            if (jsonData['@type'] === 'Service') {
              console.log(`\n📋 Service Schema ${index + 1}:`);
              console.log(`Name: ${jsonData.name}`);
              console.log(`Provider Type: ${jsonData.provider?.['@type']}`);
              console.log(`Provider Name: ${jsonData.provider?.name}`);
              console.log(`Has Provider Address: ${!!jsonData.provider?.address}`);
              
              if (jsonData.provider?.address) {
                console.log('✅ Address Present:', JSON.stringify(jsonData.provider.address, null, 2));
              } else {
                console.log('❌ Missing Address in Service Provider');
                console.log('Full Provider:', JSON.stringify(jsonData.provider, null, 2));
              }
            }
          } catch (e) {
            console.log(`❌ Invalid JSON in schema ${index}`);
          }
        });
        resolve();
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

// Test the tuinonderhoud page that had the issue
testServiceSchema('/diensten/tuinonderhoud').catch(console.error);