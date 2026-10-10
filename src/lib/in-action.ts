/**
 * Photos for each product's "See {product} in action" section
 * (public/images/products/{slug}/in-action.webp). Products not listed keep
 * their existing screenshot or placeholder.
 */
const alts: Record<string, string> = {
  cardizo: "Businessman scanning a business card with his phone at a networking event",
  hrmagix: "HR manager explaining a payslip to an employee at her desk",
  sibu: "Video editor with headphones reviewing footage across two monitors in a studio",
  oda7: "Sales representative on a headset call in a busy sales office",
  zapbuzzer: "Office assistant handing coffee to a colleague at her desk",
  trackysuite: "Chartered accountant reviewing client tax files with a colleague",
  sigchanger: "IT administrator working on a laptop in a bright office",
  fantom: "Operations manager checking company phones and SIM cards laid out on her desk",
  meetingmind: "Team leader guiding a meeting while colleagues take notes around the table",
  fleetras:"Fleet manager with a tablet standing beside a row of delivery vans",
  sizoru: "Founder presenting market-size charts to two investors",
  benj: "Marketers planning a campaign with sticky notes on a glass wall",
  taskmagic: "Operations specialist working calmly at a laptop by the window",
  zuzu: "Team lead walking colleagues through their work on a laptop",
  zorfly: "Sales coach training two young sales representatives",
};

/** Product card photos on solution/industry pages (public/images/products/{slug}/tile.webp). */
const tileAlts: Record<string, string> = {
  fantom: "IT manager checking a company smartphone beside a tray of SIM cards",
  zorfly: "Employee practising spoken English with earphones, recording herself on her phone",
  zuzu: "Manager reviewing his team's workday on a laptop in the evening",
  zapbuzzer: "Facilities staff member delivering a document and a parcel to an employee's desk",
};
export function tilePhoto(slug: string) {
  return tileAlts[slug] ? { src: `/images/products/${slug}/tile.webp`, alt: tileAlts[slug] } : undefined;
}

/** Solution page hero photos (public/images/solutions/{slug}.webp). */
const solutionAlts: Record<string, string> = {
  "run-a-well-organised-office": "Office manager handing a document to a colleague while IT helps another employee",
  "prepare-for-launch-and-fundraising": "Founder presenting market-size charts to two investors in a meeting room",
  "manage-your-people-from-hire-to-growth": "HR head welcoming a new employee with a handshake on her first day",
};
export function solutionPhoto(slug: string) {
  return solutionAlts[slug] ? { src: `/images/solutions/${slug}.webp`, alt: solutionAlts[slug] } : undefined;
}

export function inActionPhoto(slug: string): { src: string; alt: string } | undefined {
  return alts[slug] ? { src: `/images/products/${slug}/in-action.webp`, alt: alts[slug] } : undefined;
}
