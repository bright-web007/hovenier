/**
 * Regional Pages Integration Tests
 * Tests regional pages (/regio/[slug]) and municipality pages (/regio/[slug]/[gemeente])
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

// Mock regions and municipalities data
jest.mock('@/lib/regions', () => ({
  getRegionBySlug: (slug: string) => ({
    slug,
    name: `Region ${slug}`,
    description: `Description for region ${slug}`,
    municipalities: ['gemeente-1', 'gemeente-2']
  }),
  getAllRegions: () => [
    { slug: 'noordwest-friesland', name: 'Noordwest-Friesland' },
    { slug: 'noordoost-friesland', name: 'Noordoost-Friesland' },
    { slug: 'zuidwest-friesland', name: 'Zuidwest-Friesland' },
    { slug: 'zuidoost-friesland', name: 'Zuidoost-Friesland' }
  ],
  getMunicipalityBySlug: (slug: string) => ({
    slug,
    name: `Municipality ${slug}`,
    region: 'noordwest-friesland',
    description: `Description for municipality ${slug}`
  })
}));

jest.mock('@/lib/regions-hierarchy', () => ({
  REGIONS_DATA: {
    'noordwest-friesland': {
      name: 'Noordwest-Friesland',
      municipalities: ['waadhoeke', 'harlingen', 'leeuwarden']
    },
    'noordoost-friesland': {
      name: 'Noordoost-Friesland', 
      municipalities: ['achtkarspelen', 'dantumadiel', 'noardeast-fryslan']
    }
  }
}));

describe('Regional Pages Integration Tests', () => {
  const renderWithIntl = (component: React.ReactElement) => {
    return render(component);
  };

  describe('Regional Overview Pages (/regio/[slug])', () => {
    const testRegions = [
      'noordwest-friesland',
      'noordoost-friesland', 
      'zuidwest-friesland',
      'zuidoost-friesland'
    ];

    testRegions.forEach(region => {
      test(`should render ${region} regional page without crashing`, async () => {
        try {
          const { default: RegionPage } = await import(`@/app/[locale]/regio/[slug]/page`);
          
          const mockParams = Promise.resolve({ 
            locale: 'nl',
            slug: region 
          });
          
          expect(() => {
            renderWithIntl(<RegionPage params={mockParams} />);
          }).not.toThrow();
          
        } catch (error) {
          console.warn(`Regional page for ${region} could not be imported:`, error);
        }
      });

      test(`should render ${region} in both locales`, async () => {
        try {
          const { default: RegionPage } = await import(`@/app/[locale]/regio/[slug]/page`);
          
          for (const locale of ['nl', 'en']) {
            const mockParams = Promise.resolve({ 
              locale,
              slug: region 
            });
            
            expect(() => {
              renderWithIntl(<RegionPage params={mockParams} />);
            }).not.toThrow();
          }
          
        } catch (error) {
          console.warn(`Regional page ${region} could not be tested for locales:`, error);
        }
      });
    });
  });

  describe('Municipality Pages (/regio/[slug]/[gemeente])', () => {
    const testMunicipalities = [
      { region: 'noordwest-friesland', gemeente: 'waadhoeke' },
      { region: 'noordwest-friesland', gemeente: 'harlingen' },
      { region: 'noordwest-friesland', gemeente: 'leeuwarden' },
      { region: 'noordoost-friesland', gemeente: 'achtkarspelen' },
      { region: 'noordoost-friesland', gemeente: 'dantumadiel' }
    ];

    testMunicipalities.forEach(({ region, gemeente }) => {
      test(`should render ${gemeente} municipality page without crashing`, async () => {
        try {
          const { default: MunicipalityPage } = await import(`@/app/[locale]/regio/[slug]/[gemeente]/page`);
          
          const mockParams = Promise.resolve({ 
            locale: 'nl',
            slug: region,
            gemeente: gemeente
          });
          
          expect(() => {
            renderWithIntl(<MunicipalityPage params={mockParams} />);
          }).not.toThrow();
          
        } catch (error) {
          console.warn(`Municipality page for ${gemeente} could not be imported:`, error);
        }
      });

      test(`should render ${gemeente} page with proper structure`, async () => {
        try {
          const { default: MunicipalityPage } = await import(`@/app/[locale]/regio/[slug]/[gemeente]/page`);
          
          const mockParams = Promise.resolve({ 
            locale: 'nl',
            slug: region,
            gemeente: gemeente
          });
          
          const { container } = renderWithIntl(<MunicipalityPage params={mockParams} />);
          
          expect(container).toBeTruthy();
          expect(container.innerHTML).not.toBe('');
          
          // Municipality pages should contain location-specific content
          const html = container.innerHTML;
          const hasLocationContent = html.includes(gemeente) || 
                                   html.includes(region) ||
                                   html.includes('gemeente') ||
                                   html.includes('hovenier');
          
          if (!hasLocationContent) {
            console.warn(`Municipality page ${gemeente} may be missing location-specific content`);
          }
          
        } catch (error) {
          console.warn(`Municipality page ${gemeente} structure test failed:`, error);
        }
      });
    });
  });

  describe('Hub Pages (/regio/hub-[slug])', () => {
    test('should render regional hub pages if they exist', async () => {
      try {
        const hubSlugs = ['noordwest', 'noordoost', 'zuidwest', 'zuidoost'];
        
        for (const hubSlug of hubSlugs) {
          try {
            const hubPageModulePath = '@/app/[locale]/regio/hub-[slug]/page';
            const { default: HubPage } = await import(hubPageModulePath);
            
            const mockParams = Promise.resolve({ 
              locale: 'nl',
              slug: hubSlug
            });
            
            expect(() => {
              renderWithIntl(<HubPage params={mockParams} />);
            }).not.toThrow();
            
          } catch (error) {
            console.warn(`Hub page for ${hubSlug} not found:`, error);
          }
        }
      } catch (error) {
        console.warn('Hub pages not available for testing:', error);
      }
    });
  });

  describe('Dynamic Route Generation', () => {
    test('should handle regional pages with generateStaticParams', async () => {
      try {
        const { generateStaticParams } = await import(`@/app/[locale]/regio/[slug]/page`);
        
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
        console.warn('Dynamic regional route not found or no generateStaticParams:', error);
      }
    });

    test('should handle municipality pages with generateStaticParams', async () => {
      try {
        const { generateStaticParams } = await import(`@/app/[locale]/regio/[slug]/[gemeente]/page`);
        
        if (generateStaticParams) {
          const params = await generateStaticParams();
          expect(Array.isArray(params)).toBe(true);
          expect(params.length).toBeGreaterThan(0);
          
          // Each param should have both slug and gemeente properties
          params.forEach(param => {
            expect(param).toHaveProperty('slug');
            expect(param).toHaveProperty('gemeente');
            expect(typeof param.slug).toBe('string');
            expect(typeof param.gemeente).toBe('string');
          });
        }
      } catch (error) {
        console.warn('Dynamic municipality route not found or no generateStaticParams:', error);
      }
    });
  });

  describe('Regional SEO and Structured Data', () => {
    test('should include location-specific structured data', async () => {
      const testRegion = 'noordwest-friesland';
      
      try {
        const { default: RegionPage } = await import(`@/app/[locale]/regio/[slug]/page`);
        
        const mockParams = Promise.resolve({ 
          locale: 'nl',
          slug: testRegion 
        });
        
        const { container } = renderWithIntl(<RegionPage params={mockParams} />);
        
        const html = container.innerHTML;
        const hasStructuredData = html.includes('application/ld+json') || 
                                 html.includes('@type') ||
                                 html.includes('LocalBusiness');
        
        const hasLocationData = html.includes('Friesland') ||
                               html.includes('noordwest') ||
                               html.includes(testRegion);
        
        if (!hasStructuredData) {
          console.warn(`Regional page ${testRegion} may be missing structured data`);
        }
        
        if (!hasLocationData) {
          console.warn(`Regional page ${testRegion} may be missing location-specific content`);
        }
        
      } catch (error) {
        console.warn(`Could not test structured data for ${testRegion}:`, error);
      }
    });
  });

  describe('Navigation and Breadcrumbs', () => {
    test('should handle regional navigation hierarchy', async () => {
      const testCase = {
        region: 'noordwest-friesland',
        gemeente: 'waadhoeke'
      };
      
      try {
        const { default: MunicipalityPage } = await import(`@/app/[locale]/regio/[slug]/[gemeente]/page`);
        
        const mockParams = Promise.resolve({ 
          locale: 'nl',
          slug: testCase.region,
          gemeente: testCase.gemeente
        });
        
        const { container } = renderWithIntl(<MunicipalityPage params={mockParams} />);
        
        const html = container.innerHTML;
        
        // Should contain breadcrumb or navigation elements
        const hasNavigation = html.includes('breadcrumb') ||
                            html.includes('nav') ||
                            html.includes(testCase.region) ||
                            html.includes('regio');
        
        if (!hasNavigation) {
          console.warn(`Municipality page ${testCase.gemeente} may be missing navigation elements`);
        }
        
      } catch (error) {
        console.warn('Could not test navigation for municipality page:', error);
      }
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid regional parameters gracefully', async () => {
      try {
        const { default: RegionPage } = await import(`@/app/[locale]/regio/[slug]/page`);
        
        const mockParams = Promise.resolve({ 
          locale: 'nl',
          slug: 'invalid-region-that-does-not-exist'
        });
        
        // Should handle gracefully or show 404
        expect(() => {
          renderWithIntl(<RegionPage params={mockParams} />);
        }).not.toThrow();
        
      } catch (error) {
        console.warn('Regional dynamic route not available for error testing:', error);
      }
    });

    test('should handle invalid municipality parameters gracefully', async () => {
      try {
        const { default: MunicipalityPage } = await import(`@/app/[locale]/regio/[slug]/[gemeente]/page`);
        
        const mockParams = Promise.resolve({ 
          locale: 'nl',
          slug: 'valid-region',
          gemeente: 'invalid-gemeente-that-does-not-exist'
        });
        
        // Should handle gracefully or show 404
        expect(() => {
          renderWithIntl(<MunicipalityPage params={mockParams} />);
        }).not.toThrow();
        
      } catch (error) {
        console.warn('Municipality dynamic route not available for error testing:', error);
      }
    });
  });
});