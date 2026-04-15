"use client";
import { Suspense, lazy, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { trackLeadFormSubmission } from './GoogleAnalytics';
import { submitLeadToPrometheus } from '../services/prometheus';
import { localizePath, type SupportedLocale } from '@/lib/locale-utils';
import { newLeadFormSchema, type NewLeadFormData } from '@/lib/validation';
import { useFormValidation } from '@/lib/hooks/useFormValidation';
import { FormField, FormErrorSummary, FormLoadingSpinner } from './FormValidation';
import CustomSelect from './CustomSelect';
import { securityKeys } from '@/lib/env';

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
    select_municipality: string;
    what_do_you_need: string;
    your_company: string;
    loading: string;
    privacy_agreement: string;
    privacy_link: string;
    privacy_consent: string;
    services: {
      tuinonderhoud: string;
      tuinontwerp: string;
      'tuin-aanleggen': string;
      stratenmaker: string;
      groendak: string;
      overig: string;
    };
  };
  locale: string;
  prefillMunicipality?: string;
  serviceType?: string;
}

const gemeenten = [
  "Leeuwarden", "Súdwest-Fryslân", "Smallingerland", "Heerenveen", 
  "Achtkarspelen", "Tietjerksteradiel", "Dantumadiel", "De Fryske Marren", 
  "Waadhoeke", "Noardeast-Fryslân", "Harlingen"
];

const TurnstileWidget = lazy(async () => {
  const module = await import('@marsidev/react-turnstile');
  return { default: module.Turnstile };
});

