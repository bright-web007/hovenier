// Prometheus service integration for lead form submissions
// This is a stub implementation - replace with actual Prometheus API endpoints

import ReactGA from 'react-ga4';

interface LeadData {
  naam: string;
  gemeente: string;
  dienst: string;
  telefoon: string;
  turnstileToken: string;
  locale: string;
  timestamp: string;
  source?: string;
}

interface PrometheusResponse {
  success: boolean;
  message: string;
  leadId?: string;
  error?: string;
}

// Main lead submission function
export async function submitLeadToPrometheus(leadData: LeadData): Promise<PrometheusResponse> {
  try {
    // TODO: Replace with actual Prometheus API endpoint
    const PROMETHEUS_API_ENDPOINT = process.env.PROMETHEUS_LEAD_ENDPOINT || 'https://api.prometheus.example/leads';
    const API_KEY = process.env.PROMETHEUS_API_KEY || '';

    console.log('📤 Submitting lead to Prometheus:', {
      ...leadData,
      telefoon: leadData.telefoon.replace(/\d(?=\d{4})/g, '*') // Mask phone for logging
    });

    const response = await fetch(PROMETHEUS_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-API-Version': '1.0',
      },
      body: JSON.stringify({
        ...leadData,
        version: '1.0',
        platform: 'hovenier.frl'
      }),
    });

    if (!response.ok) {
      throw new Error(`Prometheus API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('✅ Lead submitted successfully to Prometheus:', result.leadId || 'Unknown ID');
    
    return {
      success: true,
      message: 'Lead submitted successfully',
      leadId: result.leadId || generateTempLeadId()
    };

  } catch (error) {
    console.error('❌ Prometheus submission error:', error);
    
    // Fallback: Store in localStorage for development
    storeLeadOffline(leadData);

    return {
      success: false,
      message: 'Er is een probleem opgetreden. We nemen zo snel mogelijk contact met u op.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Fallback function for offline storage during development
function storeLeadOffline(leadData: LeadData) {
  try {
    const existingLeads = JSON.parse(localStorage.getItem('offline_leads') || '[]');
    existingLeads.push({
      ...leadData,
      storedAt: new Date().toISOString(),
      status: 'pending_submission'
    });
    localStorage.setItem('offline_leads', JSON.stringify(existingLeads));
    console.log('💾 Lead stored offline for later submission');
  } catch (e) {
    console.warn('Could not store lead offline:', e);
  }
}

// Utility function to generate temporary lead ID
function generateTempLeadId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `temp_${timestamp}_${random}`;
}

// Function to validate Turnstile token with Cloudflare
export async function validateTurnstileToken(token: string): Promise<boolean> {
  try {
    // This would typically be done on the server-side
    // For now, just validate token format
    return !!(token && token.length > 10);
  } catch (error) {
    console.error('Turnstile validation error:', error);
    return false;
  }
}

// Email notification function (stub)
export async function sendLeadNotification(leadData: LeadData): Promise<void> {
  try {
    // TODO: Implement email notification via Prometheus or separate service
    console.log('📧 Email notification would be sent for lead:', leadData.naam);
    
    // In production, this would integrate with:
    // - Prometheus notification system
    // - Email service (SendGrid, Resend, etc.)  
    // - WhatsApp notifications
    // - CRM integration
    
  } catch (error) {
    console.error('Email notification error:', error);
  }
}

// Lead analytics tracking
export function trackLeadSubmission(leadData: LeadData) {
  // Track with GA4 using react-ga4 library
  if (typeof window !== 'undefined') {
    ReactGA.event('lead_submission', {
      event_category: 'engagement',
      gemeente: leadData.gemeente,
      service: leadData.dienst,
      source: leadData.source || 'website_form',
      value: 1
    });
  }
}

export default {
  submitLeadToPrometheus,
  validateTurnstileToken,
  sendLeadNotification,
  trackLeadSubmission
};