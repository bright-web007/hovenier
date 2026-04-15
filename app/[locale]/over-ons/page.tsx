import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation'
import Breadcrumbs from '../../components/Breadcrumbs'
import { getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const isEn = locale === 'en';
  return {
    title: isEn ? 'About Us - Hovenier.frl | Friesland\'s Gardener Directory' : 'Over Ons - Hovenier.frl | Friesland\'s Tuinier Directory',
    description: isEn ? 'Discover what Hovenier.frl is and how our platform works for homeowners. Learn how to get free quotes from local gardeners in Friesland in 3 steps.' : 'Ontdek wat hovenier.frl is en hoe ons platform werkt voor huiseigenaren. Leer hoe je in 3 stappen gratis offertes krijgt van lokale hoveniers in Friesland.',
    keywords: isEn ? 'about us, gardener platform, Friesland, gardener directory, free quotes' : 'over ons, hovenier platform, Friesland, tuiniers directory, gratis offertes',
    alternates: getLocaleAlternates('/over-ons', locale as SupportedLocale),
  }
}

// ISR: Never revalidate (static about page content)
export const revalidate = false

// Generate static params for both locales
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }]
}

export default async function OverOnsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isEn = locale === 'en';

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'About Us' : 'Over Ons' }
  ];

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />

      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, var(--cream-light), var(--sage-light))'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>

          {/* Hero Section */}
          <div style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div style={{
              maxWidth: '64rem',
              margin: '0 auto',
              textAlign: 'center',
              marginBottom: '4rem'
            }}>
              <h1 style={{
                fontSize: '3rem',
                fontFamily: 'var(--serif)',
                fontWeight: '600',
                color: 'var(--forest)',
                marginBottom: '1.5rem',
                lineHeight: '1.1'
              }}>
                {isEn ? 'About Hovenier.frl' : 'Over Hovenier.frl'}
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'var(--forest-mid)',
                lineHeight: '1.6'
              }}>
                {isEn ? "Friesland's trusted platform to find local gardeners" : "Friesland's betrouwbare platform om lokale hoveniers te vinden"}
              </p>
            </div>
          </div>

          {/* What We Are Section */}
          <section style={{
            maxWidth: '64rem',
            margin: '0 auto',
            marginBottom: '4rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '3rem 2rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'var(--forest)',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                {isEn ? 'What is Hovenier.frl?' : 'Wat is Hovenier.frl?'}
              </h2>
              <div style={{
                fontSize: '1.125rem',
                lineHeight: '1.7',
                color: 'var(--forest-mid)'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  {isEn ? "Hovenier.frl is Friesland's leading online directory for professional garden maintenance and landscaping services. We connect homeowners with qualified, local gardeners in all 11 Frisian municipalities." : "Hovenier.frl is Friesland's leidende online directory voor professionele tuinonderhoud en landschapsarchitectuur diensten. Wij verbinden huiseigenaren met gekwalificeerde, lokale hoveniers in alle 11 Friese gemeenten."}
                </p>
                <p style={{ marginBottom: '0' }}>
                  {isEn ? 'Our platform makes it easy to find reliable garden professionals for any project - from regular maintenance to complete garden transformations.' : 'Ons platform maakt het eenvoudig om betrouwbare tuinprofessionals te vinden voor elk project - van regulier onderhoud tot complete tuintransformaties.'}
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section style={{
            maxWidth: '80rem',
            margin: '0 auto',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--forest)',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              {isEn ? 'How it works' : 'Hoe het werkt'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Step 1 */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                position: 'relative'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--sage)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  margin: '0 auto 1.5rem auto'
                }}>
                  1
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'var(--forest)'
                }}>
                  {isEn ? 'Submit your Request' : 'Verstuur je Aanvraag'}
                </h3>
                <p style={{
                  color: 'var(--forest-mid)',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  {isEn ? 'Fill in our simple form with your location, type of work, and contact details. Completely free.' : 'Vul ons eenvoudige formulier in met je locatie, type werk, en contactgegevens. Helemaal gratis.'}
                </p>
              </div>

              {/* Step 2 */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                position: 'relative'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--forest)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  margin: '0 auto 1.5rem auto'
                }}>
                  2
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'var(--forest)'
                }}>
                  {isEn ? 'We Match You' : 'Wij Matchen je'}
                </h3>
                <p style={{
                  color: 'var(--forest-mid)',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  {isEn ? 'Our system connects you with up to 3 qualified gardeners in your municipality who specialize in your type of work.' : 'Ons systeem verbindt je met tot 3 gekwalificeerde hoveniers in jouw gemeente die gespecialiseerd zijn in jouw type werk.'}
                </p>
              </div>

              {/* Step 3 */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                position: 'relative'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--sage)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  margin: '0 auto 1.5rem auto'
                }}>
                  3
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'var(--forest)'
                }}>
                  {isEn ? 'Receive Quotes' : 'Ontvang Offertes'}
                </h3>
                <p style={{
                  color: 'var(--forest-mid)',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  {isEn ? 'Gardeners will contact you within 24 hours. Compare quotes and choose the best one for your project.' : 'Hoveniers nemen binnen 24 uur contact met je op. Vergelijk offertes en kies de beste voor jouw project.'}
                </p>
              </div>
            </div>
          </section>

          {/* For Gardeners Section */}
          <section style={{
            maxWidth: '64rem',
            margin: '0 auto',
            marginBottom: '4rem'
          }}>
            <div style={{
              backgroundColor: 'var(--forest-light)',
              borderRadius: '12px',
              padding: '3rem 2rem',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'var(--forest)',
                marginBottom: '2rem'
              }}>
                {isEn ? 'For Gardeners' : 'Voor Hoveniers'}
              </h2>
              <div style={{
                fontSize: '1.125rem',
                lineHeight: '1.7',
                color: 'var(--forest-mid)',
                marginBottom: '2rem'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  {isEn ? 'Are you a professional gardener in Friesland? Join our network and get access to new clients in your region.' : 'Ben je een professionele hovenier in Friesland? Sluit je aan bij ons netwerk en krijg toegang tot nieuwe klanten in jouw regio.'}
                </p>
                <p style={{ marginBottom: '0' }}>
                  {isEn ? 'We offer three different membership levels - from free basic listings to premium featured placements. All gardeners on our platform are verified for qualifications and reliability.' : 'We bieden drie verschillende lidmaatschapsniveaus - van gratis basis listings tot premium featured placements. Alle hoveniers op ons platform worden gecontroleerd op kwalificaties en betrouwbaarheid.'}
                </p>
              </div>
              <a
                href="/samenwerking"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--sage)',
                  color: 'white',
                  padding: '0.875rem 2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'background-color 0.2s'
                }}
              >
                {isEn ? 'Become a Partner →' : 'Word Partner →'}
              </a>
            </div>
          </section>

          {/* Trust & Quality Section */}
          <section style={{
            maxWidth: '64rem',
            margin: '0 auto',
            paddingBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--forest)',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              {isEn ? 'Reliability & Quality' : 'Betrouwbaarheid & Kwaliteit'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Trust Feature 1 */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--cream)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <svg style={{ width: '32px', height: '32px', color: 'var(--forest)' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'var(--forest)'
                }}>
                  {isEn ? 'Verified Professionals' : 'Geverifieerde Professionals'}
                </h3>
                <p style={{
                  color: 'var(--forest-mid)',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  {isEn ? 'All gardeners are checked for experience, insurance and customer reviews.' : 'Alle hoveniers worden gecontroleerd op ervaring, verzekeringen en klantbeoordelingen.'}
                </p>
              </div>

              {/* Trust Feature 2 */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--cream)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <svg style={{ width: '32px', height: '32px', color: 'var(--forest)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'var(--forest)'
                }}>
                  {isEn ? '100% Free Service' : '100% Gratis Service'}
                </h3>
                <p style={{
                  color: 'var(--forest-mid)',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  {isEn ? 'For homeowners, our matching service is completely free - no hidden costs.' : 'Voor huiseigenaren is onze matching service volledig gratis - geen verborgen kosten.'}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
