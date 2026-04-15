'use client'

import styles from './Partnership.module.css'

interface PartnershipHeroProps {
  locale: string
}

export default function PartnershipHero({ locale }: PartnershipHeroProps) {
  const isEn = locale === 'en';
  return (
    <section className="section partnership-hero">
      <div className="section-inner">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>{isEn ? 'For professionals' : 'Voor professionals'}</span>
            </div>
            <h1 className={styles.heroTitle}>
              {isEn ? 'Become a partner of Hovenier.frl' : 'Word partner van Hovenier.frl'}
            </h1>
            <p className={styles.heroDescription}>
              {isEn ? 'Join our network of qualified gardeners and get access to clients across Friesland. No commission fees, with full transparency.' : 'Sluit je aan bij ons netwerk van gekwalificeerde hoveniers en krijg toegang tot klanten in heel Friesland. Zonder commissiekosten, met volledige transparantie.'}
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>150+</span>
                <span className={styles.heroStatLabel}>{isEn ? 'Satisfied clients' : 'Tevreden klanten'}</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>25+</span>
                <span className={styles.heroStatLabel}>{isEn ? 'Partner gardeners' : 'Partner hoveniers'}</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>0%</span>
                <span className={styles.heroStatLabel}>{isEn ? 'Commission' : 'Commissie'}</span>
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