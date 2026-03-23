import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import GardenerDirectorySchema from '../../components/schemas/GardenerDirectorySchema'
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema'
import GardenerDirectoryClient from '../../components/GardenerDirectoryClient'
import { gardeners } from '../../../lib/gardeners-data'
import styles from '../../components/GardenerDirectory.module.css'
import { getAbsoluteUrl, getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

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
  const { locale } = await params;
  setRequestLocale(locale);

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
              <span>HOVENIERS DIRECTORY</span>
            </div>
            <h1 className={styles.sectionTitle}>
              Find Professional Gardeners
            </h1>
            <p className={styles.sectionSub}>
              Vind de perfecte tuinspecialist voor uw project. Alle hoveniers zijn geverifieerd en beoordeeld door echte klanten.
            </p>

            <GardenerDirectoryClient gardeners={gardeners} locale={locale} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
