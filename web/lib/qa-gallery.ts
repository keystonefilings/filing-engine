/**
 * The QA gallery's cases (merged spec 10B.2.5): the example firms, the nine ready colors, the foundation's hostile set and
 * a set of real-world logo files. Every case must pass on every surface a firm's clients see with no hand adjustment,
 * and again whenever the ink match or the logo analysis changes. Pure data, read by the gallery (app/design/gallery),
 * by web/scripts/qa-gallery.ts (which draws the logo files and reads them) and, through the manifest it writes, by
 * tools/render-gallery-heads.ts (the engine's email and proof heads).
 *
 * Every firm here is fictional. The names are QA stand-ins, never shown on CoFile's own pages.
 */

export type QaSet = "firms" | "colors" | "hostile" | "logos";

export const QA_SETS: { id: QaSet; label: string }[] = [
  { id: "firms", label: "Example firms" },
  { id: "colors", label: "Ready colors" },
  { id: "hostile", label: "Hostile set" },
  { id: "logos", label: "Real-world logo files" },
];

/** A font as a case wears it: its CSS stack and, for a Google face, its family for the stylesheet link. */
export interface QaFont { label: string; stack: string; google?: string }

export interface QaCase {
  id: string;
  set: QaSet;
  /** What the case tests, for the reviewer. */
  title: string;
  name: string;
  color: string;
  color2?: string;
  font?: QaFont;
  /** A logo file from QA_LOGO_FILES, by id. */
  logo?: string;
}

const F = {
  lora: { label: "Lora", stack: "'Lora', Georgia, serif", google: "Lora" },
  montserrat: { label: "Montserrat", stack: "'Montserrat', system-ui, sans-serif", google: "Montserrat" },
  inter: { label: "Inter", stack: "'Inter', system-ui, sans-serif", google: "Inter" },
  serif: { label: "Source Serif", stack: "'Source Serif 4', Georgia, serif", google: "Source Serif 4" },
  // The awkward brand's uploaded face (10B.2.3): a wide display sans, one weight, no italic (Michroma stands in).
  wide: { label: "Uploaded: a wide display sans, one weight", stack: "'Michroma', system-ui, sans-serif", google: "Michroma" },
  script: { label: "A script font", stack: "'Great Vibes', cursive", google: "Great Vibes" },
  condensed: { label: "A very condensed font", stack: "'Oswald', 'Arial Narrow', sans-serif", google: "Oswald" },
} satisfies Record<string, QaFont>;

/**
 * The logo files. `source` says how each is made (web/scripts/qa-gallery.ts); `upload` is the path it takes into the
 * product: "web" through Branding (a white box read away, the margin trimmed, at most 600 px), "api" as sent, with the
 * engine's trim of an empty margin (src/brand/logo-analysis.ts).
 */
export interface QaLogoFile { id: string; title: string; upload: "web" | "api" }

export const QA_LOGO_FILES: QaLogoFile[] = [
  { id: "hp-symbol", title: "Harbor & Pine's square symbol, transparent PNG", upload: "web" },
  { id: "hp-whitebox", title: "Harbor & Pine's symbol as a JPEG on a white box, sent by the API", upload: "api" },
  { id: "hp-whitebox-web", title: "The same JPEG uploaded in Branding: the box read away", upload: "web" },
  { id: "ng-wordmark", title: "Northgate's wide wordmark, transparent PNG, 5:1", upload: "web" },
  { id: "best-wordmark", title: "Best Accounting's plain wide wordmark", upload: "web" },
  { id: "kitefold-light", title: "A very wide wordmark of white letters on transparent (10B.2.3)", upload: "web" },
  { id: "merrow-mid", title: "A stacked mid logo, symbol over lettering, two colors", upload: "web" },
  { id: "merrow-whitebox", title: "The mid logo as a JPEG on a white box, sent by the API", upload: "api" },
  { id: "square-tile", title: "A square emblem on its own dark tile", upload: "web" },
  { id: "dark-site-jpeg", title: "White letters on a dark box: a dark website's logo saved as a JPEG", upload: "api" },
  { id: "tiny-text", title: "Tiny text: a 160 × 18 px wordmark", upload: "api" },
  { id: "small-64", title: "A 64 px logo", upload: "web" },
  { id: "huge-4000", title: "A 4000 px logo, sent by the API", upload: "api" },
  { id: "padded-40", title: "A logo with 40% padding, sent by the API: the engine trims it", upload: "api" },
  { id: "padded-40-web", title: "The padded logo uploaded in Branding: trimmed", upload: "web" },
  { id: "photo", title: "A photograph as a logo", upload: "api" },
  { id: "light-pale", title: "Pale grey marks on transparent", upload: "web" },
  { id: "light-yellow", title: "A bright yellow wordmark on transparent (mean L 0.83)", upload: "web" },
  { id: "white-accent", title: "White letters with a small orange accent on transparent", upload: "web" },
  { id: "two-tone", title: "A dark symbol beside white letters on transparent", upload: "web" },
  { id: "very-wide", title: "A very wide wordmark, 12:1", upload: "web" },
  { id: "tall", title: "A tall stacked logo, 0.7:1", upload: "web" },
  { id: "shadow", title: "A logo with a soft drop shadow", upload: "web" },
  { id: "long-wordmark", title: "A two-line wordmark spelling a long name", upload: "web" },
  ...["1f4fd1", "0f766e", "15803d", "b45309", "b91c1c", "7e22ce", "be185d", "334155", "111827"].map((c) => ({ id: `ready-${c}`, title: `A wordmark in #${c}`, upload: "web" as const })),
];

