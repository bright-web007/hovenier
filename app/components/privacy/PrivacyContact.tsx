import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyContact = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>13. Contact</h2>
      <p className={styles.legalText}>
        {t('privacy_page.contact_intro')}
      </p>
      
      <div className={styles.contactHighlight}>
        <h3>Privacy Officer</h3>
        <address>
          {t('privacy_page.contact_email_label')}: <a href="mailto:privacy@hovenier.frl">privacy@hovenier.frl</a><br />
          Website: <a href="https://hovenier.frl">https://hovenier.frl</a>
        </address>
      </div>

      <p className={styles.legalText} style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted, #666)' }}>
        {t('privacy_page.backlink_prefix')} <a href="https://bedrijveninfriesland.allepaginas.nl" target="_blank" rel="noopener noreferrer">{t('footer.backlink_text')}</a>{t('privacy_page.backlink_suffix')}
      </p>
    </section>
  );
};

export default PrivacyContact;