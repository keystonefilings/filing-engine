# Copy review, Nov 26 (V44)

Twenty separate reviewers each read every page, form, email and the approval page as a different reader (CPA firm owner, payroll operations, fractional CFO, title closer, API developer, AI agent builder, a client approving on a phone, first-time founder, paralegal, in-house counsel, security officer, accessibility specialist, Spanish-first owner, older owner, conversion copywriter, brand editor, forms UX writer, SEO, a skeptical switcher, enterprise procurement). They returned 599 findings; one merge kept the best 150 changes and listed 19 decisions only the owner can make.

**Applied:** 148 of the 150 changes (263 edits in 40 files), checked by the full test suites and in the browser. Two were held for a decision: the NY corporation tax note (the walk showed $0 where the statute has a $10 minimum) and removing Missouri from the EIN form. The coverage table was also brought up to date with the filings built since the review (V13, V14), and the approval page now shows plain labels instead of field paths.

## What the reviewers found most

- Coverage is overstated and unclear: no page says plainly which filing types file for real today. "Verified on the live site" reads as live, and "mapped from a live walk" is undefined. Filings the portal sells are listed as planned or missing (NJ-REG, Authority, Assumed Name), and Missouri and standing certificates appear without support.
- Cost is never stated publicly. Practice filings are free and filing for real needs a subscription, but no price is set, and the $49 and $499 figures shown read as quotes.
- Security and privacy claims are wrong or incomplete. SSNs are encrypted and deleted after 30 days, not "purged after it completes". Only cards are held by Basis Theory, while logins are encrypted. The one-hour security-code rule is missing where it matters.
- Approval and submission are overpromised: "the state's own page" every time, "will be submitted exactly as shown", "filed right away", "before any run starts" and "nothing reaches a state site", when preview runs exist and live runs stop before paying if the state's page changed.
- Practice mode is confusing. It has five names, a banner with no reason or way out, and practice filings that clients approve without knowing nothing will be filed.
- Flows dead-end: the security-code and missing-information emails have no link or next step, Ready to pay isn't in any menu, approval errors show raw codes, "add one above" points at nothing, and buttons just say "Open".
- Legal authorizations name an undefined "the filing company", the agent option implies an agent service CoFile doesn't offer, and the consent texts (approval, saved signature, third-person perjury declarations, EIN designee) need counsel's decision.
- Development leftovers undermine trust: "Keystone", localhost and 127.0.0.1 addresses, SITE_PROXIES and PARTNER_SIGNUP_MODE, "(decision 7)", "the LLC path was walked", and engine or platform jargon.
- Plain language and accessibility: legal and engine terms go unexplained for first-time and non-native readers, the * marker is unexplained, page titles are identical, buttons are unlabeled, and white button text sits on a brand color the firm chooses.
- The developer docs have gaps that break unattended integrations: the previewing status and 402 error are missing, aborted is described wrongly, firm cards get the wrong card-code path, and review-page approval isn't documented.

## Words to use everywhere

