import styles from '../../styles/Terms.module.css';

export default function TermsUsage({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '4. Use of the Platform' : '4. Gebruik van het Platform'}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{isEn ? '4.1 Permitted use' : '4.1 Toegestaan gebruik'}</h3>
      <ul className={styles.legalList}>
        <li>{isEn ? 'The platform may only be used for finding gardeners' : 'Het platform mag alleen gebruikt worden voor het vinden van hoveniers'}</li>
        <li>{isEn ? 'All information provided must be accurate and complete' : 'Alle verstrekte informatie moet juist en volledig zijn'}</li>
        <li>{isEn ? 'You may not act in violation of the law or public morals' : 'U mag niet handelen in strijd met de wet of goede zeden'}</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>{isEn ? '4.2 Prohibited use' : '4.2 Verboden gebruik'}</h3>
      <ul className={styles.legalList}>
        <li>{isEn ? 'Sending spam or unsolicited messages' : 'Het versturen van spam of ongewenste berichten'}</li>
        <li>{isEn ? 'Using automated systems without permission' : 'Het gebruik van geautomatiseerde systemen zonder toestemming'}</li>
        <li>{isEn ? 'Providing false or misleading information' : 'Het verstrekken van valse of misleidende informatie'}</li>
        <li>{isEn ? 'Activities that may disrupt the operation of the platform' : 'Activiteiten die de werking van het platform kunnen verstoren'}</li>
      </ul>
    </section>
  );
}