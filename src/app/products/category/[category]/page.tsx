import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/cards";
import { CtaBand, FaqList, PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import {
  getCategories,
  getCategory,
  getIndustries,
  getProductsByCategory,
  getResources,
  getSolutions,
  isCategoryIndexable,
} from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/** CategoryPageTemplate — every category page is generated from category data. */

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // Only categories that list at least one visible product get a page.
  return getCategories()
    .filter((c) => getProductsByCategory(c.slug).length > 0)
    .map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const category = getCategory((await params).category);
  if (!category) return {};
  return buildMetadata({
    ...category,
    title: `${category.name} software`,
    description: category.seoDescription ?? `${category.tagline}. ${category.description}`,
    path: routes.category(category.slug),
    // Thin categories (fewer than 2 published products) are noindexed.
    status: isCategoryIndexable(category) ? category.status : "draft",
  });
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  const products = getProductsByCategory(category.slug);
  const slugs = new Set(products.map((p) => p.slug));
  const touches = (list: string[] | undefined) => list?.some((s) => slugs.has(s));
  const solutions = getSolutions().filter((s) => touches(s.products));
  const industries = getIndustries().filter((i) => touches(i.products));
  const resources = getResources().filter((r) => touches(r.products)).slice(0, 6);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Products", href: routes.products() },
          { name: category.name, href: routes.category(category.slug) },
        ]}
        eyebrow="Category"
        title={`${category.name} software`}
        lead={category.description}
      />

      <Section tight>
        <SectionHeader title={`${category.name} products`} lead={category.tagline} />
        <div className="grid" style={{ ["--min" as string]: "300px" }}>
          {products.map((p) => (
            <ProductCard
              key={p.slug}
              product={p}
              categoryName={p.category === category.slug ? undefined : `Primarily ${getCategory(p.category)?.name ?? ""}`}
            />
          ))}
        </div>
      </Section>

      {category.problems?.length ? (
        <Section tone="surface">
          <SectionHeader eyebrow="Business problems" title={`What ${category.name.toLowerCase()} software solves`} />
          <div className="grid">
            {category.problems.map((p) => (
              <article key={p.title} className="card">
                <h3 className="card__title">{p.title}</h3>
                <p className="text-muted">{p.description}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {(solutions.length > 0 || industries.length > 0) && (
        <Section>
          {solutions.length > 0 && (
            <>
              <SectionHeader eyebrow="Use cases" title="Solutions in this category" />
              <div className="grid">
                {solutions.map((s) => (
                  <Link key={s.slug} href={routes.solution(s.slug)} className="card">
                    <h3 className="card__title">{s.name}</h3>
                    <p className="text-muted">{s.summary}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
          {industries.length > 0 && (
            <div className="chips" style={{ marginTop: 32 }}>
              {industries.map((i) => (
                <Link key={i.slug} href={routes.industry(i.slug)} className="chip">
                  {i.name}
                </Link>
              ))}
            </div>
          )}
        </Section>
      )}

      {resources.length > 0 && (
        <Section tone="surface">
          <SectionHeader eyebrow="Resources" title="Related reading" />
          <div className="grid">
            {resources.map((r) => (
              <Link key={r.slug} href={routes.resource(r.type, r.slug)} className="card">
                <h3 className="card__title">{r.name}</h3>
                <p className="text-muted">{r.summary}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {category.faqs?.length ? (
        <Section>
          <SectionHeader eyebrow="FAQs" title={`${category.name} questions`} />
          <FaqList faqs={category.faqs} />
        </Section>
      ) : null}

      <CtaBand
        title={`Find the right ${category.name.toLowerCase()} tool`}
        primary={{ label: "Talk to sales", href: routes.contact() }}
        secondary={{ label: "All products", href: routes.products() }}
      />
    </>
  );
}
