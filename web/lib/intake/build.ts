/**
 * Turns a submitted intake form into an engine FilingRequest.
 *
 * Form inputs are named by request path. Group items carry an index:
 * `formation.members.0.name`. Checkboxes send "on"; yes/no radios send "yes" or "no".
 * Hidden fields (showIf false) are dropped, so a branch the client closed sends nothing.
 */
import type { Authorization, Cond, Field, FilingKind, Group, Item } from "./forms.ts";

export type Raw = Record<string, string>;
export interface BuildIssue { path: string; message: string }
export interface BuildContext {
  tenantId: string;
  clientCompanyId: string;
  idempotencyKey: string;
  /** Who filled the form, recorded with the authorizations. */
  submittedBy: string;
  source: "firm_portal" | "client_link";
  dryRun?: boolean;
}
export interface BuildResult { request: Record<string, unknown>; issues: BuildIssue[] }

export const AUTH_PREFIX = "auth.";

/** FormData → flat record; the last value wins for repeated names. */
export function rawFromFormData(fd: FormData): Raw {
  const out: Raw = {};
  for (const [k, v] of fd.entries()) if (typeof v === "string") out[k] = v;
  return out;
}

// ---------------------------------------------------------------- path helpers

export function setPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split(".");
  let cur: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]!;
    const nextIsIndex = /^\d+$/.test(parts[i + 1] ?? "");
    if (cur[k] === undefined || cur[k] === null || typeof cur[k] !== "object") cur[k] = nextIsIndex ? [] : {};
    cur = cur[k] as Record<string, unknown>;
  }
  cur[parts[parts.length - 1]!] = value;
}

export function getPath(obj: unknown, path: string): unknown {
  let cur: unknown = obj;
  for (const k of path.split(".")) {
    if (cur === null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[k];
  }
  return cur;
}

function deleteEmpty(v: unknown): unknown {
  if (Array.isArray(v)) {
    const arr = v.filter((x) => x !== undefined).map(deleteEmpty).filter((x) => x !== undefined);
    return arr;
  }
  if (v && typeof v === "object") {
    const o: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v)) {
      const c = deleteEmpty(x);
      if (c === undefined) continue;
      if (c && typeof c === "object" && !Array.isArray(c) && Object.keys(c).length === 0) continue;
      o[k] = c;
    }
    return o;
  }
  return v;
}

function deepMerge(into: Record<string, unknown>, from: Record<string, unknown>): void {
  for (const [k, v] of Object.entries(from)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      if (!into[k] || typeof into[k] !== "object") into[k] = {};
      deepMerge(into[k] as Record<string, unknown>, v as Record<string, unknown>);
    } else into[k] = v;
  }
}

// ---------------------------------------------------------------- visibility

/** Resolves a showIf path: ".x" is a sibling inside the same group item. */
function condPath(c: Cond, itemPrefix: string | null): string {
  return c.path.startsWith(".") && itemPrefix ? `${itemPrefix}${c.path}` : c.path;
}

export function condHolds(c: Cond | undefined, raw: Raw, itemPrefix: string | null = null): boolean {
  if (!c) return true;
  const v = (raw[condPath(c, itemPrefix)] ?? "").trim();
  return Array.isArray(c.equals) ? c.equals.includes(v) : v === c.equals;
}

export interface Visibility {
  /** Whether a showIf holds, counting a controlling field that is itself hidden as empty. */
  holds: (c: Cond | undefined, itemPrefix?: string | null) => boolean;
  /** Top-level field paths that are shown. */
  top: Set<string>;
}

/**
 * Works out which fields are shown. A field hidden by its own condition counts as empty for the
 * fields it controls, so closing a branch closes everything under it (the agent's name fields
 * close when the filing company provides the agent, even though "a person" is still picked).
 * Controllers come before the fields they control, so one pass in order is enough.
 */
export function visibility(kind: FilingKind, raw: Raw): Visibility {
  const known = new Set<string>();
  for (const s of kind.sections) for (const it of s.items) if (it.kind === "field") known.add(it.path);
  const top = new Set<string>();
  const holds = (c: Cond | undefined, itemPrefix: string | null = null): boolean => {
    if (!c) return true;
    const path = condPath(c, itemPrefix);
    const v = known.has(path) && !top.has(path) ? "" : (raw[path] ?? "").trim();
    return Array.isArray(c.equals) ? c.equals.includes(v) : v === c.equals;
  };
  for (const s of kind.sections) {
    if (!holds(s.showIf)) continue;
    for (const it of s.items) if (it.kind === "field" && holds(it.showIf)) top.add(it.path);
  }
  return { holds, top };
}

