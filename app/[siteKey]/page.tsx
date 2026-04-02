import { notFound } from "next/navigation";

import { SitePage } from "@/components/public/site-page";
import { getAllSiteKeys, getSiteContent } from "@/lib/site-content";

export async function generateStaticParams() {
  return getAllSiteKeys().map((siteKey) => ({ siteKey }));
}

export default async function SiteRoute({
  params,
}: {
  params: Promise<{ siteKey: string }>;
}) {
  const { siteKey } = await params;
  const site = getSiteContent(siteKey);

  if (!site) {
    notFound();
  }

  return <SitePage site={site} />;
}
