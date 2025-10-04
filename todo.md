# React Router 7 Pre-render Rollout (Blog First)

## Objective
Pre-render all blog-related routes using React Router 7 `ssr: false` while laying groundwork to expand the approach to the rest of the site. Success means `/blog`, category listings, and individual posts have static HTML/data outputs for both `en` and `id` locales after `npm run build`.

## Phase 1 – Build-time Data Layer (Blog Only)
- [x] Create `app/lib/api.build.ts` with blog-specific helpers:
  - [x] `fetchBlogCollection({ locale, categoryName? })`
  - [x] `fetchBlogCategories({ locale })`
- [x] Add shared locale utility (`inferLocaleFromUrl`) usable during prerender.
- [ ] Write lightweight Vitest coverage or script to smoke test Strapi connectivity for the new helpers.

## Phase 2 – Prerender Configuration (Scoped to Blog)
- [x] Implement `app/lib/prerender-paths.server.ts` with `buildBlogPaths()` producing slugs + categories for both locales.
- [x] Update `react-router.config.ts`:
  - [x] Set `ssr: false`.
  - [x] Define `staticRoutes` placeholder for existing marketing pages.
  - [x] Invoke `buildBlogPaths()` inside `prerender()`.
- [x] Decide on SPA fallback strategy for non-blog routes pending migration and document in `docs/pre-render.md` (link existing guidance).

## Phase 2b – Static Marketing Routes
- [x] Extend `app/lib/api.build.ts` with solutions/projects/testimonials/home/certifications/departments/partners helpers.
- [x] Refactor `home.tsx`, `about.tsx`, `careers.tsx`, `partners.tsx` loaders to use build helpers + URL locale inference.
- [x] Add static marketing paths to `react-router.config.ts` prerender set.
- [x] Ensure Strapi fetches are resilient by allowing `ALLOW_INSECURE_TLS=1` during builds and falling back to EN data for empty locales.

## Phase 3 – Blog Route Migration
- [x] Refactor `app/routes/blog.tsx` loader to use build helpers (no direct `Request`-based fetch).
- [x] Update `app/routes/blog-category.tsx` to reuse build helpers and generated data.
- [x] Update `app/routes/blog-detail.tsx` to source posts from build-time collections; ensure 404 handling works without SSR.
- [x] Remove any `action`/`headers` exports from blog-related routes if present.

## Phase 4 – Verification
- [x] Run `npm run build` and confirm generated files:
  - [x] `build/client/blog/index.html` and `.data`
  - [x] `build/client/id/blog/index.html` and `.data`
  - [x] Blog detail/category paths emitted via `buildBlogPaths()`
- [ ] Smoke test blog routes via `npm run dev` to ensure loaders still hydrate correctly (dev stays SSR-backed).
- [ ] Manually inspect rendered HTML contains post content for each locale.
- [ ] Capture build duration + CMS request counts for future optimization.

## Phase 5 – Follow-up Preparation
- [ ] Update `docs/pre-render.md` with observations/adjustments from blog rollout.
- [ ] Outline next route group (e.g., case studies) using same pattern once blog is verified.
- [ ] Draft webhook automation plan for Strapi-triggered rebuilds (reuse existing section but add blog-specific notes).

- [x] `home.tsx` – switched to build helpers + URL locale parsing.
- [x] `about.tsx`
- [x] `careers.tsx`
- [x] `partners.tsx`
- [x] `certifications.tsx`
- [x] `case-study.tsx`
- [x] `case-study-detail.tsx` – slug matching now aligned with prerender path generation.
- [x] `solutions-detail.tsx` – loaders use build collections; static slugs prerendered.
- [x] `blog` dynamic detail/category – build helpers fall back to EN data for ID locale and prerender now completes with `ALLOW_INSECURE_TLS=1` set during builds.
- [x] Remove `routes/resources.set-locale.tsx` action (client switcher now handles cookie/localStorage directly).
- [x] Audit remaining routes (`contact.tsx`, `privacy-policy.tsx`, `sitemap.tsx`, `404.tsx`) – all static with no loaders/actions.

## Risks & Mitigations (Blog Focus)
- **Stale content:** Plan Strapi webhook + manual rebuild SOP before switching production traffic.
- **Missing slugs:** Add CI check verifying every blog slug and category slug appears in `buildBlogPaths()` output.
- **Locale drift:** Ensure helper tests assert both `/` and `/id` variants exist for each generated path.
- **API failures:** Build helpers should throw with context so CI fails fast when Strapi is unreachable.

## Language Switcher Follow-up
- [x] Temporarily disable locale switching inside the header `LangSwitcher` when viewing blog detail pages to avoid 404 caused by mismatched localized slugs.
- [ ] Longer term: fetch paired localized slugs from Strapi so the switcher can redirect to the matching locale entry instead of disabling the control.
