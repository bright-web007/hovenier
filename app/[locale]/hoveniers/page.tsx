import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import GardenerCard from '../../components/GardenerCard'

type Props = {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Hoveniers Directory - Vind uw Tuinspecialist | Hovenier.frl',
  description: 'Doorzoek onze database van gekwalificeerde hoveniers in Friesland. Filter op gemeente, specialisatie, beoordelingen en beschikbaarheid.',
  keywords: 'hoveniers directory, tuinman zoeken, Friesland hoveniers, tuinspecialist vinden, tuinonderhoud, tuinontwerp',
}

// Sample gardener data - In production this would come from API/database
const sampleGardeners = [
  {
    name: "Jan de Vries",
    company: "TuinService Friesland",
    slug: "tuinservice-friesland",
    location: "Leeuwarden",
    specialties: ["Tuinonderhoud", "Tuinontwerp", "Groendak"],
    rating: 4.8,
    reviewCount: 23,
    verified: true,
    responseTime: "< 2 uur",
    startingPrice: 35,
    availability: 'available' as const
  },
  {
    name: "Marie Bakker",
    company: "Groene Vingers",
    slug: "groene-vingers",
    location: "Heerenveen", 
    specialties: ["Tuinontwerp", "Stratenmaker", "Tuin Aanleggen"],
    rating: 4.9,
    reviewCount: 41,
    verified: true,
    responseTime: "< 1 uur",
    startingPrice: 40,
    availability: 'available' as const
  },
  {
    name: "Piet Janssen",
    company: "Friese Tuinen",
    slug: "friese-tuinen",
    location: "Smallingerland",
    specialties: ["Tuinonderhoud", "Tuin Aanleggen"],
    rating: 4.6,
    reviewCount: 18,
    verified: false,
    responseTime: "< 4 uur",
    startingPrice: 32,
    availability: 'busy' as const
  },
  {
    name: "Anna Smit",
    company: "Duurzame Tuinen",
    slug: "duurzame-tuinen", 
    location: "Ooststellingwerf",
    specialties: ["Groendak", "Tuinontwerp"],
    rating: 4.7,
    reviewCount: 15,
    verified: true,
    responseTime: "< 3 uur",
    startingPrice: 38,
    availability: 'available' as const
  },
  {
    name: "Tom van der Berg",
    company: "Berg Hoveniers",
    slug: "berg-hoveniers",
    location: "Weststellingwerf", 
    specialties: ["Tuinonderhoud", "Stratenmaker"],
    rating: 4.5,
    reviewCount: 27,
    verified: true,
    responseTime: "< 2 uur",
    startingPrice: 34,
    availability: 'available' as const
  }
]

