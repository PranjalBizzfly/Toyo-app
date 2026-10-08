import Link from "next/link";
import type { Product } from "@/content/types";
import { getCategory, getRelatedProducts } from "@/lib/catalog";
import { getAvailableSections } from "@/lib/product-sections";
import { routes, sectionLabels } from "@/lib/routes";
import { ProductLogo } from "./cards";

type FooterLink = { label: string; href: string };

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  if (!links.length) return null;
  return (
    <div className="pfoot__col">
      <h3>{title}</h3>
      <ul>
        {links.map((l) => (
          <li key={l.href + l.label}>
            {l.href.startsWith("http") ? (
              <a href={l.href} rel="noopener">
                {l.label}
              </a>
            ) : (
              <Link href={l.href}>{l.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Product footer — dark band rendered above the global footer on every
 * product page: product links, resources, get-started links and related products.
 */
export function ProductFooter({ product }: { product: Product }) {
  const sections = getAvailableSections(product);
  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 3);

  const explore: FooterLink[] = sections
    .filter((s) => s !== "resources" && s !== "support")
    .map((s) => ({ label: sectionLabels[s], href: routes.productSection(product.slug, s) }));
  const resources: FooterLink[] = [
    product.docsUrl && { label: "Documentation", href: product.docsUrl },
    sections.includes("resources") && { label: "Guides & articles", href: routes.productSection(product.slug, "resources") },
    sections.includes("support") && { label: "Support", href: routes.productSection(product.slug, "support") },
    product.faqs?.length && { label: "FAQs", href: `${routes.product(product.slug)}#faq` },
    category && { label: `All ${category.name}`, href: routes.category(category.slug) },
    { label: "All ToyoApps products", href: routes.products() },
  ].filter((l): l is FooterLink => !!l);
  const start: FooterLink[] = [
    product.appUrl && { label: `Sign up for ${product.name}`, href: product.appUrl },
    { label: `${product.name} website`, href: product.websiteUrl },
    product.pricing && { label: "Compare plans", href: routes.productSection(product.slug, "pricing") },
    { label: "Contact ToyoApps", href: routes.contact() },
  ].filter((l): l is FooterLink => !!l);

  return (
    <aside className="pfoot" aria-label={`${product.name} links`}>
      <div className="container pfoot__cols">
        <div className="pfoot__brand">
          <ProductLogo product={product} />
          <p className="pfoot__name">{product.name}</p>
          <p className="pfoot__desc">{product.shortDescription}</p>
        </div>
        <Column title={`Explore ${product.name}`} links={explore} />
        <Column title="Resources" links={resources} />
        <Column title="Get started" links={start} />
      </div>
      {related.length > 0 && (
        <div className="pfoot__more">
          <p>More products from ToyoApps</p>
          <ul>
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={routes.product(p.slug)}>
                  <ProductLogo product={p} />
                  <span>
                    <strong>{p.name}</strong>
                    <small>{p.primaryUseCase}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
