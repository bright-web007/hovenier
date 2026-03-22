import styles from '../../styles/Privacy.module.css';

const PrivacyRights = () => {
  const rights = [
    {
      title: "Inzagerecht",
      description: "Opvragen welke gegevens wij van u hebben"
    },
    {
      title: "Rectificatie", 
      description: "Correctie van onjuiste gegevens"
    },
    {
      title: "Verwijdering",
      description: "Het recht om vergeten te worden"
    },
    {
      title: "Beperking",
      description: "Beperking van de verwerking"
    },
    {
      title: "Overdraagbaarheid",
      description: "Overzetten van gegevens naar andere dienstverlener"
    },
    {
      title: "Bezwaar",
      description: "Bezwaar maken tegen verwerking"
    }
  ];

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>9. Uw rechten</h2>
      <p className={styles.legalText}>
        U heeft de volgende rechten betreffende uw persoonlijke gegevens:
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
        Voor het uitoefenen van uw rechten kunt u contact met ons opnemen via privacy@hovenier.frl
      </p>
    </section>
  );
};

export default PrivacyRights;