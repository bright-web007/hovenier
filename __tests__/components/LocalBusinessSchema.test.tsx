import { render } from '@testing-library/react';
import { LocalBusinessSchema } from '@/app/components/StructuredData';
import { 
  extractStructuredData, 
  findLocalBusinessSchema, 
  validateLocalBusinessSchema,
  validateBusinessConfigConsistency,
  validateServiceSpecificSchema
} from '../utils/schema-validation';

type OfferCatalogItem = {
  '@type': 'Offer';
  '@id': string;
  itemOffered: {
    '@type': 'Service';
    name: string;
    provider: {
      '@type': 'LocalBusiness';
      '@id': string;
      name: string;
    };
  };
};

type LocalBusinessSchemaShape = {
  '@id': string;
  name: string;
  address: {
    addressLocality: string;
    postalCode: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    latitude: string;
    longitude: string;
  };
  serviceArea: {
    geoMidpoint: {
      latitude: string;
      longitude: string;
    };
  };
  areaServed: {
    '@type': 'State';
    name: string;
    containedInPlace: {
      '@type': 'Country';
      name: string;
    };
  };
  hasOfferCatalog: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: OfferCatalogItem[];
  };
};

function getLocalBusinessSchema(container: ReturnType<typeof render>['container']): LocalBusinessSchemaShape {
  const structuredData = extractStructuredData(container.innerHTML);
  const localBusinessSchema = findLocalBusinessSchema(structuredData);

  expect(localBusinessSchema).toBeTruthy();

  return localBusinessSchema as LocalBusinessSchemaShape;
}

