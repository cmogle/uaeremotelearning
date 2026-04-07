import { v1BaselineManifest } from "./v1-baseline/manifest";
import { v2QuietPageManifest } from "./v2-quiet-page/manifest";
import type { VariantManifest } from "./types";

/**
 * Master registry of every design variant in the repo.
 *
 * To add a new variant:
 *   1. Create a folder under `components/variants/<your-key>/`.
 *   2. Build the design (page components + shell) inside that folder. It can use
 *      any styling approach you like — CSS modules, Tailwind, plain CSS — as
 *      long as it stays under its own folder.
 *   3. Pull all copy from `lib/baseline-site-content.ts`. Never duplicate strings.
 *   4. Add a `manifest.ts` exporting a `VariantManifest`.
 *   5. Append it to the `variants` array below.
 *
 * That is the entire registration step. The preview gallery and the
 * `/preview/<key>/...` routes will pick it up automatically.
 */
export const variants: VariantManifest[] = [v1BaselineManifest, v2QuietPageManifest];

/**
 * The variant currently rendered at the root of the live site
 * (https://distancelearn.ing/). When the founder picks a winner, change this
 * one constant — nothing else needs to move.
 */
export const LIVE_VARIANT_KEY = "v1-baseline";

export function getVariant(key: string): VariantManifest | undefined {
  return variants.find((variant) => variant.key === key);
}

export function getLiveVariant(): VariantManifest {
  const variant = getVariant(LIVE_VARIANT_KEY);
  if (!variant) {
    throw new Error(
      `LIVE_VARIANT_KEY "${LIVE_VARIANT_KEY}" is not registered in variants[].`
    );
  }
  return variant;
}
