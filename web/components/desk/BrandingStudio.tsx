"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useKeptForm } from "@/components/useKeptForm";
import { ColorField, LogoField } from "@/components/BrandFields";
import { FONT_PRESETS } from "@/lib/fonts";
import { firmVars, inkMatch } from "@/lib/design/ink";
import { Letterhead } from "@/components/ui/Sheet";
import type { SetupState } from "@/app/p/[slug]/(portal)/setup/actions";

type Action = (prev: SetupState, fd: FormData) => Promise<SetupState>;

export interface BrandingValues {
  slug?: string; siteUrl?: string; font?: string; hasCustomFont?: boolean; displayName?: string; logoSrc?: string; logoUrl?: string;
  primaryColor?: string; secondaryColor?: string; supportEmail?: string;
  /** The title of the first filing type the firm offers, for the preview of its page for a filing. */
  firstKind: string;
}

const HEX = /^#[0-9a-fA-F]{6}$/;

/** The firm's register for the previews: the ink match of its colors, and its font. A half-typed color keeps the last good look. */
function useFirmStyle(color: string, color2: string, fontStack: string): CSSProperties {
  const last = useRef<Record<string, string>>({});
  return useMemo(() => {
    try {
      if (HEX.test(color) && HEX.test(color2)) last.current = firmVars(inkMatch(color, color2));
    } catch { /* keep the last good look */ }
    return { ...last.current, ["--font-firm" as string]: fontStack } as CSSProperties;
  }, [color, color2, fontStack]);
}

/** How the button will print on the firm's client pages (10B.7.4): the chosen color, and the one used when the ink match changed it. */
function InkLine({ color }: { color: string }) {
  if (!HEX.test(color)) return null;
  let ink;
  try { ink = inkMatch(color, color); } catch { return null; }
  const chosen = color.toUpperCase();
  const changed = ink.fill.toUpperCase() !== chosen;
  const chip = (fill: string, on: string, border: string | null, edge: string | null, hex: string) => (
    <span className="ink2-chip">
      <span className="ink2-aa" style={{ background: fill, color: on, borderColor: border && border !== "transparent" ? border : fill, boxShadow: edge && edge !== "transparent" ? `inset 4px 0 0 ${edge}` : undefined }}>Aa</span>
      <code>{hex}</code>
    </span>
  );
  return (
    <div className="ink2" aria-label={changed ? `Buttons print as ${ink.fill}, from ${chosen}` : `Buttons print as ${chosen}`} role="img">
      {changed ? <>{chip(color, "#fff", "transparent", "transparent", chosen)}<span className="ink2-arrow" aria-hidden="true">→</span></> : null}
      {chip(ink.fill, ink.on, ink.fillBorder, ink.fillEdge, ink.fill.toUpperCase())}
    </div>
  );
}

