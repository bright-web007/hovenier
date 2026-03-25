const { getBusinessConfig } = require('./lib/business-config.ts');

console.log('🔍 Checking service-specific address configurations...\n');

const services = ['groendak', 'stratenmaker', 'tuinonderhoud', 'tuinontwerp', 'tuin-aanleggen'];

services.forEach(serviceType => {
  console.log(`📋 Service: ${serviceType}`);
  try {
    const config = getBusinessConfig(serviceType);
    const hasAddress = config.address && 
                      config.address.addressLocality && 
                      config.address.postalCode && 
                      config.address.addressRegion && 
                      config.address.addressCountry;
                      
    console.log(`✅ Has complete address: ${hasAddress}`);
    if (hasAddress) {
      console.log(`   - ${config.address.addressLocality}, ${config.address.postalCode}`);
      console.log(`   - ${config.address.addressRegion}, ${config.address.addressCountry}`);
    } else {
      console.log('❌ Missing address fields:');
      console.log('   - addressLocality:', config.address?.addressLocality || 'MISSING');
      console.log('   - postalCode:', config.address?.postalCode || 'MISSING');
      console.log('   - addressRegion:', config.address?.addressRegion || 'MISSING');
      console.log('   - addressCountry:', config.address?.addressCountry || 'MISSING');
    }
    console.log('');
  } catch (error) {
    console.log(`❌ ERROR loading config: ${error.message}\n`);
  }
});

console.log('🔍 Testing schema generation...');
// Test LocalBusinessSchema generation
const testConfig = getBusinessConfig('groendak');
const testSchema = {
  "@type": "LocalBusiness",
  address: {
    "@type": "PostalAddress",
    addressLocality: testConfig.address.addressLocality,
    postalCode: testConfig.address.postalCode,
    addressRegion: testConfig.address.addressRegion,
    addressCountry: testConfig.address.addressCountry
  }
};

console.log('Sample LocalBusiness address schema:');
console.log(JSON.stringify(testSchema, null, 2));