export default async function HoveniersDirectoryPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  // Breadcrumb items  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'Gardeners' : 'Hoveniers' }
  ];

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main>
        <div className="section">
          <div className="section-inner">
            {/* Hero Section */}
            <div className="section-centered">
              <div className="section-eyebrow section-eyebrow-centered">
                <span>Hoveniers</span>
              </div>
              <h1 className="section-title section-title-centered">
                Hoveniers Directory
              </h1>
              <p className="section-sub section-sub-centered">
                Vind de perfecte tuinspecialist voor uw project. Alle hoveniers zijn geverifieerd en beoordeeld door echte klanten.
              </p>
            </div>

            {/* Search & Filters */}
            <div style={{ background: 'var(--white)', borderRadius: '6px', padding: '2rem', marginBottom: '3rem', border: '0.5px solid var(--border)' }}>
              <h2 style={{ 
                fontFamily: 'var(--serif)', 
                fontSize: '28px', 
                fontWeight: '600', 
                color: 'var(--forest-deep)', 
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                Zoek & Filter Hoveniers
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label htmlFor="gemeente" className="form-label">
                    Gemeente
                  </label>
                  <select
                    id="gemeente"
                    className="form-select"
                  >
                    <option value="">Alle gemeenten</option>
                    <option value="leeuwarden">Leeuwarden</option>
                    <option value="heerenveen">Heerenveen</option>
                    <option value="smallingerland">Smallingerland</option>
                    <option value="ooststellingwerf">Ooststellingwerf</option>
                    <option value="weststellingwerf">Weststellingwerf</option>
                    <option value="opsterland">Opsterland</option>
                    <option value="achtkarspelen">Achtkarspelen</option>
                    <option value="tytsjerksteradiel">Tytsjerksteradiel</option>
                    <option value="de-fryske-marren">De Fryske Marren</option>
                    <option value="sudwest-fryslan">Súdwest-Fryslân</option>
                    <option value="waadhoeke">Waadhoeke</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="service" className="form-label">
                    Service Type
                  </label>
                  <select
                    id="service"
                    className="form-select"
                  >
                    <option value="">Alle diensten</option>
                    <option value="tuinonderhoud">Tuinonderhoud</option>
                    <option value="tuinontwerp">Tuinontwerp</option>
                    <option value="groendak">Groendak</option>
                    <option value="tuin-aanleggen">Tuin Aanleggen</option>
                    <option value="stratenmaker">Bestrating</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="rating" className="form-label">
                    Minimale Rating
                  </label>
                  <select
                    id="rating"
                    className="form-select"
                  >
                    <option value="">Alle ratings</option>
                    <option value="4.5">4.5+ sterren</option>
                    <option value="4.0">4.0+ sterren</option>
                    <option value="3.5">3.5+ sterren</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="availability" className="form-label">
                    Beschikbaarheid
                  </label>
                  <select
                    id="availability"
                    className="form-select"
                  >
                    <option value="">Alle</option>
                    <option value="immediate">Direct beschikbaar</option>
                    <option value="week">Binnen 1 week</option>
                    <option value="month">Binnen 1 maand</option>
                  </select>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button 
                  type="button"
                  className="form-btn"
                >
                  Zoeken
                </button>
              </div>
            </div>

            {/* Results Grid */}

            {/* Results Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <p style={{ color: 'var(--text-mid)', fontSize: '14px' }}>
                <span style={{ fontWeight: '500' }}>{sampleGardeners.length}</span> hoveniers gevonden in <span style={{ fontWeight: '500' }}>Alle gemeenten</span>
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-mid)' }}>Sorteer op:</span>
                <select className="form-select" style={{ width: 'auto', minWidth: '150px' }}>
                  <option>Relevantie</option>
                  <option>Rating (hoog-laag)</option>
                  <option>Afstand</option>
                  <option>Naam (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Directory Results */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
              gap: '1.5rem', 
              marginBottom: '3rem' 
            }}>
              {sampleGardeners.map((gardener, index) => (
                <GardenerCard
                  key={`${gardener.slug}-${index}`}
                  name={gardener.name}
                  company={gardener.company}
                  slug={gardener.slug}
                  location={gardener.location}
                  specialties={gardener.specialties}
                  rating={gardener.rating}
                  reviewCount={gardener.reviewCount}
                  verified={gardener.verified}
                  responseTime={gardener.responseTime}
                  startingPrice={gardener.startingPrice}
                  availability={gardener.availability}
                />
              ))}
            </div>

            {/* CTA Section */}
            <div style={{ 
              background: 'var(--white)', 
              borderRadius: '6px', 
              padding: '2rem', 
              textAlign: 'center',
              border: '0.5px solid var(--border)'
            }}>
              <h2 style={{ 
                fontFamily: 'var(--serif)', 
                fontSize: '28px', 
                fontWeight: '600', 
                color: 'var(--forest-deep)', 
                marginBottom: '1rem'
              }}>
                Geen passende hovenier gevonden?
              </h2>
              <p style={{ color: 'var(--text-mid)', marginBottom: '2rem', fontSize: '14px' }}>
                Vraag een gratis offerte aan en wij verbinden u met de beste hoveniers in uw regio.
              </p>
              <button className="form-btn" style={{ width: 'auto', padding: '14px 28px' }}>
                Gratis Offerte Aanvragen
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}