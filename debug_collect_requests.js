// GA4 Collect Request Debugging - Run in Console
// This script specifically checks why collect requests aren't being sent

console.log('🔍 GA4 COLLECT REQUEST DEBUGGING');
console.log('===============================\n');

// 1. Check consent status
console.log('1. CONSENT STATUS CHECK:');
const isDev = window.location.hostname === 'localhost';
const hasConsent = isDev || (() => {
    try {
        const preferences = localStorage.getItem('cookie_consent_preferences');
        return preferences ? JSON.parse(preferences).analytics === true : false;
    } catch {
        return false;
    }
})();

console.log('Is development:', isDev);
console.log('Has analytics consent:', hasConsent);
console.log('GDPR consent stored:', localStorage.getItem('cookie_consent_preferences'));

// 2. Check GA4 configuration
console.log('\n2. GA4 CONFIGURATION CHECK:');
console.log('Measurement ID from script:', document.querySelector('script[src*="gtag/js"]')?.src.match(/id=([^&]+)/)?.[1]);
console.log('Environment variables check...');

// 3. Force send a test event and monitor for collect requests
console.log('\n3. FORCE TEST EVENT WITH COLLECT MONITORING:');

// Set up monitoring for collect requests
const collectRequests = [];
const originalSendBeacon = navigator.sendBeacon;
const originalFetch = window.fetch;

// Monitor fetch requests
window.fetch = function(...args) {
    const url = args[0];
    if (typeof url === 'string' && url.includes('collect')) {
        console.log('🚀 COLLECT via fetch:', url);
        collectRequests.push({method: 'fetch', url, timestamp: Date.now()});
    }
    return originalFetch.apply(this, args);
};

// Monitor sendBeacon requests  
navigator.sendBeacon = function(url, data) {
    if (url.includes('collect')) {
        console.log('🚀 COLLECT via sendBeacon:', url);
        collectRequests.push({method: 'sendBeacon', url, data, timestamp: Date.now()});
    }
    return originalSendBeacon.apply(this, arguments);
};

// Send test events
if (window.gtag) {
    console.log('Sending test page_view...');
    window.gtag('event', 'page_view', {
        page_title: 'Debug Test',
        page_location: window.location.href,
        page_path: window.location.pathname
    });
    
    console.log('Sending test custom event...');
    window.gtag('event', 'debug_collect_test', {
        event_category: 'debug',
        event_label: 'collect_monitoring',
        value: 1
    });
} else {
    console.error('❌ gtag function not available');
}

// 4. Check for collect requests after 3 seconds
setTimeout(() => {
    console.log('\n4. COLLECT REQUESTS SUMMARY (after 3 seconds):');
    console.log('Total collect requests detected:', collectRequests.length);
    
    if (collectRequests.length === 0) {
        console.log('❌ NO COLLECT REQUESTS DETECTED');
        console.log('\n🔍 POSSIBLE CAUSES:');
        console.log('- Analytics consent not granted');
        console.log('- send_page_view is disabled (expected for SPA)');
        console.log('- Events are being queued but not processed');
        console.log('- CSP blocking requests (check for CSP errors)');
        console.log('- Ad blocker or browser blocking analytics');
        console.log('- GA4 measurement ID incorrect or not configured');
        
        // Check for errors
        console.log('\n📋 DEBUG CHECKLIST:');
        console.log('1. Check Console for CSP/CORS errors');
        console.log('2. Disable ad blocker and retry');
        console.log('3. Check Network tab for blocked requests'); 
        console.log('4. Verify measurement ID in gtag script URL');
        console.log('5. Check if gtag debug_mode shows anything');
    } else {
        console.log('✅ COLLECT REQUESTS FOUND:');
        collectRequests.forEach((req, i) => {
            console.log(`${i+1}. ${req.method}: ${req.url.substring(0, 100)}...`);
        });
    }
}, 3000);

console.log('\n⏰ Waiting 3 seconds to check for collect requests...');
console.log('(Check Network tab manually for requests to google-analytics.com)');