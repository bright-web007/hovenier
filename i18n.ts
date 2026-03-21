import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`./locales/${locale}/common.json`)).default
  };
});

export function getTranslator(locale: string) {
  const { createTranslator } = require('next-intl');
  return createTranslator({
    locale,
    messages: require(`./locales/${locale}/common.json`)
  });
}

export async function getMessages(locale: string) {
  try {
    return require(`./locales/${locale}/common.json`);
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    return {};
  }
}
