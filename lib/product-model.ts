import { SectionKey, SiteKey } from "@/lib/site-schema";

export type ArchitectureSection = {
  id: SectionKey;
  title: string;
  audience: string;
  purpose: string;
  requiredBlocks: string[];
  optionalBlocks: string[];
};

export type EditorialPrinciple = {
  title: string;
  description: string;
};

export type ReviewStage = {
  id: string;
  title: string;
  output: string;
};

export type SectionReviewGuide = {
  id: string;
  title: string;
  readerState: string;
  mustDo: string[];
  reviewQuestions: string[];
};

export type EditorCapability = {
  title: string;
  description: string;
};

export const architectureSections: ArchitectureSection[] = [
  {
    id: "hero",
    title: "Hero / first arrival",
    audience: "Students first, adults second",
    purpose: "Orient the learner fast, reduce panic, and point them toward the most relevant route.",
    requiredBlocks: ["school identity", "main message", "quick-start steps", "primary call to action"],
    optionalBlocks: ["guiding principle badges", "secondary adult route"],
  },
  {
    id: "journeys",
    title: "Route selection",
    audience: "Students and supporting adults",
    purpose: "Offer a small number of clear routes so users can choose by need rather than scan the whole page.",
    requiredBlocks: ["3-5 route cards", "plain-language route labels", "clear jump targets"],
    optionalBlocks: ["audience labels", "route descriptions"],
  },
  {
    id: "support",
    title: "Immediate support / common blockers",
    audience: "Students in the moment",
    purpose: "Give concrete help for the common problems that stop progress right now.",
    requiredBlocks: ["support cards", "step-by-step actions", "short note or reassurance"],
    optionalBlocks: ["extra tips", "scripts", "related contacts"],
  },
  {
    id: "today",
    title: "School-day expectations",
    audience: "Students",
    purpose: "Show what matters today without turning the page into a wall of instructions.",
    requiredBlocks: ["day expectations", "lesson rules", "shared expectations"],
    optionalBlocks: ["phrases to use", "orientation notes"],
  },
  {
    id: "educator",
    title: "Adult / educator guidance",
    audience: "Teachers, tutors, families, support adults",
    purpose: "Help adults remove barriers and support re-entry without changing the student-first structure.",
    requiredBlocks: ["adult summary", "educator guidance cards", "support contacts"],
    optionalBlocks: ["accessibility patterns", "operational notes"],
  },
  {
    id: "wellbeing",
    title: "Wellbeing and human support",
    audience: "Students first, adults second",
    purpose: "Keep regulation, emotional support, and trusted human contact close by when the day feels too hard.",
    requiredBlocks: ["reset steps", "support contacts", "wellbeing resources"],
    optionalBlocks: ["helpful habits", "connection reminders"],
  },
  {
    id: "footer",
    title: "Re-entry message",
    audience: "Everyone",
    purpose: "End with a simple, reassuring message that makes rejoining feel possible.",
    requiredBlocks: ["closing message", "one practical next step"],
    optionalBlocks: ["adult note"],
  },
];

export const editorialPrinciples: EditorialPrinciple[] = [
  {
    title: "Direct but calm",
    description: "Use short sentences and clear actions, without sounding sharp or punitive.",
  },
  {
    title: "Student-safe",
    description: "Assume the reader may be stressed, dysregulated, tired, or ashamed. Lower pressure rather than increase it.",
  },
  {
    title: "Practical first",
    description: "Lead with what to do next, then add reassurance or explanation only where it helps action.",
  },
  {
    title: "Low reading load",
    description: "Prefer one action per line, familiar words, and visible structure over dense paragraphs.",
  },
  {
    title: "Emotionally containing",
    description: "Offer comfort without sounding clinical, generic, or patronising.",
  },
];

export const editorialReviewFlow: ReviewStage[] = [
  { id: "hero", title: "Hero / first arrival experience", output: "Purpose, key message, and first action" },
  { id: "routes", title: "Student route selection", output: "Which routes exist and why" },
  { id: "support", title: "Immediate support / common blockers", output: "Practical actions and scripts" },
  { id: "day", title: "School-day expectations", output: "Clear expectations with manageable load" },
  { id: "wellbeing", title: "Wellbeing and human support", output: "Contacts, reset support, emotional safety" },
  { id: "adult", title: "Adult / educator guidance", output: "Adult-only support patterns" },
  { id: "footer", title: "Footer / re-entry message", output: "Closing reassurance and next-step cue" },
];

