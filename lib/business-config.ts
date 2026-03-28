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
  description: "Professionele hoveniersdiensten in heel Friesland. Van tuinonderhoud tot complete tuinaanleg door erkende hoveniers.",
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
  paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"]
};

// Service-specific variations while maintaining consistent business info
export const SERVICE_SPECIFIC_CONFIGS = {
  groendak: {
    ...HOVENIER_BUSINESS_CONFIG,
    name: "Groendak Specialisten Friesland - Hovenier.frl",
    description: "Professionele groendak installatie in Friesland. Extensief en intensief groendak aanleg door specialisten.",
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
    description: "Professionele bestratingswerken en hardscaping diensten door erkende stratenmakers in Friesland.",
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
    description: "Professioneel tuinonderhoud in Friesland. Regelmatig onderhoud door ervaren hoveniers voor een perfect verzorgde tuin.",
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
    description: "Professioneel tuinontwerp in Friesland. Complete tuinplannen door ervaren tuinarchitecten en hoveniers.",
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
    description: "Complete tuinaanleg in Friesland. Van ontwerp tot realisatie door professionele hoveniers.",
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
    description: "Ervaren hoveniers in Friesland voor al uw tuinonderhoud, tuinontwerp en tuinaanleg.",
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