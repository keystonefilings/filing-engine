import type { ReviewGateRecord } from "../store/types.js";

function esc(s: unknown): string {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export interface ReviewGatePageModel {
  brandName?: string;
  supportEmail?: string;
  filingTitle: string;
  record: ReviewGateRecord;
  postUrl: string;
  screenshotUrl?: string;
}

/**
 * Admin page (filing company only): the run reached the review screen in beta and stopped.
 * The admin sees the captured review screen and approves (the filing is re-run straight
 * through to submission) or rejects (the filing is aborted). Nothing has been submitted.
 */
export function renderReviewGatePage(m: ReviewGatePageModel): string {
  const r = m.record;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(m.brandName ? `${m.brandName}: review before submit` : "Review before submit")}</title>
<style>body{font-family:system-ui,sans-serif;max-width:900px;margin:2rem auto;padding:0 1rem;color:#1b1b1b}
.note{background:#eef6ff;border:1px solid #9ec5f0;padding:.8rem 1rem;border-radius:6px;margin:1rem 0}
button{font:inherit;padding:.6rem 1.2rem;border-radius:6px;border:1px solid #333;background:#fff;cursor:pointer;margin:.2rem .3rem}
button.primary{background:#1a7f37;color:#fff;border-color:#1a7f37}button.danger{border-color:#b42318;color:#b42318}
img{max-width:100%;border:1px solid #ccc;border-radius:6px;margin:1rem 0}
input{font:inherit;padding:.5rem;border:1px solid #bbb;border-radius:6px}</style></head><body>
${m.brandName ? `<p style="color:#555;margin:0">${esc(m.brandName)}</p>` : ""}<h1>Review before submission</h1>
<p>${esc(m.filingTitle)}</p>
<div class="note">This is the ${esc(r.site)} review screen captured by the engine (beta). Nothing has been submitted.
Approving re-runs the filing in one pass through to submission; rejecting aborts it.</div>
${m.screenshotUrl ? `<img src="${esc(m.screenshotUrl)}" alt="captured review screen">` : "<p>(No screenshot was captured.)</p>"}
<form method="post" action="${esc(m.postUrl)}">
<p><button class="primary" name="decision" value="approve">Approve and submit</button></p>
<p><input type="text" name="reason" placeholder="Reason for rejecting (optional)" size="40">
<button class="danger" name="decision" value="reject">Reject / abort</button></p>
</form>${m.supportEmail ? `<p style="color:#555">Questions: ${esc(m.supportEmail)}</p>` : ""}</body></html>`;
}
