import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Navigation from '../../../../components/Navigation'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import NewLeadForm from "@/app/components/NewLeadForm"
import RelatedArticles from '../../../../components/RelatedArticles'
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../../components/StructuredData'
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { regionHubs, getRegionHubBySlug, getGemeenteBySlug, type RegionHub, type Gemeente } from '@/lib/regions-hierarchy'

// Simple translation function
function createTranslator(locale: string) {
  let messages: Record<string, any> = {};
  
  try {
    if (locale === 'nl') {
      messages = require(`../../../../../locales/nl/common.json`);
    } else {
      messages = require(`../../../../../locales/en/common.json`);
    }
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    // Fallback messages
    messages = {
      form_eyebrow: "Gratis & vrijblijvend",
      form_title: "Offerte aanvragen",
      form_subtitle: "Ontvang binnen 24 uur reacties van lokale specialisten.",
      your_name: "Uw naam",
      municipality: "Gemeente",
      service: "Gewenste service",
      phone_number: "Telefoonnummer",
      send_request: "Verstuur aanvraag",
      form_note: "Door het versturen van dit formulier gaat u akkoord met onze voorwaarden.",
      gardeners: "Hoveniers",
      services: "Diensten",
      regions: "Regio's",
      inspiration: "Inspiratie",
      request_quote: "Offerte aanvragen"
    };
  }
  
  return (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return (typeof value === 'string') ? value : key;
  };
}

