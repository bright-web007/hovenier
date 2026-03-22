'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

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
  
  // Detect actual locale from URL path for more reliable detection
  const actualLocale = pathname.startsWith('/en') ? 'en' : 'nl';
  const currentLocale = actualLocale; // Use URL-based detection instead of prop
  
  console.log('Navigation rendered:', { 
    propLocale: locale, 
    actualLocale, 
    pathname, 
    using: currentLocale 
  });
  
  // Default fallback values using actual locale
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
  
  const switchToNL = () => {
    console.log('=== NL BUTTON CLICKED ===');
    console.log('Current locale:', currentLocale);
    console.log('Current pathname:', pathname);
    
    let newPath = pathname;
    if (pathname.startsWith('/en')) {
      newPath = pathname.replace(/^\/en/, '') || '/';
    }
    
    console.log('Switching to NL:', { from: pathname, to: newPath });
    router.push(newPath);
  };
  
  const switchToEN = () => {
    console.log('=== EN BUTTON CLICKED ===');
    console.log('Current locale:', currentLocale);
    console.log('Current pathname:', pathname);
    
    let newPath = pathname;
    if (!pathname.startsWith('/en')) {
      newPath = `/en${pathname}`;
    }
    
    console.log('Switching to EN:', { from: pathname, to: newPath });
    router.push(newPath);
  };

  return (
    <nav className="nav" role="navigation" aria-label="Hoofdnavigatie">
      <div className="nav-inner">
        <Link href={currentLocale === 'nl' ? '/' : '/en'} className="nav-logo" aria-label="Hovenier.frl homepage">
          <img src="/assets/logo-light.svg" alt="Hovenier.frl - Vind de beste hovenier in Friesland" width="180" height="40" className="nav-logo-image" />
        </Link>
        <div className="nav-links">
          <Link href={currentLocale === 'nl' ? '/hoveniers' : '/en/hoveniers'} className="nav-link">{t.gardeners}</Link>
          <Link href={currentLocale === 'nl' ? '/services' : '/en/services'} className="nav-link">{t.services}</Link>
          <Link href={currentLocale === 'nl' ? '/regio' : '/en/regio'} className="nav-link">{t.regions}</Link>
          <Link href={currentLocale === 'nl' ? '/kosten' : '/en/kosten'} className="nav-link">{t.costs}</Link>
          <div className="lang-toggle" role="group" aria-label="Taal selectie">
            <button 
              className={`lang-btn ${currentLocale === 'nl' ? 'active' : 'inactive'}`} 
              onClick={switchToNL}
              onMouseDown={(e) => console.log('NL mousedown')}
              aria-pressed={currentLocale === 'nl'}
              type="button"
              data-testid="nl-button"
            >
              NL
            </button>
            <button 
              className={`lang-btn ${currentLocale === 'en' ? 'active' : 'inactive'}`} 
              onClick={switchToEN}
              onMouseDown={(e) => console.log('EN mousedown')} 
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
