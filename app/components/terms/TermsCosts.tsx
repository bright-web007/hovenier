import styles from '../../styles/Terms.module.css';
import { createTranslator } from '@/i18n';

export default function TermsCosts({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('terms_extra.costs_title')}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{t('terms_extra.costs_customers_title')}</h3>
      <p className={styles.legalText}>
        {t('terms_extra.costs_customers_text')}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{t('terms_extra.costs_gardeners_title')}</h3>
      <p className={styles.legalText}>
        {t('terms_extra.costs_gardeners_text')}
      </p>
    </section>
  );
}