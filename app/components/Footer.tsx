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
              <svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_243_78)">
                <path d="M20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38Z" fill="white"/>
                <path d="M20 8C24 10 27 14 27 19C27 24 25 28 23 30C22 32 21 32 20 32C19 32 18 32 17 30C15 28 13 24 13 19C13 14 16 10 20 8Z" fill="#3D5A2E"/>
                <path d="M20 8C22 10 24 14 24 19C24 24 23 28 22 30C21 32 20 32 20 32C19 32 18 30 17 28C16 25 16 21 16 19C16 14 18 10 20 8Z" fill="#A8D878"/>
                <path d="M20 9V31" stroke="#E4F5D9" strokeWidth="0.8" strokeLinecap="round"/>
                <path opacity="0.7" d="M20 15L24 19" stroke="#E4F5D9" strokeWidth="0.55" strokeLinecap="round"/>
                <path opacity="0.7" d="M20 15L16 19" stroke="#E4F5D9" strokeWidth="0.55" strokeLinecap="round"/>
                <path opacity="0.6" d="M20 23L24 26" stroke="#E4F5D9" strokeWidth="0.55" strokeLinecap="round"/>
                <path opacity="0.6" d="M20 23L16 26" stroke="#E4F5D9" strokeWidth="0.55" strokeLinecap="round"/>
                <path d="M20 32V37" stroke="#8AB87A" strokeLinecap="round"/>
                <path d="M20 35L17 38" stroke="#8AB87A" strokeWidth="0.7" strokeLinecap="round"/>
                <path d="M20 35L23 38" stroke="#8AB87A" strokeWidth="0.7" strokeLinecap="round"/>
                <path d="M55.707 6.786C55.707 6.45733 55.673 6.208 55.605 6.038C55.537 5.868 55.3953 5.749 55.18 5.681C54.976 5.613 54.653 5.579 54.211 5.579C54.177 5.579 54.16 5.545 54.16 5.477C54.16 5.409 54.177 5.375 54.211 5.375C54.483 5.375 54.789 5.38633 55.129 5.409C55.469 5.42033 55.8487 5.426 56.268 5.426C56.642 5.426 57.0047 5.42033 57.356 5.409C57.7073 5.38633 58.0133 5.375 58.274 5.375C58.308 5.375 58.325 5.409 58.325 5.477C58.325 5.545 58.308 5.579 58.274 5.579C57.8547 5.579 57.5373 5.613 57.322 5.681C57.1067 5.73767 56.965 5.851 56.897 6.021C56.829 6.17967 56.795 6.42333 56.795 6.752V14.623C56.795 14.9517 56.829 15.201 56.897 15.371C56.965 15.541 57.1067 15.6543 57.322 15.711C57.5373 15.7677 57.8547 15.796 58.274 15.796C58.308 15.796 58.325 15.83 58.325 15.898C58.325 15.966 58.308 16 58.274 16C58.0133 16 57.7073 15.9943 57.356 15.983C57.0047 15.9717 56.642 15.966 56.268 15.966C55.8487 15.966 55.469 15.9717 55.129 15.983C54.789 15.9943 54.483 16 54.211 16C54.177 16 54.16 15.966 54.16 15.898C54.16 15.83 54.177 15.796 54.211 15.796C54.653 15.796 54.976 15.7677 55.18 15.711C55.3953 15.6543 55.537 15.541 55.605 15.371C55.673 15.201 55.707 14.9517 55.707 14.623V6.786ZM48.584 10.645V10.288H56.183V10.645H48.584ZM48.091 14.623V6.752C48.091 6.42333 48.0513 6.17967 47.972 6.021C47.904 5.851 47.7623 5.73767 47.547 5.681C47.343 5.613 47.0313 5.579 46.612 5.579C46.5893 5.579 46.578 5.545 46.578 5.477C46.578 5.409 46.5893 5.375 46.612 5.375C46.884 5.375 47.19 5.38633 47.53 5.409C47.8813 5.42033 48.244 5.426 48.618 5.426C49.0373 5.426 49.417 5.42033 49.757 5.409C50.097 5.38633 50.403 5.375 50.675 5.375C50.6977 5.375 50.709 5.409 50.709 5.477C50.709 5.545 50.6977 5.579 50.675 5.579C50.2557 5.579 49.9383 5.613 49.723 5.681C49.5077 5.749 49.3603 5.868 49.281 6.038C49.213 6.208 49.179 6.45733 49.179 6.786V14.623C49.179 14.9517 49.213 15.201 49.281 15.371C49.349 15.541 49.4907 15.6543 49.706 15.711C49.9327 15.7677 50.2557 15.796 50.675 15.796C50.6977 15.796 50.709 15.83 50.709 15.898C50.709 15.966 50.6977 16 50.675 16C50.3917 16 50.08 15.9943 49.74 15.983C49.4113 15.9717 49.0373 15.966 48.618 15.966C48.244 15.966 47.8813 15.9717 47.53 15.983C47.1787 15.9943 46.867 16 46.595 16C46.5723 16 46.561 15.966 46.561 15.898C46.561 15.83 46.5723 15.796 46.595 15.796C47.0143 15.796 47.3317 15.7677 47.547 15.711C47.7623 15.6543 47.904 15.541 47.972 15.371C48.0513 15.201 48.091 14.9517 48.091 14.623ZM62.8264 16.221C62.1577 16.221 61.5741 16.0567 61.0754 15.728C60.5767 15.3993 60.1914 14.963 59.9194 14.419C59.6474 13.8637 59.5114 13.2687 59.5114 12.634C59.5114 12.0447 59.6191 11.5347 59.8344 11.104C60.0497 10.6733 60.3387 10.322 60.7014 10.05C61.0641 9.76667 61.4551 9.557 61.8744 9.421C62.3051 9.285 62.7244 9.217 63.1324 9.217C63.8237 9.217 64.4131 9.387 64.9004 9.727C65.3991 10.067 65.7787 10.5033 66.0394 11.036C66.3001 11.5687 66.4304 12.1297 66.4304 12.719C66.4304 13.4443 66.2661 14.0677 65.9374 14.589C65.6087 15.1103 65.1724 15.5127 64.6284 15.796C64.0844 16.0793 63.4837 16.221 62.8264 16.221ZM63.3194 15.898C63.9201 15.898 64.3961 15.6883 64.7474 15.269C65.0987 14.8383 65.2744 14.147 65.2744 13.195C65.2744 12.481 65.1554 11.852 64.9174 11.308C64.6907 10.7527 64.3734 10.322 63.9654 10.016C63.5574 9.69867 63.0927 9.54 62.5714 9.54C61.9707 9.54 61.5004 9.761 61.1604 10.203C60.8204 10.645 60.6504 11.2797 60.6504 12.107C60.6504 12.7983 60.7637 13.433 60.9904 14.011C61.2171 14.589 61.5287 15.048 61.9254 15.388C62.3334 15.728 62.7981 15.898 63.3194 15.898ZM74.3612 9.438C74.3838 9.438 74.3952 9.472 74.3952 9.54C74.3952 9.608 74.3838 9.642 74.3612 9.642C74.0778 9.642 73.8342 9.73267 73.6302 9.914C73.4375 10.084 73.2448 10.407 73.0522 10.883L70.9272 15.983C70.9158 16.0283 70.8535 16.051 70.7402 16.051C70.6382 16.051 70.5758 16.0283 70.5532 15.983L68.1732 10.849C67.9352 10.339 67.7368 10.0103 67.5782 9.863C67.4308 9.71567 67.2495 9.642 67.0342 9.642C67.0002 9.642 66.9832 9.608 66.9832 9.54C66.9832 9.472 67.0002 9.438 67.0342 9.438C67.2042 9.438 67.3855 9.44367 67.5782 9.455C67.7822 9.46633 67.9918 9.472 68.2072 9.472C68.5925 9.472 68.9268 9.46633 69.2102 9.455C69.4935 9.44367 69.7542 9.438 69.9922 9.438C70.0262 9.438 70.0432 9.472 70.0432 9.54C70.0432 9.608 70.0262 9.642 69.9922 9.642C69.6408 9.642 69.3632 9.68733 69.1592 9.778C68.9552 9.85733 68.9155 10.033 69.0402 10.305L71.2162 14.929L70.7232 15.626L72.7122 10.798C72.8822 10.39 72.8652 10.0953 72.6612 9.914C72.4685 9.73267 72.0775 9.642 71.4882 9.642C71.4655 9.642 71.4542 9.608 71.4542 9.54C71.4542 9.472 71.4655 9.438 71.4882 9.438C71.7602 9.438 72.0152 9.44367 72.2532 9.455C72.5025 9.46633 72.8198 9.472 73.2052 9.472C73.4432 9.472 73.6358 9.46633 73.7832 9.455C73.9418 9.44367 74.1345 9.438 74.3612 9.438ZM78.1283 16.204C77.4483 16.204 76.8759 16.051 76.4113 15.745C75.9466 15.4277 75.5953 15.0197 75.3573 14.521C75.1306 14.0223 75.0173 13.4953 75.0173 12.94C75.0173 12.2487 75.1759 11.631 75.4933 11.087C75.8106 10.5317 76.2413 10.0953 76.7853 9.778C77.3406 9.44933 77.9469 9.285 78.6043 9.285C79.2503 9.285 79.7376 9.455 80.0663 9.795C80.4063 10.135 80.5763 10.611 80.5763 11.223C80.5763 11.3703 80.5593 11.4837 80.5253 11.563C80.5026 11.631 80.4516 11.665 80.3723 11.665H79.4203C79.4656 10.9737 79.3636 10.4637 79.1143 10.135C78.8649 9.795 78.5079 9.625 78.0433 9.625C77.4426 9.625 76.9723 9.863 76.6323 10.339C76.3036 10.815 76.1393 11.4667 76.1393 12.294C76.1393 12.94 76.2413 13.5123 76.4453 14.011C76.6493 14.5097 76.9496 14.9007 77.3463 15.184C77.7429 15.4673 78.2246 15.609 78.7913 15.609C79.1766 15.609 79.4939 15.5523 79.7433 15.439C79.9926 15.3257 80.2419 15.1953 80.4913 15.048C80.5139 15.0253 80.5423 15.0423 80.5763 15.099C80.6216 15.1443 80.6329 15.184 80.6103 15.218C80.2136 15.5693 79.8056 15.8243 79.3863 15.983C78.9783 16.1303 78.5589 16.204 78.1283 16.204ZM75.8333 11.682L75.8163 11.461L79.6753 11.393V11.665L75.8333 11.682ZM86.6827 16C86.6487 16 86.6317 15.966 86.6317 15.898C86.6317 15.83 86.6487 15.796 86.6827 15.796C87.1247 15.796 87.4081 15.7223 87.5327 15.575C87.6687 15.4163 87.7367 15.099 87.7367 14.623V11.869C87.7367 11.189 87.6121 10.696 87.3627 10.39C87.1134 10.0727 86.7167 9.914 86.1727 9.914C85.7647 9.914 85.3454 10.0443 84.9147 10.305C84.4841 10.5657 84.1157 10.9227 83.8097 11.376L83.7417 11.172C84.2404 10.5033 84.7334 10.0103 85.2207 9.693C85.7194 9.37567 86.2237 9.217 86.7337 9.217C87.3571 9.217 87.8387 9.39267 88.1787 9.744C88.5301 10.084 88.7057 10.5997 88.7057 11.291V14.623C88.7057 15.099 88.7681 15.4163 88.8927 15.575C89.0287 15.7223 89.3177 15.796 89.7597 15.796C89.7937 15.796 89.8107 15.83 89.8107 15.898C89.8107 15.966 89.7937 16 89.7597 16C89.5671 16 89.3347 15.9943 89.0627 15.983C88.8021 15.9717 88.5244 15.966 88.2297 15.966C87.9351 15.966 87.6517 15.9717 87.3797 15.983C87.1077 15.9943 86.8754 16 86.6827 16ZM82.1097 16C82.0757 16 82.0587 15.966 82.0587 15.898C82.0587 15.83 82.0757 15.796 82.1097 15.796C82.5517 15.796 82.8351 15.7223 82.9597 15.575C83.0957 15.4163 83.1637 15.099 83.1637 14.623V11.257C83.1637 10.883 83.1184 10.611 83.0277 10.441C82.9484 10.2597 82.7954 10.169 82.5687 10.169C82.4554 10.169 82.3194 10.1917 82.1607 10.237C82.0134 10.2823 81.8434 10.3447 81.6507 10.424C81.6054 10.4353 81.5657 10.4127 81.5317 10.356C81.5091 10.2993 81.5204 10.2597 81.5657 10.237L83.5377 9.302C83.5717 9.29067 83.6057 9.285 83.6397 9.285C83.7191 9.285 83.8211 9.404 83.9457 9.642C84.0704 9.88 84.1327 10.2257 84.1327 10.679V14.623C84.1327 15.099 84.1951 15.4163 84.3197 15.575C84.4557 15.7223 84.7447 15.796 85.1867 15.796C85.2207 15.796 85.2377 15.83 85.2377 15.898C85.2377 15.966 85.2207 16 85.1867 16C84.9941 16 84.7617 15.9943 84.4897 15.983C84.2291 15.9717 83.9514 15.966 83.6567 15.966C83.3621 15.966 83.0787 15.9717 82.8067 15.983C82.5347 15.9943 82.3024 16 82.1097 16ZM91.028 16C91.0053 16 90.994 15.966 90.994 15.898C90.994 15.83 91.0053 15.796 91.028 15.796C91.47 15.796 91.759 15.7223 91.895 15.575C92.0423 15.4163 92.116 15.099 92.116 14.623V11.444C92.116 11.0473 92.0763 10.7583 91.997 10.577C91.9176 10.3843 91.7703 10.288 91.555 10.288C91.4643 10.288 91.3566 10.3107 91.232 10.356C91.1073 10.39 90.96 10.4467 90.79 10.526C90.7446 10.5373 90.705 10.5147 90.671 10.458C90.6483 10.39 90.654 10.3447 90.688 10.322L92.898 9.302C92.932 9.29067 92.9546 9.285 92.966 9.285C92.9886 9.285 93.017 9.302 93.051 9.336C93.085 9.35867 93.102 9.387 93.102 9.421C93.102 9.51167 93.0963 9.73267 93.085 10.084C93.0736 10.4353 93.068 10.883 93.068 11.427V14.623C93.068 15.099 93.1303 15.4163 93.255 15.575C93.391 15.7223 93.6856 15.796 94.139 15.796C94.173 15.796 94.19 15.83 94.19 15.898C94.19 15.966 94.173 16 94.139 16C93.935 16 93.697 15.9943 93.425 15.983C93.1643 15.9717 92.8866 15.966 92.592 15.966C92.2973 15.966 92.014 15.9717 91.742 15.983C91.4813 15.9943 91.2433 16 91.028 16ZM92.456 7.296C92.2293 7.296 92.048 7.23367 91.912 7.109C91.776 6.98433 91.708 6.80867 91.708 6.582C91.708 6.35533 91.776 6.17967 91.912 6.055C92.048 5.93033 92.2293 5.868 92.456 5.868C92.6826 5.868 92.8583 5.93033 92.983 6.055C93.1076 6.17967 93.17 6.35533 93.17 6.582C93.17 7.058 92.932 7.296 92.456 7.296ZM98.4984 16.204C97.8184 16.204 97.2461 16.051 96.7814 15.745C96.3167 15.4277 95.9654 15.0197 95.7274 14.521C95.5007 14.0223 95.3874 13.4953 95.3874 12.94C95.3874 12.2487 95.5461 11.631 95.8634 11.087C96.1807 10.5317 96.6114 10.0953 97.1554 9.778C97.7107 9.44933 98.3171 9.285 98.9744 9.285C99.6204 9.285 100.108 9.455 100.436 9.795C100.776 10.135 100.946 10.611 100.946 11.223C100.946 11.3703 100.929 11.4837 100.895 11.563C100.873 11.631 100.822 11.665 100.742 11.665H99.7904C99.8357 10.9737 99.7337 10.4637 99.4844 10.135C99.2351 9.795 98.8781 9.625 98.4134 9.625C97.8127 9.625 97.3424 9.863 97.0024 10.339C96.6737 10.815 96.5094 11.4667 96.5094 12.294C96.5094 12.94 96.6114 13.5123 96.8154 14.011C97.0194 14.5097 97.3197 14.9007 97.7164 15.184C98.1131 15.4673 98.5947 15.609 99.1614 15.609C99.5467 15.609 99.8641 15.5523 100.113 15.439C100.363 15.3257 100.612 15.1953 100.861 15.048C100.884 15.0253 100.912 15.0423 100.946 15.099C100.992 15.1443 101.003 15.184 100.98 15.218C100.584 15.5693 100.176 15.8243 99.7564 15.983C99.3484 16.1303 98.9291 16.204 98.4984 16.204ZM96.2034 11.682L96.1864 11.461L100.045 11.393V11.665L96.2034 11.682ZM104.146 11.393L104.078 11.206C104.497 10.696 104.843 10.305 105.115 10.033C105.387 9.74967 105.619 9.557 105.812 9.455C106.016 9.34167 106.209 9.285 106.39 9.285C106.628 9.285 106.86 9.353 107.087 9.489C107.325 9.625 107.444 9.78933 107.444 9.982C107.444 10.1293 107.393 10.254 107.291 10.356C107.2 10.458 107.064 10.509 106.883 10.509C106.736 10.509 106.611 10.4637 106.509 10.373C106.407 10.2823 106.299 10.1973 106.186 10.118C106.073 10.0387 105.925 9.999 105.744 9.999C105.642 9.999 105.534 10.0273 105.421 10.084C105.308 10.1407 105.155 10.271 104.962 10.475C104.769 10.6677 104.497 10.9737 104.146 11.393ZM102.48 16C102.446 16 102.429 15.966 102.429 15.898C102.429 15.83 102.446 15.796 102.48 15.796C102.922 15.796 103.205 15.7223 103.33 15.575C103.466 15.4163 103.534 15.099 103.534 14.623V11.257C103.534 10.883 103.489 10.611 103.398 10.441C103.319 10.2597 103.166 10.169 102.939 10.169C102.826 10.169 102.69 10.1917 102.531 10.237C102.384 10.2823 102.214 10.3447 102.021 10.424C101.976 10.4353 101.936 10.4127 101.902 10.356C101.879 10.2993 101.891 10.2597 101.936 10.237L103.908 9.302C103.942 9.29067 103.976 9.285 104.01 9.285C104.089 9.285 104.191 9.404 104.316 9.642C104.441 9.88 104.503 10.2257 104.503 10.679V14.623C104.503 14.9403 104.543 15.1897 104.622 15.371C104.701 15.541 104.86 15.6543 105.098 15.711C105.336 15.7677 105.687 15.796 106.152 15.796C106.197 15.796 106.22 15.83 106.22 15.898C106.22 15.966 106.197 16 106.152 16C105.88 16 105.557 15.9943 105.183 15.983C104.82 15.9717 104.435 15.966 104.027 15.966C103.732 15.966 103.449 15.9717 103.177 15.983C102.905 15.9943 102.673 16 102.48 16Z" fill="white"/>
                <path d="M47.78 30.5375C47.66 30.5375 47.5575 30.4975 47.4725 30.4175C47.3925 30.3325 47.3525 30.23 47.3525 30.11C47.3525 29.99 47.3925 29.89 47.4725 29.81C47.5575 29.725 47.66 29.6825 47.78 29.6825C47.91 29.6825 48.0125 29.725 48.0875 29.81C48.1675 29.89 48.2075 29.99 48.2075 30.11C48.2075 30.23 48.1675 30.3325 48.0875 30.4175C48.0125 30.4975 47.91 30.5375 47.78 30.5375ZM49.1376 30.5V25.25H52.3326V25.7675H49.7676V27.6125H51.9501V28.1225H49.7676V30.5H49.1376ZM53.1805 30.5V25.25H54.8755C55.2855 25.25 55.6205 25.32 55.8805 25.46C56.1405 25.595 56.333 25.7775 56.458 26.0075C56.583 26.2375 56.6455 26.4975 56.6455 26.7875C56.6455 27.0675 56.5805 27.325 56.4505 27.56C56.3255 27.795 56.1305 27.9825 55.8655 28.1225C55.6005 28.2625 55.2605 28.3325 54.8455 28.3325H53.8105V30.5H53.1805ZM55.9555 30.5L54.8005 28.1525H55.5055L56.698 30.5H55.9555ZM53.8105 27.8375H54.8305C55.2305 27.8375 55.523 27.74 55.708 27.545C55.898 27.35 55.993 27.1 55.993 26.795C55.993 26.485 55.9005 26.24 55.7155 26.06C55.5355 25.875 55.238 25.7825 54.823 25.7825H53.8105V27.8375ZM57.6629 30.5V25.25H58.2929V29.9975H60.7379V30.5H57.6629Z" fill="#AED29A"/>
                </g>
                <defs>
                <clipPath id="clip0_243_78">
                <rect width="140" height="40" fill="white"/>
                </clipPath>
                </defs>
                </svg>

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
          <div className="footer-regions">
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
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="https://instagram.com/hovenier.frl" className="footer-social-link" aria-label="Instagram">
              <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986c6.618 0 11.986-5.368 11.986-11.986C24.003 5.367 18.635.001 12.017.001zM8.449 16.988c-2.012 0-3.64-1.628-3.64-3.64c0-2.012 1.628-3.64 3.64-3.64c2.012 0 3.64 1.628 3.64 3.64C12.089 15.36 10.461 16.988 8.449 16.988z" />
              </svg>
            </a>
            <a href="https://twitter.com/hovenier_frl" className="footer-social-link" aria-label="Twitter">
              <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
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
