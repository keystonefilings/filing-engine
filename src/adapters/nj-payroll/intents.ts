import type { ScreenIntents } from "../../resolver/types.js";

/**
 * NJ payroll / employer registration (NJ-REG, online at njportal.com). One registration
 * covers UI/withholding and the many NJ tax registrations. No fee. The online wizard's
 * first screen (Business Identification) was walked live (docs/walks/nj-reg-payroll-2026-11-19.md);
 * the deeper screens are mapped from the authoritative NJ-REG form (REG-3 03/26) and gate
 * on a real NJ Entity ID + matching EIN, so the adapter is complete:false until the
 * fixed-IP walk with a sandbox entity confirms the online field names and sequence.
 * R required, O optional, C conditional.
 */
export const NJ_PAYROLL_SCREENS = {
  identification: { // LIVE: njportal /BusinessDetails (RegistrationType=Entity)
    screenKey: "nj.reg.entity.identification",
    title: "Business Identification",
    intents: [
      { key: "entityId", labels: ["Entity ID"], kinds: ["text"], required: true, note: "NJ Business/Corp number; looked up against the formation registry" },
      { key: "ein", labels: ["EIN"], kinds: ["text"], required: true, note: "9 digits, no dashes; must match the registry record for the Entity ID" },
    ],
    knownUnused: ["Back", "Cancel", "Need Entity ID?", "Need EIN Number?"],
  },
  registration: { // NJ-REG page 10
    screenKey: "nj.reg.registration",
    title: "Registration & Business Detail",
    intents: [
      { key: "reason", labels: ["reason for your filing", "Original application for a new business", "Applying for a Business Registration Certificate", "Withholding for Employee(s) residing in NJ"], kinds: ["checkbox", "radio"], required: true },
      { key: "legalName", labels: ["Name"], kinds: ["text"], required: true },
      { key: "tradeName", labels: ["Trade Name"], kinds: ["text"], required: false },
      { key: "businessStreet", labels: ["Business Location", "Street"], kinds: ["text"], required: true, note: "no PO box" },
      { key: "businessCity", labels: ["City"], kinds: ["text"], required: true },
      { key: "businessZip", labels: ["Zip Code"], kinds: ["text"], required: true },
      { key: "beginDate", labels: ["Beginning date for this business"], kinds: ["date", "text"], required: true },
      { key: "ownershipType", labels: ["Type of ownership", "NJ Corporation", "Sole Proprietor", "Partnership", "LLC (1065 Filer)", "LLC (1120 Filer)", "LLC (Single Member)", "S Corporation"], kinds: ["radio", "checkbox"], required: true },
      { key: "njBusinessCode", labels: ["New Jersey Business Code"], kinds: ["text", "select"], required: true, note: "Table A" },
      { key: "county", labels: ["County"], kinds: ["text", "select"], required: true },
      { key: "naics", labels: ["NAICS"], kinds: ["text", "select"], required: false },
      { key: "ownerName", labels: ["Name", "Last Name, First, MI"], kinds: ["text"], required: true, note: "repeating owners/officers" },
      { key: "ownerSSN", labels: ["Social Security Number"], kinds: ["text"], required: true, note: "SENSITIVE; per owner" },
      { key: "ownerTitle", labels: ["Title"], kinds: ["text"], required: true },
      { key: "ownerAddress", labels: ["Home Address"], kinds: ["text"], required: true },
    ],
  },
  employmentTax: { // NJ-REG page 11
    screenKey: "nj.reg.employment_tax",
    title: "Employment & Tax Information",
    intents: [
      { key: "payingWagesNext6Mo", labels: ["paying wages, salaries or commissions to employees working in New Jersey within the next 6 months?"], kinds: ["radio"], required: true, note: "the core payroll trigger" },
      { key: "firstWageDate", labels: ["Give date of first wage or salary payment"], kinds: ["date", "text"], required: false, note: "C: when payingWages=Yes" },
      { key: "firstHireDate", labels: ["Give date of hiring first NJ employee"], kinds: ["date", "text"], required: false },
      { key: "agriculturalEmployment", labels: ["Is your employment agricultural?"], kinds: ["radio"], required: false },
      { key: "householdEmployment", labels: ["Is your employment household?"], kinds: ["radio"], required: false },
      { key: "is501c3", labels: ["Are you a 501(c)(3) organization?"], kinds: ["radio"], required: false },
      { key: "subjectToFUTA", labels: ["subject to the Federal Unemployment Tax Act (FUTA)"], kinds: ["radio"], required: false },
      { key: "businessType", labels: ["Type of business", "Manufacturer", "Service", "Wholesale", "Construction", "Retail", "Government"], kinds: ["checkbox", "radio"], required: true },
    ],
  },
  salesAndOtherTaxes: { // NJ-REG page 12 (sales/use + special taxes + contact)
    screenKey: "nj.reg.sales_other_taxes",
    title: "Sales Tax & Other Registrations",
    intents: [
      { key: "collectSalesTax", labels: ["Will you collect New Jersey Sales Tax and/or pay Use Tax?"], kinds: ["radio"], required: true, note: "if Yes, exact date of first sale" },
      { key: "sellCigarettes", labels: ["Do you intend to sell cigarettes?"], kinds: ["radio"], required: false },
      { key: "contactPerson", labels: ["Contact Information", "Person"], kinds: ["text"], required: true },
      { key: "contactPhone", labels: ["Daytime Phone"], kinds: ["tel", "text"], required: true },
      { key: "contactEmail", labels: ["E-mail Address"], kinds: ["email", "text"], required: true },
      { key: "signature", labels: ["Signature of Owner, Partner or Officer"], kinds: ["text"], required: true, note: "typed-name signature" },
    ],
  },
} satisfies Record<string, ScreenIntents>;

/** NJ payroll registration has no filing fee. */
export const NJ_PAYROLL_FEE_USD = 0;
