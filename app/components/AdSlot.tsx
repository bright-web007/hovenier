'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const MARKETING_CONSENT_EVENT = 'marketing-consent-changed';

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

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSlot({
  slot,
  format = 'auto',
  className,
  style,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const requestedRef = useRef(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';

  useEffect(() => {
    if (!clientId || !slot || !hasMarketingConsent() || requestedRef.current || !adRef.current) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      requestedRef.current = true;
    } catch (error) {
      console.error('Failed to initialize AdSense slot:', error);
    }
  }, [clientId, slot]);

  useEffect(() => {
    if (requestedRef.current || !clientId || !slot) {
      return;
    }

    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ granted?: boolean }>;
      if (!customEvent.detail?.granted || requestedRef.current || !adRef.current) {
        return;
      }

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        requestedRef.current = true;
      } catch (error) {
        console.error('Failed to initialize AdSense slot after consent:', error);
      }
    };

    window.addEventListener(MARKETING_CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(MARKETING_CONSENT_EVENT, handleConsentChange);
  }, [clientId, slot]);

  if (!clientId || !slot) {
    return null;
  }

  const resolvedStyle: React.CSSProperties = {
    display: 'block',
    minHeight: format === 'horizontal' ? '120px' : '280px',
    ...style,
  };

  return (
    <div
      className={className}
      style={{
        borderRadius: '16px',
        background: 'var(--cream-light)',
        padding: '1rem',
      }}
    >
      <span
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          color: 'var(--forest-mid)',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Advertentie
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={resolvedStyle}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format === 'rectangle' || format === 'horizontal' ? undefined : format}
        data-full-width-responsive={format === 'horizontal' ? undefined : 'true'}
      />
    </div>
  );
}
