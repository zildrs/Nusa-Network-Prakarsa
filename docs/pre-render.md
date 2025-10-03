# React Router 7 Pre-render RFC

## Executive Summary
- Disable runtime SSR (`ssr: false`) and rely on React Router pre-rendering to ship static HTML for every user-facing path.
- Generate HTML and `.data` assets at build time so search engines receive fully rendered pages and hydration has all loader data baked in.
- Move Strapi data access out of request-time loaders and into build-time utilities that can be reused by loaders during prerender runs.
- Guarantee both English and Indonesian variants are rendered up front, and document the operational trade-offs (content stale until rebuild, need for automation).

## Current Architecture Snapshot
- `npm run build` must run with `ALLOW_INSECURE_TLS=1` until the Strapi TLS chain is fixed.

- `package.json:1` scripts use the React Router CLI (`react-router dev/build/start`) and assume an SSR bundle at `build/server/index.js`.
- `react-router.config.ts:1` now disables SSR and enumerates prerendered paths for both locales.
- `app/lib/api.build.ts` provides build-time helpers (`fetchBlogCollection`, `fetchCertificationsCollection`, etc.) so loaders work without a real `Request`.
- `app/routes/*.tsx` now rely on build-time helpers and URL locale inference; blog loaders also fall back to EN data when ID payloads are empty.
- `app/i18n.ts` ships both locale dictionaries at build time and exposes `createT(locale)` so components can translate strings once they know the locale.

## Goals & Guardrails
- Produce a static build that matches the current route map (including `/id/*` mirrors) for better SEO and faster FCP/LCP.
- Preserve existing data contracts and component APIs so route components change minimally.
- Keep loaders for pre-rendered routes deterministic: no per-user branching, no reliance on cookies, and no `action`/`headers` exports.
- Document operational gaps called out in `todo.md` (manual rebuilds, webhook automation) so we can plan mitigation before the cut-over.

## Proposed Architecture

### 1. Config Changes (`react-router.config.ts`)
- Flip SSR off and enumerate the paths that must exist as static HTML.
- Keep using the React Router CLI – `react-router build` already invokes the prerender pipeline when `prerender` is set.

```ts
import type { Config } from "@react-router/dev/config";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/careers",
  "/blog",
  "/case-study",
  "/partners",
  "/certifications",
  "/policies",
  "/sitemap",
  "/id",
  "/id/tentang",
  "/id/hubungi-kami",
  "/id/karir",
  "/id/blog",
  "/id/studi-kasus",
  "/id/partner",
  "/id/sertifikat",
  "/id/kebijakan-privasi",
  "/id/sitemap",
];

export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    const paths = [...staticRoutes];

    // Dynamic collections
    paths.push(...(await buildBlogPaths()));
    paths.push(...(await buildCaseStudyPaths()));
    paths.push(...(await buildSolutionPaths()));

    return paths;
  },
} satisfies Config;
```

> `buildBlogPaths`, `buildCaseStudyPaths`, and `buildSolutionPaths` (described below) live in a build-only module and emit fully qualified paths for each locale (for example `/blog/read/${slug}` and `/id/blog/read/${slug}`).

### 2. Build-time Data Layer (`app/lib/api.build.ts`)
- Split Strapi access into a build-safe module so prerendering can fetch data without a real `Request`.
- Reuse `createApiRequest` for authentication, retries, and query construction to avoid drift with the runtime helpers.
- Normalise results by locale so loaders can hydrate predictable objects.

```ts
import { createApiRequest } from "~/lib/request.server";
import type { Locale } from "~/i18n";
import type { BackendBlogResponse, BlogPost } from "~/types/blog";

const API_BASE = "https://dash.nusanetwork.com/api/";
const DEFAULT_PAGE_SIZE = 50;

type LocaleOption = { locale: Locale };

type PaginatedOption = LocaleOption & {
  pagination?: { page?: number; pageSize?: number };
  categoryName?: string;
};

export async function fetchBlogCollection({
  locale,
  pagination,
  categoryName,
}: PaginatedOption) {
  const query: Record<string, string | number> = {
    locale,
    populate: "*",
    "pagination[page]": pagination?.page ?? 1,
    "pagination[pageSize]": pagination?.pageSize ?? DEFAULT_PAGE_SIZE,
  };

  if (categoryName) {
    query["filters[category][name][$eq]"] = categoryName;
  }

  const json = await createApiRequest<BackendBlogResponse>(API_BASE, "blogs", {
    query,
    serviceName: "blog-build",
  });

  return {
    locale,
    blogs: Array.isArray(json?.data) ? (json.data as BlogPost[]) : [],
    meta: json?.meta,
  };
}
```

