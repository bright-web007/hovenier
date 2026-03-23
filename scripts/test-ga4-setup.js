#!/usr/bin/env node

/**
 * GA4 Event Testing Script
 * 
 * This script helps you test if GA4 events are properly configured
 * by checking the GoogleAnalytics component and environment setup.
 */

const fs = require('fs');
const path = require('path');

// Try to load dotenv, fallback gracefully if not installed
try {
  require('dotenv');
} catch (error) {
  console.log('   ⚠️  dotenv not installed, reading files manually');
}

console.log('🔍 GA4 Event Testing Checklist');
console.log('==============================\n');

// Check environment variables
console.log('1. Environment Variables:');

// Load environment variables from both .env and .env.local
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local', override: true });

const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const analyticsInDev = process.env.ENABLE_ANALYTICS_IN_DEV;
const nodeEnv = process.env.NODE_ENV;

console.log(`   Environment: ${nodeEnv || 'not set'}`);

if (ga4Id) {
  console.log(`   ✅ GA4_MEASUREMENT_ID: ${ga4Id}`);
} else {
  console.log('   ❌ GA4_MEASUREMENT_ID: Not found');
}

if (analyticsInDev === 'true') {
  console.log('   ✅ ENABLE_ANALYTICS_IN_DEV: true');
} else {
  console.log(`   ⚠️  ENABLE_ANALYTICS_IN_DEV: ${analyticsInDev || 'not set'}`);
}

// Check which env files exist
const envLocalExists = fs.existsSync(path.join(process.cwd(), '.env.local'));
const envExists = fs.existsSync(path.join(process.cwd(), '.env'));
console.log(`   📁 .env file: ${envExists ? '✅ exists' : '❌ missing'}`);
console.log(`   📁 .env.local file: ${envLocalExists ? '✅ exists' : '❌ missing'}`);

// Show which file takes precedence
if (envLocalExists) {
  console.log('   📝 Using .env.local (overrides .env)');
} else if (envExists) {
  console.log('   📝 Using .env only');
}

// Check GoogleAnalytics component
console.log('\n2. GoogleAnalytics Component:');
const gaComponentPath = path.join(process.cwd(), 'app/components/GoogleAnalytics.tsx');
const gaExists = fs.existsSync(gaComponentPath);

if (gaExists) {
  console.log('   ✅ GoogleAnalytics.tsx exists');
  const gaContent = fs.readFileSync(gaComponentPath, 'utf8');
  
  // Check for key functions
  const hasTrackEvent = gaContent.includes('export const trackEvent');
  const hasTrackLeadForm = gaContent.includes('trackLeadFormSubmission');
  const hasGtagScript = gaContent.includes('googletagmanager.com/gtag/js');
  
  console.log(`   ${hasTrackEvent ? '✅' : '❌'} trackEvent function exists`);
  console.log(`   ${hasTrackLeadForm ? '✅' : '❌'} trackLeadFormSubmission function exists`);
  console.log(`   ${hasGtagScript ? '✅' : '❌'} gtag.js script included`);
} else {
  console.log('   ❌ GoogleAnalytics.tsx not found');
}

// Check layout integration
console.log('\n3. Layout Integration:');
const layoutPath = path.join(process.cwd(), 'app/layout.tsx');
const layoutExists = fs.existsSync(layoutPath);

if (layoutExists) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  const hasGoogleAnalytics = layoutContent.includes('GoogleAnalytics');
  const hasGaIdProp = layoutContent.includes('NEXT_PUBLIC_GA4_MEASUREMENT_ID');
  
  console.log(`   ${hasGoogleAnalytics ? '✅' : '❌'} GoogleAnalytics imported in layout`);
  console.log(`   ${hasGaIdProp ? '✅' : '❌'} GA4 ID passed to component`);
} else {
  console.log('   ❌ layout.tsx not found');
}

console.log('\n🧪 Next Steps for Testing:');
console.log('==========================');
console.log('1. Open http://localhost:3002/test-ga4 in browser');
console.log('2. Open DevTools → Network tab');  
console.log('3. Filter by "google-analytics" or "collect"');
console.log('4. Click test buttons on the page');
console.log('5. Check for POST requests to google-analytics.com/collect');
console.log('6. Verify events in GA4 Real-time dashboard');
console.log('');
console.log('🚨 Common Issues:');
console.log('- Cookie consent not given (check localStorage)');
console.log('- Ad blockers preventing requests');
console.log('- Development mode (if ENABLE_ANALYTICS_IN_DEV=false)');
console.log('- Network connectivity issues');
console.log('');
console.log('📊 GA4 Real-time Dashboard:');
console.log('https://analytics.google.com/analytics/web/#/');
console.log('Go to: Reports → Realtime → Events');