'use client'

import styles from './Blog.module.css'
import { createTranslator } from '@/i18n'

interface BlogHeroProps {
  locale: string
}

export default function BlogHero({ locale }: BlogHeroProps) {
  const t = createTranslator(locale);

  return (
    <div className={styles.hero}>
      <h1 className={styles.heroTitle}>
        {t('blog.hero_title')}
      </h1>
      <p className={styles.heroSubtitle}>
        {t('blog.hero_subtitle')}
      </p>
    </div>
  )
}