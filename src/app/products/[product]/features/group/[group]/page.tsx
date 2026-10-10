import { photoForProduct } from "@/lib/photos";
import { SpotVisual } from "@/components/product/SpotVisual";
import { PageFaqs } from "@/components/ui/PageFaqs";
import { getFeatureGroupFaqs } from "@/lib/faqs";
import { Labelled } from "@/components/ui/Labelled";
import { ProductCta } from "@/components/product/ProductCta";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getCategory, getFeatureGroupsWithPages, getProduct, getProducts, isIndexable } from "@/lib/catalog";
import { featureHasPage } from "@/lib/rules";
import { getProductCtas } from "@/lib/product-cta";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/feature-zoho.css";

/**
 * Feature-group hub (Zoho CRM feature-category pattern): full-colour hero with
 * copy left and illustration right, then one centred block per feature
 * (heading, summary, "Learn more about …", screenshot panel) on alternating
 * white / tinted bands. Generated only for groups that have written intro
 * content and at least three features.
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
    title: `${group.name} | ${r.product.name}`,
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
  const cta = getProductCtas(product).primary;

  return (
    <>
      <header className="fz-hero fz-hero--left">
        <div className="container">
          <div className="fz-crumbs">
            <Breadcrumbs
              items={[
                { name: "Products", href: routes.products() },
                ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
                { name: product.name, href: routes.product(product.slug) },
                { name: "Features", href: routes.productSection(product.slug, "features") },
                { name: group.name, href: routes.featureGroup(product.slug, group.slug) },
              ]}
            />
          </div>
          <div className="fz-hero__grid">
            <div className="fz-hero__copy">
              <p className="fz-hero__eyebrow">{product.name} features</p>
              <h1>{group.name}</h1>
              {group.description && <p className="fz-hero__lead">{group.description}</p>}
              <div className="fz-hero__ctas">
                <a href={cta.href} rel="noopener" className="fz-btn fz-btn--light">
                  {cta.label}
                </a>
              </div>
            </div>
            {photoForProduct(product.slug) && <ImageSlot src={photoForProduct(product.slug)!.src} alt={photoForProduct(product.slug)!.alt} width={1280} height={720} priority className="fz-art fz-hero__art" />}
          </div>
        </div>
      </header>

      <section className="fz-sec" aria-label={`About ${group.name}`}>
        <div className="container fz-center">
          {group.body!.map((p, i) => (
            <p key={i} className="fz-lead">
              {p}
            </p>
          ))}
        </div>
      </section>

      {features.map((f, i) => (
        <section key={f.slug} className={`fz-sec fz-feat${i % 2 === 0 ? " fz-sec--tint" : ""}`} aria-labelledby={`f-${f.slug}`}>
          <div className="container">
            <div className="fz-center">
              <h2 id={`f-${f.slug}`} className="fz-h2">
                {f.name}
              </h2>
              {f.summary && <p className="fz-lead">{f.summary}</p>}
              {f.problem && <p className="fz-gproblem">{f.problem}</p>}
              {f.capabilities?.length ? (
                <ul className="fz-glist" aria-label={`${f.name} capabilities`}>
                  {f.capabilities.slice(0, 4).map((c) => (
                    <li key={c}><Labelled text={c} /></li>
                  ))}
                </ul>
              ) : null}
              {featureHasPage(f) && (
                <Link href={routes.feature(product.slug, f.slug)} className="fz-more">
                  Learn more about {f.name.toLowerCase()} <Icon name="arrow-right" />
                </Link>
              )}
            </div>
            <div className="fz-panel fz-panel--shot">
              <div className="fz-art fz-art--band fz-art--visual"><SpotVisual feature={f} variant={i} /></div>
            </div>
          </div>
        </section>
      ))}

      {(prev || next) && (
        <nav aria-label="Feature groups" className="container fz-pager" style={{ marginBottom: 48 }}>
          {prev ? (
            <Link href={routes.featureGroup(product.slug, prev.group.slug)}>
              <small>Previous</small>← {prev.group.name}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={routes.featureGroup(product.slug, next.group.slug)}>
              <small>Next</small>
              {next.group.name} →
            </Link>
          )}
        </nav>
      )}
      <PageFaqs faqs={getFeatureGroupFaqs(product, group.slug)} />
      <ProductCta product={product} title={`Try ${product.name}`} primary={cta} />
    </>
  );
}
