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
      "Keep your timetable next to your laptop.",
      "Set an alarm before each lesson.",
      "Check your next lesson before you log off.",
    ],
    note: "Make it easier for future you.",
    supportRoute: {
      title: "If you are already late",
      detail: "Join now. Then send a short email if you missed the instructions.",
    },
  },
  {
    id: "focus",
    title: "I can't focus",
    icon: CircleHelp,
    steps: [
      "Take one slow breath.",
      "Move your phone away.",
      "Close everything except the lesson.",
      "Choose the easiest part first.",
      "Do that part for 5 minutes.",
    ],
    note: "When your brain feels noisy, smaller is better.",
    supportRoute: {
      title: "If you still feel stuck",
      detail: "Tell your teacher: I am stuck getting started and need the first step made simpler.",
    },
  },
  {
    id: "eyes",
    title: "My eyes hurt",
    icon: Eye,
    steps: [
      "Every 20 minutes, look 20 metres away for 20 seconds.",
      "Lower your screen brightness.",
      "Stand up and stretch for a moment.",
      "Then come back and do one small task.",
    ],
    note: "A short screen break can help your eyes settle.",
  },
  {
    id: "reader",
    title: "I don't like reading on a screen",
    icon: Headphones,
    steps: [
      "Try listening instead of reading everything yourself.",
      "Use a read-aloud tool if the text feels hard to get through.",
      "On a Mac, press Command + F5 for VoiceOver.",
      "On Windows, press Ctrl + Windows key + Enter for Narrator.",
    ],
    note: "Listening can make long tasks feel easier.",
    extras: [
      "Mac: Command + F5 turns VoiceOver on or off.",
      "Windows: Ctrl + Windows key + Enter turns Narrator on or off.",
    ],
    supportRoute: {
      title: "If reading is still a barrier",
      detail: "Ask your teacher or Support for Learning to break the task into smaller parts or explain it in a different way.",
    },
  },
  {
    id: "sitstill",
    title: "I can't sit still",
    icon: StretchHorizontal,
    steps: [
      "Stand up and work for a bit if that helps.",
      "Stretch for 30 seconds.",
      "Move for 2 minutes by walking, shaking out your arms, or stretching again.",
      "Then come back and do one small task.",
    ],
    note: "Movement can help your brain reset.",
  },
  {
    id: "understand",
    title: "I don't understand",
    icon: BookOpen,
    steps: [
      "Read the question out loud.",
      "Look for one part that makes sense.",
      "Work out what the task wants from you.",
      "Do the easiest part first.",
    ],
    note: "You do not need to understand all of it before you begin.",
    supportRoute: {
      title: "You can say",
      detail: "I do not understand the first step. Can you explain it in a different way?",
    },
  },
  {
    id: "help",
    title: "I need help",
    icon: MessageCircle,
    steps: [
      "Tell one person today. You do not need to work this out on your own.",
      "Subject teacher: if you are stuck with a lesson or your work",
      "Form tutor: if you need help with your day at school",
      "Head of Year: if something feels serious or keeps happening",
      "Counsellor: if you feel overwhelmed, low, or anxious",
      "Support for Learning: if work feels hard to start, manage, or keep up with",
    ],
    note: "You only need to start with one person.",
  },
  {
    id: "sfl",
    title: "Support for Learning",
    icon: UserRound,
    steps: [
      "You can ask for help if work feels confusing.",
      "You can ask for help if tasks feel too big.",
      "You can ask for help if getting started is hard.",
      "You can ask for help if staying organised feels difficult.",
    ],
    note: "This support is here for students who need things broken down.",
    extras: [
      "Ask your teacher to connect you with Support for Learning.",
      "You can also email directly: f.nicconmara_jcd@gemsedu.com",
    ],
  },
  {
    id: "join",
    title: "I can't join a lesson",
    icon: PhoneOff,
    steps: [
      "Email your teacher as soon as you can.",
      "Send a short message, even if you cannot explain everything yet.",
      "Say what is stopping you from joining, if you know.",
      "You can explain more later.",
    ],
    note: "Let someone know, even if the problem is not fixed yet.",
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
