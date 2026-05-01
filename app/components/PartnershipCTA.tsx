
import type { ComponentProps } from 'react'
import { createTranslator } from '@/i18n'
import NewLeadForm from './NewLeadForm'
import styles from './Partnership.module.css'

interface PartnershipCTAProps {
  translations: ComponentProps<typeof NewLeadForm>['translations']
  locale: string
}

export default function PartnershipCTA({ translations, locale }: PartnershipCTAProps) {
  const t = createTranslator(locale);
  return (
    <section className="section">
      <div className="section-inner">
        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{t('partnership.cta_title')}</h2>
            <p className={styles.ctaDescription}>
              {t('partnership.cta_subtitle')}
            </p>
            <div className={styles.formContainer}>
              <NewLeadForm
                translations={{
                  ...translations,
                  form_title: t('partnership.cta_form_title'),
                  form_subtitle: t('partnership.cta_form_subtitle')
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