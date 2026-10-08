import Link from "next/link";
import { ProductLogo } from "@/components/product/cards";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";
import type { IconName } from "@/content/types";
import { getCatalogTree, getFeaturedProducts, getIndustries, getIntegrations, getProducts, getSolutions } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { tintStyle } from "@/lib/tint";

export const metadata = buildMetadata({
  title: `${site.name} — Business software, one ecosystem`,
  description: site.description,
  path: "/",
});

const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "grid",
    title: "Many products, one home",
    text: "Business software from across the ToyoApps ecosystem in one catalog, organised by the job each product does.",
  },
  {
    icon: "search",
    title: "Find by what you need",
    text: "Categories, solutions and industries lead you to the right tool faster than a flat list of apps ever could.",
  },
  {
    icon: "shield",
    title: "Verified product information",
    text: "Every feature, plan and price shown here is taken from the product's own official website — nothing invented.",
  },
  {
    icon: "store",
    title: "Open to software makers",
    text: "Founders can publish and sell their SaaS on ToyoApps without building a storefront or billing of their own.",
  },
];

/** Square, uppercase CTA with a chevron — the site's primary call to action. */
function SquareButton({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "outline" | "inverse" }) {
  return (
    <Link href={href} className={`zbtn zbtn--${variant}`}>
      {children}
      <span aria-hidden>›</span>
    </Link>
  );
}

