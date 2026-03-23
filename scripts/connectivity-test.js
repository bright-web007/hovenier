/**
 * Simple Prometheus connectivity test
 * This will show you what the actual integration process looks like
 */

const PROMETHEUS_URL = 'https://prometheus.hivedeck.com/graphql';
const MERCURY_URL = 'https://mercury.hivedeck.com/graphql';

// Test basic connectivity (without credentials for now)
async function testConnectivity() {
  console.log('🔍 Testing Prometheus Platform Connectivity');
  console.log('==========================================\n');

  try {
    console.log('1. Testing Prometheus GraphQL endpoint...');
    const prometheusResponse = await fetch(PROMETHEUS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: '{ __typename }'
      })
    });
    
    console.log(`   Status: ${prometheusResponse.status}`);
    if (prometheusResponse.status === 401) {
      console.log('   ✅ Endpoint is live (needs authentication as expected)');
    } else {
      console.log(`   ⚠️  Unexpected response: ${prometheusResponse.statusText}`);
    }

    console.log('\n2. Testing Mercury authentication endpoint...');
    const mercuryResponse = await fetch(MERCURY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: '{ __typename }'
      })
    });
    
    console.log(`   Status: ${mercuryResponse.status}`);
    if (mercuryResponse.status === 401 || mercuryResponse.status === 400) {
      console.log('   ✅ Endpoint is live (needs proper mutation as expected)');
    } else {
      console.log(`   ⚠️  Unexpected response: ${mercuryResponse.statusText}`);
    }

    console.log('\n🔑 Next Step: Run with your credentials');
    console.log('   Your .env.local has the needed NEXUS_PROJECT_API_* values');
    console.log('   Run the investigation script directly to see the schema');

  } catch (error) {
    console.error('❌ Connectivity test failed:', error.message);
  }
}

testConnectivity();