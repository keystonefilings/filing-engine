"use client";

import { useKeptForm } from "./useKeptForm";
import Link from "next/link";
import type { FormState } from "@/lib/accounts";

type Action = (prev: FormState, fd: FormData) => Promise<FormState>;

function Err({ s, k }: { s: FormState; k: string }) {
  const m = s?.issues?.[k];
  return m ? <span className="err" id={`${k}-err`}>{m}</span> : null;
}

function Msg({ s }: { s: FormState }) {
  const link = s?.link ? <> <Link href={s.link.href}>{s.link.label}</Link></> : null;
  if (s?.error) return <p className="form-msg bad" role="alert">{s.error}{link}</p>;
  if (s?.message) return <p className="form-msg good" role="status">{s.message}{link}</p>;
  return <p className="form-msg" role="status" />;
}

export function EmailLoginForm({ action, notice }: { action: Action; notice?: string }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  return (
    <form {...formProps}>
      {notice && !s ? <p className="form-msg good" role="status">{notice}</p> : null}
      <label htmlFor="li-email">Email<input id="li-email" name="email" type="email" autoComplete="email" required /></label>
      <label htmlFor="li-pw">Password<input id="li-pw" name="password" type="password" autoComplete="current-password" required /></label>
      <p className="hero-note" style={{ margin: 0 }}><Link href="/forgot-password">Forgot your password?</Link></p>
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? "Signing in…" : "Log in"}</button>
      <Msg s={s} />
    </form>
  );
}

export function ForgotPasswordForm({ action }: { action: Action }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  if (s?.ok) return <p className="form-msg good" role="status">{s.message}</p>;
  return (
    <form {...formProps} noValidate>
      <label htmlFor="fp-email">Email<input id="fp-email" name="email" type="email" autoComplete="email" required aria-describedby="email-err" /><Err s={s} k="email" /></label>
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? "Sending…" : "Email me a reset link"}</button>
      <Msg s={s} />
    </form>
  );
}

export function ResetPasswordForm({ action, token }: { action: Action; token: string }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  return (
    <form {...formProps} noValidate>
      <input type="hidden" name="token" value={token} />
      <label htmlFor="rp-pw">New password<input id="rp-pw" name="password" type="password" autoComplete="new-password" minLength={12} required aria-describedby="password-err" /><Err s={s} k="password" /></label>
      <label htmlFor="rp-pw2">New password again<input id="rp-pw2" name="password2" type="password" autoComplete="new-password" required aria-describedby="password2-err" /><Err s={s} k="password2" /></label>
      <p className="help">At least 12 characters. A few unrelated words work well.</p>
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Set new password"}</button>
      <Msg s={s} />
      {s?.error?.includes("expired") ? <p className="hero-note"><Link href="/forgot-password">Ask for a new link</Link></p> : null}
    </form>
  );
}

export function ChangePasswordForm({ action }: { action: Action }) {
  const { state: s, pending, formProps } = useKeptForm(action, null, { clearOnSuccess: true });
  return (
    <form {...formProps} noValidate className="card" style={{ maxWidth: 460 }}>
      <div className="field"><label htmlFor="cp-cur">Current password</label><input id="cp-cur" name="currentPassword" type="password" autoComplete="current-password" required aria-describedby="currentPassword-err" /><Err s={s} k="currentPassword" /></div>
      <div className="field"><label htmlFor="cp-new">New password</label><input id="cp-new" name="newPassword" type="password" autoComplete="new-password" minLength={12} required aria-describedby="newPassword-err" /><Err s={s} k="newPassword" /></div>
      <div className="field"><label htmlFor="cp-new2">New password again</label><input id="cp-new2" name="newPassword2" type="password" autoComplete="new-password" required aria-describedby="newPassword2-err" /><Err s={s} k="newPassword2" /></div>
      <p className="help">At least 12 characters. Changing it signs you out on every other device.</p>
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Change password"}</button>
      {s?.error ? <p className="notice bad" role="alert">{s.error}</p> : s?.message ? <p className="notice ok" role="status">{s.message}</p> : null}
    </form>
  );
}

