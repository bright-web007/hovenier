// lib/regions-hierarchy.ts
// Hierarchical structure for Friesland regions and municipalities

export interface Gemeente {
  slug: string;
  name: string;
  population: number;
  lat: number;
  lng: number;
  nearby: string[];
  intro: string;
}

export interface RegionHub {
  slug: string;
  name: string;
  description: string;
  gemeentes: Gemeente[];
  totalPopulation: number;
  intro: string;
}

export const gemeentesData: Gemeente[] = [
  // Noordwest-Friesland
  {
    slug: "waadhoeke",
    name: "Waadhoeke",
    population: 46000,
    lat: 53.2167,
    lng: 5.5333,
    nearby: ["franeker", "harlingen", "leeuwarden"],
    intro: "Waadhoeke is een kustgemeente met veel dorpen en landelijke tuinen. Hoveniers in Waadhoeke zijn gespecialiseerd in erfbeplanting en kusttuinen.",
  },
  {
    slug: "harlingen",
    name: "Harlingen",
    population: 16000,
    lat: 53.1745,
    lng: 5.4228,
    nearby: ["franeker", "leeuwarden", "makkum"],
    intro: "Harlingen is een historische havenstad aan de Waddenzee, bekend om haar maritieme sfeer en karakteristieke stadstuinen. Hoveniers in Harlingen zijn vertrouwd met de unieke omstandigheden van kusttuinen en stadsgroen.",
  },
  {
    slug: "vlieland",
    name: "Vlieland",
    population: 1100,
    lat: 53.2941,
    lng: 5.0628,
    nearby: ["terschelling", "harlingen"],
    intro: "Vlieland is een uniek Waddeneiland met bijzondere tuinuitdagingen door zout, wind en zand. Hoveniers hier zijn gespecialiseerd in kustresistente beplanting en eilandtuinen.",
  },
  {
    slug: "terschelling",
    name: "Terschelling",
    population: 4900,
    lat: 53.3992,
    lng: 5.2140,
    nearby: ["vlieland", "ameland"],
    intro: "Terschelling biedt unieke tuinmogelijkheden op het Waddeneiland. Hoveniers zijn ervaren met zoutbestendige planten en de uitdagingen van eilandtuinieren.",
  },

  // Noordoost-Friesland
  {
    slug: "noardeast-fryslan",
    name: "Noardeast-Fryslân",
    population: 45000,
    lat: 53.3333,
    lng: 6.0000,
    nearby: ["dokkum", "dantumadeel", "achtkarspelen"],
    intro: "Noardeast-Fryslân is een regio met veel traditionele Friese tuinen en dorpen. Hoveniers zijn hier vertrouwd met erfbeplanting en streekgebonden tuinontwerp.",
  },
  {
    slug: "achtkarspelen",
    name: "Achtkarspelen",
    population: 28000,
    lat: 53.2333,
    lng: 6.1333,
    nearby: ["drachten", "tietjerksteradeel", "noardeast-fryslan"],
    intro: "Achtkarspelen is een landelijke gemeente met veel boerderijen en grote tuinen. Hoveniers hier zijn vertrouwd met erfbeplanting en landelijke tuinen.",
  },
  {
    slug: "dantumadeel",
    name: "Dantumadeel",
    population: 19000,
    lat: 53.2833,
    lng: 5.9833,
    nearby: ["tietjerksteradeel", "noardeast-fryslan", "leeuwarden"],
    intro: "Dantumadeel is een kleinere gemeente van Friesland, met veel persoonlijke service van lokale hoveniers. Hier vind je vooral landelijke tuinen en dorpsgroen.",
  },
  {
    slug: "ameland",
    name: "Ameland",
    population: 3700,
    lat: 53.4503,
    lng: 5.7739,
    nearby: ["terschelling", "schiermonnikoog"],
    intro: "Ameland is een prachtig Waddeneiland met unieke tuinuitdagingen. Hoveniers zijn gespecialiseerd in eilandtuinen en zoutbestendige beplanting.",
  },
  {
    slug: "schiermonnikoog",
    name: "Schiermonnikoog",
    population: 950,
    lat: 53.4894,
    lng: 6.1597,
    nearby: ["ameland"],
    intro: "Schiermonnikoog is het kleinste bewoonde Waddeneiland met unieke natuurrijke tuinen. Hoveniers hier werken met respect voor de bijzondere eilandnatuur.",
  },

  // Centraal-Friesland
  {
    slug: "smallingerland",
    name: "Smallingerland",
    population: 56000,
    lat: 53.1125,
    lng: 6.0986,
    nearby: ["drachten", "leeuwarden", "tietjerksteradeel"],
    intro: "Smallingerland, met Drachten als centrum, biedt een mix van stedelijke en landelijke tuinen. Lokale hoveniers kennen de variatie in bodem en tuinwensen goed.",
  },
  {
    slug: "opsterland",
    name: "Opsterland",
    population: 29000,
    lat: 53.0424,
    lng: 6.2019,
    nearby: ["ooststellingwerf", "heerenveen"],
    intro: "Opsterland is een bosrijke gemeente met veel natuurlijke tuinen. Hoveniers hier zijn ervaren met bosbeplanting en natuurvriendelijk tuinontwerp.",
  },
  {
    slug: "ooststellingwerf",
    name: "Ooststellingwerf",
    population: 25000,
    lat: 52.9167,
    lng: 6.1167,
    nearby: ["opsterland", "weststellingwerf"],
    intro: "Ooststellingwerf grenst aan Drenthe en heeft veel natuur. Hoveniers zijn gespecialiseerd in bostuinen en natuurlijke beplanting.",
  },
  {
    slug: "weststellingwerf",
    name: "Weststellingwerf",
    population: 25000,
    lat: 52.8833,
    lng: 5.9167,
    nearby: ["ooststellingwerf", "heerenveen"],
    intro: "Weststellingwerf is een groene gemeente met veel landelijke erven. Hoveniers hier zijn vertrouwd met grote tuinen en erfbeplanting.",
  },

  // Zuidwest-Friesland
  {
    slug: "sudwest-fryslan",
    name: "Súdwest-Fryslân",
    population: 89000,
    lat: 53.0266,
    lng: 5.5292,
    nearby: ["sneek", "workum", "bolsward"],
    intro: "Súdwest-Fryslân is de grootste gemeente van Friesland, met veel landelijke tuinen en uitgestrekte dorpen. Hoveniers hier zijn gespecialiseerd in grote tuinen en erfbeplanting.",
  },
  {
    slug: "heerenveen",
    name: "Heerenveen",
    population: 50000,
    lat: 52.9590,
    lng: 5.9185,
    nearby: ["joure", "sneek", "drachten"],
    intro: "Heerenveen staat bekend als sportstad, maar ook om haar groene woonwijken en fraaie tuinen. Hoveniers in Heerenveen bieden maatwerk voor zowel stadstuinen als landelijke erven.",
  },
  {
    slug: "de-fryske-marren",
    name: "De Fryske Marren",
    population: 51000,
    lat: 52.9167,
    lng: 5.7500,
    nearby: ["joure", "lemmer", "sneek"],
    intro: "De Fryske Marren is een waterrijke gemeente met veel recreatietuinen en unieke tuinuitdagingen. Hoveniers zijn hier ervaren met waterbeheer en recreatiegroen.",
  },
  {
    slug: "tietjerksteradeel",
    name: "Tietjerksteradeel",
    population: 25000,
    lat: 53.2167,
    lng: 5.9833,
    nearby: ["leeuwarden", "smallingerland", "dantumadeel"],
    intro: "Tietjerksteradeel is een groene gemeente tussen Leeuwarden en Groningen, met veel natuur en ruime tuinen. Hoveniers zijn hier bekend met natuurvriendelijk tuinieren.",
  },

  // Leeuwarden (standalone)
  {
    slug: "leeuwarden",
    name: "Leeuwarden",
    population: 123000,
    lat: 53.2012,
    lng: 5.7999,
    nearby: ["sneek", "drachten", "franeker"],
    intro: "Leeuwarden is de bruisende hoofdstad van Friesland, bekend om haar historische binnenstad, groene parken en karakteristieke stadstuinen. Hier vind je hoveniers die gespecialiseerd zijn in zowel moderne stadstuinen als klassieke Friese tuinen.",
  },
];

