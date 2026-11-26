import type { FieldIntent, ScreenIntents } from "../../resolver/types.js";

/**
 * NJ-REG, Online Business and Employer Registration (NJ Division of Revenue, njportal.com/DOR/BusinessRegistration),
 * from the walk of 2026-11-24 (docs/portal-maps/nj-reg.md), mapped end to end to the Review screen.
 * A guest wizard: no login, no fee. One registration covers the NJ tax registrations and the
 * employer (unemployment, disability, withholding) accounts. Labels are the wording seen on the walk;
 * fields a Yes or a checkbox reveals are optional intents the adapter waits for after the answer.
 */

const MAILING = "Mailing Address";

/** A US address in an owner dialog (Screen 6): the same block in both dialogs; only the open one is visible. */
const ownerAddress: FieldIntent[] = [
  { key: "street1", labels: ["Street Address 1"], kinds: ["text"], required: true },
  { key: "street2", labels: ["Street Address 2"], kinds: ["text"], required: false },
  { key: "city", labels: ["City"], kinds: ["text"], required: true },
  { key: "state", labels: ["State"], kinds: ["select"], required: true, note: "NJ, NY, PA, DE first, then every state, Puerto Rico, Foreign" },
  { key: "zip", labels: ["Zip Code"], kinds: ["text"], required: true, note: "5 digits + optional 4" },
  { key: "zipPlus", labels: ["Zip Code Extension", "Zip+4", "Plus 4"], kinds: ["text"], required: false },
];

/** Screen 9: the 17 Yes/No questions, keyed as the intake form keeps them (payroll.stateAnswers.tax.<key>). */
export const NJ_TAX_QUESTIONS: [string, string][] = [
  ["salesTax", "Collect NJ Sales Tax and/or pay Use Tax?"],
  ["exemptPurchases", "Exempt purchases for inventory or production?"],
  ["tobacco", "Sell or distribute cigarettes, tobacco or nicotine products?"],
  ["motorFuels", "Sales or transport of motor fuels and/or petroleum?"],
  ["petroleumStorage", "Storage of petroleum and/or hazardous chemicals?"],
  ["litter", "Manufacturer, wholesaler, distributor or retailer of litter-generating products?"],
  ["solidWasteFacility", "Operate a solid waste facility?"],
  ["solidWasteTransport", "Transport solid waste to an out-of-state site or rail transfer station?"],
  ["landfill", "Own or operate a sanitary landfill or solid waste facility in NJ?"],
  ["gasElectric", "Sell, store, deliver or transport natural gas or electricity in NJ?"],
  ["publicContractor", "Contractor or subcontractor to the state, public agencies, schools or casino licensees?"],
  ["vehicleRental", "Motor vehicle rental for 28 days or less?"],
  ["tiresVehicles", "Retail sale of new motor vehicle tires, or sell or lease motor vehicles?"],
  ["telecom", "Voice grade access or mobile telecommunications in NJ?"],
  ["lodging", "Hotel, motel, bed and breakfast or similar in NJ?"],
  ["gamesOfChance", "Legalized games of chance with any one prize over $1,000?"],
  ["millvilleDistrict", "Operating in the Sports and Entertainment District of Millville?"],
];

/** Screen 9 "Eligibility for any other New Jersey State Tax*" checkboxes. */
export const NJ_OTHER_TAXES = [
  "No other eligibility", "Alcoholic Beverage Tax", "Atlantic City Luxury Tax", "Cape May County Tourism Sales Tax",
  "Corporation Banking and Financial Business Tax", "Insurance Premiums Tax", "Landfill Closure and Contingency Tax",
  "Public Utility Franchise Tax", "Sanitary Landfill Tax", "Solid Waste Services Tax", "Transfer Inheritance and Estate Tax",
  "Unemployment and Disability Taxes", "Salem County Tax",
];

/** Screen 5/6/10 title list (owners and the contact). */
export const NJ_TITLES = [
  "Accountant", "Chairman", "Chief Operating Officer", "Co-Owner", "CPA", "Director", "ESQ.", "General Partner", "Incorporator",
  "Managing Member", "MBA", "MD", "Member", "Officer", "Other", "Owner", "PhD.", "Pres.", "Public Accountant", "Sec.", "Treas.", "Trustee", "VP",
];

