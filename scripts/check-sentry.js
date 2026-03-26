#!/usr/bin/env node

/**
 * Sentry Configuration Verification Script
 * Tests Sentry setup and integration for the Hovenier.frl project
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Sentry Configuration Check');
console.log('==============================\n');

// Check environment variables
console.log('1. Environment Variables:');
const envLocalPath = path.join(__dirname, '.env.local');
let envVars = {};

try {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.includes('=') && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      envVars[key.trim()] = value.trim();
    }
  });
} catch (error) {
  console.log('   ⚠️  Could not read .env.local file');
}

const sentryDsn = envVars.NEXT_PUBLIC_SENTRY_DSN || envVars.SENTRY_DSN;
if (sentryDsn) {
  console.log(`   ✅ SENTRY_DSN: ${sentryDsn.substring(0, 30)}...`);
  
  // Validate DSN format
  const dsnRegex = /^https:\/\/[a-f0-9]+@[^\/]+\/[0-9]+$/;
  if (dsnRegex.test(sentryDsn)) {
    console.log('   ✅ DSN format is valid');
  } else {
    console.log('   ❌ DSN format appears invalid');
  }
} else {
  console.log('   ❌ SENTRY_DSN: Not found');
}

// Check configuration files
console.log('\n2. Configuration Files:');
const clientConfigPath = path.join(__dirname, 'sentry.client.config.ts');
const serverConfigPath = path.join(__dirname, 'sentry.server.config.ts');

if (fs.existsSync(clientConfigPath)) {
  console.log('   ✅ sentry.client.config.ts exists');
} else {
  console.log('   ❌ sentry.client.config.ts missing');
}

if (fs.existsSync(serverConfigPath)) {
  console.log('   ✅ sentry.server.config.ts exists');
} else {
  console.log('   ❌ sentry.server.config.ts missing');
}

// Check test endpoint
console.log('\n3. Test Endpoint:');
const testApiPath = path.join(__dirname, 'app', 'api', 'test-sentry', 'route.ts');
if (fs.existsSync(testApiPath)) {
  console.log('   ✅ /api/test-sentry endpoint exists');
} else {
  console.log('   ❌ /api/test-sentry endpoint missing');
}

// Check package.json for Sentry dependencies
console.log('\n4. Dependencies:');
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  if (deps['@sentry/nextjs']) {
    console.log(`   ✅ @sentry/nextjs: ${deps['@sentry/nextjs']}`);
  } else {
    console.log('   ❌ @sentry/nextjs not found');
  }
} else {
  console.log('   ❌ package.json not found');
}

// Environment-specific checks
console.log('\n5. Environment Configuration:');
const nodeEnv = envVars.NODE_ENV || process.env.NODE_ENV || 'development';
console.log(`   Environment: ${nodeEnv}`);

if (nodeEnv === 'development') {
  console.log('   ℹ️  Development mode - Sentry will capture but may not send all events');
} else {
  console.log('   ✅ Production mode - Full Sentry functionality expected');
}

// Test recommendations
console.log('\n6. Manual Testing Instructions:');
console.log('   📋 To test Sentry integration:');
console.log('   1. Visit http://localhost:3000/api/test-sentry');
console.log('   2. Test error: http://localhost:3000/api/test-sentry?type=error');
console.log('   3. Test warning: http://localhost:3000/api/test-sentry?type=warning');
console.log('   4. Test info: http://localhost:3000/api/test-sentry?type=info');
console.log('   5. Check your Sentry dashboard at sentry.wazobia.tech');

console.log('\n🎯 Summary:');
console.log(`   Sentry DSN: ${sentryDsn ? '✅ Configured' : '❌ Missing'}`);
console.log(`   Config files: ${fs.existsSync(clientConfigPath) && fs.existsSync(serverConfigPath) ? '✅ Present' : '❌ Missing'}`);
console.log(`   Test endpoint: ${fs.existsSync(testApiPath) ? '✅ Available' : '❌ Missing'}`);

if (sentryDsn && fs.existsSync(clientConfigPath) && fs.existsSync(serverConfigPath) && fs.existsSync(testApiPath)) {
  console.log('\n🚀 Sentry appears to be properly configured!');
  console.log('   Visit the test endpoints above to verify error capture is working.');
} else {
  console.log('\n⚠️  Sentry configuration incomplete. Check the issues above.');
}