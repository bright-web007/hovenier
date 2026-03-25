// Quick test script for robots.txt accessibility
const https = require('https');
const http = require('http');

async function testRobotsTxt(url) {
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

async function runTests() {
  console.log('🤖 Testing robots.txt accessibility...\n');
  
  const testUrls = [
    'http://localhost:3000/robots.txt',
    'http://localhost:3002/robots.txt'
  ];
  
  for (const url of testUrls) {
    console.log(`Testing: ${url}`);
    try {
      const result = await testRobotsTxt(url);
      
      console.log(`✅ Status: ${result.statusCode}`);
      console.log(`✅ Content-Type: ${result.headers['content-type'] || 'Not specified'}`);
      console.log(`✅ Content-Length: ${result.contentLength} bytes`);
      
      // Check if content starts correctly
      const lines = result.content.split('\n').slice(0, 5);
      console.log('✅ Content preview:', lines.map(line => `  ${line}`).join('\n'));
      
      // Validate key elements
      const hasUserAgent = result.content.includes('User-agent:');
      const hasAIcrawlers = result.content.includes('ChatGPT-User');
      const hasSitemap = result.content.includes('Sitemap:');
      
      console.log(`✅ Has User-agent directives: ${hasUserAgent}`);
      console.log(`✅ Has AI crawler allowances: ${hasAIcrawlers}`);  
      console.log(`✅ Has sitemap reference: ${hasSitemap}`);
      
      if (result.statusCode === 200 && hasUserAgent && hasAIcrawlers && hasSitemap) {
        console.log('🎉 robots.txt is working correctly!\n');
        return true;
      }
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}\n`);
    }
  }
  
  return false;
}

runTests().then(success => {
  if (!success) {
    console.log('⚠️  Could not connect to development server. Make sure Next.js is running.');
  }
  process.exit(success ? 0 : 1);
});