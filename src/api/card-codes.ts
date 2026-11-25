import type { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import type { FilingRecord, Store } from "../store/types.js";
import type { Auth } from "../users/routes.js";
import type { FilingService } from "../orchestrator/service.js";
import type { PaymentSettings } from "../settings/payments.js";
import type { CardOwner } from "../payments/card-codes.js";

/**
 * V18: the card's owner gives a stored card's security code when filings are ready to pay. The code
 * is typed into Basis Theory's own field in the browser; only the id of that short-lived token comes
 * here. A partner session reaches only its own firm's cards (partner-guard.ts).
 */
const CodeBody = z.object({
  tokenId: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, "a Basis Theory token id"),
  expiresAt: z.string().datetime().optional(),
});

const title = (f: FilingRecord) => {
  const r = f.request;
  const name = r.formation ? `${r.formation.name.baseName} ${r.formation.name.designator}` : r.payroll?.legalName ?? r.standing?.entityName ?? "";
  return `${r.state} ${r.type.replace(/_/g, " ")}${name ? `: ${name}` : ""}`;
};

/** Waiting filings grouped by the card they wait for. */
function groups(filings: FilingRecord[], firmNames: Map<string, string>) {
  const by = new Map<string, { methodId: string; card: string; last4?: string; owner: { clientCompanyId?: string; name?: string }; codePath: string; filings: { id: string; title: string; since: string }[] }>();
  for (const f of filings) {
    const w = f.awaitingCardCode!;
    const k = `${w.owner.clientCompanyId ?? "-"}:${w.methodId}`;
    const g = by.get(k) ?? {
      methodId: w.methodId, card: w.label, last4: w.last4,
      owner: w.owner.clientCompanyId ? { clientCompanyId: w.owner.clientCompanyId, name: firmNames.get(w.owner.clientCompanyId) } : {},
      codePath: w.owner.clientCompanyId
        ? `/v1/client-companies/${encodeURIComponent(w.owner.clientCompanyId)}/payment-methods/${encodeURIComponent(w.methodId)}/code`
        : `/v1/account/payment-methods/${encodeURIComponent(w.methodId)}/code`,
      filings: [],
    };
    g.filings.push({ id: f.id, title: title(f), since: w.since });
    by.set(k, g);
  }
  return [...by.values()];
}

export function registerCardCodes(app: FastifyInstance, deps: { store: Store; service: FilingService; authOf: (req: FastifyRequest) => Promise<Auth | null> }): void {
  const firmNames = async (filings: FilingRecord[]) => {
    const ids = [...new Set(filings.map((f) => f.awaitingCardCode?.owner.clientCompanyId).filter((x): x is string => !!x))];
    const names = new Map<string, string>();
    for (const id of ids) { const c = await deps.store.getClientCompany(id); if (c) names.set(id, c.portal?.displayName ?? c.name); }
    return names;
  };
  const save = async (owner: CardOwner, payments: PaymentSettings | undefined, methodId: string, body: unknown, by: string) => {
    const card = payments?.methods.find((m) => m.id === methodId && m.purpose === "state_fees");
    if (!card) return { status: 404 as const, body: { error: "not found" } };
    if (card.provider !== "basis_theory") return { status: 409 as const, body: { error: "only a card saved in the card vault takes a security code here" } };
    const parsed = CodeBody.safeParse(body);
    if (!parsed.success) return { status: 422 as const, body: { error: "validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) } };
    const r = await deps.service.supplyCardCode(owner, methodId, parsed.data.tokenId, parsed.data.expiresAt, by);
    return { status: 200 as const, body: r };
  };
  const who = (a: Auth) => a.user ? `${a.user.name} <${a.user.email}>` : "api key";

  // The subscriber: every filing in the tenant waiting for a code, its own cards and its firms'.
  app.get("/v1/account/card-codes", async (req, reply) => {
    const a = await deps.authOf(req);
    if (!a || a.partnerOf) return reply.code(401).send({ error: "unauthorized" });
    const waiting = await deps.service.filingsAwaitingCardCode({ tenantId: a.tenantId }, undefined, { anyOwner: true });
    return { waiting: groups(waiting, await firmNames(waiting)) };
  });
  app.post("/v1/account/payment-methods/:methodId/code", async (req, reply) => {
    const a = await deps.authOf(req);
    if (!a || a.partnerOf) return reply.code(401).send({ error: "unauthorized" });
    const t = await deps.store.getTenant(a.tenantId);
    const r = await save({ tenantId: a.tenantId }, t?.payments, (req.params as { methodId: string }).methodId, req.body, who(a));
    return reply.code(r.status).send(r.body);
  });

  // A firm's own cards (G1 "own_account").
  const firmOf = async (req: FastifyRequest) => {
    const a = await deps.authOf(req);
    if (!a) return null;
    const id = (req.params as { id: string }).id;
    if (a.partnerOf && a.partnerOf !== id) return null;
    const c = await deps.store.getClientCompany(id);
    return c && c.tenantId === a.tenantId ? { a, c } : null;
  };
  app.get("/v1/client-companies/:id/card-codes", async (req, reply) => {
    const o = await firmOf(req);
    if (!o) return reply.code(404).send({ error: "not found" });
    const waiting = await deps.service.filingsAwaitingCardCode({ tenantId: o.c.tenantId, clientCompanyId: o.c.clientCompanyId });
    return { waiting: groups(waiting, await firmNames(waiting)) };
  });
  app.post("/v1/client-companies/:id/payment-methods/:methodId/code", async (req, reply) => {
    const o = await firmOf(req);
    if (!o) return reply.code(404).send({ error: "not found" });
    const r = await save({ tenantId: o.c.tenantId, clientCompanyId: o.c.clientCompanyId }, o.c.payments, (req.params as { methodId: string }).methodId, req.body, who(o.a));
    return reply.code(r.status).send(r.body);
  });
}
