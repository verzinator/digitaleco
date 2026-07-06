# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Digital Eco — Italian digital agency website (digitaleco.it). Monorepo with single app at `apps/web/`.

## Commands

```bash
# All commands run from apps/web/
cd apps/web

npm run dev          # Next.js dev server with Turbopack
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check (tsc --noEmit)
```

No test framework configured. No root-level package.json scripts — everything runs from `apps/web/`.

## Architecture

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`), no `tailwind.config` file — theme tokens defined in `globals.css` using `@theme` directive and CSS custom properties
- **CMS**: Sanity (next-sanity) — schemas in `sanity/schemas/`, GROQ queries in `sanity/queries/index.ts`, client in `sanity/client.ts`
- **Backend**: Supabase for lead storage (contact form API route at `app/api/contact/route.ts`)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **UI utilities**: `cn()` helper in `lib/utils.ts` (clsx + tailwind-merge)
- **Icons**: lucide-react

## Design System

All design tokens live in `apps/web/app/globals.css` as CSS variables:
- **Brand colors**: `--color-primary` (#0A5C44 dark green), `--color-accent` (#2ECC71)
- **Typography**: `--font-display` (Instrument Serif) for h1-h3, `--font-body` (DM Sans) for everything else
- **Fluid type scale**: `--text-xs` through `--text-hero` using `clamp()`
- **Spacing**: `--space-1` through `--space-24`

Use Tailwind theme tokens (e.g., `text-primary`, `bg-surface`, `font-display`) rather than raw CSS variables in components.

## Path Alias

`@/*` maps to `apps/web/*` (e.g., `@/components/ui/Button`).

## Environment Variables

Required (not committed):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

## Key Conventions

- Italian language for all user-facing copy
- Service pages use `ServiceSubPageTemplate` component (`components/sections/ServiceSubPageTemplate.tsx`)
- Homepage sections compose via separate components in `components/sections/`
- Layout components (Navbar, Footer) in `components/layout/`
- Reusable UI primitives in `components/ui/`
