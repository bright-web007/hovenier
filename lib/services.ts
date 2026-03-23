// lib/services.ts
// Central config for all services offered by gardeners

export interface Service {
  slug: string;
  name: string;
  description: string;
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "tuinonderhoud",
    name: "Tuinonderhoud",
    description: "Regelmatig onderhoud voor een gezonde, nette tuin. Van snoeien tot onkruid verwijderen en gazonverzorging.",
    faqs: [
      { q: "Wat kost tuinonderhoud in [regio]?", a: "De kosten voor tuinonderhoud in [regio] hangen af van de grootte van uw tuin en de gewenste werkzaamheden. Vraag vrijblijvend een offerte aan." },
      { q: "Wanneer is het beste moment voor tuinonderhoud?", a: "Het voorjaar en najaar zijn ideaal voor de meeste onderhoudswerkzaamheden, maar kleine klussen kunnen het hele jaar door." },
    ],
  },
  {
    slug: "tuinaanleg",
    name: "Tuinaanleg",
    description: "Complete aanleg van nieuwe tuinen, inclusief ontwerp, bestrating, beplanting en gazon.",
    faqs: [
      { q: "Hoe lang duurt een tuinaanleg project?", a: "Dit hangt af van de grootte en complexiteit van het ontwerp. Gemiddeld duurt een tuinaanleg 1 tot 3 weken." },
    ],
  },
  {
    slug: "snoeien",
    name: "Snoeien",
    description: "Vakkundig snoeien van bomen, struiken en hagen voor gezonde groei en een mooie uitstraling.",
    faqs: [
      { q: "Wanneer moet ik mijn bomen laten snoeien?", a: "De beste periode voor snoeien verschilt per soort, maar meestal in het najaar of vroege voorjaar." },
    ],
  },
  // ...add more services as needed
];
