import { generateAllPages, buildSitemapXml } from '@/lib/sitemap'

export const revalidate = 60

export async function GET() {
    const items = await generateAllPages()

    const filtered = []

    for (const i of items) {
        try {
            const pathname = i.url.replace('https://hovenier.frl', '')
            const parts = pathname.split('/').filter(Boolean)

            const isLocale = parts[0] === 'nl' || parts[0] === 'en'
            const isRegio = parts[1] === 'regio'

            const isRegionPage = parts.length === 3
            const isMunicipalityPage = parts.length === 4
            const isCityPage = parts.length === 5


            const isValid =
                isLocale &&
                isRegio &&
                (isRegionPage || isMunicipalityPage || isCityPage)

            if (isValid) {
                filtered.push(i)
            }
        } catch (e) {
        }
    }


    const xml = buildSitemapXml(filtered)

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}