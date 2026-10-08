import { previewMode } from "@/lib/catalog";
import { getMainNav } from "@/lib/navigation";
import { HeaderNav } from "./HeaderNav";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <>
      {previewMode && (
        <div className="preview-bar" role="note">
          Preview mode — draft content is visible here and hidden in production.
        </div>
      )}
      <header className="site-header">
        <div className="site-header__bar">
          <Logo />
          <HeaderNav menus={getMainNav()} />
        </div>
      </header>
    </>
  );
}
