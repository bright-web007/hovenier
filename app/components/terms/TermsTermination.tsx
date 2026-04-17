import styles from '../../styles/Terms.module.css';

export default function TermsTermination({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '10. Termination' : '10. Beëindiging'}</h2>
      <p className={styles.legalText}>
        {isEn
          ? 'Hovenier.frl reserves the right to refuse or terminate access to the platform in case of violation of these terms or misuse of the platform.'
          : 'Hovenier.frl behoudt zich het recht voor toegang tot het platform te weigeren of te beëindigen bij overtreding van deze voorwaarden of bij misbruik van het platform.'}
      </p>
      <p className={styles.legalText}>
        {isEn
          ? 'Users can terminate their account at any time by contacting our customer service.'
          : 'Gebruikers kunnen hun account op elk moment beëindigen door contact op te nemen met onze klantenservice.'}
      </p>
    </section>
  );
}