- Mirror this pattern for case studies, solutions, partners, etc. Functions should accept `{ locale }` input (plus any identifiers) and return serialisable data that matches the existing loader contracts.
- Guard each helper with basic error wrapping so the build can fail fast when the CMS is unreachable; this is critical for CI visibility.

### 3. Path Generation Helpers (`app/lib/prerender-paths.server.ts`)
- Consolidate locale-aware path creation to ensure `/` and `/id` trees stay in sync.

```ts
import { fetchBlogCollection } from "~/lib/api.build";
import { nameToSlug } from "~/lib/utils";

const locales: Locale[] = ["en", "id"];

export async function buildBlogPaths() {
  const paths: string[] = [];

  // Indexes per locale
  for (const locale of locales) {
    paths.push(locale === "en" ? "/blog" : `/id/blog`);
  }

  const collections = await Promise.all(
    locales.map((locale) => fetchBlogCollection({ locale }))
  );

  for (const { locale, blogs } of collections) {
    const prefix = locale === "en" ? "" : `/id`;

    for (const blog of blogs) {
      const slug = blog.attributes.slug;
      paths.push(`${prefix}/blog/read/${slug}`);

      const categoryName = blog.attributes.category?.data?.attributes?.name;
      if (categoryName) {
        paths.push(`${prefix}/blog/${nameToSlug(categoryName)}`);
      }
    }
  }

  return Array.from(new Set(paths));
}
```

- Use the same strategy for case studies (`/case-study/${slug}` ↔ `/id/studi-kasus/${slug}`) and solutions.
- Keep helpers pure: return strings only. React Router takes care of issuing synthetic `Request` objects for every path in the returned array and will call the matching loaders during the build.

### 4. Route Migration Patterns

#### Static Marketing Routes (no params)
1. Remove any server-only logic from loaders (for example, cookie parsing). Static sections should either have no loader or use a build-safe helper that returns shared content blocks.
2. Ensure the route is listed in `staticRoutes`. Example:

```ts
// app/routes/contact.tsx
export const handle = { sitemap: "/contact" };

export async function loader() {
  const locale = "en"; // Hard-coded for marketing page
  return {
    hero: await fetchHeroCopy({ locale }),
  };
}
```

#### Collections (`blog.tsx`, category listings)
1. Keep the route loader, but swap `fetchBlogData(request)` with build helpers that accept a `Locale` (derive it from the request URL so the same code works for prerender and client rebuilds).
2. Make pagination deterministic. If we need multiple pages, enumerate each `/blog?page=n` variant in the prerender config; otherwise, cap the page size (`DEFAULT_PAGE_SIZE`) so all posts fit in one page.
3. Use the existing component unchanged because `useLoaderData` still receives the same shape.

```ts
// app/routes/blog.tsx
import { inferLocaleFromUrl } from "~/lib/locale-utils"; // new shared helper
import { fetchBlogCollection, fetchCategories } from "~/lib/api.build";

export async function loader({ request }: Route.LoaderArgs) {
  const locale = inferLocaleFromUrl(new URL(request.url));

  const [{ blogs }, { categories }] = await Promise.all([
    fetchBlogCollection({ locale }),
    fetchCategories({ locale }),
  ]);

  return { blogs, categories, locale };
}
```

> During prerender the `request` provided by React Router will have the full path (for example `http://localhost/id/blog`), so `inferLocaleFromUrl` can use the path segment instead of cookies.

#### Dynamic Detail Routes (`blog-read`, `case-study/$slug`)
1. Generate every slug in the `build*Paths` helpers.
2. Update loaders to accept `{ params }` plus a derived locale, and call the build utilities with those inputs.
3. Remove `action`/`headers` exports – they are not supported when `ssr: false`.

```ts
// app/routes/blog-detail.tsx
export async function loader({ request, params }: Route.LoaderArgs) {
  const locale = inferLocaleFromUrl(new URL(request.url));
  const slug = params.slug;

  invariant(slug, "Blog detail requires a slug");

  const { blogs } = await fetchBlogCollection({ locale });
  const post = blogs.find((b) => b.attributes.slug === slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return { post, locale };
}
```

- If some datasets are too large to keep in memory, store build-time snapshots in `app/generated/*.json` and import them in loaders (React Router bundles build outputs that are imported statically).

