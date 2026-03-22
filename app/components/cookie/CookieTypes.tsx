import styles from '../../styles/Cookie.module.css';

export default function CookieTypes() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>4. Welke cookies gebruiken wij?</h2>
      <p className={styles.legalText}>
        Wij gebruiken verschillende soorten cookies op onze website. Hieronder vindt u een 
        overzicht van alle cookiecategorieën en de specifieke cookies die wij plaatsen:
      </p>

      <h3 className={styles.legalSubsectionTitle}>4.1 Noodzakelijke cookies</h3>
      <p className={styles.legalText}>
        Deze cookies zijn essentieel voor de werking van onze website en kunnen niet worden 
        uitgeschakeld zonder dat de functionaliteit van de site wordt aangetast. Ze worden 
        meestal alleen geplaatst naar aanleiding van acties die u onderneemt.
      </p>
      <div className={styles.legalContact}>
        <strong>_session</strong><br />
        Doel: Sessie beheer en gebruikersidentificatie<br />
        Bewaartijd: Tot einde van de browsersessie<br />
        Type: Eerste partij cookie
      </div>
      <div className={styles.legalContact}>
        <strong>csrf_token</strong><br />
        Doel: Beveiliging tegen Cross-Site Request Forgery aanvallen<br />
        Bewaartijd: 24 uur<br />
        Type: Eerste partij cookie
      </div>
      <div className={styles.legalContact}>
        <strong>cookie_consent</strong><br />
        Doel: Opslaan van uw cookievoorkeuren<br />
        Bewaartijd: 1 jaar<br />
        Type: Eerste partij cookie
      </div>

      <h3 className={styles.legalSubsectionTitle}>4.2 Analytische cookies</h3>
      <p className={styles.legalText}>
        Deze cookies helpen ons begrijpen hoe bezoekers onze website gebruiken door 
        informatie te verzamelen over pagina's die worden bezocht, foutmeldingen, 
        en andere website-interacties. Alle gegevens worden geanonimiseerd verzameld.
      </p>
      <div className={styles.legalContact}>
        <strong>_ga, _ga_*</strong><br />
        Doel: Google Analytics tracking voor verkeersmeting en gebruikersgedrag<br />
        Bewaartijd: 2 jaar<br />
        Type: Derde partij cookie (Google LLC)
      </div>
      <div className={styles.legalContact}>
        <strong>_gid</strong><br />
        Doel: Onderscheid maken tussen verschillende website gebruikers<br />
        Bewaartijd: 24 uur<br />
        Type: Derde partij cookie (Google LLC)
      </div>
      <div className={styles.legalContact}>
        <strong>_gat</strong><br />
        Doel: Beperken van het aantal verzoeken aan Google Analytics<br />
        Bewaartijd: 1 minuut<br />
        Type: Derde partij cookie (Google LLC)
      </div>

      <h3 className={styles.legalSubsectionTitle}>4.3 Functionele cookies</h3>
      <p className={styles.legalText}>
        Deze cookies maken extra functionaliteiten mogelijk en zorgen voor een 
        gepersonaliseerde ervaring. Ze onthouden uw keuzes en voorkeuren.
      </p>
      <div className={styles.legalContact}>
        <strong>lang_preference</strong><br />
        Doel: Bewaren van uw taalvoorkeur (Nederlands/Engels)<br />
        Bewaartijd: 1 jaar<br />
        Type: Eerste partij cookie
      </div>
      <div className={styles.legalContact}>
        <strong>region_preference</strong><br />
        Doel: Onthouden van uw locatievoorkeuren voor relevante hoveniers<br />
        Bewaartijd: 6 maanden<br />
        Type: Eerste partij cookie
      </div>

      <h3 className={styles.legalSubsectionTitle}>4.4 Marketing cookies</h3>
      <p className={styles.legalText}>
        Deze cookies worden gebruikt voor het tonen van relevante advertenties en 
        het meten van advertentie-effectiviteit. Voor deze cookies vragen wij uw 
        uitdrukkelijke toestemming.
      </p>
      <div className={styles.legalContact}>
        <strong>_fbp, _fbc</strong><br />
        Doel: Facebook Pixel tracking voor advertentiedoeleinden<br />
        Bewaartijd: 90 dagen<br />
        Type: Derde partij cookie (Meta Platforms)
      </div>
      <div className={styles.legalContact}>
        <strong>ads_conversion</strong><br />
        Doel: Meten van advertentieconversies en ROI<br />
        Bewaartijd: 30 dagen<br />
        Type: Eerste partij cookie
      </div>
    </section>
  );
}