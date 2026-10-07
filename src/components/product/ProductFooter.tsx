import type { Product } from "@/content/types";
import { getCategory, getRelatedProducts } from "@/lib/catalog";
import type { NavGroup } from "@/lib/navigation";
import { getAvailableSections } from "@/lib/product-sections";
import { routes, sectionLabels } from "@/lib/routes";
import { FooterColumn } from "@/components/layout/SiteFooter";
import { ProductLogo } from "./cards";

/**
 * Product ecosystem footer — rendered by the product layout above the global
 * ToyoApps footer, so the two levels stay separate.
 */
export function ProductFooter({ product }: { product: Product }) {
  const sections = getAvailableSections(product);
  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 5);

  const columns: NavGroup[] = [
    {
      title: "Explore",
      links: sections
        .filter((s) => s !== "resources" && s !== "support")
        .map((s) => ({ label: sectionLabels[s], href: routes.productSection(product.slug, s) })),
    },
    {
      title: "Get started",
      links: [
        product.appUrl && { label: `Sign up for ${product.name}`, href: product.appUrl },
        { label: `${product.name} website`, href: product.websiteUrl },
      ].filter((l): l is { label: string; href: string } => !!l),
    },
    {
      title: "Resources",
      links: [
        product.docsUrl && { label: "Documentation", href: product.docsUrl },
        sections.includes("resources") && { label: "Guides & articles", href: routes.productSection(product.slug, "resources") },
        sections.includes("support") && { label: "Support & FAQs", href: routes.productSection(product.slug, "support") },
        { label: "ToyoApps resource centre", href: routes.resources() },
      ].filter((l): l is { label: string; href: string } => !!l),
    },
    {
      title: category ? `More in ${category.name}` : "Related",
      links: [
        ...related.map((p) => ({ label: p.name, href: routes.product(p.slug) })),
        ...(category ? [{ label: `All ${category.name}`, href: routes.category(category.slug) }] : []),
      ],
    },
  ];

  return (
    <aside className="product-footer" aria-label={`${product.name} links`}>
      <div className="container product-footer__grid">
        <div className="stack">
          <ProductLogo product={product} />
          <p className="card__title">{product.name}</p>
          <p className="text-muted" style={{ fontSize: "var(--fs-sm)" }}>
            {product.shortDescription}
          </p>
        </div>
        {columns
          .filter((c) => c.links.length)
          .map((c) => (
            <FooterColumn key={c.title} group={c} />
          ))}
      </div>
    </aside>
  );
}
