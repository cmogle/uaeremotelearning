export type {
  SiteDefinition,
  SiteKey,
  ThemeTokens,
} from "@/lib/site-schema";

export type HelperCard = import("@/lib/site-schema").SiteDefinition["helperCards"][number];
