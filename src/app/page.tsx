import Link from "next/link";
import { Suspense } from "react";
import { EcosystemOrbit } from "@/components/home/EcosystemOrbit";
import { FeaturedShowcase } from "@/components/home/FeaturedShowcase";
import { CategoryCard } from "@/components/product/cards";
import { ProductExplorer } from "@/components/product/ProductExplorer";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink, CtaBand, EmptyState, Section, SectionHeader, Slot } from "@/components/ui/primitives";
import { publisherSteps, site } from "@/content/site";
import {
  getCatalogTree,
  getCategories,
  getFeaturedProducts,
  getIndustries,
  getProducts,
  getSolutions,
  previewMode,
  productsFor,
} from "@/lib/catalog";
import { resourceTypes, routes } from "@/lib/routes";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { tintStyle } from "@/lib/tint";

export const metadata = buildMetadata({
  title: `${site.name} — Business software, one ecosystem`,
  description: site.description,
  path: "/",
});

/** How ToyoApps works for a buyer — drawn from the current toyoapps.com messaging. */
const ecosystemFlow = [
  { title: "Discover", text: "Browse software organised by business need, not a flat list of apps." },
  { title: "Compare", text: "Read what each product does, who it's for and how it's priced." },
  { title: "Start", text: "Sign up on the product itself — most offer a free plan or trial." },
  { title: "Grow", text: "Add the next product your business needs from the same ecosystem." },
];

const reasons = [
  { icon: "grid" as const, title: "Many products, one home", text: "Business software from across the ToyoApps ecosystem, organised in one catalog." },
  { icon: "search" as const, title: "Find by need", text: "Categories, solutions and industries lead you to the right tool faster." },
  { icon: "store" as const, title: "Open to makers", text: "Software makers can publish and sell on ToyoApps without building a storefront." },
];

