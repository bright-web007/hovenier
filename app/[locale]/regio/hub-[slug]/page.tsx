import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../components/StructuredData'
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { regionHubs, getRegionHubBySlug, type RegionHub } from '@/lib/regions-hierarchy'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const regionHub = getRegionHubBySlug(slug);
  
  if (!regionHub) {
    return {
      title: 'Regio niet gevonden | Hovenier.frl'
    };
  }

  const title = `Hoveniers in ${regionHub.name} | Hovenier.frl`;
  const description = `Vind lokale hoveniers in ${regionHub.name} met ${regionHub.gemeentes.length} gemeenten. ${regionHub.description}. Vergelijk lokale tuinspecialisten.`;
  
  return {
    title,
    description,
    keywords: `hovenier ${regionHub.name.toLowerCase()}, ${regionHub.gemeentes.map(g => g.name).join(', ')}, lokale tuinman, Friesland hoveniers`,
    alternates: getLocaleAlternates(`/regio/hub-${slug}`, locale as SupportedLocale),
    openGraph: {
      title,
      description,
      url: getAbsoluteUrl(`/regio/hub-${slug}`, locale as SupportedLocale),
      siteName: 'Hovenier.frl',
      locale: locale,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return regionHubs.flatMap(hub => 
    ['nl', 'en'].map(locale => ({
      locale,
      slug: hub.slug
    }))
  );
}

export default async function RegionHubPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  const regionHub = getRegionHubBySlug(slug);
  
  if (!regionHub) {
    notFound();
  }

  const validLocale = locale as SupportedLocale;
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Regio\'s', href: '/regio' },
    { label: regionHub.name, href: `/regio/hub-${slug}` }
  ];

  return (
    <div className="page-container">
      <LocalBusinessSchema 
        url={`https://hovenier.frl${localizePath(`/regio/hub-${slug}`, validLocale)}`}
        nameContext={`Hoveniers in ${regionHub.name}`}
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
          url: item.href ? `https://hovenier.frl${item.href}` : `https://hovenier.frl${localizePath(`/regio/hub-${slug}`, validLocale)}`
        }))}
      />

      <Navigation locale={validLocale} />
      
      <main>
        {/* Breadcrumbs */}
        <section style={{ background: 'var(--cream-light)', padding: '1rem 0', borderBottom: '0.5px solid var(--border)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        {/* Hero Section */}
        <section style={{ background: 'var(--white)', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
              <div style={{ 
                background: 'var(--sage-light)', 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <svg style={{ width: '32px', height: '32px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <h1 style={{ fontSize: '3rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem', lineHeight: '1.1' }}>
                  Hoveniers in {regionHub.name}
                </h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--forest-mid)', margin: '0' }}>
                  {regionHub.gemeentes.length} gemeenten • {regionHub.totalPopulation.toLocaleString()} inwoners
                </p>
              </div>
            </div>
            <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '48rem', margin: '0 auto 2rem' }}>
              {regionHub.intro} Ontdek lokale hoveniers die bekend zijn met de unieke kenmerken van deze regio.
            </p>
          </div>
        </section>

        {/* Region Characteristics */}
        <section style={{ background: 'var(--cream-dark)', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '2rem', textAlign: 'center' }}>
              Kenmerken van {regionHub.name}
            </h2>
            <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '2rem' }}>
              <p style={{ color: 'var(--forest-mid)', fontSize: '1.125rem', lineHeight: '1.7', textAlign: 'center', marginBottom: '2rem' }}>
                {regionHub.description}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: 'var(--sage-light)', 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1rem' 
                  }}>
                    <svg style={{ width: '28px', height: '28px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>Lokale Expertise</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>Hoveniers met specifieke kennis van lokale bodem en klimaat</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: 'var(--sage-light)', 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1rem' 
                  }}>
                    <svg style={{ width: '28px', height: '28px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>Bewezen Kwaliteit</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>Ervaren professionals met lokale referenties</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: 'var(--sage-light)', 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1rem' 
                  }}>
                    <svg style={{ width: '28px', height: '28px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>Snelle Service</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>Korte reisafstanden voor efficiënte planning</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gemeentes Grid */}
        <section style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem', textAlign: 'center' }}>
            Gemeenten in {regionHub.name}
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--forest-mid)', marginBottom: '3rem', fontSize: '1.125rem' }}>
            Klik op een gemeente om hoveniers in dat gebied te bekijken
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {regionHub.gemeentes.map((gemeente) => (
              <Link key={gemeente.slug} href={localizePath(`/gemeente/${gemeente.slug}`, validLocale)}>
                <div className="region-hub-card">
                  <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
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
                        <svg style={{ width: '24px', height: '24px', color: 'var(--forest)' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.25rem', fontFamily: 'var(--serif)' }}>
                          {gemeente.name}
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--forest-mid)', margin: '0' }}>
                          {gemeente.population.toLocaleString()} inwoners
                        </p>
                      </div>
                    </div>
                    
                    <p style={{ color: 'var(--forest-mid)', fontSize: '15px', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      {gemeente.intro}
                    </p>
                    
                    {gemeente.nearby.length > 0 && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ fontSize: '14px', color: 'var(--forest)', fontWeight: '600', marginBottom: '0.5rem' }}>
                          Nabij gemeenten:
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {gemeente.nearby.slice(0, 3).map((nearbyName) => (
                            <span key={nearbyName} style={{ 
                              background: 'var(--cream-light)', 
                              color: 'var(--forest-mid)', 
                              padding: '0.25rem 0.75rem', 
                              borderRadius: '12px', 
                              fontSize: '12px',
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
                      background: 'var(--forest-light)', 
                      borderRadius: '8px', 
                      marginTop: 'auto'
                    }}>
                      <span style={{ color: 'var(--forest)', fontWeight: '600', fontSize: '14px' }}>
                        Bekijk hoveniers →
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--forest)', fontWeight: '500' }}>
                        {regionHub.gemeentes.filter(g => g.nearby.includes(gemeente.name.toLowerCase())).length || 0} nabij
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Back to Regions */}
        <section style={{ background: 'var(--cream-light)', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
              Andere Regio's Bekijken
            </h2>
            <p style={{ color: 'var(--forest-mid)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              Ontdek hoveniers in andere Friese regio's
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
                ← Alle Regio's
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}