'use client'

import styles from './Blog.module.css'

interface BlogHeroProps {
  locale: string
}

export default function BlogHero({ locale }: BlogHeroProps) {
  const isEn = locale === 'en';

  return (
    <div className={styles.hero}>
      <h1 className={styles.heroTitle}>
        {isEn ? 'Garden News & Tips' : 'Tuinnieuws & Tips'}
      </h1>
      <p className={styles.heroSubtitle}>
        {isEn ? 'Expert advice and latest trends for your garden' : 'Expert advies en laatste trends voor uw tuin'}
      </p>
    </div>
  )
}