import Link from "next/link";
import { notFound } from "next/navigation";
import { FeatureCard } from "@/components/product/cards";
import { CtaBand, PageHero, Section } from "@/components/ui/primitives";
import { getCategory, getFeatureGroupsWithPages, getProduct, getProducts, isIndexable } from "@/lib/catalog";
import { getProductCtas } from "@/lib/product-cta";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Feature-group hub (Zoho study §6.3). Generated only for groups that have
 * written intro content and at least three features — never as a duplicate
 * of the features hub.
 */

type Props = { params: Promise<{ product: string; group: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().flatMap((p) => getFeatureGroupsWithPages(p).map((g) => ({ product: p.slug, group: g.group.slug })));
}

async function load(params: Props["params"]) {
  const { product: ps, group: gs } = await params;
  const product = getProduct(ps);
  if (!product) return null;
  const groups = getFeatureGroupsWithPages(product);
  const index = groups.findIndex((g) => g.group.slug === gs);
  return index === -1 ? null : { product, groups, index };
}

export async function generateMetadata({ params }: Props) {
  const r = await load(params);
  if (!r) return {};
  const { group } = r.groups[r.index];
  return buildMetadata({
    title: `${group.name} — ${r.product.name}`,
    description: group.description ?? group.body![0],
    path: routes.featureGroup(r.product.slug, group.slug),
    status: isIndexable(r.product.status) ? "live" : r.product.status,
  });
}

export default async function FeatureGroupPage({ params }: Props) {
  const r = await load(params);
  if (!r) notFound();
  const { product, groups, index } = r;
  const { group, features } = groups[index];
  const prev = groups[index - 1];
  const next = groups[index + 1];
  const category = getCategory(product.category);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Products", href: routes.products() },
          ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
          { name: product.name, href: routes.product(product.slug) },
          { name: "Features", href: routes.productSection(product.slug, "features") },
          { name: group.name, href: routes.featureGroup(product.slug, group.slug) },
        ]}
        eyebrow={`${product.name} features`}
        title={group.name}
        lead={group.description}
      />
      <Section tight>
        <div className="prose stack">
          {group.body!.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>
      <Section tone="surface">
        <div className="grid" style={{ ["--min" as string]: "260px" }}>
          {features.map((f) => (
            <FeatureCard key={f.slug} feature={f} productSlug={product.slug} />
          ))}
        </div>
        {(prev || next) && (
          <nav aria-label="Feature groups" className="btn-row" style={{ marginTop: 32, justifyContent: "space-between" }}>
            {prev ? <Link href={routes.featureGroup(product.slug, prev.group.slug)}>← {prev.group.name}</Link> : <span />}
            {next && <Link href={routes.featureGroup(product.slug, next.group.slug)}>{next.group.name} →</Link>}
          </nav>
        )}
      </Section>
      <CtaBand title={`Try ${product.name}`} primary={getProductCtas(product).primary} />
    </>
  );
}
