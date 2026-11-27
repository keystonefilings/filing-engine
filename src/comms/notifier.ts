import { randomUUID } from "node:crypto";
import type { WebhookEvent } from "../domain/events.js";
import type { FilingRecord, MessageRecord, Store } from "../store/types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { ArtifactStore } from "../artifacts/store.js";
import { effectivePolicies } from "../settings/policies.js";
import { FONT_PRESETS, googleFontHref, type FontPreset } from "../settings/fonts.js";
import { isIssuedEin } from "../adapters/types.js";
import { renderEinIssued, renderMessage, type RenderedMessage } from "./render.js";
import { headlineOf, letterBody, type Block, type FirmLetterhead, type Letter } from "./letter.js";
import { imageSize } from "./image-size.js";
import { needsPlate } from "../brand/logo-plate.js";
import { analyzeLogo, currentLogoInfo } from "../brand/logo-analysis.js";
import { logoPlate } from "../design/logo.js";
import { inkMatch, PLATE_INK } from "../design/ink.js";
import type { Channel, ChannelSender, OutboundMessage } from "./senders.js";

export interface NotifierDeps {
  store: Store;
  /** Per-channel senders; a channel with no sender falls back to defaultSender. */
  senders: Partial<Record<Channel, ChannelSender>>;
  defaultSender?: ChannelSender;
  publicBaseUrl: string;
  /** Reads the filing's documents to send with the completion email. */
  artifacts?: ArtifactStore;
  /** The web front end: a portal firm's completion email links to the filing page there. */
  webBaseUrl?: string;
  /** Ours, named in notices to a filing company's staff (never in its clients' emails, which carry the firm's own). */
  supportEmail?: string;
  /** CoFile's own account: its firms' clients see the firm's brand, never this account's (decision 12). */
  platformTenantId?: string;
  now?: () => Date;
}

/** What a finished filing's email carries: the state's documents, never screenshots or the SS-4 authorization. */
const DOCUMENT_KINDS = new Set(["cp575", "filing_receipt", "formation_document", "standing_certificate", "generated_pdf", "other"]);
const MAX_ATTACHMENT_BYTES = 15 * 1024 * 1024;
const REVIEW_CID = "state-review-page";

type Recipient = { channel: string; address: string; name?: string };

/** One recipient's copy: whose letterhead it wears, its words, its link, its sender (merged spec 10D.1). */
interface Copy { letter: Letter; body: string; link?: string; from?: OutboundMessage["from"]; replyTo?: string[] }

/**
 * The outbound communication layer: how the engine reports back and asks. On each filing
 * event it renders a message for the right audience (the client, or the filing-company admin),
 * resolves the recipients, and delivers through the configured channel senders — recording a
 * MessageRecord for every send. Non-human events are ignored.
 *
 * Each recipient gets their own copy (10D.1, decision 2): the firm (its approvers, a partner firm's contact, a
 * card's owner, a subscriber's staff) gets CoFile's letterhead, sent as CoFile, with the firm named above the
 * headline; the firm's client (the filing's contact) gets the firm's letterhead alone, sent under the firm's
 * name with replies to the firm, and nothing of CoFile on it.
 */
export class Notifier {
  private readonly now: () => Date;
  constructor(private readonly deps: NotifierDeps) { this.now = deps.now ?? (() => new Date()); }

