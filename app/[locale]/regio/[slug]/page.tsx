import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../components/StructuredData'
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils';
import { createTranslator } from '@/i18n'
import { interp } from '@/lib/translator'
import { regionHubs, getRegionHubBySlug, standaloneRegions } from '@/lib/regions-hierarchy'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = createTranslator(locale);

  const regionHub = getRegionHubBySlug(slug);

  if (!regionHub) {
    return { title: t('regio_page.not_found_title') };
  }

  const regionNameEn: Record<string, string> = {
    'noordwest-friesland': 'Northwest Friesland',
    'noordoost-friesland': 'Northeast Friesland',
    'centraal-friesland': 'Central Friesland',
    'zuidwest-friesland': 'Southwest Friesland',
  };

  const hubName = locale === 'en' ? (regionNameEn[regionHub.slug] || regionHub.name) : regionHub.name;
  const description = locale === 'en' ? regionHub.descriptionEn || regionHub.description : regionHub.description;
  const vars = {
    hubName,
    hubNameLower: hubName.toLowerCase(),
    count: regionHub.gemeentes.length,
    description,
    gemeenteNames: regionHub.gemeentes.map(g => g.name).join(', '),
  };
  const title = interp(t('regio_page.hub_meta_title'), vars);
  const metaDescription = interp(t('regio_page.hub_meta_description'), vars);
  return {
    title,
    description: metaDescription,
    keywords: interp(t('regio_page.hub_meta_keywords'), vars),
    alternates: getLocaleAlternates(`/regio/${slug}`, locale as SupportedLocale),
    openGraph: {
      title,
      description: metaDescription,
      url: getAbsoluteUrl(`/regio/${slug}`, locale as SupportedLocale),
      siteName: 'Hovenier.frl',
      locale: locale,
      type: 'website',
    },
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

  if (!regionHub) {
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

  const displayName = isEn ? (regionNameEn[regionHub.slug] || regionHub.name) : regionHub.name;

  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: t('regio_page.breadcrumb_regions'), href: localizePath('/regio', locale as SupportedLocale) },
    { label: displayName, href: localizePath(`/regio/${slug}`, locale as SupportedLocale) }
  ];

  return (
    <div className="page-container">
      <LocalBusinessSchema
        url={getAbsoluteUrl(`/regio/${slug}`, validLocale)}
        nameContext={interp(t('regio_page.schema_name_context'), { displayName })}
        services={[
          t('city_page.tuinonderhoud_title') || (isEn ? 'Garden Maintenance' : 'Tuinonderhoud'),
          t('city_page.tuinontwerp_title') || (isEn ? 'Garden Design' : 'Tuinontwerp'),
          t('gemeente_page.stratenmaker_title') || (isEn ? 'Paving' : 'Bestrating'),
          isEn ? 'Tree Care' : 'Boomverzorging',
          t('city_page.groendak_title') || (isEn ? 'Green Roofs' : 'Groendaken'),
          isEn ? 'Garden Installation' : 'Tuinaanleg',
        ]}
      />

      <BreadcrumbSchema
        items={breadcrumbItems.map((item, index) => ({
          position: index + 1,
          name: item.label,
          url: item.href ? getAbsoluteUrl(item.href, validLocale) : getAbsoluteUrl(`/regio/${slug}`, validLocale)
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
        <section style={{ background: '#2A3E20EB', width: '100%' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center', padding: '56px 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ fontSize: '48px', fontFamily: 'var(--heading-font)', fontWeight: '500', color: '#F4F0E8', lineHeight: '52px' }}>
              {interp(t('regio_page.hero_title'), { displayName })}
            </h1>
            <p style={{ fontSize: '15px', color: '#C8DFC0', lineHeight: '25px', fontWeight: 500 }}>
              {interp(t('regio_page.hero_subtitle_hub'), { count: regionHub.gemeentes.length, population: regionHub.totalPopulation.toLocaleString() })}
            </p>
            <p style={{ fontSize: '15px', color: '#C8DFC0', lineHeight: '25px', fontWeight: 500 }}>
              {(isEn ? regionHub.introEn || regionHub.intro : regionHub.intro)}{' '}{t('regio_page.hero_description_suffix')}
            </p>
          </div>
        </section>

        {/* Region Characteristics */}
        <section style={{ background: 'var(--cream-dark)', padding: '3rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '2rem', textAlign: 'center' }}>
              {interp(t('regio_page.characteristics_title'), { displayName })}
            </h2>
            <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '2rem' }}>
              <p style={{ color: 'var(--forest-mid)', fontSize: '1.125rem', lineHeight: '1.7', textAlign: 'center', marginBottom: '2rem' }}>
                {isEn ? regionHub.descriptionEn || regionHub.description : regionHub.description}
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
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>{t('regio_page.local_expertise_title')}</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>{t('regio_page.local_expertise_desc')}</p>
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
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>{t('regio_page.proven_quality_title')}</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>{t('regio_page.proven_quality_desc')}</p>
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
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>{t('regio_page.fast_service_title')}</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>{t('regio_page.fast_service_desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gemeentes Section */}
        <section style={{ padding: '4rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem', textAlign: 'center' }}>
              {interp(t('regio_page.municipalities_title'), { name: regionHub.name })}
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--forest-mid)', marginBottom: '3rem', fontSize: '1.125rem' }}>
              {t('regio_page.click_municipality')}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 360px))', gap: '2rem' }}>
              {regionHub.gemeentes.map((gemeente) => (
                <Link key={gemeente.slug} href={localizePath(`/regio/${slug}/${gemeente.slug}`, validLocale)}>
                  <div className="region-hub-card" style={{ height: '100%' }}>
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
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
                            {gemeente.population.toLocaleString()} {t('regio_page.residents')}
                          </p>
                        </div>
                      </div>

                      <p style={{ color: 'var(--forest-mid)', fontSize: '15px', marginBottom: '1rem', lineHeight: '1.6' }}>
                        {isEn ? (gemeente.introEn || gemeente.intro) : gemeente.intro}
                      </p>

                      {gemeente.nearby.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                          <p style={{ fontSize: '14px', color: 'var(--forest)', fontWeight: '600', marginBottom: '0.5rem' }}>
                            {t('regio_page.nearby_municipalities')}
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
                          {t('regio_page.view_gardeners')}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--white)', fontWeight: '500' }}>
                          {regionHub.gemeentes.filter(g => g.nearby.includes(gemeente.name.toLowerCase())).length || 0} {t('regio_page.nearby')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Back to Regions */}
        <section style={{ background: 'var(--cream-light)', padding: '3rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
              {t('regio_page.other_regions_title')}
            </h2>
            <p style={{ color: 'var(--forest-mid)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              {t('regio_page.other_regions_desc')}
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
                {t('regio_page.all_regions_btn')}
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}