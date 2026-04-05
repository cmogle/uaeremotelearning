"use client";

import { useEffect, useMemo, useState } from "react";

import { SitePage } from "@/components/public/site-page";
import { SiteDefinition, siteDefinitionSchema } from "@/lib/site-schema";

const PUBLISHED_PREFIX = "uae-remote-learning:published:";

type SiteExperienceProps = {
  siteKey: string;
  initialSite: SiteDefinition;
};

export function SiteExperience({ siteKey, initialSite }: SiteExperienceProps) {
  const [publishedOverride, setPublishedOverride] = useState<SiteDefinition | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(`${PUBLISHED_PREFIX}${siteKey}`);
      if (!raw) {
        return;
      }

      const parsed = siteDefinitionSchema.safeParse(JSON.parse(raw));
      if (parsed.success) {
        setPublishedOverride(parsed.data);
      }
    } catch {
      setPublishedOverride(null);
    }
  }, [siteKey]);

  const site = useMemo(() => publishedOverride ?? initialSite, [initialSite, publishedOverride]);

  return <SitePage site={site} />;
}
