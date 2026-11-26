import { SENSITIVE_PATHS } from "../domain/filing.js";

const maskSsn = (v: string): string => `***-**-${v.replace(/\D/g, "").slice(-4)}`;

/** Masks the value at `segs`, where a segment ending in "[]" is an array wildcard. */
function maskAt(node: unknown, segs: string[]): void {
  if (node === null || typeof node !== "object") return;
  const head = segs[0]!;
  const rest = segs.slice(1);
  const isArray = head.endsWith("[]");
  const key = isArray ? head.slice(0, -2) : head;
  const child = (node as Record<string, unknown>)[key];
  if (isArray) {
    if (Array.isArray(child)) for (const el of child) maskAt(el, rest);
    return;
  }
  if (rest.length === 0) {
    if (typeof child === "string") (node as Record<string, string>)[key] = maskSsn(child);
    return;
  }
  maskAt(child, rest);
}

/** Returns a deep copy with sensitive values masked (SSN -> ***-**-1234), array wildcards supported. */
export function maskSensitive<T>(payload: T): T {
  const copy = JSON.parse(JSON.stringify(payload)) as T;
  for (const path of SENSITIVE_PATHS) maskAt(copy, path.split("."));
  return copy;
}

function esc(s: unknown): string {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** A deadline in plain words, e.g. "December 3, 2026, 5:00 PM Eastern" (the state and IRS sites run on Eastern time). */
function plainDeadline(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const tz = "America/New_York";
  const day = d.toLocaleDateString("en-US", { timeZone: tz, month: "long", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" });
  return `${day}, ${time} Eastern`;
}

/** A field name in plain words: "baseName" -> "Base name", "ein" -> "EIN". */
const ACRONYMS: Record<string, string> = { ein: "EIN", ssn: "SSN", fein: "FEIN", llc: "LLC", naics: "NAICS", dob: "Date of birth", zip: "ZIP", ui: "UI", id: "ID", cc: "CC", nys: "NYS", ny: "NY", nj: "NJ", fl: "FL", mo: "MO", dos: "DOS" };
export function humanKey(k: string): string {
  const words = k.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim().split(/\s+/);
  const out = words.map((w) => ACRONYMS[w.toLowerCase()] ?? w.toLowerCase()).join(" ");
  return out.charAt(0).toUpperCase() + out.slice(1);
}

function rows(obj: unknown, prefix = ""): string {
  if (obj === null || obj === undefined) return "";
  if (Array.isArray(obj)) return obj.map((v, i) => rows(v, `${prefix} ${i + 1}`)).join("");
  if (typeof obj === "object") {
    return Object.entries(obj as Record<string, unknown>)
      .map(([k, v]) => rows(v, prefix ? `${prefix} › ${humanKey(k)}` : humanKey(k)))
      .join("");
  }
  return `<tr><th>${esc(prefix)}</th><td>${esc(obj)}</td></tr>`;
}

export interface ReviewPageModel {
  /** The service company's name and support contact (tenant branding); never the platform's. */
  brandName?: string;
  supportEmail?: string;
  /** The firm's own look (V20): an https or engine logo URL, and its main color (#rrggbb). */
  logoUrl?: string;
  primaryColor?: string;
  /** V21: the firm's font: a stylesheet to load (Google Fonts) or a font file, and the CSS stack. */
  font?: { stack: string; href?: string; fileUrl?: string };
  /** Partner firms are co-branded: "with <platform>". */
  poweredBy?: string;
  filingId: string;
  filingTitle: string;
  payload: unknown; // already masked
  fees: { label: string; amountUsd: number }[];
  feeCapUsd?: number;
  expiresAt: string;
  einInRun: boolean;
  /** The EIN is applied for once the state accepts the formation (always in Florida). */
  einAfterAcceptance?: boolean;
  postUrl: string;
  requireCode: boolean;
  /** Decision 7: the state's own review page, filled in with this filing (an image URL). */
  reviewImageUrl?: string;
  /** A practice (dry-run) filing: nothing is filed or paid, even once approved. */
  practice?: boolean;
}

/** The firm's look: shared by the review page and the page shown after the client decides. */
export type PageBrand = Pick<ReviewPageModel, "brandName" | "supportEmail" | "logoUrl" | "primaryColor" | "font" | "poweredBy">;

/** The page's head, styles and brand bar, up to the first heading. */
function brandedTop(m: PageBrand, title: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=IBM+Plex+Sans:wght@400;600&family=Source+Serif+4:opsz,wght@8..60,600&display=swap">
<style>body{font-family:"IBM Plex Sans",system-ui,sans-serif;font-size:17px;line-height:1.55;max-width:860px;margin:2rem auto;padding:0 1rem;color:#1C2430;background:#F7F3EA}
h1,h2{font-family:"Source Serif 4",Georgia,serif;font-weight:600;line-height:1.2}
table{border-collapse:collapse;width:100%;background:#FFFDF8}th,td{text-align:left;padding:.45rem .6rem;border-bottom:1px solid #D8D0BF;vertical-align:top}th{width:40%;font-weight:600;color:#4A5361}td{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:.92em}
.note{background:#FBEFD5;border:1px solid #EBDDB8;padding:.8rem 1rem;border-radius:6px;margin:1rem 0}
button{font:inherit;padding:.65rem 1.2rem;border-radius:6px;border:1px solid #1C2430;background:#FFFDF8;color:#1C2430;cursor:pointer}button.primary{background:#1F6B4F;color:#fff;border-color:#1F6B4F}
textarea,input{font:inherit;width:100%;padding:.5rem;border:1px solid #bbb;border-radius:6px}</style></head><body>
${m.font?.href ? `<link rel="stylesheet" href="${esc(m.font.href)}">` : ""}${m.font?.fileUrl ? `<style>@font-face{font-family:"FirmFont";src:url("${esc(m.font.fileUrl)}");font-display:swap}</style>` : ""}${m.font ? `<style>body{font-family:${m.font.fileUrl ? `"FirmFont",` : ""}${m.font.stack.replace(/[<>]/g, "")}}</style>` : ""}
${m.primaryColor && /^#[0-9a-fA-F]{6}$/.test(m.primaryColor) ? `<style>button.primary{background:${m.primaryColor};border-color:${m.primaryColor}}.brandbar{border-top:4px solid ${m.primaryColor}}</style>` : ""}
<div class="brandbar" style="display:flex;align-items:center;gap:.6rem;padding-top:.6rem">${m.logoUrl ? `<img src="${esc(m.logoUrl)}" alt="" style="max-height:40px;max-width:160px">` : ""}${m.brandName ? `<strong style="color:#333">${esc(m.brandName)}</strong>` : ""}${m.poweredBy ? `<span style="color:#777;font-size:.85em;margin-left:auto">with ${esc(m.poweredBy)}</span>` : ""}</div>`;
}

/**
 * Decision 3 (Nov 26): approving also authorizes paying the fees shown, up to the stated maximum
 * (the fee cap, else the total), with a no-refund warning. Counsel to confirm the wording; the
 * version is recorded on each approval.
 */
export const APPROVAL_CONSENT_VERSION = "2026-11-26";
export function approvalConsent(fees: { amountUsd: number }[], feeCapUsd?: number): string {
  const total = fees.reduce((s, f) => s + f.amountUsd, 0);
  const max = feeCapUsd ?? total;
  const upTo = feeCapUsd !== undefined ? "the maximum you authorize" : "the total shown";
  return "By approving, you confirm every detail below is correct and authorize its submission exactly as shown, "
    + `and payment of the fees shown, up to ${upTo} ($${max.toFixed(2)}). `
    + "Government fees generally can't be refunded once paid, even if the filing is rejected.";
}

export function renderReviewPage(m: ReviewPageModel): string {
  const total = m.fees.reduce((s, f) => s + f.amountUsd, 0);
  return `${brandedTop(m, m.brandName ? `${m.brandName}: approve filing` : "Approve filing")}
${m.practice ? `<div class="note"><strong>Rehearsal: nothing will be filed or paid, even if you approve.</strong></div>` : ""}<h1>${esc(m.filingTitle)}</h1>
<p>Filing reference ${esc(m.filingId)}. Please decide by ${esc(plainDeadline(m.expiresAt))}. After that, this link stops working and you'll need a new one.</p>
<div class="note">${esc(approvalConsent(m.fees, m.feeCapUsd))}
${m.einInRun ? " While filing, we'll get the EIN from the IRS and enter it on the state form. It's the only detail added after you approve." : ""}${m.einAfterAcceptance ? " Once the state accepts this formation, we'll apply for its EIN with the IRS using the EIN details below; approving now covers that application too, so you won't be asked again." : ""}
Government sites don't save drafts, so once you approve, the whole filing is sent in one go. Please check everything now.</div>
${m.reviewImageUrl ? `<h2>The state's review page</h2><p>This is a picture of the state's own review page, filled in with your details. When we file, we go ahead only if the state shows exactly this page again; if anything is different, we stop before paying.</p><p><img src="${esc(m.reviewImageUrl)}" alt="Picture of the state's review page for this filing. Every value on it is also listed as text under Filing details." style="max-width:100%;border:1px solid #ddd;border-radius:6px"></p>` : ""}
<h2>Filing details</h2>${JSON.stringify(m.payload ?? null).includes("***-**-") ? "<p>Social Security numbers are masked on this page. We store them encrypted and delete them after 30 days.</p>" : ""}<table>${rows(m.payload)}</table>
<h2>State fees</h2><p>Nothing is charged on this page. These fees are paid to the state when the filing is submitted.</p><table>${m.fees.map((f) => `<tr><th>${esc(f.label)}</th><td>$${f.amountUsd.toFixed(2)}</td></tr>`).join("")}
<tr><th>Total</th><td><strong>$${total.toFixed(2)}</strong></td></tr>
${m.feeCapUsd !== undefined ? `<tr><th>Maximum you authorize</th><td>$${m.feeCapUsd.toFixed(2)} (if the state asks for more, we stop before paying)</td></tr>` : ""}</table>
<form method="post" action="${esc(m.postUrl)}">
${m.requireCode ? `<p><label>One-time code sent to you<br><input name="code" inputmode="numeric" autocomplete="one-time-code" required></label></p>` : ""}
<p><label>What should change? (Needed only if you ask for changes)<br><textarea name="comment" rows="3"></textarea></label></p>
<p><button class="primary" name="decision" value="approve">Approve, and authorize submission and payment</button>
<button name="decision" value="request_changes">Request changes</button></p>
</form>${m.supportEmail ? `<p style="color:#555">Questions: ${esc(m.supportEmail)}</p>` : ""}</body></html>`;
}

/** What the client sees after deciding: the same branded page, with the outcome. */
export function renderDecisionPage(m: PageBrand & { heading: string; paragraphs: string[] }): string {
  return `${brandedTop(m, m.heading)}
<h1>${esc(m.heading)}</h1>
${m.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}${m.supportEmail ? `<p style="color:#555">Questions: ${esc(m.supportEmail)}</p>` : ""}</body></html>`;
}
