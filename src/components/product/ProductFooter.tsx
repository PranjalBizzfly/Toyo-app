import Link from "next/link";
import type { Product } from "@/content/types";
import { getCategory } from "@/lib/catalog";
import { getProductCtas } from "@/lib/product-cta";
import "@/app/product-zoho.css";
import { getAvailableSections } from "@/lib/product-sections";
import { routes, sectionLabels } from "@/lib/routes";
import { FooterCopyright, FooterLegalLinks } from "@/components/layout/SiteFooter";
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
 * Product footer — the only footer on every product page (FooterResolver keeps
 * the global footer off these routes): product links, resources, get-started
 * links, then the shared legal links and copyright.
 */
export function ProductFooter({ product }: { product: Product }) {
  const sections = getAvailableSections(product);
  const category = getCategory(product.category);

  const explore: FooterLink[] = sections
    .filter((s) => s !== "resources" && s !== "support")
    .map((s) => ({ label: s === "overview" ? product.name : sectionLabels[s], href: routes.productSection(product.slug, s) }));
  const resources: FooterLink[] = [
    product.docsUrl && { label: "Documentation", href: product.docsUrl },
    sections.includes("resources") && { label: "Resources", href: routes.productSection(product.slug, "resources") },
    sections.includes("support") && { label: "Support", href: routes.productSection(product.slug, "support") },
    product.faqs?.length && { label: "FAQs", href: `${routes.product(product.slug)}#faq` },
    category && { label: category.name, href: routes.category(category.slug) },
    { label: "All Products", href: routes.products() },
  ].filter((l): l is FooterLink => !!l);
  const start: FooterLink[] = [
    product.appUrl && { label: `Sign up for ${product.name}`, href: product.appUrl },
    { label: `${product.name} website`, href: product.websiteUrl },
    product.pricing && { label: "Pricing", href: routes.productSection(product.slug, "pricing") },
    { label: `Ask about ${product.name}`, href: routes.contactForm({ type: "product", product: product.slug }) },
  ].filter((l): l is FooterLink => !!l);

  const cta = getProductCtas(product).primary;

  return (
    <footer className="pfoot pz-foot" aria-label={`${product.name} footer`}>
      <div className="container pz-foot__top">
        <div className="pz-foot__promo">
          <ProductLogo product={product} />
          <strong>{product.name}</strong>
          <p>{product.shortDescription}</p>
          <a href={cta.href} rel="noopener">
            {cta.label} <span aria-hidden>→</span>
          </a>
        </div>
        <Column title={`Explore ${product.name}`} links={explore} />
        <Column title="Resources" links={resources} />
        <Column title="Get started" links={start} />
      </div>
      <div className="container pfoot__legal">
        <FooterLegalLinks />
      </div>
      <FooterCopyright />
    </footer>
  );
}