import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'Hovenier per Gemeente in Friesland | Hovenier.frl',
  description: 'Vind lokale hoveniers in alle 11 Friese gemeenten. Van Leeuwarden tot Harlingen - bekijk welke tuinspecialisten actief zijn in jouw gemeente.',
  keywords: 'hovenier per gemeente, Friesland hoveniers, lokale tuinman, gemeente hovenier',
}

const frieslanders = [
  { name: 'Leeuwarden', slug: 'leeuwarden', population: '123.000', description: 'Hoofdstad van Friesland met diverse tuinspecialisten' },
  { name: 'Súdwest-Fryslân', slug: 'sudwest-fryslan', population: '89.000', description: 'Grootste gemeente van Friesland, veel landelijke tuinen' },
  { name: 'Smallingerland', slug: 'smallingerland', population: '56.000', description: 'Rond Drachten, mix van stedelijk en landelijk' },
  { name: 'Heerenveen', slug: 'heerenveen', population: '50.000', description: 'Sportstad met mooie woonwijken en tuinen' },
  { name: 'Achtkarspelen', slug: 'achtkarspelen', population: '28.000', description: 'Landelijke gemeente, veel boerderiatapijten' },
  { name: 'Tietjerksteradiel', slug: 'tietjerksteradiel', population: '25.000', description: 'Groene gemeente tussen Leeuwarden en Groningen' },
  { name: 'Dantumadiel', slug: 'dantumadiel', population: '19.000', description: 'Kleinste gemeente, persoonlijke service' },
  { name: 'De Fryske Marren', slug: 'de-fryske-marren', population: '51.000', description: 'Waterrijke gemeente, unieke tuin uitdagingen' },
  { name: 'Waadhoeke', slug: 'waadhoeke', population: '46.000', description: 'Kustgemeente, speciale klimatologische omstandigheden' },
  { name: 'Noardeast-Fryslân', slug: 'noardeast-fryslan', population: '45.000', description: 'Noordoosthoek, traditionele Friese tuinen' },
  { name: 'Harlingen', slug: 'harlingen', population: '16.000', description: 'Historische havenstad, klassieke stadstuinen' },
]

export default async function RegioHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale)

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'Regions' : 'Regio' }
  ];

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, var(--cream-light), var(--sage-light))' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          {/* Hero Section */}
          <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
              Hoveniers per Gemeente
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', marginBottom: '2rem', lineHeight: '1.6' }}>
              Vind lokale tuinspecialisten in alle 11 Friese gemeenten
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

          {/* Gemeente Grid */}
          <section style={{ maxWidth: '80rem', margin: '0 auto', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '3rem', textAlign: 'center' }}>
              Kies uw Gemeente
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {frieslanders.map((gemeente) => (
                <div key={gemeente.slug} style={{ 
                  background: 'var(--white)', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                  overflow: 'hidden',
                  transition: 'box-shadow 0.3s ease'
                }}>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>
                      {gemeente.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--forest-mid)', marginBottom: '0.75rem' }}>{gemeente.population} inwoners</p>
                    <p style={{ color: 'var(--forest-mid)', fontSize: '14px', marginBottom: '1rem', lineHeight: '1.5' }}>{gemeente.description}</p>
                    <a 
                      href={`/regio/${gemeente.slug}`}
                      style={{ 
                        display: 'block', 
                        width: '100%', 
                        textAlign: 'center', 
                        background: 'var(--sage)', 
                        color: 'var(--white)', 
                        padding: '0.75rem 1rem', 
                        borderRadius: '8px', 
                        fontSize: '14px',
                        fontWeight: '500', 
                        textDecoration: 'none',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      Bekijk Hoveniers →
                    </a>
                  </div>
                </div>
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
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>Stedelijke Gemeenten</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px', marginBottom: '0.75rem' }}>(Leeuwarden, Heerenveen, Smallingerland)</p>
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
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Bestrating & terrassen
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>Landelijke Gemeenten</h3>
                  <p style={{ color: 'var(--forest-mid)', fontSize: '14px', marginBottom: '0.75rem' }}>(Súdwest-Fryslân, Achtkarspelen, etc.)</p>
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--forest)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Grote tuinen & landschappen
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--forest)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Boomverzorging & heggen
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--forest)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Traditioneel tuinbeheer
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--forest)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }}></span>
                      Ecologisch tuinbeheer
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