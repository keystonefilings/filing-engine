import { PHOTOS, type PhotoName } from "@/lib/photography";

/** Phones take the photograph's own phone crop below this width (6.2). */
export const PHONE = "(max-width: 599px)";

/**
 * One of the owner's photographs (merged spec 7.4, 7.9), with its intrinsic width and height so its box is reserved
 * before it loads, and its phone crop on phones. Square-cut, never tinted; dark mode darkens it 4% in CSS.
 */
export function Photo({ name, mobile, alt, className, eager, sizes }: {
  name: PhotoName; mobile?: PhotoName; alt: string; className?: string; eager?: boolean; sizes?: string;
}) {
  const p = PHOTOS[name];
  const m = mobile ? PHOTOS[mobile] : null;
  return (
    <picture className={["ph", className].filter(Boolean).join(" ")}>
      {m ? <source media={PHONE} srcSet={m.src} width={m.width} height={m.height} /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.src} width={p.width} height={p.height} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" sizes={sizes} />
    </picture>
  );
}
