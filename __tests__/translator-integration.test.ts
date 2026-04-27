/**
 * Translator Integration Tests
 *
 * These tests use the REAL createTranslator implementations with the actual
 * JSON locale files — no mocks. This ensures that translation keys used by
 * components actually exist in the locale files and resolve to real strings.
 */

import { createTranslator as createTranslatorI18n } from '@/i18n';
import { createTranslator as createTranslatorLib } from '@/lib/translator';

// Helper: asserts the value is a non-empty string that differs from the key
// (if the translator returns the key itself, it means the key was not found)
function expectTranslated(value: string, key: string) {
  expect(typeof value).toBe('string');
  expect(value.length).toBeGreaterThan(0);
  expect(value).not.toBe(key);
}

describe('Real translator integration (i18n.ts)', () => {
  const locales = ['nl', 'en'] as const;

  describe.each(locales)('locale: %s', (locale) => {
    const t = createTranslatorI18n(locale);

    // Keys used by PrivacyHero.tsx
    test('privacy_page_extra keys resolve to real strings', () => {
      expectTranslated(t('privacy_page_extra.hero_title'), 'privacy_page_extra.hero_title');
      expectTranslated(t('privacy_page_extra.hero_last_updated'), 'privacy_page_extra.hero_last_updated');
    });

    // Keys used by ContactForm.tsx
    test('contact_page form keys resolve to real strings', () => {
      const keys = [
        'contact_page.form_eyebrow',
        'contact_page.form_title',
        'contact_page.form_subtitle',
        'contact_page.first_name',
        'contact_page.last_name',
        'contact_page.subject_label',
        'contact_page.message_label',
        'contact_page.send_button',
      ];
      for (const key of keys) {
        expectTranslated(t(key), key);
      }
    });

    // Keys used by contact page.tsx
    test('contact_page meta keys resolve to real strings', () => {
      expectTranslated(t('contact_page.meta_title'), 'contact_page.meta_title');
      expectTranslated(t('contact_page.meta_description'), 'contact_page.meta_description');
    });

    // Top-level keys used across the site
    test('top-level keys resolve to real strings', () => {
      const keys = [
        'welcome',
        'services',
        'request_quote',
        'hero_title',
        'hero_subtitle',
        'breadcrumb_home',
      ];
      for (const key of keys) {
        expectTranslated(t(key), key);
      }
    });

    // t.raw should return objects for nested namespaces
    test('t.raw returns structured data for nested keys', () => {
      const leadForm = t.raw('lead_form');
      expect(leadForm).toBeDefined();
      expect(typeof leadForm).toBe('object');
      expect((leadForm as Record<string, unknown>).describe_wishes).toBeDefined();
    });
  });
});

describe('Real translator integration (lib/translator.ts)', () => {
  const locales = ['nl', 'en'] as const;

  describe.each(locales)('locale: %s', (locale) => {
    const t = createTranslatorLib(locale);

    // Keys used by bedankt/page.tsx
    test('thank_you_page keys resolve to real strings', () => {
      const keys = [
        'thank_you_page_title',
        'thank_you_page_subtitle',
        'thank_you_page_what_happens_next',
        'thank_you_page_step_1',
        'thank_you_page_step_2',
        'thank_you_page_step_3',
        'thank_you_page_back_home',
      ];
      for (const key of keys) {
        expectTranslated(t(key), key);
      }
    });

    // t.sub should return flattened key-value pairs for a namespace
    test('t.sub returns flattened entries for nested keys', () => {
      const sub = t.sub('lead_form');
      expect(typeof sub).toBe('object');
      expect(Object.keys(sub).length).toBeGreaterThan(0);
      // Every value should be a non-empty string
      for (const [, v] of Object.entries(sub)) {
        expect(typeof v).toBe('string');
        expect(v.length).toBeGreaterThan(0);
      }
    });

    // t.raw should also work on this translator
    test('t.raw returns structured data for nested keys', () => {
      const privacyExtra = t.raw('privacy_page_extra');
      expect(privacyExtra).toBeDefined();
      expect(typeof privacyExtra).toBe('object');
    });
  });
});

describe('Locale parity', () => {
  const tNl = createTranslatorI18n('nl');
  const tEn = createTranslatorI18n('en');

  test('both locales resolve the same keys (no missing translations)', () => {
    const keys = [
      'welcome',
      'hero_title',
      'hero_subtitle',
      'privacy_page_extra.hero_title',
      'contact_page.form_title',
      'contact_page.send_button',
      'thank_you_page_title',
    ];
    for (const key of keys) {
      const nl = tNl(key);
      const en = tEn(key);
      expectTranslated(nl, key);
      expectTranslated(en, key);
      // The two locales should have different translations
      expect(nl).not.toBe(en);
    }
  });
});
