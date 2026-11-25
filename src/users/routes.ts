import { createHash, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import type { InquiryRecord, Store, UserRecord } from "../store/types.js";
import { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import { PaymentRouting, PaymentSettings } from "../settings/payments.js";
import { dummyHash, hashPassword, passwordProblem, verifyPassword } from "./password.js";
import { mintSessionKey, type SessionClaims } from "./session-token.js";
import { PORTALS, portalDefaultsProblems } from "./portals.js";
import { RateLimiter } from "./rate-limit.js";
import type { ChannelSender } from "../comms/senders.js";
import { FONT_CHOICES } from "../settings/fonts.js";
import { PORTAL_LOGIN_KEYS, type DbVault } from "../settings/db-vault.js";

/**
 * Dashboard accounts.
 *  - Sign-in (public): email + password -> a signed session key the front end presents for the person.
 *  - Partner sign-up (public): a CPA, payroll or CFO firm signs up on the landing page. It joins the
 *    platform's own tenant (Scope 2). PARTNER_SIGNUP_MODE decides whether it waits for approval
 *    ("approval", the default) or is approved at once ("automatic").
 *  - Enterprise accounts are never self-serve: the landing page takes a contact request, and platform
 *    staff create the subscriber's first user after approving it.
 *  - Self-service settings a signed-in person may change: partner profile, branding, payment routing;
 *    enterprise payment routing and portal defaults. Cards and portal logins are vault references only.
 *  - Password reset (public): an emailed single-use link, valid an hour, that dies with any password
 *    change or sign-out-everywhere; and change password for a signed-in person. Both end every session.
 */

/**
 * A partner firm's address is also its public pages' address (cofile.app/<slug>/<service>),
 * so it can never be a path the site itself uses.
 */
export const RESERVED_SLUGS = new Set([
  "login", "signup", "docs", "dashboard", "p", "i", "logo", "join", "logout", "forgot-password", "reset-password",
  "verify-email", "session-ended", "invite-expired", "openapi.json", "api", "admin", "approve", "static", "_next",
  "favicon.ico", "robots.txt", "sitemap.xml", "pricing", "about", "contact", "help", "support", "terms", "privacy", "security",
  "cofile", "keystone", "keystonefilings", "www", "app", "mail", "status",
]);
export const SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$/;

export type PartnerSignupMode = "approval" | "automatic";

export interface Auth {
  tenantId: string;
  /** Set for a dashboard session. */
  user?: UserRecord;
  /** The session key's claims, for a dashboard session. */
  session?: SessionClaims;
  /** Partner sessions are limited to this client company. */
  partnerOf?: string;
}

export interface UsersDeps {
  store: Store;
  authOf: (req: FastifyRequest) => Promise<Auth | null>;
  staffOf: (req: FastifyRequest) => string | null;
  sessionSecret: string;
  platformTenantId: string;
  partnerSignupMode: PartnerSignupMode;
  /** Sends the password-reset email. Absent: the link is created but not sent. */
  email?: ChannelSender;
  /** The web front end; the reset link opens its /reset-password page. */
  webBaseUrl: string;
  /** V29: where connected portal logins are sealed; absent without DATA_ENCRYPTION_KEY. */
  secrets?: DbVault;
  now?: () => Date;
}

const SESSION_TTL = { enterprise: 12 * 3600, partner: 7 * 24 * 3600 } as const;
const RESET_TTL_MINUTES = 60;
const VERIFY_TTL_DAYS = 7;
const MAX_FAILS = 5;
const LOCK_MINUTES = 15;

const email = z.string().trim().toLowerCase().email().max(200);
const SignInBody = z.object({ email, password: z.string().min(1).max(200) });
const ResetRequestBody = z.object({ email });
const VerifyBody = z.object({ token: z.string().min(10).max(300) });
const ResetConfirmBody = z.object({ token: z.string().min(10).max(300), password: z.string().max(200) });
const ChangePasswordBody = z.object({ currentPassword: z.string().min(1).max(200), newPassword: z.string().max(200) });

const sha256 = (s: string) => createHash("sha256").update(s).digest();
/** A reset link's token: the user id (to find the record) and a secret (only its hash is stored). */
function readResetToken(token: string): { userId: string; secret: string } | null {
  const i = token.indexOf(".");
  if (i < 1) return null;
  return { userId: token.slice(0, i), secret: token.slice(i + 1) };
}
const PartnerSignupBody = z.object({
  companyName: z.string().trim().min(2).max(120),
  companyType: z.enum(["cpa", "payroll", "cfo", "title", "other"]),
  name: z.string().trim().min(2).max(120),
  email,
  password: z.string().max(200),
  phone: z.string().trim().max(40).optional(),
  website: z.string().trim().url().startsWith("https://").max(200).optional(),
  states: z.array(z.enum(["NY", "NJ", "FL", "MO"])).max(4).optional(),
  expectedVolume: z.string().max(40).optional(),
});
const InquiryBody = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(120),
  email,
  phone: z.string().trim().max(40).optional(),
  states: z.string().max(80).optional(),
  volume: z.string().max(40).optional(),
  message: z.string().trim().max(2000).optional(),
  /** Hidden field; people leave it empty, form-filling bots don't. */
  website: z.string().max(0).optional(),
});
const NewUserBody = z.object({ email, name: z.string().trim().min(2).max(120), password: z.string().max(200) });
const ProfileBody = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  partner: z.object({
    companyType: z.enum(["cpa", "payroll", "cfo", "title", "other"]).optional(),
    contactName: z.string().trim().max(120).optional(),
    contactEmail: z.string().email().optional(),
    phone: z.string().trim().max(40).optional(),
    website: z.string().url().startsWith("https://").optional(),
    setupDone: z.array(z.enum(["details", "branding", "payments"])).optional(),
  }).optional(),
  brand: z.object({
    /** The firm's address: its portal and its public pages. */
    slug: z.string().trim().toLowerCase().regex(SLUG_PATTERN, "use 1 to 40 lowercase letters, digits and dashes").optional(),
    displayName: z.string().trim().min(1).max(80).optional(),
    logoUrl: z.string().url().startsWith("https://").optional(),
    primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    font: z.enum(FONT_CHOICES).optional(),
    secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    supportEmail: z.string().email().optional(),
    /** V25: the services (filing kinds) the firm offers its clients; empty = all. */
    filingKinds: z.array(z.string().regex(/^[a-z0-9-]{2,40}$/)).max(60).optional(),
  }).optional(),
  paymentRouting: PaymentRouting.optional(),
  /** V31: where the state's copies of this firm's filings also go (null clears; else its contact email). */
  copyEmail: z.string().trim().toLowerCase().email().nullable().optional(),
  /** V22: the firm's registered agent per state (null removes one). */
  registeredAgents: z.partialRecord(z.enum(["NY", "NJ", "FL", "MO"]), z.union([z.object({
    name: z.string().trim().min(2).max(160),
    email: z.string().email().optional(),
    address: z.object({ street1: z.string().trim().min(2).max(120), street2: z.string().trim().max(120).optional(), city: z.string().trim().min(2).max(80), state: z.enum(["NY", "NJ", "FL", "MO"]), zip: z.string().regex(/^\d{5}(-\d{4})?$/) }),
  }), z.null()])).optional()
    .refine((m) => !m || Object.entries(m).every(([st, a]) => !a || a.address.state === st), { message: "each agent's address must be in its own state" }),
});
const DecisionBody = z.object({ action: z.enum(["approve", "reject"]) });

