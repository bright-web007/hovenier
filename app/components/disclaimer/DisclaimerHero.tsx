import styles from '../../styles/Disclaimer.module.css';

interface DisclaimerHeroProps {
  translations: Record<string, string>;
}

export default function DisclaimerHero({ translations }: DisclaimerHeroProps) {
  return (
    <header className={styles.legalHeader}>
      <div className="section-inner">
        <div className={styles.legalContent}>
          <h1 className={styles.legalTitle}>{translations.hero_title}</h1>
          <p className={styles.legalSubtitle}>
            {translations.hero_subtitle}
          </p>
          <p className={styles.legalSubtitle}>
            {translations.hero_last_updated}
          </p>
        </div>
      </div>
    </header>
  );
}