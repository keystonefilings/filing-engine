"use client";

import { useKeptForm } from "./useKeptForm";
import { Letterhead, Notice, Register, Sheet } from "./ui/Sheet";
import { CopyButton } from "./desk/CopyButton";
type R = { ok: true; link: string; kindTitle: string; label?: string; days?: number; from?: string } | { ok: false; message: string } | null;

function mailto(r: Extract<R, { ok: true }>): string {
  const subject = `Please fill in your ${r.kindTitle}`;
  const body = `Hi,\n\nPlease fill in the details for your ${r.kindTitle} here:\n${r.link}\n\nAfter you send it, we check every detail and approve it before anything is filed.\n\nThanks${r.from ? `,\n${r.from}` : ""}`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** The firm as its clients see it: its name, logo and ink-matched colors, for the preview of the page a link opens. */
export type LinkFirm = { name: string; logoUrl?: string; style: Record<string, string> };

/**
 * The page the link opens, drawn live in the firm's brand at 0.6 scale (merged spec 10B.14): its Letterhead, the
 * filing and who it's for in the firm's font, empty fields and Rule bars (never invented text), and its button.
 * Nothing of CoFile on it (decision 12). A picture, not a link.
 */
function LinkPagePreview({ firm, title, label }: { firm: LinkFirm; title: string; label?: string }) {
  return (
    <div className="preview2 links2-preview" role="img" aria-label="Preview: the page this link opens">
      <div className="links2-preview-page">
        <Register value="firm" firmStyle={firm.style} className="preview2-page">
          <Sheet size="page" className="preview2-sheet">
            <Letterhead name={firm.name} logoUrl={firm.logoUrl} />
            <p className="preview2-title">{title}{label ? <span className="links2-preview-for">{" · "}{label}</span> : null}</p>
            <span className="preview2-bar" style={{ width: "86%" }} />
            <span className="preview2-bar" style={{ width: "64%" }} />
            <span className="preview2-label" />
            <span className="preview2-field" />
            <span className="preview2-label" style={{ width: "42%" }} />
            <span className="preview2-field" />
            <span className="preview2-button">Send to {firm.name}</span>
          </Sheet>
        </Register>
      </div>
    </div>
  );
}

export function ClientLinkForm({ action, kinds, defaultKind, firm }: { action: (prev: R, fd: FormData) => Promise<R>; kinds: { id: string; title: string }[]; defaultKind?: string; firm?: LinkFirm }) {
  const { state, pending, formProps } = useKeptForm(action, null, { clearOnSuccess: true });
  return (
    <div className="links2-make">
      <form {...formProps} className="links2-form">
        {state && !state.ok ? <Notice tone="problem" role="alert">{state.message}</Notice> : null}
        <div className="field"><label htmlFor="cl-kind">Filing</label>
          <select id="cl-kind" name="kind" required defaultValue={defaultKind ?? ""}><option value="" disabled>Choose…</option>{kinds.map((k) => <option key={k.id} value={k.id}>{k.title}</option>)}</select></div>
        <div className="field"><label htmlFor="cl-label">Who it&apos;s for (shown to you and the client)</label><input id="cl-label" name="label" type="text" maxLength={80} placeholder="e.g. Blue Harbor Bakery" /></div>
        <button className="btn primary is-main" type="submit" disabled={pending} aria-busy={pending || undefined}>Make link</button>
      </form>
      {state && state.ok ? (
        <section key={state.link} className={["links2-result", firm && "has-preview"].filter(Boolean).join(" ")} aria-labelledby="links2-made">
          <div className="links2-result-text">
            <h2 id="links2-made">{state.kindTitle}{state.label ? ` for ${state.label}` : ""}</h2>
            <p className="dw-plate is-link"><code className="dw-plate-value">{state.link}</code></p>
            <div className="links2-actions">
              <CopyButton value={state.link} label="Copy link" />
              <a className="btn small" href={mailto(state)}>Email it from your mail app</a>
            </div>
            <p className="links2-note">Works for {state.days ?? 30} days and makes one filing. Anyone with the link can fill in the form, so send it only to your client.</p>
          </div>
          {firm ? <LinkPagePreview firm={firm} title={state.kindTitle} label={state.label} /> : null}
        </section>
      ) : null}
    </div>
  );
}