| Term | Use |
|---|---|
| CoFile | The only product name in anything a customer or client can see. Never "Keystone". Outside the developer docs, also avoid "the engine" and "the platform (team/contact)"; say "CoFile", "we" or "our team". |
| practice filing / practice mode | A filing that goes through the live government site up to the final step and stops: nothing is filed or paid, and it's free. This replaces "test mode", "test run", "dry-run mode" and "DRY RUN" in customer copy. The developer docs keep "dry run" for the dryRun flag and gloss it once as "dry run (practice filing)". |
| live filing / file for real | A filing that is actually submitted to the government site and paid. It needs a subscription. Use "file for real" as the verb in customer copy. |
| preview run | Developer docs only. A run that fills in the state site up to its review page so the page can be captured for approval. It submits nothing and pays nothing. |
| approval page / approval link | The page the client opens from the approval email to check every detail and the fees, then approve or ask for changes. In partner copy, the person who approves is "your client", not "the approver". |
| the state's own review page | The screenshot the client approves. Always add "where possible". Never say it on IRS (EIN) pages. Say "government site" when the sentence covers both state sites and the IRS. |
| stops before paying | The standard way to describe what happens when the state's page has changed: "we stop before paying, and you may be asked to approve again". Never promise that a filing "will be submitted" or "is filed right away". |
| the filing company | Kept in the authorization texts, but on every form and client page it is defined once by name: 'Here, "the filing company" means {filer name}'. Counsel confirms who that is (see decisions). |
| filing type / filing | "Filing type" means a kind of filing, such as New York LLC formation. "Filing" means one filing. Write "6 filing types", not "6 filings". |
| Coverage statuses | VERIFIED UP TO PAYMENT, SCREENS MAPPED, NOT YET VERIFIED, PLANNED. Use "live" only for a type that files for real today. Say plainly that not every type is live yet. |
| security code | The 3 or 4 digits on a card. Don't use CVV or CVC in customer copy. Standard wording: "we ask the card's owner for it when approved filings are ready to pay and keep it for an hour at most". |
| Ready to pay | The name of the page (portal and dashboard) where the security code is entered. Name it exactly this way in emails, setup text and the top bars. |
| Basis Theory, a card vault | Always this phrase for where saved cards are held: "Saved cards are held by Basis Theory, a card vault, never in our database". Don't describe state logins as being in the vault. |
| state logins | "Encrypted as soon as they arrive, kept apart from every other account and read only when a filing runs", as on the dashboard. |
| SSN sentence | "The SSN is encrypted, used only for this filing and deleted after 30 days." Use "deleted", not "purged", everywhere, including the docs. |
| portal / dashboard | Partner firms have a portal at /p/<slug>. Enterprise accounts have a dashboard. Don't call the partner area a dashboard. |
| log in / log out | Use these everywhere, not "sign in" or "sign out". |
| employer registration | The name for NYS-100 and NJ-REG, matching the portal's filing names. "Payroll" is only a descriptor, as in "employer (payroll) registration". |
| assumed name (DBA) / foreign qualification (Application for Authority) | Use these pairs on first mention, so the coverage table, docs and portal use the same names. |
| state fee vs subscription | State fees are paid to the state with the cards chosen in Setup, after the client approves the exact amount. The subscription is what allows filing for real. Never blur the two. |
| details (client copy) | On the approval page and in client emails, say "details" rather than "values" or "data". |
| check (a box) | American usage: "check" and "uncheck", not "tick" and "untick". |

## Decisions for you

Each lists the options the reviewers gave and my recommendation.

