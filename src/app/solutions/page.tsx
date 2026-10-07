import { HubPageTemplate } from "@/components/templates/EntityTemplates";
import { getSolutions } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const items = () => getSolutions().map((s) => ({ name: s.name, summary: s.summary, href: routes.solution(s.slug) }));

export const metadata = buildMetadata({
  title: "Solutions by business need",
  description: "Start from the business problem you need to solve and find the ToyoApps products that fit.",
  path: routes.solutions(),
  status: items().length ? "live" : "draft",
});

export default function SolutionsPage() {
  return (
    <HubPageTemplate
      crumbs={[{ name: "Solutions", href: routes.solutions() }]}
      eyebrow="Solutions"
      title="Start from the problem, not the product"
      lead="Each solution maps a real business problem to the approach and ToyoApps products that solve it."
      items={items()}
      emptyTitle="Solutions are being written"
      emptyText="We're mapping ToyoApps products to the business problems they solve. In the meantime, browse products by category."
    />
  );
}
