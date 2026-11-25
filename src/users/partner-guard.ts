import type { FastifyReply, FastifyRequest } from "fastify";
import type { ArtifactStore } from "../artifacts/store.js";
import type { Store } from "../store/types.js";
import type { Auth } from "./routes.js";

/**
 * A partner firm's staff sign in to the partner dashboard with a session key limited to their firm.
 * The engine's routes were written for subscribers' keys, which see the whole tenant, so this hook
 * runs before every route and lets a partner session through only where it names its own firm:
 * its filings, their artifacts, its signatures and its own profile. Everything else is refused.
 * Routes that need no key (approval pages, sign-in, sign-up) are not affected.
 */
type Rule = (ctx: { req: FastifyRequest; firm: string; deps: GuardDeps }) => Promise<boolean>;

interface GuardDeps {
  store: Store;
  artifacts: ArtifactStore;
  authOf: (req: FastifyRequest) => Promise<Auth | null>;
}

const params = (req: FastifyRequest) => (req.params ?? {}) as Record<string, string>;
const query = (req: FastifyRequest) => (req.query ?? {}) as Record<string, string>;
const body = (req: FastifyRequest) => (req.body ?? {}) as Record<string, unknown>;

const ownFiling: Rule = async ({ req, firm, deps }) => (await deps.store.getFiling(params(req).id ?? ""))?.clientCompanyId === firm;
/** List routes: the firm filter is forced to the partner's own firm. */
const forceQueryFirm: Rule = async ({ req, firm }) => {
  const q = query(req);
  if (q.clientCompanyId && q.clientCompanyId !== firm) return false;
  (req as { query: unknown }).query = { ...q, clientCompanyId: firm };
  return true;
};
const bodyFirm: Rule = async ({ req, firm }) => body(req).clientCompanyId === firm;
const ownCompany: Rule = async ({ req, firm }) => params(req).id === firm;

const RULES: Record<string, Rule> = {
  "GET /v1/me": async () => true,
  "POST /v1/auth/sign-out-everywhere": async () => true,
  "POST /v1/auth/change-password": async () => true,
  "POST /v1/auth/sign-out": async () => true,
  "GET /v1/portals": async () => true,
  "GET /v1/events": async () => true,
  "POST /v1/filings": bodyFirm,
  "GET /v1/filings": forceQueryFirm,
  "GET /v1/filings/:id": ownFiling,
  "POST /v1/filings/:id/information": ownFiling,
  "POST /v1/filings/:id/cancel": ownFiling,
  "GET /v1/filings/:id/messages": ownFiling,
  "GET /v1/artifacts/:id": async ({ req, firm, deps }) => {
    const a = await deps.artifacts.get(params(req).id ?? "");
    if (!a) return false;
    return (await deps.store.getFiling(a.meta.filingId))?.clientCompanyId === firm;
  },
  "GET /v1/client-companies/:id": ownCompany,
  "PUT /v1/client-companies/:id/profile": ownCompany,
  "PUT /v1/client-companies/:id/logo": ownCompany,
  "DELETE /v1/client-companies/:id/logo": ownCompany,
  "PUT /v1/client-companies/:id/font": ownCompany,
  "POST /v1/client-companies/:id/payment-methods": ownCompany,
  "DELETE /v1/client-companies/:id/payment-methods/:methodId": ownCompany,
  "POST /v1/client-companies/:id/intake-links": ownCompany,
  "GET /v1/client-companies/:id/intake-links": ownCompany,
  "GET /v1/client-companies/:id/intake-links/:linkId": ownCompany,
  "POST /v1/client-companies/:id/intake-links/:linkId/revoke": ownCompany,
  "POST /v1/client-companies/:id/intake-links/:linkId/used": ownCompany,
  "GET /v1/signatures": forceQueryFirm,
  "POST /v1/signatures": bodyFirm,
  "DELETE /v1/signatures/:id": async ({ req, firm, deps }) => (await deps.store.getSignature(params(req).id ?? ""))?.clientCompanyId === firm,
};

/** Routes anyone may call without a key; a partner session presented there changes nothing. */
const PUBLIC = /^(GET|POST) (\/healthz|\/approve\/|\/admin\/|\/v1\/auth\/sign-in|\/v1\/auth\/password-reset|\/v1\/auth\/verify-email|\/v1\/signups\/|\/v1\/inquiries$|\/v1\/brand-logos\/|\/v1\/brand-fonts\/|\/v1\/schema\/|\/v1\/public\/)/;

export function partnerGuard(deps: GuardDeps) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const key = String(req.headers["x-api-key"] ?? "");
    if (!key.startsWith("kfs_")) return;
    const route = `${req.method} ${req.routeOptions.url ?? ""}`;
    if (PUBLIC.test(route) && !RULES[route]) return;
    const auth = await deps.authOf(req);
    if (!auth?.partnerOf) return; // enterprise sessions and invalid keys are handled by the route itself
    const rule = RULES[route];
    if (!rule) return reply.code(403).send({ error: "not available to partner accounts" });
    if (!(await rule({ req, firm: auth.partnerOf, deps }))) return reply.code(404).send({ error: "not found" });
  };
}
