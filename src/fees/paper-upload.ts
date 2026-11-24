import type { FilingRequest as FilingRequestT } from "../domain/filing.js";
import { FeeUnknownError, loadFeeTable, type FeeLine } from "./table.js";

const NYC_COUNTIES = new Set(["Bronx", "Kings", "New York", "Queens", "Richmond"]);
const CORPORATION_LAWS = new Set(["business_corporation", "not_for_profit_corporation", "religious_corporations", "education"]);

/**
 * Fees for a NY form uploaded through DOS E-Submission, from config/fees.json (NY.paper_upload):
 * the form's own fee, the county fees a corporation pays on a Certificate of Assumed Name (form
 * DOS-1338-f: $100 for each New York City county, $25 for each other county), the level of service
 * and any copies.
 */
export function paperUploadFees(req: FilingRequestT, table = loadFeeTable()): FeeLine[] {
  const u = req.paperUpload;
  if (req.state !== "NY" || !u) throw new FeeUnknownError("PDF upload filings are only priced for New York");
  const ny = table.NY as Record<string, any>;
  const entry = ny.paper_upload?.byEntityType?.[u.form];
  if (!entry) throw new FeeUnknownError(`NY/paper_upload price for ${u.form} has not been recorded yet`);
  const lines: FeeLine[] = [{ label: entry.label, amountUsd: entry.amountUsd }];
  if (u.form === "ny_assumed_name" && u.assumedName) {
    const law = u.assumedName.formedUnder;
    if (law === "other") throw new FeeUnknownError("the assumed name fee for an entity formed under another law has to be checked by staff");
    if (CORPORATION_LAWS.has(law)) {
      const counties = u.assumedName.counties === "all" ? (entry.allCounties as string[] | undefined) : u.assumedName.counties;
      if (!counties) throw new FeeUnknownError("the county list for an all-counties assumed name is missing from the fee table");
      const nyc = counties.filter((c) => NYC_COUNTIES.has(c)).length;
      const other = counties.length - nyc;
      if (nyc) lines.push({ label: `County fees, New York City (${nyc} x $${entry.nycCountyFee})`, amountUsd: nyc * entry.nycCountyFee });
      if (other) lines.push({ label: `County fees, outside New York City (${other} x $${entry.otherCountyFee})`, amountUsd: other * entry.otherCountyFee });
    }
  }
  const expedite = ny.expedite?.[u.levelOfService];
  if (typeof expedite !== "number") throw new FeeUnknownError(`level of service ${u.levelOfService} is not in the fee table`);
  if (expedite > 0) lines.push({ label: `Expedited handling (${u.levelOfService.replace("_", " ")})`, amountUsd: expedite });
  if (u.plainCopy && ny.copy) lines.push({ label: ny.copy.statutory.label, amountUsd: ny.copy.statutory.amountUsd });
  if (u.certifiedCopy && ny.certified_copy) lines.push({ label: ny.certified_copy.statutory.label, amountUsd: ny.certified_copy.statutory.amountUsd });
  return lines;
}
