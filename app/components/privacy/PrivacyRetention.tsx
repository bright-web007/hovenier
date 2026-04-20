import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyRetention = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('privacy_page.retention_title')}</h2>
      <ul className={styles.legalList}>
        <li><strong>{t('privacy_page.retention_contact_label')}</strong> {t('privacy_page.retention_contact_value')}</li>
        <li><strong>{t('privacy_page.retention_newsletter_label')}</strong> {t('privacy_page.retention_newsletter_value')}</li>
        <li><strong>{t('privacy_page.retention_analytics_label')}</strong> {t('privacy_page.retention_analytics_value')}</li>
        <li><strong>{t('privacy_page.retention_admin_label')}</strong> {t('privacy_page.retention_admin_value')}</li>
      </ul>
    </section>
  );
};

export default PrivacyRetention;