**Decided Nov 26:**
- **NY corporation tax note:** left as is (it follows the walked page).
- **Missouri on the EIN form:** stays.
- **Price (1):** no price or subscription wording on the public site for now; removed from the home and sign-up pages, the API docs example carries no amount.
- **The filing company (2):** confirmed. Partner pages: "{firm}, filing through CoFile"; a firm an enterprise subscriber set up: the subscriber's own name. The engine works it out and every form with authorizations names it.
- **Terms, Privacy and notice (10):** written and published at /terms and /privacy; the footer says CoFile is not a law firm or a government agency; sign-up requires agreeing and records the version and time; the public and client-link forms link both beside Send. Before relying on them, have counsel review, in particular governing law (New York, courts in New York County), the liability cap and the legal entity name.
- **Support channel (11):** hello@cofile.app, in one setting (SUPPORT_EMAIL) for the site footer, legal pages, "contact us" messages, our account emails and staff notices (clients' emails keep their firm's own address).
- **Approval consent (3), decided later on Nov 26:** approving now also authorizes paying the fees shown, up to the stated maximum (the fee cap, else the total), with a warning that government fees generally can't be refunded once paid. The approve button reads "Approve, and authorize submission and payment"; each approval records the consent version agreed (`consentVersion`); the Terms and the API docs say the same. Counsel to confirm the wording.
- **Saved-signature consent (4):** limited to New York forms for the company that name that signer, on approved filings only; "filed in my name" dropped; it says the signer can revoke it at any time, after which it isn't placed on any further filing (the firm removes it on its Signatures page; the engine refuses a revoked signature). Signatures saved earlier keep the text they were agreed under.
- **Declarations (5):** first person where the person checking the box is the declarant ("I am the authorized representative named above… I declare…"): the NY and Florida incorporators, the NJ corporation's incorporators and the Florida general partners (one of them speaks for the others, who authorized them), the Florida registered agent's acceptance, the Florida LLC's authorized representative, the NYS-100 submitter, the NJ-REG perjury declaration and the NY form signature line. The NY LLC organizer's text is unchanged: it was already first person, and its organizer can be the filing company itself. The forms tell staff that the named person should check such a box, or be sent a client link.
- **EIN applicant (6):** the application goes in under one of the owners ("I am one of the owners, members, or the managing member of this LLC" on the IRS's Your role screen), not through the third-party designee. The EIN form no longer offers the designee choice or the "I have signed, or will sign" box; the responsible party authorizes it in first person ("I am the responsible party named above and one of the LLC's owners… I authorize the filing company to complete and submit this EIN application for me"). Requests default to the owner route; an API caller can still ask for the designee route, which still needs the signed Form SS-4.
- **Coverage table (7):** labels say only what's built (verified up to payment, screens mapped, not yet verified); NJ-REG is listed; the NJ standing certificate, verified up to payment but not offered in the portal, now says it is filed through the API and not in the portal yet; and the table links "Ask us which types are live for your account" until types switch live one by one.
- **Practice mode (8):** the portal's practice banner now says why (the filing type isn't switched to live filing yet; each type is switched once verified on the government site) and gives hello@cofile.app to ask when. Types now switch live one by one with PORTAL_LIVE_KINDS (PORTAL_LIVE_FILINGS=true still switches all); the engine refuses a real filing without a subscription when billing is required.
- **Beta banner (owner, Nov 26):** a slim beta notice on every page of the site except the widget firms embed; neutral (no CoFile name or address) on firms' white-label pages; SITE_BETA_BANNER=false turns it off.
- **Registered agent on partner portals (9), not the recommendation:** partners use their own agent or ours. Ours is Registered Agents, Inc., which we resell, at $59 a year per business, charged to the firm on its Stripe invoices from the year the filing is submitted until it cancels (Billing lists each business with its renewal date). Partner forms label it "Ours: Registered Agents, Inc., through CoFile ($59 a year per business, billed to your firm)", show it to the firm's clients as the firm's service without a price, and offer it only in states set up for it. Until Registered Agents, Inc. shares its API (it isn't published; their wholesale program provides it), each new business and each cancellation emails our staff to place it by hand; once the API is configured the engine orders through it. Terms and Privacy updated.
- **Turnaround times (12):** none stated by us; where a state's own estimate is known it is shown (today only NY Business Express's 15-day average for NYS-100, already on that form).
- **Partner sign-up review (13):** the neutral wording stays; it depends on the sign-up setting.
- **Production addresses (14), delegated to me:** the engine is its own deployment at `https://api.cofile.app` (API, approval pages, webhooks); the site is `https://cofile.app`. The docs' API address defaults to api.cofile.app (ENGINE_PUBLIC_URL); the deploy guide lists every webhook there and the DNS records to add; a production engine refuses to start with localhost addresses.
- **EIN-only formation states (15):** every state is listed on purpose; the IRS doesn't depend on where the LLC was formed. The EIN form asks for the formation state from all 50 states and DC, the filing records it as its state, and state filings still take only NY, NJ, MO and FL.
- **Fee figures (16), confirmed by the owner on the live checkouts:** New York charges the tax on shares (Tax Law s.180): 5 cents a share without par value, 1/20 of 1% of total par value, at least $10; the fee table quotes it (200 no-par shares: $125 + $10 = $135) and the NY corporation form's "no tax" line is gone. The NJ LLC is $103.50 by card ($100 + the $3.50 portal fee) and the NJ standing certificate $52 (LLC) / $27 (corporation) by card; the fee table already listed those as the state fee plus NJ's portal fee, each a separate line on the NJ cart, so its totals stand, and the site's copy now gives the totals instead of $50/$25.
- **Support address:** hello@cofile.app (corrected from .com).
- **The rest:** to follow.

### 1. What should the site say about price, and are the amounts now shown real?

Prices aren't set. The partner Billing page shows "$49.00 a month" and the API docs example shows 49900 ($499 a month), which readers take as quotes. The changes say only "Practice filings are free. Filing for real needs a subscription."

