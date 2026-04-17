import {notFound} from 'next/navigation';
import en from './locales/en/common.json';
import nl from './locales/nl/common.json';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

const allMessages: Record<string, Record<string, any>> = { en, nl };

// Translation function that works in both server and client components
export function createTranslator(locale: string) {
  const messages = allMessages[locale] || allMessages['nl'];

  return (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };
}

export async function getMessages(locale: string) {
  return allMessages[locale] || allMessages['nl'];
}
