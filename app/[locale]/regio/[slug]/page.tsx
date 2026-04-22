import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../components/StructuredData'
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { env } from '@/lib/env';
import { createTranslator } from '@/i18n'
import { regionHubs, getRegionHubBySlug, standaloneRegions, getGemeenteBySlug } from '@/lib/regions-hierarchy'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  // Check for region hub first
  const regionHub = getRegionHubBySlug(slug);

  // If not a region hub, check for standalone region
  const standaloneRegion = regionHub ? null : getGemeenteBySlug(slug);

  if (!regionHub && !standaloneRegion) {
    return {
      title: createTranslator(locale)('regio_page.not_found_title')
    };
  }

  const regionNameEn: Record<string, string> = {
    'noordwest-friesland': 'Northwest Friesland',
    'noordoost-friesland': 'Northeast Friesland',
    'centraal-friesland': 'Central Friesland',
    'zuidwest-friesland': 'Southwest Friesland',
  };

  if (regionHub) {
    const isEn = locale === 'en';
    const hubName = isEn ? (regionNameEn[regionHub.slug] || regionHub.name) : regionHub.name;
    const title = isEn
      ? `Gardeners in ${hubName} | Hovenier.frl`
      : `Hoveniers in ${regionHub.name} | Hovenier.frl`;
    const description = isEn
      ? `Find local gardeners in ${hubName} with ${regionHub.gemeentes.length} municipalities. ${regionHub.descriptionEn || regionHub.description}. Compare local garden specialists.`
      : `Vind lokale hoveniers in ${regionHub.name} met ${regionHub.gemeentes.length} gemeenten. ${regionHub.description}. Vergelijk lokale tuinspecialisten.`;
    const keywords = isEn
      ? `gardener ${hubName.toLowerCase()}, ${regionHub.gemeentes.map(g => g.name).join(', ')}, local gardener, Friesland gardeners`
      : `hovenier ${regionHub.name.toLowerCase()}, ${regionHub.gemeentes.map(g => g.name).join(', ')}, lokale tuinman, Friesland hoveniers`;

    return {
      title,
      description,
      keywords,
      alternates: getLocaleAlternates(`/regio/${slug}`, locale as SupportedLocale),
      openGraph: {
        title,
        description,
        url: getAbsoluteUrl(`/regio/${slug}`, locale as SupportedLocale),
        siteName: 'Hovenier.frl',
        locale: locale,
        type: 'website',
      },
    }
  } else if (standaloneRegion) {
    const isEn = locale === 'en';
    const title = isEn
      ? `Gardener ${standaloneRegion.name} | Local Garden Specialists`
      : `Hovenier ${standaloneRegion.name} | Lokale Tuinspecialisten`;
    const description = isEn
      ? `Find professional gardeners in ${standaloneRegion.name}. ${standaloneRegion.introEn || standaloneRegion.intro} Compare local garden specialists and request quotes.`
      : `Vind professionele hoveniers in ${standaloneRegion.name}. ${standaloneRegion.intro} Vergelijk lokale tuinspecialisten en vraag offertes aan.`;

    return {
      title,
      description,
      keywords: isEn
        ? `gardener ${standaloneRegion.name.toLowerCase()}, local gardener, Friesland gardeners`
        : `hovenier ${standaloneRegion.name.toLowerCase()}, tuinman ${standaloneRegion.name.toLowerCase()}, lokale hovenier, Friesland hoveniers`,
      alternates: getLocaleAlternates(`/regio/${slug}`, locale as SupportedLocale),
      openGraph: {
        title,
        description,
        url: getAbsoluteUrl(`/regio/${slug}`, locale as SupportedLocale),
        siteName: 'Hovenier.frl',
        locale: locale,
        type: 'website',
      },
    }
  }

  // Fallback if neither found
  return {
    title: createTranslator(locale)('regio_page.not_found_title')
  };
}

export async function generateStaticParams() {
  // Include both region hubs and standalone regions
  const hubParams = regionHubs.flatMap(hub =>
    ['nl', 'en'].map(locale => ({
      locale,
      slug: hub.slug
    }))
  );

  const standaloneParams = standaloneRegions.flatMap(region =>
    ['nl', 'en'].map(locale => ({
      locale,
      slug: region.slug
    }))
  );

  return [...hubParams, ...standaloneParams];
}

