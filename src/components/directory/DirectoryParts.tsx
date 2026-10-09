import Link from "next/link";
import type { Industry, Product } from "@/content/types";
import { ProductLogo } from "@/components/product/cards";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs, type Crumb } from "@/components/ui/primitives";
import { productsFor } from "@/lib/catalog";
import { initialOf, type IndustryEntry, type IntegrationEntry } from "@/lib/directory";
import { routes } from "@/lib/routes";
import "@/app/directory.css";

/* Shared building blocks for the Industries and Integrations hubs and detail pages. */

export function DirHero({
  crumbs,
  eyebrow,
  title,
  lead,
  stats,
  tone,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  stats?: { value: number | string; label: string }[];
  tone: "industry" | "integration";
  children?: React.ReactNode;
}) {
  return (
    <header className={`dx-hero dx-hero--${tone}`}>
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <div className="dx-hero__grid">
          <div className="dx-hero__copy">
            <p className="dx-kicker">{eyebrow}</p>
            <h1 className="dx-hero__title">{title}</h1>
            <p className="dx-hero__lead">{lead}</p>
            {children}
          </div>
          {stats?.length ? (
            <dl className="dx-stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export function SectionHead({ id, kicker, title, lead, count, center }: { id?: string; kicker?: string; title: string; lead?: string; count?: number; center?: boolean }) {
  return (
    <div className={`dx-head${center ? " dx-head--center" : ""}`}>
      {kicker && <p className="dx-kicker">{kicker}</p>}
      <h2 id={id} className="dx-head__title">
        {title}
        {count != null && <span className="dx-head__count">{count}</span>}
      </h2>
      {lead && <p className="dx-head__lead">{lead}</p>}
    </div>
  );
}

export function ProductChip({ product, href }: { product: Product; href?: string }) {
  return (
    <Link href={href ?? routes.product(product.slug)} className="dx-pchip">
      <ProductLogo product={product} />
      <span>{product.name}</span>
    </Link>
  );
}

/** Cross-product industry guide: icon, products, challenges, explore link. */
export function GuideCard({ industry }: { industry: Industry }) {
  const products = productsFor(industry.products);
  return (
    <article className="dx-guide">
      <span className="dx-guide__icon" aria-hidden>
        <Icon name={industry.icon ?? "layers"} />
      </span>
      <h3 className="dx-guide__title">
        <Link href={routes.industry(industry.slug)} className="dx-stretch">
          {industry.name}
        </Link>
      </h3>
      <p className="dx-guide__text">{industry.summary}</p>
      {industry.challenges?.length ? (
        <ul className="dx-guide__points" aria-label="Challenges addressed">
          {industry.challenges.slice(0, 3).map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ) : null}
      <div className="dx-guide__foot">
        <span className="dx-logos" aria-label={`Products: ${products.map((p) => p.name).join(", ")}`}>
          {products.map((p) => (
            <span key={p.slug} className="dx-logos__item" title={p.name}>
              <ProductLogo product={p} />
              {p.name}
            </span>
          ))}
        </span>
        <span className="dx-more" aria-hidden>
          Explore <Icon name="arrow-right" />
        </span>
      </div>
    </article>
  );
}

/** A product-documented industry (links to that product's industry page). */
export function IndustryCard({ entry }: { entry: IndustryEntry }) {
  return (
    <li className="dx-icard" data-name={entry.name} data-cat={entry.sector} data-products={entry.product.slug} data-text={entry.summary}>
      <h3 className="dx-icard__title">
        <Link href={entry.href} className="dx-stretch">
          {entry.name}
        </Link>
      </h3>
      <p className="dx-icard__text">{entry.summary}</p>
      <div className="dx-icard__foot">
        <span className="dx-icard__by">
          <ProductLogo product={entry.product} />
          {entry.product.name}
        </span>
        <span className="dx-more" aria-hidden>
          Explore <Icon name="arrow-right" />
        </span>
      </div>
    </li>
  );
}

export function IntegrationCard({ entry, compact }: { entry: IntegrationEntry; compact?: boolean }) {
  const productSlugs = entry.links.map((l) => l.product.slug).join(" ");
  const aliases = [...new Set(entry.links.flatMap((l) => l.aliases))];
  return (
    <li
      className={`dx-card${compact ? " dx-card--compact" : ""}`}
      data-name={entry.name}
      data-cat={entry.category}
      data-products={productSlugs}
      data-text={`${entry.summary} ${entry.vendor ?? ""} ${aliases.join(" ")}`}
    >
      <div className="dx-card__top">
        <span className="dx-mono" aria-hidden>
          {initialOf(entry.name)}
        </span>
        <div className="dx-card__id">
          <h3 className="dx-card__name">
            <Link href={entry.href} className="dx-stretch">
              {entry.name}
            </Link>
          </h3>
          <p className="dx-card__meta">
            {compact ? [entry.vendor, entry.category].filter(Boolean).join(" · ") : entry.vendor ?? `Documented by ${entry.links.map((l) => l.product.name).join(", ")}`}
          </p>
        </div>
        {entry.hasPage && <span className="dx-badge">Guide</span>}
      </div>
      {!compact && <p className="dx-card__text">{entry.summary}</p>}
      {!compact && aliases.length > 0 && <p className="dx-card__aliases">Includes {aliases.join(", ")}</p>}
      <div className="dx-card__foot">
        <ul className="dx-card__works" aria-label={`Works with ${entry.links.map((l) => l.product.name).join(", ")}`}>
          {entry.links.map((l) => (
            <li key={l.product.slug}>
              <Link href={l.href} className="dx-pchip dx-pchip--sm">
                <ProductLogo product={l.product} />
                <span>{l.product.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <span className="dx-more" aria-hidden>
          {entry.cta} <Icon name="arrow-right" />
        </span>
      </div>
    </li>
  );
}
