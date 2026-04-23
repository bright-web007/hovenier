import Ajv from 'ajv';

/**
 * Schema validation utilities for testing structured data
 */

// JSON Schema for LocalBusiness structured data validation
export const LOCAL_BUSINESS_SCHEMA = {
  type: 'object',
  properties: {
    '@context': { 
      type: 'string',
      enum: ['https://schema.org'] 
    },
    '@type': { 
      type: 'string',
      enum: ['LocalBusiness'] 
    },
    '@id': { 
      type: 'string',
      format: 'uri' 
    },
    name: { 
      type: 'string',
      minLength: 1 
    },
    legalName: { 
      type: 'string',
      minLength: 1 
    },
    description: { 
      type: 'string',
      minLength: 1 
    },
    url: { 
      type: 'string',
      format: 'uri' 
    },
    sameAs: {
      type: 'array',
      items: { type: 'string', format: 'uri' }
    },
    priceRange: { 
      type: 'string',
      pattern: '^€\\d+-\\d+$' 
    },
    currenciesAccepted: { 
      type: 'string',
      enum: ['EUR'] 
    },
    paymentAccepted: {
      type: 'array',
      items: { type: 'string' }
    },
    address: {
      type: 'object',
      properties: {
        '@type': { 
          type: 'string',
          enum: ['PostalAddress'] 
        },
        addressLocality: { 
          type: 'string',
          minLength: 1 
        },
        postalCode: { 
          type: 'string',
          pattern: '^\\d{4}$' 
        },
        addressRegion: { 
          type: 'string',
          enum: ['Friesland'] 
        },
        addressCountry: { 
          type: 'string',
          enum: ['NL'] 
        }
      },
      required: ['@type', 'addressLocality', 'postalCode', 'addressRegion', 'addressCountry']
    },
    geo: {
      type: 'object',
      properties: {
        '@type': { 
          type: 'string',
          enum: ['GeoCoordinates'] 
        },
        latitude: { 
          type: 'string',
          pattern: '^\\d{2}\\.\\d+$'
        },
        longitude: { 
          type: 'string',
          pattern: '^\\d\\.\\d+$'
        }
      },
      required: ['@type', 'latitude', 'longitude']
    },
    areaServed: {
      type: 'object',
      properties: {
        '@type': { 
          type: 'string',
          enum: ['State'] 
        },
        name: { 
          type: 'string',
          enum: ['Friesland'] 
        },
        containedInPlace: {
          type: 'object',
          properties: {
            '@type': { 
              type: 'string',
              enum: ['Country'] 
            },
            name: { 
              type: 'string',
              enum: ['Nederland'] 
            }
          },
          required: ['@type', 'name']
        }
      },
      required: ['@type', 'name', 'containedInPlace']
    },
    serviceArea: {
      type: 'object',
      properties: {
        '@type': { 
          type: 'string',
          enum: ['GeoCircle'] 
        },
        geoMidpoint: {
          type: 'object',
          properties: {
            '@type': { 
              type: 'string',
              enum: ['GeoCoordinates'] 
            },
            latitude: { type: 'string' },
            longitude: { type: 'string' }
          },
          required: ['@type', 'latitude', 'longitude']
        },
        geoRadius: { 
          type: 'string',
          pattern: '^\\d+$' 
        }
      },
      required: ['@type', 'geoMidpoint', 'geoRadius']
    },
    hasOfferCatalog: {
      type: 'object',
      properties: {
        '@type': { 
          type: 'string',
          enum: ['OfferCatalog'] 
        },
        name: { 
          type: 'string',
          enum: ['Hoveniersdiensten'] 
        },
        itemListElement: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              '@type': { 
                type: 'string',
                enum: ['Offer'] 
              },
              '@id': { 
                type: 'string',
                format: 'uri' 
              },
              itemOffered: {
                type: 'object',
                properties: {
                  '@type': { 
                    type: 'string',
                    enum: ['Service'] 
                  },
                  name: { 
                    type: 'string',
                    minLength: 1 
                  },
                  provider: {
                    type: 'object',
                    properties: {
                      '@type': { 
                        type: 'string',
                        enum: ['LocalBusiness'] 
                      },
                      '@id': { 
                        type: 'string',
                        format: 'uri' 
                      },
                      name: { type: 'string' }
                    },
                    required: ['@type', '@id', 'name']
                  }
                },
                required: ['@type', 'name', 'provider']
              }
            },
            required: ['@type', '@id', 'itemOffered']
          }
        }
      },
      required: ['@type', 'name', 'itemListElement']
    }
  },
  required: [
    '@context', 
    '@type', 
    '@id', 
    'name', 
    'legalName', 
    'description', 
    'url', 
    'priceRange', 
    'currenciesAccepted', 
    'address', 
    'geo', 
    'areaServed', 
    'serviceArea', 
    'hasOfferCatalog'
  ]
};

