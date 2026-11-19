import type { NameResolutionRecord } from "../store/types.js";

function esc(s: unknown): string {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export interface NameResolutionPageModel {
  brandName?: string;
  supportEmail?: string;
  filingTitle: string;
  record: NameResolutionRecord;
  postUrl: string;
}

/**
 * Admin page (filing company only — never the end client): the chosen name was taken.
 * Pick one of the available alternatives, or type a different one (which is re-checked).
 */
export function renderNameResolutionPage(m: NameResolutionPageModel): string {
  const r = m.record;
  const options = r.options.map((o, i) => `<label style="display:block;padding:.4rem 0">
    <input type="radio" name="option" value="${esc(o.name)}" ${i === 0 ? "checked" : ""}> ${esc(o.name)}
    ${o.available ? '<span style="color:#1a7f37">available</span>' : '<span style="color:#9a6700">not checked</span>'}</label>`).join("");
  const unverified = !r.availabilityVerified
    ? `<div class="note">Availability could not be auto-checked for ${esc(r.site)} yet, so these alternatives are <strong>not confirmed available</strong>. Typing a name below runs a fresh check only where that check is wired.</div>`
    : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(m.brandName ? `${m.brandName}: choose a name` : "Choose a name")}</title>
<style>body{font-family:system-ui,sans-serif;max-width:720px;margin:2rem auto;padding:0 1rem;color:#1b1b1b}
.note{background:#fff8e1;border:1px solid #f0d47a;padding:.8rem 1rem;border-radius:6px;margin:1rem 0}
button{font:inherit;padding:.6rem 1.1rem;border-radius:6px;border:1px solid #333;background:#fff;cursor:pointer;margin:.2rem .3rem .2rem 0}
button.primary{background:#1a5fb4;color:#fff;border-color:#1a5fb4}
input[type=text]{font:inherit;padding:.5rem;border:1px solid #bbb;border-radius:6px}
fieldset{border:1px solid #ddd;border-radius:6px;margin:1rem 0;padding:.6rem 1rem}</style></head><body>
${m.brandName ? `<p style="color:#555;margin:0">${esc(m.brandName)}</p>` : ""}<h1>Choose an available name</h1>
<p>${esc(m.filingTitle)}</p>
<p>The requested name <strong>${esc(r.requested.name)}</strong> is not available${r.purpose ? `. Business purpose: ${esc(r.purpose)}` : ""}.</p>
${unverified}
<form method="post" action="${esc(m.postUrl)}">
<fieldset><legend>Pick an alternative</legend>
${options || "<p>No alternatives were generated. Type one below or regenerate.</p>"}
<p><button class="primary" name="decision" value="pick">Use the selected name</button>
<button name="decision" value="regenerate">Generate more options</button></p></fieldset>
<fieldset><legend>Or type a different name (it will be checked)</legend>
<p><input type="text" name="baseName" placeholder="Distinctive name (without ${esc(r.requested.designator)})" size="36">
<input type="text" name="designator" value="${esc(r.requested.designator)}" size="8"></p>
<p><button name="decision" value="custom">Check and use this name</button></p></fieldset>
<fieldset><legend>Cancel this filing</legend>
<p><input type="text" name="reason" placeholder="Reason (optional)" size="40">
<button name="decision" value="abort">Abort filing</button></p></fieldset>
</form>${m.supportEmail ? `<p style="color:#555">Questions: ${esc(m.supportEmail)}</p>` : ""}</body></html>`;
}