/** Accounts made before email confirmation existed have no emailVerification and count as confirmed. */
export const emailConfirmed = (u: UserRecord) => !u.emailVerification || !!u.emailVerifiedAt;

export function publicUser(u: UserRecord) {
  return {
    id: u.id, email: u.email, name: u.name, kind: u.kind, tenantId: u.tenantId, clientCompanyId: u.clientCompanyId,
    status: u.status, createdAt: u.createdAt, lastSignInAt: u.lastSignInAt, signup: u.signup, decidedAt: u.decidedAt,
    emailConfirmed: emailConfirmed(u),
  };
}


export function slugFor(name: string): string {
  const s = name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40).replace(/-+$/, "");
  return s || "firm";
}

/**
 * A portal address for a firm: the one it has, or one made from its name that no other firm
 * in the tenant uses (smith-cpa, then smith-cpa-2 and so on). Nobody types it.
 */
export async function portalSlugFor(store: Store, tenantId: string, c: { clientCompanyId: string; name: string; portal?: { slug?: string } }): Promise<string> {
  if (c.portal?.slug) return c.portal.slug;
  const taken = new Set((await store.listClientCompanies(tenantId)).filter((o) => o.clientCompanyId !== c.clientCompanyId).map((o) => o.portal?.slug ?? ""));
  const base = slugFor(c.name);
  let slug = base;
  for (let i = 2; taken.has(slug) || RESERVED_SLUGS.has(slug); i++) slug = `${base}-${i}`;
  return slug;
}

