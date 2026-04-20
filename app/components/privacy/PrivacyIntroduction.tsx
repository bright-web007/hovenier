import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyIntroduction = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('privacy_page_extra.intro_title')}</h2>
      <p className={styles.privacyIntroText}>
        {t('privacy_page_extra.intro_quote')}
      </p>
      <p className={styles.legalText}>
        {t('privacy_page_extra.intro_text')}
      </p>
    </section>
  );
};

export default PrivacyIntroduction;