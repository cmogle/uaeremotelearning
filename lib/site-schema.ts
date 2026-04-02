import { z } from "zod";

export const siteKeys = ["jumeirah-college", "generic"] as const;
export type SiteKey = (typeof siteKeys)[number];

export const sectionKeys = [
  "hero",
  "journeys",
  "support",
  "today",
  "educator",
  "wellbeing",
  "footer",
] as const;
export type SectionKey = (typeof sectionKeys)[number];

const colorTokenSchema = z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/);
const linkSchema = z.string().trim().max(240);
const emailSchema = z.string().trim().email();
const safeTextSchema = z.string().trim().min(1).max(400);
const shortTextSchema = z.string().trim().min(1).max(120);

export const themeTokenSchema = z
  .object({
    fontFamily: z.enum(["Avenir", "Humanist", "Editorial"]),
    pageBackground: colorTokenSchema,
    surface: colorTokenSchema,
    surfaceAlt: colorTokenSchema,
    text: colorTokenSchema,
    mutedText: colorTokenSchema,
    primary: colorTokenSchema,
    primaryDark: colorTokenSchema,
    primarySoft: colorTokenSchema,
    heroFrom: colorTokenSchema,
    heroTo: colorTokenSchema,
    heroGlow: colorTokenSchema,
  })
  .strict();

export type ThemeTokens = z.infer<typeof themeTokenSchema>;

export const heroSchema = z
  .object({
    eyebrow: shortTextSchema,
    title: safeTextSchema,
    subtitle: safeTextSchema,
    badgeWords: z.array(shortTextSchema).min(2).max(6),
    primaryCtaLabel: shortTextSchema,
    primaryCtaTarget: linkSchema,
    secondaryCtaLabel: shortTextSchema,
    secondaryCtaTarget: linkSchema,
    quickStartTitle: shortTextSchema,
    quickStartSubtitle: shortTextSchema,
    quickStartSteps: z.array(shortTextSchema).min(2).max(5),
    quickStartNote: safeTextSchema,
  })
  .strict();

export const journeyCardSchema = z
  .object({
    id: shortTextSchema,
    title: shortTextSchema,
    description: safeTextSchema,
    target: linkSchema,
    audience: shortTextSchema,
    icon: z.enum(["support", "calendar", "staff", "wellbeing"]),
  })
  .strict();

export const helperCardSchema = z
  .object({
    id: shortTextSchema,
    title: shortTextSchema,
    icon: z.enum([
      "timer",
      "focus",
      "heart",
      "eye",
      "listen",
      "move",
      "book",
      "message",
      "support",
      "offline",
      "friends",
      "sparkles",
    ]),
    tone: z.enum(["indigo", "emerald", "rose", "sky", "cyan", "amber", "violet", "teal", "orange", "pink", "blue"]),
    steps: z.array(safeTextSchema).min(2).max(8),
    note: safeTextSchema,
    extras: z.array(safeTextSchema).max(6).optional(),
  })
  .strict();

export const contactSchema = z
  .object({
    label: shortTextSchema,
    value: shortTextSchema,
    email: emailSchema.optional(),
  })
  .strict();

export const supportPhraseSchema = z
  .object({
    text: shortTextSchema,
  })
  .strict();

export const resourceLinkSchema = z
  .object({
    title: shortTextSchema,
    description: safeTextSchema,
    href: linkSchema,
  })
  .strict();

export const footerSchema = z
  .object({
    title: shortTextSchema,
    text: safeTextSchema,
    note: safeTextSchema,
  })
  .strict();

export const educatorCardSchema = z
  .object({
    title: shortTextSchema,
    summary: safeTextSchema,
    steps: z.array(safeTextSchema).min(2).max(6),
  })
  .strict();

export const accessibilityFeatureSchema = z
  .object({
    title: shortTextSchema,
    description: safeTextSchema,
  })
  .strict();

export const sectionHeadingSchema = z
  .object({
    journeyTitle: shortTextSchema,
    journeyCaption: safeTextSchema,
    supportEyebrow: shortTextSchema,
    supportTitle: shortTextSchema,
    supportCaption: safeTextSchema,
    supportTeamTitle: shortTextSchema,
    supportTeamCaption: safeTextSchema,
    dayTitle: shortTextSchema,
    lessonTitle: shortTextSchema,
    phraseTitle: shortTextSchema,
    phraseCaption: safeTextSchema,
    routineTitle: shortTextSchema,
    routineCaption: safeTextSchema,
    educatorTitle: shortTextSchema,
    educatorCaption: safeTextSchema,
    accessibilityTitle: shortTextSchema,
    accessibilityCaption: safeTextSchema,
    wellbeingTitle: shortTextSchema,
    supportPageTitle: shortTextSchema,
    supportPageIntro: safeTextSchema,
  })
  .strict();

export const siteDefinitionSchema = z
  .object({
    siteKey: z.enum(siteKeys),
    siteName: shortTextSchema,
    shortName: shortTextSchema,
    audience: shortTextSchema,
    sectionOrder: z.array(z.enum(sectionKeys)).length(sectionKeys.length),
    hero: heroSchema,
    journeyCards: z.array(journeyCardSchema).min(3).max(4),
    headings: sectionHeadingSchema,
    helperCards: z.array(helperCardSchema).min(4).max(12),
    dayExpectations: z.array(safeTextSchema).min(3).max(8),
    lessonRules: z.array(safeTextSchema).min(3).max(8),
    onlineExpectations: z.array(safeTextSchema).min(3).max(8),
    supportPhrases: z.array(supportPhraseSchema).min(2).max(6),
    supportBullets: z.array(safeTextSchema).min(3).max(6),
    wellbeingHabits: z.array(safeTextSchema).min(3).max(8),
    wellbeingResetSteps: z.array(safeTextSchema).min(3).max(6),
    wellbeingContacts: z.array(contactSchema).min(1).max(6),
    wellbeingResources: z.array(resourceLinkSchema).min(1).max(6),
    supportContacts: z.array(contactSchema).min(1).max(6),
    educatorCards: z.array(educatorCardSchema).min(2).max(6),
    accessibilityFeatures: z.array(accessibilityFeatureSchema).min(2).max(6),
    footer: footerSchema,
    adultFooter: footerSchema,
    theme: themeTokenSchema,
  })
  .strict();

export type SiteDefinition = z.infer<typeof siteDefinitionSchema>;

export function isSiteKey(value: string): value is SiteKey {
  return siteKeys.includes(value as SiteKey);
}
