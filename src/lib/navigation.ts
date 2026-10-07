import { getCatalogTree, getComparisons, getFeaturedProducts, getIndustries, getIntegrations, getResources, getSolutions } from "./catalog";
import { resourceTypes, routes } from "./routes";

/**
 * Navigation model. Built entirely from content, so a new product, category,
 * solution or industry appears in the header, mobile menu and footer
 * automatically. Serializable — safe to pass to client components.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  href?: string;
  links: NavLink[];
}

export interface NavMenu {
  id: string;
  label: string;
  /** "mega" = grouped columns + aside; "simple" = flat list of described links. */
  kind: "mega" | "simple";
  groups: NavGroup[];
  aside?: { title: string; text: string; cta: NavLink };
  footerLink: NavLink;
}

/** Max products listed per category in the mega menu; the rest live on the category page. */
const PER_CATEGORY = 4;

export function getMainNav(): NavMenu[] {
  const tree = getCatalogTree();
  const featured = getFeaturedProducts(3);

  return [
    {
      id: "products",
      label: "Products",
      kind: "mega",
      groups: tree.map(({ category, products }) => ({
        title: category.name,
        href: routes.category(category.slug),
        links: [
          ...products.slice(0, PER_CATEGORY).map((p) => ({
            label: p.name,
            href: routes.product(p.slug),
            description: p.shortDescription,
          })),
          ...(products.length > PER_CATEGORY
            ? [{ label: `All ${category.name} →`, href: routes.category(category.slug) }]
            : []),
        ],
      })),
      aside: {
        title: featured.length ? "Featured" : "One home for business software",
        text: featured.length
          ? featured.map((p) => p.name).join(", ")
          : "Browse every ToyoApps product, organised by what your business needs.",
        cta: { label: "View all products", href: routes.products() },
      },
      footerLink: { label: "View all products", href: routes.products() },
    },
    ...optionalMenus(),
    {
      id: "company",
      label: "Company",
      kind: "simple",
      groups: [
        {
          title: "Company",
          links: [
            { label: "About ToyoApps", href: routes.company(), description: "Who we are and what we are building." },
            { label: "Publish your software", href: routes.publish(), description: "List and sell your SaaS on ToyoApps." },
            { label: "Support", href: routes.support(), description: "Help with ToyoApps and its products." },
            { label: "Contact", href: routes.contact(), description: "Talk to the ToyoApps team." },
          ],
        },
      ],
      footerLink: { label: "Contact us", href: routes.contact() },
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
      groups: [{ title: "Solutions", links: solutions.slice(0, 8).map((x) => ({ label: x.name, href: routes.solution(x.slug), description: x.summary })) }],
      footerLink: { label: "All solutions", href: routes.solutions() },
    });
  if (industries.length)
    menus.push({
      id: "industries",
      label: "Industries",
      kind: "simple",
      groups: [{ title: "Industries", links: industries.slice(0, 8).map((x) => ({ label: x.name, href: routes.industry(x.slug), description: x.summary })) }],
      footerLink: { label: "All industries", href: routes.industries() },
    });
  if (integrations.length) {
    const categories = [...new Set(integrations.map((i) => i.category))].sort();
    menus.push({
      id: "integrations",
      label: "Integrations",
      kind: "simple",
      groups: [
        {
          title: "Integrations",
          links: categories.map((c) => ({
            label: c,
            href: `${routes.integrations()}#${c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
            description: integrations
              .filter((i) => i.category === c)
              .map((i) => i.name)
              .join(", "),
          })),
        },
      ],
      footerLink: { label: "All integrations", href: routes.integrations() },
    });
  }
  if (resources.length)
    menus.push({
      id: "resources",
      label: "Resources",
      kind: "simple",
      groups: [
        {
          title: "Resources",
          links: resourceTypes
            .filter((r) => getResources(r.type).length)
            .map((r) => ({ label: r.label, href: routes.resourceType(r.type), description: r.description })),
        },
      ],
      footerLink: { label: "Resource centre", href: routes.resources() },
    });
  return menus;
}

export function getFooterColumns(): NavGroup[] {
  const tree = getCatalogTree();
  const explore: NavLink[] = [
    getSolutions().length && { label: "Solutions", href: routes.solutions() },
    getIndustries().length && { label: "Industries", href: routes.industries() },
    getIntegrations().length && { label: "Integrations", href: routes.integrations() },
    getComparisons().length && { label: "Compare products", href: routes.compare() },
    getResources().length && { label: "Resources", href: routes.resources() },
  ].filter((l): l is NavLink => !!l);
  return [
    {
      title: "Products",
      links: [
        { label: "All products", href: routes.products() },
        ...tree.map(({ category }) => ({ label: category.name, href: routes.category(category.slug) })),
      ],
    },
    ...(explore.length ? [{ title: "Explore", links: explore }] : []),
    {
      title: "Company",
      links: [
        { label: "About", href: routes.company() },
        { label: "Publish your software", href: routes.publish() },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help & support", href: routes.support() },
        { label: "Contact", href: routes.contact() },
      ],
    },
  ];
}
