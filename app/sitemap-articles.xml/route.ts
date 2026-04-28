import { generateAllPages, buildSitemapXml } from '@/lib/sitemap'

export const revalidate = 60

export async function GET() {
  const items = await generateAllPages()
  // Include news articles and category pages (both are under /nieuws/)
  const filtered = items.filter(i => i.url.includes('/nieuws/'))
  const xml = buildSitemapXml(filtered)
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
