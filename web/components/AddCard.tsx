"use client";

import { useEffect, useRef, useState } from "react";

export type AddCardResult = { ok: boolean; error?: string };

/**
 * V18: a card typed into Basis Theory's own fields (secure frames: the number never reaches our
 * pages or servers). We keep the token, the brand and the last four digits. The security code isn't
 * asked here: it can't be stored, so the card's owner gives it when filings are ready to pay (CardCode).
 */
export function AddCard({ publicKey, save, purpose = "state_fees" }: { publicKey: string; save: (card: { tokenId: string; label: string; brand?: string; last4?: string; purpose: string }) => Promise<AddCardResult>; purpose?: "state_fees" | "subscription" }) {
  const numberRef = useRef<HTMLDivElement>(null), expiryRef = useRef<HTMLDivElement>(null);
  const els = useRef<{ bt: any; number: any; expiry: any } | null>(null);
  const [info, setInfo] = useState<{ brand?: string; last4?: string; valid: boolean }>({ valid: false });
  const [label, setLabel] = useState("");
  const [state, setState] = useState<{ pending?: boolean; error?: string; done?: string }>({});

  useEffect(() => {
    let live = true;
    void (async () => {
      const { default: BasisTheory } = await import("@basis-theory/web-elements");
      if (!live || !numberRef.current || !expiryRef.current) return;
      const bt = BasisTheory(publicKey);
      const number = bt.createElement("cardNumber", { placeholder: "Card number" });
      const expiry = bt.createElement("expiry", { placeholder: "MM/YY" });
      await Promise.all([number.mount(numberRef.current), expiry.mount(expiryRef.current)]);
      number.on("change", (e: any) => setInfo({ brand: e.detail?.cardBrand, last4: e.detail?.last4 ?? undefined, valid: !!e.detail?.isValid }));
      els.current = { bt, number, expiry };
    })().catch(() => setState({ error: "The card fields couldn't load. Reload the page and try again." }));
    return () => { live = false; };
  }, [publicKey]);

  const add = async () => {
    const e = els.current;
    if (!e || !info.valid) { setState({ error: "Check the card number." }); return; }
    setState({ pending: true });
    try {
      const token = await e.bt.tokens.create({ type: "card", data: { number: e.number, expiration_month: e.expiry, expiration_year: e.expiry } });
      const r = await save({ tokenId: token.id, label: label.trim() || `${info.brand ?? "Card"} ending ${info.last4 ?? ""}`.trim(), brand: info.brand, last4: info.last4, purpose });
      if (!r.ok) { setState({ error: r.error ?? "The card wasn't saved." }); return; }
      setState({ done: `Saved ${info.brand ?? "card"} ending ${info.last4 ?? ""}.` });
      e.number.clear?.(); e.expiry.clear?.(); setLabel("");
    } catch {
      setState({ error: "The card wasn't accepted. Check it and try again." });
    }
  };

  return (
    <div className="card stack" style={{ maxWidth: 460 }}>
      <strong>Add a card</strong>
      <div className="field"><span className="label">Card number</span><div ref={numberRef} className="bt-field" /></div>
      <div className="field-row n2">
        <div className="field"><span className="label">Expires</span><div ref={expiryRef} className="bt-field" /></div>
        <div className="field"><label htmlFor="card-label">Name for this card (optional)</label><input id="card-label" value={label} onChange={(ev) => setLabel(ev.target.value)} maxLength={60} placeholder="e.g. Company Amex" /></div>
      </div>
      <button type="button" className="btn primary" onClick={add} disabled={state.pending}>{state.pending ? "Saving…" : "Save card"}</button>
      {state.error ? <p className="notice bad" role="alert">{state.error}</p> : state.done ? <p className="notice ok" role="status">{state.done}</p> : null}
      <p className="help">The card is held by Basis Theory, a card vault, never by us. We never keep the security code: when filings are ready to pay, we ask you for it and use it for an hour at most.</p>
    </div>
  );
}
