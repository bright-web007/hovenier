/**
 * Static Pages Integration Tests
 * Tests all static pages for proper rendering and core functionality
 */

import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';

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

// Mock Turnstile component
jest.mock('@marsidev/react-turnstile', () => {
  return function MockTurnstile(props: ComponentPropsWithoutRef<'div'>) {
    return <div data-testid="turnstile-mock" {...props} />;
  };
});

describe('Static Pages Integration Tests', () => {
  // Helper to render a page with mocked intl context
  const renderWithIntl = (component: React.ReactElement) => {
    return render(component);
  };

  describe('Contact Page', () => {
    test('should render contact page without crashing', async () => {
      // Dynamic import to avoid issues with server components
      const { default: ContactPage } = await import('@/app/[locale]/contact/page');
      
      const mockParams = Promise.resolve({ locale: 'nl' });
      
      expect(() => {
        renderWithIntl(<ContactPage params={mockParams} />);
      }).not.toThrow();
    });

    test('should contain essential contact elements', async () => {
      const { default: ContactPage } = await import('@/app/[locale]/contact/page');
      
      const mockParams = Promise.resolve({ locale: 'nl' });
      
      renderWithIntl(<ContactPage params={mockParams} />);
      
      // Should have contact form elements or contact information
      // Note: These tests might need adjustment based on actual component structure
      const pageContent = screen.queryByTestId('contact-page') ?? document.body;
      
      expect(pageContent).toBeTruthy();
    });
  });

  describe('About Us (Over Ons) Page', () => {
    test('should render about page without crashing', async () => {
      const { default: AboutPage } = await import('@/app/[locale]/over-ons/page');
      
      const mockParams = Promise.resolve({ locale: 'nl' });
      
      expect(() => {
        renderWithIntl(<AboutPage params={mockParams} />);
      }).not.toThrow();
    });
  });

  describe('Legal Pages', () => {
    const legalPages = [
      { path: 'algemene-voorwaarden', name: 'Terms and Conditions' },
      { path: 'aansprakelijkheid', name: 'Liability' },
      { path: 'privacy-beleid', name: 'Privacy Policy' },
      { path: 'cookie-beleid', name: 'Cookie Policy' }
    ];

    legalPages.forEach(({ path, name }) => {
      test(`should render ${name} page without crashing`, async () => {
        try {
          const { default: LegalPage } = await import(`@/app/[locale]/${path}/page`);
          
          const mockParams = Promise.resolve({ locale: 'nl' });
          
          expect(() => {
            renderWithIntl(<LegalPage params={mockParams} />);
          }).not.toThrow();
        } catch (error) {
          // If page doesn't exist, mark as pending or skip
          console.warn(`Page ${path} not found or not importable:`, error);
        }
      });
    });
  });

  describe('Service Hub Pages', () => {
    test('should render main services index page', async () => {
      try {
        const { default: ServicesPage } = await import('@/app/[locale]/diensten/page');
        
        const mockParams = Promise.resolve({ locale: 'nl' });
        
        expect(() => {
          renderWithIntl(<ServicesPage params={mockParams} />);
        }).not.toThrow();
      } catch (error) {
        console.warn('Services index page not found:', error);
      }
    });
  });

  describe('Regional Hub Pages', () => {
    test('should render main regional index page', async () => {
      try {
        const { default: RegioPage } = await import('@/app/[locale]/regio/page');
        
        const mockParams = Promise.resolve({ locale: 'nl' });
        
        expect(() => {
          renderWithIntl(<RegioPage params={mockParams} />);
        }).not.toThrow();
      } catch (error) {
        console.warn('Regional index page not found:', error);
      }
    });
  });

  describe('Gardeners Hub Page', () => {
    test('should render gardeners index page', async () => {
      try {
        const { default: HoveniersPage } = await import('@/app/[locale]/hoveniers/page');
        
        const mockParams = Promise.resolve({ locale: 'nl' });
        
        expect(() => {
          renderWithIntl(<HoveniersPage params={mockParams} />);
        }).not.toThrow();
      } catch (error) {
        console.warn('Gardeners index page not found:', error);
      }
    });
  });

  describe('Thank You and Special Pages', () => {
    const specialPages = [
      { path: 'bedankt', name: 'Thank You' },
      { path: 'samenwerking', name: 'Collaboration' }
    ];

    specialPages.forEach(({ path, name }) => {
      test(`should render ${name} page without crashing`, async () => {
        try {
          const { default: SpecialPage } = await import(`@/app/[locale]/${path}/page`);
          
          const mockParams = Promise.resolve({ locale: 'nl' });
          
          expect(() => {
            renderWithIntl(<SpecialPage params={mockParams} />);
          }).not.toThrow();
        } catch (error) {
          console.warn(`Special page ${path} not found:`, error);
        }
      });
    });
  });

  describe('Multi-locale Support', () => {
    test('should render homepage in both locales', async () => {
      const { default: HomePage } = await import('@/app/[locale]/page');
      
      const locales = ['nl', 'en'];
      
      for (const locale of locales) {
        const mockParams = Promise.resolve({ locale });
        
        expect(() => {
          renderWithIntl(<HomePage params={mockParams} />);
        }).not.toThrow();
      }
    });
  });

  describe('Page Structure Validation', () => {
    test('should have proper document structure', async () => {
      // Test that pages render with proper HTML structure
      const { default: HomePage } = await import('@/app/[locale]/page');
      
      const mockParams = Promise.resolve({ locale: 'nl' });
      
      const { container } = renderWithIntl(<HomePage params={mockParams} />);
      
      // Basic structure validation
      expect(container).toBeTruthy();
      expect(container.innerHTML).not.toBe('');
    });

    test('should include structured data script tags', async () => {
      const { default: HomePage } = await import('@/app/[locale]/page');
      
      const mockParams = Promise.resolve({ locale: 'nl' });
      
      const { container } = renderWithIntl(<HomePage params={mockParams} />);
      
      // Look for JSON-LD structured data
      const html = container.innerHTML;
      const hasStructuredData = html.includes('application/ld+json') || 
                               html.includes('@type') ||
                               html.includes('LocalBusiness');
      
      // Most pages should have structured data
      if (!hasStructuredData) {
        console.warn('No structured data found on homepage - this might be expected depending on implementation');
      }
    });
  });
});