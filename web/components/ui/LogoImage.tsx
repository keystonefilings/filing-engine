"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { analyzeLogoPixels, isWide, logoPlate, logoSize, type LogoInfo, type LogoSurface } from "@/lib/design/logo";
import { PLATE_INK } from "@/lib/design/ink";

/**
 * A firm's logo, shown as the merged spec's 3.5.1 says on every surface: sized by area, never touched, and when its
 * marks are light (a logo drawn for a dark website) on its plate. The engine's reading comes in as `info`; a logo it
 * hasn't read (a link, a fresh upload in Branding's preview) is read here from its pixels once it loads, with the same
 * reading (lib/design/logo.ts). A picture from another site can't be read, so only its shape is known.
 */

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Readings made in this page, by address: a logo shown in four previews is read once. */
const READ = new Map<string, LogoInfo>();

/** The side the browser reads a logo at: enough for its ink, quick for a 4000 px picture. */
const READ_SIDE = 400;

function readImage(img: HTMLImageElement): LogoInfo | null {
  const w = img.naturalWidth, h = img.naturalHeight;
  if (!w || !h) return null;
  const shape: LogoInfo = { v: 1, width: w, height: h, ratio: Math.round((w / h) * 1000) / 1000, background: "busy", inkL: 0, ink: "#000000", light: false };
  try {
    const k = Math.min(1, READ_SIDE / Math.max(w, h));
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(w * k)); c.height = Math.max(1, Math.round(h * k));
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return shape;
    ctx.drawImage(img, 0, 0, c.width, c.height);
    const read = analyzeLogoPixels(ctx.getImageData(0, 0, c.width, c.height).data, c.width, c.height);
    return { ...read, width: w, height: h, ratio: shape.ratio };
  } catch {
    // Another site's picture taints the canvas: its shape is all there is to know.
    return shape;
  }
}

/** The logo's reading: the given one, else one made here when the picture loads. */
export function useLogoInfo(src: string | undefined, given?: LogoInfo) {
  const [read, setRead] = useState<LogoInfo | undefined>(() => (src ? READ.get(src) : undefined));
  const ref = useRef<HTMLImageElement>(null);
  const onLoad = useCallback(() => {
    const img = ref.current;
    if (given || !img || !src) return;
    const hit = READ.get(src) ?? readImage(img);
    if (!hit) return;
    READ.set(src, hit);
    setRead(hit);
  }, [given, src]);
  // A picture that loaded before the page came alive fires no load event to listen to.
  useEffect(() => {
    setRead(src ? READ.get(src) : undefined);
    if (ref.current?.complete && ref.current.naturalWidth) onLoad();
  }, [src, onLoad]);
  return { info: given ?? read, ref, onLoad };
}

/** The two area rules each surface uses, wide screens then narrow (3.5.1, 10B.3.3). */
const SIZES: Partial<Record<"sheet" | "preview" | "row", [LogoSurface, LogoSurface]>> = {
  sheet: ["sheet", "phone"],
  preview: ["phone", "phone"],
  row: ["row", "rowPhone"],
};

export type LogoPlace = "sheet" | "preview" | "row" | "label" | "mark";

/**
 * The img, with its size by area as custom properties (`--lw`, `--lh`, and `--lw-s`, `--lh-s` for narrow screens, read by
 * the surface's own CSS), `is-sized` once its shape is known, and `is-plate` for light marks on a white surface (sheets,
 * previews, a white-label desk's row), whose color is the register's --firm-fill where the marks read at 3:1 on it,
 * else Plate Ink. On CoFile's own surfaces (`label`, `mark`) the plate is always Plate Ink and belongs to the wrapper,
 * which takes `is-light` (shell.css, dashboard.css).
 */
