import styles from '../../styles/Terms.module.css';

export default function TermsLaw() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>12. Toepasselijk Recht</h2>
      <p className={styles.legalText}>
        Op deze algemene voorwaarden en alle overeenkomsten met Hovenier.frl is Nederlands recht 
        van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.
      </p>
      <p className={styles.legalText}>
        Deze voorwaarden zijn opgesteld in het Nederlands. Bij verschillen tussen vertalingen 
        prevaleert de Nederlandse tekst.
      </p>
    </section>
  );
}