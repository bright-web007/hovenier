'use client'

import styles from './Contact.module.css'

interface ContactInfoProps {
  locale: string
}

export default function ContactInfo({ locale }: ContactInfoProps) {
  const isEn = locale === 'en';

  return (
    <div className={styles.contactCard}>
      <h3 className={styles.contactCardTitle}>
        {isEn ? 'Direct Contact' : 'Direct Contact'}
      </h3>
      <div className={styles.contactItems}>
        <div className={styles.contactItem}>
          <div className={styles.contactIcon}>
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className={styles.contactDetails}>
            <h4>Email</h4>
            <p>info@hovenier.frl</p>
            <p className={styles.contactSubtext}>{isEn ? 'We respond within 24 hours' : 'We reageren binnen 24 uur'}</p>
          </div>
        </div>

        <div className={styles.contactItem}>
          <div className={styles.contactIcon}>
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className={styles.contactDetails}>
            <h4>{isEn ? 'Location' : 'Locatie'}</h4>
            <p>{isEn ? 'Friesland, Netherlands' : 'Friesland, Nederland'}</p>
            <p className={styles.contactSubtext}>{isEn ? 'Locally based in Friesland' : 'Lokaal gevestigd in Friesland'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}