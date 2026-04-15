'use client';
import { useState } from 'react';
import Link from 'next/link';
import LocaleLink from './LocaleLink';
import {
  getPathLocale,
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
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <nav className="nav" role="navigation" aria-label="Hoofdnavigatie">
      <div className="nav-inner">
        <Link href={localizePath('/', currentLocale)} className="nav-logo" aria-label="Hovenier.frl homepage">
          <img src="/assets/logo-light.svg" alt="Hovenier.frl - Vind de beste hovenier in Friesland" width="180" height="40" className="nav-logo-image" />
        </Link>
        <div className="nav-links">
          <Link href={localizePath('/hoveniers', currentLocale)} className="nav-link" prefetch={false}>{t.gardeners}</Link>
          <Link href={localizePath('/diensten', currentLocale)} className="nav-link" prefetch={false}>{t.services}</Link>
          <Link href={localizePath('/regio', currentLocale)} className="nav-link" prefetch={false}>{t.regions}</Link>
          <Link href={localizePath('/kosten', currentLocale)} className="nav-link" prefetch={false}>{t.costs}</Link>
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
          <Link className="nav-cta" href={`${localizePath('/diensten', currentLocale)}#quote-form`} prefetch={false}>
            {t.request_quote}
          </Link>
        </div>

        {/* Hamburger button - visible on mobile */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={menuOpen}
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} />}

      {/* Mobile slide-out menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-header">
          <Link href={localizePath('/', currentLocale)} className="nav-logo" onClick={() => setMenuOpen(false)}>
            <img src="/assets/logo-light.svg" alt="Hovenier.frl" width="140" height="36" className="nav-logo-image" />
          </Link>
          <button
            className="mobile-menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Menu sluiten"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <Link href={localizePath('/hoveniers', currentLocale)} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{t.gardeners}</Link>
        <Link href={localizePath('/diensten', currentLocale)} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{t.services}</Link>
        <Link href={localizePath('/regio', currentLocale)} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{t.regions}</Link>
        <Link href={localizePath('/kosten', currentLocale)} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{t.costs}</Link>
        <div className="lang-toggle" role="group" aria-label="Taal selectie">
          <LocaleLink 
            className={`lang-btn ${currentLocale === 'nl' ? 'active' : 'inactive'}`}
            href={nlHref}
            locale="nl"
            ariaCurrent={currentLocale === 'nl' ? 'true' : undefined}
          >
            NL
          </LocaleLink>
          <LocaleLink 
            className={`lang-btn ${currentLocale === 'en' ? 'active' : 'inactive'}`}
            href={enHref}
            locale="en"
            ariaCurrent={currentLocale === 'en' ? 'true' : undefined}
          >
            EN
          </LocaleLink>
        </div>
        <Link className="nav-cta" style={{ width: '100%', marginTop: '0.5rem', textAlign: 'center' }} href={`${localizePath('/diensten', currentLocale)}#quote-form`} onClick={() => setMenuOpen(false)}>
          {t.request_quote}
        </Link>
      </div>
    </nav>
  );
}
