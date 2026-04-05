"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  Eye,
  Headphones,
  Heart,
  Laptop,
  MessageCircle,
  Moon,
  PhoneOff,
  School,
  SmilePlus,
  Sparkles,
  StretchHorizontal,
  TimerReset,
  UserRound,
  Users,
} from "lucide-react";

import styles from "./original-content-preview.module.css";

type HelperCard = {
  id: string;
  title: string;
  icon: typeof TimerReset;
  steps: string[];
  note: string;
  extras?: string[];
};

const helperCards: HelperCard[] = [
  {
    id: "time",
    title: "I miss the start of my lessons",
    icon: TimerReset,
    steps: [
      "Set an alarm 1 minute before each lesson starts.",
      "Print or write out your timetable.",
      "Keep your timetable beside your laptop.",
      "Check what lesson is next before finishing the current one.",
      "Add your timetable to Google Calendar and set a reminder 1 minute before each lesson.",
    ],
    note: "Use reminders to stay on track.",
  },
  {
    id: "focus",
    title: "I can't focus",
    icon: CircleHelp,
    steps: [
      "Set a 5-minute timer.",
      "Put your phone away.",
      "Sit up and look at the screen.",
      "Close tabs you do not need.",
      "Try the Pomodoro method: https://pomofocus.io/",
      "Don't multitask. Keep one tab open.",
    ],
    note: "Just get through 5 minutes.",
  },
  {
    id: "overwhelmed",
    title: "I feel overwhelmed",
    icon: Heart,
    steps: [
      "Pick one task.",
      "Ignore everything else for now.",
      "Work for 5 minutes only.",
      "Write down what comes next.",
    ],
    note: "One thing is enough.",
  },
  {
    id: "eyes",
    title: "My eyes hurt",
    icon: Eye,
    steps: [
      "Every 20 minutes, look 20 metres away for 20 seconds.",
      "Lower your screen brightness.",
      "Blink slowly.",
      "Stand up for a moment.",
    ],
    note: "Then come back and do one small task.",
  },
  {
    id: "reader",
    title: "I don't like reading on a screen",
    icon: Headphones,
    steps: [
      "Try listening instead of reading everything yourself.",
      "On a Mac, turn on VoiceOver by pressing Command + F5.",
      "On a Windows PC, turn on Narrator by pressing Ctrl + Windows key + Enter.",
      "Use it to hear text read aloud and follow along more easily.",
    ],
    note: "Listening can make long tasks feel easier.",
    extras: [
      "Mac: Command + F5 = VoiceOver on or off",
      "Windows: Ctrl + Windows key + Enter = Narrator on or off",
    ],
  },
  {
    id: "sitstill",
    title: "I can't sit still",
    icon: StretchHorizontal,
    steps: [
      "Stand up and work.",
      "Stretch for 30 seconds.",
      "Move for 2 minutes.",
      "Come back and do one task.",
      "Be sure to keep moving and exercising every day.",
    ],
    note: "Movement can help you reset your attention.",
  },
  {
    id: "understand",
    title: "I don't understand",
    icon: BookOpen,
    steps: [
      "Read the question out loud.",
      "Find one word you recognise.",
      "Underline what the task is asking.",
      "Start anywhere.",
    ],
    note: "Asking early is the best strategy.",
  },
  {
    id: "help",
    title: "I need help",
    icon: MessageCircle,
    steps: [
      "Subject teacher -> for your work",
      "Form tutor -> for daily support",
      "Head of Year -> if something is wrong",
      "Counsellor -> if you feel stressed or overwhelmed",
      "Support for Learning -> f.nicconmara_jcd@gemsedu.com",
    ],
    note: "You are not on your own.",
  },
  {
    id: "sfl",
    title: "Support for Learning",
    icon: UserRound,
    steps: [
      "Get help to understand your work",
      "Break tasks into smaller steps",
      "Support to stay organised",
      "Help to get started and keep going",
    ],
    note: "If you need extra support, reach out.",
    extras: [
      "Ask your teacher to connect you with Support for Learning",
      "Email the SfL team if you are struggling",
    ],
  },
  {
    id: "join",
    title: "I can't join a lesson",
    icon: PhoneOff,
    steps: [
      "Email your teacher straight away.",
      "Copy in your Head of Year.",
      "Do not disappear.",
      "Let us know what is wrong.",
    ],
    note: "Ask for help as soon as you can.",
  },
  {
    id: "friends",
    title: "I miss my friends",
    icon: Users,
    steps: [
      "Message a friend to check in.",
      "Arrange a quick video or voice call.",
      "Join group chats or study calls if you can.",
      "Arrange to see your friends if possible.",
      "Remember this is temporary. You will see your friends again.",
    ],
    note: "Staying connected helps you feel better.",
  },
  {
    id: "wellbeing",
    title: "Wellbeing & support",
    icon: SmilePlus,
    steps: [
      "Counselling Team: counselling_jcd@gemsedu.com",
      "Nicola Kesterton (Years 7-9): n.kesterton_jcd@gemsedu.com",
      "Krupa Sam (Years 10-13): k.sam_jcd@gemsedu.com",
    ],
    note: "Doing your best is enough.",
    extras: [
      "Good Vibes Challenge - Years 7-9",
      "Good Vibes Challenge - Years 10-13",
      "Mindfulness video: breathing",
      "Mindfulness video: stretching",
    ],
  },
];

