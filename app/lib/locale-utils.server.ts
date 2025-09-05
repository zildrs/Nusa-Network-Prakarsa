import { detectLocale } from "~/lib/locale.server";

export function getRequestLocale(request: Request): "id" | "en" {
  const url = new URL(request.url);
  const qpLocale = url.searchParams.get("locale");

  if (qpLocale === "id" || qpLocale === "en") {
    return qpLocale;
  }

  return detectLocale(request);
}
