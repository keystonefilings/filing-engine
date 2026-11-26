import { color, font } from "../design/tokens.js";
import { contrast, inkMatch, overWhite, WHITE } from "../design/ink.js";
import { blockText as bodyText, proseLetter, runsText, supportLine, type Block, type FirmLetterhead, type Letter, type Run } from "./letter.js";
import type { OutboundMessage } from "./senders.js";

/**
 * Every email the product sends, as one sheet of letterhead (merged spec 10D). Whose letterhead follows who
 * reads it (decision 2, the Stripe model): CoFile's for the firm, a subscriber's staff and CoFile's account
 * emails; the firm's alone for the firm's clients, with nothing of CoFile on it (decision 12).
 *
 * Built to survive Outlook, Gmail and Apple Mail (10D.2): tables for layout, inline styles plus small <style>
 * blocks for phones and dark mode, live text for everything that carries meaning, a VML button for Outlook
 * for Windows, and every message readable with images off. The sheet stays white in dark mode; only the ground
 * around it goes to Night (10D.16).
 */

const L = color.light;
const INK = L.ink, GRAPHITE = L.graphite, RULE = L.rule, RULE_STRONG = L["rule-strong"], COTTON2 = L["cotton-2"];
const BRASS = L.brass, OCHRE = L.ochre, OCHRE_TINT = L["ochre-tint"], MADDER = L.madder, NIGHT = L.night, BOND = L.bond;
const PALE_RULE = "#E6E7EA";

