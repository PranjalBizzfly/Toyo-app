/**
 * Page FAQs — every public page shows exactly FAQ_COUNT questions.
 *
 * Rules (see docs/TOYOAPPS_FAQ_AUDIT.md):
 * - Hand-written FAQs from the content files always come first.
 * - The rest are composed ONLY from verified fields already in src/content
 *   (summaries, steps, capabilities, problems, audiences, plans, security
 *   measures, linked products…). Nothing is invented: a question is only
 *   offered when the data to answer it exists.
 * - Each page type draws first on its own subject, then on its parent
 *   (feature → group → product → category → site) so answers stay on-topic.
 * - No duplicate questions on a page; answers under 10 words are skipped.
 */
import type { Faq, Feature, Product, ProductIntegration, ProductResource } from "@/content/types";
import { brandPalette, hiringSteps, jobs } from "@/content/company";
import { publisherSteps, site } from "@/content/site";
import {
  getCatalogTree,
  getCategories,
  getCategory,
  getComparisons,
  getConnections,
  getFeatures,
  getIndustries,
  getIntegrations,
  getProduct,
  getProducts,
  getResources,
  getSolutions,
  groupFeatures,
} from "@/lib/catalog";
import { platformLabels } from "@/lib/product-cta";
import { getAvailableSections, getProductItems, getProductSectionData, type ItemSection } from "@/lib/product-sections";

export const FAQ_COUNT = 8;

type QA = Faq | null | undefined | false | 0 | "";

/* ------------------------------------------------------------------ text */

