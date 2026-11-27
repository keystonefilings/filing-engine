import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { MemoryStore } from "../src/store/memory.js";
import { Notifier } from "../src/comms/notifier.js";
import { renderMessage } from "../src/comms/render.js";
import { renderEmail, logoBox } from "../src/comms/email.js";
import { proseLetter, letterBody } from "../src/comms/letter.js";
import { ResendEmailSender, mailbox } from "../src/comms/resend.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { buildServer } from "../src/api/server.js";
import type { EventType, WebhookEvent } from "../src/domain/events.js";
import type { FilingRecord } from "../src/store/types.js";
import { njFormationRequest, seededStore, wire } from "./helpers.js";

/** The emails, rebuilt to merged spec 10D: one sheet, two letterheads, split by recipient (decisions 2, 12, 33-35, 37). */

const now = new Date().toISOString();
const CONTACT = "ana@twosisters.test";
const ART = new FsArtifactStore("var/test-artifacts");

class Capture implements ChannelSender {
  readonly channel = "email" as const;
  sent: { address: string; msg: OutboundMessage }[] = [];
  async send(to: { address: string }, msg: OutboundMessage) { this.sent.push({ address: to.address, msg }); return { ok: true }; }
}

async function world(firm: Record<string, unknown> = {}, tenant: Record<string, unknown> = {}) {
  const store = new MemoryStore();
  await store.putTenant(TenantSettings.parse({ tenantId: "keystone", name: "CoFile", adminChannels: [{ channel: "email", address: "ops@cofile.test" }], ...tenant }));
  await store.putClientCompany(ClientCompanySettings.parse({
    clientCompanyId: "harbor", tenantId: (tenant.tenantId as string) ?? "keystone", name: "Harbor & Pine CPA",
    portal: { slug: "harbor-pine", displayName: "Harbor & Pine CPA", primaryColor: "#1D4E63", secondaryColor: "#2B5A47", font: "lora", supportEmail: "help@harborpine.test" },
    approvers: [{ channel: "email", address: "jordan@harborpine.test", name: "Jordan" }],
    policies: { documentsTo: "both" },
    ...firm,
  }));
  const cap = new Capture();
  const notifier = new Notifier({ store, senders: { email: cap }, publicBaseUrl: "http://api.test", webBaseUrl: "http://web.test", artifacts: ART, supportEmail: "hello@cofile.app", platformTenantId: "keystone" });
  const filing = (over: Partial<FilingRecord> = {}): FilingRecord => ({
    id: `f-${Math.random().toString(36).slice(2)}`, tenantId: (tenant.tenantId as string) ?? "keystone", clientCompanyId: "harbor", idempotencyKey: "k", status: "completed",
    request: njFormationRequest({ clientCompanyId: "harbor", contact: { firstName: "Ana", lastName: "Ortiz", phone: "2015550100", email: CONTACT } } as never),
    payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [], ...over,
  });
  const notify = async (type: EventType, data: Record<string, unknown>, f: FilingRecord) => {
    cap.sent = [];
    const records = await notifier.notify({ id: "e", type, tenantId: f.tenantId, filingId: f.id, occurredAt: now, data } as WebhookEvent, f, (await store.getTenant(f.tenantId))!);
    return { records, sent: cap.sent };
  };
  return { store, notify, filing };
}

const to = (sent: { address: string; msg: OutboundMessage }[], address: string) => sent.find((s) => s.address === address)!.msg;

