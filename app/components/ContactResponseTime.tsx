'use client'

import styles from './Contact.module.css'

interface ContactResponseTimeProps {
  locale: string
}

export default function ContactResponseTime({ locale }: ContactResponseTimeProps) {
  const isEn = locale === 'en';

  return (
    <div className={styles.responseCard}>
      <h3 className={styles.contactCardTitle}>
        {isEn ? 'Response Time' : 'Reactietijd'}
      </h3>
      <div className={styles.responseItems}>
        <div className={styles.responseItem}>
          <span className={styles.responseLabel}>Email</span>
          <span className={styles.responseTime}>&lt; 24 {isEn ? 'hours' : 'uur'}</span>
        </div>
        <div className={styles.responseItem}>
          <span className={styles.responseLabel}>{isEn ? 'Partnership questions' : 'Partnership vragen'}</span>
          <span className={styles.responseTime}>&lt; 48 {isEn ? 'hours' : 'uur'}</span>
        </div>
        <div className={styles.responseItem}>
          <span className={styles.responseLabel}>{isEn ? 'Technical issues' : 'Technische problemen'}</span>
          <span className={styles.responseTime}>&lt; 12 {isEn ? 'hours' : 'uur'}</span>
        </div>
      </div>
    </div>
  )
}