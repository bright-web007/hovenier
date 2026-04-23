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
import { createTranslator } from '@/lib/translator';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

function isSupportedPageLocale(locale: string): locale is (typeof locales)[number] {
  return locales.includes(locale as (typeof locales)[number]);
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    const t = createTranslator(validLocale);

    return {
      title: t('cookie_policy.meta_title'),
      description: t('cookie_policy.meta_description'),
      robots: {
        index: true,
        follow: true
      },
      alternates: getLocaleAlternates('/cookie-beleid', validLocale as SupportedLocale),
    };
  } catch {
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
    if (!isSupportedPageLocale(validLocale)) {
      validLocale = defaultLocale;
    }
  } catch (error) {
    console.error('Error parsing params:', error);
  }

  const t = createTranslator(validLocale);

  // Breadcrumb data for display
  const breadcrumbItems = [
    { label: t('cookie_policy.breadcrumb_home'), href: '/' },
    { label: t('cookie_policy.breadcrumb_cookie') }
  ];

  // Breadcrumb data for schema
  const breadcrumbSchemaData = [
    { name: t('cookie_policy.breadcrumb_home'), url: getAbsoluteUrl('/', validLocale as SupportedLocale) },
    { name: t('cookie_policy.breadcrumb_cookie'), url: getAbsoluteUrl('/cookie-beleid', validLocale as SupportedLocale) }
  ];

  // Build translations object for cookie components
  const translations = t.sub('cookie_policy');

  return (
    <div className={styles.cookiePage}>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaData} />

      <main>
        <section className="section">
          <div className="section-inner">
            <CookieHero translations={translations} locale={validLocale} />

            <div className={styles.content}>
              <div className={styles.contentInner}>
                <CookieIntroduction translations={translations} />
                <CookieDefinition translations={translations} />
                <CookieUsage translations={translations} />
                <CookieTypes translations={translations} />
                <CookieConsent translations={translations} />
                <CookieManagement translations={translations} />
                <CookieThirdParty translations={translations} />
                <CookieSecurity translations={translations} />
                <CookieChanges translations={translations} />
                <CookieContact translations={translations} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <CookieSchema translations={translations} />
    </div>
  );
}
