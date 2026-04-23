import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyLegalBasis = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('privacy_page.legal_basis_title')}</h2>
      <p className={styles.legalText}>
        {t('privacy_page.legal_basis_intro')}
      </p>
      <ul className={styles.legalList}>
        <li><strong>{t('privacy_page.legal_basis_contract_label')}</strong> {t('privacy_page.legal_basis_contract_value')}</li>
        <li><strong>{t('privacy_page.legal_basis_interest_label')}</strong> {t('privacy_page.legal_basis_interest_value')}</li>
        <li><strong>{t('privacy_page.legal_basis_consent_label')}</strong> {t('privacy_page.legal_basis_consent_value')}</li>
        <li><strong>{t('privacy_page.legal_basis_obligation_label')}</strong> {t('privacy_page.legal_basis_obligation_value')}</li>
      </ul>
    </section>
  );
};

export default PrivacyLegalBasis;