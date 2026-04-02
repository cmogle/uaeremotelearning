"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Laptop,
  Moon,
  School,
  Sparkles,
  UserRound,
} from "lucide-react";

import { getIcon, getToneClass, sanitizeSite, toThemeStyle } from "@/lib/site-utils";
import { SiteDefinition } from "@/types";

type SitePageProps = {
  site: SiteDefinition;
};

export function SitePage({ site: unsafeSite }: SitePageProps) {
  const site = useMemo(() => sanitizeSite(unsafeSite), [unsafeSite]);
  const [selectedCardId, setSelectedCardId] = useState(site.helperCards[0]?.id ?? "");
  const activeCard =
    site.helperCards.find((card) => card.id === selectedCardId) ?? site.helperCards[0];
  const ActiveIcon = activeCard ? getIcon(activeCard.icon) : Sparkles;

  const sections: Record<SiteDefinition["sectionOrder"][number], React.ReactNode> = {
    hero: (
      <section className="hero">
        <div className="page-shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow-pill">
              <School size={16} />
              <span>{site.hero.eyebrow}</span>
            </div>
            <h1>{site.hero.title}</h1>
            <p className="hero-subtitle">{site.hero.subtitle}</p>
            <div className="badge-row">
              {site.hero.badgeWords.map((word) => (
                <span key={word} className="hero-badge">
                  {word}
                </span>
              ))}
            </div>
            <div className="cta-row">
              <a href={site.hero.primaryCtaTarget} className="primary-button">
                {site.hero.primaryCtaLabel}
                <ArrowRight size={16} />
              </a>
              <a href={site.hero.secondaryCtaTarget} className="secondary-button">
                {site.hero.secondaryCtaLabel}
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-heading">
              <div className="hero-card-icon">
                <Sparkles size={22} />
              </div>
              <div>
                <h2>{site.hero.quickStartTitle}</h2>
                <p>{site.hero.quickStartSubtitle}</p>
              </div>
            </div>

            <div className="stack-list">
              {site.hero.quickStartSteps.map((step, index) => (
                <div key={step} className="step-card">
                  <div className="step-number">{index + 1}</div>
                  <p>{step}</p>
                </div>
              ))}
            </div>

            <div className="inline-note">{site.hero.quickStartNote}</div>
          </div>
        </div>
      </section>
    ),
    support: (
      <section className="section-alt" id="support">
        <div className="page-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">{site.headings.supportEyebrow}</p>
              <h2>{site.headings.supportTitle}</h2>
            </div>
            <p className="section-caption">{site.headings.supportCaption}</p>
          </div>

          <div className="support-grid">
            <div className="card-grid">
              {site.helperCards.map((card) => {
                const Icon = getIcon(card.icon);
                const active = activeCard?.id === card.id;

                return (
                  <button
                    key={card.id}
                    className={`selection-card ${active ? "active" : ""}`}
                    onClick={() => setSelectedCardId(card.id)}
                    type="button"
                  >
                    <div className="selection-card-header">
                      <div className={`icon-chip ${getToneClass(card.tone)}`}>
                        <Icon size={18} />
                      </div>
                      <span>{card.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {activeCard && (
              <div className="detail-card">
                <div className="detail-heading">
                  <div className={`icon-chip large ${getToneClass(activeCard.tone)}`}>
                    <ActiveIcon size={22} />
                  </div>
                  <h3>{activeCard.title}</h3>
                </div>

                <div className="stack-list">
                  {activeCard.steps.map((step) => (
                    <div className="step-line" key={step}>
                      <ArrowRight size={16} />
                      <p>{step}</p>
                    </div>
                  ))}
                </div>

                {activeCard.extras?.length ? (
                  <div className="support-extra">
                    <p className="support-extra-title">Extra support</p>
                    <ul>
                      {activeCard.extras.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <p className="detail-note">{activeCard.note}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    ),
    today: (
      <section className="section" id="today">
        <div className="page-shell two-column">
          <article className="surface-card">
            <div className="section-card-heading">
              <div className="soft-icon">
                <CalendarDays size={22} />
              </div>
              <h3>{site.headings.dayTitle}</h3>
            </div>
            <div className="stack-list">
              {site.dayExpectations.map((item) => (
                <div className="check-line" key={item}>
                  <CheckCircle2 size={18} />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="ink-card">
            <div className="section-card-heading">
              <div className="soft-icon inverse">
                <Laptop size={22} />
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
      </section>
    ),
    expectations: (
      <section className="section">
        <div className="page-shell two-column">
          <article className="surface-card">
            <div className="section-card-heading">
              <div className="soft-icon">
                <ClipboardList size={22} />
              </div>
              <h3>{site.headings.onlineExpectationsTitle}</h3>
            </div>
            <div className="pill-grid">
              {site.onlineExpectations.map((item) => (
                <div className="expectation-pill" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="accent-card">
            <div className="section-card-heading">
              <div className="soft-icon">
                <UserRound size={22} />
              </div>
              <div>
                <h3>{site.headings.phraseTitle}</h3>
                <p>{site.headings.phraseCaption}</p>
              </div>
            </div>
            <div className="stack-list">
              {site.supportPhrases.map((phrase) => (
                <div className="quote-card" key={phrase.text}>
                  "{phrase.text}"
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    ),
    work: (
      <section className="section">
        <div className="page-shell two-column">
          <article className="surface-quiet-card">
            <div className="section-card-heading">
              <div className="soft-icon">
                <Sparkles size={22} />
              </div>
              <h3>{site.headings.workTitle}</h3>
            </div>
            <div className="stack-list">
              {site.supportBullets.map((item) => (
                <div className="support-block" key={item}>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="ink-card">
            <div className="section-card-heading">
              <div className="soft-icon inverse">
                <Moon size={22} />
              </div>
              <h3>{site.headings.wellbeingTitle}</h3>
            </div>
            <div className="stack-list">
              {site.wellbeingHabits.map((item) => (
                <div className="ink-line" key={item}>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    ),
    wellbeing: (
      <section className="section-alt support-page">
        <div className="page-shell">
          <div className="section-heading centered">
            <h2>{site.headings.supportPageTitle}</h2>
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
              <h3>Support for learning</h3>
              <ul className="plain-list">
                {site.supportBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="contact-list compact">
                {site.supportContacts.map((contact) => (
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
                  </a>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    ),
    footer: (
      <footer className="footer">
        <div className="page-shell footer-shell">
          <div>
            <h3>{site.footer.title}</h3>
            <p>{site.footer.text}</p>
          </div>
          <div className="footer-note">{site.footer.note}</div>
        </div>
      </footer>
    ),
  };

  return (
    <div className="site-theme" style={toThemeStyle(site.theme)}>
      {site.sectionOrder.map((sectionKey) => (
        <div key={sectionKey}>{sections[sectionKey]}</div>
      ))}
    </div>
  );
}
