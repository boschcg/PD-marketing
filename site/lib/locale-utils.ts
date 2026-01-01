import { Locale } from './i18n';

// Supported locales - explicitly defined and must match middleware
const SUPPORTED_LOCALES = ['en'] as const;

/**
 * Get a valid locale from a string input.
 * If the input is not a supported locale, returns 'en' as fallback.
 * 
 * @param locale - The locale string to validate
 * @returns A valid Locale (currently always 'en')
 */
export function getValidLocale(locale: string): Locale {
  // Explicitly check against supported locales
  if (locale === 'en') {
    return 'en';
  }
  
  // Invalid locale - return default
  // In production, this should be logged or handled more explicitly
  // For now, silently fall back to 'en'
  return 'en';
}

/**
 * Check if a locale string is supported.
 * 
 * @param locale - The locale string to check
 * @returns true if the locale is supported, false otherwise
 */
export function isSupportedLocale(locale: string): locale is Locale {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return SUPPORTED_LOCALES.includes(locale as any);
}

