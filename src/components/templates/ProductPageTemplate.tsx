import Link from "next/link";
import type { Product } from "@/content/types";
import { getCategory, getConnections, getRelatedProducts, groupFeatures, integrationHasPage, previewMode } from "@/lib/catalog";
import { getProductCtas, platformLabels } from "@/lib/product-cta";
import { getAvailableSections, getProductSectionData, OVERVIEW_FEATURE_LIMIT } from "@/lib/product-sections";
import { routes } from "@/lib/routes";
import { absoluteUrl, jsonLd } from "@/lib/seo";
import { monogram, productAccent } from "@/lib/tint";
import { FeatureCard, ProductCard } from "@/components/product/cards";
import {
  Breadcrumbs,
  ButtonLink,
  CtaBand,
  FaqList,
  ScreenshotFrame,
  Section,
  SectionHeader,
  Slot,
  StatusBadge,
} from "@/components/ui/primitives";

/** Highlighted features shown on the overview before linking to the full hub. */
const OVERVIEW_FEATURES = OVERVIEW_FEATURE_LIMIT;

/**
 * ProductPageTemplate — the overview page for any product.
 * Every section is optional and renders only when the product has data for it,
 * so a product with 3 features and one with 100 use the same template.
 */
export function ProductPageTemplate({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const data = getProductSectionData(product);
  const groups = groupFeatures(product);
  const highlights = (data.features.some((f) => f.highlight) ? data.features.filter((f) => f.highlight) : data.features).slice(
    0,
    OVERVIEW_FEATURES,
  );
  const related = getRelatedProducts(product);
  const hero = product.heroImage ?? product.screenshots?.[0];
  const { primary: cta, secondary } = getProductCtas(product);
  const connections = getConnections(product);
  const hasFeaturesHub = getAvailableSections(product).includes("features");

  return (
    <>
      {/* Hero */}
      <header className="hero" style={{ paddingTop: 40 }}>
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Products", href: routes.products() },
              ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
              { name: product.name, href: routes.product(product.slug) },
            ]}
          />
        </div>
        <div className="container hero__grid" style={{ marginTop: 32 }}>
          <div className="hero__copy">
            <div className="card__meta">
              {category && <span className="eyebrow">{category.name}</span>}
              <StatusBadge status={product.status} pending={product.verification?.relationship === "pending" || product.verification?.publicSale === "pending"} />
            </div>
            <h1 className="display" style={{ fontSize: "var(--fs-3xl)" }}>
              {product.name}
            </h1>
            <p className="lead">{product.shortDescription}</p>
            <div className="btn-row">
              <ButtonLink href={cta.href} arrow>
                {cta.label}
              </ButtonLink>
              {product.pricing ? (
                <ButtonLink href={routes.productSection(product.slug, "pricing")} variant="secondary">
                  See pricing
                </ButtonLink>
              ) : (
                secondary && (
                  <ButtonLink href={secondary.href} variant="secondary">
                    {secondary.label}
                  </ButtonLink>
                )
              )}
            </div>
            {product.platforms?.length ? (
              <ul className="card__meta" aria-label="Available on">
                {product.platforms.map((p) => (
                  <li key={p} className="badge">
                    {platformLabels[p] ?? p}
                  </li>
                ))}
                {product.market && <li className="badge badge--pine">{product.market}</li>}
              </ul>
            ) : null}
          </div>
          {hero ? (
            <ScreenshotFrame media={hero} />
          ) : (
            <figure className="brand-panel" style={{ ["--accent" as string]: productAccent(product) }}>
              <span aria-hidden>{monogram(product.name)}</span>
              {product.tagline && (
                <figcaption className="brand-panel__quote">
                  “{product.tagline}”<small>— {product.name}</small>
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </header>

      {/* What is / who is it for */}
      {(product.longDescription || product.audience?.length) && (
        <Section tone="surface">
          <div className="split" style={{ alignItems: "start" }}>
            {product.longDescription && (
              <div className="stack">
                <p className="eyebrow">Overview</p>
                <h2 className="h2">What is {product.name}?</h2>
                <p className="lead">{product.longDescription}</p>
              </div>
            )}
            {product.audience?.length ? (
              <div className="stack">
                <p className="eyebrow">Who it&apos;s for</p>
                <ul className="chips">
                  {product.audience.map((a) => (
                    <li key={a} className="chip">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>
      )}

      {/* Benefits */}
      {product.benefits?.length ? (
        <Section>
          <SectionHeader eyebrow="Benefits" title={`Why teams choose ${product.name}`} />
          <div className="grid" style={{ ["--min" as string]: "240px" }}>
            {product.benefits.map((b) => (
              <article key={b.title} className="card">
                <h3 className="card__title">{b.title}</h3>
                <p className="text-muted">{b.description}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Core features + feature categories */}
      {highlights.length > 0 && (
        <Section tone="surface">
          <SectionHeader
            eyebrow="Features"
            title="Core features"
            lead={data.features.length > highlights.length ? `${data.features.length} capabilities across ${groups.length} areas.` : undefined}
            action={
              hasFeaturesHub && (
                <ButtonLink href={routes.productSection(product.slug, "features")} variant="secondary" arrow>
                  All features
                </ButtonLink>
              )
            }
          />
          <div className="grid" style={{ ["--min" as string]: "260px" }}>
            {highlights.map((f) => (
              <FeatureCard key={f.slug} feature={f} productSlug={product.slug} />
            ))}
          </div>
          {hasFeaturesHub && groups.length > 1 && (
            <div className="chips" style={{ marginTop: 28 }}>
              {groups.map((g) => (
                <Link key={g.group.slug} href={`${routes.productSection(product.slug, "features")}#${g.group.slug}`} className="chip">
                  {g.group.name} <span>{g.features.length}</span>
                </Link>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Screenshots */}
      {product.screenshots && product.screenshots.length > (product.heroImage ? 0 : 1) && (
        <Section>
          <SectionHeader eyebrow="Product tour" title={`See ${product.name} in action`} />
          <div className="grid" style={{ ["--min" as string]: "360px" }}>
            {product.screenshots.map((s) => (
              <ScreenshotFrame key={s.src} media={s} />
            ))}
          </div>
        </Section>
      )}

      {/* How it works */}
      {product.howItWorks?.length ? (
        <Section tone="surface">
          <SectionHeader eyebrow="How it works" title={`Getting started with ${product.name}`} />
          <ol className="steps">
            {product.howItWorks.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      {/* Use cases — concrete situations from the product's own site */}
      {product.useCases?.length ? (
        <Section>
          <SectionHeader eyebrow="Use cases" title={`Where teams use ${product.name}`} />
          <div className="grid" style={{ ["--min" as string]: "240px" }}>
            {product.useCases.map((u) => (
              <article key={u.title} className="card">
                <h3 className="card__title">{u.title}</h3>
                <p className="text-muted">{u.description}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Solutions / industries / integrations */}
      {(data.solutions.length > 0 || data.industries.length > 0 || data.integrations.length > 0) && (
        <Section>
          <div className="grid" style={{ ["--min" as string]: "300px", ["--gap" as string]: "40px" }}>
            {[
              { key: "solutions", title: "Solutions", items: data.solutions.map((s) => ({ name: s.name, href: routes.solution(s.slug) })) },
              { key: "industries", title: "Industries", items: data.industries.map((i) => ({ name: i.name, href: routes.industry(i.slug) })) },
              {
                key: "integrations",
                title: "Integrations",
                items: data.integrations.map((i) => ({
                  name: i.name,
                  href: integrationHasPage(i) ? routes.integration(i.slug) : `${routes.integrations()}#${i.slug}`,
                })),
              },
            ]
              .filter((col) => col.items.length)
              .map((col) => (
                <div key={col.key} className="stack">
                  <h2 className="h3">{col.title}</h2>
                  <div className="chips">
                    {col.items.map((i) => (
                      <Link key={i.href} href={i.href} className="chip">
                        {i.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </Section>
      )}

      {/* Connections with other ToyoApps products (stated by the products) */}
      {connections.length > 0 && (
        <Section tight>
          <SectionHeader eyebrow="Ecosystem" title={`${product.name} and other ToyoApps products`} />
          <div className="grid">
            {connections.map((c) => (
              <Link key={c.product.slug} href={routes.product(c.product.slug)} className="card">
                <h3 className="card__title">{c.product.name}</h3>
                <p className="text-muted">{c.description}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Pricing summary — the full plans live on the pricing page */}
      {product.pricing?.plans.length ? (
        <Section tone="surface">
          <SectionHeader
            eyebrow="Pricing"
            title={`${product.name} plans`}
            lead={product.pricing.trial}
            action={
              <ButtonLink href={routes.productSection(product.slug, "pricing")} variant="secondary" arrow>
                Compare plans
              </ButtonLink>
            }
          />
          <ul className="price-strip">
            {product.pricing.plans.map((p) => (
              <li key={p.name} className={p.recommended ? "is-recommended" : undefined}>
                <span>{p.name}</span>
                <strong>
                  {p.price}
                  {p.period && <small> / {p.period}</small>}
                </strong>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Customer proof — reserved, preview only */}
      {previewMode && (
        <Section tight>
          <Slot show label={`${product.name} customer proof`} hint="Testimonials, case studies and ratings — verified only" />
        </Section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Works alongside"
            title="Related ToyoApps products"
            action={
              category && (
                <ButtonLink href={routes.category(category.slug)} variant="ghost" arrow>
                  More in {category.name}
                </ButtonLink>
              )
            }
          />
          <div className="grid" style={{ ["--min" as string]: "300px" }}>
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} categoryName={getCategory(p.category)?.name} />
            ))}
          </div>
        </Section>
      )}

      {/* FAQs */}
      {product.faqs?.length ? (
        <Section tone="surface" id="faq">
          <SectionHeader eyebrow="FAQs" title={`${product.name} questions`} />
          <FaqList faqs={product.faqs} />
        </Section>
      ) : null}

      <CtaBand
        title={`Get started with ${product.name}`}
        primary={cta}
        secondary={{ label: "Explore all products", href: routes.products() }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: product.name,
          description: product.shortDescription,
          applicationCategory: "BusinessApplication",
          url: absoluteUrl(routes.product(product.slug)),
          sameAs: product.websiteUrl,
          ...(product.platforms && { operatingSystem: product.platforms.map((p) => platformLabels[p] ?? p).join(", ") }),
          ...(product.logo && { image: absoluteUrl(product.logo.src) }),
        })}
      />
    </>
  );
}
