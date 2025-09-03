# Repository Guidelines

## Project Structure & Module Organization

- apps: Not a monorepo; single-app structure using React Router + Vite.
- app/: Application code (routes, components, loaders, i18n, styles).
- public/: Static assets served as-is at the web root.
- build/: Generated on build; contains `client/` and `server/` bundles.
- Config: `vite.config.ts`, `react-router.config.ts`, `tailwind.config.ts`, `tsconfig.json`.
- Docker: `Dockerfile` builds and runs SSR server.

Key files for reference:
- `package.json:1`: Scripts and dependencies.
- `react-router.config.ts:1`: SSR enabled by default.
- `vite.config.ts:1`: Vite + React Router + Tailwind + TS paths.
- `tsconfig.json:1`: TypeScript strict config and `~/*` path alias to `app/*`.
- `app/routes.ts:1`: File-based routes mapping.

## Build, Test, and Development Commands

- `npm run dev`: Start dev server with HMR via React Router.
- `npm run build`: Create production client/server bundles.
- `npm run start`: Run built SSR server (`./build/server/index.js`).
- `npm run typecheck`: Generate RR types and run `tsc` in strict mode.

Notes:
- Use `npm` for all scripts and installs (lockfile present). Avoid mixing package managers.
- Docker build and run supported via the included `Dockerfile`.

## Coding Style & Naming Conventions

- Indentation: 2 spaces. Quotes: single or double consistently (Prettier-friendly).
- Styling: Tailwind CSS v4 utility-first classes; use `cn` from `app/lib/utils.ts` for class merging.
- UI Primitives: Radix UI + shadcn-style wrappers under `app/components/ui/*`.
- Naming: PascalCase for React components; camelCase for variables/functions; kebab-case for file names.
- Paths: Prefer `~/*` alias for imports from `app/*` (see `tsconfig.json`).
- Routes: Place route modules in `app/routes/*` and register paths in `app/routes.ts`.

### Comments Policy

- Avoid comments unless they add clear, essential value.
- Do not comment straightforward code or function behavior.
- Comment to document inputs/outputs or non-obvious logic; keep comments current.

## Frontend: Full Rules

### Frontend Development Guidelines

Target stack: React 19, React Router 7 (SSR), Vite 6, Tailwind CSS 4, Radix UI, TypeScript strict.

#### Core Principles

- Reusability: Build composable, accessible primitives in `app/components/ui` and reuse them.
- Consistency: Follow the existing shadcn-style patterns and Tailwind design tokens.
- Performance: Keep components lean; defer heavy work; prefer server-rendered data where possible.
- Type Safety: No `any`. Leverage strict TypeScript and generated route types.
- Accessibility: Favor semantic HTML; ensure proper ARIA and keyboard interactions.

### Component Architecture & Organization

#### Shared UI Components (`app/components/ui/*`)

- Purpose: Reusable, atomic UI elements (Button, Input, Select, Dialog, Card).
- Composition: Wrap Radix primitives with cohesive APIs and Tailwind styles.
- Export: Each component file should export its component(s) and variants.
- Examples:
  - `app/components/ui/button.tsx:1`
  - `app/components/ui/select.tsx:1`
  - `app/components/ui/dialog.tsx:1`

Structure suggestion:
```
app/components/ui/
├── button.tsx
├── input.tsx
├── textarea.tsx
├── select.tsx
└── dialog.tsx
```

Use `cn` for class composition:
```
app/lib/utils.ts:1
```

#### Feature & Page Components

- Page routes: Implement under `app/routes/*.tsx` using React Router data APIs.
- Layout/Shared: Common sections like header/footer live under `app/components/*`.
- Internationalization: Access `t` and `locale` via the root `Outlet` context.

#### Forbidden Practices

- Do not duplicate UI primitives; extend the shared components when needed.
- Do not mix multiple UI paradigms in a single component (e.g., inline styles + Tailwind + CSS modules).
- Do not import from outside `app/*` via relative paths when alias exists; use `~/*`.

### Styling & UI Framework

- Tailwind CSS v4 is the primary styling system.
- Use semantic class groupings and keep class lists readable; extract variants with `cva` when complex.
- Avoid inline styles except for dynamic computed values that Tailwind can’t express.
- Keep color/spacing consistent with existing tokens and utilities; prefer utility classes over custom CSS.

### Performance & State Management

- Server-first: Keep `ssr: true` (see `react-router.config.ts:1`). Prefer loader-based data for initial render.
- Client state: Prefer local `useState` and lifted state; introduce external state only when justified.
- Data fetching: Use React Router loaders/actions; avoid ad-hoc `fetch` in render paths. Use `<Form>` for mutations.
- Code-splitting: Let route boundaries split bundles; lazy-load large, non-critical components.
- Images: Use `loading="lazy"` and `decoding="async"` for below-the-fold images.

