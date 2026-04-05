"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { SitePage } from "@/components/public/site-page";
import {
  architectureSections,
  editorialPrinciples,
  editorialReviewFlow,
  sectionReviewGuides,
  siteDisplayNames,
} from "@/lib/product-model";
import { SiteDefinition, SiteKey, siteDefinitionSchema } from "@/lib/site-schema";

const DRAFT_PREFIX = "uae-remote-learning:draft:";
const PUBLISHED_PREFIX = "uae-remote-learning:published:";
const HISTORY_PREFIX = "uae-remote-learning:history:";
const REVIEW_PREFIX = "uae-remote-learning:review:";
const MAX_HISTORY = 12;

type EditorWorkspaceProps = {
  siteKey: SiteKey;
  initialSite: SiteDefinition;
};

type HistoryEntry = {
  id: string;
  label: string;
  createdAt: string;
  site: SiteDefinition;
};

type ReviewStatus = "not-started" | "in-review" | "approved" | "needs-rewrite";

type SectionReviewState = {
  status: ReviewStatus;
  keep: string;
  change: string;
  move: string;
  notes: string;
};

type ReviewStateMap = Record<Exclude<PanelId, "overview">, SectionReviewState>;

type PanelId =
  | "overview"
  | "hero"
  | "routes"
  | "support"
  | "day"
  | "wellbeing"
  | "adult"
  | "footer";

type Panel = {
  id: PanelId;
  title: string;
  description: string;
};

const panels: Panel[] = [
  {
    id: "overview",
    title: "Product model",
    description: "Keep the architecture governed, the editorial system intentional, and the editor safe.",
  },
  {
    id: "hero",
    title: "Hero",
    description: "First arrival message and quick-start guidance.",
  },
  {
    id: "routes",
    title: "Routes",
    description: "Top-level route selection and student intent pathways.",
  },
  {
    id: "support",
    title: "Immediate support",
    description: "Common blockers, scripts, and human support routes.",
  },
  {
    id: "day",
    title: "School day",
    description: "Expectations, routines, and what matters today.",
  },
  {
    id: "wellbeing",
    title: "Wellbeing",
    description: "Calm, contacts, and reset support.",
  },
  {
    id: "adult",
    title: "Adults",
    description: "Teacher, tutor, family, and accessibility guidance.",
  },
  {
    id: "footer",
    title: "Footer and theme",
    description: "Closing messages and shared brand tokens.",
  },
];

const reviewablePanels = panels.filter((panel): panel is Panel & { id: Exclude<PanelId, "overview"> } => panel.id !== "overview");

const defaultReviewState: SectionReviewState = {
  status: "not-started",
  keep: "",
  change: "",
  move: "",
  notes: "",
};

function createDefaultReviewState(): ReviewStateMap {
  return {
    hero: { ...defaultReviewState },
    routes: { ...defaultReviewState },
    support: { ...defaultReviewState },
    day: { ...defaultReviewState },
    wellbeing: { ...defaultReviewState },
    adult: { ...defaultReviewState },
    footer: { ...defaultReviewState },
  };
}

function cloneSite(site: SiteDefinition) {
  return JSON.parse(JSON.stringify(site)) as SiteDefinition;
}

function loadStoredSite(key: string) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }

    const parsed = siteDefinitionSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

function loadHistory(key: string) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return [] as HistoryEntry[];
    }

    const parsed = JSON.parse(raw) as HistoryEntry[];
    return parsed.filter((entry) => siteDefinitionSchema.safeParse(entry.site).success);
  } catch {
    return [] as HistoryEntry[];
  }
}

function loadReviewState(key: string) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return createDefaultReviewState();
    }

    const parsed = JSON.parse(raw) as Partial<ReviewStateMap>;
    return {
      ...createDefaultReviewState(),
      ...parsed,
    };
  } catch {
    return createDefaultReviewState();
  }
}

function saveHistory(key: string, entries: HistoryEntry[]) {
  window.localStorage.setItem(key, JSON.stringify(entries.slice(0, MAX_HISTORY)));
}

function downloadJson(filename: string, value: SiteDefinition) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function stamp(label: string, site: SiteDefinition): HistoryEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    label,
    createdAt: new Date().toISOString(),
    site: cloneSite(site),
  };
}

function updateItem<T>(items: T[], index: number, nextItem: T) {
  return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));
}

