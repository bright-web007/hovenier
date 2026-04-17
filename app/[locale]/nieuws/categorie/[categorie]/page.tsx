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

// Available categories with translations
const categories = [
  {
    slug: 'kosten',
    name: { nl: 'Kosten & Prijzen', en: 'Costs & Prices' },
    description: { nl: 'Alles over kosten en prijzen van tuinonderhoud, tuinontwerp en andere hoveniersdiensten.', en: 'Everything about costs and prices of garden maintenance, garden design and other gardening services.' }
  },
  {
    slug: 'seizoen',
    name: { nl: 'Seizoensadvies', en: 'Seasonal Advice' },
    description: { nl: 'Tips en advies per seizoen voor optimaal tuinonderhoud en planning.', en: 'Tips and advice per season for optimal garden maintenance and planning.' }
  },
  {
    slug: 'tips',
    name: { nl: 'Tuintips', en: 'Garden Tips' },
    description: { nl: 'Praktische tips en tricks voor tuinverzorging, onderhoud en verfraaing.', en: 'Practical tips and tricks for garden care, maintenance and beautification.' }
  },
  {
    slug: 'groendak',
    name: { nl: 'Groendaken', en: 'Green Roofs' },
    description: { nl: 'Alles over groendaken, sedumdaken en duurzame dakbegroeiing.', en: 'Everything about green roofs, sedum roofs and sustainable roof vegetation.' }
  },
  {
    slug: 'tuinontwerp',
    name: { nl: 'Tuinontwerp', en: 'Garden Design' },
    description: { nl: 'Inspiratie, trends en advies voor tuinontwerp en landschapsarchitectuur.', en: 'Inspiration, trends and advice for garden design and landscape architecture.' }
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
  const lang = (locale === 'en' ? 'en' : 'nl') as 'en' | 'nl';

  if (!category) {
    return {
      title: lang === 'en' ? 'Category not found' : 'Categorie niet gevonden',
      description: lang === 'en' ? 'The requested category could not be found.' : 'De gevraagde categorie kon niet worden gevonden.'
    }
  }

  const name = category.name[lang];
  const description = category.description[lang];

  return {
    title: lang === 'en'
      ? `${name} - Garden News & Tips | Hovenier.frl`
      : `${name} - Tuinnieuws & Tips | Hovenier.frl`,
    description: lang === 'en'
      ? `${description} Discover articles about ${name.toLowerCase()} in our blog.`
      : `${description} Ontdek artikelen over ${name.toLowerCase()} in onze blog.`,
    keywords: lang === 'en'
      ? `${name}, garden news, garden tips, gardener blog, ${category.slug}, Friesland`
      : `${name}, tuinnieuws, tuintips, hovenier blog, ${category.slug}, Friesland`,
    alternates: getLocaleAlternates(`/nieuws/categorie/${categorie}`, locale as SupportedLocale),
  }
}

export default async function NewsCategoryPage({ params }: Props) {
  const { locale, categorie } = await params
  setRequestLocale(locale)
  const lang = (locale === 'en' ? 'en' : 'nl') as 'en' | 'nl';

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
    { label: category.name[lang] }
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
                {category.name[lang]}
              </h1>
              <p className={styles.categoryDescription}>
                {category.description[lang]}
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
                  {lang === 'en' ? 'Coming soon' : 'Binnenkort beschikbaar'}
                </h3>
                <p className={styles.emptyStateText}>
                  {lang === 'en' ? 'We are working on new articles in this category. Check back soon!' : 'We werken aan nieuwe artikelen in deze categorie. Kom binnenkort terug!'}
                </p>
              </div>
            )}
          </div>

          <section className={styles.categoryNavPanel}>
            <h3 className={styles.sectionTitle}>
              {lang === 'en' ? 'Other Categories' : 'Andere Categorieën'}
            </h3>
            <div className={styles.categoryNavGrid}>
              {categories.filter(c => c.slug !== categorie).map((cat) => (
                <Link
                  key={cat.slug}
                  href={localizePath(`/nieuws/categorie/${cat.slug}`, locale as SupportedLocale)}
                  className={styles.categoryNavCard}
                >
                  <div className={styles.categoryNavName}>
                    {cat.name[lang]}
                  </div>
                  <div className={styles.categoryNavDescription}>
                    {cat.description[lang].split('.')[0]}
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