export const NJ_PAYROLL_SCREENS = {
  /** Screen 0, /DOR/BusinessRegistration/: Get Started opens "IMPORTANT NOTICE! Did you file your Business Formation Application Online?" (Continue / Close). */
  welcome: { screenKey: "nj.reg.welcome", title: "Welcome to New Jersey's Online Business and Employer Registration Service", intents: [] },
  /** Screen 1, /Home/FirstStep. */
  start: {
    screenKey: "nj.reg.start",
    title: "Start Registration",
    intents: [
      { key: "registrationType", labels: ["Select one:", "Select one"], kinds: ["radio"], required: true, note: "option 1 (Business Entity) is selected by default; options 2 to 7 not walked past their first screen" },
    ],
  },
  /** Screen 2a, /BusinessDetails (option 1). */
  identification: {
    screenKey: "nj.reg.entity.identification",
    title: "Business Identification",
    intents: [
      { key: "entityId", labels: ["Entity ID"], kinds: ["text"], required: true, note: "NJ Business Entity ID from the formation filing" },
      { key: "ein", labels: ["EIN"], kinds: ["text"], required: true, note: "9 digits, no dashes; must match the entity record" },
    ],
    knownUnused: ["Need Entity ID?", "Need EIN Number?"],
  },
  /** Screen 3, /BusinessDetails/Data. Name and beginning date come from the entity record, read-only. */
  businessData: {
    screenKey: "nj.reg.business_data",
    title: "Business Data",
    intents: [
      { key: "businessName", labels: ["Business Name"], kinds: ["text"], required: false, note: "read-only, from the state's entity record" },
      { key: "beginDate", labels: ["Beginning Date for this Business in New Jersey"], kinds: ["text", "date"], required: false, note: "read-only, mm/dd/yyyy" },
      { key: "yearRound", labels: ["Will this be a year round business?"], kinds: ["radio"], required: true, note: "No (seasonal) not walked" },
      { key: "tradeName", labels: ["Trade Name (\"Doing Business As\" Name, if applicable)", "Trade Name"], kinds: ["select"], required: false, note: "the trade names already on file" },
    ],
  },
  /** Screen 4, /BusinessDetails/Address. County is filtered by the address, Municipality by the county. */
  businessAddress: {
    screenKey: "nj.reg.business_address",
    title: "Business Address",
    intents: [
      { key: "street1", labels: ["Street Address 1"], kinds: ["text"], required: true, note: "prefilled from the entity record, editable" },
      { key: "street2", labels: ["Street Address 2"], kinds: ["text"], required: false },
      { key: "state", labels: ["State"], kinds: ["select"], required: true },
      { key: "city", labels: ["City"], kinds: ["text"], required: true },
      { key: "county", labels: ["County"], kinds: ["select"], required: true },
      { key: "municipality", labels: ["Municipality"], kinds: ["select"], required: true },
      { key: "zip", labels: ["Zip Code"], kinds: ["text"], required: true },
      { key: "zipPlus", labels: ["Zip Code Extension", "Zip+4", "Plus 4"], kinds: ["text"], required: false },
      { key: "attention", labels: ["Attention To"], kinds: ["text"], required: true, note: "first field of the mailing block" },
      { key: "mailingDifferent", labels: ["Mailing Address is different from Business Location"], kinds: ["checkbox"], required: false },
    ],
    knownUnused: ["Enter an International Address."],
  },
  /** Screen 4, the mailing block the checkbox opens. */
  mailingAddress: {
    screenKey: "nj.reg.business_address#mailing",
    title: "Business Address: mailing address",
    intents: [
      { key: "street1", labels: ["Street Address 1"], kinds: ["text"], required: true, section: MAILING },
      { key: "street2", labels: ["Street Address 2"], kinds: ["text"], required: false, section: MAILING },
      { key: "city", labels: ["City"], kinds: ["text"], required: true, section: MAILING },
      { key: "state", labels: ["State"], kinds: ["select"], required: true, section: MAILING },
      { key: "zip", labels: ["Zip Code", "Zip"], kinds: ["text"], required: true, section: MAILING },
    ],
  },
  /** Screen 5, /Ownership. The ownership list follows the entity type; Single Member disables S corp and QSSS. */
  ownership: {
    screenKey: "nj.reg.ownership",
    title: "Ownership Type",
    intents: [
      { key: "ownershipType", labels: ["Ownership Type"], kinds: ["select"], required: true, note: "LLC: (1065 Filer), (1120 Filer), - Single Member" },
      { key: "fiscalMonth", labels: ["Last Month of Fiscal Year"], kinds: ["select"], required: false },
      { key: "subsidiary", labels: ["Is this business a subsidiary of another corporation?"], kinds: ["radio"], required: true },
      { key: "sCorp", labels: ["Has your business entity been approved as a Federal S Corporation, QSSS, or neither?"], kinds: ["radio"], required: true, note: "S corp / QSSS open an election block, not walked" },
    ],
  },
  /** Screen 6, /Ownership/Owners: table of owners; Add Individual Owner, Add Business Owner. */
  owners: { screenKey: "nj.reg.owners", title: "Owner Details", intents: [] },
  individualOwner: {
    screenKey: "nj.reg.owners#individual",
    title: "Add Individual Owner",
    intents: [
      { key: "firstName", labels: ["First Name"], kinds: ["text"], required: true },
      { key: "middleInitial", labels: ["Middle Initial"], kinds: ["text"], required: false },
      { key: "lastName", labels: ["Last Name"], kinds: ["text"], required: true },
      { key: "title", labels: ["Title"], kinds: ["select"], required: true },
      { key: "ssn", labels: ["Social Security Number"], kinds: ["text"], required: true, note: "SENSITIVE" },
      { key: "percent", labels: ["Percent of Ownership"], kinds: ["text", "number"], required: true },
      ...ownerAddress,
    ],
  },
  /** Seen in the page structure on the walk, not opened. */
  businessOwner: {
    screenKey: "nj.reg.owners#business",
    title: "Add Business Owner",
    intents: [
      { key: "businessName", labels: ["Business Name"], kinds: ["text"], required: true },
      { key: "ein", labels: ["Employer Identification Number"], kinds: ["text"], required: true, note: "not the registering business's EIN" },
      { key: "percent", labels: ["Percent of Ownership"], kinds: ["text", "number"], required: true },
      ...ownerAddress,
    ],
  },
  /** Screen 7, /BusinessClassification. Business code and NAICS are keyword autocompletes. */
  classification: {
    screenKey: "nj.reg.classification",
    title: "Business Classification",
    intents: [
      { key: "businessCode", labels: ["New Jersey Business Code"], kinds: ["text"], required: true, note: "\"consult\" offers 2754 (Service) - Consulting Services (All Types)" },
      { key: "principalProduct", labels: ["Principal Product or Service"], kinds: ["textarea", "text"], required: true, note: "400 characters" },
      { key: "typeOfActivity", labels: ["Type of Activity"], kinds: ["textarea", "text"], required: true, note: "400 characters" },
      { key: "sic", labels: ["Standard Industrial Code"], kinds: ["text"], required: false },
      { key: "naics", labels: ["NAICS Code"], kinds: ["text"], required: true },
      { key: "workers", labels: ["Number of Workers in New Jersey"], kinds: ["text", "number"], required: true },
    ],
    knownUnused: ["Find Business Code", "Find SIC Code", "Find NAICS Code"],
  },
  /** Screen 8, /Tax: Employment Activities, all Yes/No and required. */
  employment: {
    screenKey: "nj.reg.employment",
    title: "Employment Activities",
    intents: [
      { key: "acquiredPredecessor", labels: ["Acquired substantially all the assets, trade/business and/or employees of any previous employing units?"], kinds: ["radio"], required: true, note: "Yes not walked" },
      { key: "residentsOutsideNj", labels: ["Paying wages, salaries or commissions to NJ residents working outside NJ?"], kinds: ["radio"], required: true },
      { key: "pensionPayer", labels: ["Payer of pension or annuity income to NJ residents?"], kinds: ["radio"], required: true },
      { key: "multipleFacilities", labels: ["More than one employing facility in NJ?"], kinds: ["radio"], required: true },
      { key: "payingWages", labels: ["Paying wages, salaries, or commissions to employees working in NJ within the next 6 months?"], kinds: ["radio"], required: true },
      { key: "firstWageDate", labels: ["Date of first wage or salary payment"], kinds: ["text", "date"], required: false, note: "C: paying wages" },
      { key: "firstHireDate", labels: ["Date of hiring first New Jersey employee"], kinds: ["text", "date"], required: false },
      { key: "over1000Date", labels: ["Date cumulative gross payroll exceeds $1,000"], kinds: ["text", "date"], required: false },
      { key: "agricultural", labels: ["Is your employment agricultural?"], kinds: ["radio"], required: false },
      { key: "household", labels: ["Is your employment household?"], kinds: ["radio"], required: false },
      { key: "household1000Date", labels: ["Date when gross cash wages totaled $1,000 or more"], kinds: ["text", "date"], required: false, note: "C: household" },
      { key: "futa", labels: ["Subject to FUTA in the current or preceding calendar year?"], kinds: ["radio"], required: false },
      { key: "futaYear", labels: ["Indicate year you were subject to FUTA"], kinds: ["text", "number", "select"], required: false, note: "C: FUTA" },
      { key: "uiExempt", labels: ["Claims exemption from liability under the NJ Unemployment Compensation Law?"], kinds: ["radio"], required: false },
      { key: "uiExemptReason", labels: ["Explain why this employing unit claims exemption"], kinds: ["textarea", "text"], required: false, note: "C: exemption" },
      { key: "peo", labels: ["Is the company a PEO (Employee Leasing Company)?"], kinds: ["radio"], required: false },
    ],
  },
  /** Screen 9, /Tax/Activities: Taxable Business Activities. */
  taxableActivities: {
    screenKey: "nj.reg.taxable_activities",
    title: "Taxable Business Activities",
    intents: [
      ...NJ_TAX_QUESTIONS.map(([key, label]): FieldIntent => ({ key, labels: [label], kinds: ["radio"], required: true })),
      { key: "firstSaleDate", labels: ["Exact Date you expect to make the first sale"], kinds: ["text", "date"], required: false, note: "C: sales tax" },
      { key: "multipleSalesLocations", labels: ["More than one location in NJ that collects NJ Sales Tax?"], kinds: ["radio"], required: false, note: "C: sales tax" },
      ...NJ_OTHER_TAXES.map((label, i): FieldIntent => ({ key: `otherTax${i}`, labels: [label], kinds: ["checkbox"], required: false })),
    ],
  },
  /** Screen 10, /Contact. */
  contact: {
    screenKey: "nj.reg.contact",
    title: "Contact Information",
    intents: [
      { key: "name", labels: ["Contact Name"], kinds: ["text"], required: true },
      { key: "title", labels: ["Title"], kinds: ["select"], required: true },
      { key: "email", labels: ["Email Address"], kinds: ["email", "text"], required: true },
      { key: "confirmEmail", labels: ["Confirm Email Address"], kinds: ["email", "text"], required: false },
      { key: "dayPhone", labels: ["Daytime Phone"], kinds: ["tel", "text"], required: true },
      { key: "eveningPhone", labels: ["Evening Phone"], kinds: ["tel", "text"], required: false },
    ],
    knownUnused: ["Ext"],
  },
  /** Screen 11, /Review: FINAL. Complete Registration really registers the business. */
  review: {
    screenKey: "nj.reg.review",
    title: "Review",
    intents: [
      { key: "employmentAttest", labels: ["I confirm the 'Yes/No' answers above accurately reflect my employment activities"], kinds: ["checkbox"], required: true, note: "STOP: the client's own confirmation" },
      { key: "taxAttest", labels: ["I confirm the 'Yes/No' answers above accurately reflect my business activities that are subject to New Jersey taxes"], kinds: ["checkbox"], required: true, note: "STOP: the client's own confirmation" },
      { key: "gov2go", labels: ["Get free Text/Email Notifications for your State Tax returns"], kinds: ["checkbox"], required: false, note: "Gov2Go sign-up, ticked by default" },
      { key: "perjury", labels: ["I declare, under penalty of perjury, that to the best of my knowledge and belief, all the information provided in this registration is true, correct, and complete."], kinds: ["checkbox"], required: true, note: "STOP: the authorized representative's declaration" },
      { key: "signatureName", labels: ["Name of Authorized Representative"], kinds: ["text"], required: true, note: "STOP: typed signature" },
    ],
  },
} satisfies Record<string, ScreenIntents>;

/** NJ payroll registration has no filing fee. */
export const NJ_PAYROLL_FEE_USD = 0;