const clean = (t: string) => t.replace(/\s+/g, " ").trim();
const end = (t: string) => {
  const c = clean(t);
  return /[.!?)]$/.test(c) ? c : `${c}.`;
};
const lower = (t: string) => (/^[A-Z][a-z]/.test(t) ? t[0].toLowerCase() + t.slice(1) : t);
const join = (xs: string[]) => {
  const a = xs.map(clean).filter(Boolean);
  if (a.length <= 1) return a[0] ?? "";
  return `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;
};
const numbered = (xs: string[]) => xs.map((x, i) => `(${i + 1}) ${end(x)}`).join(" ");
const words = (t: string) => clean(t).split(" ").length;
/** Trim very long answers at a sentence boundary (~110 words). */
const cap = (t: string, max = 110) => {
  const s = clean(t);
  if (words(s) <= max) return s;
  const parts = s.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const p of parts) {
    if (words(`${out} ${p}`) > max && out) break;
    out = `${out} ${p}`.trim();
  }
  return out;
};
const qa = (question: string, answer: string | undefined | false | null): QA => {
  if (!answer) return null;
  const a = cap(answer);
  return words(a) >= 10 ? { question: clean(question), answer: a } : null;
};
const norm = (q: string) => q.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Own FAQs first, then pools in order; unique questions; exactly FAQ_COUNT when data allows. */
function finalize(own: Faq[] | undefined, ...pools: QA[][]): Faq[] {
  const out: Faq[] = [];
  const seenQ = new Set<string>();
  const seenA = new Set<string>();
  const push = (f: Faq) => {
    const k = norm(f.question);
    const a = norm(f.answer).slice(0, 120);
    if (seenQ.has(k) || seenA.has(a) || out.length >= FAQ_COUNT) return;
    seenQ.add(k);
    seenA.add(a);
    out.push({ question: clean(f.question), answer: clean(f.answer) });
  };
  for (const f of own ?? []) push(f);
  for (const pool of pools) for (const f of pool) if (f) push(f);
  return out;
}

/* -------------------------------------------------------------- products */

const host = (p: Product) => new URL(p.websiteUrl).hostname.replace(/^www\./, "");
const productIntegrations = (p: Product) => getProductSectionData(p).integrations.map((i) => i.name);

/** Verified, product-level facts, phrased about the product. Used by every product page as a fallback. */
function productPool(p: Product): QA[] {
  const groups = groupFeatures(p);
  const feats = getFeatures(p);
  const plans = p.pricing?.plans ?? [];
  const integ = productIntegrations(p);
  const conns = getConnections(p);
  const category = getCategory(p.category);
  return [
    qa(`What is ${p.name}?`, `${end(p.shortDescription)} ${p.longDescription ? end(p.longDescription.split(/\n\s*\n/)[0]) : ""}`),
    p.audience?.length && qa(`Who is ${p.name} built for?`, `${p.name} is built for ${join(p.audience)}.${p.primaryUseCase ? ` Its main job: ${lower(end(p.primaryUseCase))}` : ""}`),
    groups.length > 1 &&
      qa(`What does ${p.name} cover?`, `${p.name} has ${feats.length} documented features across ${groups.length} areas: ${join(groups.map((g) => `${g.group.name} (${g.features.length})`))}.`),
    p.howItWorks?.length && qa(`How do I get started with ${p.name}?`, `Setup follows ${p.howItWorks.length} steps: ${numbered(p.howItWorks.map((h) => `${h.title}: ${h.description}`))}`),
    plans.length > 0 &&
      qa(
        `How much does ${p.name} cost?`,
        `${p.name} lists ${plans.length} plan${plans.length > 1 ? "s" : ""}: ${join(plans.map((pl) => `${pl.name} at ${pl.price}${pl.period ? ` per ${pl.period}` : ""}`))}.${p.pricing?.note ? ` ${end(p.pricing.note)}` : ""} Prices are as published on ${host(p)}.`,
      ),
    p.pricing?.trial && qa(`Is there a free trial of ${p.name}?`, `${end(p.pricing.trial)} Plans and the current offer are confirmed on ${host(p)} at sign-up.`),
    p.platforms?.length && qa(`Which platforms does ${p.name} run on?`, `${p.name} is available on ${join(p.platforms.map((x) => platformLabels[x] ?? x))}${p.market ? `, and its primary market is ${p.market}` : ""}.`),
    p.security?.length && qa(`How does ${p.name} protect data?`, `${p.name} describes these measures: ${p.security.map((x) => `${x.title}: ${end(lower(x.description))}`).join(" ")}`),
    integ.length > 0 && qa(`Which tools does ${p.name} integrate with?`, `${p.name} connects with ${join(integ)}. Each integration is listed with what it does on the ${p.name} integrations pages.`),
    conns.length > 0 && qa(`Does ${p.name} work with other ToyoApps products?`, conns.map((c) => `With ${c.product.name}: ${end(lower(c.description))}`).join(" ")),
    p.benefits?.length && qa(`Why do teams choose ${p.name}?`, p.benefits.slice(0, 4).map((b) => `${b.title}: ${end(lower(b.description))}`).join(" ")),
    p.useCases?.length && qa(`What are common ways to use ${p.name}?`, p.useCases.slice(0, 4).map((u) => `${u.title}: ${end(lower(u.description))}`).join(" ")),
    category && qa(`Which ToyoApps category is ${p.name} in?`, `${p.name} is listed under ${category.name}: ${lower(end(category.tagline))} You can compare it with the other ${category.name} products in that category.`),
    qa(`Where do I sign up for ${p.name}?`, `${p.name} runs on its own website, ${host(p)}. ToyoApps describes the product and links you there to sign up, start a plan or contact its team.`),
    ...feats.slice(0, 10).map((f) => qa(`What does ${f.name} do in ${p.name}?`, `${end(f.summary)}${f.capabilities?.length ? ` It includes ${join(f.capabilities.slice(0, 3).map(lower))}.` : ""}`)),
  ];
}

export function getProductFaqs(p: Product): Faq[] {
  return finalize(p.faqs, productPool(p));
}

/* -------------------------------------------------------------- features */

function featurePool(p: Product, f: Feature): QA[] {
  const group = groupFeatures(p).find((g) => g.features.some((x) => x.slug === f.slug));
  const related = (f.relatedFeatures ?? []).map((s) => getFeatures(p).find((x) => x.slug === s)).filter((x): x is Feature => !!x);
  const integ = (f.integrations ?? []).map((s) => getIntegrations().find((i) => i.slug === s)?.name ?? s);
  return [
    qa(`What is ${f.name} in ${p.name}?`, `${end(f.summary)} ${f.body?.[0] ? end(f.body[0]) : ""}`),
    f.problem && qa(`What problem does ${f.name} solve?`, `${end(f.problem)} ${f.name} addresses it: ${lower(end(f.summary))}`),
    f.howItWorks?.length && qa(`How does ${f.name} work?`, numbered(f.howItWorks)),
    f.capabilities?.length && qa(`What can you do with ${f.name}?`, `${f.name} includes: ${join(f.capabilities.slice(0, 6).map((c) => lower(clean(c))))}.`),
    f.audience?.length && qa(`Who uses ${f.name}?`, `${f.name} is used by ${join(f.audience)}: ${lower(end(f.summary))}`),
    f.benefits?.length && qa(`What are the benefits of ${f.name}?`, f.benefits.slice(0, 4).map(end).join(" ")),
    f.useCases?.length && qa(`When would a team use ${f.name}?`, f.useCases.slice(0, 3).map((u) => `${u.title}: ${end(lower(u.description))}`).join(" ")),
    f.body?.[1] && qa(`What else should I know about how ${f.name} behaves?`, `${end(f.body[1])} ${f.body[2] ? end(f.body[2]) : ""}`),
    integ.length > 0 && qa(`Which integrations does ${f.name} use?`, `${f.name} works with ${join(integ)}, as described on the ${p.name} feature page and its source.`),
    related.length > 0 && qa(`Which ${p.name} features work alongside ${f.name}?`, related.slice(0, 3).map((r) => `${r.name}: ${end(lower(r.summary))}`).join(" ")),
    group &&
      qa(
        `Where does ${f.name} sit in ${p.name}?`,
        `${f.name} is part of the ${group.group.name} area${group.group.description ? `, which covers ${lower(end(group.group.description))}` : "."} Other features there include ${join(group.features.filter((x) => x.slug !== f.slug).slice(0, 4).map((x) => x.name))}.`,
      ),
    ...(f.faqs ?? []).map((x) => x),
  ];
}

export function getFeatureFaqs(p: Product, f: Feature): Faq[] {
  return finalize(f.faqs, featurePool(p, f), productPool(p));
}

export function getFeatureGroupFaqs(p: Product, groupSlug: string): Faq[] {
  const g = groupFeatures(p).find((x) => x.group.slug === groupSlug);
  if (!g) return getProductFaqs(p);
  const pool: QA[] = [
    qa(`What is the ${g.group.name} area of ${p.name}?`, `${g.group.description ? end(g.group.description) : ""} ${g.group.body?.[0] ? end(g.group.body[0]) : ""} It brings together ${g.features.length} features: ${join(g.features.map((f) => f.name))}.`),
    g.group.body?.[1] && qa(`How do the ${g.group.name} features work together?`, `${end(g.group.body[1])} ${g.group.body[2] ? end(g.group.body[2]) : ""}`),
    ...g.features.map((f) =>
      qa(`What does ${f.name} do?`, `${end(f.summary)}${f.capabilities?.length ? ` It includes ${join(f.capabilities.slice(0, 3).map(lower))}.` : ""}${f.howItWorks?.[0] ? ` It starts with: ${lower(end(f.howItWorks[0]))}` : ""}`),
    ),
  ];
  return finalize(undefined, pool, productPool(p));
}

export function getFeaturesHubFaqs(p: Product): Faq[] {
  const groups = groupFeatures(p);
  const feats = getFeatures(p);
  const pool: QA[] = [
    qa(`How many features does ${p.name} have?`, `This page lists ${feats.length} ${p.name} features across ${groups.length} area${groups.length > 1 ? "s" : ""}: ${join(groups.map((g) => `${g.group.name} (${g.features.length})`))}. Each feature links to its own page where one exists.`),
    ...groups.map((g) =>
      qa(`What is in the ${g.group.name} area?`, `${g.group.description ? end(g.group.description) : ""} It includes ${join(g.features.slice(0, 6).map((f) => f.name))}${g.features.length > 6 ? ` and ${g.features.length - 6} more` : ""}.`),
    ),
  ];
  return finalize(undefined, pool, productPool(p));
}

/* ------------------------------------------------- product section pages */

export function getProductSectionFaqs(p: Product, section: string, own?: Faq[]): Faq[] {
  const pool: QA[] = [];
  if (section === "pricing" && p.pricing) {
    const pr = p.pricing;
    pool.push(
      qa(`What plans does ${p.name} offer?`, `${p.name} lists ${pr.plans.length} plans: ${join(pr.plans.map((pl) => `${pl.name} (${pl.price}${pl.period ? ` per ${pl.period}` : ""})`))}.${pr.note ? ` ${end(pr.note)}` : ""}`),
      ...pr.plans.map((pl) =>
        qa(`What does the ${pl.name} plan include?`, `${pl.name} is ${pl.price}${pl.period ? ` per ${pl.period}` : ""}.${pl.description ? ` ${end(pl.description)}` : ""}${pl.features.length ? ` It includes ${join(pl.features.slice(0, 6).map(lower))}.` : ""}`),
      ),
      pr.trial && qa(`Can I try ${p.name} before paying?`, `${end(pr.trial)} The trial terms are set by ${p.name} and confirmed on ${host(p)}.`),
      qa(`Where do these ${p.name} prices come from?`, `They are taken from ${p.name}'s official pricing page (${pr.sourceUrl}) as checked on ${pr.asOf}. Billing and the final price are confirmed on ${host(p)} at checkout.`),
      pr.plans.some((x) => x.recommended) &&
        qa(`Which ${p.name} plan is most popular?`, `${pr.plans.find((x) => x.recommended)!.name} is marked as the most popular plan. ${pr.plans.find((x) => x.recommended)!.description ? end(pr.plans.find((x) => x.recommended)!.description!) : ""}`),
    );
  }
  if (section === "security" && p.security?.length) {
    pool.push(
      qa(`How does ${p.name} keep data secure?`, `${p.name} describes ${p.security.length} security and privacy measures: ${join(p.security.map((s) => s.title))}. Each is explained on this page as the product states it.`),
      ...p.security.map((s) => qa(`${s.title}: what does ${p.name} do?`, `${end(s.description)} This is how ${p.name} describes its ${lower(s.title)} on its official site.`)),
    );
  }
  if ((["solutions", "industries", "integrations", "compare", "resources", "support"] as string[]).includes(section)) {
    const items = getProductItems(p, section as ItemSection);
    const label = { solutions: "solutions", industries: "industries", integrations: "integrations", compare: "comparisons", resources: "resources", support: "support topics" }[section]!;
    pool.push(
      items.length > 0 && qa(`Which ${p.name} ${label} are covered here?`, `This page lists ${items.length} ${label}: ${join(items.map((i) => i.name))}. Each has its own page with the full detail.`),
      ...items.map((i) => qa(`What is "${i.name}"?`, `${end(i.summary)}${(i as { body?: string[] }).body?.[0] ? ` ${end((i as { body?: string[] }).body![0])}` : ""}`)),
    );
  }
  return finalize(own, pool, productPool(p));
}

