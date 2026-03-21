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
  const services = ['tuinonderhoud', 'tuinontwerp', 'groendak']
  const servicePages = services.map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
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
  const allPages = [...staticPages, ...servicePages, ...gemeentePages]
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