
import Link from 'next/link'
import styles from './Blog.module.css'
import type { ArticleRecord } from '@/lib/articles'
import { formatArticleDate } from '@/lib/articles'
import { localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'

interface BlogFeaturedArticleProps {
  article: ArticleRecord
  locale: string
}

export default function BlogFeaturedArticle({ article, locale }: BlogFeaturedArticleProps) {
  const t = createTranslator(locale);

  return (
    <section className={styles.featuredArticle}>
      <div className={styles.featuredContent}>
        <div className={styles.featuredText}>
          <div className={styles.featuredBadge}>
            <span className={styles.featuredLabel}>{t('blog.featured_label')}</span>
            <span className={styles.featuredCategory}>{article.category.name}</span>
          </div>
          <h2 className={styles.featuredTitle}>
            {article.title}
          </h2>
          <p className={styles.featuredExcerpt}>
            {article.excerpt}
          </p>
          <div className={styles.featuredMeta}>
            <div className={styles.featuredMetaText}>
              {article.readTime} {t('blog.min_read')} • {formatArticleDate(article.publishedAt, locale)}
            </div>
            <Link
              href={localizePath(`/nieuws/${article.slug}`, locale as SupportedLocale)}
              className={styles.featuredButton}
            >
              {t('blog.read_more_featured')}
            </Link>
          </div>
        </div>
        <div className={styles.featuredImage}>
          <p>Featured Image</p>
        </div>
      </div>
    </section>
  )
}
