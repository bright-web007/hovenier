import styles from '../../styles/Cookie.module.css';

interface CookieIntroductionProps {
  translations: Record<string, string>;
}

export default function CookieIntroduction({ translations }: CookieIntroductionProps) {
  return (
    <section className={styles.legalSection}>
      <p className={styles.privacyIntroText}>
        {translations.intro_text}
      </p>
      <p className={styles.legalText}>
        {translations.intro_detail}
      </p>
    </section>
  );
}