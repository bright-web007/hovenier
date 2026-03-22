'use client'

import styles from './Contact.module.css'

interface ContactFAQProps {
  locale: string
}

export default function ContactFAQ({ locale }: ContactFAQProps) {
  return (
    <div className={styles.faqCard}>
      <h3 className={styles.contactCardTitle}>
        Veelgestelde Vragen
      </h3>
      <div className={styles.faqItems}>
        <div className={styles.faqItem}>
          <h4>Voor Huiseigenaren:</h4>
          <p>Hoe werkt de matching service?</p>
          <a href="/over-ons">→ Lees meer</a>
        </div>
        <div className={styles.faqItem}>
          <h4>Voor Hoveniers:</h4>
          <p>Hoe word ik lid van het platform?</p>
          <a href="/samenwerking">→ Partnership info</a>
        </div>
        <div className={styles.faqItem}>
          <h4>Kosten & Prijzen:</h4>
          <p>Wat kosten hovenier diensten?</p>
          <a href="/kosten">→ Kostengids</a>
        </div>
      </div>
    </div>
  )
}