// app/lib/route-translations.ts
// Route translation mapping for English ↔ Indonesian slug conversion

import type { LanguagePreference } from './locale-storage';

/**
 * Route translation mapping between English and Indonesian slugs
 * Key: English route, Value: Indonesian route
 */
export const ROUTE_TRANSLATIONS = {
  // Main pages
  'about': 'tentang',
  'case-study': 'studi-kasus',
  'contact': 'hubungi-kami',
  'careers': 'karir',
  'partners': 'partner',  // Fixed typo from 'patner'
  'certifications': 'sertifikat',
  'blog': 'blog',

  // Solutions
  'solution': 'solusi',

  // Other pages
  'policies': 'kebijakan-privasi',
  'sitemap': 'sitemap'
} as const;

export type RouteKey = keyof typeof ROUTE_TRANSLATIONS;

/**
 * Translate an English route to Indonesian
 * Returns the original route if no translation exists
 */
export function translateRouteToIndonesian(route: string): string {
  return ROUTE_TRANSLATIONS[route as RouteKey] || route;
}

/**
 * Translate an Indonesian route to English
 * Returns the original route if no translation exists
 */
export function translateRouteToEnglish(route: string): string {
  const englishRoute = Object.entries(ROUTE_TRANSLATIONS).find(
    ([en, id]) => id === route
  )?.[0];

  return englishRoute || route;
}

/**
 * Translate a route to the specified locale
 * @param route - The route in English
 * @param locale - Target locale ('en' or 'id')
 * @returns Translated route
 */
export function translateRoute(route: string, locale: LanguagePreference): string {
  if (locale === 'id') {
    return translateRouteToIndonesian(route);
  } else {
    return translateRouteToEnglish(route);
  }
}

/**
 * Get the locale prefix for a given locale
 * @param locale - Language preference
 * @returns Empty string for 'en', '/id' for 'id'
 */
export function getLocalePrefix(locale: LanguagePreference): string {
  return locale === 'id' ? '/id' : '';
}

/**
 * Generate a localized URL path
 * @param englishRoute - The route in English (e.g., 'about' or '/about')
 * @param locale - Target locale
 * @returns Localized URL path (e.g., '/about' or '/id/tentang')
 */
export function getLocalizedUrl(englishRoute: string, locale: LanguagePreference): string {
  // Remove leading slash if present
  const cleanRoute = englishRoute.startsWith('/') ? englishRoute.slice(1) : englishRoute;

  const translatedRoute = translateRoute(cleanRoute, locale);
  const prefix = getLocalePrefix(locale);
  const result = `${prefix}/${translatedRoute}`;

  // Ensure the result always starts with '/'
  return result.startsWith('/') ? result : `/${result}`;
}

/**
 * Parse a URL path and extract route components
 * @param pathname - Full pathname (e.g., '/id/blog/category/tech')
 * @returns Object with locale, main route, and remaining path segments
 */
export function parseUrlPath(pathname: string): {
  locale: LanguagePreference;
  mainRoute: string;
  pathSegments: string[];
  fullPath: string;
} {
  const segments = pathname.split('/').filter(Boolean);

  // Check if first segment is locale
  const hasLocalePrefix = segments[0] === 'id';
  const locale: LanguagePreference = hasLocalePrefix ? 'id' : 'en';

  // Extract main route (first segment after locale prefix if present)
  const mainRouteIndex = hasLocalePrefix ? 1 : 0;
  const mainRoute = segments[mainRouteIndex] || '';

  // Remaining segments after main route
  const pathSegments = segments.slice(mainRouteIndex + 1);

  return {
    locale,
    mainRoute,
    pathSegments,
    fullPath: pathname
  };
}

/**
 * Translate the current page context to another locale
 * @param currentPath - Current pathname (e.g., '/about')
 * @param targetLocale - Target locale to translate to
 * @returns Translated pathname (e.g., '/id/tentang')
 */
export function translateCurrentPath(currentPath: string, targetLocale: LanguagePreference): string {
  const { mainRoute, pathSegments } = parseUrlPath(currentPath);

  // Translate the main route
  const translatedMainRoute = translateRoute(mainRoute, targetLocale);

  // Reconstruct the path
  const prefix = getLocalePrefix(targetLocale);
  const remainingPath = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '';

  // Ensure we always return a path starting with '/'
  const result = `${prefix}/${translatedMainRoute}${remainingPath}`;
  return result.startsWith('/') ? result : `/${result}`;
}

/**
 * Check if a route has a translation
 * @param route - Route to check
 * @returns True if route exists in translation mapping
 */
export function hasTranslation(route: string): boolean {
  return route in ROUTE_TRANSLATIONS ||
         Object.values(ROUTE_TRANSLATIONS).includes(route as any);
}

/**
 * Get all available routes for a locale
 * @param locale - Target locale
 * @returns Array of all routes in the specified locale
 */
export function getAllRoutesForLocale(locale: LanguagePreference): string[] {
  const englishRoutes = Object.keys(ROUTE_TRANSLATIONS);

  if (locale === 'id') {
    return englishRoutes.map(route => translateRouteToIndonesian(route));
  } else {
    return englishRoutes;
  }
}
