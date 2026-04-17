import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyComplaints = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('privacy_page.complaints_title')}</h2>
      <p className={styles.legalText}>
        {t('privacy_page.complaints_text')}
      </p>
    </section>
  );
};

export default PrivacyComplaints;