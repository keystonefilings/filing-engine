import "@/styles/components/desk.css";
import "@/styles/components/branding.css";
import "@/styles/components/qa-gallery.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientPagePreview } from "@/components/desk/ClientPagePreview";
import { inkMatch } from "@/lib/design/ink";
import { isWide, logoPlate, logoSize } from "@/lib/design/logo";
import { filingKind } from "@/lib/intake/forms";
import { QA_CASES, QA_DIR, QA_LOGO_FILES, QA_SETS, type QaCase, type QaSet } from "@/lib/qa-gallery";
import { brandFor, galleryOn, googleHref, QA_LOGOS } from "./cases";

/**
 * The QA gallery (merged spec 10B.2.5): every case drawn on every surface a firm's clients see, and the desk's account
 * label, side by side, by the real components with the case's brand. Internal: served only with DESIGN_GALLERY=true in
 * production, like /design. At /design/gallery, beside the component gallery, since /p/<slug> is a firm's desk; each
 * surface that lays out at its own width or theme is a frame of /design/gallery/frame, and the engine's email and proof
 * heads are drawn by tools/render-gallery-heads.ts. Every case must pass on every surface with no hand adjustment, and
 * again whenever the ink match or the logo analysis changes.
 */
export const metadata = { title: "QA gallery", robots: { index: false } };

/** A surface drawn at its own width in a frame, scaled down to sit beside the others. */
function Frame({ src, width, height, scale, title }: { src: string; width: number; height: number; scale: number; title: string }) {
  return (
    <div className="qa-frame-box" style={{ width: Math.round(width * scale), height: Math.round(height * scale) }}>
      <iframe src={src} title={title} width={width} height={height} loading="lazy" style={{ transform: `scale(${scale})` }} />
    </div>
  );
}

function Cell({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <figure className={wide ? "qa-cell is-wide" : "qa-cell"}><figcaption>{label}</figcaption>{children}</figure>;
}

/** What the system made of the case: the ink match's fill and links, and the logo's reading, size and plate. */
function Reading({ c }: { c: QaCase }) {
  const k = inkMatch(c.color, c.color2 ?? c.color);
  const l = c.logo ? QA_LOGOS[c.logo] : undefined;
  const file = QA_LOGO_FILES.find((f) => f.id === c.logo);
  const plate = l ? logoPlate(l.info, k.fill) : null;
  const sheet = l ? logoSize(l.info, "sheet") : null;
  const sw = (hex: string, label: string) => <span className="qa-sw"><i style={{ background: hex }} aria-hidden="true" />{label} <code>{hex}</code></span>;
  return (
    <dl className="qa-reading">
      <div><dt>Colors</dt><dd>{sw(k.firm, "main")}{sw(k.firm2, "thin line")}{sw(k.fill, "fill")}{sw(k.ink, "links")}</dd></div>
      <div><dt>Font</dt><dd>{c.font?.label ?? "The standard font"}</dd></div>
      <div><dt>Logo</dt><dd>{l && file ? <>
        {file.title}. {l.info.width} × {l.info.height} px, {l.info.ratio >= 2.5 ? "wide" : l.info.ratio >= 1.6 ? "mid" : "square or tall"} ({l.info.ratio}:1), {l.info.background}, ink L {l.info.inkL.toFixed(2)}
        {l.info.light ? <>, <strong>light marks</strong>: on a {plate === "#1D2130" ? "Plate Ink" : "fill"} plate <code>{plate}</code></> : null}
        . On sheets {sheet!.width} × {sheet!.height} px{isWide(l.info.ratio) ? ", the name hidden beside it" : ", the name typeset beside it"}.
      </> : "None: the typeset name"}</dd></div>
    </dl>
  );
}

function CaseRow({ c }: { c: QaCase }) {
  const q = (v: string, t?: string) => `/design/gallery/frame?c=${encodeURIComponent(c.id)}&v=${v}${t ? `&t=${t}` : ""}`;
  const brand = brandFor(c);
  return (
    <section className="qa-case" id={c.id} aria-labelledby={`${c.id}-h`}>
      <h2 id={`${c.id}-h`}><a href={`?case=${encodeURIComponent(c.id)}`}>{c.name}</a> <span>{c.title}</span></h2>
      <Reading c={c} />
      <div className="qa-grid">
        <Cell label="Client page, desktop" wide><Frame src={q("client")} width={1200} height={330} scale={0.5} title={`${c.name}: client page, desktop`} /></Cell>
        <Cell label="Client page, phone"><Frame src={q("client")} width={390} height={420} scale={0.55} title={`${c.name}: client page, phone`} /></Cell>
        <Cell label="The firm's page for a filing" wide><Frame src={q("filing")} width={1200} height={620} scale={0.5} title={`${c.name}: the firm's page for a filing`} /></Cell>
        <Cell label="An email to a client"><Frame src={`${QA_DIR}/heads/${c.id}-email.html`} width={700} height={560} scale={0.5} title={`${c.name}: an email to a client`} /></Cell>
        <Cell label="Branding's previews" wide><Frame src={q("branding")} width={1360} height={1040} scale={0.44} title={`${c.name}: Branding`} /></Cell>
        <Cell label="The empty desk's miniature"><div className="qa-mini"><ClientPagePreview brand={brand} title={filingKind("nj-llc")!.title} label={`Preview: the page ${brand.name}'s clients see`} /></div></Cell>
        <Cell label="Account label, light" wide><Frame src={q("desk", "light")} width={1200} height={130} scale={0.5} title={`${c.name}: account label, light`} /></Cell>
        <Cell label="Account label, dark" wide><Frame src={q("desk", "dark")} width={1200} height={130} scale={0.5} title={`${c.name}: account label, dark`} /></Cell>
        <Cell label="White-label desk, Letterhead row" wide><Frame src={q("white")} width={1200} height={140} scale={0.5} title={`${c.name}: white-label desk`} /></Cell>
        <Cell label="White-label proof, head"><Frame src={`${QA_DIR}/heads/${c.id}-proof.html`} width={900} height={420} scale={0.5} title={`${c.name}: white-label proof`} /></Cell>
      </div>
    </section>
  );
}

export default async function QaGallery({ searchParams }: { searchParams: Promise<{ set?: string; case?: string }> }) {
  if (!galleryOn()) notFound();
  const q = await searchParams;
  const one = QA_CASES.find((c) => c.id === q.case);
  const set: QaSet = one?.set ?? (QA_SETS.some((s) => s.id === q.set) ? (q.set as QaSet) : "firms");
  const cases = one ? [one] : QA_CASES.filter((c) => c.set === set);
  const families = [...new Set(cases.map((c) => c.font?.google).filter(Boolean))] as string[];
  return (
    <main className="qa-gallery reg-cofile">
      {families.map((f) => <link key={f} rel="stylesheet" href={googleHref(f)} precedence="default" />)}
      <header className="qa-head">
        <h1>QA gallery</h1>
        <p>Every case on every surface its clients see, drawn by the real components (merged spec 10B.2.5). Regenerate the logo files and the engine&apos;s heads after changing the ink match or the logo analysis: <code>node --experimental-strip-types scripts/qa-gallery.ts</code> in web/, then <code>npx tsx tools/render-gallery-heads.ts</code>.</p>
        <nav aria-label="Sets">
          {QA_SETS.map((s) => <Link key={s.id} href={`?set=${s.id}`} aria-current={!one && s.id === set ? "page" : undefined}>{s.label} ({QA_CASES.filter((c) => c.set === s.id).length})</Link>)}
        </nav>
      </header>
      {cases.map((c) => <CaseRow key={c.id} c={c} />)}
    </main>
  );
}
