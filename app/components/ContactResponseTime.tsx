
import styles from './Contact.module.css'
import { createTranslator } from '@/i18n'

interface ContactResponseTimeProps {
  locale: string
}

export default function ContactResponseTime({ locale }: ContactResponseTimeProps) {
  const t = createTranslator(locale);

  return (
    <div className={styles.responseCard}>
      <h3 className={styles.contactCardTitle}>
        {t('contact_response_time.title')}
      </h3>
      <div className={styles.responseItems}>
        <div className={styles.responseItem}>
          <span className={styles.responseLabel}>Email</span>
          <span className={styles.responseTime}>&lt; 24 {t('contact_response_time.hours')}</span>
        </div>
        <div className={styles.responseItem}>
          <span className={styles.responseLabel}>{t('contact_response_time.partnership_label')}</span>
          <span className={styles.responseTime}>&lt; 48 {t('contact_response_time.hours')}</span>
        </div>
        <div className={styles.responseItem}>
          <span className={styles.responseLabel}>{t('contact_response_time.technical_label')}</span>
          <span className={styles.responseTime}>&lt; 12 {t('contact_response_time.hours')}</span>
        </div>
      </div>
    </div>
  )
}