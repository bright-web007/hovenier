import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import LocalBusinessSchema from '../../../components/schemas/LocalBusinessSchema'
import BreadcrumbSchema from '../../../components/schemas/BreadcrumbSchema'
import GardenerProfile from '../../../components/GardenerProfile'
import { getGardenerBySlug, getAllGardenerSlugs } from '../../../../lib/gardeners-data'
import { notFound } from 'next/navigation'
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'

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
  const { locale, slug } = await params
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
  const { locale, slug } = await params
  setRequestLocale(locale)
  
  // Find gardener by slug
  const gardener = getGardenerBySlug(slug)
  
  if (!gardener) {
    notFound()
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'Gardeners' : 'Hoveniers', href: localizePath('/hoveniers', locale as SupportedLocale) },
    { label: gardener.name }
  ]

  // Breadcrumb schema items (needs full URLs)
  const breadcrumbSchemaItems = [
    { name: 'Home', url: getAbsoluteUrl('/', locale as SupportedLocale) },
    { name: locale === 'en' ? 'Gardeners' : 'Hoveniers', url: getAbsoluteUrl('/hoveniers', locale as SupportedLocale) },
    { name: gardener.name, url: getAbsoluteUrl(`/hoveniers/${slug}`, locale as SupportedLocale) }
  ]

  return (
    <>
      <LocalBusinessSchema 
        name={`${gardener.name} - ${gardener.company}`}
        description={gardener.description}
        url={getAbsoluteUrl(`/hoveniers/${slug}`, locale as SupportedLocale)}
        areaServed={`${gardener.location}, Friesland`}
        serviceTypes={gardener.specialties}
        ratingValue={gardener.rating.toString()}
        reviewCount={gardener.reviewCount.toString()}
        contactPhone={gardener.contact.phone}
        contactEmail={gardener.contact.email}
        contactWebsite={gardener.contact.website}
        personName={gardener.name}
        priceRange={`€${gardener.startingPrice}-€${gardener.startingPrice + 20}`}
        services={gardener.services}
        location={gardener.location}
        businessType="LandscapingBusiness"
      />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <GardenerProfile gardener={gardener} locale={locale} />
    </>
  )
}
