import { getMainNav } from "@/lib/navigation";
import { HeaderNav } from "./HeaderNav";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__bar">
        <Logo />
        <HeaderNav menus={getMainNav()} />
      </div>
    </header>
  );
}
