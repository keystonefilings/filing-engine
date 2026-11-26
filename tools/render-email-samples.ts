// Writes every email the product sends to HTML (and its plain-text part) for visual review (merged spec 10D),
// through the real code: the Notifier for filing emails, the API for account emails, the inbound service for
// replies to requests sent by email. Filing emails go out twice per firm, once to the firm (CoFile's letterhead)
// and once to the firm's client (the firm's letterhead), for three firms: a dark main color (Harbor & Pine CPA),
// a light yellow one and a red one (Northgate Payroll's Ember). Nothing is sent: a capturing sender keeps them.
//
// Harbor & Pine's logo is the owner's example symbol (web/public/cofile/example-firm/); Northgate's wide wordmark
// and the yellow firm are sample pictures made for this preview, and the review page is a captured NJ page.
// usage: npx tsx tools/render-email-samples.ts [outDir]   (default var/email-samples)
import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { chromium } from "playwright";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { EMAIL_ART, renderEmail } from "../src/comms/email.js";
import { mailbox } from "../src/comms/resend.js";
import { Notifier } from "../src/comms/notifier.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";
import { InboundEmailService } from "../src/inbound/email.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";
import type { EventType, WebhookEvent } from "../src/domain/events.js";
import type { FilingRecord } from "../src/store/types.js";
import { MemoryStore } from "../src/store/memory.js";
import { njFormationRequest, wire } from "../test/helpers.js";

const out = resolve(process.argv[2] ?? "var/email-samples");
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "assets"), { recursive: true });
mkdirSync(join(out, "sample-images"), { recursive: true });
for (const f of readdirSync("assets/email")) copyFileSync(join("assets/email", f), join(out, "assets", f));
// The owner's artwork, as the web app serves it (WEB_BASE_URL + /cofile/…).
for (const p of Object.values(EMAIL_ART)) { mkdirSync(join(out, dirname(p)), { recursive: true }); copyFileSync(join("web/public", p), join(out, p)); }

const API = "https://api.cofile.example";
const WEB = "https://cofile.example";
const FROM = "CoFile <filings@cofile.app>";

// ---- sample pictures ----
const browser = await chromium.launch();
const shot = async (html: string, file: string, scale = 2) => {
  const page = await browser.newPage({ deviceScaleFactor: scale });
  await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent">${html}</body></html>`);
  await page.locator("#a").screenshot({ path: join(out, "sample-images", file), omitBackground: true });
  await page.close();
  return readFileSync(join(out, "sample-images", file));
};
const symbol = readFileSync("web/public/cofile/example-firm/harbor-pine-symbol.svg", "utf8").replace("<svg ", `<svg width="120" height="120" `);
const squareLogo = await shot(`<div id="a" style="width:120px;height:120px;line-height:0">${symbol}</div>`, "logo-square.png", 1);
const wideLogo = await shot(`<div id="a" style="display:inline-flex;align-items:center;gap:14px;padding:4px 6px;font:700 46px/1 Inter, Arial, sans-serif;color:#C2410C;letter-spacing:-0.01em"><svg viewBox="0 0 40 40" width="50" height="50" fill="none" stroke="#C2410C" stroke-width="5"><path d="M6 38V4H34V38M6 4L34 38"/></svg>Northgate Payroll</div>`, "logo-wide.png", 1);
{
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  await page.goto(`file://${resolve("test/captures/nj-2026-11-17/17-review.html")}`).catch(() => undefined);
  await page.screenshot({ path: join(out, "sample-images", "state-review-page.png") });
  await page.close();
}
const reviewPng = readFileSync(join(out, "sample-images", "state-review-page.png"));

