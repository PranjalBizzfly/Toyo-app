import { photoForProduct } from "@/lib/photos";
import { SpotVisual } from "@/components/product/SpotVisual";
import { getProductItemFaqs } from "@/lib/faqs";
import { Labelled } from "@/components/ui/Labelled";
import { ProductCta } from "@/components/product/ProductCta";
import type { ReactNode } from "react";
import Link from "next/link";
import type { Faq, Feature, Product } from "@/content/types";
import { getCategory, getFeatures, getIntegrations, integrationHasPage } from "@/lib/catalog";
import { featureHasPage } from "@/lib/rules";
import { getProductCtas } from "@/lib/product-cta";
import { getProductItems, itemSections, type ItemSection, type ProductItem } from "@/lib/product-sections";
import { routes, sectionLabels } from "@/lib/routes";
import { absoluteUrl, jsonLd } from "@/lib/seo";
import { Breadcrumbs, FaqList } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import "@/app/feature-zoho.css";
import "@/app/alt-patterns.css";

type Kind = "text" | "list" | "steps" | "cards";
/** Section headings per field, by item type. Fields not listed are not rendered. */
const LAYOUT: Record<ItemSection, { key: string; title: (n: string) => string; kind: Kind }[]> = {
  solutions: [
    { key: "problem", title: () => "The problem", kind: "text" },
    { key: "approach", title: (n) => `How ${n} solves it`, kind: "list" },
    { key: "workflow", title: () => "Workflow", kind: "steps" },
    { key: "benefits", title: () => "Benefits", kind: "list" },
  ],
  industries: [
    { key: "challenges", title: () => "Challenges in this industry", kind: "list" },
    { key: "howItHelps", title: (n) => `How ${n} helps`, kind: "list" },
    { key: "useCases", title: () => "Use cases", kind: "cards" },
  ],
  integrations: [
    { key: "connects", title: () => "What it connects", kind: "text" },
    { key: "workflow", title: () => "How it works", kind: "steps" },
    { key: "benefits", title: () => "Benefits", kind: "list" },
    { key: "setup", title: () => "Setting it up", kind: "steps" },
  ],
  compare: [{ key: "differences", title: () => "Key differences", kind: "list" }],
  resources: [
    { key: "keyPoints", title: () => "Key points", kind: "list" },
    { key: "steps", title: () => "Step by step", kind: "steps" },
  ],
  support: [
    { key: "steps", title: () => "Steps", kind: "steps" },
    { key: "keyPoints", title: () => "Good to know", kind: "list" },
  ],
};

const kindLabel: Record<ItemSection, string> = {
  solutions: "Solution",
  industries: "Industry",
  integrations: "Integration",
  compare: "Comparison",
  resources: "Resource",
  support: "Support",
};

function Checks({ items, two }: { items: string[]; two?: boolean }) {
  return (
    <ul className={`fz-checks${two ? " fz-checks--2" : ""}`}>
      {items.map((i) => (
        <li key={i}>
          <Icon name="check" />
          <span><Labelled text={i} /></span>
        </li>
      ))}
    </ul>
  );
}

/**
 * ProductItemTemplate (Zoho CRM vertical-page pattern): white centred hero
 * with wide illustration, a white box of two intro cards (light + dark)
 * straddling into a full-colour band of "why" cards, then centred sections on
 * alternating bands. Renders only the blocks the official source provided.
 */
