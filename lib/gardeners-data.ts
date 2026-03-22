// Centralized gardener data for the application
// In production, this would come from a database or CMS API

export interface Gardener {
  slug: string
  name: string
  company: string
  location: string
  specialties: string[]
  rating: number
  reviewCount: number
  verified: boolean
  responseTime: string
  startingPrice: number
  availability: 'available' | 'busy'
  description: string
  services: string[]
  contact: {
    phone: string
    email: string
    website: string
  }
}

export const gardeners: Gardener[] = [
  {
    slug: 'tuinservice-friesland',
    name: 'Jan de Vries',
    company: 'TuinService Friesland',
    location: 'Leeuwarden',
    specialties: ['Tuinonderhoud', 'Tuinontwerp', 'Groendak'],
    rating: 4.8,
    reviewCount: 23,
    verified: true,
    responseTime: '< 2 uur',
    startingPrice: 35,
    availability: 'available',
    description: 'Professionele hoveniersdiensten in de regio Leeuwarden. Gespecialiseerd in duurzaam tuinonderhoud en creatief tuinontwerp.',
    services: [
      'Tuinonderhoud en verzorging',
      'Tuinontwerp en realisatie', 
      'Groendaken en sedumdaken',
      'Seizoensklussen',
      'Snoeiwerk en haagverzorging'
    ],
    contact: {
      phone: '+31 58 123 4567',
      email: 'info@tuinservice-friesland.nl',
      website: 'https://tuinservice-friesland.nl'
    }
  },
  {
    slug: 'groene-vingers',
    name: 'Marie Bakker',
    company: 'Groene Vingers',
    location: 'Heerenveen', 
    specialties: ['Tuinontwerp', 'Stratenmaker', 'Tuin Aanleggen'],
    rating: 4.9,
    reviewCount: 41,
    verified: true,
    responseTime: '< 1 uur',
    startingPrice: 40,
    availability: 'available',
    description: 'Creatieve tuinspecialist met 15 jaar ervaring in exclusieve tuinontwerpen en professionele bestratingklussen in Heerenveen en omgeving.',
    services: [
      'Exclusief tuinontwerp',
      'Bestrating en tegels',
      'Tuinaanleg compleet',
      'Waterpartijen en vijvers',
      'Buitenverlichting'
    ],
    contact: {
      phone: '+31 513 987 6543',
      email: 'marie@groenevingers-heerenveen.nl',
      website: 'https://groenevingers-heerenveen.nl'
    }
  },
  {
    slug: 'friese-tuinen',
    name: 'Piet Janssen',
    company: 'Friese Tuinen',
    location: 'Smallingerland',
    specialties: ['Tuinonderhoud', 'Tuin Aanleggen'],
    rating: 4.6,
    reviewCount: 18,
    verified: false,
    responseTime: '< 4 uur',
    startingPrice: 32,
    availability: 'busy',
    description: 'Lokale hovenier gespecialiseerd in natuurlijke tuinen en ecologisch tuinbeheer. Ruim 10 jaar ervaring in Smallingerland.',
    services: [
      'Natuurlijk tuinbeheer',
      'Ecologische tuinaanleg',
      'Boomverzorging',
      'Wildtuin aanleg',
      'Compost en bemesting'
    ],
    contact: {
      phone: '+31 512 345 678',
      email: 'piet@friesetuinen.nl',
      website: 'https://friesetuinen.nl'
    }
  },
  {
    slug: 'duurzame-tuinen',
    name: 'Anna Smit',
    company: 'Duurzame Tuinen',
    location: 'Ooststellingwerf',
    specialties: ['Groendak', 'Tuinontwerp'],
    rating: 4.7,
    reviewCount: 15,
    verified: true,
    responseTime: '< 3 uur',
    startingPrice: 38,
    availability: 'available',
    description: 'Gespecialiseerd in duurzame tuinoplossingen en groendaken. Pionier in milieuvriendelijke tuinconcepten in Ooststellingwerf.',
    services: [
      'Groendaken installatie',
      'Regenwateropvang',
      'Zonnepanelen tuinhuizen',
      'Biodiversiteit tuinen',
      'Duurzame materialenkeuze'
    ],
    contact: {
      phone: '+31 516 789 012',
      email: 'anna@duurzametuinen.nl',
      website: 'https://duurzametuinen.nl'
    }
  },
  {
    slug: 'berg-hoveniers',
    name: 'Tom van der Berg',
    company: 'Berg Hoveniers',
    location: 'Weststellingwerf', 
    specialties: ['Tuinonderhoud', 'Stratenmaker'],
    rating: 4.5,
    reviewCount: 27,
    verified: true,
    responseTime: '< 2 uur',
    startingPrice: 34,
    availability: 'available',
    description: 'Familiebedrijf met meer dan 20 jaar ervaring in tuinonderhoud en bestrating. Betrouwbare partner voor al uw tuinwerkzaamheden.',
    services: [
      'Regulier tuinonderhoud',
      'Opritten en paden',
      'Terras aanleg',
      'Gazons en grasonderhoud',
      'Schuttingen en hekwerk'
    ],
    contact: {
      phone: '+31 561 234 567',
      email: 'tom@berghoveniers.nl',
      website: 'https://berghoveniers.nl'
    }
  }
]

// Helper functions
export function getGardenerBySlug(slug: string): Gardener | undefined {
  return gardeners.find(g => g.slug === slug)
}

export function getAllGardenerSlugs(): string[] {
  return gardeners.map(g => g.slug)
}