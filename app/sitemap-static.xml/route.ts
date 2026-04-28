import { generateAllPages, buildSitemapXml } from '@/lib/sitemap'

export const revalidate = 60

export async function GET() {
  const items = await generateAllPages()

  // Static pages + pricing
  const staticPaths = ['/', '/bedankt', '/samenwerking', '/contact', '/over-ons', '/hoveniers', '/diensten', '/regio', '/kosten', '/nieuws']
  const filtered = items.filter(i => {
    try {
      const url = new URL(i.url)
      const path = url.pathname
      return staticPaths.some(p => path === `/${path.split('/')[1]}${p === '/' ? '' : p}`) || /\/kosten\//.test(path)
    } catch {
      return false
    }
  })

  const xml = buildSitemapXml(filtered)
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
