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

export interface TenantSession { kind: "tenant"; apiKey: string; tenantId: string; name: string }
export interface FirmSession { kind: "firm"; apiKey: string; tenantId: string; clientCompanyId: string; slug: string; email: string }
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
  if (!s || s.kind !== "tenant") redirect("/dashboard/login");
  return s;
}

export async function requireFirm(slug: string): Promise<FirmSession> {
  const s = await readSession();
  if (!s || s.kind !== "firm" || s.slug !== slug) redirect(`/p/${encodeURIComponent(slug)}/signed-out`);
  return s;
}

// ---- Invite links ----

export interface StaffInvite { apiKey: string; tenantId: string; clientCompanyId: string; slug: string; email: string }
export interface ClientIntake { apiKey: string; tenantId: string; clientCompanyId: string; slug: string; kind: string; nonce: string; label?: string }

export const INVITE_TTL = { staff: 7 * 24 * 3600, client: 30 * 24 * 3600 } as const;

export function publicUrl(): string {
  return (process.env.PORTAL_PUBLIC_URL ?? "http://localhost:3000").replace(/\/+$/, "");
}

export function staffInviteLink(i: StaffInvite): string {
  return `${publicUrl()}/join/${seal("staff-invite", { ...i }, INVITE_TTL.staff)}`;
}

export function clientIntakeLink(i: ClientIntake): string {
  return `${publicUrl()}/i/${seal("client-intake", { ...i }, INVITE_TTL.client)}`;
}

export function readStaffInvite(token: string): StaffInvite | null {
  return unseal<StaffInvite & Record<string, unknown>>("staff-invite", token);
}

export function readClientIntake(token: string): ClientIntake | null {
  return unseal<ClientIntake & Record<string, unknown>>("client-intake", token);
}
