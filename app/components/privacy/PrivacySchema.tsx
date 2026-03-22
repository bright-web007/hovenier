const PrivacySchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://hovenier.frl/privacy-beleid',
        url: 'https://hovenier.frl/privacy-beleid',
        name: 'Privacybeleid | Hovenier.frl - Gegevensbescherming & Privacy',
        description: 'Privacybeleid van Hovenier.frl. Hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen conform GDPR wetgeving.',
        isPartOf: {
          '@id': 'https://hovenier.frl#website'
        },
        about: {
          '@type': 'Thing',
          name: 'Privacy Policy',
          description: 'Data protection and privacy policy'
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: 'https://hovenier.frl/images/privacy-policy.jpg'
        },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        inLanguage: 'nl-NL',
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
        '@id': 'https://hovenier.frl/privacy-policy-document',
        name: 'Hovenier.frl Privacy Policy',
        description: 'Comprehensive privacy policy detailing data collection, usage, and protection practices',
        url: 'https://hovenier.frl/privacy-beleid',
        isPartOf: {
          '@id': 'https://hovenier.frl#website'
        },
        inLanguage: 'nl-NL',
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