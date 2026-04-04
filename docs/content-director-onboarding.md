# Content Director Onboarding

This guide is the full onboarding flow for the non-technical content director.

If the content director is working in the browser, give her this as the main entrypoint:

- `/content-director`

The goal is simple:

- you shape the educational intent
- Codex handles the repo changes
- Codex commits and pushes the repo changes
- GitHub and Vercel show you what changed
- the technical steward steps in only when needed

## What Your Workspace Should Look Like

You do **not** need a coding setup.

Your normal workspace is browser-first:

1. Codex
2. GitHub repository
3. GitHub Issues
4. GitHub Pull Requests
5. Live site
6. Vercel preview links from PRs

Recommended browser bookmarks:

- repository home
- issues list
- pull requests list
- Jumeirah live site
- generic live site
- your Codex workspace

Recommended browser habit:

- keep one browser profile for this project so GitHub, Codex, and preview links all stay signed in

## First-Day Setup

### Step 1: Confirm account access

Make sure you can:

- sign into Codex
- sign into GitHub
- open the repository
- open Issues and Pull Requests
- open the live site

You do **not** need to clone the repo or install local development tools.

### Step 2: Learn the three working spaces

You mainly move between:

- **Issue**: where you explain what should change
- **PR preview**: where you review the result
- **Codex chat**: where you ask for revisions in plain language

### Step 3: Learn the three change types

Use this simple rule:

- **Content-only**: wording, contacts, emphasis, tone, reading load
- **Presentation**: layout, visual clarity, scanning, calmer structure
- **Structural**: navigation, journeys, new sections, new behavior, routing

If in doubt, start with a GitHub issue and describe the visitor problem. Codex or the technical steward can classify it.

## Your Normal Working Flow

This is the exact default workflow:

1. You describe the visitor problem in plain language.
2. You ask Codex to implement it.
3. Codex edits the repo files.
4. Codex commits the changes.
5. Codex pushes the branch.
6. Codex opens or updates a pull request.
7. You review the PR preview.
8. If it is not right, you ask Codex to revise the same PR.
9. If it is right, you approve it.
10. The technical steward merges structural or risky work, and may also be the default merger while the workflow is new.
11. Vercel deploys after merge.

Important:

- You do **not** commit changes yourself.
- You do **not** push branches yourself.
- You do **not** merge risky work yourself.
- Your job is to direct, review, and approve.

### 1. Start from the visitor problem

Write what is wrong in plain language.

Good examples:

- “A stressed student cannot tell what to do in the first 10 seconds.”
- “The adult guidance is still too long to scan on a phone.”
- “This wording may be too abstract for a learner with processing difficulties.”

### 2. Open the right GitHub issue template

Choose:

- `Content change`
- `Presentation change`
- `Structural change`

Write:

- which site is affected
- who the primary audience is
- what should feel better
- what must stay true
- any accessibility or additional-needs considerations

### 3. Ask Codex to implement the issue

Simple message format:

> Please implement GitHub issue #[number]. Keep the student experience calm, accessible, and easy to scan. Tell me anything you think is risky before you make a structural change.

Add this final sentence in most requests:

> When the change is ready, please commit it, push the branch, and open or update the pull request for me to review.

### 4. Review the PR preview

Check the preview link on desktop and on your phone.

Ask:

- Is the right audience centered?
- Is the page calmer and easier to understand?
- Is there too much reading?
- Are any names, links, or contact details wrong?
- Does any wording sound technical, editorial, or “AI-written”?
- Would a learner with additional needs find the next step faster or slower?

### 5. Approve or request changes

Use plain language.

Examples:

- “This is warmer, but the first paragraph is still too long.”
- “The adult panel is better, but the contact details need to stay more prominent.”
- “Please remove the phrase ‘support pathways’ and use simpler language.”

If you want Codex to continue from the same PR, say:

> Please update the existing pull request rather than starting a new one.

### 6. Let the steward handle structural or risky merges

You do not need to think about branch protection, deployment safety, or build errors.

If the PR changes structure, routing, schema, or accessibility behavior, the technical steward should review before merge.

## Who Commits And Pushes?

The answer should almost always be:

- **Codex commits**
- **Codex pushes**
- **Codex opens or updates the pull request**
- **You review and approve**
- **The steward merges if the work is risky, structural, or still inside the review-gate period**

This keeps you in the content-director role rather than pushing you into repo management.

## What You Should Ask Codex For

Codex is a good fit for:

- rewriting copy
- reducing reading load
- making tone calmer or more reassuring
- making adult guidance easier to scan
- improving accessibility language
- adjusting section emphasis
- making the first screen less overwhelming
- refining layout without changing the whole system

Codex is **not** the place to silently decide policy. If a request changes the product itself, say so explicitly.

## What To Do If You Want More Than Content Changes

Ask for a **presentation** or **structural** change when you want:

- a different information architecture
- different journeys for students and adults
- new sections
- different root landing behavior
- new templates for more variants
- major layout changes
- anything that changes how the site works, not just what it says

Use this phrase:

> This is probably more than a content edit. Please treat this as a structural request and tell me the safest way to do it.

## Review Checklist

Before approving a PR, check:

- the right site variant changed
- the right audience is centered
- reading load is manageable
- accessibility language is explicit
- no internal or technical language appears on the page
- no Jumeirah-specific content leaked into the generic version
- no generic placeholders leaked into the Jumeirah version
- mobile view still feels calm and readable

## What Success Looks Like

You are successful in this role when:

- the site stays educationally strong
- the wording remains human and accessible
- learners can find the next step quickly
- adults can support without wading through noise
- you can direct improvements without becoming the person who manages code
