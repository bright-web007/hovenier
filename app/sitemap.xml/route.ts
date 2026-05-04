import { buildSitemapIndex } from '@/lib/sitemap'

const BASE = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000').replace(/\/$/, '')

// Regenerate sitemap index at most every 60 seconds
export const revalidate = 60

export async function GET() {
  const urls = [
    `${BASE}/sitemap-static.xml`,
    `${BASE}/sitemap-services.xml`,
    `${BASE}/sitemap-hoveniers.xml`,
    `${BASE}/sitemap-regions.xml`,
    `${BASE}/sitemap-municipalities.xml`,
    `${BASE}/sitemap-cities.xml`,
    `${BASE}/sitemap-cityservices.xml`,

  ]

  const xml = buildSitemapIndex(urls)

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

