import Link from "next/link";
import { notFound } from "next/navigation";
import { PricingCard } from "@/components/product/cards";
import { ButtonLink, CtaBand, FaqList, PageHero, Section } from "@/components/ui/primitives";
import { getCategory, getProduct, getProducts, integrationHasPage } from "@/lib/catalog";
import { getProductCtas } from "@/lib/product-cta";
import { getAvailableSections, getProductSectionData } from "@/lib/product-sections";
import { routes, sectionLabels, type ProductSection } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Product sub-pages: solutions, industries, integrations, pricing, compare,
 * resources, support. A route is generated only when the product has content
 * for that section (features and overview have their own routes).
 */

type Props = { params: Promise<{ product: string; section: string }> };
type SubSection = Exclude<ProductSection, "overview" | "features">;

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().flatMap((p) =>
    getAvailableSections(p)
      .filter((s): s is SubSection => s !== "overview" && s !== "features")
      .map((section) => ({ product: p.slug, section })),
  );
}

const copy: Record<SubSection, (name: string) => { title: string; description: string }> = {
  solutions: (n) => ({ title: `${n} use cases`, description: `Business problems ${n} helps solve.` }),
  industries: (n) => ({ title: `${n} by industry`, description: `How ${n} fits different industries.` }),
  integrations: (n) => ({ title: `${n} integrations`, description: `Tools and services that work with ${n}.` }),
  pricing: (n) => ({ title: `${n} pricing`, description: `Plans and pricing for ${n}.` }),
  compare: (n) => ({ title: `Compare ${n}`, description: `How ${n} compares with alternatives.` }),
  resources: (n) => ({ title: `${n} resources`, description: `Guides, tutorials and articles about ${n}.` }),
  support: (n) => ({ title: `${n} support`, description: `Help, documentation and answers for ${n}.` }),
};

async function load(params: Props["params"]) {
  const { product: slug, section } = await params;
  const product = getProduct(slug);
  if (!product || !getAvailableSections(product).includes(section as ProductSection)) return null;
  return { product, section: section as SubSection };
}

export async function generateMetadata({ params }: Props) {
  const r = await load(params);
  if (!r) return {};
  const c = copy[r.section](r.product.name);
  return buildMetadata({
    title: c.title,
    description: `${c.description} ${r.product.shortDescription}`,
    path: routes.productSection(r.product.slug, r.section),
    status: r.product.status,
  });
}

export default async function ProductSectionPage({ params }: Props) {
  const r = await load(params);
  if (!r) notFound();
  const { product, section } = r;
  const data = getProductSectionData(product);
  const category = getCategory(product.category);
  const c = copy[section](product.name);

  const links: { name: string; summary: string; href: string }[] =
    section === "solutions"
      ? data.solutions.map((s) => ({ name: s.name, summary: s.summary, href: routes.solution(s.slug) }))
      : section === "industries"
        ? data.industries.map((s) => ({ name: s.name, summary: s.summary, href: routes.industry(s.slug) }))
        : section === "integrations"
          ? data.integrations.map((s) => ({ name: s.name, summary: s.summary, href: integrationHasPage(s) ? routes.integration(s.slug) : `${routes.integrations()}#${s.slug}` }))
          : section === "compare"
            ? data.compare.map((s) => ({ name: s.name, summary: s.summary, href: routes.comparison(s.slug) }))
            : section === "resources"
              ? data.resources.map((s) => ({ name: s.name, summary: s.summary, href: routes.resource(s.type, s.slug) }))
              : [];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Products", href: routes.products() },
          ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
          { name: product.name, href: routes.product(product.slug) },
          { name: sectionLabels[section], href: routes.productSection(product.slug, section) },
        ]}
        eyebrow={product.name}
        title={c.title}
        lead={section === "pricing" ? product.pricing?.note ?? c.description : c.description}
      />
      <Section tight>
        {links.length > 0 && (
          <div className="grid">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="card">
                <h2 className="card__title">{l.name}</h2>
                <p className="text-muted">{l.summary}</p>
              </Link>
            ))}
          </div>
        )}
        {section === "pricing" && product.pricing && (
          <div className="stack" style={{ ["--stack" as string]: "24px" }}>
            {product.pricing.trial && <p className="badge badge--pine">{product.pricing.trial}</p>}
            <div className="grid" style={{ ["--min" as string]: "240px" }}>
              {product.pricing.plans.map((p) => (
                <PricingCard key={p.name} plan={p} />
              ))}
            </div>
            <p className="text-muted" style={{ fontSize: "var(--fs-sm)" }}>
              Prices as published by {product.name} on{" "}
              <time dateTime={product.pricing.asOf}>
                {new Date(product.pricing.asOf).toLocaleDateString("en", { dateStyle: "long" })}
              </time>
              . Always confirm current pricing on{" "}
              <a href={product.pricing.sourceUrl} rel="noopener" style={{ textDecoration: "underline" }}>
                {product.name}&apos;s pricing page
              </a>
              .
            </p>
          </div>
        )}
        {section === "support" && (
          <div className="stack" style={{ ["--stack" as string]: "40px" }}>
            {(product.docsUrl || product.supportUrl) && (
              <div className="btn-row">
                {product.docsUrl && <ButtonLink href={product.docsUrl}>Documentation</ButtonLink>}
                {product.supportUrl && (
                  <ButtonLink href={product.supportUrl} variant="secondary">
                    Contact support
                  </ButtonLink>
                )}
              </div>
            )}
            {product.faqs?.length ? (
              <p>
                <Link href={`${routes.product(product.slug)}#faq`} style={{ textDecoration: "underline" }}>
                  Read the {product.name} FAQs
                </Link>
              </p>
            ) : null}
          </div>
        )}
      </Section>
      <CtaBand
        title={`Questions about ${product.name}?`}
        primary={getProductCtas(product).primary}
        secondary={{ label: `${product.name} overview`, href: routes.product(product.slug) }}
      />
    </>
  );
}
