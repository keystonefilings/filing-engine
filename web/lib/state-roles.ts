import type { ClientCompany, RoleAddress, RoleCandidate, RolePerson } from "./engine";
import type { Field, FilingKind, Group, Item, Section } from "./intake/forms";
import { getPath, setPath, type Raw } from "./intake/build.ts";

/**
 * Per-state partner settings (Nov 27). Each state's filing names people in roles: New York its service of
 * process, an optional registered agent, the organizer and the filer; New Jersey its registered agent and
 * its signer; Florida its authorized representative. Who those can be is this registry's business; which of
 * them a firm offers its clients, and which it fixes for every filing, is the firm's (`stateRoles` on its
 * record, set under Setup). Nothing here is hardcoded to one state: a role is a spec, and the same transform
 * and resolver serve every one of them.
 *
 * Candidates: the partner firm itself (its name and address in that state, or its signer), its saved agent
 * for the state, our agent service, the new entity itself at its main business address, one of its members,
 * the client (who types the details), someone else typed in, a service company, the filing company, or nobody.
 *
 * `applyStateRoles` shapes a form: each role becomes one question with the offered answers (or no question,
 * when the firm fixed it), and the typed-in fields stay folded away until a typed answer is picked. The
 * resolver it returns runs on submit and turns the answer into the engine's fields, so the proof shows the
 * actual name and address and nothing depends on what the client typed into a hidden field.
 */
export type Candidate = RoleCandidate;
export const CANDIDATE_ORDER: Candidate[] = ["partner", "saved", "ours", "entity", "member", "client", "other", "service_company", "filing_company", "none"];

export type RoleShape = "sop" | "person" | "group" | "agentChoice" | "text";

export interface RoleSpec {
  id: string;
  state: string;
  title: string;
  /** What the role is, for the firm's settings page. */
  what: string;
  shape: RoleShape;
  /** The form field the choice lives in: an existing radio, or a new intake.portal.roles.* radio. */
  choicePath: string;
  /** The engine path the role fills (a person, a signers list, a text). */
  base: string;
  /** Answers every form offers (the state's own). */
  always: Candidate[];
  /** Answers the firm may add. */
  optional: Candidate[];
  /** Answers the firm may fix for every filing (then the form doesn't ask). */
  decidable: Candidate[];
  /** Answers that mean "typed in below". */
  typed: Candidate[];
  /** Form values of candidates on an existing radio. */
  values?: Partial<Record<Candidate, string>>;
  /** What "the partner" means here: the firm's name and address in the state, or the person who signs for it. */
  needs: "firm" | "signer";
  /** Offered automatically when the firm has a saved agent for the state. */
  saved?: boolean;
  /** The starting answer when the client chooses, if it's offered. */
  defaultTo?: Candidate;
}

export const STATE_ROLES: RoleSpec[] = [
  { id: "serviceOfProcess", state: "NY", title: "Service of process", what: "Where New York's Secretary of State mails legal papers served on the business, for example if it is sued. It appears in New York's public records.",
    shape: "sop", choicePath: "formation.serviceOfProcess.mode", base: "formation.serviceOfProcess", always: ["entity", "other", "service_company"], optional: ["partner"], decidable: [], typed: ["other"], values: { other: "manual" }, needs: "firm" },
  { id: "registeredAgent", state: "NY", title: "Registered agent", what: "Optional in New York: the Secretary of State already accepts legal papers for the business. Named only if someone has agreed to be the agent.",
    shape: "person", choicePath: "intake.portal.roles.registeredAgent", base: "formation.registeredAgent", always: ["none", "other"], optional: ["partner"], decidable: [], typed: ["other"], needs: "firm", saved: true, defaultTo: "none" },
  { id: "organizer", state: "NY", title: "Organizer", what: "Signs the Articles of Organization that create the LLC. Being the organizer doesn't make someone an owner.",
    shape: "person", choicePath: "intake.portal.roles.organizer", base: "formation.organizer", always: ["client", "filing_company"], optional: ["partner"], decidable: ["partner", "client"], typed: ["client"], needs: "firm" },
  { id: "filer", state: "NY", title: "Filer", what: "Who the state sends the filing receipt to.",
    shape: "person", choicePath: "intake.portal.roles.filer", base: "formation.filer", always: ["client", "filing_company"], optional: ["partner"], decidable: ["partner", "client"], typed: ["client"], needs: "firm" },
  { id: "registeredAgent", state: "NJ", title: "Registered agent", what: "Every New Jersey business names one, at a New Jersey street address. Your saved agent and our agent service are offered when you have them (Setup, Registered agents).",
    shape: "agentChoice", choicePath: "formation.registeredAgentChoice", base: "formation.registeredAgent", always: ["other"], optional: ["entity", "member"], decidable: [], typed: ["other"], values: { saved: "firm_saved", ours: "filing_company", entity: "new_entity", member: "entity_member", other: "client_provided" }, needs: "firm", saved: true },
  { id: "signer", state: "NJ", title: "Signer", what: "Signs the Certificate of Formation as its authorized representative.",
    shape: "group", choicePath: "intake.portal.roles.signer", base: "formation.signers", always: ["client"], optional: ["partner"], decidable: ["partner", "client"], typed: ["client"], needs: "signer" },
  { id: "signer", state: "FL", title: "Authorized representative", what: "Whose name is typed as the electronic signature on the Articles of Organization.",
    shape: "text", choicePath: "intake.portal.roles.signer", base: "intake.portal.flSignerName", always: ["client"], optional: ["partner"], decidable: ["partner", "client"], typed: ["client"], needs: "signer" },
];

