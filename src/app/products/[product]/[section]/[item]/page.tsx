import { notFound } from "next/navigation";
import { ProductItemTemplate } from "@/components/templates/ProductItemTemplate";
import { getProduct, getProducts, isIndexable } from "@/lib/catalog";
import { getProductItem, getProductItems, itemSections, type ItemSection } from "@/lib/product-sections";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Product-scoped detail pages: /products/[product]/{solutions|industries|
 * integrations|compare|resources|support}/[item]. Generated only for entries
 * that pass the content gate (entityHasPage).
 */

type Props = { params: Promise<{ product: string; section: string; item: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().flatMap((p) =>
    itemSections.flatMap((section) =>
      getProductItems(p, section)
        .filter((i) => i.hasPage)
        .map((i) => ({ product: p.slug, section, item: i.slug })),
    ),
  );
}

async function load(params: Props["params"]) {
  const { product: ps, section, item } = await params;
  const product = getProduct(ps);
  if (!product || !(itemSections as readonly string[]).includes(section)) return null;
  const found = getProductItem(product, section as ItemSection, item);
  return found ? { product, section: section as ItemSection, item: found } : null;
}

const titleFor = (section: ItemSection, name: string, product: string, competitor?: string) =>
  section === "compare" && competitor
    ? `${product} vs ${competitor}`
    : section === "industries"
      ? `${product} for ${name}`
      : section === "integrations"
        ? `${product} + ${name} integration`
        : `${name} — ${product}`;

export async function generateMetadata({ params }: Props) {
  const r = await load(params);
  if (!r) return {};
  const competitor = r.item.entity.competitor as string | undefined;
  return buildMetadata({
    title: titleFor(r.section, r.item.name, r.product.name, competitor),
    description: r.item.summary,
    path: routes.productItem(r.product.slug, r.section, r.item.slug),
    status: isIndexable(r.product.status) ? "live" : r.product.status,
  });
}

export default async function ProductItemPage({ params }: Props) {
  const r = await load(params);
  if (!r) notFound();
  return <ProductItemTemplate product={r.product} section={r.section} item={r.item} />;
}
