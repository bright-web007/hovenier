'use client'

import NewLeadForm from './NewLeadForm'
import styles from './Partnership.module.css'

interface PartnershipCTAProps {
  translations: any
  locale: string
}

export default function PartnershipCTA({ translations, locale }: PartnershipCTAProps) {
  const isEn = locale === 'en';
  return (
    <section className="section">
      <div className="section-inner">
        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{isEn ? 'Ready to become a partner?' : 'Klaar om partner te worden?'}</h2>
            <p className={styles.ctaDescription}>
              {isEn ? 'Sign up today and start receiving leads within a week.' : 'Meld je vandaag nog aan en begin binnen een week met het ontvangen van kiesbrieven.'}
            </p>
            <div className={styles.formContainer}>
              <NewLeadForm
                translations={{
                  ...translations,
                  form_title: isEn ? 'Partner registration' : 'Partner aanmelding',
                  form_subtitle: isEn ? 'Leave your details and we will contact you within 24 hours.' : 'Laat je gegevens achter en we nemen binnen 24 uur contact op.'
                }}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}