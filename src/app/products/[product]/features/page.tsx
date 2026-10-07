import Link from "next/link";
import { notFound } from "next/navigation";
import { FeatureCard } from "@/components/product/cards";
import { PageHero, Section } from "@/components/ui/primitives";
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

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Products", href: routes.products() },
          ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
          { name: product.name, href: routes.product(product.slug) },
          { name: "Features", href: routes.productSection(product.slug, "features") },
        ]}
        eyebrow={`${product.name} features`}
        title={`Everything ${product.name} can do`}
        lead={`${total} ${total === 1 ? "feature" : "features"}${groups.length > 1 ? ` across ${groups.length} areas` : ""}.`}
      >
        {groups.length > 1 && (
          <nav aria-label="Feature areas" className="chips">
            {groups.map((g) => (
              <a key={g.group.slug} href={`#${g.group.slug}`} className="chip">
                {g.group.name} <span>{g.features.length}</span>
              </a>
            ))}
          </nav>
        )}
      </PageHero>
      {groups.map((g, i) => (
        <Section key={g.group.slug} id={g.group.slug} tight tone={i % 2 ? "surface" : undefined}>
          <div className="section-header">
            <div className="section-header__text">
              <h2 className="h3">
                {hubs.has(g.group.slug) ? <Link href={routes.featureGroup(product.slug, g.group.slug)}>{g.group.name} →</Link> : g.group.name}
              </h2>
              {g.group.description && <p className="text-muted">{g.group.description}</p>}
            </div>
          </div>
          <div className="grid" style={{ ["--min" as string]: "260px" }}>
            {g.features.map((f) => (
              <FeatureCard key={f.slug} feature={f} productSlug={product.slug} />
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