type Props = {
  params: Promise<{ locale: string; slug: string; gemeente: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, gemeente } = await params;
  const regionHub = getRegionHubBySlug(slug);
  const gemeenteData = getGemeenteBySlug(gemeente);
  
  if (!regionHub || !gemeenteData) {
    return {
      title: 'Gemeente niet gevonden | Hovenier.frl'
    };
  }

  const title = `Hovenier in ${gemeenteData.name} | ${regionHub.name} | Hovenier.frl`;
  const description = `Vind lokale hoveniers in ${gemeenteData.name}, ${regionHub.name}. ${gemeenteData.intro} Vergelijk lokale tuinspecialisten in deze gemeente.`;
  
  return {
    title,
    description,
    keywords: `hovenier ${gemeenteData.name.toLowerCase()}, ${regionHub.name.toLowerCase()}, lokale tuinman, tuinonderhoud ${gemeenteData.name}`,
    alternates: getLocaleAlternates(`/regio/${slug}/${gemeente}`, locale as SupportedLocale),
    openGraph: {
      title,
      description,
      url: getAbsoluteUrl(`/regio/${slug}/${gemeente}`, locale as SupportedLocale),
      siteName: 'Hovenier.frl',
      locale: locale,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string; gemeente: string }[] = [];
  
  for (const hub of regionHubs) {
    for (const gemeente of hub.gemeentes) {
      params.push(
        { locale: 'nl', slug: hub.slug, gemeente: gemeente.slug },
        { locale: 'en', slug: hub.slug, gemeente: gemeente.slug }
      );
    }
  }
  
  // Special case: Add leeuwarden as both region and gemeente
  params.push(
    { locale: 'nl', slug: 'leeuwarden', gemeente: 'leeuwarden' },
    { locale: 'en', slug: 'leeuwarden', gemeente: 'leeuwarden' }
  );
  
  return params;
}

export default async function GemeentePage({ params }: Props) {
  const { locale, slug, gemeente } = await params;
  setRequestLocale(locale);
  
  const regionHub = getRegionHubBySlug(slug);
  const gemeenteData = getGemeenteBySlug(gemeente);
  
  if (!regionHub || !gemeenteData) {
    notFound();
  }

  // Verify gemeente belongs to this region
  const gemeenteInRegion = regionHub.gemeentes.find(g => g.slug === gemeente);
  if (!gemeenteInRegion) {
    notFound();
  }

  const validLocale = locale as SupportedLocale;
  
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

  // Prepare translations for the lead form
  const translations = {
    form_eyebrow: t('form_eyebrow'),
    form_title: t('form_title'),
    form_subtitle: t('form_subtitle'),
    your_name: t('your_name'),
    municipality: t('municipality'),
    service: t('service'),
    phone_number: t('phone_number'),
    send_request: t('send_request'),
    form_note: t('form_note'),
    select_municipality: validLocale === 'en' ? 'Select municipality' : 'Selecteer gemeente',
    what_do_you_need: validLocale === 'en' ? 'What do you need?' : 'Wat heeft u nodig?',
    your_company: validLocale === 'en' ? 'Your company' : 'Uw bedrijf',
    loading: validLocale === 'en' ? 'Loading...' : 'Versturen...',
    privacy_agreement: validLocale === 'en' ? 'I agree to the' : 'Ik ga akkoord met het',
    privacy_link: validLocale === 'en' ? 'privacy policy' : 'privacybeleid',
    privacy_consent: validLocale === 'en' ? 'and consent to processing my data.' : 'en geef toestemming voor het verwerken van mijn gegevens.',
    services: {
      tuinonderhoud: validLocale === 'en' ? 'Garden Maintenance' : 'Tuinonderhoud',
      tuinontwerp: validLocale === 'en' ? 'Garden Design' : 'Tuinontwerp',
      'tuin-aanleggen': validLocale === 'en' ? 'Garden Installation' : 'Tuin Aanleggen',
      stratenmaker: validLocale === 'en' ? 'Paving' : 'Bestrating',
      groendak: validLocale === 'en' ? 'Green Roof' : 'Groendak',
      overig: validLocale === 'en' ? 'Other' : 'Overig'
    }
  };

  // Sample related articles data
  const relatedArticles = [
    {
      id: "1",
      title: `Tuinonderhoud in ${gemeenteData.name}: Tips van lokale hoveniers`,
      excerpt: `Praktische tips voor tuinonderhoud in ${gemeenteData.name} van ervaren lokale specialisten.`,
      slug: `tuinonderhoud-${gemeente}`,
      category: "Tuinonderhoud",
      readTime: 5,
      publishedAt: "2024-03-20",
    },
    {
      id: "2", 
      title: `Beste tijd voor tuinaanleg in ${regionHub.name}`,
      excerpt: `Uitleg over de optimale timing voor tuinaanleg in de regio ${regionHub.name}.`,
      slug: `tuinaanleg-timing-${slug}`,
      category: "Tuinaanleg",
      readTime: 7,
      publishedAt: "2024-03-15",
    },
    {
      id: "3",
      title: `Kosten van hovenierdiensten in Friesland 2024`,
      excerpt: `Overzicht van prijzen voor professionele hovenierdiensten in heel Friesland.`,
      slug: "kosten-hovenierdiensten-friesland-2024",
      category: "Kosten", 
      readTime: 6,
      publishedAt: "2024-03-10",
    }
  ];
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Regio\'s', href: '/regio' },
    { label: regionHub.name, href: `/regio/${slug}` },
    { label: gemeenteData.name, href: `/regio/${slug}/${gemeente}` }
  ];

  return (
    <div className="page-container">
      <LocalBusinessSchema 
        url={`https://hovenier.frl${localizePath(`/regio/${slug}/${gemeente}`, validLocale)}`}
        nameContext={`Hoveniers in ${gemeenteData.name}`}
        services={[
          "Tuinonderhoud",
          "Tuinontwerp", 
          "Bestrating",
          "Boomverzorging",
          "Groendaken",
          "Tuinaanleg"
        ]}
      />
      
      <BreadcrumbSchema 
        items={breadcrumbItems.map((item, index) => ({
          position: index + 1,
          name: item.label,
          url: item.href ? `https://hovenier.frl${item.href}` : `https://hovenier.frl${localizePath(`/regio/${slug}/${gemeente}`, validLocale)}`
        }))}
      />

      <Navigation locale={validLocale} translations={navTranslations} />
      
      <main>
        {/* Breadcrumbs */}
        <section style={{ background: 'var(--cream-light)', padding: '1rem 0', borderBottom: '0.5px solid var(--border)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        {/* Hero Section */}
        <section style={{ background: 'var(--white)', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                  <div style={{ 
                    background: 'var(--forest-light)', 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <svg style={{ width: '32px', height: '32px', color: 'var(--forest)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h1 style={{ fontSize: '3rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem', lineHeight: '1.1' }}>
                      Hovenier in {gemeenteData.name}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', margin: '0' }}>
                      {regionHub.name} • {gemeenteData.population.toLocaleString()} inwoners
                    </p>
                  </div>
                </div>
                
                <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', marginBottom: '2rem', lineHeight: '1.6' }}>
                  {gemeenteData.intro}
                </p>

                {/* Municipality Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>
                      {gemeenteData.population.toLocaleString()}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--forest-mid)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Inwoners</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>
                      {gemeenteData.nearby.length}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--forest-mid)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Naburige Gemeenten</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>
                      {regionHub.gemeentes.length}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--forest-mid)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>In {regionHub.name}</p>
                  </div>
                </div>

                {/* Nearby Gemeenten */}
                {gemeenteData.nearby.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
                      Nabij {gemeenteData.name}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {gemeenteData.nearby.map((nearbyName) => (
                        <span key={nearbyName} style={{ 
                          background: 'var(--cream-dark)', 
                          color: 'var(--forest)', 
                          padding: '0.5rem 1rem', 
                          borderRadius: '20px', 
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          {nearbyName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Lead Form */}
              <div style={{ background: 'var(--cream-light)', borderRadius: '12px', padding: '2rem' }}>
                <NewLeadForm 
                  translations={translations}
                  locale={validLocale}
                  prefillMunicipality={gemeenteData.name}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Local Services */}
        <section style={{ background: 'var(--cream-dark)', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '2rem', textAlign: 'center' }}>
              Populaire Hovenierdiensten in {gemeenteData.name}
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              {/* Service Cards - Placeholder for now */}
              <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '2rem' }}>
                <div style={{ 
                  background: 'var(--sage-light)', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <svg style={{ width: '28px', height: '28px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem', textAlign: 'center' }}>
                  Tuinonderhoud
                </h3>
                <p style={{ color: 'var(--forest-mid)', fontSize: '14px', textAlign: 'center', lineHeight: '1.6' }}>
                  Regelmatig onderhoud voor een mooie tuin het hele jaar door
                </p>
              </div>

              <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '2rem' }}>
                <div style={{ 
                  background: 'var(--sage-light)', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <svg style={{ width: '28px', height: '28px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem', textAlign: 'center' }}>
                  Tuinontwerp
                </h3>
                <p style={{ color: 'var(--forest-mid)', fontSize: '14px', textAlign: 'center', lineHeight: '1.6' }}>
                  Professioneel ontwerp voor uw droomtuin
                </p>
              </div>

              <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '2rem' }}>
                <div style={{ 
                  background: 'var(--sage-light)', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <svg style={{ width: '28px', height: '28px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem', textAlign: 'center' }}>
                  Bestrating
                </h3>
                <p style={{ color: 'var(--forest-mid)', fontSize: '14px', textAlign: 'center', lineHeight: '1.6' }}>
                  Terrassen, opritten en tuinpaden professioneel aangelegd
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section style={{ background: 'var(--white)', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
                Gratis offerte aanvragen in {gemeenteData.name}
              </h2>
              <p style={{ color: 'var(--forest-mid)', fontSize: '1.125rem' }}>
                Ontvang binnen 24 uur reacties van lokale hovenier specialisten
              </p>
            </div>

            {/* Lead Form */}
            <div style={{ background: 'var(--cream-light)', borderRadius: '12px', padding: '2rem' }}>
              <NewLeadForm 
                translations={translations}
                locale={validLocale}
                prefillMunicipality={gemeenteData.name}
              />
            </div>
          </div>
        </section>

        {/* Navigation to Region */}
        <section style={{ background: 'var(--cream-light)', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
              Meer Hoveniers in {regionHub.name}
            </h2>
            <p style={{ color: 'var(--forest-mid)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              Bekijk alle {regionHub.gemeentes.length} gemeenten in deze regio
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={localizePath(`/regio/${slug}`, validLocale)} style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '14px 28px', 
                fontSize: '14px', 
                fontWeight: '600',
                color: 'var(--forest)', 
                border: '1px solid var(--forest)', 
                borderRadius: '8px', 
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                background: 'var(--white)'
              }} className="back-to-regions-btn">
                ← {regionHub.name}
              </a>
              <a href={localizePath('/regio', validLocale)} style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '14px 28px', 
                fontSize: '14px', 
                fontWeight: '600',
                color: 'var(--white)', 
                background: 'var(--forest)', 
                borderRadius: '8px', 
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}>
                Alle Regio's →
              </a>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <RelatedArticles 
          articles={relatedArticles} 
          title={`Gerelateerde artikelen voor ${gemeenteData.name}`}
        />
      </main>
    </div>
  )
}