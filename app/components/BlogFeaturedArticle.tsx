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

interface BlogFeaturedArticleProps {
  article: Article
  locale: string
}

export default function BlogFeaturedArticle({ article, locale }: BlogFeaturedArticleProps) {
  return (
    <section className={styles.featuredArticle}>
      <div className={styles.featuredContent}>
        <div className={styles.featuredText}>
          <div className={styles.featuredBadge}>
            <span className={styles.featuredLabel}>Uitgelicht</span>
            <span className={styles.featuredCategory}>{article.category}</span>
          </div>
          <h2 className={styles.featuredTitle}>
            {article.title}
          </h2>
          <p className={styles.featuredExcerpt}>
            {article.excerpt}
          </p>
          <div className={styles.featuredMeta}>
            <div className={styles.featuredMetaText}>
              {article.readTime} leestijd • {article.publishDate}
            </div>
            <a 
              href={`/nieuws/artikel-${article.id}`}
              className={styles.featuredButton}
            >
              Lees Verder →
            </a>
          </div>
        </div>
        <div className={styles.featuredImage}>
          <p>Featured Image</p>
        </div>
      </div>
    </section>
  )
}