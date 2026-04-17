import styles from '../../styles/Cookie.module.css';

interface CookieHeroProps {
  translations: Record<string, string>;
  locale: string;
}

export default function CookieHero({ translations, locale }: CookieHeroProps) {
  return (
    <header className={styles.legalHeader}>
      <div className="section-inner">
        <div className={styles.legalContent}>
          <h1 className={styles.legalTitle}>{translations.hero_title}</h1>
          <p className={styles.legalSubtitle}>
            {translations.hero_subtitle}
          </p>
          <p className={styles.legalSubtitle}>
            {translations.hero_last_updated} {new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'nl-NL', { 
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