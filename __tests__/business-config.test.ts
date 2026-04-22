import { 
  getBusinessConfig, 
  HOVENIER_BUSINESS_CONFIG, 
  SERVICE_SPECIFIC_CONFIGS 
} from '@/lib/business-config';
import { 
  validateLocalBusinessSchema, 
  validateBusinessConfigConsistency,
  validateServiceSpecificSchema,
  SERVICE_VALIDATION
} from './utils/schema-validation';

function buildLocalBusinessSchema(config: typeof HOVENIER_BUSINESS_CONFIG) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': config.contactInfo.website,
    name: config.name,
    legalName: config.legalName,
    description: config.description,
    url: config.contactInfo.website,
    sameAs: [config.contactInfo.website],
    priceRange: config.priceRange,
    currenciesAccepted: config.currenciesAccepted,
    paymentAccepted: [...config.paymentAccepted],
    address: {
      '@type': 'PostalAddress',
      addressLocality: config.address.addressLocality,
      postalCode: config.address.postalCode,
      addressRegion: config.address.addressRegion,
      addressCountry: config.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.location.latitude,
      longitude: config.location.longitude
    },
    areaServed: {
      '@type': config.serviceArea.type,
      name: config.serviceArea.name,
      containedInPlace: {
        '@type': 'Country',
        name: 'Nederland'
      }
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: config.location.latitude,
        longitude: config.location.longitude
      },
      geoRadius: config.serviceArea.radius
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hoveniersdiensten',
      itemListElement: config.coreServices.map((service, index) => ({
        '@type': 'Offer',
        '@id': `${config.contactInfo.website}#service-${index + 1}`,
        itemOffered: {
          '@type': 'Service',
          name: service,
          provider: {
            '@type': 'LocalBusiness',
            '@id': config.contactInfo.website,
            name: config.legalName
          }
        }
      }))
    }
  };
}

