'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Google Analytics 4 (GA4) Direct Implementation
 * 
 * This component implements GA4 directly using gtag.js (NOT Google Tag Manager).
 * The gtag.js script from googletagmanager.com is GA4's official library.
 * 
 * Features:
 * - GDPR compliant with consent management
 * - Privacy-focused (anonymize_ip, etc.)
 * - Enhanced ecommerce tracking
 * - Custom conversion tracking for leads
 */

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void;
    dataLayer: object[];
  }
}

interface GoogleAnalyticsProps {
  gaId: string;
}

const GoogleAnalytics = ({ gaId }: GoogleAnalyticsProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('GoogleAnalytics: No GA ID provided');
      }
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('GoogleAnalytics: Initializing with ID:', gaId);
      console.log('GoogleAnalytics: Environment:', process.env.NODE_ENV);
      console.log('GoogleAnalytics: Analytics enabled in dev:', process.env.ENABLE_ANALYTICS_IN_DEV);
    }

    // Initialize dataLayer if not exists (this must come first)
    if (!window.dataLayer) {
      window.dataLayer = [];
      if (process.env.NODE_ENV === 'development') {
        console.log('GoogleAnalytics: dataLayer initialized');
      }
    }

    // Initialize gtag stub function (this must come second)  
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
      if (process.env.NODE_ENV === 'development') {
        console.log('GoogleAnalytics: gtag stub called with:', args);
      }
    }

    // Set gtag on window (this must come third)
    window.gtag = gtag;

    // Queue the initialization (this must come fourth)
    gtag('js', new Date());
    
    // Check consent for production, allow in development
    const isDevelopment = process.env.NODE_ENV === 'development' && process.env.ENABLE_ANALYTICS_IN_DEV === 'true';
    const hasAnalyticsConsent = isDevelopment || checkAnalyticsConsent();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('GoogleAnalytics: Consent status -', { isDevelopment, hasAnalyticsConsent });
    }
    
    // Queue consent configuration
    gtag('consent', 'default', {
      analytics_storage: hasAnalyticsConsent ? 'granted' : 'denied',
      ad_storage: 'denied', // Start with denied, update after consent
      personalization_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    });

    // Queue GA4 configuration
    gtag('config', gaId, {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: true, // GDPR compliance
      allow_google_signals: hasAnalyticsConsent,
      allow_ad_personalization_signals: false, // Default to false
      debug_mode: process.env.NODE_ENV === 'development', // Enable debug mode in development
      send_page_view: false, // Disable automatic page views for SPA - we'll handle manually
      custom_map: { 'custom_parameter_1': 'lead_type' } // Combine custom_map into main config
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('GoogleAnalytics: All gtag calls queued in dataLayer');
      
      // Monitor network requests to GA4 in development
      const originalFetch = window.fetch;
      window.fetch = function(...args) {
        const url = args[0];
        if (typeof url === 'string' && (url.includes('google-analytics.com') || url.includes('googletagmanager.com'))) {
          console.log('GA4 Network Request:', url);
          return originalFetch.apply(this, args)
            .then(response => {
              console.log('GA4 Response:', response.status, response.statusText, url);
              return response;
            })
            .catch(error => {
              console.error('GA4 Request Failed:', error, url);
              throw error;
            });
        }
        return originalFetch.apply(this, args);
      };
      
      // Test events after giving gtag.js time to load and process the queue
      setTimeout(() => {
        console.log('GoogleAnalytics: Checking gtag function after delay...');
        console.log('GoogleAnalytics: gtag function length:', window.gtag.toString().length);
        console.log('GoogleAnalytics: dataLayer length before event:', window.dataLayer.length);
        
        gtag('event', 'page_view_test', {
          event_category: 'development',
          event_label: 'initialization_test'
        });
        console.log('GoogleAnalytics: Test event sent');
        console.log('GoogleAnalytics: dataLayer length after test:', window.dataLayer.length);
        
        // Force a page view event
        gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname
        });
        console.log('GoogleAnalytics: Manual page_view event sent');
      }, 3000); // Increased delay to 3 seconds
    }

  }, [gaId]);

  // Track page views on route change  
  useEffect(() => {
    if (!gaId || !window.gtag) return;
    
    // Only track if analytics consent is given (or in development)
    const isDevelopment = process.env.NODE_ENV === 'development' && process.env.ENABLE_ANALYTICS_IN_DEV === 'true';
    if (isDevelopment || checkAnalyticsConsent()) {
      
      // Send explicit page_view event for SPA navigation
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
        // Add custom parameters for better tracking
        custom_parameter_1: 'spa_navigation'
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log('GoogleAnalytics: Page view sent for:', pathname);
      }
    }
  }, [pathname, gaId]);

  // Don't render in development unless explicitly enabled, but always render in production
  if (process.env.NODE_ENV === 'development' && process.env.ENABLE_ANALYTICS_IN_DEV !== 'true') {
    return null;
  }

  // Don't render if no GA ID
  if (!gaId) {
    console.warn('GoogleAnalytics: No GA ID provided, skipping render');
    return null;
  }

  // Only log in development to avoid console spam in production
  if (process.env.NODE_ENV === 'development') {
    console.log('GoogleAnalytics: Rendering script for GA ID:', gaId);
  }

  // Always render in production (consent is handled via gtag consent API)
  return (
    <>
      {/* Google Analytics 4 (GA4) - Direct Implementation via gtag.js 
          Note: This is NOT Google Tag Manager (GTM) - it's GA4's official gtag library
          GTM would use a different URL pattern: gtm.js?id=GTM-XXXX */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        onLoad={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('GoogleAnalytics: Script loaded successfully');
            console.log('GoogleAnalytics: gtag function length after load:', window.gtag?.toString().length);
            // Give it a moment to process the queued commands
            setTimeout(() => {
              console.log('GoogleAnalytics: gtag function type after processing:', typeof window.gtag);
              console.log('GoogleAnalytics: dataLayer length after processing:', window.dataLayer?.length);
            }, 500);
          }
        }}
        onError={(e) => {
          console.error('GoogleAnalytics: Script failed to load', e);
          if (process.env.NODE_ENV === 'development') {
            console.error('GoogleAnalytics: This will prevent all GA4 tracking from working');
          }
        }}
      />
    </>
  );
};

