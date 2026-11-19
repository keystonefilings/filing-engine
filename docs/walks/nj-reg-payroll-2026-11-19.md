# NJ-REG (Online Business and Employer Registration) recon walk, 2026-11-19

Recon only. Nothing was submitted, registered or paid. Only fake values were typed
(Entity ID 0100999999, EIN 123456789). Raw inventory dumps (inventory.browser.js output) are in
`/tmp/claude-0/-home-user-filing-engine/001f8f60-2378-575f-86d0-74afbbbe1129/scratchpad/nj-reg-*.json`.

## Verdict: PARTIAL. Entry reachable live, but the flow is gated by a registry lookup that fake data cannot pass.
Live capture stops after the first identification screen. Public-form fallback was blocked by the network allowlist.

## Reachability per URL
| URL | Result |
|---|---|
| https://www.njportal.com/DOR/BusinessRegistration/ | ok (200, "State of New Jersey Online Tax/Employer Registration"), no sign-in, no bot wall |
| https://www.njportal.com/DOR/BusinessRegistration/Home/Welcome | not a route (njportal Error Page). The welcome page is the root URL |
| https://www.njportal.com/ | ok |
| https://www.njportal.com/DOR/BusinessRegistration/Document | ok (Retrieve Documents) |
| https://www.nj.gov/treasury/revenue/ and /rev-reg.shtml | ENV BLOCK: `ERR_TUNNEL_CONNECTION_FAILED` (browser), `ENOTFOUND` (WebFetch) |
| https://nj.accessgov.com/dores/Forms/Page/dores/registrationhelp/ (Help/FAQ) | ENV BLOCK: `ENOTFOUND` |

Hosts to allowlist: **www.nj.gov** and **nj.accessgov.com**. These are the NJ-REG packet/instructions and Help/FAQ hosts, needed for the public-form fallback.
Also linked but not tried: www.state.nj.us (NJ business code PDF), www.census.gov (NAICS).

## Flow overview
No login, no fee displayed anywhere reached. Server-side wizard (ASP.NET MVC), plain POST forms.
The stepper (top nav) differs per registration type:
- Entity / Partner-or-Proprietor / Domestic employer: Business (or Employer) Information, Ownership Information, Business (or Employer) Classification, Employment & Tax Information (entity and proprietor only), Contact Information, Review.
- Foreign employer / state contractor: Business Information, Ownership Information, Business Classification, Contact Information, Review.
- Remote seller: Business Information, Tax Information, Contact Information, Review.
- Renter (transient accommodations): Personal Information, Rental Property Information, Tax Information, Contact Information, Review.
The first step has sub-tabs: Business Identification, Business Data, Business Address.

Nothing past Business Identification was seen. The screens below marked UNVERIFIED are only stepper names, with no field data.

## Field map (intents shape)
Status per screen: LIVE = captured with inventory.browser.js; STEPPER-ONLY = name seen, fields not captured.

