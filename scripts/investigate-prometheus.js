#!/usr/bin/env node

/**
 * Prometheus Service Investigation Script
 * 
 * This script helps investigate the Prometheus GraphQL schema and API structure
 * before implementing the proper integration.
 */

const PROMETHEUS_URL = process.env.PROMETHEUS_GRAPHQL_URL || 'https://prometheus.hivedeck.com/graphql';
const MERCURY_URL = process.env.MERCURY_GRAPHQL_URL || 'https://mercury.hivedeck.com/graphql';
const APP_ID = process.env.NEXUS_PROJECT_API_KEY;
const APP_SECRET = process.env.NEXUS_PROJECT_API_SECRET;

console.log('🔍 Prometheus Service Investigation');
console.log('==================================');
console.log(`Prometheus URL: ${PROMETHEUS_URL}`);
console.log(`Mercury URL:    ${MERCURY_URL}`);
console.log(`App ID:         ${APP_ID ? 'Set ✅' : 'Missing ❌'}`);
console.log(`App Secret:     ${APP_SECRET ? 'Set ✅' : 'Missing ❌'}`);
console.log('');

// Step 1: Authenticate with Mercury to get project token
async function authenticateMercury() {
  console.log('Step 1: Authenticating with Mercury...');
  
  if (!APP_ID || !APP_SECRET) {
    console.error('❌ Missing NEXUS_PROJECT_API_KEY or NEXUS_PROJECT_API_SECRET');
    console.log('Please set these in your .env.local file');
    return null;
  }
  
  try {
    const response = await fetch(`${MERCURY_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation Authenticate($appId: String!, $appSecret: String!) {
            authenticate(app_id: $appId, app_secret: $appSecret) {
              token
              expires_at
            }
          }
        `,
        variables: {
          appId: APP_ID,
          appSecret: APP_SECRET
        }
      })
    });
    
    const result = await response.json();
    
    if (response.ok && result.data?.authenticate?.token) {
      console.log('✅ Mercury authentication successful');
      console.log(`Token expires: ${result.data.authenticate.expires_at}`);
      return result.data.authenticate.token;
    } else {
      console.error('❌ Mercury authentication failed:');
      console.error(JSON.stringify(result, null, 2));
      return null;
    }
    
  } catch (error) {
    console.error('❌ Mercury authentication error:', error.message);
    return null;
  }
}

// Step 2: Introspect Prometheus GraphQL schema
async function introspectPrometheus(token) {
  console.log('\nStep 2: Introspecting Prometheus GraphQL schema...');
  
  try {
    const introspectionQuery = {
      query: `
        query IntrospectionQuery {
          __schema {
            mutationType { name }
            queryType { name }
            subscriptionType { name }
            types {
              name
              kind
              description
              fields(includeDeprecated: false) {
                name
                description
                type {
                  name
                  kind
                  ofType {
                    name
                    kind
                  }
                }
              }
            }
          }
        }
      `
    };
    
    const response = await fetch(PROMETHEUS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(introspectionQuery)
    });
    
    const result = await response.json();
    
    if (response.ok && result.data) {
      console.log('✅ Prometheus schema introspection successful');
      
      // Find relevant types for forms/leads
      const schema = result.data.__schema;
      const relevantTypes = schema.types.filter(type => 
        type.name.toLowerCase().includes('lead') ||
        type.name.toLowerCase().includes('form') ||
        type.name.toLowerCase().includes('submission') ||
        type.name.toLowerCase().includes('contact')
      );
      
      console.log('\n📋 Relevant Types Found:');
      relevantTypes.forEach(type => {
        console.log(`\n${type.kind}: ${type.name}`);
        if (type.description) console.log(`  Description: ${type.description}`);
        if (type.fields) {
          console.log('  Fields:');
          type.fields.forEach(field => {
            console.log(`    - ${field.name}: ${field.type.name || field.type.ofType?.name || 'Unknown'}`);
          });
        }
      });
      
      // Look for mutations
      console.log('\n🔄 Available Mutations:');
      const mutationType = schema.types.find(t => t.name === schema.mutationType?.name);
      if (mutationType && mutationType.fields) {
        const leadMutations = mutationType.fields.filter(field =>
          field.name.toLowerCase().includes('lead') ||
          field.name.toLowerCase().includes('form') ||
          field.name.toLowerCase().includes('submit') ||
          field.name.toLowerCase().includes('create')
        );
        
        leadMutations.forEach(mutation => {
          console.log(`  - ${mutation.name}: ${mutation.description || 'No description'}`);
        });
      }
      
      return result.data;
    } else {
      console.error('❌ Prometheus schema introspection failed:');
      console.error(JSON.stringify(result, null, 2));
      return null;
    }
    
  } catch (error) {
    console.error('❌ Prometheus introspection error:', error.message);
    return null;
  }
}

// Step 3: Test a sample lead submission
async function testLeadSubmission(token) {
  console.log('\nStep 3: Testing sample lead submission...');
  
  const sampleLead = {
    naam: 'Test User',
    gemeente: 'Leeuwarden',
    dienst: 'Tuinonderhoud',  
    telefoon: '+31612345678',
    locale: 'nl',
    source: 'investigation_script'
  };
  
  try {
    // This will likely fail until we know the exact mutation name and structure
    const response = await fetch(PROMETHEUS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          mutation CreateLead($input: LeadInput!) {
            createLead(input: $input) {
              id
              success
              message
            }
          }
        `,
        variables: {
          input: sampleLead
        }
      })
    });
    
    const result = await response.json();
    console.log('🧪 Test submission result:');
    console.log(JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.log('⚠️  Test submission failed (expected until we know the schema):');
    console.log(error.message);
  }
}

// Main investigation function
async function investigate() {
  const token = await authenticateMercury();
  
  if (!token) {
    console.log('\n❌ Cannot proceed without authentication token');
    console.log('\nNext Steps:');
    console.log('1. Set NEXUS_PROJECT_API_KEY in your .env.local file');
    console.log('2. Set NEXUS_PROJECT_API_SECRET in your .env.local file'); 
    console.log('3. Run this script again');
    return;
  }
  
  const schema = await introspectPrometheus(token);
  
  if (schema) {
    await testLeadSubmission(token);
    
    console.log('\n✅ Investigation Complete!');
    console.log('\nNext Steps:');
    console.log('1. Use the schema information above to implement proper GraphQL mutations');
    console.log('2. Update app/services/prometheus.ts with real GraphQL integration');
    console.log('3. Test with your form data structure');
  }
}

// Run investigation
investigate().catch(console.error);