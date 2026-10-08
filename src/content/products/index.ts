import type { Product } from "@/content/types";
import { cardizo } from "./cardizo";
import { fleetras, meetingmind } from "./drafts";
import { fantom } from "./fantom";
import { getbenj } from "./getbenj";
import { hrmagix } from "./hrmagix";
import { oda7 } from "./oda7";
import { taskmagic, tracksuit } from "./pending";
import { sibu } from "./sibu";
import { sigchanger } from "./sigchanger";
import { sizoru } from "./sizoru";
import { trackysuite } from "./trackysuite";
import { zapbuzzer } from "./zapbuzzer";
import { zorfly } from "./zorfly";
import { zuzu } from "./zuzu";

/**
 * Product registry. Every record is written from the product's official site
 * (docs/TOYOAPPS_PRODUCT_SOURCE_MAP.md).
 *
 * To add a product: create `content/products/<slug>.ts` exporting a `Product`
 * and add it here. Routes, menus, cards, sitemap and internal links follow.
 *
 * Drafts (preview only, not indexed) are PENDING VERIFICATION, not excluded:
 * Fleetras, MeetingMind (public sale), TaskMagic, Tracksuit (relationship).
 */
export const products: Product[] = [
  cardizo,
  getbenj,
  sibu,
  hrmagix,
  zuzu,
  zorfly,
  zapbuzzer,
  sigchanger,
  fantom,
  trackysuite,
  sizoru,
  oda7,
  fleetras,
  meetingmind,
  taskmagic,
  tracksuit,
];
