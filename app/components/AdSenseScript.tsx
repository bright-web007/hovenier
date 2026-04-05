'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const MARKETING_CONSENT_EVENT = 'marketing-consent-changed';
let scriptLoaded = false;

function hasMarketingConsent() {
  if (typeof window === 'undefined') {
    return false;
  }

  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  try {
    const consent = localStorage.getItem('cookie_consent_preferences');
    if (!consent) {
      return false;
    }

    const preferences = JSON.parse(consent);
    return preferences.marketing === true;
  } catch (error) {
    console.warn('Error checking marketing consent:', error);
    return false;
  }
}

function loadAdSenseScript(clientId: string) {
  if (typeof window === 'undefined' || scriptLoaded || !clientId) {
    return;
  }

  scriptLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
  document.head.appendChild(script);
}

interface AdSenseScriptProps {
  clientId: string;
}

export default function AdSenseScript({ clientId }: AdSenseScriptProps) {
  useEffect(() => {
    if (!clientId || !hasMarketingConsent()) {
      return;
    }

    loadAdSenseScript(clientId);
  }, [clientId]);

  useEffect(() => {
    if (!clientId) {
      return;
    }

    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ granted?: boolean }>;
      if (customEvent.detail?.granted) {
        loadAdSenseScript(clientId);
      }
    };

    window.addEventListener(MARKETING_CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(MARKETING_CONSENT_EVENT, handleConsentChange);
  }, [clientId]);

  return null;
}
