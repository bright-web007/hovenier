// Quick GA4 Status Check - Run in Browser Console
console.log('🔍 GA4 Quick Status Check');
console.log('========================');

// Check current gtag function
console.log('gtag exists:', typeof window.gtag === 'function');
console.log('gtag length:', window.gtag ? window.gtag.toString().length + ' characters' : 'N/A');
console.log('gtag is stub?:', window.gtag && window.gtag.toString().length < 100 ? 'YES - Still stub' : 'NO - Real function loaded');

// Check dataLayer
console.log('dataLayer exists:', Array.isArray(window.dataLayer));
console.log('dataLayer length:', window.dataLayer ? window.dataLayer.length + ' items queued' : 'N/A');

// Check for GA4 script
const gaScript = document.querySelector('script[src*="gtag/js"]');
console.log('GA4 script found:', !!gaScript);
console.log('GA4 script src:', gaScript?.src || 'None');

// Test a gtag call and monitor dataLayer
const beforeLength = window.dataLayer?.length || 0;
if (window.gtag) {
    window.gtag('event', 'test_race_condition', {
        event_category: 'debug',
        value: 1
    });
    console.log('Test event sent. dataLayer before/after:', beforeLength, '→', window.dataLayer?.length);
} else {
    console.error('gtag function not available!');
}

// Monitor for network requests to Google Analytics collect endpoint
setTimeout(() => {
    console.log('⏰ After 2 seconds:');
    console.log('gtag length now:', window.gtag ? window.gtag.toString().length + ' characters' : 'N/A');
    console.log('Is still stub?:', window.gtag && window.gtag.toString().length < 100 ? 'YES' : 'NO');
}, 2000);