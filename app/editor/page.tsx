import Link from "next/link";

import { siteDisplayNames } from "@/lib/product-model";
import { getAllSiteKeys } from "@/lib/site-content";

export default function EditorIndexPage() {
  return (
    <main className="workspace-page">
      <section className="workspace-hero">
        <p className="workspace-kicker">Editorial workspace</p>
        <h1>Choose a site variant to edit.</h1>
        <p className="workspace-intro">
          This workspace lets non-technical editors change content section by section, preview the
          result, and publish locally without touching code.
        </p>

        <div className="workspace-cta-row">
          {getAllSiteKeys().map((siteKey) => (
            <Link className="workspace-link-card" href={`/editor/${siteKey}`} key={siteKey}>
              <strong>{siteDisplayNames[siteKey]}</strong>
              <span>Open editorial workspace</span>
            </Link>
          ))}
          <Link className="workspace-link-card" href="/product">
            <strong>Product model</strong>
            <span>Review the three-layer operating model</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
