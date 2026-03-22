import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema';
import styles from '../../styles/Disclaimer.module.css';

// Disclaimer Components
import DisclaimerHero from '../../components/disclaimer/DisclaimerHero';
import DisclaimerIntroduction from '../../components/disclaimer/DisclaimerIntroduction';
import DisclaimerGeneral from '../../components/disclaimer/DisclaimerGeneral';
import DisclaimerLimitations from '../../components/disclaimer/DisclaimerLimitations';
import DisclaimerInformation from '../../components/disclaimer/DisclaimerInformation';
import DisclaimerUsage from '../../components/disclaimer/DisclaimerUsage';
import DisclaimerExternal from '../../components/disclaimer/DisclaimerExternal';
import DisclaimerContact from '../../components/disclaimer/DisclaimerContact';
import DisclaimerSchema from '../../components/disclaimer/DisclaimerSchema';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    
    return {
      title: 'Aansprakelijkheid | Hovenier.frl - Disclaimer & Beperkingen',
      description: 'Aansprakelijkheidsverklaring van Hovenier.frl. Belangrijke informatie over aansprakelijkheidsbeperkingen en het gebruik van ons platform.',
      robots: {
        index: true,
        follow: true
      }
    };
  } catch (error) {
    return {
      title: 'Aansprakelijkheid - Hovenier.frl',
      description: 'Disclaimer en aansprakelijkheidsinformatie.'
    };
  }
}

export default async function DisclaimerPage({ params }: Props) {
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

  // Breadcrumb data for display
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Aansprakelijkheid' }
  ];

  // Breadcrumb data for schema
  const breadcrumbSchemaData = [
    { name: 'Home', url: 'https://hovenier.frl' },
    { name: 'Aansprakelijkheid', url: 'https://hovenier.frl/nl/aansprakelijkheid' }
  ];

  return (
    <div className={styles.disclaimerPage}>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaData} />

      <main>
        <section className="section">
          <div className="section-inner">
            <DisclaimerHero />
            
            <div className={styles.content}>
              <div className={styles.contentInner}>
                <DisclaimerIntroduction />
                <DisclaimerGeneral />
                <DisclaimerLimitations />
                <DisclaimerInformation />
                <DisclaimerUsage />
                <DisclaimerExternal />
                <DisclaimerContact />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <DisclaimerSchema />
    </div>
  );
}