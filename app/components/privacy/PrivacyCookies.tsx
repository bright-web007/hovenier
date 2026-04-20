import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyCookies = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>10. Cookies</h2>
      <p className={styles.legalText}>
        {t('privacy_page.cookies_intro')}
      </p>
      <ul className={styles.legalList}>
        <li><strong>{t('privacy_page.cookies_necessary_label')}</strong> {t('privacy_page.cookies_necessary_value')}</li>
        <li><strong>{t('privacy_page.cookies_analytical_label')}</strong> {t('privacy_page.cookies_analytical_value')}</li>
        <li><strong>{t('privacy_page.cookies_marketing_label')}</strong> {t('privacy_page.cookies_marketing_value')}</li>
      </ul>
      <p className={styles.legalText}>
        {t('privacy_page.cookies_manage')}
      </p>
    </section>
  );
};

export default PrivacyCookies;