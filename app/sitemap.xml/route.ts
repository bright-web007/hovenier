import { buildSitemapIndex } from '@/lib/sitemap'

const BASE = (process.env.NEXT_PUBLIC_BASE_URL || 'https://hovenier.frl').replace(/\/$/, '')

// Regenerate sitemap index at most every 60 seconds
export const revalidate = 60

export async function GET() {
  const urls = [
    `${BASE}/sitemap-static.xml`,
    `${BASE}/sitemap-services.xml`,
    `${BASE}/sitemap-hoveniers.xml`,
    `${BASE}/sitemap-articles.xml`,
    `${BASE}/sitemap-regions.xml`,
    `${BASE}/sitemap-cities.xml`,
  ]

  const xml = buildSitemapIndex(urls)

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
