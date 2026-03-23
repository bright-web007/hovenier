import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LocalBusinessSchema } from '../../components/StructuredData';
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils';
import { regionHubs, standaloneRegions } from '@/lib/regions-hierarchy';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Hoveniers per Regio in Friesland | Hovenier.frl',
    description: 'Vind lokale hoveniers in alle regio\'s van Friesland. Van Noordwest-Friesland tot Zuidwest-Friesland - ontdek welke tuinspecialisten actief zijn in jouw regio.',
    keywords: 'hovenier per regio, Friesland hoveniers, lokale tuinman, regio hovenier, Friese gemeenten',
    alternates: getLocaleAlternates('/regio', locale as SupportedLocale),
  }
}

// ISR: Never revalidate (static regional data, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export default async function RegioLandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale)

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: localizePath('/', locale as SupportedLocale) },
    { label: locale === 'en' ? 'Regions' : 'Regio\'s', href: localizePath('/regio', locale as SupportedLocale) }
  ];

  return (
    <>
      <LocalBusinessSchema 
        url={getAbsoluteUrl('/regio', locale as SupportedLocale)}
        nameContext="Hoveniers per Gemeente Friesland"
      />
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, var(--cream-light), var(--sage-light))' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          {/* Hero Section */}
          <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
              Hoveniers per Regio in Friesland
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', marginBottom: '2rem', lineHeight: '1.6' }}>
              Ontdek hoveniers georganiseerd per Friese regio. Van de kust tot het binnenland.
            </p>
          </div>

          {/* Friesland Map or Visual */}
          <section style={{ maxWidth: '64rem', margin: '0 auto', marginBottom: '4rem' }}>
            <div style={{ background: 'var(--white)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1.5rem', textAlign: 'center', fontFamily: 'var(--serif)' }}>
                Waarom Lokale Hoveniers?
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: 'var(--sage-light)', 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1rem' 
                  }}>
                    <svg style={{ width: '32px', height: '32px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>Korte Afstand</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>Lagere reiskosten en snellere service door nabijheid</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: 'var(--forest-light)', 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1rem' 
                  }}>
                    <svg style={{ width: '32px', height: '32px', color: 'var(--forest)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 6.414V12z" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>Lokale Kennis</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>Bekend met bodemsoort, klimaat en lokale voorschriften</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: 'var(--sage-light)', 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1rem' 
                  }}>
                    <svg style={{ width: '32px', height: '32px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>Persoonlijke Service</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>Nabije relatie, beter begrip van uw wensen</p>
                </div>
              </div>
            </div>
          </section>

          {/* Regional Hubs Grid */}
          <section style={{ maxWidth: '80rem', margin: '0 auto', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '3rem', textAlign: 'center' }}>
              Kies uw Regio
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {/* Region Hubs */}
              {regionHubs.map((hub) => (
                <Link key={hub.slug} href={localizePath(`/regio/${hub.slug}`, locale as SupportedLocale)}>
                  <div className="region-hub-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ 
                          background: 'var(--sage-light)', 
                          width: '48px', 
                          height: '48px', 
                          borderRadius: '8px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          marginRight: '1rem' 
                        }}>
                          <svg style={{ width: '24px', height: '24px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.25rem', fontFamily: 'var(--serif)' }}>
                            {hub.name}
                          </h3>
                          <p style={{ fontSize: '14px', color: 'var(--forest-mid)', margin: '0' }}>{hub.gemeentes.length} gemeenten</p>
                        </div>
                      </div>
                      <p style={{ color: 'var(--forest-mid)', fontSize: '15px', marginBottom: '1.5rem', lineHeight: '1.6' }}>{hub.description}</p>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ fontSize: '14px', color: 'var(--forest)', fontWeight: '600', marginBottom: '0.5rem' }}>Gemeenten in deze regio:</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {hub.gemeentes.slice(0, 4).map((gemeente) => (
                            <span key={gemeente.slug} style={{ 
                              background: 'var(--cream-light)', 
                              color: 'var(--forest-mid)', 
                              padding: '0.25rem 0.75rem', 
                              borderRadius: '12px', 
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {gemeente.name}
                            </span>
                          ))}
                          {hub.gemeentes.length > 4 && (
                            <span style={{ 
                              color: 'var(--forest-mid)', 
                              fontSize: '12px',
                              fontWeight: '500',
                              padding: '0.25rem 0.5rem'
                            }}>
                              +{hub.gemeentes.length - 4} meer
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '1rem', 
                        background: 'var(--sage-light)', 
                        borderRadius: '8px', 
                        marginTop: 'auto'
                      }}>
                        <span style={{ color: 'var(--sage)', fontWeight: '600', fontSize: '14px' }}>
                          Ontdek hoveniers →
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--sage)', fontWeight: '500' }}>
                          {hub.totalPopulation.toLocaleString()} inwoners
                        </span>

                    </div>
                  </div>
                </Link>
              ))}
              
              {/* Standalone Leeuwarden */}
              {standaloneRegions.map((gemeente) => (
                <Link key={gemeente.slug} href={localizePath(`/regio/leeuwarden/${gemeente.slug}`, locale as SupportedLocale)}>
                  <div className="region-standalone-card" style={{ padding: '2rem' }}>
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
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1H8a1 1 0 01-1-1V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.25rem', fontFamily: 'var(--serif)' }}>
                            {gemeente.name}
                          </h3>
                          <p style={{ fontSize: '14px', color: 'var(--forest-mid)', margin: '0' }}>Hoofdstad van Friesland</p>
                        </div>
                      </div>
                      <p style={{ color: 'var(--forest-mid)', fontSize: '15px', marginBottom: '1.5rem', lineHeight: '1.6' }}>{gemeente.intro}</p>
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
                          {gemeente.population.toLocaleString()} inwoners
                      </span>
                    </div>  
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular Services by Region */}
          <section style={{ maxWidth: '64rem', margin: '0 auto', marginBottom: '4rem' }}>
            <div style={{ background: 'var(--cream-dark)', borderRadius: '12px', padding: '2rem' }}>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '2rem', textAlign: 'center' }}>
                Populaire Diensten per Regio
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>Kustgebieden</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px', marginBottom: '0.75rem' }}>(Noordwest & Noordoost-Friesland)</p>
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Zoutbestendige beplanting
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Windschermen & haagaanleg
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Kusttuinen & natuurlijke uitstraling
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>Binnenland</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px', marginBottom: '0.75rem' }}>(Centraal & Zuidwest-Friesland)</p>
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Landelijke & natuurlijke tuinen
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Boomgaarden & fruittuin aanleg
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Waterpartijen & natuurvijvers
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>Stedelijke Gebieden</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px', marginBottom: '0.75rem' }}>(Leeuwarden & Heerenveen)</p>
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Kleine tuinen & achtertuinen
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Tuinverbouwing & modernisering
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Groendaken & duurzaamheid
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Regional Statistics */}
          <section style={{ maxWidth: '64rem', margin: '0 auto' }}>
            <div style={{ background: 'var(--white)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1.5rem', textAlign: 'center' }}>
                Hoveniers in Friesland
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--sage)', marginBottom: '0.5rem', fontFamily: 'var(--serif)' }}>150+</p>
                  <p style={{ color: 'var(--forest-mid)', fontWeight: '500', fontSize: '14px' }}>Aangesloten Hoveniers</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem', fontFamily: 'var(--serif)' }}>11</p>
                  <p style={{ color: 'var(--forest-mid)', fontWeight: '500', fontSize: '14px' }}>Gemeenten Dekking</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--sage)', marginBottom: '0.5rem', fontFamily: 'var(--serif)' }}>24u</p>
                  <p style={{ color: 'var(--forest-mid)', fontWeight: '500', fontSize: '14px' }}>Gemiddelde Reactietijd</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--gold)', marginBottom: '0.5rem', fontFamily: 'var(--serif)' }}>4.8/5</p>
                  <p style={{ color: 'var(--forest-mid)', fontWeight: '500', fontSize: '14px' }}>Gemiddelde Beoordeling</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
    </>
  )
}
