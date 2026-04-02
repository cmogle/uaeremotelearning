import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  BookOpen,
  CircleHelp,
  Eye,
  Headphones,
  Heart,
  Laptop,
  MessageCircle,
  Moon,
  PhoneOff,
  SmilePlus,
  StretchHorizontal,
  TimerReset,
  UserRound,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
  School,
  Sparkles,
  Bell,
  Users,
} from "lucide-react";

const helperCards = [
  {
    id: "time",
    title: "I miss the start of my lessons",
    icon: TimerReset,
    accent: "bg-indigo-50 text-indigo-800 border-indigo-200",
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
    title: "I can’t focus",
    icon: CircleHelp,
    accent: "bg-emerald-50 text-emerald-800 border-emerald-200",
    steps: [
      "Set a 5-minute timer.",
      "Put your phone away.",
      "Sit up and look at the screen.",
      "Close tabs you do not need.",
      "Try the Pomodoro method: https://pomofocus.io/",
      "Don’t multitask — keep one tab open.",
    ],
    note: "Just get through 5 minutes.",
  },
  {
    id: "overwhelmed",
    title: "I feel overwhelmed",
    icon: Heart,
    accent: "bg-rose-50 text-rose-800 border-rose-200",
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
    accent: "bg-sky-50 text-sky-800 border-sky-200",
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
    title: "I don’t like reading on a screen",
    icon: Headphones,
    accent: "bg-cyan-50 text-cyan-800 border-cyan-200",
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
    title: "I can’t sit still",
    icon: StretchHorizontal,
    accent: "bg-amber-50 text-amber-800 border-amber-200",
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
    title: "I don’t understand",
    icon: BookOpen,
    accent: "bg-violet-50 text-violet-800 border-violet-200",
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
    accent: "bg-teal-50 text-teal-800 border-teal-200",
    steps: [
      "Subject teacher → for your work",
      "Form tutor → for daily support",
      "Head of Year → if something is wrong",
      "Counsellor → if you feel stressed or overwhelmed",
      "Support for Learning → f.nicconmara_jcd@gemsedu.com",
    ],
    note: "You are not on your own.",
  },
  {
    id: "sfl",
    title: "Support for Learning",
    icon: UserRound,
    accent: "bg-emerald-50 text-emerald-800 border-emerald-200",
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
    title: "I can’t join a lesson",
    icon: PhoneOff,
    accent: "bg-orange-50 text-orange-800 border-orange-200",
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
    accent: "bg-pink-50 text-pink-800 border-pink-200",
    steps: [
      "Message a friend to check in.",
      "Arrange a quick video or voice call.",
      "Join group chats or study calls if you can.",
      "Arrange to see your friends if possible.",
      "Remember this is temporary — you will see your friends again.",
    ],
    note: "Staying connected helps you feel better.",
  },
  {
    id: "wellbeing",
    title: "Wellbeing & support",
    icon: SmilePlus,
    accent: "bg-blue-50 text-blue-800 border-blue-200",
    steps: [
      "Counselling Team: counselling_jcd@gemsedu.com",
      "Nicola Kesterton (Years 7–9): n.kesterton_jcd@gemsedu.com",
      "Krupa Sam (Years 10–13): k.sam_jcd@gemsedu.com",
      
    ],
    note: "Doing your best is enough.",
    extras: [
      "Good Vibes Challenge – Years 7–9",
      "Good Vibes Challenge – Years 10–13",
      "Mindfulness video: breathing",
      "Mindfulness video: stretching",
    ],
  },
];

const supportPhrases = [
  "I don’t understand step 1",
  "I’m stuck starting",
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
  "Follow the day’s timetable",
];

const wellbeing = [
  "Get enough sleep",
  "Eat regularly",
  "Drink water",
  "Keep your phone away when you are working",
  "Take time away from the screen",
  "Do something calming after lessons",
];

