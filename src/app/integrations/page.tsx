import "../catalog-zoho.css";
import { ImageSlot } from "@/components/ui/ImageSlot";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { CtaBand, EmptyState, PageHero } from "@/components/ui/primitives";
import { getIntegrations, integrationHasPage, productsFor } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Integrations",
  description: "The tools ToyoApps products connect with — storage, messaging, creative tools and Google Workspace — and which product connects to each.",
  path: routes.integrations(),
  status: getIntegrations().length ? "live" : "draft",
});

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const initial = (s: string) => s.replace(/[^A-Za-z0-9]/g, "").slice(0, 1).toUpperCase();

/**
 * Integration directory, laid out like Zoho's integrations page: blue hero, a
 * centred count heading over a hub diagram (category tiles branching from a
 * central mark), then the full directory with a sticky category sidebar.
 * Every entry is an integration a product's own site names; entries get their
 * own page only once they have written content (`integrationHasPage`).
 */
export default function IntegrationsPage() {
  const all = getIntegrations();
  const groups = [...new Set(all.map((i) => i.category))].sort().map((category) => ({
    category,
    id: anchor(category),
    items: all.filter((i) => i.category === category),
  }));
  const half = Math.ceil(groups.length / 2);
  const sides = [groups.slice(0, half), groups.slice(half)];

  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Integrations", href: routes.integrations() }]}
        eyebrow="Integrations"
        title="Connect ToyoApps products with the tools you already use"
        lead="Every integration here is one a product names on its own site — cloud storage that feeds Sibu's asset library, Google Workspace for SigChanger, Google Contacts for Cardizo, and WhatsApp and Telegram for alerts and status tracking. Each entry shows which ToyoApps products support it."
      >
        <ImageSlot src="/images/catalog/integrations-hero.webp" alt="ToyoApps products connected to other business tools" width={960} height={360} priority className="zc-page-art" />
      </PageHero>

      {groups.length === 0 ? (
        <section className="zc-all">
          <div className="container">
            <EmptyState title="No integrations listed yet" />
          </div>
        </section>
      ) : (
        <>
          <section className="zc-hub-sec">
            <div className="container">
              <h2 className="zc-center-title">
                {all.length} {all.length === 1 ? "integration" : "integrations"} across {groups.length} {groups.length === 1 ? "category" : "categories"}
              </h2>
              <p className="zc-center-lead">Grouped by the kind of tool. Where an integration has its own page, it explains what connects and how each product uses it.</p>
              <div className="zc-hub">
                {sides.map((side, si) => (
                  <ul key={si} className={`zc-hub__side zc-hub__side--${si ? "right" : "left"}`}>
                    {side.map((g) => (
                      <li key={g.id}>
                        <a href={`#${g.id}`} className="zc-hub__tile">
                          <span className="zc-hub__label">{g.category}</span>
                          <span className="zc-hub__apps">
                            {g.items.slice(0, 3).map((i) => (
                              <span key={i.slug} className="zc-hub__app">
                                <span className="zc-hub__dot" aria-hidden>
                                  {initial(i.name)}
                                </span>
                                {i.name}
                              </span>
                            ))}
                            {g.items.length > 3 && <span className="zc-hub__more">+{g.items.length - 3}</span>}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
                <span className="zc-hub__core" aria-hidden>
                  <Icon name="layers" />
                </span>
              </div>
            </div>
          </section>

          <div className="container zc-layout zc-layout--plain">
            <nav className="zc-side" aria-label="Integration categories">
              <ul>
                <li>
                  <span className="zc-side__top zc-side__label">Categories</span>
                  <ul className="zc-side__sub">
                    {groups.map((g) => (
                      <li key={g.id}>
                        <a href={`#${g.id}`}>
                          {g.category} <span className="zc-side__count">{g.items.length}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link href={routes.products()} className="zc-side__top">
                    All products
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="zc-main">
              {groups.map((g) => (
                <section key={g.id} id={g.id} className="zc-section">
                  <header className="zc-head">
                    <h2 className="zc-title">{g.category}</h2>
                  </header>
                  <div className="zc-grid">
                    {g.items.map((i) => (
                      <article key={i.slug} id={i.slug} className="zc-card">
                        <div className="zc-card__inner">
                          <span className="zc-card__logo zc-card__logo--mono" aria-hidden>
                            {initial(i.name)}
                          </span>
                          {i.vendor && <p className="zc-card__vendor">{i.vendor}</p>}
                          <h3 className="zc-card__name zc-card__name--sm">
                            {integrationHasPage(i) ? <Link href={routes.integration(i.slug)}>{i.name}</Link> : i.name}
                          </h3>
                          <p className="zc-card__desc">{i.summary}</p>
                          <ul className="zc-card__chips" aria-label={`ToyoApps products that work with ${i.name}`}>
                            {productsFor(i.products).map((p) => (
                              <li key={p.slug}>
                                <Link href={routes.productSection(p.slug, "integrations")} className="badge badge--brand">
                                  {p.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </>
      )}

      <CtaBand
        title="Find the right software for your business."
        primary={{ label: "Explore products", href: routes.products() }}
        secondary={{ label: "Contact us", href: routes.contact() }}
      />
    </>
  );
}
