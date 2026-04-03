# Author Playbook

This project is set up so the sponsor can act as **content director**, not as a developer.

Start here if this is your first time using the project:

- [`content-director-onboarding.md`](./content-director-onboarding.md)
- [`prompt-library.md`](./prompt-library.md)
- [`troubleshooting-and-escalation.md`](./troubleshooting-and-escalation.md)

## Your Role

- Explain what should change and why.
- Review the preview link.
- Approve or reject the wording, tone, and user experience.
- Escalate structural ideas when the site flow or architecture needs to change.

You are **not** expected to:

- edit JSON or code
- use the terminal
- run Git commands
- debug Vercel

## Default Workflow

1. Open a GitHub issue using the right template.
2. Describe the change in plain language.
3. Ask Codex to implement the issue.
4. Review the Vercel preview linked from the PR.
5. Approve the change or ask for a revision.
6. A technical steward merges structural or risky work.

For a fuller first-day setup and review routine, use [`content-director-onboarding.md`](./content-director-onboarding.md).

## How To Request Good Changes

Include:

- which audience matters most
- which variant is affected
- what should feel different for the visitor
- anything that must stay exactly the same
- accessibility or additional-needs considerations

Good examples:

- “Make the Jumeirah student hero calmer and more reassuring for learners who are overwhelmed before period one.”
- “Shorten the adult guidance so a form tutor can scan it quickly on a phone.”
- “Reduce the reading load in the support cards for students with attention or processing difficulties.”
- “Keep the same information, but make the first screen less overwhelming for anxious students.”

Less helpful examples:

- “Make it better.”
- “Redesign the whole thing.”
- “Change everything for SEN.”

## How To Review A Preview

Check the live preview with these questions:

- Does it sound like a calm human wrote it?
- Is the right audience clearly centered?
- Can a stressed student find the next step quickly?
- Does the page avoid internal, technical, or editorial language?
- Is the reading load manageable on mobile?
- Are contacts, names, and links correct?

If the answer is “not quite,” leave feedback in plain language. You do not need to explain how to code the fix.

## When To Escalate

Ask for a **structural change** if the request affects:

- site navigation
- information architecture
- adding or removing major sections
- deployment behavior
- schema or content model changes
- accessibility behavior beyond ordinary copy/layout adjustments

If something goes wrong or you are unsure what kind of request you are making, use [`troubleshooting-and-escalation.md`](./troubleshooting-and-escalation.md).
