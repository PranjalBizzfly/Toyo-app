import type { Feature, Product } from "@/content/types";
import { getCategory, getFeatures } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { FeatureCard } from "@/components/product/cards";
import { CheckList, CtaBand, FaqList, PageHero, ScreenshotFrame, Section, SectionHeader } from "@/components/ui/primitives";

/** FeaturePageTemplate — detail page for a single product feature. */
export function FeaturePageTemplate({ product, feature }: { product: Product; feature: Feature }) {
  const category = getCategory(product.category);
  const group = product.featureCategories?.find((c) => c.slug === feature.category);
  const siblings = getFeatures(product)
    .filter((f) => f.slug !== feature.slug && (!feature.category || f.category === feature.category))
    .slice(0, 3);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Products", href: routes.products() },
          ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
          { name: product.name, href: routes.product(product.slug) },
          { name: "Features", href: routes.productSection(product.slug, "features") },
          { name: feature.name, href: routes.feature(product.slug, feature.slug) },
        ]}
        eyebrow={group ? `${product.name} · ${group.name}` : product.name}
        title={feature.name}
        lead={feature.summary}
      />
      <Section>
        <div className="split" style={{ alignItems: "start" }}>
          <div className="prose stack">
            {feature.body?.map((p, i) => <p key={i}>{p}</p>)}
            {feature.benefits?.length ? <CheckList items={feature.benefits} /> : null}
          </div>
          {feature.media?.[0] && <ScreenshotFrame media={feature.media[0]} />}
        </div>
      </Section>
      {feature.faqs?.length ? (
        <Section tone="surface">
          <SectionHeader title={`${feature.name} FAQs`} />
          <FaqList faqs={feature.faqs} />
        </Section>
      ) : null}
      {siblings.length > 0 && (
        <Section>
          <SectionHeader title={`More ${product.name} features`} />
          <div className="grid" style={{ ["--min" as string]: "260px" }}>
            {siblings.map((f) => (
              <FeatureCard key={f.slug} feature={f} productSlug={product.slug} />
            ))}
          </div>
        </Section>
      )}
      <CtaBand
        title={`Try ${feature.name} in ${product.name}`}
        primary={product.primaryCta ?? { label: "Contact sales", href: routes.contact() }}
        secondary={{ label: `About ${product.name}`, href: routes.product(product.slug) }}
      />
    </>
  );
}
