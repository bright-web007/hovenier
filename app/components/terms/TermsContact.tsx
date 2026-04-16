import styles from '../../styles/Terms.module.css';

export default function TermsContact({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <div className={styles.contactHighlight}>
        <h3>13. Contact</h3>
        <p>
          {isEn
            ? 'Do you have questions about these terms and conditions? Feel free to contact us.'
            : 'Heeft u vragen over deze algemene voorwaarden? Neem gerust contact met ons op.'}
        </p>
        
        <address>
          <strong>Hovenier.frl</strong><br />
          {isEn ? 'Email' : 'E-mail'}: <a href="mailto:info@hovenier.frl">info@hovenier.frl</a><br />
          Website: <a href="https://hovenier.frl">https://hovenier.frl</a>
        </address>
        
        <p>
          {isEn
            ? 'We aim to respond to your questions within 2 business days.'
            : 'Wij streven ernaar binnen 2 werkdagen te reageren op uw vragen.'}
        </p>
      </div>
    </section>
  );
}