import { getSiteFaqs } from "@/lib/faqs";
import { HubPageTemplate } from "@/components/templates/EntityTemplates";
import { getSolutions, productsFor } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const items = () => getSolutions().map((s) => ({ name: s.name, summary: s.summary, href: routes.solution(s.slug), meta: productsFor(s.products).map((p) => p.name).join(" · ") || `${s.products.length} products`, icon: "layers" as const, detail: s.problem }));

export const metadata = buildMetadata({
  title: "Solutions by business need",
  description: "Start from the business problem you need to solve and find the ToyoApps products that fit.",
  path: routes.solutions(),
  status: items().length ? "live" : "draft",
});

export default function SolutionsPage() {
  return (
    <HubPageTemplate
      faqs={getSiteFaqs("solutions")}
      crumbs={[{ name: "Solutions", href: routes.solutions() }]}
      eyebrow="Solutions"
      title="Start from the problem, not the product"
      lead="Each solution describes a common business problem, the approach that addresses it, and the ToyoApps products that cover each part. The products are independent, so adopt one or several."
      items={items()}
      listTitle="Solutions by business need"
      listLead="Pick the problem closest to yours to see the approach, what each product contributes, and answers to common questions."
      emptyTitle="Solutions are being written"
      emptyText="We're mapping ToyoApps products to the business problems they solve. In the meantime, browse products by category."
    />
  );
}
