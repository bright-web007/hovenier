import styles from '../../styles/Terms.module.css';

export default function TermsApplicability({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '2. Applicability' : '2. Toepasselijkheid'}</h2>
      <p className={styles.legalText}>
        {isEn
          ? 'These terms and conditions apply to all services offered by Hovenier.frl and to all agreements between Hovenier.frl and users of the platform.'
          : 'Deze algemene voorwaarden zijn van toepassing op alle diensten aangeboden door Hovenier.frl en op alle overeenkomsten tussen Hovenier.frl en gebruikers van het platform.'}
      </p>
      <p className={styles.legalText}>
        {isEn
          ? 'By using our website and services, you agree to these terms.'
          : 'Door gebruik te maken van onze website en diensten, gaat u akkoord met deze voorwaarden.'}
      </p>
    </section>
  );
}