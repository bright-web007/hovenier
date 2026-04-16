import styles from '../../styles/Terms.module.css';

export default function TermsRegistration({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '5. Registration and Account' : '5. Registratie en Account'}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{isEn ? '5.1 For Customers' : '5.1 Voor Klanten'}</h3>
      <p className={styles.legalText}>
        {isEn
          ? 'Customers can use the basic functionalities of the platform without registration.'
          : 'Klanten kunnen zonder registratie gebruik maken van de basisfunctionaliteiten van het platform.'}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{isEn ? '5.2 For Gardeners' : '5.2 Voor Hoveniers'}</h3>
      <p className={styles.legalText}>
        {isEn
          ? 'Gardeners who wish to join the platform go through a screening process in which certificates, insurance, and references are verified.'
          : 'Hoveniers die zich willen aansluiten bij het platform doorlopen een screening proces waarbij certificaten, verzekeringen en referenties worden gecontroleerd.'}
      </p>
    </section>
  );
}