# Operating Model

## Roles

### Sponsor / content director

- Owns intent, audience fit, educational quality, and sign-off.
- Works in GitHub issues, Codex prompts, and Vercel previews.
- Does not manage code, branches, or deployments directly.

### Codex

- Implements approved requests in the repo.
- Explains changes in plain language.
- Uses the smallest safe change that achieves the intent.
- Keeps content and presentation work inside the existing model unless the request is explicitly structural.

### Technical steward

- Owns GitHub branch protection, required checks, and deployment safety.
- Reviews structural, risky, or production-affecting changes.
- Handles build failures, rollback, routing issues, and model/schema changes.

## Change Categories

### Content-only

- Copy, contacts, ordering, wording, emphasis, and small safe polish.
- Usually fast-tracked after preview review.

### Presentation

- Shared styling, layout, spacing, or interaction refinements that do not change the content model.
- Needs preview review and accessibility smoke check.

### Structural

- New sections, schema changes, routing changes, deployment behavior, major IA changes, or accessibility behavior changes.
- Always requires technical-steward review before merge.

## Acceptance Standard

Every public change should meet this baseline:

- right audience is centered
- no internal or meta/editorial copy leaks onto the public page
- language is accessible and low-pressure
- contacts and links are correct
- mobile rendering is acceptable
- build checks pass

## Labels To Create In GitHub

Create these repository labels once:

- `content-only`
- `presentation`
- `structural`
- `jumeirah`
- `generic`
- `needs-preview`
- `ready-for-steward`

Use labels to keep triage simple for a non-technical sponsor.