```ts
export const NJ_REG_SCREENS = {
  welcome: {            // LIVE  /DOR/BusinessRegistration/
    screenKey: "nj.reg.welcome",
    title: "Welcome to New Jersey's Online Business and Employer Registration Service",
    intents: [
      { key: "getStarted", labels: ["Get Started"], kinds: ["button"], required: true, note: "type=button; opens #alertModal (not a navigation). Also: Menu, Close" },
      { key: "formationNoticeContinue", labels: ["Continue"], kinds: ["button"], required: true, note: "in #alertModal 'Did you file your Business Formation Application Online?'; name=continueButton; GETs/POSTs to /Home/FirstStep. Entity must already be formed" },
    ],
    knownUnused: ["Menu", "Close", "Help", "Retrieve Documents", "Online Formations", "FAQs"],
  },
  startRegistration: {  // LIVE  /Home/FirstStep
    screenKey: "nj.reg.start",
    title: "Start Registration",
    intents: [
      { key: "registrationType", labels: ["Select one", "Required Fields [ * ]"], kinds: ["radio"], required: true,
        note: "name=RegistrationType. values: Entity | PartnerOrProprietor | ForeignStateContractor | ForeignEmployer | Renter | RemoteSeller | DomesticEmployer. Labels: 'Register a Business Entity (For-Profit Corporations, Non-Profit Corporations, Limited Partnerships, Limited Liability Companies and Limited Liability Partnerships)'; 'Register a General Partnership or Proprietorship'; 'Register as an Individual contracting with a NJ State or Local Government Agency'; 'Register a non-New Jersey Business Entity with employees residing in New Jersey'; 'Register as an Individual solely for Transient Accommodations'; 'Register as Remote Seller only'; 'Register as a Domestic/Household Employer'" },
      { key: "certifyIndividualOrOutOfState", labels: ["I certify that I am an individual having no business tax or employer obligations", "I am registering an out-of-state business for the sole purpose of withholding payroll taxes"], kinds: ["checkbox"], required: true,
        note: "C: required text, shown only for ForeignStateContractor / ForeignEmployer (hidden for other types). A legal certification, NOT clicked in this walk. Two sentences in one label (state contractor vs payroll-only foreign employer)" },
      { key: "continue", labels: ["Continue"], kinds: ["button"], required: true, note: "name=continueButton" },
    ],
  },
  // ---- Entity path (payroll for an NJ-formed LLC/corp): ----
  entityIdentification: { // LIVE  /BusinessDetails (RegistrationType=Entity)
    screenKey: "nj.reg.entity.identification",
    title: "Business Identification",
    intents: [
      { key: "entityId", labels: ["Entity ID"], kinds: ["text"], required: true, note: "name=EntityId, maxlength 10. Looked up against the NJ formation registry; 'Need Entity ID?' link. Changing it later wipes everything entered so far" },
      { key: "ein", labels: ["EIN"], kinds: ["text"], required: true, note: "name=EmployerIdentificationNumber, maxlength 9, digits only (dashes rejected: 'Must be 9 digits'). Label asterisk is in the text; no required attr. Must match the registry record for the Entity ID" },
      { key: "continue", labels: ["Continue"], kinds: ["button"], required: true },
    ],
    knownUnused: ["Back", "Cancel", "Need Entity ID?", "Need EIN Number?"],
  },
  entityBusinessData:      { screenKey: "nj.reg.entity.business_data",      title: "Business Data (sub-tab)",    intents: [] }, // STEPPER-ONLY, behind registry gate
  entityBusinessAddress:   { screenKey: "nj.reg.entity.business_address",   title: "Business Address (sub-tab)", intents: [] }, // STEPPER-ONLY
  entityOwnership:         { screenKey: "nj.reg.entity.ownership",          title: "Ownership Information",      intents: [] }, // STEPPER-ONLY
  entityClassification:    { screenKey: "nj.reg.entity.classification",     title: "Business Classification",    intents: [] }, // STEPPER-ONLY (welcome page says NJ Business Code and NAICS are needed)
  entityEmploymentTax:     { screenKey: "nj.reg.entity.employment_tax",     title: "Employment & Tax Information", intents: [] }, // STEPPER-ONLY (payroll registration lives here)
  entityContact:           { screenKey: "nj.reg.entity.contact",            title: "Contact Information",        intents: [] }, // STEPPER-ONLY
  entityReview:            { screenKey: "nj.reg.entity.review",             title: "Review",                     intents: [] }, // STEPPER-ONLY; HARD STOP (submits)
  // ---- General partnership / proprietorship ----
  proprietorIdentification: { // LIVE  /BusinessDetails (PartnerOrProprietor)
    screenKey: "nj.reg.proprietor.identification",
    title: "Business Identification",
    intents: [
      { key: "hasEmployees", labels: ["Will you have employees?"], kinds: ["radio"], required: true, note: "name=HasEmployees, options Yes / No; choice swaps the identifier field below" },
      { key: "ein", labels: ["EIN"], kinds: ["text"], required: false, note: "C: shown when HasEmployees=Yes (live-validated 'Required'). name=EmployerIdentificationNumber. Fake EIN 123456789 rejected: 'Please check the EIN... contact Business Registration Services at (609) 292-9292'" },
      { key: "ssn", labels: ["Social Security Number"], kinds: ["text"], required: false, note: "C: shown when HasEmployees=No (alongside EIN field). name=SocialSecurity. Hint '***Do not use employees SSN'. Not tested (no fake SSN used)" },
      { key: "continue", labels: ["Continue"], kinds: ["button"], required: true },
    ],
    knownUnused: ["Back", "Cancel", "Need EIN Number?"],
  },
  // ---- Domestic/household employer ----
  domesticIdentification: { // LIVE  (DomesticEmployer)
    screenKey: "nj.reg.domestic.identification",
    title: "Employer Identification",
    intents: [
      { key: "ein", labels: ["EIN"], kinds: ["text"], required: false, note: "name=EmployerIdentificationNumber; EIN or SSN ('Or')" },
      { key: "ssn", labels: ["Social Security Number"], kinds: ["text"], required: false, note: "name=SocialSecurity; '***Do not use employees SSN'" },
      { key: "continue", labels: ["Continue"], kinds: ["button"], required: true },
    ],
  },
  // ---- Remote seller ----
  remoteSellerIdentification: { // LIVE  (RemoteSeller)
    screenKey: "nj.reg.remote.identification",
    title: "Business Identification",
    intents: [
      { key: "hasNjEmployees", labels: ["Does your business have employees in New Jersey?"], kinds: ["radio"], required: true, note: "name=HasEmployees Yes/No" },
      { key: "sellToPublicAgencies", labels: ["Do you intend to contract with and sell goods to public agencies in New Jersey?"], kinds: ["radio"], required: true, note: "name=SellGoods Yes/No" },
      { key: "continue", labels: ["Continue"], kinds: ["button"], required: true },
    ],
  },
  // ---- Renter (transient accommodations) ----
  renterIdentification: { // LIVE  (Renter)
    screenKey: "nj.reg.renter.identification",
    title: "Personal Identification",
    intents: [
      { key: "ssn", labels: ["Social Security Number"], kinds: ["text"], required: false, note: "name=SocialSecurity; '***Do not use employees SSN'; SSN or EIN ('Or')" },
      { key: "ein", labels: ["Employer Identification Number"], kinds: ["text"], required: false, note: "name=EmployerIdentificationNumber" },
      { key: "continue", labels: ["Continue"], kinds: ["button"], required: true },
    ],
  },
  // ForeignEmployer / ForeignStateContractor: first screen is the certification checkbox on startRegistration; NOT advanced (would require attesting). Later screens not seen.
  // Retrieve Documents (LIVE /Document): Access Key (name=LookUpId, text) + "Retrieve Documents" button; key comes from the confirmation email. Post-filing only.
} satisfies Record<string, ScreenIntents>;
```

