"use client";

import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  dayExpectations,
  helperCards,
  homePageSummary,
  lessonRules,
  makeItWork,
  onlineExpectations,
  quickResetSteps,
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

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--ww-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ww-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ww-mono",
  display: "swap",
});

type Cluster = "joining" | "focus" | "work" | "help" | "today" | "reset" | "talk" | "contacts";

type Tile = {
  id: string;
  cluster: Cluster;
  label: string;
  span: number;
  body: ReactNode;
};

const CLUSTER_LABELS: Record<Cluster, string> = {
  joining: "Joining lessons",
  focus: "Staying focused",
  work: "Getting work done",
  help: "Who can help me?",
  today: "Today",
  reset: "Reset",
  talk: "Talk to someone",
  contacts: "Who can help with what",
};

function HelperBody({ id }: { id: string }) {
  const card = helperCards.find((c) => c.id === id);
  if (!card) return null;
  return (
    <>
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

const TILES: Tile[] = [
  // Joining lessons (amber)
  {
    id: "time",
    cluster: "joining",
    label: helperCards.find((c) => c.id === "time")!.title,
    span: 3,
    body: <HelperBody id="time" />,
  },
  {
    id: "join",
    cluster: "joining",
    label: helperCards.find((c) => c.id === "join")!.title,
    span: 3,
    body: <HelperBody id="join" />,
  },

  // Staying focused (sage)
  {
    id: "focus",
    cluster: "focus",
    label: helperCards.find((c) => c.id === "focus")!.title,
    span: 3,
    body: <HelperBody id="focus" />,
  },
  {
    id: "sitstill",
    cluster: "focus",
    label: helperCards.find((c) => c.id === "sitstill")!.title,
    span: 3,
    body: <HelperBody id="sitstill" />,
  },
  {
    id: "eyes",
    cluster: "focus",
    label: helperCards.find((c) => c.id === "eyes")!.title,
    span: 3,
    body: <HelperBody id="eyes" />,
  },

  // Getting work done (iris)
  {
    id: "understand",
    cluster: "work",
    label: helperCards.find((c) => c.id === "understand")!.title,
    span: 3,
    body: <HelperBody id="understand" />,
  },
  {
    id: "reader",
    cluster: "work",
    label: helperCards.find((c) => c.id === "reader")!.title,
    span: 3,
    body: <HelperBody id="reader" />,
  },

  // Who can help me (rose)
  {
    id: "help",
    cluster: "help",
    label: helperCards.find((c) => c.id === "help")!.title,
    span: 3,
    body: <HelperBody id="help" />,
  },
  {
    id: "sfl",
    cluster: "help",
    label: helperCards.find((c) => c.id === "sfl")!.title,
    span: 3,
    body: <HelperBody id="sfl" />,
  },

  // Today (school day) — neutral, large
  {
    id: "today",
    cluster: "today",
    label: "Your school day online",
    span: 4,
    body: (
      <>
        <p className={styles.lede}>{schoolDayIntro}</p>
        <h4 className={styles.subhead}>What to focus on today</h4>
        <ul className={styles.bulletList}>
          {dayExpectations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4 className={styles.subhead}>How lessons work</h4>
        <ul className={styles.bulletList}>
          {lessonRules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4 className={styles.subhead}>How to take part online</h4>
        <ul className={styles.bulletList}>
          {onlineExpectations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4 className={styles.subhead}>How to make the day easier</h4>
        <div className={styles.tipGrid}>
          {makeItWork.map((tip) => (
            <div className={styles.tipCard} key={tip.title}>
              <strong>{tip.title}</strong>
              <p>{tip.text}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },

  // Reset (wellbeing) — neutral
  {
    id: "reset",
    cluster: "reset",
    label: "Quick reset",
    span: 4,
    body: (
      <>
        <p className={styles.lede}>{wellbeingIntro}</p>
        <h4 className={styles.subhead}>Quick reset</h4>
        <ol className={styles.steps}>
          {quickResetSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className={styles.note}>Even one small reset can help you rejoin the day.</p>
        <h4 className={styles.subhead}>Looking after yourself</h4>
        <ul className={styles.bulletList}>
          {wellbeingHabits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4 className={styles.subhead}>Stay connected</h4>
        <ul className={styles.bulletList}>
          {stayingConnectedTips.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </>
    ),
  },

  // Talk to someone (wellbeing contacts) — neutral
  {
    id: "talk",
    cluster: "talk",
    label: "Talk to someone",
    span: 4,
    body: (
      <ul className={styles.contactList}>
        {wellbeingContacts.map((contact) => (
          <li key={contact.title}>
            <strong>{contact.title}</strong>
            <p>{contact.detail}</p>
            {contact.email ? (
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            ) : null}
          </li>
        ))}
      </ul>
    ),
  },

  // Support contacts — neutral
  {
    id: "contacts",
    cluster: "contacts",
    label: "Who can help with what",
    span: 4,
    body: (
      <>
        <p className={styles.lede}>{supportContactsIntro}</p>
        <ul className={styles.contactList}>
          {supportContacts.map((contact) => (
            <li key={contact.title}>
              <strong>{contact.title}</strong>
              <p>{contact.detail}</p>
              {contact.email ? (
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              ) : null}
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

const LEGEND: Array<{ cluster: Cluster; label: string }> = [
  { cluster: "joining", label: "Joining lessons" },
  { cluster: "focus", label: "Staying focused" },
  { cluster: "work", label: "Getting work done" },
  { cluster: "help", label: "Who can help me?" },
];

// ---------- Shell ----------

export function WorkshopShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.root} ${display.variable} ${sans.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}

// ---------- Wall ----------

function WorkshopWall({ initialExpanded }: { initialExpanded: string | null }) {
  const [expandedId, setExpandedId] = useState<string | null>(initialExpanded);

  useEffect(() => {
    setExpandedId(initialExpanded);
  }, [initialExpanded]);

  const close = useCallback(() => setExpandedId(null), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && expandedId) {
        event.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedId, close]);

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandKicker}>Jumeirah College</span>
          <span className={styles.brandTitle}>{siteTitle}</span>
        </div>
        <div className={styles.legend} aria-label="Cluster legend">
          {LEGEND.map((item) => (
            <span className={styles.legendItem} data-cluster={item.cluster} key={item.cluster}>
              <span className={styles.legendDot} />
              {item.label}
            </span>
          ))}
          {expandedId ? (
            <button className={styles.resetView} onClick={close} type="button">
              Reset view
            </button>
          ) : null}
        </div>
      </header>

      <div className={styles.heroBand}>
        <p className={styles.heroKicker}>Distance learning hub</p>
        <h1 className={styles.heroHeadline}>
          This is your school day. We&apos;re just doing it online.
        </h1>
        <p className={styles.heroSummary}>{homePageSummary}</p>
        <ul className={styles.phraseRow}>
          {supportPhrases.map((phrase) => (
            <li key={phrase}>&ldquo;{phrase}&rdquo;</li>
          ))}
        </ul>
      </div>

      <main className={styles.wall} aria-label="Support wall">
        {TILES.map((tile) => {
          const isExpanded = tile.id === expandedId;
          return (
            <article
              aria-expanded={isExpanded}
              className={`${styles.tile} ${isExpanded ? styles.tileExpanded : ""}`}
              data-cluster={tile.cluster}
              data-span={tile.span}
              key={tile.id}
            >
              <button
                aria-label={isExpanded ? `Collapse ${tile.label}` : `Open ${tile.label}`}
                className={styles.tileSurface}
                onClick={() => setExpandedId(isExpanded ? null : tile.id)}
                type="button"
              >
                <span className={styles.tileCluster}>{CLUSTER_LABELS[tile.cluster]}</span>
                <span className={styles.tileLabel}>{tile.label}</span>
                {!isExpanded ? <span className={styles.tileChevron}>+</span> : null}
              </button>

              {isExpanded ? (
                <div className={styles.tileBody}>
                  <button
                    aria-label="Close"
                    className={styles.closeButton}
                    onClick={close}
                    type="button"
                  >
                    <X size={18} />
                  </button>
                  {tile.body}
                </div>
              ) : null}
            </article>
          );
        })}
      </main>

      <footer className={styles.footer}>
        <p>You do not need to be perfect. Log in, start small, keep going, and ask for help when you need it.</p>
      </footer>
    </div>
  );
}

// ---------- Page exports ----------

export function HomePage() {
  return <WorkshopWall initialExpanded={null} />;
}

export function HelpPage() {
  return <WorkshopWall initialExpanded={null} />;
}

export function SchoolDayPage() {
  return <WorkshopWall initialExpanded="today" />;
}

export function WellbeingPage() {
  return <WorkshopWall initialExpanded="reset" />;
}
