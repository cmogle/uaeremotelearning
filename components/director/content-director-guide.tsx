"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCopy,
  ExternalLink,
  FileWarning,
  LayoutDashboard,
  MessageSquare,
  RefreshCcw,
  ShieldPlus,
  Sparkles,
  Waypoints,
} from "lucide-react";

type Scenario = {
  id: string;
  title: string;
  summary: string;
  prompt: string;
  reviewChecks: string[];
  ifStillWrong: string;
  icon: LucideIcon;
};

const repoBaseUrl = "https://github.com/cmogle/uaeremotelearning";

const scenarioGroups: Scenario[] = [
  {
    id: "content",
    title: "Change wording or content",
    summary: "Use this when you want to improve copy, contacts, tone, emphasis, or clarity.",
    prompt:
      "Please make a content-only change to this site.\n\nGoal:\n[Describe what should feel different for the visitor]\n\nAudience:\n[Student / adult / both]\n\nVariant:\n[Jumeirah / generic / both]\n\nNon-negotiables:\n[List anything that must stay the same]\n\nAccessibility needs:\n[Describe any reading-load, clarity, processing, or additional-needs considerations]\n\nPlease keep the page calm, accessible, and human. Tell me if you think this is larger than a content-only change before you implement it.",
    reviewChecks: [
      "The right audience is centered.",
      "The wording sounds calmer and more human.",
      "Reading load is lower, not higher.",
      "Names, contacts, and links are still correct.",
    ],
    ifStillWrong:
      "This is closer, but it still does not feel right for the audience. Please do another pass with lower reading load, clearer next steps, and simpler language.",
    icon: MessageSquare,
  },
  {
    id: "presentation",
    title: "Make the page feel clearer",
    summary: "Use this when the content is broadly right but the page feels too dense, noisy, or hard to scan.",
    prompt:
      "Please make a presentation change without changing the underlying content model.\n\nGoal:\n[Describe what feels overwhelming, dense, or hard to scan]\n\nAudience:\n[Student / adult / both]\n\nVariant:\n[Jumeirah / generic / both]\n\nAccessibility needs:\n[Focus, contrast, reading load, mobile scanning, tap targets, motion, etc.]\n\nPlease keep the student experience calm, accessible, and easy to scan. Avoid generic AI-looking design. Tell me if this should really be treated as structural before you change it.",
    reviewChecks: [
      "The first screen feels less overwhelming.",
      "Mobile scanning is better.",
      "The design still feels deliberate, not generic.",
      "Student support is still easy to find.",
    ],
    ifStillWrong:
      "This still feels too dense. Please do another pass focused on stronger hierarchy, fewer competing elements, and a calmer first impression on mobile.",
    icon: LayoutDashboard,
  },
  {
    id: "wrong-detail",
    title: "Fix something factual",
    summary: "Use this when a contact, link, name, or school-specific detail is wrong.",
    prompt:
      "Please correct a factual detail on the site.\n\nVariant:\n[Jumeirah / generic]\n\nWhat is wrong now:\n[Describe the incorrect detail]\n\nWhat it should be instead:\n[Provide the correct detail]\n\nPlease keep all other content unchanged unless a small wording adjustment is needed to keep the page clear.",
    reviewChecks: [
      "The correct variant changed.",
      "The factual detail is now correct.",
      "No unrelated text changed unnecessarily.",
      "No wrong-school content leaked into the other variant.",
    ],
    ifStillWrong:
      "The factual detail is still not correct. Please only update the affected detail and confirm that no unrelated copy changed.",
    icon: CheckCircle2,
  },
  {
    id: "bigger-change",
    title: "Ask for something bigger",
    summary: "Use this when you want to change journeys, structure, sections, or how the site works.",
    prompt:
      "This feels bigger than a normal content edit. Please treat it as a structural request.\n\nUser problem:\n[Describe what is not working for the visitor]\n\nDesired outcome:\n[Describe what should be easier or clearer]\n\nAudience:\n[Student / adult / both]\n\nVariant:\n[Jumeirah / generic / both]\n\nBefore implementation, please explain in plain language:\n1. whether this is definitely structural,\n2. what the main risks are,\n3. what the safest path is.",
    reviewChecks: [
      "Codex explained the risks before changing anything major.",
      "The student-first journey is still protected unless intentionally changed.",
      "The preview is easier to use, not just different.",
      "The steward reviewed it before merge.",
    ],
    ifStillWrong:
      "Please pause further implementation and explain the safest next option in plain language. I want to understand the risk before this goes further.",
    icon: Waypoints,
  },
];

