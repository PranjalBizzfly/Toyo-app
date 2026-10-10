import { getComparisonFaqs, getIndustryFaqs, getIntegrationFaqs, getResourceFaqs, getSolutionFaqs } from "@/lib/faqs";
import { Labelled } from "@/components/ui/Labelled";
import { photoForProduct } from "@/lib/photos";
import { solutionPhoto, tilePhoto } from "@/lib/in-action";
import Link from "next/link";
import type { Comparison, Faq, Feature, IconName, Industry, Integration, Product, Resource, Solution } from "@/content/types";
import { getCategory, getFeatures, getIndustries, productsFor } from "@/lib/catalog";
import { getIntegrationEntry, getProductIndustryEntries, initialOf, integrationsForProducts, relatedIntegrations, sectorOfGuide } from "@/lib/directory";
import { DirHero, GuideCard, IndustryCard, IntegrationCard, ProductChip, SectionHead } from "@/components/directory/DirectoryParts";
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
      <Link href={routes.contactForm({ type: "sales" })} className="ez-link">
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
          <Link href={routes.contactForm({ type: "sales" })} className="ez-btn ez-btn--outline">
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
              {tilePhoto(p.slug) && (
                <span className="ez-tile__shot">
                  <ImageSlot src={tilePhoto(p.slug)!.src} alt={tilePhoto(p.slug)!.alt} width={400} height={260} />
                </span>
              )}
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
          <span className="ez-fit__sum">{f.summary}</span>
          {f.capabilities?.[0] && <small className="ez-fit__cap"><Labelled text={f.capabilities[0]} /></small>}
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
                      <span><Labelled text={t} /></span>
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
  faqs,
}: {
  faqs?: Faq[];
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
                    <ImageSlot src={`/images/solutions/${i.href.split("/").pop()}.webp`} alt={`${i.name} cross-functional solution overview`} width={370} height={172} />
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
                          <li key={t}><Labelled text={t} /></li>
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
      <Faqs faqs={faqs} />
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
  faqs,
}: {
  faqs?: Faq[];
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
      <Faqs faqs={faqs} />
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
        visual={<ImageSlot src={(solutionPhoto(solution.slug) ?? photoForProduct(solution.products[0] ?? ""))?.src ?? ""} alt={(solutionPhoto(solution.slug) ?? photoForProduct(solution.products[0] ?? ""))?.alt ?? ""} width={1600} height={900} priority />}
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
      <Faqs faqs={getSolutionFaqs(solution.slug)} />
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
  const sector = sectorOfGuide(industry);
  const sectorPages = sector ? getProductIndustryEntries().filter((e) => e.sector === sector.slug) : [];
  const integrations = integrationsForProducts(industry.products, 6);
  const others = getIndustries().filter((g) => g.slug !== industry.slug);
  return (
    <>
      <DirHero
        tone="industry"
        crumbs={[
          { name: "Industries", href: routes.industries() },
          { name: industry.name, href: routes.industry(industry.slug) },
        ]}
        eyebrow={sector ? `Industry guide · ${sector.name}` : "Industry guide"}
        title={industry.name}
        lead={industry.summary}
      >
        <div className="dx-hero__chips" aria-label="Products in this guide">
          {products.map((p) => (
            <ProductChip key={p.slug} product={p} />
          ))}
        </div>
      </DirHero>

      {(industry.challenges?.length || industry.body?.length) && (
        <section className="dx-sec dx-sec--ind" aria-labelledby="dx-overview">
          <div className="container dx-overview">
            {industry.challenges?.length ? (
              <div className="dx-challenges">
                <p className="dx-kicker">The challenge</p>
                <h2 id="dx-overview" className="dx-head__title">
                  What {industry.name.toLowerCase()} teams deal with
                </h2>
                <ol>
                  {industry.challenges.map((c) => (
                    <li key={c}>
                      <span className="dx-challenges__icon" aria-hidden>
                        <Icon name={industry.icon ?? "check"} />
                      </span>
                      {c}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
            {industry.body?.length ? (
              <div className="dx-helps">
                <p className="dx-kicker">The approach</p>
                <h2 className="dx-head__title">How ToyoApps helps</h2>
                <div className="dx-prose">
                  {industry.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="dx-sec dx-sec--tint dx-sec--ind" aria-labelledby="dx-products">
          <div className="container">
            <SectionHead id="dx-products" kicker="Products" title={`Products for ${industry.name}`} />
            <ul className={`dx-grid dx-grid--${Math.min(products.length, 3)}`}>
              {products.map((p) => {
                const own = p.productIndustries?.find((x) => x.slug === industry.slug);
                return (
                  <li key={p.slug} className="dx-prod">
                    <div className="dx-prod__top">
                      <ProductLogo product={p} />
                      <div>
                        <h3 className="dx-prod__name">
                          <Link href={routes.product(p.slug)} className="dx-stretch">
                            {p.name}
                          </Link>
                        </h3>
                        {getCategory(p.category) && <p className="dx-card__meta">{getCategory(p.category)?.name}</p>}
                      </div>
                    </div>
                    {p.tagline && <p className="dx-prod__tag">{p.tagline}</p>}
                    <p className="dx-card__text">{p.shortDescription}</p>
                    <div className="dx-card__foot">
                      {own ? (
                        <Link href={routes.productItem(p.slug, "industries", own.slug)} className="dx-pchip dx-pchip--sm">
                          {p.name} for {own.name}
                        </Link>
                      ) : (
                        <span />
                      )}
                      <span className="dx-more" aria-hidden>
                        View product <Icon name="arrow-right" />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <ProductFit title={`How each product serves ${industry.name}`} lead="Drawn from each product's own published pages." entries={industryFit(industry, products)} />

      {sectorPages.length > 0 && sector && (
        <section className="dx-sec dx-sec--ind" aria-labelledby="dx-sector">
          <div className="container">
            <SectionHead id="dx-sector" kicker={sector.name} title="Related industry pages" lead="Industries in the same sector that individual ToyoApps products document in detail." />
            <ul className="dx-grid dx-grid--industries">
              {sectorPages.map((e) => (
                <IndustryCard key={e.key} entry={e} />
              ))}
            </ul>
          </div>
        </section>
      )}

      {integrations.length > 0 && (
        <section className="dx-sec dx-sec--tint" aria-labelledby="dx-ints">
          <div className="container">
            <SectionHead id="dx-ints" kicker="Integrations" title="Tools these products connect with" />
            <ul className="dx-grid dx-grid--guides dx-grid--center">
              {integrations.map((e) => (
                <IntegrationCard key={e.key} entry={e} compact />
              ))}
            </ul>
            <p className="dx-after">
              <Link href={`${routes.integrations()}#dx-all`} className="dx-more">
                Browse all integrations <Icon name="arrow-right" />
              </Link>
            </p>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="dx-sec dx-sec--ind" aria-labelledby="dx-others">
          <div className="container">
            <SectionHead id="dx-others" kicker="More industry guides" title="Other industries" />
            <div className={`dx-grid dx-grid--${Math.min(others.length, 3)}`}>
              {others.map((g) => (
                <GuideCard key={g.slug} industry={g} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Faqs faqs={getIndustryFaqs(industry.slug)} />
      <Closing />
    </>
  );
}

/* ---------- Integration detail ---------- */

/** Splits "Product: text" paragraphs onto their product; the rest describe the connection itself. */
function splitBody(integration: Integration, products: Product[]) {
  const general: string[] = [];
  const byProduct = new Map<string, string[]>();
  for (const para of integration.body ?? []) {
    const p = products.find((x) => para.startsWith(`${x.name}:`));
    if (p) {
      const t = para.slice(p.name.length + 1).trim();
      byProduct.set(p.slug, [...(byProduct.get(p.slug) ?? []), t.charAt(0).toUpperCase() + t.slice(1)]);
    } else general.push(para);
  }
  // A single-product integration: every paragraph is about that product's use.
  if (products.length === 1 && !byProduct.size) return { general: general.slice(0, 1), byProduct: new Map([[products[0].slug, general.slice(1)]]) };
  return { general, byProduct };
}

export function IntegrationPageTemplate({ integration }: { integration: Integration }) {
  // Registry products plus any product that documents this integration itself
  const products = getIntegrationEntry(integration.slug)?.links.map((l) => l.product) ?? productsFor(integration.products);
  const { general, byProduct } = splitBody(integration, products);
  const fit = integrationFit(integration, products);
  const related = relatedIntegrations(integration, 6);
  return (
    <>
      <DirHero
        tone="integration"
        crumbs={[
          { name: "Integrations", href: routes.integrations() },
          { name: integration.name, href: routes.integration(integration.slug) },
        ]}
        eyebrow={`Integration · ${integration.category}`}
        title={integration.name}
        lead={integration.summary}
      />

      <section className="dx-sec" aria-labelledby="dx-connects">
        <div className="container dx-connect">
          <div className="dx-connect__diagram" aria-hidden>
            <span className="dx-connect__node dx-connect__node--tool">
              <span className="dx-mono dx-mono--lg">{initialOf(integration.name)}</span>
              {integration.name}
            </span>
            <span className="dx-connect__line" />
            <span className="dx-connect__products">
              {products.map((p) => (
                <span key={p.slug} className="dx-connect__node">
                  <ProductLogo product={p} />
                  {p.name}
                </span>
              ))}
            </span>
          </div>
          <div className="dx-connect__copy">
            <p className="dx-kicker">What connects</p>
            <h2 id="dx-connects" className="dx-head__title">
              {integration.name} with {products.map((p) => p.name).join(", ").replace(/, ([^,]*)$/, " and $1")}
            </h2>
            {general.map((p, i) => (
              <p key={i} className="dx-connect__text">
                {p}
              </p>
            ))}
            <dl className="dx-facts">
              {integration.vendor && (
                <div>
                  <dt>Vendor</dt>
                  <dd>{integration.vendor}</dd>
                </div>
              )}
              <div>
                <dt>Category</dt>
                <dd>
                  <Link href={`${routes.integrations()}?category=${encodeURIComponent(integration.category)}#dx-all`}>{integration.category}</Link>
                </dd>
              </div>
              <div>
                <dt>Works with</dt>
                <dd className="dx-facts__chips">
                  {products.map((p) => (
                    <ProductChip key={p.slug} product={p} />
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="dx-sec dx-sec--tint" aria-labelledby="dx-how">
        <div className="container">
          <SectionHead id="dx-how" kicker="How it works" title={products.length > 1 ? `${integration.name} in each product` : `How ${products[0]?.name ?? "it"} uses ${integration.name}`} />
          <ol className={`dx-uses dx-uses--${Math.min(products.length, 3)}`}>
            {fit.map(({ product: p, entry, features }, i) => {
              const notes = byProduct.get(p.slug) ?? [];
              const steps = entry?.points ?? [];
              return (
                <li key={p.slug} className="dx-use">
                  <header className="dx-use__head">
                    <span className="dx-use__n">{String(i + 1).padStart(2, "0")}</span>
                    <ProductLogo product={p} />
                    <h3>
                      <Link href={routes.product(p.slug)}>{p.name}</Link>
                    </h3>
                  </header>
                  {notes.map((t, j) => (
                    <p key={j}>{t}</p>
                  ))}
                  {!notes.length && entry?.text && <p>{entry.text}</p>}
                  {steps.length > 0 && (
                    <ul className="dx-use__steps">
                      {steps.slice(0, 4).map((t) => (
                        <li key={t}>
                          <Icon name="check" />
                          <span>
                            <Labelled text={t} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {features.length > 0 && (
                    <p className="dx-use__feats">
                      <strong>Related features: </strong>
                      {features.map((f, j) => (
                        <span key={f.slug}>
                          {j > 0 && ", "}
                          {featureHasPage(f) ? <Link href={routes.feature(p.slug, f.slug)}>{f.name}</Link> : f.name}
                        </span>
                      ))}
                    </p>
                  )}
                  <Link href={entry?.href ?? routes.product(p.slug)} className="dx-more">
                    {entry ? `${entry.name} in ${p.name}` : `View ${p.name}`} <Icon name="arrow-right" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {related.length > 0 && (
        <section className="dx-sec dx-int" aria-labelledby="dx-related">
          <div className="container">
            <SectionHead id="dx-related" kicker="Related" title="Similar integrations" />
            <ul className="dx-grid dx-grid--guides dx-grid--center">
              {related.map((e) => (
                <IntegrationCard key={e.key} entry={e} compact />
              ))}
            </ul>
            <p className="dx-after">
              <Link href={`${routes.integrations()}#dx-all`} className="dx-more">
                Browse all integrations <Icon name="arrow-right" />
              </Link>
            </p>
          </div>
        </section>
      )}

      <Faqs faqs={getIntegrationFaqs(integration.slug)} />
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
      <Faqs faqs={getComparisonFaqs(comparison.slug)} />
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
        {photoForProduct(resource.products?.[0] ?? "") && <ImageSlot src={photoForProduct(resource.products?.[0] ?? "")!.src} alt={photoForProduct(resource.products?.[0] ?? "")!.alt} width={1280} height={720} />}
      </div>
      <Prose body={resource.body} />
      <ProductTiles products={productsFor(resource.products ?? [])} title="Products in this article" />
      <Faqs faqs={getResourceFaqs(resource.slug)} />
      <Closing />
    </>
  );
}
