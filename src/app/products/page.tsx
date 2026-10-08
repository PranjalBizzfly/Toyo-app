import { CatalogBrowser, type CatalogItem, type CatalogSection } from "@/components/product/CatalogBrowser";
import type { Product } from "@/content/types";
import { getCatalogTree, getCategory, getFeaturedProducts, getProducts } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { absoluteUrl, buildMetadata, jsonLd } from "@/lib/seo";
import { monogram, productAccent } from "@/lib/tint";

export const metadata = buildMetadata({
  title: "All products",
  description: "Browse every ToyoApps product by category — search by task, capability or business function.",
  path: routes.products(),
});

const toItem = (p: Product): CatalogItem => ({
  slug: p.slug,
  href: routes.product(p.slug),
  name: p.name,
  description: p.shortDescription,
  accent: productAccent(p),
  initials: monogram(p.name),
  pending: p.status === "pending",
  keywords: [p.name, p.shortDescription, p.primaryUseCase, getCategory(p.category)?.name, ...(p.audience ?? []), ...(p.features ?? []).map((f) => f.name)]
    .join(" ")
    .toLowerCase(),
});

export default function ProductsPage() {
  const products = getProducts();
  const featured = getFeaturedProducts(3);
  const sections: CatalogSection[] = [
    ...(featured.length ? [{ id: "featured", title: "Featured apps", items: featured.map(toItem) }] : []),
    ...getCatalogTree().map(({ category, products: list }) => ({
      id: category.slug,
      title: category.name,
      tagline: category.tagline,
      href: routes.category(category.slug),
      items: list.map(toItem),
    })),
  ];

  return (
    <>
      <header className="zband">
        <div className="container">
          <h1>All the software you need to run your business</h1>
          <hr className="z-rule z-rule--center z-rule--light" />
        </div>
      </header>
      <CatalogBrowser sections={sections} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(routes.product(p.slug)), name: p.name })),
        })}
      />
    </>
  );
}
