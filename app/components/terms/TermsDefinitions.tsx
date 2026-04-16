import styles from '../../styles/Terms.module.css';

export default function TermsDefinitions({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '1. Definitions' : '1. Definities'}</h2>
      <ul className={styles.legalList}>
        <li><strong>Hovenier.frl:</strong> {isEn ? 'The platform managed by Hovenier.frl, registered in the Netherlands' : 'Het platform beheerd door Hovenier.frl, geregistreerd in Nederland'}</li>
        <li><strong>{isEn ? 'User' : 'Gebruiker'}:</strong> {isEn ? 'Any natural or legal person who uses our services' : 'Iedere natuurlijke of rechtspersoon die gebruik maakt van onze diensten'}</li>
        <li><strong>{isEn ? 'Service Provider' : 'Dienstverlener'}:</strong> {isEn ? 'Gardeners affiliated with our platform' : 'Hoveniers aangesloten bij ons platform'}</li>
        <li><strong>{isEn ? 'Platform' : 'Platform'}:</strong> {isEn ? 'The website and associated services of Hovenier.frl' : 'De website en bijbehorende diensten van Hovenier.frl'}</li>
      </ul>
    </section>
  );
}