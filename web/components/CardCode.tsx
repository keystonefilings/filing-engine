"use client";

import { useEffect, useRef, useState } from "react";

export type CardCodeResult = { ok: boolean; error?: string; queued?: number };

/**
 * V18: a saved card's security code, typed into Basis Theory's own field. It can't be stored, so it
 * goes into a token that Basis Theory deletes within the hour; only that token's id reaches us, and
 * every filing waiting for this card pays with it during that hour.
 */
export function CardCode({ publicKey, card, save }: { publicKey: string; card: string; save: (tokenId: string, expiresAt: string) => Promise<CardCodeResult> }) {
  const ref = useRef<HTMLDivElement>(null);
  const els = useRef<{ bt: any; cvc: any } | null>(null);
  const [complete, setComplete] = useState(false);
  const [state, setState] = useState<{ pending?: boolean; error?: string; done?: string }>({});

  useEffect(() => {
    let live = true;
    void (async () => {
      const { default: BasisTheory } = await import("@basis-theory/web-elements");
      if (!live || !ref.current) return;
      const bt = BasisTheory(publicKey);
      const cvc = bt.createElement("cvv", { placeholder: "123" });
      await cvc.mount(ref.current);
      cvc.on("change", (e: any) => setComplete(!!e.detail?.complete || !!e.detail?.isValid));
      els.current = { bt, cvc };
    })().catch(() => setState({ error: "The field couldn't load. Reload the page and try again." }));
    return () => { live = false; };
  }, [publicKey]);

  const send = async () => {
    const e = els.current;
    if (!e || !complete) { setState({ error: "Type the 3 or 4 digit code from the card." }); return; }
    setState({ pending: true });
    try {
      const expiresAt = new Date(Date.now() + 60 * 60_000).toISOString();
      const token = await e.bt.tokens.create({ type: "token", data: { cvc: e.cvc }, expires_at: expiresAt });
      const r = await save(token.id, expiresAt);
      if (!r.ok) { setState({ error: r.error ?? "The code wasn't sent." }); return; }
      setState({ done: r.queued ? `Thanks. ${r.queued === 1 ? "The filing is" : `${r.queued} filings are`} being filed now.` : "Thanks. Filings for this card pay with it for the next hour." });
      e.cvc.clear?.();
    } catch {
      setState({ error: "The code wasn't accepted. Try again." });
    }
  };

  return (
    <div className="stack" style={{ maxWidth: 360 }}>
      <div className="field"><span className="label">Security code for {card}</span><div ref={ref} className="bt-field" /></div>
      <button type="button" className="btn primary" onClick={send} disabled={state.pending}>{state.pending ? "Sending…" : "Pay and file"}</button>
      {state.error ? <p className="notice bad" role="alert">{state.error}</p> : state.done ? <p className="notice ok" role="status">{state.done}</p> : null}
    </div>
  );
}