export const STATE_NAMES: Record<string, string> = { NY: "New York", NJ: "New Jersey", FL: "Florida", MO: "Missouri" };

/** The roles a state has, for the settings page. */
export const rolesForState = (state: string): RoleSpec[] => STATE_ROLES.filter((r) => r.state === state);

type Company = Pick<ClientCompany, "name" | "portal" | "partner" | "stateRoles" | "registeredAgentsByState" | "filerName" | "ourAgent">;

export const firmNameOf = (c: Pick<Company, "name" | "portal">): string => c.portal?.displayName || c.name || "Your firm";

const savedAgentFor = (c: Company, state: string): RolePerson | undefined => (c.registeredAgentsByState as Record<string, RolePerson | undefined> | undefined)?.[state];

/** Whether an answer can be offered at all, given what the firm has on file. */
export function available(spec: RoleSpec, c: Candidate, company: Company): boolean {
  const cfg = company.stateRoles?.[spec.state];
  if (c === "partner") return spec.needs === "firm" ? !!cfg?.firm?.address && cfg.firm.address.state === spec.state : !!cfg?.signer?.name;
  if (c === "saved") return !!spec.saved && !!savedAgentFor(company, spec.state);
  if (c === "ours") return !!company.ourAgent?.states.includes(spec.state);
  return true;
}

const entityWord = (kind: FilingKind): string => (/corp/.test(kind.id) ? "corporation" : "LLC");
const place = (a: RoleAddress | undefined) => (a ? ` (${a.street1}, ${a.city})` : "");

/** How an answer reads on the form: for the firm's own staff, or for a client the firm sent the form to. */
export function candidateLabel(spec: RoleSpec, c: Candidate, company: Company, kind: FilingKind, forClient: boolean, existing?: string): string {
  const firm = firmNameOf(company);
  const cfg = company.stateRoles?.[spec.state];
  const entity = entityWord(kind);
  switch (c) {
    case "partner":
      if (spec.needs === "signer") return forClient ? `${firm}'s authorized representative, ${cfg?.signer?.name}` : `${cfg?.signer?.name}, who signs for your firm`;
      return forClient ? `${firm}, the firm that sent you this form${place(cfg?.firm?.address)}` : `Your firm, ${cfg?.firm?.name || firm}${place(cfg?.firm?.address)}`;
    case "saved": return `Our saved agent: ${savedAgentFor(company, spec.state)?.name}`;
    case "ours": return existing ?? `${firm}'s registered agent service`;
    case "entity":
      return spec.shape === "agentChoice"
        ? `The new ${entity} itself, at its main business address above (it must be a New Jersey street address)`
        : `The new ${entity} itself, at its principal business address (entered below)`;
    case "member": return "One of the members or managers listed below, at their New Jersey street address (the first with one)";
    case "client":
      if (spec.needs === "signer") return forClient ? `Me, or another authorized person of the ${entity} (named below)` : `The client, or another authorized person (named below)`;
      return forClient ? `Me, or another owner of the new ${entity} (name and address below)` : `The client, an owner of the new ${entity} (name and address below)`;
    case "other": return existing ?? (spec.shape === "sop" ? "A different name and address I enter below" : "A registered agent I name below");
    case "service_company": return existing ?? "A service company that receives legal papers for businesses (if you've hired one)";
    case "filing_company": return `${company.filerName ?? "The filing company"}, the company that files this`;
    case "none": return "None: New York doesn't require one (the Secretary of State accepts legal papers)";
  }
}

export interface AppliedRole { spec: RoleSpec; candidates: Candidate[]; fixed?: Candidate; values: Record<string, Candidate> }
export type Resolver = (request: Record<string, unknown>, raw: Raw) => { path: string; message: string }[];

