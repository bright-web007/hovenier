/**
 * Unit tests for lib/locale-utils.ts - Core internationalization utilities  
 * 
 * Tests the path manipulation functions used by proxy.ts and throughout the app.
 * Focus on the core functions that handle locale detection and path transformation.
 */

import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getPathLocale,
  stripLocalePrefix,
  getInternalPath,
  localizePath,
  switchLocalePath,
  getAbsoluteUrl,
  getServerCookieLocale,
  getServerAcceptLanguage,
} from '../lib/locale-utils';

describe('locale-utils.ts', () => {
  describe('getPathLocale()', () => {
    test('should return "en" for English paths', () => {
      expect(getPathLocale('/en')).toBe('en');
      expect(getPathLocale('/en/')).toBe('en');
      expect(getPathLocale('/en/diensten')).toBe('en');
      expect(getPathLocale('/en/diensten/groendak')).toBe('en');
    });

    test('should return default locale "nl" for Dutch and non-locale paths', () => {
      expect(getPathLocale('/')).toBe('nl');
      expect(getPathLocale('/nl')).toBe('nl');
      expect(getPathLocale('/nl/')).toBe('nl');
      expect(getPathLocale('/diensten')).toBe('nl');
      expect(getPathLocale('/diensten/groendak')).toBe('nl');
      expect(getPathLocale('/nl/diensten')).toBe('nl');
    });

    test('should handle edge cases', () => {
      expect(getPathLocale('')).toBe('nl');
      expect(getPathLocale('/english')).toBe('nl'); // Not exactly '/en'
      expect(getPathLocale('/en2')).toBe('nl'); // Not exactly '/en'
    });
  });

  describe('stripLocalePrefix()', () => {
    test('should strip English locale prefix', () => {
      expect(stripLocalePrefix('/en')).toBe('/');
      expect(stripLocalePrefix('/en/')).toBe('/');
      expect(stripLocalePrefix('/en/diensten')).toBe('/diensten');
      expect(stripLocalePrefix('/en/diensten/groendak')).toBe('/diensten/groendak');
    });

    test('should strip Dutch locale prefix', () => {
      expect(stripLocalePrefix('/nl')).toBe('/');
      expect(stripLocalePrefix('/nl/')).toBe('/');
      expect(stripLocalePrefix('/nl/diensten')).toBe('/diensten');
      expect(stripLocalePrefix('/nl/diensten/groendak')).toBe('/diensten/groendak');
    });

    test('should leave non-locale paths unchanged', () => {
      expect(stripLocalePrefix('/')).toBe('/');
      expect(stripLocalePrefix('/diensten')).toBe('/diensten');
      expect(stripLocalePrefix('/diensten/groendak')).toBe('/diensten/groendak');
      expect(stripLocalePrefix('/contact')).toBe('/contact');
    });

    test('should handle query parameters and fragments', () => {
      expect(stripLocalePrefix('/en/search?q=test')).toBe('/search?q=test');
      expect(stripLocalePrefix('/nl/contact#form')).toBe('/contact#form');
    });

    test('should handle edge cases', () => {
      expect(stripLocalePrefix('')).toBe('');
      expect(stripLocalePrefix('/english')).toBe('/english'); // Not a locale prefix
      expect(stripLocalePrefix('/nl2')).toBe('/nl2'); // Not exact match
    });
  });

  describe('getInternalPath()', () => {
    test('should return stripped path for simple routes', () => {
      expect(getInternalPath('/diensten')).toBe('/diensten');
      expect(getInternalPath('/contact')).toBe('/contact');
      expect(getInternalPath('/regio/leeuwarden')).toBe('/regio/leeuwarden');
    });

    test('should strip locale prefix first', () => {
      expect(getInternalPath('/en/diensten')).toBe('/diensten');
      expect(getInternalPath('/nl/contact')).toBe('/contact');
      expect(getInternalPath('/en/regio/leeuwarden')).toBe('/regio/leeuwarden');
    });

    test('should handle homepage routes', () => {
      expect(getInternalPath('/')).toBe('/');
      expect(getInternalPath('/en')).toBe('/');
      expect(getInternalPath('/nl')).toBe('/');
    });

    test('should handle complex paths', () => {
      expect(getInternalPath('/en/diensten/groendak')).toBe('/diensten/groendak');
      expect(getInternalPath('/nl/regio/noordwest-friesland/harlingen')).toBe('/regio/noordwest-friesland/harlingen');
    });
  });

  describe('localizePath()', () => {
    test('should return Dutch paths with /nl prefix', () => {
      expect(localizePath('/diensten', 'nl')).toBe('/nl/diensten');
      expect(localizePath('/contact', 'nl')).toBe('/nl/contact');
      expect(localizePath('/', 'nl')).toBe('/nl');
      expect(localizePath('/regio/leeuwarden', 'nl')).toBe('/nl/regio/leeuwarden');
    });

    test('should return English paths with /en prefix', () => {
      expect(localizePath('/diensten', 'en')).toBe('/en/diensten');
      expect(localizePath('/contact', 'en')).toBe('/en/contact');
      expect(localizePath('/', 'en')).toBe('/en');
      expect(localizePath('/regio/leeuwarden', 'en')).toBe('/en/regio/leeuwarden');
    });

    test('should handle already localized paths', () => {
      // Should normalize by getting internal path first
      expect(localizePath('/en/diensten', 'nl')).toBe('/nl/diensten');
      expect(localizePath('/nl/contact', 'en')).toBe('/en/contact');
    });

    test('should handle empty strings', () => {
      expect(localizePath('', 'nl')).toBe('/nl');
      expect(localizePath('', 'en')).toBe('/en');
    });
  });

  describe('switchLocalePath()', () => {
    test('should switch between locales', () => {
      expect(switchLocalePath('/nl/diensten', 'en')).toBe('/en/diensten');
      expect(switchLocalePath('/en/diensten', 'nl')).toBe('/nl/diensten');
      expect(switchLocalePath('/nl/contact', 'en')).toBe('/en/contact');
      expect(switchLocalePath('/en/contact', 'nl')).toBe('/nl/contact');
    });

    test('should handle homepage switching', () => {
      expect(switchLocalePath('/nl', 'en')).toBe('/en');
      expect(switchLocalePath('/en', 'nl')).toBe('/nl');
    });
  });

  describe('getAbsoluteUrl()', () => {
    // Mock environment variable  
    const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;

    beforeEach(() => {
      process.env.NEXT_PUBLIC_BASE_URL = 'https://hovenier.frl';
    });

    afterEach(() => {
      process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
    });

    test('should generate absolute URLs for Dutch locale', () => {
      expect(getAbsoluteUrl('/diensten', 'nl')).toBe('https://hovenier.frl/nl/diensten');
      expect(getAbsoluteUrl('/', 'nl')).toBe('https://hovenier.frl/nl');
      expect(getAbsoluteUrl('/contact', 'nl')).toBe('https://hovenier.frl/nl/contact');
    });

    test('should generate absolute URLs for English locale', () => {
      expect(getAbsoluteUrl('/diensten', 'en')).toBe('https://hovenier.frl/en/diensten');
      expect(getAbsoluteUrl('/', 'en')).toBe('https://hovenier.frl/en');
      expect(getAbsoluteUrl('/contact', 'en')).toBe('https://hovenier.frl/en/contact');
    });
  });

  describe('Server-side locale functions', () => {
    describe('getServerCookieLocale()', () => {
      test('should extract locale from cookie header', () => {
        expect(getServerCookieLocale('hovenier-language-preference=en')).toBe('en');
        expect(getServerCookieLocale('other=value; hovenier-language-preference=nl; another=test')).toBe('nl');
      });

      test('should return null for invalid or missing cookies', () => {
        expect(getServerCookieLocale(null)).toBe(null);
        expect(getServerCookieLocale('')).toBe(null);
        expect(getServerCookieLocale('other=value')).toBe(null);
        expect(getServerCookieLocale('hovenier-language-preference=invalid')).toBe(null);
      });
    });

    describe('getServerAcceptLanguage()', () => {
      test('should parse Accept-Language header with quality values', () => {
        expect(getServerAcceptLanguage('en-US,en;q=0.9,nl;q=0.8')).toBe('en');
        expect(getServerAcceptLanguage('nl,en;q=0.9,fr;q=0.8')).toBe('nl');
        expect(getServerAcceptLanguage('nl;q=0.9,en;q=0.8')).toBe('nl');
      });

      test('should handle simple Accept-Language headers', () => {
        expect(getServerAcceptLanguage('en')).toBe('en');
        expect(getServerAcceptLanguage('nl')).toBe('nl');
        expect(getServerAcceptLanguage('en-US')).toBe('en');
        expect(getServerAcceptLanguage('nl-NL')).toBe('nl');
      });

      test('should fall back to default locale for unsupported languages', () => {
        expect(getServerAcceptLanguage(null)).toBe(DEFAULT_LOCALE);
        expect(getServerAcceptLanguage('')).toBe(DEFAULT_LOCALE);
        expect(getServerAcceptLanguage('fr,de,it')).toBe(DEFAULT_LOCALE);
        expect(getServerAcceptLanguage('fr-FR,de-DE;q=0.9')).toBe(DEFAULT_LOCALE);
      });

      test('should respect quality ordering', () => {
        expect(getServerAcceptLanguage('fr;q=0.9,en;q=0.8,nl;q=0.7')).toBe('en');
        expect(getServerAcceptLanguage('fr;q=0.9,nl;q=0.8,en;q=0.7')).toBe('nl');
      });
    });
  });

  describe('Constants and types', () => {
    test('should export correct constants', () => {
      expect(DEFAULT_LOCALE).toBe('nl');
      expect(SUPPORTED_LOCALES).toEqual(['nl', 'en']);
    });
  });
});