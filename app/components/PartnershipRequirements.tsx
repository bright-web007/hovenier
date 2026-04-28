
import { createTranslator } from '@/i18n'
import styles from './Partnership.module.css'

interface PartnershipRequirementsProps {
  requirements: string[]
  locale?: string
}

export default function PartnershipRequirements({ requirements, locale = 'nl' }: PartnershipRequirementsProps) {
  const t = createTranslator(locale);
  return (
    <section className="section section-alt">
      <div className="section-inner">
        <div className={styles.requirements}>
          <h2 className={styles.requirementsTitle}>{t('partnership.requirements_title')}</h2>
          <p className={styles.requirementsDescription}>
            {t('partnership.requirements_subtitle')}
          </p>
          
          <div className={styles.requirementsList}>
            {requirements.map((requirement, index) => (
              <div key={index} className={styles.requirementItem}>
                <div className={styles.requirementIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={styles.requirementText}>{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}