/* -------------------------------------------------- product item pages */

export function getProductItemFaqs(p: Product, section: ItemSection, item: Record<string, unknown> & { name: string; summary: string; faqs?: Faq[]; body?: string[] }): Faq[] {
  const it = item as Record<string, never> & typeof item;
  const arr = (k: string) => (Array.isArray(it[k]) ? (it[k] as unknown[]).filter((x): x is string => typeof x === "string") : []);
  const n = item.name;
  const pool: QA[] = [qa(`What is "${n}"?`, `${end(item.summary)} ${item.body?.[0] ? end(item.body[0]) : ""}`)];
  if (item.body?.[1]) pool.push(qa(`What should I know about "${n}"?`, `${end(item.body[1])} ${item.body[2] ? end(item.body[2]) : ""}`));
  if (section === "solutions") {
    pool.push(
      typeof it.problem === "string" && qa(`What problem does this ${p.name} solution address?`, `${end(it.problem as string)} ${n} is ${p.name}'s answer to it.`),
      arr("approach").length && qa(`How does ${p.name} approach "${n}"?`, numbered(arr("approach"))),
      arr("workflow").length && qa(`What is the workflow for "${n}"?`, numbered(arr("workflow"))),
      arr("benefits").length && qa(`What are the benefits of "${n}"?`, arr("benefits").slice(0, 4).map(end).join(" ")),
      arr("audience").length && qa(`Who is "${n}" for?`, `This solution is for ${join(arr("audience"))} using ${p.name}. ${end(item.summary)}`),
    );
  }
  if (section === "industries") {
    pool.push(
      arr("challenges").length && qa(`What challenges does this industry face?`, `${p.name} names these challenges for ${n}: ${arr("challenges").slice(0, 4).map(end).join(" ")}`),
      arr("howItHelps").length && qa(`How does ${p.name} help ${n}?`, arr("howItHelps").slice(0, 4).map(end).join(" ")),
      ...((it.useCases as { title: string; description: string }[] | undefined) ?? []).slice(0, 3).map((u) => qa(`How is ${p.name} used for ${lower(u.title)}?`, end(u.description))),
    );
  }
  if (section === "integrations") {
    const ig = item as unknown as ProductIntegration;
    pool.push(
      ig.connects && qa(`What does the ${n} integration connect?`, `${end(ig.connects)} It links ${p.name} with ${n} so the two stay in step.`),
      ig.workflow?.length && qa(`How does the ${n} integration work?`, numbered(ig.workflow)),
      ig.setup?.length && qa(`How do I set up ${n} with ${p.name}?`, numbered(ig.setup)),
      ig.benefits?.length && qa(`Why connect ${n} to ${p.name}?`, ig.benefits.slice(0, 4).map(end).join(" ")),
    );
  }
  if (section === "compare") {
    const competitor = typeof it.competitor === "string" ? (it.competitor as string) : "the alternative";
    const rows = (it.rows as { criterion: string; product: string; competitor: string }[] | undefined) ?? [];
    pool.push(
      arr("differences").length && qa(`How is ${p.name} different from ${competitor}?`, arr("differences").slice(0, 4).map(end).join(" ")),
      ...rows.slice(0, 6).map((r) => qa(`How do ${p.name} and ${competitor} compare on ${lower(r.criterion)}?`, `${p.name}: ${end(r.product)} ${competitor}: ${end(r.competitor)}`)),
    );
  }
  if (section === "resources" || section === "support") {
    const r = item as unknown as ProductResource;
    pool.push(
      r.steps?.length && qa(`What are the steps in "${n}"?`, numbered(r.steps)),
      r.keyPoints?.length && qa(`What are the key points of "${n}"?`, r.keyPoints.slice(0, 5).map(end).join(" ")),
    );
  }
  pool.push(...arr("features").slice(0, 3).map((s) => {
    const f = getFeatures(p).find((x) => x.slug === s || x.name === s);
    return f ? qa(`How does ${f.name} relate to "${n}"?`, `${f.name}: ${lower(end(f.summary))} It is one of the ${p.name} features this page draws on.`) : null;
  }));
  return finalize(item.faqs, pool, productPool(p));
}

