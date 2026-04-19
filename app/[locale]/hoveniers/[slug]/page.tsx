import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../components/StructuredData'
import GardenerProfile from '../../../components/GardenerProfile'
import { getGardenerBySlug, getAllGardenerSlugs } from '../../../../lib/gardeners-data'
import { notFound } from 'next/navigation'
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}



// Generate static params for available gardeners
export async function generateStaticParams() {
  const locales = ['nl', 'en'];
  const result = [];
  
  for (const locale of locales) {
    for (const slug of getAllGardenerSlugs()) {
      result.push({
        locale: locale,
        slug: slug,
      });
    }
  }
  
  return result;
}

// ISR: Never revalidate (gardener profiles change only with database updates)
export const revalidate = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const gardener = getGardenerBySlug(slug)
  
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
    alternates: getLocaleAlternates(`/hoveniers/${slug}`, locale as SupportedLocale),
  }
}

export default async function GardenerProfilePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = createTranslator(locale);
  
  // Find gardener by slug
  const gardener = getGardenerBySlug(slug)
  
  if (!gardener) {
    notFound()
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: t('hoveniers_page.breadcrumb'), href: localizePath('/hoveniers', locale as SupportedLocale) },
    { label: gardener.name }
  ]

  // Breadcrumb schema items (needs full URLs and position)
  const breadcrumbSchemaItems = [
    { position: 1, name: 'Home', url: getAbsoluteUrl('/', locale as SupportedLocale) },
    { position: 2, name: t('hoveniers_page.breadcrumb'), url: getAbsoluteUrl('/hoveniers', locale as SupportedLocale) },
    { position: 3, name: gardener.name, url: getAbsoluteUrl(`/hoveniers/${slug}`, locale as SupportedLocale) }
  ]

  return (
    <>
      <LocalBusinessSchema 
        serviceType="gardener"
        url={getAbsoluteUrl(`/hoveniers/${slug}`, locale as SupportedLocale)}
        nameContext={`${gardener.name} - ${gardener.company}`}
        services={gardener.services}
      />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <GardenerProfile gardener={gardener} locale={locale} />
    </>
  )
}
