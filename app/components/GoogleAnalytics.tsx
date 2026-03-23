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
    }

    // Initialize dataLayer if not exists
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    // Initialize gtag function
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    window.gtag = gtag;

    // Always initialize gtag, but with consent settings
    gtag('js', new Date());
    
    // Check consent for production, allow in development
    const isDevelopment = process.env.NODE_ENV === 'development' && process.env.ENABLE_ANALYTICS_IN_DEV === 'true';
    const hasAnalyticsConsent = isDevelopment || checkAnalyticsConsent();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('GoogleAnalytics: Consent status -', { isDevelopment, hasAnalyticsConsent });
    }
    
    // Set initial consent state
    gtag('consent', 'default', {
      analytics_storage: hasAnalyticsConsent ? 'granted' : 'denied',
      ad_storage: 'denied', // Start with denied, update after consent
      personalization_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    });

    // Configure GA4 - this should always run to set up the measurement
    gtag('config', gaId, {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: true, // GDPR compliance
      allow_google_signals: hasAnalyticsConsent,
      allow_ad_personalization_signals: false, // Default to false
    });

    // Setup enhanced ecommerce and conversion tracking
    gtag('config', gaId, {
      custom_map: {
        'custom_parameter_1': 'lead_type'
      }
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('GoogleAnalytics: Initialization complete');
    }

  }, [gaId]);

  // Track page views on route change
  useEffect(() => {
    if (!gaId || !window.gtag) return;
    
    // Only track if analytics consent is given (or in development)
    const isDevelopment = process.env.NODE_ENV === 'development' && process.env.ENABLE_ANALYTICS_IN_DEV === 'true';
    if (isDevelopment || checkAnalyticsConsent()) {
      window.gtag('config', gaId, {
        page_path: pathname,
        page_title: document.title,
      });
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
        onLoad={() => process.env.NODE_ENV === 'development' && console.log('GoogleAnalytics: Script loaded successfully')}
        onError={(e) => console.error('GoogleAnalytics: Script failed to load', e)}
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
  console.log('=== Google Analytics Debug ===');
  console.log('dataLayer exists:', typeof window.dataLayer !== 'undefined');
  console.log('gtag function exists:', typeof window.gtag !== 'undefined');
  console.log('dataLayer contents:', window.dataLayer);
  
  // Test if we can send a test event
  if (window.gtag) {
    window.gtag('event', 'debug_test', {
      event_category: 'debug',
      event_label: 'console_test'
    });
    console.log('Test event sent');
  }
  
  // Check script loading
  const script = document.querySelector('script[src*="googletagmanager.com/gtag"]');
  console.log('GA script element:', script);
  console.log('GA script loaded:', script ? 'YES' : 'NO');
};

// Make debug function globally available in development/production
if (typeof window !== 'undefined') {
  (window as any).debugGA = debugGA;
}

export default GoogleAnalytics;