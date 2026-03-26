import Link from 'next/link';
import { localizePath, type SupportedLocale } from '@/lib/locale-utils';
import { regionHubs, standaloneRegions } from '@/lib/regions-hierarchy';

interface FooterProps {
  locale?: string;
}

export default function Footer({ locale = 'nl' }: FooterProps) {
  const currentLocale = locale as SupportedLocale;
  
  // Simple translation function
  function t(key: string): string {
    const translations: Record<string, Record<string, string>> = {
      nl: {
        'footer.description': 'Dé plek om betrouwbare hoveniers in Friesland te vinden. Vergelijk offertes, lees reviews en kies met vertrouwen voor de beste hovenier in jouw gemeente.',
        'footer.newsletter_title': 'Tuintips & updates',
        'footer.newsletter_placeholder': 'Je e-mailadres',
        'footer.newsletter_button': 'Aanmelden',
        'footer.newsletter_privacy': 'Maandelijkse tuintips en geen spam. Je kunt altijd uitschrijven.',
        'footer.services_title': 'Diensten',
        'footer.regions_title': 'Regio\'s',
        'footer.links.regions.noordwest_friesland': 'Noordwest-Friesland',
        'footer.links.regions.noordoost_friesland': 'Noordoost-Friesland',
        'footer.links.regions.centraal_friesland': 'Centraal-Friesland',
        'footer.links.regions.zuidwest_friesland': 'Zuidwest-Friesland',
        'footer.standalone_title': 'Stad',
        'footer.gemeenten_title': 'Gemeenten',
        'footer.links.gemeenten.leeuwarden': 'Leeuwarden',
        'footer.links.gemeenten.heerenveen': 'Heerenveen',
        'footer.links.gemeenten.smallingerland': 'Smallingerland',
        'footer.links.gemeenten.sudwest_fryslan': 'Súdwest-Fryslân',
        'footer.links.gemeenten.waadhoeke': 'Waadhoeke',
        'footer.links.gemeenten.harlingen': 'Harlingen',
        'footer.links.gemeenten.vlieland': 'Vlieland',
        'footer.links.gemeenten.terschelling': 'Terschelling',
        'footer.links.gemeenten.noardeast_fryslan': 'Noardeast-Fryslân',
        'footer.links.gemeenten.achtkarspelen': 'Achtkarspelen',
        'footer.links.gemeenten.dantumadeel': 'Dantumadeel',
        'footer.links.gemeenten.ameland': 'Ameland',
        'footer.links.gemeenten.schiermonnikoog': 'Schiermonnikoog',
        'footer.links.gemeenten.opsterland': 'Opsterland',
        'footer.links.gemeenten.ooststellingwerf': 'Ooststellingwerf',
        'footer.links.gemeenten.weststellingwerf': 'Weststellingwerf',
        'footer.links.gemeenten.de_fryske_marren': 'De Fryske Marren',
        'footer.links.gemeenten.tietjerksteradeel': 'Tietjerksteradeel',
        'footer.company_title': 'Bedrijf',
        'footer.copyright': 'Alle rechten voorbehouden.',
        'footer.newsletter_success': 'Bedankt voor je aanmelding! We nemen contact met je op.',
        'footer.links.services.tuinonderhoud': 'Tuinonderhoud',
        'footer.links.services.tuinontwerp': 'Tuinontwerp',
        'footer.links.services.groendak': 'Groendaken',
        'footer.links.services.bestrating': 'Bestrating',
        'footer.links.company.over_ons': 'Over ons',
        'footer.links.company.samenwerking': 'Samenwerking',
        'footer.links.company.contact': 'Contact',
        'footer.links.company.nieuws': 'Blog',
        'footer.links.legal.privacy_beleid': 'Privacybeleid',
        'footer.links.legal.algemene_voorwaarden': 'Algemene voorwaarden',
        'footer.links.legal.cookie_beleid': 'Cookiebeleid',
        'footer.links.legal.aansprakelijkheid': 'Aansprakelijkheid'
      },
      en: {
        'footer.description': 'The place to find reliable gardeners in Friesland. Compare quotes, read reviews and choose with confidence for the best gardener in your municipality.',
        'footer.newsletter_title': 'Garden tips & updates',
        'footer.newsletter_placeholder': 'Your email address',
        'footer.newsletter_button': 'Subscribe',
        'footer.newsletter_privacy': 'Monthly garden tips and no spam. You can always unsubscribe.',
        'footer.services_title': 'Services',
        'footer.regions_title': 'Regions',
        'footer.links.regions.noordwest_friesland': 'Northwest Friesland',
        'footer.links.regions.noordoost_friesland': 'Northeast Friesland',
        'footer.links.regions.centraal_friesland': 'Central Friesland',
        'footer.links.regions.zuidwest_friesland': 'Southwest Friesland',
        'footer.standalone_title': 'Major Cities',
        'footer.gemeenten_title': 'Municipalities',
        'footer.links.gemeenten.leeuwarden': 'Leeuwarden',
        'footer.links.gemeenten.heerenveen': 'Heerenveen',
        'footer.links.gemeenten.smallingerland': 'Smallingerland',
        'footer.links.gemeenten.sudwest_fryslan': 'Súdwest-Fryslân',
        'footer.links.gemeenten.waadhoeke': 'Waadhoeke',
        'footer.links.gemeenten.harlingen': 'Harlingen',
        'footer.links.gemeenten.vlieland': 'Vlieland',
        'footer.links.gemeenten.terschelling': 'Terschelling',
        'footer.links.gemeenten.noardeast_fryslan': 'Noardeast-Fryslân',
        'footer.links.gemeenten.achtkarspelen': 'Achtkarspelen',
        'footer.links.gemeenten.dantumadeel': 'Dantumadeel',
        'footer.links.gemeenten.ameland': 'Ameland',
        'footer.links.gemeenten.schiermonnikoog': 'Schiermonnikoog',
        'footer.links.gemeenten.opsterland': 'Opsterland',
        'footer.links.gemeenten.ooststellingwerf': 'Ooststellingwerf',
        'footer.links.gemeenten.weststellingwerf': 'Weststellingwerf',
        'footer.links.gemeenten.de_fryske_marren': 'De Fryske Marren',
        'footer.links.gemeenten.tietjerksteradeel': 'Tietjerksteradeel',
        'footer.company_title': 'Company',
        'footer.copyright': 'All rights reserved.',
        'footer.newsletter_success': 'Thank you for signing up! We will contact you.',
        'footer.links.services.tuinonderhoud': 'Garden Maintenance',
        'footer.links.services.tuinontwerp': 'Garden Design',
        'footer.links.services.groendak': 'Green Roofs',
        'footer.links.services.bestrating': 'Paving',
        'footer.links.company.over_ons': 'About Us',
        'footer.links.company.samenwerking': 'Partnership',
        'footer.links.company.contact': 'Contact',
        'footer.links.company.nieuws': 'Blog',
        'footer.links.legal.privacy_beleid': 'Privacy Policy',
        'footer.links.legal.algemene_voorwaarden': 'Terms & Conditions',
        'footer.links.legal.cookie_beleid': 'Cookie Policy',
        'footer.links.legal.aansprakelijkheid': 'Liability'
      }
    };
    
    return translations[locale as keyof typeof translations]?.[key] || translations.nl[key] || key;
  }
  
  const currentYear = new Date().getFullYear();
  
  const serviceLinks = [
    { href: localizePath('/diensten/tuinonderhoud', currentLocale), label: t('footer.links.services.tuinonderhoud') },
    { href: localizePath('/diensten/tuinontwerp', currentLocale), label: t('footer.links.services.tuinontwerp') },
    { href: localizePath('/diensten/groendak', currentLocale), label: t('footer.links.services.groendak') },
    { href: localizePath('/diensten/stratenmaker', currentLocale), label: t('footer.links.services.bestrating') }
  ];
  
  // Create gemeente translation key mapping
  const gemeenteTranslationKeys: Record<string, string> = {
    'leeuwarden': 'footer.links.gemeenten.leeuwarden',
    'heerenveen': 'footer.links.gemeenten.heerenveen',
    'smallingerland': 'footer.links.gemeenten.smallingerland',
    'sudwest-fryslan': 'footer.links.gemeenten.sudwest_fryslan',
    'waadhoeke': 'footer.links.gemeenten.waadhoeke',
    'harlingen': 'footer.links.gemeenten.harlingen',
    'vlieland': 'footer.links.gemeenten.vlieland',
    'terschelling': 'footer.links.gemeenten.terschelling',
    'noardeast-fryslan': 'footer.links.gemeenten.noardeast_fryslan',
    'achtkarspelen': 'footer.links.gemeenten.achtkarspelen',
    'dantumadeel': 'footer.links.gemeenten.dantumadeel',
    'ameland': 'footer.links.gemeenten.ameland',
    'schiermonnikoog': 'footer.links.gemeenten.schiermonnikoog',
    'opsterland': 'footer.links.gemeenten.opsterland',
    'ooststellingwerf': 'footer.links.gemeenten.ooststellingwerf',
    'weststellingwerf': 'footer.links.gemeenten.weststellingwerf',
    'de-fryske-marren': 'footer.links.gemeenten.de_fryske_marren',
    'tietjerksteradeel': 'footer.links.gemeenten.tietjerksteradeel'
  };

  // Generate region hub links with their gemeentes
  const regionLinks = regionHubs.map(hub => ({
    name: hub.name,
    href: localizePath(`/regio/${hub.slug}`, currentLocale),
    translationKey: `footer.links.regions.${hub.slug.replace(/-/g, '_')}`,
    gemeentes: hub.gemeentes
      .filter(gemeente => gemeente.slug !== 'leeuwarden') // Exclude leeuwarden from hub gemeentes to avoid duplicates
      .map(gemeente => ({
        href: localizePath(`/regio/${hub.slug}/${gemeente.slug}`, currentLocale),
        label: t(gemeenteTranslationKeys[gemeente.slug] || gemeente.name)
      }))
  }));

  // Standalone regions (like Leeuwarden) - ensure consistent filtering
  const standaloneLinks = standaloneRegions
    .filter(gemeente => gemeente.slug === 'leeuwarden') // Explicitly filter for leeuwarden only
    .map(gemeente => ({
      href: localizePath(`/regio/${gemeente.slug}`, currentLocale),
      label: t(gemeenteTranslationKeys[gemeente.slug] || gemeente.name)
    }));
  
  const companyLinks = [
    { href: localizePath('/over-ons', currentLocale), label: t('footer.links.company.over_ons') },
    { href: localizePath('/samenwerking', currentLocale), label: t('footer.links.company.samenwerking') },
    { href: localizePath('/contact', currentLocale), label: t('footer.links.company.contact') },
    { href: localizePath('/nieuws', currentLocale), label: t('footer.links.company.nieuws') }
  ];
  
  const legalLinks = [
    { href: localizePath('/privacy-beleid', currentLocale), label: t('footer.links.legal.privacy_beleid') },
    { href: localizePath('/algemene-voorwaarden', currentLocale), label: t('footer.links.legal.algemene_voorwaarden') },
    { href: localizePath('/cookie-beleid', currentLocale), label: t('footer.links.legal.cookie_beleid') },
    { href: localizePath('/aansprakelijkheid', currentLocale), label: t('footer.links.legal.aansprakelijkheid') }
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Link href={localizePath('/', currentLocale)} className="footer-logo-link">
                <img src="/assets/logo-dark.svg" alt="Hovenier.frl - Friese hoveniers directory en tuinspecialisten" width="160" height="36" className="footer-logo-image" />
              </Link>
              <p className="footer-description">
                {t('footer.description')}
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div className="footer-newsletter">
              <h4 className="footer-section-title">
                {t('footer.newsletter_title')}
              </h4>
              <div className="newsletter-form">
                <input 
                  type="email"
                  placeholder={t('footer.newsletter_placeholder')}
                  className="newsletter-input"
                  disabled
                />
                <button 
                  type="button"
                  className="newsletter-button"
                  disabled
                >
                  {t('footer.newsletter_button')}
                </button>
              </div>
              <p className="newsletter-privacy">
                {t('footer.newsletter_privacy')}
              </p>
            </div>
          </div>
          
          {/* Services Column */}
          <div className="footer-column">
            <h4 className="footer-section-title">
              {t('footer.services_title')}
            </h4>
            <ul className="footer-links">
              {serviceLinks.map((link) => (
                <li key={link.href} className="footer-link-item">
                  <Link 
                    href={link.href}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Regions Column */}
          <div className="footer-column footer-regions">
            <h4 className="footer-section-title">
              {t('footer.regions_title')}
            </h4>
            <div className="footer-regions-grid">
              {regionLinks.map((region) => (
                <div key={region.href} className="footer-region-group">
                  <h5 className="footer-region-title">
                    <Link href={region.href} className="footer-region-link">
                      {t(region.translationKey)}
                    </Link>
                  </h5>
                  <ul className="footer-region-links">
                    {region.gemeentes.map((gemeente) => (
                      <li key={gemeente.href} className="footer-link-item">
                        <Link href={gemeente.href} className="footer-link footer-gemeente-link">
                          {gemeente.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {/* Standalone regions */}
              {standaloneLinks.length > 0 && (
                <div className="footer-region-group">
                  <h5 className="footer-region-title">
                    {t('footer.standalone_title')}
                  </h5>
                  <ul className="footer-region-links">
                    {standaloneLinks.map((gemeente) => (
                      <li key={gemeente.href} className="footer-link-item">
                        <Link href={gemeente.href} className="footer-link footer-gemeente-link">
                          {gemeente.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* Company Column */}
          <div className="footer-column">
            <h4 className="footer-section-title">
              {t('footer.company_title')}
            </h4>
            <ul className="footer-links">
              {companyLinks.map((link) => (
                <li key={link.href} className="footer-link-item">
                  <Link 
                    href={link.href}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="footer-contact">
          <div className="footer-contact-info">
            <div className="footer-contact-item">
              <a href="mailto:info@hovenier.frl" className="footer-contact-link">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@hovenier.frl
              </a>
            </div>
          </div>
          
          <div className="footer-social">
            <a href="https://facebook.com/hovenier.frl" className="footer-social-link" aria-label="Facebook">
              <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com/hovenier.frl" className="footer-social-link" aria-label="Instagram">
              <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986c6.618 0 11.986-5.368 11.986-11.986C24.003 5.367 18.635.001 12.017.001zM8.449 16.988c-2.012 0-3.64-1.628-3.64-3.64c0-2.012 1.628-3.64 3.64-3.64c2.012 0 3.64 1.628 3.64 3.64C12.089 15.36 10.461 16.988 8.449 16.988z"/>
              </svg>
            </a>
            <a href="https://twitter.com/hovenier_frl" className="footer-social-link" aria-label="Twitter">
              <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © {currentYear} Hovenier.frl. {t('footer.copyright')}
            </div>
            
            <div className="footer-legal">
              {legalLinks.map((link, index) => (
                <span key={link.href} className="footer-legal-item">
                  <Link 
                    href={link.href}
                    className="footer-legal-link"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && <span className="footer-legal-divider">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
