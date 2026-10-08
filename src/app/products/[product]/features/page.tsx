import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand } from "@/components/ui/primitives";
import { getProductCtas } from "@/lib/product-cta";
import { featureHasPage } from "@/lib/rules";
import { getCategory, getFeatureGroupsWithPages, getProduct, groupFeatures } from "@/lib/catalog";
import { getAvailableSections } from "@/lib/product-sections";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/** Features hub — scales from a handful to 100+ features via grouped sections + jump links. */

type Props = { params: Promise<{ product: string }> };

export async function generateMetadata({ params }: Props) {
  const product = getProduct((await params).product);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} features`,
    description: `Every ${product.name} feature, grouped by area. ${product.shortDescription}`,
    path: routes.productSection(product.slug, "features"),
    status: product.status,
  });
}

export default async function FeaturesPage({ params }: Props) {
  const product = getProduct((await params).product);
  if (!product) notFound();
  const groups = groupFeatures(product);
  const hubs = new Set(getFeatureGroupsWithPages(product).map((g) => g.group.slug));
  if (!getAvailableSections(product).includes("features")) notFound();
  const total = groups.reduce((n, g) => n + g.features.length, 0);
  const category = getCategory(product.category);

  const names = groups.flatMap((g) => g.features.map((f) => f.name));
  const left = names.filter((_, i) => i % 2 === 0).slice(0, 8);
  const right = names.filter((_, i) => i % 2 === 1).slice(0, 8);
  const cta = getProductCtas(product).primary;

  return (
    <>
      <header className="zf-hero">
        <ul className="zf-hero__pills zf-hero__pills--left" aria-hidden>
          {left.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <ul className="zf-hero__pills zf-hero__pills--right" aria-hidden>
          {right.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <div className="container zf-hero__copy">
          <Breadcrumbs
            items={[
              { name: "Products", href: routes.products() },
              ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
              { name: product.name, href: routes.product(product.slug) },
              { name: "Features", href: routes.productSection(product.slug, "features") },
            ]}
          />
          <h1>
            Features that power
            <strong>{product.name}</strong>
          </h1>
          <p>
            {total} {total === 1 ? "feature" : "features"}
            {groups.length > 1 ? ` across ${groups.length} areas` : ""}, as described by {product.name}.
          </p>
          <a href={cta.href} rel="noopener" className="zp-start__primary zf-hero__cta">
            {cta.label}
          </a>
        </div>
      </header>
      {groups.map((g) => (
        <section key={g.group.slug} id={g.group.slug} className="zf-row">
          <div className="container zf-row__grid">
            <div className="zf-row__head">
              <p className="zf-row__label">
                {g.features.length} {g.features.length === 1 ? "feature" : "features"}
              </p>
              <h2>
                {hubs.has(g.group.slug) ? <Link href={routes.featureGroup(product.slug, g.group.slug)}>{g.group.name}</Link> : g.group.name}
              </h2>
              {g.group.description && <p>{g.group.description}</p>}
            </div>
            <ul className="zf-row__list">
              {g.features.map((f) => (
                <li key={f.slug}>
                  <h3>{featureHasPage(f) ? <Link href={routes.feature(product.slug, f.slug)}>{f.name}</Link> : f.name}</h3>
                  {f.summary && <p>{f.summary}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <CtaBand
        title={`Try ${product.name}`}
        lead={product.pricing?.trial}
        primary={cta}
        secondary={product.pricing ? { label: "See pricing", href: routes.productSection(product.slug, "pricing") } : undefined}
      />
    </>
  );
}
