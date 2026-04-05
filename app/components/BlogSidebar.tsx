'use client'

import Link from 'next/link'
import styles from './Blog.module.css'
import { localizePath, type SupportedLocale } from '@/lib/locale-utils'

interface Category {
  name: string
  slug: string
  count: number
}

interface BlogSidebarProps {
  categories: Category[]
  locale: string
}

const popularArticles = [
  {
    title: "Wat kost een hovenier per uur?",
    date: "15 maart 2024"
  },
  {
    title: "5 fouten bij tuinonderhoud",
    date: "10 maart 2024"
  },
  {
    title: "Groendak subsidies 2024",
    date: "8 maart 2024"
  }
]

export default function BlogSidebar({ categories, locale }: BlogSidebarProps) {
  return (
    <div className={styles.sidebar}>
      {/* Categories Widget */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>Categorieën</h3>
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
        <h3 className={styles.widgetTitle}>Tuinnieuwsbrief</h3>
        <p className={styles.newsletterDescription}>
          Ontvang maandelijks de beste tuintips en seizoensadvies in je inbox.
        </p>
        <div className={styles.newsletterForm}>
          <input 
            type="email" 
            placeholder="Je email adres"
            className={styles.newsletterInput}
          />
          <button className={styles.newsletterButton}>
            Aanmelden
          </button>
        </div>
      </div>

      {/* Popular Articles Widget */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>Populaire Artikelen</h3>
        <div className={styles.popularList}>
          {popularArticles.map((article, index) => (
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
        <h3 className={styles.widgetTitle}>Advies Nodig?</h3>
        <p className={styles.contactDescription}>
          Krijg direct antwoord op je tuinvragen van lokale experts.
        </p>
        <Link
          href={localizePath('/#lead-form', locale as SupportedLocale)}
          className={styles.contactButton}
        >
          Gratis Advies →
        </Link>
      </div>
    </div>
  )
}
