import styles from '../../styles/Terms.module.css';
import { createTranslator } from '@/i18n';

export default function TermsApplicability({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('terms_extra.applicability_title')}</h2>
      <p className={styles.legalText}>
        {t('terms_extra.applicability_text_1')}
      </p>
      <p className={styles.legalText}>
        {t('terms_extra.applicability_text_2')}
      </p>
    </section>
  );
}