// ---- the account, its firms and a filing ----
const store = new MemoryStore();
const artifacts = new FsArtifactStore(join(out, ".artifacts"));
await store.putTenant(TenantSettings.parse({ tenantId: "keystone", name: "CoFile", adminChannels: [{ channel: "email", address: "ops@cofile.example" }] }));
const harborLogo = await artifacts.put({ filingId: "brand-harbor", kind: "brand_logo", label: "Logo", contentType: "image/png" }, squareLogo);
const northLogo = await artifacts.put({ filingId: "brand-north", kind: "brand_logo", label: "Logo", contentType: "image/png" }, wideLogo);
const logoFiles: Record<string, string> = { [harborLogo.id]: "logo-square.png", [northLogo.id]: "logo-wide.png" };

const firms = [
  {
    key: "dark", note: "Harbor & Pine CPA: Harbor #1D4E63 with Pine, Lora, a square logo, its own verified sending domain",
    settings: { clientCompanyId: "harbor-pine", name: "Harbor & Pine CPA", partner: { contactEmail: "owner@harborpine.example", contactName: "Owner" },
      portal: { slug: "harbor-pine", displayName: "Harbor & Pine CPA", primaryColor: "#1D4E63", secondaryColor: "#2B5A47", font: "lora", logoArtifactId: harborLogo.id, supportEmail: "help@harborpine.example",
        emailDomain: { domain: "harborpine.example", status: "verified" } } },
  },
  {
    key: "yellow", note: "Sunrise Filings: a light yellow #F2C200, Inter, no logo (the typeset name alone), approvers",
    settings: { clientCompanyId: "sunrise", name: "Sunrise Filings", approvers: [{ channel: "email", address: "desk@sunrise.example", name: "Sunrise desk" }],
      portal: { slug: "sunrise", displayName: "Sunrise Filings", primaryColor: "#F2C200", font: "inter" } },
  },
  {
    key: "red", note: "Northgate Payroll: Ember #C2410C, Montserrat, a wide wordmark (no typeset name)",
    settings: { clientCompanyId: "northgate", name: "Northgate Payroll", partner: { contactEmail: "ops@northgate.example", contactName: "Ops" },
      portal: { slug: "northgate", displayName: "Northgate Payroll", primaryColor: "#C2410C", font: "montserrat", logoArtifactId: northLogo.id, supportEmail: "help@northgate.example" } },
  },
] as const;
for (const f of firms) await store.putClientCompany(ClientCompanySettings.parse({ tenantId: "keystone", ...f.settings, policies: { documentsTo: "both" } }));

type Captured = { to: { address: string; name?: string }; msg: OutboundMessage };
class Capture implements ChannelSender {
  readonly channel = "email" as const;
  sent: Captured[] = [];
  async send(to: { address: string; name?: string }, msg: OutboundMessage) { this.sent.push({ to, msg }); return { ok: true }; }
}

const written: { file: string; title: string; who: string; letterhead: string; from: string; replyTo: string }[] = [];
function write(name: string, c: Captured, who: string) {
  let { html, text } = renderEmail(c.msg, { webBaseUrl: ".", assetBaseUrl: "assets" });
  for (const [id, file] of Object.entries(logoFiles)) html = html.replaceAll(`${API}/v1/brand-logos/${id}`, `sample-images/${file}`);
  html = html.replaceAll("cid:state-review-page", "sample-images/state-review-page.png");
  const fromName = c.msg.from ? mailbox(c.msg.from.name, c.msg.from.address ?? "filings@cofile.app") : FROM;
  const replyTo = (c.msg.replyTo ?? ["hello@cofile.app"]).join(", ") || "(none: replies go to the sender)";
  writeFileSync(join(out, `${name}.html`), html);
  writeFileSync(join(out, `${name}.txt`), `From: ${fromName}\nReply-To: ${replyTo}\nTo: ${c.to.address}\nSubject: ${c.msg.subject}\n\n${text}\n`);
  written.push({ file: name, title: c.msg.subject, who, letterhead: c.msg.letter?.side === "firm" ? "the firm's" : "CoFile's", from: fromName, replyTo });
}