/* ------------------------------------------------- global entity pages */

function productPitch(slugs: string[], topic: string): QA[] {
  return slugs
    .map((s) => getProduct(s))
    .filter((x): x is Product => !!x)
    .map((p) => qa(`How does ${p.name} help with ${topic}?`, `${end(p.shortDescription)}${p.primaryUseCase ? ` Main use case: ${lower(end(p.primaryUseCase))}` : ""}`));
}

export function getSolutionFaqs(slug: string): Faq[] {
  const s = getSolutions().find((x) => x.slug === slug);
  if (!s) return [];
  const ps = s.products.map((x) => getProduct(x)).filter((x): x is Product => !!x);
  return finalize(
    s.faqs,
    [
      qa(`What problem does "${s.name}" address?`, `${end(s.problem)} ${end(s.summary)}`),
      qa(`How does ToyoApps approach "${s.name}"?`, `${end(s.approach)} ${s.body?.[0] ? end(s.body[0]) : ""}`),
      ps.length > 0 && qa(`Which ToyoApps products are part of this solution?`, `${join(ps.map((p) => p.name))}. ${ps.map((p) => `${p.name}: ${lower(end(p.shortDescription))}`).join(" ")}`),
      s.body?.[1] && qa(`What else does this solution cover?`, `${end(s.body[1])} ${s.body[2] ? end(s.body[2]) : ""}`),
      qa(`Do I have to adopt every product in this solution?`, `No. ToyoApps describes the products as independent: you can adopt one or several of ${join(ps.map((p) => p.name))}, and each runs on its own website.`),
      ...productPitch(s.products, lower(s.name)),
    ],
    ps.flatMap((p) => productPool(p).slice(0, 4)),
    siteHubPool(),
  );
}