const supportPhrases = [
  "I don't understand step 1",
  "I'm stuck starting",
  "Can you help me?",
  "Can I talk to someone?",
];

const dayExpectations = [
  "Join every lesson live and on time",
  "Attend form time and assemblies",
  "Check Google Classroom",
  "Complete your work and meet deadlines",
  "Complete your Class Charts wellbeing check-in every day",
  "Attend key assemblies and updates",
];

const lessonRules = [
  "Your work will be on Google Classroom",
  "Your teacher will support you during the lesson",
  "Teachers may use Google Classroom, Google Meet, email, or chat",
  "Check instructions carefully",
  "Follow the day's timetable",
];

const wellbeing = [
  "Get enough sleep",
  "Eat regularly",
  "Drink water",
  "Keep your phone away when you are working",
  "Take time away from the screen",
  "Do something calming after lessons",
];

const makeItWork = [
  {
    title: "Set yourself up",
    text: "Create a study space where you can work. Keep what you need nearby. Keep distractions away.",
  },
  {
    title: "Use your timetable",
    text: "Follow the school timings. Know what lesson is next. Use alarms if that helps.",
  },
  {
    title: "Keep it small",
    text: "Do one thing at a time. Write instructions down. Start before you feel ready.",
  },
  {
    title: "Ask early",
    text: "Do not wait until everything builds up. Ask questions during the lesson. Reach out when you need support.",
  },
];

