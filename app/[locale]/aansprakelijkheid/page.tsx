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
import { getLocaleAlternates, getAbsoluteUrl, type SupportedLocale } from '@/lib/locale-utils';
import { createTranslator } from '@/lib/translator';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    const t = createTranslator(validLocale);
    
    return {
      title: t('disclaimer.meta_title'),
      description: t('disclaimer.meta_description'),
      robots: {
        index: true,
        follow: true
      },
      alternates: getLocaleAlternates('/aansprakelijkheid', validLocale as SupportedLocale),
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

  const t = createTranslator(validLocale);

  // Breadcrumb data for display
  const breadcrumbItems = [
    { label: t('disclaimer.breadcrumb_home'), href: '/' },
    { label: t('disclaimer.breadcrumb_disclaimer') }
  ];

  // Breadcrumb data for schema
  const breadcrumbSchemaData = [
    { name: t('disclaimer.breadcrumb_home'), url: getAbsoluteUrl('/', validLocale as SupportedLocale) },
    { name: t('disclaimer.breadcrumb_disclaimer'), url: getAbsoluteUrl('/aansprakelijkheid', validLocale as SupportedLocale) }
  ];

  const translations = t.sub('disclaimer');

  return (
    <div className={styles.disclaimerPage}>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaData} />

      <main>
        <section className="section">
          <div className="section-inner">
            <DisclaimerHero translations={translations} />
            
            <div className={styles.content}>
              <div className={styles.contentInner}>
                <DisclaimerIntroduction translations={translations} />
                <DisclaimerGeneral translations={translations} />
                <DisclaimerLimitations translations={translations} />
                <DisclaimerInformation translations={translations} />
                <DisclaimerUsage translations={translations} />
                <DisclaimerExternal translations={translations} />
                <DisclaimerContact translations={translations} />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <DisclaimerSchema translations={translations} />
    </div>
  );
}
