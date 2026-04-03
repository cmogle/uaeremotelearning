# Troubleshooting And Escalation

This guide explains what to do when something goes wrong, or when a request is bigger than an ordinary content change.

## First Rule

Do not try to fix technical problems yourself.

Your job is to describe:

- what you were trying to do
- what went wrong
- what you expected instead

Codex or the technical steward should handle the technical fix.

## If Codex Gives An Unhelpful Result

Say exactly what was wrong.

Examples:

- “This sounds too corporate.”
- “This is still too long for a stressed learner.”
- “The adult guidance is clearer, but the student journey now feels weaker.”
- “The reading load is better, but the contact details are too hidden.”

Best next step:

- ask for a revision in plain language
- keep the feedback outcome-focused
- avoid trying to explain code or implementation

## If The Preview Looks Wrong

Possible signs:

- the wrong site variant changed
- the page looks broken on mobile
- important information disappeared
- the design feels much noisier than expected
- internal or technical language appears on the page

What to do:

1. Do not approve the PR.
2. Leave a comment describing what looks wrong.
3. If the change seems bigger than expected, ask whether it should be treated as structural.

Suggested message:

> The preview does not look right. Please check whether the wrong variant changed or whether this update affected more than the requested section.

## If GitHub Shows A Failed Check

Examples:

- build failed
- checks failed
- preview failed to deploy

What to do:

- do not try to repair the check yourself
- tag the technical steward
- explain whether this was a content-only, presentation, or structural request

Suggested message:

> The PR checks failed. This was intended to be a [content-only/presentation/structural] change. Please investigate the failure and tell me whether the request needs to be simplified.

## If The Live Site Looks Wrong After Merge

What to do:

1. Capture the page URL.
2. Note which variant is affected.
3. Describe the visible problem.
4. Contact the technical steward immediately.

Examples of useful notes:

- “The Jumeirah home page is showing generic wording.”
- “The root URL now lands on the wrong site.”
- “The student route cards look broken on my phone.”

## If You Want Something Bigger Than A Content Change

Treat it as **structural** if it involves:

- journeys or navigation
- new sections
- new user groups
- new site variants
- deployment behavior
- schema or data-model changes
- accessibility behavior changes

What to do:

1. Open a structural issue.
2. Describe the user problem, not the code solution.
3. Ask Codex to explain the safest path before implementation.

Suggested message:

> This feels bigger than a normal content edit. Please treat it as a structural request, explain the risks in plain language, and recommend the safest path.

## If You Are Unsure Which Template To Use

Use this shortcut:

- If it changes what the site **says**, start with `Content change`.
- If it changes how the site **looks or scans**, start with `Presentation change`.
- If it changes how the site **works or is organised**, use `Structural change`.

If still unsure, use the structural template. It is safer to over-escalate than under-escalate.

## Escalate Immediately If

- the wrong audience is centered
- student support becomes harder to find
- contact details may be wrong
- accessibility seems worse
- the root site behavior changes unexpectedly
- the live site looks broken
- GitHub/Vercel checks fail repeatedly

## What To Include In Any Escalation

- which site variant is affected
- the page URL
- what you were trying to change
- what happened instead
- whether the issue is on preview or live production

This is enough for Codex or the technical steward to take over.
