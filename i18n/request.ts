import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'nl'] as const;
export type Locale = typeof locales[number];
export const defaultLocale = 'nl';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }
  
  try {
    return {
      messages: (await import(`../locales/${locale}/common.json`)).default,
      timeZone: 'Europe/Amsterdam',
      now: new Date(),
      formats: {
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short', 
            year: 'numeric'
          }
        }
      }
    };
  } catch (error) {
    // Fallback to empty messages if locale file doesn't exist  
    console.error(`Failed to load messages for locale ${locale}:`, error);
    return {
      messages: {},
      timeZone: 'Europe/Amsterdam',
      now: new Date()
    };
  }
});