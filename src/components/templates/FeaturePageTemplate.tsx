import type { ReactElement } from "react";
import Link from "next/link";
import type { Feature, Product } from "@/content/types";
import { getCategory, getFeatures, getIntegrations, integrationHasPage, resolve } from "@/lib/catalog";
import { featureHasPage } from "@/lib/rules";
import { getProductCtas } from "@/lib/product-cta";
import { routes } from "@/lib/routes";
import { absoluteUrl, jsonLd } from "@/lib/seo";
import { Breadcrumbs, CtaBand, FaqList, ScreenshotFrame } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import "@/app/feature-zoho.css";

function Checks({ items, two }: { items: string[]; two?: boolean }) {
  return (
    <ul className={`fz-checks${two ? " fz-checks--2" : ""}`}>
      {items.map((i) => (
        <li key={i}>
          <Icon name="check" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * FeaturePageTemplate (Zoho CRM feature-detail pattern): full-colour centred
 * hero, screenshot overlapping the hero edge, centred heading + copy sections,
 * a tabbed showcase for capabilities / benefits / use cases, FAQs, facts strip,
 * related feature tiles and a CTA band. Every block renders only when the
 * product's official source provided that information.
 */
export function FeaturePageTemplate({ product, feature }: { product: Product; feature: Feature }) {
  const category = getCategory(product.category);
  const group = product.featureCategories?.find((c) => c.slug === feature.category);
  const all = getFeatures(product);
  const explicit = (feature.relatedFeatures ?? []).map((s) => all.find((f) => f.slug === s)).filter((f): f is Feature => !!f);
  const siblings = all.filter((f) => f.slug !== feature.slug && f.category === feature.category && !explicit.includes(f));
  const related = [...explicit, ...siblings].slice(0, 4);
  const integrations = resolve(feature.integrations, getIntegrations());
  const { primary } = getProductCtas(product);

  const tabs = [
    feature.capabilities?.length ? { id: "caps", label: "Main capabilities", body: <Checks items={feature.capabilities} two /> } : null,
    feature.benefits?.length ? { id: "benefits", label: "Benefits", body: <Checks items={feature.benefits} two /> } : null,
    feature.useCases?.length
      ? {
          id: "usecases",
          label: "Use cases",
          body: (
            <ul className="fz-tiles" style={{ marginTop: 0 }}>
              {feature.useCases.map((u) => (
                <li key={u.title} className="fz-tiles__item">
                  <div className="fz-tile">
                    <h3>{u.title}</h3>
                    <p>{u.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          ),
        }
      : null,
  ].filter((t): t is { id: string; label: string; body: ReactElement } => !!t);

  const hasFacts = !!feature.audience?.length || integrations.length > 0 || !!group || !!feature.sources?.length;
  let band = 0; // alternate white / tinted bands
  const tone = () => (band++ % 2 ? " fz-sec--tint" : "");

  return (
    <>
      <header className="fz-hero fz-hero--center">
        <div className="container">
          <div className="fz-crumbs">
            <Breadcrumbs
              items={[
                { name: "Products", href: routes.products() },
                ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
                { name: product.name, href: routes.product(product.slug) },
                { name: "Features", href: routes.productSection(product.slug, "features") },
                { name: feature.name, href: routes.feature(product.slug, feature.slug) },
              ]}
            />
          </div>
          <div className="fz-hero__copy">
            <p className="fz-hero__eyebrow">{group ? `${product.name} · ${group.name}` : product.name}</p>
            <h1>{feature.name}</h1>
            <p className="fz-hero__lead">{feature.summary}</p>
            <div className="fz-hero__ctas">
              <a href={primary.href} rel="noopener" className="fz-btn fz-btn--light">
                {primary.label}
              </a>
              <Link href={routes.productSection(product.slug, "features")} className="fz-more">
                All {product.name} features <Icon name="arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className={`fz-sec${tone()}`} aria-labelledby="what">
        <div className="container">
          <div className="fz-panel fz-panel--shot">
            {feature.media?.[0] ? (
              <ScreenshotFrame media={feature.media[0]} />
            ) : (
              <ImageSlot src="/images/features/feature-hero.webp" alt={`${feature.name} in ${product.name}`} width={1000} height={560} priority className="fz-art fz-art--band" />
            )}
          </div>
          <div className="fz-center" style={{ marginTop: "clamp(56px, 7vw, 96px)" }}>
            <h2 id="what" className="fz-h2">
              What is {feature.name}?
            </h2>
            {feature.body?.map((p, i) => (
              <p key={i} className="fz-lead">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {feature.problem && (
        <section className={`fz-sec${tone()}`} aria-labelledby="problem">
          <div className="container fz-center">
            <span className="fz-kicker">The problem it solves</span>
            <h2 id="problem" className="fz-h2">
              Why {feature.name} matters
            </h2>
            <p className="fz-lead">{feature.problem}</p>
          </div>
        </section>
      )}

      {feature.howItWorks?.length ? (
        <section className={`fz-sec${tone()}`} aria-labelledby="how">
          <div className="container">
            <div className="fz-center">
              <h2 id="how" className="fz-h2">
                How it works
              </h2>
            </div>
            <ol className="fz-steps">
              {feature.howItWorks.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {tabs.length > 0 && (
        <section className={`fz-sec${tone()}`} aria-labelledby="inside">
          <div className="container">
            <div className="fz-center">
              <h2 id="inside" className="fz-h2">
                Inside {feature.name}
              </h2>
            </div>
            {tabs.length === 1 ? (
              <div className="fz-panel">
                <div className="fz-panel__inner">
                  <h3 className="fz-tabs__single" id={tabs[0].id}>
                    {tabs[0].label}
                  </h3>
                  {tabs[0].body}
                </div>
              </div>
            ) : (
              <div className="fz-tabs">
                {tabs.map((t, i) => (
                  <input key={t.id} type="radio" name="fz-tab" id={`tab-${t.id}`} defaultChecked={i === 0} aria-controls={`panel-${t.id}`} />
                ))}
                <div className="fz-tabs__bar">
                  {tabs.map((t) => (
                    <label key={t.id} htmlFor={`tab-${t.id}`}>
                      {t.label}
                    </label>
                  ))}
                </div>
                {tabs.map((t) => (
                  <div key={t.id} className="fz-tabs__panel" id={`panel-${t.id}`} role="region" aria-label={t.label}>
                    <div className="fz-panel" style={{ marginTop: 0 }}>
                      <div className="fz-panel__inner">{t.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="fz-panel fz-panel--shot">
              {feature.media?.[1] ? (
                <ScreenshotFrame media={feature.media[1]} />
              ) : (
                <ImageSlot src="/images/features/feature-screen.webp" alt={`${feature.name} screen in ${product.name}`} width={960} height={540} className="fz-art fz-art--band" />
              )}
            </div>
          </div>
        </section>
      )}

      {feature.faqs?.length ? (
        <section className={`fz-sec${tone()}`} aria-labelledby="faq">
          <div className="container">
            <div className="fz-center">
              <h2 id="faq" className="fz-h2">
                {feature.name} FAQs
              </h2>
            </div>
            <div className="fz-faq">
              <FaqList faqs={feature.faqs} />
            </div>
          </div>
        </section>
      ) : null}

      {hasFacts && (
        <section className={`fz-sec${tone()}`} aria-label="Feature details" style={{ paddingBlock: "clamp(40px, 5vw, 64px)" }}>
          <div className="container fz-facts">
            {feature.audience?.length ? (
              <div className="fz-fact">
                <h2>Who uses it</h2>
                <ul className="chips">
                  {feature.audience.map((a) => (
                    <li key={a} className="chip">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {integrations.length > 0 && (
              <div className="fz-fact">
                <h2>Works with</h2>
                <ul className="chips">
                  {integrations.map((i) => (
                    <li key={i.slug}>
                      <Link href={integrationHasPage(i) ? routes.integration(i.slug) : `${routes.integrations()}#${i.slug}`} className="chip">
                        {i.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {group && (
              <div className="fz-fact">
                <h2>Part of</h2>
                <Link href={`${routes.productSection(product.slug, "features")}#${group.slug}`}>{group.name}</Link>
              </div>
            )}
            {feature.sources?.length ? (
              <div className="fz-fact">
                <h2>Source</h2>
                <p>
                  Described from{" "}
                  {feature.sources.map((s, i) => (
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
            ) : null}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className={`fz-sec${tone()}`} aria-labelledby="related">
          <div className="container">
            <div className="fz-center">
              <h2 id="related" className="fz-h2">
                Related {product.name} features
              </h2>
            </div>
            <ul className="fz-tiles">
              {related.map((f) => (
                <li key={f.slug} className="fz-tiles__item">
                  {featureHasPage(f) ? (
                    <Link href={routes.feature(product.slug, f.slug)} className="fz-tile">
                      <span className="fz-mono" aria-hidden>
                        {f.name.charAt(0)}
                      </span>
                      <h3>{f.name}</h3>
                      <p>{f.summary}</p>
                      <span className="fz-more">
                        Learn more <Icon name="arrow-right" />
                      </span>
                    </Link>
                  ) : (
                    <div className="fz-tile">
                      <span className="fz-mono" aria-hidden>
                        {f.name.charAt(0)}
                      </span>
                      <h3>{f.name}</h3>
                      <p>{f.summary}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={`Try ${feature.name} in ${product.name}`}
        lead={product.pricing?.trial}
        primary={primary}
        secondary={{ label: `About ${product.name}`, href: routes.product(product.slug) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${feature.name} — ${product.name}`,
          description: feature.summary,
          url: absoluteUrl(routes.feature(product.slug, feature.slug)),
          about: { "@type": "SoftwareApplication", name: product.name, url: absoluteUrl(routes.product(product.slug)) },
        })}
      />
    </>
  );
}
