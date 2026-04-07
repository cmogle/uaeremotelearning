import type { VariantManifest } from "../types";

import {
  HelpPage,
  HomePage,
  SchoolDayPage,
  SlowStepsShell,
  WellbeingPage,
} from "./index";

export const v3SlowStepsManifest: VariantManifest = {
  key: "v3-slow-steps",
  name: "Slow Steps",
  description:
    "One thing at a time. The whole hub becomes a paced wizard with a centered narrow column, arrow-key navigation, and an escape hatch to see everything at once.",
  Shell: SlowStepsShell,
  pages: {
    "/": HomePage,
    "/get-help-now": HelpPage,
    "/school-day": SchoolDayPage,
    "/wellbeing-support": WellbeingPage,
  },
};
