// The engine's two surfaces for the QA gallery (merged spec 10B.2.5): for each case, the head of an email to the firm's
// client and the head of a platform's white-label proof, through the real renderers (src/comms/email.ts,
// src/approvals/render.ts), with the case's brand and its logo as the product would send it: on its baked plate where
// it has transparent pixels (white, or the dark plate for light marks, src/brand/logo-plate.ts).
//
// Reads web/lib/qa-gallery.ts and web/lib/qa-logos.json (run `node --experimental-strip-types scripts/qa-gallery.ts`
// in web/ first); writes web/public/cofile/qa-gallery/heads/<case>-email.html, <case>-proof.html and the plated logos.
// usage: npx tsx tools/render-gallery-heads.ts
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { QA_CASES, QA_DIR, type QaCase } from "../web/lib/qa-gallery.js";
import { renderEmail } from "../src/comms/email.js";
import { headlineOf, type FirmLetterhead } from "../src/comms/letter.js";
import { renderMessage } from "../src/comms/render.js";
import { renderReviewPage } from "../src/approvals/render.js";
import { needsPlate, plateLogo } from "../src/brand/logo-plate.js";
import { logoPlate, type LogoInfo } from "../src/design/logo.js";
import { inkMatch, PLATE_INK } from "../src/design/ink.js";
import type { WebhookEvent } from "../src/domain/events.js";
import type { FilingRecord } from "../src/store/types.js";
import { njFormationRequest } from "../test/helpers.js";

const pub = "web/public";
const out = join(pub, QA_DIR, "heads");
mkdirSync(out, { recursive: true });
const logos = JSON.parse(readFileSync("web/lib/qa-logos.json", "utf8")) as Record<string, { src: string; info: LogoInfo }>;

const now = "2026-11-27T12:00:00.000Z";
const filing = { id: "f-qa", tenantId: "qa", clientCompanyId: "qa", idempotencyKey: "k", status: "awaiting_input", request: njFormationRequest({ clientCompanyId: "qa" } as never), payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [] } as unknown as FilingRecord;
const event = { id: "e", type: "filing.information_required", tenantId: "qa", filingId: "f-qa", occurredAt: now, data: { missing: [{ label: "Registered agent" }, { label: "Each member's address" }] } } as unknown as WebhookEvent;
const message = renderMessage(event, filing)!;

const googleHref = (family: string) => `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, "+")}:wght@400;600&display=swap`;
const fill = (c: QaCase) => inkMatch(c.color, c.color2 ?? null).fill;

/** The logo as the notifier sends it (src/comms/notifier.ts logoOf): plated where it has transparent pixels. */
async function emailLogo(c: QaCase): Promise<FirmLetterhead["logo"] | undefined> {
  const l = c.logo ? logos[c.logo] : undefined;
  if (!l) return undefined;
  const body = readFileSync(join(pub, l.src));
  const size = { width: l.info.width, height: l.info.height };
  if (!(await needsPlate(body))) return { url: l.src, ...size, ...(l.info.background === "busy" ? { busy: true } : {}) };
  const plateColor = logoPlate(l.info, c.color ? fill(c) : PLATE_INK) ?? undefined;
  const plated = await plateLogo(body, plateColor);
  if (!plated) return { url: l.src, ...size };
  const file = `${c.id}-plate.png`;
  writeFileSync(join(out, file), plated.body);
  return { url: `${QA_DIR}/heads/${file}`, ...size, plate: true, ...(plateColor ? { plateColor } : {}) };
}

for (const c of QA_CASES) {
  const firm: FirmLetterhead = { name: c.name, primaryColor: c.color, ...(c.color2 ? { secondaryColor: c.color2 } : {}) };
  const logo = await emailLogo(c);
  if (logo) firm.logo = logo;
  if (c.font?.google) firm.font = { family: c.font.google, href: googleHref(c.font.google) };
  const { html } = renderEmail({ subject: message.subject, body: message.body, letter: { side: "firm", firm, headline: headlineOf(message.subject, message.title), blocks: message.blocks } });
  writeFileSync(join(out, `${c.id}-email.html`), html);

  const l = c.logo ? logos[c.logo] : undefined;
  const proof = renderReviewPage({
    look: "white", brandName: c.name, primaryColor: c.color, ...(c.color2 ? { secondaryColor: c.color2 } : {}),
    ...(l ? { logoUrl: l.src, logo: l.info } : {}),
    ...(c.font ? { font: { stack: c.font.stack, ...(c.font.google ? { href: googleHref(c.font.google) } : {}) } } : {}),
    filingId: "f-qa", filingTitle: "Two Sisters Bakery LLC", filingKind: "New Jersey LLC formation",
    payload: { formation: { name: { baseName: "TWO SISTERS BAKERY", designator: "LLC" } } },
    fees: [{ label: "Formation filing fee", amountUsd: 100 }, { label: "NJ portal fee, by card", amountUsd: 3.5 }],
    expiresAt: "2026-12-03T22:00:00Z", einInRun: false, postUrl: "#", requireCode: false,
  });
  writeFileSync(join(out, `${c.id}-proof.html`), proof);
}
console.log(`wrote ${QA_CASES.length} email heads and proof heads to ${out}`);
