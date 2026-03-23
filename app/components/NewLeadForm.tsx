"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Turnstile } from '@marsidev/react-turnstile';
import { trackLeadFormSubmission } from './GoogleAnalytics';
import { submitLeadToPrometheus } from '../services/prometheus';
import { localizePath, type SupportedLocale } from '@/lib/locale-utils';
import { newLeadFormSchema, type NewLeadFormData } from '@/lib/validation';
import { useFormValidation } from '@/lib/hooks/useFormValidation';
import { FormField, FormErrorSummary, FormLoadingSpinner } from './FormValidation';
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

const services = [
  { value: "tuinonderhoud", label: "Tuinonderhoud" },
  { value: "tuinontwerp", label: "Tuinontwerp" }, 
  { value: "tuin-aanleggen", label: "Tuin aanleggen" },
  { value: "stratenmaker", label: "Stratenmaker" },
  { value: "groendak", label: "Groendak" },
  { value: "overig", label: "Anders" }
];

export default function NewLeadForm({ translations, locale, prefillMunicipality, serviceType }: LeadFormProps) {
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
  const router = useRouter();

  const {
    handleSubmit,
    handleFieldChange,
    getError,
    hasError,
    isValidating,
    hasAnyErrors,
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
      turnstileToken: turnstileToken || '',
    };

    await handleSubmit(formData);
  };

  // Update field change handlers to include validation
  const updateField = (field: string, value: any) => {
    handleFieldChange(field, value);
    switch (field) {
      case 'naam': setNaam(value); break;
      case 'gemeente': setGemeente(value); break;
      case 'dienst': setDienst(value); break;
      case 'telefoon': setTelefoon(value); break;
      case 'bericht': setBericht(value); break;
      case 'postcode': setPostcode(value); break;
      case 'bedrijf': setBedrijf(value); break;
      case 'privacy': setPrivacy(value); break;
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
            placeholder="Jan de Vries" 
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
            <select 
              className={`form-select ${hasError('gemeente') ? 'border-red-500' : ''}`}
              id="gemeente" 
              name="gemeente" 
              value={gemeente}
              onChange={(e) => updateField('gemeente', e.target.value)}
              required
              aria-invalid={hasError('gemeente')}
              aria-describedby={hasError('gemeente') ? 'gemeente-error' : undefined}
            >
              <option value="" disabled>Selecteer gemeente</option>
              {gemeenten.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </FormField>

          <FormField 
            fieldName="dienst" 
            label={translations.service}
            error={getError('dienst')}
            required
            className="flex-1"
          >
            <select 
              className={`form-select ${hasError('dienst') ? 'border-red-500' : ''}`}
              id="dienst" 
              name="dienst" 
              value={dienst}
              onChange={(e) => updateField('dienst', e.target.value)}
              required
              aria-invalid={hasError('dienst')}
              aria-describedby={hasError('dienst') ? 'dienst-error' : undefined}
            >
              <option value="" disabled>Wat heeft u nodig?</option>
              {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
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
          label="Beschrijf uw wensen"
          error={getError('bericht')}
          required
        >
          <textarea 
            className={`form-input ${hasError('bericht') ? 'border-red-500' : ''}`}
            id="bericht" 
            name="bericht" 
            placeholder="Vertel ons over uw tuinwensen..."
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
            label="Postcode (optioneel)"
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
            label="Bedrijf (optioneel)"
            error={getError('bedrijf')}
            className="flex-1"
          >
            <input 
              className={`form-input ${hasError('bedrijf') ? 'border-red-500' : ''}`}
              type="text" 
              id="bedrijf" 
              name="bedrijf" 
              placeholder="Uw bedrijf" 
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
          <label className="flex items-start gap-3">
            <input 
              type="checkbox" 
              id="privacy" 
              name="privacy" 
              checked={privacy}
              onChange={(e) => updateField('privacy', e.target.checked)}
              required
              className="mt-1 flex-shrink-0"
              aria-invalid={hasError('privacy')}
              aria-describedby={hasError('privacy') ? 'privacy-error' : undefined}
            />
            <span className={`text-sm ${hasError('privacy') ? 'text-red-600' : 'text-gray-700'}`}>
              Ik ga akkoord met de{' '}
              <a href={localizePath('/privacy-beleid', locale as SupportedLocale)} 
                 className="text-blue-600 underline hover:text-blue-800" 
                 target="_blank" 
                 rel="noopener noreferrer">
                privacyverklaring
              </a>
              {' '}en geef toestemming voor het verwerken van mijn gegevens.
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
          <Turnstile
            siteKey={securityKeys.turnstile.siteKey}
            onSuccess={setTurnstileToken}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
          />
        </FormField>
        
        <button 
          type="submit" 
          className="form-btn" 
          disabled={isValidating || !turnstileToken}
        >
          {isValidating ? (
            <span className="flex items-center justify-center gap-2">
              <FormLoadingSpinner size="sm" />
              Bezig...
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
