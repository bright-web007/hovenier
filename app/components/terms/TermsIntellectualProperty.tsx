import styles from '../../styles/Terms.module.css';
import { createTranslator } from '@/i18n';

export default function TermsIntellectualProperty({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('terms.ip_title')}</h2>
      <p className={styles.legalText}>
        {t('terms.ip_text')}
      </p>
    </section>
  );
}