const supportScenarios = [
  {
    id: "preview-wrong",
    label: "The preview looks wrong",
    icon: FileWarning,
    message:
      "The preview does not look right. Please check whether the wrong variant changed, whether too much changed, or whether a presentation change turned into a structural one.",
  },
  {
    id: "checks-failed",
    label: "GitHub checks failed",
    icon: AlertTriangle,
    message:
      "The PR checks failed. This was intended to be a [content-only / presentation / structural] change. Please investigate the failure and tell me in plain language whether the request needs to be simplified or escalated.",
  },
  {
    id: "live-site",
    label: "The live site looks broken",
    icon: ShieldPlus,
    message:
      "The live site appears to be wrong or broken. The affected variant is [Jumeirah / generic]. The page URL is [paste URL]. Please investigate this as a production issue and tell me the safest next step.",
  },
  {
    id: "codex-off",
    label: "Codex misunderstood me",
    icon: RefreshCcw,
    message:
      "This is not solving the right problem yet. Please restate the user problem in one sentence, then revise the change so it better supports the intended audience without increasing reading load.",
  },
];

const quickLinks = [
  {
    label: "Open GitHub Issues",
    href: `${repoBaseUrl}/issues/new/choose`,
  },
  {
    label: "Open Pull Requests",
    href: `${repoBaseUrl}/pulls`,
  },
  {
    label: "View Jumeirah Route",
    href: "/jumeirah-college",
  },
  {
    label: "View Generic Route",
    href: "/generic",
  },
] as const;

const workflowSteps = [
  {
    title: "1. Describe the visitor problem",
    text: "Tell Codex what is not working for the student, adult, or site experience. You do not need to explain code.",
  },
  {
    title: "2. Ask Codex to implement it",
    text: "Use one of the prompts on this page. Always ask Codex to commit, push, and open or update a PR when the change is ready.",
  },
  {
    title: "3. Codex handles Git",
    text: "Codex makes the file changes, creates the commit, pushes the branch, and opens or updates the pull request. You do not run Git commands yourself.",
  },
  {
    title: "4. Review the PR and preview",
    text: "Open the pull request and the Vercel preview link. Check desktop and mobile. Decide whether the change feels right for the audience.",
  },
  {
    title: "5. Ask for revisions if needed",
    text: "If anything is off, reply in plain language. Codex should keep working on the same branch and the same pull request.",
  },
  {
    title: "6. Approve, then let merge happen",
    text: "When the result looks right, approve it. The technical steward merges structural or risky work, and may also be the default merger while the workflow is new.",
  },
  {
    title: "7. Production updates after merge",
    text: "Once the pull request is merged, Vercel deploys the update. If the live site looks wrong after that, use the escalation messages below.",
  },
] as const;

const implementationPrompt =
  "Please implement this request in the repo. When the change is ready, commit it, push the branch, and open or update a pull request with a preview link for me to review. If the request is structural or risky, explain that before you proceed.";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 2200);
    }
  }

  return (
    <button className="director-copy-button" onClick={handleCopy} type="button">
      <ClipboardCopy aria-hidden="true" size={16} />
      {status === "idle" ? label : status === "copied" ? "Copied" : "Copy failed"}
    </button>
  );
}