export const regionHubs: RegionHub[] = [
  {
    slug: "noordwest-friesland",
    name: "Noordwest-Friesland",
    description: "Kustgebied met historische steden en Waddeneilanden",
    gemeentes: gemeentesData.filter(g => ["waadhoeke", "harlingen", "vlieland", "terschelling"].includes(g.slug)),
    totalPopulation: 67000,
    intro: "Noordwest-Friesland combineert de rijke historie van Harlingen met de unieke natuurschoon van de Waddeneilanden Vlieland en Terschelling.",
  },
  {
    slug: "noordoost-friesland", 
    name: "Noordoost-Friesland",
    description: "Landelijke regio met traditionele dorpen en Waddeneilanden",
    gemeentes: gemeentesData.filter(g => ["noardeast-fryslan", "achtkarspelen", "dantumadeel", "ameland", "schiermonnikoog"].includes(g.slug)),
    totalPopulation: 96650,
    intro: "Noordoost-Friesland staat bekend om haar authentieke Friese dorpen, uitgestrekte landschappen en de bijzondere Waddeneilanden Ameland en Schiermonnikoog.",
  },
  {
    slug: "centraal-friesland",
    name: "Centraal-Friesland", 
    description: "Groene regio met bossen en natuurgebieden",
    gemeentes: gemeentesData.filter(g => ["smallingerland", "opsterland", "ooststellingwerf", "weststellingwerf"].includes(g.slug)),
    totalPopulation: 135000,
    intro: "Centraal-Friesland is het groene hart van de provincie, met uitgestrekte bossen, natuurgebieden en de dynamische gemeente Smallingerland.",
  },
  {
    slug: "zuidwest-friesland",
    name: "Zuidwest-Friesland",
    description: "Waterrijke regio met meren en sportvoorzieningen", 
    gemeentes: gemeentesData.filter(g => ["sudwest-fryslan", "heerenveen", "de-fryske-marren", "tietjerksteradeel"].includes(g.slug)),
    totalPopulation: 215000,
    intro: "Zuidwest-Friesland is de waterrijke regio van Friesland, bekend om de Friese meren, watersport en de sportstad Heerenveen.",
  },
];

// Standalone regions (not part of a hub)
export const standaloneRegions = gemeentesData.filter(g => g.slug === "leeuwarden");

// Helper functions
export function getGemeenteBySlug(slug: string): Gemeente | undefined {
  return gemeentesData.find(g => g.slug === slug);
}

export function getRegionHubBySlug(slug: string): RegionHub | undefined {
  return regionHubs.find(r => r.slug === slug);
}

export function getGemeentesByRegionSlug(regionSlug: string): Gemeente[] {
  const hub = regionHubs.find(r => r.slug === regionSlug);
  return hub ? hub.gemeentes : [];
}

export function getRegionSlugByGemeenteSlug(gemeenteSlug: string): string | null {
  for (const hub of regionHubs) {
    if (hub.gemeentes.some(g => g.slug === gemeenteSlug)) {
      return hub.slug;
    }
  }
  // Check if it's Leeuwarden (standalone)
  if (gemeenteSlug === "leeuwarden") {
    return "leeuwarden";
  }
  return null;
}

export function getAllGemeentes(): Gemeente[] {
  return gemeentesData;
}

export function getAllRegionHubs(): RegionHub[] {
  return regionHubs;
}