Options:
- Say only that practice filings are free and filing for real needs a subscription
- Also say "pricing isn't set yet; talk to us"
- Publish real prices once set, and hide Billing amounts until then

**Recommendation:** Say only that practice filings are free and filing for real needs a subscription, until prices are set in Stripe. The Billing page then shows Stripe's real price; the $49 seen in testing came from a test stand-in, and the docs example is marked as a placeholder.

### 2. Who is "the filing company" in the authorizations on partner portals and firm public pages, and on white-label enterprise pages?

Every authorization (typed signatures, attestations, fee payment, IRS third-party designee) grants power to an unnamed party. The changes add a definition with {filer name}, but counsel must confirm which legal party that is.

Options:
- CoFile only
- The partner firm only
- The partner firm, filing through CoFile
- On white-label pages, the enterprise filing company's own name

**Recommendation:** On partner portals and firm pages: "{firm}, filing through CoFile" (what the forms now show). On white-label enterprise pages: the enterprise filing company's own name. Counsel to confirm.

### 3. Should the approval consent also cover fee payment, the approver's authority to act for the business, and the signatures and attestations listed?

Today the consent authorizes only "submission exactly as shown", though the page shows a "Maximum you authorize" fee cap and the forms say each authorization is shown again on the approval page. Several reviewers asked for these additions, but they change the consent's meaning.

Options:
- Keep the current scope (wording clarified only)
- Add payment of the fees shown, with a non-refundable warning
- Add payment, a confirmation of authority and the listed authorizations

**Recommendation:** Add payment of the fees shown, up to the maximum, with a no-refund warning. Counsel to confirm the wording.

### 4. Should the saved-signature consent be narrowed and say it can be revoked?

The consent covers any approved filing for the company and says each one is "signed and filed in my name". The engine signs only forms that name that signer, and DELETE /v1/signatures exists. The text must match consentText from GET /v1/signatures on all three forms.

Options:
- Keep as is
- Limit it to forms that name the signer, and drop "filed in my name"
- Also add "I can revoke this signature at any time"

**Recommendation:** Limit it to forms that name that signer, drop "filed in my name", and say it can be revoked (the engine already works this way).

### 5. Should declarations made for another person become first-person, and who certifies the facts in NY Articles?

NJ-REG has the person checking the box declare under penalty of perjury on behalf of "the authorized representative named above". The NYS-100 submitter, NY incorporator and Florida agent and partner authorizations use the same third-person pattern. In the NY LLC, the filing company "certifies" that the statements are true.

Options:
- Keep the third-person wording
- Rewrite as first person ("I am the authorized representative… I declare…")
- Have the person giving the authorization confirm the facts, and the filing company only type the name

**Recommendation:** Counsel's call. Suggested: first person where the person checking the box is the declarant; otherwise the declarant confirms the facts and the filing company only types the name.

### 6. Should the EIN third-party designee box still accept "or will sign"?

The help text says the designee needs the signed authorization before it applies, but the checkbox lets an application go ahead without it, and "I" is wrong when firm staff fill in the form.

Options:
- Keep as is
- "…or will sign it before the filing company applies"
- Require "The responsible party has signed…" before submission

**Recommendation:** "…or will sign it before the filing company applies".

### 7. What is each filing type's real status, and which file for real today?

Coverage omits NJ-REG and calls NY Application for Authority and Assumed Name planned while the portal sells them. The changes use NOT YET VERIFIED until engineering confirms. A standing certificate is listed as verified but isn't in the product's list of offered filings.

Options:
- Confirm each row's label (Verified up to payment / Screens mapped / Not yet verified)
- Mark live types as LIVE in the table
- Remove or keep the NJ standing certificate row and fee example
- Add "Ask us which types are live for your account"

**Recommendation:** The coverage table is now updated to what's built (verified up to payment, screens mapped, not yet verified). Add "Ask us which types are live for your account" until types switch live one by one.

### 8. How does a partner portal leave practice mode, and what should the banner say?

Billing shows an active plan, yet every form says practice/test mode with no reason or next step.

Options:
- Explain it in the banner, with a contact
- Switch portals live automatically once subscribed and the type is live
- Tag each filing card "Practice only for now" until that type is live

