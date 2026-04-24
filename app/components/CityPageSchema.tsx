import { createTranslator } from '@/i18n';
import { getAbsoluteUrl, SupportedLocale } from '@/lib/locale-utils';

interface CitySchemaFAQ {
  question: string;
  answer: string;
}

interface CitySchemaData {
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  ratingValue: string;
  reviewCount: string;
  areaServedName: string;
  areaServedSameAs?: string;
  faqs: CitySchemaFAQ[];
}

interface CityPageSchemaProps {
  locale: SupportedLocale;
  slug: string;
  gemeente: string;
  citySlug: string;
}

const serviceItems = [
  { displayName: 'Tuinonderhoud', slug: 'tuinonderhoud' },
  { displayName: 'Tuinontwerp', slug: 'tuinontwerp' },
  { displayName: 'Groendaken', slug: 'groendak' },
  { displayName: 'Bestrating', slug: 'stratenmaker' },
];

export function CityPageSchema({ locale, slug, gemeente, citySlug }: CityPageSchemaProps) {
  const t = createTranslator(locale);
  const data = t.raw(`schema_data.cities.${citySlug}`) as CitySchemaData | undefined;
  if (!data) return null;

  const pageUrl = getAbsoluteUrl(`/regio/${slug}/${gemeente}/${citySlug}`, locale);
  const municipalityUrl = getAbsoluteUrl(`/regio/${slug}/${gemeente}`, locale);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${pageUrl}#business`,
        name: data.name,
        url: pageUrl,
        description: data.description,
        email: 'info@hovenier.frl',
        priceRange: '€€',
        currenciesAccepted: 'EUR',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer',
        logo: {
          '@type': 'ImageObject',
          url: 'https://hovenier.frl/assets/logo-light.svg',
        },
        image: `https://hovenier.frl/images/${citySlug}.jpg`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: data.areaServedName,
          addressRegion: 'Friesland',
          addressCountry: 'NL',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: data.latitude,
          longitude: data.longitude,
        },
        areaServed: {
          '@type': 'City',
          name: data.areaServedName,
          ...(data.areaServedSameAs ? { sameAs: data.areaServedSameAs } : {}),
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: data.ratingValue,
          reviewCount: data.reviewCount,
          bestRating: '5',
          worstRating: '1',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:00',
            closes: '14:00',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'ItemList',
        name: `Tuindiensten in ${data.areaServedName}`,
        itemListElement: serviceItems.map((svc, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${svc.displayName} ${data.areaServedName}`,
          url: `${pageUrl}/${svc.slug}`,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
