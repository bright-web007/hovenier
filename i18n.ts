import en from './locales/en/common.json';
import nl from './locales/nl/common.json';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

const allMessages: Record<string, Record<string, unknown>> = { en, nl };

function resolve(messages: Record<string, unknown>, key: string): unknown {
  const keys = key.split('.');
  let value: unknown = messages;
  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
  }
  return value;
}

// Translation function that works in both server and client components
export function createTranslator(locale: string) {
  const messages = allMessages[locale] || allMessages['nl'];

  const t = (key: string): string => {
    const value = resolve(messages, key);
    if (typeof value === 'string') return value;
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[i18n] Missing translation key: "${key}" for locale "${locale}"`);
    }
    return key;
  };

  // Return raw (non-string) values such as arrays or objects from the locale files
  t.raw = (key: string): unknown => {
    const value = resolve(messages, key);
    if (value === undefined && process.env.NODE_ENV === 'development') {
      console.warn(`[i18n] Missing raw key: "${key}" for locale "${locale}"`);
    }
    return value;
  };

  return t;
}

export function getMessages(locale: string) {
  return allMessages[locale] || allMessages['nl'];
}
