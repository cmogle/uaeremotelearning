"use client";

import { Source_Serif_4, Atkinson_Hyperlegible } from "next/font/google";
import { useEffect, useRef, useState } from "react";

import {
  dayExpectations,
  helpPageIntro,
  helperCards,
  homePageSummary,
  lessonRules,
  makeItWork,
  onlineExpectations,
  quickResetSteps,
  quickStartSteps,
  routeCards,
  schoolDayIntro,
  siteTitle,
  stayingConnectedTips,
  supportContacts,
  supportContactsIntro,
  supportPhrases,
  wellbeingContacts,
  wellbeingHabits,
  wellbeingIntro,
} from "@/lib/baseline-site-content";

import styles from "./styles.module.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--qp-serif",
  display: "swap",
});

const sans = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--qp-sans",
  display: "swap",
});

type Anchor = "start" | "help" | "day" | "wellbeing";

const RAIL_ITEMS: Array<{ id: Anchor; label: string }> = [
  { id: "start", label: "Start here" },
  { id: "help", label: "Get help now" },
  { id: "day", label: "School day" },
  { id: "wellbeing", label: "Wellbeing & support" },
];

const HELPER_GROUPS = [
  { title: "Joining lessons", ids: ["time", "join"] },
  { title: "Staying focused", ids: ["focus", "sitstill", "eyes"] },
  { title: "Getting work done", ids: ["understand", "reader"] },
  { title: "Who can help me?", ids: ["help", "sfl"] },
];