export function getIndustryFaqs(slug: string): Faq[] {
  const ind = getIndustries().find((x) => x.slug === slug);
  if (!ind) return [];
  const ps = ind.products.map((x) => getProduct(x)).filter((x): x is Product => !!x);
  return finalize(
    ind.faqs,
    [
      qa(`Which ToyoApps products are built for ${ind.name}?`, `${join(ps.map((p) => p.name))}. ${end(ind.summary)}`),
      ind.challenges?.length && qa(`What challenges do ${ind.name} face?`, `The challenges described for ${ind.name}: ${ind.challenges.slice(0, 4).map(end).join(" ")}`),
      ind.body?.[0] && qa(`How does ToyoApps serve ${ind.name}?`, `${end(ind.body[0])} ${ind.body[1] ? end(ind.body[1]) : ""}`),
      ...productPitch(ind.products, lower(ind.name)),
      ...ps.flatMap((p) => (p.productIndustries ?? []).filter((pi) => norm(pi.name).includes(norm(ind.name).split(" ")[0])).map((pi) => qa(`What does ${p.name} offer for ${pi.name}?`, `${end(pi.summary)}${pi.howItHelps?.length ? ` ${pi.howItHelps.slice(0, 2).map(end).join(" ")}` : ""}`))),
      ...ps.flatMap((p) => getFeatures(p).filter((f) => f.highlight).slice(0, 2).map((f) => qa(`What does ${p.name}'s ${f.name} feature do?`, end(f.summary) + (f.capabilities?.length ? ` It includes ${join(f.capabilities.slice(0, 3).map(lower))}.` : "")))),
    ],
    ps.flatMap((p) => productPool(p).slice(0, 4)),
    siteHubPool(),
  );
}

