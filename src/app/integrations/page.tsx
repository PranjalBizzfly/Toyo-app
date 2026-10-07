import Link from "next/link";
import { CtaBand, EmptyState, PageHero, Section } from "@/components/ui/primitives";
import { getIntegrations, integrationHasPage, productsFor } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Integrations",
  description: "The tools ToyoApps products connect with — storage, messaging, creative tools and Google Workspace — and which product connects to each.",
  path: routes.integrations(),
  status: getIntegrations().length ? "live" : "draft",
});

/**
 * Integration directory. Every entry is an integration a product's own site
 * names; each lists the ToyoApps products that use it. Entries get their own
 * page only once they have written content (`integrationHasPage`).
 */
export default function IntegrationsPage() {
  const all = getIntegrations();
  const groups = [...new Set(all.map((i) => i.category))].sort().map((category) => ({
    category,
    items: all.filter((i) => i.category === category),
  }));

  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Integrations", href: routes.integrations() }]}
        eyebrow="Integrations"
        title="Connect ToyoApps products with the tools you already use"
        lead="Every integration here is one a product lists itself, shown with the ToyoApps products that support it."
      >
        {groups.length > 1 && (
          <nav aria-label="Integration categories" className="chips">
            {groups.map((g) => (
              <a key={g.category} href={`#${g.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="chip">
                {g.category} <span>{g.items.length}</span>
              </a>
            ))}
          </nav>
        )}
      </PageHero>
      <Section tight>
        {groups.length === 0 && <EmptyState title="No integrations listed yet" />}
        {groups.map((g) => (
          <div key={g.category} id={g.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="integration-group">
            <h2 className="h3" style={{ marginBottom: 20 }}>
              {g.category}
            </h2>
            <div className="grid" style={{ ["--min" as string]: "260px" }}>
              {g.items.map((i) => {
                const body = (
                  <>
                    <p className="product-card__cat">{i.vendor}</p>
                    <h3 className="card__title">{i.name}</h3>
                    <p className="text-muted">{i.summary}</p>
                  </>
                );
                return (
                  <article key={i.slug} id={i.slug} className="card">
                    {integrationHasPage(i) ? <Link href={routes.integration(i.slug)}>{body}</Link> : body}
                    <ul className="card__meta" aria-label={`ToyoApps products that work with ${i.name}`}>
                      {productsFor(i.products).map((p) => (
                        <li key={p.slug}>
                          <Link href={routes.productSection(p.slug, "integrations")} className="badge badge--brand">
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </Section>
      <CtaBand
        title="Find the right software for your business."
        primary={{ label: "Explore products", href: routes.products() }}
        secondary={{ label: "Contact us", href: routes.contact() }}
      />
    </>
  );
}
