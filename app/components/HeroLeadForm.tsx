'use client';

import dynamic from 'next/dynamic';

interface HeroLeadFormProps {
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
}

export default function HeroLeadForm({ translations, locale }: HeroLeadFormProps) {
  const DeferredLeadForm = dynamic(() => import('./NewLeadForm'), {
    ssr: false,
    loading: () => (
      <div aria-hidden="true">
        <p className="form-eyebrow">{translations.form_eyebrow}</p>
        <h2 className="form-title">{translations.form_title}</h2>
        <p className="form-sub">{translations.form_subtitle}</p>
      </div>
    ),
  });

  return <DeferredLeadForm translations={translations} locale={locale} />;
}
