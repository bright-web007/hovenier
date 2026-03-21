'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

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
    if (!gaId) return;

    // Initialize dataLayer if not exists
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    // Initialize gtag function
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    window.gtag = gtag;

    // Check cookie consent before initializing
    const hasAnalyticsConsent = checkAnalyticsConsent();
    
    // Initialize GA4 with consent settings
    gtag('js', new Date());
    gtag('consent', 'default', {
      analytics_storage: hasAnalyticsConsent ? 'granted' : 'denied',
      ad_storage: 'denied', // Start with denied, update after consent
      personalization_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    });

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

  }, [gaId]);

  // Track page views on route change
  useEffect(() => {
    if (!gaId || !window.gtag) return;
    
    // Only track if analytics consent is given
    if (checkAnalyticsConsent()) {
      window.gtag('config', gaId, {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname, gaId]);

  // Don't render anything in development unless explicitly enabled
  if (process.env.NODE_ENV === 'development' && !process.env.ENABLE_ANALYTICS_IN_DEV) {
    return null;
  }

  return (
    <>
      {/* Google Analytics gtag.js */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
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

// Utility functions for tracking events (with consent check)
export const trackEvent = (
  eventName: string,
  parameters: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (typeof window !== 'undefined' && window.gtag && checkAnalyticsConsent()) {
    window.gtag('event', eventName, {
      ...parameters,
      // Add privacy-conscious settings
      send_page_view: false,
      anonymize_ip: true
    });
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
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied'
    });
  }
};

export default GoogleAnalytics;