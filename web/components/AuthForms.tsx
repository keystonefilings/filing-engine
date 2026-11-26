"use client";

import { useKeptForm } from "./useKeptForm";
import Link from "next/link";
import { useEffect, useRef, type InputHTMLAttributes, type ReactNode } from "react";
import type { FormState } from "@/lib/accounts";
import { Glyph } from "@/components/ui/glyphs";
import "@/styles/components/field.css";
import "@/styles/components/button.css";
import "@/styles/components/account.css";

type Action = (prev: FormState, fd: FormData) => Promise<FormState>;

/**
 * The account forms and the platforms inquiry, in CoFile's look (merged spec 10A.0.6, 10A.8–10A.14, 10A.7.2). The
 * fields, their names, the actions and every word are the product's; only the visuals changed: labels above, the
 * error under its field led by the Problem bar, and the form's message as a notice slip directly above its button.
 */

export type SlipTone = "plain" | "done" | "attention" | "problem";

/** The notice slip (10A.0.6): a Sheet strip, a 4 px left rule in the tone, the tone's glyph before the words. */
export function Slip({ tone, children, role, focusable, slipRef }: {
  tone: SlipTone; children: ReactNode; role?: "status" | "alert"; focusable?: boolean; slipRef?: React.Ref<HTMLDivElement>;
}) {
  const glyph = tone === "plain" ? null : tone;
  return (
    <div ref={slipRef} className={`slip2 is-${tone}`} role={role} tabIndex={focusable ? -1 : undefined}>
      {glyph ? <Glyph kind={glyph} /> : null}
      <div className="slip2-text">{children}</div>
    </div>
  );
}

/** Messages that ask the person to wait or do something first, not problems (10A.0.6, 10A.11). */
const ATTENTION = [/^Confirm your email first/, /^Your account is waiting for approval/];
const errorTone = (e: string): SlipTone => (ATTENTION.some((r) => r.test(e)) ? "attention" : "problem");

/** The form's message, above its button; a problem takes focus when it arrives. */
function Msg({ s, okTone = "done" }: { s: FormState; okTone?: SlipTone }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (s?.error) ref.current?.focus(); }, [s]);
  const link = s?.link ? <> <Link href={s.link.href}>{s.link.label}</Link></> : null;
  if (s?.error) return <Slip tone={errorTone(s.error)} role="alert" focusable slipRef={ref}>{s.error}{link}</Slip>;
  if (s?.message) return <Slip tone={okTone} role="status">{s.message}{link}</Slip>;
  return <p className="slip2-empty" role="status" />;
}

