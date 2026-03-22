import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hovenier.frl'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/bedankt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/samenwerking`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]
  
  // Service pages
  const services = ['tuinonderhoud', 'tuinontwerp', 'groendak', 'tuin-aanleggen', 'stratenmaker']
  const servicePages = services.map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Main navigation pages
  const mainPages = [
    {
      url: `${baseUrl}/hoveniers`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/regio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kosten`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nieuws`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/over-ons`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Kosten sub-pages
  const kostenPages = ['hovenier-per-uur', 'tuin-aanleggen', 'tuinonderhoud', 'tuinontwerp', 'groendak'].map(page => ({
    url: `${baseUrl}/kosten/${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Individual gardener profiles
  const gardenerSlugs = ['tuinservice-friesland'] // In production, fetch from database
  const gardenerPages = gardenerSlugs.map(slug => ({
    url: `${baseUrl}/hoveniers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // News categories
  const newsCategories = ['kosten', 'seizoen', 'tips', 'groendak', 'tuinontwerp']
  const newsCategoryPages = newsCategories.map(category => ({
    url: `${baseUrl}/nieuws/categorie/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  
  // Municipality/gemeente pages
  const gemeenten = [
    'leeuwarden',
    'sudwest-fryslan', 
    'smallingerland',
    'heerenveen',
    'achtkarspelen',
    'tietjerksteradeel',
    'dantumadiel',
    'de-fryske-marren',
    'waadhoeke',
    'noardeast-fryslan',
    'harlingen',
  ]
  
  const gemeentePages = gemeenten.map(gemeente => ({
    url: `${baseUrl}/gemeente/${gemeente}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // Localized pages (both nl and en)
  const allPages = [...staticPages, ...mainPages, ...servicePages, ...kostenPages, ...gemeentePages, ...gardenerPages, ...newsCategoryPages]
  const localizedPages = []
  
  for (const page of allPages) {
    // Add Dutch version (default)
    localizedPages.push({
      ...page,
      url: page.url.replace(baseUrl, `${baseUrl}/nl`),
    })
    
    // Add English version
    localizedPages.push({
      ...page,
      url: page.url.replace(baseUrl, `${baseUrl}/en`),
      priority: page.priority * 0.8, // Lower priority for English pages
    })
  }
  
  return [...allPages, ...localizedPages]
}