// ---- filing emails, per firm, to the firm and to its client ----
const now = new Date("2026-11-26T15:00:00Z").toISOString();
const ana = { firstName: "Ana", lastName: "Ortiz", phone: "2015550100", email: "ana@twosisters.example" };
for (const f of firms) {
  const cap = new Capture();
  const notifier = new Notifier({ store, senders: { email: cap }, publicBaseUrl: API, artifacts, webBaseUrl: WEB, supportEmail: "hello@cofile.app", platformTenantId: "keystone" });
  const tenant = (await store.getTenant("keystone"))!;
  const id = `F-2026-1124-0117-${f.key}`;
  const formation = await artifacts.put({ filingId: id, kind: "formation_document", label: "Certificate of Formation", contentType: "application/pdf" }, Buffer.from("%PDF-1.4 sample"));
  const cp575 = await artifacts.put({ filingId: id, kind: "cp575", label: "CP 575 EIN confirmation letter", contentType: "application/pdf" }, Buffer.from("%PDF-1.4 sample"));
  const review = await artifacts.put({ filingId: id, kind: "screenshot", label: "Review", contentType: "image/png" }, reviewPng);
  const request = njFormationRequest({ clientCompanyId: f.settings.clientCompanyId, contact: ana } as never);
  (request as { formation: { name: { baseName: string } } }).formation.name.baseName = "Two Sisters Bakery";
  const filing: FilingRecord = { id, tenantId: "keystone", clientCompanyId: f.settings.clientCompanyId, idempotencyKey: id, status: "completed", request, payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [], ein: "12-3456789" };
  const firmPerson = "partner" in f.settings ? { channel: "email", address: f.settings.partner.contactEmail, name: f.settings.partner.contactName } : { ...f.settings.approvers[0] };
  const client = { channel: "email", address: ana.email, name: "Ana Ortiz" };
  const ev = (type: EventType, data: Record<string, unknown>): WebhookEvent => ({ id: `e-${type}`, type, tenantId: "keystone", filingId: id, occurredAt: now, data });
  const fees = [{ label: "Formation filing fee", amountUsd: 100 }, { label: "NJ portal fee, by card", amountUsd: 3.5 }];
  const both = async (base: string, type: EventType, data: Record<string, unknown>, rec = filing) => {
    for (const [side, r] of [["firm", firmPerson], ["client", client]] as const) {
      cap.sent = [];
      await notifier.notify(ev(type, { ...data, recipients: [r] }), rec, tenant);
      cap.sent.forEach((c, i) => write(`${base}${i ? `-${i}` : ""}--to-${side}--${f.key}`, c, side === "firm" ? "the firm" : "the firm's client"));
    }
  };
  await both("01-proof-ready", "filing.awaiting_approval", { approvalLink: `${API}/approve/sample-token`, fees, reviewShotArtifactId: review.id });
  await both("02-proof-ready-rehearsal", "filing.awaiting_approval", { approvalLink: `${API}/approve/sample-token`, fees, dryRun: true });
  await both("03-more-information", "filing.information_required", { missing: [{ path: "formation.purpose", label: "Business purpose" }, { path: "formation.registeredAgent", label: "Registered agent" }] });
  await both("04-changes-requested", "filing.changes_requested", { comment: "Please use 88 Grove St as the main address." });
  // Documents back and the EIN go by the firm's "documents go to" answer (both, here).
  const docsFiling = { ...filing, artifacts: [{ id: formation.id, kind: "formation_document", label: "Certificate of Formation" }, { id: cp575.id, kind: "cp575", label: "CP 575 EIN confirmation letter" }] };
  for (const [base, rec, data] of [
    ["05-completed", docsFiling, { reference: "0450123456" }],
    ["06-completed-ein-without-letter", { ...filing, artifacts: [{ id: formation.id, kind: "formation_document", label: "Certificate of Formation" }] }, { reference: "0450123456" }],
    ["07-completed-documents-to-follow", { ...filing, ein: undefined }, {}],
    ["08-rejected", filing, { reason: "The name is not distinguishable from one on record." }],
  ] as const) {
    cap.sent = [];
    await notifier.notify(ev(base.startsWith("08") ? "filing.rejected" : "filing.completed", data), rec as FilingRecord, tenant);
    const n: Record<string, number> = {};
    for (const c of cap.sent) {
      const side = c.msg.letter?.side === "firm" ? "client" : "firm";
      const k = `${side}${c.msg.subject.startsWith("EIN") ? "-ein" : ""}`;
      n[k] = (n[k] ?? 0) + 1;
      write(`${c.msg.subject.startsWith("EIN") ? "06b-ein-issued" : base}--to-${side}--${f.key}`, c, side === "firm" ? "the firm" : "the firm's client");
    }
  }
  cap.sent = [];
  await notifier.notify(ev("filing.card_code_needed", { card: "Firm Visa ending 4242", recipients: [firmPerson], webPath: `/p/${f.settings.portal.slug}/pay` }), filing, tenant);
  cap.sent.forEach((c) => write(`09-card-code--to-firm--${f.key}`, c, "the card's owner (the firm)"));
  // The filing company's notices go to the subscriber's staff only (decision 33).
  for (const [i, [type, data]] of ([
    ["filing.name_options_ready", { adminLink: `${API}/admin/name-resolution/sample` }],
    ["filing.review_gate", { adminLink: `${API}/admin/review/sample` }],
    ["filing.drift_halted", {}],
    ["filing.failed", { stage: "bot_challenge", error: "bot challenge on NJ: just a moment" }],
    ["filing.failed", { error: "card declined by the state's processor" }],
    ["filing.blocked", { blockers: ["no registered agent", "no card for state fees"] }],
    ["filing.needs_reconciliation", {}],
  ] as const).entries()) {
    if (f.key !== "dark") continue;
    cap.sent = [];
    await notifier.notify(ev(type, data), filing, tenant);
    cap.sent.forEach((c) => write(`1${i}-notice-${type.slice(7).replace(/_/g, "-")}${type === "filing.failed" && "stage" in data ? "-bot-check" : ""}--to-staff`, c, "the subscriber's staff"));
  }
}