export function getIntegrationFaqs(slug: string): Faq[] {
  const ig = getIntegrations().find((x) => x.slug === slug);
  if (!ig) return [];
  const ps = ig.products.map((x) => getProduct(x)).filter((x): x is Product => !!x);
  const details = ps.flatMap((p) => (p.productIntegrations ?? []).filter((x) => x.registry === ig.slug || norm(x.name).includes(norm(ig.name))).map((d) => ({ p, d })));
  return finalize(
    ig.faqs,
    [
      qa(`What is the ${ig.name} integration?`, `${end(ig.summary)} ${ig.body?.[0] ? end(ig.body[0]) : ""}`),
      ps.length > 0 && qa(`Which ToyoApps products connect to ${ig.name}?`, `${join(ps.map((p) => p.name))}. ${ps.map((p) => `${p.name}: ${lower(end(p.shortDescription))}`).join(" ")}`),
      qa(`What kind of integration is ${ig.name}?`, `${ig.name} is listed under ${ig.category}${ig.vendor ? `, from ${ig.vendor}` : ""}. ${end(ig.summary)}`),
      ig.body?.[1] && qa(`How does the ${ig.name} connection work?`, `${end(ig.body[1])} ${ig.body[2] ? end(ig.body[2]) : ""}`),
      ...details.flatMap(({ p, d }) => [
        d.connects && qa(`What does ${p.name} do with ${ig.name}?`, `${end(d.connects)} ${end(d.summary)}`),
        d.setup?.length && qa(`How do I set up ${ig.name} in ${p.name}?`, numbered(d.setup)),
        d.workflow?.length && qa(`What is the ${p.name} and ${ig.name} workflow?`, numbered(d.workflow)),
      ]),
      ig.docsUrl && qa(`Where is the ${ig.name} documentation?`, `${ig.name}'s own documentation is at ${ig.docsUrl}. The ToyoApps page summarises what each product does with it.`),
      ...ps.map((p) => qa(`Where do I start with ${p.name}?`, `${end(p.shortDescription)} ${p.name} runs on ${host(p)}, where you sign up and connect ${ig.name}.`)),
    ],
    ps.flatMap((p) => getFeatures(p).filter((f) => f.integrations?.includes(ig.slug)).map((f) => qa(`How does ${p.name}'s ${f.name} use ${ig.name}?`, `${end(f.summary)}${f.howItWorks?.length ? ` ${numbered(f.howItWorks.slice(0, 3))}` : ""}`))),
    ps.flatMap((p) => productPool(p).slice(0, 4)),
    siteHubPool(),
  );
}

export function getResourceFaqs(slug: string): Faq[] {
  const r = getResources().find((x) => x.slug === slug);
  if (!r) return [];
  const ps = (r.products ?? []).map((x) => getProduct(x)).filter((x): x is Product => !!x);
  return finalize(
    r.faqs,
    [
      qa(`What is "${r.name}" about?`, `${end(r.summary)} ${r.body?.[0] ? end(r.body[0]) : ""}`),
      ...(r.body ?? []).slice(1, 6).map((b, i) => qa(i === 0 ? `What is the main point of "${r.name}"?` : `What does "${r.name}" explain next (part ${i + 1})?`, end(b))),
      ps.length > 0 && qa(`Which products does "${r.name}" relate to?`, `${join(ps.map((p) => p.name))}. ${ps.map((p) => `${p.name}: ${lower(end(p.shortDescription))}`).join(" ")}`),
      qa(`When was "${r.name}" published?`, `It was published on ${r.publishedAt}${r.author ? ` by ${r.author}` : ""} in the ToyoApps ${r.type} section.`),
      ...productPitch(r.products ?? [], lower(r.name)),
    ],
    siteHubPool(),
  );
}

