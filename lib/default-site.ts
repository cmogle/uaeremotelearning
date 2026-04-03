import { SiteKey, isSiteKey } from "@/lib/site-schema";

const FALLBACK_SITE_KEY: SiteKey = "jumeirah-college";

export function getDefaultSiteKey(rawSiteKey = process.env.DEFAULT_SITE_KEY): SiteKey {
  const normalizedSiteKey = rawSiteKey?.trim();

  if (normalizedSiteKey && isSiteKey(normalizedSiteKey)) {
    return normalizedSiteKey;
  }

  return FALLBACK_SITE_KEY;
}
