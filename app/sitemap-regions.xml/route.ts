import { generateAllPages, buildSitemapXml } from '@/lib/sitemap'

export const revalidate = 60

export async function GET() {
  const items = await generateAllPages()
  // Regions are /regio/{hub}
  const filtered = items.filter(i => {
    try {
      const p = new URL(i.url).pathname
      // match /{locale}/regio/{slug} (no second segment)
      const parts = p.split('/').filter(Boolean)
      return parts.length === 2 && parts[1] === 'regio' ? false : parts.length === 2 && parts[0] && parts[1] === 'regio' ? true : (p.match(/\/regio\/[^\/]+$/) != null)
    } catch {
      return false
    }
  })
  const xml = buildSitemapXml(filtered)
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
