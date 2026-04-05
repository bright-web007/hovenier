import { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../../components/Navigation'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import styles from '../../../../components/Blog.module.css'
import { notFound } from 'next/navigation'
import { formatArticleDate, getArticles } from '@/lib/articles'
import { getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'

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

  const allArticles = await getArticles()
  const articles = allArticles.filter(article => article.category.slug === categorie)

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
      
      <main className={styles.page}>
        <div className={styles.pageInner}>
          
          <div className={styles.categoryHeader}>
            <div className={styles.categoryHero}>
              <h1 className={styles.categoryTitle}>
                {category.name}
              </h1>
              <p className={styles.categoryDescription}>
                {category.description}
              </p>
            </div>
          </div>

          <div className={styles.categoryContent}>
            {articles.length > 0 ? (
              <div className={styles.categoryGrid}>
                {articles.map((article) => (
                  <article key={article.id} className={styles.categoryCard}>
                    <h2 className={styles.categoryCardTitle}>
                      <Link href={localizePath(`/nieuws/${article.slug}`, locale as SupportedLocale)} className={styles.categoryCardLink}>
                        {article.title}
                      </Link>
                    </h2>
                    <p className={styles.categoryCardExcerpt}>
                      {article.excerpt}
                    </p>
                    <div className={styles.categoryCardMeta}>
                      <span>{formatArticleDate(article.publishedAt, locale)}</span>
                      <span>{article.readTime} min</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h3 className={styles.emptyStateTitle}>
                  Binnenkort beschikbaar
                </h3>
                <p className={styles.emptyStateText}>
                  We werken aan nieuwe artikelen in deze categorie. Kom binnenkort terug!
                </p>
              </div>
            )}
          </div>

          <section className={styles.categoryNavPanel}>
            <h3 className={styles.sectionTitle}>
              Andere Categorieën
            </h3>
            <div className={styles.categoryNavGrid}>
              {categories.filter(c => c.slug !== categorie).map((cat) => (
                <Link 
                  key={cat.slug}
                  href={localizePath(`/nieuws/categorie/${cat.slug}`, locale as SupportedLocale)}
                  className={styles.categoryNavCard}
                >
                  <div className={styles.categoryNavName}>
                    {cat.name}
                  </div>
                  <div className={styles.categoryNavDescription}>
                    {cat.description.split('.')[0]}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
