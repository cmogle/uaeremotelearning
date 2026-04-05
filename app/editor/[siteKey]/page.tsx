import { notFound } from "next/navigation";

import { EditorWorkspace } from "@/components/editor/editor-workspace";
import { getAllSiteKeys, getSiteContent } from "@/lib/site-content";
import { isSiteKey } from "@/lib/site-schema";

export async function generateStaticParams() {
  return getAllSiteKeys().map((siteKey) => ({ siteKey }));
}

export default async function EditorSitePage({
  params,
}: {
  params: Promise<{ siteKey: string }>;
}) {
  const { siteKey } = await params;
  const site = getSiteContent(siteKey);

  if (!site || !isSiteKey(siteKey)) {
    notFound();
  }

  return <EditorWorkspace initialSite={site} siteKey={siteKey} />;
}
