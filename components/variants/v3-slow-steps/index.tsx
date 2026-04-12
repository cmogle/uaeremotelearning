"use client";

import { Lexend, Space_Grotesk } from "next/font/google";
import { usePathname } from "next/navigation";
import {
  type CSSProperties,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  dayExpectations,
  helpPageIntro,
  helperCards,
  homePageSummary,
  lessonRules,
  makeItWork,
  navItems,
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

/* ------------------------------------------------------------------ */
/*  Fonts                                                              */
/* ------------------------------------------------------------------ */

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

/* ------------------------------------------------------------------ */
/*  Types & constants                                                  */
/* ------------------------------------------------------------------ */

type RouteKey = "home" | "day" | "wellbeing";

type Step = {
  kicker: string;
  title: string;
  render: () => ReactNode;
};

type ThemeKey = "calm" | "midnight" | "electric";

const THEMES: { key: ThemeKey; label: string; emoji: string }[] = [
  { key: "calm", label: "Calm", emoji: "🌿" },
  { key: "midnight", label: "Midnight", emoji: "🌙" },
  { key: "electric", label: "Electric", emoji: "⚡" },
];

const ROUTE_PATHS: Record<RouteKey | "help", string> = {
  home: "/",
  help: "/get-help-now",
  day: "/school-day",
  wellbeing: "/wellbeing-support",
};

const HELPER_EMOJI: Record<string, string> = {
  time: "⏰",
  join: "📱",
  focus: "🎯",
  sitstill: "🏃",
  eyes: "👀",
  understand: "📖",
  reader: "🎧",
  help: "💬",
  sfl: "🤝",
};

const ROUTE_EMOJI: Record<string, string> = {
  "/school-day": "📅",
  "/get-help-now": "🆘",
  "/wellbeing-support": "💚",
};

/* ------------------------------------------------------------------ */
/*  Theme                                                              */
/* ------------------------------------------------------------------ */

const ThemeContext = createContext<{
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
}>({ theme: "calm", setTheme: () => {} });

function useTheme(): [ThemeKey, (t: ThemeKey) => void] {
  const [theme, setThemeState] = useState<ThemeKey>("calm");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("jc-theme") as ThemeKey | null;
      if (stored && THEMES.some((t) => t.key === stored)) {
        setThemeState(stored);
      }
    } catch {
      /* SSR / private browsing */
    }
  }, []);

  const setTheme = useCallback((t: ThemeKey) => {
    setThemeState(t);
    try {
      localStorage.setItem("jc-theme", t);
    } catch {
      /* private browsing */
    }
  }, []);

  return [theme, setTheme];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function buildRouteHref(pathname: string, path: string): string {
  if (pathname.startsWith("/preview/v3-slow-steps")) {
    const previewBase = "/preview/v3-slow-steps";
    if (path === "/") return previewBase;
    return `${previewBase}${path}`;
  }
  if (path === "/") return "/JC";
  return `/JC${path}`;
}

/* ------------------------------------------------------------------ */
/*  Shared UI                                                          */
/* ------------------------------------------------------------------ */

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={styles.themeSwitcher} role="radiogroup" aria-label="Theme">
      {THEMES.map((t) => (
        <button
          key={t.key}
          className={
            theme === t.key ? styles.themeButtonActive : styles.themeButton
          }
          onClick={() => setTheme(t.key)}
          aria-label={t.label}
          aria-checked={theme === t.key}
          role="radio"
          type="button"
        >
          {t.emoji}
        </button>
      ))}
    </div>
  );
}

