import nlMessages from '../locales/nl/common.json';
import enMessages from '../locales/en/common.json';

export type TranslatorFn = {
  (key: string): string;
  sub: (prefix: string) => Record<string, string>;
  raw: (key: string) => unknown;
};

const messageMap: Record<string, Record<string, unknown>> = {
  nl: nlMessages,
  en: enMessages,
};

function resolve(messages: Record<string, unknown>, key: string): unknown {
  const keys = key.split('.');
  let value: unknown = messages;
  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
  }
  return value;
}

/**
 * Shared translator factory. Returns a function `t(key)` that resolves
 * dot-separated keys from the locale's `common.json`.
 *
 * Also exposes:
 * - `t.sub(prefix)` — returns a flat `Record<string, string>` of every leaf
 *   under the given prefix, with the prefix stripped from each key.
 * - `t.raw(key)` — returns the raw value (object, array, or string).
 */
export function createTranslator(locale: string): TranslatorFn {
  const messages = messageMap[locale] ?? messageMap.nl;

  const t = ((key: string): string => {
    const value = resolve(messages, key);
    return typeof value === 'string' ? value : key;
  }) as TranslatorFn;

  t.sub = (prefix: string): Record<string, string> => {
    const obj = resolve(messages, prefix);
    if (!obj || typeof obj !== 'object') return {};

    const result: Record<string, string> = {};
    const flatten = (current: unknown, path: string) => {
      for (const [k, v] of Object.entries(current as Record<string, unknown>)) {
        const newPath = path ? `${path}_${k}` : k;
        if (typeof v === 'string') {
          result[newPath] = v;
        } else if (v && typeof v === 'object' && !Array.isArray(v)) {
          flatten(v, newPath);
        }
      }
    };
    flatten(obj, '');
    return result;
  };

  t.raw = (key: string): unknown => resolve(messages, key);

  return t;
}

/** Simple interpolation: replaces {key} tokens in a translated string */
export function interp(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replaceAll(`{${k}}`, String(v)),
    template
  );
}