### 5. Internationalisation
- `app/i18n.ts` already bundles both dictionaries; no change required to use `createT(locale)` at render time.
- Ensure every prerendered path encodes its locale (`/` vs `/id`) so loaders can determine the language without cookies.
- When adding future locales, extend the shared `locales` array in the path helpers and add matching static routes.
- Any text coming from Strapi should stay bilingual; ensure the build helpers request both locales so we can pre-render each variant.

### 6. Build & Deployment Workflow
- Development remains `npm run dev`; prerendered pages are calculated on the fly but not written to disk until `npm run build`.
- Production build (`npm run build`) now outputs `build/client/**/*.html` and `*.data` files only; `build/server` is no longer needed once `ssr:false` lands. Update `npm run start` to use a static server (for example `npx serve build/client`) before launch.
- Add a post-build smoke test that asserts critical HTML files exist (`/index.html`, `/blog.html`, `/id/blog.html`, etc.) to catch gaps early.

## Implementation Plan

### Phase 1 – Preparation (complete)
- [x] Add `app/lib/api.build.ts` with locale-aware functions for blogs, case studies, solutions, partners, certifications.
- [x] Create shared locale helpers (`inferLocaleFromUrl`) that work at build time.
- [ ] Validate Strapi credentials and rate-limits from the build environment (still recommended ahead of CI rollout).
- [ ] Provide lightweight unit tests (Vitest) for the new build helpers (pending).

### Phase 2 – Configuration (complete)
- [x] Update `react-router.config.ts` (`ssr: false`, prerender function, SPA fallback decision).
- [ ] Implement `app/lib/prerender-paths.server.ts` and wire it into the config.
- [x] Run `npm run build` to confirm paths render and inspect `build/client` output (`ALLOW_INSECURE_TLS=1 npm run build`).
- Note: Builds require `ALLOW_INSECURE_TLS=1` until the Strapi TLS chain is fixed so prerendering can fetch CMS data without SSR.

### Phase 3 – Route Migration (complete)
- [x] Migrate static marketing routes to build-safe loaders or pure components.
- [x] Refactor blog index (`app/routes/blog.tsx`), blog categories, and blog detail to use build helpers (with locale fallback).
- [x] Apply the same pattern to case studies, solutions, partners, testimonials, etc.
- [x] Remove incompatible exports (`action`, `headers`) from pre-rendered routes (resource set-locale removed).

### Phase 4 – Content Freshness Strategy (in progress)
- [ ] Document Strapi → build webhook flow (recommended: CMS triggers a deploy hook that runs `npm run build` + upload).
- [ ] Decide on rebuild cadence for non-critical updates (daily fallback).
- [ ] Add monitoring/alerts for failed webhook builds.

### Phase 5 – Deployment & QA (in progress)
- [ ] Replace `npm run start` with a static file server command (or configure hosting platform accordingly).
- [ ] Configure CDN/hosting rewrites for SPA fallback (`__spa-fallback.html`) if some routes stay client-only.
- [ ] Run Lighthouse/PSI before and after to document SEO gains.
- [ ] Communicate content workflow changes to marketing.

## Risks & Mitigations
- **Stale content:** No runtime fetch means CMS updates require rebuilds. Mitigate with automated deploy hooks and emergency manual build instructions.
- **Large datasets:** Pre-rendering thousands of pages inflates build time. Start with high-value routes (blog, case studies) and monitor total build duration; consider pagination limits or splitting builds if needed.
- **Locale drift:** Missing `/id/*` counterparts will cause 404s. Centralise locale lists and add tests that assert every English path has an Indonesian equivalent.
- **API failures during build:** Treat build helper errors as fatal so CI fails fast; add retry/backoff logic around Strapi requests.

## Open Questions & Next Steps
- Automate passing `ALLOW_INSECURE_TLS=1` (or fix Strapi certs) in CI/CD.
- Add monitoring around the EN fallback so we notice if ID content is missing unexpectedly.
- Consider caching CMS responses during build to reduce load and enable deterministic testing.

- Confirm whether any routes still require runtime interactivity (forms that post to actions); if so, convert them to client submissions or leave them in SPA fallback.
- Decide where build-time snapshots should live (`app/generated/` vs. injecting into route bundles) to balance bundle size and clarity.
- Evaluate whether the existing `react-router-serve` start script should be removed once we ship to static hosting.
- After Phase 3, schedule a rehearsal build + deploy in staging to validate webhooks and CDN behaviour before production cut-over.
