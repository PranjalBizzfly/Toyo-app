import { useId } from "react";
import Link from "next/link";
import type { Feature, Product } from "@/content/types";
import type { ProductStory } from "@/lib/product-story";
import { getCategory } from "@/lib/catalog";
import { platformLabels } from "@/lib/product-cta";
import { routes } from "@/lib/routes";
import { ProductLogo } from "@/components/product/cards";
import { HeroArt } from "@/components/product/HeroArt";
import { DashboardMock, PhoneMock } from "@/components/product/DashboardMock";
import { Breadcrumbs, StatusBadge } from "@/components/ui/primitives";

interface Props {
  product: Product;
  story: ProductStory;
  highlights: Feature[];
  integrations: { name: string; href: string }[];
  cta: { label: string; href: string };
}

const DARK = new Set(["glass", "starfield", "touch", "agent", "lime", "radial"]);

/**
 * Product hero — one composition per product (see product-story.ts). All share
 * the same copy block; what changes is how copy and artwork are staged.
 */
export function ProductHero({ product, story, highlights, integrations, cta }: Props) {
  const category = getCategory(product.category);
  const host = new URL(product.websiteUrl).hostname.replace(/^www\./, "");
  const dark = DARK.has(story.hero);
  const center = ["glass", "starfield", "landscape", "radial", "marquee", "frame", "prompt"].includes(story.hero);
  // Large realistic product shots for showcase heroes; illustrated scenes for the rest.
  const shot = <DashboardMock product={product} />;
  const phone = (
    <div className="zs-phonestage">
      <PhoneMock product={product} />
    </div>
  );
  const art = ["glass", "radial", "frame", "agent"].includes(story.hero)
    ? shot
    : ["touch", "lime"].includes(story.hero)
      ? phone
      : <HeroArt product={product} art={story.art} />;

  const copy = (opts: { meet?: boolean } = {}) => (
    <div className="zs-hero__copy">
      <Breadcrumbs
        items={[
          { name: "Products", href: routes.products() },
          ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
          { name: product.name, href: routes.product(product.slug) },
        ]}
      />
      <p className="zs-hero__name">
        <ProductLogo product={product} />
        {story.hero === "starfield" ? <span className="zs-outline">{product.name}</span> : product.name}
        <StatusBadge
          status={product.status}
          pending={product.verification?.relationship === "pending" || product.verification?.publicSale === "pending"}
        />
      </p>
      <h1 className="zs-hero__title">
        {opts.meet && <span className="zs-hero__meet">Meet {product.name}</span>}
        {product.tagline ?? product.primaryUseCase ?? product.name}
      </h1>
      <p className="zs-hero__lead">{product.shortDescription}</p>
      <div className="zs-hero__actions">
        <a href={cta.href} rel="noopener" className="zs-btn zs-btn--solid">
          {cta.label} <span aria-hidden>→</span>
        </a>
        {product.pricing ? (
          <Link href={routes.productSection(product.slug, "pricing")} className="zs-btn zs-btn--ghost">
            Pricing
          </Link>
        ) : (
          <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="zs-btn zs-btn--ghost">
            Visit {host} <span aria-hidden>↗</span>
          </a>
        )}
      </div>
      <ul className="zs-hero__chips" aria-label="Product details">
        {product.pricing?.trial && <li className="zs-hero__trial">{product.pricing.trial}</li>}
        {category && (
          <li>
            <Link href={routes.category(category.slug)}>{category.name}</Link>
          </li>
        )}
        {(product.platforms ?? []).map((p) => (
          <li key={p}>{platformLabels[p] ?? p}</li>
        ))}
        {product.market && <li>{product.market}</li>}
        <li>
          <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer">
            Continues on {host} <span aria-hidden>↗</span>
          </a>
        </li>
      </ul>
    </div>
  );

  const cls = `zs-hero zs-hero--${story.hero}${dark ? " zs-hero--dark" : ""}${center ? " zs-hero--centered" : ""}`;

  switch (story.hero) {
    /* Zoho Zia Chat — glass frame floating in a perspective-grid room. */
    case "glass":
      return (
        <header className={cls} data-no-reveal>
          <div className="zs-room" aria-hidden="true" />
          <div className="container">
            <div className="zs-glassframe">
              {copy()}
              <div className="zs-hero__visual">{art}</div>
            </div>
          </div>
        </header>
      );
    /* Zoho CPaaS — starfield, outlined name, row of channel-style mini UIs. */
    case "starfield":
      return (
        <header className={cls} data-no-reveal>
          <div className="container zs-hero__stack">
            {copy()}
            <ul className="zs-hero__visual zs-channels" aria-label={`${product.name} highlights`}>
              {highlights.slice(0, 4).map((f, i) => (
                <li key={f.slug} className={`zs-channel zs-channel--${i}`}>
                  <span className="zs-channel__kicker">{f.name}</span>
                  <span className="zs-channel__mock" aria-hidden="true">
                    <MiniMock i={i} label={(f.capabilities ?? [])[0] ?? f.name} />
                  </span>
                  <b>{f.name}</b>
                  <span>{f.summary}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>
      );
    /* Zoho TouchPoint — dark split with a phone, then a capability strip. */
    case "touch":
      return (
        <header className={cls} data-no-reveal>
          <div className="container zs-hero__grid zs-hero__grid--split">
            {copy()}
            <div className="zs-hero__visual">{art}</div>
          </div>
          <div className="container">
            <ul className="zs-strip" aria-label={`${product.name} capabilities`}>
              {highlights.slice(0, 4).map((f) => (
                <li key={f.slug}>
                  <b>{f.name}</b>
                  <span>{f.summary}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>
      );
    /* Zoho Classes — full-bleed illustrated landscape behind a centred headline. */
    case "landscape":
      return (
        <header className={cls} data-no-reveal>
          <Landscape />
          <div className="container zs-hero__stack">
            {copy()}
            <div className="zs-hero__visual zs-hero__visual--float">{shot}</div>
          </div>
        </header>
      );
    /* Zoho Zia Agents — lit frame with a large "Meet …" introduction. */
    case "agent":
      return (
        <header className={cls} data-no-reveal>
          <div className="container">
            <div className="zs-litframe">
              {copy({ meet: true })}
              <div className="zs-hero__visual">{art}</div>
            </div>
          </div>
        </header>
      );
    /* Zoho Creator Plus — radial glow, centred, then "works with" row. */
    case "radial":
      return (
        <header className={cls} data-no-reveal>
          <div className="container zs-hero__stack">
            {copy()}
            {integrations.length > 0 ? (
              <div className="zs-hero__visual zs-works">
                <p>Works with</p>
                <ul>
                  {integrations.slice(0, 8).map((i) => (
                    <li key={i.href}>
                      <Link href={i.href}>{i.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="zs-hero__visual">{art}</div>
            )}
          </div>
        </header>
      );
    /* Zoho Projects Plus — centred, then a pill marquee of capabilities. */
    case "marquee":
      return (
        <header className={cls} data-no-reveal>
          <div className="container zs-hero__stack">{copy()}</div>
          <div className="container zs-hero__shot">{shot}</div>
          <div className="zs-hero__visual zs-pillband" aria-label={`${product.name} capabilities`}>
            <ul className="zs-pillband__track">
              {[...highlights, ...highlights].map((f, i) => (
                <li key={`${f.slug}-${i}`} aria-hidden={i >= highlights.length ? "true" : undefined}>
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        </header>
      );
    /* Zoho Flow — white split, then a dark rounded statement panel. */
    case "flow":
      return (
        <header className={cls} data-no-reveal>
          <div className="container zs-hero__grid zs-hero__grid--split">
            {copy()}
            <div className="zs-hero__visual">{art}</div>
          </div>
          <div className="container">
            <div className="zs-screen" data-reveal="scale">
              <span className="zs-screen__spark zs-screen__spark--1" aria-hidden="true" />
              <span className="zs-screen__spark zs-screen__spark--2" aria-hidden="true" />
              <p className="zs-screen__kicker">{product.name}</p>
              <p className="zs-screen__line">{product.primaryUseCase ?? product.shortDescription}</p>
            </div>
          </div>
        </header>
      );
    /* Zoho CommandCenter — grid, centred, gradient frame with journey nodes. */
    case "frame":
      return (
        <header className={cls} data-no-reveal>
          <div className="container zs-hero__stack">
            {copy()}
            <div className="zs-hero__visual zs-gframe">
              {art}
              {highlights.slice(0, 4).map((f, i) => (
                <span key={f.slug} className={`zs-gframe__node zs-gframe__node--${i}`} aria-hidden="true">
                  {f.name}
                </span>
              ))}
            </div>
          </div>
        </header>
      );
    /* Zoho Creator — centred blue headline over a large prompt box. */
    case "prompt":
      return (
        <header className={cls} data-no-reveal>
          <div className="container zs-hero__stack">
            {copy()}
            <div className="zs-hero__visual zs-prompt" aria-hidden="true">
              <p className="zs-prompt__text">
                Ask {product.name}: {(product.primaryUseCase ?? product.shortDescription).replace(/\.$/, "")}…
              </p>
              <div className="zs-prompt__row">
                {highlights.slice(0, 3).map((f) => (
                  <span key={f.slug}>{f.name}</span>
                ))}
                <i className="zs-prompt__send">↑</i>
              </div>
            </div>
            <div className="zs-hero__shot">{shot}</div>
          </div>
        </header>
      );
    /* Split compositions: voice (shapes), paper (horizon), path (route),
       serif (glow), lime, pastel. Differences live in CSS + decorations. */
    default:
      return (
        <header className={cls} data-no-reveal>
          {story.hero === "paper" && <Horizon />}
          {story.hero === "path" && <FlightPath />}
          <div className="container zs-hero__grid zs-hero__grid--split">
            {copy()}
            <div className="zs-hero__visual">
              {story.hero === "voice" && (
                <span className="zs-shapes" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              )}
              {story.hero === "serif" && <span className="zs-blob" aria-hidden="true" />}
              {art}
            </div>
          </div>
        </header>
      );
  }
}

/** Tiny channel-style mock for starfield tiles (purely decorative). */
function MiniMock({ i, label }: { i: number; label: string }) {
  const short = label.length > 28 ? `${label.slice(0, 26)}…` : label;
  switch (i % 4) {
    case 0:
      return (
        <span className="zs-mm zs-mm--card">
          <i />
          <b>{short}</b>
        </span>
      );
    case 1:
      return (
        <span className="zs-mm zs-mm--digits">
          {"482190".split("").map((d, k) => (
            <i key={k}>{d}</i>
          ))}
        </span>
      );
    case 2:
      return (
        <span className="zs-mm zs-mm--bubble">
          <b>{short}</b>
          <i>✓</i>
        </span>
      );
    default:
      return (
        <span className="zs-mm zs-mm--wave">
          {Array.from({ length: 14 }, (_, k) => (
            <i key={k} style={{ height: `${20 + ((k * 37) % 70)}%` }} />
          ))}
        </span>
      );
  }
}

/** Original illustrated landscape: sky, sun, three hill layers, meadow dots. */
export function Landscape() {
  const gid = `ls-sky-${useId().replace(/:/g, "")}`;
  return (
    <svg className="zs-landscape" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ls-sky-1)" />
          <stop offset="1" stopColor="var(--ls-sky-2)" />
        </linearGradient>
      </defs>
      <rect width="1440" height="600" fill={`url(#${gid})`} />
      <circle cx="1130" cy="150" r="70" fill="var(--ls-sun)" />
      <path d="M0 360 C 220 300, 380 330, 560 300 S 900 250, 1100 300 1360 280, 1440 300 V600 H0Z" fill="var(--ls-hill-1)" />
      <path d="M0 430 C 180 390, 420 420, 640 380 S 1020 360, 1220 400 1400 390, 1440 400 V600 H0Z" fill="var(--ls-hill-2)" />
      <path d="M0 500 C 260 460, 520 500, 760 470 S 1180 450, 1440 480 V600 H0Z" fill="var(--ls-hill-3)" />
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={(i * 97) % 1440} cy={520 + ((i * 53) % 70)} r={3 + (i % 3)} fill={i % 3 === 0 ? "var(--ls-f1)" : i % 3 === 1 ? "var(--ls-f2)" : "var(--ls-f3)"} />
      ))}
    </svg>
  );
}

/** Muted horizon for the paper hero. */
function Horizon() {
  return (
    <svg className="zs-horizon" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 140 C 240 100, 480 130, 720 110 S 1200 80, 1440 120 V220 H0Z" fill="var(--hz-1)" />
      <path d="M0 175 C 300 150, 600 180, 900 160 S 1260 150, 1440 165 V220 H0Z" fill="var(--hz-2)" />
    </svg>
  );
}

/** Dashed route with waypoint markers for the path hero. */
function FlightPath() {
  return (
    <svg className="zs-flightpath" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
      <path className="flow-line" d="M-20 520 C 300 560, 520 380, 760 420 S 1140 300, 1460 120" />
      <circle cx="760" cy="420" r="7" />
      <circle cx="1180" cy="270" r="7" />
    </svg>
  );
}
