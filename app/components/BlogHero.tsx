'use client'

import styles from './Blog.module.css'

interface BlogHeroProps {
  locale: string
}

export default function BlogHero({ locale }: BlogHeroProps) {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroTitle}>
        Tuinnieuws & Tips
      </h1>
      <p className={styles.heroSubtitle}>
        Expert advies en laatste trends voor uw tuin
      </p>
    </div>
  )
}