/**
 * Centralized business configuration for consistent LocalBusiness schema across all pages
 * This ensures Google receives consistent business information
 */

import { SupportedLocale } from '@/lib/locale-utils';

export interface BusinessAddress {
  streetAddress?: string;
  addressLocality: string;
  postalCode: string;
  addressRegion: string;
  addressCountry: string;
}

export interface BusinessLocation {
  latitude: string;
  longitude: string;
}

export interface LocalBusinessConfig {
  name: string;
  legalName: string;
  description: string;
  address: BusinessAddress;
  location: BusinessLocation;
  serviceArea: {
    name: string;
    type: 'State' | 'Country';
    radius: string; // in meters
  };
  contactInfo: {
    phone?: string;
    email?: string;
    website: string;
  };
  businessHours?: {
    opens: string;
    closes: string;
    dayOfWeek: readonly string[];
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
    worstRating: string;
  };
  coreServices: readonly string[];
  priceRange: string;
  lowPrice: number;
  highPrice: number;
  currenciesAccepted: string;
  paymentAccepted: readonly string[];
}

// Main business configuration - single source of truth
export const HOVENIER_BUSINESS_CONFIG: LocalBusinessConfig = {
  name: "Hovenier.frl - Hoveniers in Friesland",
  legalName: "Hovenier.frl",
  description: "Hoveniers uit heel Friesland - van snel onkruid wieden tot complete tuinmakeovers. Bekijk wie er bij u in de buurt werkt.",
  address: {
    streetAddress: "Hoofdstraat 123",
    addressLocality: "Leeuwarden",
    postalCode: "8900",
    addressRegion: "Friesland", 
    addressCountry: "NL"
  },
  location: {
    latitude: "53.2012",
    longitude: "5.7999"
  },
  serviceArea: {
    name: "Friesland",
    type: "State",
    radius: "50000" // 50km radius
  },
  contactInfo: {
    website: "https://hovenier.frl"
  },
  businessHours: {
    opens: "08:00",
    closes: "18:00", 
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  coreServices: [
    "Tuinonderhoud",
    "Tuinontwerp", 
    "Tuinaanleg",
    "Groendaken",
    "Bestrating",
    "Boomverzorging",
    "Hagen snoeien",
    "Gazons aanleggen"
  ],
  priceRange: "€35-250",
  lowPrice: 35,
  highPrice: 250,
  currenciesAccepted: "EUR",
  paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
  aggregateRating: {
    ratingValue: "4.8",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1"
  }
};

// Service-specific variations while maintaining consistent business info
export const SERVICE_SPECIFIC_CONFIGS = {
  groendak: {
    ...HOVENIER_BUSINESS_CONFIG,
    name: "Groendak Specialisten Friesland - Hovenier.frl",
    description: "Groendakken in Friesland - van simpele sedum tot complete daktuinen. Specialists die weten hoe het klimaat hier werkt.",
    coreServices: [
      "Extensieve groendaken",
      "Intensieve groendaken", 
      "Sedum daken",
      "Daktuin aanleg",
      "Waterafvoer systemen"
    ],
    priceRange: "€85-200",
    lowPrice: 85,
    highPrice: 200
  },
  stratenmaker: {
    ...HOVENIER_BUSINESS_CONFIG,
    name: "Stratenmaker & Bestrating Friesland - Hovenier.frl",
    description: "Bestrating, tegels, opritten - Friese stratenmakers die weten hoe ze het waterdicht krijgen, ook bij ons weer.",
    coreServices: [
      "Bestrating & tegels",
      "Opritten & parkeerplaatsen",
      "Tuinpaden & terrassen", 
      "Keerwanden & borders",
      "Drainage & afwatering",
      "Natuursteen verwerking"
    ],
    priceRange: "€45-150",
    lowPrice: 45,
    highPrice: 150
  },
  tuinonderhoud: {
    ...HOVENIER_BUSINESS_CONFIG,
    name: "Tuinonderhoud Friesland - Hovenier.frl",
    description: "Tuinonderhoud in Friesland - wekelijks, maandelijks of seizoensklussen. Hoveniers die uw tuin het hele jaar door mooi houden.",
    coreServices: [
      "Gazon maaien",
      "Hagen snoeien",
      "Onkruid verwijderen",
      "Bomen snoeien", 
      "Borders onderhouden",
      "Seizoensonderhoud"
    ],
    priceRange: "€35-85",
    lowPrice: 35,
    highPrice: 85
  },
  tuinontwerp: {
    ...HOVENIER_BUSINESS_CONFIG,
    name: "Tuinontwerp Friesland - Hovenier.frl", 
    description: "Tuinontwerp in Friesland - van schets op papier tot 3D plan. Ontwerpers die begrijpen wat er groeit in ons klimaat.",
    coreServices: [
      "Tuinplannen maken",
      "3D visualisaties",
      "Beplantingsplannen",
      "Technische tekeningen",
      "Besteksvoorbereiding",
      "Projectbegeleiding"
    ],
    priceRange: "€250-1500",
    lowPrice: 250,
    highPrice: 1500
  },
  "tuin-aanleggen": {
    ...HOVENIER_BUSINESS_CONFIG,
    name: "Tuin Aanleggen Friesland - Hovenier.frl",
    description: "Nieuwe tuin aanleggen in Friesland - van kale grond tot klaar voor de eerste zomer. Hoveniers die het van A tot Z doen.",
    coreServices: [
      "Complete tuinaanleg", 
      "Gazons aanleggen",
      "Borders aanplanten",
      "Terrassen aanleggen",
      "Water features",
      "Verlichting installeren"
    ],
    priceRange: "€75-200",
    lowPrice: 75,
    highPrice: 200
  },
  // Configuration for individual gardener profile pages
  gardener: {
    ...HOVENIER_BUSINESS_CONFIG,
    name: "Hovenier.frl - Erkende Hoveniers",
    description: "Hoveniers in Friesland voor al uw tuinklusjes - onderhoud, herinrichting, nieuwe aanleg. Bekijk wie er in uw gemeente werkt.",
    priceRange: "€45-120",
    lowPrice: 45,
    highPrice: 120
  }
} as const;

export type ServiceType = keyof typeof SERVICE_SPECIFIC_CONFIGS;

// Helper function to parse price range string into low/high prices
function parsePriceRange(priceRange: string): { lowPrice: number; highPrice: number } {
  // Remove currency symbol and extract numbers
  const numbers = priceRange.replace(/€/g, '').split('-').map(price => parseInt(price.trim()));
  return {
    lowPrice: numbers[0] || 35,
    highPrice: numbers[1] || 250
  };
}

// Helper function to get business config for specific service or general
export function getBusinessConfig(serviceType?: ServiceType): LocalBusinessConfig {
  const baseConfig = serviceType && SERVICE_SPECIFIC_CONFIGS[serviceType] 
    ? SERVICE_SPECIFIC_CONFIGS[serviceType] 
    : HOVENIER_BUSINESS_CONFIG;
    
  const { lowPrice, highPrice } = parsePriceRange(baseConfig.priceRange);
  
  return {
    ...baseConfig,
    lowPrice,
    highPrice
  };
}

// Helper function to get localized business URL
export function getBusinessUrl(path?: string, locale: SupportedLocale = 'nl'): string {
  const baseUrl = HOVENIER_BUSINESS_CONFIG.contactInfo.website;
  const localePath = locale === 'nl' ? '' : '/en';
  return `${baseUrl}${localePath}${path || ''}`;
}