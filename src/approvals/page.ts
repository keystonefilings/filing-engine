import { color, font } from "../design/tokens.js";
import { firmVars, inkMatch } from "../design/ink.js";

/**
 * The page shell for the proof and the pages around it (merged spec 11.5, 10B.22, decision 2).
 * Server-rendered with inline styles and no scripts, so it works with JavaScript off.
 *
 * Whose look (the Stripe model): a partner firm approves its own proof, so the proof is in CoFile's look,
 * the same for every firm, with the firm and its client named as text. A proof a platform's own clients
 * approve is white label: the platform's (or its firm's) logo and color, and nothing of CoFile.
 */
export interface PageLook {
  look: "cofile" | "white";
  /** CoFile's look: the firm and its client, named in the sheet's head as text. */
  firmName?: string;
  clientName?: string;
  /** White label: whose page it is. */
  brandName?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  font?: { stack: string; href?: string; fileUrl?: string };
  supportEmail?: string;
  /**
   * CoFile's look: the web app's address, where its licensed fonts are served (web/lib/licensed-fonts.ts), so the proof
   * sets in Miller and Founders Grotesk like the desk. Where the files aren't there, the faces fall back as before.
   */
  fontBase?: string;
}

/** CoFile's faces from the web app, with the same metric overrides it uses (web/lib/licensed-fonts.ts). */
function cofileFaces(base: string): string {
  const b = base.replace(/\/+$/, "");
  const face = (family: string, file: string, weight: string, style: string, asc: string, desc: string) =>
    `@font-face{font-family:"${family}";src:url("${esc(b)}/fonts/${file}.woff2") format("woff2");font-weight:${weight};font-style:${style};font-display:swap;ascent-override:${asc};descent-override:${desc};line-gap-override:0%}`;
  return `<style>${[
    face("Miller Text", "miller-text-400", "400", "normal", "95%", "25%"),
    face("Miller Text", "miller-text-400-italic", "400", "italic", "95%", "25%"),
    face("Miller Text", "miller-text-600", "500 700", "normal", "95%", "25%"),
    face("Founders Grotesk", "founders-grotesk-400", "400", "normal", "81.5%", "18.5%"),
    face("Founders Grotesk", "founders-grotesk-500", "500", "normal", "81.5%", "18.5%"),
    face("Founders Grotesk", "founders-grotesk-600", "600 700", "normal", "81.5%", "18.5%"),
  ].join("")}</style>`;
}

