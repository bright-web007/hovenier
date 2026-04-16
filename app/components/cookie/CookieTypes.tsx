import styles from '../../styles/Cookie.module.css';

interface CookieTypesProps {
  translations: Record<string, string>;
}

export default function CookieTypes({ translations }: CookieTypesProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.types_title}</h2>
      <p className={styles.legalText}>
        {translations.types_text}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{translations.types_necessary_title}</h3>
      <p className={styles.legalText}>
        {translations.types_necessary_text}
      </p>
      <div className={styles.legalContact}>
        <strong>{translations.types_session_name}</strong><br />
        {translations.types_session_purpose}<br />
        {translations.types_session_duration}<br />
        {translations.types_session_type}
      </div>
      <div className={styles.legalContact}>
        <strong>{translations.types_csrf_name}</strong><br />
        {translations.types_csrf_purpose}<br />
        {translations.types_csrf_duration}<br />
        {translations.types_csrf_type}
      </div>
      <div className={styles.legalContact}>
        <strong>{translations.types_consent_name}</strong><br />
        {translations.types_consent_purpose}<br />
        {translations.types_consent_duration}<br />
        {translations.types_consent_type}
      </div>

      <h3 className={styles.legalSubsectionTitle}>{translations.types_analytical_title}</h3>
      <p className={styles.legalText}>
        {translations.types_analytical_text}
      </p>
      <div className={styles.legalContact}>
        <strong>{translations.types_ga_name}</strong><br />
        {translations.types_ga_purpose}<br />
        {translations.types_ga_duration}<br />
        {translations.types_ga_type}
      </div>
      <div className={styles.legalContact}>
        <strong>{translations.types_gid_name}</strong><br />
        {translations.types_gid_purpose}<br />
        {translations.types_gid_duration}<br />
        {translations.types_gid_type}
      </div>
      <div className={styles.legalContact}>
        <strong>{translations.types_gat_name}</strong><br />
        {translations.types_gat_purpose}<br />
        {translations.types_gat_duration}<br />
        {translations.types_gat_type}
      </div>

      <h3 className={styles.legalSubsectionTitle}>{translations.types_functional_title}</h3>
      <p className={styles.legalText}>
        {translations.types_functional_text}
      </p>
      <div className={styles.legalContact}>
        <strong>{translations.types_lang_name}</strong><br />
        {translations.types_lang_purpose}<br />
        {translations.types_lang_duration}<br />
        {translations.types_lang_type}
      </div>
      <div className={styles.legalContact}>
        <strong>{translations.types_region_name}</strong><br />
        {translations.types_region_purpose}<br />
        {translations.types_region_duration}<br />
        {translations.types_region_type}
      </div>

      <h3 className={styles.legalSubsectionTitle}>{translations.types_marketing_title}</h3>
      <p className={styles.legalText}>
        {translations.types_marketing_text}
      </p>
      <div className={styles.legalContact}>
        <strong>{translations.types_fb_name}</strong><br />
        {translations.types_fb_purpose}<br />
        {translations.types_fb_duration}<br />
        {translations.types_fb_type}
      </div>
      <div className={styles.legalContact}>
        <strong>{translations.types_ads_name}</strong><br />
        {translations.types_ads_purpose}<br />
        {translations.types_ads_duration}<br />
        {translations.types_ads_type}
      </div>
    </section>
  );
}