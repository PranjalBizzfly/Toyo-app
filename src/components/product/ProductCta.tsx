import Link from "next/link";
import type { Cta, Product } from "@/content/types";
import { getProductStory } from "@/lib/product-story";

/**
 * Closing call-to-action for every product page (overview and inner pages),
 * in the product's own style — the same glow / band / panel / landscape / spin
 * treatment its overview uses, so a product looks like one site throughout.
 */
export function ProductCta({ product, title, lead, primary, secondary }: { product: Product; title: string; lead?: string; primary: Cta; secondary?: Cta }) {
  const story = getProductStory(product.slug);
  const external = (href: string) => /^https?:/.test(href);
  return (
    <section className={`zs-cta zs-cta--${story.cta}`} aria-label={title}>
      {story.cta === "landscape" && <span className="zs-cta__land" aria-hidden="true" />}
      <div className={`container zs-center${story.cta === "panel" ? " zs-cta__panel" : ""}`}>
        <h2 className="zs-cta__title">{title}</h2>
        {lead && <p className="zs-cta__lead">{lead}</p>}
        <div className="zs-hero__actions zs-hero__actions--center">
          {external(primary.href) ? (
            <a href={primary.href} rel="noopener" className="zs-btn zs-btn--solid">
              {primary.label} <span aria-hidden>→</span>
            </a>
          ) : (
            <Link href={primary.href} className="zs-btn zs-btn--solid">
              {primary.label} <span aria-hidden>→</span>
            </Link>
          )}
          {secondary && (
            <Link href={secondary.href} className="zs-btn zs-btn--ghost">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
