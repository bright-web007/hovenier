'use client'

import { createTranslator } from '@/i18n'
import styles from './Partnership.module.css'

interface PartnershipHeroProps {
  locale: string
}

export default function PartnershipHero({ locale }: PartnershipHeroProps) {
  const t = createTranslator(locale);
  return (
    <section className="section partnership-hero">
      <div className="section-inner">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>{t('partnership.hero_eyebrow')}</span>
            </div>
            <h1 className={styles.heroTitle}>
              {t('partnership.hero_title')}
            </h1>
            <p className={styles.heroDescription}>
              {t('partnership.hero_subtitle')}
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>150+</span>
                <span className={styles.heroStatLabel}>{t('partnership.hero_stat_clients')}</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>25+</span>
                <span className={styles.heroStatLabel}>{t('partnership.hero_stat_gardeners')}</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>0%</span>
                <span className={styles.heroStatLabel}>{t('partnership.hero_stat_commission')}</span>
              </div>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroPlaceholder}>
              <svg className={styles.heroIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}