export default function DistanceLearningHub() {
  const [selected, setSelected] = useState(helperCards[0].id);

  const activeCard = useMemo(
    () => helperCards.find((card) => card.id === selected) || helperCards[0],
    [selected]
  );

  const ActiveIcon = activeCard.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Jumeirah College
            </p>
            <h1 className="text-lg font-bold sm:text-2xl">Distance Learning Hub</h1>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#today" className="hover:text-emerald-700">Your day</a>
            <a href="#help" className="hover:text-emerald-700">Support for Learning</a>
            <a href="#work" className="hover:text-emerald-700">Make it work</a>
            <a href="#care" className="hover:text-emerald-700">Wellbeing</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-50">
                <School className="h-4 w-4" /> Start here
              </div>
              <h2 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                This is your school day — we’re just doing it online.
              </h2>
              <p className="mt-5 max-w-2xl text-base text-emerald-50 sm:text-lg">
                You do not need to do this perfectly. You do need to log in, keep going, and ask for help when you need it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Start small",
                  "Do one thing",
                  "Ask early",
                  "Keep your camera on",
                ].map((word) => (
                  <span
                    key={word}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white"
                  >
                    {word}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#help"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-emerald-900 shadow-lg transition hover:-translate-y-0.5"
                >
                  Get help now <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#today"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  See your day
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[28px] bg-white p-6 text-slate-900 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Start work now</h3>
                  <p className="text-sm text-slate-600">Just 5 minutes</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Start your online lesson",
                  "Write the date and title",
                  "Follow the teacher's instructions",
                ].map((step, index) => (
                  <div key={step} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium sm:text-base">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
                You do not need to feel ready. Just begin.
              </div>
            </motion.div>
          </div>
        </section>

        <section id="help" className="bg-slate-100 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
                  Support for Learning
                </p>
                <h3 className="mt-2 text-3xl font-bold sm:text-4xl">What do you need right now?</h3>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                Click one. Do the steps. Come back.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {helperCards.map((card) => {
                  const Icon = card.icon;
                  const isActive = selected === card.id;
                  return (
                    <button
                      key={card.id}
                      onClick={() => setSelected(card.id)}
                      className={`rounded-[24px] border p-5 text-left transition ${
                        isActive
                          ? "border-emerald-500 bg-white shadow-md"
                          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`rounded-2xl border p-3 ${card.accent}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-base font-semibold">{card.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-2xl border p-3 ${activeCard.accent}`}>
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <h4 className="text-2xl font-bold">{activeCard.title}</h4>
                </div>

                <div className="mt-6 space-y-3">
                  {activeCard.steps.map((step) => (
                    <div key={step} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                      <p className="text-sm sm:text-base">{step}</p>
                    </div>
                  ))}
                </div>

                {activeCard.extras && (
                  <div className="mt-6 rounded-2xl bg-blue-50 p-4">
                    <p className="text-sm font-semibold text-blue-900">Extra support</p>
                    <ul className="mt-3 space-y-2 text-sm text-blue-900">
                      {activeCard.extras.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-medium text-emerald-800">{activeCard.note}</p>
                  {activeCard.linkLabel && (
                    <button className="rounded-2xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
                      {activeCard.linkLabel}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="today" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Your day — read this first</h3>
              </div>
              <div className="mt-6 grid gap-3">
                {dayExpectations.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                    <p className="text-sm font-medium sm:text-base">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
                Your teacher will be ready for you at the start of the lesson. If you cannot join live, email your teacher and copy in your Head of Year.
              </div>
            </div>

            <div className="rounded-[28px] bg-slate-900 p-6 text-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3 text-emerald-300">
                  <Laptop className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">How lessons work</h3>
              </div>
              <div className="mt-6 grid gap-3">
                {lessonRules.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/5 p-4 text-sm text-slate-100 sm:text-base">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Online expectations</h3>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Join lessons on time",
                  "Follow instructions",
                  "Keep your camera on when asked",
                  "Behave respectfully",
                  "Meet deadlines",
                  "Be kind to others and yourself",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-medium sm:text-base">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] bg-emerald-50 p-6 shadow-sm ring-1 ring-emerald-100">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white p-3 text-emerald-700 shadow-sm">
                  <UserRound className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-950">Need help? Say this</h3>
              </div>
              <div className="mt-6 space-y-3">
                {supportPhrases.map((phrase) => (
                  <div key={phrase} className="rounded-2xl bg-white p-4 text-sm font-medium text-slate-800 shadow-sm sm:text-base">
                    “{phrase}”
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-[28px] bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white p-3 text-emerald-700 shadow-sm">
                    <TimerReset className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">How to make this work</h3>
                </div>
                <div className="mt-6 space-y-5">
                  {[
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
                  ].map((block) => (
                    <div key={block.title} className="rounded-2xl bg-white p-4 shadow-sm">
                      <h4 className="font-semibold">{block.title}</h4>
                      <p className="mt-2 text-sm text-slate-700 sm:text-base">{block.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div id="care" className="rounded-[28px] bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-3 text-emerald-300">
                    <Moon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Looking after yourself</h3>
                </div>
                <div className="mt-6 grid gap-3">
                  {wellbeing.map((item) => (
                    <div key={item} className="rounded-2xl bg-white/5 p-4 text-sm text-slate-100 sm:text-base">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-slate-100 sm:text-base">
                  <p className="font-semibold text-white">If you feel stressed or anxious</p>
                  <p className="mt-2">
                    Take a slow breath in. Breathe out slowly. Notice 5 things you can see. Do one small next step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="wellbeing-page" className="bg-blue-50 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-900">Wellbeing & Support</h2>
              <p className="mt-3 text-blue-800">If things feel difficult, you are not on your own.</p>
            </div>

            <div className="mt-10 space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Talk to someone</h3>
                <p className="mt-3 text-sm text-slate-700">
                  Counselling Team: counselling_jcd@gemsedu.com
                </p>
                <p className="text-sm text-slate-700">
                  Nicola Kesterton (Y7–9): n.kesterton_jcd@gemsedu.com
                </p>
                <p className="text-sm text-slate-700">
                  Krupa Sam (Y10–13): k.sam_jcd@gemsedu.com
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Quick reset</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>Take a slow breath in</li>
                  <li>Breathe out slowly</li>
                  <li>Drop your shoulders</li>
                  <li>Focus on one small next step</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Good Vibes Challenge</h3>
                <p className="mt-2 text-sm text-slate-700">Years 7–9 and Years 10–13 Padlet links can be added here.</p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Mindfulness videos</h3>
                <div className="mt-3 space-y-3 text-sm text-slate-700">
                  <a
                    href="https://app.screencastify.com/watch/eurhZHDmVrzlYfsJbXxO"
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl bg-slate-50 p-3 hover:bg-slate-100"
                  >
                    👉 Breathing (Mindfulness)
                  </a>
                  <a
                    href="https://app.screencastify.com/watch/1zRaN49XkE7vgWrzD2f7"
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl bg-slate-50 p-3 hover:bg-slate-100"
                  >
                    👉 Stretching (Reset your body)
                  </a>
                  <p className="text-xs text-slate-600">
                    👉 Try one now. Even 2 minutes helps.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Support for Learning</h3>
                <p className="mt-2 text-sm text-slate-700">
                  If you are finding learning difficult, you can get extra support.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>Help to understand your work</li>
                  <li>Support to break tasks down</li>
                  <li>Help to stay organised</li>
                  <li>Support to get started</li>
                </ul>
                <p className="mt-3 text-sm text-slate-700">
                  👉 Speak to your teacher or tutor to access Support for Learning.
                <br />
                👉 Or email: f.nicconmara_jcd@gemsedu.com
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Final message</h3>
                <p className="mt-2 text-sm text-slate-700">
                  If you are finding things hard, that is okay. Talk to someone, take things one step at a time, and remember — doing your best is enough.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h3 className="text-xl font-bold">You do not need to be perfect.</h3>
            <p className="mt-1 text-slate-600">
              You just need to log in, start, keep going, and ask for help.
            </p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
            Weekly bulletin and live school links can be added to the buttons above.
          </div>
        </div>
      </footer>
    </div>
  );
}
