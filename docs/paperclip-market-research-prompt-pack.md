# Paperclip Market Research Prompt Pack

This file captures the first-pass commercial framing for the `distancelearn.ing` / `uaeremotelearning` project and the next prompts to run in Paperclip.

## Current Thesis

The strongest commercial framing is not a generic remote-learning platform.

The stronger wedge is a content-first product line around:

- inclusion
- wellbeing
- family-school support
- school continuity and disruption response
- downloadable, customizable playbooks for specific buyer roles

The early commercial model should stay low-liability:

- downloadable resource packs
- school-branded customization
- annual updates
- optional white-label microsites

The product should avoid early movement into:

- child accounts
- clinical guidance
- personalized risk scoring
- regulated interventions
- heavy student data collection

## Initial Commercial Recommendation

Prioritize these buyer groups first:

1. private schools and premium international schools
2. school groups and networks
3. inclusion leads / pastoral leads / wellbeing leaders
4. family-engagement leaders
5. parents as a secondary low-ticket channel

Treat regulators and ministries as later-stage enterprise/public-sector buyers, not the initial wedge.

## Liability Guardrails

Paperclip should assume these constraints unless explicitly changed:

- Treat all wellbeing content as non-clinical support content.
- Do not generate diagnosis, treatment, or mental-health triage advice.
- Keep phase 1 as content-first and low-data.
- Assume child-access risk even if the buyer is the school.
- Require human review before publication of any customer-facing content.
- Add jurisdiction, version, review date, and escalation-path metadata to every playbook.
- Keep translation and safeguarding language under human QA.

## How To Use This Pack

Run the prompts below in order. Keep outputs structured and decision-oriented. Favor tables, explicit assumptions, and red/amber/green recommendations over generic narrative.

For all prompts below, use this standing context:

```text
Context:
- The existing asset is https://distancelearn.ing/ and/or repo cmogle/uaeremotelearning.
- The resource was created by Fionnuala Nic Conmara, Head of Inclusion at Jumeirah College in Dubai, UAE.
- The initial trigger was disruption to normal school patterns during the Iran war, but the opportunity may extend beyond remote learning into inclusion, wellbeing, family support, and school continuity.
- The commercial objective is to evaluate and potentially build a business around downloadable and customizable resource packs / playbooks for buyer roles including pupil, parent, educator, educational establishment, regulator, and health ministry.
- The analysis must strongly prioritize commerciality and liability management.
- Avoid assuming the business should become a full LMS, SIS, or communications platform unless the evidence clearly supports it.
```

## Priority Prompt Sequence

## Single CEO Orchestrator Prompt

Use this when you want the Paperclip CEO to own the entire workstream, decompose it, delegate it internally, and return a coherent decision-ready package without needing separate manual prompt submission.

```text
You are the CEO / chief-of-staff agent for a new education venture emerging from https://distancelearn.ing/ and/or repo cmogle/uaeremotelearning.

Your job is to run this as a delegated multi-workstream strategy program. Do not answer with a shallow single-pass summary. Break the problem into workstreams, assign them internally to the most appropriate specialist agents, manage dependencies, and synthesize the outputs into one decision-ready package for the founder.

Core context:
- The original asset was created by Fionnuala Nic Conmara, Head of Inclusion at Jumeirah College in Dubai, UAE.
- The initial trigger was disruption to normal school patterns during the Iran war.
- External educator feedback suggests the underlying value extends beyond emergency remote learning.
- The likely commercial direction is not a generic LMS or school communications platform, but a content-first, low-friction business around inclusion, wellbeing, family-school support, and school continuity.
- The business idea may involve downloadable and customizable playbooks / resource packs for these buyer roles: pupil, parent, educator, educational establishment, regulator, and health ministry.
- The analysis must strongly prioritize commerciality, market wedge clarity, and liability management.
- Avoid recommending high-liability platform features unless the commercial upside clearly justifies the increased regulatory and operational burden.

Operating instructions:
1. Decompose the problem into distinct internal workstreams.
2. Assign each workstream to the most suitable internal specialist agent or team.
3. Run the workstreams in parallel where possible.
4. Reconcile overlaps and contradictions across the outputs.
5. Escalate only where founder input is truly required.
6. Produce one final integrated output that is concise, commercial, and decision-oriented.

Required workstreams:
- Market landscape and competitor mapping
- Buyer segmentation and prioritization
- Commercial model and pricing hypotheses
- Liability, safeguarding, privacy, and regulatory risk assessment
- Positioning, naming, and category framing
- Customer discovery plan
- Content architecture for role-based playbooks
- Marketing engine, especially Instagram short-form
- Pilot offer design
- Product / technical roadmap for customization, maintenance, distribution, hosting, app/API path, and content operations
- Editorial governance and human-review workflow
- 12-month go-to-market plan

Required output structure:

Section 1: Executive verdict
- Is this business worth pursuing?
- What is the best market wedge?
- What should the company explicitly not be in phase 1?
- What are the biggest commercial opportunities and biggest liability risks?

Section 2: Recommended company framing
- Best category description
- Best buyer wedge
- Best initial offer structure
- Best pricing direction
- Best geography / customer entry point

Section 3: Internal workstream findings
- Concise summary from each workstream
- Key supporting evidence
- Contradictions or open questions

Section 4: Decision memo
- Red / amber / green assessment
- What to do now
- What to validate next
- What to defer

Section 5: Execution outputs
- A 30-day plan
- A 90-day plan
- A founder customer-discovery script
- A pilot offer outline
- A content architecture outline for the first playbook packs
- A liability guardrail checklist
- A recommended tech stack / sequencing view

Section 6: Ready-to-use assets
- 10 outreach messages for schools or school groups
- 10 founder-led customer discovery asks
- 20 Instagram content ideas
- 5 positioning statements
- 5 naming directions

Rules:
- Optimize for revenue realism, speed to proof, and low-liability launch design.
- Treat this as a real business evaluation, not a generic brainstorm.
- Separate evidence from inference.
- Flag assumptions clearly.
- Prefer content-first and service-assisted models before software-heavy builds.
- Assume AI-generated content must sit behind human editorial review before publication.

If useful, create additional sub-workstreams beyond the list above, but keep the final synthesis tight and commercially actionable.
```

