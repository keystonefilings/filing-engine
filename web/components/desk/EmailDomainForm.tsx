"use client";

import { useActionState, useState, useTransition } from "react";
import type { DomainState, EmailDomainView } from "@/lib/email-domain";
import { Chip } from "@/components/ui/Chip";
import { Notice } from "@/components/ui/Sheet";

/*
 * Every word on this page is [copy needed] in the spec (10B.5.1, 10B.30). These are stand-ins, listed in COPY-NEEDED.md.
 */
const T = {
  inbox: "How your clients see your emails",
  label: "Your domain",
  connect: "Connect domain",
  again: "Check again",
  records: "Add these records where your domain's DNS is managed",
  heads: ["Type", "Name", "Value", "State"],
  found: "Found", missing: "Not found yet",
  copy: "Copy", copied: "Copied",
  connected: (a: string) => `Connected. Your clients' emails now come from ${a}.`,
  waiting: "Your clients' emails keep coming from the CoFile address under your firm's name until the records are found.",
  failedRecords: "The records stopped resolving. Your clients' emails come from the CoFile address again until they're found.",
  disconnect: "Disconnect", confirm: "Your clients' emails will come from the CoFile address again. Disconnect?",
  invalid: "Enter a domain like yourfirm.com.", unusable: "That domain can't be used for sending.",
  unavailable: "Connecting a domain isn't available yet.", failed: "That didn't work. Try again in a minute.",
  records2: "The records",
};

function CopyField({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  return (
    <span className="edom2-plate">
      <code>{value}</code>
      <button type="button" className="btn small" onClick={() => { void navigator.clipboard?.writeText(value); setDone(true); setTimeout(() => setDone(false), 1600); }}>{done ? T.copied : T.copy}</button>
    </span>
  );
}

/** The email-domain step's live part: the inbox row, the domain, the records to add, and checking them (10B.5.1). */
export function EmailDomainForm({ initial, firmName, platformAddress, connect, check, disconnect }: {
  initial: EmailDomainView; firmName: string; platformAddress: string;
  connect: (prev: DomainState, fd: FormData) => Promise<DomainState>;
  check: () => Promise<DomainState>;
  disconnect: () => Promise<DomainState>;
}) {
  const [state, formAction, saving] = useActionState<DomainState, FormData>(connect, initial);
  const [view, setView] = useState<DomainState>(null);
  const [busy, start] = useTransition();
  const v = view ?? state ?? initial;
  const d = v.emailDomain;
  const verified = d?.status === "verified";
  const address = verified && d ? `filings@${d.domain}` : platformAddress;
  const problem = (view ?? state)?.problem as "invalid" | "unusable" | "unavailable" | "failed" | undefined;
  const records = (
    <div className="edom2-records">
      <h2>{T.records}</h2>
      <div className="edom2-table" role="table" aria-label={T.records2}>
        <div className="edom2-row is-head" role="row">{T.heads.map((h) => <span key={h} role="columnheader">{h}</span>)}</div>
        {v.records.map((r, i) => (
          <div className="edom2-row" role="row" key={i}>
            <span role="cell" className="edom2-type">{r.type}{r.priority !== undefined ? ` ${r.priority}` : ""}</span>
            <span role="cell"><CopyField value={r.name} /></span>
            <span role="cell"><CopyField value={r.value} /></span>
            <span role="cell">{r.status === "found" ? <Chip tone="done" compact>{T.found}</Chip> : <Chip tone="inhand" compact>{T.missing}</Chip>}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="edom2">
      <div className="edom2-inbox" role="img" aria-label={`${T.inbox}: ${firmName}, ${address}`}>
        <span className="edom2-dot" aria-hidden="true">{firmName.slice(0, 1)}</span>
        <span><strong>{firmName}</strong><code>{address}</code></span>
      </div>
      {problem ? <Notice tone="problem" role="alert">{T[problem]}</Notice> : null}
      {verified ? <Notice tone="done" role="status">{T.connected(address)}</Notice> : d?.status === "failed" ? <Notice tone="problem">{T.failedRecords}</Notice> : d ? <Notice tone="attention">{T.waiting}</Notice> : null}
      <form action={formAction} className="edom2-form">
        <label htmlFor="edom-domain">{T.label}</label>
        <div className="edom2-field">
          <input id="edom-domain" name="domain" type="text" inputMode="url" autoCapitalize="off" spellCheck={false} defaultValue={d?.domain ?? ""} placeholder="yourfirm.com" aria-invalid={problem === "invalid" || problem === "unusable" || undefined} />
          {d && !verified
            ? <button type="button" className="btn primary is-main" disabled={busy} onClick={() => start(async () => setView(await check()))}>{busy ? "…" : T.again}</button>
            : !d ? <button type="submit" className="btn primary is-main" disabled={saving}>{saving ? "…" : T.connect}</button> : null}
        </div>
        {d && !verified ? <p className="edom2-change"><button type="submit" className="linkish" disabled={saving}>{T.connect}</button></p> : null}
      </form>
      {v.records.length ? (verified ? <details className="edom2-fold"><summary>{T.records}</summary>{records}</details> : records) : null}
      {d ? (
        <p className="edom2-off">
          <button type="button" className="btn small danger" disabled={busy} onClick={() => { if (window.confirm(T.confirm)) start(async () => setView(await disconnect())); }}>{T.disconnect}</button>
        </p>
      ) : null}
    </div>
  );
}