describe("the words don't move: the copy is locked", () => {
  it("every event's subject, body, link and button read exactly as before the rebuild", () => {
    const before = JSON.parse(readFileSync(new URL("./email-copy.before.json", import.meta.url), "utf8")) as { type: string; data: Record<string, unknown>; subject: string; body: string; link?: string; linkLabel?: string; audience: string }[];
    const filing = { id: "f1", tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: "k", status: "awaiting_approval", request: njFormationRequest(), payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [] } as FilingRecord;
    for (const b of before) {
      const m = renderMessage({ id: "e", type: b.type as EventType, tenantId: "keystone", filingId: "f1", occurredAt: now, data: b.data }, filing)!;
      expect({ subject: m.subject, body: m.body, link: m.link, linkLabel: m.linkLabel, audience: m.audience }).toEqual({ subject: b.subject, body: b.body, link: b.link, linkLabel: b.linkLabel, audience: b.audience });
      // The email's parts carry the same words: the body is built from them.
      expect(letterBody({ blocks: m.blocks })).toBe(b.body);
    }
  });

  it("the paragraphs the notifier adds read as before: documents, the review page, the support line", async () => {
    const w = await world();
    const doc = await ART.put({ filingId: "x", kind: "formation_document", label: "Certificate of Formation", contentType: "application/pdf" }, Buffer.from("%PDF"));
    const f = w.filing({ artifacts: [{ id: doc.id, kind: "formation_document", label: "Certificate of Formation" }] });
    const { sent } = await w.notify("filing.completed", { reference: "R-1" }, f);
    expect(to(sent, "jordan@harborpine.test").body).toBe("This filing is complete (state reference R-1).\n\nDocuments: Certificate of Formation. They're attached. You can also download them from the filing page.");
    const shot = await ART.put({ filingId: f.id, kind: "screenshot", label: "Review", contentType: "image/png" }, Buffer.from("png"));
    const proof = await w.notify("filing.awaiting_approval", { approvalLink: "http://api.test/approve/t", reviewShotArtifactId: shot.id }, f);
    expect(to(proof.sent, "jordan@harborpine.test").body).toMatch(/open your proof\.\n\nAttached is a picture of the state's own review page, filled in with your details; every value on it is also listed as text on the proof\. When we file, we go ahead only if the state shows exactly this page again; if anything is different, we stop before paying\.$/);
    const notice = await w.notify("filing.failed", { error: "x" }, f);
    expect(to(notice.sent, "ops@cofile.test").body).toBe("The filing failed: x\n\nQuestions? Email hello@cofile.app.");
  });
});

describe("emails split by recipient (decision 2, merged spec 10D.1)", () => {
  it("documents back: the firm on CoFile's letterhead with the firm named; its client on the firm's, without the desk link", async () => {
    const w = await world();
    const f = w.filing();
    const { sent, records } = await w.notify("filing.completed", {}, f);
    expect(sent.map((s) => s.address).sort()).toEqual(["ana@twosisters.test", "jordan@harborpine.test"]);
    const firm = to(sent, "jordan@harborpine.test");
    expect(firm.letter).toMatchObject({ side: "cofile", context: "Harbor & Pine CPA", headline: { phrase: "Completed:" } });
    expect(firm.from).toBeUndefined();
    const client = to(sent, CONTACT);
    expect(client.letter).toMatchObject({ side: "firm", firm: { name: "Harbor & Pine CPA", primaryColor: "#1D4E63", font: { family: "Lora" } } });
    expect(client.letter?.context).toBeUndefined();
    expect(client.from).toEqual({ name: "Harbor & Pine CPA" });
    expect(client.replyTo).toEqual(["help@harborpine.test"]);
    // Each recipient's record keeps its own words.
    expect(records.find((r) => r.address === CONTACT)!.link).toBeUndefined();
  });

  it("a client's copy of documents back has no button and no line about the filing page", async () => {
    const w = await world();
    const doc = await ART.put({ filingId: "x", kind: "formation_document", label: "Certificate of Formation", contentType: "application/pdf" }, Buffer.from("%PDF"));
    const { sent } = await w.notify("filing.completed", {}, w.filing({ artifacts: [{ id: doc.id, kind: "formation_document", label: "Certificate of Formation" }] }));
    expect(to(sent, "jordan@harborpine.test").link).toBe("http://web.test/p/harbor-pine/filings/" + sent[0]!.msg.link!.split("/").pop());
    expect(to(sent, "jordan@harborpine.test").body).toContain("You can also download them from the filing page.");
    const client = to(sent, CONTACT);
    expect(client.link).toBeUndefined();
    expect(client.body).toBe("This filing is complete.\n\nDocuments: Certificate of Formation. They're attached.");
    expect(client.attachments?.map((a) => a.filename)).toEqual(["Certificate of Formation.pdf"]);
    expect(client.letter?.vignette).toBeUndefined();
    expect(to(sent, "jordan@harborpine.test").letter?.vignette).toBe("envelope");
  });

  it("the proof goes to the firm's approvers on CoFile's letterhead, and to the client on the firm's only when it is the client", async () => {
    const w = await world();
    const f = w.filing();
    const firm = await w.notify("filing.awaiting_approval", { approvalLink: "http://api.test/approve/t", recipients: [{ channel: "email", address: "jordan@harborpine.test" }] }, f);
    expect(firm.sent[0]!.msg.letter?.side).toBe("cofile");
    const client = await w.notify("filing.awaiting_approval", { approvalLink: "http://api.test/approve/t", recipients: [{ channel: "email", address: CONTACT }] }, f);
    expect(client.sent[0]!.msg.letter?.side).toBe("firm");
    expect(client.sent[0]!.msg.link).toBe("http://api.test/approve/t");
  });

  it("the filing's contact is the firm when they are one of the firm's own people", async () => {
    const w = await world({ approvers: [{ channel: "email", address: CONTACT }] });
    const { sent } = await w.notify("filing.information_required", { missing: [{ label: "Business purpose" }] }, w.filing());
    expect(sent[0]!.msg.letter?.side).toBe("cofile");
  });

  it("notices to the subscriber's staff and the card's owner are always on CoFile's letterhead (decision 33)", async () => {
    const w = await world({}, { adminChannels: [{ channel: "email", address: CONTACT }] });
    const f = w.filing();
    const notice = await w.notify("filing.blocked", { blockers: ["no card"] }, f);
    expect(notice.sent[0]!.msg.letter).toMatchObject({ side: "cofile", context: "Harbor & Pine CPA", support: "hello@cofile.app" });
    const card = await w.notify("filing.card_code_needed", { card: "Visa ending 4242", recipients: [{ channel: "email", address: CONTACT }] }, f);
    expect(card.sent[0]!.msg.letter?.side).toBe("cofile");
  });

  it("a platform's firm with no brand of its own wears the platform's, as its proof does; CoFile's own account never lends its name", async () => {
    const plain = { portal: { slug: "plain" }, approvers: [] };
    const platform = await world(plain, { tenantId: "acme-platform", name: "Acme Platform", branding: { displayName: "Acme Filings", supportEmail: "help@acme.test" } });
    const a = await platform.notify("filing.information_required", { missing: [] }, platform.filing());
    expect(a.sent[0]!.msg.letter?.firm?.name).toBe("Acme Filings");
    expect(a.sent[0]!.msg.replyTo).toEqual(["help@acme.test"]);
    const own = await world(plain, { branding: { displayName: "CoFile" } });
    const b = await own.notify("filing.information_required", { missing: [] }, own.filing());
    expect(b.sent[0]!.msg.letter?.firm?.name).toBe("Harbor & Pine CPA");
  });
});

describe("nothing of CoFile on an email to a firm's client (decision 12)", () => {
  it("no name, lockup, engraving, foot, Brass or serif headline, in the HTML or the plain text", async () => {
    const w = await world();
    const cp575 = await ART.put({ filingId: "x", kind: "cp575", label: "CP 575 EIN confirmation letter", contentType: "application/pdf" }, Buffer.from("%PDF"));
    const f = w.filing({ ein: "12-3456789" });
    const withLetter = w.filing({ ein: "12-3456789", artifacts: [{ id: cp575.id, kind: "cp575", label: "CP 575 EIN confirmation letter" }] });
    const shot = await ART.put({ filingId: f.id, kind: "screenshot", label: "Review", contentType: "image/png" }, Buffer.from("png"));
    const client = [{ channel: "email", address: CONTACT }];
    const runs = [
      await w.notify("filing.awaiting_approval", { approvalLink: "http://api.test/approve/t", recipients: client, dryRun: true, reviewShotArtifactId: shot.id, fees: [{ label: "Fee", amountUsd: 100 }] }, f),
      // A firm with approvers asks them; these reach the client when the event names the client.
      await w.notify("filing.information_required", { missing: [{ label: "Business purpose" }], recipients: client }, f),
      await w.notify("filing.changes_requested", { comment: "Use Grove St", recipients: client }, f),
      await w.notify("filing.completed", { reference: "R-1" }, withLetter),
      await w.notify("filing.completed", {}, f), // with the EIN-only email after it
      await w.notify("filing.rejected", { reason: "Name taken." }, f),
    ];
    const clientCopies = runs.flatMap((r) => r.sent).filter((s) => s.address === CONTACT);
    expect(clientCopies.length).toBe(7);
    for (const { msg } of clientCopies) {
      const { html, text } = renderEmail(msg, { webBaseUrl: "https://web.test", assetBaseUrl: "https://api.test/email-assets" });
      expect(msg.letter?.side).toBe("firm");
      for (const part of [html, text]) {
        expect(part).not.toMatch(/cofile/i);
        expect(part).not.toContain("the filing desk behind your firm");
        expect(part).not.toMatch(/#D9A84A/i);
      }
      expect(html).not.toContain("x-serif x-h1");
      expect(text.startsWith("Harbor & Pine CPA\n\n")).toBe(true);
    }
    // The firm's copy of the same email is CoFile's letter.
    const firmCopy = renderEmail(to(runs[3]!.sent, "jordan@harborpine.test"), { webBaseUrl: "https://web.test" });
    expect(firmCopy.html).toContain("https://web.test/cofile/identity/cofile-lockup-stacked-email-white@2x.png");
    expect(firmCopy.html).toContain("https://web.test/cofile/vignettes/v03-returned-envelope-email@2x.png");
    expect(firmCopy.text).toMatch(/^CoFile\n\nHarbor & Pine CPA\nCompleted:\n/);
    expect(firmCopy.text.endsWith("CoFile · the filing desk behind your firm")).toBe(true);
  });
});

describe("the EIN by email (decision 34)", () => {
  it("rides on the CP 575's row of documents back, and no number-only email follows", async () => {
    const w = await world();
    const cp575 = await ART.put({ filingId: "x", kind: "cp575", label: "CP 575 EIN confirmation letter", contentType: "application/pdf" }, Buffer.from("%PDF"));
    const { sent } = await w.notify("filing.completed", {}, w.filing({ ein: "12-3456789", artifacts: [{ id: cp575.id, kind: "cp575", label: "CP 575 EIN confirmation letter" }] }));
    expect(sent.map((s) => s.msg.subject.split(":")[0])).toEqual(["Completed", "Completed"]);
    const docs = to(sent, "jordan@harborpine.test").letter!.blocks.find((b) => b.type === "documents");
    expect(docs).toMatchObject({ docs: [{ name: "CP 575 EIN confirmation letter", ein: "12-3456789" }] });
    expect(renderEmail(to(sent, "jordan@harborpine.test")).html).toContain("12-3456789");
  });

  it("goes out on its own, right after documents back and to the same people, when the IRS letter wasn't saved", async () => {
    const w = await world();
    const { sent, records } = await w.notify("filing.completed", { reference: "R-1" }, w.filing({ ein: "12-3456789" }));
    expect(sent.map((s) => `${s.address} ${s.msg.subject.split(":")[0]}`)).toEqual([
      "jordan@harborpine.test Completed", "ana@twosisters.test Completed", "jordan@harborpine.test EIN issued", "ana@twosisters.test EIN issued",
    ]);
    const firm = sent[2]!.msg, client = sent[3]!.msg;
    expect(firm.subject).toBe("EIN issued: NJ formation: Blue Harbor Consulting LLC");
    expect(firm.body).toBe("The IRS has issued the EIN for this filing.\n\nEIN 12-3456789");
    expect(firm.letter).toMatchObject({ side: "cofile", context: "Harbor & Pine CPA", headline: { phrase: "EIN issued:", title: "NJ formation: Blue Harbor Consulting LLC" } });
    expect(firm.letter!.blocks).toContainEqual({ type: "plate", label: "EIN", value: "12-3456789" });
    expect(firm.link).toMatch(/^http:\/\/web\.test\/p\/harbor-pine\/filings\//);
    expect(client.letter?.side).toBe("firm");
    expect(client.link).toBeUndefined();
    expect(records.filter((r) => r.eventType === "filing.ein_filed")).toHaveLength(2);
    const { html, text } = renderEmail(firm);
    expect(html).toContain("x-ein-xl");
    expect(text).toContain("EIN\n12-3456789");
  });

  it("is never sent for a dry run's placeholder, or without a number", async () => {
    const w = await world();
    expect((await w.notify("filing.completed", {}, w.filing({ ein: "00-0000000" }))).sent.every((s) => s.msg.subject.startsWith("Completed"))).toBe(true);
    expect((await w.notify("filing.completed", {}, w.filing())).sent).toHaveLength(2);
  });
});

describe("the sender of a firm's emails (decision 37)", () => {
  function fakeFetch() {
    const calls: Record<string, unknown>[] = [];
    const impl = (async (_url: string | URL, init?: RequestInit) => { calls.push(JSON.parse(String(init!.body))); return Response.json({ id: "m" }); }) as typeof fetch;
    return { impl, calls };
  }

  it("CoFile's letters come from CoFile with replies to support; a client's comes under the firm's name with replies to the firm", async () => {
    const f = fakeFetch();
    const s = new ResendEmailSender({ apiKey: "k", from: "CoFile <filings@cofile.app>", replyTo: "hello@cofile.app", fetchImpl: f.impl });
    await s.send({ address: "jordan@harborpine.test" }, { subject: "s", body: "b" });
    expect(f.calls[0]).toMatchObject({ from: "CoFile <filings@cofile.app>", reply_to: "hello@cofile.app" });
    await s.send({ address: CONTACT }, { subject: "s", body: "b", from: { name: "Harbor & Pine CPA" }, replyTo: ["help@harborpine.test"] });
    expect(f.calls[1]).toMatchObject({ from: "\"Harbor & Pine CPA\" <filings@cofile.app>", reply_to: "help@harborpine.test" });
    await s.send({ address: CONTACT }, { subject: "s", body: "b", from: { name: "Harbor & Pine CPA", address: "filings@harborpine.test" }, replyTo: ["a@x.test", "b@x.test"] });
    expect(f.calls[2]).toMatchObject({ from: "\"Harbor & Pine CPA\" <filings@harborpine.test>", reply_to: ["a@x.test", "b@x.test"] });
    // No firm address at all: no Reply-To, rather than CoFile's support address.
    await s.send({ address: CONTACT }, { subject: "s", body: "b", from: { name: "Harbor & Pine CPA" }, replyTo: [] });
    expect(f.calls[3]!.reply_to).toBeUndefined();
    expect(mailbox("Smith, \"Jones\"\r\nBcc: x", "a@b.test")).toBe("\"Smith, \\\"Jones\\\" Bcc: x\" <a@b.test>");
  });

  it("is sent from the firm's own domain only once that domain is verified", async () => {
    for (const [status, address] of [["verified", "filings@harborpine.test"], ["pending", undefined], ["failed", undefined]] as const) {
      const w = await world({ portal: { slug: "harbor-pine", displayName: "Harbor & Pine CPA", supportEmail: "help@harborpine.test", emailDomain: { domain: "harborpine.test", status } } });
      const { sent } = await w.notify("filing.rejected", { reason: "x" }, w.filing());
      expect(to(sent, CONTACT).from).toEqual({ name: "Harbor & Pine CPA", ...(address ? { address } : {}) });
      expect(to(sent, "jordan@harborpine.test").from).toBeUndefined();
    }
  });

  it("replies go to the firm's support email, else a partner firm's contact, else its approvers", async () => {
    const partner = await world({ portal: { slug: "p" }, partner: { contactEmail: "owner@harborpine.test" }, approvers: [] });
    expect(to((await partner.notify("filing.completed", {}, partner.filing())).sent, CONTACT).replyTo).toEqual(["owner@harborpine.test"]);
    const approvers = await world({ portal: { slug: "p" }, policies: { documentsTo: "client" } });
    expect(to((await approvers.notify("filing.completed", {}, approvers.filing())).sent, CONTACT).replyTo).toEqual(["jordan@harborpine.test"]);
  });

  it("the state's review page goes inline, by its content id", async () => {
    const f = fakeFetch();
    await new ResendEmailSender({ apiKey: "k", from: "a@b.test", fetchImpl: f.impl }).send({ address: "c@d.test" }, { subject: "s", body: "b", attachments: [{ filename: "State review page.png", contentType: "image/png", content: Buffer.from("x"), contentId: "state-review-page" }] });
    expect((f.calls[0]!.attachments as Record<string, unknown>[])[0]).toMatchObject({ filename: "State review page.png", content_id: "state-review-page" });
  });
});

describe("the sheet (merged spec 10D.2 to 10D.17)", () => {
  const proof = renderMessage({ id: "e", type: "filing.awaiting_approval", tenantId: "keystone", filingId: "f1", occurredAt: now, data: { approvalLink: "http://api.test/approve/t", dryRun: true, fees: [{ label: "A", amountUsd: 100 }, { label: "B", amountUsd: 3.5 }] } },
    { id: "f1", tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: "k", status: "awaiting_approval", request: njFormationRequest(), payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [] })!;
  const msg: OutboundMessage = { subject: proof.subject, body: proof.body, link: proof.link, linkLabel: proof.linkLabel, letter: { side: "cofile", context: "Harbor & Pine CPA", headline: { phrase: "Your proof is ready to approve:", title: proof.title }, blocks: proof.blocks } };

  it("is built to survive the mail clients: tables, one h1, dark-mode rules, a VML button, a preview line", () => {
    const { html } = renderEmail(msg, { webBaseUrl: "https://web.test", assetBaseUrl: "https://api.test/email-assets" });
    expect(html).toContain('<html lang="en"');
    expect(html).toContain(`role="article" aria-roledescription="email" aria-label="${proof.subject}"`);
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain('<meta name="color-scheme" content="light dark">');
    expect(html).toContain("@media (prefers-color-scheme:dark)");
    expect(html).toContain("[data-ogsc] .x-i");
    expect(html).toMatch(/<v:roundrect[^>]+href="http:\/\/api\.test\/approve\/t"[^>]+style="height:56px;/);
    expect(html).toContain("Or paste this link into your browser:");
    // The rehearsal line is the preview, and the band says it under the headline.
    expect(html).toMatch(/opacity:0;[^>]*>Rehearsal: nothing will be filed or paid, even if you approve\./);
    expect(html).toContain("border:1.5px dashed #1D2130");
    expect(html).toContain("Total to the state");
    expect(html).toContain("$103.50");
    // Every picture has its size and alt text.
    for (const img of html.match(/<img [^>]+>/g)!) expect(img).toMatch(/ width="\d+" height="\d+" alt="[^"]*"/);
    expect(html).toContain('alt="CoFile"');
  });

  it("has a plain-text part with the same words in the same order", () => {
    expect(renderEmail(msg).text).toBe([
      "CoFile", "Harbor & Pine CPA\nYour proof is ready to approve:\nNJ formation: Blue Harbor Consulting LLC",
      "Rehearsal: nothing will be filed or paid, even if you approve.",
      "Your proof is ready. Open the link to see every detail and every fee, exactly as they'll go to the state, then approve it or ask for changes. Nothing is filed or paid until you approve. The link expires, so please look soon. Don't forward this email: anyone with the link can open your proof.",
      "Open your proof\nhttp://api.test/approve/t", "CoFile · the filing desk behind your firm",
    ].join("\n\n"));
  });

  it("reads without pictures: no web address, no images, and the letterhead is the word", () => {
    const { html } = renderEmail(msg);
    expect(html).not.toContain("<img");
    expect(html).toMatch(/>CoFile<\/div>/);
  });

  it("sets an engraving only on CoFile's letterhead", () => {
    const welcome = proseLetter("Your partner account is open", "Your account is approved.\n\nQuestions? Email hello@cofile.app.", { vignette: "blank-plate" });
    const cofile = renderEmail({ subject: "s", body: "b", letter: welcome }, { webBaseUrl: "https://web.test" });
    expect(cofile.html).toMatch(/v01-blank-plate-email@2x\.png" width="160" height="64" alt=""/);
    expect(cofile.text.endsWith("CoFile · the filing desk behind your firm\nQuestions? Email hello@cofile.app.")).toBe(true);
    const firm = renderEmail({ subject: "s", body: "b", letter: { ...welcome, side: "firm", firm: { name: "Harbor & Pine CPA" } } }, { webBaseUrl: "https://web.test" });
    expect(firm.html).not.toContain("vignettes");
  });

  it("escapes every value and sets apostrophes as ’", () => {
    const { html } = renderEmail({ subject: "<b>", body: "It's <script>alert(1)</script> & co", link: 'https://x.test/?a="b"' });
    expect(html).not.toContain("<script>");
    expect(html).toContain("It’s &lt;script&gt;");
    expect(html).toContain("&amp; co");
    expect(html).toContain("&quot;b&quot;");
  });

  it("sizes a firm's logo by area: 5,000 px², 28 to 56 px tall, 260 px wide at most, never past half its pixels", () => {
    expect(logoBox(120, 120)).toEqual({ width: 56, height: 56, wide: false });
    expect(logoBox(600, 120)).toEqual({ width: 158, height: 32, wide: true });
    expect(logoBox(40, 40)).toEqual({ width: 20, height: 20, wide: false });
    expect(logoBox(2000, 100)).toEqual({ width: 260, height: 13, wide: true });
    expect(logoBox()).toBeNull();
  });
});

describe("the email's own images", () => {
  it("are served without a key, and nothing else is", async () => {
    const store = await seededStore();
    const w = wire(store);
    const app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: ART, publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" } });
    await app.ready();
    try {
      const r = await app.inject({ method: "GET", url: "/email-assets/ghost-light.png" });
      expect(r.statusCode).toBe(200);
      expect(r.headers["content-type"]).toBe("image/png");
      expect(r.rawPayload.subarray(1, 4).toString("latin1")).toBe("PNG");
      expect((await app.inject({ method: "GET", url: "/email-assets/document.png" })).statusCode).toBe(200);
      expect((await app.inject({ method: "GET", url: "/email-assets/..%2Fpackage.json" })).statusCode).toBe(404);
      expect((await app.inject({ method: "GET", url: "/email-assets/other.png" })).statusCode).toBe(404);
    } finally { await app.close(); }
  });
});