export function getComparisonFaqs(slug: string): Faq[] {
  const c = getComparisons().find((x) => x.slug === slug);
  if (!c) return [];
  return finalize(
    c.faqs,
    [
      qa(`What does this comparison cover?`, `${end(c.summary)} It compares ${join(c.subjects)} on ${c.rows.length} criteria.`),
      ...c.rows.map((r) => qa(`How do ${join(c.subjects)} compare on ${lower(r.criterion)}?`, c.subjects.map((s, i) => `${s}: ${end(r.values[i] ?? "not stated")}`).join(" "))),
      ...(c.body ?? []).slice(0, 2).map((b, i) => qa(i ? `What else should I weigh between ${join(c.subjects)}?` : `How should I read this comparison?`, end(b))),
    ],
    siteHubPool(),
  );
}

/* --------------------------------------------------- hubs & site pages */

function siteHubPool(): QA[] {
  const products = getProducts();
  const tree = getCatalogTree();
  const feats = products.reduce((n, p) => n + getFeatures(p).length, 0);
  return [
    qa(`What is ${site.name}?`, site.description),
    qa(`How is software organised on ${site.name}?`, `Products are grouped into ${tree.length} business areas: ${join(tree.map((t) => `${t.category.name} (${t.products.length})`))}. Each product page links to its features, plans and support.`),
    qa(`How many products are on ${site.name}?`, `The catalog currently lists ${products.length} products with ${feats} documented features between them: ${join(products.map((p) => p.name))}.`),
    qa(`Where do I sign up for a product?`, `Each product runs on its own website. ${site.name} describes the product, its features and plans, and links to the official site where you sign up or contact its team.`),
    qa(`Can I sell my own software on ${site.name}?`, `Yes. Software makers can list and sell on ${site.name}: ${numbered(publisherSteps.map((s) => `${s.title}: ${s.description}`))}`),
    qa(`How do I find the right product?`, `Browse by business area, start from the problem on the solutions pages, look at software matched to your industry, or use search, which covers products, features, solutions, integrations and FAQs.`),
    qa(`How are product details verified?`, `Product information is written from each product's own public pages and dated when last checked. Features, prices and integrations are only listed when the product's official source states them.`),
    qa(`How do I contact ${site.name}?`, `Use the contact page and pick the topic closest to yours (choosing software, buying for your team, or publishing your own product), so the right person replies.`),
  ];
}

export function getCategoryFaqs(slug: string): Faq[] {
  const c = getCategory(slug);
  if (!c) return finalize(undefined, siteHubPool());
  const ps = getProducts().filter((p) => p.category === slug || p.secondaryCategories?.includes(slug));
  return finalize(
    c.faqs,
    [
      qa(`What does the ${c.name} category cover?`, `${end(c.tagline)} ${end(c.description)}`),
      ps.length > 0 && qa(`Which products are in ${c.name}?`, `${join(ps.map((p) => p.name))}. ${ps.slice(0, 4).map((p) => `${p.name}: ${lower(end(p.shortDescription))}`).join(" ")}`),
      ...(c.problems ?? []).map((pr) => qa(`How does ${site.name} help with ${lower(pr.title)}?`, end(pr.description))),
      ...ps.map((p) => qa(`What is ${p.name}?`, `${end(p.shortDescription)}${p.primaryUseCase ? ` Main use case: ${lower(end(p.primaryUseCase))}` : ""}`)),
    ],
    siteHubPool(),
  );
}

export type SitePage =
  | "home" | "products" | "solutions" | "industries" | "integrations" | "resources" | "compare"
  | "company" | "careers" | "vendors" | "publish" | "contact" | "support" | "media" | "press-kit" | "blog" | "search" | "legal";

