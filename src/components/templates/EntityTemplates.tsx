import Link from "next/link";
import type { Comparison, Faq, Feature, IconName, Industry, Integration, Product, Resource, Solution } from "@/content/types";
import { getCategory, getFeatures, productsFor } from "@/lib/catalog";
import { featureHasPage } from "@/lib/rules";
import { routes } from "@/lib/routes";
import { ProductLogo } from "@/components/product/cards";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Breadcrumbs, FaqList, type Crumb } from "@/components/ui/primitives";
import "@/app/entity-zoho.css";

/* =====================================================================
   Templates for cross-product entities, laid out after zoho.com's
   solution (Zoho One /sales), verticals/vertical (CRM industries),
   compare detail, integrations and blog pages. Content is ToyoApps' own;
   every hub keeps an honest empty state until real entries exist.
   ===================================================================== */

export interface HubItem {
  name: string;
  summary: string;
  href: string;
  meta?: string;
  icon?: IconName;
  /** Optional second paragraph (e.g. the problem statement). */
  detail?: string;
  /** Optional short points (e.g. challenges, products). */
  points?: string[];
}

/* ---------- shared pieces ---------- */

function Hero({
  crumbs,
  eyebrow,
  title,
  lead,
  tone = "tint",
  align = "center",
  children,
  visual,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  tone?: "tint" | "plain";
  align?: "center" | "left";
  children?: React.ReactNode;
  visual?: React.ReactNode;
}) {
  return (
    <header className={`ez-hero ez-hero--${tone} ez-hero--${align}`}>
      <div className="container">
        <div className="ez-crumbs">
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="ez-hero__copy">
          {eyebrow && <p className="ez-kicker">{eyebrow}</p>}
          <h1 className="ez-hero__title">{title}</h1>
          {lead && <p className="ez-hero__lead">{lead}</p>}
          {children}
        </div>
        {visual && <div className="ez-hero__visual">{visual}</div>}
      </div>
    </header>
  );
}

function HeroActions() {
  return (
    <div className="ez-actions">
      <Link href={routes.products()} className="ez-btn ez-btn--primary">
        Explore products
      </Link>
      <Link href={routes.contact()} className="ez-link">
        Contact sales <Icon name="arrow-right" />
      </Link>
    </div>
  );
}

function Heading({ kicker, title, lead, light }: { kicker?: string; title: string; lead?: string; light?: boolean }) {
  return (
    <div className={`ez-heading${light ? " ez-heading--light" : ""}`}>
      {kicker && (
        <>
          <p className="ez-heading__kicker">{kicker}</p>
          <span className="ez-heading__rule" aria-hidden />
        </>
      )}
      <h2 className="ez-heading__title">{title}</h2>
      {lead && <p className="ez-heading__lead">{lead}</p>}
    </div>
  );
}

