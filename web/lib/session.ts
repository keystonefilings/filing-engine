import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { seal, unseal } from "./seal";

/**
 * Two kinds of sign-in, both kept in one sealed, httpOnly cookie:
 *  - tenant: a filing service company (Scope 1 subscriber) signed in to the enterprise
 *    dashboard with one of its API keys;
 *  - firm: a CPA, title or payroll firm's staff, signed in to the firm's white-label portal
 *    through an invite link the service company sent. A firm session can only see and
 *    create that one firm's filings; the scoping is enforced here, on the server.
 */

/** signedInWith "password": the apiKey is a short-lived session key the engine issued at email sign-in. */
export interface TenantSession { kind: "tenant"; apiKey: string; tenantId: string; name: string; signedInWith?: "api_key" | "password" | "google"; email?: string }
export interface FirmSession { kind: "firm"; apiKey: string; tenantId: string; clientCompanyId: string; slug: string; email: string; signedInWith?: "invite" | "password" | "google"; expiresAt?: string }
export type Session = TenantSession | FirmSession;

const COOKIE = "kfe_session";
const TTL = { tenant: 12 * 3600, firm: 7 * 24 * 3600 } as const;

export async function readSession(): Promise<Session | null> {
  const jar = await cookies();
  const s = unseal<Session & Record<string, unknown>>("session", jar.get(COOKIE)?.value);
  if (!s || (s.kind !== "tenant" && s.kind !== "firm") || typeof s.apiKey !== "string") return null;
  return s as Session;
}

export async function writeSession(s: Session): Promise<void> {
  const jar = await cookies();
  const ttl = TTL[s.kind];
  jar.set(COOKIE, seal("session", { ...s }, ttl), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: ttl,
  });
}

export async function clearSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export async function requireTenant(): Promise<TenantSession> {
  const s = await readSession();
  if (!s || s.kind !== "tenant") redirect("/login");
  return s;
}

export async function requireFirm(slug: string): Promise<FirmSession> {
  const s = await readSession();
  if (!s || s.kind !== "firm" || s.slug !== slug) redirect(`/p/${encodeURIComponent(slug)}/signed-out`);
  return s;
}

// ---- Invite links ----

export interface StaffInvite { apiKey: string; tenantId: string; clientCompanyId: string; slug: string; email: string }
/**
 * via "platform": a link a partner firm made. It carries no key; the site uses its own PLATFORM_API_KEY
 * (the platform tenant's key) when the client opens it, scoped to the firm in the link.
 */
export interface ClientIntake { apiKey: string; tenantId: string; clientCompanyId: string; slug: string; kind: string; nonce: string; label?: string; via?: "platform" }

/** The engine key a client link acts with. */
export function intakeKey(i: ClientIntake): string {
  if (i.via !== "platform") return i.apiKey;
  const k = process.env.PLATFORM_API_KEY?.trim();
  if (!k) throw new Error("PLATFORM_API_KEY is not set");
  return k;
}

export const INVITE_TTL = { staff: 7 * 24 * 3600, client: 30 * 24 * 3600 } as const;

export function publicUrl(): string {
  return (process.env.PORTAL_PUBLIC_URL ?? "http://localhost:3000").replace(/\/+$/, "");
}

export function staffInviteLink(i: StaffInvite): string {
  return `${publicUrl()}/join/${seal("staff-invite", { ...i }, INVITE_TTL.staff)}`;
}

/** ttlSec shortens the link, e.g. to the life of the session key it carries. */
export function clientIntakeLink(i: ClientIntake, ttlSec: number = INVITE_TTL.client): string {
  return `${publicUrl()}/i/${seal("client-intake", { ...i }, Math.min(ttlSec, INVITE_TTL.client))}`;
}

export function readStaffInvite(token: string): StaffInvite | null {
  return unseal<StaffInvite & Record<string, unknown>>("staff-invite", token);
}

export function readClientIntake(token: string): ClientIntake | null {
  return unseal<ClientIntake & Record<string, unknown>>("client-intake", token);
}

/** A person signed in with their own account (password or Google): the key is an engine session. */
export function personalSession(s: { signedInWith?: string } | null | undefined): boolean {
  return s?.signedInWith === "password" || s?.signedInWith === "google";
}
