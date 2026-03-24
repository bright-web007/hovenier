'use client';

import styles from './KostenCalculatorCta.module.css';

export default function KostenCalculatorCta() {
  const handleClick = () => {
    // Look for CTA section with multiple possible selectors
    const ctaSelectors = [
      '.cta-band', 
      '[class*="serviceForm"]', 
      '[class*="ServiceForm"]', 
      'section:has(form)',
      'form'
    ];
    
    for (const selector of ctaSelectors) {
      const ctaElement = document.querySelector(selector);
      if (ctaElement) {
        ctaElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    
    // Fallback: scroll to bottom of page
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <button 
      className={styles.calculatorCta}
      onClick={handleClick}
      type="button"
    >
      Vraag gratis offerte aan →
    </button>
  );
}