export const sectionReviewGuides: SectionReviewGuide[] = [
  {
    id: "hero",
    title: "Hero review guide",
    readerState: "The reader has just arrived and may be stressed, confused, or scanning quickly for safety and direction.",
    mustDo: [
      "Make the first 10 seconds feel clear and calm.",
      "Explain what this page is for in simple language.",
      "Point to the most useful next route without overload.",
    ],
    reviewQuestions: [
      "Does this feel recognisable as the right opening experience?",
      "Would a student know what to do next without reading everything?",
      "Is the tone calm, direct, and low-pressure?",
    ],
  },
  {
    id: "routes",
    title: "Route selection review guide",
    readerState: "The reader knows they need help but may not know which part of the page to trust first.",
    mustDo: [
      "Offer a small number of clear routes.",
      "Differentiate student, wellbeing, and adult paths appropriately.",
      "Reduce scanning effort by making choices feel obvious.",
    ],
    reviewQuestions: [
      "Are these the right top-level routes?",
      "Is anything important missing or duplicated?",
      "Would a student instantly know which route feels closest to their problem?",
    ],
  },
  {
    id: "support",
    title: "Immediate support review guide",
    readerState: "The reader is likely stuck in the moment and needs practical help, not theory.",
    mustDo: [
      "Name common blockers in student language.",
      "Give short, usable next steps.",
      "Keep human support routes visible when self-help is not enough.",
    ],
    reviewQuestions: [
      "Are these the most valuable blockers to cover?",
      "Do the actions feel doable right now?",
      "Should anything be rewritten, removed, or moved to another section?",
    ],
  },
  {
    id: "day",
    title: "School-day review guide",
    readerState: "The reader needs orientation and expectations, but too much detail will feel heavy.",
    mustDo: [
      "Show what matters today without sounding punitive.",
      "Keep rules clear and manageable.",
      "Support re-entry if the student is late, lost, or behind.",
    ],
    reviewQuestions: [
      "Does this section clarify the day without becoming a wall of instructions?",
      "Are expectations realistic in tone and load?",
      "Is anything here better placed in support or adult guidance?",
    ],
  },
  {
    id: "wellbeing",
    title: "Wellbeing review guide",
    readerState: "The reader may be emotionally overloaded and needs calm, comfort, or a person.",
    mustDo: [
      "Offer emotional safety and simple reset options.",
      "Keep trusted contacts visible.",
      "Make rejoining feel possible after regulation.",
    ],
    reviewQuestions: [
      "Does this feel humane and genuinely supportive?",
      "Are the contacts and resources clear enough to use quickly?",
      "Is the tone comforting without becoming vague or patronising?",
    ],
  },
  {
    id: "adult",
    title: "Adult guidance review guide",
    readerState: "The reader is supporting a learner and needs practical guidance that does not displace the student-first experience.",
    mustDo: [
      "Keep adult guidance useful but clearly secondary.",
      "Focus adults on barrier reduction and re-entry.",
      "Show accessibility and support patterns clearly.",
    ],
    reviewQuestions: [
      "Is this genuinely useful for teachers, tutors, or families?",
      "Does it support the student journey rather than compete with it?",
      "Are adults being guided toward the right interventions?",
    ],
  },
  {
    id: "footer",
    title: "Footer review guide",
    readerState: "The reader is leaving the page and needs a final sense that rejoining is possible.",
    mustDo: [
      "End with reassurance, not drift.",
      "Leave one simple next-step feeling.",
      "Avoid introducing new complexity this late on the page.",
    ],
    reviewQuestions: [
      "Does the ending feel emotionally right?",
      "Does it reinforce re-entry and belonging?",
      "Is it concise enough to work as a closing message?",
    ],
  },
];

export const editorCapabilities: EditorCapability[] = [
  {
    title: "Edit by section",
    description: "Colleagues work in named sections instead of raw JSON or code files.",
  },
  {
    title: "Live preview before publish",
    description: "Every draft can be checked visually before it is treated as the current published version.",
  },
  {
    title: "Validation guardrails",
    description: "Email, link, and required-field checks prevent broken content from being published.",
  },
  {
    title: "Drafts, publish, and rollback",
    description: "Changes can be saved, published, and restored from version history without touching code.",
  },
];

export const siteDisplayNames: Record<SiteKey, string> = {
  generic: "Generic school variant",
  "jumeirah-college": "Jumeirah College",
};