export default function HomePage() {
  const categories = getCategories();
  const tree = getCatalogTree();
  const products = getProducts();
  const featured = getFeaturedProducts(5);
  const solutions = getSolutions().slice(0, 6);
  const industries = getIndustries().slice(0, 12);

  return (
    <>
      {/* 1. Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">The ToyoApps ecosystem</p>
            <h1 id="hero-title" className="display">
              The software your business runs on, <em>in one place.</em>
            </h1>
            <p className="lead">
              ToyoApps brings business software together in one ecosystem — organised by what you need to get done,
              so you can find the right tool and the next one after it.
            </p>
            <form action={routes.products()} role="search" className="hero__search">
              <Icon name="search" />
              <label htmlFor="hero-search" className="sr-only">
                Search ToyoApps products
              </label>
              <input id="hero-search" name="q" type="search" placeholder="What do you need to get done?" />
              <button type="submit" className="btn btn--primary btn--sm">
                Search
              </button>
            </form>
            <div className="btn-row">
              <ButtonLink href={routes.products()} variant="dark" arrow>
                Explore products
              </ButtonLink>
              <ButtonLink href={routes.contact()} variant="secondary">
                Talk to sales
              </ButtonLink>
            </div>
          </div>
          <EcosystemOrbit categories={categories} />
        </div>
      </section>

      {/* 2. Product discovery */}
      <Section tone="surface" labelledBy="explore-title">
        <SectionHeader
          id="explore-title"
          eyebrow="Explore products"
          title="Find the right tool for the job"
          lead="Search across every ToyoApps product, or filter by the part of the business you're working on."
          action={
            <ButtonLink href={routes.products()} variant="secondary" arrow>
              View all products
            </ButtonLink>
          }
        />
        {products.length ? (
          <Suspense>
            <ProductExplorer products={products} categories={categories.map(({ slug, name }) => ({ slug, name }))} limit={9} />
          </Suspense>
        ) : (
          <EmptyState title="Our first products are on their way">
            The ToyoApps catalog is being prepared. Get in touch to hear when products launch.
          </EmptyState>
        )}
      </Section>

      {/* 3. Category explorer */}
      {tree.length > 0 && (
        <Section labelledBy="categories-title">
          <SectionHeader
            id="categories-title"
            eyebrow="Browse by category"
            title="Organised around how businesses work"
            lead="Every product lives in a category built around a business function, so related tools are always side by side."
          />
          <div className="grid" style={{ ["--min" as string]: "260px" }}>
            {tree.map(({ category, products }) => (
              <CategoryCard key={category.slug} category={category} products={products} />
            ))}
          </div>
        </Section>
      )}

      {/* 4. Featured software */}
      {featured.length > 0 && (
        <Section tone="surface" labelledBy="featured-title">
          <SectionHeader id="featured-title" eyebrow="Featured software" title="A closer look" />
          <FeaturedShowcase products={featured} />
        </Section>
      )}

      {/* 5. Ecosystem */}
      <Section tone="ink" labelledBy="ecosystem-title">
        <SectionHeader
          id="ecosystem-title"
          eyebrow="How the ecosystem works"
          title="Not a collection of apps. One place to run them."
          lead="ToyoApps is designed so the next product your business needs is already a step away — same account, same catalog, same way of buying."
        />
        <ol className="flow">
          {ecosystemFlow.map((s, i) => (
            <li key={s.title} className="flow__step">
              <span className="flow__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 6. Why ToyoApps */}
      <Section labelledBy="why-title">
        <SectionHeader id="why-title" eyebrow="Why ToyoApps" title="Built for businesses choosing software" />
        <div className="grid" style={{ ["--min" as string]: "240px" }}>
          {reasons.map((r) => (
            <article key={r.title} className="card">
              <span className="icon-tile" style={tintStyle(categories[0]?.slug ?? "")}>
                <Icon name={r.icon} />
              </span>
              <h3 className="card__title">{r.title}</h3>
              <p className="text-muted">{r.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 7–8. Solutions & industries */}
      {(solutions.length > 0 || industries.length > 0) && (
        <Section tone="surface" labelledBy="solutions-title">
          <SectionHeader
            id="solutions-title"
            eyebrow="Solutions"
            title="Start from the problem, not the product"
            action={
              <ButtonLink href={routes.solutions()} variant="secondary" arrow>
                All solutions
              </ButtonLink>
            }
          />
          {solutions.length > 0 && (
            <div className="grid" style={{ ["--min" as string]: "320px" }}>
              {solutions.map((s) => (
                <Link key={s.slug} href={routes.solution(s.slug)} className="card">
                  <p className="product-card__cat">Problem</p>
                  <h3 className="card__title">{s.problem}</h3>
                  <p className="text-muted">{s.approach}</p>
                  <div className="card__meta">
                    {productsFor(s.products).map((p) => (
                      <span key={p.slug} className="badge">
                        {p.name}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
          {industries.length > 0 && (
            <>
              <h3 className="h3" style={{ margin: "48px 0 20px" }}>
                By industry
              </h3>
              <div className="chips">
                {industries.map((i) => (
                  <Link key={i.slug} href={routes.industry(i.slug)} className="chip">
                    {i.name}
                  </Link>
                ))}
              </div>
            </>
          )}
        </Section>
      )}

      {/* 9. Discovery / recommendation entry point */}
      <Section labelledBy="finder-title">
        <div className="finder">
          <div className="stack">
            <p className="eyebrow">Not sure where to start?</p>
            <h2 id="finder-title" className="h2">
              Which ToyoApps product is right for you?
            </h2>
            <p className="lead">Tell us about your business and what you need to solve. We&apos;ll point you to the right products.</p>
            <ButtonLink href={routes.contact()} arrow>
              Get a recommendation
            </ButtonLink>
          </div>
          <div className="finder__fields" aria-hidden>
            {[
              ["Business type", "Agency, retailer, studio…"],
              ["Team size", "Just me → 500+"],
              ["Problem to solve", "Billing, hiring, support…"],
              ["Must-have capabilities", "Automations, reports…"],
            ].map(([k, v]) => (
              <div key={k} className="finder__field">
                <small>{k}</small>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 10. Trust — reserved slots, preview only until real proof exists */}
      {previewMode && (
        <Section tight labelledBy="trust-title">
          <h2 id="trust-title" className="sr-only">
            Customers and trust
          </h2>
          <div className="grid" style={{ ["--min" as string]: "220px" }}>
            <Slot show label="Customer logos" hint="Real, approved logos only" />
            <Slot show label="Testimonials" hint="Attributed quotes only" />
            <Slot show label="Adoption numbers & ratings" hint="Verified figures only" />
            <Slot show label="Security & certifications" hint="Held certifications only" />
          </div>
        </Section>
      )}

      {/* 11. Resources */}
      <Section tone="surface" labelledBy="resources-title">
        <SectionHeader
          id="resources-title"
          eyebrow="Resources"
          title="Learn, compare and get more from your software"
          action={
            <ButtonLink href={routes.resources()} variant="secondary" arrow>
              Resource centre
            </ButtonLink>
          }
        />
        <div className="grid" style={{ ["--min" as string]: "240px" }}>
          {resourceTypes.map((r) => (
            <Link key={r.type} href={routes.resourceType(r.type)} className="card">
              <h3 className="card__title">{r.label}</h3>
              <p className="text-muted">{r.description}</p>
              <span className="card__foot">
                Browse <Icon name="arrow-right" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Marketplace: publishers (from the current toyoapps.com) */}
      <Section labelledBy="publish-title">
        <SectionHeader
          id="publish-title"
          eyebrow="For software makers"
          title="Publish your SaaS on ToyoApps"
          lead="List your product, reach customers and get paid — without building your own storefront or billing."
          action={
            <ButtonLink href={routes.publish()} variant="secondary" arrow>
              Learn about publishing
            </ButtonLink>
          }
        />
        <ol className="steps">
          {publisherSteps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 12. Final CTA */}
      <CtaBand
        title="Find the right software for your business."
        lead="Explore the ToyoApps catalog, or tell us what you need and we'll help you choose."
        primary={{ label: "Explore products", href: routes.products() }}
        secondary={{ label: "Contact sales", href: routes.contact() }}
      />

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