## Fees
None displayed on any screen reached (prices array empty on all dumps). Review/confirmation screens were not reached, so no fee data either way. Mark fee behavior as V.

## Quirks
- The welcome "Get Started" is a modal gate, not a link. The Continue inside it is `name=continueButton` in `#alertModal`; the page also has a hidden Continue and Close, so match within the modal.
- RegistrationType radio group has no legend; label comes from nearby text ("Required Fields [ * ]"). Match by value attribute or option text.
- The type decides the whole wizard (different stepper and different first screen). The adapter must branch on it.
- Identification fields are validated server-side at Continue against live registry data. Errors appear inline in the page text ("Must be 9 digits", "Please check the EIN..."), not as alerts.
- Required markers are asterisks inside label text, with no `required` attribute. The Entity path's EIN is flagged required only by the label text, so inventory.browser.js reports `required:false` there (asterisk is mid-label, not trailing). The adapter should set required explicitly.
- EIN field is digits only, maxlength 9. Do not send "12-3456789".
- Changing Entity ID later discards entered data.
- Direct deep links (e.g. /OwnershipInformation) bounce to the root or an error page; screens must be reached by walking.
- The entity must already exist in NJ's formation registry. A newly formed LLC may not be searchable immediately (the page links the Online Formations app for new entities).

## Blocked / not mapped
1. Entity path past Business Identification (Business Data, Business Address, Ownership, Classification, Employment & Tax, Contact, Review): needs a real NJ Entity ID plus its matching EIN. Fake data cannot pass the lookup, and real data is off limits for this recon. Needs either an authorized sandbox entity, or the NJ-REG packet.
2. Proprietor path past identification (same EIN/SSN validation).
3. Foreign employer / contractor path (certification attestation not clicked).
4. Public NJ-REG packet and instructions: blocked by the allowlist (www.nj.gov). Once www.nj.gov and nj.accessgov.com are allowed, rerun the WebFetch fallback for the full field list, including the payroll (NJ-927/WR-30, unemployment, TDI) and sales tax sections.

