import { MetadataRoute } from 'next'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, SupportedLocale } from '@/lib/locale-utils'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hovenier.frl'
  
  const allPages: MetadataRoute.Sitemap = []
  
  // Generate pages for each locale
  for (const locale of SUPPORTED_LOCALES) {
    const localePrefix = `/${locale}`
    const priority = locale === 'nl' ? 1 : 0.8  // Dutch pages get higher priority
    
    // Root page
    allPages.push({
      url: `${baseUrl}${localePrefix}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: priority,
    })
    
    // Static pages
    const staticPages = [
      { path: '/bedankt', priority: 0.3, frequency: 'monthly' as const },
      { path: '/samenwerking', priority: 0.8, frequency: 'weekly' as const },
      { path: '/contact', priority: 0.6, frequency: 'monthly' as const },
      { path: '/over-ons', priority: 0.6, frequency: 'monthly' as const },
      { path: '/hoveniers', priority: 0.9, frequency: 'daily' as const },
      { path: '/diensten', priority: 0.9, frequency: 'weekly' as const },
      { path: '/regio', priority: 0.8, frequency: 'weekly' as const },
      { path: '/kosten', priority: 0.8, frequency: 'monthly' as const },
      { path: '/nieuws', priority: 0.7, frequency: 'daily' as const },
    ]
    
    for (const page of staticPages) {
      allPages.push({
        url: `${baseUrl}${localePrefix}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.frequency,
        priority: page.priority * priority,
      })
    }
    
    // Service pages
    const services = ['tuinonderhoud', 'tuinontwerp', 'groendak', 'tuin-aanleggen', 'stratenmaker']
    for (const service of services) {
      allPages.push({
        url: `${baseUrl}${localePrefix}/diensten/${service}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9 * priority,
      })
    }
    
    // Kosten sub-pages
    const kostenPages = ['hovenier-per-uur', 'tuin-aanleggen', 'tuinonderhoud', 'tuinontwerp', 'groendak']
    for (const page of kostenPages) {
      allPages.push({
        url: `${baseUrl}${localePrefix}/kosten/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7 * priority,
      })
    }

    // Individual gardener profiles
    const gardenerSlugs = ['tuinservice-friesland'] // In production, fetch from database
    for (const slug of gardenerSlugs) {
      allPages.push({
        url: `${baseUrl}${localePrefix}/hoveniers/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7 * priority,
      })
    }

    // News categories
    const newsCategories = ['kosten', 'seizoen', 'tips', 'groendak', 'tuinontwerp']
    for (const category of newsCategories) {
      allPages.push({
        url: `${baseUrl}${localePrefix}/nieuws/categorie/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6 * priority,
      })
    }
  }
  
  return allPages
}
