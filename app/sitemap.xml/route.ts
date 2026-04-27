import { MetadataRoute } from 'next'
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/lib/locale-utils'
import { getArticles } from '@/lib/articles'
import { gardeners, getAllGardenerSlugs } from '@/lib/gardeners-data'
import { services as serviceList } from '@/lib/services'
import { getAllRegionHubs, getAllGemeentes, regionHubs } from '@/lib/regions-hierarchy'
import { getAbsoluteUrl } from '@/lib/locale-utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPages: MetadataRoute.Sitemap = []

  // Use configured base URL via `NEXT_PUBLIC_BASE_URL` when needed elsewhere.

  // Resolve dynamic sources
  const articles = await getArticles()

  // Gardener slugs (local fallback)
  const gardenerSlugs = typeof getAllGardenerSlugs === 'function' ? getAllGardenerSlugs() : gardeners.map(g => g.slug)

  // Service slugs (merge static and canonical service list)
  const canonicalServiceSlugs = new Set<string>([
    'tuinonderhoud',
    'tuinontwerp',
    'groendak',
    'tuin-aanleggen',
    'stratenmaker',
  ])
  for (const s of (serviceList || [])) canonicalServiceSlugs.add(String(s.slug))

  // Regions and municipalities
  const hubs = typeof getAllRegionHubs === 'function' ? getAllRegionHubs() : regionHubs
  const gemeentes = typeof getAllGemeentes === 'function' ? getAllGemeentes() : []

  for (const locale of SUPPORTED_LOCALES) {
    const localeCode = locale as SupportedLocale

    // Root
    allPages.push({
      url: getAbsoluteUrl('/', localeCode),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: locale === 'nl' ? 1 : 0.8,
    })

    // Static top-level pages
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
        url: getAbsoluteUrl(page.path, localeCode),
        lastModified: new Date(),
        changeFrequency: page.frequency,
        priority: page.priority * (locale === 'nl' ? 1 : 0.8),
      })
    }

    // Service pages
    for (const slug of Array.from(canonicalServiceSlugs)) {
      allPages.push({
        url: getAbsoluteUrl(`/diensten/${slug}`, localeCode),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9 * (locale === 'nl' ? 1 : 0.8),
      })
    }

    // Kosten pages (pricing)
    const kostenPages = ['hovenier-per-uur', 'tuin-aanleggen', 'tuinonderhoud', 'tuinontwerp', 'groendak']
    for (const kp of kostenPages) {
      allPages.push({
        url: getAbsoluteUrl(`/kosten/${kp}`, localeCode),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7 * (locale === 'nl' ? 1 : 0.8),
      })
    }

    // Gardener profiles
    for (const slug of gardenerSlugs) {
      allPages.push({
        url: getAbsoluteUrl(`/hoveniers/${slug}`, localeCode),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7 * (locale === 'nl' ? 1 : 0.8),
      })
    }

    // Articles / blog posts
    for (const article of articles) {
      allPages.push({
        url: getAbsoluteUrl(`/nieuws/${article.slug}`, localeCode),
        lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(article.publishedAt || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.6 * (locale === 'nl' ? 1 : 0.8),
      })
    }

    // News category pages (derive from categories)
    const categories = new Set(articles.map(a => a.category?.slug).filter(Boolean))
    for (const c of categories) {
      allPages.push({
        url: getAbsoluteUrl(`/nieuws/categorie/${c}`, localeCode),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6 * (locale === 'nl' ? 1 : 0.8),
      })
    }

    // Region hubs and municipality pages
    for (const hub of hubs) {
      allPages.push({
        url: getAbsoluteUrl(`/regio/${hub.slug}`, localeCode),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8 * (locale === 'nl' ? 1 : 0.8),
      })

      for (const g of hub.gemeentes) {
        // route: /regio/<hub.slug>/<gemeente.slug>
        allPages.push({
          url: getAbsoluteUrl(`/regio/${hub.slug}/${g.slug}`, localeCode),
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7 * (locale === 'nl' ? 1 : 0.8),
        })
      }
    }

    // Standalone municipalities (e.g., leeuwarden)
    for (const g of gemeentes) {
      // If gemeente appears under a hub, it will already be covered. Add nonetheless to be safe.
      allPages.push({
        url: getAbsoluteUrl(`/regio/${g.slug}`, localeCode),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7 * (locale === 'nl' ? 1 : 0.8),
      })
    }
  }

  // Deduplicate by URL
  const seen = new Set<string>()
  const deduped: MetadataRoute.Sitemap = []
  for (const item of allPages) {
    if (!seen.has(item.url)) {
      seen.add(item.url)
      deduped.push(item)
    }
  }

  return deduped
}

// Regenerate sitemap at most every 60 seconds to pick up new content after publish
export const revalidate = 60;

function escapeXml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSitemapXml(items: MetadataRoute.Sitemap) {
  const lines: string[] = []
  lines.push('<?xml version="1.0" encoding="UTF-8"?>')
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

  for (const it of items) {
    lines.push('  <url>')
    lines.push(`    <loc>${escapeXml(it.url)}</loc>`)
    if (it.lastModified) {
      const d = new Date(it.lastModified)
      lines.push(`    <lastmod>${d.toISOString()}</lastmod>`)
    }
    if (it.changeFrequency) lines.push(`    <changefreq>${escapeXml(it.changeFrequency)}</changefreq>`)
    if (typeof it.priority !== 'undefined') lines.push(`    <priority>${String(it.priority)}</priority>`)
    lines.push('  </url>')
  }

  lines.push('</urlset>')
  return lines.join('\n')
}

export async function GET() {
  const items = await sitemap()
  const xml = buildSitemapXml(items)

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
