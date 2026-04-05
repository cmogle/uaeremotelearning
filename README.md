# UAE Remote Learning

This repository now publishes a single Jumeirah College remote-learning site. The canonical baseline is the restored student-facing React content and tone, not the older JSON-driven variant system.

## Overview

The public site is a small multi-page Next.js app rooted at `/`:

- `/`
- `/get-help-now`
- `/school-day`
- `/wellbeing-support`

These pages are the publication baseline. They are designed to stay calm, direct, and easy to scan.

The repository still contains older experimental routes and tooling from earlier architecture work, but they are no longer the source of truth for public content and are not part of the publication plan.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- `lucide-react` for icons

## Project Structure

```text
app/
  layout.tsx                 App metadata and shell
  page.tsx                   Public home page
  get-help-now/page.tsx      Student help page
  school-day/page.tsx        School day and lesson structure page
  wellbeing-support/page.tsx Wellbeing and support page
  icon.svg                   Placeholder app icon
  globals.css                Global reset and focus styles

components/public/
  baseline-site.tsx          Shared public shell and page sections
  baseline-site.module.css   Public site styling

lib/
  baseline-site-content.ts   Canonical baseline copy and content lists

content/
  CONTENT_INVENTORY.md       Current student states, contacts, and resources to confirm
```

## Canonical Content Source

The public site now uses a code-managed baseline:

- [`lib/baseline-site-content.ts`](/Users/finu/Development/UAERemoteLearning/lib/baseline-site-content.ts)
- [`components/public/baseline-site.tsx`](/Users/finu/Development/UAERemoteLearning/components/public/baseline-site.tsx)

This is deliberate. We are iterating on the baseline directly in code while refining:

- information architecture
- accessibility
- content quality
- imagery and design direction

The current content inventory for later iteration lives here:

- [`content/CONTENT_INVENTORY.md`](/Users/finu/Development/UAERemoteLearning/content/CONTENT_INVENTORY.md)

## Local Development

### Prerequisites

- Node.js `24.14.1`
- npm

The repo now pins Node in:

- [`.nvmrc`](/Users/finu/Development/UAERemoteLearning/.nvmrc)
- [`package.json`](/Users/finu/Development/UAERemoteLearning/package.json)

### Install

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

Open:

- [http://localhost:3000/](http://localhost:3000/)
- [http://localhost:3000/get-help-now](http://localhost:3000/get-help-now)
- [http://localhost:3000/school-day](http://localhost:3000/school-day)
- [http://localhost:3000/wellbeing-support](http://localhost:3000/wellbeing-support)

### Production build

```bash
npm run build
npm run start
```

## Editing Guide

### Most common edits

Start here for copy, support routes, contacts, and content structure:

- [`lib/baseline-site-content.ts`](/Users/finu/Development/UAERemoteLearning/lib/baseline-site-content.ts)

Start here for layout and presentation:

- [`components/public/baseline-site.tsx`](/Users/finu/Development/UAERemoteLearning/components/public/baseline-site.tsx)
- [`components/public/baseline-site.module.css`](/Users/finu/Development/UAERemoteLearning/components/public/baseline-site.module.css)

### Content review notes

The public pages intentionally leave some resource links out until they are confirmed. Track those in:

- [`content/CONTENT_INVENTORY.md`](/Users/finu/Development/UAERemoteLearning/content/CONTENT_INVENTORY.md)

## Deployment

Deployment is GitHub-backed Vercel deployment:

1. Push the publication branch to GitHub.
2. Let the connected Vercel project build automatically.
3. Confirm the build passes and the public pages render correctly.

Direct Vercel CLI deployment is not part of the intended workflow.

## Publication Checklist

- `npm run build` passes
- root route serves the baseline site
- all public pages are linked from the top navigation
- email contacts are correct
- any unconfirmed public resources are either removed or explicitly approved before linking
- old multi-variant messaging does not appear in the public experience

## Codex Workflow

Project-level guidance for future Codex threads now lives in:

- [`AGENTS.md`](/Users/finu/Development/UAERemoteLearning/AGENTS.md)

That file is the canonical short handoff for:

- what the public baseline is
- which files are the source of truth
- which older architecture should stay non-baseline
- how to treat focused work modes in new threads
