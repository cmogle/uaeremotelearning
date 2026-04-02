import type { CSSProperties } from "react";
import {
  BookOpen,
  CircleHelp,
  Clock3,
  Eye,
  HandHeart,
  Headphones,
  Heart,
  MessageCircle,
  MoveHorizontal,
  Sparkles,
  TimerReset,
  Users,
  WifiOff,
} from "lucide-react";

import { HelperCard, SiteDefinition, ThemeTokens } from "@/types";

export function toThemeStyle(theme: ThemeTokens) {
  const fontFamily =
    theme.fontFamily === "Editorial"
      ? '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif'
      : theme.fontFamily === "Humanist"
        ? '"Gill Sans", "Trebuchet MS", "Segoe UI", sans-serif'
        : '"Avenir Next", "Segoe UI", sans-serif';

  return {
    "--page-bg": theme.pageBackground,
    "--surface": theme.surface,
    "--surface-alt": theme.surfaceAlt,
    "--text-color": theme.text,
    "--muted-color": theme.mutedText,
    "--primary-color": theme.primary,
    "--primary-dark": theme.primaryDark,
    "--primary-soft": theme.primarySoft,
    "--hero-from": theme.heroFrom,
    "--hero-to": theme.heroTo,
    "--hero-glow": theme.heroGlow,
    "--font-family": fontFamily,
  } as CSSProperties;
}

export function getToneClass(tone: HelperCard["tone"]) {
  return `tone-${tone}`;
}

export function getIcon(name: HelperCard["icon"]) {
  const map = {
    timer: TimerReset,
    focus: CircleHelp,
    heart: Heart,
    eye: Eye,
    listen: Headphones,
    move: MoveHorizontal,
    book: BookOpen,
    message: MessageCircle,
    support: HandHeart,
    offline: WifiOff,
    friends: Users,
    sparkles: Sparkles,
  } as const;

  return map[name] || Clock3;
}

function sanitizeHref(href: string) {
  if (href.startsWith("#") || href.startsWith("/") || href.startsWith("mailto:")) {
    return href;
  }

  try {
    const url = new URL(href);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return href;
    }
  } catch {
    return "#";
  }

  return "#";
}

export function sanitizeSite(site: SiteDefinition): SiteDefinition {
  return {
    ...site,
    hero: {
      ...site.hero,
      primaryCtaTarget: sanitizeHref(site.hero.primaryCtaTarget),
      secondaryCtaTarget: sanitizeHref(site.hero.secondaryCtaTarget),
    },
    wellbeingResources: site.wellbeingResources.map((resource) => ({
      ...resource,
      href: sanitizeHref(resource.href),
    })),
  };
}
