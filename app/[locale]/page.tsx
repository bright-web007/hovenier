import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Navigation from '../components/Navigation';
import ServiceCard from '../components/ServiceCard';
import RegionStrip from '../components/RegionStrip';
import { OrganizationSchema, WebsiteSchema } from '../components/StructuredData';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

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
      title: 'Hovenier.frl - Betrouwbare Hoveniers in Friesland | Offerte Aanvragen',
      description: 'Vind de beste hoveniers in Friesland. Vergelijk offertes voor tuinonderhoud, tuinontwerp en groendaken. 150+ gecertificeerde hoveniers, 2300+ projecten.',
      keywords: ['hovenier friesland', 'tuin onderhoud', 'tuinontwerp', 'groendak', 'leeuwarden', 'heerenveen'],
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
    buttons_view_all_services: t('buttons.view_all_services'),
    sections_services_eyebrow: t('sections.services_eyebrow'),
    sections_services_title: t('sections.services_title'),
    sections_services_subtitle: t('sections.services_subtitle'),
    regions_homepage_title: t('regions_content.homepage_title')
  };
  
  return (
    <>
      <Navigation locale={validLocale} translations={navTranslations} />
      
      <main>
        <Hero translations={translations} locale={validLocale} />
        
        <TrustBar />
        
        {/* Services Section */}
        <section className="section section-services">
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
                title="Tuinonderhoud"
                description="Professioneel onderhoud van uw tuin, van snoeien tot onkruidbestrijding. Houd uw tuin het hele jaar door in topconditie."
                imageUrl="/assets/tuinonderhoud-hero.jpg"
                href="/services/tuinonderhoud"
                price={{ from: 35, unit: 'uur' }}
                features={[
                  'Gras maaien en verzorging',
                  'Snoeien van bomen en struiken',
                  'Onkruidbestrijding',
                  'Seizoensonderhoud'
                ]}
                popular={true}
              />
              
              <ServiceCard
                title="Tuinontwerp"
                description="Complete herinrichting van uw tuin met professioneel ontwerp. Van concept tot realisatie, uw droomtuin wordt werkelijkheid."
                href="/services/tuinontwerp"
                features={[
                  'Persoonlijk tuinontwerp',
                  'Planten selectie en advies',
                  'Aanleg en realisatie',
                  '3D visualisatie'
                ]}
              />
              
              <ServiceCard
                title="Groendaken"
                description="Duurzame groendaken voor een betere leefomgeving. Isolatie, waterberging en biodiversiteit in één."
                href="/services/groendaken"
                features={[
                  'Waterafvoer optimalisering',
                  'Isolatie verbetering',
                  'Verhoogde biodiversiteit',
                  'Onderhoud en nazorg'
                ]}
              />
            </div>
            
            <div className="section-centered">
              <Link href="/services" className="nav-cta nav-cta-large">
                {translations.buttons_view_all_services || 'Alle Diensten Bekijken'}
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        <RegionStrip title={translations.regions_homepage_title} />
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
