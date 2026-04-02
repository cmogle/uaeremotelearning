# UAE Remote Learning

A shared Next.js site for two distance-learning variants:

- `jumeirah-college`
- `generic`

The intended workflow is:

1. The author works with Codex in this repo.
2. Codex edits content and styling in the codebase.
3. Changes are committed and pushed to GitHub.
4. Vercel deploys from the repo.

There is no in-app admin panel. The repo itself is the authoring surface.

## Where To Edit

Most content changes should happen in these files:

- [`content/sites/jumeirah-college.json`](./content/sites/jumeirah-college.json)
- [`content/sites/generic.json`](./content/sites/generic.json)

These JSON files control:

- hero copy
- support cards
- expectations and wellbeing content
- contacts and resource links
- theme tokens such as colors and font family

The shared rendering layer lives here:

- [`components/public/site-page.tsx`](./components/public/site-page.tsx)
- [`lib/site-schema.ts`](./lib/site-schema.ts)
- [`lib/site-content.ts`](./lib/site-content.ts)

## Run Locally

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000/jumeirah-college`
- `http://localhost:3000/generic`

## Deployment Model

This repo is designed for GitHub-backed Vercel deployment. A typical setup is:

- one Vercel project for the Jumeirah site
- one Vercel project for the generic site
- both deployments pointing at this same repository

You can later choose the active site variant per deployment with route strategy, environment-based routing, or separate branch/project configuration if needed.

## Codex-Friendly Structure

The app is deliberately arranged so Codex can safely make natural-language driven edits without reworking the whole site:

- structured site content in JSON
- shared validated schema
- shared presentation components
- single codebase for both variants

That means prompts like “make the Jumeirah version warmer and more reassuring” or “turn the generic version into a GEMS-wide template” can usually be fulfilled by editing the content JSON and, when needed, a small amount of shared styling.