  async notify(event: WebhookEvent, filing: FilingRecord, tenant?: TenantSettings): Promise<MessageRecord[]> {
    const rendered = renderMessage(event, filing);
    if (!rendered) return [];
    const client = await this.deps.store.getClientCompany(filing.clientCompanyId);
    const recipients = rendered.audience === "admin"
      ? (tenant?.adminChannels ?? [])
      : rendered.audience === "card_owner"
        ? (Array.isArray(event.data.recipients) ? event.data.recipients as Recipient[] : [])
        : await this.clientRecipients(event, filing, tenant, client);
    if (event.type === "filing.card_code_needed" && this.deps.webBaseUrl && typeof event.data.webPath === "string") rendered.link = `${this.deps.webBaseUrl}${event.data.webPath}`;
    const support = rendered.audience === "admin" ? this.deps.supportEmail : undefined;
    const screenshotUrl = rendered.screenshotArtifactId ? `${this.deps.publicBaseUrl}/v1/artifacts/${rendered.screenshotArtifactId}` : undefined;
    let attachments: NonNullable<OutboundMessage["attachments"]> | undefined;
    if (event.type === "filing.awaiting_approval" && typeof event.data.reviewShotArtifactId === "string" && this.deps.artifacts) {
      const shot = await this.deps.artifacts.get(event.data.reviewShotArtifactId).catch(() => null);
      if (shot && shot.meta.filingId === filing.id) {
        attachments = [{ filename: "State review page.png", contentType: shot.meta.contentType, content: shot.body, contentId: REVIEW_CID }];
        rendered.blocks.push({ type: "review", alt: "State review page.png", contentId: REVIEW_CID, text: "Attached is a picture of the state's own review page, filled in with your details; every value on it is also listed as text on the proof. When we file, we go ahead only if the state shows exactly this page again; if anything is different, we stop before paying." });
      }
    }
    // Documents back (10D.7): the firm's copy links to the filing page on its desk, when it has one.
    let portal: string | undefined;
    let ein: string | undefined;
    if (event.type === "filing.completed") {
      const docs = await this.documents(filing);
      attachments = docs.files;
      portal = client?.portal?.slug && this.deps.webBaseUrl ? `${this.deps.webBaseUrl}/p/${encodeURIComponent(client.portal.slug)}/filings/${encodeURIComponent(filing.id)}` : undefined;
      if (portal) rendered.link = portal;
      const found = filing.ein ?? (typeof event.data.ein === "string" ? event.data.ein : undefined);
      ein = isIssuedEin(found) ? found : undefined;
      const list = filing.artifacts.filter((a) => DOCUMENT_KINDS.has(a.kind));
      rendered.blocks.push(list.length
        ? {
            type: "documents", label: "Documents:",
            // The EIN on the CP 575's row, read from the filing record beside the letter that proves it (decision 34).
            docs: list.map((a) => ({ name: a.label, ...(a.kind === "cp575" && ein ? { ein } : {}) })),
            after: [...(docs.files.length ? ["They're attached."] : []), ...(docs.skipped ? [docs.skipped] : []), ...(portal ? [DOWNLOAD] : [])],
          }
        : { type: "p", runs: ["The state's documents will follow once it sends them."] });
    }

    const sides = await this.sidesOf(rendered, recipients, filing, tenant, client);
    const firmName = client ? (client.portal?.displayName ?? client.name) : undefined;
    const copyFor = (m: RenderedMessage, r: Recipient, vignette?: Letter["vignette"]): Copy => {
      if (sides.client && r.address.toLowerCase() === sides.client.address) {
        // The client's copy: no desk link and no line about the filing page, which a client can't open (10D.7).
        const blocks = event.type === "filing.completed" ? withoutDeskLink(m.blocks) : m.blocks;
        const link = event.type === "filing.completed" ? undefined : m.link;
        const c = sides.client;
        return { letter: { side: "firm", firm: c.letterhead, headline: headlineOf(m.subject, m.title), blocks }, body: letterBody({ blocks }), link, from: c.from, replyTo: c.replyTo };
      }
      return {
        letter: { side: "cofile", ...(firmName ? { context: firmName } : {}), headline: headlineOf(m.subject, m.title), blocks: m.blocks, ...(support ? { support } : {}), ...(vignette ? { vignette } : {}) },
        body: letterBody({ blocks: m.blocks, support }), link: m.link,
      };
    };

    const envelope = event.type === "filing.completed" && filing.artifacts.some((a) => DOCUMENT_KINDS.has(a.kind)) ? "envelope" as const : undefined;
    const out = await this.deliver(event.type, rendered, recipients, filing, (r) => copyFor(rendered, r, envelope), { screenshotUrl, attachments });

    // The EIN on its own, when the IRS issued it but its letter wasn't saved (decision 34, 10D.8): once, right
    // after documents back, to the same people. A filing whose CP 575 was saved never sends it.
    if (event.type === "filing.completed" && ein && !filing.artifacts.some((a) => a.kind === "cp575")) {
      const lone = renderEinIssued(filing, ein);
      if (portal) lone.link = portal;
      out.push(...await this.deliver("filing.ein_filed", lone, recipients, filing, (r) => copyFor(lone, r), {}));
    }
    return out;
  }

