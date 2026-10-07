import { Suspense } from "react";
import { CategoryCard } from "@/components/product/cards";
import { ProductExplorer } from "@/components/product/ProductExplorer";
import { CtaBand, EmptyState, PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { getCatalogTree, getCategories, getProducts } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata, jsonLd, absoluteUrl } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All products",
  description: "Browse every ToyoApps product by category — search by task, capability or business function.",
  path: routes.products(),
});

export default function ProductsPage() {
  const products = getProducts();
  const categories = getCategories();
  const tree = getCatalogTree();

  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Products", href: routes.products() }]}
        eyebrow="All products"
        title="Every ToyoApps product, organised by what it helps you do"
        lead="Search the catalog or filter by category to find the software that fits your business."
      />
      <Section tight>
        {products.length ? (
          <Suspense>
            <ProductExplorer products={products} categories={categories.map(({ slug, name }) => ({ slug, name }))} />
          </Suspense>
        ) : (
          <EmptyState title="Products are coming soon">The ToyoApps catalog is being prepared.</EmptyState>
        )}
      </Section>
      {tree.length > 0 && (
        <Section tone="surface">
          <SectionHeader eyebrow="Categories" title="Browse by category" />
          <div className="grid" style={{ ["--min" as string]: "260px" }}>
            {tree.map(({ category, products }) => (
              <CategoryCard key={category.slug} category={category} products={products} />
            ))}
          </div>
        </Section>
      )}
      <CtaBand
        title="Not sure which product fits?"
        lead="Tell us what you're trying to solve and we'll recommend the right ToyoApps products."
        primary={{ label: "Contact sales", href: routes.contact() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(routes.product(p.slug)),
            name: p.name,
          })),
        })}
      />
    </>
  );
}
