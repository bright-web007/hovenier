import styles from '../../styles/Terms.module.css';
import { createTranslator } from '@/i18n';

export default function TermsServices({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('terms.services_title')}</h2>
      
      <div className={styles.serviceFeatures}>
        <div className={styles.serviceCard}>
          <h3 className={styles.serviceTitle}>{t('terms.services_platform_title')}</h3>
          <p className={styles.serviceDescription}>
            {t('terms.services_platform_desc')}
          </p>
        </div>
        <div className={styles.serviceCard}>
          <h3 className={styles.serviceTitle}>{t('terms.services_facilitation_title')}</h3>
          <p className={styles.serviceDescription}>
            {t('terms.services_facilitation_desc')}
          </p>
        </div>
      </div>

      <h3 className={styles.legalSubsectionTitle}>{t('terms.services_31_title')}</h3>
      <p className={styles.legalText}>
        {t('terms.services_31_text')}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{t('terms.services_32_title')}</h3>
      <p className={styles.legalText}>
        {t('terms.services_32_text')}
      </p>
    </section>
  );
}