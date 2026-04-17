import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyChanges = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('privacy_page.changes_title')}</h2>
      <p className={styles.legalText}>
        {t('privacy_page.changes_text')}
      </p>
    </section>
  );
};

export default PrivacyChanges;