describe('Business Configuration Schema Validation', () => {
  describe('Core Business Config', () => {
    test('should have valid main business configuration', () => {
      expect(HOVENIER_BUSINESS_CONFIG).toBeDefined();
      expect(HOVENIER_BUSINESS_CONFIG.name).toBe('Hovenier.frl - Hoveniers in Friesland');
      expect(HOVENIER_BUSINESS_CONFIG.legalName).toBe('Hovenier.frl');
      expect(HOVENIER_BUSINESS_CONFIG.address.addressRegion).toBe('Friesland');
      expect(HOVENIER_BUSINESS_CONFIG.address.addressCountry).toBe('NL');
      expect(HOVENIER_BUSINESS_CONFIG.serviceArea.name).toBe('Friesland');
      expect(HOVENIER_BUSINESS_CONFIG.currenciesAccepted).toBe('EUR');
      expect(HOVENIER_BUSINESS_CONFIG.contactInfo.website).toBe('https://hovenier.frl');
    });

    test('should have required core services', () => {
      const expectedCoreServices = [
        'Tuinonderhoud',
        'Tuinontwerp', 
        'Bestrating',
        'Boomverzorging',
        'Groendaken',
        'Tuinaanleg'
      ];
      
      const hasAllCoreServices = expectedCoreServices.every(service => 
        HOVENIER_BUSINESS_CONFIG.coreServices.includes(service)
      );
      expect(hasAllCoreServices).toBe(true);
    });

    test('should have valid business hours', () => {
      expect(HOVENIER_BUSINESS_CONFIG.businessHours).toBeDefined();
      expect(HOVENIER_BUSINESS_CONFIG.businessHours?.opens).toBe('08:00');
      expect(HOVENIER_BUSINESS_CONFIG.businessHours?.closes).toBe('18:00');
      expect(HOVENIER_BUSINESS_CONFIG.businessHours?.dayOfWeek).toHaveLength(6); // Monday-Saturday
    });

    test('should have valid location coordinates', () => {
      expect(HOVENIER_BUSINESS_CONFIG.location.latitude).toMatch(/^53\.\d+$/);
      expect(HOVENIER_BUSINESS_CONFIG.location.longitude).toMatch(/^5\.\d+$/);
    });

    test('should have valid postal code', () => {
      expect(HOVENIER_BUSINESS_CONFIG.address.postalCode).toMatch(/^\d{4}$/);
    });
  });

  describe('Service-Specific Configurations', () => {
    test('should have all required service types', () => {
      const expectedServices = ['groendak', 'stratenmaker', 'tuinonderhoud', 'tuinontwerp', 'tuin-aanleggen', 'gardener'];
      
      for (const service of expectedServices) {
        expect(SERVICE_SPECIFIC_CONFIGS[service as keyof typeof SERVICE_SPECIFIC_CONFIGS]).toBeDefined();
      }
    });

    test('should inherit core business properties', () => {
      Object.values(SERVICE_SPECIFIC_CONFIGS).forEach(config => {
        expect(config.legalName).toBe(HOVENIER_BUSINESS_CONFIG.legalName);
        expect(config.address).toEqual(HOVENIER_BUSINESS_CONFIG.address);
        expect(config.location).toEqual(HOVENIER_BUSINESS_CONFIG.location);
        expect(config.serviceArea).toEqual(HOVENIER_BUSINESS_CONFIG.serviceArea);
        expect(config.contactInfo.website).toBe(HOVENIER_BUSINESS_CONFIG.contactInfo.website);
      });
    });

    test('should have service-specific pricing', () => {
      expect(SERVICE_SPECIFIC_CONFIGS.groendak.priceRange).toBe('€85-200');
      expect(SERVICE_SPECIFIC_CONFIGS.stratenmaker.priceRange).toBe('€45-150');
      expect(SERVICE_SPECIFIC_CONFIGS.tuinonderhoud.priceRange).toBe('€35-85');
      expect(SERVICE_SPECIFIC_CONFIGS.tuinontwerp.priceRange).toBe('€250-1500');
      expect(SERVICE_SPECIFIC_CONFIGS['tuin-aanleggen'].priceRange).toBe('€75-200');
    });

    test('should have service-specific names', () => {
      expect(SERVICE_SPECIFIC_CONFIGS.groendak.name).toContain('Groendak Specialisten');
      expect(SERVICE_SPECIFIC_CONFIGS.stratenmaker.name).toContain('Stratenmaker & Bestrating');
      expect(SERVICE_SPECIFIC_CONFIGS.tuinonderhoud.name).toContain('Tuinonderhoud');
      expect(SERVICE_SPECIFIC_CONFIGS.tuinontwerp.name).toContain('Tuinontwerp');
      expect(SERVICE_SPECIFIC_CONFIGS['tuin-aanleggen'].name).toContain('Tuin Aanleggen');
    });

    test('should produce schema-valid LocalBusiness data for the main config', () => {
      const schema = buildLocalBusinessSchema(HOVENIER_BUSINESS_CONFIG);
      const isValid = validateLocalBusinessSchema(schema);

      expect(isValid).toBe(true);
      expect(validateBusinessConfigConsistency(schema)).toEqual([]);
    });

    test('should satisfy service validation rules for configured service schemas', () => {
      (Object.keys(SERVICE_VALIDATION) as Array<keyof typeof SERVICE_VALIDATION>).forEach((serviceType) => {
        const config = SERVICE_SPECIFIC_CONFIGS[serviceType];
        const schema = buildLocalBusinessSchema(config);

        expect(validateServiceSpecificSchema(schema, serviceType)).toEqual([]);
      });
    });
  });

  describe('getBusinessConfig Function', () => {
    test('should return main config for undefined service type', () => {
      const config = getBusinessConfig();
      expect(config).toEqual(HOVENIER_BUSINESS_CONFIG);
    });

    test('should return service-specific config for valid service types', () => {
      const groendakConfig = getBusinessConfig('groendak');
      expect(groendakConfig).toEqual(SERVICE_SPECIFIC_CONFIGS.groendak);

      const stratenmakerConfig = getBusinessConfig('stratenmaker');
      expect(stratenmakerConfig).toEqual(SERVICE_SPECIFIC_CONFIGS.stratenmaker);
    });

    test('should return main config for invalid service types', () => {
      // @ts-expect-error - Testing invalid type
      const config = getBusinessConfig('invalid-service');
      expect(config).toEqual(HOVENIER_BUSINESS_CONFIG);
    });
  });
});