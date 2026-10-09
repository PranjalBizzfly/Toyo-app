import { Labelled } from "@/components/ui/Labelled";
import { ProductCta } from "@/components/product/ProductCta";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, FaqList } from "@/components/ui/primitives";
import { ImageSlot } from "@/components/ui/ImageSlot";
import "@/app/product-zoho.css";
import { getCategory, getProduct, getProducts, integrationHasPage } from "@/lib/catalog";
import { getProductCtas } from "@/lib/product-cta";
import { getProductSectionFaqs } from "@/lib/faqs";
import { getAvailableSections, getProductItems, getProductSectionData, itemSections, type ItemSection } from "@/lib/product-sections";
import { routes, sectionLabels, type ProductSection } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Product sub-pages: solutions, industries, integrations, pricing, compare,
 * resources, support. A route is generated only when the product has content
 * for that section (features and overview have their own routes).
 */

type Props = { params: Promise<{ product: string; section: string }> };
type SubSection = Exclude<ProductSection, "overview" | "features">;

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().flatMap((p) =>
    getAvailableSections(p)
      .filter((s): s is SubSection => s !== "overview" && s !== "features")
      .map((section) => ({ product: p.slug, section })),
  );
}

const copy: Record<SubSection, (name: string) => { title: string; description: string }> = {
  solutions: (n) => ({ title: `${n} use cases`, description: `Business problems ${n} helps solve.` }),
  industries: (n) => ({ title: `${n} by industry`, description: `How ${n} fits different industries.` }),
  integrations: (n) => ({ title: `${n} integrations`, description: `Tools and services that work with ${n}.` }),
  pricing: (n) => ({ title: `${n} pricing`, description: `Plans and pricing for ${n}.` }),
  security: (n) => ({ title: `${n} security`, description: `Security and privacy measures ${n} describes on its official site.` }),
  compare: (n) => ({ title: `Compare ${n}`, description: `How ${n} compares with alternatives.` }),
  resources: (n) => ({ title: `${n} resources`, description: `Guides, tutorials and articles about ${n}.` }),
  support: (n) => ({ title: `${n} support`, description: `Help, documentation and answers for ${n}.` }),
};

async function load(params: Props["params"]) {
  const { product: slug, section } = await params;
  const product = getProduct(slug);
  if (!product || !getAvailableSections(product).includes(section as ProductSection)) return null;
  return { product, section: section as SubSection };
}

export async function generateMetadata({ params }: Props) {
  const r = await load(params);
  if (!r) return {};
  const c = copy[r.section](r.product.name);
  return buildMetadata({
    title: c.title,
    description: `${c.description} ${r.product.shortDescription}`,
    path: routes.productSection(r.product.slug, r.section),
    status: r.product.status,
  });
}

/**
 * The extra detail a card can show from an entry's existing data: the first
 * "what it is" paragraph and up to three concrete points (key points, steps,
 * how it helps, workflow, benefits…), so index cards explain, not just label.
 */
function cardDetail(e: Record<string, unknown> | undefined): { more?: string; points: string[] } {
  if (!e) return { points: [] };
  const body = Array.isArray(e.body) ? (e.body as string[]) : [];
  const text = (v: unknown) => (typeof v === "string" ? [v] : Array.isArray(v) ? (v as unknown[]).filter((x): x is string => typeof x === "string") : []);
  const points = ["keyPoints", "howItHelps", "approach", "workflow", "steps", "differences", "benefits", "challenges"]
    .flatMap((k) => text(e[k]))
    .filter((p) => p !== e.summary && p !== body[0]);
  return { more: body[0] && body[0] !== e.summary ? body[0] : undefined, points: points.slice(0, 3) };
}

/** Product FAQs relevant to a section page (pricing, security), matched by topic words. */
const sectionFaqTopics: Partial<Record<string, RegExp>> = {
  pricing: /\b(price|pricing|plan|plans|trial|billing|bill|pay|payment|cost|refund|credit|credits|subscription|cancel|free|invoice|seat)\b/i,
  security: /\b(secur\w*|privacy|private|data|encrypt\w*|access|permission\w*|gdpr|compliance|backup\w*|tenant|isolat\w*|sso|scim|audit)\b/i,
};

