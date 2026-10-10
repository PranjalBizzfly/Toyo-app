import { getProductFaqs } from "@/lib/faqs";
import { Labelled } from "@/components/ui/Labelled";
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
import { getProductStory, getStoryPatterns } from "@/lib/product-story";
import { inActionPhoto } from "@/lib/in-action";
import { routes } from "@/lib/routes";
import { absoluteUrl, jsonLd } from "@/lib/seo";
import { ProductCard, ProductLogo } from "@/components/product/cards";
import { ProductHero } from "@/components/product/ProductHero";
import { BranchTimeline } from "@/components/product/BranchTimeline";
import { PastelCards, VoiceHero } from "@/components/product/VoiceParts";
import "@/app/voice.css";
import { SpotTabbar, StoryTabs, type StoryTab } from "@/components/product/StoryTabs";
import { FaqList, Slot } from "@/components/ui/primitives";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SpotVisual } from "@/components/product/SpotVisual";
import "@/app/product-zoho.css";
import "@/app/product-story.css";
import "@/app/product-refs.css";
import "@/app/alt-patterns.css";

const SPOTLIGHTS = 3;
const MORE_FEATURES = 9;

/**
 * ProductPageTemplate — the overview page for any product. Each product's
 * story (src/lib/product-story.ts) takes its design approach from a different
 * Zoho product site: hero composition, palette, benefits style, spotlight
 * layout, signature section, band edges and CTA all vary. Every section renders
 * only when the product has data for it; no content is invented.
 */