function Closing() {
  return (
    <section className="ez-cta">
      <div className="container ez-cta__inner">
        <h2 className="ez-cta__title">Find the right software for your business.</h2>
        <p className="ez-cta__lead">Browse the full ToyoApps catalogue or talk to us about what you need.</p>
        <div className="ez-actions ez-actions--center">
          <Link href={routes.products()} className="ez-btn ez-btn--primary">
            Explore products
          </Link>
          <Link href={routes.contact()} className="ez-btn ez-btn--outline">
            Contact sales
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Zoho One-style grey product tiles: centred name, short line, text link. */
function ProductTiles({ products, title, lead }: { products: Product[]; title: string; lead?: string }) {
  if (!products.length) return null;
  return (
    <section className="ez-section">
      <div className="container">
        <div className="ez-intro">
          <h2 className="ez-intro__title">{title}</h2>
          {lead && <p className="ez-intro__lead">{lead}</p>}
        </div>
        <div className={`ez-tiles ez-tiles--${Math.min(products.length, 3)}`}>
          {products.map((p) => (
            <Link key={p.slug} href={routes.product(p.slug)} className="ez-tile">
              <ProductLogo product={p} />
              <h3 className="ez-tile__title">{p.name}</h3>
              {getCategory(p.category) && <p className="ez-tile__cat">{getCategory(p.category)?.name}</p>}
              <p className="ez-tile__text">{p.shortDescription}</p>
              <span className="ez-link">
                Learn more <Icon name="arrow-right" />
              </span>
              <span className="ez-tile__shot">
                <ImageSlot src="/images/entity/product-tile.webp" alt={`${p.name} application interface and verified capabilities`} width={400} height={260} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- per-product fit (surfaces each product's own published data) ---------- */

interface FitEntry {
  product: Product;
  /** Product-scoped entry (its own industry/solution/integration page), if any. */
  entry?: { name: string; href: string; points: string[]; text?: string };
  features: Feature[];
}

function FeatureList({ product, features }: { product: Product; features: Feature[] }) {
  if (!features.length) return null;
  return (
    <ul className="ez-fit__feats">
      {features.map((f) => (
        <li key={f.slug}>
          {featureHasPage(f) ? <Link href={routes.feature(product.slug, f.slug)}>{f.name}</Link> : <strong>{f.name}</strong>}
          <span> — {f.summary}</span>
          {f.capabilities?.[0] && <small className="ez-fit__cap">{f.capabilities[0]}</small>}
        </li>
      ))}
    </ul>
  );
}

function ProductFit({ title, lead, entries }: { title: string; lead?: string; entries: FitEntry[] }) {
  const shown = entries.filter((e) => e.entry || e.features.length);
  if (!shown.length) return null;
  return (
    <section className="ez-section ez-section--tint">
      <div className="container ez-define">
        <div className="ez-define__head">
          <h2 className="ez-intro__title">{title}</h2>
          {lead && <p className="ez-intro__lead">{lead}</p>}
        </div>
        <ol className="ez-define__list">
          {shown.map(({ product: p, entry, features }) => (
            <li key={p.slug} className="ez-fit">
              <h3 className="ez-define__title">
                <Link href={routes.product(p.slug)}>{p.name}</Link>
              </h3>
              {(p.tagline || p.primaryUseCase) && <p className="ez-fit__tag">{p.tagline ?? p.primaryUseCase}</p>}
              {entry?.text && <p>{entry.text}</p>}
              {entry?.points.length ? (
                <ul className="ez-fit__points">
                  {entry.points.slice(0, 4).map((t) => (
                    <li key={t}>
                      <Icon name="check" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <FeatureList product={p} features={features} />
              {p.audience?.length ? <p className="ez-fit__aud"><strong>For:</strong> {p.audience.slice(0, 4).join(", ")}</p> : null}
              {entry && (
                <Link href={entry.href} className="ez-link">
                  {entry.name} with {p.name} <Icon name="arrow-right" />
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Highlight features first, then the rest, capped. */
function topFeatures(p: Product, n = 3, filter?: (f: Feature) => boolean): Feature[] {
  const all = getFeatures(p).filter((f) => f.summary && (!filter || filter(f)));
  return [...all.filter((f) => f.highlight), ...all.filter((f) => !f.highlight)].slice(0, n);
}

function industryFit(industry: Industry, products: Product[]): FitEntry[] {
  return products.map((p) => {
    const e = p.productIndustries?.find((x) => x.slug === industry.slug);
    return {
      product: p,
      entry: e ? { name: e.name, href: routes.productItem(p.slug, "industries", e.slug), text: e.body?.[0], points: e.howItHelps ?? [] } : undefined,
      features: e?.features?.length ? topFeatures(p, 3, (f) => e.features!.includes(f.slug)) : topFeatures(p),
    };
  });
}

function solutionFit(solution: Solution, products: Product[]): FitEntry[] {
  return products.map((p) => {
    const e = p.productSolutions?.find((x) => x.slug === solution.slug);
    return {
      product: p,
      entry: e ? { name: e.name, href: routes.productItem(p.slug, "solutions", e.slug), text: e.problem, points: e.approach ?? e.benefits ?? [] } : undefined,
      features: e?.features?.length ? topFeatures(p, 3, (f) => e.features!.includes(f.slug)) : topFeatures(p),
    };
  });
}

function integrationFit(integration: Integration, products: Product[]): FitEntry[] {
  return products.map((p) => {
    const e = p.productIntegrations?.find((x) => x.registry === integration.slug || x.slug === integration.slug);
    const linked = getFeatures(p).filter((f) => f.integrations?.includes(integration.slug) || e?.features?.includes(f.slug));
    return {
      product: p,
      entry: e
        ? {
            name: e.name,
            href: routes.productItem(p.slug, "integrations", e.slug),
            text: e.connects ?? (e.summary !== integration.summary ? e.summary : undefined),
            points: e.benefits ?? e.workflow ?? [],
          }
        : undefined,
      features: linked.slice(0, 4),
    };
  });
}

function Faqs({ faqs }: { faqs?: Faq[] }) {
  if (!faqs?.length) return null;
  return (
    <section className="ez-section ez-section--tint">
      <div className="container ez-narrow">
        <Heading title="Frequently asked questions" />
        <FaqList faqs={faqs} />
      </div>
    </section>
  );
}

function Prose({ body, kicker, title }: { body?: string[]; kicker?: string; title?: string }) {
  if (!body?.length) return null;
  return (
    <section className="ez-section">
      <div className="container ez-narrow">
        {title && <Heading kicker={kicker} title={title} />}
        <div className="ez-prose">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmptyBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="ez-empty">
      <span className="ez-empty__icon" aria-hidden>
        <Icon name="layers" />
      </span>
      <h2 className="ez-empty__title">{title}</h2>
      <p className="ez-empty__text">{text}</p>
      <Link href={routes.products()} className="ez-btn ez-btn--outline">
        Explore products
      </Link>
    </div>
  );
}

/* ---------- hubs (Zoho "verticals" layout) ---------- */

export function HubPageTemplate({
  crumbs,
  eyebrow,
  title,
  lead,
  items,
  listTitle,
  listLead,
  emptyTitle,
  emptyText,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
  items: HubItem[];
  listTitle?: string;
  listLead?: string;
  emptyTitle: string;
  emptyText: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Hero crumbs={crumbs} eyebrow={eyebrow} title={title} lead={lead}>
        <HeroActions />
      </Hero>
      {children}
      <section className="ez-section">
        <div className="container">
          {listTitle && (
            <div className="ez-intro ez-intro--center">
              <h2 className="ez-intro__title">{listTitle}</h2>
              {listLead && <p className="ez-intro__lead">{listLead}</p>}
            </div>
          )}
          {items.length ? (
            <div className="ez-cards">
              {items.map((i) => (
                <Link key={i.href} href={i.href} className="ez-card">
                  <span className="ez-card__band" aria-hidden>
                    <ImageSlot src="/images/entity/hub-card.webp" alt={`${i.name} cross-functional solution overview`} width={370} height={172} />
                    <span className="ez-card__icon">
                      <Icon name={i.icon ?? "layers"} />
                    </span>
                  </span>
                  <span className="ez-card__body">
                    {i.meta && <span className="ez-card__meta">{i.meta}</span>}
                    <h3 className="ez-card__title">{i.name}</h3>
                    <p className="ez-card__text">{i.summary}</p>
                    {i.detail && <p className="ez-card__detail">{i.detail}</p>}
                    {i.points?.length ? (
                      <ul className="ez-card__points">
                        {i.points.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    ) : null}
                    <span className="ez-link">
                      Learn more <Icon name="arrow-right" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyBlock title={emptyTitle} text={emptyText} />
          )}
        </div>
      </section>
      <Closing />
    </>
  );
}

/* ---------- Resources hub (Zoho blog layout) ---------- */

export function ResourcesHubTemplate({
  crumbs,
  title,
  lead,
  items,
  categories,
  activeCategory,
  emptyTitle,
  emptyText,
}: {
  crumbs: Crumb[];
  title: string;
  lead: string;
  items: (HubItem & { date?: string; author?: string })[];
  categories: { label: string; href: string; description?: string }[];
  activeCategory?: string;
  emptyTitle: string;
  emptyText: string;
}) {
  const [first, ...rest] = items;
  return (
    <>
      <Hero crumbs={crumbs} title={title} lead={lead} tone="plain" align="left" />
      <section className="ez-section ez-section--flush">
        <div className="container">
          <p className="ez-label">{activeCategory ? `Latest in ${activeCategory}` : "Featured posts"}</p>
          {first ? (
            <>
              <Link href={first.href} className="ez-post ez-post--lead">
                <span className="ez-post__media">
                  <ImageSlot src="/images/entity/resource-featured.webp" alt={first.name} width={845} height={475} />
                </span>
                <span className="ez-post__meta">{first.meta}</span>
                <h2 className="ez-post__title">{first.name}</h2>
                <p className="ez-post__text">{first.summary}</p>
                {(first.author || first.date) && (
                  <span className="ez-post__by">{[first.author && `By ${first.author}`, first.date].filter(Boolean).join(" | ")}</span>
                )}
              </Link>
              {rest.length > 0 && (
                <div className="ez-posts">
                  {rest.map((r) => (
                    <Link key={r.href} href={r.href} className="ez-post">
                      <span className="ez-post__media">
                        <ImageSlot src="/images/entity/resource-card.webp" alt={r.name} width={290} height={163} />
                      </span>
                      {r.meta && <span className="ez-post__meta">{r.meta}</span>}
                      <h3 className="ez-post__title">{r.name}</h3>
                      {(r.author || r.date) && (
                        <span className="ez-post__by">{[r.author && `By ${r.author}`, r.date].filter(Boolean).join(" | ")}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <EmptyBlock title={emptyTitle} text={emptyText} />
          )}
        </div>
      </section>
      <section className="ez-section ez-section--tint">
        <div className="container">
          <div className="ez-heading">
            <h2 className="ez-heading__title">Explore categories</h2>
            <span className="ez-heading__rule ez-heading__rule--below" aria-hidden />
          </div>
          <ul className="ez-chips">
            {categories.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="ez-chip" aria-current={c.label === activeCategory ? "page" : undefined}>
                  <span className="ez-chip__label">{c.label}</span>
                  {c.description && <span className="ez-chip__desc">{c.description}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Closing />
    </>
  );
}

/* ---------- Solution detail (Zoho One /sales layout) ---------- */

export function SolutionPageTemplate({ solution }: { solution: Solution }) {
  const products = productsFor(solution.products);
  return (
    <>
      <Hero
        crumbs={[
          { name: "Solutions", href: routes.solutions() },
          { name: solution.name, href: routes.solution(solution.slug) },
        ]}
        eyebrow="Solution"
        title={solution.name}
        lead={solution.summary}
        align="left"
        visual={<ImageSlot src="/images/entity/solution-hero.webp" alt={solution.name} width={318} height={440} priority />}
      >
        <HeroActions />
      </Hero>
      <ProblemApproach problem={solution.problem} approach={solution.approach} />
      <ProductTiles products={products} title="The products behind it" lead="Each ToyoApps product below covers one part of the job." />
      <ProductFit title="What each product contributes" lead="Drawn from each product's own published pages." entries={solutionFit(solution, products)} />
      {solution.body?.length ? (
        <section className="ez-section ez-section--tint">
          <div className="container ez-define">
            <div className="ez-define__head">
              <h2 className="ez-intro__title">How it comes together</h2>
            </div>
            <ol className="ez-define__list">
              {solution.body.map((p, i) => (
                <li key={i}>
                  {products[i] && <h3 className="ez-define__title">{products[i].name}</h3>}
                  <p>{p}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
      <Faqs faqs={solution.faqs} />
      <Closing />
    </>
  );
}

function ProblemApproach({ problem, approach, problemTitle = "The problem", approachTitle = "The approach" }: { problem: string; approach: string; problemTitle?: string; approachTitle?: string }) {
  return (
    <section className="ez-duo">
      <div className="container">
        <div className="ez-duo__frame">
          <div className="ez-duo__card">
            <h2 className="ez-duo__title">{problemTitle}</h2>
            <p>{problem}</p>
          </div>
          <div className="ez-duo__card ez-duo__card--dark">
            <h2 className="ez-duo__title">{approachTitle}</h2>
            <p>{approach}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Industry detail (Zoho "vertical" layout) ---------- */

export function IndustryPageTemplate({ industry }: { industry: Industry }) {
  const products = productsFor(industry.products);
  return (
    <>
      <Hero
        crumbs={[
          { name: "Industries", href: routes.industries() },
          { name: industry.name, href: routes.industry(industry.slug) },
        ]}
        eyebrow="Industry"
        title={`Software for ${industry.name}`}
        lead={industry.summary}
        visual={<ImageSlot src="/images/entity/industry-hero.webp" alt={`Software for ${industry.name}`} width={1200} height={320} priority />}
      >
        <HeroActions />
      </Hero>
      {industry.challenges?.length ? (
        <section className="ez-band">
          <div className="container">
            <Heading title={`What ${industry.name} teams deal with`} light />
            <div className="ez-feats">
              {industry.challenges.map((c) => (
                <div key={c} className="ez-feat">
                  <span className="ez-feat__icon" aria-hidden>
                    <Icon name={industry.icon ?? "check"} />
                  </span>
                  <p className="ez-feat__text">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <Prose body={industry.body} kicker={`ToyoApps for ${industry.name}`} title="How ToyoApps helps" />
      <ProductTiles products={products} title={`Products for ${industry.name}`} />
      <ProductFit title={`How each product serves ${industry.name}`} lead="Drawn from each product's own published pages." entries={industryFit(industry, products)} />
      <Faqs faqs={industry.faqs} />
      <Closing />
    </>
  );
}

/* ---------- Integration detail ---------- */

export function IntegrationPageTemplate({ integration }: { integration: Integration }) {
  return (
    <>
      <Hero
        crumbs={[
          { name: "Integrations", href: routes.integrations() },
          { name: integration.name, href: routes.integration(integration.slug) },
        ]}
        eyebrow={integration.vendor ? `Integration · ${integration.vendor}` : "Integration"}
        title={integration.name}
        lead={integration.summary}
        visual={<ImageSlot src="/images/entity/integration-hero.webp" alt={`${integration.name} integration`} width={960} height={360} priority />}
      >
        <p className="ez-hero__chip">{integration.category}</p>
      </Hero>
      <Prose body={integration.body} kicker="Integration" title={`About the ${integration.name} integration`} />
      <ProductTiles products={productsFor(integration.products)} title="Works with" />
      <ProductFit title={`${integration.name} in each product`} lead="What each product says about this connection." entries={integrationFit(integration, productsFor(integration.products))} />
      <Faqs faqs={integration.faqs} />
      <Closing />
    </>
  );
}

/* ---------- Comparison detail (Zoho compare layout) ---------- */

export function ComparisonPageTemplate({ comparison }: { comparison: Comparison }) {
  return (
    <>
      <Hero
        crumbs={[
          { name: "Compare", href: routes.compare() },
          { name: comparison.name, href: routes.comparison(comparison.slug) },
        ]}
        eyebrow="Comparison"
        title={comparison.name}
        lead={comparison.summary}
        tone="plain"
      />
      {comparison.body?.length ? (
        <section className="ez-band">
          <div className="container ez-split">
            <h2 className="ez-split__title">{comparison.subjects.join(" vs ")}</h2>
            <div className="ez-split__body">
              {comparison.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="ez-section">
        <div className="container">
          <ImageSlot src={`/images/compare/${comparison.slug}.webp`} alt={comparison.name} width={1200} height={400} className="ez-figure" />
          <Heading title="Side-by-side comparison" />
          <div className="ez-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Criterion</th>
                  {comparison.subjects.map((s) => (
                    <th key={s} scope="col">
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((r) => (
                  <tr key={r.criterion}>
                    <th scope="row">{r.criterion}</th>
                    {r.values.map((v, i) => (
                      <td key={i}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <ProductTiles products={productsFor(comparison.subjects)} title="ToyoApps products in this comparison" />
      <Faqs faqs={comparison.faqs} />
      <Closing />
    </>
  );
}

/* ---------- Resource article (Zoho blog post layout) ---------- */

export function ResourcePageTemplate({ resource, typeLabel }: { resource: Resource; typeLabel: string }) {
  return (
    <>
      <header className="ez-article-head">
        <div className="container ez-narrow">
          <div className="ez-crumbs">
            <Breadcrumbs
              items={[
                { name: "Resources", href: routes.resources() },
                { name: typeLabel, href: routes.resourceType(resource.type) },
                { name: resource.name, href: routes.resource(resource.type, resource.slug) },
              ]}
            />
          </div>
          <p className="ez-post__meta">{typeLabel}</p>
          <h1 className="ez-article-head__title">{resource.name}</h1>
          <p className="ez-hero__lead">{resource.summary}</p>
          <p className="ez-post__by">
            {resource.author && <>By {resource.author} | </>}
            <time dateTime={resource.publishedAt}>{new Date(resource.publishedAt).toLocaleDateString("en", { dateStyle: "long" })}</time>
          </p>
        </div>
      </header>
      <div className="container ez-narrow ez-article-cover">
        <ImageSlot src="/images/entity/resource-cover.webp" alt={resource.name} width={860} height={484} />
      </div>
      <Prose body={resource.body} />
      <ProductTiles products={productsFor(resource.products ?? [])} title="Products in this article" />
      <Faqs faqs={resource.faqs} />
      <Closing />
    </>
  );
}
