"use client";

import { useEffect, useRef, useState } from "react";
import { ENQUIRY_TYPES, LIMITS, validateContact, type ContactErrors } from "@/lib/contact";
import type { ContactTypeParam } from "@/lib/routes";

type ProductOption = { slug: string; name: string };
type Status = { kind: "idle" | "sending" | "success" | "error"; message?: string };

const COUNTRY_CODES = ["+1", "+44", "+61", "+65", "+91", "+971", "+49", "+33", "+81", "+27", "+64", "+353"];

export function ContactForm({ products, privacyHref }: { products: ProductOption[]; privacyHref?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [startedAt, setStartedAt] = useState(0);

  // Preselect from the query string after mount (validated against allowed values; unknown ones are ignored).
  useEffect(() => {
    setStartedAt(Date.now());
    const q = new URLSearchParams(window.location.search);
    const allowedTypes = new Set<string>(ENQUIRY_TYPES.map((t) => t.value));
    const slugs = new Set(products.map((p) => p.slug));
    const t = q.get("type");
    const topic = q.get("topic");
    const role = (q.get("role") ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, 100);
    let nextType: ContactTypeParam | "" = t && allowedTypes.has(t) ? (t as ContactTypeParam) : "";
    if (!nextType && topic === "vendor") nextType = "vendor";
    if (!nextType && (topic === "careers" || topic === "media")) nextType = "general";
    if (nextType) setType(nextType);
    if (topic === "careers") setSubject(role ? `Application: ${role}` : "Application");
    else if (topic === "media") setSubject("Media enquiry");
    const picked = q.getAll("product").flatMap((v) => v.split(",")).filter((s) => slugs.has(s));
    if (picked.length) setSelected([...new Set(picked)]);
  }, [products]);

  const toggle = (slug: string) => setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const cc = String(fd.get("phoneCode") ?? "");
    const phoneRaw = String(fd.get("phone") ?? "").trim();
    const raw = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: phoneRaw && !phoneRaw.startsWith("+") && cc ? `${cc} ${phoneRaw}` : phoneRaw,
      company: fd.get("company"),
      type,
      products: selected,
      subject,
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
      website: fd.get("website"),
      startedAt,
    };
    const { errors: errs } = validateContact(raw, new Set(products.map((p) => p.slug)));
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ kind: "idle" });
      const first = Object.keys(errs)[0];
      const el = form.querySelector<HTMLElement>(first === "products" ? "#cf-products input" : `[name="${first}"]`);
      el?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(raw) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: ContactErrors };
      if (res.ok && json.ok) {
        form.reset();
        setType("");
        setSelected([]);
        setSubject("");
        setErrors({});
        setStartedAt(Date.now());
        setStatus({ kind: "success", message: "Thanks, your message has been sent. The ToyoApps team will get back to you by email." });
      } else {
        if (json.fields) setErrors(json.fields);
        const msg =
          json.error === "rate_limited"
            ? "You've sent several messages in a short time. Please wait a few minutes and try again."
            : json.error === "not_configured"
              ? "Our message service isn't available right now, so this message wasn't sent. Please reach us through the support page instead."
              : json.error === "validation_failed"
              ? "Some details need fixing. Check the highlighted fields and try again."
              : "Sorry, we couldn't send your message right now. Please try again in a few minutes.";
        setStatus({ kind: "error", message: msg });
      }
    } catch {
      setStatus({ kind: "error", message: "Sorry, we couldn't send your message. Check your connection and try again." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const describe = (field: keyof ContactErrors, hint?: string) => {
    const ids = [hint, errors[field] ? `cf-${field}-err` : ""].filter(Boolean).join(" ");
    return { "aria-describedby": ids || undefined, "aria-invalid": errors[field] ? true : undefined };
  };
  const Err = ({ field }: { field: keyof ContactErrors }) =>
    errors[field] ? (
      <p className="cf-error" data-tc-off id={`cf-${field}-err`}>
        {errors[field]}
      </p>
    ) : null;
  const sending = status.kind === "sending";

  return (
    <form ref={formRef} className="cf" noValidate onSubmit={onSubmit} aria-busy={sending}>
      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" data-tc-off className={status.message ? `cf-status cf-status--${status.kind}` : "cf-sr"}>
        {status.message}
      </div>

      <div className="cf-grid">
        <div className="cf-field">
          <label htmlFor="cf-name">Full name <span className="cf-req" aria-hidden="true">*</span></label>
          <input id="cf-name" name="name" autoComplete="name" required maxLength={LIMITS.name.max} {...describe("name")} />
          <Err field="name" />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-email">Work email <span className="cf-req" aria-hidden="true">*</span></label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required maxLength={LIMITS.email.max} {...describe("email")} />
          <Err field="email" />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-phone">Phone</label>
          <div className="cf-phone">
            <select name="phoneCode" aria-label="Country code" defaultValue="">
              <option value="">Code</option>
              {COUNTRY_CODES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input id="cf-phone" name="phone" type="tel" autoComplete="tel" maxLength={LIMITS.phone.max} {...describe("phone", "cf-phone-hint")} />
          </div>
          <p className="cf-hint" data-tc-off id="cf-phone-hint">Pick a code or type the number with its + country code.</p>
          <Err field="phone" />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-company">Company <span className="cf-opt">(optional)</span></label>
          <input id="cf-company" name="company" autoComplete="organization" maxLength={LIMITS.company.max} {...describe("company")} />
          <Err field="company" />
        </div>
        <div className="cf-field cf-field--full">
          <label htmlFor="cf-type">Enquiry type <span className="cf-req" aria-hidden="true">*</span></label>
          <select id="cf-type" name="type" required value={type} onChange={(e) => setType(e.target.value)} {...describe("type")}>
            <option value="">Choose an enquiry type</option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <Err field="type" />
        </div>
        <fieldset className="cf-field cf-field--full cf-chips" id="cf-products" {...describe("products", "cf-products-hint")}>
          <legend>Products of interest <span className="cf-opt">(optional)</span></legend>
          <p className="cf-hint" data-tc-off id="cf-products-hint">Select any that apply.</p>
          <div className="cf-chips__list">
            {products.map((p) => (
              <label key={p.slug} className="cf-chip">
                <input type="checkbox" name="products" value={p.slug} checked={selected.includes(p.slug)} onChange={() => toggle(p.slug)} />
                <span>{p.name}</span>
              </label>
            ))}
          </div>
          <Err field="products" />
        </fieldset>
        <div className="cf-field cf-field--full">
          <label htmlFor="cf-subject">Subject <span className="cf-req" aria-hidden="true">*</span></label>
          <input id="cf-subject" name="subject" required maxLength={LIMITS.subject.max} value={subject} onChange={(e) => setSubject(e.target.value)} {...describe("subject")} />
          <Err field="subject" />
        </div>
        <div className="cf-field cf-field--full">
          <label htmlFor="cf-message">Message <span className="cf-req" aria-hidden="true">*</span></label>
          <textarea id="cf-message" name="message" rows={6} required minLength={LIMITS.message.min} maxLength={LIMITS.message.max} {...describe("message", "cf-message-hint")} />
          <p className="cf-hint" data-tc-off id="cf-message-hint">Between {LIMITS.message.min} and {LIMITS.message.max} characters.</p>
          <Err field="message" />
        </div>
        <div className="cf-hp" aria-hidden="true">
          <label htmlFor="cf-website">Leave this field empty</label>
          <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="cf-field cf-field--full">
          <label className="cf-check" data-tc-off>
            <input type="checkbox" name="consent" required {...describe("consent")} />
            <span>
              I agree that ToyoApps may use these details to reply to my enquiry, as described in the{" "}
              {privacyHref ? <a href={privacyHref}>privacy policy</a> : "privacy policy"}. <span className="cf-req" aria-hidden="true">*</span>
            </span>
          </label>
          <Err field="consent" />
        </div>
      </div>

      <p className="cf-hint"><span className="cf-req" aria-hidden="true">*</span> Required field</p>
      <button type="submit" className="co-btn cf-submit" disabled={sending}>
        {sending && <span className="cf-spinner" aria-hidden="true" />}
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
