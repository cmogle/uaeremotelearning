"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Compass,
  HandHeart,
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

export function SitePage({ site: unsafeSite }: SitePageProps) {
  const site = useMemo(() => sanitizeSite(unsafeSite), [unsafeSite]);
  const [selectedIntentId, setSelectedIntentId] = useState(site.studentIntents[0]?.id ?? "");
  const [selectedHelperId, setSelectedHelperId] = useState(site.helperCards[0]?.id ?? "");
  const activeIntent =
    site.studentIntents.find((intent) => intent.id === selectedIntentId) ?? site.studentIntents[0];
  const activeHelper =
    site.helperCards.find((card) => card.id === selectedHelperId) ?? site.helperCards[0];
  const ActiveIntentIcon = activeIntent ? getIcon(activeIntent.icon) : Sparkles;
  const ActiveHelperIcon = activeHelper ? getIcon(activeHelper.icon) : Sparkles;

  function jumpToStage(targetId: string) {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openIntent(intentId: string) {
    setSelectedIntentId(intentId);
    jumpToStage("intent-guide");
  }

  function openRoute(target: string) {
    if (target.startsWith("#")) {
      jumpToStage(target.slice(1));
      return;
    }

    window.location.href = target;
  }

  const journeyIconMap = {
    support: HandHeart,
    calendar: CalendarDays,
    staff: ShieldPlus,
    wellbeing: Sparkles,
  } as const;

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

          <nav aria-label="Primary" className="site-nav">
            <button onClick={() => jumpToStage("intent-guide")} type="button">
              Student help
            </button>
            <button onClick={() => jumpToStage("today")} type="button">
              Today
            </button>
            <button onClick={() => jumpToStage("wellbeing")} type="button">
              Wellbeing
            </button>
            <button onClick={() => jumpToStage("adult-support")} type="button">
              {site.headings.adultLinkLabel}
            </button>
          </nav>
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
                <button
                  className="primary-button"
                  onClick={() => jumpToStage("intent-guide")}
                  type="button"
                >
                  {site.hero.primaryCtaLabel}
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
                <button
                  className="secondary-button"
                  onClick={() => jumpToStage("adult-support")}
                  type="button"
                >
                  {site.headings.adultLinkLabel}
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

        <section aria-labelledby="journey-title" className="section" id="journeys">
          <div className="page-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">{site.headings.journeyTitle}</p>
                <h2 id="journey-title">{site.headings.intentPanelTitle}</h2>
              </div>
              <p className="section-caption">{site.headings.journeyCaption}</p>
            </div>

            <div className="intent-grid">
              {site.journeyCards.map((card) => {
                const JourneyIcon = journeyIconMap[card.icon];

                return (
                  <button className="route-card" key={card.id} onClick={() => openRoute(card.target)} type="button">
                    <div className="route-card-top">
                      <div className="route-icon">
                        <JourneyIcon aria-hidden="true" size={22} />
                      </div>
                      <span className="route-audience">{card.audience}</span>
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span className="route-link">
                      Go to this route
                      <ArrowRight aria-hidden="true" size={16} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section aria-labelledby="intents-title" className="section route-section" id="intent-guide">
          <div className="page-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">{site.headings.journeyTitle}</p>
                <h2 id="intents-title">{site.headings.intentPanelTitle}</h2>
              </div>
              <p className="section-caption">{site.headings.intentPanelCaption}</p>
            </div>

            <div className="intent-grid">
              {site.studentIntents.map((intent) => {
                const Icon = getIcon(intent.icon);
                const isActive = activeIntent?.id === intent.id;

                return (
                  <button
                    aria-pressed={isActive}
                    className={isActive ? "route-card active intent-card" : "route-card intent-card"}
                    key={intent.id}
                    onClick={() => openIntent(intent.id)}
                    type="button"
                  >
                    <div className="route-card-top">
                      <div className={`route-icon ${getToneClass(intent.tone)}`}>
                        <Icon aria-hidden="true" size={22} />
                      </div>
                      <span className="route-audience">{intent.label}</span>
                    </div>
                    <h3>{intent.title}</h3>
                    <p>{intent.reassurance}</p>
                    <span className="route-link">
                      Open this support
                      <ArrowRight aria-hidden="true" size={16} />
                    </span>
                  </button>
                );
              })}
            </div>

            {activeIntent ? (
              <div className="intent-detail-grid">
                <article className="detail-card intent-detail-main">
                  <div className="detail-heading">
                    <div className={`icon-chip large ${getToneClass(activeIntent.tone)}`}>
                      <ActiveIntentIcon aria-hidden="true" size={24} />
                    </div>
                    <div>
                      <p className="eyebrow">{activeIntent.label}</p>
                      <h3>{activeIntent.title}</h3>
                    </div>
                  </div>

                  <p className="intent-reassurance">{activeIntent.reassurance}</p>

                  <div className="intent-focus-card">
                    <strong>Try this next</strong>
                    <p>{activeIntent.nextStep}</p>
                  </div>

                  {activeIntent.followUp ? (
                    <div className="support-extra">
                      <p className="support-extra-title">If that did not help</p>
                      <p>{activeIntent.followUp}</p>
                    </div>
                  ) : null}
                </article>

                <article className="surface-card">
                  <div className="section-card-heading">
                    <div className="soft-icon">
                      <Sparkles aria-hidden="true" size={22} />
                    </div>
                    <div>
                      <h3>{activeIntent.visualTitle}</h3>
                      <p>{site.headings.supportCaption}</p>
                    </div>
                  </div>

                  <ol className="stack-list numbered-list">
                    {activeIntent.visualItems.map((item, index) => (
                      <li className="step-line" key={item}>
                        <div className="step-number">{index + 1}</div>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ol>
                </article>

                <div className="stack-list">
                  <article className="accent-card">
                    <div className="section-card-heading">
                      <div className="soft-icon">
                        <BookOpenCheck aria-hidden="true" size={22} />
                      </div>
                      <div>
                        <h3>{site.headings.phraseTitle}</h3>
                        <p>{site.headings.phraseCaption}</p>
                      </div>
                    </div>
                    {activeIntent.script ? (
                      <div className="quote-card">"{activeIntent.script}"</div>
                    ) : null}
                    <div className="script-list">
                      {site.supportPhrases.map((phrase) => (
                        <div className="quote-card" key={phrase.text}>
                          "{phrase.text}"
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="surface-card contact-rail">
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
                      <div className="contact-card featured-contact">
                        <strong>{activeIntent.contactLabel}</strong>
                        {activeIntent.contactEmail ? (
                          <a href={`mailto:${activeIntent.contactEmail}`}>{activeIntent.contactValue}</a>
                        ) : (
                          <p>{activeIntent.contactValue}</p>
                        )}
                      </div>

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
            ) : null}
          </div>
        </section>

        {activeHelper ? (
          <section aria-labelledby="support-title" className="section section-alt" id="support">
            <div className="page-shell">
              <div className="section-heading split-heading">
                <div>
                  <p className="eyebrow">{site.headings.supportEyebrow}</p>
                  <h2 id="support-title">{site.headings.supportTitle}</h2>
                </div>
                <p className="section-caption">{site.headings.supportCaption}</p>
              </div>

              <div className="helper-section-grid">
                <div className="helper-card-grid">
                  {site.helperCards.map((card) => {
                    const Icon = getIcon(card.icon);
                    const isActive = activeHelper.id === card.id;

                    return (
                      <button
                        aria-pressed={isActive}
                        className={
                          isActive ? "route-card active helper-card-button" : "route-card helper-card-button"
                        }
                        key={card.id}
                        onClick={() => setSelectedHelperId(card.id)}
                        type="button"
                      >
                        <div className="route-card-top">
                          <div className={`route-icon ${getToneClass(card.tone)}`}>
                            <Icon aria-hidden="true" size={22} />
                          </div>
                          <span className="route-audience">{card.title}</span>
                        </div>
                        <p>{card.note}</p>
                        <span className="route-link">
                          Open steps
                          <ArrowRight aria-hidden="true" size={16} />
                        </span>
                      </button>
                    );
                  })}
                </div>

                <article className="detail-card helper-detail-card">
                  <div className="detail-heading">
                    <div className={`icon-chip large ${getToneClass(activeHelper.tone)}`}>
                      <ActiveHelperIcon aria-hidden="true" size={24} />
                    </div>
                    <div>
                      <p className="eyebrow">{site.headings.supportEyebrow}</p>
                      <h3>{activeHelper.title}</h3>
                    </div>
                  </div>

                  <ol className="stack-list numbered-list helper-step-list">
                    {activeHelper.steps.map((step, index) => (
                      <li className="step-line" key={step}>
                        <div className="step-number">{index + 1}</div>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ol>

                  {activeHelper.extras?.length ? (
                    <div className="support-extra">
                      <p className="support-extra-title">Extra support</p>
                      <ul className="plain-list helper-extra-list">
                        {activeHelper.extras.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="inline-note">{activeHelper.note}</div>
                </article>
              </div>
            </div>
          </section>
        ) : null}

        <section aria-labelledby="today-title" className="section section-alt" id="today">
          <div className="page-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Today</p>
                <h2 id="today-title">{site.headings.dayTitle}</h2>
              </div>
              <p className="section-caption">{site.headings.routineCaption}</p>
            </div>

            <div className="today-grid">
              <article className="surface-card">
                <div className="section-card-heading">
                  <div className="soft-icon">
                    <CalendarDays aria-hidden="true" size={22} />
                  </div>
                  <div>
                    <h3>{site.headings.dayTitle}</h3>
                    <p>Use this as orientation, not pressure.</p>
                  </div>
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
                    <Compass aria-hidden="true" size={22} />
                  </div>
                  <div>
                    <h3>{site.headings.lessonTitle}</h3>
                    <p>Keep the path into the work simple.</p>
                  </div>
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
                    <HandHeart aria-hidden="true" size={22} />
                  </div>
                  <div>
                    <h3>{site.headings.routineTitle}</h3>
                    <p>{site.headings.routineCaption}</p>
                  </div>
                </div>

                <div className="pill-grid">
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
                  <div>
                    <h3>Shared expectations</h3>
                    <p>Keep the rhythm visible and achievable.</p>
                  </div>
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

        <section aria-labelledby="wellbeing-title" className="section" id="wellbeing">
          <div className="page-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">{site.headings.wellbeingTitle}</p>
                <h2 id="wellbeing-title">{site.headings.supportPageTitle}</h2>
              </div>
              <p className="section-caption">{site.headings.wellbeingCaption}</p>
            </div>

            <div className="support-page-grid">
              <article className="surface-card">
                <div className="section-card-heading">
                  <div className="soft-icon">
                    <Moon aria-hidden="true" size={22} />
                  </div>
                  <div>
                    <h3>Quick reset</h3>
                    <p>{site.headings.supportPageIntro}</p>
                  </div>
                </div>

                <ol className="stack-list numbered-list">
                  {site.wellbeingResetSteps.map((step, index) => (
                    <li className="step-line" key={step}>
                      <div className="step-number">{index + 1}</div>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </article>

              <article className="surface-card">
                <div className="section-card-heading">
                  <div className="soft-icon">
                    <Sparkles aria-hidden="true" size={22} />
                  </div>
                  <div>
                    <h3>Helpful habits</h3>
                    <p>Use these to lower the load before it builds up.</p>
                  </div>
                </div>

                <div className="stack-list">
                  {site.wellbeingHabits.map((habit) => (
                    <div className="support-block" key={habit}>
                      <p>{habit}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="surface-card">
                <div className="section-card-heading">
                  <div className="soft-icon">
                    <Users aria-hidden="true" size={22} />
                  </div>
                  <div>
                    <h3>Talk to someone</h3>
                    <p>When the day is too much, people matter more than productivity.</p>
                  </div>
                </div>

                <div className="contact-list">
                  {site.wellbeingContacts.map((contact) => (
                    <div className="contact-row" key={contact.label}>
                      <strong>{contact.label}</strong>
                      {contact.email ? (
                        <a href={`mailto:${contact.email}`}>{contact.value}</a>
                      ) : (
                        <span>{contact.value}</span>
                      )}
                    </div>
                  ))}
                </div>

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
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="adult-title" className="section adult-hub" id="adult-support">
          <div className="page-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">{site.headings.adultSectionLabel}</p>
                <h2 id="adult-title">{site.headings.educatorTitle}</h2>
              </div>
              <p className="section-caption">{site.headings.educatorCaption}</p>
            </div>

            <div className="adult-summary-card">
              <strong>{site.headings.adultSummaryTitle}</strong>
              <p>{site.headings.adultSummaryText}</p>
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

                <div className="inline-note">{site.adultFooter.note}</div>
              </article>
            </div>
          </div>
        </section>

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
