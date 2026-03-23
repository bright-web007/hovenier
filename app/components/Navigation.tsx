'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  getPathLocale,
  localizePath,
  setCookieLocale,
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
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = getPathLocale(pathname || localizePath('/', locale as SupportedLocale));
  
  // Default fallback values using current locale
  const t = {
    gardeners: translations.gardeners || (currentLocale === 'nl' ? 'Hoveniers' : 'Gardeners'),
    services: translations.services || (currentLocale === 'nl' ? 'Diensten' : 'Services'),
    regions: translations.regions || (currentLocale === 'nl' ? 'Regio\'s' : 'Regions'),
    costs: translations.costs || (currentLocale === 'nl' ? 'Kosten' : 'Costs'),
    request_quote: translations.request_quote || (currentLocale === 'nl' ? 'Offerte aanvragen' : 'Request Quote')
  };
  
  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const switchLocale = (nextLocale: SupportedLocale) => {
    setCookieLocale(nextLocale);
    router.push(switchLocalePath(pathname, nextLocale));
  };

  return (
    <nav className="nav" role="navigation" aria-label="Hoofdnavigatie">
      <div className="nav-inner">
        <Link href={localizePath('/', currentLocale)} className="nav-logo" aria-label="Hovenier.frl homepage">
          <img src="/assets/logo-light.svg" alt="Hovenier.frl - Vind de beste hovenier in Friesland" width="180" height="40" className="nav-logo-image" />
        </Link>
        <div className="nav-links">
          <Link href={localizePath('/hoveniers', currentLocale)} className="nav-link">{t.gardeners}</Link>
          <Link href={localizePath('/diensten', currentLocale)} className="nav-link">{t.services}</Link>
          <Link href={localizePath('/regio', currentLocale)} className="nav-link">{t.regions}</Link>
          <Link href={localizePath('/kosten', currentLocale)} className="nav-link">{t.costs}</Link>
          <div className="lang-toggle" role="group" aria-label="Taal selectie">
            <button 
              className={`lang-btn ${currentLocale === 'nl' ? 'active' : 'inactive'}`} 
              onClick={() => switchLocale('nl')}
              aria-pressed={currentLocale === 'nl'}
              type="button"
              data-testid="nl-button"
            >
              NL
            </button>
            <button 
              className={`lang-btn ${currentLocale === 'en' ? 'active' : 'inactive'}`} 
              onClick={() => switchLocale('en')}
              aria-pressed={currentLocale === 'en'}
              type="button"
              data-testid="en-button"
            >
              EN
            </button>
          </div>
          <button className="nav-cta" onClick={scrollToForm}>
            {t.request_quote}
          </button>
        </div>
      </div>
    </nav>
  );
}