export function PartnerSignupForm({ action, approvalRequired }: { action: Action; approvalRequired: boolean }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  return (
    <form {...formProps} noValidate>
      <div className="form-row">
        <label htmlFor="su-co">Firm name<input id="su-co" name="companyName" autoComplete="organization" required /><Err s={s} k="companyName" /></label>
        <label htmlFor="su-type">Kind of firm
          <select id="su-type" name="companyType" defaultValue="">
            <option value="" disabled>Choose one</option>
            <option value="cpa">CPA or accounting firm</option>
            <option value="payroll">Payroll company</option>
            <option value="cfo">Fractional CFO firm</option>
            <option value="other">Something else</option>
          </select><Err s={s} k="companyType" /></label>
      </div>
      <div className="form-row">
        <label htmlFor="su-name">Your name<input id="su-name" name="name" autoComplete="name" required /><Err s={s} k="name" /></label>
        <label htmlFor="su-email">Work email<input id="su-email" name="email" type="email" autoComplete="email" required /><Err s={s} k="email" /></label>
      </div>
      <div className="form-row">
        <label htmlFor="su-pw">Password<input id="su-pw" name="password" type="password" autoComplete="new-password" minLength={12} required /><Err s={s} k="password" /></label>
        <label htmlFor="su-pw2">Password again<input id="su-pw2" name="password2" type="password" autoComplete="new-password" required /><Err s={s} k="password2" /></label>
      </div>
      <p className="hero-note" style={{ marginTop: -6 }}>At least 12 characters. A short sentence works well.</p>
      <div className="form-row">
        <label htmlFor="su-phone">Phone (optional)<input id="su-phone" name="phone" type="tel" autoComplete="tel" /></label>
        <label htmlFor="su-web">Website (optional)<input id="su-web" name="website" type="url" placeholder="https://" /><Err s={s} k="website" /></label>
      </div>
      <fieldset style={{ border: 0, padding: 0, margin: 0, background: "none" }}>
        <legend style={{ padding: 0, fontSize: ".84rem", fontWeight: 500, color: "var(--ink-2)" }}>States you file in</legend>
        <div className="checks-row" style={{ marginTop: 6 }}>
          {[["NY", "New York"], ["NJ", "New Jersey"], ["FL", "Florida"]].map(([v, l]) => <label key={v}><input type="checkbox" name="states" value={v} />{l}</label>)}
        </div>
      </fieldset>
      <label htmlFor="su-vol">Filings per month
        <select id="su-vol" name="expectedVolume" defaultValue="Under 10">
          <option>Under 10</option><option>10 to 50</option><option>50 to 200</option><option>Over 200</option>
        </select></label>
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? "Creating…" : "Create account"}</button>
      <p className="hero-note">{approvalRequired ? "You'll confirm your email, then we review new accounts before they open and email you when yours is ready." : "Your account opens as soon as you confirm your email."} Already have one? <Link href="/login">Log in</Link>.</p>
      <Msg s={s} />
    </form>
  );
}

export function InquiryForm({ action }: { action: Action }) {
  const { state: s, pending, formProps } = useKeptForm(action, null, { clearOnSuccess: true });
  if (s?.ok) return <form><p className="form-msg good" role="status">{s.message}</p></form>;
  return (
    <form {...formProps} noValidate>
      <div className="form-row">
        <label htmlFor="bf-name">Name<input id="bf-name" name="name" autoComplete="name" required /><Err s={s} k="name" /></label>
        <label htmlFor="bf-company">Company<input id="bf-company" name="company" autoComplete="organization" required /><Err s={s} k="company" /></label>
      </div>
      <div className="form-row">
        <label htmlFor="bf-email">Work email<input id="bf-email" name="email" type="email" autoComplete="email" required /><Err s={s} k="email" /></label>
        <label htmlFor="bf-phone">Phone (optional)<input id="bf-phone" name="phone" type="tel" autoComplete="tel" /></label>
      </div>
      <div className="form-row">
        <label htmlFor="bf-states">States you file in<select id="bf-states" name="states"><option>New York</option><option>New Jersey</option><option>Florida</option><option>Several of these</option><option>Other states too</option></select></label>
        <label htmlFor="bf-volume">Filings per month<select id="bf-volume" name="volume"><option>Under 50</option><option>50 to 250</option><option>250 to 1,000</option><option>Over 1,000</option></select></label>
      </div>
      <label htmlFor="bf-msg">What you&apos;d like to do (optional)<textarea id="bf-msg" name="message" maxLength={2000} /></label>
      <div className="hp" aria-hidden="true"><label htmlFor="bf-website">Leave this empty<input id="bf-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? "Sending…" : "Send"}</button>
      <Msg s={s} />
    </form>
  );
}

export function ConfirmEmailForm({ action, token }: { action: Action; token: string }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  if (s?.ok) return <Msg s={s} />;
  return (
    <form {...formProps}>
      <input type="hidden" name="token" value={token} />
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? "Confirming…" : "Confirm my email"}</button>
      <Msg s={s} />
    </form>
  );
}

export function ResendConfirmationForm({ action }: { action: Action }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  if (s?.ok) return <Msg s={s} />;
  return (
    <form {...formProps} noValidate>
      <label htmlFor="rc-email">Email<input id="rc-email" name="email" type="email" autoComplete="email" required aria-describedby="email-err" /><Err s={s} k="email" /></label>
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? "Sending…" : "Send a new link"}</button>
      <Msg s={s} />
    </form>
  );
}
