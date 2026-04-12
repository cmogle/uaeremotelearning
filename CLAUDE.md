# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build (also serves as the type-check — no separate lint/test commands)
npm start            # Serve production build locally
```

There is no test suite, no linter, and no formatter configured. `npm run build` is the sole verification gate — run it before committing.

## What This Is

Student-facing distance-learning hub for Jumeirah College, deployed at distancelearn.ing. No database, no auth, no API — the Git repo is the CMS. Content is authored via code edits and deployed through Vercel on push to `main`.

## Architecture: Variant System

The repo supports **multiple parallel design variants** that share a single content source. This is the core architectural pattern.

### Content Layer

All student-facing copy lives in **`lib/baseline-site-content.ts`**. Every variant imports from this file. Never duplicate strings into variant code.

### Variant Structure

Each variant is a self-contained folder under `components/variants/<key>/` containing:
- `index.tsx` — Shell (layout wrapper) + page components (all `"use client"`)
- `manifest.ts` — exports a `VariantManifest` (key, name, description, Shell, pages map)
- `styles.module.css` — scoped styles (CSS Modules only, no shared component libraries between variants)

Current variants: `v2-quiet-page`, `v3-slow-steps`, `v4-workshop-wall`, `v5-oob`.

### Registry & Rendering

- **`components/variants/registry.ts`** — master list of all variant manifests + `LIVE_VARIANT_KEY` (single constant that controls the entire live site)
- **`components/variants/render.tsx`** — `renderLivePage()` and `renderVariantPage()` helpers used by route files
- **`components/variants/types.ts`** — `VariantManifest` and `VariantPagePath` type definitions

### Routes

Four public paths, each a thin file calling `renderLivePage()`:
- `/` — home
- `/get-help-now` — support contacts
- `/school-day` — timetable & lessons
- `/wellbeing-support` — wellbeing resources

Preview system at `/preview` renders all variants side-by-side. `/preview/[variant]/[[...slug]]/page.tsx` uses `generateStaticParams()` to pre-render every variant/path combination. A floating `PreviewSwitcher` component (injected via layout) lets reviewers compare designs.

## Adding a New Variant

1. Create `components/variants/<key>/` with `index.tsx`, `manifest.ts`, `styles.module.css`
2. Export a `VariantManifest` from `manifest.ts` (follow existing manifests as templates)
3. Import all copy from `lib/baseline-site-content.ts`
4. Add the manifest to the `variants` array in `components/variants/registry.ts`
5. It appears in `/preview` automatically

## Key Conventions

- **Content never duplicates** — all strings come from `baseline-site-content.ts`
- **Variants are islands** — no shared component libraries between them; each is fully self-contained
- **CSS Modules only** — no Tailwind, no global CSS frameworks; styles scoped per variant folder
- **TypeScript strict mode** — all edits must pass type checking
- **Static generation** — preview routes are pre-rendered at build time
- **To switch the live design** — change `LIVE_VARIANT_KEY` in `registry.ts` (one line)

## Stack

Next.js 16 (App Router), React 19, TypeScript 6, CSS Modules, lucide-react (icons), zod. Hosted on Vercel. CI via GitHub Actions (Node 22, `npm ci && npm run build`).