/** The font control (10B.7.2): each option set in its own face, so choosing a font is reading it. A listbox over the form's hidden value. */
function FontPicker({ value, onChange, hasCustom }: { value: string; onChange: (v: string) => void; hasCustom: boolean }) {
  const options = useMemo(() => [
    ...Object.entries(FONT_PRESETS).map(([id, p]) => ({ id, label: p.label, stack: p.stack })),
    ...(hasCustom ? [{ id: "custom", label: "Your own font (uploaded)", stack: `"FirmFontPreview", "FirmFont", system-ui` }] : []),
  ], [hasCustom]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const current = options.find((o) => o.id === value) ?? options[0]!;
  useEffect(() => {
    if (!open) return;
    // The list's faces load when it opens.
    if (!document.querySelector("link[data-font-list]")) {
      const fams = Object.values(FONT_PRESETS).filter((p) => p.family).map((p) => `family=${encodeURIComponent(p.family!).replace(/%20/g, "+")}:wght@400`).join("&");
      const l = document.createElement("link");
      l.rel = "stylesheet"; l.dataset.fontList = "1"; l.href = `https://fonts.googleapis.com/css2?${fams}&display=swap`;
      document.head.appendChild(l);
    }
    setActive(Math.max(0, options.findIndex((o) => o.id === value)));
    listRef.current?.focus();
  }, [open, options, value]);
  const choose = (i: number) => { onChange(options[i]!.id); setOpen(false); buttonRef.current?.focus(); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(options.length - 1, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(options.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
    else if (e.key === "Escape" || e.key === "Tab") { setOpen(false); if (e.key === "Escape") buttonRef.current?.focus(); }
  };
  useEffect(() => { listRef.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" }); }, [active]);
  return (
    <div className="fontp2" onBlur={(e) => { if (open && !e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <button ref={buttonRef} type="button" id="b-font" className="fontp2-button" aria-haspopup="listbox" aria-expanded={open} aria-labelledby="b-font-label b-font" onClick={() => setOpen((o) => !o)} style={{ fontFamily: current.stack }}>
        {current.label}
      </button>
      {open ? (
        <ul ref={listRef} className="fontp2-list" role="listbox" tabIndex={-1} aria-labelledby="b-font-label" aria-activedescendant={`font-opt-${active}`} onKeyDown={onKey}>
          {options.map((o, i) => (
            <li key={o.id} id={`font-opt-${i}`} data-i={i} role="option" aria-selected={o.id === value} className={i === active ? "is-active" : undefined}
              style={{ fontFamily: o.stack }} onMouseDown={(e) => e.preventDefault()} onClick={() => choose(i)} onMouseEnter={() => setActive(i)}>
              {o.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* The three surfaces a firm's clients see (10B.7.5), drawn at the phone layout: no invented words, Rule bars for text. */
function Bars({ widths }: { widths: string[] }) {
  return <>{widths.map((w, i) => <span key={i} className="pv2-bar" style={{ width: w }} />)}</>;
}
function ClientPageSurface({ name, logo }: { name: string; logo?: string }) {
  return (
    <div className="pv2-sheet">
      <Letterhead name={name || "Your firm"} logoUrl={logo} />
      <p className="pv2-text">Please fill in your LLC formation details. <span className="pv2-link">What you&apos;ll need</span></p>
      <span className="pv2-label" /><span className="pv2-field" />
      <span className="pv2-label" style={{ width: "40%" }} /><span className="pv2-field" />
      <span className="pv2-button">Send for approval</span>
    </div>
  );
}
function FilingPageSurface({ name, logo, title }: { name: string; logo?: string; title: string }) {
  return (
    <div className="pv2-sheet">
      <Letterhead name={name || "Your firm"} logoUrl={logo} />
      <p className="pv2-title">{title}</p>
      <Bars widths={["88%", "70%"]} />
      <span className="pv2-label" /><span className="pv2-field" />
      <span className="pv2-button">Send to {name || "your firm"}</span>
    </div>
  );
}
function EmailSurface({ name, logo }: { name: string; logo?: string }) {
  return (
    <div className="pv2-sheet is-email">
      <Letterhead name={name || "Your firm"} logoUrl={logo} centred />
      <p className="pv2-headline">More information needed:</p>
      <Bars widths={["54%"]} />
      <span className="pv2-gap" />
      <Bars widths={["92%", "86%", "90%", "48%"]} />
    </div>
  );
}

/** A surface on its mat of the firm's wash, scaled from the 390 px phone layout to the slot. */
function Mat({ scale, height, style, children }: { scale: number; height: number; style: CSSProperties; children: ReactNode }) {
  return (
    <div className="pv2-mat reg-firm" style={{ ...style, width: Math.round(390 * scale), height }}>
      <div className="pv2-scaled" style={{ transform: `scale(${scale})`, height: height / scale }}>{children}</div>
    </div>
  );
}

const CAPTIONS = ["Preview of a client's page", "Your page for a filing", "An email to a client"];

/**
 * Branding (merged spec 10B.7): the firm's own setup page in CoFile's look, with a sample sheet of the three surfaces its
 * clients see, live as it chooses. The form keeps the product's fields and save; the previews wear the choices.
 */
export function BrandingStudio({ action, v }: { action: Action; v: BrandingValues }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  const [name, setName] = useState(v.displayName ?? "");
  const [logo, setLogo] = useState<string | undefined>(v.logoSrc);
  const [color, setColor] = useState(v.primaryColor ?? "#1f4fd1");
  const [color2, setColor2] = useState(v.secondaryColor ?? v.primaryColor ?? "#0f766e");
  const [font, setFont] = useState(v.font ?? "system");
  const [fontData, setFontData] = useState("");
  const [fontError, setFontError] = useState("");
  const [order, setOrder] = useState([0, 1, 2]);
  const [typing, setTyping] = useState(false);
  const sheetRef = useRef<HTMLDialogElement>(null);

  // The previews show the chosen font: a preset from Google Fonts, or the file just picked.
  useEffect(() => {
    const p = FONT_PRESETS[font];
    if (p?.family && !document.querySelector(`link[data-font="${font}"]`)) {
      const l = document.createElement("link");
      l.rel = "stylesheet"; l.dataset.font = font;
      l.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(p.family).replace(/%20/g, "+")}:wght@400;600&display=swap`;
      document.head.appendChild(l);
    }
    if (font === "custom" && fontData) void new FontFace("FirmFontPreview", `url(${fontData})`).load().then((f) => document.fonts.add(f)).catch(() => setFontError("That file isn't a font we can use."));
  }, [font, fontData]);
  const fontStack = font === "custom" ? (fontData ? `"FirmFontPreview", system-ui` : v.hasCustomFont ? `"FirmFont", system-ui` : "system-ui") : FONT_PRESETS[font]?.stack ?? "system-ui";
  const firm = useFirmStyle(color, color2, fontStack);
  const pickFont = (file: File | undefined) => {
    setFontError("");
    if (!file) return;
    if (file.size > 600 * 1024) { setFontError("The font file must be 600 KB or smaller."); return; }
    const r = new FileReader();
    r.onload = () => { setFontData(String(r.result)); setFont("custom"); };
    r.readAsDataURL(file);
  };

  const surfaces = [
    <ClientPageSurface key="c" name={name} logo={logo} />,
    <FilingPageSurface key="f" name={name} logo={logo} title={v.firstKind} />,
    <EmailSurface key="e" name={name} logo={logo} />,
  ];
  const issue = (k: string) => s?.issues?.[k] ? <p className="help is-error">{s.issues[k]}</p> : null;
  const swap = (slot: number) => setOrder((o) => { const n = [...o]; [n[0], n[slot]] = [n[slot]!, n[0]!]; return n; });

  return (
    <div className="brand2">
      <form {...formProps} className="brand2-form card" onFocus={(e) => { if ((e.target as HTMLElement).matches("input[type=text], input[type=email], input[type=url], input:not([type])")) setTyping(true); }} onBlur={() => setTyping(false)}>
        {s?.error ? <p className="notice bad" role="alert">{s.error}</p> : null}
        <div className="field">
          <label htmlFor="b-slug">Your web address</label>
          <div className="addr2">
            <span className="addr2-site" aria-hidden="true">{(v.siteUrl ?? "").replace(/^https?:\/\//, "")}/</span>
            <input id="b-slug" name="slug" type="text" defaultValue={v.slug} pattern="[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?" maxLength={40} aria-describedby="b-slug-help" spellCheck={false} autoCapitalize="off" />
          </div>
          <p className="help" id="b-slug-help">Your pages for clients live here, one per service. Lowercase letters, digits and dashes. Changing it changes those links.</p>
          {issue("slug")}
        </div>
        <div className="field"><label htmlFor="b-name">Name your clients see</label><input id="b-name" name="displayName" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} /></div>
        <LogoField current={v.logoSrc} currentLink={v.logoUrl} onPreview={setLogo} name={name} />
        {issue("logoUrl")}{issue("data")}
        <ColorField id="b-color" name="primaryColor" label="Main color" value={color} onChange={setColor} help="Buttons and the top of the page. Button text is white, so choose a dark color." below={<InkLine color={color} />} />
        <ColorField id="b-color2" name="secondaryColor" label="Second color" value={color2} onChange={setColor2} help="Links and highlights. Choose a color that's easy to read on white." />
        <div className="field">
          <span className="label" id="b-font-label">Font</span>
          <noscript>
            <select name="font" defaultValue={font} aria-labelledby="b-font-label">
              {Object.entries(FONT_PRESETS).map(([id, p]) => <option key={id} value={id}>{p.label}</option>)}
              {v.hasCustomFont ? <option value="custom">Your own font (uploaded)</option> : null}
            </select>
          </noscript>
          <FontPicker value={font} onChange={setFont} hasCustom={v.hasCustomFont || Boolean(fontData)} />
          <input type="hidden" name="font" value={font} />
          <label className="fontp2-upload">Or upload your own (WOFF2, WOFF, TTF or OTF, up to 600 KB)
            <input type="file" accept=".woff2,.woff,.ttf,.otf,font/woff2,font/woff,font/ttf,font/otf" onChange={(e) => pickFont(e.target.files?.[0])} />
          </label>
          <input type="hidden" name="fontData" value={fontData} />
          {fontError ? <p className="help is-error" role="alert">{fontError}</p> : null}
          {issue("font")}
        </div>
        <div className="field"><label htmlFor="b-sup">Support email shown to clients</label><input id="b-sup" name="supportEmail" type="email" defaultValue={v.supportEmail} />{issue("supportEmail")}</div>
        <button className="btn primary is-main" type="submit" disabled={pending}>{pending ? "Saving…" : "Save and continue"}</button>
      </form>

      {/* The sample sheet: the client's page large, the other two beside it; a thumbnail swaps into the large slot */}
      <aside className="brand2-panel" aria-label="Previews">
        <p className="brand2-caption">{CAPTIONS[order[0]!]}</p>
        <div className="brand2-suite">
          <div className="brand2-large" aria-live="polite"><Mat scale={0.8} height={600} style={firm}>{surfaces[order[0]!]}</Mat></div>
          <div className="brand2-thumbs">
            {[1, 2].map((slot) => (
              <button key={order[slot]} type="button" className="brand2-thumb" onClick={() => swap(slot)} aria-label={`Show larger: ${CAPTIONS[order[slot]!]}`}>
                <Mat scale={0.53} height={286} style={firm}>{surfaces[order[slot]!]}</Mat>
                <span className="brand2-thumb-caption">{CAPTIONS[order[slot]!]}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Phones: a live strip under the header while the form scrolls, and the three previews in a sheet */}
      <button type="button" className={["brand2-strip", typing && "is-hidden"].filter(Boolean).join(" ")} onClick={() => sheetRef.current?.showModal()} aria-haspopup="dialog">
        <span className="brand2-strip-caption">{CAPTIONS[0]}<span className="brand2-chevron" aria-hidden="true" /></span>
        <span className="brand2-strip-page reg-firm" style={firm}>
          <Letterhead name={name || "Your firm"} logoUrl={logo} />
          <span className="pv2-button">Send for approval</span>
        </span>
      </button>
      <dialog ref={sheetRef} className="brand2-sheet" aria-label="Previews" onClick={(e) => { if (e.target === e.currentTarget) sheetRef.current?.close(); }}>
        <div className="brand2-sheet-head">
          <span>Previews</span>
          <button type="button" className="btn small" onClick={() => sheetRef.current?.close()}>Close</button>
        </div>
        <div className="brand2-carousel">
          {surfaces.map((sf, i) => (
            <figure key={i} className="brand2-slide">
              <Mat scale={0.8} height={600} style={firm}>{sf}</Mat>
              <figcaption>{CAPTIONS[i]}</figcaption>
            </figure>
          ))}
        </div>
      </dialog>
    </div>
  );
}
