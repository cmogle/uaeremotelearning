"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ss-sans",
  display: "swap",
});

type RouteKey = "home" | "help" | "day" | "wellbeing";

type Step = {
  kicker: string;
  title: string;
  render: () => ReactNode;
};

type RouteConfig = {
  key: RouteKey;
  hashPrefix: string;
  steps: Step[];
};

const ROUTE_PATHS: Record<RouteKey, string> = {
  home: "/",
  help: "/get-help-now",
  day: "/school-day",
  wellbeing: "/wellbeing-support",
};

// ---------- Step builders ----------

function HelperStep({ id }: { id: string }) {
  const card = helperCards.find((c) => c.id === id);
  if (!card) return null;
  const Icon = card.icon;
  return (
    <>
      <div className={styles.helperIcon}>
        <Icon size={32} strokeWidth={1.4} />
      </div>
      <ol className={styles.steps}>
        {card.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {card.supportRoute ? (
        <div className={styles.supportRoute}>
          <p className={styles.supportRouteTitle}>{card.supportRoute.title}</p>
          <p>{card.supportRoute.detail}</p>
        </div>
      ) : null}
      {card.extras ? (
        <ul className={styles.extras}>
          {card.extras.map((extra) => (
            <li key={extra}>{extra}</li>
          ))}
        </ul>
      ) : null}
      <p className={styles.note}>{card.note}</p>
    </>
  );
}

function RouteChoiceLink({
  path,
  title,
  detail,
}: {
  path: string;
  title: string;
  detail: string;
}) {
  const pathname = usePathname() ?? "";

  return (
    <a className={styles.choice} href={buildRouteHref(pathname, path)}>
      <span className={styles.choiceTitle}>{title}</span>
      <span className={styles.choiceDetail}>{detail}</span>
    </a>
  );
}

const HOME_STEPS: Step[] = [
  {
    kicker: "Start here",
    title: "This is your school day. We're just doing it online.",
    render: () => (
      <>
        <p className={styles.lede}>{homePageSummary}</p>
      </>
    ),
  },
  {
    kicker: "Start here",
    title: "Start work now",
    render: () => (
      <>
        <p className={styles.lede}>Start with 5 minutes.</p>
        <ol className={styles.numberedSteps}>
          {quickStartSteps.map((step, index) => (
            <li key={step}>
              <span className={styles.numberPill}>{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className={styles.note}>You do not need to feel ready. Start with one small step.</p>
      </>
    ),
  },
  {
    kicker: "Start here",
    title: "It is okay to ask for help",
    render: () => (
      <ul className={styles.phraseList}>
        {supportPhrases.map((phrase) => (
          <li key={phrase}>&ldquo;{phrase}&rdquo;</li>
        ))}
      </ul>
    ),
  },
  {
    kicker: "Start here",
    title: "Where would you like to go next?",
    render: () => (
        <div className={styles.choiceList}>
          {routeCards.map((card) => (
            <RouteChoiceLink
              detail={card.description}
              key={card.href}
              path={card.href}
              title={card.title}
            />
          ))}
        </div>
      ),
  },
];

const HELP_STEPS: Step[] = [
  {
    kicker: "Get help now",
    title: "What feels true right now?",
    render: () => <p className={styles.lede}>{helpPageIntro}</p>,
  },
  {
    kicker: "Joining lessons",
    title: helperCards.find((c) => c.id === "time")!.title,
    render: () => <HelperStep id="time" />,
  },
  {
    kicker: "Joining lessons",
    title: helperCards.find((c) => c.id === "join")!.title,
    render: () => <HelperStep id="join" />,
  },
  {
    kicker: "Staying focused",
    title: helperCards.find((c) => c.id === "focus")!.title,
    render: () => <HelperStep id="focus" />,
  },
  {
    kicker: "Staying focused",
    title: helperCards.find((c) => c.id === "sitstill")!.title,
    render: () => <HelperStep id="sitstill" />,
  },
  {
    kicker: "Staying focused",
    title: helperCards.find((c) => c.id === "eyes")!.title,
    render: () => <HelperStep id="eyes" />,
  },
  {
    kicker: "Getting work done",
    title: helperCards.find((c) => c.id === "understand")!.title,
    render: () => <HelperStep id="understand" />,
  },
  {
    kicker: "Getting work done",
    title: helperCards.find((c) => c.id === "reader")!.title,
    render: () => <HelperStep id="reader" />,
  },
  {
    kicker: "Who can help me?",
    title: helperCards.find((c) => c.id === "help")!.title,
    render: () => <HelperStep id="help" />,
  },
  {
    kicker: "Who can help me?",
    title: helperCards.find((c) => c.id === "sfl")!.title,
    render: () => <HelperStep id="sfl" />,
  },
  {
    kicker: "Get help now",
    title: "Who can help with what",
    render: () => (
      <>
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
      </>
    ),
  },
  {
    kicker: "Get help now",
    title: "Is this more than a lesson problem?",
    render: () => (
      <>
        <p className={styles.lede}>
          If the day feels emotionally heavy, or the problem keeps growing, get
          wellbeing support. You do not need to carry this on your own.
        </p>
        <RouteChoiceLink
          detail="Quick reset, looking after yourself, and people you can talk to."
          path="/wellbeing-support"
          title="Get wellbeing support"
        />
      </>
    ),
  },
];

const DAY_STEPS: Step[] = [
  {
    kicker: "School day",
    title: "Your school day online",
    render: () => <p className={styles.lede}>{schoolDayIntro}</p>,
  },
  {
    kicker: "School day",
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
    kicker: "School day",
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
    kicker: "School day",
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
    kicker: "How to make the day easier",
    title: tip.title,
    render: () => <p className={styles.body}>{tip.text}</p>,
  })),
];

const WELLBEING_STEPS: Step[] = [
  {
    kicker: "Wellbeing & support",
    title: "If things feel difficult",
    render: () => <p className={styles.lede}>{wellbeingIntro}</p>,
  },
  {
    kicker: "Wellbeing & support",
    title: "Quick reset",
    render: () => (
      <>
        <ol className={styles.numberedSteps}>
          {quickResetSteps.map((step, index) => (
            <li key={step}>
              <span className={styles.numberPill}>{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className={styles.note}>Even one small reset can help you rejoin the day.</p>
      </>
    ),
  },
  {
    kicker: "Wellbeing & support",
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
    kicker: "Wellbeing & support",
    title: "Stay connected",
    render: () => (
      <>
        <ul className={styles.checkList}>
          {stayingConnectedTips.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.note}>
          If you miss your friends or the day feels too much, connection still counts as support.
        </p>
      </>
    ),
  },
  {
    kicker: "Wellbeing & support",
    title: "Talk to someone",
    render: () => (
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
    ),
  },
];

const ROUTES: Record<RouteKey, RouteConfig> = {
  home: { key: "home", hashPrefix: "h", steps: HOME_STEPS },
  help: { key: "help", hashPrefix: "g", steps: HELP_STEPS },
  day: { key: "day", hashPrefix: "d", steps: DAY_STEPS },
  wellbeing: { key: "wellbeing", hashPrefix: "w", steps: WELLBEING_STEPS },
};

function buildRouteHref(pathname: string, path: string): string {
  const previewBase = pathname.startsWith("/preview/v3-slow-steps")
    ? "/preview/v3-slow-steps"
    : "";

  if (path === "/") {
    return previewBase || "/";
  }

  return `${previewBase}${path}`;
}

// ---------- Shell ----------

export function SlowStepsShell({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.root} ${inter.variable}`}>{children}</div>;
}

// ---------- Wizard ----------

function SlowSteps({ routeKey }: { routeKey: RouteKey }) {
  const route = ROUTES[routeKey];
  const total = route.steps.length;
  const pathname = usePathname() ?? "";

  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

  const readHash = useCallback((): { idx: number; all: boolean } => {
    if (typeof window === "undefined") return { idx: 0, all: false };
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "all") return { idx: 0, all: true };
    const n = Number.parseInt(hash, 10);
    if (Number.isFinite(n) && n >= 0 && n < total) return { idx: n, all: false };
    return { idx: 0, all: false };
  }, [total]);

  const writeHash = useCallback((next: number | "all") => {
    if (typeof window === "undefined") return;
    const newHash = next === "all" ? "#all" : `#${next}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }
  }, []);

  // Initial hydration from hash
  useEffect(() => {
    const { idx, all } = readHash();
    setIndex(idx);
    setShowAll(all);
  }, [readHash]);

  // Listen to hashchange (back/forward)
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
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  // Keyboard navigation
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
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
                className={active ? styles.topNavLinkActive : styles.topNavLink}
                href={buildRouteHref(pathname, item.href)}
                key={item.href}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <button className={styles.escapeButton} onClick={openAll} type="button">
          See everything
        </button>
      </div>

      {showAll ? (
        <EscapeIndex onClose={closeAll} />
      ) : (
        <main
          aria-live="polite"
          className={styles.stage}
          ref={liveRef}
          style={{ viewTransitionName: "ss-stage" } as CSSProperties}
        >
          <article className={styles.card}>
            <p className={styles.kicker}>{current.kicker}</p>
            <h1 className={styles.title}>{current.title}</h1>
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

function EscapeIndex({ onClose }: { onClose: () => void }) {
  const allRoutes: Array<{ label: string; steps: Step[] }> = [
    { label: "Start here", steps: HOME_STEPS },
    { label: "Get help now", steps: HELP_STEPS },
    { label: "School day", steps: DAY_STEPS },
    { label: "Wellbeing & support", steps: WELLBEING_STEPS },
  ];
  return (
    <main className={styles.indexStage}>
      <div className={styles.indexHead}>
        <h1 className={styles.indexTitle}>Everything, on one page</h1>
        <button className={styles.escapeClose} onClick={onClose} type="button">
          Back to one-thing-at-a-time
        </button>
      </div>
      {allRoutes.map((route) => (
        <section className={styles.indexSection} key={route.label}>
          <h2 className={styles.indexSectionTitle}>{route.label}</h2>
          {route.steps.map((step, index) => (
            <article className={styles.indexCard} key={`${route.label}-${index}`}>
              <p className={styles.indexKicker}>{step.kicker}</p>
              <h3 className={styles.indexCardTitle}>{step.title}</h3>
              <div className={styles.body}>{step.render()}</div>
            </article>
          ))}
        </section>
      ))}
      <p className={styles.indexFoot}>
        You do not need to be perfect. Log in, start small, keep going, and ask for help when you need it.
      </p>
    </main>
  );
}

// ---------- Page exports ----------

export function HomePage() {
  return <SlowSteps routeKey="home" />;
}

export function HelpPage() {
  return <SlowSteps routeKey="help" />;
}

export function SchoolDayPage() {
  return <SlowSteps routeKey="day" />;
}

export function WellbeingPage() {
  return <SlowSteps routeKey="wellbeing" />;
}
