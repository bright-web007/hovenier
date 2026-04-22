import styles from '../../styles/Terms.module.css';
import { createTranslator } from '@/i18n';

export default function TermsUsage({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('terms.usage_title')}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{t('terms.usage_permitted_title')}</h3>
      <ul className={styles.legalList}>
        <li>{t('terms.usage_permitted_1')}</li>
        <li>{t('terms.usage_permitted_2')}</li>
        <li>{t('terms.usage_permitted_3')}</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>{t('terms.usage_prohibited_title')}</h3>
      <ul className={styles.legalList}>
        <li>{t('terms.usage_prohibited_1')}</li>
        <li>{t('terms.usage_prohibited_2')}</li>
        <li>{t('terms.usage_prohibited_3')}</li>
        <li>{t('terms.usage_prohibited_4')}</li>
      </ul>
    </section>
  );
}