import Link from "next/link";
import { notFound } from "next/navigation";
import type { Feature } from "@/content/types";
import { Breadcrumbs, CtaBand } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getProductCtas } from "@/lib/product-cta";
import { featureHasPage } from "@/lib/rules";
import { getCategory, getFeatureGroupsWithPages, getProduct, groupFeatures } from "@/lib/catalog";
import { getAvailableSections } from "@/lib/product-sections";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/feature-zoho.css";

/**
 * Features hub (Zoho CRM /features pattern) — pill-cloud hero, then one band
 * per feature area, cycling three Zoho treatments: split head + illustration +
 * link rows, centred head + tile cards, and a full-colour band with link rows.
 */

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

function LinkRow({ f, productSlug }: { f: Feature; productSlug: string }) {
  const has = featureHasPage(f);
  const inner = (
    <>
      <span className="fz-mono" aria-hidden>
        {f.name.charAt(0)}
      </span>
      <span>
        <span className="fz-link__name">{f.name}</span>
        {f.summary && <span className="fz-link__sum">{f.summary}</span>}
        {f.capabilities?.[0] && <span className="fz-hubcap">{f.capabilities[0]}</span>}
      </span>
      {has ? (
        <span className="fz-link__go" aria-hidden>
          <Icon name="arrow-right" />
        </span>
      ) : (
        <span />
      )}
    </>
  );
  return (
    <li>
      {has ? (
        <Link href={routes.feature(productSlug, f.slug)} className="fz-link">
          {inner}
        </Link>
      ) : (
        <div className="fz-link">{inner}</div>
      )}
    </li>
  );
}

function Tile({ f, productSlug }: { f: Feature; productSlug: string }) {
  const inner = (
    <>
      <span className="fz-mono" aria-hidden>
        {f.name.charAt(0)}
      </span>
      <h3>{f.name}</h3>
      {f.summary && <p>{f.summary}</p>}
      {f.capabilities?.length ? (
        <ul className="fz-hubcaps">
          {f.capabilities.slice(0, 2).map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
  return (
    <li className="fz-tiles__item">
      {featureHasPage(f) ? (
        <Link href={routes.feature(productSlug, f.slug)} className="fz-tile">
          {inner}
          <span className="fz-more">
            Learn more <Icon name="arrow-right" />
          </span>
        </Link>
      ) : (
        <div className="fz-tile">{inner}</div>
      )}
    </li>
  );
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
          <a href={cta.href} rel="noopener" className="fz-btn zf-hero__cta">
            {cta.label}
          </a>
        </div>
      </header>

      {groups.map((g, i) => {
        const variant = groups.length === 1 ? 1 : i % 3; // 0 split, 1 centred tiles, 2 colour band
        const hub = hubs.has(g.group.slug);
        const label = `${g.features.length} ${g.features.length === 1 ? "feature" : "features"}`;
        const headingId = `fg-${g.group.slug}`;
        const more = hub ? (
          <Link href={routes.featureGroup(product.slug, g.group.slug)} className="fz-more">
            Learn more <Icon name="arrow-right" />
          </Link>
        ) : null;

        if (variant === 1) {
          return (
            <section key={g.group.slug} id={g.group.slug} aria-labelledby={headingId} className={`fz-sec${i % 2 ? " fz-sec--tint" : ""}`}>
              <div className="container">
                <div className="fz-center">
                  <span className="fz-kicker">{label}</span>
                  <h2 id={headingId} className="fz-h2">
                    {g.group.name}
                  </h2>
                  {g.group.description && <p className="fz-lead">{g.group.description}</p>}
                  {more}
                </div>
                <ul className="fz-tiles">
                  {g.features.map((f) => (
                    <Tile key={f.slug} f={f} productSlug={product.slug} />
                  ))}
                </ul>
              </div>
            </section>
          );
        }
        return (
          <section key={g.group.slug} id={g.group.slug} aria-labelledby={headingId} className={`fz-sec${variant === 2 ? " fz-sec--band" : ""}`}>
            <div className="container">
              <div className={variant === 0 ? "fz-split" : "fz-bandhead"}>
                <div>
                  <span className="fz-kicker">{label}</span>
                  <h2 id={headingId} className="fz-h2">
                    {g.group.name}
                  </h2>
                </div>
                <div className="fz-split__copy">
                  {g.group.description && <p className="fz-lead">{g.group.description}</p>}
                  {more}
                </div>
              </div>
              <div className={`fz-media${variant === 2 ? " fz-media--band" : ""}`}>
                {variant === 0 ? (
                  <ImageSlot src="/images/features/area-illustration.webp" alt={`${g.group.name} in ${product.name}`} width={450} height={450} className="fz-art" />
                ) : (
                  <ImageSlot src="/images/features/area-band.webp" alt={`${g.group.name} in ${product.name}`} width={360} height={480} className="fz-art fz-art--band" />
                )}
                <ul className="fz-links">
                  {g.features.map((f) => (
                    <LinkRow key={f.slug} f={f} productSlug={product.slug} />
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
      <CtaBand
        title={`Try ${product.name}`}
        lead={product.pricing?.trial}
        primary={cta}
        secondary={product.pricing ? { label: "See pricing", href: routes.productSection(product.slug, "pricing") } : undefined}
      />
    </>
  );
}
