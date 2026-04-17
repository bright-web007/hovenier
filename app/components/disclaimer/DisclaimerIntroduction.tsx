import styles from '../../styles/Disclaimer.module.css';

interface DisclaimerIntroductionProps {
  translations: Record<string, string>;
}

export default function DisclaimerIntroduction({ translations }: DisclaimerIntroductionProps) {
  return (
    <section className={styles.legalSection}>
      <p className={styles.legalText}>
        {translations.intro_text_1}
      </p>
      <p className={styles.legalText}>
        {translations.intro_text_2}
      </p>
    </section>
  );
}