const formValue = (spec: RoleSpec, c: Candidate): string => spec.values?.[c] ?? c;

/** Which answers a form offers for a role, in display order, and whether the firm fixed one. */
export function offered(spec: RoleSpec, company: Company): { candidates: Candidate[]; fixed?: Candidate } {
  const roleCfg = company.stateRoles?.[spec.state]?.roles?.[spec.id];
  const set = new Set<Candidate>(spec.always);
  for (const c of spec.optional) if (roleCfg?.offer?.includes(c) && available(spec, c, company)) set.add(c);
  if (spec.saved && available(spec, "saved", company)) set.add("saved");
  if (spec.shape === "agentChoice" && available(spec, "ours", company)) set.add("ours");
  const candidates = CANDIDATE_ORDER.filter((c) => set.has(c));
  let fixed = roleCfg?.fixed && spec.decidable.includes(roleCfg.fixed) && available(spec, roleCfg.fixed, company) ? roleCfg.fixed : undefined;
  if (!fixed && candidates.length === 1 && spec.decidable.length) fixed = candidates[0];
  return { candidates, fixed };
}

function deletePath(obj: Record<string, unknown>, path: string): void {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const k of parts.slice(0, -1)) { if (!cur || typeof cur !== "object") return; cur = (cur as Record<string, unknown>)[k]; }
  if (cur && typeof cur === "object") delete (cur as Record<string, unknown>)[parts[parts.length - 1]!];
}

const hasField = (kind: FilingKind, test: (it: Item) => boolean) => kind.sections.some((s) => s.items.some(test));

/**
 * Shapes a partner firm's form by its per-state settings and returns the resolver that turns each answer into
 * the engine's fields on submit. Forms of firms an enterprise set up are left alone.
 */
