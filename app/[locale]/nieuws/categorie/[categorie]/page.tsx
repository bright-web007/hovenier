import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../../components/Navigation'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import { notFound } from 'next/navigation'
import { getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils'

type Props = {
  params: Promise<{ locale: string; categorie: string }>
}

// Available categories
const categories = [
  {
    slug: 'kosten',
    name: 'Kosten & Prijzen',
    description: 'Alles over kosten en prijzen van tuinonderhoud, tuinontwerp en andere hoveniersdiensten.'
  },
  {
    slug: 'seizoen',
    name: 'Seizoensadvies',
    description: 'Tips en advies per seizoen voor optimaal tuinonderhoud en planning.'
  },
  {
    slug: 'tips',
    name: 'Tuintips',
    description: 'Praktische tips en tricks voor tuinverzorging, onderhoud en verfraaing.'
  },
  {
    slug: 'groendak',
    name: 'Groendaken',
    description: 'Alles over groendaken, sedumdaken en duurzame dakbegroeiing.'
  },
  {
    slug: 'tuinontwerp',
    name: 'Tuinontwerp',
    description: 'Inspiratie, trends en advies voor tuinontwerp en landschapsarchitectuur.'
  }
]

// Sample articles per category
const sampleArticles = {
  kosten: [
    {
      id: 1,
      title: 'Wat kost tuinonderhoud per maand in 2026?',
      excerpt: 'Complete kostenoverzicht voor regelmatig tuinonderhoud door professionals.',
      publishDate: '2026-03-15',
      readTime: '5 min',
      slug: 'kosten-tuinonderhoud-2026'
    },
    {
      id: 2,
      title: 'Groendak kosten en subsidies overzicht',
      excerpt: 'Alles over de kosten van groendaken en welke subsidies beschikbaar zijn.',
      publishDate: '2026-03-10',
      readTime: '7 min',
      slug: 'groendak-kosten-subsidies'
    }
  ],
  seizoen: [
    {
      id: 3,
      title: 'Voorjaar tuinklussen: essentiële taken voor maart',
      excerpt: 'Bereid je tuin voor op het groeiseizoen met deze belangrijke voorjaarstaken.',
      publishDate: '2026-03-12',
      readTime: '4 min',
      slug: 'voorjaar-tuinklussen-maart'
    }
  ]
}

// Generate static params for categories
export async function generateStaticParams() {
  return categories.map((category) => ({
    categorie: category.slug,
  }))
}

// ISR: Never revalidate (category pages are static content)
export const revalidate = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, categorie } = await params
  const category = categories.find(c => c.slug === categorie)
  
  if (!category) {
    return {
      title: 'Categorie niet gevonden',
      description: 'De gevraagde categorie kon niet worden gevonden.'
    }
  }

  return {
    title: `${category.name} - Tuinnieuws & Tips | Hovenier.frl`,
    description: `${category.description} Ontdek artikelen over ${category.name.toLowerCase()} in onze blog.`,
    keywords: `${category.name}, tuinnieuws, tuintips, hovenier blog, ${category.slug}, Friesland`,
    alternates: getLocaleAlternates(`/nieuws/categorie/${categorie}`, locale as SupportedLocale),
  }
}

export default async function NewsCategoryPage({ params }: Props) {
  const { locale, categorie } = await params
  setRequestLocale(locale)
  
  // Find category by slug
  const category = categories.find(c => c.slug === categorie)
  
  if (!category) {
    notFound()
  }

  // Get articles for this category (in production, fetch from CMS)
  const articles = sampleArticles[categorie as keyof typeof sampleArticles] || []

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'News' : 'Nieuws', href: '/nieuws' },
    { label: category.name }
  ]

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, var(--cream-light), var(--sage-light))' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          
          {/* Header Section */}
          <div style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div style={{ 
              maxWidth: '64rem', 
              margin: '0 auto', 
              textAlign: 'center', 
              marginBottom: '2rem' 
            }}>
              <h1 style={{ 
                fontSize: '3rem', 
                fontFamily: 'var(--serif)', 
                fontWeight: '600', 
                color: 'var(--forest)', 
                marginBottom: '1rem', 
                lineHeight: '1.1' 
              }}>
                {category.name}
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                color: 'var(--forest-mid)', 
                lineHeight: '1.6' 
              }}>
                {category.description}
              </p>
            </div>
          </div>

          {/* Articles Grid */}
          <div style={{ paddingBottom: '4rem' }}>
            {articles.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
                gap: '2rem' 
              }}>
                {articles.map((article) => (
                  <article key={article.id} style={{ 
                    backgroundColor: 'white', 
                    borderRadius: '12px', 
                    padding: '2rem', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    transition: 'transform 0.2s'
                  }}>
                    <h2 style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold', 
                      color: 'var(--forest)', 
                      marginBottom: '1rem',
                      lineHeight: '1.3'
                    }}>
                      <a href={`/nieuws/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {article.title}
                      </a>
                    </h2>
                    <p style={{ 
                      color: 'var(--forest-mid)', 
                      lineHeight: '1.6', 
                      marginBottom: '1.5rem' 
                    }}>
                      {article.excerpt}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      fontSize: '0.875rem',
                      color: 'var(--forest-light)'
                    }}>
                      <span>{new Date(article.publishDate).toLocaleDateString('nl-NL')}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                padding: '3rem 2rem',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: 'var(--forest)', 
                  marginBottom: '1rem' 
                }}>
                  Binnenkort beschikbaar
                </h3>
                <p style={{ 
                  color: 'var(--forest-mid)', 
                  lineHeight: '1.6' 
                }}>
                  We werken aan nieuwe artikelen in deze categorie. Kom binnenkort terug!
                </p>
              </div>
            )}
          </div>

          {/* Category Navigation */}
          <section style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: 'var(--forest)', 
              marginBottom: '1.5rem' 
            }}>
              Andere Categorieën
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              {categories.filter(c => c.slug !== categorie).map((cat) => (
                <a 
                  key={cat.slug}
                  href={`/nieuws/categorie/${cat.slug}`}
                  style={{ 
                    padding: '1rem', 
                    backgroundColor: 'var(--cream-light)', 
                    borderRadius: '8px', 
                    textDecoration: 'none',
                    color: 'var(--forest)',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--forest-mid)' }}>
                    {cat.description.split('.')[0]}
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
