import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema';
import styles from '../../styles/Terms.module.css';

// Terms & Conditions Components
import TermsHero from '../../components/terms/TermsHero';
import TermsDefinitions from '../../components/terms/TermsDefinitions';
import TermsApplicability from '../../components/terms/TermsApplicability';
import TermsServices from '../../components/terms/TermsServices';
import TermsUsage from '../../components/terms/TermsUsage';
import TermsRegistration from '../../components/terms/TermsRegistration';
import TermsIntellectualProperty from '../../components/terms/TermsIntellectualProperty';
import TermsLiability from '../../components/terms/TermsLiability';
import TermsCosts from '../../components/terms/TermsCosts';
import TermsComplaints from '../../components/terms/TermsComplaints';
import TermsTermination from '../../components/terms/TermsTermination';
import TermsChanges from '../../components/terms/TermsChanges';
import TermsLaw from '../../components/terms/TermsLaw';
import TermsContact from '../../components/terms/TermsContact';
import TermsSchema from '../../components/terms/TermsSchema';
import { getLocaleAlternates, getAbsoluteUrl, type SupportedLocale } from '@/lib/locale-utils';

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
        ? 'Terms and Conditions | Hovenier.frl - Usage Terms'
        : 'Algemene Voorwaarden | Hovenier.frl - Gebruiksvoorwaarden',
      description: isEnglish
        ? 'Terms and conditions of Hovenier.frl. Conditions for using our gardener comparison service and platform.'
        : 'Algemene voorwaarden van Hovenier.frl. Voorwaarden voor het gebruik van onze hoveniersvergelijkingsdienst en platform.',
      robots: {
        index: true,
        follow: true
      },
      alternates: getLocaleAlternates('/algemene-voorwaarden', validLocale as SupportedLocale)
    };
  } catch (error) {
    return {
      title: 'Algemene Voorwaarden - Hovenier.frl',
      description: 'Algemene voorwaarden en gebruiksvoorwaarden.'
    };
  }
}

export default async function TermsPage({ params }: Props) {
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
    { label: isEnglish ? 'Terms and Conditions' : 'Algemene Voorwaarden' }
  ];

  const breadcrumbSchemaItems = [
    { name: 'Home', url: getAbsoluteUrl('/', validLocale as SupportedLocale) },
    { name: isEnglish ? 'Terms and Conditions' : 'Algemene Voorwaarden', url: getAbsoluteUrl('/algemene-voorwaarden', validLocale as SupportedLocale) }
  ];

  return (
    <div className={styles.termsPage}>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <main>
        <section className="section">
          <div className="section-inner">
            <div className={styles.legalContent}>
              <TermsHero />
              
              <div className={styles.legalSections}>
                <TermsDefinitions />
                <TermsApplicability />
                <TermsServices />
                <TermsUsage />
                <TermsRegistration />
                <TermsIntellectualProperty />
                <TermsLiability />
                <TermsCosts />
                <TermsComplaints />
                <TermsTermination />
                <TermsChanges />
                <TermsLaw />
                <TermsContact />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <TermsSchema />
    </div>
  );
}
