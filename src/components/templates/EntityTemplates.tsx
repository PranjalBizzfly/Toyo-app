import Link from "next/link";
import type { Comparison, Faq, Industry, Integration, Product, Resource, Solution } from "@/content/types";
import { getCategory, productsFor } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { ProductCard } from "@/components/product/cards";
import {
  CheckList,
  CtaBand,
  EmptyState,
  FaqList,
  PageHero,
  Section,
  SectionHeader,
  type Crumb,
} from "@/components/ui/primitives";

/* =====================================================================
   Templates for cross-product entities. Each detail page links back into
   the product graph (internal linking), and every hub has an honest empty
   state until real entries are added to `content/registries.ts`.
   ===================================================================== */

interface HubItem {
  name: string;
  summary: string;
  href: string;
  meta?: string;
}

export function HubPageTemplate({
  crumbs,
  eyebrow,
  title,
  lead,
  items,
  emptyTitle,
  emptyText,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
  items: HubItem[];
  emptyTitle: string;
  emptyText: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <PageHero breadcrumbs={crumbs} eyebrow={eyebrow} title={title} lead={lead} />
      {children}
      <Section tight>
        {items.length ? (
          <div className="grid">
            {items.map((i) => (
              <Link key={i.href} href={i.href} className="card">
                {i.meta && <p className="product-card__cat">{i.meta}</p>}
                <h2 className="card__title">{i.name}</h2>
                <p className="text-muted">{i.summary}</p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title={emptyTitle}
            action={
              <Link href={routes.products()} className="btn btn--secondary">
                Explore products
              </Link>
            }
          >
            {emptyText}
          </EmptyState>
        )}
      </Section>
      <CtaBand
        title="Find the right software for your business."
        primary={{ label: "Explore products", href: routes.products() }}
        secondary={{ label: "Contact sales", href: routes.contact() }}
      />
    </>
  );
}

function RelatedProducts({ products, title }: { products: Product[]; title: string }) {
  if (!products.length) return null;
  return (
    <Section tone="surface">
      <SectionHeader eyebrow="ToyoApps products" title={title} />
      <div className="grid" style={{ ["--min" as string]: "300px" }}>
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} categoryName={getCategory(p.category)?.name} />
        ))}
      </div>
    </Section>
  );
}

function Body({ body, faqs }: { body?: string[]; faqs?: Faq[] }) {
  return (
    <>
      {body?.length ? (
        <Section>
          <div className="prose">
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>
      ) : null}
      {faqs?.length ? (
        <Section>
          <SectionHeader eyebrow="FAQs" title="Common questions" />
          <FaqList faqs={faqs} />
        </Section>
      ) : null}
    </>
  );
}

const closing = (
  <CtaBand
    title="Find the right software for your business."
    primary={{ label: "Explore products", href: routes.products() }}
    secondary={{ label: "Contact sales", href: routes.contact() }}
  />
);

export function SolutionPageTemplate({ solution }: { solution: Solution }) {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Solutions", href: routes.solutions() },
          { name: solution.name, href: routes.solution(solution.slug) },
        ]}
        eyebrow="Solution"
        title={solution.name}
        lead={solution.summary}
      />
      <Section tone="surface">
        <div className="split" style={{ alignItems: "start" }}>
          <div className="stack">
            <p className="eyebrow">The problem</p>
            <p className="lead">{solution.problem}</p>
          </div>
          <div className="stack">
            <p className="eyebrow">The approach</p>
            <p className="lead">{solution.approach}</p>
          </div>
        </div>
      </Section>
      <Body body={solution.body} />
      <RelatedProducts products={productsFor(solution.products)} title="Recommended products" />
      <Body faqs={solution.faqs} />
      {closing}
    </>
  );
}

export function IndustryPageTemplate({ industry }: { industry: Industry }) {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Industries", href: routes.industries() },
          { name: industry.name, href: routes.industry(industry.slug) },
        ]}
        eyebrow="Industry"
        title={`Software for ${industry.name}`}
        lead={industry.summary}
      />
      {industry.challenges?.length ? (
        <Section tone="surface">
          <SectionHeader eyebrow="Challenges" title={`What ${industry.name} teams deal with`} />
          <CheckList items={industry.challenges} />
        </Section>
      ) : null}
      <Body body={industry.body} />
      <RelatedProducts products={productsFor(industry.products)} title={`ToyoApps for ${industry.name}`} />
      <Body faqs={industry.faqs} />
      {closing}
    </>
  );
}

export function IntegrationPageTemplate({ integration }: { integration: Integration }) {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Integrations", href: routes.integrations() },
          { name: integration.name, href: routes.integration(integration.slug) },
        ]}
        eyebrow={integration.vendor ? `Integration · ${integration.vendor}` : "Integration"}
        title={integration.name}
        lead={integration.summary}
      />
      <Body body={integration.body} />
      <RelatedProducts products={productsFor(integration.products)} title="Works with" />
      <Body faqs={integration.faqs} />
      {closing}
    </>
  );
}

export function ComparisonPageTemplate({ comparison }: { comparison: Comparison }) {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Compare", href: routes.compare() },
          { name: comparison.name, href: routes.comparison(comparison.slug) },
        ]}
        eyebrow="Comparison"
        title={comparison.name}
        lead={comparison.summary}
      />
      <Section tight>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Criterion</th>
                {comparison.subjects.map((s) => (
                  <th key={s} scope="col">
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((r) => (
                <tr key={r.criterion}>
                  <th scope="row">{r.criterion}</th>
                  {r.values.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Body body={comparison.body} faqs={comparison.faqs} />
      <RelatedProducts products={productsFor(comparison.subjects)} title="ToyoApps products in this comparison" />
      {closing}
    </>
  );
}

export function ResourcePageTemplate({ resource, typeLabel }: { resource: Resource; typeLabel: string }) {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Resources", href: routes.resources() },
          { name: typeLabel, href: routes.resourceType(resource.type) },
          { name: resource.name, href: routes.resource(resource.type, resource.slug) },
        ]}
        eyebrow={typeLabel}
        title={resource.name}
        lead={resource.summary}
      >
        <p className="text-muted" style={{ fontSize: "var(--fs-sm)" }}>
          <time dateTime={resource.publishedAt}>{new Date(resource.publishedAt).toLocaleDateString("en", { dateStyle: "long" })}</time>
          {resource.author && ` · ${resource.author}`}
        </p>
      </PageHero>
      <Body body={resource.body} faqs={resource.faqs} />
      <RelatedProducts products={productsFor(resource.products ?? [])} title="Products in this article" />
      {closing}
    </>
  );
}
