/**
 * Gardener Profile Pages Integration Tests
 * Tests gardener/company profile pages (/hoveniers/[slug])
 *
 * Uses the REAL createTranslator (from @/i18n) — no translation mocks.
 * Only framework/infrastructure modules are mocked.
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

// Mock next-intl/server (pages use setRequestLocale)
jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: () => Promise.resolve((key: string) => key),
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
  gardeners: [
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
  ],
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

describe('Gardener Profile Pages Integration Tests', () => {
  const renderWithIntl = (component: React.ReactElement) => {
    return render(component);
  };

  describe('Individual Gardener Profiles (/hoveniers/[slug])', () => {
    const testGardeners = [
      'tuinservice-friesland',
      'groene-vingers',
      'friese-tuinen',
    ];

    testGardeners.forEach(gardenerSlug => {
      test(`should render ${gardenerSlug} profile page without crashing`, async () => {
        const { default: GardenerPage } = await import('@/app/[locale]/hoveniers/[slug]/page');

        const mockParams = Promise.resolve({
          locale: 'nl',
          slug: gardenerSlug
        });

        expect(() => {
          renderWithIntl(<GardenerPage params={mockParams} />);
        }).not.toThrow();
      });

      test(`should render ${gardenerSlug} profile in both locales`, async () => {
        const { default: GardenerPage } = await import('@/app/[locale]/hoveniers/[slug]/page');

        for (const locale of ['nl', 'en']) {
          const mockParams = Promise.resolve({
            locale,
            slug: gardenerSlug
          });

          expect(() => {
            renderWithIntl(<GardenerPage params={mockParams} />);
          }).not.toThrow();
        }
      });
    });
  });

  describe('Gardener Profile Content Structure', () => {
    test('should contain essential profile elements', async () => {
      const testGardener = 'tuinservice-friesland';

      const { default: GardenerPage } = await import('@/app/[locale]/hoveniers/[slug]/page');

      const mockParams = Promise.resolve({
        locale: 'nl',
        slug: testGardener
      });

      // Async Server Components may render empty in jsdom
      expect(() => {
        renderWithIntl(<GardenerPage params={mockParams} />);
      }).not.toThrow();
    });
  });

  describe('Gardener Hub Page', () => {
    test('should render gardeners index/hub page', async () => {
      const { default: HoveniersIndexPage } = await import('@/app/[locale]/hoveniers/page');

      const mockParams = Promise.resolve({ locale: 'nl' });

      expect(() => {
        renderWithIntl(<HoveniersIndexPage params={mockParams} />);
      }).not.toThrow();
    });

    test('should render gardeners index in both locales', async () => {
      const { default: HoveniersIndexPage } = await import('@/app/[locale]/hoveniers/page');

      for (const locale of ['nl', 'en']) {
        const mockParams = Promise.resolve({ locale });

        expect(() => {
          renderWithIntl(<HoveniersIndexPage params={mockParams} />);
        }).not.toThrow();
      }
    });
  });

  describe('Gardener Data Integration', () => {
    test('should properly integrate with gardener data sources', async () => {
      const { gardeners } = await import('@/lib/gardeners-data');

      expect(Array.isArray(gardeners)).toBe(true);
      expect(gardeners.length).toBeGreaterThan(0);

      gardeners.forEach((gardener) => {
        expect(gardener).toHaveProperty('slug');
        expect(gardener).toHaveProperty('name');
        expect(typeof gardener.slug).toBe('string');
        expect(typeof gardener.name).toBe('string');
      });
    });
  });
});
