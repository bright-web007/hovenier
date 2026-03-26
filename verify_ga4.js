// GA4 Verification Script - Run in browser console
// Copy and paste this into your browser console on hovenier.frl

console.log('🔍 GA4 Verification Test');

// 1. Check if gtag is loaded
console.log('1. gtag function available:', typeof window.gtag);
console.log('2. dataLayer exists:', Array.isArray(window.dataLayer));

// 2. Check current consent status  
let consent = null;
try {
  consent = JSON.parse(localStorage.getItem('cookie_consent_preferences') || '{}');
} catch (e) {
  console.log('No consent preferences found');
}
console.log('3. Analytics consent status:', consent?.analytics || 'Not set'); 

// 3. Check environment settings
const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
console.log('4. Environment:', isDev ? 'development' : 'production');
console.log('5. Running on:', window.location.hostname);

// 4. Test fire a GA4 event manually
if (window.gtag) {
  console.log('6. 🚀 Firing test GA4 event...');
  
  window.gtag('event', 'manual_verification_test', {
    event_category: 'verification',
    event_label: 'console_test',
    custom_parameter_1: 'test_value'
  });
  
  console.log('✅ Test event fired! Check GA4 Realtime reports in ~1-2 minutes');
  console.log('📊 GA4 Dashboard: https://analytics.google.com/analytics/web/#/realtime/rt-overview/a-ga:G-WZ41C9EYC0');
} else {
  console.log('❌ gtag not available - GA4 not loaded');
}

// 5. Check network requests  
console.log('7. Monitoring GA4 network requests...');
let requestCount = 0;
const originalFetch = window.fetch;
window.fetch = function(...args) {
  const url = args[0];
  if (typeof url === 'string' && (url.includes('google-analytics.com') || url.includes('analytics.google.com'))) {
    requestCount++;
    console.log(`📡 GA4 Request #${requestCount}:`, url.substring(0, 100) + '...');
  }
  return originalFetch.apply(this, args);
};

// 6. Give cookie consent to enable tracking
console.log('8. 🍪 Setting analytics consent for testing...');
localStorage.setItem('cookie_consent_preferences', JSON.stringify({ 
  analytics: true, 
  marketing: false, 
  functional: true 
}));

// Trigger consent update
if (window.gtag) {
  window.gtag('consent', 'update', {
    analytics_storage: 'granted'
  });
  console.log('✅ Analytics consent granted for testing');
  
  // Fire another test event  
  setTimeout(() => {
    console.log('🚀 Firing post-consent test event...');
    window.gtag('event', 'consent_granted_test', {
      event_category: 'verification',
      event_label: 'post_consent_test'
    });
    console.log('✅ Post-consent event fired!');
  }, 1000);
}

console.log('🎯 NEXT STEPS:');
console.log('1. Check GA4 Realtime: https://analytics.google.com/analytics/web/#/realtime/rt-overview/a-ga:G-WZ41C9EYC0');
console.log('2. Look for "manual_verification_test" and "consent_granted_test" events');
console.log('3. Monitor console for GA4 network requests');