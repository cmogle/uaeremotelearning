import type { Metadata } from "next";
import Link from "next/link";

import { LIVE_VARIANT_KEY, variants } from "@/components/variants/registry";

import styles from "./preview.module.css";

export const metadata: Metadata = {
  title: "Design preview gallery",
  description: "Compare in-progress design variants of the distance learning hub.",
  robots: { index: false, follow: false },
};

const VARIANT_PAGES: Array<{ path: string; label: string }> = [
  { path: "/", label: "Home" },
  { path: "/get-help-now", label: "Get help now" },
  { path: "/school-day", label: "School day" },
  { path: "/wellbeing-support", label: "Wellbeing & support" },
];

export default function PreviewGalleryPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Internal preview</p>
        <h1 className={styles.title}>Design variants</h1>
        <p className={styles.lead}>
          Each card below is a complete, independent design of the same site, rendered from
          the same content. Open one to walk through it as a student would, then use the
          switcher in the corner of any preview page to compare the same screen across
          designs.
        </p>
        <p className={styles.note}>
          The variant currently published at the live URL is marked
          <strong> Live</strong>.
        </p>
      </header>

      <ul className={styles.grid}>
        {variants.map((variant) => {
          const isLive = variant.key === LIVE_VARIANT_KEY;
          return (
            <li className={styles.card} key={variant.key}>
              <div className={styles.cardHeader}>
                <h2>{variant.name}</h2>
                {isLive ? <span className={styles.liveBadge}>Live</span> : null}
              </div>
              <p className={styles.cardKey}>{variant.key}</p>
              <p className={styles.cardDescription}>{variant.description}</p>
              <div className={styles.cardLinks}>
                {VARIANT_PAGES.map(({ path, label }) => {
                  const href =
                    path === "/"
                      ? `/preview/${variant.key}`
                      : `/preview/${variant.key}${path}`;
                  return (
                    <Link className={styles.cardLink} href={href} key={path}>
                      {label}
                    </Link>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>

      <footer className={styles.footer}>
        <p>
          To add a new variant, create a folder under <code>components/variants/</code> and
          register it in <code>components/variants/registry.ts</code>. It will appear here
          automatically.
        </p>
      </footer>
    </div>
  );
}
