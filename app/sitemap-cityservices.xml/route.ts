import { generateAllPages, buildSitemapXml } from '@/lib/sitemap'

export const revalidate = 60

export async function GET() {
    const items = await generateAllPages()

    const filtered = items.filter(i => {
        try {
            const p = new URL(i.url).pathname
            const parts = p.split('/').filter(Boolean)

            // Expected structure:
            // [locale, regio, slug, gemeente, city-slug, city-service-slug]
            return (
                parts.includes('regio') &&
                parts.length >= 6 // ensures service-level depth
            )
        } catch {
            return false
        }
    })

    const xml = buildSitemapXml(filtered)

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    })
}