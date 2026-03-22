'use client';

import Link from 'next/link';
import { useState } from 'react';

interface FooterProps {
  locale?: string;
}

export default function Footer({ locale = 'nl' }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  
  const currentYear = new Date().getFullYear();
  
  const serviceLinks = [
    { href: '/services/tuinonderhoud', label: 'Tuinonderhoud' },
    { href: '/services/tuinontwerp', label: 'Tuinontwerp' },
    { href: '/services/groendak', label: 'Groendaken' },
    { href: '/services/bestrating', label: 'Bestrating' }
  ];
  
  const gemeenteLinks = [
    { href: '/gemeente/leeuwarden', label: 'Leeuwarden' },
    { href: '/gemeente/heerenveen', label: 'Heerenveen' },
    { href: '/gemeente/smallingerland', label: 'Smallingerland' },
    { href: '/gemeente/sudwest-fryslan', label: 'Súdwest-Fryslân' },
    { href: '/gemeente/waadhoeke', label: 'Waadhoeke' },
    { href: '/gemeente/harlingen', label: 'Harlingen' }
  ];
  
  const companyLinks = [
    { href: '/over-ons', label: 'Over ons' },
    { href: '/samenwerking', label: 'Samenwerking' },
    { href: '/contact', label: 'Contact' },
    { href: '/nieuws', label: 'Blog' }
  ];
  
  const legalLinks = [
    { href: '/privacy-beleid', label: 'Privacybeleid' },
    { href: '/algemene-voorwaarden', label: 'Algemene voorwaarden' },
    { href: '/cookie-beleid', label: 'Cookiebeleid' },
    { href: '/disclaimer', label: 'Disclaimer' }
  ];
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', emailInput);
    setEmailInput('');
    alert('Bedankt voor je aanmelding! We nemen contact met je op.');
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Link href="/" className="footer-logo-link">
                <img src="/assets/logo-dark.svg" alt="Hovenier.frl - Friese hoveniers directory en tuinspecialisten" width="160" height="36" className="footer-logo-image" />
              </Link>
              <p className="footer-description">
                Dé plek om betrouwbare hoveniers in Friesland te vinden. Vergelijk offertes, 
                lees reviews en kies met vertrouwen voor de beste hovenier in jouw gemeente.
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div className="footer-newsletter">
              <h4 className="footer-section-title">
                Tuintips & updates
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input 
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Je e-mailadres"
                  className="newsletter-input"
                  required
                />
                <button 
                  type="submit"
                  className="newsletter-button"
                >
                  Aanmelden
                </button>
              </form>
              <p className="newsletter-privacy">
                Maandelijkse tuintips en geen spam. Je kunt altijd uitschrijven.
              </p>
            </div>
          </div>
          
          {/* Services Column */}
          <div className="footer-column">
            <h4 className="footer-section-title">
              Diensten
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
          
          {/* Gemeenten Column */}
          <div className="footer-column">
            <h4 className="footer-section-title">
              Gemeenten
            </h4>
            <ul className="footer-links">
              {gemeenteLinks.map((link) => (
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
          
          {/* Company Column */}
          <div className="footer-column">
            <h4 className="footer-section-title">
              Bedrijf
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
              © {currentYear} Hovenier.frl. Alle rechten voorbehouden.
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