'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ReactGA from 'react-ga4';

/**
 * Google Analytics 4 (GA4) using react-ga4 library
 * 
 * Proven library that handles:
 * - Race conditions
 * - Consent management
 * - Cross-origin requests
 * - All edge cases
 */

interface GoogleAnalyticsProps {
  gaId: string;
}

const GoogleAnalytics = ({ gaId }: GoogleAnalyticsProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('🚨 GA4: No measurement ID provided');
      }
      return;
    }

    // Check consent
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hasAnalyticsConsent = isDevelopment || checkAnalyticsConsent();

    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 GA4 Setup:', {
        measurementId: gaId,
        isDevelopment,
        hasAnalyticsConsent,
        consentStatus: hasAnalyticsConsent ? 'GRANTED' : 'DENIED'
      });
    }

    // Initialize react-ga4
    ReactGA.initialize(gaId, {
      gtagOptions: {
        anonymize_ip: true,
        allow_google_signals: hasAnalyticsConsent,
        allow_ad_personalization_signals: false,
        debug_mode: process.env.NODE_ENV === 'development',
        send_page_view: false, // We'll handle page views manually
      }
    });

    // Set consent
    ReactGA.gtag('consent', 'default', {
      analytics_storage: hasAnalyticsConsent ? 'granted' : 'denied',
      ad_storage: 'denied',
      personalization_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ GA4 Initialized with react-ga4');
      
      // Test event
      ReactGA.event('test_event', {
        event_category: 'development',
        event_label: 'initialization_test',
        value: 1
      });
      
      console.log('🧪 GA4 Test event sent via react-ga4');
    }

  }, [gaId]);

  // Track page views on route change  
  useEffect(() => {
    if (!gaId) return;
    
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hasConsent = isDevelopment || checkAnalyticsConsent();
    
    if (hasConsent) {
      ReactGA.send({ 
        hitType: 'pageview', 
        page: pathname,
        title: document.title
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📄 GA4 Page View:', { path: pathname, title: document.title });
      }
    }
  }, [pathname, gaId]);

  return null; // react-ga4 handles everything internally
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

// Utility functions using react-ga4
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    ReactGA.event(eventName, parameters);
  }
};

export const trackConversion = (
  conversionId: string,
  conversionLabel?: string,
  value?: number
) => {
  if (checkAnalyticsConsent()) {
    ReactGA.gtag('event', 'conversion', {
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
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    ReactGA.event('generate_lead', {
      event_category: 'engagement',
      event_label: gemeente ? `gemeente_${gemeente}` : 'form_submission',
      custom_parameter_1: service || 'general',
      value: 1
    });
  }
};

// Additional tracking functions
export const trackPhoneClick = (phoneNumber?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    ReactGA.event('phone_click', {
      event_category: 'engagement',
      event_label: phoneNumber || 'unknown',
      value: 1
    });
  }
};

export const trackWhatsAppClick = (phoneNumber?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    ReactGA.event('whatsapp_click', {
      event_category: 'engagement',
      event_label: phoneNumber || 'unknown',
      value: 1
    });
  }
};

export const trackEmailClick = (email?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    ReactGA.event('email_click', {
      event_category: 'engagement',
      event_label: email || 'unknown',
      value: 1
    });
  }
};

export const trackServicePageView = (service?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    ReactGA.event('service_page', {
      event_category: 'page_view',
      event_label: service || 'unknown',
      value: 1
    });
  }
};

export const trackGemeentePageView = (gemeente?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    ReactGA.event('gemeente_page', {
      event_category: 'page_view',
      event_label: gemeente || 'unknown',
      value: 1
    });
  }
};

export const trackArticleView = (article?: string, category?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    ReactGA.event('article_view', {
      event_category: 'content',
      event_label: article || 'unknown',
      custom_parameter_1: category || 'general',
      value: 1
    });
  }
};

// Function to update analytics consent and reinitialize if needed
export const updateAnalyticsConsent = (hasConsent: boolean) => {
  if (typeof window === 'undefined') return;
  
  // Update consent via react-ga4
  ReactGA.gtag('consent', 'update', {
    analytics_storage: hasConsent ? 'granted' : 'denied',
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🍪 GA4 Consent Updated:', hasConsent ? 'GRANTED' : 'DENIED');
  }
};

export default GoogleAnalytics;