# New firm onboarding: questions and settings

Every firm that signs up answers these questions before its first filing. The answers
become the firm's settings (`policies` on the firm's record). The engine applies them to
every filing for that firm, so a filing only needs the facts that change per entity.

Three rules apply to every question:

- **A value sent with a filing always wins.** "Decide for each entity" is how to say
  "no default". A firm can override any default on a single filing.
- **"Take it from our intake"** means the value comes from Keystone's intake form for that
  entity. The intake answers travel with the filing request (`intake` block).
- **If the setting points somewhere with no value, the filing is refused** at creation
  with a message saying which answer is missing. Nothing is guessed or left blank.

Option codes in brackets are the stored values.

## A. Firm profile

| # | Question | Options | Notes |
|---|---|---|---|
| A1 | Firm legal name, address, main contact, phone | free text | Used wherever "this firm" is chosen below. |
| A2 | States you will file in | NJ, NY (more later) | Limits which filings the firm can start. |
| A3 | How will you send filings? | Keystone dashboard, API, both | API firms get a key and webhook settings (A4). |
| A4 | Where should status updates go? | email address(es), webhook URL | Webhooks are signed. |
| A5 | Confirm you are authorized by your clients to have Keystone file for them | yes (required) | Recorded with date and person. |

## B. Approval before anything is filed (decision 2)

| # | Question | Options | Default if skipped |
|---|---|---|---|
| B1 | Who approves each filing before it is submitted? | this firm [`firm`] · the end client [`client`] · decide for each entity [`per_entity`] | refused until answered |
| B2 | Firm approvers | names + emails | required if B1 = firm |
| B3 | How do approvers receive the request? | email [`email`] · webhook to your system [`webhook`] | email |
| B4 | How long is an approval link valid? | 1 to 30 days | 7 days |
| B5 | Require a one-time code with the link? | yes · no | no |

"End client" uses the contact in Keystone's intake for that entity.

## C. Registered agent

| # | Question | Options | Drives | Notes |
|---|---|---|---|---|
| C1 | **NJ: who is the registered agent?** | Keystone's registered agent service [`keystone`] · this firm [`firm`] · the new LLC, through one of its members at an NJ address [`entity_member`] · decide for each entity [`per_entity`] · take it from our intake [`intake`] | NJ Registered Agent Information screen: name, email, NJ office address, attestation | NJ requires an NJ street address. Before offering "the new LLC itself", confirm it is allowed; many states do not let an entity be its own agent. The engine therefore uses a member with an NJ address. |
| C2 | NJ agent email for notices | agent's email · none | NJ "Registered Agent Email" (optional) | |
| C3 | **NY: where does the Secretary of State send legal papers?** (service of process address) | Keystone [`keystone`] · this firm [`firm`] · the new LLC's own address [`entity_address`] · decide for each entity [`per_entity`] · take it from our intake [`intake`] | NY Filing screen: service of process name and address | Required on every NY formation. |
| C4 | NY Secretary of State notice email | Keystone [`keystone`] · this firm [`firm`] · the client [`client`] | NY notice email + confirm | |
| C5 | NY: name a registered agent too? (optional in NY) | no [`none`] · Keystone [`keystone`] · this firm [`firm`] · decide for each entity [`per_entity`] | NY Registered Agent section | |

## D. Who signs and organizes

| # | Question | Options | Drives | Notes |
|---|---|---|---|---|
| D1 | **Who is the organizer / incorporator?** | Keystone as service company [`keystone`] · this firm [`firm`] · the client, an owner of the new entity [`client`] · decide for each entity [`per_entity`] · take it from our intake [`intake`] | NY Organizer name, address and signature | If the organizer is a company (Keystone or the firm), the NY opening statement box stays unchecked, per the NY rule. |
| D2 | **Who signs NJ filings?** | same as the organizer [`same_as_organizer`] · Keystone [`keystone`] · this firm [`firm`] · the client [`client`] · decide for each entity [`per_entity`] | NJ Signatures: signer name, title "Authorized Representative", signature box | The signature box means accepting the certificate and intending to execute the filing. The signer must be authorized to do that. |
| D3 | NY: who is the filer (receives the filing receipt)? | Keystone [`keystone`] · this firm [`firm`] · decide for each entity [`per_entity`] | NY Filer name and address | |

