import styles from '../../styles/Cookie.module.css';

interface CookieUsageProps {
  translations: Record<string, string>;
}

export default function CookieUsage({ translations }: CookieUsageProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.usage_title}</h2>
      <p className={styles.legalText}>
        {translations.usage_text}
      </p>
      <ul className={styles.legalList}>
        <li><strong>{translations.usage_essential}</strong> {translations.usage_essential_desc}</li>
        <li><strong>{translations.usage_experience}</strong> {translations.usage_experience_desc}</li>
        <li><strong>{translations.usage_analytics}</strong> {translations.usage_analytics_desc}</li>
        <li><strong>{translations.usage_personalized}</strong> {translations.usage_personalized_desc}</li>
        <li><strong>{translations.usage_marketing}</strong> {translations.usage_marketing_desc}</li>
        <li><strong>{translations.usage_social}</strong> {translations.usage_social_desc}</li>
        <li><strong>{translations.usage_performance}</strong> {translations.usage_performance_desc}</li>
      </ul>
      <p className={styles.legalText}>
        {translations.usage_footer}
      </p>
    </section>
  );
}