import {notFound} from 'next/navigation';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

// Simple translation function that loads from static JSON
export function createTranslator(locale: string) {
  let messages: Record<string, any> = {};
  
  try {
    if (locale === 'nl') {
      messages = require(`./locales/nl/common.json`);
    } else {
      messages = require(`./locales/en/common.json`);
    }
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    messages = {};
  }
  
  return (key: string) => {
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };
}

export async function getMessages(locale: string) {
  try {
    return require(`./locales/${locale}/common.json`);
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    return {};
  }
}
