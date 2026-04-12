import type { VariantManifest } from "../types";

import {
  BaselineShell,
  HelpPageContent,
  HomePageContent,
  SchoolDayPageContent,
  WellbeingPageContent,
} from "./index";

export const v5OobManifest: VariantManifest = {
  key: "v5-oob",
  name: "Out-of-Box",
  description:
    "The original Jumeirah College distance-learning hub. Calm, content-led, conventional layout.",
  Shell: BaselineShell,
  pages: {
    "/": HomePageContent,
    "/get-help-now": HelpPageContent,
    "/school-day": SchoolDayPageContent,
    "/wellbeing-support": WellbeingPageContent,
  },
};
