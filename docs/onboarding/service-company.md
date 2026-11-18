# Service company onboarding (Scope 1)

Answered once by a filing service company when it subscribes to the platform. It sets up
the company's own accounts, people, channels, and the defaults its own customers start
from. Keystone answers this too, as one subscriber among others.

Logins and keys are never typed into this questionnaire. Each answer that needs one
names the account; the company's administrator enters the secret on the secure setup
screen or on its worker machine, where it is stored in the vault under the company's
own scope.

## S1. Company

| # | Question | Options / input |
|---|---|---|
| S1.1 | Legal name, display name for clients, logo | text, image |
| S1.2 | Support email and phone shown on approval pages | text |
| S1.3 | States you file in | NJ, NY (more as adapters are added) |
| S1.4 | Filing types you offer | formation, EIN, standing certificate (NJ), amendments, alternate name, NY paper filings |
| S1.5 | Administrator and staff users, with roles | admin · operator (starts and approves runs) · viewer |

## S2. Your state accounts

| # | Question | Options / input | Notes |
|---|---|---|---|
| S2.1 | NJ portal login (my.nj.gov business account) | account name; secret entered by the administrator | Used for all NJ runs unless a customer uses its own (C-G1). |
| S2.2 | NJ second sign-in step | none · text · email · authenticator app | An app needs its setup key in the vault; text/email need a person at sign-in. |
| S2.3 | NJ payment method stored on that account | card · eCheck | eCheck: your bank must allow debits from NJ Originator ID 1522077581 ("NJ Govt Services"). |
| S2.4 | ny.gov service-company login | account name; secret entered by the administrator | Required for NY online filings and NY paper uploads. |
| S2.5 | ny.gov second sign-in step | none · text · email · authenticator app | |
| S2.6 | NY drawdown (DD) account | account reference | NY fees are paid from it; the engine checks the balance before each run. |
| S2.7 | IRS third-party designee | your company name and contact for Form SS-4 | Needed for every EIN you apply for on a client's behalf. |

## S3. Your people and services

These fill the forms wherever a customer answers "the service company".

| # | Question | Input |
|---|---|---|
| S3.1 | Registered agent service you provide (NJ) | agent name, NJ street address, notice email |
| S3.2 | Registered agent you provide in NY (optional) | name, NY address |
| S3.3 | Service of process address you provide in NY | name, NY address |
| S3.4 | Organizer / incorporator name and address | person or company |
| S3.5 | NJ signer (Authorized Representative) | person's name |
| S3.6 | NY filer (receives the filing receipt) | name, address |
| S3.7 | Contact for state forms and state emails | first, last, phone, email |

## S4. Channels

Where approvals and status updates reach your staff and your customers.

| # | Question | Options |
|---|---|---|
| S4.1 | Your website / systems | API key(s) and webhook URL(s); events listed in the API reference |
| S4.2 | Email | sender address; email provider |
| S4.3 | Slack | workspace connection; channel for staff notices |
| S4.4 | WhatsApp | business number; provider |
| S4.5 | SMS | sending number; provider |
| S4.6 | Default approval channel for your customers | email · Slack · WhatsApp · SMS · your website (webhook) |

The engine sends signed webhooks today. Delivery through email, Slack, WhatsApp and SMS
is configured here and sent by the channel module, which is not built yet.

## S5. Defaults and locks for your customers

Every question in the customer questionnaire (`customer-firm.md`) can be given:

- **a default**, which is used when the customer does not answer; and
- **a lock**, which means your answer applies to every customer and they cannot change it.

Typical choices: lock registered agent to "the service company" if you sell that service;
default organizer to "the service company"; leave approvals to each customer.

## S6. Operations

| # | Question | Options |
|---|---|---|
| S6.1 | Where your filings run | your own worker machine with a fixed US IP (recommended, needed for IRS and NY) · platform-hosted worker |
| S6.2 | Dry-run period | number of filings, or until switched off, that stop before submission for your review |
| S6.3 | Data retention for filed documents | years |
| S6.4 | Who at your company handles a filing that needs reconciliation (possible double submit) | names and contact |

## How the answers are stored

S2 and S3 become the tenant settings (`TenantSettings`). S4 becomes `channels` and
`webhookEndpoints`. S5 becomes `customerPolicyDefaults` and `lockedCustomerPolicies`.
Secrets go to the vault under `<tenant>/<key>`.
