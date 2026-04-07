import { notFound } from "next/navigation";

import { getLiveVariant, getVariant } from "./registry";
import type { VariantManifest, VariantPagePath } from "./types";

function renderManifest(manifest: VariantManifest, path: VariantPagePath) {
  const Page = manifest.pages[path];
  if (!Page) {
    notFound();
  }
  const { Shell } = manifest;
  return (
    <Shell>
      <Page />
    </Shell>
  );
}

/** Render a page from the variant currently configured as live. */
export function renderLivePage(path: VariantPagePath) {
  return renderManifest(getLiveVariant(), path);
}

/** Render a page from a named variant — used by the /preview routes. */
export function renderVariantPage(key: string, path: VariantPagePath) {
  const manifest = getVariant(key);
  if (!manifest) {
    notFound();
  }
  return renderManifest(manifest, path);
}
