# Local Iteration Guide

This phase is designed for local-only design and content iteration.

## Working Loop

1. Start the local dev server in your own terminal with `npm run dev`.
2. Open `http://localhost:3000/jumeirah-college` or `http://localhost:3000/generic`.
3. Describe the change you want in plain English in Codex chat.
4. Let Codex update the local files.
5. Refresh the browser and react to what you see.

## Good Prompt Patterns

- Rewrite the student journey so it feels calmer and more reassuring.
- Make the overwhelmed path more visual and less text-heavy.
- Reduce reading load in the first screen.
- Turn this section into clearer cards with stronger next actions.
- Keep the same meaning but make it easier for a 13 to 16 year old to scan.
- Make the adult guidance quieter so the page still feels student-first.
- Improve this section for visual learners without making it childish.

## Where Changes Usually Happen

- Content changes: `content/sites/jumeirah-college.json`
- Content changes: `content/sites/generic.json`
- Shared layout and interaction changes: `components/public/site-page.tsx`
- Shared visual styling: `app/globals.css`
- Content model changes: `lib/site-schema.ts`

## Suggested Review Habit

When reviewing locally, look for:

- Can a student tell where to start within a few seconds?
- Does each intent path give one clear next step?
- Is the reading load low enough on the first screen?
- Are the human support routes obvious?
- Does the page still work well on a narrow mobile viewport?

## Note

This Codex shell could not run `npm` because `node` and `npm` are not currently on the shell path here. If your own machine has Node.js available, use your normal terminal for `npm run dev` while Codex continues making local edits in this repo.