export function LogoImage({ src, alt, info: given, place, className, wrap, onInfo }: {
  src: string; alt: string; info?: LogoInfo; place: LogoPlace; className?: string;
  /** A wrapper span's class: it takes `is-light` for a light-marks logo. */
  wrap?: string;
  onInfo?: (info: LogoInfo | undefined) => void;
}) {
  const { info, ref, onLoad } = useLogoInfo(src, given);
  const onInfoRef = useRef(onInfo);
  onInfoRef.current = onInfo;
  useEffect(() => { onInfoRef.current?.(info); }, [info]);
  const onSheet = place === "sheet" || place === "preview" || place === "row";
  const plated = onSheet && !!info?.light;
  // The plate's color follows the register the logo sits in, so Branding's live colors move it too.
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!plated) { el.style.removeProperty("--logo-plate"); return; }
    // Only a firm's own register carries its fill (tokens.css sets an example firm's at the root); elsewhere, Plate Ink.
    const fill = el.closest(".reg-firm, .reg-white") ? getComputedStyle(el).getPropertyValue("--firm-fill").trim() : "";
    el.style.setProperty("--logo-plate", /^#[0-9a-f]{6}$/i.test(fill) ? logoPlate(info, fill) ?? PLATE_INK : PLATE_INK);
  });
  const pair = SIZES[place as keyof typeof SIZES];
  let style: CSSProperties | undefined;
  if (pair && info) {
    const a = logoSize(info, pair[0]), b = logoSize(info, pair[1]);
    style = { ["--lw" as string]: `${a.width}px`, ["--lh" as string]: `${a.height}px`, ["--lw-s" as string]: `${b.width}px`, ["--lh-s" as string]: `${b.height}px` };
  }
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      onLoad={onLoad}
      className={[className, style && "is-sized", plated && "is-plate"].filter(Boolean).join(" ") || undefined}
      style={style}
      data-logo={info ? (info.light ? "light" : info.background) : undefined}
    />
  );
  if (!wrap) return img;
  return <span className={[wrap, !onSheet && info?.light && "is-light"].filter(Boolean).join(" ")}>{img}</span>;
}

/**
 * A platform's white-label desk row (10B.3.3): its logo by area at the row's size with the name typeset beside a square
 * or mid logo (a wide one spells it), or the name alone, never wrapping.
 */
export function BrandRowMark({ name, logoUrl, logo }: { name: string; logoUrl?: string; logo?: LogoInfo }) {
  const [info, setInfo] = useState<LogoInfo | undefined>(logo);
  useEffect(() => { setInfo(logo); }, [logo, logoUrl]);
  if (!logoUrl) return <span className="shell2-brand-name">{name}</span>;
  const named = !!info && !isWide(info.ratio);
  return (
    <>
      <LogoImage src={logoUrl} alt={named ? "" : name} info={logo} place="row" className="shell2-brand-logo" onInfo={logo ? undefined : setInfo} />
      {named ? <span className="shell2-brand-name">{name}</span> : null}
    </>
  );
}

/**
 * The Letterhead's first row (3.5): the logo or the typeset name. A square or mid logo has the name typeset beside it;
 * a wide one (r ≥ 2.5) almost always spells it, so the name is its alt text instead (3.5.2). Before the logo's shape is
 * known, the logo stands alone with the name as its alt.
 */
export function LetterheadRow({ name, logoUrl, logo, preview }: { name: string; logoUrl?: string; logo?: LogoInfo; preview?: boolean }) {
  const [info, setInfo] = useState<LogoInfo | undefined>(logo);
  useEffect(() => { setInfo(logo); }, [logo, logoUrl]);
  if (!logoUrl) return <div className="letterhead2-row"><span className="letterhead2-name is-alone">{name}</span></div>;
  const named = !!info && !isWide(info.ratio);
  return (
    <div className="letterhead2-row">
      <LogoImage src={logoUrl} alt={named ? "" : name} info={logo} place={preview ? "preview" : "sheet"} className="letterhead2-logo" onInfo={logo ? undefined : setInfo} />
      {named ? <span className="letterhead2-name">{name}</span> : null}
    </div>
  );
}
