# Technical Steward Setup

This document captures the manual GitHub and Vercel settings that cannot be enforced purely through repo files.

## GitHub Setup

### Branch protection

Protect `main` with these defaults:

- require pull requests before merge
- require approval before merge
- require status checks to pass before merge
- require branch to be up to date before merge
- disable direct pushes to `main`

At first, require one technical-steward approval for structural work.

### Required checks

Mark the CI workflow checks from `.github/workflows/ci.yml` as required.

### Labels

Create the labels listed in [`docs/operating-model.md`](./operating-model.md).

## Vercel Setup

Create two Vercel projects pointing at this same repository.

### Project 1: Jumeirah production

- production domain: Jumeirah site domain
- environment variable: `DEFAULT_SITE_KEY=jumeirah-college`

### Project 2: Generic production

- production domain: generic site domain
- environment variable: `DEFAULT_SITE_KEY=generic`

Keep preview deployments enabled for both projects.

## Review Flow

Recommended default flow:

1. Sponsor opens a GitHub issue.
2. Sponsor asks Codex to implement it and to commit, push, and open or update the PR.
3. Codex makes the repo changes and handles Git operations.
4. Vercel preview is reviewed.
5. Sponsor asks for revisions on the same PR or approves it.
6. Technical steward approves structural/risky work.
7. PR merges to `main`.
8. Vercel deploys to production.

## What To Hand The Content Director

Give the sponsor one browser-first starting point:

- the deployed `/content-director` URL

Tell her this is her working guide for:

- what to ask Codex
- how to review previews
- what to do when something looks wrong
- when to escalate to the steward

## Local Steward Commands

```bash
npm install
npm run check
npm run dev
```

Open:

- `http://localhost:3000/`
- `http://localhost:3000/jumeirah-college`
- `http://localhost:3000/generic`