type StructuredData = Record<string, unknown>;

type OfferCatalogItem = {
  itemOffered?: {
    name?: string;
  };
};

type BusinessSchema = StructuredData & {
  '@id'?: string;
  '@type'?: string;
  name?: string;
  legalName?: string;
  address?: {
    addressRegion?: string;
    addressCountry?: string;
  };
  areaServed?: {
    name?: string;
  };
  currenciesAccepted?: string;
  priceRange?: string;
  hasOfferCatalog?: {
    itemListElement?: OfferCatalogItem[];
  };
};

function isStructuredData(value: unknown): value is StructuredData {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Initialize AJV validator
const ajv = new Ajv({ 
  allErrors: true,
  formats: {
    uri: true
  }
});

export const validateLocalBusinessSchema = ajv.compile(LOCAL_BUSINESS_SCHEMA);

/**
 * Extract structured data from HTML string
 */
export function extractStructuredData(html: string): StructuredData[] {
  const structuredDataRegex = /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs;
  const matches: StructuredData[] = [];
  let match;

  while ((match = structuredDataRegex.exec(html)) !== null) {
    try {
      const data: unknown = JSON.parse(match[1].trim());
      if (Array.isArray(data)) {
        matches.push(...data.filter(isStructuredData));
      } else if (isStructuredData(data)) {
        matches.push(data);
      }
    } catch (error) {
      console.warn('Failed to parse structured data:', error);
    }
  }

  return matches;
}

/**
 * Find LocalBusiness schema in structured data array
 */
export function findLocalBusinessSchema(structuredData: StructuredData[]): StructuredData | null {
  return structuredData.find((data) => data['@type'] === 'LocalBusiness') || null;
}

/**
 * Validate business config consistency
 */
export function validateBusinessConfigConsistency(schema: BusinessSchema) {
  const errors = [];

  // Check required business information consistency
  if (!schema.name || !schema.name.includes('Hovenier.frl')) {
    errors.push('Business name should include "Hovenier.frl"');
  }

  if (!schema.legalName || schema.legalName !== 'Hovenier.frl') {
    errors.push('Legal name should be "Hovenier.frl"');
  }

  if (!schema.address || schema.address.addressRegion !== 'Friesland') {
    errors.push('Address region should be "Friesland"');
  }

  if (!schema.address || schema.address.addressCountry !== 'NL') {
    errors.push('Address country should be "NL"');
  }

  if (!schema.areaServed || schema.areaServed.name !== 'Friesland') {
    errors.push('Area served should be "Friesland"');
  }

  if (!schema.currenciesAccepted || schema.currenciesAccepted !== 'EUR') {
    errors.push('Currency should be "EUR"');
  }

  if (!schema['@id'] || schema['@id'] !== 'https://hovenier.frl') {
    errors.push('@id should be "https://hovenier.frl"');
  }

  return errors;
}

/**
 * Common services that should be available across pages
 */
export const CORE_SERVICES = [
  'Tuinonderhoud',
  'Tuinontwerp', 
  'Tuinaanleg',
  'Groendaken',
  'Bestrating',
  'Boomverzorging'
];

/**
 * Service-specific validation rules
 */
export const SERVICE_VALIDATION = {
  groendak: {
    requiredServices: ['Extensieve groendaken', 'Intensieve groendaken', 'Sedum daken'],
    priceRange: '€85-200'
  },
  stratenmaker: {
    requiredServices: ['Bestrating & tegels', 'Opritten & parkeerplaatsen', 'Tuinpaden & terrassen'],
    priceRange: '€45-150'
  },
  tuinonderhoud: {
    requiredServices: ['Gazon maaien', 'Hagen snoeien', 'Onkruid verwijderen'],
    priceRange: '€35-85'
  },
  tuinontwerp: {
    requiredServices: ['Tuinplannen maken', '3D visualisaties', 'Beplantingsplannen'],
    priceRange: '€250-1500'
  },
  'tuin-aanleggen': {
    requiredServices: ['Complete tuinaanleg', 'Gazons aanleggen', 'Borders aanplanten'],
    priceRange: '€75-200'
  }
};

/**
 * Test helper to validate service-specific schema
 */
export function validateServiceSpecificSchema(schema: BusinessSchema, serviceType: keyof typeof SERVICE_VALIDATION) {
  const errors = [];
  const validation = SERVICE_VALIDATION[serviceType];

  if (!validation) {
    return ['Unknown service type'];
  }

  // Check price range
  if (schema.priceRange !== validation.priceRange) {
    errors.push(`Price range should be "${validation.priceRange}" for ${serviceType}`);
  }

  // Check required services
  const schemaServices = schema.hasOfferCatalog?.itemListElement?.map((item: OfferCatalogItem) => item.itemOffered?.name) || [];
  
  for (const requiredService of validation.requiredServices) {
    if (!schemaServices.includes(requiredService)) {
      errors.push(`Missing required service: "${requiredService}" for ${serviceType}`);
    }
  }

  return errors;
}

// Test the validation utilities themselves
describe('Schema Validation Utilities', () => {
  test('should compile LocalBusiness schema successfully', () => {
    expect(validateLocalBusinessSchema).toBeDefined();
    expect(typeof validateLocalBusinessSchema).toBe('function');
  });

  test('should extract structured data from HTML', () => {
    const html = `
      <html>
        <script type="application/ld+json">
          {"@type": "LocalBusiness", "name": "Test Business"}
        </script>
      </html>
    `;
    
    const data = extractStructuredData(html);
    expect(data).toHaveLength(1);
    expect(data[0]['@type']).toBe('LocalBusiness');
    expect(data[0].name).toBe('Test Business');
  });

  test('should find LocalBusiness schema in structured data', () => {
    const data = [
      { '@type': 'WebSite', name: 'Website' },
      { '@type': 'LocalBusiness', name: 'Business' }
    ];
    
    const business = findLocalBusinessSchema(data);
    expect(business).toBeTruthy();
    expect(business['@type']).toBe('LocalBusiness');
    expect(business.name).toBe('Business');
  });

  test('should validate business config consistency', () => {
    const validSchema = {
      name: 'Hovenier.frl - Groendak Specialisten',
      legalName: 'Hovenier.frl',
      address: {
        addressRegion: 'Friesland',
        addressCountry: 'NL'
      },
      areaServed: {
        name: 'Friesland'
      },
      currenciesAccepted: 'EUR',
      '@id': 'https://hovenier.frl'
    };
    
    const errors = validateBusinessConfigConsistency(validSchema);
    expect(errors).toEqual([]);
  });

  test('should detect business config inconsistencies', () => {
    const invalidSchema = {
      name: 'Wrong Name',
      legalName: 'Wrong Legal Name',
      address: {
        addressRegion: 'Wrong Region',
        addressCountry: 'US'
      },
      areaServed: {
        name: 'Wrong Area'
      },
      currenciesAccepted: 'USD',
      '@id': 'wrong-id'
    };
    
    const errors = validateBusinessConfigConsistency(invalidSchema);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(err => err.includes('Legal name'))).toBe(true);
  });
});