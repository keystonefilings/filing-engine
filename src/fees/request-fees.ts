import type { FilingRequest } from "../domain/filing.js";
import { wantsPlainCopy } from "../domain/portal-intake.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import { flAccount, moAccount, njAccount } from "../settings/accounts.js";
import { filingKindOf } from "../settings/payments.js";
import { FeeUnknownError, type FeeOptions } from "./table.js";

/**
 * What a filing's state fees depend on, read from the request and the account the run will use.
 * The approval (FilingService.feesFor) and the pre-flight check price a filing the same way.
 */
export function feeOptionsFor(req: FilingRequest, tenant: TenantSettings, client: ClientCompanySettings): FeeOptions {
  const nj = req.state === "NJ" ? njAccount(tenant, client, filingKindOf(req)) : undefined;
  if (nj?.portalPaymentWithoutLogin) {
    throw new FeeUnknownError("this filing type is set to pay with the payment method saved in your NJ portal account, but no NJ login is connected: connect it in Setup, or pay this type with a saved card");
  }
  return {
    // The method the NJ, MO and FL adapters will pick on the account the run signs in with.
    paymentMethod: nj ? nj.feeMethod : req.state === "MO" ? moAccount(tenant, client).feeMethod : req.state === "FL" ? flAccount(tenant, client).feeMethod : undefined,
    certificateOfStanding: req.formation?.additionalCertificates.certificateOfStanding,
    certifiedCopy: req.formation?.additionalCertificates.certifiedCopy,
    plainCopy: wantsPlainCopy(req),
    entityType: req.standing?.entityType,
    floridaEntityType: req.formation?.floridaEntityType,
    nyEntityType: req.formation?.nyEntityType,
    njEntityType: req.formation?.njEntityType,
    stockShares: req.formation?.stockShares,
    stockParValueUsd: req.formation?.stockParValueUsd,
    documentCount: req.copyRequest?.documents.length,
  };
}