function TopBar({
  currentPath,
  extra,
}: {
  currentPath: string;
  extra?: ReactNode;
}) {
  const pathname = usePathname() ?? "";
  return (
    <div className={styles.topBar}>
      <a className={styles.brand} href={buildRouteHref(pathname, "/")}>
        <span className={styles.brandKicker}>Jumeirah College</span>
        <span className={styles.brandTitle}>{siteTitle}</span>
      </a>
      <nav aria-label="Primary" className={styles.topNav}>
        {navItems.map((item) => {
          const active = item.href === currentPath;
          return (
            <a
              aria-current={active ? "page" : undefined}
              className={
                active ? styles.topNavLinkActive : styles.topNavLink
              }
              href={buildRouteHref(pathname, item.href)}
              key={item.href}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className={styles.topBarActions}>
        <ThemeSwitcher />
        {extra}
      </div>
    </div>
  );
}

function RouteChoiceLink({
  path,
  title,
  detail,
  urgent,
}: {
  path: string;
  title: string;
  detail: string;
  urgent?: boolean;
}) {
  const pathname = usePathname() ?? "";
  const emoji = ROUTE_EMOJI[path];
  return (
    <a
      className={urgent ? styles.choiceUrgent : styles.choice}
      href={buildRouteHref(pathname, path)}
    >
      {emoji && <span className={styles.choiceEmoji}>{emoji}</span>}
      <span className={styles.choiceTitle}>{title}</span>
      <span className={styles.choiceDetail}>{detail}</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Step definitions — Home, School Day, Wellbeing                     */
/* ------------------------------------------------------------------ */

const HOME_STEPS: Step[] = [
  {
    kicker: "✨ Start here",
    title: "This is your school day. We're just doing it online.",
    render: () => <p className={styles.lede}>{homePageSummary}</p>,
  },
  {
    kicker: "✨ Start here",
    title: "Start work now",
    render: () => (
      <>
        <p className={styles.lede}>Start with 5 minutes.</p>
        <ol className={styles.numberedSteps}>
          {quickStartSteps.map((step, i) => (
            <li key={step}>
              <span className={styles.numberPill}>{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className={styles.note}>
          You do not need to feel ready. Start with one small step.
        </p>
      </>
    ),
  },
  {
    kicker: "✨ Start here",
    title: "It is okay to ask for help",
    render: () => (
      <ul className={styles.phraseList}>
        {supportPhrases.map((phrase) => (
          <li key={phrase}>💬 &ldquo;{phrase}&rdquo;</li>
        ))}
      </ul>
    ),
  },
  {
    kicker: "✨ Start here",
    title: "Where would you like to go next?",
    render: () => (
      <div className={styles.choiceList}>
        {routeCards.map((card) => (
          <RouteChoiceLink
            detail={card.description}
            key={card.href}
            path={card.href}
            title={card.title}
            urgent={card.href === "/get-help-now"}
          />
        ))}
      </div>
    ),
  },
];

const DAY_STEPS: Step[] = [
  {
    kicker: "📅 School day",
    title: "Your school day online",
    render: () => <p className={styles.lede}>{schoolDayIntro}</p>,
  },
  {
    kicker: "📅 School day",
    title: "What to focus on today",
    render: () => (
      <>
        <ul className={styles.checkList}>
          {dayExpectations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.note}>
          Your teacher will be ready for you at the start of the lesson.
        </p>
      </>
    ),
  },
  {
    kicker: "📅 School day",
    title: "How lessons work",
    render: () => (
      <ul className={styles.checkList}>
        {lessonRules.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
  {
    kicker: "📅 School day",
    title: "How to take part online",
    render: () => (
      <ul className={styles.checkList}>
        {onlineExpectations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
  ...makeItWork.map((tip) => ({
    kicker: "💡 Make the day easier",
    title: tip.title,
    render: () => <p className={styles.body}>{tip.text}</p>,
  })),
];

const WELLBEING_STEPS: Step[] = [
  {
    kicker: "💚 Wellbeing & support",
    title: "If things feel difficult",
    render: () => <p className={styles.lede}>{wellbeingIntro}</p>,
  },
  {
    kicker: "💚 Wellbeing & support",
    title: "Quick reset",
    render: () => (
      <>
        <ol className={styles.numberedSteps}>
          {quickResetSteps.map((step, i) => (
            <li key={step}>
              <span className={styles.numberPill}>{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className={styles.note}>
          Even one small reset can help you rejoin the day.
        </p>
      </>
    ),
  },
  {
    kicker: "💚 Wellbeing & support",
    title: "Looking after yourself",
    render: () => (
      <ul className={styles.checkList}>
        {wellbeingHabits.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
  {
    kicker: "💚 Wellbeing & support",
    title: "Stay connected",
    render: () => (
      <>
        <ul className={styles.checkList}>
          {stayingConnectedTips.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.note}>
          If you miss your friends or the day feels too much, connection still
          counts as support.
        </p>
      </>
    ),
  },
  {
    kicker: "💚 Wellbeing & support",
    title: "Talk to someone",
    render: () => (
      <ul className={styles.contactList}>
        {wellbeingContacts.map((contact) => (
          <li key={contact.title}>
            <strong>{contact.title}.</strong> {contact.detail}
            {contact.email && (
              <>
                {" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </>
            )}
          </li>
        ))}
      </ul>
    ),
  },
];

const ROUTES: Record<RouteKey, { key: RouteKey; steps: Step[] }> = {
  home: { key: "home", steps: HOME_STEPS },
  day: { key: "day", steps: DAY_STEPS },
  wellbeing: { key: "wellbeing", steps: WELLBEING_STEPS },
};

/* ------------------------------------------------------------------ */
/*  SlowSteps wizard (Home / School Day / Wellbeing)                   */
/* ------------------------------------------------------------------ */

function SlowSteps({ routeKey }: { routeKey: RouteKey }) {
  const route = ROUTES[routeKey];
  const total = route.steps.length;
  const pathname = usePathname() ?? "";

  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const readHash = useCallback((): { idx: number; all: boolean } => {
    if (typeof window === "undefined") return { idx: 0, all: false };
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "all") return { idx: 0, all: true };
    const n = Number.parseInt(hash, 10);
    if (Number.isFinite(n) && n >= 0 && n < total)
      return { idx: n, all: false };
    return { idx: 0, all: false };
  }, [total]);

  const writeHash = useCallback((next: number | "all") => {
    if (typeof window === "undefined") return;
    const newHash = next === "all" ? "#all" : `#${next}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }
  }, []);

  useEffect(() => {
    const { idx, all } = readHash();
    setIndex(idx);
    setShowAll(all);
  }, [readHash]);

  useEffect(() => {
    const onHashChange = () => {
      const { idx, all } = readHash();
      setIndex(idx);
      setShowAll(all);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [readHash]);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= total) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const apply = () => {
        setIndex(next);
        setShowAll(false);
        writeHash(next);
      };
      const doc = document as Document & {
        startViewTransition?: (callback: () => void) => void;
      };
      if (!reduced && typeof doc.startViewTransition === "function") {
        doc.startViewTransition(() => apply());
      } else {
        apply();
      }
    },
    [total, writeHash]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const back = useCallback(() => goTo(index - 1), [goTo, index]);
  const openAll = useCallback(() => {
    setShowAll(true);
    writeHash("all");
  }, [writeHash]);
  const closeAll = useCallback(() => {
    setShowAll(false);
    writeHash(index);
  }, [writeHash, index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      )
        return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        back();
      } else if (event.key === "Escape") {
        event.preventDefault();
        if (showAll) closeAll();
        else openAll();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, back, openAll, closeAll, showAll]);

  const progress = useMemo(
    () => Math.round(((index + 1) / total) * 100),
    [index, total]
  );

  const currentPath = ROUTE_PATHS[routeKey];
  const current = route.steps[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div className={styles.shell}>
      <div className={styles.progressBar} aria-hidden>
        <div
          className={styles.progressFill}
          style={{ "--progress": `${progress}%` } as CSSProperties}
        />
      </div>

      <TopBar
        currentPath={currentPath}
        extra={
          <button
            className={styles.escapeButton}
            onClick={openAll}
            type="button"
          >
            See everything
          </button>
        }
      />

      {showAll ? (
        <EscapeIndex onClose={closeAll} />
      ) : (
        <main
          aria-live="polite"
          className={styles.stage}
          style={{ viewTransitionName: "ss-stage" } as CSSProperties}
        >
          <article className={styles.card}>
            <p className={styles.kicker}>{current.kicker}</p>
            <h1 className={styles.title}>{current.title}</h1>
            <p className={styles.stepCounter}>
              {index + 1} of {total}
            </p>
            <div className={styles.body}>{current.render()}</div>
          </article>

          <nav aria-label="Wizard controls" className={styles.controls}>
            <button
              className={styles.back}
              disabled={isFirst}
              onClick={back}
              type="button"
            >
              ← Back
            </button>
            <span className={styles.controlHint}>← → arrow keys</span>
            <button
              className={styles.next}
              disabled={isLast}
              onClick={next}
              type="button"
            >
              Next →
            </button>
          </nav>
        </main>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HelpHub — button grid + per-topic mini-wizard                      */
/* ------------------------------------------------------------------ */

function HelpHub() {
  const pathname = usePathname() ?? "";
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const activeCard = activeCardId
    ? (helperCards.find((c) => c.id === activeCardId) ?? null)
    : null;

  const slides = useMemo(() => {
    if (!activeCard) return [];
    const result: Array<{ content: ReactNode }> = [];
    for (const step of activeCard.steps) {
      result.push({
        content: <p className={styles.helpSlideText}>{step}</p>,
      });
    }
    result.push({
      content: (
        <>
          <p className={styles.helpNote}>{activeCard.note}</p>
          {activeCard.supportRoute && (
            <div className={styles.supportRoute}>
              <p className={styles.supportRouteTitle}>
                {activeCard.supportRoute.title}
              </p>
              <p>{activeCard.supportRoute.detail}</p>
            </div>
          )}
          {activeCard.extras && (
            <ul className={styles.helpExtras}>
              {activeCard.extras.map((extra) => (
                <li key={extra}>{extra}</li>
              ))}
            </ul>
          )}
        </>
      ),
    });
    return result;
  }, [activeCard]);

  const totalSlides = slides.length;
  const isLastSlide = stepIndex === totalSlides - 1;
  const progress =
    totalSlides > 0
      ? Math.round(((stepIndex + 1) / totalSlides) * 100)
      : 0;

  const openCard = useCallback((id: string) => {
    setActiveCardId(id);
    setStepIndex(0);
  }, []);

  const closeCard = useCallback(() => {
    setActiveCardId(null);
    setStepIndex(0);
  }, []);

  const nextStep = useCallback(() => {
    if (stepIndex < totalSlides - 1) setStepIndex((s) => s + 1);
  }, [stepIndex, totalSlides]);

  const prevStep = useCallback(() => {
    if (stepIndex > 0) setStepIndex((s) => s - 1);
  }, [stepIndex]);

  useEffect(() => {
    if (!activeCard) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      )
        return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextStep();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevStep();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeCard();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCard, nextStep, prevStep, closeCard]);

  const currentPath = "/get-help-now";

  /* ---------- Mini-wizard for a single topic ---------- */
  if (activeCard) {
    const emoji = HELPER_EMOJI[activeCard.id] ?? "";
    const Icon = activeCard.icon;
    return (
      <div className={styles.shell}>
        <div className={styles.progressBar} aria-hidden>
          <div
            className={styles.progressFill}
            style={{ "--progress": `${progress}%` } as CSSProperties}
          />
        </div>

        <TopBar currentPath={currentPath} />

        <main className={styles.stage}>
          <article className={styles.card}>
            <button
              className={styles.helpBackToTopics}
              onClick={closeCard}
              type="button"
            >
              ← Back to topics
            </button>
            <p className={styles.kicker}>
              <span className={styles.kickerEmoji}>{emoji}</span>
              <Icon size={18} strokeWidth={1.5} />
              {" "}{activeCard.title}
            </p>
            <h1 className={styles.title}>
              {isLastSlide ? "Remember" : `Step ${stepIndex + 1}`}
            </h1>
            <p className={styles.stepCounter}>
              {stepIndex + 1} of {totalSlides}
            </p>
            <div className={styles.body}>{slides[stepIndex].content}</div>
          </article>

          <nav aria-label="Step controls" className={styles.controls}>
            <button
              className={styles.back}
              disabled={stepIndex === 0}
              onClick={prevStep}
              type="button"
            >
              ← Back
            </button>
            <span className={styles.controlHint}>← → arrow keys</span>
            {isLastSlide ? (
              <button
                className={styles.next}
                onClick={closeCard}
                type="button"
              >
                Done ✓
              </button>
            ) : (
              <button
                className={styles.next}
                onClick={nextStep}
                type="button"
              >
                Next step →
              </button>
            )}
          </nav>
        </main>
      </div>
    );
  }

  /* ---------- Topic grid ---------- */
  return (
    <div className={styles.shell}>
      <TopBar currentPath={currentPath} />

      <main className={styles.helpHubStage}>
        <div className={styles.helpHubIntro}>
          <h1 className={styles.helpHubTitle}>
            <span className={styles.helpHubEmoji}>🆘</span> Get help now
          </h1>
          <p className={styles.helpHubLede}>{helpPageIntro}</p>
        </div>

        <div className={styles.helpGrid}>
          {helperCards.map((card) => {
            const emoji = HELPER_EMOJI[card.id] ?? "";
            const Icon = card.icon;
            return (
              <button
                className={styles.helpButton}
                key={card.id}
                onClick={() => openCard(card.id)}
                type="button"
              >
                <span className={styles.helpButtonEmoji}>{emoji}</span>
                <span className={styles.helpButtonTitle}>{card.title}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.helpHubFooter}>
          <h2 className={styles.helpHubFooterTitle}>
            💬 Who can help with what
          </h2>
          <p className={styles.helpHubFooterLede}>{supportContactsIntro}</p>
          <ul className={styles.contactList}>
            {supportContacts.map((contact) => (
              <li key={contact.title}>
                <strong>{contact.title}.</strong> {contact.detail}
                {contact.email && (
                  <>
                    {" "}
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.helpHubWellbeingLink}>
            <RouteChoiceLink
              detail="Quick reset, looking after yourself, and people you can talk to."
              path="/wellbeing-support"
              title="Is this more than a lesson problem?"
              urgent
            />
          </div>
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Escape index (See everything)                                      */
/* ------------------------------------------------------------------ */

function EscapeIndex({ onClose }: { onClose: () => void }) {
  const allRoutes: Array<{ label: string; emoji: string; steps: Step[] }> = [
    { label: "Start here", emoji: "✨", steps: HOME_STEPS },
    { label: "School day", emoji: "📅", steps: DAY_STEPS },
    { label: "Wellbeing & support", emoji: "💚", steps: WELLBEING_STEPS },
  ];
  return (
    <main className={styles.indexStage}>
      <div className={styles.indexHead}>
        <h1 className={styles.indexTitle}>Everything, on one page</h1>
        <button
          className={styles.escapeClose}
          onClick={onClose}
          type="button"
        >
          Back to one-thing-at-a-time
        </button>
      </div>
      {allRoutes.map((route) => (
        <section className={styles.indexSection} key={route.label}>
          <h2 className={styles.indexSectionTitle}>
            {route.emoji} {route.label}
          </h2>
          {route.steps.map((step, i) => (
            <article
              className={styles.indexCard}
              key={`${route.label}-${i}`}
            >
              <p className={styles.indexKicker}>{step.kicker}</p>
              <h3 className={styles.indexCardTitle}>{step.title}</h3>
              <div className={styles.body}>{step.render()}</div>
            </article>
          ))}
        </section>
      ))}

      <section className={styles.indexSection}>
        <h2 className={styles.indexSectionTitle}>🆘 Get help now</h2>
        {helperCards.map((card) => {
          const emoji = HELPER_EMOJI[card.id] ?? "";
          return (
            <article className={styles.indexCard} key={card.id}>
              <h3 className={styles.indexCardTitle}>
                {emoji} {card.title}
              </h3>
              <ol className={styles.steps}>
                {card.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className={styles.note}>{card.note}</p>
            </article>
          );
        })}
      </section>

      <p className={styles.indexFoot}>
        You do not need to be perfect. Log in, start small, keep going, and ask
        for help when you need it.
      </p>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Shell & page exports                                               */
/* ------------------------------------------------------------------ */

export function SlowStepsShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`${styles.root} ${spaceGrotesk.variable} ${lexend.variable}`}
        data-theme={theme}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function HomePage() {
  return <SlowSteps routeKey="home" />;
}

export function HelpPage() {
  return <HelpHub />;
}

export function SchoolDayPage() {
  return <SlowSteps routeKey="day" />;
}

export function WellbeingPage() {
  return <SlowSteps routeKey="wellbeing" />;
}
