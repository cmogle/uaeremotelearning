import Link from "next/link";

import {
  architectureSections,
  editorialPrinciples,
  editorialReviewFlow,
  editorCapabilities,
  siteDisplayNames,
} from "@/lib/product-model";
import { SiteKey } from "@/lib/site-schema";

type ProductHubProps = {
  siteKeys: readonly SiteKey[];
};

export function ProductHub({ siteKeys }: ProductHubProps) {
  return (
    <main className="workspace-page">
      <section className="workspace-hero">
        <p className="workspace-kicker">Product model</p>
        <h1>Separate the product into experience architecture, editorial system, and editor capability.</h1>
        <p className="workspace-intro">
          The public experience should feel intentional for students. The content should be reviewed
          section by section. The editor should let colleagues change content safely without
          redesigning the product.
        </p>

        <div className="workspace-cta-row">
          {siteKeys.map((siteKey) => (
            <Link className="workspace-link-card" href={`/editor/${siteKey}`} key={siteKey}>
              <strong>Open editor</strong>
              <span>{siteDisplayNames[siteKey]}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="workspace-grid-section">
        <div className="workspace-section-heading">
          <p className="workspace-kicker">Three layers</p>
          <h2>Use one language for the product.</h2>
        </div>

        <div className="workspace-card-grid workspace-card-grid-three">
          <article className="workspace-card">
            <h3>Experience architecture</h3>
            <p>
              What the student sees first, how the sections flow, and how the page routes students,
              adults, and wellbeing needs.
            </p>
          </article>

          <article className="workspace-card">
            <h3>Editorial system</h3>
            <p>
              The copy, images, contacts, resources, and tone of voice rules inside the shared
              structure.
            </p>
          </article>

          <article className="workspace-card">
            <h3>Editor capability</h3>
            <p>
              The safe workflow for drafts, preview, publish, and rollback, without asking
              colleagues to touch code.
            </p>
          </article>
        </div>
      </section>

      <section className="workspace-grid-section">
        <div className="workspace-section-heading">
          <p className="workspace-kicker">Phase 1</p>
          <h2>Current experience architecture candidate</h2>
        </div>

        <div className="workspace-card-grid">
          {architectureSections.map((section) => (
            <article className="workspace-card" key={section.id}>
              <p className="workspace-card-label">{section.title}</p>
              <h3>{section.purpose}</h3>
              <p>
                <strong>Audience:</strong> {section.audience}
              </p>
              <p>
                <strong>Required:</strong> {section.requiredBlocks.join(", ")}
              </p>
              <p>
                <strong>Optional:</strong> {section.optionalBlocks.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="workspace-grid-section">
        <div className="workspace-section-heading">
          <p className="workspace-kicker">Phase 2</p>
          <h2>Editorial system rules</h2>
        </div>

        <div className="workspace-card-grid workspace-card-grid-two">
          <article className="workspace-card">
            <h3>Tone of voice</h3>
            <ul className="workspace-list">
              {editorialPrinciples.map((principle) => (
                <li key={principle.title}>
                  <strong>{principle.title}:</strong> {principle.description}
                </li>
              ))}
            </ul>
          </article>

          <article className="workspace-card">
            <h3>Section-by-section review order</h3>
            <ol className="workspace-list">
              {editorialReviewFlow.map((stage) => (
                <li key={stage.id}>
                  <strong>{stage.title}:</strong> {stage.output}
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section className="workspace-grid-section">
        <div className="workspace-section-heading">
          <p className="workspace-kicker">Phase 3</p>
          <h2>First editor capability target</h2>
        </div>

        <div className="workspace-card-grid workspace-card-grid-two">
          {editorCapabilities.map((capability) => (
            <article className="workspace-card" key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