**Recommendation:** Explain it in the banner now, with a contact; later, switch each filing type live for subscribed portals once it is verified live.

### 9. Should partner portals offer "the filing company's registered agent"?

CoFile has no registered agent service. Partners save their own agents in Setup. On partner pages the option may name an agent nobody provides.

Options:
- Remove it from partner portals
- Point it at the firm's saved agent
- Keep it only on enterprise white-label pages

**Recommendation:** Point it at the firm's own saved agent (Setup already saves one per state).

### 10. Publish Terms of Service, a Privacy Policy and a "not a law firm / not a government agency" notice?

The site collects SSNs, dates of birth, signatures and cards, and files final government documents, but links to no terms, privacy page or disclaimer. Sign-up records no agreement to any terms.

Options:
- Publish all three, link them in the footer and next to Send, and add a consent line above Create account
- Publish Terms and Privacy only
- Wait for counsel

**Recommendation:** Publish all three, link them in the footer and next to Send, and record agreement at sign-up. Needs counsel to write them.

### 11. Which support channel should the site, emails and dashboard name?

Bot-check, reconciliation, card-vault and key-revocation messages need someone to contact, and procurement asks for a support contact. The changes use "ask us" without naming a channel.

Options:
- A support email address
- The existing Talk to us form
- Support hours plus email

**Recommendation:** A support email address (for example support@cofile.app) named in emails, the dashboard and the site.

### 12. Should the site state any turnaround or processing times?

Firms and closers ask how long filings take. The only figure is the state's NYS-100 average; the changes promise no times.

Options:
- State none and point to each state's own estimate
- Publish typical times per filing type once measured

**Recommendation:** State none for now and point to each state's own estimate.

### 13. Are partner sign-ups reviewed before accounts open?

/signup and /signup/sent promise a review, while the Sign-ups page shows automatic opening. The changes use wording that's true either way.

Options:
- Automatic (drop the review mention)
- Always reviewed
- Depends on the setting (keep the neutral wording)

**Recommendation:** Keep the neutral wording: it depends on the sign-up setting.

### 14. What are the production API host and web base URL?

The docs use 127.0.0.1:8090 and the portal links use localhost:3100. The changes assume https://cofile.app for both.

Options:
- https://cofile.app for both
- https://api.cofile.app for the API, https://cofile.app for pages

**Recommendation:** Your deployment decides. The docs take the API address from ENGINE_PUBLIC_URL; set it in production.

### 15. Should EIN-only filings accept LLCs formed outside NY, NJ and FL?

The EIN forms list Missouri, while the docs say "any formation state". The changes remove Missouri.

Options:
- NY, NJ and FL only
- List all states on purpose

**Recommendation:** List all states on purpose: the IRS doesn't depend on the formation state.

### 16. Confirm three fee figures before the copy ships.

NY corporations: NY Tax Law §180 adds a 5-cent-per-no-par-share organization tax ($10 minimum), but the site says there's no tax, and the fee table must match. NJ LLC: the demo shows $100 + $3.50. NJ standing certificate: the example shows $52/$27 against the stated $50/$25.

Options:
- Confirm each with the live checkout and fee table
- Correct the fee table where it differs

**Recommendation:** Confirm each during the checkout walks (V9-V12); the run already stops before paying if the state's amount differs.

### 17. Change the API key prefix kfe_?

If it stands for the old name, it's a visible trace of Keystone in the docs and dashboard. Changing it affects only new keys.

Options:
- Keep kfe_
- Use a CoFile prefix for new keys

**Recommendation:** Use a CoFile prefix for new keys and keep accepting old ones. Low priority.

### 18. Do the Florida forms support professional entities (PLLC, P.A., Chartered)?

The help text tells users to use endings that the Ending lists don't offer.

Options:
- Add the endings
- Say "This form doesn't file professional entities yet"

**Recommendation:** Say "This form doesn't file professional entities yet" until the endings are added.

### 19. How does the home-state Certificate of Existence reach CoFile for a NY Application for Authority?

The form says "Send it to the filing company; it is uploaded with the form" but gives no upload field or address. The Tax Commission consent option has the same gap.

Options:
- Add required PDF upload fields
- Name a support email until uploads exist

**Recommendation:** Add required PDF upload fields to the form.