  private async deliver(eventType: string, m: RenderedMessage, recipients: Recipient[], filing: FilingRecord, copyFor: (r: Recipient) => Copy,
    extra: { screenshotUrl?: string; attachments?: NonNullable<OutboundMessage["attachments"]> }): Promise<MessageRecord[]> {
    const out: MessageRecord[] = [];
    for (const r of recipients) {
      const channel = r.channel as Channel;
      const sender = this.deps.senders[channel] ?? this.deps.defaultSender;
      const copy = copyFor(r);
      const base: Omit<MessageRecord, "status" | "error"> = {
        id: randomUUID(), filingId: filing.id, tenantId: filing.tenantId, eventType,
        audience: m.audience, channel, address: r.address, subject: m.subject,
        body: copy.body, link: copy.link, screenshotArtifactId: m.screenshotArtifactId,
        createdAt: this.now().toISOString(),
      };
      if (!sender) { out.push(await this.deps.store.createMessage({ ...base, status: "skipped", error: `no sender for ${channel}` })); continue; }
      try {
        const res = await sender.send({ address: r.address, name: r.name }, {
          subject: m.subject, body: copy.body, link: copy.link, ...(m.linkLabel ? { linkLabel: m.linkLabel } : {}), screenshotUrl: extra.screenshotUrl,
          ...(channel === "email" ? {
            letter: copy.letter,
            ...(copy.from ? { from: copy.from } : {}),
            ...(copy.replyTo ? { replyTo: copy.replyTo } : {}),
            ...(extra.attachments?.length ? { attachments: extra.attachments } : {}),
          } : {}),
        });
        // A message only recorded (no provider set up) is "skipped", never reported as sent.
        out.push(await this.deps.store.createMessage({ ...base, status: res.notSent ? "skipped" : res.ok ? "sent" : "failed", error: res.ok && !res.notSent ? undefined : res.detail }));
      } catch (e) {
        out.push(await this.deps.store.createMessage({ ...base, status: "failed", error: (e as Error).message }));
      }
    }
    return out;
  }

  /**
   * Which side each recipient is on (10D.1). Only a message for the client audience can reach the firm's client,
   * and only through the filing's own contact; anyone who is one of the firm's people (an approver, a partner
   * firm's contact, a default approver, a user of the firm's desk, its notice or filing contact) is the firm.
   */
  private async sidesOf(m: RenderedMessage, recipients: Recipient[], filing: FilingRecord, tenant: TenantSettings | undefined, client: ClientCompanySettings | null)
    : Promise<{ client?: { address: string; letterhead: FirmLetterhead; from: { name: string; address?: string }; replyTo: string[] } }> {
    const contact = filing.request.contact?.email?.toLowerCase();
    const reachesClient = m.audience === "client" && !!contact && recipients.some((r) => r.address.toLowerCase() === contact);
    if (reachesClient) {
      const firmPeople = new Set([
        ...(client?.approvers ?? []).map((a) => a.address),
        ...(client?.partner?.contactEmail ? [client.partner.contactEmail] : []),
        ...(tenant?.defaultApprovers ?? []).map((a) => a.address),
        ...(client?.noticeEmail ? [client.noticeEmail] : []),
        ...(client?.filingContact?.email ? [client.filingContact.email] : []),
        ...(await this.deps.store.listUsers(filing.tenantId).catch(() => []))
          .filter((u) => u.status === "active" && (u.kind === "enterprise" || u.clientCompanyId === filing.clientCompanyId)).map((u) => u.email),
      ].map((a) => a.toLowerCase()));
      if (!firmPeople.has(contact!)) return { client: { address: contact!, ...await this.clientSide(tenant, client) } };
    }
    return {};
  }

