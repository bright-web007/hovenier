'use client';

import NewLeadForm from './NewLeadForm';

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
  return <NewLeadForm translations={translations} locale={locale} />;
}
