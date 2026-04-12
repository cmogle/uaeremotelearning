"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Heart,
  Laptop,
  MessageCircle,
  Moon,
  School,
  Sparkles,
  TimerReset,
  UserRound,
  Users,
} from "lucide-react";

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
  supportForLearningBullets,
  supportPhrases,
  wellbeingContacts,
  wellbeingHabits,
  wellbeingIntro,
} from "@/lib/baseline-site-content";

import styles from "./styles.module.css";

type ShellProps = {
  children: React.ReactNode;
};

const helperGroups = [
  {
    title: "Joining lessons",
    ids: ["time", "join"],
  },
  {
    title: "Staying focused",
    ids: ["focus", "sitstill", "eyes"],
  },
  {
    title: "Getting work done",
    ids: ["understand", "reader"],
  },
  {
    title: "Who can help me?",
    ids: ["help", "sfl"],
  },
];

export function BaselineShell({ children }: ShellProps) {
  const pathname = usePathname();

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <header className={styles.header}>
        <div className={`${styles.shell} ${styles.headerInner}`}>
          <Link className={styles.brand} href="/">
            <span className={styles.brandKicker}>Jumeirah College</span>
            <span className={styles.brandTitle}>{siteTitle}</span>
          </Link>

          <nav aria-label="Primary" className={styles.nav}>
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={active ? styles.navLinkActive : styles.navLink}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerInner}`}>
          <div>
            <p className={styles.footerTitle}>You do not need to be perfect.</p>
            <p className={styles.footerText}>
              Log in, start small, keep going, and ask for help when you need it.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function HomePageContent() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div>
            <div className={styles.eyebrowPill}>
              <School size={16} />
              <span>Start here</span>
            </div>
            <h1 className={styles.heroTitle}>This is your school day. We&apos;re just doing it online.</h1>
            <p className={styles.heroText}>{homePageSummary}</p>

            <div className={styles.badgeRow}>
              {[
                "Start small",
                "Do one thing",
                "Ask for help early",
                "Join the lesson. Start with what you can do.",
              ].map((word) => (
                <span className={styles.badge} key={word}>
                  {word}
                </span>
              ))}
            </div>

            <div className={styles.ctaRow}>
              <Link className={styles.primaryCta} href="/get-help-now">
                Get help now
                <ArrowRight size={16} />
              </Link>
              <Link className={styles.secondaryCta} href="/school-day">
                See your school day
              </Link>
            </div>
          </div>

          <aside className={styles.heroCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconChip}>
                <Sparkles size={22} />
              </div>
              <div>
                <h2>Start work now</h2>
                <p>Start with 5 minutes</p>
              </div>
            </div>

            <div className={styles.quickStartList}>
              {quickStartSteps.map((step, index) => (
                <div className={styles.quickStartItem} key={step}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <p>{step}</p>
                </div>
              ))}
            </div>

            <div className={styles.notePanel}>
              You do not need to feel ready. Start with one small step.
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.sectionSoft}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Choose what you need</p>
              <h2>Start with the page that fits best</h2>
            </div>
            <p className={styles.sectionText}>
              Keep the day simple. Choose the page that feels closest to what you need right now.
            </p>
          </div>

          <div className={styles.routeGrid}>
            {routeCards.map((card) => (
              <Link className={styles.routeCard} href={card.href} key={card.href}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className={styles.routeLink}>
                  Start here
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.shell} ${styles.twoColumn}`}>
          <article className={styles.surfaceCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconChip}>
                <CalendarDays size={22} />
              </div>
              <h2>Your day. Start here.</h2>
            </div>

            <div className={styles.checkList}>
              {dayExpectations.slice(0, 4).map((item) => (
                <div className={styles.checkItem} key={item}>
                  <CheckCircle2 size={18} />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <Link className={styles.routeLink} href="/school-day">
              Go to the school day page
              <ArrowRight size={16} />
            </Link>
          </article>

          <article className={styles.calloutCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconChip}>
                <Heart size={22} />
              </div>
              <h2>It is okay to ask for help</h2>
            </div>

            <div className={styles.phraseList}>
              {supportPhrases.map((phrase) => (
                <div className={styles.phraseCard} key={phrase}>
                  &quot;{phrase}&quot;
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export function HelpPageContent() {
  const [selectedId, setSelectedId] = useState<string>(helperCards[0].id);
  const activeCard = useMemo(
    () => helperCards.find((card) => card.id === selectedId) ?? helperCards[0],
    [selectedId]
  );
  const ActiveIcon = activeCard.icon;

  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Get help now</p>
            <h1>What feels true right now?</h1>
          </div>
          <p className={styles.sectionText}>{helpPageIntro}</p>
        </div>

        <div className={styles.helpLayout}>
          <div className={styles.helpCardList}>
            {helperGroups.map((group) => (
              <section className={styles.helpCardList} key={group.title}>
                <p className={styles.eyebrow}>{group.title}</p>
                {group.ids.map((id) => {
                  const card = helperCards.find((item) => item.id === id);
                  if (!card) return null;

                  const Icon = card.icon;
                  const active = card.id === activeCard.id;

                  return (
                    <button
                      aria-pressed={active}
                      className={active ? styles.helpCardButtonActive : styles.helpCardButton}
                      key={card.id}
                      onClick={() => setSelectedId(card.id)}
                      type="button"
                    >
                      <div className={styles.helpButtonIcon}>
                        <Icon size={18} />
                      </div>
                      <span>{card.title}</span>
                    </button>
                  );
                })}
              </section>
            ))}
          </div>

          <article className={styles.helpPanel}>
            <div className={styles.helpPanelHeader}>
              <div className={styles.iconChip}>
                <ActiveIcon size={22} />
              </div>
              <h2>{activeCard.title}</h2>
            </div>

            <div className={styles.helpSteps}>
              {activeCard.steps.map((step) => (
                <div className={styles.helpStep} key={step}>
                  <ArrowRight size={16} />
                  <p>{step}</p>
                </div>
              ))}
            </div>

            {activeCard.supportRoute ? (
              <div className={styles.helpSupportRoute}>
                <strong>{activeCard.supportRoute.title}</strong>
                <p>{activeCard.supportRoute.detail}</p>
              </div>
            ) : null}

            {activeCard.extras ? (
              <div className={styles.helpExtras}>
                <strong>Extra support</strong>
                <ul>
                  {activeCard.extras.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p className={styles.helpNote}>{activeCard.note}</p>
          </article>
        </div>

        <div className={styles.supportColumns}>
          <article className={styles.surfaceCard}>
            <div className={styles.iconHeading}>
              <div className={styles.iconChipSoft}>
                <MessageCircle size={22} />
              </div>
              <h2>Who can help with what</h2>
            </div>

            <div className={styles.supportList}>
              <p className={styles.sectionText}>{supportContactsIntro}</p>
              {supportContacts.map((contact) => (
                <div className={styles.supportItem} key={contact.title}>
                  <CheckCircle2 size={18} />
                  <p>
                    <strong>{contact.title}:</strong> {contact.detail}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.softCard}>
            <div className={styles.iconHeading}>
              <div className={styles.iconChipSoft}>
                <Sparkles size={22} />
              </div>
              <h2>Is this more than a lesson problem?</h2>
            </div>

            <p className={styles.sectionText}>
              If the day feels emotionally heavy, or the problem keeps growing, get wellbeing
              support. You do not need to carry this on your own.
            </p>
            <div className={styles.phraseList}>
              {supportPhrases.map((phrase) => (
                <div className={styles.phraseCard} key={phrase}>
                  &quot;{phrase}&quot;
                </div>
              ))}
            </div>
            <Link className={styles.routeLink} href="/wellbeing-support">
              Get wellbeing support
              <ArrowRight size={16} />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

export function SchoolDayPageContent() {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>School day</p>
              <h1>Your school day online</h1>
            </div>
            <p className={styles.sectionText}>{schoolDayIntro}</p>
          </div>

          <div className={styles.twoColumn}>
            <article className={styles.surfaceCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconChip}>
                  <CalendarDays size={22} />
                </div>
                <h2>What to focus on today</h2>
              </div>

              <div className={styles.checkList}>
                {dayExpectations.map((item) => (
                  <div className={styles.checkItem} key={item}>
                    <CheckCircle2 size={18} />
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className={styles.notePanel}>Your teacher will be ready for you at the start of the lesson.</div>
            </article>

            <article className={styles.darkCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconChipDark}>
                  <Laptop size={22} />
                </div>
                <h2>How lessons work</h2>
              </div>

              <div className={styles.darkList}>
                {lessonRules.map((item) => (
                  <div className={styles.darkItem} key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.sectionSoft}>
        <div className={styles.shell}>
          <div className={styles.twoColumn}>
            <article className={styles.surfaceCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconChip}>
                  <CheckCircle2 size={22} />
                </div>
                <h2>How to take part online</h2>
              </div>

              <div className={styles.expectationGrid}>
                {onlineExpectations.map((item) => (
                  <div className={styles.expectationItem} key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.softCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconChipSoft}>
                  <TimerReset size={22} />
                </div>
                <h2>How to make the day easier</h2>
              </div>

              <div className={styles.blockList}>
                {makeItWork.map((block) => (
                  <div className={styles.miniCard} key={block.title}>
                    <h3>{block.title}</h3>
                    <p>{block.text}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className={styles.supportColumns}>
            <article className={styles.surfaceCard}>
              <div className={styles.iconHeading}>
                <div className={styles.iconChipSoft}>
                  <MessageCircle size={22} />
                </div>
                <h2>Who can help with what</h2>
              </div>

              <div className={styles.supportList}>
                <p className={styles.sectionText}>{supportContactsIntro}</p>
                {supportContacts.map((contact) => (
                  <div className={styles.supportItem} key={contact.title}>
                    <CheckCircle2 size={18} />
                    <p>
                      <strong>{contact.title}:</strong> {contact.detail}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.surfaceCard}>
              <div className={styles.iconHeading}>
                <div className={styles.iconChipSoft}>
                  <MessageCircle size={22} />
                </div>
                <h2>If you get stuck</h2>
              </div>

              <p className={styles.sectionText}>
                If you are stuck joining, starting, focusing, or understanding the work, go
                straight to the help page.
              </p>
              <Link className={styles.routeLink} href="/get-help-now">
                Get help now
                <ArrowRight size={16} />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export function WellbeingPageContent() {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Wellbeing & support</p>
              <h1>If things feel difficult</h1>
            </div>
            <p className={styles.sectionText}>{wellbeingIntro}</p>
          </div>

          <div className={styles.threeColumn}>
            <article className={styles.surfaceCard}>
              <div className={styles.iconHeading}>
                <div className={styles.iconChipSoft}>
                  <Sparkles size={22} />
                </div>
                <h2>Quick reset</h2>
              </div>

              <div className={styles.resetList}>
                {quickResetSteps.map((item) => (
                  <div className={styles.resetItem} key={item}>
                    <ArrowRight size={16} />
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className={styles.notePanel}>Even one small reset can help you rejoin the day.</div>
            </article>

            <article className={styles.surfaceCard}>
              <div className={styles.iconHeading}>
                <div className={styles.iconChipSoft}>
                  <Moon size={22} />
                </div>
                <h2>Looking after yourself</h2>
              </div>

              <div className={styles.supportList}>
                {wellbeingHabits.map((item) => (
                  <div className={styles.supportItem} key={item}>
                    <CheckCircle2 size={18} />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.surfaceCard}>
              <div className={styles.iconHeading}>
                <div className={styles.iconChipSoft}>
                  <Users size={22} />
                </div>
                <h2>Stay connected</h2>
              </div>

              <div className={styles.supportList}>
                {stayingConnectedTips.map((item) => (
                  <div className={styles.supportItem} key={item}>
                    <CheckCircle2 size={18} />
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className={styles.notePanel}>
                If you miss your friends or the day feels too much, connection still counts as
                support.
              </div>
            </article>
          </div>

          <div className={styles.supportColumns}>
            <article className={styles.surfaceCard}>
              <div className={styles.iconHeading}>
                <div className={styles.iconChipSoft}>
                  <Heart size={22} />
                </div>
                <h2>Talk to someone</h2>
              </div>

              <div className={styles.blockList}>
                {wellbeingContacts.map((contact) => (
                  <div className={styles.contactCard} key={contact.title}>
                    <h3>{contact.title}</h3>
                    <p>{contact.detail}</p>
                    {contact.email ? (
                      <a className={styles.contactLink} href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.softCard}>
              <div className={styles.iconHeading}>
                <div className={styles.iconChipSoft}>
                  <UserRound size={22} />
                </div>
                <h2>Use this page if</h2>
              </div>

              <div className={styles.supportList}>
                <div className={styles.supportItem}>
                  <CheckCircle2 size={18} />
                  <p>Use this page if stress, worry, low mood, or overwhelm are making the day harder.</p>
                </div>
              </div>
              <Link className={styles.routeLink} href="/get-help-now">
                Get help now
                <ArrowRight size={16} />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
