import Link from "next/link";
import type { Product } from "@/content/types";
import { getCategory } from "@/lib/catalog";
import { getProductCtas } from "@/lib/product-cta";
import "@/app/product-zoho.css";
import { getAvailableSections } from "@/lib/product-sections";
import { routes, sectionLabels } from "@/lib/routes";
import { FooterGroup } from "@/components/layout/FooterGroup";
import { site } from "@/content/site";
import { ProductLogo } from "./cards";

type FooterLink = { label: string; href: string };

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
  const legal: FooterLink[] = [
    { label: "Privacy Policy", href: routes.legal("privacy") },
    { label: "Terms of Service", href: routes.legal("terms") },
    { label: "Cookie Policy", href: routes.legal("cookies") },
  ];

  // Same design as the main site footer (SiteFooter), with this product's own links.
  return (
    <footer className="site-footer sfoot sfoot--wide sfoot--product" aria-label={`${product.name} footer`}>
      <div className="container sfoot__grid">
        <div className="sfoot__brand">
          <Link href={routes.product(product.slug)} className="sfoot__logo sfoot__plogo">
            <ProductLogo product={product} />
            <strong>{product.name}</strong>
          </Link>
          <p className="sfoot__tagline">{product.shortDescription}</p>
          <a href={cta.href} rel="noopener" className="sfoot__pill">
            {cta.label} <span aria-hidden>→</span>
          </a>
        </div>

        <nav aria-label={`${product.name} footer`} className="sfoot__cols sfoot__cols--product">
          {explore.length > 0 && (
            <FooterGroup title={`Explore ${product.name}`}>
              <LinkList links={explore} />
            </FooterGroup>
          )}
          {resources.length > 0 && (
            <FooterGroup title="Resources">
              <LinkList links={resources} />
            </FooterGroup>
          )}
          <FooterGroup title="Get Started">
            <LinkList links={start} />
          </FooterGroup>
          <FooterGroup title="Legal">
            <LinkList links={legal} />
          </FooterGroup>
          <div className="fgroup fgroup--static sfoot__contact">
            <h3 className="fgroup__title">
              <span className="fgroup__heading">Contact Sales</span>
            </h3>
            <p className="sfoot__note">Questions about {product.name}? We&apos;ll point you to the right plan.</p>
            <Link href={routes.contactForm({ type: "product", product: product.slug })} className="sfoot__pill sfoot__pill--outline">
              Talk To Us <span aria-hidden>→</span>
            </Link>
            <Link href={routes.products()} className="sfoot__pill">
              All Products
            </Link>
          </div>
        </nav>
      </div>
      <p className="sfoot__copy">
        © {new Date().getFullYear()} {site.legalName}. All Rights Reserved.
      </p>
    </footer>
  );
}

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="fgroup__list">
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
  );
}