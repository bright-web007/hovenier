// lib/regions.ts
// Central config for all regions (cities/municipalities)

export interface Region {
  slug: string;
  name: string;
  province: string;
  population: number;
  lat: number;
  lng: number;
  nearby: string[];
  intro: string; // AI-generated or hand-written unique intro
}

export const regions: Region[] = [
  {
    slug: "leeuwarden",
    name: "Leeuwarden",
    province: "Friesland",
    population: 123000,
    lat: 53.2012,
    lng: 5.7999,
    nearby: ["sneek", "drachten", "franeker"],
    intro: "Leeuwarden is de bruisende hoofdstad van Friesland, bekend om haar historische binnenstad, groene parken en karakteristieke stadstuinen. Hier vind je hoveniers die gespecialiseerd zijn in zowel moderne stadstuinen als klassieke Friese tuinen.",
  },
  {
    slug: "drachten",
    name: "Drachten",
    province: "Friesland",
    population: 45000,
    lat: 53.1125,
    lng: 6.0986,
    nearby: ["leeuwarden", "heerenveen", "burgum"],
    intro: "Drachten is een dynamische plaats in het hart van Friesland, met veel gezinswoningen en ruime tuinen. Lokale hoveniers kennen de typische bodem en tuinwensen van deze regio.",
  },
  {
    slug: "heerenveen",
    name: "Heerenveen",
    province: "Friesland",
    population: 32000,
    lat: 52.9590,
    lng: 5.9185,
    nearby: ["joure", "sneek", "drachten"],
    intro: "Heerenveen staat bekend als sportstad, maar ook om haar groene woonwijken en fraaie tuinen. Hoveniers in Heerenveen bieden maatwerk voor zowel stadstuinen als landelijke erven.",
  },
  {
    slug: "harlingen",
    name: "Harlingen",
    province: "Friesland",
    population: 16000,
    lat: 53.1745,
    lng: 5.4228,
    nearby: ["franeker", "leeuwarden", "makkum"],
    intro: "Harlingen is een historische havenstad aan de Waddenzee, bekend om haar maritieme sfeer en karakteristieke stadstuinen. Hoveniers in Harlingen zijn vertrouwd met de unieke omstandigheden van kusttuinen en stadsgroen.",
  },
  {
    slug: "sudwest-fryslan",
    name: "Súdwest-Fryslân",
    province: "Friesland",
    population: 89000,
    lat: 53.0266,
    lng: 5.5292,
    nearby: ["sneek", "workum", "bolsward"],
    intro: "Súdwest-Fryslân is de grootste gemeente van Friesland, met veel landelijke tuinen en uitgestrekte dorpen. Hoveniers hier zijn gespecialiseerd in grote tuinen en erfbeplanting.",
  },
  {
    slug: "smallingerland",
    name: "Smallingerland",
    province: "Friesland",
    population: 56000,
    lat: 53.1125,
    lng: 6.0986,
    nearby: ["drachten", "leeuwarden", "tietjerksteradiel"],
    intro: "Smallingerland, met Drachten als centrum, biedt een mix van stedelijke en landelijke tuinen. Lokale hoveniers kennen de variatie in bodem en tuinwensen goed.",
  },
  {
    slug: "sneek",
    name: "Sneek",
    province: "Friesland",
    population: 34000,
    lat: 53.0333,
    lng: 5.6667,
    nearby: ["sudwest-fryslan", "joure", "bolsward"],
    intro: "Sneek is bekend om haar water, historische binnenstad en compacte stadstuinen. Hoveniers in Sneek zijn ervaren met stadsgroen en waterrijke tuinen.",
  },
  {
    slug: "franeker",
    name: "Franeker",
    province: "Friesland",
    population: 13000,
    lat: 53.1866,
    lng: 5.5376,
    nearby: ["harlingen", "leeuwarden", "waadhoeke"],
    intro: "Franeker is een historische universiteitsstad met veel karakteristieke tuinen. Hoveniers in Franeker zijn vertrouwd met monumentale tuinen en stadsgroen.",
  },
  {
    slug: "waadhoeke",
    name: "Waadhoeke",
    province: "Friesland",
    population: 46000,
    lat: 53.2167,
    lng: 5.5333,
    nearby: ["franeker", "harlingen", "leeuwarden"],
    intro: "Waadhoeke is een kustgemeente met veel dorpen en landelijke tuinen. Hoveniers in Waadhoeke zijn gespecialiseerd in erfbeplanting en kusttuinen.",
  },
  {
    slug: "achtkarspelen",
    name: "Achtkarspelen",
    province: "Friesland",
    population: 28000,
    lat: 53.2333,
    lng: 6.1333,
    nearby: ["drachten", "tietjerksteradiel", "noardeast-fryslan"],
    intro: "Achtkarspelen is een landelijke gemeente met veel boerderijen en grote tuinen. Hoveniers hier zijn vertrouwd met erfbeplanting en landelijke tuinen.",
  },
  {
    slug: "tietjerksteradiel",
    name: "Tietjerksteradiel",
    province: "Friesland",
    population: 25000,
    lat: 53.2167,
    lng: 5.9833,
    nearby: ["leeuwarden", "smallingerland", "dantumadiel"],
    intro: "Tietjerksteradiel is een groene gemeente tussen Leeuwarden en Groningen, met veel natuur en ruime tuinen. Hoveniers zijn hier bekend met natuurvriendelijk tuinieren.",
  },
  {
    slug: "dantumadiel",
    name: "Dantumadiel",
    province: "Friesland",
    population: 19000,
    lat: 53.2833,
    lng: 5.9833,
    nearby: ["tietjerksteradiel", "noardeast-fryslan", "leeuwarden"],
    intro: "Dantumadiel is de kleinste gemeente van Friesland, met veel persoonlijke service van lokale hoveniers. Hier vind je vooral landelijke tuinen en dorpsgroen.",
  },
  {
    slug: "de-fryske-marren",
    name: "De Fryske Marren",
    province: "Friesland",
    population: 51000,
    lat: 52.9167,
    lng: 5.7500,
    nearby: ["joure", "lemmer", "sneek"],
    intro: "De Fryske Marren is een waterrijke gemeente met veel recreatietuinen en unieke tuinuitdagingen. Hoveniers zijn hier ervaren met waterbeheer en recreatiegroen.",
  },
  {
    slug: "noardeast-fryslan",
    name: "Noardeast-Fryslân",
    province: "Friesland",
    population: 45000,
    lat: 53.3333,
    lng: 6.0000,
    nearby: ["dokkum", "dantumadiel", "achtkarspelen"],
    intro: "Noardeast-Fryslân is een regio met veel traditionele Friese tuinen en dorpen. Hoveniers zijn hier vertrouwd met erfbeplanting en streekgebonden tuinontwerp.",
  },
  // ...add more regions as needed
];
