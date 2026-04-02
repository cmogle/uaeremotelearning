"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Compass,
  HandHeart,
  Laptop,
  Moon,
  School,
  ShieldPlus,
  Sparkles,
  Users,
} from "lucide-react";

import { getIcon, getToneClass, sanitizeSite, toThemeStyle } from "@/lib/site-utils";
import { SiteDefinition } from "@/types";

type SitePageProps = {
  site: SiteDefinition;
};

type AudienceMode = "student" | "adult";
type StudentJourney = "help-now" | "plan-day" | "wellbeing";

const routeIcons = {
  calendar: CalendarDays,
  staff: Users,
  support: HandHeart,
  wellbeing: Moon,
} as const;

export function SitePage({ site: unsafeSite }: SitePageProps) {
  const site = useMemo(() => sanitizeSite(unsafeSite), [unsafeSite]);
  const [audienceMode, setAudienceMode] = useState<AudienceMode>("student");
  const [selectedCardId, setSelectedCardId] = useState(site.helperCards[0]?.id ?? "");
  const [studentJourney, setStudentJourney] = useState<StudentJourney>("help-now");

  const activeCard =
    site.helperCards.find((card) => card.id === selectedCardId) ?? site.helperCards[0];
  const ActiveIcon = activeCard ? getIcon(activeCard.icon) : Sparkles;
  const tabPanelId = activeCard ? `support-panel-${activeCard.id}` : "support-panel";
  const tabId = activeCard ? `support-tab-${activeCard.id}` : "support-tab";

  const studentJourneyCards = site.journeyCards.filter((card) =>
    ["help-now", "plan-day", "wellbeing"].includes(card.id),
  );

  const studentNavItems = [
    { id: "help-now", label: "Help now" },
    { id: "plan-day", label: "Plan today" },
    { id: "wellbeing", label: "Wellbeing" },
  ] as const;

  function jumpToStage(targetId: string) {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openStudentJourney(journey: StudentJourney) {
    setAudienceMode("student");
    setStudentJourney(journey);
    jumpToStage("journey-stage");
  }

  function openAdultMode() {
    setAudienceMode("adult");
    jumpToStage("adult-hub");
  }

  const supportPanel = (
    <section aria-labelledby="support-title" className="section-alt panel-section" id="journey-stage">
      <div className="page-shell">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">{site.headings.supportEyebrow}</p>
            <h2 id="support-title">{site.headings.supportTitle}</h2>
          </div>
          <p className="section-caption">{site.headings.supportCaption}</p>
        </div>

        <div className="support-grid">
          <div className="stack-list">
            <article aria-labelledby="support-team-title" className="surface-card contact-rail">
              <div className="section-card-heading">
                <div className="soft-icon">
                  <ShieldPlus aria-hidden="true" size={22} />
                </div>
                <div>
                  <h3 id="support-team-title">{site.headings.supportTeamTitle}</h3>
                  <p>{site.headings.supportTeamCaption}</p>
                </div>
              </div>
              <div className="contact-grid">
                {site.supportContacts.map((contact) => (
                  <div className="contact-card" key={contact.label}>
                    <strong>{contact.label}</strong>
                    {contact.email ? (
                      <a href={`mailto:${contact.email}`}>{contact.value}</a>
                    ) : (
                      <p>{contact.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </article>

            <article aria-labelledby="scripts-title" className="accent-card">
              <div className="section-card-heading">
                <div className="soft-icon">
                  <BookOpenCheck aria-hidden="true" size={22} />
                </div>
                <div>
                  <h3 id="scripts-title">{site.headings.phraseTitle}</h3>
                  <p>{site.headings.phraseCaption}</p>
                </div>
              </div>
              <div className="script-list">
                {site.supportPhrases.map((phrase) => (
                  <div className="quote-card" key={phrase.text}>
                    "{phrase.text}"
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="detail-card support-panel-shell">
            <div aria-label="Student support topics" className="support-tablist" role="tablist">
              {site.helperCards.map((card) => {
                const Icon = getIcon(card.icon);
                const isActive = activeCard?.id === card.id;
                const currentTabId = `support-tab-${card.id}`;
                const currentPanelId = `support-panel-${card.id}`;

                return (
                  <button
                    aria-controls={currentPanelId}
                    aria-selected={isActive}
                    className={`selection-card ${isActive ? "active" : ""}`}
                    id={currentTabId}
                    key={card.id}
                    onClick={() => setSelectedCardId(card.id)}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    type="button"
                  >
                    <div className="selection-card-header">
                      <div className={`icon-chip ${getToneClass(card.tone)}`}>
                        <Icon aria-hidden="true" size={18} />
                      </div>
                      <span>{card.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {activeCard ? (
              <div
                aria-labelledby={tabId}
                className="support-detail"
                id={tabPanelId}
                role="tabpanel"
              >
                <div className="detail-heading">
                  <div className={`icon-chip large ${getToneClass(activeCard.tone)}`}>
                    <ActiveIcon aria-hidden="true" size={22} />
                  </div>
                  <h3>{activeCard.title}</h3>
                </div>

                <ol className="stack-list numbered-list">
                  {activeCard.steps.map((step, index) => (
                    <li className="step-line" key={step}>
                      <div className="step-number">{index + 1}</div>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>

                {activeCard.extras?.length ? (
                  <div className="support-extra">
                    <p className="support-extra-title">Extra support</p>
                    <ul className="plain-list">
                      {activeCard.extras.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <p className="detail-note">{activeCard.note}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );

  const todayPanel = (
    <section aria-labelledby="today-title" className="section panel-section" id="journey-stage">
      <div className="page-shell">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Today</p>
            <h2 id="today-title">{site.headings.dayTitle}</h2>
          </div>
          <p className="section-caption">{site.headings.routineCaption}</p>
        </div>

        <div className="two-column">
          <article className="surface-card">
            <div className="section-card-heading">
              <div className="soft-icon">
                <CalendarDays aria-hidden="true" size={22} />
              </div>
              <h3>{site.headings.dayTitle}</h3>
            </div>
            <div className="stack-list">
              {site.dayExpectations.map((item) => (
                <div className="check-line" key={item}>
                  <CheckCircle2 aria-hidden="true" size={18} />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="ink-card">
            <div className="section-card-heading">
              <div className="soft-icon inverse">
                <Laptop aria-hidden="true" size={22} />
              </div>
              <h3>{site.headings.lessonTitle}</h3>
            </div>
            <div className="stack-list">
              {site.lessonRules.map((item) => (
                <div className="ink-line" key={item}>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="two-column lower-grid">
          <article className="surface-quiet-card">
            <div className="section-card-heading">
              <div className="soft-icon">
                <Sparkles aria-hidden="true" size={22} />
              </div>
              <div>
                <h3>{site.headings.routineTitle}</h3>
                <p>{site.headings.routineCaption}</p>
              </div>
            </div>
            <div className="stack-list">
              {site.supportBullets.map((item) => (
                <div className="support-block" key={item}>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="surface-card">
            <div className="section-card-heading">
              <div className="soft-icon">
                <CheckCircle2 aria-hidden="true" size={22} />
              </div>
              <h3>Shared expectations</h3>
            </div>
            <div className="pill-grid">
              {site.onlineExpectations.map((item) => (
                <div className="expectation-pill" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );

  const wellbeingPanel = (
    <section aria-labelledby="wellbeing-title" className="section-alt support-page panel-section" id="journey-stage">
      <div className="page-shell">
        <div className="section-heading centered">
          <h2 id="wellbeing-title">{site.headings.supportPageTitle}</h2>
          <p>{site.headings.supportPageIntro}</p>
        </div>

        <div className="support-page-grid">
          <article className="surface-card">
            <h3>Talk to someone</h3>
            <div className="contact-list">
              {site.wellbeingContacts.map((contact) => (
                <div key={contact.label} className="contact-row">
                  <strong>{contact.label}</strong>
                  {contact.email ? (
                    <a href={`mailto:${contact.email}`}>{contact.value}</a>
                  ) : (
                    <span>{contact.value}</span>
                  )}
                </div>
              ))}
            </div>
          </article>

          <article className="surface-card">
            <h3>Quick reset</h3>
            <ul className="plain-list">
              {site.wellbeingResetSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>

          <article className="surface-card">
            <h3>Helpful resources</h3>
            <div className="resource-list">
              {site.wellbeingResources.map((resource) => (
                <a
                  key={resource.title}
                  className="resource-card"
                  href={resource.href}
                  rel="noreferrer"
                  target={resource.href.startsWith("http") ? "_blank" : undefined}
                >
                  <strong>{resource.title}</strong>
                  <span>{resource.description}</span>
                  <span className="external-label">
                    {resource.href.startsWith("http") ? "Opens external resource" : "Open resource"}
                  </span>
                </a>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );

  const adultPanel = (
    <section aria-labelledby="educator-title" className="section adult-hub" id="adult-hub">
      <div className="page-shell">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Adults supporting learners</p>
            <h2 id="educator-title">{site.headings.educatorTitle}</h2>
          </div>
          <p className="section-caption">{site.headings.educatorCaption}</p>
        </div>

        <div className="adult-summary-card">
          <strong>How to use this section</strong>
          <p>
            This adult view is here to help you reduce barriers, support regulation, and make re-entry easier without overwhelming the learner.
          </p>
        </div>

        <div className="educator-grid">
          {site.educatorCards.map((card) => (
            <article className="surface-card educator-card" key={card.title}>
              <h3>{card.title}</h3>
              <p className="educator-summary">{card.summary}</p>
              <ul className="plain-list">
                {card.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="two-column lower-grid">
          <article className="accent-card">
            <div className="section-card-heading">
              <div className="soft-icon">
                <Users aria-hidden="true" size={22} />
              </div>
              <div>
                <h3>{site.headings.accessibilityTitle}</h3>
                <p>{site.headings.accessibilityCaption}</p>
              </div>
            </div>
            <div className="stack-list">
              {site.accessibilityFeatures.map((feature) => (
                <div className="accessibility-card" key={feature.title}>
                  <strong>{feature.title}</strong>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="surface-card">
            <div className="section-card-heading">
              <div className="soft-icon">
                <ShieldPlus aria-hidden="true" size={22} />
              </div>
              <div>
                <h3>{site.headings.supportTeamTitle}</h3>
                <p>{site.headings.supportTeamCaption}</p>
              </div>
            </div>
            <div className="contact-grid">
              {site.supportContacts.map((contact) => (
                <div className="contact-card" key={contact.label}>
                  <strong>{contact.label}</strong>
                  {contact.email ? (
                    <a href={`mailto:${contact.email}`}>{contact.value}</a>
                  ) : (
                    <p>{contact.value}</p>
                  )}
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );

  const heroSecondaryLabel =
    audienceMode === "student" ? site.hero.secondaryCtaLabel : "Back to student help";

  return (
    <div className="site-theme" style={toThemeStyle(site.theme)}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="page-shell header-shell">
          <a className="site-mark" href="#top">
            <School aria-hidden="true" size={18} />
            <span>{site.shortName}</span>
          </a>
          <div className="header-controls">
            <nav aria-label="Primary" className="site-nav">
              {audienceMode === "student"
                ? studentNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => openStudentJourney(item.id)}
                      type="button"
                    >
                      {item.label}
                    </button>
                  ))
                : (
                  <button onClick={() => jumpToStage("adult-hub")} type="button">
                    Adult guidance
                  </button>
                )}
            </nav>

            <div aria-label="Audience" className="audience-switch" role="tablist">
              <button
                aria-selected={audienceMode === "student"}
                className={audienceMode === "student" ? "audience-pill active" : "audience-pill"}
                onClick={() => openStudentJourney(studentJourney)}
                role="tab"
                type="button"
              >
                Student
              </button>
              <button
                aria-selected={audienceMode === "adult"}
                className={audienceMode === "adult" ? "audience-pill active" : "audience-pill"}
                onClick={openAdultMode}
                role="tab"
                type="button"
              >
                Adult / educator
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section aria-labelledby="site-title" className="hero" id="top">
          <div className="page-shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow-pill">
                <School aria-hidden="true" size={16} />
                <span>{site.hero.eyebrow}</span>
              </div>
              <h1 id="site-title">{site.hero.title}</h1>
              <p className="hero-subtitle">{site.hero.subtitle}</p>
              <div aria-label="Guiding principles" className="badge-row">
                {site.hero.badgeWords.map((word) => (
                  <span key={word} className="hero-badge">
                    {word}
                  </span>
                ))}
              </div>
              <div className="cta-row">
                <button className="primary-button" onClick={() => openStudentJourney("help-now")} type="button">
                  {site.hero.primaryCtaLabel}
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
                <button
                  className="secondary-button"
                  onClick={() =>
                    audienceMode === "student" ? openAdultMode() : openStudentJourney("help-now")
                  }
                  type="button"
                >
                  {heroSecondaryLabel}
                </button>
              </div>
            </div>

            <aside aria-label={site.hero.quickStartTitle} className="hero-card">
              <div className="hero-card-heading">
                <div className="hero-card-icon">
                  <Compass aria-hidden="true" size={22} />
                </div>
                <div>
                  <h2>{site.hero.quickStartTitle}</h2>
                  <p>{site.hero.quickStartSubtitle}</p>
                </div>
              </div>

              <ol className="stack-list numbered-list">
                {site.hero.quickStartSteps.map((step, index) => (
                  <li key={step} className="step-card">
                    <div className="step-number">{index + 1}</div>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>

              <div className="inline-note">{site.hero.quickStartNote}</div>
            </aside>
          </div>
        </section>

        {audienceMode === "student" ? (
          <>
            <section aria-labelledby="journeys-title" className="section route-section" id="journeys">
              <div className="page-shell">
                <div className="section-heading split-heading">
                  <div>
                    <p className="eyebrow">Student routes</p>
                    <h2 id="journeys-title">{site.headings.journeyTitle}</h2>
                  </div>
                  <p className="section-caption">{site.headings.journeyCaption}</p>
                </div>

                <div className="route-grid">
                  {studentJourneyCards.map((journey) => {
                    const Icon = routeIcons[journey.icon];
                    const isActive = studentJourney === journey.id;
                    return (
                      <button
                        aria-pressed={isActive}
                        className={isActive ? "route-card active" : "route-card"}
                        key={journey.id}
                        onClick={() => openStudentJourney(journey.id as StudentJourney)}
                        type="button"
                      >
                        <div className="route-card-top">
                          <div className="route-icon">
                            <Icon aria-hidden="true" size={22} />
                          </div>
                          <span className="route-audience">{journey.audience}</span>
                        </div>
                        <h3>{journey.title}</h3>
                        <p>{journey.description}</p>
                        <span className="route-link">
                          Open this help
                          <ArrowRight aria-hidden="true" size={16} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {studentJourney === "help-now" ? supportPanel : null}
            {studentJourney === "plan-day" ? todayPanel : null}
            {studentJourney === "wellbeing" ? wellbeingPanel : null}
          </>
        ) : (
          adultPanel
        )}

        <footer className="footer">
          <div className="page-shell footer-shell">
            <div>
              <h3>{site.footer.title}</h3>
              <p>{site.footer.text}</p>
            </div>
            <div className="footer-note">{site.footer.note}</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
