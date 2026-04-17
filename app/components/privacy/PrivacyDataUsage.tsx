import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyDataUsage = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('privacy_page.data_usage_title')}</h2>
      <ul className={styles.legalList}>
        <li>{t('privacy_page.data_usage_matching')}</li>
        <li>{t('privacy_page.data_usage_quotes')}</li>
        <li>{t('privacy_page.data_usage_improving')}</li>
        <li>{t('privacy_page.data_usage_legal')}</li>
        <li>{t('privacy_page.data_usage_newsletters')}</li>
      </ul>
    </section>
  );
};

export default PrivacyDataUsage;