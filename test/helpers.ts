process.env.FEE_TABLE_PATH = new URL("./fees.test.json", import.meta.url).pathname;
import { MemoryStore } from "../src/store/memory.js";
import { ApprovalService } from "../src/approvals/service.js";
import { WebhookDispatcher } from "../src/webhooks/dispatcher.js";
import { InMemoryQueue } from "../src/orchestrator/queue.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { FilingService } from "../src/orchestrator/service.js";
import { TenantSettings, ClientCompanySettings } from "../src/settings/schema.js";
import type { FilingRequest } from "../src/domain/filing.js";

export const SECRET = "test-signing-secret-of-adequate-length";

export async function seededStore() {
  const store = new MemoryStore();
  await store.putTenant(TenantSettings.parse({
    tenantId: "keystone", name: "Keystone Filings",
    organizer: { name: "Keystone Filings LLC", address: { street1: "1 Main St", city: "Brooklyn", state: "NY", zip: "11201" } },
    filer: { name: "Keystone Filings LLC", address: { street1: "1 Main St", city: "Brooklyn", state: "NY", zip: "11201" } },
    webhookEndpoints: [{ url: "https://hooks.example.test/filings", secret: "endpoint-secret-0123456789" }],
    // These tests are about the data-only approval; test/review-preview.test.ts covers decision 7.
    approvalPreview: "payload",
  }));
  await store.putClientCompany(ClientCompanySettings.parse({
    clientCompanyId: "acme-cpa", tenantId: "keystone", name: "Acme CPA",
    einMode: "in_run", njAccountCredentialKey: "NJ_ACME", njStoredPaymentMethod: "stored_card", policies: { stateFees: "own_account" },
    registeredAgent: { name: "Acme Agents Inc", address: { street1: "9 Agent Way", city: "Newark", state: "NJ", zip: "07102" } },
    defaultSigner: { name: "Jordan Lee", title: "Authorized Representative" },
  }));
  await store.putClientCompany(ClientCompanySettings.parse({
    clientCompanyId: "beta-llc", tenantId: "keystone", name: "Beta LLC Owners",
    einMode: "after_acceptance", njAccountCredentialKey: "NJ_BETA", njStoredPaymentMethod: "stored_echeck", policies: { stateFees: "own_account" },
  }));
  return store;
}

export function njFormationRequest(overrides: Partial<FilingRequest> = {}): FilingRequest {
  return {
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `idem-${Math.random().toString(36).slice(2)}`,
    type: "formation", state: "NJ",
    formation: {
      entityType: "LLC",
      name: { baseName: "Blue Harbor Consulting", designator: "LLC" },
      effectiveDate: "upon_filing",
      mainBusinessAddress: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" },
      registeredAgent: { name: "Acme Agents Inc", address: { street1: "9 Agent Way", city: "Newark", state: "NJ", zip: "07102" } },
      members: [{ name: "Sam Rivera", address: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" } }],
      signers: [{ name: "Sam Rivera", title: "Authorized Representative" }],
      otherProvisions: [],
      additionalCertificates: { certificateOfStanding: false, certifiedCopy: false },
    },
    contact: { firstName: "Sam", lastName: "Rivera", phone: "2015550100", email: "sam@example.test" },
    ...overrides,
  } as FilingRequest;
}

export function wire(store: MemoryStore, extra: { executor?: ConstructorParameters<typeof FilingService>[0]["executor"]; fetchImpl?: ConstructorParameters<typeof WebhookDispatcher>[1]; now?: () => Date } = {}) {
  const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 168 });
  const webhooks = new WebhookDispatcher(store, extra.fetchImpl ?? (async () => ({ status: 200 })));
  const queue = new InMemoryQueue();
  const vault = new InMemoryVault();
  vault.set("keystone/acme-cpa/NJ_ACME", { username: "acme", password: "pw" });
  const drift = new DriftReviewService(store);
  const service = new FilingService({ store, approvals, webhooks, queue, vault, drift, executor: extra.executor, dryRunDefault: true, now: extra.now });
  return { approvals, webhooks, queue, vault, drift, service };
}

/** A complete ein_only request (IRS interview, owner route); SSN is the test value 123-45-6789. */
export function einOnlyRequest(over: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `idem-${Math.random().toString(36).slice(2)}`,
    type: "ein_only", state: "NY",
    formation: {
      entityType: "LLC", name: { baseName: "Blue Harbor Consulting", designator: "LLC" }, county: "Kings",
      effectiveDate: "upon_filing", mainBusinessAddress: { street1: "22 River Rd", city: "Brooklyn", state: "NY", zip: "11201" },
      members: [{ name: "Sam Rivera" }], additionalCertificates: {},
    },
    ein: {
      mode: "in_run", applicantRole: "owner",
      responsibleParty: { name: "Sam Rivera", ssn: "123-45-6789", title: "Member", address: { street1: "22 River Rd", city: "Brooklyn", state: "NY", zip: "11201" }, phone: "2125550100" },
      reason: "new_business", physicalState: "NY", formationState: "NY", county: "Kings", startDate: "2026-11-01",
      regulated: { highwayVehicle: false, wagering: false, form720: false, alcoholTobaccoFirearms: false },
      employees: { expected: true, firstWages: "2027-01", agriculturalCount: 0, otherCount: 2, lowAnnualLiability: true },
      businessActivity: { category: "Real Estate", detail: "Manage real estate for others" },
      mailingAddress: { street1: "PO Box 100", city: "Jersey City", state: "NJ", zip: "07302" },
      noticeDelivery: "digital",
    },
    contact: { firstName: "Sam", lastName: "Rivera", phone: "2125550100", email: "sam@example.test" },
    ...over,
  };
}
