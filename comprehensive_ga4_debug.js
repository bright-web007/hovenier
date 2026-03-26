// COMPREHENSIVE GA4 COLLECT REQUEST DEBUGGER
// This will identify exactly why collect requests aren't being sent

console.log('🔍 COMPREHENSIVE GA4 COLLECT DEBUGGING');
console.log('=====================================\n');

// 1. Environment and configuration check
console.log('1. ENVIRONMENT & CONFIG:');
console.log('URL:', window.location.href);
console.log('User Agent:', navigator.userAgent);
console.log('Is localhost:', window.location.hostname === 'localhost');

// Check for ad blockers or privacy extensions
console.log('\n2. BROWSER PRIVACY SETTINGS CHECK:');
console.log('Do Not Track:', navigator.doNotTrack);
console.log('Privacy extensions detected:', (() => {
    const indicators = [];
    if (window.uBlock) indicators.push('uBlock Origin');
    if (window.adblock) indicators.push('AdBlock');
    if (window.ABP) indicators.push('Adblock Plus');
    if (document.getElementById('privacy-badger-script')) indicators.push('Privacy Badger');
    return indicators.length > 0 ? indicators.join(', ') : 'None detected';
})());

// 3. Check GA4 measurement ID
console.log('\n3. GA4 MEASUREMENT ID CHECK:');
const gaScript = document.querySelector('script[src*="gtag/js"]');
const measurementId = gaScript?.src.match(/id=([^&]+)/)?.[1];
console.log('Script tag found:', !!gaScript);
console.log('Measurement ID from script:', measurementId);
console.log('Expected ID: G-WZ41C9EYC0');
console.log('ID matches:', measurementId === 'G-WZ41C9EYC0');

// 4. Network monitoring setup
console.log('\n4. SETTING UP NETWORK MONITORING:');
let collectRequests = [];
let blockedRequests = [];

// Monitor all fetch requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
    const url = args[0];
    if (typeof url === 'string') {
        if (url.includes('google-analytics.com') || url.includes('collect')) {
            console.log('🌐 GA4 Fetch attempt:', url);
            collectRequests.push({method: 'fetch', url, timestamp: Date.now(), args});
        }
    }
    return originalFetch.apply(this, args)
        .then(response => {
            if (typeof url === 'string' && (url.includes('google-analytics.com') || url.includes('collect'))) {
                console.log('📥 GA4 Fetch response:', response.status, response.statusText);
                if (!response.ok) {
                    blockedRequests.push({method: 'fetch', url, status: response.status, error: response.statusText});
                }
            }
            return response;
        })
        .catch(error => {
            if (typeof url === 'string' && (url.includes('google-analytics.com') || url.includes('collect'))) {
                console.error('❌ GA4 Fetch error:', error);
                blockedRequests.push({method: 'fetch', url, error: error.message});
            }
            throw error;
        });
};

// Monitor sendBeacon requests
const originalSendBeacon = navigator.sendBeacon;
navigator.sendBeacon = function(url, data) {
    if (url.includes('google-analytics.com') || url.includes('collect')) {
        console.log('🚀 GA4 SendBeacon attempt:', url);
        console.log('📊 Data being sent:', data);
        collectRequests.push({method: 'sendBeacon', url, data, timestamp: Date.now()});
    }
    
    try {
        const result = originalSendBeacon.apply(this, arguments);
        if (url.includes('google-analytics.com') || url.includes('collect')) {
            console.log('✅ SendBeacon result:', result);
            if (!result) {
                blockedRequests.push({method: 'sendBeacon', url, error: 'SendBeacon returned false'});
            }
        }
        return result;
    } catch (error) {
        if (url.includes('google-analytics.com') || url.includes('collect')) {
            console.error('❌ SendBeacon error:', error);
            blockedRequests.push({method: 'sendBeacon', url, error: error.message});
        }
        throw error;
    }
};

// 5. Check current GA4 state
console.log('\n5. GA4 STATE CHECK:');
console.log('gtag function exists:', typeof window.gtag === 'function');
console.log('gtag function length:', window.gtag ? window.gtag.toString().length + ' chars' : 'N/A');
console.log('dataLayer exists:', Array.isArray(window.dataLayer));
console.log('dataLayer length:', window.dataLayer ? window.dataLayer.length : 'N/A');
console.log('gtag properties:', window.gtag ? Object.getOwnPropertyNames(window.gtag) : 'N/A');

// 6. Test events and monitor for 5 seconds
console.log('\n6. SENDING TEST EVENTS:');
if (window.gtag) {
    // Send a series of test events
    console.log('Sending page_view...');
    window.gtag('event', 'page_view', {
        page_title: 'Debug Test Page',
        page_location: window.location.href,
        page_path: window.location.pathname
    });
    
    setTimeout(() => {
        console.log('Sending custom event...');
        window.gtag('event', 'debug_collect_test', {
            event_category: 'debug',
            event_label: 'collect_debugging',
            value: 42
        });
    }, 1000);
    
    setTimeout(() => {
        console.log('Sending conversion event...');
        window.gtag('event', 'generate_lead', {
            event_category: 'engagement',
            event_label: 'debug_test',
            value: 1
        });
    }, 2000);
} else {
    console.error('❌ gtag function not available');
}

// 7. Final report after 5 seconds
setTimeout(() => {
    console.log('\n7. FINAL DEBUGGING REPORT:');
    console.log('=====================================');
    console.log('Total collect attempts:', collectRequests.length);
    console.log('Blocked/failed requests:', blockedRequests.length);
    
    if (collectRequests.length === 0) {
        console.log('🚨 NO COLLECT REQUESTS ATTEMPTED');
        console.log('\n🔍 POSSIBLE CAUSES:');
        console.log('- GA4 is in debug mode (events processed but not sent)');
        console.log('- Consent not granted (analytics_storage: denied)');
        console.log('- Ad blocker blocking requests before they leave browser');
        console.log('- Corporate firewall/DNS filtering');
        console.log('- Browser privacy settings blocking analytics');
        console.log('- CSP headers blocking requests');
        console.log('- Measurement ID mismatch or invalid');
    } else {
        console.log('✅ COLLECT REQUESTS DETECTED:');
        collectRequests.forEach((req, i) => {
            console.log(`${i+1}. ${req.method}: ${req.url.substring(0, 100)}...`);
        });
        
        if (blockedRequests.length > 0) {
            console.log('\n❌ BLOCKED REQUESTS:');
            blockedRequests.forEach((req, i) => {
                console.log(`${i+1}. ${req.method}: ${req.error}`, req.url.substring(0, 50));
            });
        }
    }
    
    // Check if gtag is actually trying to send data
    console.log('\n📊 GA4 INTERNAL STATE:');
    if (window.gtag && window.gtag.q) {
        console.log('gtag queue length:', window.gtag.q.length);
        console.log('gtag queue contents:', window.gtag.q);
    }
    
    console.log('\n🎯 NEXT STEPS:');
    console.log('1. Check browser console for CSP violations');
    console.log('2. Disable all browser extensions and try again');
    console.log('3. Try in incognito/private browsing mode');
    console.log('4. Check if corporate firewall blocks google-analytics.com');
    console.log('5. Verify measurement ID G-WZ41C9EYC0 is correct');
    
}, 5000);

console.log('\n⏰ Waiting 5 seconds for collect requests...');
console.log('Watch above for network activity...');