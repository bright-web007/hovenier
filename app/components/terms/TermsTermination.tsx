import styles from '../../styles/Terms.module.css';
import { createTranslator } from '@/i18n';

export default function TermsTermination({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('terms.termination_title')}</h2>
      <p className={styles.legalText}>
        {t('terms.termination_text_1')}
      </p>
      <p className={styles.legalText}>
        {t('terms.termination_text_2')}
      </p>
    </section>
  );
}