'use client'

import styles from './Contact.module.css'

interface ContactResponseTimeProps {
  locale: string
}

export default function ContactResponseTime({ locale }: ContactResponseTimeProps) {
  return (
    <div className={styles.responseCard}>
      <h3 className={styles.contactCardTitle}>
        Reactietijd
      </h3>
      <div className={styles.responseItems}>
        <div className={styles.responseItem}>
          <span className={styles.responseLabel}>Email</span>
          <span className={styles.responseTime}>&lt; 24 uur</span>
        </div>
        <div className={styles.responseItem}>
          <span className={styles.responseLabel}>Partnership vragen</span>
          <span className={styles.responseTime}>&lt; 48 uur</span>
        </div>
        <div className={styles.responseItem}>
          <span className={styles.responseLabel}>Technische problemen</span>
          <span className={styles.responseTime}>&lt; 12 uur</span>
        </div>
      </div>
    </div>
  )
}