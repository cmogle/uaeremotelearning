import generic from "@/content/sites/generic.json";
import jumeirahCollege from "@/content/sites/jumeirah-college.json";
import { SiteDefinition, SiteKey, isSiteKey, siteDefinitionSchema, siteKeys } from "@/lib/site-schema";

const siteContentMap: Record<SiteKey, SiteDefinition> = {
  generic: siteDefinitionSchema.parse(generic),
  "jumeirah-college": siteDefinitionSchema.parse(jumeirahCollege),
};

export function getAllSiteKeys() {
  return siteKeys;
}

export function getSiteContent(siteKey: string) {
  if (!isSiteKey(siteKey)) {
    return null;
  }

  return siteContentMap[siteKey];
}
