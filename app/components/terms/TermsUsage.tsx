import styles from '../../styles/Terms.module.css';

export default function TermsUsage() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>4. Gebruik van het Platform</h2>
      
      <h3 className={styles.legalSubsectionTitle}>4.1 Toegestaan gebruik</h3>
      <ul className={styles.legalList}>
        <li>Het platform mag alleen gebruikt worden voor het vinden van hoveniers</li>
        <li>Alle verstrekte informatie moet juist en volledig zijn</li>
        <li>U mag niet handelen in strijd met de wet of goede zeden</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>4.2 Verboden gebruik</h3>
      <ul className={styles.legalList}>
        <li>Het versturen van spam of ongewenste berichten</li>
        <li>Het gebruik van geautomatiseerde systemen zonder toestemming</li>
        <li>Het verstrekken van valse of misleidende informatie</li>
        <li>Activiteiten die de werking van het platform kunnen verstoren</li>
      </ul>
    </section>
  );
}