export function getSiteFaqs(page: SitePage, own?: Faq[]): Faq[] {
  const sols = getSolutions();
  const inds = getIndustries();
  const ints = getIntegrations();
  const res = getResources();
  const cats = getCategories();
  const products = getProducts();
  const P: Partial<Record<SitePage, QA[]>> = {
    solutions: [
      qa(`What is a ToyoApps solution?`, `A solution starts from a common business problem, describes the approach that addresses it and names the ToyoApps products that cover each part.`),
      ...sols.map((s) => qa(`What does "${s.name}" solve?`, `${end(s.problem)} Products: ${join(s.products.map((x) => getProduct(x)?.name ?? x))}.`)),
    ],
    industries: [
      qa(`Which industries does ToyoApps cover?`, `There are ${inds.length} industry pages: ${join(inds.map((i) => i.name))}. Each lists the challenges it addresses and the products built for that sector.`),
      ...inds.map((i) => qa(`Which products serve ${i.name}?`, `${join(i.products.map((x) => getProduct(x)?.name ?? x))}. ${end(i.summary)}`)),
    ],
    integrations: [
      qa(`Which integrations do ToyoApps products support?`, `${ints.length} integrations are listed: ${join(ints.map((i) => i.name))}. Each entry shows which ToyoApps products support it.`),
      ...ints.map((i) => qa(`What does the ${i.name} integration do?`, `${end(i.summary)} Supported by ${join(i.products.map((x) => getProduct(x)?.name ?? x))}.`)),
    ],
    resources: [
      qa(`What resources does ToyoApps publish?`, `${res.length} resources across guides, tutorials, case studies, reports, updates and the blog, organised by type so setup help or background reading is quick to find.`),
      ...res.slice(0, 8).map((r) => qa(`What is "${r.name}"?`, end(r.summary))),
    ],
    compare: getComparisons().map((c) => qa(`What does "${c.name}" compare?`, `${end(c.summary)} Subjects: ${join(c.subjects)}.`)),
    products: cats.map((c) => qa(`What is in ${c.name}?`, `${end(c.tagline)} Products: ${join(getProducts().filter((p) => p.category === c.slug).map((p) => p.name))}.`)),
    home: [
      ...cats.map((c) => qa(`What can ${site.name} do for ${c.name}?`, `${end(c.tagline)} Products here include ${join(products.filter((p) => p.category === c.slug).map((p) => p.name))}.`)),
    ],
    company: [qa(`What does ${site.name} do?`, site.description), qa(`Who runs ${site.name}?`, `${site.name} is operated by ${site.legalName}. Its stated aim: ${lower(site.tagline)} Businesses discover software by function and makers list their own.`)],
    careers: jobs.map((j) => qa(`What does the ${j.title} role involve?`, `${end(j.overview)} Focus: ${join(j.focus.map(lower))}.`)).concat(qa(`What is the hiring process at ${site.name}?`, numbered(hiringSteps.map((s) => `${s.title}: ${s.description}`)))),
    publish: [qa(`How do I publish my product on ${site.name}?`, numbered(publisherSteps.map((s) => `${s.title}: ${s.description}`)))],
    vendors: [qa(`What are the steps to becoming a vendor?`, numbered(publisherSteps.map((s) => `${s.title}: ${s.description}`)))],
    contact: [qa(`Which topics can I contact ${site.name} about?`, `The contact page covers choosing software, buying for your team and publishing your own product. Each product also has its own support page and official site.`)],
    support: products.slice(0, 8).map((p) => qa(`Where do I get support for ${p.name}?`, `${p.name} has a support page on ${site.name} with setup guidance and answers${p.supportUrl ? `, and its own help centre at ${p.supportUrl}` : `, and its official site is ${host(p)}`}.`)),
    media: [qa(`What is listed on the media page?`, `The products currently in the ToyoApps catalog: ${products.length} in all across ${cats.length} business areas, each linking to its product page.`)],
    "press-kit": [qa(`What brand colours does ${site.name} use?`, brandPalette.map((c) => `${c.name} ${c.hex} (${lower(c.use)})`).join(", ") + ".")],
    blog: res.filter((r) => r.type === "blog").slice(0, 6).map((r) => qa(`What is "${r.name}" about?`, end(r.summary))),
    search: [qa(`What can I search for on ${site.name}?`, `Search covers ${products.length} products, their features, solutions, industries, integrations, resources and answered questions. Type a product name, a task like "payroll" or a tool you already use.`)],
    legal: [qa(`Which legal documents does ${site.name} publish?`, `The legal section holds ${site.name}'s published policies. Each product also has its own terms and privacy policy on its official website, which apply when you sign up there.`)],
  };
  return finalize(own, P[page] ?? [], siteHubPool());
}

/** Pages with a product context: which builder applies (used by the product layout audit). */
export const productSectionsWithFaqs = (p: Product) => getAvailableSections(p);

/** Resource-type hub (/resources/<type>): questions about the resources of that type. */
export function getResourceTypeFaqs(type: string, label: string): Faq[] {
  const res = getResources().filter((r) => r.type === type);
  return finalize(
    undefined,
    [
      qa(`What is in ToyoApps ${label.toLowerCase()}?`, `This section lists ${res.length} ${label.toLowerCase()}: ${join(res.slice(0, 8).map((r) => r.name))}. Each opens on its own page with the full text.`),
      ...res.map((r) => qa(`What is "${r.name}" about?`, `${end(r.summary)}${r.products?.length ? ` It relates to ${join(r.products.map((x) => getProduct(x)?.name ?? x))}.` : ""}`)),
    ],
    siteHubPool(),
  );
}