// Check if user has given analytics consent
function checkAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('cookie_consent_preferences');
    if (consent) {
      const preferences = JSON.parse(consent);
      return preferences.analytics === true;
    }
  } catch (error) {
    console.warn('Error checking analytics consent:', error);
  }
  
  return false;
}

// Utility functions for tracking events (with consent check, bypassed in development)
export const trackEvent = (
  eventName: string,
  parameters: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const isDevelopment = process.env.NODE_ENV === 'development' && process.env.ENABLE_ANALYTICS_IN_DEV === 'true';
    if (isDevelopment || checkAnalyticsConsent()) {
      window.gtag('event', eventName, {
        ...parameters,
        // Add privacy-conscious settings
        send_page_view: false,
        anonymize_ip: true
      });
    }
  }
};

export const trackConversion = (
  conversionId: string,
  conversionLabel?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag && checkAnalyticsConsent()) {
    window.gtag('event', 'conversion', {
      send_to: conversionLabel ? `${conversionId}/${conversionLabel}` : conversionId,
      value: value || 1,
      currency: 'EUR'
    });
  }
};

export const trackLeadFormSubmission = (
  gemeente?: string,
  service?: string
) => {
  // Always track lead submission (business critical), but respect consent for detailed tracking
  if (checkAnalyticsConsent()) {
    trackEvent('lead_form_submission', {
      event_category: 'engagement',
      event_label: 'contact_form',
      gemeente: gemeente,
      service: service,
      value: 1
    });
    
    // Also track as conversion
    trackConversion('AW-CONVERSION_ID', 'LEAD_CONVERSION_LABEL');
  } else {
    // Basic tracking without personal data when consent not given
    console.log('Lead form submitted (analytics consent not given)');
  }
};

export const trackPhoneClick = (source: string = 'unknown') => {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: 'phone_number',
    source: source
  });
};

