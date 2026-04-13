import { notFound } from "next/navigation";

import { getLiveVariant, getVariant } from "./registry";
import type { PageProps, VariantManifest, VariantPagePath } from "./types";

function renderManifest(
  manifest: VariantManifest,
  path: VariantPagePath,
  searchParams?: PageProps["searchParams"]
) {
  const Page = manifest.pages[path];
  if (!Page) {
    notFound();
  }
  const { Shell } = manifest;
  return (
    <Shell>
      <Page searchParams={searchParams} />
    </Shell>
  );
}

/** Render a page from the variant currently configured as live. */
export function renderLivePage(
  path: VariantPagePath,
  searchParams?: PageProps["searchParams"]
) {
  return renderManifest(getLiveVariant(), path, searchParams);
}

/** Render a page from a named variant — used by the /preview routes. */
export function renderVariantPage(
  key: string,
  path: VariantPagePath,
  searchParams?: PageProps["searchParams"]
) {
  const manifest = getVariant(key);
  if (!manifest) {
    notFound();
  }
  return renderManifest(manifest, path, searchParams);
}
