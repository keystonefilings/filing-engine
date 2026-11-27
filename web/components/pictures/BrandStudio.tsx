"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { SWATCHES } from "@/components/BrandFields";
import { FONT_PRESETS } from "@/lib/fonts";
import { announceName, readColor, readName, writeColor, writeName } from "./carry";
import { ClientPagePicture } from "./ClientPagePicture";
import { colorStyle, FIRMS, FirmName, HarborPineLettering, HarborPineSymbol } from "./examples";

const HEX = /^#[0-9a-fA-F]{6}$/;
const HP = FIRMS.hp;

/** Stand-in words (COPY-NEEDED): the studio's group name, and each thumbnail's name (as the Branding page's own stand-ins). */
const TRAY_NAME = "Try your firm's name and color";
const CAPTIONS = ["Preview of a client's page", "Your page for a filing", "An email to a client"];
const SHOW_LARGER = (c: string) => `Show larger: ${c}`;

/** Up to two initials from the first two significant words (3.5.5): "Harbor & Pine CPA" becomes "HP". */
function initials(name: string): string {
  const skip = new Set(["&", "and", "the", "of", "cpa", "cpas", "llc", "llp", "pc", "inc", "inc.", "group"]);
  return name.split(/\s+/).filter((w) => w && !skip.has(w.toLowerCase()) && /^[\p{L}\p{N}]/u.test(w)).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");
}

/**
 * Your brand, everywhere at once (L11; merged spec 10A.2.2, M12): three of the product's own Branding controls with
 * their own labels, and the three pages a firm's clients see, live, one large and two as thumbnails that swap into it.
 * It starts as Harbor & Pine, or with the name the visitor typed at the home page's Close (this tab's sessionStorage,
 * never sent). Once the name is edited, Harbor & Pine's logo is dropped and each Letterhead is the typeset name alone;
 * the email's avatar becomes the monogram tile. The desk above never changes: it is CoFile's.
 */