export default function NewLeadForm({ translations, locale, prefillMunicipality, serviceType }: LeadFormProps) {
  const services = [
    { value: "tuinonderhoud", label: translations.services.tuinonderhoud },
    { value: "tuinontwerp", label: translations.services.tuinontwerp }, 
    { value: "tuin-aanleggen", label: translations.services['tuin-aanleggen'] },
    { value: "stratenmaker", label: translations.services.stratenmaker },
    { value: "groendak", label: translations.services.groendak },
    { value: "overig", label: translations.services.overig }
  ];
  
  const [naam, setNaam] = useState("");
  const [gemeente, setGemeente] = useState(prefillMunicipality || "");
  const [dienst, setDienst] = useState(serviceType === 'groendak' ? 'groendak' : '');
  const [telefoon, setTelefoon] = useState("");
  const [bericht, setBericht] = useState("");
  const [postcode, setPostcode] = useState("");
  const [bedrijf, setBedrijf] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isDevelopment, setIsDevelopment] = useState(false);
  const router = useRouter();

  // Set development mode on client side
  useEffect(() => {
    setIsDevelopment(process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost');
    if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
      console.log('Development mode detected, Turnstile will be bypassed');
    }
  }, []);

  const {
    handleSubmit,
    handleFieldChange,
    getError,
    hasError,
    isValidating,
    errors
  } = useFormValidation<NewLeadFormData>({
    schema: newLeadFormSchema,
    validateOnChange: false,
    onSuccess: async (validatedData) => {
      try {
        // Track form submission immediately
        trackLeadFormSubmission(validatedData.gemeente, validatedData.dienst);
        
        // Submit to Prometheus service
        const leadData = {
          ...validatedData,
          locale,
          timestamp: new Date().toISOString(),
          source: 'website_form'
        };
        
        const result = await submitLeadToPrometheus(leadData);
        
        if (result.success) {
          console.log('Lead submitted successfully:', result.leadId);
          router.push(localizePath('/bedankt', locale as SupportedLocale));
        } else {
          console.warn('Lead submission had issues:', result.error);
          router.push(localizePath('/bedankt', locale as SupportedLocale));
        }
        
      } catch (error) {
        console.error('Form submission error:', error);
        router.push(localizePath('/bedankt', locale as SupportedLocale));
      }
    },
    onError: (errors) => {
      console.error('Validation errors:', errors);
    }
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      naam,
      gemeente,
      dienst,
      telefoon,
      bericht,
      postcode,
      bedrijf,
      privacy,
      honeypot,
      turnstileToken: turnstileToken || (isDevelopment ? 'dev-bypass' : ''),
    };

    await handleSubmit(formData);
  };

  // Update field change handlers to include validation
  const updateField = (field: string, value: string | boolean) => {
    handleFieldChange(field, value);
    switch (field) {
      case 'naam': setNaam(String(value)); break;
      case 'gemeente': setGemeente(String(value)); break;
      case 'dienst': setDienst(String(value)); break;
      case 'telefoon': setTelefoon(String(value)); break;
      case 'bericht': setBericht(String(value)); break;
      case 'postcode': setPostcode(String(value)); break;
      case 'bedrijf': setBedrijf(String(value)); break;
      case 'privacy': setPrivacy(Boolean(value)); break;
    }
  };

  return (
    <>
      <p className="form-eyebrow">{translations.form_eyebrow}</p>
      <h2 className="form-title">{translations.form_title}</h2>
      <p className="form-sub">{translations.form_subtitle}</p>
      
      <FormErrorSummary errors={errors} />
      
      <form onSubmit={onSubmit} noValidate>
        <FormField 
          fieldName="naam" 
          label={translations.your_name}
          error={getError('naam')}
          required
        >
          <input 
            className={`form-input ${hasError('naam') ? 'border-red-500' : ''}`}
            type="text" 
            id="naam" 
            name="naam" 
            placeholder={locale === 'en' ? 'John Smith' : 'Jan de Vries'} 
            value={naam}
            onChange={(e) => updateField('naam', e.target.value)}
            required 
            autoComplete="name"
            aria-invalid={hasError('naam')}
            aria-describedby={hasError('naam') ? 'naam-error' : undefined}
          />
        </FormField>

        <div className="form-row">
          <FormField 
            fieldName="gemeente" 
            label={translations.municipality}
            error={getError('gemeente')}
            required
            className="flex-1"
          >
            <CustomSelect
              id="gemeente"
              label={translations.select_municipality}
              value={gemeente}
              onChange={(val) => updateField('gemeente', val)}
              variant="form"
              options={[
                { value: '', label: translations.select_municipality },
                ...gemeenten.map(g => ({ value: g, label: g })),
              ]}
            />
          </FormField>

          <FormField 
            fieldName="dienst" 
            label={translations.service}
            error={getError('dienst')}
            required
            className="flex-1"
          >
            <CustomSelect
              id="dienst"
              label={translations.what_do_you_need}
              value={dienst}
              onChange={(val) => updateField('dienst', val)}
              variant="form"
              options={[
                { value: '', label: translations.what_do_you_need },
                ...services.map(s => ({ value: s.value, label: s.label })),
              ]}
            />
          </FormField>
        </div>

        <FormField 
          fieldName="telefoon" 
          label={translations.phone_number}
          error={getError('telefoon')}
          required
        >
          <input 
            className={`form-input ${hasError('telefoon') ? 'border-red-500' : ''}`}
            type="tel" 
            id="telefoon" 
            name="telefoon" 
            placeholder="06 12345678" 
            value={telefoon}
            onChange={(e) => updateField('telefoon', e.target.value)}
            required 
            autoComplete="tel"
            aria-invalid={hasError('telefoon')}
            aria-describedby={hasError('telefoon') ? 'telefoon-error' : undefined}
          />
        </FormField>

        <FormField 
          fieldName="bericht" 
          label={locale === 'en' ? 'Describe your wishes' : 'Beschrijf uw wensen'}
          error={getError('bericht')}
          required
        >
          <textarea 
            className={`form-input ${hasError('bericht') ? 'border-red-500' : ''}`}
            id="bericht" 
            name="bericht" 
            placeholder={locale === 'en' ? 'Tell us about your garden wishes...' : 'Vertel ons over uw tuinwensen...'}
            value={bericht}
            onChange={(e) => updateField('bericht', e.target.value)}
            rows={4}
            required
            aria-invalid={hasError('bericht')}
            aria-describedby={hasError('bericht') ? 'bericht-error' : undefined}
          />
        </FormField>

        <div className="form-row">
          <FormField 
            fieldName="postcode" 
            label={locale === 'en' ? 'Postcode (optional)' : 'Postcode (optioneel)'}
            error={getError('postcode')}
            className="flex-1"
          >
            <input 
              className={`form-input ${hasError('postcode') ? 'border-red-500' : ''}`}
              type="text" 
              id="postcode" 
              name="postcode" 
              placeholder="1234 AB" 
              value={postcode}
              onChange={(e) => updateField('postcode', e.target.value)}
              autoComplete="postal-code"
              aria-invalid={hasError('postcode')}
              aria-describedby={hasError('postcode') ? 'postcode-error' : undefined}
            />
          </FormField>

          <FormField 
            fieldName="bedrijf" 
            label={locale === 'en' ? 'Company (optional)' : 'Bedrijf (optioneel)'}
            error={getError('bedrijf')}
            className="flex-1"
          >
            <input 
              className={`form-input ${hasError('bedrijf') ? 'border-red-500' : ''}`}
              type="text" 
              id="bedrijf" 
              name="bedrijf" 
              placeholder={translations.your_company} 
              value={bedrijf}
              onChange={(e) => updateField('bedrijf', e.target.value)}
              autoComplete="organization"
              aria-invalid={hasError('bedrijf')}
              aria-describedby={hasError('bedrijf') ? 'bedrijf-error' : undefined}
            />
          </FormField>
        </div>

        <FormField 
          fieldName="privacy" 
          error={getError('privacy')}
        >
          <label className="form-checkbox-row">
            <input 
              type="checkbox" 
              id="privacy" 
              name="privacy" 
              checked={privacy}
              onChange={(e) => updateField('privacy', e.target.checked)}
              required
              className="form-checkbox"
              aria-invalid={hasError('privacy')}
              aria-describedby={hasError('privacy') ? 'privacy-error' : undefined}
            />
            <span className={`form-checkbox-text ${hasError('privacy') ? 'text-red-600' : ''}`}>
              {translations.privacy_agreement}{' '}
              <a href={localizePath('/privacy-beleid', locale as SupportedLocale)} 
                 target="_blank" 
                 rel="noopener noreferrer">
                {translations.privacy_link}
              </a>
              {' '}{translations.privacy_consent}
            </span>
          </label>
        </FormField>
        
        {/* Keep honeypot field hidden */}
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
        <FormField 
          fieldName="turnstileToken"
          error={getError('turnstileToken')}
        >
          {isDevelopment ? (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
              {locale === 'en'
                ? '⚠️ Development mode: Turnstile CAPTCHA bypassed for testing'
                : '⚠️ Ontwikkelmodus: Turnstile CAPTCHA overgeslagen voor testen'}
            </div>
          ) : (
            <Suspense fallback={<div className="form-note">{locale === 'en' ? 'Loading security check...' : 'Beveiligingscontrole laden...'}</div>}>
              <TurnstileWidget
                siteKey={securityKeys.turnstile.siteKey}
                onSuccess={setTurnstileToken}
                onError={() => setTurnstileToken(null)}
                onExpire={() => setTurnstileToken(null)}
              />
            </Suspense>
          )}
        </FormField>
        
        <button 
          type="submit" 
          className="form-btn" 
          disabled={isValidating || (!turnstileToken && !isDevelopment)}
        >
          {isValidating ? (
            <span className="flex items-center justify-center gap-2">
              <FormLoadingSpinner size="sm" />
              {translations.loading}
            </span>
          ) : (
            `${translations.send_request} →`
          )}
        </button>
        
        <p className="form-note">{translations.form_note}</p>
      </form>
    </>
  );
}