// Mock next-intl for testing
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('LocalBusinessSchema Component', () => {
  const baseProps = {
    url: 'https://hovenier.frl/test'
  };

  describe('Schema Structure Validation', () => {
    test('should generate valid LocalBusiness schema with default config', () => {
      const { container } = render(
        <LocalBusinessSchema {...baseProps} />
      );

      const html = container.innerHTML;
      const structuredData = extractStructuredData(html);
      expect(structuredData).toHaveLength(1);

      const localBusinessSchema = findLocalBusinessSchema(structuredData);
      expect(localBusinessSchema).toBeTruthy();

      // Validate against JSON Schema
      const isValid = validateLocalBusinessSchema(localBusinessSchema!);
      if (!isValid) {
        console.error('Schema validation errors:', validateLocalBusinessSchema.errors);
      }
      expect(isValid).toBe(true);
    });

    test('should generate valid schema for service-specific configurations', () => {
      const serviceTypes = ['groendak', 'stratenmaker', 'tuinonderhoud', 'tuinontwerp', 'tuin-aanleggen'] as const;

      serviceTypes.forEach(serviceType => {
        const { container } = render(
          <LocalBusinessSchema 
            {...baseProps}
            serviceType={serviceType}
            url={`https://hovenier.frl/diensten/${serviceType}`}
          />
        );

        const html = container.innerHTML;
        const structuredData = extractStructuredData(html);
        const localBusinessSchema = findLocalBusinessSchema(structuredData);
        
        expect(localBusinessSchema).toBeTruthy();
        
        // Validate schema structure
        const isValid = validateLocalBusinessSchema(localBusinessSchema!);
        if (!isValid) {
          console.error(`Schema validation errors for ${serviceType}:`, validateLocalBusinessSchema.errors);
        }
        expect(isValid).toBe(true);

        // Validate service-specific requirements
        const serviceErrors = validateServiceSpecificSchema(localBusinessSchema!, serviceType);
        expect(serviceErrors).toEqual([]);
      });
    });

    test('should include name context when provided', () => {
      const nameContext = 'Test Garden Service';
      const { container } = render(
        <LocalBusinessSchema 
          {...baseProps}
          nameContext={nameContext}
        />
      );

      const html = container.innerHTML;
      const structuredData = extractStructuredData(html);
      const localBusinessSchema = findLocalBusinessSchema(structuredData);
      
      expect(localBusinessSchema!.name).toContain(nameContext);
    });

    test('should include custom services when provided', () => {
      const customServices = ['Custom Service 1', 'Custom Service 2'];
      const { container } = render(
        <LocalBusinessSchema 
          {...baseProps}
          services={customServices}
        />
      );

      const localBusinessSchema = getLocalBusinessSchema(container);
      
      const schemaServices = localBusinessSchema.hasOfferCatalog.itemListElement.map(
        (item) => item.itemOffered.name
      );
      
      customServices.forEach(service => {
        expect(schemaServices).toContain(service);
      });
    });
  });

  describe('Business Consistency Validation', () => {
    test('should maintain consistent business information across all configurations', () => {
      const serviceTypes = [undefined, 'groendak', 'stratenmaker', 'tuinonderhoud', 'tuinontwerp', 'tuin-aanleggen', 'gardener'] as const;

      serviceTypes.forEach(serviceType => {
        const { container } = render(
          <LocalBusinessSchema 
            {...baseProps}
            serviceType={serviceType}
          />
        );

        const html = container.innerHTML;
        const structuredData = extractStructuredData(html);
        const localBusinessSchema = findLocalBusinessSchema(structuredData);
        
        expect(localBusinessSchema).toBeTruthy();

        // Validate business consistency
        const consistencyErrors = validateBusinessConfigConsistency(localBusinessSchema!);
        if (consistencyErrors.length > 0) {
          console.error(`Consistency errors for ${serviceType}:`, consistencyErrors);
        }
        expect(consistencyErrors).toEqual([]);
      });
    });

    test('should have consistent @id across all schemas', () => {
      const serviceTypes = ['groendak', 'stratenmaker', 'tuinonderhoud'] as const;
      const businessIds: string[] = [];

      serviceTypes.forEach(serviceType => {
        const { container } = render(
          <LocalBusinessSchema 
            {...baseProps}
            serviceType={serviceType}
          />
        );

        const localBusinessSchema = getLocalBusinessSchema(container);
        
        businessIds.push(localBusinessSchema['@id']);
      });

      // All @id values should be identical
      const uniqueIds = new Set(businessIds);
      expect(uniqueIds.size).toBe(1);
      expect(businessIds[0]).toBe('https://hovenier.frl');
    });

    test('should have consistent address information', () => {
      const { container } = render(
        <LocalBusinessSchema {...baseProps} />
      );

      const localBusinessSchema = getLocalBusinessSchema(container);
      
      expect(localBusinessSchema.address.addressLocality).toBe('Leeuwarden');
      expect(localBusinessSchema.address.postalCode).toBe('8900');
      expect(localBusinessSchema.address.addressRegion).toBe('Friesland');
      expect(localBusinessSchema.address.addressCountry).toBe('NL');
    });

    test('should have consistent geographic coordinates', () => {
      const { container } = render(
        <LocalBusinessSchema {...baseProps} />
      );

      const localBusinessSchema = getLocalBusinessSchema(container);
      
      expect(localBusinessSchema.geo.latitude).toBe('53.2012');
      expect(localBusinessSchema.geo.longitude).toBe('5.7999');
      expect(localBusinessSchema.serviceArea.geoMidpoint.latitude).toBe('53.2012');
      expect(localBusinessSchema.serviceArea.geoMidpoint.longitude).toBe('5.7999');
    });

    test('should have consistent area served information', () => {
      const { container } = render(
        <LocalBusinessSchema {...baseProps} />
      );

      const localBusinessSchema = getLocalBusinessSchema(container);
      
      expect(localBusinessSchema.areaServed.name).toBe('Friesland');
      expect(localBusinessSchema.areaServed['@type']).toBe('State');
      expect(localBusinessSchema.areaServed.containedInPlace.name).toBe('Nederland');
      expect(localBusinessSchema.areaServed.containedInPlace['@type']).toBe('Country');
    });

    test('should have valid offer catalog structure', () => {
      const { container } = render(
        <LocalBusinessSchema {...baseProps} />
      );

      const localBusinessSchema = getLocalBusinessSchema(container);
      
      const catalog = localBusinessSchema.hasOfferCatalog;
      expect(catalog['@type']).toBe('OfferCatalog');
      expect(catalog.name).toBe('Hoveniersdiensten');
      expect(catalog.itemListElement).toBeDefined();
      expect(Array.isArray(catalog.itemListElement)).toBe(true);
      expect(catalog.itemListElement.length).toBeGreaterThan(0);

      // Validate each offer structure
      catalog.itemListElement.forEach((offer, index: number) => {
        expect(offer['@type']).toBe('Offer');
        expect(offer['@id']).toContain('service-' + index);
        expect(offer.itemOffered['@type']).toBe('Service');
        expect(offer.itemOffered.name).toBeDefined();
        expect(offer.itemOffered.provider['@type']).toBe('LocalBusiness');
        expect(offer.itemOffered.provider['@id']).toBe('https://hovenier.frl');
        expect(offer.itemOffered.provider.name).toBe('Hovenier.frl');
      });
    });
  });
});