  /**
   * The firm's letterhead, sender and Reply-To for an email to its client (10D.1, 10D.3, decision 37): the
   * brand the client sees on the firm's pages. A platform's firm that set no brand of its own wears the
   * platform's, as its white-label proof does; CoFile's own account never lends its name to a client's email.
   */
  private async clientSide(tenant: TenantSettings | undefined, client: ClientCompanySettings | null) {
    const portal = client?.portal;
    const ownAccount = !tenant || tenant.tenantId === (this.deps.platformTenantId ?? "keystone");
    const firmBrand = !!client && (!!client.partner || ownAccount || !!(portal && (portal.displayName || portal.logoUrl || portal.logoArtifactId || portal.primaryColor)));
    const platformBrand = !firmBrand && !!tenant && !!(tenant.branding.displayName || tenant.branding.logoUrl);
    let letterhead: FirmLetterhead;
    if (platformBrand) {
      letterhead = { name: tenant!.branding.displayName ?? tenant!.name, ...(tenant!.branding.logoUrl?.startsWith("https://") ? { logo: { url: tenant!.branding.logoUrl } } : {}) };
    } else {
      letterhead = { name: portal?.displayName ?? client?.name ?? tenant?.name ?? "" };
      const logo = await this.logoOf(portal);
      if (logo) letterhead.logo = logo;
      if (portal?.primaryColor) letterhead.primaryColor = portal.primaryColor;
      if (portal?.secondaryColor) letterhead.secondaryColor = portal.secondaryColor;
      const preset = portal?.font && portal.font !== "custom" && portal.font !== "system" ? FONT_PRESETS[portal.font as FontPreset] : undefined;
      const href = preset?.family ? googleFontHref(portal!.font) : null;
      if (preset?.family && href) letterhead.font = { family: preset.family, href };
    }
    // Sent under the firm's name; from its own domain once that domain is verified, else from CoFile's sending
    // address. Replies go to the firm: its support email, else its contact (a partner firm's contact, else its
    // approvers), so a client's reply never comes to CoFile.
    // The firm's own domain, connected on its desk's Setup (src/api/email-domains.ts): used only once verified.
    const domain = !platformBrand ? client?.portal?.emailDomain : undefined;
    const from = { name: letterhead.name, ...(domain?.status === "verified" && domain.domain ? { address: `filings@${domain.domain}` } : {}) };
    const approvers = (client?.approvers ?? []).filter((a) => a.channel === "email").map((a) => a.address);
    const replyTo = platformBrand
      ? (tenant!.branding.supportEmail ? [tenant!.branding.supportEmail] : [])
      : portal?.supportEmail ? [portal.supportEmail]
        : client?.partner?.contactEmail ? [client.partner.contactEmail]
          : approvers.length ? approvers
            : client?.noticeEmail ? [client.noticeEmail]
              : client?.filingContact?.email ? [client.filingContact.email]
                : tenant?.branding.supportEmail && !ownAccount ? [tenant.branding.supportEmail] : [];
    return { letterhead, from, replyTo };
  }

