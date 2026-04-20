import styles from '../../styles/Terms.module.css';
import { createTranslator } from '@/i18n';

export default function TermsLiability({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('terms.liability_title')}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{t('terms.liability_limited_title')}</h3>
      <p className={styles.legalText}>
        {t('terms.liability_limited_text')}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{t('terms.liability_excluded_title')}</h3>
      <p className={styles.legalText}>
        {t('terms.liability_excluded_intro')}
      </p>
      <ul className={styles.list}>
        <li>{t('terms.liability_excluded_1')}</li>
        <li>{t('terms.liability_excluded_2')}</li>
        <li>{t('terms.liability_excluded_3')}</li>
        <li>{t('terms.liability_excluded_4')}</li>
      </ul>
    </section>
  );
}