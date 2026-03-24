'use client';

import styles from './KostenFAQ.module.css';

const faqData = [
  {
    q: "Wat kost een hovenier gemiddeld per uur in Friesland?",
    a: "Een hovenier in Friesland kost gemiddeld €35 tot €65 per uur. Voor standaard onderhoud betaalt u €35–50/uur. Voor specialistisch werk zoals bomen snoeien of groendakken rekent een hovenier €50–65/uur."
  },
  {
    q: "Wat kost tuinonderhoud per maand?",
    a: "Voor maandelijks tuinonderhoud betaalt u gemiddeld €80–250 per maand, afhankelijk van de tuingrootte. Een kleine stadstuin (tot 50m²) kost €80–120/maand. Een grotere tuin (150m²+) kost €200–350/maand."
  },
  {
    q: "Is een offerte aanvragen gratis?",
    a: "Ja, via Hovenier.frl kunt u volledig gratis en vrijblijvend offertes aanvragen bij meerdere hoveniers in uw regio. U betaalt niets en bent nergens toe verplicht."
  },
  {
    q: "Wat kost een complete tuinaanleg?",
    a: "Een complete tuinaanleg in Friesland kost gemiddeld €4.500–15.000 voor een middelgrote tuin (100–150m²). Dit is inclusief ontwerp, grondwerk, beplanting en bestrating. Heb je een specifieke wens? Vraag een offerte aan voor een nauwkeurige prijsopgave."
  },
  {
    q: "Zijn er subsidies beschikbaar voor groendaken?",
    a: "Ja, diverse Friese gemeenten bieden subsidie voor groendaken, variërend van €15–35 per m². Leeuwarden, Smallingerland en Súdwest-Fryslân hebben actieve subsidieregelingen. Uw hovenier kan u hierbij adviseren."
  }
];

export default function KostenFAQ() {
  const handleFaqToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    const faqItem = e.currentTarget.parentElement;
    if (!faqItem) return;
    
    const answer = faqItem.querySelector(`.${styles.faqAnswer}`) as HTMLElement;
    const arrow = e.currentTarget.querySelector(`.${styles.faqToggle}`) as HTMLElement;
    const isOpen = answer?.style.maxHeight && answer.style.maxHeight !== '0px';
    
    // Close all FAQ items first
    document.querySelectorAll(`.${styles.faqItem}`).forEach(item => {
      const otherAnswer = item.querySelector(`.${styles.faqAnswer}`) as HTMLElement;
      const otherArrow = item.querySelector(`.${styles.faqToggle}`) as HTMLElement;
      if (item !== faqItem && otherAnswer && otherArrow) {
        otherAnswer.style.maxHeight = '0px';
        otherAnswer.style.opacity = '0';
        otherAnswer.style.padding = '0';
        otherAnswer.style.borderTop = 'none';
        otherAnswer.style.marginTop = '0';
        otherAnswer.classList.remove('expanded');
        otherArrow.style.transform = 'rotate(0deg)';
      }
    });
    
    // Toggle current FAQ
    if (isOpen) {
      if (answer) {
        answer.style.maxHeight = '0px';
        answer.style.opacity = '0';
        answer.style.padding = '0';
        answer.style.borderTop = 'none';
        answer.style.marginTop = '0';
        answer.classList.remove('expanded');
      }
      if (arrow) {
        arrow.style.transform = 'rotate(0deg)';
      }
    } else {
      if (answer) {
        answer.style.maxHeight = '200px';
        answer.style.opacity = '1';
        answer.style.padding = '0.75rem 0 0.25rem 0';
        answer.style.borderTop = '1px solid #f0f4ec';
        answer.style.marginTop = '0.5rem';
        answer.classList.add('expanded');
      }
      if (arrow) {
        arrow.style.transform = 'rotate(180deg)';
      }
    }
  };

  return (
    <div className={styles.faqGrid}>
      {faqData.map((faq, index) => (
        <div key={index} className={styles.faqItem}>
          <div 
            className={styles.faqQuestion} 
            onClick={(e) => handleFaqToggle(e)}
            style={{ cursor: 'pointer' }}
          >
            {faq.q}
            <svg 
              className={styles.faqToggle} 
              viewBox="0 0 24 24"
              style={{
                transform: 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <div 
            className={styles.faqAnswer}
            style={{
              maxHeight: '0px',
              opacity: 0,
              padding: '0',
              margin: '0',
              transition: 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease'
            }}
          >
            {faq.a}
          </div>
        </div>
      ))}
    </div>
  );
}