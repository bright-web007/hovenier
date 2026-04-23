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
  introEn?: string;
  image?: string;
  cities?: { slug: string; name: string }[];
}

export interface RegionHub {
  slug: string;
  name: string;
  description: string;
  descriptionEn: string;
  gemeentes: Gemeente[];
  totalPopulation: number;
  intro: string;
  introEn: string;
  image: string;
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
    introEn: "Waadhoeke is a coastal municipality with many villages and rural gardens. Gardeners in Waadhoeke specialize in farmyard planting and coastal gardens.",
    cities: [
      { slug: "franeker", name: "Franeker" },
      { slug: "sint-annaparochie", name: "Sint Annaparochie" },
      { slug: "berltsum", name: "Berltsum" },
    ],
  },
  {
    slug: "harlingen",
    name: "Harlingen",
    population: 16000,
    lat: 53.1745,
    lng: 5.4228,
    nearby: ["franeker", "leeuwarden", "makkum"],
    intro: "Harlingen is een historische havenstad aan de Waddenzee, bekend om haar maritieme sfeer en karakteristieke stadstuinen. Hoveniers in Harlingen zijn vertrouwd met de unieke omstandigheden van kusttuinen en stadsgroen.",
    introEn: "Harlingen is a historic port city on the Wadden Sea, known for its maritime atmosphere and characteristic city gardens. Gardeners in Harlingen are familiar with the unique conditions of coastal and urban gardens.",
  },
  {
    slug: "vlieland",
    name: "Vlieland",
    population: 1100,
    lat: 53.2941,
    lng: 5.0628,
    nearby: ["terschelling", "harlingen"],
    intro: "Vlieland is een uniek Waddeneiland met bijzondere tuinuitdagingen door zout, wind en zand. Hoveniers hier zijn gespecialiseerd in kustresistente beplanting en eilandtuinen.",
    introEn: "Vlieland is a unique Wadden Island with special gardening challenges due to salt, wind and sand. Gardeners here specialize in coast-resistant planting and island gardens.",
  },
  {
    slug: "terschelling",
    name: "Terschelling",
    population: 4900,
    lat: 53.3992,
    lng: 5.2140,
    nearby: ["vlieland", "ameland"],
    intro: "Terschelling biedt unieke tuinmogelijkheden op het Waddeneiland. Hoveniers zijn ervaren met zoutbestendige planten en de uitdagingen van eilandtuinieren.",
    introEn: "Terschelling offers unique gardening opportunities on the Wadden Island. Gardeners are experienced with salt-resistant plants and the challenges of island gardening.",
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
    introEn: "Noardeast-Fryslân is a region with many traditional Frisian gardens and villages. Gardeners here are familiar with farmyard planting and regional garden design.",
    cities: [
      { slug: "dokkum", name: "Dokkum" },
      { slug: "kollum", name: "Kollum" },
      { slug: "hallum", name: "Hallum" },
    ],
  },
  {
    slug: "achtkarspelen",
    name: "Achtkarspelen",
    population: 28000,
    lat: 53.2333,
    lng: 6.1333,
    nearby: ["drachten", "tietjerksteradeel", "noardeast-fryslan"],
    intro: "Achtkarspelen is een landelijke gemeente met veel boerderijen en grote tuinen. Hoveniers hier zijn vertrouwd met erfbeplanting en landelijke tuinen.",
    introEn: "Achtkarspelen is a rural municipality with many farms and large gardens. Gardeners here are familiar with farmyard planting and rural gardens.",
  },
  {
    slug: "dantumadeel",
    name: "Dantumadeel",
    population: 19000,
    lat: 53.2833,
    lng: 5.9833,
    nearby: ["tietjerksteradeel", "noardeast-fryslan", "leeuwarden"],
    intro: "Dantumadeel is een kleinere gemeente van Friesland, met veel persoonlijke service van lokale hoveniers. Hier vind je vooral landelijke tuinen en dorpsgroen.",
    introEn: "Dantumadeel is a smaller municipality in Friesland, with plenty of personal service from local gardeners. Here you will find mainly rural gardens and village greenery.",
    cities: [
      { slug: "damwald", name: "Damwâld" },
      { slug: "feanwalden", name: "Feanwâlden" },
      { slug: "de-westereen", name: "De Westereen" },
    ],
  },
  {
    slug: "ameland",
    name: "Ameland",
    population: 3700,
    lat: 53.4503,
    lng: 5.7739,
    nearby: ["terschelling", "schiermonnikoog"],
    intro: "Ameland is een prachtig Waddeneiland met unieke tuinuitdagingen. Hoveniers zijn gespecialiseerd in eilandtuinen en zoutbestendige beplanting.",
    introEn: "Ameland is a beautiful Wadden Island with unique gardening challenges. Gardeners specialize in island gardens and salt-resistant planting.",
  },
  {
    slug: "schiermonnikoog",
    name: "Schiermonnikoog",
    population: 950,
    lat: 53.4894,
    lng: 6.1597,
    nearby: ["ameland"],
    intro: "Schiermonnikoog is het kleinste bewoonde Waddeneiland met unieke natuurrijke tuinen. Hoveniers hier werken met respect voor de bijzondere eilandnatuur.",
    introEn: "Schiermonnikoog is the smallest inhabited Wadden Island with unique nature-rich gardens. Gardeners here work with respect for the special island nature.",
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
    introEn: "Smallingerland, with Drachten as its center, offers a mix of urban and rural gardens. Local gardeners know the variation in soil and garden preferences well.",
    cities: [
      { slug: "drachten", name: "Drachten" },
      { slug: "boornbergum", name: "Boornbergum" },
      { slug: "opeinde", name: "Opeinde" },
    ],
  },
  {
    slug: "opsterland",
    name: "Opsterland",
    population: 29000,
    lat: 53.0424,
    lng: 6.2019,
    nearby: ["ooststellingwerf", "heerenveen"],
    intro: "Opsterland is een bosrijke gemeente met veel natuurlijke tuinen. Hoveniers hier zijn ervaren met bosbeplanting en natuurvriendelijk tuinontwerp.",
    introEn: "Opsterland is a forested municipality with many natural gardens. Gardeners here are experienced with forest planting and nature-friendly garden design.",
    cities: [
      { slug: "gorredijk", name: "Gorredijk" },
      { slug: "beetsterzwaag", name: "Beetsterzwaag" },
      { slug: "ureterp", name: "Ureterp" },
    ],
  },
  {
    slug: "ooststellingwerf",
    name: "Ooststellingwerf",
    population: 25000,
    lat: 52.9167,
    lng: 6.1167,
    nearby: ["opsterland", "weststellingwerf"],
    intro: "Ooststellingwerf grenst aan Drenthe en heeft veel natuur. Hoveniers zijn gespecialiseerd in bostuinen en natuurlijke beplanting.",
    introEn: "Ooststellingwerf borders Drenthe and has abundant nature. Gardeners specialize in forest gardens and natural planting.",
    cities: [
      { slug: "oosterwolde", name: "Oosterwolde" },
      { slug: "appelscha", name: "Appelscha" },
      { slug: "haulerwijk", name: "Haulerwijk" },
    ],
  },
  {
    slug: "weststellingwerf",
    name: "Weststellingwerf",
    population: 25000,
    lat: 52.8833,
    lng: 5.9167,
    nearby: ["ooststellingwerf", "heerenveen"],
    intro: "Weststellingwerf is een groene gemeente met veel landelijke erven. Hoveniers hier zijn vertrouwd met grote tuinen en erfbeplanting.",
    introEn: "Weststellingwerf is a green municipality with many rural farmsteads. Gardeners here are familiar with large gardens and farmyard planting.",
    cities: [
      { slug: "wolvega", name: "Wolvega" },
      { slug: "noordwolde", name: "Noordwolde" },
      { slug: "oldeberkoop", name: "Oldeberkoop" },
    ],
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
    introEn: "Súdwest-Fryslân is the largest municipality in Friesland, with many rural gardens and sprawling villages. Gardeners here specialize in large gardens and farmyard planting.",
    cities: [
      { slug: "sneek", name: "Sneek" },
      { slug: "bolsward", name: "Bolsward" },
      { slug: "workum", name: "Workum" },
    ],
  },
  {
    slug: "heerenveen",
    name: "Heerenveen",
    population: 50000,
    lat: 52.9590,
    lng: 5.9185,
    nearby: ["joure", "sneek", "drachten"],
    intro: "Heerenveen staat bekend als sportstad, maar ook om haar groene woonwijken en fraaie tuinen. Hoveniers in Heerenveen bieden maatwerk voor zowel stadstuinen als landelijke erven.",
    introEn: "Heerenveen is known as a sports city, but also for its green residential areas and beautiful gardens. Gardeners in Heerenveen offer custom solutions for both city gardens and rural farmsteads.",
  },
  {
    slug: "de-fryske-marren",
    name: "De Fryske Marren",
    population: 51000,
    lat: 52.9167,
    lng: 5.7500,
    nearby: ["joure", "lemmer", "sneek"],
    intro: "De Fryske Marren is een waterrijke gemeente met veel recreatietuinen en unieke tuinuitdagingen. Hoveniers zijn hier ervaren met waterbeheer en recreatiegroen.",
    introEn: "De Fryske Marren is a water-rich municipality with many recreational gardens and unique gardening challenges. Gardeners here are experienced with water management and recreational greenery.",
    cities: [
      { slug: "joure", name: "Joure" },
      { slug: "lemmer", name: "Lemmer" },
      { slug: "sint-nicolaasga", name: "Sint Nicolaasga" },
    ],
  },
  {
    slug: "tietjerksteradeel",
    name: "Tietjerksteradeel",
    population: 25000,
    lat: 53.2167,
    lng: 5.9833,
    nearby: ["leeuwarden", "smallingerland", "dantumadeel"],
    intro: "Tietjerksteradeel is een groene gemeente tussen Leeuwarden en Groningen, met veel natuur en ruime tuinen. Hoveniers zijn hier bekend met natuurvriendelijk tuinieren.",
    introEn: "Tietjerksteradeel is a green municipality between Leeuwarden and Groningen, with abundant nature and spacious gardens. Gardeners here are known for nature-friendly gardening.",
    cities: [
      { slug: "burgum", name: "Burgum" },
      { slug: "garyp", name: "Garyp" },
      { slug: "oentsjerk", name: "Oentsjerk" },
    ],
  },

  // Leeuwarden (standalone)
  {
    slug: "leeuwarden",
    name: "Leeuwarden",
    population: 123000,
    lat: 53.2012,
    lng: 5.7999,
    image: "https://images.unsplash.com/photo-1696665482299-fc162ff54ce0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    nearby: ["sneek", "drachten", "franeker"],
    intro: "Leeuwarden is de bruisende hoofdstad van Friesland, bekend om haar historische binnenstad, groene parken en karakteristieke stadstuinen. Hier vind je hoveniers die gespecialiseerd zijn in zowel moderne stadstuinen als klassieke Friese tuinen.",
    introEn: "Leeuwarden is the vibrant capital of Friesland, known for its historic city center, green parks and characteristic city gardens. Here you will find gardeners who specialize in both modern city gardens and classic Frisian gardens.",
    cities: [
      { slug: "leeuwarden", name: "Leeuwarden" },
    ],
  },
];