/** Group item indexes present in the form, in order. */
export function groupIndexes(g: Group, raw: Raw): number[] {
  const re = new RegExp(`^${g.path.replace(/\./g, "\\.")}\\.(\\d+)(?:\\.|$)`);
  const set = new Set<number>();
  for (const k of Object.keys(raw)) {
    const m = re.exec(k);
    if (m) set.add(Number(m[1]));
  }
  return [...set].sort((a, b) => a - b);
}

const fieldName = (groupPrefix: string, f: Field) => (f.path ? `${groupPrefix}.${f.path}` : groupPrefix);

// ---------------------------------------------------------------- coercion

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const MONTH = /^\d{4}-\d{2}$/;
const ZIP = /^\d{5}(-\d{4})?$/;

function coerce(f: Field, value: string, path: string, issues: BuildIssue[]): unknown {
  const v = value.trim();
  const bad = (message: string) => { issues.push({ path, message: `${f.label}: ${message}` }); return undefined; };
  if (f.maxLength && v.length > f.maxLength) return bad(`keep it to ${f.maxLength} characters`);
  if (f.options && v && !f.options.some((o) => o.value === v)) return bad("pick one of the listed choices");
  if (f.minWords && v && v.split(/\s+/).length < f.minWords) return bad("enter a first and last name");
  switch (f.type) {
    case "select": return v ? (f.integer ? Number(v) : v) : undefined; // a list of numbers (NJ-REG fiscal month) sends a number
    case "checkbox": return v === "on" || v === "true" ? true : undefined;
    case "yesno": return v === "yes" ? true : v === "no" ? false : undefined;
    case "number": {
      if (!v) return undefined;
      const n = Number(v);
      if (!Number.isFinite(n)) return bad("enter a number");
      if (f.integer && !Number.isInteger(n)) return bad("enter a whole number");
      if (f.min !== undefined && n < f.min) return bad(`must be at least ${f.min}`);
      if (f.max !== undefined && n > f.max) return bad(`must be at most ${f.max}`);
      return n;
    }
    case "email": if (v && !EMAIL.test(v)) return bad("enter a valid email address"); return v || undefined;
    case "date": if (v && !DATE.test(v)) return bad("enter a date"); return v || undefined;
    case "month":
      if (v && !MONTH.test(v)) return bad("enter a month and year");
      return v ? (f.transform === "monthToDate" ? `${v}-01` : v) : undefined;
    case "zip": if (v && !ZIP.test(v)) return bad("enter a 5 or 9 digit ZIP code"); return v || undefined;
    case "usState": if (v && !/^[A-Za-z]{2}$/.test(v)) return bad("pick a state"); return v ? v.toUpperCase() : undefined;
    case "ssn": {
      if (!v) return undefined;
      const d = v.replace(/\D/g, "");
      if (d.length !== 9) return bad("must be 9 digits");
      return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
    }
    case "fein": {
      if (!v) return undefined;
      const d = v.replace(/\D/g, "");
      if (d.length !== 9) return bad("must be 9 digits");
      return `${d.slice(0, 2)}-${d.slice(2)}`;
    }
    case "tel": {
      if (!v) return undefined;
      if (v.replace(/\D/g, "").length < 7) return bad("enter a full phone number");
      return v;
    }
    default: return v || undefined;
  }
}

function isEmpty(f: Field, raw: string | undefined): boolean {
  const v = (raw ?? "").trim();
  if (f.type === "checkbox") return v !== "on" && v !== "true";
  return v === "";
}

// ---------------------------------------------------------------- the build

interface Visible { field: Field; name: string; itemPrefix: string | null; target?: string }