### Internationalization (i18n)

- Locale detection: Cookie `lang` then `Accept-Language` (see `app/lib/locale.server.ts:1`).
- Translation: Use `createT(locale)` and `t('namespace.key')` from `app/i18n.ts:1`.
- Switching: Submit to `routes/resources.set-locale.tsx` via `<Form>` and Select (see `app/components/lang-switcher.tsx:1`).
- Avoid hardcoding user-visible strings; add keys to `app/locales/*.json`.

### Routing Conventions

- Define routes in `app/routes.ts:1` via `index()` and `route()` helpers.
- Co-locate route code, meta, loader, and action in the route module.
- Use `export function meta()` to set page metadata; return array of tags.
- Use route `+types` for infused types from React Router typegen.

### Testing Strategy

- Unit/Component: Recommended stack is Vitest + React Testing Library; add when complexity warrants.
- E2E: Recommended Playwright or Cypress for critical flows (navigation, forms, i18n switching).
- Accessibility: Consider `@axe-core/react` in development to catch issues early.
- When tests exist: `npm test` or framework-appropriate commands.

### Package Management

- Use `npm` exclusively in this repo.
- Install: `npm ci` in CI; `npm install` locally when modifying deps.
- Scripts: Run with `npm run <script>`.
- Do not edit `node_modules` directly; do not mix yarn/pnpm.

### TypeScript & Code Quality

- Strict mode is enabled (see `tsconfig.json:1`).
- No `any`. Type component props and function returns.
- Use route-generated types: `import type { Route } from "./+types/route-name"`.
- Linting/Formatting: Keep code Prettier-friendly; maintain consistent imports and file naming.

### Asset & Image Handling

- Place static files under `public/`; reference as `/path.ext`.
- Use descriptive `alt` text; apply `loading="lazy"` where appropriate.
- Prefer modern formats (WebP/AVIF) and appropriate sizing.

### Development Workflow

- Setup: `npm install` at project root.
- Develop: `npm run dev` then iterate on routes and components.
- Type Checking: `npm run typecheck` before commits.
- Build: `npm run build` and verify `build/` output.
- Start (prod): `npm run start` serves the built SSR app.

Code organization example:
```
// 1) External imports
import { useState } from 'react'
import { Button } from '~/components/ui/button'

// 2) Internal imports
import type { Route } from './+types/some-route'

// 3) Component
export default function SomePage() {
  const [open, setOpen] = useState(false)
  return <Button onClick={() => setOpen(!open)}>Toggle</Button>
}
```

### Deployment & Build

- SSR by default; ensure `npm run build` runs in CI and artifacts are deployed.
- Docker: Multi-stage build produces a lightweight runtime (see `Dockerfile:1`).
- Env vars: Inject at build or runtime as needed; do not commit secrets.

## Testing Guidelines

- Unit: Co-locate `*.spec.ts(x)` with source when tests are added.
- E2E: Keep in a dedicated `e2e/` folder or separate project if introduced.
- Run: Provide `npm test` when the test runner is added; document in README.
- Keep selectors resilient; prefer roles or `data-testid`.

## Commit & Pull Request Guidelines

- Style: Conventional commits (feat, fix, chore, refactor, test, docs).
- Before pushing: Ensure clean typecheck and build (`npm run typecheck && npm run build`).
- PRs: Clear description, linked issues, screenshots for UI, steps to verify. Note env or migration changes.

## Security & Configuration Tips

- Env: Use `.env`/process env for secrets; never commit secrets.
- Dependencies: Prefer pinned ranges; update regularly and audit.
- Headers: Consider security headers via your deploy platform or adapter.

# Agent Rules

You are an advanced coding assistant working on this repository. Follow these rules when generating outputs:

<general_guidelines>
• Be precise and align with this AGENTS.md, current code patterns, and the latest user request when conflicts arise.
• Match effort to task complexity (higher for cross-cutting or multi-file changes).
• Default to clarity and conciseness; avoid unnecessary exposition.
</general_guidelines>

<instruction_formatting>
• Prefer compact diffs and minimal, focused changes.
• Use an XML-like structure for clarity where it helps.
• Frontend defaults: Tailwind CSS utilities and existing shadcn/Radix components under `app/components/ui`.
• Use `npm` scripts; keep SSR enabled unless explicitly changed.
</instruction_formatting>

<language_style>
• Keep language direct, balanced, and naturally thorough without rigidity.
</language_style>

<self_reflection>
• Plan briefly for multi-step work; verify against this file and codebase norms.
• Consider correctness, safety, type-safety, accessibility, performance, and DX.
• Iterate silently until confident the output meets these criteria.
</self_reflection>

<eagerness_control>
• Gather only necessary context; prefer `rg` for search; read files in ≤250-line chunks.
• Group related actions; minimize tool calls.
• Make reasonable assumptions and document them when used.
</eagerness_control>
