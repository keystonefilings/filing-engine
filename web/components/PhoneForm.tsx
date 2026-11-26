"use client";

import { useActionState } from "react";
import type { PhoneState, PhoneStatus } from "@/lib/phone";

/** V42-V43: add a mobile number (confirmed by a texted code) to send filing requests by text or WhatsApp. */
export function PhoneForm({ status, send, confirm, remove }: {
  status: PhoneStatus;
  send: (p: PhoneState, fd: FormData) => Promise<PhoneState>;
  confirm: (p: PhoneState, fd: FormData) => Promise<PhoneState>;
  remove: () => Promise<void>;
}) {
  const [sent, doSend, sending] = useActionState(send, status.pending ? { pending: status.pending } : null);
  const [checked, doConfirm, checking] = useActionState(confirm, null);
  const phone = checked?.done ?? status.phone;
  const pending = !checked?.done && (checked?.pending ?? sent?.pending);
  const n = status.numbers;
  const where = [n?.sms ? `text ${n.sms}` : "", n?.whatsapp ? `send a WhatsApp message to ${n.whatsapp}` : ""].filter(Boolean).join(" or ");
  return (
    <div className="card stack" style={{ maxWidth: 460 }}>
      <strong>Send filing requests by text or WhatsApp</strong>
      {phone ? (
        <>
          <p style={{ margin: 0 }}>Your mobile number is <strong>{phone}</strong>. From it, {where} with the filing you need; we answer with a link to the form filled in from your message.</p>
          <form action={remove}><button className="btn small" type="submit">Remove this number</button></form>
        </>
      ) : pending ? (
        <form action={doConfirm} className="stack">
          <input type="hidden" name="pending" value={pending} />
          <div className="field"><label htmlFor="phone-code">The 6-digit code we texted to {pending}</label><input id="phone-code" name="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} required /></div>
          <button className="btn primary" type="submit" disabled={checking}>{checking ? "Checking…" : "Confirm"}</button>
          {checked?.error ? <p className="notice bad" role="alert">{checked.error}</p> : null}
        </form>
      ) : (
        <form action={doSend} className="stack">
          <div className="field"><label htmlFor="phone">Your mobile number</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="212 555 0100" required /></div>
          <button className="btn" type="submit" disabled={sending}>{sending ? "Sending…" : "Text me a code"}</button>
          {sent?.error ? <p className="notice bad" role="alert">{sent.error}</p> : null}
          <p className="help">We text a code to confirm the number is yours. Messages from it then come to your firm&apos;s account. Message and data rates may apply.</p>
        </form>
      )}
    </div>
  );
}
