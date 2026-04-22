import styles from '../../styles/Terms.module.css';
import { createTranslator } from '@/i18n';

export default function TermsHero({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

  return (
    <header className={styles.legalHeader}>
      <div className="section-inner">
        <div className={styles.legalContent}>
          <h1 className={styles.legalTitle}>{t('terms.hero_title')}</h1>
          <p className={styles.legalSubtitle}>
            {t('terms.hero_subtitle')}
          </p>
          <p className={styles.legalSubtitle}>
            {t('terms.hero_last_updated')}
            {new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'nl-NL', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </header>
  );
}