"use client";

import { useEffect } from "react";
import { titleCaseScript } from "@/lib/title-case";

/**
 * Runs the title-case marker after hydration. Running it inline (before React
 * hydrates) added data-long / data-tc-off to server HTML and caused hydration
 * mismatches; after hydration React no longer compares those attributes.
 */
export function TitleCaseMarker() {
  useEffect(() => {
    new Function(titleCaseScript)();
  }, []);
  return null;
}
