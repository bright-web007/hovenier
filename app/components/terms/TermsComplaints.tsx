import styles from '../../styles/Terms.module.css';
import { createTranslator } from '@/i18n';

export default function TermsComplaints({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('terms_extra.complaints_title')}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{t('terms_extra.complaints_procedure_title')}</h3>
      <p className={styles.legalText}>
        {t('terms_extra.complaints_procedure_text')}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{t('terms_extra.complaints_disputes_title')}</h3>
      <p className={styles.legalText}>
        {t('terms_extra.complaints_disputes_text')}
      </p>
    </section>
  );
}