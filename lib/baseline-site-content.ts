import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  Eye,
  Headphones,
  Heart,
  Laptop,
  MessageCircle,
  Moon,
  PhoneOff,
  SmilePlus,
  Sparkles,
  StretchHorizontal,
  TimerReset,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
};

export type RouteCard = {
  href: string;
  title: string;
  description: string;
};

export type HelperCard = {
  id: string;
  title: string;
  icon: LucideIcon;
  steps: string[];
  note: string;
  extras?: string[];
  supportRoute?: {
    title: string;
    detail: string;
  };
};

export type ContactCard = {
  title: string;
  detail: string;
  email?: string;
};

export const siteTitle = "Jumeirah College Distance Learning Hub";

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/get-help-now", label: "Get help now" },
  { href: "/school-day", label: "School day" },
  { href: "/wellbeing-support", label: "Wellbeing & support" },
];

export const routeCards: RouteCard[] = [
  {
    href: "/school-day",
    title: "I need to know what today should look like",
    description: "See what the day looks like, how lessons work, and what matters most.",
  },
  {
    href: "/get-help-now",
    title: "Something is stopping me from working right now",
    description: "Get practical help with joining lessons, starting work, staying focused, or asking for help.",
  },
  {
    href: "/wellbeing-support",
    title: "I feel stressed, overwhelmed, or need support",
    description: "Go straight to reset steps, support, and the right person to talk to.",
  },
];

export const quickStartSteps = [
  "Start your online lesson.",
  "Write the date and title.",
  "Follow the teacher's instructions.",
];

export const helperCards: HelperCard[] = [
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
    supportRoute: {
      title: "If you are already late",
      detail: "Join now, then email your teacher if you have missed instructions.",
    },
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
      "Try the Pomodoro method if that helps.",
      "Don't multitask. Keep one tab open.",
    ],
    note: "Just get through 5 minutes.",
    supportRoute: {
      title: "If you still cannot start",
      detail: "Tell your teacher you are stuck starting and need the first step made clearer.",
    },
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
      "Mac: Command + F5 turns VoiceOver on or off.",
      "Windows: Ctrl + Windows key + Enter turns Narrator on or off.",
    ],
    supportRoute: {
      title: "If reading is still a barrier",
      detail: "Ask your teacher or Support for Learning to chunk the task or explain it in a different way.",
    },
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
      "Keep moving and exercising every day.",
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
    supportRoute: {
      title: "Ask this",
      detail: "I don't understand the first step. Can you explain it another way?",
    },
  },
  {
    id: "help",
    title: "I need help",
    icon: MessageCircle,
    steps: [
      "Subject teacher: for your work",
      "Form tutor: for daily support",
      "Head of Year: if something is wrong",
      "Counsellor: if you feel stressed or overwhelmed",
      "Support for Learning: f.nicconmara_jcd@gemsedu.com",
    ],
    note: "You are not on your own.",
  },
  {
    id: "sfl",
    title: "Support for Learning",
    icon: UserRound,
    steps: [
      "Get help to understand your work.",
      "Break tasks into smaller steps.",
      "Get support to stay organised.",
      "Get help to start and keep going.",
    ],
    note: "If you need extra support, reach out.",
    extras: [
      "Ask your teacher to connect you with Support for Learning.",
      "Email the team directly if you are struggling: f.nicconmara_jcd@gemsedu.com",
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
];

export const supportPhrases = [
  "I don't understand step 1.",
  "I'm stuck starting.",
  "Can you help me?",
  "Can I talk to someone?",
];

export const dayExpectations = [
  "Join every lesson live and on time.",
  "Attend form time and assemblies.",
  "Check Google Classroom.",
  "Complete your work and meet deadlines.",
  "Complete your Class Charts wellbeing check-in every day.",
  "Attend key assemblies and updates.",
];

export const lessonRules = [
  "Your work will be on Google Classroom.",
  "Your teacher will support you during the lesson.",
  "Teachers may use Google Classroom, Google Meet, email, or chat.",
  "Check instructions carefully.",
  "Follow the day's timetable.",
];

export const onlineExpectations = [
  "Join lessons on time.",
  "Follow instructions.",
  "Keep your camera on when asked.",
  "Behave respectfully.",
  "Meet deadlines.",
  "Be kind to others and yourself.",
];

export const makeItWork = [
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

export const wellbeingHabits = [
  "Get enough sleep.",
  "Eat regularly.",
  "Drink water.",
  "Keep your phone away when you are working.",
  "Take time away from the screen.",
  "Do something calming after lessons.",
];

export const quickResetSteps = [
  "Take a slow breath in.",
  "Breathe out slowly.",
  "Drop your shoulders.",
  "Focus on one small next step.",
];

export const supportContacts: ContactCard[] = [
  {
    title: "Subject teacher",
    detail: "Help with the lesson, the task, or missing work.",
  },
  {
    title: "Your form tutor",
    detail: "Daily support, check-ins, or when the day is getting harder to manage.",
  },
  {
    title: "Your Head of Year",
    detail: "When something is wrong, you cannot join, or the problem is affecting the school day more widely.",
  },
  {
    title: "The Support for Learning team",
    detail: "Support with getting started, staying organised, and making the work feel more manageable.",
    email: "f.nicconmara_jcd@gemsedu.com",
  },
];

export const wellbeingContacts: ContactCard[] = [
  {
    title: "Counselling Team",
    detail: "Talk to someone if stress, worry, or low mood is making things feel difficult.",
    email: "counselling_jcd@gemsedu.com",
  },
  {
    title: "Nicola Kesterton (Years 7-9)",
    detail: "Wellbeing support for students in Years 7 to 9.",
    email: "n.kesterton_jcd@gemsedu.com",
  },
  {
    title: "Krupa Sam (Years 10-13)",
    detail: "Wellbeing support for students in Years 10 to 13.",
    email: "k.sam_jcd@gemsedu.com",
  },
];

export const supportForLearningBullets = [
  "Help to understand your work.",
  "Support to break tasks down.",
  "Help to stay organised.",
  "Support to get started.",
];

export const stayingConnectedTips = [
  "Message a friend to check in.",
  "Arrange a quick video or voice call.",
  "Join group chats or study calls if you can.",
  "Remember this is temporary. You will see your friends again.",
];

export const helpPageIntro =
  "Pick the closest match. Try the steps. If it doesn't feel better, ask for help.";

export const schoolDayIntro =
  "This is your school day. We are just doing it online. Keep it simple, follow the timetable, and ask early when something goes wrong.";

export const wellbeingIntro =
  "If things feel difficult, you are not on your own. Start with one small reset, then use the right support route.";

export const homePageSummary =
  "You do not need to do this perfectly. You do need to log in, keep going, and ask for help when you need it.";

export const supportContactsIntro =
  "Different people can help with different problems.";