export function BrandStudio() {
  const [name, setName] = useState(HP.name);
  const [edited, setEdited] = useState(false);
  const [color, setColor] = useState(HP.color);
  const [font, setFont] = useState("lora");
  const [order, setOrder] = useState([0, 1, 2]);
  const [stamp, setStamp] = useState(0);
  const save = useRef(0);

  useEffect(() => {
    const n = readName();
    if (n) { setName(n); setEdited(n !== HP.name); }
    const c = readColor();
    if (c) setColor(c);
  }, []);

  // The chosen face loads from the presets' own source, as Branding loads it.
  useEffect(() => {
    const p = FONT_PRESETS[font];
    if (p?.family && !document.querySelector(`link[data-font="${font}"]`)) {
      const l = document.createElement("link");
      l.rel = "stylesheet"; l.dataset.font = font;
      l.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(p.family).replace(/%20/g, "+")}:ital,wght@0,600;1,600&display=swap`;
      document.head.appendChild(l);
    }
  }, [font]);

  const stack = FONT_PRESETS[font]?.stack ?? FONT_PRESETS.system!.stack;
  const style = useMemo<CSSProperties>(() => (HEX.test(color) ? colorStyle(color, stack) : colorStyle(HP.color, stack)), [color, stack]);
  // Harbor & Pine's own second color stays with its own name and color; any other choice has the main color alone.
  const firmStyleNow = useMemo<CSSProperties>(() => (!edited && color.toLowerCase() === HP.color.toLowerCase() ? { ...style, ["--firm-2" as string]: HP.color2! } : style), [edited, color, style]);

  const onName = (v: string) => {
    setName(v); setEdited(true);
    window.clearTimeout(save.current);
    save.current = window.setTimeout(() => { writeName(v); announceName(v); }, 300);
  };
  const onColor = (c: string) => { setColor(c); setStamp((s) => s + 1); if (HEX.test(c)) writeColor(c); };

  const shown = name.trim() || "Your firm";
  const logo = !edited;
  const head = (centred?: boolean): ReactNode => (
    <div className={["pv-lh", centred && "is-centred"].filter(Boolean).join(" ")}>
      {logo ? <><HarborPineSymbol size={centred ? 40 : 48} /><HarborPineLettering size={20} /></>
        : centred ? <><span className="pv-mono" aria-hidden="true">{initials(shown) || "·"}</span><FirmName name={shown} className="pv-name" /></>
          : <FirmName name={shown} className="pv-name is-alone" />}
    </div>
  );
  const rule = <div className="pv-rule" aria-hidden="true"><i /><i /></div>;

  const surfaces: ReactNode[] = [
    <ClientPagePicture key="client" brand={{
      name: shown, style: firmStyleNow,
      mark: logo ? <><HarborPineSymbol size={48} className="cpp-symbol" /><HarborPineLettering size={20} className="cpp-lettering" /></> : <FirmName name={shown} className="cpp-name is-alone" />,
    }} />,
    <div key="filing" className="pv-wash reg-firm" style={firmStyleNow}>
      <div className="pv-sheet">
        {head()}{rule}
        <p className="pv-title">New Jersey LLC formation</p>
        <span className="pv-bar" style={{ width: "88%" }} /><span className="pv-bar" style={{ width: "70%" }} />
        <span className="pv-field" />
        <span className="pv-btn">Send to {shown}</span>
      </div>
    </div>,
    <div key="email" className="pv-wash reg-firm" style={firmStyleNow}>
      <div className="pv-sheet">
        {head(true)}{rule}
        <p className="pv-headline">More information needed:</p>
        <span className="pv-bar" style={{ width: "54%", marginInline: "auto" }} />
        <span className="pv-bar" style={{ width: "92%", marginTop: 24 }} /><span className="pv-bar" style={{ width: "86%" }} /><span className="pv-bar" style={{ width: "90%" }} /><span className="pv-bar" style={{ width: "48%" }} />
      </div>
    </div>,
  ];
  const swap = (slot: number) => setOrder((o) => { const n = [...o]; [n[0], n[slot]] = [n[slot]!, n[0]!]; return n; });

  return (
    <div className="pstudio">
      <div className="pstudio-tray" role="group" aria-label={TRAY_NAME}>
        <div>
          <label htmlFor="ff-name">Name your clients see</label>
          <input id="ff-name" type="text" value={name} maxLength={80} autoComplete="organization" spellCheck={false} onChange={(e) => onName(e.target.value)} />
        </div>
        <fieldset>
          <legend>Main color</legend>
          <div className="pstudio-swatches" role="group" aria-label="Ready colors for main color">
            {[HP.color, ...SWATCHES].map((c) => (
              <button key={c} type="button" className="pstudio-swatch" style={{ background: c }} aria-label={c} aria-pressed={color.toLowerCase() === c.toLowerCase()} onClick={() => onColor(c)} />
            ))}
            <span className="pstudio-picker"><input type="color" aria-label="Main color, picker" value={HEX.test(color) ? color : HP.color} onChange={(e) => onColor(e.target.value)} /></span>
            <span className="pstudio-hex">{color.toUpperCase()}</span>
          </div>
        </fieldset>
        <div>
          <label htmlFor="ff-font">Font</label>
          <select id="ff-font" value={font} onChange={(e) => setFont(e.target.value)}>
            {Object.entries(FONT_PRESETS).map(([id, p]) => <option key={id} value={id}>{p.label}</option>)}
          </select>
        </div>
      </div>
      <div className="pstudio-previews">
        <div className="pstudio-large" role="img" aria-label={CAPTIONS[order[0]!]}>
          <div key={`${order[0]}-${stamp}`} className="pstudio-swap">{surfaces[order[0]!]}</div>
        </div>
        <div className="pstudio-thumbs">
          {[1, 2].map((slot) => (
            <button key={slot} type="button" className="pstudio-thumb" aria-label={SHOW_LARGER(CAPTIONS[order[slot]!]!)} onClick={() => swap(slot)}>
              <span key={`${order[slot]}-${stamp}`} className="pstudio-swap" aria-hidden="true">{surfaces[order[slot]!]}</span>
              <span className="pstudio-cap">{CAPTIONS[order[slot]!]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
