import { notFound } from "next/navigation";
import { ProductLogo } from "@/components/product/cards";
import { ProductFooter } from "@/components/product/ProductFooter";
import { ProductNav } from "@/components/product/ProductNav";
import { getProduct, getProducts } from "@/lib/catalog";
import { getAvailableSections } from "@/lib/product-sections";
import { productThemeClass } from "@/lib/product-theme";
import "@/app/product-themes.css";
import "@/app/product-story.css";
import "@/app/product-refs.css";
import "@/app/product-patterns.css";
import "@/app/edge-transitions.css";
import "@/app/card-styles.css";
import { getProductStory } from "@/lib/product-story";
import { getProductCtas } from "@/lib/product-cta";
import { routes, sectionLabels } from "@/lib/routes";

type Props = { children: React.ReactNode; params: Promise<{ product: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().map((p) => ({ product: p.slug }));
}

/** Wraps every product page with product navigation and the product footer. */
export default async function ProductLayout({ children, params }: Props) {
  const product = getProduct((await params).product);
  if (!product) notFound();

  const items = getAvailableSections(product).map((s) => ({
    label: sectionLabels[s],
    href: routes.productSection(product.slug, s),
  }));
  const cta = getProductCtas(product).primary;

  return (
    <div className={productThemeClass(product.slug)} data-edge={getProductStory(product.slug).edge} data-cards={getProductStory(product.slug).benefits} data-faq={["glass", "starfield", "prompt"].includes(getProductStory(product.slug).hero) ? "dark" : "light"}>
      <ProductNav
        brand={
          <a href={routes.product(product.slug)} className="product-nav__brand">
            <ProductLogo product={product} />
            <span>{product.name}</span>
          </a>
        }
        items={items}
        cta={cta}
      />
      {children}
      <ProductFooter product={product} />
    </div>
  );
}
