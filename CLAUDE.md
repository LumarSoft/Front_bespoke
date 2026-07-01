# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server (Turbopack, localhost:3000)
npm run build     # Production build (Turbopack)
npm run start     # Run production build
npm run lint      # Run ESLint (calls `eslint` directly — NOT `next lint`)
```

No test runner is configured.

## Architecture

Next.js 16.2.9 + React 19 + TypeScript + Tailwind CSS v4. App Router only — no `pages/` directory.

- `app/layout.tsx` — root layout with Geist fonts and Tailwind base styles
- `app/globals.css` — Tailwind v4 import (`@import "tailwindcss"`) and CSS custom properties
- `app/page.tsx` — home page (Server Component by default)
- `public/` — static assets served at root
- Path alias `@/*` maps to the project root

## Next.js 16 breaking changes to know

**Turbopack is now the default** for both `next dev` and `next build`. Custom `webpack` config in `next.config.ts` will break the build.

**`next lint` is removed.** Use `eslint` directly (already wired as `npm run lint`). `next build` no longer runs linting.

**`params` is a Promise in dynamic routes.** Always `await params` before accessing route segments:
```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}
```

**Caching:** `experimental.dynamicIO` / `experimental.useCache` are replaced by top-level `cacheComponents: true` in `next.config.ts`. Use the `'use cache'` directive in Server Components to cache data fetching.

**For instant client-side navigations:** export `unstable_instant` from any route that should navigate instantly, and wrap uncached data in `<Suspense>` boundaries. See `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`.

**`serverRuntimeConfig` / `publicRuntimeConfig` removed.** Use `process.env` in Server Components; prefix with `NEXT_PUBLIC_` for client-accessible values.

**Server Components by default.** Add `'use client'` only when you need state, event handlers, lifecycle hooks, or browser APIs.

**Tailwind v4 syntax** differs from v3: use `@import "tailwindcss"` (not `@tailwind base/components/utilities`), and define theme tokens with `@theme inline { ... }`.
