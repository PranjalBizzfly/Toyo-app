import { PageFaqs } from "@/components/ui/PageFaqs";
import { getSiteFaqs } from "@/lib/faqs";
import Link from "next/link";
import { CtaBand, EmptyState } from "@/components/ui/primitives";
import { DirHero, IntegrationCard, ProductChip, SectionHead } from "@/components/directory/DirectoryParts";
import { DirectoryFilters } from "@/components/directory/DirectoryFilters";
import { getIntegrationDirectory, productSectionHref } from "@/lib/directory";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Integrations",
  description: "The tools ToyoApps products connect with (storage, messaging, CRM, work management, creative tools and more) and which product connects to each.",
  path: routes.integrations(),
  status: getIntegrationDirectory().entries.length ? "live" : "draft",
});

/**
 * Integration directory: compact hero with counts, search + category and
 * product filters, then every integration grouped by category. Entries come
 * from the cross-product registry and from each product's own documented
 * integrations (src/lib/directory.ts); each card links to its guide or to
 * the product page that documents it.
 */
export default function IntegrationsPage() {
  const { entries, categories, products } = getIntegrationDirectory();
  const guides = entries.filter((e) => e.hasPage);

  return (
    <>
      <DirHero
        tone="integration"
        crumbs={[{ name: "Integrations", href: routes.integrations() }]}
        eyebrow="Integration directory"
        title="Connect ToyoApps products with the tools you already use"
        lead="Every integration listed here is one a ToyoApps product documents on its own site: storage that feeds Sibu's asset library, Google Workspace for SigChanger, messaging alerts in ZapBuzzer and Fantom, and the apps TaskMagic automates. Search by tool, or filter by category or product."
        stats={[
          { value: entries.length, label: "Integrations" },
          { value: categories.length, label: "Categories" },
          { value: products.length, label: "Products" },
        ]}
      />

      {entries.length === 0 ? (
        <section className="dx-sec">
          <div className="container">
            <EmptyState title="No integrations listed yet" />
          </div>
        </section>
      ) : (
        <>
          {guides.length > 0 && (
            <section className="dx-sec dx-sec--tint dx-int" aria-labelledby="dx-guides">
              <div className="container">
                <SectionHead
                  id="dx-guides"
                  kicker="Integration guides"
                  title="Explained in detail"
                  lead="These integrations have their own page covering what connects, which products use it and how."
                />
                <ul className="dx-grid dx-grid--guides dx-grid--center">
                  {guides.map((e) => (
                    <IntegrationCard key={e.key} entry={e} compact />
                  ))}
                </ul>
              </div>
            </section>
          )}

          <section className="dx-sec dx-int" aria-labelledby="dx-all">
            <div className="container">
              <SectionHead id="dx-all" kicker="All integrations" title="Browse the directory" />
              <DirectoryFilters
                target="dx-directory"
                total={entries.length}
                noun={["integration", "integrations"]}
                categories={categories.map((c) => ({ value: c.name, label: c.name, count: c.count }))}
                products={products.map((p) => ({ value: p.product.slug, label: p.product.name, count: p.count }))}
              />
              <div id="dx-directory" className="dx-groups dx-groups--packed">
                {categories.map((c) => {
                  const items = entries.filter((e) => e.category === c.name);
                  return (
                    <section key={c.slug} id={c.slug} className="dx-group" data-group aria-labelledby={`dx-c-${c.slug}`} style={{ "--n2": Math.min(items.length, 2), "--n4": Math.min(items.length, 4) } as React.CSSProperties}>
                      <header className="dx-group__head">
                        <h3 id={`dx-c-${c.slug}`}>{c.name}</h3>
                        <span className="dx-head__count">{items.length}</span>
                      </header>
                      <ul className="dx-grid">
                        {items.map((e) => (
                          <IntegrationCard key={e.key} entry={e} />
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="dx-sec dx-sec--tint" aria-labelledby="dx-by-product">
            <div className="container">
              <SectionHead
                id="dx-by-product"
                kicker="By product"
                title="Integrations for each ToyoApps product"
                lead="Each product page lists the integrations it documents, with setup notes where the product provides them."
                center
              />
              <ul className="dx-byproduct">
                {products
                  .slice()
                  .sort((a, b) => b.count - a.count)
                  .map(({ product, count }) => (
                    <li key={product.slug}>
                      <ProductChip product={product} href={productSectionHref(product, "integrations")} />
                      <Link href={`${routes.integrations()}?product=${product.slug}#dx-all`} className="dx-byproduct__count">
                        {count} {count === 1 ? "integration" : "integrations"}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        </>
      )}
      <PageFaqs faqs={getSiteFaqs("integrations")} />

      <CtaBand
        title="Find the right software for your business."
        primary={{ label: "Explore products", href: routes.products() }}
        secondary={{ label: "Contact us", href: routes.contactForm() }}
      />
    </>
  );
}
