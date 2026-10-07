import Link from "next/link";
import { previewMode } from "@/lib/catalog";
import { getMainNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { HeaderNav } from "./HeaderNav";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <>
      {previewMode && (
        <div className="preview-bar" role="note">
          Preview mode — placeholder products and categories are visible here and hidden in production.
        </div>
      )}
      <header className="site-header">
        <div className="container site-header__bar">
          <Logo />
          <HeaderNav
            menus={getMainNav()}
            cta={
              <Link href={routes.contact()} className="btn btn--dark btn--sm header-cta">
                Contact sales
              </Link>
            }
          />
        </div>
      </header>
    </>
  );
}