// Font stacks inside style="…" attributes take single quotes.
const sq = (s: string) => s.replace(/"/g, "'");
const SERIF = sq(font["email-head"]);
const SANS = sq(font["email-body"]);
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

/** The engine's own small images for mail, served at /email-assets (tools/render-email-assets.ts). */
export const EMAIL_ASSETS = {
  /** The ghost light, the rehearsal's sign (4.4), 14 × 14 at 2×. */
  ghost: "ghost-light.png",
  /** CoFile's own document card (3.9), 24 × 32 at 2×. */
  document: "document.png",
} as const;

/** The owner's artwork for mail, in the web app's public folder (web/public/cofile/), on CoFile's letterhead only. */
export const EMAIL_ART = {
  /** The stacked lockup (3.3), 96 × 56 CSS px. */
  lockup: "/cofile/identity/cofile-lockup-stacked-email@2x.png",
  /** Decision 35's two engravings, on white at 2×: the blank Name Plate on the welcome emails (160 × 64, 128 × 52
   *  on phones) and the returned envelope on documents back (120 × 80, 96 × 64 on phones). */
  "blank-plate": "/cofile/vignettes/v01-blank-plate-email@2x.png",
  envelope: "/cofile/vignettes/v03-returned-envelope-email@2x.png",
} as const;

/** Absent either address, its images are left out: every email reads, and its layout holds, without them. */
export interface RenderEmailOptions {
  /** The web app's public address, where CoFile's lockup and the two engravings are served (EMAIL_ART). */
  webBaseUrl?: string;
  /** The engine's /email-assets address, for the ghost light and the document card (EMAIL_ASSETS). */
  assetBaseUrl?: string;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
/** Words set as text: straight apostrophes print as ’ (foundation 5.4). */
const txt = (s: string) => esc(s.replace(/'/g, "’"));

interface Look {
  side: Letter["side"];
  ground: string;
  head: string;
  headWeight: number;
  link: string;
  button: { bg: string; fg: string; border?: string; edge?: string };
  lozenge: string;
  /** The Your-turn and Attention chips: CoFile's Ochre, or the firm's outlined form (10D.6). */
  chip: { bg: string; fg: string; border?: string; glyph: string };
  rule?: { firm: string; firm2: string; pale: boolean };
}

const HEX = /^#[0-9a-fA-F]{6}$/;

function lookOf(l: Letter): Look {
  if (l.side === "cofile") {
    return {
      side: "cofile", ground: COTTON2, head: SERIF, headWeight: 400, link: INK,
      button: { bg: BRASS, fg: INK }, lozenge: OCHRE, chip: { bg: OCHRE_TINT, fg: OCHRE, glyph: OCHRE },
    };
  }
  const f = l.firm;
  const head = f?.font ? `'${f.font.family.replace(/['"<>;{}]/g, "")}', ${SANS}` : SANS;
  if (f?.primaryColor && HEX.test(f.primaryColor)) {
    const k = inkMatch(f.primaryColor, f.secondaryColor && HEX.test(f.secondaryColor) ? f.secondaryColor : null);
    return {
      side: "firm", ground: k.wash, head, headWeight: 600, link: k.ink,
      button: { bg: k.fill, fg: k.on, ...(k.fillBorder ? { border: k.fillBorder } : {}), ...(k.fillEdge ? { edge: k.fillEdge } : {}) },
      lozenge: k.firm, chip: { bg: WHITE, fg: k.ink, border: k.ink, glyph: k.firm },
      rule: { firm: k.firm, firm2: k.firm2, pale: contrast(k.firm, WHITE) < 1.5 },
    };
  }
  // No color chosen yet: Bond under the sheet, and the rule and the button in Plate Ink (3.5).
  return {
    side: "firm", ground: BOND, head, headWeight: 600, link: INK,
    button: { bg: INK, fg: WHITE }, lozenge: INK, chip: { bg: WHITE, fg: INK, border: INK, glyph: INK },
    rule: { firm: INK, firm2: overWhite(INK, 0.35), pale: false },
  };
}

/** Inline type: family, size / line height, weight, color. */
function type(family: string, size: number, lh: number, weight: number, fg: string, extra = ""): string {
  return `font-family:${family};font-size:${size}px;line-height:${lh}px;font-weight:${weight};color:${fg};mso-line-height-rule:exactly;${extra}`;
}

/** A table row exactly n px tall in one color: the letterhead rules (Outlook draws it at exactly n px). */
const bar = (px: number, bg: string) =>
  `<tr><td height="${px}" bgcolor="${bg}" style="height:${px}px;font-size:${px}px;line-height:${px}px;mso-line-height-rule:exactly;background-color:${bg};">&nbsp;</td></tr>`;

const table = (inner: string, attrs = "", style = "") =>
  `<table role="presentation" cellspacing="0" cellpadding="0" border="0"${attrs} style="border-collapse:collapse;${style}">${inner}</table>`;

function runsHtml(runs: Run[], size = 17): string {
  return runs.map((r) => {
    if (typeof r === "string") return txt(r);
    // A value set in mono reads as quoted data (10D.12): 15 px inside a 17 px line.
    if (r.mono) return `<span class="x-mono" style="font-family:${MONO};font-size:${size - 2}px;">${esc(r.text)}</span>`;
    return `<strong style="font-weight:600;">${txt(r.text)}</strong>`;
  }).join("");
}

// ---- the letterheads ----

/** CoFile's letterhead (10D.4): the stacked lockup, centred, then a 1 px Plate Ink rule. */
function letterheadCoFile(o: RenderEmailOptions): string {
  // With images off, the alt text "CoFile" is set in Georgia 22 px Plate Ink in the lockup's place; with no web
  // address to load it from, the same word is set as text.
  const lockup = o.webBaseUrl
    ? `<img src="${esc(`${o.webBaseUrl}${EMAIL_ART.lockup}`)}" width="96" height="56" alt="CoFile" class="x-i x-serif" style="display:block;margin:0 auto;border:0;outline:none;width:96px;height:56px;text-align:center;${type(SERIF, 22, 28, 400, INK)}">`
    : `<div class="x-i x-serif" style="${type(SERIF, 22, 28, 400, INK)}">CoFile</div>`;
  return table(`<tr><td align="center" style="padding:0 0 20px;text-align:center;">${lockup}</td></tr>${bar(1, INK)}`, ` width="100%"`);
}

/** One of decision 35's two engravings, centred, on CoFile's letterhead only; decorative, so alt="". */
function vignetteHtml(kind: NonNullable<Letter["vignette"]>, top: number, o: RenderEmailOptions): string {
  if (!o.webBaseUrl) return "";
  const [w, h] = kind === "blank-plate" ? [160, 64] : [120, 80];
  return table(`<tr><td align="center" style="padding:${top}px 0 0;text-align:center;"><img class="x-vig-${kind}" src="${esc(`${o.webBaseUrl}${EMAIL_ART[kind]}`)}" width="${w}" height="${h}" alt="" style="display:block;margin:0 auto;border:0;outline:none;width:${w}px;height:${h}px;"></td></tr>`, ` width="100%"`);
}

const CREDENTIAL = /^(.*\S)\s+(CPAs?|LLC|LLP|PC|PLLC|& Co\.)$/;

/** The firm's typeset name: credentials at 88% with +0.04 em tracking (3.5). */
function firmNameHtml(name: string): string {
  const m = CREDENTIAL.exec(name);
  return m ? `${txt(m[1]!)} <span style="font-size:88%;letter-spacing:0.04em;">${txt(m[2]!)}</span>` : txt(name);
}

/** The logo sized by area: 5,000 px², 28 to 56 px tall, at most 260 px wide, never past half its pixels (3.5). */
export function logoBox(w?: number, h?: number): { width: number; height: number; wide: boolean } | null {
  if (!w || !h) return null;
  const r = w / h;
  let height = Math.min(56, Math.max(28, Math.sqrt(5000 / r)), h / 2);
  let width = height * r;
  if (width > 260) { width = 260; height = 260 / r; }
  return { width: Math.round(width), height: Math.round(height), wide: r >= 2.5 };
}

/** The firm's Letterhead (10D.3): centred logo, the typeset name, then the Firm Rule. Nothing of CoFile. */
function letterheadFirm(f: FirmLetterhead, look: Look): string {
  const box = f.logo ? logoBox(f.logo.width, f.logo.height) : null;
  // The name is typeset beside a square or mid logo and when there is none; a wide logo almost always contains
  // it, so its alt text carries the name, styled so a client with images off still sees it (3.5, 10D.3).
  const showName = !f.logo || !box || !box.wide;
  const logo = f.logo
    ? `<img src="${esc(f.logo.url)}"${box ? ` width="${box.width}" height="${box.height}"` : ` height="40"`} alt="${showName ? "" : esc(f.name)}" style="display:block;margin:0 auto;border:0;outline:none;${box ? `width:${box.width}px;height:${box.height}px;` : "height:40px;width:auto;max-width:260px;"}${type(SANS, 20, 26, 600, INK)}">`
    : "";
  const alone = !f.logo;
  const name = showName
    ? `<div class="x-i x-fh ${alone ? "x-name-l" : "x-name"}" style="${f.logo ? "padding-top:12px;" : ""}${type(look.head, alone ? 30 : 24, alone ? 36 : 30, 600, INK, "letter-spacing:-0.01em;")}">${firmNameHtml(f.name)}</div>`
    : "";
  const r = look.rule!;
  const rule = table(`${bar(3, r.firm)}${r.pale ? bar(1, PALE_RULE) : ""}${bar(2, WHITE)}${bar(1, r.firm2)}`, ` width="100%"`);
  return table(`<tr><td align="center" style="text-align:center;padding:0;">${logo}${name}</td></tr><tr><td style="padding:20px 0 0;">${rule}</td></tr>`, ` width="100%"`);
}

// ---- the blocks ----

const P = (inner: string, top: number, cls = "x-i", style = type(SANS, 17, 27, 400, INK)) =>
  `<p class="${cls}" style="margin:${top}px 0 0;${style}">${inner}</p>`;
const SMALL = type(SANS, 15, 23, 400, GRAPHITE);

/** The status glyphs as text (4.3: shape carries the meaning), in fonts every mail app has them in. */
const GLYPH_FONT = "'Segoe UI Symbol', 'Apple Symbols', 'DejaVu Sans', 'Noto Sans Symbols 2', sans-serif";
export const TURN = "&#9670;"; // ◆ the lozenge: your turn
export const ATTENTION = "&#9681;"; // ◑ half-filled: attention

function chipHtml(label: string, glyph: string, look: Look): string {
  const c = look.chip;
  const size = glyph === ATTENTION ? 13 : 10;
  return `<span class="x-chip" style="display:inline-block;padding:6px 12px;${c.border ? `border:1px solid ${c.border};padding:5px 11px;` : ""}background-color:${c.bg};border-radius:3px;white-space:nowrap;${type(SANS, 14, 18, 600, c.fg)}"><span style="color:${c.glyph};font-family:${GLYPH_FONT};font-size:${size}px;line-height:18px;">${glyph}</span>&nbsp;${txt(label)}</span>`;
}

function plateHtml(label: string, value: string, size: "row" | "large"): string {
  const v = size === "large"
    ? `<div class="x-i x-mono x-ein-xl" style="${type(MONO, 36, 44, 600, INK, "letter-spacing:0.02em;font-variant-numeric:tabular-nums lining-nums;")}">${esc(value)}</div>`
    : `<span class="x-i x-mono x-ein" style="${type(MONO, 28, 34, 600, INK, "letter-spacing:0.02em;font-variant-numeric:tabular-nums lining-nums;")}">${esc(value)}</span>`;
  const inner = size === "large"
    ? `<tr><td style="padding:12px 16px;"><div class="x-g" style="${SMALL}">${txt(label)}</div>${v}</td></tr>`
    : `<tr><td valign="middle" style="padding:12px 0 12px 16px;${SMALL}" class="x-g">${txt(label)}</td><td valign="middle" style="padding:12px 16px 12px 16px;">${v}</td></tr>`;
  return table(inner, `${size === "large" ? ` width="100%"` : ""} bgcolor="${COTTON2}" class="x-pl"`, `border-collapse:separate;background-color:${COTTON2};border:1px solid ${RULE_STRONG};border-radius:3px;margin-top:${size === "large" ? 24 : 12}px;`);
}

function blockHtml(b: Block, top: number, look: Look, o: RenderEmailOptions): string {
  switch (b.type) {
    case "rehearsal": {
      // The dashed band (10D.5): white, 1.5 px dashed Plate Ink, the ghost light and the sentence. Never colored.
      const ghost = o.assetBaseUrl
        ? `<td width="14" valign="top" style="width:14px;padding:19px 0 14px 16px;"><img src="${esc(`${o.assetBaseUrl}/${EMAIL_ASSETS.ghost}`)}" width="14" height="14" alt="" style="display:block;border:0;width:14px;height:14px;"></td>`
        : "";
      return table(`<tr>${ghost}<td valign="top" class="x-i" style="padding:14px 16px 14px ${ghost ? 10 : 16}px;${type(SANS, 16, 24, 600, INK)}">${txt(b.text)}</td></tr>`,
        ` width="100%" bgcolor="#FFFFFF" class="x-sh"`, `border-collapse:separate;background-color:#FFFFFF;border:1.5px dashed ${INK};margin-top:24px;`);
    }
    case "p": {
      const inner = runsHtml(b.runs, b.small ? 15 : 17);
      if (b.mark) {
        // A notice's mark: a 2 px rule and words, never a banner or an icon (10D.11, 10D.12).
        return table(`<tr><td class="x-i" style="border-left:2px solid ${b.mark === "madder" ? MADDER : OCHRE};padding:0 0 0 16px;${type(SANS, 17, 27, 400, INK)}">${inner}</td></tr>`, ` width="100%"`, `margin-top:${top}px;`);
      }
      return b.small ? P(inner, top, "x-g", SMALL) : P(inner, top);
    }
    case "list":
      // Each missing item on its own line, a 7 px lozenge before it: Ochre on CoFile's letterhead, the firm's color on its own (10D.10).
      return P(txt(b.lead), top)
        + table(b.items.map((it) => `<tr><td width="16" valign="top" class="x-loz" style="width:16px;font-family:${GLYPH_FONT};font-size:9px;line-height:27px;color:${look.lozenge};mso-line-height-rule:exactly;">${TURN}</td><td valign="top" class="x-i" style="padding:0 0 8px;${type(SANS, 17, 27, 400, INK)}">${txt(it)}</td></tr>`).join(""), ` width="100%"`, "margin-top:8px;")
        + P(txt(b.after), 8);
    case "quote":
      if (b.quote === undefined) return P(txt(`${b.lead}. ${b.after}`), top);
      return P(txt(`${b.lead}:`), top)
        + table(`<tr><td class="x-i" style="border-left:3px solid ${RULE_STRONG};padding:0 0 0 16px;${type(SANS, 17, 27, 400, INK, "font-style:italic;")}">“${txt(b.quote)}”</td></tr>`, ` width="100%"`, "margin-top:16px;")
        + P(txt(b.after), 16);
    case "proof": {
      // The proof card (10D.6): the client's business as its title, the filing type, the Your-turn chip, and
      // the total to the state with its single rule above and double rule under. Not a link: the button is.
      const titleStyle = look.side === "cofile" ? type(SERIF, 22, 28, 400, INK) : type(look.head, 22, 28, 600, INK);
      const head = `<tr><td class="x-stack" valign="top" style="padding:0;"><div class="x-i ${look.side === "cofile" ? "x-serif" : "x-fh"}" style="${titleStyle}">${txt(b.title)}</div>${b.kind ? `<div class="x-g" style="margin-top:4px;${SMALL}">${txt(b.kind)}</div>` : ""}</td><td class="x-stack x-chipcell" valign="top" align="right" style="padding:2px 0 0 16px;text-align:right;white-space:nowrap;">${chipHtml(b.chip, TURN, look)}</td></tr>`;
      const total = b.total
        ? table(`<tr><td valign="bottom" class="x-i" style="padding:12px 0 0;white-space:nowrap;${type(SANS, 17, 26, 400, INK)}">${txt(b.totalLabel ?? "")}</td><td width="100%" valign="bottom" style="padding:0 8px 8px;"><div style="border-bottom:2px dotted ${RULE_STRONG};height:1px;font-size:1px;line-height:1px;">&nbsp;</div></td><td valign="bottom" align="right" style="padding:12px 0 0;white-space:nowrap;"><span class="x-i" style="display:inline-block;border-bottom:4px double ${INK};padding-bottom:2px;${type(SANS, 18, 26, 500, INK, "font-variant-numeric:tabular-nums lining-nums;")}">${esc(b.total)}</span></td></tr>`,
          ` width="100%"`, `margin-top:16px;border-top:1px solid ${INK};`)
        : "";
      return table(`<tr><td style="padding:20px 24px;">${table(head, ` width="100%"`)}${total}</td></tr>`, ` width="100%" bgcolor="#FFFFFF" class="x-sh"`, `border-collapse:separate;background-color:#FFFFFF;border:1px solid ${RULE};margin-top:24px;`);
    }
    case "card":
      // The card slip (10D.9): the card's name and last four and the Attention chip. No artwork, no padlock.
      return table(`<tr><td style="padding:16px 20px;">${table(`<tr><td class="x-stack x-i" valign="middle" style="${type(SANS, 17, 24, 600, INK)}">${txt(b.card)}</td><td class="x-stack x-chipcell" valign="middle" align="right" style="padding-left:16px;text-align:right;white-space:nowrap;">${chipHtml(b.chip, ATTENTION, { ...look, chip: { bg: OCHRE_TINT, fg: OCHRE, glyph: OCHRE } })}</td></tr>`, ` width="100%"`)}</td></tr>`,
        ` width="100%" bgcolor="#FFFFFF" class="x-sh"`, `border-collapse:separate;background-color:#FFFFFF;border:1px solid ${RULE};margin-top:24px;`);
    case "documents": {
      const glyph = o.assetBaseUrl ? `<img src="${esc(`${o.assetBaseUrl}/${EMAIL_ASSETS.document}`)}" width="24" height="32" alt="" style="display:block;border:0;width:24px;height:32px;">` : "";
      const rows = b.docs.map((d) => `<tr><td style="border-bottom:1px solid ${RULE};padding:16px 0;">${table(`<tr><td width="24" valign="top" style="width:24px;">${glyph}</td><td valign="top" style="padding:0 0 0 16px;"><div class="x-i" style="padding-top:4px;${type(SANS, 17, 24, 600, INK)}">${txt(d.name)}</div>${d.ein ? plateHtml("EIN", d.ein, "row") : ""}</td></tr>`, ` width="100%"`)}</td></tr>`).join("");
      return P(txt(b.label), 24, "x-g", type(SANS, 15, 23, 600, GRAPHITE))
        + table(rows, ` width="100%"`, `margin-top:8px;border-top:1px solid ${RULE};`)
        + (b.after.length ? P(txt(b.after.join(" ")), 16, "x-g", SMALL) : "");
    }
    case "plate":
      return plateHtml(b.label, b.value, "large");
    case "review": {
      // The state's real review page, attached and shown as it is, never redrawn (10D.6).
      const thumb = b.contentId
        ? `<td class="x-stack x-thumbcell" width="160" valign="top" style="width:160px;padding:0 16px 0 0;"><img class="x-thumb" src="cid:${esc(b.contentId)}" width="160" alt="${esc(b.alt)}" style="display:block;width:160px;height:auto;border:1px solid ${RULE};${SMALL}"></td>`
        : "";
      return table(`<tr><td style="padding:24px 0 0;">${table(`<tr>${thumb}<td class="x-stack x-g" valign="top" style="${SMALL}">${txt(b.text)}</td></tr>`, ` width="100%"`)}</td></tr>`, ` width="100%"`, `margin-top:32px;border-top:1px solid ${RULE};`);
    }
  }
}

/** One button per email, left-aligned with the text: a letter, not a poster (10D.2). Outlook gets VML. */
function buttonHtml(link: string, label: string, look: Look): string {
  const b = look.button;
  const pad = b.border ? "15px 27px" : "16px 28px";
  const vml = `<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${esc(link)}" style="height:56px;v-text-anchor:middle;width:280px;" arcsize="6%" ${b.border ? `strokecolor="${b.border}" strokeweight="1px"` : `stroke="f"`} fillcolor="${b.bg}"><w:anchorlock/><center style="color:${b.fg};font-family:'Segoe UI',Arial,sans-serif;font-size:18px;font-weight:600;">${txt(label)}</center></v:roundrect><![endif]-->`;
  const a = `<!--[if !mso]><!--><a href="${esc(link)}" target="_blank" class="x-btn" style="display:inline-block;box-sizing:border-box;min-width:240px;padding:${pad};background-color:${b.bg};${b.border ? `border:1px solid ${b.border};` : ""}${b.edge ? `border-left:4px solid ${b.edge};` : ""}border-radius:3px;text-align:center;text-decoration:none;${type(SANS, 18, 24, 600, b.fg)}">${txt(label)}</a><!--<![endif]-->`;
  return table(`<tr><td class="x-btncell">${vml}${a}</td></tr>`, ` class="x-btntable"`, "margin-top:32px;")
    + P("Or paste this link into your browser:", 16, "x-g", SMALL)
    + `<p class="x-g x-mono" style="margin:4px 0 0;${type(MONO, 14, 20, 400, GRAPHITE, "word-break:break-all;")}"><a href="${esc(link)}" target="_blank" style="color:${GRAPHITE};text-decoration:underline;">${esc(link)}</a></p>`;
}

/** CoFile's foot (10D.4): a 1 px Rule, the Shell's line, and the support line when the email has one. */
function footCoFile(support?: string): string {
  return table(`<tr><td style="padding:16px 0 0;"><p class="x-g" style="margin:0;${SMALL}">CoFile · the filing desk behind your firm</p>${support ? `<p class="x-g" style="margin:4px 0 0;${SMALL}">Questions? Email <a href="mailto:${esc(support)}" style="color:${GRAPHITE};text-decoration:underline;">${esc(support)}</a>.</p>` : ""}</td></tr>`,
    ` width="100%"`, `margin-top:40px;border-top:1px solid ${RULE};`);
}

// ---- the page ----

function styles(look: Look): string {
  // The phone (≤ 480 px): the sheet edge to edge, no ground, no border, 20 px padding; the button full width.
  const phone = `@media only screen and (max-width:480px){
.x-gdpad{padding:0!important}
.x-body,.x-gd{background-color:#FFFFFF!important}
.x-sheet{width:100%!important;max-width:100%!important;border:0!important}
.x-pad{padding:20px 20px 40px!important}
.x-h1{font-size:24px!important;line-height:30px!important}
.x-name{font-size:20px!important;line-height:26px!important}
.x-name-l{font-size:24px!important;line-height:30px!important}
.x-btntable{width:100%!important}
.x-btn{display:block!important;width:100%!important;min-width:0!important}
.x-stack{display:block!important;width:100%!important;padding-left:0!important;padding-right:0!important;text-align:left!important}
.x-chipcell{padding-top:12px!important}
.x-thumbcell{padding:0 0 16px 0!important}
.x-thumb{width:100%!important;height:auto!important}
.x-ein{font-size:24px!important;line-height:30px!important}
.x-ein-xl{font-size:28px!important;line-height:34px!important}
.x-vig-blank-plate{width:128px!important;height:52px!important}
.x-vig-envelope{width:96px!important;height:64px!important}
}`;
  // Dark mode (10D.16): only the ground goes to Night; the sheet and every color on it are restated as in light.
  const keep = (sel: (c: string) => string) => [
    `${sel("x-gd")}{background-color:${NIGHT}!important}`,
    `${sel("x-sh")}{background-color:#FFFFFF!important}`,
    `${sel("x-pl")}{background-color:${COTTON2}!important}`,
    `${sel("x-i")}{color:${INK}!important}`,
    `${sel("x-g")}{color:${GRAPHITE}!important}`,
    `${sel("x-loz")}{color:${look.lozenge}!important}`,
    `${sel("x-btn")}{background-color:${look.button.bg}!important;color:${look.button.fg}!important}`,
  ].join("\n");
  // Outlook.com and the new Outlook mark what they recolor with data-ogsb (backgrounds) and data-ogsc (text).
  const og = [
    `[data-ogsb] .x-gd{background-color:${NIGHT}!important}`,
    ...["x-sh", "x-pl"].map((c) => `[data-ogsb] .${c}{background-color:${c === "x-pl" ? COTTON2 : "#FFFFFF"}!important}`),
    `[data-ogsb] .x-btn{background-color:${look.button.bg}!important}`,
    `[data-ogsc] .x-i{color:${INK}!important}`,
    `[data-ogsc] .x-g{color:${GRAPHITE}!important}`,
    `[data-ogsc] .x-loz{color:${look.lozenge}!important}`,
    `[data-ogsc] .x-btn{color:${look.button.fg}!important}`,
  ].join("\n");
  return `<style>
:root{color-scheme:light dark;supported-color-schemes:light dark}
body{margin:0!important;padding:0!important;width:100%!important;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}
img{-ms-interpolation-mode:bicubic}
a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
u+#body a{color:inherit;text-decoration:none}
${phone}
</style>
<style>
@media (prefers-color-scheme:dark){
body,.x-body{background-color:${NIGHT}!important}
${keep((c) => `.${c}`)}
}
</style>
<style>
${og}
</style>
<!--[if mso]><style>td,p,a,span,div,h1,strong{font-family:'Segoe UI',Arial,sans-serif!important}.x-serif{font-family:Georgia,'Times New Roman',serif!important}.x-mono,.x-mono a{font-family:Consolas,'Courier New',monospace!important}.x-fh{font-family:'Segoe UI',Arial,sans-serif!important}</style><![endif]-->`;
}

/** The inbox's preview (10D.2): the body's opening words, no new ones; on a rehearsal, the rehearsal line. */
function preheaderOf(l: Letter): string {
  for (const b of l.blocks) {
    const t = bodyText(b);
    if (t) return t;
  }
  return "";
}

function html(msg: OutboundMessage, l: Letter, o: RenderEmailOptions): string {
  const look = lookOf(l);
  const isTail = (b: Block) => b.type === "review";
  const body = l.blocks.filter((b) => !isTail(b));
  const tail = l.blocks.filter(isTail);
  const titleLine = l.headline.title
    ? `<!--[if mso]><br><![endif]--><span class="x-g" style="display:block;padding-top:4px;${type(SANS, 18, 26, 500, GRAPHITE)}">${txt(l.headline.title)}</span>`
    : "";
  const context = l.side === "cofile" && l.context
    ? `<p class="x-g" style="margin:32px 0 8px;${type(SANS, 15, 23, 600, GRAPHITE)}">${txt(l.context)}</p>`
    : "";
  // Decision 35's two engravings, never on a firm's letterhead: the blank Name Plate 24 px under the letterhead
  // rule on the welcome emails, the returned envelope 24 px under the body, above the documents (10D.7, 10D.15).
  const vignette = l.side === "cofile" ? l.vignette : undefined;
  const plateShown = vignette === "blank-plate" && !!o.webBaseUrl;
  const h1 = `<h1 class="x-i x-h1 ${look.side === "cofile" ? "x-serif" : "x-fh"}" style="margin:${context ? 0 : plateShown ? 24 : 32}px 0 0;${type(look.head, 26, 32, look.headWeight, INK)}">${txt(l.headline.phrase)}${titleLine}</h1>`;
  const content = [
    l.side === "cofile" ? letterheadCoFile(o) : letterheadFirm(l.firm ?? { name: "" }, look),
    vignette === "blank-plate" ? vignetteHtml("blank-plate", 24, o) : "",
    context, h1,
    // Headline to body 24 px, the rehearsal band to the body 24 px, paragraphs 16 px apart (10D.2, 10D.5).
    ...body.map((b, i) => (b.type === "documents" && vignette === "envelope" ? vignetteHtml("envelope", 24, o) : "") + blockHtml(b, i === 0 || body[i - 1]!.type === "rehearsal" ? 24 : 16, look, o)),
    msg.link ? buttonHtml(msg.link, msg.linkLabel ?? "Open", look) : "",
    ...tail.map((b) => blockHtml(b, 32, look, o)),
    l.side === "cofile" ? footCoFile(l.support) : "",
  ].join("");
  const fontLink = l.side === "firm" && l.firm?.font ? `<!--[if !mso]><!--><link href="${esc(l.firm.font.href)}" rel="stylesheet" type="text/css"><!--<![endif]-->` : "";
  const pre = preheaderOf(l);
  // Zero-width padding after the preview text, so clients don't pull the letterhead's words into it.
  const prePad = "&#847;&zwnj;&nbsp;".repeat(90);
  return `<!doctype html>
<html lang="en" dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(msg.subject)}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
${fontLink}
${styles(look)}
</head>
<body id="body" class="x-body" style="margin:0;padding:0;width:100%;background-color:${look.ground};">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;opacity:0;color:${look.ground};">${txt(pre)}${prePad}</div>
<div role="article" aria-roledescription="email" aria-label="${esc(msg.subject)}" lang="en" dir="ltr">
${table(`<tr><td align="center" class="x-gdpad" style="padding:24px 0;">
<!--[if mso]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center"><tr><td><![endif]-->
${table(`<tr><td class="x-pad" style="padding:32px 32px 40px;">${content}</td></tr>`, ` width="600" align="center" bgcolor="#FFFFFF" class="x-sheet x-sh"`, `width:100%;max-width:600px;background-color:#FFFFFF;border:1px solid ${RULE};`)}
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>`, ` width="100%" bgcolor="${look.ground}" class="x-gd"`, `width:100%;background-color:${look.ground};`)}
</div>
</body>
</html>`;
}

/** The plain-text part (10D.17): the same words in the same order, nothing of CoFile on a firm's letter. */
function text(msg: OutboundMessage, l: Letter): string {
  const paras: string[] = [];
  const headline = [...(l.side === "cofile" && l.context ? [l.context] : []), l.headline.phrase, ...(l.headline.title ? [l.headline.title] : [])].join("\n");
  paras.push(l.side === "cofile" ? "CoFile" : (l.firm?.name ?? ""), headline);
  const blockText = (b: Block): string | null => {
    switch (b.type) {
      case "rehearsal": return b.text;
      case "p": return runsText(b.runs);
      case "list": return `${b.lead}\n${b.items.map((it) => `- ${it}`).join("\n")}\n\n${b.after}`;
      case "quote": return b.quote !== undefined ? `${b.lead}:\n"${b.quote}"\n\n${b.after}` : `${b.lead}. ${b.after}`;
      case "documents": return `${b.label}\n${b.docs.map((d) => `- ${d.name}${d.ein ? `\n  EIN ${d.ein}` : ""}`).join("\n")}${b.after.length ? `\n\n${b.after.join(" ")}` : ""}`;
      case "plate": return `${b.label}\n${b.value}`;
      case "review": return b.text;
      case "proof": case "card": return null;
    }
  };
  for (const b of l.blocks.filter((x) => x.type !== "review")) { const t = blockText(b); if (t) paras.push(t); }
  if (msg.link) paras.push(`${msg.linkLabel ?? "Open"}\n${msg.link}`);
  for (const b of l.blocks.filter((x) => x.type === "review")) paras.push(b.text);
  if (l.side === "cofile") paras.push(["CoFile · the filing desk behind your firm", ...(l.support ? [supportLine(l.support)] : [])].join("\n"));
  return paras.filter((s) => s !== "").join("\n\n");
}

/** The email's HTML and its plain-text part. Every value is escaped. */
export function renderEmail(msg: OutboundMessage, o: RenderEmailOptions = {}): { text: string; html: string } {
  const l = msg.letter ?? proseLetter(msg.subject, msg.body);
  return { text: text(msg, l), html: html(msg, l, o) };
}

