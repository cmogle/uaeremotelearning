# UAE Remote Learning

A shared Next.js site for two distance-learning variants:

- `jumeirah-college`
- `generic`

This repo is now configured as a **guided Codex publishing system**:

1. The sponsor/content director requests changes in natural language.
2. Codex translates those requests into repo changes and opens a PR.
3. GitHub and Vercel provide checks and preview links.
4. A technical steward reviews structural risk and approves production merge.

There is no in-app CMS or admin panel. The safe editing surface is **Codex + GitHub + Vercel previews**.

## Working Model

- The sponsor is **not** expected to edit JSON, run local dev, or manage deployments.
- Codex is the default editing assistant for copy, tone, structure-safe presentation tweaks, and content updates.
- A technical steward owns branch protection, production safety, and structural changes.

Use these docs first:

- Bookmark `/content-director` for the non-technical content director workflow
- [`docs/content-director-onboarding.md`](./docs/content-director-onboarding.md)
- [`docs/author-playbook.md`](./docs/author-playbook.md)
- [`docs/prompt-library.md`](./docs/prompt-library.md)
- [`docs/troubleshooting-and-escalation.md`](./docs/troubleshooting-and-escalation.md)
- [`docs/operating-model.md`](./docs/operating-model.md)
- [`docs/technical-steward-setup.md`](./docs/technical-steward-setup.md)

## Content Surface

Most content work happens in:

- [`content/sites/jumeirah-college.json`](./content/sites/jumeirah-college.json)
- [`content/sites/generic.json`](./content/sites/generic.json)

These files control copy, contacts, resources, section headings, and approved theme tokens.

The shared rendering layer lives in:

- [`components/public/site-page.tsx`](./components/public/site-page.tsx)
- [`lib/site-schema.ts`](./lib/site-schema.ts)
- [`lib/site-content.ts`](./lib/site-content.ts)

## Deployment Model

Use one repo with two Vercel projects:

- Jumeirah domain -> `DEFAULT_SITE_KEY=jumeirah-college`
- Generic domain -> `DEFAULT_SITE_KEY=generic`

The root route `/` redirects to the configured site key for that deployment, while direct preview routes remain available:

- `/jumeirah-college`
- `/generic`

See [`.env.example`](./.env.example) and [`docs/technical-steward-setup.md`](./docs/technical-steward-setup.md).

## Local Development

Local dev is mainly for the technical steward.

```bash
npm install
npm run dev
```

Checks:

```bash
npm run check
```
