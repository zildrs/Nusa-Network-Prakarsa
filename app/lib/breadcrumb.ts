import { createBreadcrumbSchema, SCHEMA_BASE_URL } from "./seo";
import { parseUrlPath, translateRouteToEnglish, getLocalizedUrl } from "./route-translations";
import type { Locale } from "~/i18n";

const BASE_URL = SCHEMA_BASE_URL;

const ROUTE_LABEL_KEYS: Record<string, string> = {
  about: "nav.about",
  "case-study": "nav.caseStudy",
  contact: "nav.contact",
  "contact-wa": "nav.contact",
  careers: "nav.careers",
  blog: "nav.article",
  partners: "nav.partners",
  certifications: "nav.certification",
  policies: "nav.privacy",
  sitemap: "nav.sitemap",
};

// Route yang halaman detail-nya (punya slug tambahan) tetap punya listing/index sendiri
const HAS_INDEX_PAGE = new Set(["blog", "case-study"]);

type BreadcrumbLoaderData = {
  blog?: { title?: string };
  project?: { title?: string };
  categoryName?: string;
  solution?: { name?: string };
  title?: string;
};

/** Ambil label halaman dari loader data route yang sedang aktif (untuk breadcrumb level terakhir). */
export function extractDynamicBreadcrumbLabel(
  data: BreadcrumbLoaderData | undefined
): string | null {
  if (!data) return null;
  if (typeof data.blog?.title === "string") return data.blog.title;
  if (typeof data.project?.title === "string") return data.project.title;
  if (typeof data.categoryName === "string") return data.categoryName;
  if (typeof data.solution?.name === "string") return data.solution.name;
  if (typeof data.title === "string") return data.title;
  return null;
}

/**
 * Bangun BreadcrumbList schema dari path halaman yang sedang dibuka.
 * Return null kalau halaman tidak butuh breadcrumb (home) atau route tidak dikenal (404, dll)
 * — sengaja tidak menebak-nebak supaya tidak menghasilkan schema yang salah.
 */
export function buildBreadcrumbSchema(
  pathname: string,
  locale: Locale,
  t: (key: string) => string,
  dynamicLabel: string | null
) {
  const { mainRoute, pathSegments } = parseUrlPath(pathname);
  const englishRoute = translateRouteToEnglish(mainRoute);

  if (!englishRoute) return null; // home page, breadcrumb 1 level tidak perlu

  const home = {
    name: locale === "id" ? "Beranda" : "Home",
    url: `${BASE_URL}${locale === "id" ? "/id" : "/"}`,
  };

  // solution/:slug tidak punya halaman listing sendiri -> Home > Nama Solusi
  if (englishRoute === "solution") {
    if (!dynamicLabel) return null;
    return createBreadcrumbSchema([
      home,
      { name: dynamicLabel, url: `${BASE_URL}${pathname}` },
    ]);
  }

  const labelKey = ROUTE_LABEL_KEYS[englishRoute];
  if (!labelKey) return null; // route tidak dikenal (termasuk 404)

  const isDetailPage =
    pathSegments.length > 0 && HAS_INDEX_PAGE.has(englishRoute);

  if (!isDetailPage) {
    return createBreadcrumbSchema([
      home,
      { name: t(labelKey), url: `${BASE_URL}${pathname}` },
    ]);
  }

  const indexUrl = `${BASE_URL}${getLocalizedUrl(englishRoute, locale)}`;
  const items = [home, { name: t(labelKey), url: indexUrl }];

  if (dynamicLabel) {
    items.push({ name: dynamicLabel, url: `${BASE_URL}${pathname}` });
  }

  return createBreadcrumbSchema(items);
}
