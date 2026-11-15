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
  }));
  await store.putClientCompany(ClientCompanySettings.parse({
    clientCompanyId: "acme-cpa", tenantId: "keystone", name: "Acme CPA",
    einMode: "in_run", njAccountCredentialKey: "NJ_ACME", njStoredPaymentMethod: "stored_card",
    registeredAgent: { name: "Acme Agents Inc", address: { street1: "9 Agent Way", city: "Newark", state: "NJ", zip: "07102" } },
    defaultSigner: { name: "Jordan Lee", title: "Authorized Representative" },
  }));
  await store.putClientCompany(ClientCompanySettings.parse({
    clientCompanyId: "beta-llc", tenantId: "keystone", name: "Beta LLC Owners",
    einMode: "after_acceptance", njAccountCredentialKey: "NJ_BETA", njStoredPaymentMethod: "stored_echeck",
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

export function wire(store: MemoryStore, extra: { executor?: ConstructorParameters<typeof FilingService>[0]["executor"]; fetchImpl?: ConstructorParameters<typeof WebhookDispatcher>[1] } = {}) {
  const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 168 });
  const webhooks = new WebhookDispatcher(store, extra.fetchImpl ?? (async () => ({ status: 200 })));
  const queue = new InMemoryQueue();
  const vault = new InMemoryVault();
  vault.set("NJ_ACME", { username: "acme", password: "pw" });
  const drift = new DriftReviewService(store);
  const service = new FilingService({ store, approvals, webhooks, queue, vault, drift, executor: extra.executor, dryRunDefault: true });
  return { approvals, webhooks, queue, vault, drift, service };
}