## E. Entity details

| # | Question | Options | Drives | Default if skipped |
|---|---|---|---|---|
| E1 | NJ: which members/managers are listed? | all owners from our intake [`intake`] · decide for each entity [`per_entity`] | NJ Members / Managers list | per entity |
| E2 | NY: management structure | member-managed · manager-managed · from intake · per entity | NY management radio | per entity |
| E3 | Main business address | this firm's office [`firm`] · the client's address from intake [`intake`] · per entity [`per_entity`] · leave blank where optional [`omit`] | NJ Main Business Address (optional); IRS address (required for an EIN) | per entity |
| E4 | NY county | firm's default county · from intake · per entity | NY county dropdown | per entity |
| E5 | Business purpose | general / any lawful purpose [`general`] · firm's standard text [`firm_text`] · from intake · per entity | NJ Business Purpose (300 characters, optional); NY purposes box | general |
| E6 | Effective date | upon filing · a date given per entity | NJ Effective Date; NY effective date radio | upon filing |
| E7 | Designator | LLC · L.L.C. · LIMITED LIABILITY COMPANY · per entity | NJ designator dropdown; NY name ending | LLC |
| E8 | If the name is taken | stop and ask [`stop`] · try the alternates given in intake, in order [`alternates`] | name check | stop |

## F. EIN (decision 1)

| # | Question | Options | Default |
|---|---|---|---|
| F1 | Get the EIN for new entities? | in the same run, after the name check passes [`in_run`] · after the state accepts the filing [`after_acceptance`] · no, the firm handles it [`none`] | refused until answered |
| F2 | Responsible party (needs SSN or ITIN) | from intake [`intake`] · per entity [`per_entity`] | intake |
| F3 | Third-party authorization (signed Form SS-4 designee) | Keystone collects by e-signature [`keystone_esign`] · firm uploads it [`firm_uploads`] | refused until answered |
| F4 | Accounting year closing month | 1 to 12 | 12 |

## G. State fees, payment, extras

| # | Question | Options | Notes |
|---|---|---|---|
| G1 | Who pays state fees? | Keystone pays on its company-wide NJ and NY accounts and bills the firm [`keystone_bills`] · the firm's own NJ login / NY drawdown account [`firm_account`] | Default: Keystone. The firm option stores the firm's account names; the login itself is typed into the vault by Keystone staff, never sent by chat or email. |
| G2 | How is the firm billed? | per filing · monthly · prepaid balance | |
| G3 | NJ formation extras | none · Certificate of Standing (+$50) · Certified Copy (+$25) · both · per entity | Plus card or eCheck service fees. |
| G4 | NJ free notifications (both pre-checked by NJ) | annual report reminders on/off · CorpWatch alerts on/off | Go to the contact in G5. |
| G5 | Contact printed on NJ payment page and used for state emails | Keystone [`keystone`] · this firm [`firm`] · the client [`client`] | |
| G6 | Default standing certificate | Short Form · Long Form with filing history · Long Form with officers | NJ charges by entity type: LLC $50, corporation $25 (2026-11-18). |

## H. After filing

| # | Question | Options |
|---|---|---|
| H1 | Who receives the filed documents and the EIN letter? | firm · client · both |
| H2 | NY publication requirement for new LLCs | Keystone's publication service · firm handles it · reminder only |
| H3 | Annual report reminders | Keystone reminds · firm handles |

## What the engine uses today

Applied automatically to every filing: B1-B5, C1-C5, D1-D3, E1-E7, F1-F2, F4, G1, G3-G6.
Stored for features not built yet: A3, A4 delivery choices beyond webhooks, E8 alternates,
F3, G2, H1-H3.
