"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { engine, EngineError, type PartnerProfile, type PaymentRouting } from "@/lib/engine";
import { firmContext } from "@/lib/firm";
import { FILING_KINDS } from "@/lib/intake/forms";
import { applyLogo } from "@/lib/logo-upload";
import { writeSession } from "@/lib/session";
import type { AgentsState } from "@/components/AgentsForm";
import type { RolesState } from "@/components/StateRolesForm";
import { rolesForState, STATE_NAMES } from "@/lib/state-roles";
import type { RoleCandidate, StateRoleSettings } from "@/lib/engine";

export type SetupState = { error?: string; issues?: Record<string, string> } | null;
type Step = "details" | "branding" | "payments";

const text = (fd: FormData, k: string, max = 200) => String(fd.get(k) ?? "").trim().slice(0, max);

async function save(slug: string, step: Step, body: Record<string, unknown>): Promise<SetupState> {
  const { session, company } = await firmContext(slug);
  const done = Array.from(new Set([...(company.partner?.setupDone ?? []), step]));
  try {
    await engine(session.apiKey, `/v1/client-companies/${encodeURIComponent(session.clientCompanyId)}/profile`, {
      method: "PUT", body: { ...body, partner: { ...(body.partner as PartnerProfile | undefined), setupDone: done } },
    });
  } catch (e) {
    if (e instanceof EngineError && (e.status === 422 || e.status === 409)) {
      const issues = Object.fromEntries(((e.body as { issues?: { path: string; message: string }[] })?.issues ?? []).map((i) => [i.path.split(".").pop() ?? i.path, i.message]));
      return { error: "Check the highlighted fields.", issues };
    }
    return { error: "That didn't save. Try again in a minute." };
  }
  // A new address moves the portal too: the session follows it.
  const moved = (body.brand as { slug?: string } | undefined)?.slug;
  if (moved && moved !== slug) await writeSession({ ...session, slug: moved });
  const base = `/p/${encodeURIComponent(moved ?? slug)}`;
  revalidatePath(base, "layout");
  const next: Record<Step, string> = { details: `${base}/setup/branding`, branding: `${base}/setup/payments`, payments: `${base}/setup` };
  redirect(next[step]);
}

