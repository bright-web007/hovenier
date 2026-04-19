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
import { getArticleCategories, getArticles } from '@/lib/articles'
import { getAbsoluteUrl, getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = createTranslator(locale)

  return {
    title: t('nieuws_page.meta_title'),
    description: t('nieuws_page.meta_description'),
    alternates: getLocaleAlternates('/nieuws', locale as SupportedLocale),
  }
}

export default async function NieuwsHubPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = createTranslator(locale)
  const articles = await getArticles()
  const categories = await getArticleCategories()

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: t('nieuws_page.breadcrumb') }
  ];

  // Transform breadcrumbs for schema
  const breadcrumbSchemaItems = breadcrumbItems.map(item => ({
    name: item.label,
    url: item.href ? getAbsoluteUrl(item.href, locale as SupportedLocale) : getAbsoluteUrl('/nieuws', locale as SupportedLocale)
  }));

  // Get featured article
  const featuredArticle = articles.find(article => article.featured) ?? articles[0];

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <main className={styles.page}>
        <div className={styles.pageInner}>
          <BlogHero locale={locale} />
          
          <div className="py-8">
            {featuredArticle && (
              <BlogFeaturedArticle article={featuredArticle} locale={locale} />
            )}
            
            <div className={styles.layout}>
              <BlogArticleGrid articles={articles} locale={locale} />
              <BlogSidebar categories={categories} locale={locale} />
            </div>
          </div>
        </div>
      </main>

      <BlogSchema 
        locale={locale}
        articles={articles}
        url={getAbsoluteUrl('/nieuws', locale as SupportedLocale)}
      />
    </>
  )
}
