'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  locale: string;
  translations?: {
    gardeners?: string;
    services?: string;
    regions?: string;
    inspiration?: string;
    request_quote?: string;
  };
}

export default function Navigation({ locale, translations = {} }: NavigationProps) {
  const router = useRouter();
  
  // Default fallback values
  const t = {
    gardeners: translations.gardeners || (locale === 'nl' ? 'Hoveniers' : 'Gardeners'),
    services: translations.services || (locale === 'nl' ? 'Diensten' : 'Services'),
    regions: translations.regions || (locale === 'nl' ? 'Regio\'s' : 'Regions'),
    inspiration: translations.inspiration || (locale === 'nl' ? 'Inspiratie' : 'Inspiration'),
    request_quote: translations.request_quote || (locale === 'nl' ? 'Offerte aanvragen' : 'Request Quote')
  };
  
  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const toggleLanguage = (newLocale: string) => {
    if (newLocale !== locale) {
      const path = window.location.pathname;
      const newPath = path.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPath);
    }
  };

  return (
    <nav className="nav" role="navigation" aria-label="Hoofdnavigatie">
      <div className="nav-inner">
        <Link href={`/${locale}`} className="nav-logo" aria-label="Hovenier.frl homepage">
          <img src="/assets/logo-light.svg" alt="Hovenier.frl" width="180" height="40" className="nav-logo-image" />
        </Link>
        <div className="nav-links">
          <Link href={`/${locale}/hoveniers`} className="nav-link">{t.gardeners}</Link>
          <Link href={`/${locale}/services`} className="nav-link">{t.services}</Link>
          <Link href={`/${locale}/regio`} className="nav-link">{t.regions}</Link>
          <Link href={`/${locale}/articles`} className="nav-link">{t.inspiration}</Link>
          <div className="lang-toggle" role="group" aria-label="Taal selectie">
            <button 
              className={`lang-btn ${locale === 'nl' ? 'active' : 'inactive'}`} 
              onClick={() => toggleLanguage('nl')}
              aria-pressed={locale === 'nl'}
            >
              NL
            </button>
            <button 
              className={`lang-btn ${locale === 'en' ? 'active' : 'inactive'}`} 
              onClick={() => toggleLanguage('en')}
              aria-pressed={locale === 'en'}
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