export function esc(s: unknown): string {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

const L = color.light, D = color.dark;
const HEX = /^#[0-9a-fA-F]{6}$/;

/** The shared stylesheet: CoFile's tokens, the sheet, type roles, fields, buttons, chips (11.1-11.6). */
function styles(p: PageLook): string {
  const white = p.look === "white";
  const firm = white && p.primaryColor && HEX.test(p.primaryColor)
    ? firmVars(inkMatch(p.primaryColor, p.secondaryColor && HEX.test(p.secondaryColor) ? p.secondaryColor : null))
    : null;
  const firmCss = firm ? Object.entries(firm).map(([k, v]) => `${k}:${v}`).join(";") : "";
  // CoFile's serif never appears on a platform's page (3.7): its own font, else the plain grotesk.
  const headFont = !white ? font.display
    : p.font ? `${p.font.fileUrl ? `"FirmFont",` : ""}${p.font.stack.replace(/[<>;{}]/g, "")}` : font["sans-display"];
  return `:root{
--cotton:${L.cotton};--cotton-2:${L["cotton-2"]};--bond:${L.bond};--ink:${L.ink};--graphite:${L.graphite};--rule:${L.rule};--rule-strong:${L["rule-strong"]};
--brass:${L.brass};--brass-deep:${L["brass-deep"]};--brass-line:${L["brass-line"]};--brass-tint:${L["brass-tint"]};
--done:${L.done};--done-tint:${L["done-tint"]};--ochre:${L.ochre};--ochre-tint:${L["ochre-tint"]};--madder:${L.madder};--madder-tint:${L["madder-tint"]};
--night:${L.night};--font-display:${font.display};--font-head:${headFont};--font-sans:${font.sans};--font-sans-d:${font["sans-display"]};--font-mono:${font.mono};
${white ? `--page:${firm ? "var(--firm-wash)" : L.bond};--action:${firm ? "var(--firm-fill)" : L.ink};--action-hover:${firm ? "var(--firm-fill-hover)" : "#33374A"};--action-on:${firm ? "var(--firm-on)" : "#fff"};--action-border:${firm ? "var(--firm-fill-border)" : "transparent"};--action-edge:${firm ? "var(--firm-fill-edge)" : "transparent"};--link:${firm ? "var(--firm-ink)" : L.ink};--link-line:${firm ? "var(--firm-ink)" : L.ink};--focus:${firm ? "var(--firm-ink)" : L.ink};--turn-ink:${firm ? "var(--firm-ink)" : L.ink};--turn-glyph:${firm ? "var(--firm)" : L.ink};--halo:${firm ? "color-mix(in srgb,var(--firm-tint) 50%,transparent)" : L["brass-tint"]};`
    : `--page:${L.cotton};--action:${L.brass};--action-hover:${L["brass-deep"]};--action-on:${L.ink};--action-border:transparent;--action-edge:transparent;--link:${L.ink};--link-line:${L["brass-line"]};--focus:${L.ink};--halo:${L["brass-tint"]};`}
${firmCss}}
@media (prefers-color-scheme:dark){:root{--page:${D.cotton}}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--page);color:var(--ink);font:400 1.125rem/1.75rem var(--font-sans);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.page{padding:48px 24px 96px}
.sheet{max-width:760px;margin:0 auto;background:#fff;color:var(--ink);padding:48px;border-radius:2px;box-shadow:0 1px 1px rgba(29,33,48,.05),0 10px 28px -10px rgba(29,33,48,.20)}
@media (prefers-color-scheme:dark){.sheet{box-shadow:0 1px 0 rgba(0,0,0,.40),0 16px 40px -12px rgba(0,0,0,.55)}}
h1,h2,p,dl,dd,figure{margin:0}
a{color:var(--link);text-decoration:underline 1px var(--link-line);text-underline-offset:3px}
a:hover{text-decoration-thickness:2px;text-decoration-color:var(--link)}
a:focus-visible,button:focus-visible{outline:2px solid var(--focus);outline-offset:2px;box-shadow:0 0 0 2px #fff}
.named{text-align:center;font:500 1.0625rem/1.5rem var(--font-sans-d);color:var(--ink);text-wrap:balance;padding-bottom:16px;border-bottom:1px solid var(--ink);margin-bottom:32px}
.lh{display:grid;gap:16px;margin-bottom:32px}
.lh-row{display:flex;justify-content:center;align-items:center;min-height:48px}
.lh-logo{display:block;max-height:48px;max-width:240px;width:auto;object-fit:contain}
.lh-name{font:600 1.5rem/1.875rem var(--font-head);color:var(--ink)}
.rule{display:grid;gap:2px}.rule::before{content:"";height:3px;background:var(--firm,var(--ink))}.rule::after{content:"";height:1px;background:var(--firm-2,var(--ink))}
.rehearsal{position:relative;display:grid;grid-template-columns:16px 1fr;gap:12px;padding:16px 20px;margin-bottom:24px;font-weight:500}
.rehearsal>svg.dash{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.rehearsal>svg.dash rect{fill:none;stroke:currentColor;stroke-width:1.5;stroke-dasharray:4 3;vector-effect:non-scaling-stroke}
.title-row{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:12px 24px}
.title{font:${white ? "600" : "400"} 2.125rem/2.5rem var(--font-head);letter-spacing:${white ? "0" : "-0.005em"};text-wrap:balance;margin:0}
.kind{margin-top:8px;font-size:1rem;line-height:1.5rem;color:var(--graphite)}
.ref{margin-top:16px;font-size:1rem;line-height:1.5rem;color:var(--graphite)}
.ref strong{font-weight:500;color:var(--ink)}
.chip{display:inline-flex;align-items:flex-start;gap:6px;min-height:30px;padding:6px 12px;font:500 .875rem/1.125rem var(--font-sans);border:1px solid transparent;border-radius:6px;corner-shape:bevel;white-space:nowrap}
@supports not (corner-shape:bevel){.chip{border-radius:3px}}
.chip svg{width:12px;height:12px;margin-top:3px;flex:none}
.chip.turn{background:${white ? "#fff" : L["ochre-tint"]};color:${white ? "var(--turn-ink)" : L.ochre};border-color:${white ? "var(--turn-ink)" : "transparent"}}
.chip.turn svg{color:${white ? "var(--turn-glyph)" : L.ochre}}
.terms{margin-top:24px;background:var(--bond);border:1px solid var(--rule);border-radius:2px;padding:24px;font-size:1.0625rem;line-height:1.6875rem}
.terms p+p{margin-top:12px}
h2{margin-top:48px;margin-bottom:8px;font:500 1.375rem/1.75rem var(--font-sans-d);color:var(--ink)}
.lead{font-size:1rem;line-height:1.5rem;color:var(--graphite);margin-bottom:16px;max-width:64ch}
.review{display:block;border:1px solid var(--rule);border-radius:2px;overflow:hidden;background:#fff}
.review img{display:block;width:100%;height:auto}
.details{display:grid;grid-template-columns:38% 1fr;border-top:1px solid var(--rule)}
.details dt,.details dd{padding:12px 0;border-bottom:1px solid var(--rule)}
.details dt{font:500 1rem/1.375rem var(--font-sans);color:var(--graphite);padding-right:16px}
.details dd{font:400 1rem/1.5rem var(--font-mono);color:var(--ink);overflow-wrap:anywhere}
.details .group{grid-column:1/-1;padding:24px 0 4px;border-bottom:0;font:500 .9375rem/1.25rem var(--font-sans);color:var(--graphite)}
.fees{display:grid;gap:10px;border-top:1px solid var(--rule);padding-top:14px}
.fee{display:flex;align-items:baseline;gap:8px;font-size:1.125rem;line-height:1.625rem;font-variant-numeric:tabular-nums lining-nums}
.fee .lead-dots{flex:1;min-width:24px;border-bottom:2px dotted var(--rule-strong);transform:translateY(-6px)}
.fee .amt{white-space:nowrap;text-align:right}
.total{margin-top:6px;padding-top:12px;border-top:1px solid var(--ink);font:500 1.375rem/1.75rem var(--font-sans-d)}
.total .amt{padding-bottom:4px;border-bottom:4px double var(--ink)}
.cap{font-size:1rem;line-height:1.5rem;color:var(--graphite)}
form{margin-top:48px;display:grid;gap:24px}
label{display:grid;gap:8px;font:500 1rem/1.375rem var(--font-sans)}
label .opt{font-weight:400;color:var(--graphite)}
textarea,input{font:400 1.125rem/1.5rem var(--font-sans);color:var(--ink);background:#fff;width:100%;border:1px solid var(--rule-strong);border-radius:2px;padding:14px 16px}
textarea{min-height:120px;resize:vertical}
input.code{font:400 1.5rem/2rem var(--font-mono);letter-spacing:.3em;text-align:center;max-width:280px;min-height:56px}
textarea:focus,input:focus{outline:2px solid var(--focus);outline-offset:2px;border-color:var(--focus);box-shadow:inset 0 0 0 1px var(--focus),0 0 0 2px var(--halo)}
.buttons{display:grid;gap:12px}
button{font:500 1.125rem/1.5rem var(--font-sans-d);min-height:56px;padding:16px 28px;border-radius:6px;corner-shape:bevel;cursor:pointer;border:1px solid transparent;width:100%;text-wrap:balance;transition:background-color 120ms cubic-bezier(.3,0,.2,1)}
@supports not (corner-shape:bevel){button{border-radius:3px}}
button:active{transform:translateY(1px);box-shadow:inset 0 1px 0 rgba(29,33,48,.18)}
button.approve{min-height:60px;padding:18px 32px;background:var(--action);color:var(--action-on);border-color:var(--action-border);box-shadow:inset 4px 0 0 var(--action-edge)}
button.outline{background:transparent;color:var(--ink);border-color:var(--rule-strong)}
@media (hover:hover){button.approve:hover{background:var(--action-hover)}button.outline:hover{background:var(--cotton-2);border-color:var(--ink)}}
.questions{margin-top:32px;font-size:.9375rem;line-height:1.4375rem;color:var(--graphite)}
.page-title{font:${white ? "600" : "400"} 2rem/2.375rem var(--font-head);margin:0 0 16px}
.sheet p.body+p.body{margin-top:12px}
@media (max-width:599px){
.page{padding:0}
.sheet{padding:24px 20px 40px;box-shadow:none;border-radius:0;min-height:100vh}
.title{font-size:1.75rem;line-height:2.125rem}
.details{grid-template-columns:1fr}
.details dt{border-bottom:0;padding-bottom:2px;font-size:.9375rem}
.details dd{padding-top:0;font-size:1.0625rem}
}
@media print{body{background:#fff}.page{padding:0}.sheet{box-shadow:none;max-width:none;padding:0}form{display:none}}`;
}

/** The ghost light and the lozenge, as inline SVG (4.3, 4.4). */
export const GHOST = `<svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"><circle cx="7" cy="4.5" r="3" stroke-width="1.5"/><path d="M3.6 4.5a3.4 3.4 0 0 1 6.8 0M3.9 6.3a3.4 3.4 0 0 0 6.2 0"/><path d="M7 7.6V12.6M4.6 12.8h4.8M7 12.6 5 13.2M7 12.6l2 .6"/></svg>`;
export const LOZENGE = `<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 .8 11.2 6 6 11.2.8 6Z" fill="currentColor"/></svg>`;
export const DASH = `<svg class="dash" aria-hidden="true" preserveAspectRatio="none"><rect x="0" y="0" width="100%" height="100%" rx="3" ry="3"/></svg>`;

/** The page up to the sheet's first content: the document head, styles, and the sheet's head. */
export function pageTop(p: PageLook, title: string): string {
  const fontLinks = p.look === "white" && p.font
    ? `${p.font.href ? `<link rel="stylesheet" href="${esc(p.font.href)}">` : ""}${p.font.fileUrl ? `<style>@font-face{font-family:"FirmFont";src:url("${esc(p.font.fileUrl)}");font-display:swap}</style>` : ""}`
    : p.look === "cofile" && p.fontBase ? cofileFaces(p.fontBase) : "";
  let head = "";
  if (p.look === "cofile") {
    const named = [p.firmName, p.clientName].filter(Boolean).map(esc).join(" · ");
    if (named) head = `<p class="named">${named}</p>`;
  } else if (p.brandName || p.logoUrl) {
    head = `<div class="lh"><div class="lh-row">${p.logoUrl ? `<img class="lh-logo" src="${esc(p.logoUrl)}" alt="${esc(p.brandName ?? "")}">` : `<span class="lh-name">${esc(p.brandName)}</span>`}</div>${p.primaryColor ? `<div class="rule" aria-hidden="true"></div>` : ""}</div>`;
  }
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark"><meta name="robots" content="noindex">
<title>${esc(title)}</title>${fontLinks}<style>${styles(p)}</style></head>
<body><main class="page"><article class="sheet">${head}`;
}

export function pageBottom(p: PageLook): string {
  return `${p.supportEmail ? `<p class="questions">Questions: <a href="mailto:${esc(p.supportEmail)}">${esc(p.supportEmail)}</a></p>` : ""}</article></main></body></html>`;
}

/** A short page in the same sheet: a heading and the engine's own words (decisions, expired links, errors). */
export function messagePage(p: PageLook, heading: string, paragraphs: string[]): string {
  return `${pageTop(p, heading)}<h1 class="page-title">${esc(heading)}</h1>${paragraphs.map((t) => `<p class="body">${esc(t)}</p>`).join("")}${pageBottom(p)}`;
}
