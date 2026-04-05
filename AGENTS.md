# Project Guidance for Codex

## Canonical Baseline

Treat the current Jumeirah College multi-page site as the canonical public baseline.

The intended public routes are:

- `/`
- `/get-help-now`
- `/school-day`
- `/wellbeing-support`

The canonical source for public content, tone, and structure is:

- [`lib/baseline-site-content.ts`](/Users/finu/Development/UAERemoteLearning/lib/baseline-site-content.ts)
- [`components/public/baseline-site.tsx`](/Users/finu/Development/UAERemoteLearning/components/public/baseline-site.tsx)
- [`components/public/baseline-site.module.css`](/Users/finu/Development/UAERemoteLearning/components/public/baseline-site.module.css)

Do not treat the older JSON-driven multi-variant architecture as the source of truth for public work.

## Working Rules

- Preserve the current baseline voice: short, calm, direct, student-facing.
- Prefer minimal context use. Read only the files needed for the task.
- Keep public work focused on the Jumeirah College baseline unless the user explicitly asks otherwise.
- Do not reintroduce generic/multi-variant product framing into the public site.
- Improve accessibility and clarity before adding visual flourish.
- Treat older editor/product/variant routes as non-baseline and non-public unless the user explicitly asks to work on them.

## Focus Modes

When starting a new thread, assume the user may want one focused mode only. Stay within that mode unless blocked:

- `content editorial`
- `information architecture`
- `site usability and accessibility`
- `visual design and imagery`
- `performance, hosting, and publication readiness`

## Publication Defaults

- GitHub is the source of truth for deployment.
- Vercel should build automatically from the connected repository.
- Direct Vercel CLI deployment is out of scope unless explicitly requested.
- `npm run build` must pass before publication-oriented work is considered complete.

## Content Inventory

Use [`content/CONTENT_INVENTORY.md`](/Users/finu/Development/UAERemoteLearning/content/CONTENT_INVENTORY.md) to track:

- current student states
- support routes and email contacts
- external resources or placeholders that still need confirmation
