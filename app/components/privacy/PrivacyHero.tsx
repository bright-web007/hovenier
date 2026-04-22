import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyHero = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);
  return (
    <header className={styles.legalHeader}>
      <h1 className={styles.legalTitle}>{t('privacy_page_extra.hero_title')}</h1>
      <p className={styles.legalSubtitle}>
        {t('privacy_page_extra.hero_last_updated')}{new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'nl-NL', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
    </header>
  );
};

export default PrivacyHero;