export function ProductItemTemplate({ product, section, item }: { product: Product; section: ItemSection; item: ProductItem }) {
  const e = item.entity as ProductItem["entity"] & {
    body?: string[];
    features?: string[];
    faqs?: Faq[];
    audience?: string[];
    registry?: string;
    competitor?: string;
    type?: string;
    rows?: { criterion: string; product: string; competitor: string }[];
    links?: { label: string; href: string }[];
  };
  const category = getCategory(product.category);
  const all = getFeatures(product);
  const listed = (e.features ?? []).map((s) => all.find((f) => f.slug === s)).filter((f): f is Feature => !!f);
  // Integration items without listed features: fall back to features the source ties to the same registry entry.
  const features = listed.length || !e.registry ? listed : all.filter((f) => f.integrations?.includes(e.registry!)).slice(0, 6);
  // Product FAQs that share a topic word with this item (and are not already on the page).
  const stop = new Set(["with", "your", "from", "into", "about", "their", "using", "setting", "getting", "first", "what", "this", "that", product.name.toLowerCase()]);
  const words = new Set(
    `${item.name} ${(e.features ?? []).join(" ")}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 4 && !stop.has(w)),
  );
  const ownQs = new Set((e.faqs ?? []).map((f) => f.question));
  const relatedFaqs = (product.faqs ?? [])
    .filter((f) => !ownQs.has(f.question) && f.question.toLowerCase().split(/[^a-z0-9]+/).some((w) => words.has(w)))
    .slice(0, 4);
  const pageFaqs = getProductItemFaqs(product, section, { ...(e as unknown as Record<string, unknown>), name: item.name, summary: item.summary, faqs: [...(e.faqs ?? []), ...relatedFaqs] });
  const about = product.longDescription?.split(/\n\s*\n/)[0];
  const registry = e.registry ? getIntegrations().find((i) => i.slug === e.registry) : undefined;
  const siblings = getProductItems(product, section).filter((i) => i.hasPage && i.slug !== item.slug).slice(0, 6);
  const crossLinks = itemSections
    .filter((s) => s !== section)
    .flatMap((s) =>
      getProductItems(product, s)
        .filter((i) => i.hasPage && ((i.entity.features as string[] | undefined) ?? []).some((f) => (e.features ?? []).includes(f)))
        .map((i) => ({ ...i, section: s })),
    )
    .slice(0, 6);
  const { primary } = getProductCtas(product);
  const title = section === "compare" && e.competitor ? `${product.name} vs ${e.competitor}` : item.name;
  const heroPhoto = photoForProduct(product.slug);

  // Present fields, in layout order.
  const fields = LAYOUT[section]
    .map((l) => ({ ...l, v: e[l.key] as unknown }))
    .filter(({ v }) => v && (!Array.isArray(v) || v.length));
  // Intro dark card: first text/list field. "Why" band: next list field.
  const darkIdx = fields.findIndex((f) => f.kind === "text" || f.kind === "list");
  const dark = darkIdx >= 0 ? fields[darkIdx] : undefined;
  const whyIdx = fields.findIndex((f, i) => i !== darkIdx && f.kind === "list");
  const why = whyIdx >= 0 ? fields[whyIdx] : undefined;
  const rest = fields.filter((_, i) => i !== darkIdx && i !== whyIdx);

  let band = 0;
  const tone = () => (band++ % 2 ? " fz-sec--tint" : "");
  const Centered = ({ id, heading, kicker, children }: { id: string; heading: string; kicker?: string; children: ReactNode }) => (
    <section className={`fz-sec${tone()}`} aria-labelledby={id}>
      <div className="container">
        <div className="fz-center">
          {kicker && <span className="fz-kicker">{kicker}</span>}
          <h2 id={id} className="fz-h2">
            {heading}
          </h2>
          <span className="fz-sub" aria-hidden />
        </div>
        {children}
      </div>
    </section>
  );

  return (
    <>
      <header className="fz-vhero">
        <div className="container">
          <div className="fz-crumbs">
            <Breadcrumbs
              items={[
                { name: "Products", href: routes.products() },
                ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
                { name: product.name, href: routes.product(product.slug) },
                { name: sectionLabels[section], href: routes.productSection(product.slug, section) },
                { name: item.name, href: routes.productItem(product.slug, section, item.slug) },
              ]}
            />
          </div>
          <div className="fz-hero__copy">
            <p className="fz-hero__eyebrow">
              {product.name} · {kindLabel[section]}
              {e.type ? ` · ${e.type.replace("-", " ")}` : ""}
            </p>
            <h1>{title}</h1>
            <p className="fz-hero__lead">{item.summary}</p>
            <div className="fz-hero__ctas">
              <a href={primary.href} rel="noopener" className="fz-btn">
                {primary.label}
              </a>
              <Link href={routes.productSection(product.slug, section)} className="fz-more">
                All {product.name} {sectionLabels[section].toLowerCase()} <Icon name="arrow-right" />
              </Link>
            </div>
          </div>
          {heroPhoto && <ImageSlot src={heroPhoto.src} alt={heroPhoto.alt} width={1280} height={720} priority className="fz-vhero__art" />}
        </div>
      </header>

      {(e.body?.length || dark || why) && (
        <section className="fz-intro" aria-label="Overview">
          <div className="container">
            {(e.body?.length || dark) && (
              <div className={`fz-intro__box${e.body?.length && dark ? " fz-intro__box--2" : ""}`}>
                {e.body?.length ? (
                  <div className="fz-intro__card">
                    <h2>Overview</h2>
                    {e.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                ) : null}
                {dark && (
                  <div className="fz-intro__card fz-intro__card--dark">
                    <h2>{dark.title(product.name)}</h2>
                    {dark.kind === "text" ? <p>{dark.v as string}</p> : <Checks items={dark.v as string[]} />}
                  </div>
                )}
              </div>
            )}
            {why && (
              <div className="fz-intro__band fz-sec--band" style={{ background: "transparent" }}>
                <div className="fz-center">
                  <h2 className="fz-h2">{why.title(product.name)}</h2>
                </div>
                <ul className="fz-why">
                  {(why.v as string[]).map((t) => (
                    <li key={t}>
                      <span className="fz-dot" aria-hidden>
                        <Icon name="check" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {rest.map(({ key, title: t, kind, v }, idx) => {
        // A page never shows the same representation twice: the 2nd list (the
        // "why" band counts as the 1st) becomes tiles, the 2nd steps a flow.
        const nth = rest.slice(0, idx).filter((r) => r.kind === kind).length + (kind === "list" && why ? 1 : 0);
        return (
        <Centered key={key} id={`s-${key}`} heading={t(product.name)}>
          {kind === "text" && (
            <div className="fz-center">
              <p className="fz-lead">{v as string}</p>
            </div>
          )}
          {kind === "list" && nth === 0 && (
            <div className="fz-panel">
              <div className="fz-panel__inner">
                <Checks items={v as string[]} two />
              </div>
            </div>
          )}
          {kind === "list" && nth > 0 && (
            <ul className="fz-alt-tiles">
              {(v as string[]).map((s, i) => (
                <li key={s} data-tone={i % 3}>
                  <span className="fz-alt-tiles__mark" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          )}
          {kind === "steps" && nth === 0 && (
            <ol className="fz-steps">
              {(v as string[]).map((s, i) => (
                <li key={i}><Labelled text={s} /></li>
              ))}
            </ol>
          )}
          {kind === "steps" && nth > 0 && (
            <ol className="fz-alt-flow">
              {(v as string[]).map((s, i, arr) => (
                <li key={i}>
                  <span><Labelled text={s} /></span>
                  {i < arr.length - 1 && <i aria-hidden>→</i>}
                </li>
              ))}
            </ol>
          )}
          {kind === "cards" && (
            <ul className="fz-tiles">
              {(v as { title: string; description: string }[]).map((c) => (
                <li key={c.title} className="fz-tiles__item">
                  <div className="fz-tile">
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Centered>
        );
      })}

      {e.rows?.length ? (
        <Centered id="table" heading="Side by side">
          <div className="fz-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Criterion</th>
                  <th scope="col">{product.name}</th>
                  <th scope="col">{e.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {e.rows.map((r) => (
                  <tr key={r.criterion}>
                    <th scope="row">{r.criterion}</th>
                    <td>{r.product}</td>
                    <td>{r.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="fz-note">Comparison as published by {product.name}. Check details with each vendor before deciding.</p>
        </Centered>
      ) : null}

      {features.length > 0 && (
        <Centered id="features" kicker={`Key ${product.name} features`} heading={`Built for ${item.name.toLowerCase()}`}>
          <div className="fz-panel fz-panel--shot">
            <div className="fz-art fz-art--band fz-art--visual"><SpotVisual feature={{ name: item.name, capabilities: features.map((f) => f.name) }} variant={0} /></div>
          </div>
          <ul className="fz-tiles">
            {features.map((f) => (
              <li key={f.slug} className="fz-tiles__item">
                {featureHasPage(f) ? (
                  <Link href={routes.feature(product.slug, f.slug)} className="fz-tile">
                    <h3>{f.name}</h3>
                    <p>{f.summary}</p>
                    {f.capabilities?.length ? (
                      <ul className="fz-hubcaps">
                        {f.capabilities.slice(0, 2).map((c) => (
                          <li key={c}><Labelled text={c} /></li>
                        ))}
                      </ul>
                    ) : null}
                    <span className="fz-more">
                      Learn more <Icon name="arrow-right" />
                    </span>
                  </Link>
                ) : (
                  <div className="fz-tile">
                    <h3>{f.name}</h3>
                    <p>{f.summary}</p>
                    {f.capabilities?.length ? (
                      <ul className="fz-hubcaps">
                        {f.capabilities.slice(0, 2).map((c) => (
                          <li key={c}><Labelled text={c} /></li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Centered>
      )}

      {e.links?.length ? (
        <Centered id="links" heading="Official documentation">
          <ul className="fz-doclinks">
            {e.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} rel="noopener" className="fz-link">
                  <span className="fz-mono" aria-hidden>
                    ↗
                  </span>
                  <span className="fz-link__name">{l.label}</span>
                  <span className="fz-link__go" aria-hidden>
                    <Icon name="arrow-right" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Centered>
      ) : null}

      {pageFaqs.length ? (
        <Centered id="faq" heading="Frequently asked questions">
          <div className="fz-faq">
            <FaqList faqs={pageFaqs} />
          </div>
        </Centered>
      ) : null}

      {about && (
        <Centered id="about" kicker={product.tagline} heading={`About ${product.name}`}>
          <div className="fz-center fz-about">
            <p className="fz-lead">{about}</p>
            {product.primaryUseCase && (
              <p className="fz-about__use">
                <strong>Main use:</strong> {product.primaryUseCase}
              </p>
            )}
            <Link href={routes.product(product.slug)} className="fz-more">
              {product.name} overview <Icon name="arrow-right" />
            </Link>
          </div>
        </Centered>
      )}

      <section className={`fz-sec${tone()}`} aria-label="Details" style={{ paddingBlock: "clamp(40px, 5vw, 64px)" }}>
        <div className="container fz-facts">
          {(e.audience ?? product.audience)?.length ? (
            <div className="fz-fact">
              <h2>Who it&apos;s for</h2>
              <ul className="chips">
                {(e.audience ?? product.audience ?? []).map((a) => (
                  <li key={a} className="chip">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {registry && (
            <div className="fz-fact">
              <h2>Integration</h2>
              <Link href={integrationHasPage(registry) ? routes.integration(registry.slug) : `${routes.integrations()}#${registry.slug}`}>
                {registry.name} in the ToyoApps directory
              </Link>
            </div>
          )}
          {crossLinks.length > 0 && (
            <div className="fz-fact">
              <h2>See also</h2>
              <ul className="fz-plain">
                {crossLinks.map((c) => (
                  <li key={c.section + c.slug}>
                    <Link href={routes.productItem(product.slug, c.section, c.slug)}>{c.name}</Link> <small>· {kindLabel[c.section]}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="fz-fact">
            <h2>Source</h2>
            <p>
              Written from{" "}
              {e.sources.map((s, i) => (
                <span key={s}>
                  {i > 0 && ", "}
                  <a href={s} rel="noopener nofollow" style={{ textDecoration: "underline" }}>
                    {new URL(s).hostname.replace(/^www\./, "")}
                    {new URL(s).pathname === "/" ? "" : new URL(s).pathname}
                  </a>
                </span>
              ))}
              .
            </p>
          </div>
        </div>
      </section>

      {siblings.length > 0 && (
        <Centered id="more" heading={`More ${product.name} ${sectionLabels[section].toLowerCase()}`}>
          <ul className="fz-tiles">
            {siblings.map((s) => (
              <li key={s.slug} className="fz-tiles__item">
                <Link href={routes.productItem(product.slug, section, s.slug)} className="fz-tile">
                  <h3>{s.name}</h3>
                  <p>{s.summary}</p>
                  <span className="fz-more">
                    Learn more <Icon name="arrow-right" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Centered>
      )}

      <ProductCta product={product} title={`Get started with ${product.name}`} lead={product.pricing?.trial} primary={primary} secondary={{ label: `${product.name} overview`, href: routes.product(product.slug) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${item.name} | ${product.name}`,
          description: item.summary,
          url: absoluteUrl(routes.productItem(product.slug, section, item.slug)),
          about: { "@type": "SoftwareApplication", name: product.name, url: absoluteUrl(routes.product(product.slug)) },
        })}
      />
    </>
  );
}
