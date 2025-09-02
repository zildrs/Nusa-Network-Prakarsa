export function detectLocale(request: Request) {
  // 1) cek cookie "lang"
  const cookie = request.headers.get("Cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)lang=(id|en)\b/);
  if (match) return match[1] as "id" | "en";

  // 2) fallback ke Accept-Language
  const al = request.headers.get("Accept-Language") ?? "";
  if (/^id\b|,id\b/i.test(al)) return "id";
  return "en";
}
