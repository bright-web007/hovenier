import { generateAllPages, buildSitemapXml } from '@/lib/sitemap'

export const revalidate = 60

function normalizePriority(priority?: number): number | undefined {
    if (typeof priority !== 'number' || Number.isNaN(priority)) return undefined

    const clamped = Math.min(1, Math.max(0, priority))
    return Number(clamped.toFixed(2))
}

function normalizeDate(date?: string | Date): string {
    if (!date) return new Date().toISOString()
    return new Date(date).toISOString()
}

export async function GET() {
    try {
        const items = await generateAllPages()

        const filtered = items
            .map((i) => {
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

                    if (!isValid) return null

                    return {
                        url: i.url,
                        lastModified: normalizeDate(i.lastModified),
                        changeFrequency: i.changeFrequency,
                        priority: normalizePriority(i.priority),
                    }
                } catch {
                    return null
                }
            })
            .filter((item): item is NonNullable<typeof item> => item !== null)

        const xml = buildSitemapXml(filtered)

        return new Response(xml, {
            headers: {
                'Content-Type': 'application/xml',
            },
        })
    } catch (err) {
        console.error('Sitemap generation failed:', err)

        return new Response('Sitemap error', {
            status: 500,
        })
    }
}