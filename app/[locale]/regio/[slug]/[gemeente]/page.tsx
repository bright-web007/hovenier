import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Navigation from '../../../../components/Navigation'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import NewLeadForm from "@/app/components/NewLeadForm"
import RelatedArticles from '../../../../components/RelatedArticles'
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../../components/StructuredData'
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'
import { regionHubs, getRegionHubBySlug, getGemeenteBySlug, getRegionSlugByGemeenteSlug, type RegionHub, type Gemeente } from '@/lib/regions-hierarchy'
import DienstCard from '../../../../components/DienstCard'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string; slug: string; gemeente: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, gemeente } = await params;
  const regionHub = getRegionHubBySlug(slug);
  const gemeenteData = getGemeenteBySlug(gemeente);

  if (!regionHub || !gemeenteData) {
    return {
      title: createTranslator(locale)('regio_page.gemeente_not_found_title')
    };
  }

  const isEn = locale === 'en';
  const title = isEn
    ? `Gardener in ${gemeenteData.name} | ${regionHub.name} | Hovenier.frl`
    : `Hovenier in ${gemeenteData.name} | ${regionHub.name} | Hovenier.frl`;
  const description = isEn
    ? `Find local gardeners in ${gemeenteData.name}, ${regionHub.name}. ${gemeenteData.introEn || gemeenteData.intro} Compare local garden specialists in this municipality.`
    : `Vind lokale hoveniers in ${gemeenteData.name}, ${regionHub.name}. ${gemeenteData.intro} Vergelijk lokale tuinspecialisten in deze gemeente.`;

  return {
    title,
    description,
    keywords: isEn
      ? `gardener ${gemeenteData.name.toLowerCase()}, ${regionHub.name.toLowerCase()}, local gardener, garden maintenance ${gemeenteData.name}`
      : `hovenier ${gemeenteData.name.toLowerCase()}, ${regionHub.name.toLowerCase()}, lokale tuinman, tuinonderhoud ${gemeenteData.name}`,
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
  const isEn = validLocale === 'en';

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
    }
  };

  // Sample related articles data
  const relatedArticles = isEn ? [
    {
      id: "1",
      title: `Garden maintenance in ${gemeenteData.name}: Tips from local gardeners`,
      excerpt: `Practical tips for garden maintenance in ${gemeenteData.name} from experienced local specialists.`,
      slug: `tuinonderhoud-${gemeente}`,
      category: "Garden Maintenance",
      readTime: 5,
      publishedAt: "2024-03-20",
    },
    {
      id: "2",
      title: `Best time for garden installation in ${regionHub.name}`,
      excerpt: `Explanation of the optimal timing for garden installation in the ${regionHub.name} region.`,
      slug: `tuinaanleg-timing-${slug}`,
      category: "Garden Installation",
      readTime: 7,
      publishedAt: "2024-03-15",
    },
    {
      id: "3",
      title: `Costs of gardening services in Friesland 2024`,
      excerpt: `Overview of prices for professional gardening services throughout Friesland.`,
      slug: "kosten-hovenierdiensten-friesland-2024",
      category: "Costs",
      readTime: 6,
      publishedAt: "2024-03-10",
    }
  ] : [
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
    { label: isEn ? 'Regions' : 'Regio\'s', href: '/regio' },
    { label: regionHub.name, href: `/regio/${slug}` },
    { label: gemeenteData.name, href: `/regio/${slug}/${gemeente}` }
  ];

  return (
    <div className="page-container">
      <LocalBusinessSchema
        url={`https://hovenier.frl${localizePath(`/regio/${slug}/${gemeente}`, validLocale)}`}
        nameContext={isEn ? `Gardeners in ${gemeenteData.name}` : `Hoveniers in ${gemeenteData.name}`}
        services={isEn ? [
          "Garden Maintenance",
          "Garden Design",
          "Paving",
          "Tree Care",
          "Green Roofs",
          "Garden Installation"
        ] : [
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
        <section style={{ background: 'var(--cream-light)', borderBottom: '0.5px solid var(--border)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        {/* Hero Section */}
        <section style={{ background: 'var(--white)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div className='region-hero'>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                  <div style={{
                    background: 'var(--forest-light)',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg style={{ width: '32px', height: '32px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h1 style={{ fontSize: '3rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem', lineHeight: '1.1' }}>
                      {isEn ? 'Gardener in' : 'Hovenier in'} {gemeenteData.name}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', margin: '0' }}>
                      {regionHub.name} • {gemeenteData.population.toLocaleString()} {isEn ? 'residents' : 'inwoners'}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', marginBottom: '2rem', lineHeight: '1.6' }}>
                  {isEn ? (gemeenteData.introEn || gemeenteData.intro) : gemeenteData.intro}
                </p>

                {/* Municipality Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>
                      {gemeenteData.population.toLocaleString()}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--forest-mid)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{isEn ? 'Residents' : 'Inwoners'}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>
                      {gemeenteData.nearby.length}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--forest-mid)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{isEn ? 'Nearby Municipalities' : 'Naburige Gemeenten'}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>
                      {regionHub.gemeentes.length}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--forest-mid)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{isEn ? 'In' : 'In'} {regionHub.name}</p>
                  </div>
                </div>

                {/* Nearby Gemeenten */}
                {gemeenteData.nearby.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
                      {isEn ? 'Near' : 'Nabij'} {gemeenteData.name}
                    </h3>
                    <div className="city-grid">
                      {gemeenteData.nearby.map((nearbySlug) => {
                        const nearbyGemeente = getGemeenteBySlug(nearbySlug);
                        const nearbyRegionSlug = getRegionSlugByGemeenteSlug(nearbySlug);
                        if (!nearbyGemeente || !nearbyRegionSlug) return null;
                        return (
                          <Link style={{ backgroundColor: 'white', borderRadius: '8px', padding: "24px 1rem", border: '1px solid #2A3E201F', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '252px' }} key={nearbySlug} href={localizePath(`/regio/${nearbyRegionSlug}/${nearbySlug}`, validLocale)}>
                            <div style={{ borderRadius: '50%', width: '48px', height: '48px', backgroundColor: 'var(--forest-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.05997 4.85984C7.63536 3.28446 9.77204 2.39941 12 2.39941C14.2279 2.39941 16.3646 3.28446 17.94 4.85984C19.5154 6.43523 20.4004 8.57191 20.4004 10.7998C20.4004 13.0278 19.5154 15.1645 17.94 16.7398L12 22.6798L6.05997 16.7398C5.27987 15.9598 4.66105 15.0338 4.23886 14.0146C3.81667 12.9954 3.59937 11.903 3.59937 10.7998C3.59937 9.69667 3.81667 8.6043 4.23886 7.5851C4.66105 6.56591 5.27987 5.63987 6.05997 4.85984ZM12 13.1998C12.6365 13.1998 13.2469 12.947 13.697 12.4969C14.1471 12.0468 14.4 11.4364 14.4 10.7998C14.4 10.1633 14.1471 9.55287 13.697 9.10279C13.2469 8.6527 12.6365 8.39984 12 8.39984C11.3635 8.39984 10.753 8.6527 10.3029 9.10279C9.85283 9.55287 9.59997 10.1633 9.59997 10.7998C9.59997 11.4364 9.85283 12.0468 10.3029 12.4969C10.753 12.947 11.3635 13.1998 12 13.1998Z" fill="white" />
                              </svg>
                            </div>
                            <p style={{ color: '#1C3A12', fontSize: '15px', lineHeight: '19.5px' }}>{nearbyGemeente.name}</p>
                          </Link>
                        );
                      })}
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
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '2rem', textAlign: 'center' }}>
              {isEn ? `Popular Gardening Services in ${gemeenteData.name}` : `Populaire Hovenierdiensten in ${gemeenteData.name}`}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <DienstCard
                id="tuinonderhoud"
                title={isEn ? 'Garden Maintenance' : 'Tuinonderhoud'}
                subtitle={isEn ? 'Regular maintenance & care' : 'Regulier onderhoud & verzorging'}
                description={isEn ? 'Regular maintenance for a beautiful garden all year round' : 'Regelmatig onderhoud voor een mooie tuin het hele jaar door'}
                image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
                locale={validLocale}
              />
              <DienstCard
                id="tuinontwerp"
                title={isEn ? 'Garden Design' : 'Tuinontwerp'}
                subtitle={isEn ? 'Creative garden concepts' : 'Creatieve tuinconcepten'}
                description={isEn ? 'Professional design for your dream garden' : 'Professioneel ontwerp voor uw droomtuin'}
                image="https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&q=80"
                locale={validLocale}
              />
              <DienstCard
                id="stratenmaker"
                title={isEn ? 'Paving' : 'Bestrating'}
                subtitle={isEn ? 'Terraces & garden paths' : 'Terrassen & tuinpaden'}
                description={isEn ? 'Terraces, driveways and garden paths professionally installed' : 'Terrassen, opritten en tuinpaden professioneel aangelegd'}
                image="https://images.unsplash.com/photo-1722953529218-7ade56b81293?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                locale={validLocale}
              />
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section style={{ background: 'var(--white)', }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
                {isEn ? `Request a free quote in ${gemeenteData.name}` : `Gratis offerte aanvragen in ${gemeenteData.name}`}
              </h2>
              <p style={{ color: 'var(--forest-mid)', fontSize: '1.125rem' }}>
                {isEn ? 'Receive responses from local gardening specialists within 24 hours' : 'Ontvang binnen 24 uur reacties van lokale hovenier specialisten'}
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
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
              {isEn ? `More Gardeners in ${regionHub.name}` : `Meer Hoveniers in ${regionHub.name}`}
            </h2>
            <p style={{ color: 'var(--forest-mid)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              {isEn ? `View all ${regionHub.gemeentes.length} municipalities in this region` : `Bekijk alle ${regionHub.gemeentes.length} gemeenten in deze regio`}
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
                {isEn ? 'All Regions →' : 'Alle Regio\'s →'}
              </a>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <RelatedArticles
          articles={relatedArticles}
          title={isEn ? `Related articles for ${gemeenteData.name}` : `Gerelateerde artikelen voor ${gemeenteData.name}`}
        />
      </main>
    </div>
  )
}