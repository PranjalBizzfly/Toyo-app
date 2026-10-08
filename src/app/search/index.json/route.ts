import { buildSearchIndex } from "@/lib/search-index";

// Built once at build time; the search page fetches it after first paint so the
// page HTML stays small.
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
