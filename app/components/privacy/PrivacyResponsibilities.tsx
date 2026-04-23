import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyResponsibilities = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('privacy_page.responsibilities_title')}</h2>
      <p className={styles.legalText}>
        {t('privacy_page.responsibilities_text')}
      </p>
      <address className={styles.legalContact}>
        <strong>Hovenier.frl</strong><br />
        E-mail: privacy@hovenier.frl
      </address>
    </section>
  );
};

export default PrivacyResponsibilities;