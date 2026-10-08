import "../../../catalog-zoho.css";
import { ImageSlot } from "@/components/ui/ImageSlot";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogBrowser, type CatalogSection } from "@/components/product/CatalogBrowser";
import { Breadcrumbs, CtaBand, FaqList, Section, SectionHeader } from "@/components/ui/primitives";
import { toCatalogItem } from "../catalog-item";
import {
  getCategories,
  getCategory,
  getIndustries,
  getProductsByCategory,
  getResources,
  getSolutions,
  isCategoryIndexable,
  productsFor,
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

  // Zoho all-products layout, scoped to one category: the sidebar lists every
  // category (current one marked) and links back to the full catalog.
  const sideLinks = [
    { label: "All products", href: routes.products() },
    ...getCategories()
      .filter((c) => getProductsByCategory(c.slug).length > 0)
      .map((c) => ({ label: c.name, href: routes.category(c.slug), active: c.slug === category.slug })),
  ];
  const sections: CatalogSection[] = [
    {
      id: "products",
      title: `${category.name} products`,
      tagline: category.tagline,
      items: products.map((p) => toCatalogItem(p, p.category === category.slug ? undefined : `Primarily ${getCategory(p.category)?.name ?? ""}`)),
    },
  ];

  return (
    <>
      <header className="zc-hero zc-hero--crumbs">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Products", href: routes.products() },
              { name: category.name, href: routes.category(category.slug) },
            ]}
          />
          <h1>{category.name} software</h1>
          <hr className="zc-rule" />
          {category.description && <p className="zc-hero__lead">{category.description}</p>}
          <ImageSlot src={`/images/categories/${category.slug}.svg`} alt={`${category.name} software`} width={960} height={360} priority className="zc-hero__art" />
        </div>
      </header>

      <CatalogBrowser sections={sections} sideLinks={sideLinks} groupLabel="In this category" searchPlaceholder={`Search ${category.name.toLowerCase()} products…`} />

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
                    <p className="text-muted zc-clamp">{s.problem}</p>
                    <p className="zc-cardmeta">{productsFor(s.products).map((p) => p.name).join(" · ")}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
          {industries.length > 0 && (
            <div style={{ marginTop: solutions.length ? 48 : 0 }}>
              <SectionHeader eyebrow="Industries" title="Industries served" />
              <div className="grid">
                {industries.map((i) => (
                  <Link key={i.slug} href={routes.industry(i.slug)} className="card">
                    <h3 className="card__title">{i.name}</h3>
                    <p className="text-muted">{i.summary}</p>
                    {i.challenges?.[0] && <p className="text-muted zc-clamp">{i.challenges[0]}</p>}
                    <p className="zc-cardmeta">{productsFor(i.products).map((p) => p.name).join(" · ")}</p>
                  </Link>
                ))}
              </div>
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
