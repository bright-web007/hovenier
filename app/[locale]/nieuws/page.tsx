import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation'
import Breadcrumbs from '../../components/Breadcrumbs'
import BlogHero from '../../components/BlogHero'
import BlogFeaturedArticle from '../../components/BlogFeaturedArticle'
import BlogArticleGrid from '../../components/BlogArticleGrid'
import BlogSidebar from '../../components/BlogSidebar'
import BlogSchema from '../../components/schemas/BlogSchema'
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema'
import styles from '../../components/Blog.module.css'

type Props = {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Tuinnieuws & Tips - Blog | Hovenier.frl',
  description: 'Ontdek de nieuwste tuintrends, seizoenstips en expert advies. Blijf op de hoogte van alles over tuinonderhoud en landschapsdesign in Friesland.',
  keywords: 'tuinnieuws, tuintips, hovenier blog, seizoen tuinadvies, tuinonderhoud tips, Friesland',
}

const exampleArticles = [
  {
    id: 1,
    title: 'Voorjaar 2024: 5 Essentiële Tuinklussen voor Maart',
    excerpt: 'De lente staat voor de deur! Ontdek welke werkzaamheden nu prioriteit hebben om je tuin klaar te maken voor het groeiseizoen.',
    category: 'seizoen',
    readTime: '4 min',
    publishDate: '2024-03-15',
    image: '/images/spring-garden-prep.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'Kosten Groendak: Subsidies & Besparingen in 2024',
    excerpt: 'Alles wat je moet weten over groendak subsidies, installatie kosten en lange termijn voordelen voor je portemonnee.',
    category: 'groendak',
    readTime: '6 min',
    publishDate: '2024-03-12',
    image: '/images/green-roof-costs.jpg',
    featured: false
  },
  {
    id: 3,
    title: '10 Onderhoudsarme Planten voor de Friese Tuin',
    excerpt: 'Weinig tijd voor tuinonderhoud? Deze planten gedijen perfect in het Friese klimaat met minimale zorg.',
    category: 'tips',
    readTime: '5 min',
    publishDate: '2024-03-08',
    image: '/images/low-maintenance-plants.jpg',
    featured: false
  }
]

const categories = [
  { name: 'Kosten', slug: 'kosten', count: 12 },
  { name: 'Seizoen', slug: 'seizoen', count: 18 },
  { name: 'Tips', slug: 'tips', count: 24 },
  { name: 'Groendak', slug: 'groendak', count: 8 },
  { name: 'Tuinontwerp', slug: 'tuinontwerp', count: 15 }
]

export default async function NieuwsHubPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'News' : 'Nieuws' }
  ];

  // Transform breadcrumbs for schema
  const breadcrumbSchemaItems = breadcrumbItems.map(item => ({
    name: item.label,
    url: item.href ? `https://hovenier.frl${item.href}` : `https://hovenier.frl/${locale}/nieuws`
  }));

  // Get featured article
  const featuredArticle = exampleArticles.find(article => article.featured);

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
        <div className="container mx-auto px-4">
          <BlogHero locale={locale} />
          
          <div className="py-8">
            {featuredArticle && (
              <BlogFeaturedArticle article={featuredArticle} locale={locale} />
            )}
            
            <div className={styles.layout}>
              <BlogArticleGrid articles={exampleArticles} locale={locale} />
              <BlogSidebar categories={categories} locale={locale} />
            </div>
          </div>
        </div>
      </main>

      <BlogSchema 
        locale={locale}
        articles={exampleArticles}
        url={`https://hovenier.frl/${locale}/nieuws`}
      />
    </>
  )
}