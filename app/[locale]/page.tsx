import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Navigation from '../components/Navigation';
import ServiceCard from '../components/ServiceCard';
import RegionStrip from '../components/RegionStrip';
import { OrganizationSchema, WebsiteSchema } from '../components/StructuredData';
import { getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

// ISR: Never revalidate (static content, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

// Simple translation function that loads from static JSON
function createTranslator(locale: string) {
  let messages: Record<string, any> = {};

  try {
    if (locale === 'nl') {
      messages = require(`../../locales/nl/common.json`);
    } else {
      messages = require(`../../locales/en/common.json`);
    }
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    // Fallback messages
    messages = {
      hero_eyebrow: "Friesland's hoveniersgids",
      hero_title: "Uw droomtuin begint met de juiste hovenier",
      hero_subtitle: "Vakkundige hoveniers in uw regio, zorgvuldig geselecteerd.",
      free_quote: "Gratis offerte",
      no_obligations: "Geen verplichtingen",
      certified_gardeners: "Gecertificeerde hoveniers"
    };
  }

  return (key: string) => {
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;

    return {
      title: 'Betrouwbare Hoveniers in Friesland Vinden | Gratis Offertes | Hovenier.frl',
      description: 'Vind een gecertificeerde hovenier in Friesland. Vergelijk gratis offertes voor tuinonderhoud, tuinaanleg en groendaken. 150+ geverifieerde hoveniers — reactie binnen 24 uur.',
      keywords: ['hovenier friesland', 'hoveniers in friesland', 'hoveniers friesland', 'hovenier in friesland', 'tuinaanleg friesland', 'hovenier gezocht friesland'],
      alternates: getLocaleAlternates('/', validLocale as SupportedLocale),
    };
  } catch (error) {
    return {
      title: 'Hovenier.frl - Betrouwbare Hoveniers in Friesland',
      description: 'Vind de beste hoveniers in Friesland.'
    };
  }
}

export default async function HomePage({ params }: Props) {
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

  // Create translator function
  const t = createTranslator(validLocale);

  // Navigation translations
  const navTranslations = {
    gardeners: t('gardeners'),
    services: t('services'),
    regions: t('regions'),
    inspiration: t('inspiration'),
    request_quote: t('request_quote')
  };

  // Prepare translated strings for client components
  const translations = {
    hero_eyebrow: t('hero_eyebrow'),
    hero_subtitle: t('hero_subtitle'),
    free_quote: t('free_quote'),
    no_obligations: t('no_obligations'),
    certified_gardeners: t('certified_gardeners'),
    form_eyebrow: t('form_eyebrow'),
    form_title: t('form_title'),
    form_subtitle: t('form_subtitle'),
    your_name: t('your_name'),
    municipality: t('municipality'),
    service: t('service'),
    phone_number: t('phone_number'),
    send_request: t('send_request'),
    form_note: t('form_note'),
    select_municipality: t('form.select_municipality'),
    what_do_you_need: t('form.what_do_you_need'),
    your_company: t('form.your_company'),
    loading: t('form.loading'),
    privacy_agreement: t('form.privacy_agreement'),
    privacy_link: t('form.privacy_link'),
    privacy_consent: t('form.privacy_consent'),
    services: {
      tuinonderhoud: t('form.services.tuinonderhoud'),
      tuinontwerp: t('form.services.tuinontwerp'),
      'tuin-aanleggen': t('form.services.tuin-aanleggen'),
      stratenmaker: t('form.services.stratenmaker'),
      groendak: t('form.services.groendak'),
      overig: t('form.services.overig')
    },
    stats_gardeners: t('stats.gardeners'),
    stats_municipalities: t('stats.municipalities'),
    stats_rating: t('stats.rating'),
    buttons_view_all_services: t('buttons.view_all_services'),
    sections_services_eyebrow: t('sections.services_eyebrow'),
    sections_services_title: t('sections.services_title'),
    sections_services_subtitle: t('sections.services_subtitle'),
    regions_homepage_title: t('regions_content.homepage_title'),
    contact_us: t('Contact Us')
  };

  return (
    <>
      <Navigation locale={validLocale} translations={navTranslations} />

      <main>
        <Hero translations={translations} locale={validLocale} />

        <TrustBar
          trustBarTranslations={{
            gardeners: t('trustbar.gardeners'),
            projects: t('trustbar.projects'),
            satisfied: t('trustbar.satisfied'),
            cities: t('trustbar.cities'),
            verified: t('trustbar.verified'),
            secure: t('trustbar.secure'),
            reviews: t('trustbar.reviews')
          }}
        />

        {/* Services Section */}
        <section className="section section-services section-deferred">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <div>
                <p className="section-eyebrow section-eyebrow-centered">
                  {translations.sections_services_eyebrow || 'ONZE DIENSTEN'}
                </p>
                <h2 className="section-title section-title-centered">
                  {translations.sections_services_title || 'Professionele Hovendiensten'}
                </h2>
                <p className="section-sub section-sub-centered">
                  {translations.sections_services_subtitle || 'Van tuinonderhoud tot complete tuinontwerpen. Onze gecertificeerde hoveniers staan voor u klaar.'}
                </p>
              </div>
            </div>

            <div className="service-grid">
              <ServiceCard
                title={t('services_data.tuinonderhoud.title')}
                description={t('services_data.tuinonderhoud.description')}
                imageUrl="/images/garden-maintenance.png"
                href={localizePath('/diensten/tuinonderhoud', validLocale as SupportedLocale)}
                price={{ from: 35, unit: validLocale === 'en' ? 'hour' : 'uur' }}
                features={[
                  t('services_data.tuinonderhoud.features.0'),
                  t('services_data.tuinonderhoud.features.1'),
                  t('services_data.tuinonderhoud.features.2'),
                  t('services_data.tuinonderhoud.features.3'),
                ]}
                popular={true}
                locale={validLocale}
              />

              <ServiceCard
                title={t('services_data.tuinontwerp.title')}
                description={t('services_data.tuinontwerp.description')}
                imageUrl="/images/tuinontwerp-hero.jpg"
                href={localizePath('/diensten/tuinontwerp', validLocale as SupportedLocale)}
                features={[
                  t('services_data.tuinontwerp.features.0'),
                  t('services_data.tuinontwerp.features.1'),
                  t('services_data.tuinontwerp.features.2'),
                  t('services_data.tuinontwerp.features.3'),
                ]}
                locale={validLocale}
              />

              <ServiceCard
                title={t('services_data.groendak.title')}
                description={t('services_data.groendak.description')}
                imageUrl="/images/green-roof.png"
                href={localizePath('/diensten/groendak', validLocale as SupportedLocale)}
                features={[
                  t('services_data.groendak.features.0'),
                  t('services_data.groendak.features.1'),
                  t('services_data.groendak.features.2'),
                  t('services_data.groendak.features.3'),
                ]}
                locale={validLocale}
              />
            </div>

            <div className="section-centered">
              <Link href={localizePath('/services', validLocale as SupportedLocale)} className="nav-cta nav-cta-large" prefetch={false}>
                {translations.buttons_view_all_services || 'Alle Diensten Bekijken'}
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <RegionStrip
          title={translations.regions_homepage_title}
          locale={validLocale}
          translations={{
            contact_us: translations.contact_us
          }}
        />
      </main>

      {/* Structured Data for SEO */}
      <OrganizationSchema />
      <WebsiteSchema
        url="https://hovenier.frl"
        name="Hovenier.frl"
        description="Platform voor het vinden van betrouwbare hoveniers in Friesland"
        publisher="Hovenier.frl"
      />
    </>
  );
}
