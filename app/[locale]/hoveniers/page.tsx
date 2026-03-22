import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import GardenerDirectorySchema from '../../components/schemas/GardenerDirectorySchema'
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema'
import GardenerCard from '../../components/GardenerCard'
import { gardeners } from '../../../lib/gardeners-data'
import styles from '../../components/GardenerDirectory.module.css'
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Hoveniers Directory - Vind uw Tuinspecialist | Hovenier.frl',
    description: 'Doorzoek onze database van gekwalificeerde hoveniers in Friesland. Filter op gemeente, specialisatie, beoordelingen en beschikbaarheid.',
    keywords: 'hoveniers directory, tuinman zoeken, Friesland hoveniers, tuinspecialist vinden, tuinonderhoud, tuinontwerp',
    alternates: getLocaleAlternates('/hoveniers', locale as SupportedLocale),
  }
}

// ISR: Never revalidate (hardcoded sample data, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR  
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export default async function HoveniersDirectoryPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  // Breadcrumb items  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'Gardeners' : 'Hoveniers' }
  ];

  // Breadcrumb schema items (needs full URLs)
  const breadcrumbSchemaItems = [
    { name: 'Home', url: getAbsoluteUrl('/', locale as SupportedLocale) },
    { name: locale === 'en' ? 'Gardeners' : 'Hoveniers', url: getAbsoluteUrl('/hoveniers', locale as SupportedLocale) }
  ];

  return (
    <>
      <GardenerDirectorySchema 
        gardeners={gardeners}
        url={getAbsoluteUrl('/hoveniers', locale as SupportedLocale)}
        locale={locale}
      />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className={styles.main}>
        <div className={styles.section}>
          <div className={styles.sectionInner}>
            {/* Hero Section */}
            <div className={styles.sectionCentered}>
              <div className={styles.sectionEyebrow}>
                <span>Hoveniers</span>
              </div>
              <h1 className={styles.sectionTitle}>
                Hoveniers Directory
              </h1>
              <p className={styles.sectionSub}>
                Vind de perfecte tuinspecialist voor uw project. Alle hoveniers zijn geverifieerd en beoordeeld door echte klanten.
              </p>
            </div>

            {/* Search & Filters */}
            <div className={styles.searchSection}>
              <h2 className={styles.searchTitle}>
                Zoek & Filter Hoveniers
              </h2>
              <div className={styles.filterGrid}>
                <div className={styles.filterGroup}>
                  <label htmlFor="gemeente" className={styles.filterLabel}>
                    Gemeente
                  </label>
                  <select id="gemeente" className={styles.filterSelect}>
                    <option value="">Alle gemeenten</option>
                    <option value="leeuwarden">Leeuwarden</option>
                    <option value="heerenveen">Heerenveen</option>
                    <option value="smallingerland">Smallingerland</option>
                    <option value="ooststellingwerf">Ooststellingwerf</option>
                    <option value="weststellingwerf">Weststellingwerf</option>
                  </select>
                </div>
                <div className={styles.filterGroup}>
                  <label htmlFor="service" className={styles.filterLabel}>
                    Service Type
                  </label>
                  <select id="service" className={styles.filterSelect}>
                    <option value="">Alle diensten</option>
                    <option value="tuinonderhoud">Tuinonderhoud</option>
                    <option value="tuinontwerp">Tuinontwerp</option>
                    <option value="groendak">Groendak</option>
                    <option value="tuin-aanleggen">Tuin Aanleggen</option>
                    <option value="stratenmaker">Bestrating</option>
                  </select>
                </div>
                <div className={styles.filterGroup}>
                  <label htmlFor="rating" className={styles.filterLabel}>
                    Minimale Rating
                  </label>
                  <select id="rating" className={styles.filterSelect}>
                    <option value="">Alle ratings</option>
                    <option value="4.5">4.5+ sterren</option>
                    <option value="4.0">4.0+ sterren</option>
                    <option value="3.5">3.5+ sterren</option>
                  </select>
                </div>
                <div className={styles.filterGroup}>
                  <label htmlFor="availability" className={styles.filterLabel}>
                    Beschikbaarheid
                  </label>
                  <select id="availability" className={styles.filterSelect}>
                    <option value="">Alle hoveniers</option>
                    <option value="available">Beschikbaar</option>
                    <option value="verified">Alleen geverifieerd</option>
                  </select>
                </div>
              </div>
              <button className={styles.searchButton}>
                Zoek Hoveniers
              </button>
            </div>

            {/* Results Header */}
            <div className={styles.resultsHeader}>
              <span className={styles.resultsCount}>
                {gardeners.length} hoveniers gevonden
              </span>
              <select className={styles.sortSelect}>
                <option value="rating">Sorteer op rating</option>
                <option value="price">Sorteer op prijs</option>
                <option value="response">Sorteer op reactietijd</option>
                <option value="location">Sorteer op locatie</option>
              </select>
            </div>

            {/* Gardeners Grid */}
            <div className={styles.gardenersGrid}>
              {gardeners.map((gardener) => (
                <GardenerCard 
                  key={gardener.slug} 
                  gardener={gardener} 
                  locale={locale} 
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
