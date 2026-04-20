'use client';

import { useState } from 'react';
import { 
  trackEvent, 
  trackConversion, 
  trackLeadFormSubmission,
  trackPhoneClick,
  trackWhatsAppClick,
  trackEmailClick,
  trackServicePageView,
  trackGemeentePageView,
  trackArticleView 
} from '../components/GoogleAnalytics';

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

export default function GA4TestPage() {
  const [eventLog, setEventLog] = useState<string[]>([]);
  const analyticsWindow = typeof window !== 'undefined' ? (window as AnalyticsWindow) : undefined;
  
  const logEvent = (eventName: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog(prev => [`${timestamp}: ${eventName}`, ...prev]);
  };

  const testBasicEvent = () => {
    trackEvent('test_basic_event', {
      event_category: 'test',
      event_label: 'manual_test',
      value: 1
    });
    logEvent('Basic Event fired');
  };

  const testLeadFormEvent = () => {
    trackLeadFormSubmission('Leeuwarden', 'Tuinonderhoud');
    logEvent('Lead form submission tracked');
  };

  const testPhoneEvent = () => {
    trackPhoneClick('test_page');
    logEvent('Phone click tracked');
  };

  const testWhatsAppEvent = () => {
    trackWhatsAppClick('test_page');
    logEvent('WhatsApp click tracked');
  };

  const testEmailEvent = () => {
    trackEmailClick('test_page');
    logEvent('Email click tracked');
  };

  const testServiceView = () => {
    trackServicePageView('Test Service');
    logEvent('Service page view tracked');
  };

  const testGemeenteView = () => {
    trackGemeentePageView('Test Gemeente');
    logEvent('Gemeente page view tracked');
  };

  const testArticleView = () => {
    trackArticleView('Test Article', 'tuinonderhoud');
    logEvent('Article view tracked');
  };

  const testConversion = () => {
    trackConversion('AW-TEST-ID', 'TEST_LABEL', 50);
    logEvent('Conversion tracked');
  };

  const testCustomEvent = () => {
    trackEvent('custom_test_event', {
      event_category: 'testing',
      event_label: 'custom_manual_test',
      custom_parameter_1: 'test_value',
      value: 42
    });
    logEvent('Custom event fired via trackEvent');
  };

  const clearLog = () => {
    setEventLog([]);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#2c5530' }}>
        GA4 Event Testing Page
      </h1>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #0369a1' }}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#0369a1' }}>Instructions:</h2>
        <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>Open browser DevTools → Network tab</li>
          <li>Filter by &quot;google-analytics&quot; or &quot;collect&quot;</li>
          <li>Click test buttons below</li>
          <li>Check for network requests to GA4</li>
          <li>Also check GA4 Real-time view in dashboard</li>
        </ol>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        
        {/* Basic Events */}
        <button 
          onClick={testBasicEvent}
          style={{ padding: '1rem', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Test Basic Event
        </button>

        <button 
          onClick={testLeadFormEvent}
          style={{ padding: '1rem', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Test Lead Form
        </button>

        <button 
          onClick={testPhoneEvent}
          style={{ padding: '1rem', backgroundColor: '#7c3aed', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Test Phone Click
        </button>

        <button 
          onClick={testWhatsAppEvent}
          style={{ padding: '1rem', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Test WhatsApp
        </button>

        {/* Interaction Events */}
        <button 
          onClick={testEmailEvent}
          style={{ padding: '1rem', backgroundColor: '#ea580c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Test Email Click
        </button>

        <button 
          onClick={testServiceView}
          style={{ padding: '1rem', backgroundColor: '#0369a1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Test Service View
        </button>

        <button 
          onClick={testGemeenteView}
          style={{ padding: '1rem', backgroundColor: '#7c2d12', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Test Gemeente View
        </button>

        <button 
          onClick={testArticleView}
          style={{ padding: '1rem', backgroundColor: '#be185d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Test Article View
        </button>

        {/* Advanced Events */}
        <button 
          onClick={testConversion}
          style={{ padding: '1rem', backgroundColor: '#b91c1c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Test Conversion
        </button>

        <button 
          onClick={testCustomEvent}
          style={{ padding: '1rem', backgroundColor: '#4338ca', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Test Custom Event
        </button>

        <button 
          onClick={clearLog}
          style={{ padding: '1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Clear Log
        </button>
      </div>

      {/* Event Log */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Event Log:</h3>
        <div style={{ 
          background: '#f9fafb', 
          border: '1px solid #d1d5db', 
          borderRadius: '8px', 
          padding: '1rem', 
          minHeight: '200px',
          maxHeight: '400px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          {eventLog.length === 0 ? (
            <p style={{ color: '#6b7280', margin: 0 }}>No events fired yet. Click buttons above to test.</p>
          ) : (
            eventLog.map((log, index) => (
              <div key={index} style={{ marginBottom: '4px', color: '#374151' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Environment Info */}
      <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#92400e' }}>Environment Info:</h3>
        <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
          <div>GA4 ID: {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'NOT SET'}</div>
          <div>NODE_ENV: {process.env.NODE_ENV}</div>
          <div>Analytics in Dev: {process.env.ENABLE_ANALYTICS_IN_DEV || 'false'}</div>
          <div>Base URL: {process.env.NEXT_PUBLIC_BASE_URL || 'not set'}</div>
          <div>User Agent: {typeof window !== 'undefined' ? window.navigator.userAgent.substring(0, 80) + '...' : 'Server'}</div>
          <div>gtag available: {typeof analyticsWindow?.gtag === 'function' ? '✅ Yes' : '❌ No'}</div>
          <div>dataLayer: {Array.isArray(analyticsWindow?.dataLayer) ? `✅ ${analyticsWindow.dataLayer.length} items` : '❌ No'}</div>
        </div>
      </div>

      {/* Network Debug Info */}
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #10b981' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#065f46' }}>Debug Tips:</h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#065f46' }}>
          <li>Open DevTools → Network tab</li>
          <li>Filter by &quot;google-analytics.com&quot; or &quot;collect&quot;</li>
          <li>Look for POST requests to collect endpoint</li>
          <li>Check GA4 → Reports → Realtime for live data</li>
          <li>Events may take 1-2 minutes to appear in GA4</li>
        </ul>
      </div>
    </div>
  );
}
