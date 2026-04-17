import styles from '../../styles/Cookie.module.css';

interface CookieManagementProps {
  translations: Record<string, string>;
}

export default function CookieManagement({ translations }: CookieManagementProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.management_title}</h2>
      <p className={styles.legalText}>
        {translations.management_text}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{translations.management_center_title}</h3>
      <p className={styles.legalText}>
        {translations.management_center_text}
      </p>
      <ul className={styles.legalList}>
        <li>{translations.management_center_banner}</li>
        <li>{translations.management_center_footer}</li>
        <li>{translations.management_center_email} <a href="mailto:privacy@hovenier.frl" className={styles.legalLink}>privacy@hovenier.frl</a></li>
      </ul>
      <p className={styles.legalText}>
        {translations.management_center_note}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{translations.management_browser_title}</h3>
      <p className={styles.legalText}>
        {translations.management_browser_text}
      </p>
      <ul className={styles.legalList}>
        <li><a href="https://support.google.com/chrome/answer/95647" className={styles.legalLink} target="_blank" rel="noopener noreferrer">{translations.management_chrome}</a> - {translations.management_chrome_desc}</li>
        <li><a href="https://support.mozilla.org/nl/kb/cookies-informatie-websites" className={styles.legalLink} target="_blank" rel="noopener noreferrer">{translations.management_firefox}</a> - {translations.management_firefox_desc}</li>
        <li><a href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-in-microsoft-edge-verwijderen" className={styles.legalLink} target="_blank" rel="noopener noreferrer">{translations.management_edge}</a> - {translations.management_edge_desc}</li>
        <li><a href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac" className={styles.legalLink} target="_blank" rel="noopener noreferrer">{translations.management_safari}</a> - {translations.management_safari_desc}</li>
      </ul>
      <p className={styles.legalText}>
        {translations.management_browser_note}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{translations.management_optout_title}</h3>
      <p className={styles.legalText}>
        {translations.management_optout_text}
      </p>
      <ul className={styles.legalList}>
        <li><a href="https://tools.google.com/dlpage/gaoptout" className={styles.legalLink} target="_blank" rel="noopener noreferrer">{translations.management_optout_ga}</a></li>
        <li><a href="https://www.facebook.com/ads/preferences" className={styles.legalLink} target="_blank" rel="noopener noreferrer">{translations.management_optout_fb}</a></li>
        <li><a href="https://optout.aboutads.info" className={styles.legalLink} target="_blank" rel="noopener noreferrer">{translations.management_optout_daa}</a></li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>{translations.management_consequences_title}</h3>
      <p className={styles.legalText}>
        {translations.management_consequences_text}
      </p>
      <ul className={styles.legalList}>
        <li><strong>{translations.management_consequences_necessary}</strong> {translations.management_consequences_necessary_desc}</li>
        <li><strong>{translations.management_consequences_functional}</strong> {translations.management_consequences_functional_desc}</li>
        <li><strong>{translations.management_consequences_analytical}</strong> {translations.management_consequences_analytical_desc}</li>
        <li><strong>{translations.management_consequences_marketing}</strong> {translations.management_consequences_marketing_desc}</li>
      </ul>
      <p className={styles.legalText}>
        {translations.management_consequences_footer}
      </p>

      <div className={styles.warningBox}>
        <p className={styles.warningText}>
          <strong>{translations.management_warning}</strong> {translations.management_warning_text}
        </p>
      </div>
    </section>
  );
}