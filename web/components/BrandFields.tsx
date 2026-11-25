"use client";

import { useState } from "react";

/** Colors offered with one tap; any other comes from the picker or a typed hex code. */
export const SWATCHES = ["#1f4fd1", "#0f766e", "#15803d", "#b45309", "#b91c1c", "#7e22ce", "#be185d", "#334155", "#111827"];

const HEX = /^#[0-9a-fA-F]{6}$/;

/** A brand color: a color picker, its hex code (typed or pasted) and a row of ready colors. */
export function ColorField({ id, name, label, value, onChange, help }: { id: string; name: string; label: string; value: string; onChange: (v: string) => void; help?: string }) {
  const [text, setText] = useState(value);
  const set = (v: string) => { setText(v); if (HEX.test(v)) onChange(v.toLowerCase()); };
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="row" style={{ gap: 8, flexWrap: "nowrap" }}>
        <input type="color" aria-label={`${label}, picker`} value={HEX.test(value) ? value : "#1f4fd1"} onChange={(e) => set(e.target.value)} style={{ width: 48, height: 40, padding: 2, flex: "none" }} />
        <input id={id} name={name} type="text" value={text} onChange={(e) => set(e.target.value.trim())} pattern="#[0-9a-fA-F]{6}" maxLength={7} placeholder="#1f4fd1" style={{ width: 110, flex: "none", fontFamily: "ui-monospace, monospace" }} />
      </div>
      <div className="row" style={{ gap: 6, marginTop: 8 }} role="group" aria-label={`Ready colors for ${label.toLowerCase()}`}>
        {SWATCHES.map((c) => (
          <button key={c} type="button" title={c} aria-label={c} onClick={() => set(c)}
            style={{ width: 22, height: 22, borderRadius: 6, background: c, border: value.toLowerCase() === c ? "2px solid var(--text)" : "1px solid var(--border)", padding: 0, cursor: "pointer" }} />
        ))}
      </div>
      {text && !HEX.test(text) ? <p className="help" style={{ color: "var(--bad)" }}>Use a hex code like #1f4fd1.</p> : help ? <p className="help">{help}</p> : null}
    </div>
  );
}

/** Largest picture we send after shrinking; the engine keeps up to 512 KB. */
const MAX_SEND = 380 * 1024;
const MAX_SIDE = 600;
const TYPES = ["image/png", "image/jpeg", "image/webp"];

function readAsDataUrl(f: Blob): Promise<string> {
  return new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(String(r.result)); r.onerror = () => reject(r.error); r.readAsDataURL(f); });
}

/** A small picture as a data URL: the file itself when it's already small, else redrawn at most 600 px wide or high. */
export async function shrinkLogo(file: File): Promise<string> {
  if (!TYPES.includes(file.type)) throw new Error("Choose a PNG, JPEG or WebP picture.");
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => { const i = new Image(); i.onload = () => resolve(i); i.onerror = () => reject(new Error("That picture couldn't be opened.")); i.src = url; });
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    if (scale === 1 && file.size <= MAX_SEND) return readAsDataUrl(file);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
    for (const [type, q] of [["image/png", undefined], ["image/webp", 0.9], ["image/jpeg", 0.88]] as const) {
      const d = canvas.toDataURL(type, q);
      if (d.startsWith(`data:${type}`) && d.length * 0.75 <= MAX_SEND) return d;
    }
    throw new Error("That picture is too large. Try a smaller one.");
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * A logo: upload a picture (sent with the form as logoData), or paste a link (logoUrl), or
 * remove it (logoRemove). onPreview gets what the page should show now.
 */
export function LogoField({ current, currentLink, onPreview }: { current?: string; currentLink?: string; onPreview: (src: string | undefined) => void }) {
  const [data, setData] = useState("");
  const [link, setLink] = useState(currentLink ?? "");
  const [removed, setRemoved] = useState(false);
  const [err, setErr] = useState("");
  const [showLink, setShowLink] = useState(Boolean(currentLink));
  const has = !removed && (data || link || current);

  async function pick(f: File | undefined) {
    setErr("");
    if (!f) return;
    try {
      const d = await shrinkLogo(f);
      setData(d); setRemoved(false); setLink(""); onPreview(d);
    } catch (e) { setErr((e as Error).message); }
  }

  return (
    <div className="field">
      <label htmlFor="logo-file">Logo</label>
      <input id="logo-file" type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => void pick(e.target.files?.[0])} />
      <input type="hidden" name="logoData" value={data} />
      <input type="hidden" name="logoRemove" value={removed ? "1" : ""} />
      <p className="help">A PNG, JPEG or WebP picture. A wide logo on a clear background looks best. Big pictures are shrunk for you.</p>
      {err ? <p className="help" style={{ color: "var(--bad)" }}>{err}</p> : null}
      {has ? (
        <button type="button" className="btn small" onClick={() => { setData(""); setLink(""); setRemoved(true); onPreview(undefined); }}>Remove logo</button>
      ) : null}
      {showLink ? (
        <div className="field" style={{ marginTop: 10 }}>
          <label htmlFor="logo-link">Or a link to your logo</label>
          <input id="logo-link" name="logoUrl" type="url" value={link} placeholder="https://yourfirm.com/logo.png"
            onChange={(e) => { const v = e.target.value; setLink(v); setData(""); setRemoved(false); onPreview(/^https:\/\/\S+$/.test(v) ? v : current); }} />
        </div>
      ) : (
        <p className="small" style={{ margin: "8px 0 0" }}><button type="button" className="linkish" onClick={() => setShowLink(true)}>Use a link instead</button></p>
      )}
    </div>
  );
}
