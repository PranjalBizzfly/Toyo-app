import type { MetadataRoute } from "next";
import {
  featureHasPage,
  getCategories,
  getFeatureGroupsWithPages,
  integrationHasPage,
  isCategoryIndexable,
  getComparisons,
  getFeatures,
  getIndustries,
  getIntegrations,
  getProducts,
  getResources,
  getSolutions,
  isIndexable,
} from "@/lib/catalog";
import { getAvailableSections, getProductItems, itemSections } from "@/lib/product-sections";
import { resourceTypes, routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

/**
 * Generated from content: only published, indexable pages with real content.
 * Next splits into multiple sitemaps automatically via generateSitemaps if
 * this ever exceeds 50k URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string, priority = 0.5): MetadataRoute.Sitemap[number] => ({ url: absoluteUrl(path), priority });
  const pub = <T extends { status?: Parameters<typeof isIndexable>[0] }>(xs: T[]) => xs.filter((x) => isIndexable(x.status));

  const products = pub(getProducts());
  const entries: MetadataRoute.Sitemap = [
    url("/", 1),
    url(routes.products(), 0.9),
    ...(getResources().length ? [url(routes.resources(), 0.6)] : []),
    url(routes.company(), 0.4),
    url(routes.publish(), 0.6),
    url(routes.support(), 0.4),
    url(routes.contact(), 0.5),
    ...getCategories().filter(isCategoryIndexable).map((c) => url(routes.category(c.slug), 0.8)),
    ...products.flatMap((p) => [
      ...getAvailableSections(p).map((s) => url(routes.productSection(p.slug, s), s === "overview" ? 0.9 : 0.6)),
      ...pub(getFeatures(p))
        .filter(featureHasPage)
        .map((f) => url(routes.feature(p.slug, f.slug), 0.6)),
      ...getFeatureGroupsWithPages(p).map((g) => url(routes.featureGroup(p.slug, g.group.slug), 0.6)),
      ...itemSections.flatMap((s) => getProductItems(p, s).filter((i) => i.hasPage).map((i) => url(routes.productItem(p.slug, s, i.slug), 0.6))),
    ]),
  ];

  const hubs: [string, unknown[]][] = [
    [routes.solutions(), getSolutions()],
    [routes.industries(), getIndustries()],
    [routes.integrations(), getIntegrations()],
    [routes.compare(), getComparisons()],
  ];
  hubs.forEach(([path, items]) => items.length && entries.push(url(path, 0.7)));

  entries.push(
    ...pub(getSolutions()).map((s) => url(routes.solution(s.slug), 0.7)),
    ...pub(getIndustries()).map((s) => url(routes.industry(s.slug), 0.7)),
    ...pub(getIntegrations()).filter(integrationHasPage).map((s) => url(routes.integration(s.slug), 0.5)),
    ...pub(getComparisons()).map((s) => url(routes.comparison(s.slug), 0.6)),
    ...resourceTypes.filter((t) => getResources(t.type).length).map((t) => url(routes.resourceType(t.type), 0.5)),
    ...pub(getResources()).map((r) => ({ ...url(routes.resource(r.type, r.slug), 0.5), lastModified: r.publishedAt })),
  );
  return entries;
}