/** A field: label above, the input, help under it, then its error (10A.0.6). */
function Field({ id, label, optional, error, errId, help, helpId, select, area, children, ...input }: {
  id: string; label: string; optional?: boolean; error?: string; errId?: string; help?: string; helpId?: string;
  select?: boolean; area?: boolean; children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement> & { maxLength?: number }) {
  const describedBy = [input["aria-describedby"], help && helpId, error && errId].filter(Boolean).join(" ") || undefined;
  const common = { id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy } as const;
  return (
    <div className="field2">
      <label className="field2-label" htmlFor={id}>{label}{optional ? <span className="opt"> (optional)</span> : null}</label>
      {select
        ? <select {...common} className="select2" name={input.name} defaultValue={input.defaultValue as string | undefined}>{children}</select>
        : area
          ? <textarea {...common} className="textarea2" name={input.name} maxLength={input.maxLength} />
          : <input {...input} {...common} className="input2" />}
      {help ? <p className="field2-help" id={helpId}>{help}</p> : null}
      {error ? <p className="field2-error" id={errId}>{error}</p> : null}
    </div>
  );
}

const issue = (s: FormState, k: string) => s?.issues?.[k];

/** The form's Brass button, holding its pressed look and the component's own word while it sends. */
function Submit({ pending, label, pendingLabel, block = true }: { pending: boolean; label: string; pendingLabel: string; block?: boolean }) {
  return (
    <button className={["btn2 is-action acct2-submit", block && "is-block"].filter(Boolean).join(" ")} type="submit" disabled={pending} aria-busy={pending || undefined}>
      {pending ? pendingLabel : label}
    </button>
  );
}

export function EmailLoginForm({ action, notice, noticeTone = "plain" }: { action: Action; notice?: string; noticeTone?: SlipTone }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  return (
    <form {...formProps} className="acct2-form">
      {notice && !s ? <Slip tone={noticeTone} role="status">{notice}</Slip> : null}
      <Field id="li-email" label="Email" name="email" type="email" autoComplete="email" required />
      <div className="acct2-pw">
        <Field id="li-pw" label="Password" name="password" type="password" autoComplete="current-password" required />
        <p className="acct2-forgot"><Link href="/forgot-password">Forgot your password?</Link></p>
      </div>
      <div className="acct2-act">
        <Msg s={s} />
        <Submit pending={pending} label="Log in" pendingLabel="Signing in…" />
      </div>
    </form>
  );
}

export function ForgotPasswordForm({ action }: { action: Action }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  if (s?.ok) return <Slip tone="plain" role="status">{s.message}</Slip>;
  return (
    <form {...formProps} noValidate className="acct2-form">
      <Field id="fp-email" label="Email" name="email" type="email" autoComplete="email" required error={issue(s, "email")} errId="email-err" />
      <div className="acct2-act">
        <Msg s={s} />
        <Submit pending={pending} label="Email me a reset link" pendingLabel="Sending…" />
      </div>
    </form>
  );
}

export function ResetPasswordForm({ action, token }: { action: Action; token: string }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  return (
    <form {...formProps} noValidate className="acct2-form">
      <input type="hidden" name="token" value={token} />
      <Field id="rp-pw" label="New password" name="password" type="password" autoComplete="new-password" minLength={12} required
        help="At least 12 characters. A few unrelated words work well." helpId="rp-help" error={issue(s, "password")} errId="password-err" />
      <Field id="rp-pw2" label="New password again" name="password2" type="password" autoComplete="new-password" required error={issue(s, "password2")} errId="password2-err" />
      <div className="acct2-act">
        <Msg s={s} />
        <Submit pending={pending} label="Set new password" pendingLabel="Saving…" />
        {s?.error?.includes("expired") ? <p className="acct2-after"><Link href="/forgot-password">Ask for a new link</Link></p> : null}
      </div>
    </form>
  );
}

export function ChangePasswordForm({ action }: { action: Action }) {
  const { state: s, pending, formProps } = useKeptForm(action, null, { clearOnSuccess: true });
  const err = (k: string) => { const m = s?.issues?.[k]; return m ? <span className="err" id={`${k}-err`}>{m}</span> : null; };
  return (
    <form {...formProps} noValidate className="card" style={{ maxWidth: 460 }}>
      <div className="field"><label htmlFor="cp-cur">Current password</label><input id="cp-cur" name="currentPassword" type="password" autoComplete="current-password" required aria-describedby="currentPassword-err" />{err("currentPassword")}</div>
      <div className="field"><label htmlFor="cp-new">New password</label><input id="cp-new" name="newPassword" type="password" autoComplete="new-password" minLength={12} required aria-describedby="newPassword-err" />{err("newPassword")}</div>
      <div className="field"><label htmlFor="cp-new2">New password again</label><input id="cp-new2" name="newPassword2" type="password" autoComplete="new-password" required aria-describedby="newPassword2-err" />{err("newPassword2")}</div>
      <p className="help">At least 12 characters. Changing it signs you out on every other device.</p>
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Change password"}</button>
      {s?.error ? <p className="notice bad" role="alert">{s.error}</p> : s?.message ? <p className="notice ok" role="status">{s.message}</p> : null}
    </form>
  );
}

export function PartnerSignupForm({ action, approvalRequired }: { action: Action; approvalRequired: boolean }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  return (
    <form {...formProps} noValidate className="acct2-form is-signup">
      <div className="acct2-group">
        <Field id="su-co" label="Firm name" name="companyName" autoComplete="organization" required error={issue(s, "companyName")} errId="companyName-err" />
        <Field id="su-type" label="Kind of firm" name="companyType" defaultValue="" select error={issue(s, "companyType")} errId="companyType-err">
          <option value="" disabled>Choose one</option>
          <option value="cpa">CPA or accounting firm</option>
          <option value="payroll">Payroll company</option>
          <option value="cfo">Fractional CFO firm</option>
          <option value="title">Title company</option>
          <option value="other">Something else</option>
        </Field>
      </div>
      <div className="acct2-group">
        <Field id="su-name" label="Your name" name="name" autoComplete="name" required error={issue(s, "name")} errId="name-err" />
        <Field id="su-email" label="Work email" name="email" type="email" autoComplete="email" required error={issue(s, "email")} errId="email-err" />
        <div className="acct2-pair-wrap">
          <div className="acct2-pair">
            <Field id="su-pw" label="Password" name="password" type="password" autoComplete="new-password" minLength={12} required aria-describedby="su-pw-help" error={issue(s, "password")} errId="password-err" />
            <Field id="su-pw2" label="Password again" name="password2" type="password" autoComplete="new-password" required aria-describedby="su-pw-help" error={issue(s, "password2")} errId="password2-err" />
          </div>
          <p className="field2-help" id="su-pw-help">At least 12 characters. A short sentence works well.</p>
        </div>
      </div>
      <div className="acct2-group">
        <div className="acct2-pair">
          <Field id="su-phone" label="Phone" optional name="phone" type="tel" autoComplete="tel" />
          <Field id="su-web" label="Website" optional name="website" type="url" placeholder="https://" error={issue(s, "website")} errId="website-err" />
        </div>
      </div>
      <div className="acct2-group">
        <fieldset className="acct2-states">
          <legend className="field2-label">States you file in</legend>
          <div className="acct2-checks">
            {[["NY", "New York"], ["NJ", "New Jersey"], ["FL", "Florida"]].map(([v, l]) => <label key={v} className="check2"><input type="checkbox" name="states" value={v} /><span>{l}</span></label>)}
          </div>
        </fieldset>
        <div className="acct2-narrow">
          <Field id="su-vol" label="Filings per month" name="expectedVolume" defaultValue="Under 10" select>
            <option>Under 10</option><option>10 to 50</option><option>50 to 200</option><option>Over 200</option>
          </Field>
        </div>
      </div>
      <div className="acct2-group is-last">
        <label className="check2 acct2-terms" htmlFor="su-terms">
          <input id="su-terms" name="terms" type="checkbox" required aria-invalid={issue(s, "terms") ? true : undefined} aria-describedby={issue(s, "terms") ? "terms-err" : undefined} />
          <span>I agree to the <a href="/terms" target="_blank" rel="noopener">Terms of Service</a> and the <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>.</span>
        </label>
        {issue(s, "terms") ? <p className="field2-error" id="terms-err">{issue(s, "terms")}</p> : null}
      </div>
      <div className="acct2-act">
        <Msg s={s} />
        <Submit pending={pending} label="Create account" pendingLabel="Creating…" />
        <p className="acct2-note">{approvalRequired ? "You'll confirm your email. If your account needs a review before it opens, we'll email you when it's ready." : "Your account opens as soon as you confirm your email."} Already have one? <Link href="/login">Log in</Link>.</p>
      </div>
    </form>
  );
}

export function InquiryForm({ action }: { action: Action }) {
  const { state: s, pending, formProps } = useKeptForm(action, null, { clearOnSuccess: true });
  if (s?.ok) return <form className="acct2-form is-sent"><Slip tone="done" role="status">{s.message}</Slip></form>;
  return (
    <form {...formProps} noValidate className="acct2-form is-inquiry">
      <div className="acct2-pair is-wide">
        <Field id="bf-name" label="Name" name="name" autoComplete="name" required error={issue(s, "name")} errId="name-err" />
        <Field id="bf-company" label="Company" name="company" autoComplete="organization" required error={issue(s, "company")} errId="company-err" />
      </div>
      <div className="acct2-pair is-wide">
        <Field id="bf-email" label="Work email" name="email" type="email" autoComplete="email" required error={issue(s, "email")} errId="email-err" />
        <Field id="bf-phone" label="Phone" optional name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="acct2-pair is-wide">
        <Field id="bf-states" label="States you file in" name="states" select><option>New York</option><option>New Jersey</option><option>Florida</option><option>Several of these</option><option>Other states too</option></Field>
        <Field id="bf-volume" label="Filings per month" name="volume" select><option>Under 50</option><option>50 to 250</option><option>250 to 1,000</option><option>Over 1,000</option></Field>
      </div>
      <Field id="bf-msg" label="What you'd like to do" optional name="message" area maxLength={2000} />
      <div className="hp acct2-hp" aria-hidden="true"><label htmlFor="bf-website">Leave this field empty (it helps us block spam)<input id="bf-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="acct2-act">
        <Msg s={s} />
        <Submit pending={pending} label="Send" pendingLabel="Sending…" block={false} />
      </div>
    </form>
  );
}

/** The confirmation link's page: the Done slip, and its "Log in" link set beneath it as the page's Brass button. */
export function ConfirmEmailForm({ action, token }: { action: Action; token: string }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  if (s?.ok) {
    return (
      <div className="acct2-done">
        <Slip tone="done" role="status">{s.message}</Slip>
        {s.link ? <Link className="btn2 is-action is-block" href={s.link.href}>{s.link.label}</Link> : null}
      </div>
    );
  }
  return (
    <form {...formProps} className="acct2-form">
      <input type="hidden" name="token" value={token} />
      <div className="acct2-act">
        <Msg s={s} />
        <Submit pending={pending} label="Confirm my email" pendingLabel="Confirming…" />
      </div>
    </form>
  );
}

export function ResendConfirmationForm({ action }: { action: Action }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  if (s?.ok) return <Slip tone="plain" role="status">{s.message}</Slip>;
  return (
    <form {...formProps} noValidate className="acct2-form">
      <Field id="rc-email" label="Email" name="email" type="email" autoComplete="email" required error={issue(s, "email")} errId="email-err" />
      <div className="acct2-act">
        <Msg s={s} />
        <Submit pending={pending} label="Send a new link" pendingLabel="Sending…" />
      </div>
    </form>
  );
}
