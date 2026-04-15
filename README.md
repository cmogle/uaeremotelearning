# UAE Remote Learning

The student-facing distance-learning hub for Jumeirah College, deployed at
[distancelearn.ing](https://distancelearn.ing).

## How the site is built

- **Single source of truth for content** — every word the student sees lives in
  [`lib/baseline-site-content.ts`](./lib/baseline-site-content.ts). All design variants
  read from this one file. Editing it updates every variant at once.
- **Multiple design variants in one repo** — each design lives under
  [`components/variants/<variant-key>/`](./components/variants/) and is fully
  self-contained: its own components, layout, and styles. Variants share content but
  nothing else.
- **The live site** is whichever variant is set as `LIVE_VARIANT_KEY` in
  [`components/variants/registry.ts`](./components/variants/registry.ts). The four
  public routes (`/`, `/get-help-now`, `/school-day`, `/wellbeing-support`) all render
  through that one constant — change it once and the whole live site swaps over.
- **Every variant is also viewable** at `/preview/<variant-key>/...`. The
  [`/preview`](./app/preview/page.tsx) gallery lists them all, and a floating switcher
  on every preview page lets you compare the same screen across designs in one click.

## Workflow

1. The author works with Codex in this repo (in plain English).
2. Codex edits the relevant files — usually `lib/baseline-site-content.ts` for content,
   or files under one variant folder for design.
3. Codex runs `npm run build` locally to confirm nothing is broken.
4. Codex commits and pushes to `main` on GitHub (`cmogle/uaeremotelearning`).
5. Vercel picks up the push and deploys to [distancelearn.ing](https://distancelearn.ing).

There is no in-app admin panel. The repo is the authoring surface.

## Strategy docs

- Market-research and Paperclip prompt-pack documentation lives under
  [`docs/`](./docs/), starting with
  [`docs/paperclip-market-research-prompt-pack.md`](./docs/paperclip-market-research-prompt-pack.md).

## Where to edit

| If you want to… | Edit this |
|---|---|
| Change any wording, support contact, or helper card | [`lib/baseline-site-content.ts`](./lib/baseline-site-content.ts) |
| Tweak the live design | files under [`components/variants/v1-baseline/`](./components/variants/v1-baseline/) |
| Add a brand-new design | create a new folder under [`components/variants/`](./components/variants/) — see below |
| Promote a design to be the live one | change `LIVE_VARIANT_KEY` in [`components/variants/registry.ts`](./components/variants/registry.ts) |

## Adding a new design variant

1. Pick a key (kebab-case, e.g. `v2-editorial`).
2. Create `components/variants/v2-editorial/`.
3. Build the design inside that folder. Use any styling approach you like — CSS modules,
   Tailwind, plain CSS, Motion — as long as it stays scoped to your folder.
4. Pull every string from `lib/baseline-site-content.ts`. Never duplicate copy.
5. Export a `manifest.ts` shaped like
   [`v1-baseline/manifest.ts`](./components/variants/v1-baseline/manifest.ts), with a
   `Shell` component and a map of paths → page components.
6. Add the manifest to the `variants` array in
   [`components/variants/registry.ts`](./components/variants/registry.ts).

The new variant will appear in the `/preview` gallery and at
`/preview/v2-editorial/...` automatically.

## Run locally

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:3000` — the live variant
- `http://localhost:3000/preview` — the design gallery
- `http://localhost:3000/preview/v1-baseline` — a specific variant

## Stack

Next 16 (App Router) · React 19 · TypeScript · CSS modules · lucide-react. Hosted on
Vercel. No database, no auth, no API. The repo *is* the CMS.
