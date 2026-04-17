import styles from '../../styles/Privacy.module.css';

const PrivacyRights = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';

  const rights = isEn ? [
    { title: "Right of access", description: "Request what data we hold about you" },
    { title: "Rectification", description: "Correction of inaccurate data" },
    { title: "Erasure", description: "The right to be forgotten" },
    { title: "Restriction", description: "Restriction of processing" },
    { title: "Portability", description: "Transfer of data to another service provider" },
    { title: "Objection", description: "Object to processing" }
  ] : [
    { title: "Inzagerecht", description: "Opvragen welke gegevens wij van u hebben" },
    { title: "Rectificatie", description: "Correctie van onjuiste gegevens" },
    { title: "Verwijdering", description: "Het recht om vergeten te worden" },
    { title: "Beperking", description: "Beperking van de verwerking" },
    { title: "Overdraagbaarheid", description: "Overzetten van gegevens naar andere dienstverlener" },
    { title: "Bezwaar", description: "Bezwaar maken tegen verwerking" }
  ];

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '9. Your rights' : '9. Uw rechten'}</h2>
      <p className={styles.legalText}>
        {isEn ? 'You have the following rights regarding your personal data:' : 'U heeft de volgende rechten betreffende uw persoonlijke gegevens:'}
      </p>
      
      <div className={styles.rightsGrid}>
        {rights.map((right, index) => (
          <div key={index} className={styles.rightCard}>
            <h3 className={styles.rightTitle}>{right.title}</h3>
            <p className={styles.rightDescription}>{right.description}</p>
          </div>
        ))}
      </div>
      
      <p className={styles.legalText}>
        {isEn ? 'To exercise your rights, please contact us at privacy@hovenier.frl' : 'Voor het uitoefenen van uw rechten kunt u contact met ons opnemen via privacy@hovenier.frl'}
      </p>
    </section>
  );
};

export default PrivacyRights;