export function applyStateRoles(kind: FilingKind, company: Company, forClient: boolean): { kind: FilingKind; applied: AppliedRole[]; resolve: Resolver } {
  const applied: AppliedRole[] = [];
  if (!company.partner) return { kind, applied, resolve: () => [] };
  const firm = firmNameOf(company);
  let sections: Section[] = kind.sections;
  for (const spec of rolesForState(kind.state)) {
    const present = spec.shape === "person" ? hasField(kind, (it) => it.kind === "field" && it.path.startsWith(`${spec.base}.`))
      : spec.shape === "group" ? hasField(kind, (it) => it.kind === "group" && it.path === spec.base)
      : spec.shape === "text" ? hasField(kind, (it) => it.kind === "field" && it.path === spec.base)
      : hasField(kind, (it) => it.kind === "field" && it.path === spec.choicePath);
    if (!present) continue;
    const { candidates, fixed } = offered(spec, company);
    const values: Record<string, Candidate> = Object.fromEntries(candidates.map((c) => [formValue(spec, c), c]));
    const typedValues = candidates.filter((c) => spec.typed.includes(c)).map((c) => formValue(spec, c));
    const existingLabels = (f: Field | undefined) => Object.fromEntries((f?.options ?? []).map((o) => [o.value, o.label]));
    const optionsFor = (f: Field | undefined) => {
      const was = existingLabels(f);
      return candidates.map((c) => ({ value: formValue(spec, c), label: candidateLabel(spec, c, company, kind, forClient, was[formValue(spec, c)]) }));
    };
    const defaultFor = (f: Field | undefined) => {
      if (spec.shape === "agentChoice" && f?.defaultValue && values[f.defaultValue]) return f.defaultValue;
      const pick = spec.saved && candidates.includes("saved") && spec.defaultTo ? "saved" : spec.defaultTo && candidates.includes(spec.defaultTo) ? spec.defaultTo : candidates[0]!;
      return formValue(spec, pick);
    };
    const fixedNote = (): Item => ({ kind: "note", text: `${spec.title}: ${candidateLabel(spec, fixed!, company, kind, forClient).replace(/ \((entered|named|name and address) below\)$/, "")}. ${forClient ? `${firm} set this for its filings.` : "Set under Setup, Who's named on your filings."}` });
    const radio = (): Field => ({ kind: "field", path: spec.choicePath, label: spec.title, type: "radio", required: true, options: optionsFor(undefined), defaultValue: defaultFor(undefined) });
    const typedCond = { path: spec.choicePath, equals: typedValues };

    sections = sections.map((s): Section => {
      const items: Item[] = [];
      let inserted = false;
      for (const it of s.items) {
        if (spec.shape === "sop" || spec.shape === "agentChoice") {
          if (it.kind === "field" && it.path === spec.choicePath) { items.push({ ...it, options: optionsFor(it), defaultValue: defaultFor(it) }); continue; }
          items.push(it); continue;
        }
        if (spec.shape === "person" && it.kind === "field" && it.path.startsWith(`${spec.base}.`)) {
          if (!inserted) { inserted = true; items.push(fixed ? fixedNote() : radio()); }
          if (fixed && !spec.typed.includes(fixed)) continue; // nothing to type: the firm decided
          const isName = it.path === `${spec.base}.name`;
          items.push({ ...it, ...(isName ? { required: true } : {}), ...(fixed ? {} : { showIf: typedCond }) });
          continue;
        }
        if (spec.shape === "group" && it.kind === "group" && it.path === spec.base) {
          items.push(fixed ? fixedNote() : radio());
          if (fixed && !spec.typed.includes(fixed)) continue;
          items.push(fixed ? it : { ...it, showIf: typedCond } as Group);
          continue;
        }
        if (spec.shape === "text" && it.kind === "field" && it.path === spec.base) {
          items.push(fixed ? fixedNote() : radio());
          if (fixed && !spec.typed.includes(fixed)) continue;
          items.push(fixed ? it : { ...it, showIf: typedCond });
          continue;
        }
        items.push(it);
      }
      return items === s.items ? s : { ...s, items };
    });
    applied.push({ spec, candidates, fixed, values });
  }
  if (!applied.length) return { kind, applied, resolve: () => [] };

  const resolve: Resolver = (request, raw) => {
    const issues: { path: string; message: string }[] = [];
    const cfgOf = (spec: RoleSpec) => company.stateRoles?.[spec.state];
    const name = getPath(request, "formation.name") as { baseName?: string; designator?: string } | undefined;
    const entityName = name?.baseName ? `${name.baseName} ${name.designator ?? "LLC"}`.trim() : undefined;
    const mainAddress = getPath(request, "formation.mainBusinessAddress") as RoleAddress | undefined;
    const firmPerson = (spec: RoleSpec): RolePerson => ({ name: cfgOf(spec)?.firm?.name || firm, address: cfgOf(spec)?.firm!.address });
    const signerPerson = (spec: RoleSpec): RolePerson => ({ name: cfgOf(spec)!.signer!.name, title: cfgOf(spec)!.signer!.title || "Authorized Representative" });
    for (const a of applied) {
      const { spec } = a;
      const choice: Candidate | undefined = a.fixed ?? a.values[(raw[spec.choicePath] ?? "").trim()];
      if (!choice) continue;
      const need = (ok: boolean, path: string, message: string) => { if (!ok) issues.push({ path, message }); return ok; };
      switch (spec.shape) {
        case "sop": {
          const sop = (getPath(request, spec.base) as Record<string, unknown> | undefined) ?? {};
          if (choice === "partner") setPath(request, spec.base, { mode: "manual", person: firmPerson(spec), noticeEmail: sop.noticeEmail });
          else if (choice === "entity") {
            if (need(!!mainAddress && !!entityName, spec.choicePath, `${spec.title}: enter the ${entityWord(kind)}'s principal business address below, or choose another answer`)) setPath(request, spec.base, { mode: "manual", person: { name: entityName, address: mainAddress }, noticeEmail: sop.noticeEmail });
          }
          break;
        }
        case "person": {
          if (choice === "partner") setPath(request, spec.base, firmPerson(spec));
          else if (choice === "saved") setPath(request, spec.base, savedAgentFor(company, spec.state));
          else if (choice === "none" || choice === "filing_company") deletePath(request, spec.base);
          break;
        }
        case "group": if (choice === "partner") setPath(request, spec.base, [signerPerson(spec)]); break;
        case "text": if (choice === "partner") setPath(request, spec.base, signerPerson(spec).name); break;
        case "agentChoice": {
          const own = (agent: RolePerson) => { setPath(request, "formation.registeredAgentChoice", "client_provided"); setPath(request, spec.base, agent); };
          if (choice === "entity") {
            if (need(!!mainAddress && mainAddress.state === spec.state && !!entityName, spec.choicePath, `${spec.title}: the ${entityWord(kind)} can be its own agent only at a ${STATE_NAMES[spec.state]} street address; enter its main business address above, or choose another answer`)) own({ name: entityName!, address: mainAddress });
          } else if (choice === "member") {
            const members = (getPath(request, "formation.members") as RolePerson[] | undefined) ?? [];
            const m = members.find((x) => x?.address?.state === spec.state);
            if (need(!!m, spec.choicePath, `${spec.title}: none of the members listed has a ${STATE_NAMES[spec.state]} address; add one, or choose another answer`)) own({ name: m!.name, address: m!.address });
          }
          break;
        }
      }
    }
    return issues;
  };
  return { kind: { ...kind, sections } as FilingKind, applied, resolve };
}
