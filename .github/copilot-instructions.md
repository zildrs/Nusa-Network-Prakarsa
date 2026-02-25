# GitHub Copilot Instructions for Nusa Network Prakarsa

This repository contains a React Router 7 application with TypeScript, Tailwind CSS, and SSR support.

## Project Overview

This is a single-app (not monorepo) project using:
- **React 19** with **React Router 7** for routing and SSR
- **Vite 6** for build tooling
- **TypeScript** (strict mode)
- **Tailwind CSS v4** for styling
- **Radix UI** components with shadcn-style wrappers
- **i18next** for internationalization

## Key Directory Structure

```
app/                    # Application source code
  ├── routes/          # Route modules (file-based routing)
  ├── components/      # React components
  │   └── ui/         # Reusable UI primitives (shadcn-style)
  ├── lib/            # Utility functions
  ├── locales/        # i18n translation files
  └── i18n.ts         # i18n configuration
public/               # Static assets
build/                # Build output (client/ and server/)
```

## Development Commands

```bash
npm install           # Install dependencies
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Create production build
npm run start        # Run production SSR server
npm run typecheck    # Type-check with TypeScript
```

**Important**: Always use `npm` (never yarn or pnpm). The project has a `package-lock.json`.

## Coding Conventions

### TypeScript
- Strict mode enabled
- No `any` types allowed
- Use route-generated types: `import type { Route } from "./+types/route-name"`
- Path alias `~/*` maps to `app/*`

### React Components
- Use PascalCase for component names
- Use camelCase for variables/functions
- Use kebab-case for file names
- Import order:
  1. External imports (React, libraries)
  2. Internal imports (components, utils)
  3. Types
  4. Component definition

### Styling
- Use Tailwind CSS v4 utility classes
- Use `cn()` from `~/lib/utils` for conditional classes
- Avoid inline styles except for dynamic values
- UI components in `app/components/ui/` wrap Radix UI primitives

### Routes
- Configure routes in `app/routes.ts` using `index()` and `route()` helpers
- Routes are exported as an array satisfying `RouteConfig`
- Route modules export `meta`, `loader`, `action`, and default component
- Use React Router data APIs (loaders/actions)
- Server-side rendering is enabled by default

### i18n
- Never hardcode user-visible strings
- Use `t('namespace.key')` pattern
- Add translations to `app/locales/*.json`
- Locale detection via cookie then Accept-Language header

### Comments
- Avoid comments for straightforward code
- Only add comments for:
  - Complex logic that needs explanation
  - Important inputs/outputs documentation
  - Non-obvious implementation details

## Code Quality

### Before Committing
1. Run `npm run typecheck` - must pass with no errors
2. Run `npm run build` - must build successfully
3. Follow conventional commit style: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`

### Performance
- Keep components lean
- Prefer server-rendered data (use loaders)
- Lazy-load large components
- Use `loading="lazy"` for below-fold images

### Accessibility
- Use semantic HTML
- Ensure proper ARIA attributes
- Test keyboard navigation

## Anti-Patterns to Avoid

❌ Don't duplicate UI primitives - extend existing ones in `app/components/ui/`
❌ Don't use relative imports when `~/*` alias is available
❌ Don't mix package managers (only npm)
❌ Don't use `any` type
❌ Don't add inline styles when Tailwind can handle it
❌ Don't hardcode strings visible to users

## Component Example

```tsx
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

## Additional Resources

- Full guidelines: `AGENTS.md` in repository root
- React Router docs: https://reactrouter.com/
- Tailwind CSS docs: https://tailwindcss.com/
