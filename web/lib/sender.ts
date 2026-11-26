/**
 * Who sent a filing in (owner, Nov 26: a firm sees which of its clients sent filings). A filing from
 * a client link names the client; one the firm started names the person at the firm who started it.
 */
export interface SentBy {
  /** The client's name, or the client's or staff member's email. */
  who: string;
  /** The client's email, shown under the name when both are known. */
  detail?: string;
  /** True when the client sent it through their link. */
  client: boolean;
}

interface FilingLike {
  request: {
    contact?: { firstName?: string; lastName?: string; email?: string };
    intake?: Record<string, unknown>;
  };
}

export function sentBy(f: FilingLike): SentBy | null {
  const portal = (f.request.intake as { portal?: { source?: string; submittedBy?: string } } | undefined)?.portal;
  if (!portal) return null;
  const by = portal.submittedBy ?? "";
  if (portal.source === "client_link") {
    const c = f.request.contact;
    const name = [c?.firstName, c?.lastName].filter(Boolean).join(" ").trim();
    const email = by.startsWith("client:") ? by.slice("client:".length) : c?.email ?? "";
    if (name) return { who: name, detail: email || undefined, client: true };
    return email ? { who: email, client: true } : null;
  }
  return by && !by.startsWith("client") ? { who: by, client: false } : null;
}
