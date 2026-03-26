// GA4 Consent & Event Debugging - Run in Console
console.log('🔍 GA4 CONSENT & EVENT DEBUGGING');
console.log('===============================\n');

// 1. Check consent function directly
function checkAnalyticsConsent() {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('cookie_consent_preferences');
    if (!consent) return false;
    
    const preferences = JSON.parse(consent);
    return preferences.analytics === true;
  } catch (error) {
    console.error('Consent parsing error:', error);
    return false;
  }
}

// 2. Check current consent status
console.log('1. CONSENT STATUS:');
console.log('localStorage consent:', localStorage.getItem('cookie_consent_preferences'));
console.log('Parsed consent:', (() => {
    try {
        const consent = localStorage.getItem('cookie_consent_preferences');
        return consent ? JSON.parse(consent) : null;
    } catch (e) {
        return 'Parse error: ' + e.message;
    }
})());

const isDevelopment = window.location.hostname === 'localhost';
const hasConsent = checkAnalyticsConsent();
console.log('Is development:', isDevelopment);
console.log('Has analytics consent:', hasConsent);
console.log('Should allow events:', isDevelopment || hasConsent);

// 3. Test manual event sending
console.log('\n2. MANUAL EVENT TEST:');
if (window.gtag) {
    console.log('Sending test page_view event...');
    
    // Force send a page_view event
    window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        debug_test: true
    });
    
    console.log('Sending test custom event...');
    window.gtag('event', 'debug_manual_test', {
        event_category: 'debug',
        event_label: 'consent_debugging',
        value: 1,
        debug_test: true
    });
    
    console.log('Events sent - check Network tab for collect requests in 3 seconds...');
} else {
    console.error('❌ gtag function not available');
}

// 4. Check environment variables
console.log('\n3. ENVIRONMENT CHECK:');
console.log('NODE_ENV:', process?.env?.NODE_ENV || 'undefined');
console.log('ENABLE_ANALYTICS_IN_DEV:', process?.env?.ENABLE_ANALYTICS_IN_DEV || 'undefined');

// 5. Grant consent manually for testing
console.log('\n4. MANUAL CONSENT GRANT (for testing):');
const testConsent = {
    necessary: true,
    analytics: true,
    marketing: false,
    personalization: false,
    timestamp: Date.now()
};

localStorage.setItem('cookie_consent_preferences', JSON.stringify(testConsent));
console.log('✅ Analytics consent manually granted for testing');
console.log('Stored consent:', localStorage.getItem('cookie_consent_preferences'));

// 6. Try sending events again after consent
setTimeout(() => {
    console.log('\n5. POST-CONSENT EVENT TEST:');
    if (window.gtag) {
        console.log('Sending events after consent grant...');
        
        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            consent_test: true
        });
        
        window.gtag('event', 'consent_granted_test', {
            event_category: 'debug',
            event_label: 'post_consent',
            value: 1
        });
        
        console.log('Post-consent events sent - check Network tab for collect requests!');
    }
}, 1000);