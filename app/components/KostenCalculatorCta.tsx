'use client';

import styles from './KostenCalculatorCta.module.css';
import { createTranslator } from '@/i18n';

export default function KostenCalculatorCta({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

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
      {t('calculator.request_quote')}
    </button>
  );
}