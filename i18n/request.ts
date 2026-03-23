// Legacy i18n configuration - no longer used with static JSON approach
export const locales = ['en', 'nl'] as const;
export type Locale = typeof locales[number];
export const defaultLocale = 'nl';