import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema';

// Privacy Policy Components
import PrivacyHero from '../../components/privacy/PrivacyHero';
import PrivacyIntroduction from '../../components/privacy/PrivacyIntroduction';
import PrivacyResponsibilities from '../../components/privacy/PrivacyResponsibilities';
import PrivacyDataCollection from '../../components/privacy/PrivacyDataCollection';
import PrivacyDataUsage from '../../components/privacy/PrivacyDataUsage';
import PrivacyLegalBasis from '../../components/privacy/PrivacyLegalBasis';
import PrivacyDataSharing from '../../components/privacy/PrivacyDataSharing';
import PrivacySecurity from '../../components/privacy/PrivacySecurity';
import PrivacyRetention from '../../components/privacy/PrivacyRetention';
import PrivacyRights from '../../components/privacy/PrivacyRights';
import PrivacyCookies from '../../components/privacy/PrivacyCookies';
import PrivacyComplaints from '../../components/privacy/PrivacyComplaints';
import PrivacyChanges from '../../components/privacy/PrivacyChanges';
import PrivacyContact from '../../components/privacy/PrivacyContact';
import PrivacySchema from '../../components/privacy/PrivacySchema';

import styles from '../../styles/Privacy.module.css';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    const isEnglish = validLocale === 'en';
    
    return {
      title: isEnglish 
        ? 'Privacy Policy | Hovenier.frl - Data Protection & Privacy'
        : 'Privacybeleid | Hovenier.frl - Gegevensbescherming & Privacy',
      description: isEnglish 
        ? 'Privacy policy of Hovenier.frl. How we collect, use and protect your personal data in compliance with GDPR legislation.'
        : 'Privacybeleid van Hovenier.frl. Hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen conform GDPR wetgeving.',
      robots: {
        index: true,
        follow: true
      },
      alternates: {
        canonical: `https://hovenier.frl/${validLocale}/privacy-beleid`,
        languages: {
          'nl': 'https://hovenier.frl/nl/privacy-beleid',
          'en': 'https://hovenier.frl/en/privacy-beleid'
        }
      }
    };
  } catch (error) {
    return {
      title: 'Privacybeleid - Hovenier.frl',
      description: 'Privacybeleid en gegevensbescherming informatie.'
    };
  }
}

export default async function PrivacyPolicyPage({ params }: Props) {
  let validLocale = defaultLocale;
  
  try {
    const { locale } = await params;
    validLocale = locale || defaultLocale;
    if (!locales.includes(validLocale as any)) {
      validLocale = defaultLocale;
    }
  } catch (error) {
    console.error('Error parsing params:', error);
  }

  const isEnglish = validLocale === 'en';
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: isEnglish ? 'Privacy Policy' : 'Privacybeleid' }
  ];

  const breadcrumbSchemaItems = [
    { name: 'Home', url: 'https://hovenier.frl/' },
    { name: isEnglish ? 'Privacy Policy' : 'Privacybeleid', url: `https://hovenier.frl/${validLocale}/privacy-beleid` }
  ];

  return (
    <div className={styles.privacyPage}>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <main>
        <section className="section">
          <div className="section-inner">
            <div className={styles.legalContent}>
              <PrivacyHero />
              
              <div className={styles.legalSections}>
                <PrivacyIntroduction />
                <PrivacyResponsibilities />
                <PrivacyDataCollection />
                <PrivacyDataUsage />
                <PrivacyLegalBasis />
                <PrivacyDataSharing />
                <PrivacySecurity />
                <PrivacyRetention />
                <PrivacyRights />
                <PrivacyCookies />
                <PrivacyComplaints />
                <PrivacyChanges />
                <PrivacyContact />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <PrivacySchema />
    </div>
  );
}