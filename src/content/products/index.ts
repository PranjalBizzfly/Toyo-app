import type { Product } from "@/content/types";
import { cardizo } from "./cardizo";
import { fleetras, meetingmind } from "./drafts";
import { fantom } from "./fantom";
import { getbenj } from "./getbenj";
import { hrmagix } from "./hrmagix";
import { oda7 } from "./oda7";
import { taskmagic } from "./pending";
import { sibu } from "./sibu";
import { sigchanger } from "./sigchanger";
import { sizoru } from "./sizoru";
import { trackysuite } from "./trackysuite";
import { zapbuzzer } from "./zapbuzzer";
import { zorfly } from "./zorfly";
import { zuzu } from "./zuzu";
import { snaaps } from "./growbizz";
import { myspeechmaker } from "./speechwright";
import { xlInfraChannelPartnerPortal } from "./1xl-infra-channel-partner-portal";
import { rentwithzealPartnerPortal } from "./zeal-partner-program";
import { sopgalaxy } from "./sopgalaxy";
import { theprojectchecker } from "./theprojectchecker";
import { warwi } from "./warwi";
import { dizola } from "./dizola";
import { meetings247 } from "./247meetings";
import { finzola } from "./finzola";
import { socialmagix } from "./social-magix";

/**
 * Product registry. Every record is written from the product's official site
 * (docs/TOYOAPPS_PRODUCT_SOURCE_MAP.md).
 *
 * To add a product: create `content/products/<slug>.ts` exporting a `Product`
 * and add it here. Routes, menus, cards, sitemap and internal links follow.
 *
 * Drafts (preview only, not indexed) are PENDING VERIFICATION, not excluded:
 * Fleetras, MeetingMind (public sale), TaskMagic.
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
  snaaps,
  myspeechmaker,
  xlInfraChannelPartnerPortal,
  rentwithzealPartnerPortal,
  sopgalaxy,
  theprojectchecker,
  warwi,
  dizola,
  meetings247,
  finzola,
  socialmagix,
];
