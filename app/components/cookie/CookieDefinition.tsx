import styles from '../../styles/Cookie.module.css';

interface CookieDefinitionProps {
  translations: Record<string, string>;
}

export default function CookieDefinition({ translations }: CookieDefinitionProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.definition_title}</h2>
      <p className={styles.legalText}>
        {translations.definition_text_1}
      </p>
      <p className={styles.legalText}>
        {translations.definition_text_2}
      </p>
      <p className={styles.legalText}>
        {translations.definition_text_3}
      </p>
    </section>
  );
}