import type { VariantManifest } from "../types";

import {
  HelpPage,
  HomePage,
  SchoolDayPage,
  WellbeingPage,
  WorkshopShell,
} from "./index";

export const v4WorkshopWallManifest: VariantManifest = {
  key: "v4-workshop-wall",
  name: "Workshop Wall",
  description:
    "Dark spatial canvas. The whole hub is a 12-column wall of categorical tiles. Click any tile to expand it in place; the rest reflow around it.",
  Shell: WorkshopShell,
  pages: {
    "/": HomePage,
    "/get-help-now": HelpPage,
    "/school-day": SchoolDayPage,
    "/wellbeing-support": WellbeingPage,
  },
};
