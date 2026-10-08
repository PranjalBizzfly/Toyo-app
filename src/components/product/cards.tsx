import Link from "next/link";
import type { Category, Feature, PricingPlan, Product } from "@/content/types";
import { featureHasPage } from "@/lib/rules";
import { routes } from "@/lib/routes";
import { monogram, productAccent, tintStyle } from "@/lib/tint";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink, CheckList, StatusBadge } from "@/components/ui/primitives";

export function ProductLogo({ product }: { product: Product }) {
  if (product.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="product-card__logo" src={product.logo.src} alt="" style={{ background: "transparent" }} />;
  }
  return (
    <span className="product-card__logo" style={{ background: productAccent(product) }} aria-hidden>
      {monogram(product.name)}
    </span>
  );
}

/** `categoryName` is passed in (not looked up) so the card also renders inside client components. */
export function ProductCard({ product, categoryName }: { product: Product; categoryName?: string }) {
  const caps = (product.features ?? []).filter((f) => f.highlight).slice(0, 3);
  return (
    <Link href={routes.product(product.slug)} className="card product-card">
      <div className="product-card__head">
        <ProductLogo product={product} />
        <div>
          <h3 className="card__title">{product.name}</h3>
          {categoryName && <p className="product-card__cat">{categoryName}</p>}
        </div>
      </div>
      <p className="text-muted">{product.shortDescription}</p>
      {product.primaryUseCase && (
        <p className="product-card__usecase">
          <strong>Best for:</strong> {product.primaryUseCase}
        </p>
      )}
      {caps.length > 0 && (
        <ul className="product-card__caps" aria-label="Key capabilities">
          {caps.map((f) => (
            <li key={f.slug} className="badge">
              {f.name}
            </li>
          ))}
        </ul>
      )}
      <div className="card__foot">
        <span>Explore {product.name}</span>
        <span className="card__meta">
          <StatusBadge status={product.status} pending={product.verification?.relationship === "pending" || product.verification?.publicSale === "pending"} />
          <Icon name="arrow-right" />
        </span>
      </div>
    </Link>
  );
}

export function CategoryCard({ category, products }: { category: Category; products: Product[] }) {
  const names = products.slice(0, 4).map((p) => p.name);
  return (
    <Link href={routes.category(category.slug)} className="card category-card" style={tintStyle(category.slug)}>
      <span className="icon-tile">
        <Icon name={category.icon} />
      </span>
      <div>
        <h3 className="card__title">{category.name}</h3>
        <p className="text-muted">{category.tagline}</p>
      </div>
      {names.length > 0 && (
        <p className="category-card__list">
          {names.join(" · ")}
          {products.length > names.length && ` · +${products.length - names.length} more`}
        </p>
      )}
      <div className="card__foot">
        <span>
          {products.length} {products.length === 1 ? "product" : "products"}
        </span>
        <Icon name="arrow-right" />
      </div>
    </Link>
  );
}

export function FeatureCard({ feature, productSlug }: { feature: Feature; productSlug: string }) {
  const inner = (
    <>
      <h3 className="feature-card__name">{feature.name}</h3>
      <p className="text-muted">{feature.summary}</p>
    </>
  );
  return featureHasPage(feature) ? (
    <Link href={routes.feature(productSlug, feature.slug)} className="card feature-card">
      {inner}
      <span className="card__foot">
        Learn more <Icon name="arrow-right" />
      </span>
    </Link>
  ) : (
    <article className="card feature-card">{inner}</article>
  );
}

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article className={`card pricing-card${plan.recommended ? " pricing-card--recommended" : ""}`}>
      <div className="card__meta">
        <h3 className="card__title">{plan.name}</h3>
        {plan.recommended && <span className="badge badge--brand pricing-card__tag">Most popular</span>}
      </div>
      <p className="pricing-card__price">
        {plan.price} {plan.period && <small>/ {plan.period}</small>}
      </p>
      {plan.description && <p className="text-muted">{plan.description}</p>}
      <CheckList items={plan.features} />
      <div style={{ marginTop: "auto" }}>
        <ButtonLink href={plan.cta.href} variant={plan.recommended ? "primary" : "secondary"}>
          {plan.cta.label}
        </ButtonLink>
      </div>
    </article>
  );
}
