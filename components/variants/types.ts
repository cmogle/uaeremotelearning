import type { ComponentType, ReactNode } from "react";

export type VariantPagePath =
  | "/"
  | "/get-help-now"
  | "/school-day"
  | "/wellbeing-support";

export type PageProps = {
  /** URL search params forwarded from the route for progressive enhancement. */
  searchParams?: Record<string, string | string[] | undefined>;
};

export type VariantManifest = {
  /** URL-safe folder-style identifier, e.g. "v3-slow-steps". */
  key: string;
  /** Short human-readable name shown in the preview gallery. */
  name: string;
  /** One-line description of the design direction. */
  description: string;
  /** App shell — header, footer, layout chrome. Receives page content as children. */
  Shell: ComponentType<{ children: ReactNode }>;
  /** Map of canonical paths → page content components. */
  pages: Partial<Record<VariantPagePath, ComponentType<PageProps>>>;
};
