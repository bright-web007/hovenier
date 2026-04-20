'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LocaleLink from './LocaleLink';

interface MobileMenuProps {
  links: { href: string; label: string }[];
  ctaHref: string;
  ctaLabel: string;
  logoHref: string;
  nlHref: string;
  enHref: string;
  currentLocale: 'nl' | 'en';
}

export default function MobileMenu({ links, ctaHref, ctaLabel, logoHref, nlHref, enHref, currentLocale }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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

      {/* Mobile menu overlay */}
      {menuOpen && <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} />}

      {/* Mobile slide-out menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-header">
          <Link href={logoHref} className="nav-logo" onClick={() => setMenuOpen(false)}>
            <Image src="/assets/logo-light.svg" alt="Hovenier.frl" width={140} height={36} className="nav-logo-image" />
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
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{link.label}</Link>
        ))}
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
        <Link className="nav-cta" style={{ width: '100%', marginTop: '0.5rem', textAlign: 'center' }} href={ctaHref} onClick={() => setMenuOpen(false)}>
          {ctaLabel}
        </Link>
      </div>
    </>
  );
}