  /** The firm's logo for mail, with its natural size when it was uploaded, so it can be sized by area (3.5). */
  private async logoOf(portal: ClientCompanySettings["portal"]): Promise<FirmLetterhead["logo"] | undefined> {
    if (portal?.logoArtifactId) {
      const url = `${this.deps.publicBaseUrl}/v1/brand-logos/${portal.logoArtifactId}`;
      const got = await this.deps.artifacts?.get(portal.logoArtifactId).catch(() => null);
      const size = got ? imageSize(got.body) : null;
      if (got && size && (await needsPlate(got.body))) {
        // Light marks (a logo drawn for a dark website) go out on their dark plate, the one the pages use: the firm's
        // fill when the logo reads at 3:1 on it, else Plate Ink (10B.2.3). Seen on the white sheet, by design.
        const info = currentLogoInfo(portal) ?? await analyzeLogo(got.body);
        const fill = portal.primaryColor && /^#[0-9a-fA-F]{6}$/.test(portal.primaryColor)
          ? inkMatch(portal.primaryColor, portal.secondaryColor && /^#[0-9a-fA-F]{6}$/.test(portal.secondaryColor) ? portal.secondaryColor : null).fill
          : PLATE_INK;
        const plateColor = logoPlate(info, fill);
        if (plateColor) return { url: `${url}/plate?bg=${plateColor.slice(1).toUpperCase()}`, ...size, plate: true, plateColor };
        // Any other logo with transparent pixels goes out on its baked white plate, so it stays on white when a mail
        // app forces dark mode (owner's decision, Nov 26).
        return { url: `${url}/plate`, ...size, plate: true };
      }
      return size ? { url, ...size } : { url };
    }
    return portal?.logoUrl?.startsWith("https://") ? { url: portal.logoUrl } : undefined;
  }

  private async clientRecipients(event: WebhookEvent, filing: FilingRecord, tenant?: TenantSettings, client?: ClientCompanySettings | null): Promise<Recipient[]> {
    const fromEvent = event.data.recipients;
    if (Array.isArray(fromEvent) && fromEvent.length) return fromEvent as Recipient[];
    const c = filing.request.contact;
    const contact = { channel: "email", address: c.email, name: `${c.firstName} ${c.lastName}` };
    const firm = client?.partner?.contactEmail
      ? [{ channel: "email", address: client.partner.contactEmail, name: client.partner.contactName }]
      : client?.approvers?.length ? client.approvers : [contact];
    if (event.type === "filing.completed" || event.type === "filing.rejected") {
      // H1 "documents go to": the firm, its client (the filing contact) or both. A partner firm
      // that hasn't answered gets them itself: it files for its clients from our portal.
      let to = tenant && client ? effectivePolicies(tenant, client).documentsTo : undefined;
      if (!to && client?.partner) to = "firm";
      const list = to === "client" ? [contact] : to === "both" ? [...firm, contact] : to === "firm" ? firm : (client?.approvers?.length ? client.approvers : [contact]);
      return list.filter((r, i) => list.findIndex((o) => o.address.toLowerCase() === r.address.toLowerCase()) === i);
    }
    return client?.approvers?.length ? client.approvers : [contact];
  }

  /** The filing's documents as attachments, within the email size limit. */
  private async documents(filing: FilingRecord): Promise<{ files: { filename: string; contentType: string; content: Buffer }[]; skipped?: string }> {
    if (!this.deps.artifacts) return { files: [] };
    const files: { filename: string; contentType: string; content: Buffer }[] = [];
    let total = 0, left = 0;
    for (const a of filing.artifacts.filter((x) => DOCUMENT_KINDS.has(x.kind))) {
      const got = await this.deps.artifacts.get(a.id).catch(() => null);
      if (!got) continue;
      if (total + got.body.length > MAX_ATTACHMENT_BYTES) { left++; continue; }
      total += got.body.length;
      const ext = got.meta.contentType === "application/pdf" ? ".pdf" : got.meta.contentType === "image/png" ? ".png" : got.meta.contentType === "image/jpeg" ? ".jpg" : "";
      files.push({ filename: `${a.label.replace(/[^\w .()-]+/g, "").trim().slice(0, 80) || a.kind}${ext}`, contentType: got.meta.contentType, content: got.body });
    }
    return { files, skipped: left ? `${left} more ${left === 1 ? "is" : "are"} too large to attach.` : undefined };
  }
}

const DOWNLOAD = "You can also download them from the filing page.";

/** A client's copy of documents back, without the line about the filing page on the firm's desk. */
function withoutDeskLink(blocks: Block[]): Block[] {
  return blocks.map((b) => (b.type === "documents" ? { ...b, after: b.after.filter((s) => s !== DOWNLOAD) } : b));
}
