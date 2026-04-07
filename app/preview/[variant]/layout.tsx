import type { ReactNode } from "react";

import { LIVE_VARIANT_KEY, variants } from "@/components/variants/registry";

import { PreviewSwitcher } from "./[[...slug]]/PreviewSwitcher";

export default function PreviewVariantLayout({ children }: { children: ReactNode }) {
  const switcherVariants = variants.map((variant) => ({
    key: variant.key,
    name: variant.name,
    isLive: variant.key === LIVE_VARIANT_KEY,
  }));

  return (
    <>
      {children}
      <PreviewSwitcher variants={switcherVariants} />
    </>
  );
}
