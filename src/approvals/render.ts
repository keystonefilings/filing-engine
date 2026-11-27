import { SENSITIVE_PATHS } from "../domain/filing.js";
import { DASH, GHOST, LOZENGE, esc, messagePage, pageBottom, pageTop, type PageLook } from "./page.js";

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

/** The payload as label/value pairs in its own order; a nested value's label is "Group › Field". */
function entries(obj: unknown, prefix = ""): { label: string; value: string }[] {
  if (obj === null || obj === undefined) return [];
  if (Array.isArray(obj)) return obj.flatMap((v, i) => entries(v, `${prefix} ${i + 1}`));
  if (typeof obj === "object") {
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => entries(v, prefix ? `${prefix} › ${humanKey(k)}` : humanKey(k)));
  }
  return [{ label: prefix, value: String(obj) }];
}

/** "Filing details": labels with an "A › B" path are grouped under A (11.5); the state's order is kept. */
function details(payload: unknown): string {
  let group = "";
  const out: string[] = [];
  for (const { label, value } of entries(payload)) {
    const cut = label.indexOf(" › ");
    const g = cut > 0 ? label.slice(0, cut) : "";
    if (g && g !== group) out.push(`<dt class="group">${esc(g)}</dt>`);
    group = g;
    out.push(`<dt>${esc(g ? label.slice(cut + 3) : label)}</dt><dd>${esc(value)}</dd>`);
  }
  return out.length ? `<dl class="details">${out.join("")}</dl>` : "";
}

export interface ReviewPageModel extends Partial<PageLook> {
  filingId: string;
  /** The business the filing is for ("Two Sisters Bakery LLC"), or the filing type when it names none. */
  filingTitle: string;
  /** The filing type in the portal's words ("New Jersey LLC formation"). */
  filingKind?: string;
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

/** Whose look the proof and the pages around it wear (decision 2); see page.ts. */
export type PageBrand = PageLook;

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

const lookOf = (m: Partial<PageLook>): PageLook => ({ ...m, look: m.look ?? "cofile" });

/** The proof the firm approves (11.5): one sheet read to the end, one button. */
export function renderReviewPage(m: ReviewPageModel): string {
  const p = lookOf(m);
  const total = m.fees.reduce((s, f) => s + f.amountUsd, 0);
  const owner = p.look === "white" ? p.brandName : p.firmName;
  const ein = `${m.einInRun ? " While filing, we'll get the EIN from the IRS and enter it on the state form. It's the only detail added after you approve." : ""}${m.einAfterAcceptance ? " Once the state accepts this formation, we'll apply for its EIN with the IRS using the EIN details below; approving now covers that application too, so you won't be asked again." : ""}`;
  const fee = (label: string, amount: number, cls = "") => `<div class="fee${cls}"><span>${esc(label)}</span><span class="lead-dots" aria-hidden="true"></span><span class="amt">$${amount.toFixed(2)}</span></div>`;
  return `${pageTop(p, owner ? `${owner}: approve filing` : "Approve filing")}
${m.practice ? `<div class="rehearsal">${DASH}${GHOST}<p>Rehearsal: nothing will be filed or paid, even if you approve.</p></div>` : ""}
<div class="title-row"><h1 class="title">${esc(m.filingTitle)}</h1><span class="chip turn">${LOZENGE}<span>Ready to approve</span></span></div>
${m.filingKind && m.filingKind !== m.filingTitle ? `<p class="kind">${esc(m.filingKind)}</p>` : ""}
<p class="ref">Filing reference ${esc(m.filingId)}. Please decide by <strong>${esc(plainDeadline(m.expiresAt))}</strong>. After that, this link stops working and you'll need a new one.</p>
<div class="terms"><p>${esc(approvalConsent(m.fees, m.feeCapUsd))}${ein}</p>
<p>Government sites don't save drafts, so once you approve, the whole filing is sent in one go. Please check everything now.</p></div>
${m.reviewImageUrl ? `<h2>The state's review page</h2><p class="lead">This is a picture of the state's own review page, filled in with your details. When we file, we go ahead only if the state shows exactly this page again; if anything is different, we stop before paying.</p><a class="review" href="${esc(m.reviewImageUrl)}"><img src="${esc(m.reviewImageUrl)}" alt="Picture of the state's review page for this filing. Every value on it is also listed as text under Filing details."></a>` : ""}
<h2>Filing details</h2>${JSON.stringify(m.payload ?? null).includes("***-**-") ? `<p class="lead">Social Security numbers are masked on this page. We store them encrypted and delete them after 30 days.</p>` : ""}${details(m.payload)}
<h2>State fees</h2><p class="lead">Nothing is charged on this page. These fees are paid to the state when the filing is submitted.</p>
<div class="fees">${m.fees.map((f) => fee(f.label, f.amountUsd)).join("")}
${fee("Total", total, " total")}
${m.feeCapUsd !== undefined ? `${fee("Maximum you authorize", m.feeCapUsd, " cap")}<p class="cap">If the state asks for more, we stop before paying.</p>` : ""}</div>
<form method="post" action="${esc(m.postUrl)}">
${m.requireCode ? `<label>One-time code sent to you<input class="code" name="code" inputmode="numeric" autocomplete="one-time-code" required></label>` : ""}
<label for="comment"><span>What should change? <span class="opt">(Needed only if you ask for changes)</span></span><textarea id="comment" name="comment" rows="3"></textarea></label>
<div class="buttons"><button class="approve" name="decision" value="approve">Approve, and authorize submission and payment</button>
<button class="outline" name="decision" value="request_changes">Request changes</button></div>
</form>${pageBottom(p)}`;
}

/** What the firm sees after deciding, and every message on the way: the same sheet, with the outcome. */
export function renderDecisionPage(m: Partial<PageLook> & { heading: string; paragraphs: string[] }): string {
  return messagePage(lookOf(m), m.heading, m.paragraphs);
}
