# Customer onboarding: questions for each CPA, title company or payroll company

Answered by each customer firm when it signs up with a filing service company. In
Scope 1 the service company presents these questions in its own product, under its own
brand. In Scope 2, Keystone presents them in its front end.

"The service company" below means whichever company the firm signed up with: Keystone
for Keystone's customers, or another subscriber of the platform.

The service company decides how each question is shown (`docs/onboarding/service-company.md`, S5):

- **default:** pre-selected; used if the firm does not answer;
- **locked:** the service company's answer applies and the firm does not see the question.

Rules for every question:

- **A value sent with a filing always wins.** "Decide for each entity" means "no default".
- **"Take it from intake"** means the value comes from the service company's intake form
  for that entity (`intake` in the filing request).
- **If an answer points somewhere with no value, the filing is refused** at creation,
  with the question number. Nothing is guessed or left blank.

Codes in brackets are the stored values.

## A. Firm profile

| # | Question | Notes |
|---|---|---|
| A1 | Firm legal name, address, main contact, phone | Used wherever "this firm" is chosen below. |
| A2 | Firm users, and who may start filings | |
| A3 | How you will send filings | the service company's site/app · your own system through the API |
| A4 | Where status updates go | email · Slack · WhatsApp · SMS · webhook to your system |
| A5 | Confirm you are authorized by your clients to have filings made for them | required, recorded with date and person |

## B. Approval before anything is filed

| # | Question | Options | Default |
|---|---|---|---|
| B1 | Who approves each filing before it is submitted? | this firm [`firm`] · the end client [`client`] · decide for each entity [`per_entity`] | service company's default |
| B2 | Firm approvers | names + contact | required if B1 = firm |
| B3 | How approvers receive the request | email · Slack · WhatsApp · SMS · webhook | service company's default channel |
| B4 | How long an approval link is valid | 1 to 30 days | 7 days |
| B5 | Require a one-time code with the link | yes · no | no |

## C. Registered agent and service of process

| # | Question | Options | Drives |
|---|---|---|---|
| C1 | **NJ: who is the registered agent?** | the service company [`service_company`] · this firm [`firm`] · the new LLC itself, at its NJ address [`new_entity`] · one of the new LLC's members, at an NJ address [`entity_member`] · decide for each entity [`per_entity`] · take it from intake [`intake`] | NJ Registered Agent Information: name, email, NJ office address, attestation |
| C2 | NJ agent email for notices | the agent's email · none | NJ "Registered Agent Email" (optional) |
| C3 | **NY: where does the Secretary of State send legal papers?** | the service company [`service_company`] · this firm [`firm`] · the new LLC's own address [`entity_address`] · decide for each entity [`per_entity`] · take it from intake [`intake`] | NY service of process name and address (required) |
| C4 | NY Secretary of State notice email | the service company · this firm · the end client | NY notice email + confirm |
| C5 | NY: also name a registered agent? (optional in NY) | no [`none`] · the service company · this firm · decide for each entity | NY Registered Agent section |

NJ accepts the new LLC as its own registered agent (confirmed 2026-11-18). It needs an NJ
street address; a filing whose address is outside NJ is refused under C1.

## D. Who organizes and signs

| # | Question | Options | Drives |
|---|---|---|---|
| D1 | **Who is the organizer / incorporator?** | the service company [`service_company`] · this firm [`firm`] · the client, an owner of the new entity [`client`] · decide for each entity [`per_entity`] · take it from intake [`intake`] | NY Organizer name, address, signature |
| D2 | **Who signs NJ filings?** | same as the organizer [`same_as_organizer`] · the service company · this firm · the client · decide for each entity | NJ signer, title "Authorized Representative", signature box |
| D3 | NY filer (receives the filing receipt) | the service company · this firm · decide for each entity | NY Filer name and address |

If the organizer is a company, the NY opening statement box stays unchecked (NY rule).
The NJ signature box means accepting the certificate and intending to execute the
filing; the signer must be authorized to do that.

## E. Entity details

| # | Question | Options | Drives |
|---|---|---|---|
| E1 | NJ: which members/managers are listed | all owners from intake [`intake`] · decide for each entity [`per_entity`] | NJ Members / Managers |
| E2 | NY management structure | member-managed · manager-managed · from intake · per entity | NY management |
| E3 | Main business address | this firm's office [`firm`] · the client's address from intake [`intake`] · per entity · leave blank where optional [`omit`] | NJ Main Business Address (optional); IRS address (required for an EIN) |
| E4 | NY county | firm's default county · from intake · per entity | NY county |
| E5 | Business purpose | general / any lawful purpose · firm's standard text · from intake · per entity | NJ purpose (300 characters); NY purposes |
| E6 | Effective date | upon filing · a date given per entity | NJ and NY effective date |
| E7 | Designator | LLC · L.L.C. · LIMITED LIABILITY COMPANY · per entity | NJ designator; NY name ending |
| E8 | If the name is taken | stop and ask [`stop`] · try the alternates in intake, in order [`alternates`] | name check |

## F. EIN

| # | Question | Options |
|---|---|---|
| F1 | Get the EIN for new entities? | in the same run, after the name check passes [`in_run`] · after the state accepts the filing [`after_acceptance`] · no, we handle it [`none`] |
| F2 | Responsible party (needs SSN or ITIN) | from intake · per entity |
| F3 | Third-party authorization (signed Form SS-4 designee) | the service company collects it by e-signature · this firm uploads it |
| F4 | Accounting year closing month | 1 to 12 (default 12) |

## G. Accounts, fees and extras

| # | Question | Options | Notes |
|---|---|---|---|
| G1 | **Which state accounts do your filings use?** | the service company's accounts, fees billed to you [`service_company_account`] · your own NJ login and NY drawdown account [`own_account`] | With your own: you name the accounts here; the secrets are entered on the secure setup screen, never by chat or email. |
| G2 | How you are billed | per filing · monthly · prepaid balance | |
| G3 | NJ formation extras | none · Certificate of Standing (+$50) · Certified Copy (+$25) · both · per entity | plus card $2 / eCheck $1 service fee each |
| G4 | NJ free notifications (pre-checked by NJ) | annual report reminders on/off · CorpWatch alerts on/off | |
| G5 | Contact on state forms and for state emails | the service company · this firm · the end client | |
| G6 | Default NJ standing certificate | Short Form · Long Form with filing history · Long Form with officers | NJ charges by entity type: LLC $50, corporation $25 |

## H. After filing

| # | Question | Options |
|---|---|---|
| H1 | Who receives filed documents and the EIN letter | this firm · the end client · both |
| H2 | NY publication requirement for new LLCs | the service company's publication service · this firm handles it · reminder only |
| H3 | Annual report reminders | the service company reminds · this firm handles it |

## What the engine applies today

Applied to every filing: B1, B2, B4, B5, C1-C5, D1-D3, E1-E7, F1, F2, F4, G1, G3-G6.
Stored for features not built yet: A2-A4, B3 delivery channels, E8 alternates, F3, G2,
H1-H3.
