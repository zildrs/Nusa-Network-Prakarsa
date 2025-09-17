# Locale-Aware Routing & localStorage Persistence Implementation Plan

## Overview
✅ **COMPLETED**: Locale-specific routes working:
- English (en): `/blog`, `/blog/:category`, `/blog/read/:slug`
- Indonesian (id): `/id/blog`, `/id/blog/:category`, `/id/blog/read/:slug`

❌ **MISSING**: localStorage persistence for language preferences

## Current Architecture Analysis
✅ **Working:**
- Routes defined with optional locale prefixes in `routes.ts`
- Locale detection via `getRequestLocale()` in `locale-utils.server.ts` (URL path first)
- API calls include `locale` parameter (Strapi supports multi-locale)
- Language switcher changes URLs correctly

❌ **Missing:**
- localStorage persistence for user language preference
- Consistent language state across page navigation
- Language preference maintained on page refresh

## Implementation Plan

### 1. Route Structure Changes
- [ ] Modify `routes.ts` to include optional locale segments
- [ ] New structure: `/:locale?/blog`, `/:locale?/blog/:category`, `/:locale?/blog/read/:slug`
- [ ] Locale parameter should be optional with fallback to existing detection

### 2. Locale Detection Updates
- [ ] Update `getRequestLocale()` to check URL path first: `/id/*` → 'id', `/en/*` → 'en'
- [ ] Fallback to existing logic (query params → cookies → Accept-Language)
- [ ] Ensure backward compatibility with existing locale detection

### 3. Route Components Updates
- [ ] Update `blog.tsx`, `blog-category.tsx`, `blog-detail.tsx` to accept optional `locale` param
- [ ] Use React Router's generated types for new route structure
- [ ] Ensure loaders receive and handle locale from URL params

### 4. API Integration
- [ ] Verify API calls use locale from URL param (already implemented via `getRequestLocale()`)
- [ ] Ensure client-side fetches in `blog.tsx` use correct locale from URL
- [ ] Test API filtering works correctly for both locales

### 5. Navigation & Links Updates
- [ ] Update `BlogNavigation` component to generate locale-aware URLs
- [ ] Update `BlogSection` seeAllLink to include locale prefix
- [ ] Update `BlogHero` and other blog components with internal links
- [ ] Ensure language switcher generates correct URLs

### 6. Redirects & Fallbacks
- [ ] Add redirects for backward compatibility:
  - `/blog` → `/en/blog` (or based on detected locale)
  - `/blog/:category` → `/:locale/blog/:category`
- [ ] Handle `/en/` as home route redirect
- [ ] Ensure 404 handling works with locale prefixes

### 7. SEO & Meta Updates
- [ ] Update meta functions to include locale-aware canonical URLs
- [ ] Ensure proper hreflang tags for multi-locale SEO
- [ ] Test meta tags include correct locale information

### 8. Testing Strategy
- [ ] Test locale switching: `/en/blog` ↔ `/id/blog`
- [ ] Test direct URL access for both locale variants
- [ ] Test category and detail pages with locale prefixes
- [ ] Test API data fetching for both locales
- [ ] Test navigation links maintain correct locale context
- [ ] Test fallback behavior when locale not specified

### 9. Migration Considerations
- [ ] Plan for existing URLs (SEO impact)
- [ ] Consider implementing redirects from old structure
- [ ] Test with existing blog content in both locales

### 10. Implementation Order
1. Update route definitions and locale detection
2. Update route components to handle locale params
3. Update navigation components
4. Implement redirects and fallbacks
5. Test thoroughly across all blog routes
6. Update SEO meta tags

---

# NEW: localStorage Persistence Implementation Plan

## Overview
✅ **COMPLETED**: Locale-specific routes working:
- English (en): `/blog`, `/blog/:category`, `/blog/read/:slug`
- Indonesian (id): `/id/blog`, `/id/blog/:category`, `/id/blog/read/:slug`

❌ **MISSING**: localStorage persistence for language preferences

## Current State Analysis
✅ **Working:**
- Routes defined with optional locale prefixes in `routes.ts`
- Locale detection via `getRequestLocale()` in `locale-utils.server.ts` (URL path first)
- API calls include `locale` parameter (Strapi supports multi-locale)
- Language switcher changes URLs correctly

❌ **Missing:**
- localStorage persistence for user language preference
- Consistent language state across page navigation
- Language preference maintained on page refresh

## localStorage Implementation Plan

### 1. Core localStorage Utilities
- [ ] Create `app/lib/locale-storage.ts` with functions:
  - `saveLanguagePreference(locale: "id" | "en"): void`
  - `getLanguagePreference(): "id" | "en" | null`
  - `clearLanguagePreference(): void`

### 2. Language Switcher Updates
- [ ] Update `app/components/lang-switcher.tsx`:
  - Save to localStorage when language changes
  - Read from localStorage on component mount
  - Use localStorage as fallback when URL doesn't specify locale

### 3. Root Loader Enhancement
- [ ] Update `app/root.tsx` loader:
  - Check localStorage first for language preference
  - Use localStorage → URL path → cookies → Accept-Language priority
  - Ensure SSR compatibility

### 4. Navigation Links Enhancement
- [ ] Update header navigation links to respect localStorage:
  - Home link: `/` or `/id/` based on preference
  - About link: `/about` or `/id/about`
  - Case Study: `/case-study` or `/id/case-study`
  - Blog: `/blog` or `/id/blog` (already implemented)

### 5. Context Provider (Optional)
- [ ] Create `LanguageProvider` context for global state management
- [ ] Alternative to localStorage-only approach
- [ ] Provides reactive language state across components

