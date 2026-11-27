// Writes sample proofs to HTML for visual review (build plan, phase 1): CoFile's look for a partner firm,
// a rehearsal, a platform's white label with an awkward color, and the decision page.
// usage: npx tsx tools/render-proof-samples.ts <outDir>
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderDecisionPage, renderReviewPage } from "../src/approvals/render.js";

const out = process.argv[2] ?? "var/proof-samples";
mkdirSync(out, { recursive: true });

const base = {
  filingId: "F-2026-1124-0117", filingTitle: "Two Sisters Bakery LLC", filingKind: "New Jersey LLC formation",
  payload: {
    formation: { name: { baseName: "TWO SISTERS BAKERY", designator: "LLC" }, purpose: "Any lawful business" },
    members: [{ name: "Ana Ortiz", share: "50%" }, { name: "Lucia Ortiz", share: "50%" }],
    mainAddress: { street: "88 Grove St", city: "Jersey City", state: "NJ", zip: "07302" },
    responsibleParty: { name: "Ana Ortiz", ssn: "***-**-6789" },
  },
  fees: [{ label: "Formation filing fee", amountUsd: 100 }, { label: "NJ portal fee, by card", amountUsd: 3.5 }],
  feeCapUsd: 110, expiresAt: "2026-12-03T22:00:00Z", einInRun: true, postUrl: "#", requireCode: true,
};

writeFileSync(join(out, "proof-cofile.html"), renderReviewPage({ ...base, look: "cofile", firmName: "Harbor & Pine CPA", clientName: "Two Sisters Bakery LLC", supportEmail: "help@harborpine.example" }));
writeFileSync(join(out, "proof-rehearsal.html"), renderReviewPage({ ...base, practice: true, look: "cofile", firmName: "Harbor & Pine CPA", clientName: "Two Sisters Bakery LLC" }));
writeFileSync(join(out, "proof-white.html"), renderReviewPage({ ...base, look: "white", brandName: "Sunrise Filings", primaryColor: "#F2C200", supportEmail: "help@sunrise.example" }));
writeFileSync(join(out, "decision.html"), renderDecisionPage({ look: "cofile", firmName: "Harbor & Pine CPA", clientName: "Two Sisters Bakery LLC", heading: "Approval recorded", paragraphs: ["Thank you. Your approval is recorded. We'll submit the filing exactly as shown. If the state's page has changed by then, we stop before paying, and you may be asked to approve again. We'll email you when it's complete."] }));
console.log(`wrote ${out}`);
