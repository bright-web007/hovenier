
import Link from 'next/link'
import styles from './Blog.module.css'
import { localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'

interface Category {
  name: string
  slug: string
  count: number
}

interface BlogSidebarProps {
  categories: Category[]
  locale: string
}

const popularArticles = {
  nl: [
    { title: "Wat kost een hovenier per uur?", date: "15 maart 2024" },
    { title: "5 fouten bij tuinonderhoud", date: "10 maart 2024" },
    { title: "Groendak subsidies 2024", date: "8 maart 2024" }
  ],
  en: [
    { title: "What does a gardener cost per hour?", date: "March 15, 2024" },
    { title: "5 mistakes in garden maintenance", date: "March 10, 2024" },
    { title: "Green roof subsidies 2024", date: "March 8, 2024" }
  ]
}

export default function BlogSidebar({ categories, locale }: BlogSidebarProps) {
  const t = createTranslator(locale);
  const articles = popularArticles[locale as 'en' | 'nl'] || popularArticles['nl'];

  return (
    <div className={styles.sidebar}>
      {/* Categories Widget */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>{t('blog.categories_title')}</h3>
        <div className={styles.categoryList}>
          {categories.map(category => (
            <Link
              key={category.slug}
              href={localizePath(`/nieuws/categorie/${category.slug}`, locale as SupportedLocale)}
              className={styles.categoryItem}
            >
              <span className={styles.categoryName}>{category.name}</span>
              <span className={styles.categoryCount}>
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className={`${styles.widget} ${styles.newsletterWidget}`}>
        <h3 className={styles.widgetTitle}>{t('blog.newsletter_title')}</h3>
        <p className={styles.newsletterDescription}>
          {t('blog.newsletter_text')}
        </p>
        <div className={styles.newsletterForm}>
          <input 
            type="email" 
            placeholder={t('blog.newsletter_placeholder')}
            className={styles.newsletterInput}
          />
          <button className={styles.newsletterButton}>
            {t('blog.newsletter_button')}
          </button>
        </div>
      </div>

      {/* Popular Articles Widget */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>{t('blog.popular_title')}</h3>
        <div className={styles.popularList}>
          {articles.map((article, index) => (
            <a key={index} href="#" className={styles.popularItem}>
              <h4 className={styles.popularTitle}>
                {article.title}
              </h4>
              <p className={styles.popularDate}>{article.date}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Quick Contact Widget */}
      <div className={`${styles.widget} ${styles.contactWidget}`}>
        <h3 className={styles.widgetTitle}>{t('blog.advice_title')}</h3>
        <p className={styles.contactDescription}>
          {t('blog.advice_text')}
        </p>
        <Link
          href={localizePath('/#lead-form', locale as SupportedLocale)}
          className={styles.contactButton}
        >
          {t('blog.advice_link')}
        </Link>
      </div>
    </div>
  )
}