export function registerUsers(app: FastifyInstance, deps: UsersDeps): void {
  const now = deps.now ?? (() => new Date());
  // Public endpoints are reached through the front end, so the client address is mostly the front end's.
  // Limits are per email and overall; the per-email lockout below is the main brake on guessing.
  const signInLimit = new RateLimiter(60, 60_000);
  const publicFormLimit = new RateLimiter(30, 3_600_000);

  const requireAuth = async (req: FastifyRequest, reply: FastifyReply): Promise<Auth | null> => {
    const a = await deps.authOf(req);
    if (!a) void reply.code(401).send({ error: "invalid api key" });
    return a;
  };
  /** A subscriber's key or one of its enterprise users (never a partner session). */
  const requireTenantScope = async (req: FastifyRequest, reply: FastifyReply): Promise<string | null> => {
    const a = await requireAuth(req, reply);
    if (!a) return null;
    if (a.partnerOf) { void reply.code(403).send({ error: "not available to partner accounts" }); return null; }
    return a.tenantId;
  };

  const issue = (u: UserRecord) => {
    const ttl = SESSION_TTL[u.kind];
    const claims: SessionClaims = {
      sub: u.id, tenantId: u.tenantId, kind: u.kind, exp: Math.floor(now().getTime() / 1000) + ttl, gen: u.sessionGen, jti: randomBytes(12).toString("base64url"),
      ...(u.kind === "partner" && u.clientCompanyId ? { clientCompanyId: u.clientCompanyId } : {}),
    };
    return { sessionKey: mintSessionKey(deps.sessionSecret, claims), expiresAt: new Date(claims.exp * 1000).toISOString() };
  };

  // ---- Sign-in ----
  app.post("/v1/auth/sign-in", async (req, reply) => {
    const parsed = SignInBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "enter your email and password" });
    if (!signInLimit.take("all")) return reply.code(429).send({ error: "too many sign-in attempts; try again in a minute" });
    const { email: em, password } = parsed.data;
    const u = await deps.store.findUserByEmail(em);
    const at = now();
    if (u?.lockedUntil && u.lockedUntil > at.toISOString()) {
      await verifyPassword(password, await dummyHash());
      return reply.code(429).send({ error: `too many wrong passwords; try again after ${LOCK_MINUTES} minutes` });
    }
    const ok = u ? await verifyPassword(password, u.passwordHash) : (await verifyPassword(password, await dummyHash()), false);
    if (!u || !ok) {
      if (u) {
        const fails = (u.failedSignIns ?? 0) + 1;
        await deps.store.updateUser(u.id, fails >= MAX_FAILS
          ? { failedSignIns: 0, lockedUntil: new Date(at.getTime() + LOCK_MINUTES * 60_000).toISOString() }
          : { failedSignIns: fails });
      }
      return reply.code(401).send({ error: "that email and password don't match an account" });
    }
    if (!emailConfirmed(u)) return reply.code(403).send({ error: "confirm your email first: open the link we sent when you signed up", status: "unverified" });
    if (u.status === "pending") return reply.code(403).send({ error: "your account is waiting for approval", status: "pending" });
    if (u.status !== "active") return reply.code(403).send({ error: "this account can't sign in", status: u.status });
    if (u.kind === "partner" && !u.clientCompanyId) return reply.code(403).send({ error: "your account is waiting for approval", status: "pending" });
    await deps.store.updateUser(u.id, { failedSignIns: 0, lockedUntil: undefined, lastSignInAt: at.toISOString() });
    return { user: publicUser(u), ...issue(u) };
  });

  app.get("/v1/me", async (req, reply) => {
    const a = await requireAuth(req, reply);
    if (!a) return reply;
    if (!a.user) return reply.code(404).send({ error: "this key isn't a signed-in person" });
    return { user: publicUser(a.user) };
  });

  // Ends this session only (signing out on one device).
  app.post("/v1/auth/sign-out", async (req, reply) => {
    const a = await requireAuth(req, reply);
    if (!a) return reply;
    if (!a.user || !a.session) return reply.code(404).send({ error: "this key isn't a signed-in person" });
    const nowSec = Math.floor(now().getTime() / 1000);
    // A key from before session ids existed can only be ended with sign-out-everywhere.
    if (!a.session.jti) return { ok: true, ended: false };
    const kept = (a.user.revokedSessions ?? []).filter((r) => r.exp > nowSec).slice(-49);
    await deps.store.updateUser(a.user.id, { revokedSessions: [...kept, { jti: a.session.jti, exp: a.session.exp }] });
    return { ok: true, ended: true };
  });

  // Ends every session of the signed-in person (sign out everywhere).
  app.post("/v1/auth/sign-out-everywhere", async (req, reply) => {
    const a = await requireAuth(req, reply);
    if (!a) return reply;
    if (!a.user) return reply.code(404).send({ error: "this key isn't a signed-in person" });
    await deps.store.updateUser(a.user.id, { sessionGen: a.user.sessionGen + 1 });
    return { ok: true };
  });

  // ---- Password reset and change ----
  const resetLimit = new RateLimiter(3, 3_600_000);
  const resetAllLimit = new RateLimiter(200, 3_600_000);
  app.post("/v1/auth/password-reset", async (req, reply) => {
    const parsed = ResetRequestBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "enter your email" });
    // The same answer whether or not the email has an account, so the form can't be used to find out.
    const answer = { ok: true, message: "If that email has an account, a link to reset the password is on its way." };
    if (!resetAllLimit.take("all") || !resetLimit.take(parsed.data.email)) return reply.code(202).send(answer);
    const u = await deps.store.findUserByEmail(parsed.data.email);
    if (!u || u.status !== "active") return reply.code(202).send(answer);
    const secret = randomBytes(32).toString("base64url");
    const at = now();
    await deps.store.updateUser(u.id, {
      passwordReset: { tokenHash: sha256(secret).toString("hex"), expiresAt: new Date(at.getTime() + RESET_TTL_MINUTES * 60_000).toISOString(), sessionGen: u.sessionGen, requestedAt: at.toISOString() },
    });
    const link = `${deps.webBaseUrl}/reset-password?token=${encodeURIComponent(`${u.id}.${secret}`)}`;
    // Not awaited: how long a send takes must not tell the caller whether the account exists.
    void deps.email?.send({ address: u.email, name: u.name }, {
      subject: "Reset your password",
      body: `Someone asked to reset the password for the account ${u.email}. Open the link below within ${RESET_TTL_MINUTES} minutes to choose a new one. It works once.\n\nIf this wasn't you, ignore this email: your password stays the same.`,
      link,
    }).catch((e) => console.error("password reset email failed", (e as Error).message));
    return reply.code(202).send(answer);
  });

  app.post("/v1/auth/password-reset/confirm", async (req, reply) => {
    const parsed = ResetConfirmBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "this reset link isn't complete; open it again from the email" });
    const bad = () => reply.code(410).send({ error: "this reset link has expired or was already used; ask for a new one" });
    const t = readResetToken(parsed.data.token);
    const u = t ? await deps.store.getUser(t.userId) : null;
    const r = u?.passwordReset;
    if (!t || !u || !r || r.usedAt || r.expiresAt <= now().toISOString() || r.sessionGen !== u.sessionGen || u.status !== "active") return bad();
    const want = Buffer.from(r.tokenHash, "hex");
    const got = sha256(t.secret);
    if (want.length !== got.length || !timingSafeEqual(want, got)) return bad();
    const pw = passwordProblem(parsed.data.password, u.email);
    if (pw) return reply.code(422).send({ error: pw, issues: [{ path: "password", message: pw }] });
    const at = now().toISOString();
    await deps.store.updateUser(u.id, {
      passwordHash: await hashPassword(parsed.data.password), sessionGen: u.sessionGen + 1,
      failedSignIns: 0, lockedUntil: at, passwordReset: { ...r, usedAt: at },
    });
    return { ok: true, email: u.email };
  });

  app.post("/v1/auth/change-password", async (req, reply) => {
    const a = await requireAuth(req, reply);
    if (!a) return reply;
    if (!a.user) return reply.code(404).send({ error: "this key isn't a signed-in person" });
    const parsed = ChangePasswordBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "enter your current and new password" });
    const u = a.user;
    if (u.lockedUntil && u.lockedUntil > now().toISOString()) return reply.code(429).send({ error: `too many wrong passwords; try again after ${LOCK_MINUTES} minutes` });
    if (!(await verifyPassword(parsed.data.currentPassword, u.passwordHash))) {
      const fails = (u.failedSignIns ?? 0) + 1;
      await deps.store.updateUser(u.id, fails >= MAX_FAILS
        ? { failedSignIns: 0, lockedUntil: new Date(now().getTime() + LOCK_MINUTES * 60_000).toISOString() }
        : { failedSignIns: fails });
      return reply.code(401).send({ error: "your current password isn't right" });
    }
    const pw = passwordProblem(parsed.data.newPassword, u.email);
    if (pw) return reply.code(422).send({ error: pw, issues: [{ path: "newPassword", message: pw }] });
    // Every other session ends; this one gets a fresh key.
    const next = await deps.store.updateUser(u.id, { passwordHash: await hashPassword(parsed.data.newPassword), sessionGen: u.sessionGen + 1, failedSignIns: 0 });
    return { user: publicUser(next), ...issue(next) };
  });

  // ---- Partner sign-up ----
  app.post("/v1/signups/partner", async (req, reply) => {
    const parsed = PartnerSignupBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
    const d = parsed.data;
    const pw = passwordProblem(d.password, d.email);
    if (pw) return reply.code(422).send({ error: "validation failed", issues: [{ path: "password", message: pw }] });
    if (!publicFormLimit.take("signup")) return reply.code(429).send({ error: "too many sign-ups right now; try again later" });
    // Every sign-up confirms its email first. automatic: the account opens on confirmation;
    // approval: it also waits for the platform to approve it.
    const answer = { status: "verify_email", approvalRequired: deps.partnerSignupMode !== "automatic" };
    // Same answer as a new sign-up, so the form can't be used to find out who has an account.
    if (await deps.store.findUserByEmail(d.email)) return reply.code(202).send(answer);
    const secret = randomBytes(32).toString("base64url");
    const at = now();
    const u: UserRecord = {
      id: randomUUID(), email: d.email, name: d.name, kind: "partner", tenantId: deps.platformTenantId, status: "pending",
      passwordHash: await hashPassword(d.password), sessionGen: 0, createdAt: at.toISOString(),
      signup: { companyName: d.companyName, companyType: d.companyType, phone: d.phone, website: d.website, states: d.states, expectedVolume: d.expectedVolume },
      emailVerification: { tokenHash: sha256(secret).toString("hex"), expiresAt: new Date(at.getTime() + VERIFY_TTL_DAYS * 86_400_000).toISOString(), sentAt: at.toISOString() },
    };
    try {
      await deps.store.createUser(u);
    } catch {
      return reply.code(202).send(answer);
    }
    sendVerification(u, secret);
    return reply.code(202).send(answer);
  });

  const sendVerification = (u: UserRecord, secret: string) => {
    void deps.email?.send({ address: u.email, name: u.name }, {
      subject: "Confirm your email",
      body: `Confirm that ${u.email} is your email to finish setting up the partner account for ${u.signup?.companyName ?? "your firm"}. The link works for ${VERIFY_TTL_DAYS} days.\n\nIf you didn't sign up, ignore this email.`,
      link: `${deps.webBaseUrl}/verify-email?token=${encodeURIComponent(`${u.id}.${secret}`)}`,
    }).catch((e) => console.error("confirmation email failed", (e as Error).message));
  };

  // The link in the confirmation email. The web page asks for a button press first, so a mail
  // scanner opening the link does not confirm anything.
  app.post("/v1/auth/verify-email", async (req, reply) => {
    const parsed = VerifyBody.safeParse(req.body);
    const bad = () => reply.code(410).send({ error: "this confirmation link has expired or isn't valid; ask for a new one" });
    if (!parsed.success) return bad();
    const t = readResetToken(parsed.data.token);
    const u = t ? await deps.store.getUser(t.userId) : null;
    const v = u?.emailVerification;
    if (!t || !u || !v) return bad();
    const want = Buffer.from(v.tokenHash, "hex");
    const got = sha256(t.secret);
    if (want.length !== got.length || !timingSafeEqual(want, got)) return bad();
    if (u.emailVerifiedAt) return { ok: true, status: u.status };
    if (v.expiresAt <= now().toISOString()) return bad();
    let next = await deps.store.updateUser(u.id, { emailVerifiedAt: now().toISOString() });
    if (deps.partnerSignupMode === "automatic" && next.kind === "partner" && next.status === "pending" && next.signup) next = await approvePartner(next, "automatic");
    return { ok: true, status: next.status };
  });

  const verifyResendLimit = new RateLimiter(3, 3_600_000);
  app.post("/v1/auth/verify-email/resend", async (req, reply) => {
    const parsed = ResetRequestBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "enter your email" });
    const answer = { ok: true, message: "If that email has an account waiting for confirmation, a new link is on its way." };
    if (!resetAllLimit.take("all") || !verifyResendLimit.take(parsed.data.email)) return reply.code(202).send(answer);
    const u = await deps.store.findUserByEmail(parsed.data.email);
    if (!u || emailConfirmed(u) || (u.status !== "pending" && u.status !== "active")) return reply.code(202).send(answer);
    const secret = randomBytes(32).toString("base64url");
    const at = now();
    const updated = await deps.store.updateUser(u.id, {
      emailVerification: { tokenHash: sha256(secret).toString("hex"), expiresAt: new Date(at.getTime() + VERIFY_TTL_DAYS * 86_400_000).toISOString(), sentAt: at.toISOString() },
    });
    sendVerification(updated, secret);
    return reply.code(202).send(answer);
  });

  /** Creates the firm for an approved partner sign-up and activates the user. */
  const approvePartner = async (u: UserRecord, by: string): Promise<UserRecord> => {
    const s = u.signup!;
    const existing = new Set((await deps.store.listClientCompanies(u.tenantId)).flatMap((c) => [c.clientCompanyId, c.portal?.slug ?? ""]));
    const base = slugFor(s.companyName);
    let slug = base;
    for (let i = 2; existing.has(slug) || RESERVED_SLUGS.has(slug) || (await deps.store.getClientCompany(`firm-${slug}`)); i++) slug = `${base}-${i}`;
    const company = ClientCompanySettings.parse({
      clientCompanyId: `firm-${slug}`, tenantId: u.tenantId, name: s.companyName,
      portal: { slug, displayName: s.companyName },
      partner: { companyType: s.companyType, contactName: u.name, contactEmail: u.email, phone: s.phone, website: s.website, states: s.states, setupDone: [] },
    });
    await deps.store.putClientCompany(company);
    return deps.store.updateUser(u.id, { status: "active", clientCompanyId: company.clientCompanyId, decidedAt: now().toISOString(), decidedBy: by });
  };

  app.get("/v1/partner-signups", async (req, reply) => {
    const tenantId = await requireTenantScope(req, reply);
    if (!tenantId) return reply;
    const users = (await deps.store.listUsers(tenantId)).filter((u) => u.kind === "partner" && u.signup);
    return { mode: tenantId === deps.platformTenantId ? deps.partnerSignupMode : "approval", signups: users.map(publicUser).sort((a, b) => b.createdAt.localeCompare(a.createdAt)) };
  });

  app.post("/v1/partner-signups/:id/decision", async (req, reply) => {
    const tenantId = await requireTenantScope(req, reply);
    if (!tenantId) return reply;
    const parsed = DecisionBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: parsed.error.issues });
    const u = await deps.store.getUser((req.params as { id: string }).id);
    if (!u || u.tenantId !== tenantId || u.kind !== "partner" || !u.signup) return reply.code(404).send({ error: "not found" });
    if (u.status !== "pending") return reply.code(409).send({ error: `already ${u.status}` });
    const a = await deps.authOf(req);
    const by = a?.user?.email ?? "api key";
    if (parsed.data.action === "reject") {
      return { user: publicUser(await deps.store.updateUser(u.id, { status: "rejected", decidedAt: now().toISOString(), decidedBy: by })) };
    }
    const approved = await approvePartner(u, by);
    // The sign-up page told them we'd email once the account opens.
    void deps.email?.send({ address: approved.email, name: approved.name }, {
      subject: "Your partner account is open",
      body: `Your account for ${u.signup!.companyName} is approved. Log in with the email and password you chose to set up your dashboard.`,
      link: `${deps.webBaseUrl}/login`,
    }).catch((e) => console.error("approval email failed", (e as Error).message));
    return { user: publicUser(approved) };
  });

  // ---- Enterprise contact requests ----
  app.post("/v1/inquiries", async (req, reply) => {
    const parsed = InquiryBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
    if (parsed.data.website) return reply.code(202).send({ received: true });
    if (!publicFormLimit.take("inquiry")) return reply.code(429).send({ error: "too many requests right now; try again later" });
    const { website: _w, ...d } = parsed.data;
    const rec: InquiryRecord = { id: randomUUID(), kind: "enterprise", ...d, createdAt: now().toISOString(), status: "new" };
    await deps.store.createInquiry(rec);
    return reply.code(202).send({ received: true });
  });

  app.get("/v1/inquiries", async (req, reply) => {
    // Requests are for the platform, so only the platform's own tenant (or staff) reads them.
    if (!deps.staffOf(req)) {
      const tenantId = await requireTenantScope(req, reply);
      if (!tenantId) return reply;
      if (tenantId !== deps.platformTenantId) return reply.code(403).send({ error: "platform only" });
    }
    return { inquiries: await deps.store.listInquiries() };
  });

  // V32: staff decide an enterprise request. Approve creates the subscriber and its first user,
  // and emails that person a link (7 days) to set their own password; nobody else ever knows it.
  app.post("/v1/inquiries/:id/decision", async (req, reply) => {
    const staff = deps.staffOf(req);
    let by = staff ?? "";
    if (!staff) {
      const tenantId = await requireTenantScope(req, reply);
      if (!tenantId) return reply;
      if (tenantId !== deps.platformTenantId) return reply.code(403).send({ error: "platform only" });
      by = (await deps.authOf(req))?.user?.email ?? "api key";
    }
    const parsed = z.object({ action: z.enum(["approve", "decline"]), tenantId: z.string().regex(/^[a-z0-9][a-z0-9-]{1,40}$/).optional() }).safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "send action: approve or decline" });
    const q = await deps.store.getInquiry((req.params as { id: string }).id);
    if (!q) return reply.code(404).send({ error: "not found" });
    if (q.status === "approved" || q.status === "declined") return reply.code(409).send({ error: `already ${q.status}` });
    const at = now().toISOString();
    if (parsed.data.action === "decline") return { inquiry: await deps.store.updateInquiry(q.id, { status: "declined", decidedAt: at, decidedBy: by }) };
    if (await deps.store.findUserByEmail(q.email)) return reply.code(409).send({ error: "that email already has an account" });
    let tenantId = parsed.data.tenantId ?? slugFor(q.company);
    if (parsed.data.tenantId && (await deps.store.getTenant(tenantId))) return reply.code(409).send({ error: "that account id is taken" });
    for (let i = 2; tenantId === deps.platformTenantId || (await deps.store.getTenant(tenantId)); i++) tenantId = `${slugFor(q.company)}-${i}`;
    await deps.store.putTenant(TenantSettings.parse({ tenantId, name: q.company }));
    const u: UserRecord = {
      id: randomUUID(), email: q.email, name: q.name, kind: "enterprise", tenantId, status: "active",
      // A random password nobody knows: the person sets their own from the email.
      passwordHash: await hashPassword(randomBytes(24).toString("base64url")), sessionGen: 0, createdAt: at, createdBy: by,
    };
    await deps.store.createUser(u);
    const secret = randomBytes(32).toString("base64url");
    await deps.store.updateUser(u.id, { passwordReset: { tokenHash: sha256(secret).toString("hex"), expiresAt: new Date(now().getTime() + 7 * 86_400_000).toISOString(), sessionGen: 0, requestedAt: at } });
    void deps.email?.send({ address: u.email, name: u.name }, {
      subject: "Your account is ready",
      body: `Welcome, ${u.name}. The enterprise account for ${q.company} is set up. Open the link below to choose your password; it works for 7 days.\n\nAfter that you can add your team, API keys and webhooks from the dashboard.`,
      link: `${deps.webBaseUrl}/reset-password?token=${encodeURIComponent(`${u.id}.${secret}`)}`,
    }).catch((e) => console.error("welcome email failed", (e as Error).message));
    const inquiry = await deps.store.updateInquiry(q.id, { status: "approved", decidedAt: at, decidedBy: by, tenantId });
    return reply.code(201).send({ inquiry, tenantId, user: publicUser(u) });
  });

  // V36: invite a person at one of the subscriber's firms. They get their own account, limited to
  // that firm (a partner session), and set their own password from the email. No key is in any link.
  app.post("/v1/client-companies/:id/staff", async (req, reply) => {
    const tenantId = await requireTenantScope(req, reply);
    if (!tenantId) return reply;
    const c = await deps.store.getClientCompany((req.params as { id: string }).id);
    if (!c || c.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    if (!c.portal?.slug) return reply.code(409).send({ error: "set up the firm's portal first" });
    const parsed = z.object({ email, name: z.string().trim().min(2).max(120).optional() }).safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "enter the person's email" });
    if (await deps.store.findUserByEmail(parsed.data.email)) return reply.code(409).send({ error: "that email already has an account" });
    const at = now();
    const by = (await deps.authOf(req))?.user?.email ?? "api key";
    const u: UserRecord = {
      id: randomUUID(), email: parsed.data.email, name: parsed.data.name ?? parsed.data.email.split("@")[0]!, kind: "partner", tenantId,
      clientCompanyId: c.clientCompanyId, status: "active", passwordHash: await hashPassword(randomBytes(24).toString("base64url")),
      sessionGen: 0, createdAt: at.toISOString(), createdBy: by,
    };
    await deps.store.createUser(u);
    const secret = randomBytes(32).toString("base64url");
    await deps.store.updateUser(u.id, { passwordReset: { tokenHash: sha256(secret).toString("hex"), expiresAt: new Date(at.getTime() + 7 * 86_400_000).toISOString(), sessionGen: 0, requestedAt: at.toISOString() } });
    const link = `${deps.webBaseUrl}/reset-password?token=${encodeURIComponent(`${u.id}.${secret}`)}`;
    const firmName = c.portal.displayName ?? c.name;
    void deps.email?.send({ address: u.email, name: u.name }, {
      subject: `You're invited to ${firmName}'s filing portal`,
      body: `${by === "api key" ? "You've" : `${by} has`} given you access to ${firmName}'s filing portal. Open the link below to choose your password; it works for 7 days. Then log in with this email.`,
      link,
    }).catch((e) => console.error("invite email failed", (e as Error).message));
    return reply.code(201).send({ user: publicUser(u), link, expiresAt: new Date(at.getTime() + 7 * 86_400_000).toISOString() });
  });

  // ---- Users of a subscriber ----
  // Staff create a subscriber's first enterprise user once its request is approved.
  app.post("/v1/tenants/:id/users", async (req, reply) => {
    const staff = deps.staffOf(req);
    if (!staff) return reply.code(403).send({ error: "platform staff only" });
    return createEnterpriseUser(req, reply, (req.params as { id: string }).id, staff);
  });
  // A subscriber adds its own team.
  app.get("/v1/users", async (req, reply) => {
    const tenantId = await requireTenantScope(req, reply);
    if (!tenantId) return reply;
    return { users: (await deps.store.listUsers(tenantId)).filter((u) => u.kind === "enterprise").map(publicUser) };
  });
  app.post("/v1/users", async (req, reply) => {
    const tenantId = await requireTenantScope(req, reply);
    if (!tenantId) return reply;
    const a = await deps.authOf(req);
    return createEnterpriseUser(req, reply, tenantId, a?.user?.email ?? "api key");
  });

  async function createEnterpriseUser(req: FastifyRequest, reply: FastifyReply, tenantId: string, by: string) {
    const parsed = NewUserBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
    const pw = passwordProblem(parsed.data.password, parsed.data.email);
    if (pw) return reply.code(422).send({ error: "validation failed", issues: [{ path: "password", message: pw }] });
    if (await deps.store.findUserByEmail(parsed.data.email)) return reply.code(409).send({ error: "that email already has an account" });
    const u: UserRecord = {
      id: randomUUID(), email: parsed.data.email, name: parsed.data.name, kind: "enterprise", tenantId, status: "active",
      passwordHash: await hashPassword(parsed.data.password), sessionGen: 0, createdAt: now().toISOString(), createdBy: by,
    };
    await deps.store.createUser(u);
    return reply.code(201).send({ user: publicUser(u) });
  }

  // ---- Partner self-service: profile, brand and which card pays which filing ----
  app.put("/v1/client-companies/:id/profile", async (req, reply) => {
    const a = await requireAuth(req, reply);
    if (!a) return reply;
    const id = (req.params as { id: string }).id;
    if (a.partnerOf && a.partnerOf !== id) return reply.code(404).send({ error: "not found" });
    const c = await deps.store.getClientCompany(id);
    if (!c || c.tenantId !== a.tenantId) return reply.code(404).send({ error: "not found" });
    const parsed = ProfileBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
    const b = parsed.data;
    if (b.brand?.slug && b.brand.slug !== c.portal?.slug) {
      if (RESERVED_SLUGS.has(b.brand.slug)) return reply.code(422).send({ error: "validation failed", issues: [{ path: "brand.slug", message: "that address is reserved; pick another" }] });
      const taken = (await deps.store.listClientCompanies(c.tenantId)).some((o) => o.clientCompanyId !== c.clientCompanyId && o.portal?.slug === b.brand!.slug);
      if (taken) return reply.code(409).send({ error: "validation failed", issues: [{ path: "brand.slug", message: "another firm already uses that address" }] });
    }
    const next = {
      ...c,
      ...(b.name ? { name: b.name } : {}),
      ...(b.partner ? { partner: { setupDone: [], ...c.partner, ...b.partner } } : {}),
      // A logo link the firm types replaces an uploaded logo (the upload is shown first otherwise).
      ...(b.brand ? { portal: { ...c.portal, ...b.brand, slug: b.brand.slug ?? await portalSlugFor(deps.store, c.tenantId, c), ...(b.brand.logoUrl ? { logoArtifactId: undefined } : {}) } } : {}),
      ...(b.paymentRouting ? { payments: { methods: c.payments?.methods ?? [], routing: b.paymentRouting } } : {}),
      ...(b.copyEmail !== undefined ? { copyEmail: b.copyEmail ?? undefined } : {}),
      ...(b.registeredAgents ? { registeredAgentsByState: Object.fromEntries(Object.entries({ ...c.registeredAgentsByState, ...b.registeredAgents }).filter(([, v]) => v)) } : {}),
    };
    const checked = ClientCompanySettings.safeParse(next);
    if (!checked.success) return reply.code(422).send({ error: "validation failed", issues: checked.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
    await deps.store.putClientCompany(checked.data);
    return { clientCompany: checked.data };
  });

  // ---- Enterprise self-service: payment routing, portal defaults, portal catalog ----
  app.get("/v1/portals", async () => ({ portals: PORTALS }));

  app.get("/v1/account/setup", async (req, reply) => {
    const tenantId = await requireTenantScope(req, reply);
    if (!tenantId) return reply;
    const t = await deps.store.getTenant(tenantId);
    return {
      configured: !!t,
      payments: t?.payments ?? { methods: [], routing: PaymentRouting.parse({}) },
      portalLogins: Object.fromEntries(Object.entries(t?.portalLogins ?? {}).map(([k, v]) => [k, { connectedAt: v.connectedAt, connectedBy: v.connectedBy }])),
      portalDefaults: t?.portalDefaults ?? {},
      filingDefaults: { organizer: t?.organizer, filer: t?.filer, signer: t?.signer, copyEmail: t?.copyEmail, registeredAgents: t?.registeredAgentProvisioning?.selfByState ?? {} },
      portals: PORTALS,
    };
  });

  app.put("/v1/account/payment-routing", async (req, reply) => {
    const tenantId = await requireTenantScope(req, reply);
    if (!tenantId) return reply;
    const t = await deps.store.getTenant(tenantId);
    if (!t) return reply.code(409).send({ error: "tenant settings are not set up yet; ask the platform to configure the tenant first" });
    const parsed = PaymentSettings.safeParse({ methods: t.payments?.methods ?? [], routing: req.body });
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
    await deps.store.putTenant(TenantSettings.parse({ ...t, payments: parsed.data }));
    return { payments: parsed.data };
  });

  // V29: connect a state portal login. Write-only: the login is sealed and never sent back.
  const LoginBody = z.object({ username: z.string().trim().min(1).max(200), password: z.string().min(1).max(500), totpSeed: z.string().trim().regex(/^[A-Z2-7 =]{16,128}$/i, "the authenticator key is the letters and digits the site showed when you set up the app").optional() });
  app.put("/v1/account/portal-logins/:portal", async (req, reply) => {
    const tenantId = await requireTenantScope(req, reply);
    if (!tenantId) return reply;
    const portal = (req.params as { portal: string }).portal;
    const where = PORTAL_LOGIN_KEYS[portal];
    if (!where) return reply.code(404).send({ error: "no such portal login" });
    if (!deps.secrets) return reply.code(501).send({ error: "connecting logins needs DATA_ENCRYPTION_KEY on the server" });
    const t = await deps.store.getTenant(tenantId);
    if (!t) return reply.code(409).send({ error: "tenant settings are not set up yet; ask the platform to configure the tenant first" });
    const parsed = LoginBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
    const keyName = (t[where.setting] as string | undefined) || where.fallback;
    const vaultKey = `${tenantId}/${keyName}`;
    await deps.secrets.put(vaultKey, tenantId, { username: parsed.data.username, password: parsed.data.password, ...(parsed.data.totpSeed ? { totpSeed: parsed.data.totpSeed.replace(/[\s=]/g, "").toUpperCase() } : {}) });
    const a = await deps.authOf(req);
    const next = TenantSettings.parse({ ...t, [where.setting]: keyName, portalLogins: { ...t.portalLogins, [portal]: { vaultKey, connectedAt: now().toISOString(), connectedBy: a?.user?.email ?? "api key" } } });
    await deps.store.putTenant(next);
    return { portal, connectedAt: next.portalLogins[portal]!.connectedAt, connectedBy: next.portalLogins[portal]!.connectedBy };
  });

  app.delete("/v1/account/portal-logins/:portal", async (req, reply) => {
    const tenantId = await requireTenantScope(req, reply);
    if (!tenantId) return reply;
    const portal = (req.params as { portal: string }).portal;
    const t = await deps.store.getTenant(tenantId);
    const entry = t?.portalLogins[portal];
    if (!t || !entry) return reply.code(404).send({ error: "that login isn't connected" });
    await deps.secrets?.remove(entry.vaultKey);
    const { [portal]: _gone, ...rest } = t.portalLogins;
    await deps.store.putTenant(TenantSettings.parse({ ...t, portalLogins: rest }));
    return { portal, disconnected: true };
  });

  // V30: who is named on the subscriber's filings: organizer, filer, signer, and its own
  // registered agent per state (used when a client asks the filing company for the agent).
  const AddressIn = z.object({ street1: z.string().trim().min(2).max(120), street2: z.string().trim().max(120).optional(), city: z.string().trim().min(2).max(80), state: z.string().regex(/^[A-Z]{2}$/), zip: z.string().regex(/^\d{5}(-\d{4})?$/) });
  const PersonIn = z.object({ name: z.string().trim().min(2).max(160), title: z.string().trim().max(80).optional(), address: AddressIn.optional() });
  const FilingDefaultsBody = z.object({
    organizer: PersonIn.nullable().optional(), filer: PersonIn.nullable().optional(), signer: PersonIn.nullable().optional(),
    /** V31: also CC'd on the state's copies (adapters/copies.ts); null clears it. */
    copyEmail: z.string().trim().toLowerCase().email().nullable().optional(),
    registeredAgents: z.partialRecord(z.enum(["NY", "NJ", "FL", "MO"]), z.union([z.object({ name: z.string().trim().min(2).max(160), email: z.string().email().optional(), address: AddressIn }), z.null()])).optional()
      .refine((m) => !m || Object.entries(m).every(([st, a]) => !a || a.address.state === st), { message: "each agent's address must be in its own state" }),
  });
  app.put("/v1/account/filing-defaults", async (req, reply) => {
    const tenantId = await requireTenantScope(req, reply);
    if (!tenantId) return reply;
    const t = await deps.store.getTenant(tenantId);
    if (!t) return reply.code(409).send({ error: "tenant settings are not set up yet; ask the platform to configure the tenant first" });
    const parsed = FilingDefaultsBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
    const b = parsed.data;
    const pick = <K extends "organizer" | "filer" | "signer">(k: K) => (b[k] === undefined ? t[k] : b[k] ?? undefined);
    const selfByState = b.registeredAgents
      ? Object.fromEntries(Object.entries({ ...t.registeredAgentProvisioning?.selfByState, ...b.registeredAgents }).filter(([, v]) => v))
      : t.registeredAgentProvisioning?.selfByState;
    const next = TenantSettings.parse({ ...t, organizer: pick("organizer"), filer: pick("filer"), signer: pick("signer"), registeredAgentProvisioning: { ...t.registeredAgentProvisioning, selfByState },
      copyEmail: b.copyEmail === undefined ? t.copyEmail : b.copyEmail ?? undefined });
    await deps.store.putTenant(next);
    return { organizer: next.organizer, filer: next.filer, signer: next.signer, copyEmail: next.copyEmail, registeredAgents: next.registeredAgentProvisioning?.selfByState ?? {} };
  });

  app.put("/v1/account/portal-defaults/:portal", async (req, reply) => {
    const tenantId = await requireTenantScope(req, reply);
    if (!tenantId) return reply;
    const t = await deps.store.getTenant(tenantId);
    if (!t) return reply.code(409).send({ error: "tenant settings are not set up yet; ask the platform to configure the tenant first" });
    const portal = (req.params as { portal: string }).portal;
    const body = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).safeParse(req.body);
    if (!body.success) return reply.code(422).send({ error: "send an object of defaults" });
    const problems = portalDefaultsProblems(portal, body.data);
    if (problems.length) return reply.code(422).send({ error: "validation failed", issues: problems.map((message) => ({ path: portal, message })) });
    await deps.store.putTenant(TenantSettings.parse({ ...t, portalDefaults: { ...t.portalDefaults, [portal]: body.data } }));
    return { portal, defaults: body.data };
  });
}
