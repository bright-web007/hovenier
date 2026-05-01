import { generateAllPages, buildSitemapXml } from '@/lib/sitemap'
export const revalidate = 60
export async function GET() {
    const items = await generateAllPages()
    const filtered = items.filter((i) => {
        try {
            const p = new URL(i.url).pathname
            const parts = p.split('/').filter(Boolean)
            // ✅ Handle locale: /{locale}/regio/{region}/{municipality} 
            return (
                parts.length === 4 &&
                (parts[0] === 'nl' || parts[0] === 'en') &&
                parts[1] === 'regio'
            )
        }
        catch {
            return false

        }
    })
    const xml = buildSitemapXml(filtered)
    return new Response(xml,
        {
            headers: { 'Content-Type': 'application/xml' },
        })
}