export function ContentDirectorGuide() {
  const [activeScenarioId, setActiveScenarioId] = useState(scenarioGroups[0].id);
  const [activeSupportId, setActiveSupportId] = useState(supportScenarios[0].id);

  const activeScenario =
    scenarioGroups.find((scenario) => scenario.id === activeScenarioId) ?? scenarioGroups[0];
  const activeSupport =
    supportScenarios.find((scenario) => scenario.id === activeSupportId) ?? supportScenarios[0];
  const ActiveScenarioIcon = activeScenario.icon;
  const ActiveSupportIcon = activeSupport.icon;

  return (
    <div className="director-shell">
      <main className="director-page">
        <section className="director-hero">
          <div className="page-shell director-hero-grid">
            <div className="director-hero-copy">
              <div className="director-kicker">
                <Sparkles aria-hidden="true" size={16} />
                Content Director Companion
              </div>
              <h1>You do not need to learn the repo to lead this project.</h1>
              <p className="director-intro">
                Think of this as your working page. Choose what you want to do, copy the words into
                Codex, review the preview, and stay in content-director mode unless something truly
                needs technical help.
              </p>
              <div className="director-chat-stack">
                <div className="director-bubble director-bubble-user">
                  I want the site to feel calmer for stressed students, but I do not know how to
                  tell a developer that.
                </div>
                <div className="director-bubble director-bubble-guide">
                  That is exactly your job here. You describe the visitor problem in plain language.
                  Codex handles the implementation. You review whether the result feels right.
                </div>
              </div>
            </div>

            <aside className="director-summary-card" aria-label="How this works">
              <h2>How this works</h2>
              <ol className="director-number-list">
                <li>Choose the kind of change you want.</li>
                <li>Copy the ready-made prompt into Codex.</li>
                <li>Codex commits, pushes, and opens the PR.</li>
                <li>Review the PR preview on desktop and phone.</li>
                <li>Approve it or ask for another pass.</li>
              </ol>
              <p className="director-summary-note">
                You should not need the terminal, local files, JSON editing, or Git commands.
              </p>
            </aside>
          </div>
        </section>

        <section className="director-section">
          <div className="page-shell">
            <div className="director-section-heading">
              <p className="eyebrow">Start here</p>
              <h2>What do you want to do today?</h2>
            </div>

            <div className="director-link-grid">
              {quickLinks.map((link) => (
                <a className="director-link-card" href={link.href} key={link.label}>
                  <span>{link.label}</span>
                  {link.href.startsWith("http") ? (
                    <ExternalLink aria-hidden="true" size={16} />
                  ) : (
                    <ArrowRight aria-hidden="true" size={16} />
                  )}
                </a>
              ))}
            </div>

            <div className="director-workspace-grid">
              <article className="director-workspace-card">
                <strong>Codex</strong>
                <p>Ask for the change in plain language. Codex is the one that commits and pushes.</p>
              </article>
              <article className="director-workspace-card">
                <strong>GitHub issue</strong>
                <p>Use an issue when you want the request written down clearly before work starts.</p>
              </article>
              <article className="director-workspace-card">
                <strong>PR preview</strong>
                <p>Check whether the result feels right. You are reviewing the visitor experience.</p>
              </article>
            </div>

            <div className="director-copy-card">
              <div className="director-copy-header">
                <strong>Use this line in most requests</strong>
                <CopyButton label="Copy workflow line" text={implementationPrompt} />
              </div>
              <p className="director-followup-text">{implementationPrompt}</p>
            </div>
          </div>
        </section>

        <section className="director-section director-section-alt">
          <div className="page-shell">
            <div className="director-section-heading">
              <p className="eyebrow">Exact workflow</p>
              <h2>What happens after Codex makes the changes?</h2>
            </div>

            <div className="director-workflow-grid">
              {workflowSteps.map((step) => (
                <article className="director-workflow-card" key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="director-section">
          <div className="page-shell">
            <div className="director-section-heading">
              <p className="eyebrow">Ask Codex</p>
              <h2>Choose a situation and copy the words</h2>
            </div>

            <div className="director-tab-row" role="tablist" aria-label="Content director scenarios">
              {scenarioGroups.map((scenario) => {
                const Icon = scenario.icon;
                const isActive = scenario.id === activeScenario.id;
                return (
                  <button
                    aria-selected={isActive}
                    className={`director-tab ${isActive ? "active" : ""}`}
                    key={scenario.id}
                    onClick={() => setActiveScenarioId(scenario.id)}
                    role="tab"
                    type="button"
                  >
                    <Icon aria-hidden="true" size={18} />
                    {scenario.title}
                  </button>
                );
              })}
            </div>

            <div className="director-scenario-panel" role="tabpanel">
              <div className="director-panel-header">
                <div className="director-icon-badge">
                  <ActiveScenarioIcon aria-hidden="true" size={20} />
                </div>
                <div>
                  <h3>{activeScenario.title}</h3>
                  <p>{activeScenario.summary}</p>
                </div>
              </div>

              <div className="director-copy-card">
                <div className="director-copy-header">
                  <strong>Paste this into Codex</strong>
                  <CopyButton label="Copy prompt" text={activeScenario.prompt} />
                </div>
                <pre className="director-prompt-block">{activeScenario.prompt}</pre>
              </div>

              <div className="director-response-grid">
                <article className="director-check-card">
                  <h4>What to check in preview</h4>
                  <ul className="plain-list">
                    {activeScenario.reviewChecks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="director-check-card">
                  <h4>If it is still not right</h4>
                  <p>Paste this follow-up into Codex.</p>
                  <div className="director-mini-copy">
                    <CopyButton label="Copy follow-up" text={activeScenario.ifStillWrong} />
                  </div>
                  <p className="director-followup-text">{activeScenario.ifStillWrong}</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="director-section director-section-alt">
          <div className="page-shell">
            <div className="director-section-heading">
              <p className="eyebrow">When something goes wrong</p>
              <h2>Pick the problem and send the exact message</h2>
            </div>

            <div className="director-support-grid">
              <div className="director-support-list" role="tablist" aria-label="Troubleshooting situations">
                {supportScenarios.map((scenario) => {
                  const Icon = scenario.icon;
                  const isActive = scenario.id === activeSupport.id;
                  return (
                    <button
                      aria-selected={isActive}
                      className={`director-support-button ${isActive ? "active" : ""}`}
                      key={scenario.id}
                      onClick={() => setActiveSupportId(scenario.id)}
                      role="tab"
                      type="button"
                    >
                      <Icon aria-hidden="true" size={18} />
                      {scenario.label}
                    </button>
                  );
                })}
              </div>

              <article className="director-triage-card" role="tabpanel">
                <div className="director-panel-header">
                  <div className="director-icon-badge warning">
                    <ActiveSupportIcon aria-hidden="true" size={20} />
                  </div>
                  <div>
                    <h3>{activeSupport.label}</h3>
                    <p>Copy this message into Codex or into the PR conversation.</p>
                  </div>
                </div>

                <div className="director-copy-card compact">
                  <div className="director-copy-header">
                    <strong>Escalation message</strong>
                    <CopyButton label="Copy message" text={activeSupport.message} />
                  </div>
                  <pre className="director-prompt-block">{activeSupport.message}</pre>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="director-section">
          <div className="page-shell">
            <div className="director-section-heading">
              <p className="eyebrow">Safe boundaries</p>
              <h2>When to stay in content-director mode and when to escalate</h2>
            </div>

            <div className="director-boundary-grid">
              <article className="director-boundary-card">
                <div className="director-panel-header">
                  <div className="director-icon-badge success">
                    <BookOpen aria-hidden="true" size={20} />
                  </div>
                  <div>
                    <h3>You can stay in your normal workflow</h3>
                    <p>These are ordinary requests for Codex and preview review.</p>
                  </div>
                </div>
                <ul className="plain-list">
                  <li>Rewrite copy</li>
                  <li>Reduce reading load</li>
                  <li>Correct names, links, or contacts</li>
                  <li>Make the first screen calmer</li>
                  <li>Tighten adult guidance</li>
                </ul>
              </article>

              <article className="director-boundary-card">
                <div className="director-panel-header">
                  <div className="director-icon-badge warning">
                    <ShieldPlus aria-hidden="true" size={20} />
                  </div>
                  <div>
                    <h3>Bring in the steward</h3>
                    <p>These are larger, riskier, or more technical changes.</p>
                  </div>
                </div>
                <ul className="plain-list">
                  <li>Change journeys or navigation</li>
                  <li>Add or remove major sections</li>
                  <li>Create more site variants</li>
                  <li>Change deployment or root routing</li>
                  <li>Fix repeated GitHub or Vercel failures</li>
                </ul>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
