import Script from 'next/script';
import { createTranslator } from '@/i18n';

export default function TermsSchema({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);
  const lang = locale === 'en' ? 'en-US' : 'nl-NL';
  const urlPrefix = locale === 'en' ? 'https://hovenier.frl/en' : 'https://hovenier.frl';
  const pageUrl = `${urlPrefix}/algemene-voorwaarden`;

  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('terms.schema_name'),
    "description": t('terms.schema_description'),
    "url": pageUrl,
    "inLanguage": lang,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Hovenier.frl",
      "url": "https://hovenier.frl"
    },
    "mainEntity": {
      "@type": "TermsOfService",
      "name": t('terms.schema_tc_name'),
      "description": t('terms.schema_tc_description'),
      "dateModified": new Date().toISOString().split('T')[0],
      "publisher": {
        "@type": "Organization",
        "name": "Hovenier.frl",
        "url": "https://hovenier.frl",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "info@hovenier.frl",
          "contactType": t('terms.schema_contact_type')
        }
      },
      "about": [
        {
          "@type": "Thing",
          "name": t('terms.schema_about_usage'),
          "description": t('terms.schema_about_usage_desc')
        },
        {
          "@type": "Thing",
          "name": t('terms.schema_about_services'),
          "description": t('terms.schema_about_services_desc')
        },
        {
          "@type": "Thing",
          "name": t('terms.schema_about_rights'),
          "description": t('terms.schema_about_rights_desc')
        }
      ]
    }
  };

  return (
    <Script
      id="terms-of-service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
    />
  );
}
