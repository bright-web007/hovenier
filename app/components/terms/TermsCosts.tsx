import styles from '../../styles/Terms.module.css';

export default function TermsCosts() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>8. Kosten en Betalingen</h2>
      
      <h3 className={styles.legalSubsectionTitle}>8.1 Voor Klanten</h3>
      <p className={styles.legalText}>
        Het gebruik van het platform is voor klanten kosteloos. Alle kosten voor uitgevoerde 
        werkzaamheden worden direct tussen klant en hovenier afgehandeld.
      </p>

      <h3 className={styles.legalSubsectionTitle}>8.2 Voor Hoveniers</h3>
      <p className={styles.legalText}>
        Hoveniers betalen geen kosten voor deelname aan het platform. Er worden geen commissies 
        gerekend over verkregen opdrachten.
      </p>
    </section>
  );
}