export function OriginalContentPreview() {
  const [selectedId, setSelectedId] = useState<string>(helperCards[0].id);

  const activeCard = useMemo(
    () => helperCards.find((card) => card.id === selectedId) ?? helperCards[0],
    [selectedId]
  );

  const ActiveIcon = activeCard.icon;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <div>
            <p className={styles.kicker}>Jumeirah College</p>
            <h1 className={styles.headerTitle}>Distance Learning Hub</h1>
          </div>
          <nav className={styles.nav}>
            <a href="#today">Your day</a>
            <a href="#help">Support for Learning</a>
            <a href="#work">Make it work</a>
            <a href="#care">Wellbeing</a>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div>
              <div className={styles.startPill}>
                <School size={16} />
                <span>Start here</span>
              </div>
              <h2 className={styles.heroTitle}>This is your school day. We&apos;re just doing it online.</h2>
              <p className={styles.heroCopy}>
                You do not need to do this perfectly. You do need to log in, keep going, and ask
                for help when you need it.
              </p>
              <div className={styles.badges}>
                {["Start small", "Do one thing", "Ask early", "Keep your camera on"].map((word) => (
                  <span key={word} className={styles.badge}>
                    {word}
                  </span>
                ))}
              </div>
              <div className={styles.ctas}>
                <a className={styles.primaryCta} href="#help">
                  Get help now
                  <ArrowRight size={16} />
                </a>
                <a className={styles.secondaryCta} href="#today">
                  See your day
                </a>
              </div>
            </div>

            <aside className={styles.heroCard}>
              <div className={styles.heroCardHeader}>
                <div className={styles.heroCardIcon}>
                  <Sparkles size={22} />
                </div>
                <div>
                  <h3>Start work now</h3>
                  <p>Just 5 minutes</p>
                </div>
              </div>

              <div className={styles.stepList}>
                {[
                  "Start your online lesson",
                  "Write the date and title",
                  "Follow the teacher's instructions",
                ].map((step, index) => (
                  <div key={step} className={styles.numberedStep}>
                    <div className={styles.stepNumber}>{index + 1}</div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

              <div className={styles.heroNote}>You do not need to feel ready. Just begin.</div>
            </aside>
          </div>
        </section>

        <section className={styles.sectionAlt} id="help">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Support for Learning</p>
                <h3>What do you need right now?</h3>
              </div>
              <p>Click one. Do the steps. Come back.</p>
            </div>

            <div className={styles.supportGrid}>
              <div className={styles.cardChooser}>
                {helperCards.map((card) => {
                  const Icon = card.icon;
                  const isActive = card.id === activeCard.id;

                  return (
                    <button
                      className={isActive ? styles.helperButtonActive : styles.helperButton}
                      key={card.id}
                      onClick={() => setSelectedId(card.id)}
                      type="button"
                    >
                      <div className={styles.helperIconWrap}>
                        <Icon size={18} />
                      </div>
                      <span>{card.title}</span>
                    </button>
                  );
                })}
              </div>

              <article className={styles.helperPanel}>
                <div className={styles.helperPanelHeader}>
                  <div className={styles.activeIcon}>
                    <ActiveIcon size={22} />
                  </div>
                  <h4>{activeCard.title}</h4>
                </div>

                <div className={styles.arrowList}>
                  {activeCard.steps.map((step) => (
                    <div className={styles.arrowItem} key={step}>
                      <ArrowRight size={16} />
                      <p>{step}</p>
                    </div>
                  ))}
                </div>

                {activeCard.extras ? (
                  <div className={styles.extraBox}>
                    <p>Extra support</p>
                    <ul>
                      {activeCard.extras.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <p className={styles.helperNote}>{activeCard.note}</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section} id="today">
          <div className={`${styles.shell} ${styles.twoColumn}`}>
            <article className={styles.surfaceCard}>
              <div className={styles.sectionCardHeader}>
                <div className={styles.sectionIcon}>
                  <CalendarDays size={22} />
                </div>
                <h3>Your day. Read this first.</h3>
              </div>

              <div className={styles.checkList}>
                {dayExpectations.map((item) => (
                  <div className={styles.checkItem} key={item}>
                    <CheckCircle2 size={18} />
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className={styles.inlineCallout}>
                Your teacher will be ready for you at the start of the lesson. If you cannot join
                live, email your teacher and copy in your Head of Year.
              </div>
            </article>

            <article className={styles.darkCard}>
              <div className={styles.sectionCardHeader}>
                <div className={styles.darkIcon}>
                  <Laptop size={22} />
                </div>
                <h3>How lessons work</h3>
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
        </section>

        <section className={styles.section}>
          <div className={`${styles.shell} ${styles.twoColumn}`}>
            <article className={styles.surfaceCard}>
              <div className={styles.sectionCardHeader}>
                <div className={styles.sectionIcon}>
                  <ClipboardList size={22} />
                </div>
                <h3>Online expectations</h3>
              </div>

              <div className={styles.expectationGrid}>
                {[
                  "Join lessons on time",
                  "Follow instructions",
                  "Keep your camera on when asked",
                  "Behave respectfully",
                  "Meet deadlines",
                  "Be kind to others and yourself",
                ].map((item) => (
                  <div className={styles.expectationItem} key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.phraseCard}>
              <div className={styles.sectionCardHeader}>
                <div className={styles.sectionIconLight}>
                  <UserRound size={22} />
                </div>
                <h3>Need help? Say this</h3>
              </div>

              <div className={styles.phraseList}>
                {supportPhrases.map((phrase) => (
                  <div className={styles.phraseItem} key={phrase}>
                    &quot;{phrase}&quot;
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section} id="work">
          <div className={`${styles.shell} ${styles.twoColumn}`}>
            <article className={styles.softCard}>
              <div className={styles.sectionCardHeader}>
                <div className={styles.sectionIconLight}>
                  <TimerReset size={22} />
                </div>
                <h3>How to make this work</h3>
              </div>

              <div className={styles.blockList}>
                {makeItWork.map((block) => (
                  <div className={styles.blockItem} key={block.title}>
                    <h4>{block.title}</h4>
                    <p>{block.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.darkCard} id="care">
              <div className={styles.sectionCardHeader}>
                <div className={styles.darkIcon}>
                  <Moon size={22} />
                </div>
                <h3>Looking after yourself</h3>
              </div>

              <div className={styles.darkList}>
                {wellbeing.map((item) => (
                  <div className={styles.darkItem} key={item}>
                    {item}
                  </div>
                ))}
              </div>

              <div className={styles.darkCallout}>
                <strong>If you feel stressed or anxious</strong>
                <p>
                  Take a slow breath in. Breathe out slowly. Notice 5 things you can see. Do one
                  small next step.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerShell}`}>
          <div>
            <h3>You do not need to be perfect.</h3>
            <p>You just need to log in, start, keep going, and ask for help.</p>
          </div>
          <div className={styles.footerNote}>
            This local preview restores the original tone and content direction as a reference point.
          </div>
        </div>
      </footer>
    </div>
  );
}