// ---- account emails, through the API ----
{
  const outbox = new Capture();
  const w = wire(store);
  const app = buildServer({
    service: w.service, approvals: w.approvals, store, artifacts, publicBaseUrl: API, apiKeys: { k1: "keystone" }, staffKeys: { "staff-key-0123456789abcdef": "ops@cofile.example" },
    sessionSecret: "session-secret-for-samples-0123456789", platformTenantId: "keystone", partnerSignupMode: "approval", email: outbox, webBaseUrl: WEB, supportEmail: "hello@cofile.app",
  });
  await app.ready();
  const post = (url: string, payload: unknown, headers: Record<string, string> = {}) => app.inject({ method: "POST", url, payload: payload as object, headers });
  const PW = "correct horse battery staple";
  await post("/v1/signups/partner", { companyName: "Harbor & Pine CPA", companyType: "cpa", name: "Pat Rivera", email: "pat@harborpine.example", password: PW, termsVersion: "2026-11-26" });
  const signupId = (await app.inject({ method: "GET", url: "/v1/partner-signups", headers: { "x-api-key": "k1" } })).json().signups[0].id as string;
  await post(`/v1/partner-signups/${signupId}/decision`, { action: "approve" }, { "x-api-key": "k1" });
  await post("/v1/inquiries", { name: "Morgan Hale", company: "Hale Filing Services", email: "morgan@hale.example", message: "We file 300 a month" });
  const q = (await app.inject({ method: "GET", url: "/v1/inquiries", headers: { "x-api-key": "staff-key-0123456789abcdef" } })).json().inquiries[0];
  await post(`/v1/inquiries/${q.id}/decision`, { action: "approve" }, { "x-api-key": "staff-key-0123456789abcdef" });
  await post("/v1/auth/password-reset", { email: "morgan@hale.example" });
  await post("/v1/client-companies/harbor-pine/staff", { email: "jo@harborpine.example", name: "Jo Park" }, { "x-api-key": "k1" });
  await new Promise((r) => setTimeout(r, 50));
  const names: Record<string, string> = {
    "Confirm your email for CoFile": "20-confirm-email", "Your partner account is open": "21-partner-account-open", "Your CoFile account is ready": "22-enterprise-account-ready",
    "Reset your password": "23-reset-password", "You're invited to Harbor & Pine CPA's filing portal": "24-invitation",
  };
  for (const c of outbox.sent) write(`${names[c.msg.subject] ?? "2x-account"}--to-person`, c, "the person (CoFile's account email)");
  await app.close();

  // Replies to requests sent by email (10D.12): one to a firm's staff member, one to a subscriber's user.
  const replies = new Capture();
  const inbound = new InboundEmailService({ store, address: "file@in.cofile.app", resendApiKey: "re_sample", email: replies, webBaseUrl: WEB,
    fetchImpl: (async () => Response.json({ text: "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." })) as typeof fetch });
  await inbound.handle({ type: "email.received", data: { email_id: "em_1", from: "Jo Park <jo@harborpine.example>", to: ["file@in.cofile.app"], subject: "LLC for Two Sisters Bakery" } });
  await inbound.handle({ type: "email.received", data: { email_id: "em_2", from: "morgan@hale.example", to: ["file@in.cofile.app"], subject: "New filing" } });
  replies.sent.forEach((c) => write(`${c.msg.subject.startsWith("Ready") ? "25-ready-to-check" : "26-filing-by-email-not-a-firm-user"}--to-person`, c, "the person who emailed the request"));
}
rmSync(join(out, ".artifacts"), { recursive: true, force: true });