function visibleFields(kind: FilingKind, raw: Raw, issues: BuildIssue[]): Visible[] {
  const out: Visible[] = [];
  const vis = visibility(kind, raw);
  const walk = (items: Item[], itemPrefix: string | null) => {
    for (const it of items) {
      if (it.kind === "note") continue;
      if (it.kind === "field" ? !vis.top.has(it.path) : !vis.holds(it.showIf, itemPrefix)) continue;
      if (it.kind === "field") { out.push({ field: it, name: it.path, itemPrefix }); continue; }
      const idx = groupIndexes(it, raw).filter((i) => it.fields.some((gf) => gf.kind === "field" && !isEmpty(gf, raw[fieldName(`${it.path}.${i}`, gf)])));
      if (idx.length < it.min) issues.push({ path: it.path, message: `${it.label}: add at least ${it.min}` });
      if (idx.length > it.max) issues.push({ path: it.path, message: `${it.label}: at most ${it.max}` });
      idx.slice(0, it.max).forEach((i, n) => {
        const prefix = `${it.path}.${i}`;
        for (const gf of it.fields) {
          if (gf.kind !== "field" || !vis.holds(gf.showIf, prefix)) continue;
          // Re-index so the request has no holes: members.0, members.1, ...
          const target = gf.path.startsWith("stateAnswers_")
            ? stateAnswersPath(it.path, n, gf.path.slice("stateAnswers_".length))
            : (gf.path ? `${it.path}.${n}.${gf.path}` : `${it.path}.${n}`);
          out.push({ field: gf, name: fieldName(prefix, gf), itemPrefix: prefix, target });
        }
      });
    }
  };
  for (const s of kind.sections) if (vis.holds(s.showIf)) walk(s.items, null);
  return out;
}

/** A group field the engine has no slot for: `payroll.owners` + `principalType` → `payroll.stateAnswers.owners.<n>.principalType`. */
function stateAnswersPath(groupPath: string, n: number, key: string): string {
  const cut = groupPath.lastIndexOf(".");
  const parent = groupPath.slice(0, cut);
  const last = groupPath.slice(cut + 1);
  return `${parent}.stateAnswers.${last}.${n}.${key}`;
}

/** Fields required "withSiblings" are required once anything else under their parent object is filled. */
function siblingFilled(v: Visible, all: Visible[], raw: Raw): boolean {
  const parent = v.name.slice(0, v.name.lastIndexOf("."));
  return all.some((o) => o !== v && o.name.startsWith(`${parent}.`) && o.field.type !== "checkbox" && !isEmpty(o.field, raw[o.name]) && o.field.defaultValue !== raw[o.name]?.trim());
}

export function buildRequest(kind: FilingKind, raw: Raw, ctx: BuildContext): BuildResult {
  const issues: BuildIssue[] = [];
  const request: Record<string, unknown> = {};
  const vis = visibleFields(kind, raw, issues);

  for (const v of vis) {
    const value = raw[v.name];
    const required = v.field.required === true || (v.field.required === "withSiblings" && siblingFilled(v, vis, raw));
    if (required && isEmpty(v.field, value)) {
      issues.push({ path: v.name, message: v.field.type === "checkbox" ? `${v.field.label}: please tick this` : `${v.field.label}: required` });
      continue;
    }
    if (value === undefined) continue;
    const c = coerce(v.field, value, v.name, issues);
    if (c === undefined) continue;
    setPath(request, v.target ?? v.name, c);
  }

  // Authorizations: every one must be granted.
  const granted: { id: string; text: string; ref: string; grantedAt: string; grantedBy: string }[] = [];
  for (const a of kind.authorizations) {
    if ((raw[`${AUTH_PREFIX}${a.id}`] ?? "") !== "on") issues.push({ path: `${AUTH_PREFIX}${a.id}`, message: "Please confirm this authorization to continue" });
    else granted.push({ id: a.id, text: a.text, ref: a.ref, grantedAt: new Date().toISOString(), grantedBy: ctx.submittedBy });
  }

  if (raw.state && kind.type === "ein_only") request.state = raw.state; // the IRS form picks the formation state
  deepMerge(request, structuredClone(kind.constants));
  postProcess(kind, request, raw);

  const out = deleteEmpty(request) as Record<string, unknown>;
  out.tenantId = ctx.tenantId;
  out.clientCompanyId = ctx.clientCompanyId;
  out.idempotencyKey = ctx.idempotencyKey;
  out.type = kind.type;
  out.state = kind.type === "ein_only" ? (out.state ?? kind.state) : kind.state;
  if (ctx.dryRun !== undefined) out.dryRun = ctx.dryRun;
  const intake = (out.intake ?? {}) as Record<string, unknown>;
  const portal = (intake.portal ?? {}) as Record<string, unknown>;
  intake.portal = { ...portal, kind: kind.id, source: ctx.source, submittedBy: ctx.submittedBy, authorizations: granted };
  out.intake = intake;
  return { request: out, issues };
}

