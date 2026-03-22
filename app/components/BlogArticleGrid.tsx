'use client'

import styles from './Blog.module.css'

interface Article {
  id: number
  title: string
  excerpt: string
  category: string
  readTime: string
  publishDate: string
  image: string
  featured: boolean
}

interface BlogArticleGridProps {
  articles: Article[]
  locale: string
}

export default function BlogArticleGrid({ articles, locale }: BlogArticleGridProps) {
  const recentArticles = articles.filter(article => !article.featured)
  
  return (
    <div>
      <h2 className={styles.articlesHeader}>Recente Artikelen</h2>
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
                    {article.category}
                  </span>
                  <span className={styles.articleReadTime}>
                    {article.readTime} leestijd
                  </span>
                </div>
                <h3 className={styles.articleTitle}>
                  {article.title}
                </h3>
                <p className={styles.articleExcerpt}>
                  {article.excerpt}
                </p>
                <div className={styles.articleFooter}>
                  <span className={styles.articleDate}>{article.publishDate}</span>
                  <a 
                    href={`/nieuws/artikel-${article.id}`}
                    className={styles.articleLink}
                  >
                    Lees meer →
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.pagination}>
        <p className={styles.paginationTitle}>Dit is een CMS-gedreven pagina</p>
        <p className={styles.paginationSubtext}>
          Artikelen worden automatisch ingeladen van Muse CMS
        </p>
      </div>
    </div>
  )
}