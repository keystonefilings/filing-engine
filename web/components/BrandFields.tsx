"use client";

import { useState } from "react";
import "@/styles/components/brandfields.css";
import { prepareLogoPixels } from "@/lib/logo-process";
import { isWide } from "@/lib/design/logo";
import { LogoImage } from "@/components/ui/LogoImage";

/** Colors offered with one tap; any other comes from the picker or a typed hex code. */
export const SWATCHES = ["#1f4fd1", "#0f766e", "#15803d", "#b45309", "#b91c1c", "#7e22ce", "#be185d", "#334155", "#111827"];

const HEX = /^#[0-9a-fA-F]{6}$/;

/**
 * A brand color (merged spec 10B.7.2): a 56 px swatch that opens the system picker, the hex code beside it in mono,
 * and the nine ready colors as 32 px chamfered swatches, the chosen one ringed. `below` sits under the help: the
 * ink match's line on Branding (10B.7.4).
 */
export function ColorField({ id, name, label, value, onChange, help, below }: { id: string; name: string; label: string; value: string; onChange: (v: string) => void; help?: string; below?: React.ReactNode }) {
  const [text, setText] = useState(value);
  const set = (v: string) => { setText(v); if (HEX.test(v)) onChange(v.toLowerCase()); };
  const bad = Boolean(text) && !HEX.test(text);
  return (
    <div className="field colorf2">
      <label htmlFor={id}>{label}</label>
      <div className="colorf2-row">
        <span className="colorf2-swatch" style={{ background: HEX.test(value) ? value : "#1f4fd1" }}>
          <input type="color" aria-label={`${label}, picker`} value={HEX.test(value) ? value : "#1f4fd1"} onChange={(e) => set(e.target.value)} />
        </span>
        <input id={id} name={name} type="text" className="colorf2-hex" value={text} onChange={(e) => set(e.target.value.trim())} pattern="#[0-9a-fA-F]{6}" maxLength={7} placeholder="#1f4fd1" spellCheck={false} autoCapitalize="off" aria-invalid={bad || undefined} aria-describedby={`${id}-help`} />
      </div>
      <div className="colorf2-ready" role="group" aria-label={`Ready colors for ${label.toLowerCase()}`}>
        {SWATCHES.map((c) => (
          <button key={c} type="button" title={c} aria-label={c} aria-pressed={value.toLowerCase() === c} onClick={() => set(c)} style={{ background: c }} />
        ))}
      </div>
      {bad ? <p className="help is-error" id={`${id}-help`}>Use a hex code like #1f4fd1.</p> : help ? <p className="help" id={`${id}-help`}>{help}</p> : null}
      {below}
    </div>
  );
}

/** Largest picture we send after shrinking; the engine keeps up to 512 KB. */
const MAX_SEND = 380 * 1024;
const MAX_SIDE = 600;
const TYPES = ["image/png", "image/jpeg", "image/webp"];


/**
 * A logo ready for the pages (merged spec 3.5.1), as a data URL: a white box around it read away (from the edges
 * inward, so white inside the logo stays), its empty margin trimmed, at most 600 px wide or high. PNG or WebP keep the
 * transparency; a JPEG fallback is flattened onto white.
 */
export async function shrinkLogo(file: File): Promise<string> {
  if (!TYPES.includes(file.type)) throw new Error("Choose a PNG, JPEG or WebP picture.");
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => { const i = new Image(); i.onload = () => resolve(i); i.onerror = () => reject(new Error("That picture couldn't be opened.")); i.src = url; });
    // Read the full picture once at a working size (the 600 px result needs no more), clear its box and find its margin.
    const work = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
    const src = document.createElement("canvas");
    src.width = Math.max(1, Math.round(img.naturalWidth * work));
    src.height = Math.max(1, Math.round(img.naturalHeight * work));
    const sctx = src.getContext("2d", { willReadFrequently: true });
    if (!sctx) throw new Error("That picture couldn't be opened.");
    sctx.drawImage(img, 0, 0, src.width, src.height);
    const pixels = sctx.getImageData(0, 0, src.width, src.height);
    const box = prepareLogoPixels(pixels.data, src.width, src.height);
    sctx.putImageData(pixels, 0, 0);
    const scale = Math.min(1, MAX_SIDE / Math.max(box.width, box.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(box.width * scale));
    canvas.height = Math.max(1, Math.round(box.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("That picture couldn't be opened.");
    ctx.drawImage(src, box.x, box.y, box.width, box.height, 0, 0, canvas.width, canvas.height);
    for (const [type, q] of [["image/png", undefined], ["image/webp", 0.9]] as const) {
      const d = canvas.toDataURL(type, q);
      if (d.startsWith(`data:${type}`) && d.length * 0.75 <= MAX_SEND) return d;
    }
    const flat = document.createElement("canvas");
    flat.width = canvas.width; flat.height = canvas.height;
    const fctx = flat.getContext("2d")!;
    fctx.fillStyle = "#fff"; fctx.fillRect(0, 0, flat.width, flat.height); fctx.drawImage(canvas, 0, 0);
    const jpeg = flat.toDataURL("image/jpeg", 0.88);
    if (jpeg.length * 0.75 <= MAX_SEND) return jpeg;
    throw new Error("That picture is too large. Try a smaller one.");
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * A logo (merged spec 10B.7.3): the logo bay, drawn at the plate's proportion with its bevel line, not a dashed drop
 * zone (dashes mean rehearsal). Before a logo it holds the help and the file button, and takes a dropped file; after,
 * two halves: the file as uploaded on a transparency grid, and the logo as clients will see it on white beside the
 * name. Sends logoData (an upload), logoUrl (a link) or logoRemove, as before. onPreview gets what pages show now.
 */
export function LogoField({ current, currentLink, onPreview, name }: { current?: string; currentLink?: string; onPreview: (src: string | undefined) => void; name?: string }) {
  const [data, setData] = useState("");
  const [link, setLink] = useState(currentLink ?? "");
  const [removed, setRemoved] = useState(false);
  const [err, setErr] = useState("");
  const [over, setOver] = useState(false);
  // A wide logo is a wordmark that already spells the name, so the typed name stays hidden beside it (3.5.2).
  const [wide, setWide] = useState(false);
  const [showLink, setShowLink] = useState(Boolean(currentLink));
  const shown = removed ? undefined : data || (/^https:\/\/\S+$/.test(link) ? link : undefined) || current;

  async function pick(f: File | undefined) {
    setErr("");
    if (!f) return;
    try {
      const d = await shrinkLogo(f);
      setData(d); setRemoved(false); setLink(""); onPreview(d);
    } catch (e) { setErr((e as Error).message); }
  }

  return (
    <div className="field logof2">
      <label htmlFor="logo-file">Logo</label>
      <div
        className={["logof2-bay", shown && "has-logo", over && "is-over"].filter(Boolean).join(" ")}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); void pick(e.dataTransfer.files?.[0]); }}
      >
        {shown ? (
          <>
            <figure className="logof2-half is-upload">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <span className="logof2-grid"><img src={shown} alt="" /></span>
              <figcaption>as uploaded</figcaption>
            </figure>
            <figure className="logof2-half is-page">
              <span className="logof2-sheet">
                {/* Read from its pixels as it loads (lib/design/logo.ts): light marks show on their plate, as on the pages. */}
                <LogoImage src={shown} alt="" place="preview" className="logof2-logo" onInfo={(i) => setWide(!!i && isWide(i.ratio))} />
                {name && !wide ? <span className="logof2-name">{name}</span> : null}
              </span>
              <figcaption>on your pages</figcaption>
            </figure>
          </>
        ) : (
          <p className="logof2-help" id="logo-help">A PNG, JPEG or WebP picture. A wide logo on a clear background looks best. Big pictures are shrunk for you.</p>
        )}
        <span className={shown ? "logof2-file is-again" : "logof2-file"}>
          <input id="logo-file" type="file" accept="image/png,image/jpeg,image/webp" aria-describedby={shown ? undefined : "logo-help"} onChange={(e) => void pick(e.target.files?.[0])} />
        </span>
      </div>
      <input type="hidden" name="logoData" value={data} />
      <input type="hidden" name="logoRemove" value={removed ? "1" : ""} />
      {err ? <p className="help is-error" role="alert">{err}</p> : null}
      <div className="logof2-actions">
        {shown ? <button type="button" className="linkish" onClick={() => { setData(""); setLink(""); setRemoved(true); onPreview(undefined); }}>Remove logo</button> : null}
        {showLink ? null : <button type="button" className="linkish" onClick={() => setShowLink(true)}>Use a link instead</button>}
      </div>
      {showLink ? (
        <div className="field logof2-link">
          <label htmlFor="logo-link">Or a link to your logo</label>
          <input id="logo-link" name="logoUrl" type="url" value={link} placeholder="https://yourfirm.com/logo.png"
            onChange={(e) => { const v = e.target.value; setLink(v); setData(""); setRemoved(false); onPreview(/^https:\/\/\S+$/.test(v) ? v : current); }} />
        </div>
      ) : null}
    </div>
  );
}
