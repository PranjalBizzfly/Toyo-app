import Link from "next/link";
import type { Product } from "@/content/types";
import {
  featureHasPage,
  getCategory,
  getConnections,
  getRelatedProducts,
  groupFeatures,
  integrationHasPage,
  previewMode,
} from "@/lib/catalog";
import { getProductCtas, platformLabels } from "@/lib/product-cta";
import { getAvailableSections, getProductSectionData, OVERVIEW_FEATURE_LIMIT } from "@/lib/product-sections";
import { routes } from "@/lib/routes";
import { absoluteUrl, jsonLd } from "@/lib/seo";
import { ProductCard, ProductLogo } from "@/components/product/cards";
import { Breadcrumbs, FaqList, Slot, StatusBadge } from "@/components/ui/primitives";
import { ImageSlot } from "@/components/ui/ImageSlot";
import "@/app/product-zoho.css";

/** One shared artwork slot per spotlight position (swap the files for real art). */
const SPOT_ART = [
  <ImageSlot key="1" src="/images/product/spotlight-1.svg" alt="" width={580} height={520} className="pz-spot__img" />,
  <ImageSlot key="2" src="/images/product/spotlight-2.svg" alt="" width={580} height={520} className="pz-spot__img" />,
  <ImageSlot key="3" src="/images/product/spotlight-3.svg" alt="" width={580} height={520} className="pz-spot__img" />,
];

/** Highlighted features shown on the overview before linking to the full hub. */
const OVERVIEW_FEATURES = OVERVIEW_FEATURE_LIMIT;
/** How many highlights get the large alternating "spotlight" treatment. */
const SPOTLIGHTS = 3;

/**
 * ProductPageTemplate — the overview page for any product, laid out like a
 * Zoho product home: gradient hero with a get-started card, "built for" pill
 * row, centred section headings, large alternating spotlight cards, tinted
 * card grids, a "take a tour" band, FAQ and a closing CTA band.
 * Every section is optional and renders only when the product has data for it.
 */