/** Per-kind tidy-up the declarative form can't express. */
function postProcess(kind: FilingKind, r: Record<string, unknown>, raw: Raw): void {
  const formation = r.formation as Record<string, unknown> | undefined;
  if (formation && formation.registeredAgentChoice === "filing_company") delete formation.registeredAgent;
  // V24: "same as the business" covers the phone too (NYS-100 A8, A9), not only the address.
  const answers = (r.payroll as { stateAnswers?: Record<string, unknown> } | undefined)?.stateAnswers;
  if (answers?.businessPhone) {
    if (raw["intake.portal.booksSameAsBusiness"] === "on" && !answers.booksPhone) answers.booksPhone = answers.businessPhone;
    if (raw["intake.portal.chargesSameAsBusiness"] === "on" && !answers.chargesPhone) answers.chargesPhone = answers.businessPhone;
  }
  // V24: the service-of-process notice email defaults to the contact's, so nobody types it twice.
  const sop = formation?.serviceOfProcess as Record<string, unknown> | undefined;
  const contactEmail = (r.contact as { email?: string } | undefined)?.email;
  if (sop && !sop.noticeEmail && contactEmail) sop.noticeEmail = contactEmail;
  // V22: "our saved agent" is the firm's own agent, which the engine takes from the firm's settings.
  if (formation && formation.registeredAgentChoice === "firm_saved") { formation.registeredAgentChoice = "client_provided"; delete formation.registeredAgent; }

  if (kind.state === "FL" && formation && formation.registeredAgentChoice === "client_provided") {
    const kindOfAgent = raw["intake.portal.flAgentKind"];
    const name = kindOfAgent === "business"
      ? raw["intake.portal.flAgentBusinessName"]?.trim()
      : [raw["intake.portal.flAgentFirstName"], raw["intake.portal.flAgentInitial"], raw["intake.portal.flAgentLastName"], raw["intake.portal.flAgentSuffix"]].map((s) => s?.trim()).filter(Boolean).join(" ");
    if (name) setPath(r, "formation.registeredAgent.name", name);
  }

  if (kind.type === "ein_only") {
    setPath(r, "ein.formationState", (r.state as string | undefined) ?? kind.state);
    // V24: the physical state is the state of the physical address the form already asks for.
    const physical = ((r.ein as Record<string, unknown> | undefined)?.responsibleParty as { address?: { state?: string } } | undefined)?.address?.state;
    if (physical && !(r.ein as Record<string, unknown>).physicalState) setPath(r, "ein.physicalState", physical);
  }

  const payroll = r.payroll as Record<string, unknown> | undefined;
  if (payroll && raw["intake.portal.booksSameAsBusiness"] === "on" && payroll.businessAddress) payroll.booksRecordsAddress = payroll.businessAddress;
  // NYS-100 P11: a member who is not a US resident has no US address, so no New York county either.
  for (const o of (payroll?.owners as Record<string, unknown>[] | undefined) ?? []) if (o && o.usResident === false) delete o.county;

  const assumed = (r.paperUpload as { assumedName?: Record<string, unknown> } | undefined)?.assumedName;
  if (assumed && raw["intake.portal.nyAllCounties"] === "all") assumed.counties = "all";
}

/** Every field path a kind can produce, for the coverage table and tests. */
export function allFields(kind: FilingKind): { section: string; field: Field; path: string; group?: Group }[] {
  const out: { section: string; field: Field; path: string; group?: Group }[] = [];
  for (const s of kind.sections) {
    for (const it of s.items) {
      if (it.kind === "field") out.push({ section: s.title, field: it, path: it.path });
      else if (it.kind === "group") for (const gf of it.fields) if (gf.kind === "field") out.push({ section: s.title, field: gf, group: it, path: gf.path.startsWith("stateAnswers_") ? stateAnswersPath(it.path, 0, gf.path.slice(13)).replace(".0.", "[].") : `${it.path}[]${gf.path ? `.${gf.path}` : ""}` });
    }
  }
  return out;
}

export type { Authorization };
