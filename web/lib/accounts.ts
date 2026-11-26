"use server";

import { redirect } from "next/navigation";
import { engine, EngineError, type Account, type ClientCompany, type SignInResult } from "./engine";
import { readSession, writeSession } from "./session";
import { finishSignIn } from "./sign-in";
import { supportEmail, TERMS_VERSION } from "./brand";

export type FormState = { error?: string; issues?: Record<string, string>; ok?: boolean; message?: string; link?: { href: string; label: string } } | null;

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
        if (status === "unverified") return { error: "Confirm your email first: open the link we sent when you signed up.", link: { href: "/verify-email", label: "Send the link again" } };
        return { error: status === "pending" ? "Your account is waiting for approval. We'll email you when it's ready." : `This account can't sign in. If you think that's wrong, email ${supportEmail()}.` };
      }
    }
    return { error: "We can't sign you in right now. Try again in a minute." };
  }
  return { error: await finishSignIn(r, "password") };
}

const TYPES = new Set(["cpa", "payroll", "cfo", "title", "other"]);
const STATES = new Set(["NY", "NJ", "FL"]);

/** Partner sign-up: CPA, payroll and CFO firms. Depending on the platform's setting, the account waits for approval or opens at once. */
export async function signUpPartner(_prev: FormState, fd: FormData): Promise<FormState> {
  const body = {
    companyName: text(fd, "companyName", 120), companyType: text(fd, "companyType", 20), name: text(fd, "name", 120),
    email: text(fd, "email").toLowerCase(), password: String(fd.get("password") ?? ""),
    phone: text(fd, "phone", 40) || undefined, website: text(fd, "website", 200) || undefined,
    states: fd.getAll("states").map(String).filter((s) => STATES.has(s)),
    expectedVolume: text(fd, "expectedVolume", 40) || undefined,
    termsVersion: TERMS_VERSION,
  };
  const issues: Record<string, string> = {};
  if (fd.get("terms") !== "on") issues.terms = "Agree to the Terms of Service and Privacy Policy to create an account.";
  if (body.companyName.length < 2) issues.companyName = "Enter your firm's name.";
  if (!TYPES.has(body.companyType)) issues.companyType = "Pick what kind of firm you are.";
  if (body.name.length < 2) issues.name = "Enter your name.";
  if (!EMAIL.test(body.email)) issues.email = "Enter your work email.";
  if (body.password !== String(fd.get("password2") ?? "")) issues.password2 = "The two passwords don't match.";
  if (body.website && !body.website.startsWith("https://")) body.website = `https://${body.website.replace(/^https?:\/\//, "")}`;
  if (Object.keys(issues).length) return { error: "Check the highlighted fields.", issues };
  let approvalRequired = true;
  try {
    approvalRequired = (await engine<{ status: string; approvalRequired?: boolean }>(null, "/v1/signups/partner", { method: "POST", body })).approvalRequired !== false;
  } catch (e) {
    if (e instanceof EngineError && e.status === 422) {
      const found = issuesOf(e);
      return { error: found.password ? `Password: ${found.password}` : "Check the highlighted fields.", issues: found };
    }
    if (e instanceof EngineError && e.status === 429) return { error: "Too many sign-ups from here. Try again later." };
    return { error: "We can't create your account right now. Try again in a minute." };
  }
  // Every new account confirms its email first; some also wait for approval.
  redirect(`/signup/sent${approvalRequired ? "" : "?open=1"}`);
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

/** Forgot password: the engine emails a reset link if the email has an account; the answer is the same either way. */
export async function requestPasswordReset(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = text(fd, "email").toLowerCase();
  if (!EMAIL.test(email)) return { error: "Enter the email you log in with.", issues: { email: "Enter the email you log in with." } };
  try {
    await engine(null, "/v1/auth/password-reset", { method: "POST", body: { email } });
  } catch {
    return { error: "We can't send a reset link right now. Try again in a minute." };
  }
  return { ok: true, message: "If that email has an account, we've sent it a link to choose a new password. It works for an hour." };
}

/** The page the emailed link opens: sets the new password, then sends the person to log in. */
export async function resetPassword(_prev: FormState, fd: FormData): Promise<FormState> {
  const token = String(fd.get("token") ?? "");
  const password = String(fd.get("password") ?? "");
  if (password !== String(fd.get("password2") ?? "")) return { error: "The two passwords don't match.", issues: { password2: "The two passwords don't match." } };
  try {
    await engine(null, "/v1/auth/password-reset/confirm", { method: "POST", body: { token, password } });
  } catch (e) {
    if (e instanceof EngineError && e.status === 410) return { error: "This link has expired or was already used. Ask for a new one below." };
    if (e instanceof EngineError && e.status === 422) {
      const found = issuesOf(e);
      return { error: found.password ? `Password: ${found.password}` : "This link isn't complete. Open it again from the email.", issues: found };
    }
    return { error: "We can't change your password right now. Try again in a minute." };
  }
  redirect("/login?reset=1");
}

/** Change password while signed in. Every other session ends; this one continues on the fresh key. */
export async function changePassword(_prev: FormState, fd: FormData): Promise<FormState> {
  const s = await readSession();
  if (!s || s.signedInWith !== "password") return { error: "Sign in with your email and password to change it." };
  const currentPassword = String(fd.get("currentPassword") ?? "");
  const newPassword = String(fd.get("newPassword") ?? "");
  if (newPassword !== String(fd.get("newPassword2") ?? "")) return { error: "The two new passwords don't match.", issues: { newPassword2: "The two new passwords don't match." } };
  let r: SignInResult;
  try {
    r = await engine<SignInResult>(s.apiKey, "/v1/auth/change-password", { method: "POST", body: { currentPassword, newPassword } });
  } catch (e) {
    if (e instanceof EngineError && e.status === 401) {
      const why = (e.body as { error?: string } | null)?.error ?? "";
      if (/current password/.test(why)) return { error: "Your current password isn't right.", issues: { currentPassword: "This isn't your current password." } };
      redirect("/login");
    }
    if (e instanceof EngineError && e.status === 429) return { error: "Too many wrong passwords. Wait 15 minutes and try again." };
    if (e instanceof EngineError && e.status === 422) {
      const found = issuesOf(e);
      return { error: found.newPassword ? `New password: ${found.newPassword}` : "Check the highlighted fields.", issues: found };
    }
    return { error: "We can't change your password right now. Try again in a minute." };
  }
  await writeSession(s.kind === "firm" ? { ...s, apiKey: r.sessionKey, expiresAt: r.expiresAt } : { ...s, apiKey: r.sessionKey });
  return { ok: true, message: "Your password is changed. You're signed out everywhere else." };
}

/** The confirmation link's page: confirming takes a button press, so a mail scanner opening the link changes nothing. */
export async function confirmEmail(_prev: FormState, fd: FormData): Promise<FormState> {
  const token = String(fd.get("token") ?? "");
  try {
    const r = await engine<{ ok: boolean; status: string }>(null, "/v1/auth/verify-email", { method: "POST", body: { token } });
    if (r.status === "active") return { ok: true, message: "Your email is confirmed. You can log in now.", link: { href: "/login", label: "Log in" } };
    return { ok: true, message: "Your email is confirmed. We review new partner accounts and will email you as soon as yours is open." };
  } catch (e) {
    if (e instanceof EngineError && e.status === 410) return { error: "This link has expired or isn't valid. Ask for a new one below.", link: { href: "/verify-email", label: "Send a new link" } };
    return { error: "We can't confirm your email right now. Try again in a minute." };
  }
}

export async function resendConfirmation(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = text(fd, "email").toLowerCase();
  if (!EMAIL.test(email)) return { error: "Enter the email you signed up with.", issues: { email: "Enter the email you signed up with." } };
  try {
    await engine(null, "/v1/auth/verify-email/resend", { method: "POST", body: { email } });
  } catch {
    return { error: "We can't send a link right now. Try again in a minute." };
  }
  return { ok: true, message: "If that email is waiting for confirmation, we've sent a new link. It works for 7 days." };
}
