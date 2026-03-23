#!/usr/bin/env tsx

/**
 * Quick Prometheus Test Script
 * 
 * Run with: npx tsx scripts/test-prometheus.js
 */

async function testPrometheusIntegration() {
  console.log('🔍 Testing Prometheus Integration');
  console.log('=================================\n');

  // Check environment variables
  const PROMETHEUS_URL = process.env.PROMETHEUS_GRAPHQL_URL;
  const MERCURY_URL = process.env.MERCURY_GRAPHQL_URL;
  const APP_ID = process.env.NEXUS_PROJECT_API_KEY;
  const APP_SECRET = process.env.NEXUS_PROJECT_API_SECRET;

  console.log('Environment Check:');
  console.log(`  Prometheus URL: ${PROMETHEUS_URL ? '✅ Set' : '❌ Missing'}`);
  console.log(`  Mercury URL:    ${MERCURY_URL ? '✅ Set' : '❌ Missing'}`);
  console.log(`  App ID:         ${APP_ID ? '✅ Set' : '❌ Missing'}`);
  console.log(`  App Secret:     ${APP_SECRET ? '✅ Set' : '❌ Missing'}`);
  console.log('');

  if (!APP_ID || !APP_SECRET) {
    console.error('❌ Missing credentials!');
    console.log('💡 Add to your .env.local:');
    console.log('   NEXUS_PROJECT_API_KEY=your_app_id');
    console.log('   NEXUS_PROJECT_API_SECRET=your_app_secret');
    return;
  }

  try {
    console.log('1. Testing Mercury authentication...');
    
    const authResponse = await fetch(MERCURY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation Authenticate($appId: String!, $appSecret: String!) {
            authenticate(app_id: $appId, app_secret: $appSecret) {
              token
              expires_at
            }
          }
        `,
        variables: { appId: APP_ID, appSecret: APP_SECRET }
      })
    });

    const authResult = await authResponse.json();

    if (authResult.errors) {
      console.error('❌ Authentication failed:', authResult.errors[0]?.message);
      return;
    }

    if (!authResult.data?.authenticate?.token) {
      console.error('❌ No token received');
      return;
    }

    const token = authResult.data.authenticate.token;
    console.log('✅ Authentication successful!');
    console.log(`   Token expires: ${authResult.data.authenticate.expires_at}`);
    console.log('');

    console.log('2. Introspecting Prometheus schema...');

    const schemaResponse = await fetch(PROMETHEUS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query IntrospectionQuery {
            __schema {
              mutationType { name }
              queryType { name }
              types {
                name
                kind
                description
                fields(includeDeprecated: false) {
                  name
                  description
                  args {
                    name
                    type {
                      name
                      kind
                      ofType { name kind }
                    }
                  }
                  type {
                    name
                    kind
                    ofType { name kind }
                  }
                }
              }
            }
          }
        `
      })
    });

    const schemaResult = await schemaResponse.json();

    if (schemaResult.errors) {
      console.error('❌ Schema introspection failed:', schemaResult.errors[0]?.message);
      return;
    }

    const schema = schemaResult.data.__schema;
    
    // Find mutations
    const mutationType = schema.types.find(t => t.name === schema.mutationType?.name);
    if (mutationType?.fields) {
      console.log('🔄 Available Mutations:');
      mutationType.fields
        .filter(m => m.name.toLowerCase().includes('lead') || 
                    m.name.toLowerCase().includes('form') || 
                    m.name.toLowerCase().includes('submit') ||
                    m.name.toLowerCase().includes('create'))
        .forEach(mutation => {
          console.log(`   - ${mutation.name}`);
          if (mutation.description) {
            console.log(`     ${mutation.description}`);
          }
          if (mutation.args?.length > 0) {
            console.log(`     Args: ${mutation.args.map(a => a.name).join(', ')}`);
          }
        });
    }
    
    // Find relevant types  
    const relevantTypes = schema.types.filter(type =>
      type.name.toLowerCase().includes('lead') ||
      type.name.toLowerCase().includes('form') ||
      type.name.toLowerCase().includes('submission')
    );

    if (relevantTypes.length > 0) {
      console.log('\n📋 Relevant Types:');
      relevantTypes.forEach(type => {
        console.log(`   - ${type.name} (${type.kind})`);
        if (type.fields && type.fields.length > 0) {
          const fieldNames = type.fields.slice(0, 5).map(f => f.name);
          console.log(`     Fields: ${fieldNames.join(', ')}${type.fields.length > 5 ? '...' : ''}`);
        }
      });
    }

    console.log('\n✅ Investigation complete!');
    console.log('\n📝 Next Steps:');
    console.log('1. Use the mutations/types above to implement real GraphQL integration');
    console.log('2. Update app/services/prometheus.ts with proper implementation');
    console.log('3. Test with your form data structure');

  } catch (error) {
    console.error('❌ Investigation failed:', error.message);
  }
}

testPrometheusIntegration();