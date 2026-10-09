import { PageFaqs } from "@/components/ui/PageFaqs";
import { getSiteFaqs } from "@/lib/faqs";
import "../catalog-zoho.css";
import { CatalogBrowser, type CatalogSection } from "@/components/product/CatalogBrowser";
import { getCatalogTree, getComparisons, getFeaturedProducts, getIntegrations, getProducts } from "@/lib/catalog";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { routes } from "@/lib/routes";
import { absoluteUrl, buildMetadata, jsonLd } from "@/lib/seo";
import { toCatalogItem } from "./category/catalog-item";

export const metadata = buildMetadata({
  title: "All Products",
  description: "Browse every ToyoApps product by category, or search by task, capability or business function.",
  path: routes.products(),
});

export default function ProductsPage() {
  const products = getProducts();
  const featured = getFeaturedProducts(3);
  const sections: CatalogSection[] = [
    ...(featured.length ? [{ id: "featured", title: "Featured apps", featured: true, items: featured.map((p) => toCatalogItem(p)) }] : []),
    ...getCatalogTree().map(({ category, products: list }) => ({
      id: category.slug,
      title: category.name,
      tagline: category.tagline,
      href: routes.category(category.slug),
      items: list.map((p) => toCatalogItem(p)),
    })),
  ];
  const sideLinks = [
    ...(getIntegrations().length ? [{ label: "Integrations", href: routes.integrations() }] : []),
    ...(getComparisons().length ? [{ label: "Compare products", href: routes.compare() }] : []),
    { label: "Search the site", href: "/search" },
  ];

  return (
    <>
      <header className="zc-hero">
        <div className="container">
          <h1>All the software you need to run your business</h1>
          <hr className="zc-rule" />
          <ImageSlot src="/images/catalog/products-hero.webp" alt="ToyoApps products for every part of a business" width={960} height={360} priority className="zc-hero__art" />
        </div>
      </header>
      <CatalogBrowser sections={sections} sideLinks={sideLinks} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(routes.product(p.slug)), name: p.name })),
        })}
      />
      <PageFaqs faqs={getSiteFaqs("products")} />
    </>
  );
}