export default function HomePage() {
  const tree = getCatalogTree();
  const products = getProducts();
  const featured = getFeaturedProducts(6);
  const solutions = getSolutions();
  const industries = getIndustries();
  const integrations = getIntegrations();
  const publicProducts = products.filter((p) => p.status === "live");

  return (
    <>
      {/* 1. Hero + featured apps */}
      <section className="z-hero" aria-labelledby="hero-title">
        <div className="container z-hero__grid">
          <div className="z-hero__copy">
            <h1 id="hero-title">The software your business runs on, in one place</h1>
            <hr className="z-rule" />
            <p>
              One home for business software — products organised by what you need to get done, from finding customers and running HR to
              keeping the office on track.
            </p>
            <SquareButton href={routes.products()}>Explore all products</SquareButton>
          </div>
          {featured.length > 0 && (
            <div className="z-featured">
              <p className="z-kicker">Featured apps</p>
              <ul className="z-featured__grid">
                {featured.map((p) => (
                  <li key={p.slug}>
                    <Link href={routes.product(p.slug)} className="z-featured__app">
                      <ProductLogo product={p} />
                      <span>
                        <strong>{p.name}</strong>
                        <small>{p.primaryUseCase ?? p.shortDescription}</small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={routes.products()} className="z-textlink">
                Explore all products <span aria-hidden>›</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 2. Two highlight cards on the brand band */}
      <section className="z-duo" aria-label="Highlights">
        <div className="container">
          <div className="z-duo__frame">
            <article className="z-duo__card z-duo__card--a">
              <span className="z-duo__tag">Solutions</span>
              <span className="z-duo__icon" aria-hidden>
                <Icon name="layers" />
              </span>
              <h2>Start from the problem, not the product</h2>
              <p>
                {solutions.length} solutions that bring together the ToyoApps products for one business need.
              </p>
              <Link href={routes.solutions()} className="zpill zpill--a">
                Explore solutions <span aria-hidden>›</span>
              </Link>
            </article>
            <article className="z-duo__card z-duo__card--b">
              <span className="z-duo__tag">For software makers</span>
              <span className="z-duo__icon" aria-hidden>
                <Icon name="rocket" />
              </span>
              <h2>Publish your SaaS on ToyoApps</h2>
              <p>List your product, reach customers and get paid — without building a storefront or billing.</p>
              <Link href={routes.publish()} className="zpill zpill--b">
                Learn about publishing <span aria-hidden>›</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 3. All-in-one catalog band */}
      <section className="z-suite" aria-labelledby="suite-title">
        <div className="container z-suite__grid">
          <div className="z-suite__main">
            <span className="z-suite__icon" aria-hidden>
              <Icon name="grid" />
            </span>
            <div>
              <p className="z-suite__kicker">All-in-one catalog</p>
              <h2 id="suite-title">ToyoApps Catalog</h2>
              <p className="z-suite__lead">One home for business software</p>
              <p className="z-suite__body">
                Browse {publicProducts.length} products across {tree.length} categories, each with its features, plans and the tools it
                connects to — then sign up on the product itself.
              </p>
              <SquareButton href={routes.products()}>Browse the catalog</SquareButton>
            </div>
          </div>
          <ul className="z-suite__side" aria-label="Categories">
            {tree.map(({ category, products: list }) => (
              <li key={category.slug}>
                <Link href={routes.category(category.slug)}>
                  <span className="icon-tile" style={tintStyle(category.slug)}>
                    <Icon name={category.icon} />
                  </span>
                  <span>
                    <strong>{category.name}</strong>
                    <small>
                      {list.length} {list.length === 1 ? "product" : "products"}
                    </small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Product logo strip */}
      <section className="z-brands" aria-labelledby="brands-title">
        <div className="container">
          <p id="brands-title" className="z-kicker">
            Our products
          </p>
          <ul className="z-brands__row">
            {publicProducts.map((p) => (
              <li key={p.slug}>
                <Link href={routes.product(p.slug)}>
                  <ProductLogo product={p} />
                  <span>{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={routes.products()} className="z-textlink">
            View all products <span aria-hidden>›</span>
          </Link>
        </div>
      </section>

      {/* 5. Industries showcase card */}
      {industries.length > 0 && (
        <section className="z-show" aria-labelledby="industries-title">
          <div className="container">
            <div className="z-show__card">
              <div className="z-show__copy">
                <h2 id="industries-title">Software matched to the way your industry works.</h2>
                <Link href={routes.industries()} className="zpill zpill--warm">
                  Explore industries <span aria-hidden>›</span>
                </Link>
              </div>
              <ul className="z-show__tiles">
                {industries.slice(0, 3).map((i) => (
                  <li key={i.slug}>
                    <Link href={routes.industry(i.slug)}>
                      <Icon name={i.icon ?? "building"} />
                      <strong>{i.name}</strong>
                      <span>{i.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 6. Integrations split */}
      {integrations.length > 0 && (
        <section className="z-split" aria-labelledby="integrations-title">
          <div className="container z-split__grid">
            <div className="z-split__main">
              <span className="z-split__icon" aria-hidden>
                <Icon name="code" />
              </span>
              <div>
                <h2 id="integrations-title">Connect with the tools you already use</h2>
                <p>
                  {integrations.length} integrations named by the products themselves — storage, messaging, creative tools and Google
                  Workspace.
                </p>
                <SquareButton href={routes.integrations()} variant="outline">
                  Learn more
                </SquareButton>
              </div>
            </div>
            <div className="z-split__aside">
              <ul className="z-split__chips">
                {integrations.map((i) => (
                  <li key={i.slug}>
                    <Link href={`${routes.integrations()}#${i.slug}`}>{i.name}</Link>
                  </li>
                ))}
              </ul>
              <Link href={routes.integrations()} className="z-textlink">
                View all integrations <span aria-hidden>›</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7. Values card over a brand band */}
      <section className="z-values" aria-labelledby="values-title">
        <div className="z-values__band" aria-hidden />
        <div className="container">
          <div className="z-values__card">
            <h2 id="values-title">The principles behind ToyoApps</h2>
            <hr className="z-rule z-rule--center" />
            <ul className="z-values__grid">
              {values.map((v) => (
                <li key={v.title}>
                  <span className="z-values__icon" aria-hidden>
                    <Icon name={v.icon} />
                  </span>
                  <div>
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="z-center">
              <SquareButton href={routes.company()} variant="outline">
                Read our story
              </SquareButton>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Stats band — real counts from the catalog */}
      <section className="z-stats" aria-labelledby="stats-title">
        <div className="container">
          <h2 id="stats-title">
            Built for growing businesses.
            <br />
            Organised for the way they work.
          </h2>
          <hr className="z-rule z-rule--center z-rule--light" />
          <ul className="z-stats__row">
            <li>
              <strong>{publicProducts.length}</strong>
              <span>Products</span>
            </li>
            <li>
              <strong>{tree.length}</strong>
              <span>Categories</span>
            </li>
            <li>
              <strong>{solutions.length}</strong>
              <span>Solutions</span>
            </li>
            <li>
              <strong>{industries.length}</strong>
              <span>Industries</span>
            </li>
            <li>
              <strong>{integrations.length}</strong>
              <span>Integrations</span>
            </li>
          </ul>
          <div className="z-center">
            <SquareButton href={routes.company()} variant="inverse">
              More about ToyoApps
            </SquareButton>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="z-cta" aria-labelledby="cta-title">
        <div className="container">
          <h2 id="cta-title">Ready to find your next tool?</h2>
          <p>Let&apos;s get you started.</p>
          <SquareButton href={routes.products()}>Explore products</SquareButton>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          potentialAction: {
            "@type": "SearchAction",
            target: `${site.url}/products?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        })}
      />
    </>
  );
}
