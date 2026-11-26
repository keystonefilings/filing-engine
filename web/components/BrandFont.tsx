import type { BrandFontSpec } from "@/lib/fonts";

/** Loads a firm's font for its branded pages (the .branded wrapper uses --brand-font). */
export function BrandFont({ font }: { font: BrandFontSpec | null | undefined }) {
  if (!font) return null;
  return (
    <>
      {font.href ? <link rel="stylesheet" href={font.href} precedence="default" /> : null}
      {font.fileUrl ? <style>{`@font-face{font-family:"FirmFont";src:url("${font.fileUrl.replace(/["\\<>]/g, "")}");font-display:swap}`}</style> : null}
    </>
  );
}
