// app/lib/locale-storage.ts
// localStorage utilities for language preference persistence
// Also re-exports route translation utilities for convenience

const STORAGE_KEY = 'user-language';

export type LanguagePreference = "id" | "en";

// Re-export route translation utilities
export {
  translateRoute,
  getLocalizedUrl,
  translateCurrentPath,
  parseUrlPath,
  hasTranslation,
  getAllRoutesForLocale,
  ROUTE_TRANSLATIONS,
  type RouteKey
} from './route-translations';

/**
 * Save user's language preference to localStorage
 */
export function saveLanguagePreference(locale: LanguagePreference): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch (error) {
    console.warn('Failed to save language preference:', error);
  }
}

/**
 * Get user's language preference from localStorage
 */
export function getLanguagePreference(): LanguagePreference | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'id' || stored === 'en' ? stored as LanguagePreference : null;
  } catch (error) {
    return null;
  }
}

/**
 * Clear user's language preference from localStorage
 */
export function clearLanguagePreference(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear language preference:', error);
  }
}

/**
 * Get locale-aware URL path
 * Returns empty string for English, '/id' for Indonesian
 */
export function getLocalePrefix(locale: LanguagePreference): string {
  return locale === 'id' ? '/id' : '';
}
