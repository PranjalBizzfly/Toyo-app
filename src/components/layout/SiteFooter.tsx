import Link from "next/link";
import { site } from "@/content/site";
import { getCategories, getComparisons, getIndustries, getIntegrations, getProducts, getResources, getSolutions } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { Icon } from "@/components/ui/Icon";
import { FooterGroup } from "./FooterGroup";
import { LogoMark } from "./Logo";
import { SocialIcon } from "./SocialIcon";

type FooterLink = { label: string; href: string };

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

const legal: FooterLink[] = [
  { label: "Contact Us", href: routes.contactForm() },
  { label: "Privacy Policy", href: routes.legal("privacy") },
  { label: "Terms of Service", href: routes.legal("terms") },
  { label: "Cookie Policy", href: routes.legal("cookies") },
  { label: "Support", href: routes.support() },
];

/**
 * Global ToyoApps footer (layout after zoho.com): five link columns —
 * Products · Categories & Industries · Explore · Company · Contact Sales —
 * then centred social icons, a centred legal row, and the dark copyright strip.
 * Every list comes from the catalog registries.
 */
export function SiteFooter() {
  const products = getProducts().map((p) => ({ label: p.name, href: routes.product(p.slug) }));
  const categories = getCategories().map((c) => ({ label: c.name, href: routes.category(c.slug) }));
  const industries = getIndustries().map((i) => ({ label: i.name, href: routes.industry(i.slug) }));
  const explore: FooterLink[] = [
    { label: "All Products", href: routes.products() },
    getSolutions().length && { label: "Solutions", href: routes.solutions() },
    getIndustries().length && { label: "Industries", href: routes.industries() },
    getIntegrations().length && { label: "Integrations", href: routes.integrations() },
    getResources().length && { label: "Resources", href: routes.resources() },
    getComparisons().length && { label: "Compare Products", href: routes.compare() },
    { label: "Support", href: routes.support() },
  ].filter((l): l is FooterLink => !!l);

  return (
    <footer className="site-footer sfoot">
      <div className="container">
        <nav aria-label="Footer" className="sfoot__cols">
          <FooterGroup title="Products">
            <LinkList links={products} />
          </FooterGroup>

          <FooterGroup title="Categories">
            <LinkList links={categories} />
            {industries.length > 0 && (
              <>
                <p className="sfoot__sub">Industries</p>
                <LinkList links={industries} />
              </>
            )}
          </FooterGroup>

          <FooterGroup title="Explore">
            <LinkList links={explore} />
          </FooterGroup>

          <FooterGroup title="Company">
            <LinkList
              links={[
                { label: "About ToyoApps", href: routes.company() },
                { label: "Publish and Sell Your SaaS", href: routes.publish() },
                { label: "Become a ToyoApps Vendor", href: routes.vendors() },
                { label: "Careers", href: routes.careers() },
                { label: "Media and News", href: routes.media() },
                { label: "Press Kit", href: routes.pressKit() },
                { label: "Blog", href: routes.blog() },
                { label: "Contact Us", href: routes.contactForm() },
              ]}
            />
          </FooterGroup>

          <div className="fgroup fgroup--static sfoot__contact">
            <h3 className="fgroup__title">
              <span className="fgroup__heading">Contact Sales</span>
            </h3>
            {site.contactEmail ? (
              <>
                <p className="sfoot__label">Email</p>
                <a href={`mailto:${site.contactEmail}`} className="sfoot__email">
                  {site.contactEmail}
                </a>
              </>
            ) : (
              <p className="sfoot__note">Tell us what your business needs and we&apos;ll point you to the right products.</p>
            )}
            <hr />
            <Link href={routes.support()} className="sfoot__more">
              Support <Icon name="arrow-right" />
            </Link>
            <Link href={routes.contactForm({ type: "sales" })} className="sfoot__more">
              Talk to Us <Icon name="arrow-right" />
            </Link>
          </div>
        </nav>

        {/* Profiles without a URL in site.social show the icon but are not links. */}
        <ul className="sfoot__social" aria-label="Social media">
          {site.social.map((s) => (
            <li key={s.label}>
              {s.href ? (
                <a href={s.href} rel="noopener me" target="_blank" aria-label={`${site.name} on ${s.label}`}>
                  <SocialIcon name={s.label} />
                </a>
              ) : (
                <span title={`${s.label}: coming soon`}>
                  <SocialIcon name={s.label} />
                  <span className="sr-only">{s.label} (coming soon)</span>
                </span>
              )}
            </li>
          ))}
        </ul>

        <FooterLegalLinks />
      </div>
      <FooterCopyright />
    </footer>
  );
}

/** Legal links row — shared by the global and product footers. */
export function FooterLegalLinks() {
  return (
    <ul className="site-footer__legal">
      {legal.map((l) => (
        <li key={l.label}>
          <Link href={l.href}>{l.label}</Link>
        </li>
      ))}
    </ul>
  );
}

/** Dark copyright strip with the logo — shared by the global and product footers. */
export function FooterCopyright() {
  return (
    <div className="site-footer__strip">
      <LogoMark className="site-footer__mark" />
      <p>
        © {new Date().getFullYear()} {site.legalName}. All Rights Reserved.
      </p>
    </div>
  );
}
