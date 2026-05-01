import { generateAllPages, buildSitemapXml } from '@/lib/sitemap'

export const revalidate = 60

export async function GET() {
  const items = await generateAllPages()
  // Municipalities: either /regio/{hub}/{municipalities} or standalone /regio/{municipalities}
  const filtered = items.filter(i => {
    try {
      const p = new URL(i.url).pathname
      return /\/regio\//.test(p) && p.split('/').filter(Boolean).length >= 2
    } catch {
      return false
    }
  })
  const xml = buildSitemapXml(filtered)
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })