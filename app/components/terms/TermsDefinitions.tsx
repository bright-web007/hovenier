import styles from '../../styles/Terms.module.css';

export default function TermsDefinitions() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>1. Definities</h2>
      <ul className={styles.legalList}>
        <li><strong>Hovenier.frl:</strong> Het platform beheerd door Hovenier.frl, geregistreerd in Nederland</li>
        <li><strong>Gebruiker:</strong> Iedere natuurlijke of rechtspersoon die gebruik maakt van onze diensten</li>
        <li><strong>Dienstverlener:</strong> Hoveniers aangesloten bij ons platform</li>
        <li><strong>Platform:</strong> De website en bijbehorende diensten van Hovenier.frl</li>
      </ul>
    </section>
  );
}