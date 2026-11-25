"use server";

import { redirect } from "next/navigation";
import { engine, EngineError, type Account, type ClientCompany, type SignInResult } from "./engine";
import { writeSession } from "./session";

export type FormState = { error?: string; issues?: Record<string, string>; ok?: boolean; message?: string } | null;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (fd: FormData, k: string, max = 200) => String(fd.get(k) ?? "").trim().slice(0, max);

function issuesOf(e: unknown): Record<string, string> {
  const body = e instanceof EngineError ? (e.body as { issues?: { path: string; message: string }[] }) : undefined;
  return Object.fromEntries((body?.issues ?? []).map((i) => [i.path, i.message]));
}

/**
 * Email sign-in for everyone. The engine says which kind of account it is:
 * enterprise people go to the enterprise dashboard, partner firms to their own dashboard.
 */
export async function signInWithEmail(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = text(fd, "email").toLowerCase();
  const password = String(fd.get("password") ?? "");
  if (!EMAIL.test(email) || !password) return { error: "Enter your email and password." };
  let r: SignInResult;
  try {
    r = await engine<SignInResult>(null, "/v1/auth/sign-in", { method: "POST", body: { email, password } });
  } catch (e) {
    if (e instanceof EngineError) {
      if (e.status === 401) return { error: "That email and password don't match an account." };
      if (e.status === 429) return { error: "Too many tries. Wait a few minutes and try again." };
      if (e.status === 403) {
        const status = (e.body as { status?: string } | null)?.status;
        return { error: status === "pending" ? "Your account is waiting for approval. We'll email you when it's ready." : "This account can't sign in. Contact us if you think that's wrong." };
      }
    }
    return { error: "We can't sign you in right now. Try again in a minute." };
  }
  const { user, sessionKey, expiresAt } = r;
  if (user.kind === "enterprise") {
    const account = await engine<Account>(sessionKey, "/v1/account");
    await writeSession({ kind: "tenant", apiKey: sessionKey, tenantId: user.tenantId, name: account.name, signedInWith: "password", email: user.email });
    redirect("/dashboard");
  }
  if (!user.clientCompanyId) return { error: "Your account is waiting for approval. We'll email you when it's ready." };
  const { clientCompany } = await engine<{ clientCompany: ClientCompany }>(sessionKey, `/v1/client-companies/${encodeURIComponent(user.clientCompanyId)}`);
  const slug = clientCompany.portal?.slug;
  if (!slug) return { error: "Your dashboard isn't set up yet. Contact us and we'll fix it." };
  await writeSession({ kind: "firm", apiKey: sessionKey, tenantId: user.tenantId, clientCompanyId: user.clientCompanyId, slug, email: user.email, signedInWith: "password", expiresAt });
  const done = clientCompany.partner?.setupDone ?? [];
  redirect(`/p/${encodeURIComponent(slug)}${done.length < 3 ? "/setup" : ""}`);
}

const TYPES = new Set(["cpa", "payroll", "cfo", "other"]);
const STATES = new Set(["NY", "NJ", "FL"]);

/** Partner sign-up: CPA, payroll and CFO firms. Depending on the platform's setting, the account waits for approval or opens at once. */
export async function signUpPartner(_prev: FormState, fd: FormData): Promise<FormState> {
  const body = {
    companyName: text(fd, "companyName", 120), companyType: text(fd, "companyType", 20), name: text(fd, "name", 120),
    email: text(fd, "email").toLowerCase(), password: String(fd.get("password") ?? ""),
    phone: text(fd, "phone", 40) || undefined, website: text(fd, "website", 200) || undefined,
    states: fd.getAll("states").map(String).filter((s) => STATES.has(s)),
    expectedVolume: text(fd, "expectedVolume", 40) || undefined,
  };
  const issues: Record<string, string> = {};
  if (body.companyName.length < 2) issues.companyName = "Enter your firm's name.";
  if (!TYPES.has(body.companyType)) issues.companyType = "Pick what kind of firm you are.";
  if (body.name.length < 2) issues.name = "Enter your name.";
  if (!EMAIL.test(body.email)) issues.email = "Enter your work email.";
  if (body.password !== String(fd.get("password2") ?? "")) issues.password2 = "The two passwords don't match.";
  if (body.website && !body.website.startsWith("https://")) body.website = `https://${body.website.replace(/^https?:\/\//, "")}`;
  if (Object.keys(issues).length) return { error: "Check the highlighted fields.", issues };
  let status: string;
  try {
    status = (await engine<{ status: string }>(null, "/v1/signups/partner", { method: "POST", body })).status;
  } catch (e) {
    if (e instanceof EngineError && e.status === 422) {
      const found = issuesOf(e);
      return { error: found.password ? `Password: ${found.password}` : "Check the highlighted fields.", issues: found };
    }
    if (e instanceof EngineError && e.status === 429) return { error: "Too many sign-ups from here. Try again later." };
    return { error: "We can't create your account right now. Try again in a minute." };
  }
  // "active" and "check_sign_in" both mean sign-ups open at once; "pending" waits for approval.
  redirect(status === "pending" ? "/signup/sent" : "/login?new=1");
}

/** Enterprise contact form on the landing page. Nothing is emailed from here: requests wait in the platform dashboard. */
export async function sendInquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  const body = {
    name: text(fd, "name", 120), company: text(fd, "company", 120), email: text(fd, "email").toLowerCase(),
    phone: text(fd, "phone", 40) || undefined, states: text(fd, "states", 80) || undefined, volume: text(fd, "volume", 40) || undefined,
    message: text(fd, "message", 2000) || undefined, website: String(fd.get("website") ?? ""),
  };
  const issues: Record<string, string> = {};
  if (body.name.length < 2) issues.name = "Enter your name.";
  if (body.company.length < 2) issues.company = "Enter your company.";
  if (!EMAIL.test(body.email)) issues.email = "Enter your work email.";
  if (Object.keys(issues).length) return { error: "Check the highlighted fields.", issues };
  try {
    await engine(null, "/v1/inquiries", { method: "POST", body });
  } catch (e) {
    if (e instanceof EngineError && e.status === 422) return { error: "Check the highlighted fields.", issues: issuesOf(e) };
    return { error: "We couldn't send that just now. Try again in a minute." };
  }
  return { ok: true, message: "Thanks. We have your request and will reply by email." };
}
