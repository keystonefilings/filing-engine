import { highlight, type CodeLang } from "@/lib/docs/highlight";
import { CopyCode } from "./CopyCode";

/**
 * A code sample on its Plate Ink plate (merged spec 10C.16): typographic highlighting only, the rehearsal's dashed
 * mark and ghost light on `"dryRun": true` and `/dry-run`, "Copy" at the top right. Long lines scroll inside the
 * block, which takes focus (named by its language) so keyboards can scroll it; the page never scrolls sideways.
 */
export function CodeBlock({ code, lang }: { code: string; lang: CodeLang }) {
  const src = code.trim();
  const lines = highlight(src, lang);
  const rehearsal = lines.some((l) => l.some((t) => t.rehearsal));
  return (
    <div className={["code2", rehearsal && "has-rehearsal"].filter(Boolean).join(" ")} data-lang={lang}>
      <pre tabIndex={0} aria-label={lang}><code>
        {lines.map((l, i) => (
          <span key={i} className={l.some((t) => t.rehearsal) ? "code2-line is-rehearsal" : "code2-line"}>
            {l.length ? l.map((t, j) => t.kind === "txt" && !t.rehearsal ? t.text : <span key={j} className={["c2", `is-${t.kind}`, t.rehearsal && "is-rehearsal"].filter(Boolean).join(" ")}>{t.text}</span>) : " "}
          </span>
        ))}
      </code></pre>
      <CopyCode text={src} />
    </div>
  );
}