export default async function ProductSectionPage({ params }: Props) {
  const r = await load(params);
  if (!r) notFound();
  const { product, section } = r;
  const data = getProductSectionData(product);
  const category = getCategory(product.category);
  const c = copy[section](product.name);

  // Product-scoped entries first (with their own detail pages when they earn one).
  const own = (itemSections as readonly string[]).includes(section) ? getProductItems(product, section as ItemSection) : [];
  const ownPages = own.filter((i) => i.hasPage);
  const ownListed = own.filter((i) => !i.hasPage);

  type CardLink = { name: string; summary: string; href: string; entity?: Record<string, unknown> };
  const globalLinks: CardLink[] =
    section === "solutions"
      ? data.solutions.map((s) => ({ name: s.name, summary: s.summary, href: routes.solution(s.slug), entity: s as never }))
      : section === "industries"
        ? data.industries.map((s) => ({ name: s.name, summary: s.summary, href: routes.industry(s.slug), entity: s as never }))
        : section === "integrations"
          ? data.integrations.map((s) => ({ name: s.name, summary: s.summary, href: integrationHasPage(s) ? routes.integration(s.slug) : `${routes.integrations()}#${s.slug}`, entity: s as never }))
          : section === "compare"
            ? data.compare.map((s) => ({ name: s.name, summary: s.summary, href: routes.comparison(s.slug), entity: s as never }))
            : section === "resources"
              ? data.resources.map((s) => ({ name: s.name, summary: s.summary, href: routes.resource(s.type, s.slug), entity: s as never }))
              : [];
  const links: CardLink[] = [
    ...ownPages.map((i) => ({ name: i.name, summary: i.summary, href: routes.productItem(product.slug, section as ItemSection, i.slug), entity: i.entity })),
    ...globalLinks,
  ];
  const topic = sectionFaqTopics[section];
  const ownSectionFaqs =
    section === "support" ? product.faqs ?? [] : topic ? (product.faqs ?? []).filter((f) => topic.test(`${f.question} ${f.answer}`)) : [];
  const sectionFaqs = getProductSectionFaqs(product, section, ownSectionFaqs);

  const cta = getProductCtas(product).primary;
  const pricing = section === "pricing" ? product.pricing : undefined;
  const security = section === "security" ? product.security ?? [] : [];
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <div className="pz">
      <header className="pz-sec-hero" data-no-reveal>
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Products", href: routes.products() },
              ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
              { name: product.name, href: routes.product(product.slug) },
              { name: sectionLabels[section], href: routes.productSection(product.slug, section) },
            ]}
          />
          <h1>{c.title}</h1>
          <p className="pz-sec-hero__lead">{section === "pricing" ? product.pricing?.note ?? c.description : c.description}</p>
          {pricing?.trial && (
            <ul className="pz-sec-hero__checks">
              <li>{pricing.trial}</li>
            </ul>
          )}
          {section !== "pricing" && (
            <a href={cta.href} rel="noopener" className="pz-btn pz-btn--solid">
              {cta.label}
            </a>
          )}
        </div>
      </header>

      {pricing && (
        <section className="pz-pricing" aria-label={`${product.name} plans`}>
          <div className="container">
            <p className="pz-pricing__bar" aria-hidden>
              <span>{product.name}</span>
              {pricing.unit && <span>Per {pricing.unit}</span>}
              {pricing.currency && <span>{pricing.currency}</span>}
            </p>
            <div className="pz-plans">
              {pricing.plans.map((p) => (
                <article key={p.name} className={`pz-plan${p.recommended ? " pz-plan--rec" : ""}`}>
                  {p.recommended && <span className="pz-plan__tag">Most popular</span>}
                  <h2>{p.name}</h2>
                  {p.description && <p className="pz-plan__desc">{p.description}</p>}
                  <p className="pz-plan__price">{p.price}</p>
                  {p.period && <p className="pz-plan__period">/ {p.period}</p>}
                  <a href={p.cta.href} rel="noopener" className="pz-plan__cta">
                    {p.cta.label}
                  </a>
                  <ul className="pz-plan__list">
                    {p.features.map((x) => (
                      <li key={x}><Labelled text={x} /></li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="pz-pricing__foot">
              <p>
                Prices as published by {product.name} on{" "}
                <time dateTime={pricing.asOf}>{new Date(pricing.asOf).toLocaleDateString("en", { dateStyle: "long" })}</time>. Always confirm on{" "}
                <a href={pricing.sourceUrl} rel="noopener">
                  {product.name}&apos;s pricing page
                </a>
                .
              </p>
              <Link href={routes.product(product.slug)} className="pz-arrow">
                {product.name} overview <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {security.length > 0 && (
        <div className="pz-docs">
          <nav className="pz-docs__nav" aria-label="On this page">
            <ul>
              {security.map((s) => (
                <li key={s.title}>
                  <a href={`#${slug(s.title)}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            {security.map((s) => (
              <section key={s.title} id={slug(s.title)} className="pz-docs__item">
                <h2>{s.title}</h2>
                <p>{s.description}</p>
              </section>
            ))}
            <p className="pz-docs__note">
              As described on {product.name}&apos;s official website. Confirm details, certifications and agreements directly with{" "}
              <a href={product.websiteUrl} rel="noopener">
                {product.name}
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {(links.length > 0 || ownListed.length > 0) && (
        <section className="pz-band pz-index">
          <div className="container">
            <div className="pz-index__head">
              <h2>{sectionLabels[section]}</h2>
              <p>{c.description}</p>
            </div>
            {links.length > 0 && (
              <div className="pz-vcards">
                {links.map((l) => {
                  const d = cardDetail(l.entity);
                  return (
                  <Link key={l.href} href={l.href} className="pz-vcard">
                    <span className="pz-vcard__art">
                      <ImageSlot src="/images/product/section-card.webp" alt={`${l.name} feature capability and integration overview`} width={370} height={172} />
                    </span>
                    <span className="pz-vcard__body">
                      <h3>{l.name}</h3>
                      <p className={d.more || d.points.length ? "pz-vcard__sum" : undefined}>{l.summary}</p>
                      {d.more && <span className="pz-vcard__more">{d.more}</span>}
                      {d.points.length > 0 && (
                        <span className="pz-vcard__points">
                          {d.points.map((p) => (
                            <span key={p}>{p}</span>
                          ))}
                        </span>
                      )}
                      <span className="pz-arrow">
                        Learn more <span aria-hidden>→</span>
                      </span>
                    </span>
                  </Link>
                  );
                })}
              </div>
            )}
            {ownListed.length > 0 && (
              <div className="pz-vcards pz-vcards--plain" style={{ marginTop: links.length ? 40 : 0 }}>
                {ownListed.map((i) => {
                  const d = cardDetail(i.entity);
                  return (
                    <article key={i.slug} className="pz-vcard">
                      <div className="pz-vcard__body">
                        <h3>{i.name}</h3>
                        <p className={d.more || d.points.length ? "pz-vcard__sum" : undefined}>{i.summary}</p>
                        {d.more && <span className="pz-vcard__more">{d.more}</span>}
                        {d.points.length > 0 && (
                          <span className="pz-vcard__points">
                            {d.points.map((p) => (
                              <span key={p}>{p}</span>
                            ))}
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {section === "support" && (
        <section className="pz-band pz-band--white">
          <div className="container pz-support">
            {product.docsUrl && (
              <a href={product.docsUrl} rel="noopener">
                <strong>Documentation</strong>
                <span>Guides and reference on {product.name}&apos;s site.</span>
              </a>
            )}
            {product.supportUrl && (
              <a href={product.supportUrl} rel="noopener">
                <strong>Contact support</strong>
                <span>Reach the {product.name} support team.</span>
              </a>
            )}
            {product.faqs?.length ? (
              <Link href={`${routes.product(product.slug)}#faq`}>
                <strong>FAQs</strong>
                <span>Read the {product.name} FAQs.</span>
              </Link>
            ) : null}
          </div>
        </section>
      )}

      {sectionFaqs.length > 0 && (
        <section className="pz-band pz-band--white pz-faq" aria-labelledby="pz-sec-faq">
          <div className="container pz-faq__inner">
            <h2 id="pz-sec-faq" className="pz-h-faq">
              {section === "pricing" ? "Pricing questions" : section === "security" ? "Security & data questions" : `${sectionLabels[section as ProductSection] ?? product.name} questions`}
            </h2>
            <FaqList faqs={sectionFaqs} />
          </div>
        </section>
      )}

      <ProductCta product={product} title={`Questions about ${product.name}?`} primary={cta} secondary={{ label: `${product.name} overview`, href: routes.product(product.slug) }} />
    </div>
  );
}