### 1. Market Map

```text
Conduct a full market map for a content-first education product focused on inclusion, wellbeing, family support, and school continuity. Do not treat this as a generic LMS or school communications platform. Identify adjacent categories, top incumbents, buyer budgets, procurement patterns, and gaps. Output:
- category map
- competitor table
- unmet-needs analysis
- recommended market wedge for a new entrant
```

### 2. Buyer Segmentation

```text
Define the highest-probability buyer segments for a commercial education playbook business derived from a school wellbeing/inclusion resource hub. Rank segments by:
- speed of sale
- budget
- pain intensity
- procurement complexity
- liability exposure

Include:
- private schools
- school groups
- district leaders
- inclusion leads
- pastoral leaders
- family engagement leaders
- parents
- regulators
- health ministries
```

### 3. Commercial Model

```text
Design a phased commercial model for a content-first education company selling downloadable and customizable resource packs. Include:
- pricing hypotheses
- packaging
- upsells
- annual subscription structure
- customization services
- a 12-month revenue roadmap

Prioritize simple, low-liability offers before platform features.
```

### 4. Liability And Compliance Matrix

```text
Build a liability and compliance matrix for a global education resource business serving schools, educators, parents, and potentially children. Cover:
- privacy
- safeguarding
- mental-health claims
- child-directed services
- accessibility
- translation risk
- copyright
- AI-generated content
- regional considerations for UAE, UK, EU, and US

Output:
- red / amber / green feature matrix
- launch guardrails
- required policy/docs list
```

### 5. Positioning And Renaming

```text
Generate positioning options and naming directions for a business currently associated with “remote learning” but better suited to inclusion, wellbeing, family-school support, and educational continuity. Provide:
- 10 positioning statements
- 20 name ideas
- category language
- messaging that increases commercial relevance while reducing crisis-only framing
```

### 6. Customer Discovery Pack

```text
Create a customer discovery pack for interviewing 30 potential buyers across school leaders, inclusion leads, parents, and family-engagement leaders. Include:
- interview scripts
- objection probes
- willingness-to-pay questions
- pilot offer tests
- a scoring framework to compare buyer demand
```

### 7. Resource Pack Blueprint

```text
Design a scalable content architecture for downloadable education playbooks across these buyer roles:
- pupil
- parent
- educator
- educational establishment
- regulator
- health ministry

For each role, define:
- goals
- preferred formats
- tone
- risk controls
- update cadence
- localization needs
- what should be excluded to avoid liability
```

### 8. Instagram Short-Form Engine

```text
Create a marketing content system for Instagram short-form focused on educators, parents, and school leaders. Build:
- content pillars
- hooks
- recurring series
- CTA strategy
- visual style guidance
- posting cadence
- 60 ready-to-produce reel/carousel ideas

Keep the themes tied to:
- inclusion
- wellbeing
- routines
- anxiety
- school transitions
- family support
```

### 9. Pilot Offer

```text
Design a 6-week pilot offer for premium schools or school groups. Include:
- scope
- deliverables
- onboarding
- customization process
- success metrics
- review cadence
- pricing options
- pilot-to-annual-conversion path

Keep data collection minimal and liability low.
```

### 10. Product / Tech Roadmap

```text
Design the minimum technical apparatus to customize, maintain, and distribute school-branded playbooks globally. Start from a static-content-first architecture. Recommend the sequence for:
- CMS
- theming
- PDF/export generation
- localization
- analytics
- payments
- hosting
- API integrations
- account model
- optional app creation

Explicitly separate phase-1 necessities from platform overbuild.
```

### 11. Operations And Editorial Governance

```text
Create an editorial and governance operating model for an AI-assisted education content company. Define:
- roles
- review workflow
- quality standards
- evidence requirements
- versioning
- legal review triggers
- translation QA
- incident response for errors in published materials
```

### 12. Go-To-Market

```text
Build a go-to-market plan for the first 12 months for a new education company selling school continuity, inclusion, and wellbeing playbooks. Include:
- beachhead geography
- founder-led sales motion
- partnerships
- conference strategy
- outreach sequences
- pilot targets
- proof assets
- the first 20 logos to pursue
```

## Suggested Working Rule For Paperclip

Use this as a recurring instruction when running the prompts above:

```text
Operate as a commercial and risk-aware research analyst. Optimize for:
1. revenue realism
2. buyer clarity
3. low-liability launch sequencing
4. evidence-backed recommendations

Do not recommend building high-liability platform features unless the commercial upside clearly justifies the added regulatory and operational burden.
```
