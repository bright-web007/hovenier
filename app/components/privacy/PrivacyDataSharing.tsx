import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyDataSharing = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('privacy_page.data_sharing_title')}</h2>
      <p className={styles.legalText}>
        {t('privacy_page.data_sharing_intro')}
      </p>
      <ul className={styles.legalList}>
        <li>{t('privacy_page.data_sharing_gardeners')}</li>
        <li>{t('privacy_page.data_sharing_technical')}</li>
        <li>{t('privacy_page.data_sharing_authorities')}</li>
      </ul>
      <p className={styles.legalText}>
        {t('privacy_page.data_sharing_no_sell')}
      </p>
    </section>
  );
};

export default PrivacyDataSharing;