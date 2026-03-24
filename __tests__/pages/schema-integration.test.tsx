/**
 * Integration tests for schema validation on actual pages
 * These tests ensure that pages properly implement LocalBusiness schema
 */

import { render } from '@testing-library/react';
import { 
  extractStructuredData, 
  findLocalBusinessSchema, 
  validateLocalBusinessSchema,
  validateBusinessConfigConsistency,
  validateServiceSpecificSchema,
  SERVICE_VALIDATION
} from '../utils/schema-validation';

// Mock next-intl and other Next.js dependencies
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'nl'
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: () => Promise.resolve((key: string) => key)
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('@/lib/locale-utils', () => ({
  localizePath: (path: string) => path,
  getAbsoluteUrl: (path: string) => `https://hovenier.frl${path}`,
  getLocaleAlternates: () => ({ canonical: '', languages: {} }),
  DEFAULT_LOCALE: 'nl',
  SUPPORTED_LOCALES: ['nl', 'en']
}));

describe('Page Schema Integration Tests', () => {
  // Helper function to create mock page props
  const createMockParams = (locale = 'nl', extra = {}) => ({
    params: Promise.resolve({ locale, ...extra })
  });

  describe('Service Pages Schema Validation', () => {
    const servicePages = [
      { 
        serviceType: 'groendak', 
        path: '/diensten/groendak',
        expectedName: 'Groendak Specialisten Friesland'
      },
      { 
        serviceType: 'stratenmaker', 
        path: '/diensten/stratenmaker',
        expectedName: 'Stratenmaker & Bestrating Friesland'
      }
    ];

    servicePages.forEach(({ serviceType, path, expectedName }) => {
      test(`should have valid schema on ${serviceType} service page`, async () => {
        // Mock the specific service page component
        const MockServicePage = () => {
          const { LocalBusinessSchema } = require('@/app/components/StructuredData');
          
          return (
            <>
              <LocalBusinessSchema
                serviceType={serviceType as keyof typeof SERVICE_VALIDATION}
                url={`https://hovenier.frl${path}`}
              />
            </>
          );
        };

        const { container } = render(<MockServicePage />);
        const html = container.innerHTML;
        const structuredData = extractStructuredData(html);
        
        expect(structuredData.length).toBeGreaterThanOrEqual(1);
        
        const localBusinessSchema = findLocalBusinessSchema(structuredData);
        expect(localBusinessSchema).toBeTruthy();

        // Validate schema structure
        const isValid = validateLocalBusinessSchema(localBusinessSchema!);
        if (!isValid) {
          console.error(`Schema validation errors for ${serviceType}:`, validateLocalBusinessSchema.errors);
        }
        expect(isValid).toBe(true);

        // Validate business consistency
        const consistencyErrors = validateBusinessConfigConsistency(localBusinessSchema!);
        expect(consistencyErrors).toEqual([]);

        // Validate service-specific requirements
        const serviceErrors = validateServiceSpecificSchema(localBusinessSchema!, serviceType as keyof typeof SERVICE_VALIDATION);
        expect(serviceErrors).toEqual([]);

        // Check service-specific business name
        expect(localBusinessSchema!.name).toContain(expectedName);

        // Ensure URL matches the page
        expect(localBusinessSchema!.url).toBe(`https://hovenier.frl${path}`);
      });
    });
  });

  describe('Regional Pages Schema Validation', () => {
    test('should have valid schema on main regio page', () => {
      const MockRegioPage = () => {
        const { LocalBusinessSchema } = require('@/app/components/StructuredData');
        
        return (
          <>
            <LocalBusinessSchema 
              url="https://hovenier.frl/regio"
              nameContext="Hoveniers per Gemeente Friesland"
            />
          </>
        );
      };

      const { container } = render(<MockRegioPage />);
      const html = container.innerHTML;
      const structuredData = extractStructuredData(html);
      
      const localBusinessSchema = findLocalBusinessSchema(structuredData);
      expect(localBusinessSchema).toBeTruthy();

      // Validate schema structure
      const isValid = validateLocalBusinessSchema(localBusinessSchema!);
      expect(isValid).toBe(true);

      // Validate business consistency
      const consistencyErrors = validateBusinessConfigConsistency(localBusinessSchema!);
      expect(consistencyErrors).toEqual([]);

      // Check context-specific business name
      expect(localBusinessSchema!.name).toContain('Hoveniers per Gemeente Friesland');
    });

    test('should have valid schema on regional hub pages', () => {
      const MockRegionHubPage = () => {
        const { LocalBusinessSchema } = require('@/app/components/StructuredData');
        
        return (
          <>
            <LocalBusinessSchema 
              url="https://hovenier.frl/regio/noordwest-friesland"
              nameContext="Hoveniers in Noordwest-Friesland"
              services={[
                "Tuinonderhoud",
                "Tuinontwerp", 
                "Bestrating",
                "Boomverzorging",
                "Groendaken",
                "Tuinaanleg"
              ]}
            />
          </>
        );
      };

      const { container } = render(<MockRegionHubPage />);
      const html = container.innerHTML;
      const structuredData = extractStructuredData(html);
      
      const localBusinessSchema = findLocalBusinessSchema(structuredData);
      expect(localBusinessSchema).toBeTruthy();

      // Validate schema structure
      const isValid = validateLocalBusinessSchema(localBusinessSchema!);
      expect(isValid).toBe(true);

      // Validate business consistency
      const consistencyErrors = validateBusinessConfigConsistency(localBusinessSchema!);
      expect(consistencyErrors).toEqual([]);

      // Check regional context
      expect(localBusinessSchema!.name).toContain('Noordwest-Friesland');

      // Verify custom services are included
      const schemaServices = localBusinessSchema!.hasOfferCatalog.itemListElement.map(
        (item: any) => item.itemOffered.name
      );
      expect(schemaServices).toContain('Tuinonderhoud');
      expect(schemaServices).toContain('Groendaken');
    });
  });

  describe('Gardener Profile Pages Schema Validation', () => {
    test('should have valid schema on gardener profile page', () => {
      const MockGardenerPage = () => {
        const { LocalBusinessSchema } = require('@/app/components/StructuredData');
        
        return (
          <>
            <LocalBusinessSchema 
              serviceType="gardener"
              url="https://hovenier.frl/hoveniers/test-gardener"
              nameContext="Test Gardener - Test Company"
              services={["Tuinonderhoud", "Tuinontwerp", "Bestrating"]}
            />
          </>
        );
      };

      const { container } = render(<MockGardenerPage />);
      const html = container.innerHTML;
      const structuredData = extractStructuredData(html);
      
      const localBusinessSchema = findLocalBusinessSchema(structuredData);
      expect(localBusinessSchema).toBeTruthy();

      // Validate schema structure
      const isValid = validateLocalBusinessSchema(localBusinessSchema!);
      expect(isValid).toBe(true);

      // Validate business consistency
      const consistencyErrors = validateBusinessConfigConsistency(localBusinessSchema!);
      expect(consistencyErrors).toEqual([]);

      // Check gardener-specific context
      expect(localBusinessSchema!.name).toContain('Test Gardener');
      expect(localBusinessSchema!.name).toContain('Test Company');
    });
  });

  describe('Cross-Page Schema Consistency', () => {
    test('should maintain identical core business data across different page types', () => {
      const pageConfigurations = [
        { serviceType: 'groendak', url: '/diensten/groendak' },
        { serviceType: undefined, url: '/regio', nameContext: 'Regional Services' },
        { serviceType: 'gardener', url: '/hoveniers/test', nameContext: 'Test Gardener' }
      ];

      const schemas: any[] = [];

      pageConfigurations.forEach(config => {
        const MockPage = () => {
          const { LocalBusinessSchema } = require('@/app/components/StructuredData');
          
          return (
            <LocalBusinessSchema 
              serviceType={config.serviceType as any}
              url={`https://hovenier.frl${config.url}`}
              nameContext={config.nameContext}
            />
          );
        };

        const { container } = render(<MockPage />);
        const html = container.innerHTML;
        const structuredData = extractStructuredData(html);
        const localBusinessSchema = findLocalBusinessSchema(structuredData);
        
        expect(localBusinessSchema).toBeTruthy();
        schemas.push(localBusinessSchema);
      });

      // Verify core business data is identical across all schemas
      const coreBusinessFields = [
        '@id',
        'legalName',
        'currenciesAccepted',
        'address',
        'geo',
        'areaServed',
        'serviceArea'
      ];

      coreBusinessFields.forEach(field => {
        const values = schemas.map(schema => JSON.stringify(schema[field]));
        const uniqueValues = new Set(values);
        
        if (uniqueValues.size > 1) {
          console.error(`Inconsistent ${field} values:`, [...uniqueValues]);
        }
        
        expect(uniqueValues.size).toBe(1);
      });
    });

    test('should have consistent provider information in offer catalogs', () => {
      const { container } = render(
        (() => {
          const { LocalBusinessSchema } = require('@/app/components/StructuredData');
          return <LocalBusinessSchema url="https://hovenier.frl/test" />;
        })()
      );

      const html = container.innerHTML;
      const structuredData = extractStructuredData(html);
      const localBusinessSchema = findLocalBusinessSchema(structuredData);
      
      const offers = localBusinessSchema!.hasOfferCatalog.itemListElement;
      
      offers.forEach((offer: any) => {
        expect(offer.itemOffered.provider['@id']).toBe('https://hovenier.frl');
        expect(offer.itemOffered.provider.name).toBe('Hovenier.frl');
        expect(offer.itemOffered.provider['@type']).toBe('LocalBusiness');
      });
    });
  });
});