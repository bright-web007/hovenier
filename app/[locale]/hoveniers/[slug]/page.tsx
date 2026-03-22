import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import LocalBusinessSchema from '../../../components/schemas/LocalBusinessSchema'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

// Sample gardener data - In production this would come from database/CMS
const sampleGardeners = [
  {
    slug: 'tuinservice-friesland',
    name: 'Jan de Vries',
    company: 'TuinService Friesland',
    location: 'Leeuwarden',
    specialties: ['Tuinonderhoud', 'Tuinontwerp', 'Groendak'],
    rating: 4.8,
    reviewCount: 23,
    verified: true,
    responseTime: '< 2 uur',
    startingPrice: 35,
    availability: 'available',
    description: 'Professionele hoveniersdiensten in de regio Leeuwarden. Gespecialiseerd in duurzaam tuinonderhoud en creatief tuinontwerp.',
    services: [
      'Tuinonderhoud en verzorging',
      'Tuinontwerp en realisatie', 
      'Groendaken en sedumdaken',
      'Seizoensklussen',
      'Snoeiwerk en haagverzorging'
    ],
    contact: {
      phone: '+31 58 123 4567',
      email: 'info@tuinservice-friesland.nl',
      website: 'https://tuinservice-friesland.nl'
    }
  }
]

// Generate static params for available gardeners
export async function generateStaticParams() {
  return sampleGardeners.map((gardener) => ({
    slug: gardener.slug,
  }))
}

// ISR: Never revalidate (gardener profiles change only with database updates)
export const revalidate = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const gardener = sampleGardeners.find(g => g.slug === slug)
  
  if (!gardener) {
    return {
      title: 'Hovenier niet gevonden',
      description: 'De gevraagde hovenier kon niet worden gevonden.'
    }
  }

  return {
    title: `${gardener.name} - ${gardener.company} | Hovenier in ${gardener.location}`,
    description: `${gardener.description} Beoordeeld met ${gardener.rating}/5 sterren door ${gardener.reviewCount} klanten. Vanaf €${gardener.startingPrice}/uur.`,
    keywords: `${gardener.name}, ${gardener.company}, hovenier ${gardener.location}, ${gardener.specialties.join(', ')}, tuinman ${gardener.location}`,
  }
}

export default async function GardenerProfilePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  
  // Find gardener by slug
  const gardener = sampleGardeners.find(g => g.slug === slug)
  
  if (!gardener) {
    notFound()
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'Gardeners' : 'Hoveniers', href: '/hoveniers' },
    { label: gardener.name }
  ]

  return (
    <>
      <LocalBusinessSchema 
        name={`${gardener.name} - ${gardener.company}`}
        description={gardener.description}
        url={`https://hovenier.frl/${locale}/hoveniers/${slug}`}
        areaServed={`${gardener.location}, Friesland`}
        serviceTypes={gardener.specialties}
        ratingValue={gardener.rating.toString()}
        reviewCount={gardener.reviewCount.toString()}
      />
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, var(--cream-light), var(--sage-light))' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          
          {/* Header Section */}
          <div style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div style={{ 
              maxWidth: '64rem', 
              margin: '0 auto', 
              textAlign: 'center', 
              marginBottom: '2rem' 
            }}>
              <h1 style={{ 
                fontSize: '3rem', 
                fontFamily: 'var(--serif)', 
                fontWeight: '600', 
                color: 'var(--forest)', 
                marginBottom: '1rem', 
                lineHeight: '1.1' 
              }}>
                {gardener.name}
              </h1>
              <p style={{ 
                fontSize: '1.5rem', 
                color: 'var(--sage)', 
                fontWeight: '500',
                marginBottom: '1rem' 
              }}>
                {gardener.company}
              </p>
              <p style={{ 
                fontSize: '1.125rem', 
                color: 'var(--forest-mid)' 
              }}>
                {gardener.location} • {gardener.specialties.join(' • ')}
              </p>
            </div>

            {/* Stats Row */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '2rem',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--sage)' }}>
                  {gardener.rating}/5
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--forest-mid)' }}>
                  {gardener.reviewCount} beoordelingen
                </div>
              </div>
              <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--forest)' }}>
                  €{gardener.startingPrice}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--forest-mid)' }}>
                  Vanaf / uur
                </div>
              </div>
              <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--sage)' }}>
                  {gardener.responseTime}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--forest-mid)' }}>
                  Reactietijd
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 300px', 
            gap: '3rem',
            paddingBottom: '4rem'
          }}>
            {/* Left Column */}
            <div>
              {/* About */}
              <section style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--forest)', marginBottom: '1rem' }}>
                  Over {gardener.name}
                </h2>
                <p style={{ color: 'var(--forest-mid)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {gardener.description}
                </p>
              </section>

              {/* Services */}
              <section style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--forest)', marginBottom: '1rem' }}>
                  Diensten
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {gardener.services.map((service, index) => (
                    <li key={index} style={{ 
                      padding: '0.75rem 0', 
                      borderBottom: index < gardener.services.length - 1 ? '1px solid var(--cream)' : 'none',
                      color: 'var(--forest-mid)'
                    }}>
                      ✓ {service}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right Sidebar */}
            <div>
              <section style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--forest)', marginBottom: '1.5rem' }}>
                  Direct Contact
                </h3>
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ margin: '0.5rem 0', color: 'var(--forest-mid)' }}>
                    📞 {gardener.contact.phone}
                  </p>
                  <p style={{ margin: '0.5rem 0', color: 'var(--forest-mid)' }}>
                    ✉️ {gardener.contact.email}
                  </p>
                  <p style={{ margin: '0.5rem 0', color: 'var(--forest-mid)' }}>
                    🌐 Website
                  </p>
                </div>
                <button style={{ 
                  width: '100%', 
                  backgroundColor: 'var(--sage)', 
                  color: 'white', 
                  padding: '0.75rem 1rem', 
                  borderRadius: '8px', 
                  border: 'none', 
                  fontSize: '1rem', 
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Vraag Offerte Aan
                </button>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}