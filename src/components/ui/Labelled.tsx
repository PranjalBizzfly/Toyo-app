/**
 * Renders a list line written as "Short label: description" (or the older
 * "Short label — description") as a bold label followed by the description,
 * without the separator. Only a short leading label (≤ 4 words, no other
 * punctuation) is treated as a label, so ordinary sentences are left as written.
 */
const LABEL = /^([A-Z0-9][\w&/+'’()]*(?: [\w&/+'’()]+){0,3})(?: [—–]|:) (.+)$/;

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