export async function saveDetails(slug: string, _prev: SetupState, fd: FormData): Promise<SetupState> {
  const name = text(fd, "name", 120);
  if (name.length < 2) return { error: "Enter your firm's name.", issues: { name: "Enter your firm's name." } };
  let website = text(fd, "website") || undefined;
  if (website && !/^https:\/\//.test(website)) website = `https://${website.replace(/^https?:\/\//, "")}`;
  const type = text(fd, "companyType", 20);
  const known = new Set(FILING_KINDS.map((k) => k.id));
  const services = fd.getAll("services").map(String).filter((id) => known.has(id));
  if (fd.has("servicesShown") && !services.length) return { error: "Pick at least one service.", issues: { services: "Pick at least one service to offer." } };
  const copyEmail = text(fd, "copyEmail").toLowerCase();
  return save(slug, "details", {
    name,
    copyEmail: copyEmail || null,
    ...(fd.has("servicesShown") ? { brand: { filingKinds: services } } : {}),
    partner: {
      ...(["cpa", "payroll", "cfo", "title", "other"].includes(type) ? { companyType: type } : {}),
      contactName: text(fd, "contactName", 120) || undefined,
      contactEmail: text(fd, "contactEmail") || undefined,
      phone: text(fd, "phone", 40) || undefined,
      website,
    },
  });
}

export async function saveBranding(slug: string, _prev: SetupState, fd: FormData): Promise<SetupState> {
  const hex = (k: string) => { const c = text(fd, k, 7); return /^#[0-9a-fA-F]{6}$/.test(c) ? c : undefined; };
  let logoUrl = text(fd, "logoUrl", 500) || undefined;
  if (logoUrl && !/^https:\/\//.test(logoUrl)) return { error: "Check the highlighted fields.", issues: { logoUrl: "A logo link must start with https://" } };
  // The picture goes first, so the brand saved next keeps it.
  const { session, company } = await firmContext(slug);
  const logoProblem = await applyLogo(session.apiKey, session.clientCompanyId, fd, Boolean(logoUrl));
  if (logoProblem) return { error: logoProblem, issues: { data: logoProblem } };
  if (String(fd.get("logoData") ?? "")) logoUrl = undefined;
  // A font file goes first too; the choice saved next ("custom") then points at it.
  const fontData = String(fd.get("fontData") ?? "");
  if (fontData) {
    try {
      await engine(session.apiKey, `/v1/client-companies/${encodeURIComponent(session.clientCompanyId)}/font`, { method: "PUT", body: { data: fontData } });
    } catch (e) {
      const msg = e instanceof EngineError ? ((e.body as { issues?: { message: string }[] })?.issues?.[0]?.message ?? "That font didn't upload.") : "That font didn't upload.";
      return { error: msg, issues: { font: msg } };
    }
  }
  const fontChoice = text(fd, "font", 40) || undefined;
  return save(slug, "branding", {
    brand: {
      slug: text(fd, "slug", 40).toLowerCase() || undefined,
      ...(fontChoice && (fontChoice !== "custom" || fontData || company.portal?.fontArtifactId) ? { font: fontChoice } : {}),
      displayName: text(fd, "displayName", 80) || undefined,
      logoUrl,
      primaryColor: hex("primaryColor"),
      secondaryColor: hex("secondaryColor"),
      supportEmail: text(fd, "supportEmail") || undefined,
    },
  });
}

export async function savePayments(slug: string, _prev: SetupState, fd: FormData): Promise<SetupState> {
  const { company } = await firmContext(slug);
  const ids = new Set((company.payments?.methods ?? []).filter((m) => m.purpose === "state_fees").map((m) => m.id));
  const pick = (k: string) => { const v = text(fd, k, 40); return v && ids.has(v) ? v : undefined; };
  const mode = fd.get("mode") === "per_filing" ? "per_filing" : "single";
  const byFilingKind: Record<string, string> = {};
  if (mode === "per_filing") for (const k of FILING_KINDS) { const v = pick(`kind.${k.id}`); if (v) byFilingKind[k.id] = v; }
  const routing: PaymentRouting = { mode, defaultMethodId: pick("defaultMethodId"), fallbackMethodId: pick("fallbackMethodId"), byFilingKind };
  if (routing.fallbackMethodId && routing.fallbackMethodId === routing.defaultMethodId) return { error: "The backup card has to be a different card." };
  return save(slug, "payments", { paymentRouting: routing });
}

/** V22: saves the firm's registered agent per state (an empty name removes that state's agent). */
const CANDIDATES = new Set<string>(["partner", "saved", "ours", "entity", "member", "client", "other", "service_company", "filing_company", "none"]);

/**
 * Nov 27: one state's role settings (lib/state-roles.ts). The firm's name and address in the state, who signs for
 * it, and for each role what clients may choose and whether the firm fixed it. Offering or fixing "your firm"
 * needs the firm's details in that state.
 */
export async function saveStateRoles(slug: string, state: string, _prev: RolesState, fd: FormData): Promise<RolesState> {
  const { session } = await firmContext(slug);
  const specs = rolesForState(state);
  if (!specs.length) return { error: "No roles to set for this state." };
  const issues: Record<string, string> = {};
  const street1 = text(fd, "firm.street1", 120), city = text(fd, "firm.city", 80), zip = text(fd, "firm.zip", 10);
  const firm: StateRoleSettings["firm"] | null = street1 || city || zip
    ? { name: text(fd, "firm.name", 160) || "Your firm", address: { street1, ...(text(fd, "firm.street2", 120) ? { street2: text(fd, "firm.street2", 120) } : {}), city, state, zip } }
    : null;
  if (firm && (!street1 || !city || !/^\d{5}(-\d{4})?$/.test(zip))) issues.firm = `Fill in the street, city and ZIP of your firm's ${STATE_NAMES[state] ?? state} address, or leave them all empty.`;
  const signerName = text(fd, "signer.name", 160);
  const signer: StateRoleSettings["signer"] | null = signerName ? { name: signerName, title: text(fd, "signer.title", 80) || "Authorized Representative" } : null;
  const roles: NonNullable<StateRoleSettings["roles"]> = {};
  for (const spec of specs) {
    const offer = fd.getAll(`roles.${spec.id}.offer`).map(String).filter((c) => CANDIDATES.has(c) && spec.optional.includes(c as RoleCandidate)) as RoleCandidate[];
    const fixedRaw = text(fd, `roles.${spec.id}.fixed`, 20);
    const fixed = fixedRaw && spec.decidable.includes(fixedRaw as RoleCandidate) ? (fixedRaw as RoleCandidate) : undefined;
    const wantsPartner = offer.includes("partner") || fixed === "partner";
    if (wantsPartner && spec.needs === "firm" && !firm) issues[`roles.${spec.id}`] = `To offer your firm here, fill in its ${STATE_NAMES[state] ?? state} address above.`;
    if (wantsPartner && spec.needs === "signer" && !signer) issues[`roles.${spec.id}`] = "To offer your firm here, name who signs for it above.";
    roles[spec.id] = { offer, ...(fixed ? { fixed } : {}) };
  }
  if (Object.keys(issues).length) return { error: "Check the highlighted fields.", issues };
  try {
    await engine(session.apiKey, `/v1/client-companies/${encodeURIComponent(session.clientCompanyId)}/profile`, { method: "PUT", body: { stateRoles: { [state]: { firm, signer, roles } } } });
  } catch (e) {
    if (e instanceof EngineError && e.status === 422) return { error: "Check the details: the address must be in this state." };
    return { error: "That didn't save. Try again in a minute." };
  }
  revalidatePath(`/p/${encodeURIComponent(slug)}`, "layout");
  return { ok: true, message: `Saved. New ${STATE_NAMES[state] ?? state} filings offer these answers.` };
}

/** Decided Nov 27: the firm chooses ours ($59 a year per business, billed to the firm) or its own saved agents as the answer its forms start with. */
export async function saveAgentChoice(slug: string, _prev: AgentsState, fd: FormData): Promise<AgentsState> {
  const { session } = await firmContext(slug);
  const choice = String(fd.get("registeredAgentChoice") ?? "");
  if (choice !== "filing_company" && choice !== "client_provided") return { error: "Pick one of the two." };
  try {
    await engine(session.apiKey, `/v1/client-companies/${encodeURIComponent(session.clientCompanyId)}/profile`, { method: "PUT", body: { registeredAgentChoice: choice } });
  } catch {
    return { error: "That didn't save. Try again in a minute." };
  }
  revalidatePath(`/p/${encodeURIComponent(slug)}`, "layout");
  return { ok: true, message: choice === "filing_company" ? "Saved. New filings start with our registered agent; anyone can still name another." : "Saved. New filings start with your own agents." };
}

export async function saveAgents(slug: string, _prev: AgentsState, fd: FormData): Promise<AgentsState> {
  const { session } = await firmContext(slug);
  const agents: Record<string, unknown> = {};
  for (const st of ["NY", "NJ", "FL", "MO"]) {
    if (!fd.has(`${st}.name`)) continue;
    const name = text(fd, `${st}.name`, 160);
    if (!name) { agents[st] = null; continue; }
    const street1 = text(fd, `${st}.street1`, 120), city = text(fd, `${st}.city`, 80), zip = text(fd, `${st}.zip`, 10);
    if (!street1 || !city || !/^\d{5}(-\d{4})?$/.test(zip)) return { error: `Fill in the ${st} agent's street, city and ZIP, or leave its name empty.` };
    agents[st] = { name, ...(text(fd, `${st}.email`) ? { email: text(fd, `${st}.email`) } : {}), address: { street1, ...(text(fd, `${st}.street2`, 120) ? { street2: text(fd, `${st}.street2`, 120) } : {}), city, state: st, zip } };
  }
  try {
    await engine(session.apiKey, `/v1/client-companies/${encodeURIComponent(session.clientCompanyId)}/profile`, { method: "PUT", body: { registeredAgents: agents } });
  } catch (e) {
    if (e instanceof EngineError && e.status === 422) return { error: "Check the agents' details: each address must be in its own state." };
    return { error: "That didn't save. Try again in a minute." };
  }
  revalidatePath(`/p/${encodeURIComponent(slug)}`, "layout");
  return { ok: true, message: "Saved. New filings offer these agents." };
}
