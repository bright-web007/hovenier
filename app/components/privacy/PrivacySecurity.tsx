import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacySecurity = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('privacy_page.security_title')}</h2>
      <p className={styles.legalText}>
        {t('privacy_page.security_intro')}
      </p>
      <ul className={styles.legalList}>
        <li>{t('privacy_page.security_unauthorized')}</li>
        <li>{t('privacy_page.security_loss')}</li>
        <li>{t('privacy_page.security_unlawful')}</li>
        <li>{t('privacy_page.security_accidental')}</li>
      </ul>
    </section>
  );
};

export default PrivacySecurity;