import styles from '../../styles/Privacy.module.css';

const PrivacyDataUsage = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '4. What do we use your data for?' : '4. Waarvoor gebruiken wij uw gegevens?'}</h2>
      <ul className={styles.legalList}>
        <li>{isEn ? 'Matching customers with suitable gardeners' : 'Het koppelen van klanten aan geschikte hoveniers'}</li>
        <li>{isEn ? 'Sending quotes and communication' : 'Het versturen van offertes en communicatie'}</li>
        <li>{isEn ? 'Improving our services' : 'Het verbeteren van onze dienstverlening'}</li>
        <li>{isEn ? 'Complying with legal obligations' : 'Het naleven van wettelijke verplichtingen'}</li>
        <li>{isEn ? 'Sending newsletters (with consent)' : 'Het verzenden van nieuwsbrieven (met toestemming)'}</li>
      </ul>
    </section>
  );
};

export default PrivacyDataUsage;