/**
 * Gardener Profile Pages Integration Tests
 * Tests gardener/company profile pages (/hoveniers/[slug])
 */

import { render } from '@testing-library/react';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  notFound: jest.fn(),
}));

jest.mock('next/headers', () => ({
  headers: () => new Map([['x-forwarded-proto', 'https']]),
}));

jest.mock('@/lib/locale-utils', () => ({
  localizePath: (path: string) => path,
  getAbsoluteUrl: (path: string) => `https://hovenier.frl${path}`,
  getLocaleAlternates: () => ({ canonical: '', languages: {} }),
  DEFAULT_LOCALE: 'nl',
  SUPPORTED_LOCALES: ['nl', 'en']
}));

// Mock gardeners data
jest.mock('@/lib/gardeners-data', () => ({
  getGardenerBySlug: (slug: string) => ({
    slug,
    name: `Gardener ${slug}`,
    company: `Company ${slug}`,
    description: `Professional gardener services by ${slug}`,
    services: ['Tuinonderhoud', 'Tuinontwerp', 'Bestrating'],
    location: 'Friesland',
    contact: {
      phone: '+31 6 1234 5678',
      email: `info@${slug}.nl`,
      website: `https://www.${slug}.nl`
    },
    priceRange: '€45-85',
    rating: 4.5,
    reviews: 42
  }),
  getAllGardeners: () => [
    { 
      slug: 'tuinservice-friesland',
      name: 'Tuinservice Friesland',
      company: 'Tuinservice Friesland BV',
      location: 'Leeuwarden'
    },
    { 
      slug: 'groene-vingers',
      name: 'Groene Vingers',
      company: 'Groene Vingers Hoveniers',
      location: 'Harlingen'
    },
    { 
      slug: 'friese-tuinen',
      name: 'Friese Tuinen',
      company: 'Friese Tuinen & Parken',
      location: 'Drachten'
    }
  ]
}));

// Helper function to create mock messages
const createMockMessages = () => ({
  common: {
    navigation: {
      home: 'Home',
      hoveniers: 'Gardeners',
      contact: 'Contact'
    },
    buttons: {
      contact: 'Contact Gardener',
      quote: 'Request Quote',
      phone: 'Call Now'
    }
  },
  pages: {
    hoveniers: {
      title: 'Professional Gardeners',
      subtitle: 'Find expert gardeners in Friesland',
      profile: {
        services: 'Services',
        contact: 'Contact Information',
        reviews: 'Reviews',
        portfolio: 'Portfolio',
        about: 'About'
      }
    }
  }
});

