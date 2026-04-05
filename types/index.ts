export type {
  SiteDefinition,
  SiteKey,
  StudentIntent,
  SupportIconName,
  ThemeTokens,
  ToneName,
} from "@/lib/site-schema";

export type HelperCard = import("@/lib/site-schema").SiteDefinition["helperCards"][number];