// --shots: each email at 600 px (desktop) and 390 px (a phone), in light and dark, plus 600 px with images off.
if (process.argv.includes("--shots")) {
  const shots = join(out, "shots");
  mkdirSync(shots, { recursive: true });
  for (const [label, width, scheme, images] of [["600-light", 600, "light", true], ["600-dark", 600, "dark", true], ["390-light", 390, "light", true], ["390-dark", 390, "dark", true], ["600-images-off", 600, "light", false]] as const) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
    if (!images) await ctx.route(/\.(png|jpe?g|webp|svg)$/, (r) => r.abort());
    const page = await ctx.newPage();
    for (const w of written) {
      await page.goto(`file://${join(out, `${w.file}.html`)}`, { waitUntil: "load" });
      await page.screenshot({ path: join(shots, `${w.file}--${label}.png`), fullPage: true });
    }
    await ctx.close();
  }
  console.log(`wrote screenshots to ${shots}`);
}
await browser.close();

written.sort((a, b) => a.file.localeCompare(b.file));
writeFileSync(join(out, "index.html"), `<!doctype html><meta charset="utf-8"><title>Email samples</title><style>body{font:15px/1.5 system-ui;margin:24px}td,th{padding:4px 10px;border-bottom:1px solid #ddd;text-align:left;vertical-align:top}</style>
<h1>Email samples</h1><p>${firms.map((f) => `<b>${f.key}</b>: ${f.note}`).join("<br>")}</p>
<table><tr><th>File</th><th>Subject</th><th>To</th><th>Letterhead</th><th>From</th><th>Reply-To</th></tr>${written.map((w) => `<tr><td><a href="${w.file}.html">${w.file}</a> · <a href="${w.file}.txt">text</a></td><td>${w.title.replace(/</g, "&lt;")}</td><td>${w.who}</td><td>${w.letterhead}</td><td>${w.from.replace(/</g, "&lt;")}</td><td>${w.replyTo}</td></tr>`).join("")}</table>`);
console.log(`wrote ${written.length} emails to ${out}`);
