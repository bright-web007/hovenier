'use client'

import Link from 'next/link'
import styles from './Blog.module.css'
import type { ArticleRecord } from '@/lib/articles'
import { formatArticleDate } from '@/lib/articles'
import { localizePath, type SupportedLocale } from '@/lib/locale-utils'

interface BlogArticleGridProps {
  articles: ArticleRecord[]
  locale: string
}

export default function BlogArticleGrid({ articles, locale }: BlogArticleGridProps) {
  const recentArticles = articles.filter(article => !article.featured)
  
  return (
    <div>
      <h2 className={styles.articlesHeader}>{locale === 'en' ? 'Recent Articles' : 'Recente Artikelen'}</h2>
      <div className={styles.articlesGrid}>
        {recentArticles.map(article => (
          <article key={article.id} className={styles.articleCard}>
            <div className={styles.articleContent}>
              <div className={styles.articleImage}>
                <p>Article Image</p>
              </div>
              <div className={styles.articleText}>
                <div className={styles.articleMeta}>
                  <span className={styles.articleCategory}>
                    {article.category.name}
                  </span>
                  <span className={styles.articleReadTime}>
                    {article.readTime} {locale === 'en' ? 'min read' : 'min leestijd'}
                  </span>
                </div>
                <h3 className={styles.articleTitle}>
                  {article.title}
                </h3>
                <p className={styles.articleExcerpt}>
                  {article.excerpt}
                </p>
                <div className={styles.articleFooter}>
                  <span className={styles.articleDate}>{formatArticleDate(article.publishedAt, locale)}</span>
                  <Link
                    href={localizePath(`/nieuws/${article.slug}`, locale as SupportedLocale)}
                    className={styles.articleLink}
                  >
                    {locale === 'en' ? 'Read more →' : 'Lees meer →'}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.pagination}>
        <p className={styles.paginationTitle}>{locale === 'en' ? 'This is a CMS-driven page' : 'Dit is een CMS-gedreven pagina'}</p>
        <p className={styles.paginationSubtext}>
          {locale === 'en' ? 'Articles are automatically loaded from Muse CMS' : 'Artikelen worden automatisch ingeladen van Muse CMS'}
        </p>
      </div>
    </div>
  )
}
