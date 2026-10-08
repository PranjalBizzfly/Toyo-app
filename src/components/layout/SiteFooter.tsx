import Link from "next/link";
import { site } from "@/content/site";
import type { NavGroup } from "@/lib/navigation";
import { getFooterColumns } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "./Logo";

export function FooterColumn({ group }: { group: NavGroup }) {
  return (
    <div className="footer-col">
      <h3>{group.title}</h3>
      <ul>
        {group.links.map((l) => (
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

const legal = [
  { label: "Contact Us", href: routes.contact() },
  { label: "Privacy Policy", href: routes.legal("privacy") },
  { label: "Terms of Service", href: routes.legal("terms") },
  { label: "Cookie Policy", href: routes.legal("cookies") },
  { label: "Support", href: routes.support() },
];

/** Global ToyoApps footer: link columns, contact column, legal row, copyright strip. */
export function SiteFooter() {
  const social = site.social.filter((s) => s.href);
  return (
    <footer className="site-footer">
      <div className="container">
        <nav aria-label="Footer" className="site-footer__cols">
          {getFooterColumns().map((g) => (
            <FooterColumn key={g.title} group={g} />
          ))}
          <div className="footer-col footer-col--contact">
            <h3>Contact Sales</h3>
            {site.contactEmail ? (
              <>
                <p className="footer-col__label">Email</p>
                <a href={`mailto:${site.contactEmail}`} className="footer-col__strong">
                  {site.contactEmail}
                </a>
              </>
            ) : (
              <p className="footer-col__text">Tell us what your business needs and we&apos;ll point you to the right products.</p>
            )}
            <hr />
            <Link href={routes.contact()} className="footer-col__more">
              Talk to us <Icon name="arrow-right" />
            </Link>
            <Link href={routes.publish()} className="footer-col__more">
              Publish your software <Icon name="arrow-right" />
            </Link>
          </div>
        </nav>

        {social.length > 0 && (
          <ul className="site-footer__social">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} rel="noopener me">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <ul className="site-footer__legal">
          {legal.map((l) => (
            <li key={l.label}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="site-footer__strip">
        <LogoMark className="site-footer__mark" />
        <p>
          © {new Date().getFullYear()} {site.legalName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
