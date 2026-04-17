'use client'

import styles from './Contact.module.css'

interface ContactHeroProps {
  locale: string
}

export default function ContactHero({ locale }: ContactHeroProps) {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroTitle}>
        Contact
      </h1>
      <p className={styles.heroSubtitle}>
        {locale === 'en'
          ? 'Questions, feedback or collaboration? We would love to hear from you!'
          : 'Vragen, feedback of samenwerking? We horen graag van je!'}
      </p>
    </div>
  )
}