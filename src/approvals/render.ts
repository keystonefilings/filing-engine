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

function rows(obj: unknown, prefix = ""): string {
  if (obj === null || obj === undefined) return "";
  if (Array.isArray(obj)) return obj.map((v, i) => rows(v, `${prefix}[${i + 1}]`)).join("");
  if (typeof obj === "object") {
    return Object.entries(obj as Record<string, unknown>)
      .map(([k, v]) => rows(v, prefix ? `${prefix} / ${k}` : k))
      .join("");
  }
  return `<tr><th>${esc(prefix)}</th><td>${esc(obj)}</td></tr>`;
}

export interface ReviewPageModel {
  /** The service company's name and support contact (tenant branding); never the platform's. */
  brandName?: string;
  supportEmail?: string;
  filingId: string;
  filingTitle: string;
  payload: unknown; // already masked
  fees: { label: string; amountUsd: number }[];
  feeCapUsd?: number;
  expiresAt: string;
  einInRun: boolean;
  postUrl: string;
  requireCode: boolean;
  /** Decision 7: the state's own review page, filled in with this filing (an image URL). */
  reviewImageUrl?: string;
}

export function renderReviewPage(m: ReviewPageModel): string {
  const total = m.fees.reduce((s, f) => s + f.amountUsd, 0);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(m.brandName ? `${m.brandName}: approve filing` : "Approve filing")}</title>
<style>body{font-family:system-ui,sans-serif;max-width:860px;margin:2rem auto;padding:0 1rem;color:#1b1b1b}
table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:.4rem .6rem;border-bottom:1px solid #ddd;vertical-align:top}th{width:40%;font-weight:600;color:#444}
.note{background:#fff8e1;border:1px solid #f0d47a;padding:.8rem 1rem;border-radius:6px;margin:1rem 0}
button{font:inherit;padding:.6rem 1.2rem;border-radius:6px;border:1px solid #333;background:#fff;cursor:pointer}button.primary{background:#1a5fb4;color:#fff;border-color:#1a5fb4}
textarea,input{font:inherit;width:100%;padding:.5rem;border:1px solid #bbb;border-radius:6px}</style></head><body>
${m.brandName ? `<p style="color:#555;margin:0">${esc(m.brandName)}</p>` : ""}<h1>${esc(m.filingTitle)}</h1>
<p>Filing reference ${esc(m.filingId)}. This approval expires ${esc(m.expiresAt)}.</p>
<div class="note">By approving you confirm every value below is correct and authorize its submission exactly as shown.
${m.einInRun ? " The EIN issued during this run will be entered into the state filing; it is the only value added after your approval." : ""}
No draft is saved on any government site: the filing is submitted in one pass after your approval.</div>
${m.reviewImageUrl ? `<h2>The state's review page</h2><p>This is the state's own review page, filled in with your filing. The filing goes ahead only if the state shows exactly this page again.</p><p><img src="${esc(m.reviewImageUrl)}" alt="The state's review page for this filing" style="max-width:100%;border:1px solid #ddd;border-radius:6px"></p>` : ""}
<h2>Filing details</h2><table>${rows(m.payload)}</table>
<h2>Fees</h2><table>${m.fees.map((f) => `<tr><th>${esc(f.label)}</th><td>$${f.amountUsd.toFixed(2)}</td></tr>`).join("")}
<tr><th>Total</th><td><strong>$${total.toFixed(2)}</strong></td></tr>
${m.feeCapUsd !== undefined ? `<tr><th>Maximum you authorize</th><td>$${m.feeCapUsd.toFixed(2)} (the run stops if the site shows more)</td></tr>` : ""}</table>
<form method="post" action="${esc(m.postUrl)}">
${m.requireCode ? `<p><label>One-time code sent to you<br><input name="code" inputmode="numeric" autocomplete="one-time-code" required></label></p>` : ""}
<p><label>Comments or requested changes (optional)<br><textarea name="comment" rows="3"></textarea></label></p>
<p><button class="primary" name="decision" value="approve">Approve and authorize submission</button>
<button name="decision" value="request_changes">Request changes</button></p>
</form>${m.supportEmail ? `<p style="color:#555">Questions: ${esc(m.supportEmail)}</p>` : ""}</body></html>`;
}
