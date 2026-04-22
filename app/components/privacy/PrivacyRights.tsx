import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyRights = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);

  const rights = [
    { title: t('privacy_page.rights_access_title'), description: t('privacy_page.rights_access_desc') },
    { title: t('privacy_page.rights_rectification_title'), description: t('privacy_page.rights_rectification_desc') },
    { title: t('privacy_page.rights_erasure_title'), description: t('privacy_page.rights_erasure_desc') },
    { title: t('privacy_page.rights_restriction_title'), description: t('privacy_page.rights_restriction_desc') },
    { title: t('privacy_page.rights_portability_title'), description: t('privacy_page.rights_portability_desc') },
    { title: t('privacy_page.rights_objection_title'), description: t('privacy_page.rights_objection_desc') }
  ];

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('privacy_page.rights_title')}</h2>
      <p className={styles.legalText}>
        {t('privacy_page.rights_intro')}
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
        {t('privacy_page.rights_contact')}
      </p>
    </section>
  );
};

export default PrivacyRights;