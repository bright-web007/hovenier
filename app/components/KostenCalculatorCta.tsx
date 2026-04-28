'use client';

import styles from './KostenCalculatorCta.module.css';

interface KostenCalculatorCtaProps {
  requestQuote: string;
}

export default function KostenCalculatorCta({ requestQuote }: KostenCalculatorCtaProps) {
  const handleClick = () => {
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

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <button
      className={styles.calculatorCta}
      onClick={handleClick}
      type="button"
    >
      {requestQuote}
    </button>
  );
}