export default async function RegionHubPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Check for region hub first
  const regionHub = getRegionHubBySlug(slug);

  // If not a region hub, check for standalone region
  const standaloneRegion = regionHub ? null : getGemeenteBySlug(slug);

  if (!regionHub && !standaloneRegion) {
    notFound();
  }

  const validLocale = locale as SupportedLocale;
  const isEn = locale === 'en';
  const t = createTranslator(locale);

  const regionNameEn: Record<string, string> = {
    'noordwest-friesland': 'Northwest Friesland',
    'noordoost-friesland': 'Northeast Friesland',
    'centraal-friesland': 'Central Friesland',
    'zuidwest-friesland': 'Southwest Friesland',
  };

  // Set up data based on type
  const displayName = regionHub ? (isEn ? (regionNameEn[regionHub.slug] || regionHub.name) : regionHub.name) : standaloneRegion!.name;

  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: isEn ? 'Regions' : 'Regio\'s', href: localizePath('/regio', locale as SupportedLocale) },
    { label: displayName, href: localizePath(`/regio/${slug}`, locale as SupportedLocale) }
  ];

  return (
    <div className="page-container">
      <LocalBusinessSchema
        url={`${env.NEXT_PUBLIC_BASE_URL}${localizePath(`/regio/${slug}`, validLocale)}`}
        nameContext={isEn ? `Gardeners in ${displayName}` : `Hoveniers in ${displayName}`}
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
          url: item.href ? `${env.NEXT_PUBLIC_BASE_URL}${item.href}` : `${env.NEXT_PUBLIC_BASE_URL}${localizePath(`/regio/${slug}`, validLocale)}`
        }))}
      />

      <Navigation locale={validLocale} />

      <main>
        {/* Breadcrumbs */}
        <section style={{ background: 'var(--cream-light)', borderBottom: '0.5px solid var(--border)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        {/* Hero Section */}
        <section style={{ background: 'var(--white)', padding: '3rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', gap: '1rem' }}>
              <div style={{
                background: 'var(--forest-light)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '32px', height: '32px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <h1 style={{ fontSize: '3rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem', lineHeight: '1.1' }}>
                  {isEn ? 'Gardeners in' : 'Hoveniers in'} {displayName}
                </h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--forest-mid)', margin: '0' }}>
                  {regionHub ?
                    `${regionHub.gemeentes.length} ${isEn ? 'municipalities' : 'gemeenten'} • ${regionHub.totalPopulation.toLocaleString()} ${isEn ? 'residents' : 'inwoners'}` :
                    `${standaloneRegion!.population.toLocaleString()} ${isEn ? 'residents' : 'inwoners'} • ${isEn ? 'Capital of Friesland' : 'Hoofdstad van Friesland'}`
                  }
                </p>
              </div>
            </div>
            <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '48rem', margin: '0 auto 2rem' }}>
              {regionHub ? (isEn ? regionHub.introEn || regionHub.intro : regionHub.intro) : (isEn ? standaloneRegion!.introEn || standaloneRegion!.intro : standaloneRegion!.intro)} {isEn ? 'Discover local gardeners who are familiar with the unique characteristics of this region.' : 'Ontdek lokale hoveniers die bekend zijn met de unieke kenmerken van deze regio.'}
            </p>
          </div>
        </section>

        {/* Region Characteristics */}
        <section style={{ background: 'var(--cream-dark)', padding: '3rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '2rem', textAlign: 'center' }}>
              {isEn ? 'Characteristics of' : 'Kenmerken van'} {displayName}
            </h2>
            <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '2rem' }}>
              <p style={{ color: 'var(--forest-mid)', fontSize: '1.125rem', lineHeight: '1.7', textAlign: 'center', marginBottom: '2rem' }}>
                {regionHub ? (isEn ? regionHub.descriptionEn || regionHub.description : regionHub.description) : (isEn ? `${standaloneRegion!.name} is the vibrant capital of Friesland with a rich history and diversity of garden styles.` : `${standaloneRegion!.name} is de bruisende hoofdstad van Friesland met een rijke historie en diversiteit aan tuinstijlen.`)}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    background: 'var(--forest-light)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <svg style={{ width: '28px', height: '28px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>{isEn ? 'Local Expertise' : 'Lokale Expertise'}</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>{isEn ? 'Gardeners with specific knowledge of local soil and climate' : 'Hoveniers met specifieke kennis van lokale bodem en klimaat'}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    background: 'var(--forest-light)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <svg style={{ width: '28px', height: '28px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>{isEn ? 'Proven Quality' : 'Bewezen Kwaliteit'}</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>{isEn ? 'Experienced professionals with local references' : 'Ervaren professionals met lokale referenties'}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    background: 'var(--forest-light)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <svg style={{ width: '28px', height: '28px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>{isEn ? 'Fast Service' : 'Snelle Service'}</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>{isEn ? 'Short travel distances for efficient scheduling' : 'Korte reisafstanden voor efficiënte planning'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gemeentes Grid */}
        {/* Gemeentes Section - Only for Region Hubs */}
        {regionHub && (
          <section style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem', textAlign: 'center' }}>
              {isEn ? 'Municipalities in' : 'Gemeenten in'} {regionHub.name}
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--forest-mid)', marginBottom: '3rem', fontSize: '1.125rem' }}>
              {isEn ? 'Click on a municipality to view gardeners in that area' : 'Klik op een gemeente om hoveniers in dat gebied te bekijken'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {regionHub.gemeentes.map((gemeente) => (
                <Link key={gemeente.slug} href={localizePath(`/regio/${slug}/${gemeente.slug}`, validLocale)}>
                  <div className="region-hub-card">
                    <div style={{ padding: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{
                          background: 'var(--forest-light)',
                          width: '48px',
                          height: '48px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1rem'
                        }}>
                          <svg style={{ width: '24px', height: '24px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.25rem', fontFamily: 'var(--heading-font)' }}>
                            {gemeente.name}
                          </h3>
                          <p style={{ fontSize: '14px', color: 'var(--forest-mid)', margin: '0' }}>
                            {gemeente.population.toLocaleString()} {isEn ? 'residents' : 'inwoners'}
                          </p>
                        </div>
                      </div>

                      <p style={{ color: 'var(--forest-mid)', fontSize: '15px', marginBottom: '1rem', lineHeight: '1.6' }}>
                        {isEn ? (gemeente.introEn || gemeente.intro) : gemeente.intro}
                      </p>

                      {gemeente.nearby.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                          <p style={{ fontSize: '14px', color: 'var(--forest)', fontWeight: '600', marginBottom: '0.5rem' }}>
                            {isEn ? 'Nearby municipalities:' : 'Nabij gemeenten:'}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {gemeente.nearby.slice(0, 3).map((nearbyName) => (
                              <span key={nearbyName} style={{
                                background: '#F5F0E8',
                                color: '#5C4033',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '500'
                              }}>
                                {nearbyName}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        background: 'var(--forest)',
                        borderRadius: '8px',
                        marginTop: 'auto'
                      }}>
                        <span style={{ color: 'var(--white)', fontWeight: '600', fontSize: '14px' }}>
                          {isEn ? 'View gardeners →' : 'Bekijk hoveniers →'}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--white)', fontWeight: '500' }}>
                          {regionHub.gemeentes.filter(g => g.nearby.includes(gemeente.name.toLowerCase())).length || 0} {isEn ? 'nearby' : 'nabij'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Standalone Region Content - Only for standalone regions like Leeuwarden */}
        {standaloneRegion && (
          <section style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem', textAlign: 'center' }}>
              {isEn ? 'Gardeners in' : 'Hoveniers in'} {standaloneRegion.name}
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--forest-mid)', marginBottom: '3rem', fontSize: '1.125rem' }}>
              {isEn ? 'Discover experienced gardeners in the capital of Friesland' : 'Ontdek ervaren hoveniers in de hoofdstad van Friesland'}
            </p>

            <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}>
              <div style={{
                background: 'var(--forest-light)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <svg style={{ width: '40px', height: '40px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem', fontFamily: 'var(--heading-font)' }}>
                {isEn ? 'Capital of Friesland' : 'Hoofdstad van Friesland'}
              </h3>
              <p style={{ color: 'var(--forest-mid)', fontSize: '1.125rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
                {isEn ? (standaloneRegion.introEn || standaloneRegion.intro) : standaloneRegion.intro}
              </p>
            </div>
          </section>
        )}

        {/* Back to Regions */}
        <section style={{ background: 'var(--cream-light)', padding: '3rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
              {isEn ? 'View Other Regions' : 'Andere Regio\'s Bekijken'}
            </h2>
            <p style={{ color: 'var(--forest-mid)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              {isEn ? 'Discover gardeners in other Frisian regions' : 'Ontdek hoveniers in andere Friese regio\'s'}
            </p>
            <Link href={localizePath('/regio', validLocale)}>
              <div style={{
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
              }}
                className="back-to-regions-btn"
              >
                ← {isEn ? 'All Regions' : 'Alle Regio\'s'}
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}