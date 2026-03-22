import styles from '../../styles/Cookie.module.css';

export default function CookieDefinition() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>2. Wat zijn Cookies?</h2>
      <p className={styles.legalText}>
        Cookies zijn kleine tekstbestanden die op uw apparaat (computer, tablet, smartphone) 
        worden opgeslagen wanneer u een website bezoekt. Deze bestanden bevatten informatie 
        die door de website kan worden gelezen bij een volgend bezoek.
      </p>
      <p className={styles.legalText}>
        Cookies kunnen door de websiteeigenaar zelf worden geplaatst (eerste partij cookies) 
        of door externe partijen zoals adverteerders of analysetools (derde partij cookies). 
        Ze kunnen tijdelijk zijn (sessiecookies) die worden verwijderd wanneer u uw browser sluit, 
        of permanent (persistente cookies) die voor een bepaalde periode op uw apparaat blijven.
      </p>
      <p className={styles.legalText}>
        Naast cookies gebruiken wij ook vergelijkbare technologieën zoals web beacons, pixels, 
        en lokale opslag om informatie te verzamelen over hoe u onze website gebruikt.
      </p>
    </section>
  );
}