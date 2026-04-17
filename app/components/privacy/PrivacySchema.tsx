const PrivacySchema = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';
  const lang = isEn ? 'en-US' : 'nl-NL';
  const urlPrefix = isEn ? 'https://hovenier.frl/en' : 'https://hovenier.frl';
  const pageUrl = `${urlPrefix}/privacy-beleid`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: isEn
          ? 'Privacy Policy | Hovenier.frl - Data Protection & Privacy'
          : 'Privacybeleid | Hovenier.frl - Gegevensbescherming & Privacy',
        description: isEn
          ? 'Privacy policy of Hovenier.frl. How we collect, use and protect your personal data in compliance with GDPR legislation.'
          : 'Privacybeleid van Hovenier.frl. Hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen conform GDPR wetgeving.',
        isPartOf: {
          '@id': 'https://hovenier.frl#website'
        },
        about: {
          '@type': 'Thing',
          name: isEn ? 'Privacy Policy' : 'Privacybeleid',
          description: isEn ? 'Data protection and privacy policy' : 'Gegevensbescherming en privacybeleid'
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: 'https://hovenier.frl/images/privacy-policy.jpg'
        },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        inLanguage: lang,
        publisher: {
          '@type': 'Organization',
          name: 'Hovenier.frl',
          url: 'https://hovenier.frl',
          logo: {
            '@type': 'ImageObject',
            url: 'https://hovenier.frl/images/logo.png'
          }
        }
      },
      {
        '@type': 'PrivacyPolicy',
        '@id': `${pageUrl}#document`,
        name: isEn ? 'Hovenier.frl Privacy Policy' : 'Hovenier.frl Privacybeleid',
        description: isEn
          ? 'Comprehensive privacy policy detailing data collection, usage, and protection practices'
          : 'Uitgebreid privacybeleid met details over gegevensverzameling, gebruik en beschermingsmaatregelen',
        url: pageUrl,
        isPartOf: {
          '@id': 'https://hovenier.frl#website'
        },
        inLanguage: lang,
        dateCreated: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'Hovenier.frl'
        },
        about: [
          {
            '@type': 'Thing',
            name: 'Data Collection',
            description: 'Information about what personal data is collected'
          },
          {
            '@type': 'Thing', 
            name: 'Data Usage',
            description: 'How collected data is used and processed'
          },
          {
            '@type': 'Thing',
            name: 'User Rights',
            description: 'GDPR rights including access, rectification, and deletion'
          },
          {
            '@type': 'Thing',
            name: 'Data Security',
            description: 'Measures taken to protect personal data'
          }
        ]
      },
      {
        '@type': 'Organization',
        '@id': 'https://hovenier.frl#organization',
        name: 'Hovenier.frl',
        url: 'https://hovenier.frl',
        email: 'privacy@hovenier.frl',
        description: 'Leading platform connecting customers with professional gardeners in the Netherlands',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'NL',
          addressLocality: 'Netherlands'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'privacy@hovenier.frl',
          contactType: 'Privacy Officer',
          areaServed: 'NL',
          availableLanguage: ['nl', 'en']
        },
        privacyPolicy: 'https://hovenier.frl/privacy-beleid',
        logo: {
          '@type': 'ImageObject',
          url: 'https://hovenier.frl/images/logo.png'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
};

export default PrivacySchema;