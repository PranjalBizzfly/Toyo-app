import { PageFaqs } from "@/components/ui/PageFaqs";
import { getSiteFaqs } from "@/lib/faqs";
import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { ProductLogo } from "@/components/product/cards";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/primitives";
import { site } from "@/content/site";
import type { Category, Feature, IconName, Product } from "@/content/types";
import {
  featureHasPage,
  getCategories,
  getCategory,
  getFeaturedProducts,
  getFeatures,
  getIndustries,
  getIntegrations,
  getProducts,
  getProductsByCategory,
  getSolutions,
  groupFeatures,
  integrationHasPage,
  productsFor,
} from "@/lib/catalog";
import { getAvailableSections, getProductItems } from "@/lib/product-sections";
import { routes } from "@/lib/routes";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { tintStyle } from "@/lib/tint";
import "@/app/home.css";
import "@/app/home-zoho.css";
import "@/app/home-hero.css";
import { ImageSlot } from "@/components/ui/ImageSlot";

export const metadata = buildMetadata({
  title: `${site.name} — Business software, one ecosystem`,
  description: site.description,
  path: "/",
});

/** The product spotlight. `null` = the first featured product. */
const SPOTLIGHT_SLUG: string | null = null;

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

/* ---------- small helpers ---------- */

function SquareButton({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "outline" | "inverse" }) {
  return (
    <Link href={href} className={`zbtn zbtn--${variant}`}>
      {children}
      <span aria-hidden>›</span>
    </Link>
  );
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="z-textlink">
      {children} <span aria-hidden>›</span>
    </Link>
  );
}

const isPending = (p: Product) =>
  p.status === "pending" || p.verification?.relationship === "pending" || p.verification?.publicSale === "pending";

