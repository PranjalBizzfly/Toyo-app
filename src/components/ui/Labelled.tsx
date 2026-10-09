/**
 * Renders a list line written as "Short label — description" as a bold label
 * followed by the description, without the dash separator. Only a short
 * leading label (≤ 4 words, no punctuation) is treated as a label, so dashes
 * used as punctuation inside a sentence are left exactly as written.
 */
const LABEL = /^([A-Z0-9][\w&/+'’()]*(?: [\w&/+'’()]+){0,3}) [—–] (.+)$/;

export function Labelled({ text }: { text: unknown }) {
  if (typeof text !== "string") return <>{text as React.ReactNode}</>;
  const m = text.match(LABEL);
  if (!m) return <>{text}</>;
  return (
    <>
      <strong className="labelled__label">{m[1]}</strong> {m[2]}
    </>
  );
}