const READY = ["#1f4fd1", "#0f766e", "#15803d", "#b45309", "#b91c1c", "#7e22ce", "#be185d", "#334155", "#111827"];

export const QA_CASES: QaCase[] = [
  // The example firms (3.8, 10B.2) and the two spares.
  { id: "harbor-pine", set: "firms", title: "A classic dark color, a serif, a square symbol with the name typeset (10B.2.1)", name: "Harbor & Pine CPA", color: "#1D4E63", color2: "#2B5A47", font: F.lora, logo: "hp-symbol" },
  { id: "northgate", set: "firms", title: "A warm mid-tone, a geometric sans, a wide wordmark alone (10B.2.2)", name: "Northgate Payroll", color: "#C2410C", font: F.montserrat, logo: "ng-wordmark" },
  { id: "kitefold", set: "firms", title: "The awkward brand: a light color, a wide light logo, an uploaded wide font (10B.2.3)", name: "Kitefold", color: "#F2C200", font: F.wide, logo: "kitefold-light" },
  { id: "best", set: "firms", title: "Best Accounting: the product's default color, a plain wide wordmark (3.8)", name: "Best Accounting", color: "#1F4FD1", font: F.inter, logo: "best-wordmark" },
  { id: "merrow", set: "firms", title: "A spare: a teal near Verdigris with an amber second color, a mid logo, a serif", name: "Merrow & Vale Bookkeeping", color: "#0F766E", color2: "#B45309", font: F.serif, logo: "merrow-mid" },
  { id: "harbor-jpeg", set: "firms", title: "Harbor & Pine's JPEG on a white box, sent by the API: the box disappears on the sheet", name: "Harbor & Pine CPA", color: "#1D4E63", color2: "#2B5A47", font: F.lora, logo: "hp-whitebox" },

  // The nine ready colors on the Branding page (3.6), each with a wordmark in its own color.
  ...READY.map((c, i): QaCase => ({ id: `ready-${c.slice(1)}`, set: "colors", title: `Ready color ${i + 1}: ${c}`, name: ["Alder Street Tax", "Tidewater Books", "Greenfield CPA", "Copperline Payroll", "Redbrick Accounting", "Violet Hour CPA", "Rosemont Tax & Books", "Slate Ledger LLC", "Inkwell Bookkeeping"][i]!, color: c, logo: `ready-${c.slice(1)}` })),

  // The foundation's hostile set (3.6).
  { id: "neon", set: "hostile", title: "Neon #39FF14: fills capped, the rule keeps the exact color", name: "Voltline Payroll", color: "#39FF14", logo: "best-wordmark" },
  { id: "pale-pink", set: "hostile", title: "Pale pink #F9C5D1: dark text on the fill, a border, the rule's under-line", name: "Petal & Quill CPA", color: "#F9C5D1", font: F.serif },
  { id: "near-white", set: "hostile", title: "Near-white #F5F5F5: a Plate Ink button with a 4 px edge", name: "Whitestone Accounting", color: "#F5F5F5", logo: "light-pale" },
  { id: "black", set: "hostile", title: "Pure black #000000", name: "Blackwood Tax LLC", color: "#000000", logo: "kitefold-light" },
  { id: "small-64", set: "hostile", title: "A 64 px logo: never past half its pixels", name: "Small Logo Partners", color: "#334155", logo: "small-64" },
  { id: "huge-4000", set: "hostile", title: "A 4000 px logo", name: "Large Logo Group", color: "#1F4FD1", logo: "huge-4000" },
  { id: "padded-40", set: "hostile", title: "A logo with 40% padding, sent by the API: the engine trims it", name: "Margin Street CPA", color: "#0F766E", logo: "padded-40" },
  { id: "padded-40-web", set: "hostile", title: "The same logo uploaded in Branding: trimmed", name: "Margin Street CPA", color: "#0F766E", logo: "padded-40-web" },
  { id: "photo", set: "hostile", title: "A photograph as a logo: a hairline around it", name: "Lakeview Tax Services", color: "#B45309", logo: "photo" },
  { id: "script", set: "hostile", title: "A script font", name: "Rosewater Bookkeeping", color: "#BE185D", font: F.script },
  { id: "condensed", set: "hostile", title: "A very condensed font", name: "Tallgrass Payroll Co.", color: "#15803D", font: F.condensed },
  { id: "name-40", set: "hostile", title: "A 40-character name, no logo", name: "Northern Plains Agricultural Tax Service", color: "#7E22CE" },
  { id: "name-2", set: "hostile", title: "A 2-letter name", name: "JK", color: "#111827" },
  { id: "spanish", set: "hostile", title: "A Spanish name with accents", name: "Muñoz & Peña Asesoría Contable", color: "#B91C1C", font: F.serif },
  { id: "no-logo", set: "hostile", title: "No logo, no second color", name: "Fieldstone Accounting LLC", color: "#1D4E63" },
  { id: "status-color", set: "hostile", title: "A firm color equal to a status color (Verdigris, done)", name: "Evergreen Payroll", color: "#2E6B57", logo: "merrow-mid" },

  // Real-world logo files: white boxes, transparency, wide wordmarks, square emblems, tiny text, light logos, and names
  // from 6 to 48 characters with and without "&", "CPA" and "LLC".
  { id: "f-hp-whitebox-web", set: "logos", title: "A white-box JPEG uploaded in Branding", name: "Ames CPA", color: "#1D4E63", logo: "hp-whitebox-web" },
  { id: "f-merrow-whitebox", set: "logos", title: "A white-box JPEG sent by the API", name: "Merrow & Vale Bookkeeping", color: "#0F766E", color2: "#B45309", logo: "merrow-whitebox" },
  { id: "f-square-tile", set: "logos", title: "A square emblem on its own dark tile", name: "Ortega & Lund LLC", color: "#334155", logo: "square-tile" },
  { id: "f-dark-site", set: "logos", title: "A dark website's logo saved as a JPEG: shown as its own tile", name: "Northlake Tax", color: "#1F4FD1", logo: "dark-site-jpeg" },
  { id: "f-tiny", set: "logos", title: "Tiny text: never past half its pixels", name: "Briar Lane Bookkeeping", color: "#B45309", logo: "tiny-text" },
  { id: "f-light-yellow", set: "logos", title: "A yellow wordmark reads as light marks", name: "Sunnyside Payroll LLC", color: "#1D4E63", logo: "light-yellow" },
  { id: "f-light-pale", set: "logos", title: "Pale grey marks, on a dark firm color", name: "Greystone & Ash CPA", color: "#7E22CE", logo: "light-pale" },
  { id: "f-white-accent", set: "logos", title: "White letters with an orange accent", name: "Ember Tax Studio", color: "#B91C1C", logo: "white-accent" },
  { id: "f-two-tone", set: "logos", title: "A dark symbol with white letters: mostly dark ink", name: "Twin Oaks Accounting", color: "#15803D", logo: "two-tone" },
  { id: "f-very-wide", set: "logos", title: "A 12:1 wordmark", name: "Riverbend Payroll and Tax Services", color: "#0F766E", logo: "very-wide" },
  { id: "f-tall", set: "logos", title: "A tall stacked logo", name: "Pike & Co.", color: "#111827", logo: "tall" },
  { id: "f-shadow", set: "logos", title: "A logo with a drop shadow", name: "Lumen Bookkeeping", color: "#BE185D", logo: "shadow" },
  { id: "f-long", set: "logos", title: "A 48-character name with a two-line wordmark", name: "Hartwell, Okafor & Lindqvist Certified Accountants", color: "#334155", logo: "long-wordmark" },
  { id: "f-light-on-light", set: "logos", title: "White letters on a light firm color: the plate falls back to Plate Ink", name: "Sandbar Tax LLC", color: "#F9C5D1", logo: "kitefold-light" },
  { id: "f-light-on-dark", set: "logos", title: "White letters on a dark firm color: the plate takes the firm's fill", name: "Deepwater CPA", color: "#1D4E63", logo: "kitefold-light" },
  { id: "f-small-mid", set: "logos", title: "A 6-character name beside a mid logo", name: "Vale Co", color: "#0F766E", logo: "merrow-mid" },
];

/** Where the gallery's files are served from (web/public). */
export const QA_DIR = "/cofile/qa-gallery";
