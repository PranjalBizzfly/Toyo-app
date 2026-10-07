import Link from "next/link";
import { site } from "@/content/site";
import type { NavGroup } from "@/lib/navigation";
import { getFooterColumns } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { Logo } from "./Logo";

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

/** Global ToyoApps footer — rendered on every page, below any product footer. */
export function SiteFooter() {
  const social = site.social.filter((s) => s.href);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo />
            <p>{site.tagline}</p>
          </div>
          <nav aria-label="Footer" className="site-footer__cols">
            {getFooterColumns().map((g) => (
              <FooterColumn key={g.title} group={g} />
            ))}
          </nav>
        </div>
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {site.legalName}</p>
          <ul>
            <li><Link href={routes.legal("privacy")}>Privacy</Link></li>
            <li><Link href={routes.legal("terms")}>Terms</Link></li>
            <li><Link href={routes.legal("cookies")}>Cookies</Link></li>
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} rel="noopener me">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
