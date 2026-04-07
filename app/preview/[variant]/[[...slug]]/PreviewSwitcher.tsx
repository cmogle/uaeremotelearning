"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import styles from "./switcher.module.css";

type SwitcherVariant = {
  key: string;
  name: string;
  isLive: boolean;
};

type Props = {
  variants: SwitcherVariant[];
};

export function PreviewSwitcher({ variants }: Props) {
  const params = useParams<{ variant: string; slug?: string[] }>();
  const [open, setOpen] = useState(false);

  const currentKey = params?.variant ?? "";
  const slug = Array.isArray(params?.slug) ? params!.slug : [];
  const currentName =
    variants.find((v) => v.key === currentKey)?.name ?? "Preview";

  const buildHref = (key: string) =>
    slug.length === 0 ? `/preview/${key}` : `/preview/${key}/${slug.join("/")}`;

  return (
    <div className={styles.root} data-open={open ? "true" : "false"}>
      <button
        aria-expanded={open}
        className={styles.toggle}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className={styles.toggleKicker}>Previewing</span>
        <span className={styles.toggleName}>{currentName}</span>
        <span aria-hidden className={styles.toggleChevron}>
          {open ? "▾" : "▴"}
        </span>
      </button>

      {open ? (
        <div className={styles.menu} role="menu">
          <p className={styles.menuKicker}>Switch variant</p>
          <ul className={styles.list}>
            {variants.map((variant) => {
              const active = variant.key === currentKey;
              return (
                <li key={variant.key}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={active ? styles.itemActive : styles.item}
                    href={buildHref(variant.key)}
                    onClick={() => setOpen(false)}
                  >
                    <span className={styles.itemName}>{variant.name}</span>
                    {variant.isLive ? (
                      <span className={styles.liveBadge}>Live</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link className={styles.gallery} href="/preview" onClick={() => setOpen(false)}>
            ← All variants
          </Link>
        </div>
      ) : null}
    </div>
  );
}
