import { products } from "@/content/products";
import { site } from "@/content/site";
import { ENQUIRY_TYPES, MIN_FILL_MS, validateContact, type ContactPayload } from "@/lib/contact";

/**
 * POST /api/contact — the single contact form endpoint.
 * Delivery (server-only env vars, set in Vercel project settings):
 *   1. CONTACT_WEBHOOK_URL: POSTs the JSON payload (Zapier/Make/Slack/CRM webhook), or
 *   2. RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL): sends through Resend's REST API.
 * With neither set it returns 503 { error: "not_configured" }. Success is only returned after a 2xx from delivery.
 */
export const dynamic = "force-dynamic";

const productSlugs = new Set(products.map((p) => p.slug));

// Simple in-memory rate limit. NOTE: per serverless instance only, so it is a speed bump, not a guarantee.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_PER_WINDOW;
}

const fail = (status: number, error: string, extra: Record<string, unknown> = {}) =>
  Response.json({ ok: false, error, ...extra }, { status });

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return fail(429, "rate_limited");

  let raw: Record<string, unknown>;
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    raw = body as Record<string, unknown>;
  } catch {
    return fail(400, "invalid_json");
  }

  // Spam: honeypot must be empty and the form must have been open for MIN_FILL_MS.
  if (typeof raw.website === "string" && raw.website.trim() !== "") return fail(400, "spam_detected");
  const started = Number(raw.startedAt);
  if (!Number.isFinite(started) || Date.now() - started < MIN_FILL_MS) return fail(400, "spam_detected");

  const { data, errors } = validateContact(raw, productSlugs);
  if (Object.keys(errors).length) return fail(422, "validation_failed", { fields: errors });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!webhook && !(resendKey && to)) return fail(503, "not_configured");

  try {
    const res = webhook ? await sendWebhook(webhook, data) : await sendResend(resendKey!, to!, data);
    if (!res.ok) {
      console.error("[contact] delivery failed", res.status);
      return fail(502, "delivery_failed");
    }
  } catch (err) {
    console.error("[contact] delivery error", err);
    return fail(502, "delivery_failed");
  }
  return Response.json({ ok: true });
}

function typeLabel(t: string) {
  return ENQUIRY_TYPES.find((x) => x.value === t)?.label ?? t;
}

function sendWebhook(url: string, data: ContactPayload) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, typeLabel: typeLabel(data.type), source: `${site.url}/contact`, submittedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(10_000),
  });
}

function sendResend(key: string, to: string, d: ContactPayload) {
  const lines = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || "-"}`,
    `Company: ${d.company || "-"}`,
    `Enquiry type: ${typeLabel(d.type)}`,
    `Products: ${d.products.join(", ") || "-"}`,
    `Subject: ${d.subject}`,
    "",
    d.message,
  ];
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "ToyoApps Contact <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: d.email,
      subject: `[${typeLabel(d.type)}] ${d.subject}`.replace(/[\r\n]+/g, " "),
      text: lines.join("\n"),
    }),
    signal: AbortSignal.timeout(10_000),
  });
}
