import { engine } from "./engine";
import type { FilingKind } from "./intake/forms";
import { emailReadingOn, fillForm, pickKind } from "./email-intake";

/** V40: a filing request the firm emailed in (engine: src/inbound). */
export interface InboundMessage {
  id: string; from: string; subject: string; text?: string; receivedAt: string; purgedAt?: string; filingId?: string;
  extracted?: { kind: string | null; byKind: Record<string, Record<string, string>>; note?: string; at: string };
}

const base = (firm: string, id: string) => `/v1/client-companies/${encodeURIComponent(firm)}/inbound/${encodeURIComponent(id)}`;

export async function inboundMessage(apiKey: string, firm: string, id: string): Promise<InboundMessage | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  return (await engine<{ message: InboundMessage }>(apiKey, base(firm, id)).catch(() => null))?.message ?? null;
}

export async function inboundAddress(apiKey: string, firm: string): Promise<string | null> {
  return (await engine<{ address: string | null }>(apiKey, `/v1/client-companies/${encodeURIComponent(firm)}/inbound`).catch(() => null))?.address ?? null;
}

/** Which filing the email asks for, read once and kept with the message. */
export async function readKind(apiKey: string, firm: string, m: InboundMessage, kinds: FilingKind[]): Promise<InboundMessage> {
  if (m.extracted || !m.text || !emailReadingOn()) return m;
  const r = await pickKind({ subject: m.subject, text: m.text }, kinds).catch(() => null);
  if (!r) return m;
  const kind = r.kind ? kinds.find((k) => k.id === r.kind) : undefined;
  const answers = kind ? await fillForm({ subject: m.subject, text: m.text }, kind).catch(() => ({})) : {};
  const saved = await engine<{ message: InboundMessage }>(apiKey, `${base(firm, m.id)}/extracted`, {
    method: "PUT", body: { kind: kind?.id ?? null, byKind: kind ? { [kind.id]: answers } : {}, note: r.note.slice(0, 1000) },
  }).catch(() => null);
  return saved?.message ?? m;
}

/** The answers for one form, read from the email the first time this form is opened from it. */
export async function answersFor(apiKey: string, firm: string, m: InboundMessage, kind: FilingKind): Promise<Record<string, string>> {
  const have = m.extracted?.byKind[kind.id];
  if (have) return have;
  if (!m.text || !emailReadingOn()) return {};
  const answers = await fillForm({ subject: m.subject, text: m.text }, kind).catch(() => ({}));
  await engine(apiKey, `${base(firm, m.id)}/extracted`, { method: "PUT", body: { kind: m.extracted?.kind ?? null, byKind: { [kind.id]: answers } } }).catch(() => undefined);
  return answers;
}

export async function markFiled(apiKey: string, firm: string, id: string, filingId: string): Promise<void> {
  await engine(apiKey, `${base(firm, id)}/filed`, { method: "POST", body: { filingId } }).catch(() => undefined);
}