export const trackWhatsAppClick = (source: string = 'floating_button') => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'whatsapp_button',
    source: source
  });
};

export const trackEmailClick = (source: string = 'unknown') => {
  trackEvent('email_click', {
    event_category: 'engagement',
    event_label: 'email_link',
    source: source
  });
};

export const trackServicePageView = (serviceName: string) => {
  trackEvent('service_page_view', {
    event_category: 'page_view',
    event_label: serviceName,
    service_type: serviceName
  });
};

export const trackGemeentePageView = (gemeente: string) => {
  trackEvent('gemeente_page_view', {
    event_category: 'page_view',
    event_label: gemeente,
    gemeente: gemeente
  });
};

export const trackArticleView = (articleTitle: string, category?: string) => {
  trackEvent('article_view', {
    event_category: 'content',
    event_label: articleTitle,
    article_category: category
  });
};

// Update consent function (called from cookie banner)
export const updateAnalyticsConsent = (granted: boolean) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('GoogleAnalytics: Updating consent to', granted);
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied'
    });
    if (process.env.NODE_ENV === 'development') {
      console.log('GoogleAnalytics: Consent updated successfully');
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.warn('GoogleAnalytics: gtag not available for consent update');
  }
};

// Debug function to check GA status
export const debugGA = () => {
  console.log('=== Google Analytics Debug Info ===');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Analytics in dev enabled:', process.env.ENABLE_ANALYTICS_IN_DEV);
  console.log('GA4 Measurement ID:', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID);
  console.log('dataLayer exists:', typeof window.dataLayer !== 'undefined');
  console.log('gtag function exists:', typeof window.gtag !== 'undefined'); 
  console.log('dataLayer length:', window.dataLayer?.length || 0);
  console.log('dataLayer contents:', window.dataLayer);
  
  // Check script loading
  const script = document.querySelector('script[src*="googletagmanager.com/gtag"]');
  console.log('GA script element found:', !!script);
  if (script) {
    console.log('GA script src:', script.getAttribute('src'));
    console.log('GA script loaded:', script.hasAttribute('defer') ? 'deferred' : 'loaded');
  }
  
  // Check consent status
  const consent = localStorage.getItem('cookie_consent_preferences');
  console.log('Cookie consent stored:', !!consent);
  if (consent) {
    try {
      const parsed = JSON.parse(consent);
      console.log('Analytics consent granted:', parsed.analytics);
    } catch (e) {
      console.log('Error parsing consent:', e);
    }
  }
  
  // Force send test events to verify network connectivity
  if (window.gtag) {
    const testId = Date.now();
    // Send multiple test events
    window.gtag('event', 'debug_test', {
      event_category: 'debug',
      event_label: 'console_test_' + testId,
      debug_mode: true
    });
    
    // Send a page view
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      debug_mode: true
    });
    
    // Send a custom event 
    window.gtag('event', 'manual_test_event', {
      event_category: 'test',
      event_label: 'manual_debug_' + testId,
      value: 1
    });
    
    console.log('✅ Multiple test events sent with ID:', testId);
    console.log('Check Network tab for requests to google-analytics.com');
    console.log('Check GA4 Real-time reports in 30-60 seconds');
  } else {
    console.log('❌ gtag function not available - cannot send test event');
  }
  
  // Test various GA endpoints
  const testUrls = [
    'https://www.google-analytics.com/g/collect',
    'https://analytics.google.com/analytics/web/',
    'https://www.googletagmanager.com/gtag/js?id=' + (process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-WZ41C9EYC0')
  ];
  
  console.log('Testing GA endpoint connectivity...');
  testUrls.forEach(url => {
    fetch(url, { mode: 'no-cors' })
      .then(() => console.log(`✅ ${url} - reachable`))
      .catch(err => console.log(`❌ ${url} - error:`, err.message));
  });
  
  console.log('=== End Debug Info ===');
  console.log('Run this again in 60 seconds to check if events appeared in GA4');
};

// Make debug function globally available in development/production
if (typeof window !== 'undefined') {
  (window as any).debugGA = debugGA;
}

export default GoogleAnalytics;