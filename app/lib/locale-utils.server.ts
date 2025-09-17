import { detectLocale } from "~/lib/locale.server";

export function getRequestLocale(request: Request): "id" | "en" {
  const url = new URL(request.url);

  // 1) Check URL path for locale prefix (highest priority)
  const pathSegments = url.pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0) {
    const firstSegment = pathSegments[0];
    if (firstSegment === "id" || firstSegment === "en") {
      return firstSegment as "id" | "en";
    }
  }

  // 2) Check query parameter (backward compatibility)
  const qpLocale = url.searchParams.get("locale");
  if (qpLocale === "id" || qpLocale === "en") {
    return qpLocale;
  }

  // 3) Check for user's language preference in cookies
  const cookies = request.headers.get("Cookie") ?? "";
  const userLangMatch = cookies.match(/(?:^|;\s*)user-language=(id|en)\b/);
  if (userLangMatch) {
    return userLangMatch[1] as "id" | "en";
  }

  // 4) Fallback to existing detection (Accept-Language header)
  return detectLocale(request);
}
