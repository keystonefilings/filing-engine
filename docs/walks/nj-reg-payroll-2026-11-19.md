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