export function ProductPageTemplate({ product }: { product: Product }) {
  const story = getProductStory(product.slug);
  const P = getStoryPatterns(product.slug);
  const category = getCategory(product.category);
  const data = getProductSectionData(product);
  const groups = groupFeatures(product);
  const highlights = (data.features.some((f) => f.highlight) ? data.features.filter((f) => f.highlight) : data.features).slice(
    0,
    OVERVIEW_FEATURE_LIMIT,
  );
  const spotlights = highlights.slice(0, story.spot === "stack" || story.spot === "accordion" ? 5 : SPOTLIGHTS);
  // Remaining highlights first, then one feature per area (round-robin) so the index reaches MORE_FEATURES
  const moreHighlights = highlights.slice(spotlights.length);
  for (let round = 0; moreHighlights.length < MORE_FEATURES; round++) {
    const picks = groups.map((g) => g.features[round]).filter((f): f is NonNullable<typeof f> => !!f);
    if (!picks.length) break;
    for (const f of picks) {
      if (moreHighlights.length >= MORE_FEATURES) break;
      if (![...spotlights, ...moreHighlights].some((x) => x.slug === f.slug)) moreHighlights.push(f);
    }
  }
  const related = getRelatedProducts(product);
  const shots = product.screenshots ?? [];
  const tourShot = product.heroImage ?? shots[0];
  const { primary: cta } = getProductCtas(product);
  const connections = dedupe(getConnections(product));
  const hasFeaturesHub = getAvailableSections(product).includes("features");
  const host = new URL(product.websiteUrl).hostname.replace(/^www\./, "");
  const featuresHref = routes.productSection(product.slug, "features");
  const groupOf = (slug: string) => groups.find((g) => g.features.some((f) => f.slug === slug))?.group.name ?? "Feature";

  const integrationNames = data.integrations.map((i) => ({
    name: i.name,
    href: integrationHasPage(i) ? routes.integration(i.slug) : `${routes.integrations()}#${i.slug}`,
  }));

  const tabs: StoryTab[] = groups
    .filter((g) => g.features.length)
    .slice(0, 6)
    .map((g) => ({
      id: g.group.slug,
      label: g.group.name,
      intro: g.group.description,
      href: hasFeaturesHub ? `${featuresHref}#${g.group.slug}` : undefined,
      items: g.features.slice(0, 6).map((f) => ({
        title: f.name,
        text: f.summary,
        href: featureHasPage(f) ? routes.feature(product.slug, f.slug) : undefined,
      })),
    }));
  // Problems-style tabs (Zoho Classes): one tab per use case.
  const problemTabs: StoryTab[] = (product.useCases ?? []).slice(0, 5).map((u, i) => ({
    id: `uc-${i}`,
    label: u.title,
    intro: u.description,
    items: highlights.slice(i, i + 2).map((f) => ({
      title: f.name,
      text: f.summary,
      href: featureHasPage(f) ? routes.feature(product.slug, f.slug) : undefined,
    })),
  }));
  const nodes = hubNodes(connections, integrationNames);

  const can = {
    tabs: tabs.length >= 2,
    hub: nodes.length >= 3,
    orbit: nodes.length >= 3 || groups.length >= 3,
    timeline: (product.howItWorks?.length ?? 0) >= 2,
    problems: problemTabs.length >= 2,
    dotgrid: groups.length >= 2 || nodes.length >= 3,
  };
  const order = [story.signature, "timeline", "tabs", "hub"] as const;
  const signature = order.find((s) => can[s]) ?? null;

  const linkCols = [
    { key: "solutions", title: "Solutions", items: data.solutions.map((s) => ({ name: s.name, href: routes.solution(s.slug) })) },
    { key: "industries", title: "Industries", items: data.industries.map((i) => ({ name: i.name, href: routes.industry(i.slug) })) },
    { key: "integrations", title: "Integrations", items: integrationNames },
  ].filter((c) => c.items.length);

  const edge = story.edge === "angle" ? "zs-edge-angle" : story.edge === "round" ? "zs-curve" : "";

  return (
    <div className={`pz zs zs--${story.look} zs-ref--${story.hero}${story.serif ? " zs--serif" : ""}`} data-ref={story.ref}>
      {story.recipe === "voice" ? (
        <>
          <VoiceHero product={product} cta={cta} photos={["/images/products/hrmagix/in-action.webp", "/images/categories/hr-people.webp"]} />
          {groups.length >= 3 && (
            <section className="pc-sec" aria-labelledby="pc-title">
              <div className="container">
                <h2 id="pc-title" className="zs-h2 zs-center">
                  Everything HR, built around one employee record
                </h2>
                <PastelCards
                  cards={groups.slice(0, 3).map((g, i) => ({
                    title: g.group.name,
                    text: g.group.description ?? g.features.slice(0, 3).map((f) => f.name).join(", "),
                    image: ["/images/solutions/manage-your-people-from-hire-to-growth.webp", "/images/products/zuzu/in-action.webp", "/images/products/zorfly/in-action.webp"][i],
                    href: `${featuresHref}#${g.group.slug}`,
                    label: ["Explore more", "See how it works", "Learn more"][i],
                  }))}
                />
              </div>
            </section>
          )}
          {groups.length >= 3 && (
            <BranchTimeline
              id="bt-platform"
              title={`${product.name}'s connected`}
              accent="HR Platform"
              items={groups.map((g) => ({
                title: g.group.name,
                text: g.group.description ?? g.features.slice(0, 4).map((f) => f.name).join(", "),
                href: `${featuresHref}#${g.group.slug}`,
                linkLabel: `Explore ${g.features.length} features`,
              }))}
            />
          )}
        </>
      ) : (
        <ProductHero product={product} story={story} highlights={highlights} integrations={integrationNames} cta={cta} />
      )}

      {/* Built for */}
      {product.audience?.length ? (
        <section className={`zs-band zs-band--plain zs-audience zs-aud-${P.audience}`} aria-labelledby="zs-audience">
          <div className="container">
            <h2 id="zs-audience" className="zs-eyebrow zs-center">
              Built for {product.audience.length > 2 ? "teams like yours" : product.audience.join(" and ")}
            </h2>
          </div>
          <div className={`zs-ribbon${product.audience.length > 3 ? " zs-ribbon--loop" : ""}`}>
            <ul className="zs-ribbon__track">
              {product.audience.map((a) => (
                <li key={a}><Labelled text={a} /></li>
              ))}
              {product.audience.length > 3 &&
                product.audience.map((a) => (
                  <li key={`${a}-2`} aria-hidden="true">
                    {a}
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* What is it */}
      {product.longDescription && (
        <section className={`zs-band ${story.signature === "dotgrid" ? "zs-band--dark zs-dotgrid-bg" : "zs-band--plain"}`} aria-labelledby="zs-what">
          <div className={`container zs-what-${P.what} ${story.signature === "dotgrid" ? "zs-what zs-what--center" : "zs-what"}`}>
            <div>
              <p className="zs-kicker">Overview</p>
              <h2 id="zs-what" className="zs-h2">
                What is {product.name}?
              </h2>
            </div>
            <div className="zs-what__body">
              {product.longDescription
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i} className={i === 0 ? "zs-lead" : undefined}>
                    {para.trim()}
                  </p>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits — style per reference */}
      {product.benefits?.length ? (
        <section
          className={`zs-band zs-benefits zs-benefits--${story.benefits} ${["glass", "black"].includes(story.benefits) ? `zs-band--dark ${edge}` : story.benefits === "mint" ? "zs-band--soft" : "zs-band--plain"}`}
          aria-labelledby="zs-benefits"
          data-stage
        >
          <div className="container">
            <p className="zs-kicker zs-center">Why {product.name}</p>
            <h2 id="zs-benefits" className="zs-h2 zs-center">
              Why teams choose {product.name}
            </h2>
            <div className="zs-bgrid">
              {product.benefits.map((b, i) => (
                <article key={b.title} className="zs-benefit">
                  <span className="zs-benefit__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{b.title}</h3>
                  <p>{b.description}</p>
                  {story.benefits === "columns" && hasFeaturesHub && (
                    <Link href={featuresHref} className="zs-benefit__btn">
                      Explore <span aria-hidden>→</span>
                    </Link>
                  )}
                </article>
              ))}
            </div>
            {story.benefits === "columns" && story.signature === "dotgrid" ? null : null}
          </div>
        </section>
      ) : null}

      {/* Feature spotlights — layout per reference */}
      {spotlights.length > 0 && (
        <section
          className={`zs-band zs-spots zs-spots--${story.spot} ${story.spot === "code" ? "zs-band--dark" : "zs-band--plain"}`}
          aria-label="Core features"
        >
          {story.spot === "tabbar" && spotlights.length > 1 && (
            <SpotTabbar items={spotlights.map((f) => ({ id: `spot-${f.slug}`, label: f.name }))} />
          )}
          {story.spot === "accordion" ? (
            <div className="container zs-acc">
              <div className="zs-acc__list">
                <p className="zs-kicker">Capabilities</p>
                <h2 className="zs-h2">What you can do with {product.name}</h2>
                {spotlights.map((f, i) => (
                  <details key={f.slug} className="zs-acc__item" open={i === 0} name={`acc-${product.slug}`}>
                    <summary>
                      <span className="zs-kicker">{groupOf(f.slug)}</span>
                      {f.name}
                    </summary>
                    <p>{f.summary}</p>
                    {featureHasPage(f) && (
                      <Link href={routes.feature(product.slug, f.slug)} className="zs-link">
                        Discover {f.name} <span aria-hidden>→</span>
                      </Link>
                    )}
                  </details>
                ))}
              </div>
              <div className="zs-acc__art" data-reveal="right">
                
                <SpotVisual feature={spotlights[0]} variant={0} />
              </div>
            </div>
          ) : (
            <div className="container zs-spots__list">
              {story.spot === "stack" && (
                <div className="zs-stack__head">
                  <p className="zs-kicker zs-center">Capabilities</p>
                  <h2 className="zs-h2 zs-center">From first question to finished answer</h2>
                </div>
              )}
              {spotlights.map((f, i) => (
                <article
                  key={f.slug}
                  id={`spot-${f.slug}`}
                  className={`zs-spot${i % 2 ? " zs-spot--flip" : ""}`}
                  style={story.spot === "stack" ? ({ "--i": i } as React.CSSProperties) : undefined}
                >
                  <div className="zs-spot__copy" data-reveal={story.spot === "stack" ? undefined : i % 2 ? "right" : "left"}>
                    <p className="zs-kicker">{groupOf(f.slug)}</p>
                    <h2 className="zs-spot__title">{f.name}</h2>
                    <p className="zs-spot__text">{f.summary}</p>
                    {/* One check list per page: on the row whose visual shows a flow (variant 1), or the
                        first row when the visual is a screenshot / code / phone. Other rows' visuals
                        already list the capabilities. */}
                    {f.capabilities?.length &&
                    (story.spot === "code" || story.spot === "phone" || shots[i + 1] ? i === 0 : i % 4 === 1) ? (
                      <ul className="zs-checks">
                        {f.capabilities.slice(0, 4).map((c) => (
                          <li key={c}><Labelled text={c} /></li>
                        ))}
                      </ul>
                    ) : null}
                    {featureHasPage(f) ? (
                      <Link href={routes.feature(product.slug, f.slug)} className="zs-link">
                        Discover {f.name} <span aria-hidden>→</span>
                      </Link>
                    ) : hasFeaturesHub ? (
                      <Link href={featuresHref} className="zs-link">
                        Explore all features <span aria-hidden>→</span>
                      </Link>
                    ) : null}
                  </div>
                  <div
                    className={`zs-spot__art zs-spot__art--${i % 3}`}
                    data-reveal={story.spot === "stack" ? undefined : i % 2 ? "left" : "right"}
                  >
                    {story.spot === "code" ? (
                      <pre className="zs-code" aria-label={`${f.name} steps`}>
                        <span className="zs-code__bar">
                          <i />
                          <i />
                          <i />
                          {product.slug}/{f.slug}
                        </span>
                        {(f.howItWorks ?? f.capabilities ?? [f.summary]).slice(0, 5).map((c, k) => (
                          <code key={c}>
                            <em>{String(k + 1).padStart(2, "0")}</em> {c}
                          </code>
                        ))}
                      </pre>
                    ) : story.spot === "phone" ? (
                      <div className="zs-phone zs-phone--spot">
                        <div className="zs-phone__notch" />
                        <b className="zs-phone__title">{f.name}</b>
                        {(f.capabilities ?? f.howItWorks ?? []).slice(0, 3).map((c) => (
                          <span key={c} className="zs-phone__row">
                            {c}
                          </span>
                        ))}
                      </div>
                    ) : shots[i + 1] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="zs-spot__shot" src={shots[i + 1].src} alt={shots[i + 1].alt} loading="lazy" />
                    ) : (
                      <>
                        
                        {/* A different representation per row; numbered steps stay in "How it works" */}
                        <SpotVisual feature={f} variant={i} />
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Signature section */}
      {signature === "tabs" && (
        <section className={`zs-band zs-band--dark zs-sig-tabs ${edge}`} aria-labelledby="zs-sig">
          <div className="container">
            <p className="zs-kicker zs-center">Inside {product.name}</p>
            <h2 id="zs-sig" className="zs-h2 zs-center">
              One product, {groups.length} connected areas
            </h2>
            <StoryTabs tabs={tabs} />
          </div>
        </section>
      )}
      {signature === "problems" && (
        <section className="zs-band zs-band--black zs-sig-problems" aria-labelledby="zs-sig">
          <div className="container">
            <h2 id="zs-sig" className="zs-h2 zs-center">
              {problemTabs.length} problems {product.name} solves
            </h2>
            <p className="zs-sub zs-center">{product.primaryUseCase ?? product.shortDescription}</p>
            <StoryTabs tabs={problemTabs} />
          </div>
        </section>
      )}
      {(signature === "hub" || signature === "orbit") && (
        <section className={`zs-band ${signature === "orbit" ? "zs-band--soft" : `zs-band--dark ${edge}`}`} aria-labelledby="zs-sig">
          <div className="container">
            <p className="zs-kicker zs-center">{signature === "orbit" ? "Everything in one view" : "Connected by design"}</p>
            <h2 id="zs-sig" className="zs-h2 zs-center">
              {signature === "orbit" ? `Everything around ${product.name}, in one place` : `${product.name} works with the tools around it`}
            </h2>
            {signature === "orbit" ? (
              <div className="zs-orbit" data-stage>
                <span className="zs-orbit__ring zs-orbit__ring--1" aria-hidden="true" />
                <span className="zs-orbit__ring zs-orbit__ring--2" aria-hidden="true" />
                <span className="zs-orbit__ring zs-orbit__ring--3" aria-hidden="true" />
                <div className="zs-orbit__center">
                  <ProductLogo product={product} />
                  <b>{product.name}</b>
                </div>
                {(nodes.length >= 3 ? nodes : groups.map((g) => ({ name: g.group.name, href: `${featuresHref}#${g.group.slug}`, logo: undefined }))).slice(0, 8).map((n, i, all) => {
                  const a = (i / all.length) * Math.PI * 2 - Math.PI / 2;
                  const r = i % 2 ? 46 : 32;
                  return (
                    <Link key={`${n.href}-${i}`} href={n.href} className="zs-orbit__node" style={{ left: `${50 + Math.cos(a) * r}%`, top: `${50 + Math.sin(a) * r}%` }}>
                      {n.name}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="zs-hub" data-stage>
                <svg className="zs-hub__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {nodes.map((_, i, all) => {
                    const a = (i / all.length) * Math.PI * 2 - Math.PI / 2;
                    return <line key={i} className="flow-line" x1="50" y1="50" x2={50 + Math.cos(a) * 40} y2={50 + Math.sin(a) * 40} />;
                  })}
                </svg>
                <div className="zs-hub__center">
                  <ProductLogo product={product} />
                  <b>{product.name}</b>
                </div>
                {nodes.map((n, i, all) => {
                  const a = (i / all.length) * Math.PI * 2 - Math.PI / 2;
                  return (
                    <Link key={n.href} href={n.href} className="zs-hub__node" style={{ left: `${50 + Math.cos(a) * 40}%`, top: `${50 + Math.sin(a) * 40}%` }}>
                      {n.logo ? <ProductLogo product={n.logo} /> : <i className="zs-dot" />}
                      {n.name}
                    </Link>
                  );
                })}
              </div>
            )}
            {signature === "hub" && connections.length > 0 && (
              <ul className="zs-hub__list">
                {connections.map((c) => (
                  <li key={c.product.slug}>
                    <b>{c.product.name}</b> {c.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
      {signature === "dotgrid" && (
        <section className="zs-band zs-band--dark zs-dotgrid-bg" aria-labelledby="zs-sig">
          <div className="container">
            <p className="zs-kicker zs-center">Connected areas</p>
            <h2 id="zs-sig" className="zs-h2 zs-center">
              Built around how your team works
            </h2>
            <div className="zs-dotcards" data-stage>
              {(groups.length >= 2
                ? groups.slice(0, 6).map((g) => ({ title: g.group.name, text: g.group.description ?? g.features.slice(0, 3).map((f) => f.name).join(" · "), href: `${featuresHref}#${g.group.slug}` }))
                : nodes.map((n) => ({ title: n.name, text: "", href: n.href }))
              ).map((c, i) => (
                <Link key={`${c.href}-${i}`} href={c.href} className="zs-dotcard" style={{ "--i": i } as React.CSSProperties}>
                  <span className="zs-dotcard__icon" aria-hidden="true">
                    {c.title.charAt(0)}
                  </span>
                  <b>{c.title}</b>
                  {c.text && <span>{c.text}</span>}
                </Link>
              ))}
              <svg className="zs-dotcards__links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path className="flow-line" d="M16 50 H84" />
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      {product.howItWorks?.length && signature === "timeline" ? (
        <BranchTimeline
          id="zs-how"
          title={`Getting started with`}
          accent={product.name}
          items={product.howItWorks.map((s, i) => ({ title: `${i + 1}. ${s.title}`, text: s.description }))}
        />
      ) : product.howItWorks?.length ? (
        <section className={`zs-band ${signature === "timeline" ? "zs-band--soft" : "zs-band--plain"}`} aria-labelledby="zs-how">
          <div className="container">
            <p className="zs-kicker zs-center">How it works</p>
            <h2 id="zs-how" className="zs-h2 zs-center">
              Getting started with {product.name}
            </h2>
            {signature === "timeline" ? (
              <ol className="zs-timeline" data-stage>
                <span className="zs-timeline__line" data-draw aria-hidden="true" />
                {product.howItWorks.map((s, i) => (
                  <li key={s.title} className={i % 2 ? "is-right" : undefined}>
                    <span className="zs-timeline__node" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="zs-timeline__card">
                      <h3>{s.title}</h3>
                      <p>{s.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className={`zs-steps zs-how-${P.how}`}>
                {product.howItWorks.map((s, i) => (
                  <li key={s.title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      ) : null}

      {/* Everything you need */}
      {(moreHighlights.length > 0 || (hasFeaturesHub && groups.length > 1)) && (
        <section className="zs-band zs-band--tint" aria-labelledby="zs-everything">
          <div className="container">
            <h2 id="zs-everything" className="zs-h2 zs-center">
              Everything you need, in one {product.name}
            </h2>
            {data.features.length > highlights.length && (
              <p className="zs-sub zs-center">
                {data.features.length} capabilities across {groups.length} {groups.length === 1 ? "area" : "areas"}.
              </p>
            )}
            {moreHighlights.length > 0 && (
              /* An index of names and summaries — the benefits above already use a card grid */
              <ul className="zs-index">
                {moreHighlights.map((f) => (
                  <li key={f.slug}>
                    {featureHasPage(f) ? (
                      <Link href={routes.feature(product.slug, f.slug)}>
                        <span className="zs-index__icon" aria-hidden>{f.name.charAt(0)}</span>
                        <strong>{f.name}</strong>
                        <span>{f.summary}</span>
                        <i aria-hidden>→</i>
                      </Link>
                    ) : (
                      <div>
                        <span className="zs-index__icon" aria-hidden>{f.name.charAt(0)}</span>
                        <strong>{f.name}</strong>
                        <span>{f.summary}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {hasFeaturesHub && groups.length > 1 && (
              <ul className="zs-pills">
                {groups.map((g) => (
                  <li key={g.group.slug}>
                    <Link href={`${featuresHref}#${g.group.slug}`}>
                      {g.group.name} <span>{g.features.length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {hasFeaturesHub && (
              <p className="zs-center zs-mt">
                <Link href={featuresHref} className="zs-btn zs-btn--outline">
                  All features
                </Link>
              </p>
            )}
          </div>
        </section>
      )}

      {/* Use cases — brand band (skipped when they already power the problems tabs) */}
      {product.useCases?.length && signature !== "problems" ? (
        <section className={`zs-band ${["zs-band--brand", "zs-band--plain", "zs-band--dark", "zs-band--soft", "zs-band--tint"][P.uses]}`} aria-labelledby="zs-uses">
          <div className="container">
            <p className="zs-kicker">Use cases</p>
            <h2 id="zs-uses" className="zs-h2">
              Where teams use {product.name}
            </h2>
            <div className={`zs-usecases zs-uses-${P.uses}`}>
              {product.useCases.map((u) => (
                <article key={u.title} className="zs-usecase">
                  <h3>{u.title}</h3>
                  <p>{u.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Tour */}
      <section className={`zs-band ${P.tour === 2 ? "zs-band--dark" : P.tour === 1 ? "zs-band--soft" : "zs-band--plain"} zs-tour-${P.tour}`} aria-labelledby="zs-tour">
        <div className="container zs-center">
          <h2 id="zs-tour" className="zs-h2">
            See {product.name} in action
          </h2>
          <p className="zs-mt-sm">
            <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="zs-btn zs-btn--solid">
              Visit {host} <span aria-hidden>↗</span>
            </a>
          </p>
          <figure className={`zs-tour${inActionPhoto(product.slug) ? " zs-tour--photo" : ""}`} data-reveal="scale">
            {inActionPhoto(product.slug) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={inActionPhoto(product.slug)!.src} alt={inActionPhoto(product.slug)!.alt} width={1280} height={720} loading="lazy" />
            ) : tourShot ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={tourShot.src} alt={tourShot.alt} loading="lazy" />
            ) : (
              <ImageSlot src={`/images/products/${product.slug}/tour.webp`} alt={`${product.name} application interface and control dashboard`} width={1100} height={560} />
            )}
          </figure>
          {!inActionPhoto(product.slug) && tourShot && shots.length > 1 && (
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
      </section>

      {/* Where it fits */}
      {linkCols.length > 0 && (
        <section className="zs-band zs-band--tint" aria-labelledby="zs-fits">
          <div className="container">
            <h2 id="zs-fits" className="zs-h2 zs-center">
              Where {product.name} fits
            </h2>
            <div className={`zs-fits zs-fits-${P.fits}`}>
              {linkCols.map((col) => (
                <div key={col.key} className="zs-fits__col">
                  <h3>{col.title}</h3>
                  <ul>
                    {col.items.map((i) => (
                      <li key={i.href}>
                        <Link href={i.href}>
                          {i.name} <span aria-hidden>→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ecosystem (when not already the signature) */}
      {signature !== "hub" && connections.length > 0 && (
        <section className="zs-band zs-band--plain" aria-labelledby="zs-eco">
          <div className="container">
            <h2 id="zs-eco" className="zs-h2 zs-center">
              {product.name} and other ToyoApps products
            </h2>
            {/* A divided list, not a second card grid on the page */}
            <ul className="zs-eco-list">
              {connections.map((c) => (
                <li key={c.product.slug}>
                  <Link href={routes.product(c.product.slug)}>
                    <ProductLogo product={c.product} />
                    <strong>{c.product.name}</strong>
                    <span>{c.description}</span>
                    <i aria-hidden>→</i>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Pricing summary */}
      {product.pricing?.plans.length ? (
        <section className="zs-band zs-band--soft" aria-labelledby="zs-price">
          <div className="container">
            <h2 id="zs-price" className="zs-h2 zs-center">
              {product.name} plans
            </h2>
            {product.pricing.trial && <p className="zs-sub zs-center">{product.pricing.trial}</p>}
            <ul className={`zs-plans zs-plans-${P.plans}`}>
              {product.pricing.plans.map((p) => (
                <li key={p.name} className={p.recommended ? "is-recommended" : undefined}>
                  {p.recommended && <em>Most popular</em>}
                  <span>{p.name}</span>
                  <strong>{p.price}</strong>
                  {p.period && <small>/ {p.period}</small>}
                </li>
              ))}
            </ul>
            <p className="zs-center zs-mt">
              <Link href={routes.productSection(product.slug, "pricing")} className="zs-link">
                Compare plans <span aria-hidden>→</span>
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      {previewMode && (
        <section className="zs-band zs-band--plain">
          <div className="container">
            <Slot show label={`${product.name} customer proof`} hint="Testimonials, case studies and ratings (verified only)" />
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="zs-band zs-band--tint" aria-labelledby="zs-related">
          <div className="container">
            <h2 id="zs-related" className="zs-h2 zs-center">
              Related ToyoApps products
            </h2>
            <div className="pz-related">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} categoryName={getCategory(p.category)?.name} />
              ))}
            </div>
            {category && (
              <p className="zs-center zs-mt">
                <Link href={routes.category(category.slug)} className="zs-link">
                  More in {category.name} <span aria-hidden>→</span>
                </Link>
              </p>
            )}
          </div>
        </section>
      )}

      {/* FAQ */}
      {getProductFaqs(product).length ? (
        <section className={`zs-band ${["starfield", "prompt"].includes(story.hero) ? "zs-band--dark zs-edge-angle" : "zs-band--plain"} zs-faqband`} id="faq" aria-labelledby="zs-faq">
          <div className={`container zs-faq zs-faq-${P.faq}`}>
            <div>
              <p className="zs-kicker">FAQ</p>
              <h2 id="zs-faq" className="zs-h2">
                Frequently asked questions
              </h2>
            </div>
            <FaqList faqs={getProductFaqs(product)} />
          </div>
        </section>
      ) : null}

      {/* Closing CTA — style per reference */}
      <section className={`zs-cta zs-cta--${story.cta} ${story.cta === "panel" ? "" : edge}`} aria-labelledby="zs-cta">
        {story.cta === "landscape" && <span className="zs-cta__land" aria-hidden="true" />}
        <div className={`container zs-center${story.cta === "panel" ? " zs-cta__panel" : ""}`}>
          <h2 id="zs-cta" className="zs-cta__title">
            {story.cta === "spin" ? `Take ${product.name} for a spin` : `Get started with ${product.name}`}
          </h2>
          {product.pricing?.trial && <p className="zs-cta__lead">{product.pricing.trial}</p>}
          <div className="zs-hero__actions zs-hero__actions--center">
            <a href={cta.href} rel="noopener" className="zs-btn zs-btn--solid">
              {cta.label} <span aria-hidden>→</span>
            </a>
            <Link href={routes.products()} className="zs-btn zs-btn--ghost">
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

function dedupe(list: { product: Product; description: string }[]) {
  const seen = new Set<string>();
  return list.filter((c) => (seen.has(c.product.slug) ? false : (seen.add(c.product.slug), true)));
}

/** Up to 8 nodes: ToyoApps products first, then integrations (unique hrefs). */
function hubNodes(connections: { product: Product }[], integrations: { name: string; href: string }[]) {
  const seen = new Set<string>();
  return [
    ...connections.map((c) => ({ name: c.product.name, href: routes.product(c.product.slug), logo: c.product as Product | undefined })),
    ...integrations.map((i) => ({ ...i, logo: undefined as Product | undefined })),
  ]
    .filter((n) => (seen.has(n.href) ? false : (seen.add(n.href), true)))
    .slice(0, 8);
}