export function QuietShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.root} ${serif.variable} ${sans.variable}`}>
      {children}
    </div>
  );
}

function QuietPage({ initialAnchor }: { initialAnchor: Anchor }) {
  const [active, setActive] = useState<Anchor>(initialAnchor);
  const startRef = useRef<HTMLElement>(null);
  const helpRef = useRef<HTMLElement>(null);
  const dayRef = useRef<HTMLElement>(null);
  const wellbeingRef = useRef<HTMLElement>(null);

  const refMap: Record<Anchor, React.RefObject<HTMLElement | null>> = {
    start: startRef,
    help: helpRef,
    day: dayRef,
    wellbeing: wellbeingRef,
  };

  useEffect(() => {
    const target = refMap[initialAnchor]?.current;
    if (!target) return;
    if (initialAnchor === "start") return;
    target.scrollIntoView({ behavior: "auto", block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialAnchor]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target?.id) {
          setActive(top.target.id as Anchor);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    [startRef, helpRef, dayRef, wellbeingRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to main content
      </a>

      <header className={styles.brandHeader}>
        <div className={styles.brandShell}>
          <span className={styles.brandKicker}>Jumeirah College</span>
          <h1 className={styles.brandTitle}>{siteTitle}</h1>
        </div>
      </header>

      <div className={styles.layout}>
        <aside aria-label="Sections" className={styles.rail}>
          <p className={styles.railHeading}>On this page</p>
          <ol className={styles.railList}>
            {RAIL_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    aria-current={isActive ? "true" : undefined}
                    className={isActive ? styles.railLinkActive : styles.railLink}
                    href={`#${item.id}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ol>
          <p className={styles.railFoot}>
            Read at your own pace. Jump to any section.
          </p>
        </aside>

        <main className={styles.main} id="main">
          <section className={styles.section} id="start" ref={startRef}>
            <p className={styles.eyebrow}>Start here</p>
            <h2 className={styles.sectionTitle}>
              This is your school day. We&apos;re just doing it online.
            </h2>
            <p className={styles.lede}>{homePageSummary}</p>

            <article className={styles.quickStartCard}>
              <p className={styles.cardKicker}>Start work now</p>
              <p className={styles.cardSub}>Start with 5 minutes</p>
              <ol className={styles.quickStartList}>
                {quickStartSteps.map((step, index) => (
                  <li key={step}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className={styles.cardNote}>
                You do not need to feel ready. Start with one small step.
              </p>
            </article>

            <p className={styles.sectionLead}>
              Keep the day simple. Choose what feels closest to what you need right now.
            </p>
            <div className={styles.routeCards}>
              {routeCards.map((card) => (
                <a className={styles.routeCard} href={`#${linkToAnchor(card.href)}`} key={card.href}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className={styles.routeArrow}>Read this section ↓</span>
                </a>
              ))}
            </div>

            <div className={styles.phraseBlock}>
              <h3 className={styles.subhead}>It is okay to ask for help</h3>
              <ul className={styles.phraseList}>
                {supportPhrases.map((phrase) => (
                  <li key={phrase}>&ldquo;{phrase}&rdquo;</li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.section} id="help" ref={helpRef}>
            <p className={styles.eyebrow}>Get help now</p>
            <h2 className={styles.sectionTitle}>What feels true right now?</h2>
            <p className={styles.lede}>{helpPageIntro}</p>

            {HELPER_GROUPS.map((group) => (
              <div className={styles.helperGroup} key={group.title}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <div className={styles.helperList}>
                  {group.ids.map((id) => {
                    const card = helperCards.find((entry) => entry.id === id);
                    if (!card) return null;
                    const Icon = card.icon;
                    return (
                      <article className={styles.helperCard} key={card.id}>
                        <div className={styles.helperHead}>
                          <Icon size={22} strokeWidth={1.5} />
                          <h4>{card.title}</h4>
                        </div>
                        <ol className={styles.helperSteps}>
                          {card.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ol>
                        {card.supportRoute ? (
                          <p className={styles.helperSupport}>
                            <strong>{card.supportRoute.title} — </strong>
                            {card.supportRoute.detail}
                          </p>
                        ) : null}
                        {card.extras ? (
                          <ul className={styles.helperExtras}>
                            {card.extras.map((extra) => (
                              <li key={extra}>{extra}</li>
                            ))}
                          </ul>
                        ) : null}
                        <p className={styles.helperNote}>{card.note}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className={styles.contactBlock}>
              <h3 className={styles.subhead}>Who can help with what</h3>
              <p className={styles.lede}>{supportContactsIntro}</p>
              <ul className={styles.contactList}>
                {supportContacts.map((contact) => (
                  <li key={contact.title}>
                    <strong>{contact.title}.</strong> {contact.detail}
                    {contact.email ? (
                      <>
                        {" "}
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.calloutBlock}>
              <h3 className={styles.subhead}>Is this more than a lesson problem?</h3>
              <p>
                If the day feels emotionally heavy, or the problem keeps growing, get
                wellbeing support. You do not need to carry this on your own.
              </p>
              <a className={styles.inlineLink} href="#wellbeing">
                Read the wellbeing section ↓
              </a>
            </div>
          </section>

          <section className={styles.section} id="day" ref={dayRef}>
            <p className={styles.eyebrow}>School day</p>
            <h2 className={styles.sectionTitle}>Your school day online</h2>
            <p className={styles.lede}>{schoolDayIntro}</p>

            <h3 className={styles.subhead}>What to focus on today</h3>
            <ul className={styles.bulletList}>
              {dayExpectations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.aside}>
              Your teacher will be ready for you at the start of the lesson.
            </p>

            <h3 className={styles.subhead}>How lessons work</h3>
            <ul className={styles.bulletList}>
              {lessonRules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className={styles.subhead}>How to take part online</h3>
            <ul className={styles.bulletList}>
              {onlineExpectations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className={styles.subhead}>How to make the day easier</h3>
            <div className={styles.tipGrid}>
              {makeItWork.map((tip) => (
                <article className={styles.tipCard} key={tip.title}>
                  <h4>{tip.title}</h4>
                  <p>{tip.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} id="wellbeing" ref={wellbeingRef}>
            <p className={styles.eyebrow}>Wellbeing &amp; support</p>
            <h2 className={styles.sectionTitle}>If things feel difficult</h2>
            <p className={styles.lede}>{wellbeingIntro}</p>

            <h3 className={styles.subhead}>Quick reset</h3>
            <ol className={styles.bulletList}>
              {quickResetSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className={styles.aside}>Even one small reset can help you rejoin the day.</p>

            <h3 className={styles.subhead}>Looking after yourself</h3>
            <ul className={styles.bulletList}>
              {wellbeingHabits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className={styles.subhead}>Stay connected</h3>
            <ul className={styles.bulletList}>
              {stayingConnectedTips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className={styles.subhead}>Talk to someone</h3>
            <ul className={styles.contactList}>
              {wellbeingContacts.map((contact) => (
                <li key={contact.title}>
                  <strong>{contact.title}.</strong> {contact.detail}
                  {contact.email ? (
                    <>
                      {" "}
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <footer className={styles.footer}>
            <p className={styles.footerTitle}>You do not need to be perfect.</p>
            <p>Log in, start small, keep going, and ask for help when you need it.</p>
          </footer>
        </main>
      </div>
    </>
  );
}

function linkToAnchor(href: string): Anchor {
  switch (href) {
    case "/get-help-now":
      return "help";
    case "/school-day":
      return "day";
    case "/wellbeing-support":
      return "wellbeing";
    default:
      return "start";
  }
}

export function HomePage() {
  return <QuietPage initialAnchor="start" />;
}

export function HelpPage() {
  return <QuietPage initialAnchor="help" />;
}

export function SchoolDayPage() {
  return <QuietPage initialAnchor="day" />;
}

export function WellbeingPage() {
  return <QuietPage initialAnchor="wellbeing" />;
}
