import Image from 'next/image';
import Link from 'next/link';
import LocaleLink from './LocaleLink';
import MobileMenu from './MobileMenu';
import {
  localizePath,
  switchLocalePath,
  type SupportedLocale
} from '@/lib/locale-utils';

interface NavigationProps {
  locale: string;
  translations?: {
    gardeners?: string;
    services?: string;
    regions?: string;
    costs?: string;
    request_quote?: string;
  };
}

export default function Navigation({ locale, translations = {} }: NavigationProps) {
  const currentLocale = (locale === 'en' ? 'en' : 'nl') as SupportedLocale;
  
  // Default fallback values using current locale
  const t = {
    gardeners: translations.gardeners || (currentLocale === 'nl' ? 'Hoveniers' : 'Gardeners'),
    services: translations.services || (currentLocale === 'nl' ? 'Diensten' : 'Services'),
    regions: translations.regions || (currentLocale === 'nl' ? 'Regio\'s' : 'Regions'),
    costs: translations.costs || (currentLocale === 'nl' ? 'Kosten' : 'Costs'),
    request_quote: translations.request_quote || (currentLocale === 'nl' ? 'Offerte aanvragen' : 'Request Quote')
  };

  // Build the equivalent path for the other locale
  const currentPath = localizePath('/', currentLocale);
  const nlHref = switchLocalePath(currentPath, 'nl');
  const enHref = switchLocalePath(currentPath, 'en');

  const ctaHref = `${localizePath('/diensten', currentLocale)}#quote-form`;

  const navLinks = [
    { href: localizePath('/hoveniers', currentLocale), label: t.gardeners },
    { href: localizePath('/diensten', currentLocale), label: t.services },
    { href: localizePath('/regio', currentLocale), label: t.regions },
    { href: localizePath('/kosten', currentLocale), label: t.costs },
  ];

  return (
    <nav className="nav" role="navigation" aria-label="Hoofdnavigatie">
      <div className="nav-inner">
        <Link href={localizePath('/', currentLocale)} className="nav-logo" aria-label="Hovenier.frl homepage">
          <Image src="/assets/logo-light.svg" alt="Hovenier.frl - Vind de beste hovenier in Friesland" width={180} height={40} className="nav-logo-image" />
        </Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link" prefetch={false}>{link.label}</Link>
          ))}
          <div className="lang-toggle" role="group" aria-label="Taal selectie">
            <LocaleLink 
              className={`lang-btn ${currentLocale === 'nl' ? 'active' : 'inactive'}`}
              href={nlHref}
              locale="nl"
              ariaCurrent={currentLocale === 'nl' ? 'true' : undefined}
              data-testid="nl-button"
            >
              NL
            </LocaleLink>
            <LocaleLink 
              className={`lang-btn ${currentLocale === 'en' ? 'active' : 'inactive'}`}
              href={enHref}
              locale="en"
              ariaCurrent={currentLocale === 'en' ? 'true' : undefined}
              data-testid="en-button"
            >
              EN
            </LocaleLink>
          </div>
          <Link className="nav-cta" href={ctaHref} prefetch={false}>
            {t.request_quote}
          </Link>
        </div>

        <MobileMenu
          links={navLinks}
          ctaHref={ctaHref}
          ctaLabel={t.request_quote}
          logoHref={localizePath('/', currentLocale)}
          nlHref={nlHref}
          enHref={enHref}
          currentLocale={currentLocale}
        />
      </div>
    </nav>
  );
}
