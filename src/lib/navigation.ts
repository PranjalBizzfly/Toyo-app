import {
  getCatalogTree,
  getComparisons,
  getFeaturedProducts,
  getIndustries,
  getIntegrations,
  getProduct,
  getProducts,
  getResources,
  getSolutions,
  integrationHasPage,
} from "./catalog";
import { resourceTypes, routes } from "./routes";
import { monogram, productAccent } from "./tint";
import type { IconName, Product } from "@/content/types";

const productLink = (p: Product): NavLink => ({
  label: p.name,
  href: routes.product(p.slug),
  description: p.tagline ?? p.shortDescription,
  accent: productAccent(p),
  initials: monogram(p.name),
});

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** "Uses Cardizo, Sibu +1" — names of the real products an entity links to. */
function productNames(slugs: string[], verb: string, max = 2): string | undefined {
  const names = slugs.map((s) => getProduct(s)?.name).filter((n): n is string => !!n);
  if (!names.length) return undefined;
  const more = names.length - max;
  return `${verb} ${names.slice(0, max).join(", ")}${more > 0 ? ` +${more}` : ""}`;
}

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/**
 * Navigation model. Built entirely from content, so a new product, category,
 * solution or industry appears in the header, mobile menu and footer
 * automatically. Serializable — safe to pass to client components.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  /** Product links only: brand colour and initials for the mega-menu tile. */
  accent?: string;
  initials?: string;
  /** Small supporting line, e.g. the products a solution uses. */
  meta?: string;
  icon?: IconName;
}

export interface NavGroup {
  title: string;
  href?: string;
  /** Short supporting text for the group (category tagline). */
  description?: string;
  /** Count line shown next to the group, e.g. "4 products". */
  count?: string;
  icon?: IconName;
  links: NavLink[];
}

export interface NavMenu {
  id: string;
  label: string;
  /**
   * "mega" = products panel (category sidebar + app tiles);
   * "simple" = intro column + described cards;
   * "columns" = intro column + titled groups of links.
   */
  kind: "mega" | "simple" | "columns";
  groups: NavGroup[];
  /** Left-hand intro: what this menu covers, with real counts. */
  intro?: { title: string; text: string };
  aside?: { title: string; text: string; cta: NavLink };
  footerLink: NavLink;
}

export function getMainNav(): NavMenu[] {
  const tree = getCatalogTree();
  const featured = getFeaturedProducts(6);

  return [
    {
      id: "products",
      label: "Products",
      kind: "mega",
      // First group = featured apps; then every category with all its products.
      // The menu shows one group at a time (sidebar), so no per-category cap is needed.
      groups: [
        ...(featured.length
          ? [{ title: "Featured Apps", href: routes.products(), icon: "spark" as IconName, count: plural(featured.length, "app"), description: "A selection from across the catalog.", links: featured.map(productLink) }]
          : []),
        ...tree.map(({ category, products }) => ({
          title: category.name,
          href: routes.category(category.slug),
          icon: category.icon,
          description: category.tagline,
          count: plural(products.length, "product"),
          links: products.map(productLink),
        })),
      ],
      aside: {
        title: featured.length ? "Featured" : "One home for business software",
        text: featured.length
          ? featured.map((p) => p.name).join(", ")
          : "Browse every ToyoApps product, organised by what your business needs.",
        cta: { label: "All Products", href: routes.products() },
      },
      footerLink: { label: "All Products", href: routes.products() },
    },
    ...optionalMenus(),
    {
      id: "company",
      label: "Company",
      kind: "simple",
      intro: { title: "Company", text: `The team behind ${getProducts().length} business products, and how to reach us.` },
      groups: [
        {
          title: "Company",
          links: [
            { label: "About ToyoApps", href: routes.company(), icon: "building", description: "Who we are and what we are building." },
            { label: "Publish and Sell Your SaaS", href: routes.publish(), icon: "store", description: "List and sell your SaaS on ToyoApps." },
            { label: "Become a ToyoApps Vendor", href: routes.vendors(), icon: "box", description: "How the vendor relationship works." },
            { label: "Careers", href: routes.careers(), icon: "briefcase", description: "Open roles at ToyoApps." },
          ],
        },
        {
          title: "News & media",
          links: [
            { label: "Blog", href: routes.blog(), icon: "layers", description: "Guides and support topics across our products." },
            { label: "Media and News", href: routes.media(), icon: "megaphone", description: "Company and product updates." },
            { label: "Press Kit", href: routes.pressKit(), icon: "spark", description: "Logos, colours and boilerplates." },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Support", href: routes.support(), icon: "headset", description: "Help with ToyoApps and its products." },
            { label: "Contact Us", href: routes.contactForm(), icon: "chat", description: "Talk to the ToyoApps team." },
          ],
        },
      ],
      footerLink: { label: "Contact Us", href: routes.contactForm() },
    },
  ];
}