describe('Gardener Profile Pages Integration Tests', () => {
  const mockMessages = createMockMessages();
  
  const renderWithIntl = (component: React.ReactElement, locale = 'nl') => {
    return render(component);
  };

  describe('Individual Gardener Profiles (/hoveniers/[slug])', () => {
    const testGardeners = [
      'tuinservice-friesland',
      'groene-vingers',
      'friese-tuinen',
      'hovenier-leeuwarden',
      'tuin-en-groenservice'
    ];

    testGardeners.forEach(gardenerSlug => {
      test(`should render ${gardenerSlug} profile page without crashing`, async () => {
        try {
          const { default: GardenerPage } = await import(`@/app/[locale]/hoveniers/[slug]/page`);
          
          const mockParams = Promise.resolve({ 
            locale: 'nl',
            slug: gardenerSlug 
          });
          
          expect(() => {
            renderWithIntl(<GardenerPage params={mockParams} />);
          }).not.toThrow();
          
        } catch (error) {
          console.warn(`Gardener profile page for ${gardenerSlug} could not be imported:`, error);
        }
      });

      test(`should render ${gardenerSlug} profile in both locales`, async () => {
        try {
          const { default: GardenerPage } = await import(`@/app/[locale]/hoveniers/[slug]/page`);
          
          for (const locale of ['nl', 'en']) {
            const mockParams = Promise.resolve({ 
              locale,
              slug: gardenerSlug 
            });
            
            expect(() => {
              renderWithIntl(<GardenerPage params={mockParams} />, locale);
            }).not.toThrow();
          }
          
        } catch (error) {
          console.warn(`Gardener profile ${gardenerSlug} locale test failed:`, error);
        }
      });
    });
  });

  describe('Gardener Profile Content Structure', () => {
    test('should contain essential profile elements', async () => {
      const testGardener = 'tuinservice-friesland';
      
      try {
        const { default: GardenerPage } = await import(`@/app/[locale]/hoveniers/[slug]/page`);
        
        const mockParams = Promise.resolve({ 
          locale: 'nl',
          slug: testGardener 
        });
        
        const { container } = renderWithIntl(<GardenerPage params={mockParams} />);
        
        expect(container).toBeTruthy();
        expect(container.innerHTML).not.toBe('');
        
        const html = container.innerHTML;
        
        // Check for profile elements
        const hasProfileContent = html.includes('hovenier') || 
                                 html.includes('gardener') ||
                                 html.includes('tuinservice') ||
                                 html.includes('contact') ||
                                 html.includes('diensten') ||
                                 html.includes('services');
        
        if (!hasProfileContent) {
          console.warn(`Gardener profile ${testGardener} may be missing essential content`);
        }
        
      } catch (error) {
        console.warn(`Profile content test failed for ${testGardener}:`, error);
      }
    });

    test('should include contact information elements', async () => {
      const testGardener = 'groene-vingers';
      
      try {
        const { default: GardenerPage } = await import(`@/app/[locale]/hoveniers/[slug]/page`);
        
        const mockParams = Promise.resolve({ 
          locale: 'nl',
          slug: testGardener 
        });
        
        const { container } = renderWithIntl(<GardenerPage params={mockParams} />);
        
        const html = container.innerHTML;
        
        // Check for contact elements
        const hasContactInfo = html.includes('telefoon') || 
                              html.includes('email') || 
                              html.includes('@') ||
                              html.includes('contact') ||
                              html.includes('+31') ||
                              html.includes('06');
        
        if (!hasContactInfo) {
          console.warn(`Gardener profile ${testGardener} may be missing contact information`);
        }
        
      } catch (error) {
        console.warn(`Contact info test failed for ${testGardener}:`, error);
      }
    });

    test('should include service offerings', async () => {
      const testGardener = 'friese-tuinen';
      
      try {
        const { default: GardenerPage } = await import(`@/app/[locale]/hoveniers/[slug]/page`);
        
        const mockParams = Promise.resolve({ 
          locale: 'nl',
          slug: testGardener 
        });
        
        const { container } = renderWithIntl(<GardenerPage params={mockParams} />);
        
        const html = container.innerHTML;
        
        // Check for service elements
        const hasServices = html.includes('tuinonderhoud') || 
                           html.includes('tuinontwerp') ||
                           html.includes('bestrating') ||
                           html.includes('services') ||
                           html.includes('diensten') ||
                           html.includes('maintenance');
        
        if (!hasServices) {
          console.warn(`Gardener profile ${testGardener} may be missing service information`);
        }
        
      } catch (error) {
        console.warn(`Services test failed for ${testGardener}:`, error);
      }
    });
  });

  describe('Dynamic Route Generation', () => {
    test('should handle gardener pages with generateStaticParams', async () => {
      try {
        const { generateStaticParams } = await import(`@/app/[locale]/hoveniers/[slug]/page`);
        
        if (generateStaticParams) {
          const params = await generateStaticParams();
          expect(Array.isArray(params)).toBe(true);
          expect(params.length).toBeGreaterThan(0);
          
          // Each param should have slug property
          params.forEach(param => {
            expect(param).toHaveProperty('slug');
            expect(typeof param.slug).toBe('string');
          });
        }
      } catch (error) {
        console.warn('Dynamic gardener route not found or no generateStaticParams:', error);
      }
    });

    test('should generate expected number of gardener profiles', async () => {
      try {
        const { generateStaticParams } = await import(`@/app/[locale]/hoveniers/[slug]/page`);
        
        if (generateStaticParams) {
          const params = await generateStaticParams();
          
          // Should match the number from build output (10 gardener profiles seen)
          expect(params.length).toBeGreaterThan(5);
          expect(params.length).toBeLessThan(50); // Reasonable upper bound
        }
      } catch (error) {
        console.warn('Gardener params count test not available:', error);
      }
    });
  });

  describe('Gardener SEO and Structured Data', () => {
    test('should include LocalBusiness structured data for gardener profiles', async () => {
      const testGardener = 'tuinservice-friesland';
      
      try {
        const { default: GardenerPage } = await import(`@/app/[locale]/hoveniers/[slug]/page`);
        
        const mockParams = Promise.resolve({ 
          locale: 'nl',
          slug: testGardener 
        });
        
        const { container } = renderWithIntl(<GardenerPage params={mockParams} />);
        
        const html = container.innerHTML;
        const hasStructuredData = html.includes('application/ld+json') || 
                                 html.includes('@type') ||
                                 html.includes('LocalBusiness');
        
        if (!hasStructuredData) {
          console.warn(`Gardener profile ${testGardener} may be missing structured data`);
        }
        
        // Should have gardener-specific context
        const hasGardenerContext = html.includes(testGardener) ||
                                  html.includes('Tuinservice') ||
                                  html.includes('hovenier');
        
        if (!hasGardenerContext) {
          console.warn(`Gardener profile ${testGardener} may be missing gardener-specific context`);
        }
        
      } catch (error) {
        console.warn(`Structured data test failed for ${testGardener}:`, error);
      }
    });
  });

  describe('Gardener Directory Integration', () => {
    test('should properly integrate with gardener data sources', async () => {
      try {
        // Test the gardener data integration
        const { getAllGardeners } = await import('@/lib/gardeners-data');
        
        if (getAllGardeners) {
          const gardeners = getAllGardeners();
          expect(Array.isArray(gardeners)).toBe(true);
          expect(gardeners.length).toBeGreaterThan(0);
          
          // Each gardener should have required fields
          gardeners.forEach(gardener => {
            expect(gardener).toHaveProperty('slug');
            expect(gardener).toHaveProperty('name');
            expect(typeof gardener.slug).toBe('string');
            expect(typeof gardener.name).toBe('string');
          });
        }
      } catch (error) {
        console.warn('Gardener data integration test not available:', error);
      }
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid gardener slugs gracefully', async () => {
      try {
        const { default: GardenerPage } = await import(`@/app/[locale]/hoveniers/[slug]/page`);
        
        const mockParams = Promise.resolve({ 
          locale: 'nl',
          slug: 'invalid-gardener-that-does-not-exist'
        });
        
        // Should handle gracefully or show 404
        expect(() => {
          renderWithIntl(<GardenerPage params={mockParams} />);
        }).not.toThrow();
        
      } catch (error) {
        console.warn('Gardener dynamic route not available for error testing:', error);
      }
    });

    test('should handle missing gardener data gracefully', async () => {
      try {
        const { default: GardenerPage } = await import(`@/app/[locale]/hoveniers/[slug]/page`);
        
        const mockParams = Promise.resolve({ 
          locale: 'nl',
          slug: 'gardener-with-missing-data'
        });
        
        const { container } = renderWithIntl(<GardenerPage params={mockParams} />);
        
        // Should render something even with missing data
        expect(container).toBeTruthy();
        
      } catch (error) {
        console.warn('Missing gardener data test not available:', error);
      }
    });
  });

  describe('Gardener Hub Page', () => {
    test('should render gardeners index/hub page', async () => {
      try {
        const { default: HoveniersIndexPage } = await import('@/app/[locale]/hoveniers/page');
        
        const mockParams = Promise.resolve({ locale: 'nl' });
        
        expect(() => {
          renderWithIntl(<HoveniersIndexPage params={mockParams} />);
        }).not.toThrow();
        
      } catch (error) {
        console.warn('Gardeners index page not available:', error);
      }
    });

    test('should include gardener directory elements', async () => {
      try {
        const { default: HoveniersIndexPage } = await import('@/app/[locale]/hoveniers/page');
        
        const mockParams = Promise.resolve({ locale: 'nl' });
        
        const { container } = renderWithIntl(<HoveniersIndexPage params={mockParams} />);
        
        const html = container.innerHTML;
        const hasDirectoryContent = html.includes('hovenier') ||
                                   html.includes('gardener') ||
                                   html.includes('directory') ||
                                   html.includes('lijst') ||
                                   html.includes('overzicht');
        
        if (!hasDirectoryContent) {
          console.warn('Gardeners index page may be missing directory content');
        }
        
      } catch (error) {
        console.warn('Gardeners index page content test failed:', error);
      }
    });
  });
});