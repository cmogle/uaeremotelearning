import type { VariantManifest } from "../types";

import {
  HelpPage,
  HomePage,
  QuietShell,
  SchoolDayPage,
  WellbeingPage,
} from "./index";

export const v2QuietPageManifest: VariantManifest = {
  key: "v2-quiet-page",
  name: "Quiet Page",
  description:
    "Single calm reading surface. Replaces navigation with one editorial scroll and a sticky section rail. Warm paper, terracotta accent, serif headings.",
  Shell: QuietShell,
  pages: {
    "/": HomePage,
    "/get-help-now": HelpPage,
    "/school-day": SchoolDayPage,
    "/wellbeing-support": WellbeingPage,
  },
};