## Hard stop
Never clicked anything on a Review screen or any submit-type control; none reached.

---

## Authoritative field map from the NJ-REG form (REG-3, 03/2026) — fetched 2026-11-19
The deeper screens the live walk could not pass (behind the Entity ID registry gate) are
mapped here from the official NJ-REG Business Registration Application and its page 6-8
instructions, fetched this session from https://www.nj.gov/treasury/revenue/pdf/Legacy-Reg-Form.pdf
(pages 10-12 are the form; "NO FEE REQUIRED"). The njportal online wizard collects the same
data across its stepper (Business Identification/Data/Address -> Ownership -> Classification ->
Employment & Tax -> Contact -> Review); exact online field names/sequence still need the
fixed-IP walk with a real Entity ID, so the adapter stays complete:false.

```ts
export const NJ_REG_FORM = {
  registration: { // NJ-REG page 10, "Registration Detail" + "Business Detail"
    screenKey: "nj.reg.registration",
    title: "Business Registration Application",
    intents: [
      { key: "reason", labels: ["Please indicate the reason for your filing", "Original application for a new business", "Moved previously registered business", "Amended application", "Application for an additional location", "Applying for a Business Registration Certificate", "Withholding for Employee(s) residing in NJ"], kinds: ["checkbox", "radio"], required: true },
      { key: "amendReason", labels: ["Reason(s) for amending application"], kinds: ["text"], required: false, note: "C: when reason = Amended" },
      { key: "fein", labels: ["FEIN #"], kinds: ["text"], required: false, note: "FEIN OR owner SSN; checkbox 'Applied for'. From our EIN sub-run when einMode=in_run" },
      { key: "feinAppliedFor", labels: ["Check Box if “Applied for”"], kinds: ["checkbox"], required: false },
      { key: "ownerSSN", labels: ["Social Security # of Owner"], kinds: ["text"], required: false, note: "SENSITIVE; C: sole proprietor without FEIN" },
      { key: "legalName", labels: ["Name"], kinds: ["text"], required: true, note: "entity name for Corp/LLC/LLP/LP/Non-Profit, else owner/partners" },
      { key: "tradeName", labels: ["Trade Name"], kinds: ["text"], required: false },
      { key: "businessStreet", labels: ["Business Location", "Street"], kinds: ["text"], required: true, note: "no PO box; 9-digit zip" },
      { key: "businessCity", labels: ["City"], kinds: ["text"], required: true },
      { key: "businessState", labels: ["State"], kinds: ["select", "text"], required: true },
      { key: "businessZip", labels: ["Zip Code"], kinds: ["text"], required: true },
      { key: "mailingName", labels: ["Mailing Name and Address", "Name"], kinds: ["text"], required: false, note: "C: if different from business location" },
      { key: "mailingStreet", labels: ["Street"], kinds: ["text"], required: false },
      { key: "beginDate", labels: ["Beginning date for this business"], kinds: ["date", "text"], required: true, note: "mm/dd/yyyy" },
      { key: "ownershipType", labels: ["Type of ownership", "NJ Corporation", "Sole Proprietor", "Partnership", "Out-of-State Corporation", "LLP", "Limited Partnership", "LLC (1065 Filer)", "LLC (1120 Filer)", "LLC (Single Member)", "S Corporation", "Domestic (Household Employer)", "Other"], kinds: ["radio", "checkbox"], required: true },
      { key: "njBusinessCode", labels: ["New Jersey Business Code"], kinds: ["text", "select"], required: true, note: "Table A; completing it avoids Certificate-of-Authority delays" },
      { key: "countyMunicipalityCode", labels: ["County/Municipality Code"], kinds: ["text", "select"], required: true, note: "Table B" },
      { key: "county", labels: ["County"], kinds: ["text", "select"], required: true, note: "NJ only" },
      { key: "seasonal", labels: ["Will this business be SEASONAL?"], kinds: ["radio"], required: false, note: "Yes/No; if Yes, which months" },
      { key: "incorporationDate", labels: ["Date of Incorporation"], kinds: ["date", "text"], required: false, note: "C: entity (Item C)" },
      { key: "stateOfIncorporation", labels: ["State of Incorporation"], kinds: ["select", "text"], required: false, note: "C: entity" },
      { key: "fiscalMonth", labels: ["Fiscal Month"], kinds: ["text", "select"], required: false, note: "C: entity" },
      { key: "njBusinessNumber", labels: ["NJ Business/Corp.#"], kinds: ["text"], required: false, note: "C: entity; the Entity ID the online flow gates on" },
      { key: "isSubsidiary", labels: ["Is this a Subsidiary of another corporation?"], kinds: ["radio"], required: false, note: "C: entity; if Yes, parent name + Federal ID" },
      { key: "sicCode", labels: ["Standard Industrial Code"], kinds: ["text"], required: false },
      { key: "naics", labels: ["NAICS"], kinds: ["text", "select"], required: false, note: "Table C" },
      // P. Owners/partners/responsible officers (repeating; 4 rows + rider)
      { key: "ownerName", labels: ["Name", "Last Name, First, MI"], kinds: ["text"], required: true, note: "repeating" },
      { key: "ownerSSNRow", labels: ["Social Security Number"], kinds: ["text"], required: true, note: "SENSITIVE; repeating per owner" },
      { key: "ownerTitle", labels: ["Title"], kinds: ["text"], required: true },
      { key: "ownerAddress", labels: ["Home Address"], kinds: ["text"], required: true },
      { key: "ownerPercent", labels: ["Percent of Ownership"], kinds: ["text", "number"], required: false },
    ],
  },
  employmentTax: { // NJ-REG page 11, "Each Question Must Be Answered Completely" (Q1-10)
    screenKey: "nj.reg.employment_tax",
    title: "Employment & Tax Information",
    intents: [
      { key: "payingWagesNext6Mo", labels: ["Have you or will you be paying wages, salaries or commissions to employees working in New Jersey within the next 6 months?"], kinds: ["radio"], required: true, note: "Yes/No; the core payroll trigger" },
      { key: "firstWageDate", labels: ["Give date of first wage or salary payment"], kinds: ["date", "text"], required: false, note: "C: when payingWages=Yes (UI/disability)" },
      { key: "firstHireDate", labels: ["Give date of hiring first NJ employee"], kinds: ["date", "text"], required: false, note: "C" },
      { key: "payrollExceeds1000Date", labels: ["Date cumulative gross payroll exceeds $1,000"], kinds: ["date", "text"], required: false, note: "C" },
      { key: "wagesToNJResidentsOutside", labels: ["Will you be paying wages, salaries or commissions to New Jersey residents working outside New Jersey?"], kinds: ["radio"], required: false },
      { key: "payerOfPension", labels: ["Will you be the payer of pension or annuity income to New Jersey residents?"], kinds: ["radio"], required: false },
      { key: "gamesOfChance", labels: ["Will you be holding legalized games of chance"], kinds: ["radio"], required: false },
      { key: "isPEO", labels: ["Is this business a PEO (Employee Leasing Company)?"], kinds: ["radio"], required: false },
      { key: "acquired", labels: ["Did you acquire", "Substantially all the assets", "Trade or business", "Employees"], kinds: ["checkbox", "radio"], required: false, note: "Q2; if Yes: whole/part, acquired unit name, NJ Employer ID, address, date, % (assets/trade/employees)" },
      { key: "sameInterests", labels: ["Are the predecessor and successor units owned or controlled by the same interests?"], kinds: ["radio"], required: false },
      { key: "agriculturalEmployment", labels: ["Is your employment agricultural?"], kinds: ["radio"], required: false },
      { key: "householdEmployment", labels: ["Is your employment household?"], kinds: ["radio"], required: false, note: "if Yes, date quarter gross cash wages totaled $1,000+" },
      { key: "is501c3", labels: ["Are you a 501(c)(3) organization?"], kinds: ["radio"], required: false, note: "if Yes, use REG-1E" },
      { key: "subjectToFUTA", labels: ["Were you subject to the Federal Unemployment Tax Act (FUTA) in the current or preceding year?"], kinds: ["radio"], required: false, note: "if Yes, indicate year" },
      { key: "claimUIExemption", labels: ["Does this employing unit claim exemption from liability for contributions under the Unemployment Compensation Law"], kinds: ["radio"], required: false },
      { key: "businessType", labels: ["Type of business", "Manufacturer", "Service", "Wholesale", "Construction", "Retail", "Government"], kinds: ["checkbox", "radio"], required: true, note: "Q9; + principal product/service and type of activity (NJ only)" },
      { key: "multipleFacilities", labels: ["Do you have more than one employing facility in New Jersey?"], kinds: ["radio"], required: false, note: "Q10; + NJ Work Locations table (address, county, NAICS, product/service, %, #workers)" },
    ],
  },
  salesAndOtherTaxes: { // NJ-REG page 12, Q11-23 (sales/use + special taxes) + Q24 contact
    screenKey: "nj.reg.sales_other_taxes",
    title: "Sales Tax & Other Registrations",
    intents: [
      { key: "collectSalesTax", labels: ["Will you collect New Jersey Sales Tax and/or pay Use Tax?"], kinds: ["radio"], required: true, note: "Q11a; if Yes, exact date of first sale" },
      { key: "exemptPurchases", labels: ["Will you need to make exempt purchases"], kinds: ["radio"], required: false },
      { key: "sellCigarettes", labels: ["Do you intend to sell cigarettes?"], kinds: ["radio"], required: false, note: "Q12 (CM-100)" },
      { key: "tobaccoDistributor", labels: ["Are you a distributor or wholesaler of tobacco or nicotine products"], kinds: ["radio"], required: false, note: "Q13" },
      { key: "litterProducts", labels: ["Are you a manufacturer, wholesaler, distributor or retailer of “litter-generating products”?"], kinds: ["radio"], required: false, note: "Q14" },
      { key: "sanitaryLandfill", labels: ["Are you an owner or operator of a sanitary landfill facility in New Jersey?"], kinds: ["radio"], required: false, note: "Q15" },
      { key: "petroleumStorage", labels: ["Do you operate a facility that has the total combined capacity to store 200,000 gallons or more of petroleum products?"], kinds: ["radio"], required: false, note: "Q16-17" },
      { key: "publicContractor", labels: ["Will you be providing goods and services as a direct contractor or subcontractor to the State"], kinds: ["radio"], required: false, note: "Q18" },
      { key: "rentMotorVehicles", labels: ["Will you be engaged in the business of renting motor vehicles"], kinds: ["radio"], required: false, note: "Q19" },
      { key: "transientAccommodations", labels: ["Is your business a hotel, motel, bed & breakfast"], kinds: ["radio"], required: false, note: "Q20" },
      { key: "millvilleDistrict", labels: ["Will this business be operating in the Sports and Entertainments District of Millville"], kinds: ["radio"], required: false, note: "Q21" },
      { key: "motorVehicleTires", labels: ["Do you make retail sales of new motor vehicle tires, or sell or lease motor vehicles?"], kinds: ["radio"], required: false, note: "Q22" },
      { key: "telecom", labels: ["Do you sell voice grade access telecommunications"], kinds: ["radio"], required: false, note: "Q23" },
      // Q24 contact + signature
      { key: "contactPerson", labels: ["Contact Information", "Person"], kinds: ["text"], required: true },
      { key: "contactTitle", labels: ["Title"], kinds: ["text"], required: true },
      { key: "contactPhone", labels: ["Daytime Phone"], kinds: ["tel", "text"], required: true },
      { key: "contactEmail", labels: ["E-mail Address"], kinds: ["email", "text"], required: true },
      { key: "signature", labels: ["Signature of Owner, Partner or Officer"], kinds: ["text", "signature"], required: true },
      { key: "signatureDate", labels: ["Date"], kinds: ["date", "text"], required: true },
    ],
  },
} satisfies Record<string, ScreenIntents>;
```

Notes:
- **No fee** to file NJ-REG. Sole proprietors/partnerships with no employees "STOP HERE" after Q24; employers continue to the New Hire Reporting form (packet p.29).
- SSNs appear in Registration B (owner SSN) and Part P / Q-rows (owners/officers) — sensitive; mask everywhere and never store in reusable defaults.
- `njBusinessNumber` (Entity ID) is what the online flow's first screen gates on, so the online path needs a real, already-formed entity in the registry.
- Form fetched: https://www.nj.gov/treasury/revenue/pdf/Legacy-Reg-Form.pdf (REG-3 03/2026; also contains the Taxes of NJ overview and NJ-REG page 6-8 instructions).
