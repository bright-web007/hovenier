'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface GoogleAnalyticsProps {
  gaId: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const ANALYTICS_CONSENT_EVENT = 'analytics-consent-changed';
let analyticsLoaded = false;
let analyticsInitialized = false;

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

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

function loadAnalyticsScript(gaId: string) {
  if (typeof window === 'undefined' || !gaId || analyticsLoaded) return;

  analyticsLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);
}

function initializeAnalytics(gaId: string, hasConsent: boolean) {
  if (typeof window === 'undefined' || !gaId) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('consent', 'default', {
    analytics_storage: hasConsent ? 'granted' : 'denied',
    ad_storage: 'denied',
    personalization_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  });

  if (!analyticsInitialized) {
    gtag('config', gaId, {
      anonymize_ip: true,
      allow_google_signals: hasConsent,
      allow_ad_personalization_signals: false,
      send_page_view: false,
    });
    analyticsInitialized = true;
  }
}

function ensureAnalytics(gaId: string, hasConsent: boolean) {
  if (!gaId || !hasConsent) return;

  const scheduleLoad = () => {
    loadAnalyticsScript(gaId);
    initializeAnalytics(gaId, hasConsent);
  };

  if (typeof window !== 'undefined' && window.requestIdleCallback) {
    window.requestIdleCallback(scheduleLoad, { timeout: 2000 });
    return;
  }

  window.setTimeout(scheduleLoad, 1500);
}

const GoogleAnalytics = ({ gaId }: GoogleAnalyticsProps) => {
  const pathname = usePathname();

  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hasAnalyticsConsent = isDevelopment || checkAnalyticsConsent();
    ensureAnalytics(gaId, hasAnalyticsConsent);
  }, [gaId]);

  useEffect(() => {
    if (!gaId) return;

    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ granted?: boolean }>;
      const granted = customEvent.detail?.granted === true;

      if (granted) {
        ensureAnalytics(gaId, true);
        window.setTimeout(() => {
          window.gtag?.('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title,
          });
        }, 0);
        return;
      }

      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied',
      });
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
  }, [gaId]);

  useEffect(() => {
    if (!gaId) return;

    const isDevelopment = process.env.NODE_ENV === 'development';
    const hasConsent = isDevelopment || checkAnalyticsConsent();

    if (hasConsent) {
      ensureAnalytics(gaId, true);
      window.gtag?.('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname, gaId]);

  return null;
};

export const trackEvent = (
  eventName: string,
  parameters: Record<string, unknown> = {}
) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    window.gtag?.('event', eventName, parameters);
  }
};

export const trackConversion = (
  conversionId: string,
  conversionLabel?: string,
  value?: number
) => {
  if (checkAnalyticsConsent()) {
    window.gtag?.('event', 'conversion', {
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
    window.gtag?.('event', 'generate_lead', {
      event_category: 'engagement',
      event_label: gemeente ? `gemeente_${gemeente}` : 'form_submission',
      custom_parameter_1: service || 'general',
      value: 1
    });
  }
};

export const trackPhoneClick = (phoneNumber?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    window.gtag?.('event', 'phone_click', {
      event_category: 'engagement',
      event_label: phoneNumber || 'unknown',
      value: 1
    });
  }
};

export const trackWhatsAppClick = (phoneNumber?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    window.gtag?.('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: phoneNumber || 'unknown',
      value: 1
    });
  }
};

export const trackEmailClick = (email?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    window.gtag?.('event', 'email_click', {
      event_category: 'engagement',
      event_label: email || 'unknown',
      value: 1
    });
  }
};

export const trackServicePageView = (service?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    window.gtag?.('event', 'service_page', {
      event_category: 'page_view',
      event_label: service || 'unknown',
      value: 1
    });
  }
};

export const trackGemeentePageView = (gemeente?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    window.gtag?.('event', 'gemeente_page', {
      event_category: 'page_view',
      event_label: gemeente || 'unknown',
      value: 1
    });
  }
};

export const trackArticleView = (article?: string, category?: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment || checkAnalyticsConsent()) {
    window.gtag?.('event', 'article_view', {
      event_category: 'content',
      event_label: article || 'unknown',
      custom_parameter_1: category || 'general',
      value: 1
    });
  }
};

export const updateAnalyticsConsent = (hasConsent: boolean) => {
  if (typeof window === 'undefined') return;

  window.gtag?.('consent', 'update', {
    analytics_storage: hasConsent ? 'granted' : 'denied',
  });
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, {
    detail: { granted: hasConsent },
  }));
};

export default GoogleAnalytics;