/**
 * Menus that exist only when their section has real entries — the header
 * never points to an empty hub.
 */
function optionalMenus(): NavMenu[] {
  const menus: NavMenu[] = [];
  const solutions = getSolutions();
  const industries = getIndustries();
  const integrations = getIntegrations();
  const resources = getResources();

  if (solutions.length)
    menus.push({
      id: "solutions",
      label: "Solutions",
      kind: "simple",
      intro: { title: "Solutions", text: `${plural(solutions.length, "business goal")}, each matched to the ToyoApps products that get it done.` },
      groups: [
        {
          title: "By goal",
          links: solutions.slice(0, 9).map((x) => ({
            label: x.name,
            href: routes.solution(x.slug),
            description: x.summary,
            icon: "layers" as IconName,
            meta: productNames(x.products, "Uses"),
          })),
        },
        {
          title: "Explore",
          links: [
            ...(industries.length ? [{ label: "Industries", href: routes.industries() }] : []),
            { label: "All Products", href: routes.products() },
          ],
        },
      ],
      footerLink: { label: "Solutions", href: routes.solutions() },
    });
  if (industries.length)
    menus.push({
      id: "industries",
      label: "Industries",
      kind: "simple",
      intro: { title: "Industries", text: `ToyoApps products by sector: ${plural(industries.length, "industry").replace(/ys$/, "ies")} with tools picked for how they work.` },
      groups: [
        {
          title: "By industry",
          links: industries.slice(0, 9).map((x) => ({
            label: x.name,
            href: routes.industry(x.slug),
            description: x.summary,
            icon: x.icon ?? ("building" as IconName),
            meta: productNames(x.products, "Products:"),
          })),
        },
        {
          title: "Explore",
          links: [
            ...(solutions.length ? [{ label: "Solutions", href: routes.solutions() }] : []),
            { label: "All Products", href: routes.products() },
          ],
        },
      ],
      footerLink: { label: "Industries", href: routes.industries() },
    });
  if (integrations.length) {
    const categories = [...new Set(integrations.map((i) => i.category))].sort();
    menus.push({
      id: "integrations",
      label: "Integrations",
      kind: "columns",
      intro: {
        title: "Integrations",
        text: `${plural(integrations.length, "integration")} across ${plural(categories.length, "category").replace(/ys$/, "ies")}, connecting ToyoApps products to the tools you already use.`,
      },
      groups: categories.map((c) => {
        const list = integrations.filter((i) => i.category === c);
        return {
          title: c,
          href: `${routes.integrations()}#${anchor(c)}`,
          count: plural(list.length, "integration"),
          links: list.map((i) => ({
            label: i.name,
            href: integrationHasPage(i) ? routes.integration(i.slug) : `${routes.integrations()}#${i.slug}`,
            meta: productNames(i.products, "Works with"),
          })),
        };
      }),
      footerLink: { label: "Integrations", href: routes.integrations() },
    });
  }
  if (resources.length)
    menus.push({
      id: "resources",
      label: "Resources",
      kind: "simple",
      groups: [
        {
          title: "Learn",
          links: resourceTypes
            .filter((r) => getResources(r.type).length)
            .map((r) => ({ label: r.label, href: routes.resourceType(r.type), description: r.description })),
        },
        {
          title: "Support",
          links: [
            { label: "Support", href: routes.support() },
            { label: "Contact Us", href: routes.contactForm() },
          ],
        },
      ],
      footerLink: { label: "Resources", href: routes.resources() },
    });
  return menus;
}

export function getFooterColumns(): NavGroup[] {
  const tree = getCatalogTree();
  const explore: NavLink[] = [
    getSolutions().length && { label: "Solutions", href: routes.solutions() },
    getIndustries().length && { label: "Industries", href: routes.industries() },
    getIntegrations().length && { label: "Integrations", href: routes.integrations() },
    getComparisons().length && { label: "Compare Products", href: routes.compare() },
    getResources().length && { label: "Resources", href: routes.resources() },
  ].filter((l): l is NavLink => !!l);
  return [
    {
      title: "Products",
      links: [
        { label: "All Products", href: routes.products() },
        ...tree.map(({ category }) => ({ label: category.name, href: routes.category(category.slug) })),
      ],
    },
    ...(explore.length ? [{ title: "Explore", links: explore }] : []),
    {
      title: "Company",
      links: [
        { label: "About ToyoApps", href: routes.company() },
        { label: "Publish and Sell Your SaaS", href: routes.publish() },
        { label: "Become a ToyoApps Vendor", href: routes.vendors() },
        { label: "Careers", href: routes.careers() },
        { label: "Media and News", href: routes.media() },
        { label: "Press Kit", href: routes.pressKit() },
        { label: "Blog", href: routes.blog() },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Support", href: routes.support() },
        { label: "Contact Us", href: routes.contactForm() },
      ],
    },
  ];
}