export const regionHubs: RegionHub[] = [
  {
    slug: "noordwest-friesland",
    name: "Noordwest-Friesland",
    description: "Kustgebied met historische steden en Waddeneilanden",
    descriptionEn: "Coastal area with historic cities and Wadden Islands",
    image: "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=800&q=80", // coastal/wadden landscape
    gemeentes: gemeentesData.filter(g => ["waadhoeke", "harlingen", "vlieland", "terschelling"].includes(g.slug)),
    totalPopulation: 67000,
    intro: "Noordwest-Friesland combineert de rijke historie van Harlingen met de unieke natuurschoon van de Waddeneilanden Vlieland en Terschelling.",
    introEn: "Northwest Friesland combines the rich history of Harlingen with the unique natural beauty of the Wadden Islands Vlieland and Terschelling.",
  },
  {
    slug: "noordoost-friesland",
    name: "Noordoost-Friesland",
    description: "Landelijke regio met traditionele dorpen en Waddeneilanden",
    descriptionEn: "Rural region with traditional villages and Wadden Islands",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80", // rural dutch village landscape
    gemeentes: gemeentesData.filter(g => ["noardeast-fryslan", "achtkarspelen", "dantumadeel", "ameland", "schiermonnikoog"].includes(g.slug)),
    totalPopulation: 96650,
    intro: "Noordoost-Friesland staat bekend om haar authentieke Friese dorpen, uitgestrekte landschappen en de bijzondere Waddeneilanden Ameland en Schiermonnikoog.",
    introEn: "Northeast Friesland is known for its authentic Frisian villages, vast landscapes and the special Wadden Islands Ameland and Schiermonnikoog.",
  },
  {
    slug: "centraal-friesland",
    name: "Centraal-Friesland",
    description: "Groene regio met bossen en natuurgebieden",
    descriptionEn: "Green region with forests and nature reserves",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", // forest/nature
    gemeentes: gemeentesData.filter(g => ["smallingerland", "opsterland", "ooststellingwerf", "weststellingwerf"].includes(g.slug)),
    totalPopulation: 135000,
    intro: "Centraal-Friesland is het groene hart van de provincie, met uitgestrekte bossen, natuurgebieden en de dynamische gemeente Smallingerland.",
    introEn: "Central Friesland is the green heart of the province, with vast forests, nature reserves and the dynamic municipality of Smallingerland.",
  },
  {
    slug: "zuidwest-friesland",
    name: "Zuidwest-Friesland",
    description: "Waterrijke regio met meren en sportvoorzieningen",
    descriptionEn: "Water-rich region with lakes and sports facilities", 
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80", // lakes/watersport
    gemeentes: gemeentesData.filter(g => ["sudwest-fryslan", "heerenveen", "de-fryske-marren", "tietjerksteradeel"].includes(g.slug)),
    totalPopulation: 215000,
    intro: "Zuidwest-Friesland is de waterrijke regio van Friesland, bekend om de Friese meren, watersport en de sportstad Heerenveen.",
    introEn: "Southwest Friesland is the water-rich region of Friesland, known for the Frisian lakes, water sports and the sports city Heerenveen.",
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