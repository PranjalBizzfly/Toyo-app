import type { Product } from "@/content/types";
import { getCategory, getFeatures } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { monogram, productAccent } from "@/lib/tint";
import { ProductLogo } from "@/components/product/cards";
import { ButtonLink, CheckList, ScreenshotFrame } from "@/components/ui/primitives";
import { Tabs } from "@/components/ui/Tabs";

/**
 * Featured software as a tabbed spotlight rather than another card grid, so
 * each product gets room for its own story, capabilities and imagery.
 */
export function FeaturedShowcase({ products }: { products: Product[] }) {
  return (
    <Tabs
      label="Featured products"
      items={products.map((p) => {
        const caps = getFeatures(p)
          .filter((f) => f.highlight)
          .slice(0, 5)
          .map((f) => f.name);
        return {
          id: p.slug,
          label: p.name,
          content: (
            <div className="split">
              <div className="stack" style={{ ["--stack" as string]: "20px" }}>
                <div className="product-card__head">
                  <ProductLogo product={p} />
                  <div>
                    <h3 className="h3">{p.name}</h3>
                    <p className="product-card__cat">{getCategory(p.category)?.name}</p>
                  </div>
                </div>
                <p className="lead">{p.longDescription ?? p.shortDescription}</p>
                {caps.length > 0 && <CheckList items={caps} />}
                <div className="btn-row">
                  <ButtonLink href={routes.product(p.slug)} arrow>
                    Explore {p.name}
                  </ButtonLink>
                  {p.pricing && (
                    <ButtonLink href={routes.productSection(p.slug, "pricing")} variant="secondary">
                      See pricing
                    </ButtonLink>
                  )}
                </div>
              </div>
              {p.heroImage ?? p.screenshots?.[0] ? (
                <ScreenshotFrame media={(p.heroImage ?? p.screenshots?.[0])!} />
              ) : (
                // No imagery yet: a branded panel, never a fake screenshot.
                <div className="brand-panel" style={{ ["--accent" as string]: productAccent(p) }} aria-hidden>
                  <span>{monogram(p.name)}</span>
                </div>
              )}
            </div>
          ),
        };
      })}
    />
  );
}