export function ProductPageTemplate({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const data = getProductSectionData(product);
  const groups = groupFeatures(product);
  const highlights = (data.features.some((f) => f.highlight) ? data.features.filter((f) => f.highlight) : data.features).slice(
    0,
    OVERVIEW_FEATURES,
  );
  const spotlights = highlights.slice(0, SPOTLIGHTS);
  const moreHighlights = highlights.slice(SPOTLIGHTS);
  const related = getRelatedProducts(product);
  const shots = product.screenshots ?? [];
  const tourShot = product.heroImage ?? shots[0];
  const { primary: cta } = getProductCtas(product);
  const connections = getConnections(product);
  const hasFeaturesHub = getAvailableSections(product).includes("features");
  const host = new URL(product.websiteUrl).hostname.replace(/^www\./, "");

  const linkCols = [
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
  ].filter((c) => c.items.length);

  return (
    <div className="pz">
      {/* Hero: very large headline left, get-started card right, gradient band with rounded base */}
      <header className="pz-hero" data-no-reveal>
        <div className="container pz-hero__grid">
          <div className="pz-hero__copy">
            <Breadcrumbs
              items={[
                { name: "Products", href: routes.products() },
                ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
                { name: product.name, href: routes.product(product.slug) },
              ]}
            />
            <p className="pz-hero__name">
              {product.name}
              <StatusBadge
                status={product.status}
                pending={product.verification?.relationship === "pending" || product.verification?.publicSale === "pending"}
              />
            </p>
            <h1 className="pz-hero__title">{product.tagline ?? product.primaryUseCase ?? product.name}</h1>
            <p className="pz-hero__lead">{product.shortDescription}</p>
            <ul className="pz-hero__chips" aria-label="Product details">
              {category && (
                <li>
                  <Link href={routes.category(category.slug)}>{category.name}</Link>
                </li>
              )}
              {(product.platforms ?? []).map((p) => (
                <li key={p}>{platformLabels[p] ?? p}</li>
              ))}
              {product.market && <li>{product.market}</li>}
            </ul>
          </div>
          <aside className="pz-start" aria-label={`Get started with ${product.name}`}>
            <span className="pz-start__logo">
              <ProductLogo product={product} />
            </span>
            <h2>Get started with {product.name}</h2>
            <p>{product.pricing?.trial ?? product.primaryUseCase ?? "Sign up on the product's own website."}</p>
            <a href={cta.href} rel="noopener" className="pz-btn pz-btn--solid pz-btn--block">
              {cta.label}
            </a>
            {product.pricing && (
              <Link href={routes.productSection(product.slug, "pricing")} className="pz-btn pz-btn--line pz-btn--block">
                See plans and pricing
              </Link>
            )}
            <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="pz-start__original">
              View Original Product <span aria-hidden="true">↗</span>
            </a>
            <p className="pz-start__note">
              Continues on <strong>{host}</strong>
            </p>
          </aside>
        </div>
      </header>

      {/* Built for — centred heading over a row of soft pills (Zoho's "trusted by" strip) */}
      {product.audience?.length ? (
        <section className="pz-band pz-band--tint pz-trust" aria-labelledby="pz-audience">
          <div className="container">
            <h2 id="pz-audience" className="pz-h-sm pz-center">
              Built for {product.audience.length > 2 ? "teams like yours" : product.audience.join(" and ")}
            </h2>
            <ul className="pz-pills">
              {product.audience.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* What is it — big centred statement */}
      {product.longDescription && (
        <section className="pz-band pz-band--tint" aria-labelledby="pz-what">
          <div className="container pz-narrow pz-center">
            <h2 id="pz-what" className="pz-h-xl">
              What is {product.name}?
            </h2>
            {product.longDescription
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((para, i) => (
                <p key={i} className={i === 0 ? "pz-lead" : "pz-lead-more"}>
                  {para.trim()}
                </p>
              ))}
          </div>
        </section>
      )}

      {/* Benefits — tinted rounded cards, four across */}
      {product.benefits?.length ? (
        <section className="pz-band pz-band--tint" aria-labelledby="pz-benefits">
          <div className="container">
            <h2 id="pz-benefits" className="pz-h-md pz-center">
              Why teams choose {product.name}
            </h2>
            <div className="pz-quotes">
              {product.benefits.map((b) => (
                <article key={b.title} className="pz-quote">
                  <h3>{b.title}</h3>
                  <p>{b.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Feature spotlights — large split cards, alternating sides */}
      {spotlights.length > 0 && (
        <section className="pz-band pz-band--tint pz-spot-wrap" aria-label="Core features">
          <div className="container pz-spots">
            {spotlights.map((f, i) => (
              <article key={f.slug} className={`pz-spot${i % 2 ? " pz-spot--flip" : ""}`}>
                <div className="pz-spot__copy">
                  <h2 className="pz-spot__title">{f.name}</h2>
                  <p className="pz-spot__text">{f.summary}</p>
                  {featureHasPage(f) ? (
                    <Link href={routes.feature(product.slug, f.slug)} className="pz-arrow">
                      Discover {f.name} <span aria-hidden>→</span>
                    </Link>
                  ) : hasFeaturesHub ? (
                    <Link href={routes.productSection(product.slug, "features")} className="pz-arrow">
                      Explore all features <span aria-hidden>→</span>
                    </Link>
                  ) : null}
                </div>
                <div className={`pz-spot__art pz-spot__art--${i % 3}`}>
                  {shots[i + 1] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="pz-spot__shot" src={shots[i + 1].src} alt={shots[i + 1].alt} loading="lazy" />
                  ) : f.capabilities?.length ? (
                    <>
                    {SPOT_ART[i % 3]}
                    <ul className="pz-spot__panel">
                      <li className="pz-spot__panel-head">{f.name}</li>
                      {f.capabilities.slice(0, 5).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                    </>
                  ) : (
                    SPOT_ART[i % 3]
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Remaining highlights + feature areas — "everything you need" */}
      {(moreHighlights.length > 0 || (hasFeaturesHub && groups.length > 1)) && (
        <section className="pz-band pz-band--tint" aria-labelledby="pz-everything">
          <div className="container">
            <h2 id="pz-everything" className="pz-h-lg pz-center">
              Everything you need, in one {product.name}
            </h2>
            {data.features.length > highlights.length && (
              <p className="pz-sub pz-center">
                {data.features.length} capabilities across {groups.length} areas.
              </p>
            )}
            {moreHighlights.length > 0 && (
              <div className="pz-cards pz-cards--3">
                {moreHighlights.map((f) => {
                  const body = (
                    <>
                      <span className="pz-card__icon" aria-hidden>
                        {f.name.charAt(0)}
                      </span>
                      <h3>{f.name}</h3>
                      <p>{f.summary}</p>
                    </>
                  );
                  return featureHasPage(f) ? (
                    <Link key={f.slug} href={routes.feature(product.slug, f.slug)} className="pz-card pz-card--link">
                      {body}
                      <span className="pz-arrow">
                        Learn more <span aria-hidden>→</span>
                      </span>
                    </Link>
                  ) : (
                    <article key={f.slug} className="pz-card">
                      {body}
                    </article>
                  );
                })}
              </div>
            )}
            {hasFeaturesHub && groups.length > 1 && (
              <ul className="pz-pills pz-pills--links">
                {groups.map((g) => (
                  <li key={g.group.slug}>
                    <Link href={`${routes.productSection(product.slug, "features")}#${g.group.slug}`}>
                      {g.group.name} <span>{g.features.length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {hasFeaturesHub && (
              <p className="pz-center pz-mt">
                <Link href={routes.productSection(product.slug, "features")} className="pz-btn pz-btn--line">
                  All features
                </Link>
              </p>
            )}
          </div>
        </section>
      )}

      {/* How it works — numbered steps */}
      {product.howItWorks?.length ? (
        <section className="pz-band pz-band--white" aria-labelledby="pz-how">
          <div className="container">
            <h2 id="pz-how" className="pz-h-md pz-center">
              Getting started with {product.name}
            </h2>
            <ol className="pz-steps">
              {product.howItWorks.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Use cases — white cards on tint */}
      {product.useCases?.length ? (
        <section className="pz-band pz-band--tint" aria-labelledby="pz-uses">
          <div className="container">
            <h2 id="pz-uses" className="pz-h-md pz-center">
              Where teams use {product.name}
            </h2>
            <div className="pz-cards pz-cards--4">
              {product.useCases.map((u) => (
                <article key={u.title} className="pz-card">
                  <h3>{u.title}</h3>
                  <p>{u.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Screenshots — "take a tour" band with very large headline */}
      {(
        <section className="pz-band pz-band--tint pz-tour-wrap" aria-labelledby="pz-tour">
          <div className="pz-tour">
            <div className="container pz-center">
              <h2 id="pz-tour" className="pz-tour__title">
                See {product.name} in action
              </h2>
              <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="pz-btn pz-btn--solid">
                Visit {host} <span aria-hidden>↗</span>
              </a>
              <figure className="pz-tour__frame">
                {tourShot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tourShot.src} alt={tourShot.alt} loading="lazy" />
                ) : (
                  <ImageSlot src="/images/product/tour.svg" alt={`${product.name} product screenshot`} width={1100} height={560} />
                )}
              </figure>
              {tourShot && shots.length > 1 && (
                <div className="pz-tour__thumbs">
                  {shots
                    .filter((s) => s.src !== tourShot.src)
                    .map((s) => (
                      <figure key={s.src}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.src} alt={s.alt} loading="lazy" />
                        {s.caption && <figcaption>{s.caption}</figcaption>}
                      </figure>
                    ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Solutions / industries / integrations — logo-style pill rows */}
      {linkCols.length > 0 && (
        <section className="pz-band pz-band--white" aria-labelledby="pz-fits">
          <div className="container">
            <h2 id="pz-fits" className="pz-h-md pz-center">
              Where {product.name} fits
            </h2>
            <div className="pz-fits">
              {linkCols.map((col) => (
                <div key={col.key} className="pz-fits__col">
                  <h3>{col.title}</h3>
                  <ul className="pz-tiles">
                    {col.items.map((i) => (
                      <li key={i.href}>
                        <Link href={i.href}>{i.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Connections with other ToyoApps products (stated by the products) */}
      {connections.length > 0 && (
        <section className="pz-band pz-band--tint" aria-labelledby="pz-eco">
          <div className="container">
            <h2 id="pz-eco" className="pz-h-md pz-center">
              {product.name} and other ToyoApps products
            </h2>
            <div className="pz-cards pz-cards--3">
              {connections.map((c) => (
                <Link key={c.product.slug} href={routes.product(c.product.slug)} className="pz-card pz-card--link pz-card--row">
                  <ProductLogo product={c.product} />
                  <span>
                    <h3>{c.product.name}</h3>
                    <p>{c.description}</p>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing summary — plan strip; the full plans live on the pricing page */}
      {product.pricing?.plans.length ? (
        <section className="pz-band pz-band--white" aria-labelledby="pz-price">
          <div className="container">
            <h2 id="pz-price" className="pz-h-md pz-center">
              {product.name} plans
            </h2>
            {product.pricing.trial && <p className="pz-sub pz-center">{product.pricing.trial}</p>}
            <ul className="pz-planstrip">
              {product.pricing.plans.map((p) => (
                <li key={p.name} className={p.recommended ? "is-recommended" : undefined}>
                  {p.recommended && <em>Most popular</em>}
                  <span>{p.name}</span>
                  <strong>{p.price}</strong>
                  {p.period && <small>/ {p.period}</small>}
                </li>
              ))}
            </ul>
            <p className="pz-center pz-mt">
              <Link href={routes.productSection(product.slug, "pricing")} className="pz-arrow">
                Compare plans <span aria-hidden>→</span>
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      {/* Customer proof — reserved, preview only */}
      {previewMode && (
        <section className="pz-band pz-band--white">
          <div className="container">
            <Slot show label={`${product.name} customer proof`} hint="Testimonials, case studies and ratings — verified only" />
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="pz-band pz-band--tint" aria-labelledby="pz-related">
          <div className="container">
            <h2 id="pz-related" className="pz-h-md pz-center">
              Related ToyoApps products
            </h2>
            <div className="pz-related">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} categoryName={getCategory(p.category)?.name} />
              ))}
            </div>
            {category && (
              <p className="pz-center pz-mt">
                <Link href={routes.category(category.slug)} className="pz-arrow">
                  More in {category.name} <span aria-hidden>→</span>
                </Link>
              </p>
            )}
          </div>
        </section>
      )}

      {/* FAQs — left-aligned heading, open list */}
      {product.faqs?.length ? (
        <section className="pz-band pz-band--white pz-faq" id="faq" aria-labelledby="pz-faq">
          <div className="container pz-faq__inner">
            <h2 id="pz-faq" className="pz-h-faq">
              Frequently Asked Questions
            </h2>
            <FaqList faqs={product.faqs} />
          </div>
        </section>
      ) : null}

      {/* Closing CTA band */}
      <section className="pz-cta" aria-labelledby="pz-cta">
        <div className="container pz-center">
          <h2 id="pz-cta" className="pz-cta__title">
            Get started with {product.name}
          </h2>
          {product.pricing?.trial && <p className="pz-cta__lead">{product.pricing.trial}</p>}
          <div className="pz-cta__row">
            <a href={cta.href} rel="noopener" className="pz-btn pz-btn--solid">
              {cta.label}
            </a>
            <Link href={routes.products()} className="pz-btn pz-btn--line">
              Explore all products
            </Link>
          </div>
        </div>
      </section>

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
    </div>
  );
}
