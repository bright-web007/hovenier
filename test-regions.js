// Simple test to check region page titles and content  
const http = require('http');

const testUrl = (url) => {
  return new Promise((resolve) => {
    const request = http.request(url, { timeout: 8000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/);
        const title = titleMatch ? titleMatch[1] : 'No title';
        const isNotFound = title.includes('niet gevonden') || data.includes('niet gevonden');
        
        resolve({
          url: url,
          status: res.statusCode,
          title: title,
          isNotFound: isNotFound
        });
      });
    });
    
    request.on('error', (error) => {
      resolve({
        url: url,
        status: 'ERROR',
        title: error.message,
        isNotFound: false
      });
    });
    
    request.end();
  });
};

async function runTests() {
  console.log('Testing both servers...\n');
  
  const testUrls = [
    'http://localhost:3000/regio/noordwest-friesland',
    'http://localhost:3000/regio/leeuwarden'
  ];
  
  for (const url of testUrls) {
    const result = await testUrl(url);
    console.log(`${result.url}`);
    console.log(`  Status: ${result.status}`);
    console.log(`  Title: "${result.title}"`);
    console.log(`  Shows 404: ${result.isNotFound}`);
    console.log('');
  }
}

runTests();