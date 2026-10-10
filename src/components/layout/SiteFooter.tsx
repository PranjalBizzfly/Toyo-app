import Link from "next/link";
import { site } from "@/content/site";
import { getCategories, getComparisons, getIndustries, getIntegrations, getProducts, getResources, getSolutions } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { Icon } from "@/components/ui/Icon";
import { FooterGroup } from "./FooterGroup";
import { Logo, LogoMark } from "./Logo";
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
    <footer className="site-footer sfoot sfoot--wide">
      <div className="container sfoot__grid">
        {/* Brand column: logo, one line about ToyoApps, social icons */}
        <div className="sfoot__brand">
          {/* Logo is itself a link home; wrapping it in another <a> breaks hydration */}
          <div className="sfoot__logo">
            <Logo />
          </div>
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
          <FooterBadges />
        </div>

        <nav aria-label="Footer" className="sfoot__cols">
          <FooterGroup title="Products">
            <LinkList links={products} />
          </FooterGroup>

          <FooterGroup title="Categories">
            <LinkList links={categories} />
          </FooterGroup>

          {industries.length > 0 && (
            <FooterGroup title="Industries">
              <LinkList links={industries} />
            </FooterGroup>
          )}

          <FooterGroup title="Quick Links">
            <LinkList links={explore} />
          </FooterGroup>

          <FooterGroup title="Legal">
            <LinkList links={legal.filter((l) => l.label !== "Contact Us" && l.label !== "Support")} />
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
              <a href={`mailto:${site.contactEmail}`} className="sfoot__email">
                {site.contactEmail}
              </a>
            ) : (
              <p className="sfoot__note">Tell us what your business needs and we&apos;ll point you to the right products.</p>
            )}
            <Link href={routes.contactForm({ type: "sales" })} className="sfoot__pill sfoot__pill--outline">
              Talk to Us <Icon name="arrow-right" />
            </Link>
            <Link href={routes.products()} className="sfoot__pill">
              Explore Products
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

const appIcons: Record<string, React.ReactNode> = {
  chrome: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#db4437" />
      <path d="M12 2a10 10 0 0 1 8.66 5H12z" fill="#db4437" />
      <path d="M3.34 7 7.67 14.5 12 7z" fill="#0f9d58" />
      <path d="M3.34 7A10 10 0 0 0 12 22l4.33-7.5H7.67z" fill="#0f9d58" />
      <path d="M20.66 7H12l4.33 7.5L12 22a10 10 0 0 0 8.66-15z" fill="#ffcd40" />
      <circle cx="12" cy="12" r="4.4" fill="#fff" />
      <circle cx="12" cy="12" r="3.4" fill="#4285f4" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 3.2v17.6L13.4 12z" fill="#00c3ff" />
      <path d="M4 3.2 13.4 12l3-3L5.6 2.6C5 2.3 4.4 2.6 4 3.2z" fill="#00f076" />
      <path d="M4 20.8 13.4 12l3 3-10.8 6.4c-.6.3-1.2 0-1.6-.6z" fill="#ff3a44" />
      <path d="m16.4 9 3.5 2c.7.5.7 1.5 0 2l-3.5 2-3-3z" fill="#ffd400" />
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.2 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.8-1.1-2.8-4.3zM14 5.3c.7-.9 1.2-2 1-3.2-1 .1-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z" />
    </svg>
  ),
};

/** Badge row: extension and store badges, partner badge and accepted payment methods (site.badges). */
function FooterBadges() {
  const b = site.badges;
  return (
    <div className="sfoot__badges">
      <ul className="sfoot__apps" aria-label="Apps and partners">
        {b.apps.map((a) => {
          const inner = (
            <>
              <span className={`sfoot__badge-icon sfoot__badge-icon--${a.kind}`}>{appIcons[a.kind]}</span>
              <span className="sfoot__badge-text">
                <small>{a.top}</small>
                <strong>{a.bottom}</strong>
              </span>
            </>
          );
          return (
            <li key={a.kind}>
              {a.href ? (
                <a href={a.href} rel="noopener" target="_blank" className={`sfoot__badge sfoot__badge--${a.kind}`}>
                  {inner}
                </a>
              ) : (
                <span className={`sfoot__badge sfoot__badge--${a.kind}`}>{inner}</span>
              )}
            </li>
          );
        })}
        <li>
          <span className="sfoot__badge sfoot__badge--meta">
            <span className="sfoot__badge-text">
              <strong>
                <svg viewBox="0 0 36 18" aria-hidden className="sfoot__meta-mark">
                  <path d="M9 2C4.6 2 2 7.2 2 11c0 3 1.5 5 3.9 5 2.8 0 4.6-3.4 7.1-7.6l1-1.6M27 2c4.4 0 7 5.2 7 9 0 3-1.5 5-3.9 5-2.8 0-4.6-3.4-7.1-7.6l-3-5C18.4 1.5 17 2 15.4 4.3" fill="none" stroke="#0668e1" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
                {b.partner.top}
              </strong>
              <small>{b.partner.bottom}</small>
            </span>
          </span>
        </li>
      </ul>
      <ul className="sfoot__pay" aria-label="Accepted payment methods">
        {b.payments.map((p) => (
          <li key={p} className={`sfoot__card sfoot__card--${p.toLowerCase().replace(/[^a-z]+/g, "-")}`} title={p}>
            <PaymentMark name={p} />
            <span className="sr-only">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Simple, original card-network marks (not the networks' artwork). */
function PaymentMark({ name }: { name: string }) {
  switch (name) {
    case "Mastercard":
    case "Maestro":
      return (
        <svg viewBox="0 0 40 24" aria-hidden>
          <circle cx="15" cy="12" r="8" fill={name === "Mastercard" ? "#eb001b" : "#e3001b"} />
          <circle cx="25" cy="12" r="8" fill={name === "Mastercard" ? "#f79e1b" : "#00a2e5"} fillOpacity=".9" />
        </svg>
      );
    case "Diners Club":
      return (
        <svg viewBox="0 0 40 24" aria-hidden>
          <circle cx="20" cy="12" r="9" fill="#0079be" />
          <circle cx="20" cy="12" r="6" fill="#fff" />
          <rect x="18.6" y="7" width="2.8" height="10" fill="#0079be" />
        </svg>
      );
    case "PayPal":
      return <span className="sfoot__card-word sfoot__card-word--paypal">P</span>;
    case "American Express":
      return <span className="sfoot__card-word sfoot__card-word--amex">AMEX</span>;
    default:
      return <span className="sfoot__card-word sfoot__card-word--visa">VISA</span>;
  }
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
