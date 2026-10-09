import type { ContactTypeParam } from "@/lib/routes";

/** Shared by the contact form (client) and /api/contact (server) so validation matches. */
export const ENQUIRY_TYPES: { value: ContactTypeParam; label: string }[] = [
  { value: "product", label: "Product Enquiry" },
  { value: "sales", label: "Sales Enquiry" },
  { value: "support", label: "Technical or Product Support" },
  { value: "vendor", label: "Vendor Enquiry" },
  { value: "publish", label: "Publishing My Software" },
  { value: "general", label: "General Enquiry" },
  { value: "other", label: "Other" },
];

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 30 },
  company: { max: 120 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
  products: { max: 30 },
};

/** Minimum time (ms) between the form rendering and submission; faster is treated as a bot. */
export const MIN_FILL_MS = 3000;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s().-]{5,}$/;

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  type: ContactTypeParam;
  products: string[];
  subject: string;
  message: string;
  consent: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Validates raw input. `productSlugs` is the allowed set of product slugs. */
export function validateContact(raw: Record<string, unknown>, productSlugs: ReadonlySet<string>): { data: ContactPayload; errors: ContactErrors } {
  const errors: ContactErrors = {};
  const name = str(raw.name);
  const email = str(raw.email);
  const phone = str(raw.phone);
  const company = str(raw.company);
  const type = str(raw.type) as ContactTypeParam;
  const subject = str(raw.subject);
  const message = str(raw.message);
  const consent = raw.consent === true || raw.consent === "on" || raw.consent === "true";
  const products = Array.isArray(raw.products) ? raw.products.filter((p): p is string => typeof p === "string") : [];

  if (name.length < LIMITS.name.min) errors.name = "Enter your full name.";
  else if (name.length > LIMITS.name.max) errors.name = `Name must be ${LIMITS.name.max} characters or fewer.`;
  if (!email) errors.email = "Enter your work email.";
  else if (email.length > LIMITS.email.max || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address, like name@company.com.";
  if (phone && (phone.length > LIMITS.phone.max || !PHONE_RE.test(phone))) errors.phone = "Enter a valid phone number, including the country code, e.g. +1 555 010 0100.";
  if (company.length > LIMITS.company.max) errors.company = `Company must be ${LIMITS.company.max} characters or fewer.`;
  if (!ENQUIRY_TYPES.some((t) => t.value === type)) errors.type = "Choose an enquiry type.";
  if (products.length > LIMITS.products.max || products.some((p) => !productSlugs.has(p))) errors.products = "Choose products from the list.";
  if (subject.length < LIMITS.subject.min) errors.subject = "Enter a subject.";
  else if (subject.length > LIMITS.subject.max) errors.subject = `Subject must be ${LIMITS.subject.max} characters or fewer.`;
  if (message.length < LIMITS.message.min) errors.message = `Tell us a little more (at least ${LIMITS.message.min} characters).`;
  else if (message.length > LIMITS.message.max) errors.message = `Message must be ${LIMITS.message.max} characters or fewer.`;
  if (!consent) errors.consent = "Please agree to the privacy policy so we can reply.";

  return { data: { name, email, phone, company, type, products: [...new Set(products)], subject, message, consent }, errors };
}
