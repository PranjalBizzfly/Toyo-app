import "../catalog-zoho.css";
import { SearchClient } from "@/components/SearchClient";
import { buildSearchIndex } from "@/lib/search-index";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "Search",
    description: "Search every ToyoApps product, feature, solution, industry, integration and resource.",
    path: "/search",
  }),
  // Search result pages are a utility, not content.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <header className="zc-hero">
        <div className="container">
          <h1>Search ToyoApps</h1>
          <hr className="zc-rule" />
        </div>
      </header>
      <SearchClient index={buildSearchIndex()} />
    </>
  );
}
