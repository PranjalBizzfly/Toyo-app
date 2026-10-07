import Link from "next/link";
import type { Category } from "@/content/types";
import { routes } from "@/lib/routes";
import { tintStyle } from "@/lib/tint";
import { LogoMark } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";

/**
 * Hero visual: ToyoApps at the centre, categories in orbit. Generated from
 * category data — add a category and it takes its place on the ring.
 */
export function EcosystemOrbit({ categories }: { categories: Category[] }) {
  const nodes = categories.slice(0, 10);
  return (
    <div className="eco" role="img" aria-label={`ToyoApps ecosystem: ${nodes.map((c) => c.name).join(", ")}`}>
      <span className="eco__ring" style={{ ["--inset" as string]: "8%" }} />
      <span className="eco__ring" style={{ ["--inset" as string]: "24%" }} />
      <div className="eco__core">
        <LogoMark className="" />
      </div>
      {nodes.map((c, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const r = i % 2 ? 26 : 42;
        const style = {
          ...tintStyle(c.slug),
          ["--x" as string]: `${(Math.cos(angle) * r).toFixed(2)}%`,
          ["--y" as string]: `${(Math.sin(angle) * r).toFixed(2)}%`,
        };
        return (
          <Link key={c.slug} href={routes.category(c.slug)} className="eco__node" style={style} tabIndex={-1} aria-hidden>
            <span className="icon-tile">
              <Icon name={c.icon} />
            </span>
            <span>{c.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