function Field({
  label,
  value,
  onChange,
  help,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  help?: string;
}) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <input className="editor-input" onChange={(event) => onChange(event.target.value)} value={value} />
      {help ? <small>{help}</small> : null}
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  help,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  help?: string;
  rows?: number;
}) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <textarea
        className="editor-textarea"
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        value={value}
      />
      {help ? <small>{help}</small> : null}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <select className="editor-input" onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function StringListEditor({
  title,
  items,
  onChange,
  itemLabel,
}: {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  itemLabel: string;
}) {
  return (
    <div className="editor-block">
      <div className="editor-block-heading">
        <h3>{title}</h3>
      </div>

      <div className="editor-stack">
        {items.map((item, index) => (
          <label className="editor-field" key={`${title}-${index}`}>
            <span>
              {itemLabel} {index + 1}
            </span>
            <textarea
              className="editor-textarea"
              onChange={(event) =>
                onChange(items.map((current, itemIndex) => (itemIndex === index ? event.target.value : current)))
              }
              rows={2}
              value={item}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export function EditorWorkspace({ siteKey, initialSite }: EditorWorkspaceProps) {
  const [activePanel, setActivePanel] = useState<PanelId>("overview");
  const [draft, setDraft] = useState<SiteDefinition>(cloneSite(initialSite));
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [reviewState, setReviewState] = useState<ReviewStateMap>(createDefaultReviewState());
  const [guidedMode, setGuidedMode] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Loaded source content.");

  const draftKey = `${DRAFT_PREFIX}${siteKey}`;
  const publishedKey = `${PUBLISHED_PREFIX}${siteKey}`;
  const historyKey = `${HISTORY_PREFIX}${siteKey}`;
  const reviewKey = `${REVIEW_PREFIX}${siteKey}`;

  useEffect(() => {
    const localDraft = loadStoredSite(draftKey);
    const localPublished = loadStoredSite(publishedKey);
    const nextSite = localDraft ?? localPublished ?? initialSite;

    setDraft(cloneSite(nextSite));
    setHistory(loadHistory(historyKey));
    setReviewState(loadReviewState(reviewKey));
    setStatusMessage(localDraft ? "Loaded saved draft." : localPublished ? "Loaded published local version." : "Loaded source content.");
  }, [draftKey, historyKey, initialSite, publishedKey, reviewKey]);

  useEffect(() => {
    window.localStorage.setItem(reviewKey, JSON.stringify(reviewState));
  }, [reviewKey, reviewState]);

  const validation = useMemo(() => siteDefinitionSchema.safeParse(draft), [draft]);
  const validationMessages = useMemo(
    () =>
      validation.success
        ? []
        : validation.error.issues.map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`),
    [validation]
  );

  const activeReviewGuide = useMemo(
    () => sectionReviewGuides.find((guide) => guide.id === activePanel) ?? null,
    [activePanel]
  );

  const activeReview = activePanel === "overview" ? null : reviewState[activePanel];

  const activeReviewIndex = reviewablePanels.findIndex((panel) => panel.id === activePanel);

  function patch(nextSite: SiteDefinition) {
    setDraft(cloneSite(nextSite));
  }

  function patchReview(panelId: Exclude<PanelId, "overview">, nextReview: SectionReviewState) {
    setReviewState((current) => ({
      ...current,
      [panelId]: nextReview,
    }));
  }

  function commit(label: string, key: string, nextSite: SiteDefinition) {
    window.localStorage.setItem(key, JSON.stringify(nextSite));
    const nextHistory = [stamp(label, nextSite), ...history];
    saveHistory(historyKey, nextHistory);
    setHistory(nextHistory.slice(0, MAX_HISTORY));
  }

  function saveDraft() {
    commit("Saved draft", draftKey, draft);
    setStatusMessage("Draft saved in this browser.");
  }

  function publish() {
    if (!validation.success) {
      setStatusMessage("Fix validation issues before publishing.");
      return;
    }

    commit("Published locally", publishedKey, draft);
    setStatusMessage("Published locally. The public page in this browser will now use this version.");
  }

  function restoreSource() {
    patch(initialSite);
    setStatusMessage("Restored source content into the editor.");
  }

  function rollback(entry: HistoryEntry) {
    patch(entry.site);
    commit(`Rollback to ${entry.createdAt}`, draftKey, entry.site);
    setStatusMessage(`Rolled draft back to ${new Date(entry.createdAt).toLocaleString()}.`);
  }

  function openNextSection() {
    if (activeReviewIndex < 0 || activeReviewIndex >= reviewablePanels.length - 1) {
      return;
    }

    setActivePanel(reviewablePanels[activeReviewIndex + 1].id);
  }

  function openPreviousSection() {
    if (activeReviewIndex <= 0) {
      return;
    }

    setActivePanel(reviewablePanels[activeReviewIndex - 1].id);
  }

  const activeArchitecture =
    architectureSections.find((section) =>
      activePanel === "hero"
        ? section.id === "hero"
        : activePanel === "routes"
          ? section.id === "journeys"
          : activePanel === "support"
            ? section.id === "support"
            : activePanel === "day"
              ? section.id === "today"
              : activePanel === "wellbeing"
                ? section.id === "wellbeing"
                : activePanel === "adult"
                  ? section.id === "educator"
                  : activePanel === "footer"
                    ? section.id === "footer"
                    : false
    ) ?? null;

  return (
    <main className="editor-page-shell">
      <header className="editor-topbar">
        <div>
          <p className="workspace-kicker">Editorial workspace</p>
          <h1>{siteDisplayNames[siteKey]}</h1>
          <p className="editor-topbar-copy">
            This workspace protects the shared experience architecture while letting content be reviewed
            and edited section by section.
          </p>
        </div>

        <div className="editor-topbar-actions">
          <button
            className={guidedMode ? "editor-button primary" : "editor-button secondary"}
            onClick={() => setGuidedMode((current) => !current)}
            type="button"
          >
            {guidedMode ? "Guided review on" : "Guided review off"}
          </button>
          <Link className="workspace-link-card compact" href={`/product`}>
            <strong>Product model</strong>
            <span>See the three-layer framing</span>
          </Link>
          <Link className="workspace-link-card compact" href={`/${siteKey}`}>
            <strong>Public page</strong>
            <span>Open the current experience</span>
          </Link>
        </div>
      </header>

      <section className="editor-status-row">
        <div className={validation.success ? "editor-status ok" : "editor-status error"}>
          <strong>{validation.success ? "Ready to publish" : "Validation issues"}</strong>
          <span>{statusMessage}</span>
        </div>

        <div className="editor-action-row">
          <button className="editor-button secondary" onClick={restoreSource} type="button">
            Reset to source
          </button>
          <button className="editor-button secondary" onClick={() => downloadJson(`${siteKey}.json`, draft)} type="button">
            Export JSON
          </button>
          <button className="editor-button secondary" onClick={saveDraft} type="button">
            Save draft
          </button>
          <button className="editor-button primary" onClick={publish} type="button">
            Publish locally
          </button>
        </div>
      </section>

      <section className="editor-layout">
        <aside className="editor-sidebar">
          <div className="editor-sidebar-section">
            <h2>Layers</h2>
            <div className="editor-layer-card">
              <strong>Experience architecture</strong>
              <span>Governed by product structure and section purpose.</span>
            </div>
            <div className="editor-layer-card">
              <strong>Editorial system</strong>
              <span>Copy, contacts, resources, images, and tone inside the structure.</span>
            </div>
            <div className="editor-layer-card">
              <strong>Editor capability</strong>
              <span>Draft, preview, publish, and rollback without editing code.</span>
            </div>
          </div>

          <div className="editor-sidebar-section">
            <h2>Sections</h2>
            <nav className="editor-nav">
              {panels.map((panel) => (
                <button
                  className={panel.id === activePanel ? "editor-nav-button active" : "editor-nav-button"}
                  key={panel.id}
                  onClick={() => setActivePanel(panel.id)}
                  type="button"
                >
                  <strong>{panel.title}</strong>
                  <span>{panel.description}</span>
                  {panel.id !== "overview" ? (
                    <span className={`editor-review-pill ${reviewState[panel.id].status}`}>
                      {reviewState[panel.id].status.replace("-", " ")}
                    </span>
                  ) : null}
                </button>
              ))}
            </nav>
          </div>

          <div className="editor-sidebar-section">
            <h2>Version history</h2>
            <div className="editor-history-list">
              {history.length === 0 ? <p className="editor-muted">No local history yet.</p> : null}
              {history.map((entry) => (
                <button className="editor-history-item" key={entry.id} onClick={() => rollback(entry)} type="button">
                  <strong>{entry.label}</strong>
                  <span>{new Date(entry.createdAt).toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="editor-main">
          {activePanel === "overview" ? (
            <div className="editor-panel">
              <div className="editor-panel-heading">
                <h2>How to use this workspace</h2>
                <p>
                  Use this view to keep the product language straight before editing section content.
                  The architecture stays fixed. The content is editable. Publishing is local to this
                  browser for now.
                </p>
              </div>

              <div className="workspace-card-grid workspace-card-grid-three">
                {reviewablePanels.map((panel) => (
                  <article className="workspace-card" key={panel.id}>
                    <p className="workspace-card-label">{panel.title}</p>
                    <h3>{reviewState[panel.id].status.replace("-", " ")}</h3>
                    <p>{panel.description}</p>
                  </article>
                ))}
              </div>

              <div className="workspace-card-grid workspace-card-grid-three">
                {architectureSections.map((section) => (
                  <article className="workspace-card" key={section.id}>
                    <p className="workspace-card-label">{section.title}</p>
                    <h3>{section.purpose}</h3>
                    <p>
                      <strong>Required blocks:</strong> {section.requiredBlocks.join(", ")}
                    </p>
                  </article>
                ))}
              </div>

              <div className="workspace-card-grid workspace-card-grid-two">
                <article className="workspace-card">
                  <h3>Editorial principles</h3>
                  <ul className="workspace-list">
                    {editorialPrinciples.map((principle) => (
                      <li key={principle.title}>
                        <strong>{principle.title}:</strong> {principle.description}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="workspace-card">
                  <h3>Review order</h3>
                  <ol className="workspace-list">
                    {editorialReviewFlow.map((stage) => (
                      <li key={stage.id}>
                        <strong>{stage.title}:</strong> {stage.output}
                      </li>
                    ))}
                  </ol>
                </article>
              </div>
            </div>
          ) : null}

          {activePanel !== "overview" ? (
            <div className="editor-panel">
              <div className="editor-panel-heading">
                <h2>{panels.find((panel) => panel.id === activePanel)?.title}</h2>
                <p>{panels.find((panel) => panel.id === activePanel)?.description}</p>
              </div>

              {guidedMode && activeReviewGuide && activeReview ? (
                <div className="editor-review-guide">
                  <div className="editor-review-guide-top">
                    <div>
                      <p className="workspace-kicker">Guided section review</p>
                      <h3>{activeReviewGuide.title}</h3>
                    </div>
                    <SelectField
                      label="Section status"
                      onChange={(value) =>
                        patchReview(activePanel, { ...activeReview, status: value as ReviewStatus })
                      }
                      options={["not-started", "in-review", "approved", "needs-rewrite"]}
                      value={activeReview.status}
                    />
                  </div>

                  <div className="workspace-card-grid workspace-card-grid-two">
                    <article className="workspace-card">
                      <h3>Reader state</h3>
                      <p>{activeReviewGuide.readerState}</p>
                    </article>
                    <article className="workspace-card">
                      <h3>This section must do</h3>
                      <ul className="workspace-list">
                        {activeReviewGuide.mustDo.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  </div>

                  <article className="workspace-card">
                    <h3>Review questions</h3>
                    <ul className="workspace-list">
                      {activeReviewGuide.reviewQuestions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </article>

                  <div className="workspace-card-grid workspace-card-grid-two">
                    <TextAreaField
                      label="Keep"
                      onChange={(value) => patchReview(activePanel, { ...activeReview, keep: value })}
                      value={activeReview.keep}
                      help="What is already working in this section?"
                      rows={3}
                    />
                    <TextAreaField
                      label="Change"
                      onChange={(value) => patchReview(activePanel, { ...activeReview, change: value })}
                      value={activeReview.change}
                      help="What needs rewriting or tightening?"
                      rows={3}
                    />
                    <TextAreaField
                      label="Move or remove"
                      onChange={(value) => patchReview(activePanel, { ...activeReview, move: value })}
                      value={activeReview.move}
                      help="What belongs elsewhere or should disappear?"
                      rows={3}
                    />
                    <TextAreaField
                      label="Section notes"
                      onChange={(value) => patchReview(activePanel, { ...activeReview, notes: value })}
                      value={activeReview.notes}
                      help="Capture decisions, unresolved questions, or rationale."
                      rows={3}
                    />
                  </div>

                  <div className="editor-review-actions">
                    <button
                      className="editor-button secondary"
                      disabled={activeReviewIndex <= 0}
                      onClick={openPreviousSection}
                      type="button"
                    >
                      Previous section
                    </button>
                    <button
                      className="editor-button secondary"
                      disabled={activeReviewIndex < 0 || activeReviewIndex >= reviewablePanels.length - 1}
                      onClick={openNextSection}
                      type="button"
                    >
                      Next section
                    </button>
                  </div>
                </div>
              ) : null}

              {activeArchitecture ? (
                <div className="editor-architecture-note">
                  <strong>Architecture purpose:</strong> {activeArchitecture.purpose}
                </div>
              ) : null}

              {activePanel === "hero" ? (
                <div className="editor-stack">
                  <Field
                    label="Site name"
                    onChange={(value) => patch({ ...draft, siteName: value })}
                    value={draft.siteName}
                  />
                  <Field
                    label="Short name"
                    onChange={(value) => patch({ ...draft, shortName: value })}
                    value={draft.shortName}
                  />
                  <TextAreaField
                    label="Audience"
                    onChange={(value) => patch({ ...draft, audience: value })}
                    value={draft.audience}
                    rows={2}
                  />
                  <Field
                    label="Hero eyebrow"
                    onChange={(value) => patch({ ...draft, hero: { ...draft.hero, eyebrow: value } })}
                    value={draft.hero.eyebrow}
                  />
                  <TextAreaField
                    label="Hero title"
                    onChange={(value) => patch({ ...draft, hero: { ...draft.hero, title: value } })}
                    value={draft.hero.title}
                    rows={2}
                  />
                  <TextAreaField
                    label="Hero subtitle"
                    onChange={(value) => patch({ ...draft, hero: { ...draft.hero, subtitle: value } })}
                    value={draft.hero.subtitle}
                  />
                  <StringListEditor
                    itemLabel="Badge"
                    items={draft.hero.badgeWords}
                    onChange={(items) => patch({ ...draft, hero: { ...draft.hero, badgeWords: items } })}
                    title="Guiding badges"
                  />
                  <StringListEditor
                    itemLabel="Quick-start step"
                    items={draft.hero.quickStartSteps}
                    onChange={(items) => patch({ ...draft, hero: { ...draft.hero, quickStartSteps: items } })}
                    title="Quick-start steps"
                  />
                  <Field
                    label="Primary CTA label"
                    onChange={(value) => patch({ ...draft, hero: { ...draft.hero, primaryCtaLabel: value } })}
                    value={draft.hero.primaryCtaLabel}
                  />
                  <Field
                    label="Secondary CTA label"
                    onChange={(value) => patch({ ...draft, hero: { ...draft.hero, secondaryCtaLabel: value } })}
                    value={draft.hero.secondaryCtaLabel}
                  />
                  <TextAreaField
                    label="Quick-start note"
                    onChange={(value) => patch({ ...draft, hero: { ...draft.hero, quickStartNote: value } })}
                    value={draft.hero.quickStartNote}
                    rows={2}
                  />
                </div>
              ) : null}

              {activePanel === "routes" ? (
                <div className="editor-stack">
                  <TextAreaField
                    label="Route selection eyebrow"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, journeyTitle: value } })
                    }
                    value={draft.headings.journeyTitle}
                    rows={2}
                  />
                  <TextAreaField
                    label="Route selection explanation"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, intentPanelCaption: value } })
                    }
                    value={draft.headings.intentPanelCaption}
                  />
                  <div className="editor-block">
                    <div className="editor-block-heading">
                      <h3>Top-level route cards</h3>
                    </div>
                    <div className="editor-stack">
                      {draft.journeyCards.map((card, index) => (
                        <div className="editor-item-card" key={card.id}>
                          <Field
                            label="Route label"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                journeyCards: updateItem(draft.journeyCards, index, { ...card, title: value }),
                              })
                            }
                            value={card.title}
                          />
                          <TextAreaField
                            label="Route description"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                journeyCards: updateItem(draft.journeyCards, index, {
                                  ...card,
                                  description: value,
                                }),
                              })
                            }
                            value={card.description}
                            rows={2}
                          />
                          <Field
                            label="Jump target"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                journeyCards: updateItem(draft.journeyCards, index, { ...card, target: value }),
                              })
                            }
                            value={card.target}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="editor-block">
                    <div className="editor-block-heading">
                      <h3>Student intent pathways</h3>
                    </div>
                    <div className="editor-stack">
                      {draft.studentIntents.map((intent, index) => (
                        <div className="editor-item-card" key={intent.id}>
                          <Field
                            label="Intent label"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                studentIntents: updateItem(draft.studentIntents, index, { ...intent, label: value }),
                              })
                            }
                            value={intent.label}
                          />
                          <Field
                            label="Intent title"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                studentIntents: updateItem(draft.studentIntents, index, { ...intent, title: value }),
                              })
                            }
                            value={intent.title}
                          />
                          <TextAreaField
                            label="Reassurance"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                studentIntents: updateItem(draft.studentIntents, index, {
                                  ...intent,
                                  reassurance: value,
                                }),
                              })
                            }
                            value={intent.reassurance}
                          />
                          <TextAreaField
                            label="Try this next"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                studentIntents: updateItem(draft.studentIntents, index, {
                                  ...intent,
                                  nextStep: value,
                                }),
                              })
                            }
                            value={intent.nextStep}
                            rows={2}
                          />
                          <TextAreaField
                            label="Follow-up if still stuck"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                studentIntents: updateItem(draft.studentIntents, index, {
                                  ...intent,
                                  followUp: value,
                                }),
                              })
                            }
                            value={intent.followUp ?? ""}
                            rows={2}
                          />
                          <TextAreaField
                            label="Support script"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                studentIntents: updateItem(draft.studentIntents, index, { ...intent, script: value }),
                              })
                            }
                            value={intent.script ?? ""}
                            rows={2}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activePanel === "support" ? (
                <div className="editor-stack">
                  <TextAreaField
                    label="Support section title"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, supportTitle: value } })
                    }
                    value={draft.headings.supportTitle}
                    rows={2}
                  />
                  <TextAreaField
                    label="Support section caption"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, supportCaption: value } })
                    }
                    value={draft.headings.supportCaption}
                  />
                  <Field
                    label="Support team title"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, supportTeamTitle: value } })
                    }
                    value={draft.headings.supportTeamTitle}
                  />
                  <TextAreaField
                    label="Support team caption"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, supportTeamCaption: value } })
                    }
                    value={draft.headings.supportTeamCaption}
                  />
                  <div className="editor-block">
                    <div className="editor-block-heading">
                      <h3>Common blocker cards</h3>
                    </div>
                    <div className="editor-stack">
                      {draft.helperCards.map((card, index) => (
                        <div className="editor-item-card" key={card.id}>
                          <Field
                            label="Card title"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                helperCards: updateItem(draft.helperCards, index, { ...card, title: value }),
                              })
                            }
                            value={card.title}
                          />
                          <StringListEditor
                            itemLabel="Step"
                            items={card.steps}
                            onChange={(items) =>
                              patch({
                                ...draft,
                                helperCards: updateItem(draft.helperCards, index, { ...card, steps: items }),
                              })
                            }
                            title="Steps"
                          />
                          <TextAreaField
                            label="Note"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                helperCards: updateItem(draft.helperCards, index, { ...card, note: value }),
                              })
                            }
                            value={card.note}
                            rows={2}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="editor-block">
                    <div className="editor-block-heading">
                      <h3>Support contacts</h3>
                    </div>
                    <div className="editor-stack">
                      {draft.supportContacts.map((contact, index) => (
                        <div className="editor-item-card" key={contact.label}>
                          <Field
                            label="Label"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                supportContacts: updateItem(draft.supportContacts, index, {
                                  ...contact,
                                  label: value,
                                }),
                              })
                            }
                            value={contact.label}
                          />
                          <Field
                            label="Displayed value"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                supportContacts: updateItem(draft.supportContacts, index, {
                                  ...contact,
                                  value,
                                }),
                              })
                            }
                            value={contact.value}
                          />
                          <Field
                            label="Email"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                supportContacts: updateItem(draft.supportContacts, index, {
                                  ...contact,
                                  email: value,
                                }),
                              })
                            }
                            value={contact.email ?? ""}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <StringListEditor
                    itemLabel="Phrase"
                    items={draft.supportPhrases.map((phrase) => phrase.text)}
                    onChange={(items) =>
                      patch({
                        ...draft,
                        supportPhrases: items.map((text, index) => ({ ...draft.supportPhrases[index], text })),
                      })
                    }
                    title="Support phrases"
                  />
                  <StringListEditor
                    itemLabel="Bullet"
                    items={draft.supportBullets}
                    onChange={(items) => patch({ ...draft, supportBullets: items })}
                    title="Support bullets"
                  />
                </div>
              ) : null}

              {activePanel === "day" ? (
                <div className="editor-stack">
                  <TextAreaField
                    label="Day title"
                    onChange={(value) => patch({ ...draft, headings: { ...draft.headings, dayTitle: value } })}
                    value={draft.headings.dayTitle}
                    rows={2}
                  />
                  <Field
                    label="Lesson title"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, lessonTitle: value } })
                    }
                    value={draft.headings.lessonTitle}
                  />
                  <Field
                    label="Routine title"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, routineTitle: value } })
                    }
                    value={draft.headings.routineTitle}
                  />
                  <TextAreaField
                    label="Routine caption"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, routineCaption: value } })
                    }
                    value={draft.headings.routineCaption}
                  />
                  <Field
                    label="Phrase title"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, phraseTitle: value } })
                    }
                    value={draft.headings.phraseTitle}
                  />
                  <TextAreaField
                    label="Phrase caption"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, phraseCaption: value } })
                    }
                    value={draft.headings.phraseCaption}
                  />
                  <StringListEditor
                    itemLabel="Expectation"
                    items={draft.dayExpectations}
                    onChange={(items) => patch({ ...draft, dayExpectations: items })}
                    title="Day expectations"
                  />
                  <StringListEditor
                    itemLabel="Lesson rule"
                    items={draft.lessonRules}
                    onChange={(items) => patch({ ...draft, lessonRules: items })}
                    title="Lesson rules"
                  />
                  <StringListEditor
                    itemLabel="Shared expectation"
                    items={draft.onlineExpectations}
                    onChange={(items) => patch({ ...draft, onlineExpectations: items })}
                    title="Shared expectations"
                  />
                </div>
              ) : null}

              {activePanel === "wellbeing" ? (
                <div className="editor-stack">
                  <TextAreaField
                    label="Wellbeing title"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, wellbeingTitle: value } })
                    }
                    value={draft.headings.wellbeingTitle}
                    rows={2}
                  />
                  <TextAreaField
                    label="Wellbeing caption"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, wellbeingCaption: value } })
                    }
                    value={draft.headings.wellbeingCaption}
                  />
                  <StringListEditor
                    itemLabel="Habit"
                    items={draft.wellbeingHabits}
                    onChange={(items) => patch({ ...draft, wellbeingHabits: items })}
                    title="Helpful habits"
                  />
                  <StringListEditor
                    itemLabel="Reset step"
                    items={draft.wellbeingResetSteps}
                    onChange={(items) => patch({ ...draft, wellbeingResetSteps: items })}
                    title="Reset steps"
                  />
                  <div className="editor-block">
                    <div className="editor-block-heading">
                      <h3>Wellbeing contacts</h3>
                    </div>
                    <div className="editor-stack">
                      {draft.wellbeingContacts.map((contact, index) => (
                        <div className="editor-item-card" key={contact.label}>
                          <Field
                            label="Label"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                wellbeingContacts: updateItem(draft.wellbeingContacts, index, {
                                  ...contact,
                                  label: value,
                                }),
                              })
                            }
                            value={contact.label}
                          />
                          <Field
                            label="Displayed value"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                wellbeingContacts: updateItem(draft.wellbeingContacts, index, {
                                  ...contact,
                                  value,
                                }),
                              })
                            }
                            value={contact.value}
                          />
                          <Field
                            label="Email"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                wellbeingContacts: updateItem(draft.wellbeingContacts, index, {
                                  ...contact,
                                  email: value,
                                }),
                              })
                            }
                            value={contact.email ?? ""}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="editor-block">
                    <div className="editor-block-heading">
                      <h3>Wellbeing resources</h3>
                    </div>
                    <div className="editor-stack">
                      {draft.wellbeingResources.map((resource, index) => (
                        <div className="editor-item-card" key={resource.title}>
                          <Field
                            label="Title"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                wellbeingResources: updateItem(draft.wellbeingResources, index, {
                                  ...resource,
                                  title: value,
                                }),
                              })
                            }
                            value={resource.title}
                          />
                          <TextAreaField
                            label="Description"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                wellbeingResources: updateItem(draft.wellbeingResources, index, {
                                  ...resource,
                                  description: value,
                                }),
                              })
                            }
                            value={resource.description}
                            rows={2}
                          />
                          <Field
                            label="Link"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                wellbeingResources: updateItem(draft.wellbeingResources, index, {
                                  ...resource,
                                  href: value,
                                }),
                              })
                            }
                            value={resource.href}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activePanel === "adult" ? (
                <div className="editor-stack">
                  <TextAreaField
                    label="Adult section title"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, educatorTitle: value } })
                    }
                    value={draft.headings.educatorTitle}
                    rows={2}
                  />
                  <TextAreaField
                    label="Adult section caption"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, educatorCaption: value } })
                    }
                    value={draft.headings.educatorCaption}
                  />
                  <TextAreaField
                    label="Adult summary title"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, adultSummaryTitle: value } })
                    }
                    value={draft.headings.adultSummaryTitle}
                    rows={2}
                  />
                  <TextAreaField
                    label="Adult summary text"
                    onChange={(value) =>
                      patch({ ...draft, headings: { ...draft.headings, adultSummaryText: value } })
                    }
                    value={draft.headings.adultSummaryText}
                  />
                  <div className="editor-block">
                    <div className="editor-block-heading">
                      <h3>Educator guidance cards</h3>
                    </div>
                    <div className="editor-stack">
                      {draft.educatorCards.map((card, index) => (
                        <div className="editor-item-card" key={card.title}>
                          <Field
                            label="Title"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                educatorCards: updateItem(draft.educatorCards, index, { ...card, title: value }),
                              })
                            }
                            value={card.title}
                          />
                          <TextAreaField
                            label="Summary"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                educatorCards: updateItem(draft.educatorCards, index, {
                                  ...card,
                                  summary: value,
                                }),
                              })
                            }
                            value={card.summary}
                          />
                          <StringListEditor
                            itemLabel="Step"
                            items={card.steps}
                            onChange={(items) =>
                              patch({
                                ...draft,
                                educatorCards: updateItem(draft.educatorCards, index, { ...card, steps: items }),
                              })
                            }
                            title="Support steps"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="editor-block">
                    <div className="editor-block-heading">
                      <h3>Accessibility features</h3>
                    </div>
                    <div className="editor-stack">
                      {draft.accessibilityFeatures.map((feature, index) => (
                        <div className="editor-item-card" key={feature.title}>
                          <Field
                            label="Title"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                accessibilityFeatures: updateItem(draft.accessibilityFeatures, index, {
                                  ...feature,
                                  title: value,
                                }),
                              })
                            }
                            value={feature.title}
                          />
                          <TextAreaField
                            label="Description"
                            onChange={(value) =>
                              patch({
                                ...draft,
                                accessibilityFeatures: updateItem(draft.accessibilityFeatures, index, {
                                  ...feature,
                                  description: value,
                                }),
                              })
                            }
                            value={feature.description}
                            rows={2}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activePanel === "footer" ? (
                <div className="editor-stack">
                  <TextAreaField
                    label="Footer title"
                    onChange={(value) => patch({ ...draft, footer: { ...draft.footer, title: value } })}
                    value={draft.footer.title}
                    rows={2}
                  />
                  <TextAreaField
                    label="Footer text"
                    onChange={(value) => patch({ ...draft, footer: { ...draft.footer, text: value } })}
                    value={draft.footer.text}
                  />
                  <TextAreaField
                    label="Footer note"
                    onChange={(value) => patch({ ...draft, footer: { ...draft.footer, note: value } })}
                    value={draft.footer.note}
                    rows={2}
                  />
                  <TextAreaField
                    label="Adult footer title"
                    onChange={(value) => patch({ ...draft, adultFooter: { ...draft.adultFooter, title: value } })}
                    value={draft.adultFooter.title}
                    rows={2}
                  />
                  <TextAreaField
                    label="Adult footer text"
                    onChange={(value) => patch({ ...draft, adultFooter: { ...draft.adultFooter, text: value } })}
                    value={draft.adultFooter.text}
                  />
                  <TextAreaField
                    label="Adult footer note"
                    onChange={(value) => patch({ ...draft, adultFooter: { ...draft.adultFooter, note: value } })}
                    value={draft.adultFooter.note}
                    rows={2}
                  />
                  <div className="editor-theme-grid">
                    <SelectField
                      label="Font family"
                      onChange={(value) => patch({ ...draft, theme: { ...draft.theme, fontFamily: value as typeof draft.theme.fontFamily } })}
                      options={["Avenir", "Humanist", "Editorial"]}
                      value={draft.theme.fontFamily}
                    />
                    {(
                      [
                        "pageBackground",
                        "surface",
                        "surfaceAlt",
                        "text",
                        "mutedText",
                        "primary",
                        "primaryDark",
                        "primarySoft",
                        "heroFrom",
                        "heroTo",
                        "heroGlow",
                      ] as const
                    ).map((token) => (
                      <label className="editor-field" key={token}>
                        <span>{token}</span>
                        <input
                          className="editor-input color"
                          onChange={(event) =>
                            patch({ ...draft, theme: { ...draft.theme, [token]: event.target.value } })
                          }
                          type="color"
                          value={draft.theme[token]}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}

              {!validation.success ? (
                <div className="editor-validation-list">
                  <h3>Validation issues to fix</h3>
                  <ul className="workspace-list">
                    {validationMessages.map((message) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        <aside className="editor-preview">
          <div className="editor-preview-heading">
            <div>
              <p className="workspace-kicker">Preview</p>
              <h2>Live content preview</h2>
            </div>
            <p className="editor-muted">This preview always reflects the current draft.</p>
          </div>

          <div className="editor-preview-frame">
            <SitePage site={draft} />
          </div>
        </aside>
      </section>
    </main>
  );
}