/** Link a feature to its page, else to the product's features hub, else to the product. */
function featureHref(p: Product, f: Feature, hasFeaturesHub: boolean) {
  if (featureHasPage(f)) return routes.feature(p.slug, f.slug);
  return hasFeaturesHub ? routes.productSection(p.slug, "features") : routes.product(p.slug);
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

function SectionHead({ id, kicker, title, lead, align = "center" }: { id: string; kicker?: string; title: string; lead?: string; align?: "left" | "center" }) {
  return (
    <header className={`h-head h-head--${align}`}>
      {kicker && <p className="h-eyebrow">{kicker}</p>}
      <h2 id={id}>{title}</h2>
      <hr className="h-rule" />
      {lead && <p className="h-lead">{lead}</p>}
    </header>
  );
}

export default function HomePage() {
  /* ---------- data ---------- */
  const products = getProducts();
  const categories: Category[] = getCategories();
  const catName = (slug: string) => getCategory(slug)?.name ?? "";
  // Every category that lists at least one visible product (category pages exist for all of them).
  const ecosystem = categories
    .map((category) => ({ category, products: getProductsByCategory(category.slug) }))
    .filter((g) => g.products.length > 0);
  const featured = getFeaturedProducts(6);
  const solutions = getSolutions();
  const industries = getIndustries();
  const integrations = getIntegrations();

  const sections = new Map(products.map((p) => [p.slug, getAvailableSections(p)]));
  const hasHub = (p: Product) => !!sections.get(p.slug)?.includes("features");
  const pageFeatures = (p: Product) => getFeatures(p).filter(featureHasPage);
  const totalFeaturePages = products.reduce((n, p) => n + pageFeatures(p).length, 0);

  const keyCapability = (p: Product) => getFeatures(p).find((f) => f.highlight) ?? pageFeatures(p)[0] ?? getFeatures(p)[0];

  // 3. Needs: solutions (problem → products) and category taglines.
  const needs = [
    ...solutions.map((s) => ({
      key: `s-${s.slug}`,
      kind: "Solution",
      icon: "layers" as IconName,
      title: s.cardTitle ?? s.name,
      // Card copy in the category-card style (who it is for, then what each product does).
      text: s.cardText ?? s.summary,
      href: routes.solution(s.slug),
      meta: productsFor(s.products).map((p) => p.name).join(" · "),
      // Same card layout as the category cards: icon, label, title, text, product names.
      tint: productsFor(s.products)[0]?.category as string | undefined,
      points: undefined as { name: string; text: string }[] | undefined,
    })),
    ...ecosystem.map(({ category, products: list }) => ({
      key: `c-${category.slug}`,
      kind: category.name,
      icon: category.icon,
      title: category.tagline,
      text: category.description,
      href: routes.category(category.slug),
      meta: list.map((p) => p.name).join(" · "),
      tint: category.slug,
      points: undefined as { name: string; text: string }[] | undefined,
    })),
  ];

  // 6. Task cards: feature groups holding ≥ 2 features, at most two per product.
  const taskCards = products
    .flatMap((p) =>
      groupFeatures(p)
        .filter((g) => g.group.slug !== "other" && g.features.length >= 2)
        .sort((a, b) => b.features.filter(featureHasPage).length - a.features.filter(featureHasPage).length)
        .slice(0, 2)
        .map((g) => ({ product: p, group: g.group, features: g.features.slice(0, 4) })),
    )
    .sort((a, b) => b.features.filter(featureHasPage).length - a.features.filter(featureHasPage).length)
    .slice(0, 9);

  // 8. Roles: feature `audience` values named by two or more products.
  const roleMap = new Map<string, { label: string; products: Map<string, { product: Product; features: Feature[] }> }>();
  for (const p of products) {
    for (const f of getFeatures(p)) {
      for (const a of f.audience ?? []) {
        const key = a.trim().toLowerCase();
        if (!key) continue;
        const entry = roleMap.get(key) ?? { label: a.trim(), products: new Map() };
        const row = entry.products.get(p.slug) ?? { product: p, features: [] };
        row.features.push(f);
        entry.products.set(p.slug, row);
        roleMap.set(key, entry);
      }
    }
  }
  const roles = [...roleMap.values()]
    .filter((r) => r.products.size >= 2)
    .sort((a, b) => b.products.size - a.products.size || a.label.localeCompare(b.label))
    .slice(0, 6);

  // 10. Feature depth: products with ≥ 3 feature pages.
  const depth = products
    .map((p) => ({ product: p, features: pageFeatures(p) }))
    .filter((d) => d.features.length >= 3)
    .sort((a, b) => b.features.length - a.features.length)
    .slice(0, 4)
    .map((d) => ({ ...d, features: d.features.slice(0, 5) }));

  // 13. Spotlight.
  const spotlight = (SPOTLIGHT_SLUG && products.find((p) => p.slug === SPOTLIGHT_SLUG)) || featured[0];
  const spotlightCaps = spotlight
    ? [...getFeatures(spotlight).filter((f) => f.highlight), ...pageFeatures(spotlight)].filter((f, i, a) => a.indexOf(f) === i).slice(0, 5)
    : [];

  // 14. Resources: product-scoped resources and support topics that earn a page.
  const resourceItems = products.flatMap((p) =>
    (["resources", "support"] as const).flatMap((section) =>
      getProductItems(p, section)
        .filter((i) => i.hasPage)
        .map((i) => ({ product: p, section, item: i })),
    ),
  );
  const resourceList = resourceItems.slice(0, 6);

  const stats = [
    { n: products.length, label: "Products" },
    { n: ecosystem.length, label: "Categories" },
    { n: totalFeaturePages, label: "Feature pages" },
    { n: solutions.length, label: "Solutions" },
    { n: industries.length, label: "Industries" },
    { n: integrations.length, label: "Integrations" },
  ].filter((s) => s.n > 0);

  const steps: { icon: IconName; title: string; text: string }[] = [
    { icon: "search", title: "Discover", text: "Browse by category, business need, industry or the task you want done." },
    { icon: "check", title: "Choose", text: "Compare features, plans and details taken from each product's own website." },
    { icon: "code", title: "Connect", text: "See which tools each product works with and how products relate to each other." },
    { icon: "rocket", title: "Grow", text: "Sign up on the product itself, and come back as your business needs more." },
  ];

  const why: { icon: IconName; title: string; text: string }[] = [
    { icon: "grid", title: "One place", text: `${plural(products.length, "product")} in a single catalog, each with its own overview, features and plans.` },
    {
      icon: "search",
      title: "Four ways in",
      text: `Discover by ${plural(ecosystem.length, "category", "categories")}, ${plural(totalFeaturePages, "feature page")}, ${plural(solutions.length, "solution")} or ${plural(industries.length, "industry", "industries")}.`,
    },
    { icon: "layers", title: "Connected products", text: "Product pages show the stated connections between ToyoApps products and the integrations each one names." },
    { icon: "shield", title: "Consistent pages", text: "Every product follows the same structure, so moving from one tool to the next takes no re-learning." },
  ];

  return (
    <div className="home">
      {/* 1. Hero */}
      <HomeHero
        siteName={site.name}
        products={products}
        categories={ecosystem}
        integrations={integrations}
        industriesCount={industries.length}
        featurePages={totalFeaturePages}
      />

      {/* 1b. Promo pair over the band (Zoho "promos") */}
      <section className="z-duo hz-duo" aria-label="Get started">
        <div className="container">
          <div className="z-duo__frame">
            <div className="z-duo__card z-duo__card--a">
              <span className="z-duo__tag">For software makers</span>
              <span className="z-duo__icon" aria-hidden>
                <Icon name="rocket" />
              </span>
              <h2 id="publish-title">Publish your SaaS on {site.name}</h2>
              <p>Create a listing with pricing, demos and screenshots, go live in the marketplace, and get paid through built-in subscription and one-time billing.</p>
              <Link href={routes.publish()} className="hz-pill">
                Learn about publishing <span aria-hidden>›</span>
              </Link>
            </div>
            <div className="z-duo__card z-duo__card--b">
              <span className="z-duo__tag">Start from the problem</span>
              <span className="z-duo__icon" aria-hidden>
                <Icon name="layers" />
              </span>
              <h2>{plural(solutions.length, "solution")} for real business needs</h2>
              <p>Each solution starts from a business problem, explains the approach, and shows what each {site.name} product contributes.</p>
              <Link href={routes.solutions()} className="hz-pill">
                Browse solutions <span aria-hidden>›</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1c. Spotlight band: media + details, then a capabilities grid */}
      {spotlight && (
        <section className="z-suite hs-spot" aria-labelledby="spotlight-title">
          <div className="container">
            <div className="hs-spot__top">
              <div className="hs-spot__media">
                <ImageSlot src="/images/home/spotlight.webp" alt={`${spotlight.name} AI business card scanner and instant contact follow-up console`} width={960} height={600} />
                <span className="hs-spot__badge">
                  <ProductLogo product={spotlight} />
                  <span>
                    <strong>{spotlight.name}</strong>
                    <small>{catName(spotlight.category)}</small>
                  </span>
                </span>
              </div>
              <div className="hs-spot__copy">
                <p className="z-suite__kicker">Product spotlight · {catName(spotlight.category)}</p>
                <h2 id="spotlight-title">{spotlight.name}</h2>
                {spotlight.tagline && <p className="z-suite__lead">{spotlight.tagline}</p>}
                <p className="hs-spot__body">{(spotlight.longDescription ?? spotlight.shortDescription).split(/\n\s*\n/)[0]}</p>
                {!!spotlight.audience?.length && (
                  <p className="hs-spot__meta">
                    <b>Built for</b>
                    {spotlight.audience.map((a) => (
                      <span key={a}>{a}</span>
                    ))}
                  </p>
                )}
                <SquareButton href={routes.product(spotlight.slug)}>Explore {spotlight.name}</SquareButton>
              </div>
            </div>
            {spotlightCaps.length > 0 && (
              <div className="hs-spot__caps-wrap">
                <div className="hs-spot__caps-head">
                  <h3>Key capabilities</h3>
                  <Link href={routes.product(spotlight.slug)}>
                    All {spotlight.name} features <span aria-hidden>→</span>
                  </Link>
                </div>
                <ul className="hs-spot__caps" aria-label={`${spotlight.name} capabilities`}>
                  {spotlightCaps.map((f) => (
                    <li key={f.slug}>
                      <Link href={featureHref(spotlight, f, hasHub(spotlight))}>
                        <span className="icon-tile">
                          <Icon name="check" />
                        </span>
                        <span>
                          <strong>{f.name}</strong>
                          <small>{f.summary}</small>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 1d. Product strip (Zoho "brands that trust us") */}
      <section className="z-brands hz-brands" aria-labelledby="brands-title">
        <div className="container">
          <h2 id="brands-title" className="hz-label">
            All {site.name} products
          </h2>
          <LogoMarquee label={`All ${site.name} products`}>
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={routes.product(p.slug)} tabIndex={-1}>
                  <ProductLogo product={p} />
                  <span>{p.name}</span>
                </Link>
              </li>
            ))}
          </LogoMarquee>
          <TextLink href={routes.products()}>Explore all products</TextLink>
        </div>
      </section>

      {/* 2. Featured products */}
      {featured.length > 0 && (
        <section className="h-sec" aria-labelledby="featured-title">
          <div className="container">
            <SectionHead id="featured-title" kicker="Featured" title="Products to start with" lead="A selection from across the catalog, with each product's tagline and its main capabilities. Open one to see its features, plans and support." />
            <ul className="h-featured">
              {featured.map((p) => {
                const cap = keyCapability(p);
                return (
                  <li key={p.slug}>
                    <article className="h-card h-fcard">
                      <div className="hi-card-art">
                        <ImageSlot src={`/images/products/${p.slug}/card.webp`} alt={`${p.name} — ${p.tagline ?? p.shortDescription}`} width={640} height={360} />
                      </div>
                      <div className="h-fcard__head">
                        <ProductLogo product={p} />
                        <div>
                          <h3>{p.name}</h3>
                          <Link href={routes.category(p.category)} className="h-tag">
                            {catName(p.category)}
                          </Link>
                        </div>
                      </div>
                      <p>{p.tagline ?? p.shortDescription}</p>
                      {cap && (
                        <p className="h-fcard__cap">
                          <Icon name="spark" />
                          <span>
                            <small>Key capability</small>
                            {cap.name}
                          </span>
                        </p>
                      )}
                      <Link href={routes.product(p.slug)} className="h-more">
                        View product <span aria-hidden>›</span>
                      </Link>
                    </article>
                  </li>
                );
              })}
            </ul>
            <div className="h-center">
              <TextLink href={routes.products()}>Explore all products</TextLink>
            </div>
          </div>
        </section>
      )}

      {/* 3. Needs */}
      {needs.length > 0 && (
        <section className="h-sec h-sec--dark st-curve" aria-labelledby="needs-title">
          <div className="container">
            <SectionHead id="needs-title" kicker="Start from the problem" title="What are you looking to solve?" align="center" />
            <ul className="h-needs">
              {needs.map((n) => (
                <li key={n.key}>
                  <Link href={n.href} className="h-need" style={n.tint ? tintStyle(n.tint) : undefined}>
                    <span className="icon-tile">
                      <Icon name={n.icon} />
                    </span>
                    <small>{n.kind}</small>
                    <strong>{n.title}</strong>
                    <span className="h-need__text">{n.text}</span>
                    {n.points && n.points.length > 0 && (
                      <span className="h-need__points">
                        <span className="h-need__points-label">How it helps</span>
                        {n.points.map((pt) => (
                          <span key={pt.name} className="h-need__point">
                            <b>{pt.name}</b> {pt.text}
                          </span>
                        ))}
                      </span>
                    )}
                    {n.meta && !n.points?.length && <span className="h-need__meta">{n.meta}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 4. Ecosystem by category */}
      <section className="h-sec" aria-labelledby="eco-title">
        <div className="container">
          <SectionHead id="eco-title" kicker="Ecosystem" title="The ecosystem by category" lead="Every product sits in the category of the business function it serves, and some also appear in a second category where they clearly fit." />
          <div className="h-eco">
            {ecosystem.map(({ category, products: list }) => (
              <article key={category.slug} className="h-eco__row" style={tintStyle(category.slug)}>
                <div className="h-eco__about">
                  <span className="icon-tile">
                    <Icon name={category.icon} />
                  </span>
                  <div>
                    <h3>{category.name}</h3>
                    <p className="h-eco__count">{plural(list.length, "product")}</p>
                    <p>{category.description}</p>
                  </div>
                </div>
                <ul className="h-eco__apps">
                  {list.slice(0, 4).map((p) => (
                    <li key={p.slug}>
                      <Link href={routes.product(p.slug)}>
                        <ProductLogo product={p} />
                        <span>{p.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <TextLink href={routes.category(category.slug)}>Explore {category.name}</TextLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Full portfolio */}
      <section className="h-sec h-sec--surface" aria-labelledby="portfolio-title">
        <div className="container">
          <SectionHead id="portfolio-title" kicker="Portfolio" title="Every product in the catalog" lead={`All ${plural(products.length, "product")}, A–Z within each category.`} />
          <ul className="h-portfolio">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={routes.product(p.slug)} className="h-pcard">
                  <ProductLogo product={p} />
                  <span className="h-pcard__body">
                  <span className="h-pcard__head">
                    <strong>{p.name}</strong>
                    <small>{catName(p.category)}</small>
                  </span>
                  <span className="h-pcard__desc">{p.shortDescription}</span>
                  {p.primaryUseCase && (
                    <span className="h-pcard__focus">
                      <b>Focus:</b> {p.primaryUseCase}
                    </span>
                  )}
                  <span className="h-pcard__foot">
                    <StatusBadge status={p.status} pending={isPending(p)} />
                    <span className="h-more">
                      View <span aria-hidden>›</span>
                    </span>
                  </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Discover by task */}
      {taskCards.length > 0 && (
        <section className="h-sec" aria-labelledby="tasks-title">
          <div className="container">
            <SectionHead id="tasks-title" kicker="Discover by task" title="Find the tool by the job to be done" lead="Each card is a feature group from one product, listing the features inside it — a quick way to find a tool by the task you need done." />
            <ul className="h-tasks">
              {taskCards.map(({ product: p, group, features }) => (
                <li key={`${p.slug}-${group.slug}`} className="h-task">
                  <p className="h-task__by">
                    <ProductLogo product={p} />
                    {p.name}
                  </p>
                  <h3>{group.name}</h3>
                  <ul>
                    {features.map((f) => (
                      <li key={f.slug}>
                        <Link href={featureHref(p, f, hasHub(p))}>
                          <Icon name="check" />
                          {f.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 7. Industries */}
      {industries.length > 0 && (
        <section className="h-sec h-sec--brand" aria-labelledby="industries-title">
          <div className="container">
            <SectionHead id="industries-title" kicker="Industries" title="Software matched to the way your industry works" />
            <ul className="h-industries">
              {industries.map((ind) => {
                const list = productsFor(ind.products);
                const sols = solutions.filter((s) => s.products.some((sp) => ind.products.includes(sp)));
                return (
                  <li key={ind.slug} className="h-card h-ind">
                    <div className="hi-card-art">
                      <ImageSlot src={`/images/industries/${ind.slug}.webp`} alt={`${ind.name} software and workflow solutions`} width={640} height={360} />
                    </div>
                    <span className="h-ind__icon" aria-hidden>
                      <Icon name={ind.icon ?? "building"} />
                    </span>
                    <h3>{ind.name}</h3>
                    <p>{ind.summary}</p>
                    {list.length > 0 && (
                      <p className="h-ind__list">
                        <small>Products</small>
                        {list.map((p) => (
                          <Link key={p.slug} href={routes.product(p.slug)} className="h-tag">
                            {p.name}
                          </Link>
                        ))}
                      </p>
                    )}
                    {sols.length > 0 && (
                      <p className="h-ind__list">
                        <small>Solutions</small>
                        {sols.map((s) => (
                          <Link key={s.slug} href={routes.solution(s.slug)} className="h-tag">
                            {s.name}
                          </Link>
                        ))}
                      </p>
                    )}
                    <Link href={routes.industry(ind.slug)} className="h-more">
                      Explore {ind.name} <span aria-hidden>›</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="h-center">
              <TextLink href={routes.industries()}>All industries</TextLink>
            </div>
          </div>
        </section>
      )}

      {/* 8. Roles — only from feature `audience` data */}
      {roles.length > 0 && (
        <section className="h-sec" aria-labelledby="roles-title">
          <div className="container">
            <SectionHead id="roles-title" kicker="For your team" title="Built for the people doing the work" lead="The roles below are the audiences named in each product's own feature descriptions, with the products that serve them." />
            <ul className="h-roles">
              {roles.map((r) => (
                <li key={r.label} className="h-role">
                  <h3>
                    <Icon name="users" />
                    {r.label}
                  </h3>
                  <ul>
                    {[...r.products.values()].slice(0, 4).map(({ product: p, features }) => {
                      const f = features.find(featureHasPage) ?? features[0];
                      return (
                        <li key={p.slug}>
                          <Link href={routes.product(p.slug)}>{p.name}</Link>
                          {" "}
                          <Link href={featureHref(p, f, hasHub(p))} className="h-role__f">
                            {f.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 9. How it works */}
      <section className="h-sec h-sec--island" aria-labelledby="how-title">
        <div className="container">
          <SectionHead id="how-title" kicker="How it works" title={`How ${site.name} works`} align="center" />
          <div className="hi-band-art">
            <ImageSlot src="/images/home/how-it-works.webp" alt={`How ${site.name} works`} width={1200} height={360} />
          </div>
          <ol className="h-steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="h-steps__n" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10. Feature depth */}
      {depth.length > 0 && (
        <section className="h-sec" aria-labelledby="depth-title">
          <div className="container">
            <SectionHead id="depth-title" kicker="Feature depth" title="Go deep on what each product does" lead="These features have a page of their own explaining the problem they solve, how they work step by step, and who uses them." />
            <div className="h-depth">
              {depth.map(({ product: p, features }) => (
                <article key={p.slug} className="h-depth__col">
                  <Link href={routes.product(p.slug)} className="h-depth__head">
                    <ProductLogo product={p} />
                    <h3>{p.name}</h3>
                  </Link>
                  <ol>
                    {features.map((f) => (
                      <li key={f.slug}>
                        <Link href={routes.feature(p.slug, f.slug)}>
                          <strong>{f.name}</strong>
                          <span>{f.summary}</span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                  {hasHub(p) && <TextLink href={routes.productSection(p.slug, "features")}>All {p.name} features</TextLink>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. Integrations */}
      {integrations.length > 0 && (
        <section className="h-sec h-sec--surface" aria-labelledby="integrations-title">
          <div className="container h-split">
            <div className="h-split__intro">
              <SectionHead
                id="integrations-title"
                align="left"
                kicker="Integrations"
                title="Connect with the tools you already use"
                lead={`${plural(integrations.length, "integration")} named by the products themselves.`}
              />
              <SquareButton href={routes.integrations()} variant="outline">
                View all integrations
              </SquareButton>
              <div className="hi-side-art">
                <ImageSlot src="/images/home/integrations.webp" alt="Connected business tools" width={560} height={420} />
              </div>
            </div>
            <ul className="h-ints">
              {integrations.map((i) => (
                <li key={i.slug}>
                  <Link href={integrationHasPage(i) ? routes.integration(i.slug) : `${routes.integrations()}#${i.slug}`} className="h-int">
                    <strong>{i.name}</strong>
                    <small>{i.category}</small>
                    <span>{i.summary}</span>
                    <em>{productsFor(i.products).map((p) => p.name).join(" · ")}</em>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 12. Why ToyoApps */}
      <section className="h-sec h-sec--dark st-curve" aria-labelledby="why-title">
        <div className="container">
          <SectionHead id="why-title" kicker={`Why ${site.name}`} title="One catalog, built around how you look for software" align="center" />
          <div className="hi-band-art">
            <ImageSlot src="/images/home/why.webp" alt={`Why ${site.name}`} width={1200} height={400} />
          </div>
          <ul className="h-why">
            {why.map((w) => (
              <li key={w.title}>
                <Icon name={w.icon} />
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 14. Resources — product-scoped resources and support topics with pages */}
      {resourceList.length > 0 && (
        <section className="h-sec" aria-labelledby="resources-title">
          <div className="container">
            <SectionHead id="resources-title" kicker="Resources" title="Guides and help from the products" />
            <ul className="h-res">
              {resourceList.map(({ product: p, section, item }) => (
                <li key={`${p.slug}-${section}-${item.slug}`}>
                  <Link href={routes.productItem(p.slug, section, item.slug)} className="h-card h-res__item">
                    <small>
                      {p.name} · {section === "support" ? "Support" : "Resource"}
                    </small>
                    <strong>{item.name}</strong>
                    <span>{item.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="h-center">
              <TextLink href={routes.support()}>Visit support</TextLink>
            </div>
          </div>
        </section>
      )}

      {/* 16. Values */}
      <section className="hz-values" aria-labelledby="values-title">
        <div className="hz-values__photo">
          <ImageSlot src="/images/home/team-band.webp" alt={`The people behind ${site.name}`} width={1440} height={550} />
        </div>
        <div className="container hz-values__card">
          <SectionHead id="values-title" kicker="Principles" title={`The principles behind ${site.name}`} align="center" />
          <ol className="h-values">
            {values.map((v) => (
              <li key={v.title}>
                <span className="h-values__icon" aria-hidden>
                  <Icon name={v.icon} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ol>
          <div className="h-center">
            <SquareButton href={routes.company()} variant="outline">
              Read our story
            </SquareButton>
          </div>
        </div>
      </section>

      {/* 17. Stats — all counted from the catalog */}
      <section className="z-stats hz-stats" aria-labelledby="stats-title">
        <div className="container">
          <h2 id="stats-title">
            Built for growing businesses.
            <br />
            Organised for the way they work.
          </h2>
          <hr className="z-rule z-rule--center z-rule--light" />
          <ul className="z-stats__row h-stats">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.n}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <div className="z-center">
            <SquareButton href={routes.company()} variant="inverse">
              More about {site.name}
            </SquareButton>
          </div>
        </div>
      </section>

      {/* 18. Final CTA */}
      <PageFaqs faqs={getSiteFaqs("home")} />
      <section className="z-cta" aria-labelledby="cta-title">
        <div className="container">
          <h2 id="cta-title">Ready to find your next tool?</h2>
          <p>Browse the catalog by category, start from a business problem, or contact the {site.name} team for help choosing.</p>
          <div className="h-actions h-actions--center">
            <SquareButton href={routes.products()}>Explore products</SquareButton>
            <SquareButton href={routes.contact()} variant="outline">
              Contact us
            </SquareButton>
          </div>
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
            target: `${site.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        })}
      />
    </div>
  );
}
