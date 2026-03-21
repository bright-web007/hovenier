"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Turnstile } from '@marsidev/react-turnstile';
import { trackLeadFormSubmission } from './GoogleAnalytics';
import { submitLeadToPrometheus } from '../services/prometheus';

interface LeadFormProps {
  translations: {
    form_eyebrow: string;
    form_title: string;
    form_subtitle: string;
    your_name: string;
    municipality: string;
    service: string;
    phone_number: string;
    send_request: string;
    form_note: string;
  };
  locale: string;
  prefillMunicipality?: string;
}

const gemeenten = [
  "Leeuwarden", "Súdwest-Fryslân", "Smallingerland", "Heerenveen", 
  "Achtkarspelen", "Tietjerksteradiel", "Dantumadiel", "De Fryske Marren", 
  "Waadhoeke", "Noardeast-Fryslân", "Harlingen"
];

const services = [
  "Tuinonderhoud", "Tuinontwerp", "Groendak", "Beplanting", "Snoeien", "Anders"
];

export default function NewLeadForm({ translations, locale, prefillMunicipality }: LeadFormProps) {
  const [naam, setNaam] = useState("");
  const [gemeente, setGemeente] = useState(prefillMunicipality || "");
  const [dienst, setDienst] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Honeypot check
    if (honeypot) return;
    
    // Turnstile validation
    if (!turnstileToken) {
      alert("Please complete the security verification.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Track form submission immediately
      trackLeadFormSubmission(gemeente, dienst);
      
      // Submit to Prometheus service
      const leadData = {
        naam,
        gemeente,
        dienst,
        telefoon,
        turnstileToken,
        locale,
        timestamp: new Date().toISOString(),
        source: 'website_form'
      };
      
      const result = await submitLeadToPrometheus(leadData);
      
      if (result.success) {
        console.log('Lead submitted successfully:', result.leadId);
        // Redirect to thank you page
        router.push(`/${locale}/bedankt`);
      } else {
        // Show error but still redirect (service handles fallbacks)
        console.warn('Lead submission had issues:', result.error);
        router.push(`/${locale}/bedankt`);
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      // Still redirect to thank you page - service handles error cases
      router.push(`/${locale}/bedankt`);
    }
  }

  return (
    <>
      <p className="form-eyebrow">{translations.form_eyebrow}</p>
      <h2 className="form-title">{translations.form_title}</h2>
      <p className="form-sub">{translations.form_subtitle}</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label className="form-label" htmlFor="naam">{translations.your_name}</label>
          <input 
            className="form-input" 
            type="text" 
            id="naam" 
            name="naam" 
            placeholder="Jan de Vries" 
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            required 
            autoComplete="name"
          />
        </div>
        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="gemeente">{translations.municipality}</label>
            <select 
              className="form-select" 
              id="gemeente" 
              name="gemeente" 
              value={gemeente}
              onChange={(e) => setGemeente(e.target.value)}
              required
            >
              <option value="" disabled>Selecteer gemeente</option>
              {gemeenten.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="dienst">{translations.service}</label>
            <select 
              className="form-select" 
              id="dienst" 
              name="dienst" 
              value={dienst}
              onChange={(e) => setDienst(e.target.value)}
              required
            >
              <option value="" disabled>Wat heeft u nodig?</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="telefoon">{translations.phone_number}</label>
          <input 
            className="form-input" 
            type="tel" 
            id="telefoon" 
            name="telefoon" 
            placeholder="+31 6 00 00 00 00" 
            value={telefoon}
            onChange={(e) => setTelefoon(e.target.value)}
            required 
            autoComplete="tel"
          />
        </div>
        <input 
          type="text" 
          name="_honeypot" 
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{display:'none'}} 
          tabIndex={-1} 
          autoComplete="off"
        />
        
        {/* Turnstile Security Verification */}
        <div className="form-field">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || ''}
            onSuccess={setTurnstileToken}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
            theme="light"
            size="normal"
          />
        </div>
        
        <button type="submit" className="form-btn" disabled={isSubmitting || !turnstileToken}>
          {isSubmitting ? 'Bezig...' : `${translations.send_request} →`}
        </button>
        <p className="form-note">{translations.form_note}</p>
      </form>
    </>
  );
}