import styles from '../../styles/Disclaimer.module.css';

export default function DisclaimerUsage() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>4. Aanbevelingen voor Gebruik</h2>
      
      <div className={styles.warningBox}>
        <h3 className={styles.warningTitle}>
          💡 Belangrijk Advies
        </h3>
        <p className={styles.warningText}>
          Wij raden u sterk aan om altijd zelf onderzoek te doen naar hoveniers voordat 
          u een overeenkomst aangaat.
        </p>
      </div>

      <h3 className={styles.legalSubsectionTitle}>4.1 Due Diligence</h3>
      <p className={styles.legalText}>
        Voordat u een hovenier inhuurt, adviseren wij u om:
      </p>
      
      <ul className={styles.legalList}>
        <li>Meerdere offertes op te vragen en te vergelijken</li>
        <li>Referenties en eerdere werken te controleren</li>
        <li>Verzekeringen en vergunningen te verifiëren</li>
        <li>Duidelijke afspraken te maken over werkzaamheden en kosten</li>
        <li>Contractvoorwaarden zorgvuldig door te lezen</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>4.2 Eigen Verantwoordelijkheid</h3>
      <p className={styles.legalText}>
        Als gebruiker van ons platform bent u zelf verantwoordelijk voor:
      </p>
      
      <ul className={styles.legalList}>
        <li>Het selecteren van geschikte hoveniers voor uw project</li>
        <li>Het onderhandelen over prijzen en voorwaarden</li>
        <li>Het controleren van kwaliteit tijdens en na uitvoering</li>
        <li>Het afhandelen van eventuele geschillen met hoveniers</li>
      </ul>
    </section>
  );
}