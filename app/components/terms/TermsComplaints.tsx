import styles from '../../styles/Terms.module.css';

export default function TermsComplaints({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '9. Complaints and Disputes' : '9. Klachten en Geschillen'}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{isEn ? '9.1 Complaints procedure' : '9.1 Klachtenprocedure'}</h3>
      <p className={styles.legalText}>
        {isEn
          ? 'Complaints about our services can be submitted via info@hovenier.frl. We aim to handle all complaints within 14 days.'
          : 'Klachten over onze dienstverlening kunnen worden ingediend via info@hovenier.frl. Wij streven ernaar alle klachten binnen 14 dagen te behandelen.'}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{isEn ? '9.2 Disputes between users' : '9.2 Geschillen tussen gebruikers'}</h3>
      <p className={styles.legalText}>
        {isEn
          ? 'Disputes between customers and gardeners are resolved by the parties themselves. Hovenier.frl may mediate but is not obligated to do so.'
          : 'Geschillen tussen klanten en hoveniers worden door partijen zelf opgelost. Hovenier.frl kan bemiddelen maar is niet verplicht dit te doen.'}
      </p>
    </section>
  );
}