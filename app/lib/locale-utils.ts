import type { Locale } from "~/i18n";

const LOCALE_SEGMENTS: Locale[] = ["en", "id"];

export function inferLocaleFromUrl(url: URL): Locale {
  const segment = url.pathname.split("/").filter(Boolean)[0];
  if (segment && (LOCALE_SEGMENTS as string[]).includes(segment)) {
    return segment as Locale;
  }
  return "en";
}