### 6. Route-Level Fallback Logic
- [ ] Update route loaders to check localStorage when no URL locale:
  - `blog.tsx`: Use localStorage → default to "en"
  - `blog-category.tsx`: Use localStorage → default to "en"
  - `blog-detail.tsx`: Use localStorage → default to "en"

### 7. Component Updates
- [ ] Update components that generate links:
  - `app/components/header.tsx`: All navigation links
  - `app/routes/blog.tsx`: Internal blog links
  - `app/routes/blog-category.tsx`: Pagination links
  - `app/routes/blog-detail.tsx`: Solution links

### 8. Testing Strategy
- [ ] Test localStorage persistence:
  - Switch language → refresh page → language maintained
  - Navigate between pages → language maintained
  - Clear localStorage → fallback to default behavior
- [ ] Test URL priority over localStorage:
  - Direct URL access should override localStorage
  - Language switcher should update both URL and localStorage

### 9. Implementation Context

**How to implement localStorage in components:**
```typescript
// Save to localStorage
const saveLanguagePreference = (locale: "id" | "en") => {
  try {
    localStorage.setItem('user-language', locale);
  } catch (error) {
    console.warn('Failed to save language preference:', error);
  }
};

// Read from localStorage
const getLanguagePreference = (): "id" | "en" | null => {
  try {
    const stored = localStorage.getItem('user-language');
    return stored === 'id' || stored === 'en' ? stored : null;
  } catch (error) {
    return null;
  }
};
```

**How to implement in navigation links:**
```typescript
// Instead of: <Link to="/about">
// Use: <Link to={`${currentLocale === 'id' ? '/id' : ''}/about`}>
```

**Priority order for locale detection:**
1. URL path (highest priority - direct navigation)
2. localStorage (user preference persistence)
3. Cookies (server-side session)
4. Accept-Language header (browser default)
5. Default to "en" (fallback)

### 10. Migration Strategy
- [ ] Backward compatibility: existing behavior unchanged
- [ ] Gradual rollout: start with blog routes, expand to others
- [ ] localStorage key: `user-language` (clear, descriptive)
- [ ] Error handling: Graceful fallback if localStorage fails

### 11. Implementation Order
1. Create localStorage utilities
2. Update language switcher to save/load preferences
3. Update root loader to check localStorage
4. Update navigation components (header, etc.)
5. Update route-level loaders for consistency
6. Test persistence across page navigation
7. Test URL priority over localStorage

---

# Previous TLS Issue (Resolved)
Blog fetch fails in SSR with TLS error (UNABLE_TO_VERIFY_LEAF_SIGNATURE)

- [x] Root cause
  - Happens only on server-side loader (Node/SSR) when `fetch`ing `https://dash.nusanetwork.com/api` in `app/utils/blog.server.ts`.
  - Node’s TLS trust store rejects the server’s certificate chain (self‑signed, missing intermediate, or split corporate proxy CA). Browsers may succeed with a different trust store, so client-side fetch appears to work.

- [x] Impacted code
  - `app/routes/blog.tsx` → `loader` calls `fetchBlogData(request)`.
  - `app/utils/blog.server.ts` → performs HTTPS `fetch` to the external API.

- [x] Preferred fixes (secure)
  - Fix the API server to serve a full, valid cert chain trusted by common roots.
  - Or configure Node to trust the proper CA bundle locally/CI:
    - `NODE_EXTRA_CA_CERTS=/path/to/ca-bundle.pem` (recommended)
    - Avoid `NODE_TLS_REJECT_UNAUTHORIZED=0` (too broad/unsafe).

- [x] Dev-only bypass (scoped and opt-in)
  - Implemented optional, non-production bypass controlled by `ALLOW_INSECURE_TLS=1` so local SSR can proceed while backend TLS is being fixed.
  - Implemented in `app/utils/blog.server.ts` via lazy-init undici dispatcher only when the flag is set.

```ts
// inside app/utils/blog.server.ts (proposed)
let tlsBypassInitialized = false;
async function ensureDevInsecureTLS() {
  if (tlsBypassInitialized) return;
  if (process.env.NODE_ENV === 'production') return;
  if (process.env.ALLOW_INSECURE_TLS !== '1') return;
  try {
    const { setGlobalDispatcher, Agent } = await import('undici');
    setGlobalDispatcher(new Agent({ connect: { rejectUnauthorized: false } }));
    tlsBypassInitialized = true;
  } catch {
    // If undici isn’t available, keep strict TLS
  }
}

export async function fetchBlogData(request: Request) {
  await ensureDevInsecureTLS();
  // existing logic follows...
}
```

- [ ] Dependencies and env
  - [ ] Install runtime dep: `npm install undici` (used only when the flag is on).
  - [ ] Add `.env.local` for dev (do not commit):
    - `ALLOW_INSECURE_TLS=1`
  - [ ] Consider ignoring env files in `.gitignore` (e.g., add `.env*`).

- [ ] Optional visibility aid
  - Keep or add a small client-side fetch probe banner in `app/routes/blog.tsx` to confirm browser fetch vs SSR behavior while debugging.

- [ ] Testing checklist
  - Dev: invalid cert + `ALLOW_INSECURE_TLS=1` → SSR fetch succeeds, page renders posts.
  - Dev: invalid cert + no flag → SSR loader returns empty; page shows empty state; console logs TLS error.
  - Prod build (`npm run build && npm run start`) → bypass disabled; strict TLS enforced.

- [ ] Security notes
  - Bypass is opt-in, local-only, and never runs in production.
  - Prefer CA bundle solution when possible; the bypass is a temporary developer convenience.
