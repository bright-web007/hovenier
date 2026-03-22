import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema';
import styles from '../../styles/Cookie.module.css';

// Cookie Policy Components
import CookieHero from '../../components/cookie/CookieHero';
import CookieIntroduction from '../../components/cookie/CookieIntroduction';
import CookieDefinition from '../../components/cookie/CookieDefinition';
import CookieUsage from '../../components/cookie/CookieUsage';
import CookieTypes from '../../components/cookie/CookieTypes';
import CookieConsent from '../../components/cookie/CookieConsent';
import CookieManagement from '../../components/cookie/CookieManagement';
import CookieThirdParty from '../../components/cookie/CookieThirdParty';
import CookieSecurity from '../../components/cookie/CookieSecurity';
import CookieChanges from '../../components/cookie/CookieChanges';
import CookieContact from '../../components/cookie/CookieContact';
import CookieSchema from '../../components/cookie/CookieSchema';
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
    
    return {
      title: 'Cookiebeleid | Hovenier.frl - Cookies & Tracking',
      description: 'Cookiebeleid van Hovenier.frl. Informatie over welke cookies wij gebruiken en hoe u uw cookie-instellingen kunt beheren.',
      robots: {
        index: true,
        follow: true
      },
      alternates: getLocaleAlternates('/cookie-beleid', validLocale as SupportedLocale),
    };
  } catch (error) {
    return {
      title: 'Cookiebeleid - Hovenier.frl',
      description: 'Cookiebeleid en informatie over tracking.'
    };
  }
}

export default async function CookiePolicyPage({ params }: Props) {
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
    { label: 'Cookiebeleid' }
  ];

  // Breadcrumb data for schema
  const breadcrumbSchemaData = [
    { name: 'Home', url: getAbsoluteUrl('/', validLocale as SupportedLocale) },
    { name: 'Cookiebeleid', url: getAbsoluteUrl('/cookie-beleid', validLocale as SupportedLocale) }
  ];

  return (
    <div className={styles.cookiePage}>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaData} />

      <main>
        <section className="section">
          <div className="section-inner">
            <CookieHero />
            
            <div className={styles.content}>
              <div className={styles.contentInner}>
                <CookieIntroduction />
                <CookieDefinition />
                <CookieUsage />
                <CookieTypes />
                <CookieConsent />
                <CookieManagement />
                <CookieThirdParty />
                <CookieSecurity />
                <CookieChanges />
                <CookieContact />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <CookieSchema />
    </div>
  );
}
