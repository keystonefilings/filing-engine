# FL Sunbiz: Online formation filings (Florida Division of Corporations)

**Status:** LLC form MAPPED on screen up to its hard stop: Continue is refused without the typed registered-agent signature (and the typed electronic signature after it), so the review and payment screens were not reached. The user ticked the LLC disclaimer box themselves (Nov 24, ~16:45 UTC). Profit corp (~18:05 UTC) and LP (~18:15 UTC) forms mapped the same way, after the user ticked each disclaimer in their own Chrome. Nothing signed, submitted or paid.
**Browser:** Claude's own cloud browser, as a guest. No sign-in.
**Mapped:** Nov 24, 2026, UTC.
**No login needed to file.** A Prepaid Sunbiz E-File Account at https://efile.sunbiz.org/login.html is an optional way to pay. It is not needed to start a filing.

## What this means for the adapter
- Each form begins with the same gate. The adapter has to tick the disclaimer checkbox and press Start New Filing. That is an acceptance of terms, so it needs the filer's (our) standing authorization, not mine.
- To map the screens after it, you can tick that box yourself in your own browser, or give me a yes to accept the disclaimer for mapping only. Either way I'd still stop before the typed signatures and payment.
- Signatures on Sunbiz are typed names (s.15.16 F.S.). The registered agent and the authorized rep or incorporator each type their name. Our adapter needs authority to type both, because typing a name without permission is forgery under s.831.06.
- Payment goes through NIC Services dba Tyler Payment Services: credit card (Visa, MC, Amex, Discover), debit (Visa/MC), or the Prepaid Sunbiz E-File Account. The receipt comes from a Tyler Tech no-reply address, and the card statement reads "NIC DOS DIVISION OF CORP".
- Once a filing is submitted it can't be changed, cancelled or refunded. A rejected filing is corrected on the same page using the tracking number and PIN from the rejection email.
- Everything entered becomes public record.

## LLC form, live screen (efile.sunbiz.org/scripts/coretype.exe), mapped Nov 24 ~16:50 UTC
One long page; everything below sits on it, in this order. Buttons at the bottom: **Continue** and **Reset**.

| # | Field | Type | Required | Notes |
|---|---|---|---|---|
| 1 | Effective date | text, MM/DD/YYYY | optional | Blank = filing date. |
| 2 | Filing fee | display | | Shows $125.00 (filing $100 + RA designation $25). |
| 3 | Certificate of Status | checkbox | optional | +$5.00 |
| 4 | Certified Copy | checkbox | optional | +$30.00 |
| 5 | LLC Name | text | required | Must carry LLC / L.L.C. / Limited Liability Company. |
| 6 | Principal address: Address, Suite/Apt, City, State, Zip, Country | text | Address/City/State/Zip required | Street address. |
| 7 | "Mailing address same as principal" | checkbox | optional | Ticking copies block 6 into block 8. |
| 8 | Mailing address: Address, Suite, City, State, Zip, Country | text | required if 7 unticked | P.O. box allowed. |
| 9 | Registered agent, individual: Last Name, First Name, Initial, Title (Sr/Jr) | text | one of 9 or 10 | |
| 10 | "Business to serve as Registered Agent" | text | one of 9 or 10 | Page note: must be different from the entity name. |
| 11 | RA Address, Suite, City | text | required | Page note: P.O. box not acceptable. |
| 12 | RA State / Country | fixed | | FL and US, not editable. |
| 13 | RA Zip | text | required | |
| 14 | **Registered Agent Signature** | text (typed name) | required | Acceptance statement above it; warning that typing another person's name without authority is forgery (s.831.06 F.S.). STOP for me. |
| 15 | Purpose | textarea | optional (required for a PLLC) | Max 240 characters, live counter. |
| 16 | Annual Report notice | text only | | Annual report due Jan 1 to May 1, fee $138.75, $400 late fee; reminders go to the correspondence email. |
| 17 | Correspondence Name | text | required | |
| 18 | Correspondence E-mail / Re-enter E-mail | text | required | Must match. |
| 19 | **Electronic Signature** | text (typed name) | required | Affirmation above it: false information is a third-degree felony (s.817.155 F.S.), and the signer acknowledges the annual report duty. |
| 20 | Manager / member blocks 1 to 6 | repeated group | optional | Each: Title (MGR, AMBR, AP), Last, First, Initial, Suffix OR Entity Name, Street, City, State, Zip, Country. A "What is AR/AP/AMBR/MGR?" link explains the titles. Six blocks on the page; no add-more button seen. |

### Validation
- Validation is server-side, one error at a time. Pressing Continue with the signatures blank goes to `/scripts/coredisp.exe` and shows a plain error page: "Ra Signature is required. Please use your browsers' BACK arrow…".
- So the adapter must POST the whole page, read `coredisp.exe` for an error line, fix and resubmit. Later errors were not seen; presumably they come one by one in the same way (a guess).

### Hard stop
The page can't be passed without typing the RA's name and the filer's name as signatures, which I won't do. The screens after it (review, then the Tyler Payment Services hand-off and final submit) are still unmapped. To finish them, the filer (you) would need to type the two signatures yourself in your own browser and let me read the next screens, stopping before payment.

### Adapter notes
- The disclaimer box on llc_file.html is ticked once per filing session; the adapter needs standing authority to accept it, as above.

## Profit corp form, live screen (efile.sunbiz.org/scripts/coretype.exe), mapped Nov 24 ~18:05 UTC
Reached after the user ticked the profit_file.html disclaimer and pressed Start New Filing in their own Chrome. One long page, same engine and layout as the LLC form. Buttons at the bottom: **Continue** (button) and **Reset**. Above them: "Once you have submitted the information, your filing cannot be updated, removed, cancelled or refunded."

| # | Field | Type | Required | Notes |
|---|---|---|---|---|
| 1 | Effective date | three text boxes MM / DD / YYYY | optional | |
| 2 | Required Filing Fees | display | | $70.00 (filing $35 + RA $35). |
| 3 | Certificate of Status | checkbox | optional | +$8.75 |
| 4 | Certified Copy | checkbox | optional | +$8.75 |
| 5 | Corporate Name | text | required | "Name must include suffix such as Corp, Inc., Incorporated, etc." |
| 6 | Corporate Stock Shares | text | required | "(Cannot be zero)". |
| 7 | Principal Place of Business: Address, Suite, City, State, Zip, Country | text | required | Must be a street address. State and Country are free text boxes here. |
| 8 | "Mailing address same as principal address" | checkbox | optional | |
| 9 | Mailing Address: Address, Suite, City, State, Zip, Country | text | required if 8 unticked | |
| 10 | Registered agent, individual: Last, First, Initial, Title (Sr., Jr.) | text | one of 10 or 11 | |
| 11 | "Business to serve as RA" | text | one of 10 or 11 | Must be different from the entity being filed. |
| 12 | RA Address (PO Box not acceptable), Suite, City, Zip | text | required | State fixed FL, Country fixed US. |
| 13 | **Registered Agent Signature** | text (typed name) | required | Must be an individual's name; if the RA is a business, an individual signs for it. Forgery warning, s.831.06 F.S. STOP. |
| 14 | Notice of Annual Report | text only | | Due Jan 1 to May 1 each year from the year after formation; fee $150; $400 late fee after May 1; reminders go to the correspondence email. |
| 15 | Incorporator Name, Address, Suite, City/State/Zip | text | required | |
| 16 | **Electronic Signature of Incorporator** | text (typed name) | required | Affirmation: facts true, false information is a third-degree felony (s.817.155 F.S.), annual report requirement read. STOP. |
| 17 | "Corporate purpose is 'Any and all lawful business'." | checkbox | optional | Don't tick for a Professional Association; it must list a specific purpose in 18. |
| 18 | Purpose | textarea | required if 17 unticked (presumed) | Max 240 characters, live counter. |
| 19 | Correspondence Name, E-mail Address, Re-enter E-mail Address | text | required | Filing correspondence and annual report notices go here. |
| 20 | Officer/Director blocks 1 to 6 | repeated group | optional | Each: Title (free text, "P, VP, etc."), Last, First, Initial, Suffix OR "Business Name to serve as Officer", Street Address, City, State, Zip, Country. Page note: needed for most bank accounts and workers' comp exemption; changes later need an amendment that can't be filed online and costs $35. |

### Differences from the LLC form
- Adds Corporate Stock Shares, the incorporator block, and the "any and all lawful business" checkbox.
- Officers are entered with a free-text Title; LLC managers use a fixed title list.
- Fee display $70.00 (LLC $125.00); add-ons $8.75 each (LLC $5 / $30); annual report $150 (LLC $138.75).

### Hard stop
Same as the LLC: Continue can't succeed without the typed RA signature and the typed incorporator signature, so I didn't press it. Validation is presumably the same server-side `coredisp.exe` error page seen on the LLC form (not re-tested here). Review, payment and final submit are unmapped.

## LP / LLLP form, live screen (efile.sunbiz.org/scripts/coretype.exe), mapped Nov 24 ~18:15 UTC
Reached after the user ticked the lp_file.html disclaimer and pressed Start New Filing in their own Chrome. One long page, same engine as the LLC and corp forms. Buttons: **Continue** and **Reset**, under the same "cannot be updated, removed, cancelled or refunded" warning.

| # | Field | Type | Required | Notes |
|---|---|---|---|---|
| 1 | Effective date | MM / DD / YYYY text boxes | optional | |
| 2 | Required Filing Fees | display | | $1,000.00 (filing $965 + RA $35). |
| 3 | Certificate of Status | checkbox | optional | +$8.75 |
| 4 | Certified Copy | checkbox | optional | +$52.50 |
| 5 | Limited Partnership Name | text | required | LP suffix: Limited Partnership, Limited, L.P., LP or Ltd. LLLP suffix: Limited Liability Limited Partnership, L.L.L.P. or LLLP. Neither may use the other's suffix. |
| 6 | "Limited liability limited partnership" | checkbox | optional | Tick for an LLLP; must match the suffix in 5. |
| 7 | Street Address of Initial Office: Address, Suite, City, State, Zip, Country | text | required | Street address. |
| 8 | "Mailing address same as street address" | checkbox | optional | |
| 9 | Mailing Address block | text | required if 8 unticked | |
| 10 | Registered agent, individual (Last, First, Initial, Title) OR "Business to serve as RA" | text | one of the two | Business RA must differ from the entity. |
| 11 | RA Address (PO Box not acceptable), Suite, City, Zip | text | required | State fixed FL, Country fixed US. |
| 12 | **Registered Agent Signature** | text (typed name) | required | Individual's name; forgery warning s.831.06 F.S. STOP. |
| 13 | Correspondence Name, E-mail, Re-enter E-mail | text | required | |
| 14 | Notice of Annual Report | text only | | Jan 1 to May 1 each year from the year after formation; fee $500; $400 late fee. |
| 15 | General Partner blocks 1 to 6 | repeated group | at least one GP required | Each: Title (shown as "G"), Last, First, Initial, Suffix OR "Entity Name to serve as GP" plus "Entity Document Number" (the GP entity's Florida document number), Street Address, City, State, Zip, Country, and its own **Signature** text box. |
| 16 | **GP Signature** (one per GP block) | text (typed name) | required for each GP listed | Affirmation: facts true, false information is a third-degree felony (s.817.155 F.S.). STOP. |

### Differences from the LLC and corp forms
- Every general partner signs in their own block (the LLC and corp have one filer signature).
- A GP that is a business needs its Florida document number.
- No purpose field, no shares, no incorporator.
- Fees are much higher: $1,000 required, certified copy $52.50, annual report $500.

### Hard stop
Continue can't succeed without the typed RA signature and each GP's typed signature, so I didn't press it. Review, payment and final submit are unmapped for all three Sunbiz forms.

## Entry screens (all three share one layout)
| Entity | Info page | Form start URL |
|---|---|---|
| LLC (Articles of Organization) | dos.fl.gov/sunbiz/start-business/efile/fl-llc/ | https://efile.sunbiz.org/llc_file.html |
| Profit corp (Articles of Incorporation) | dos.fl.gov/sunbiz/start-business/efile/fl-profit-corporation/ | https://efile.sunbiz.org/profit_file.html |
| LP / LLLP (Certificate of Limited Partnership) | dos.fl.gov/sunbiz/start-business/efile/fl-limited-partnership/ | https://efile.sunbiz.org/lp_file.html |

Each start page has two blocks.
1. **File <document>.** Checkbox: "I have read and accept the terms of this disclaimer and acknowledge receipt of the filing information provided." Below it, the button **Start New Filing**. STOP here.
2. **Correct <document>.** Text boxes Tracking Number and PIN, then the button **Update Filing**. This is for rejected filings.

## Fees (from each info page's fee table, read Nov 24)
| | Filing | RA designation | Certified copy (opt) | Cert. of status (opt) | Total with options |
|---|---|---|---|---|---|
| LLC | $100.00 | $25.00 | $30.00 | $5.00 | $160.00 (minimum $125.00) |
| Profit corp | $35.00 | $35.00 | $8.75 | $8.75 | $87.50 (minimum $70.00) |
| LP / LLLP | $965.00 | $35.00 | $52.50 | $8.75 | $1,061.25 (minimum $1,000.00) |

## Form sections, from Sunbiz's published instructions (not seen on screen)
These come from the instruction pages for each form. Field order, labels and limits on the live screens still need checking.

### LLC (s.605.0201 F.S.)
1. **Name** (required). Must contain "Limited Liability Company", "LLC" or "L.L.C." A professional LLC uses "Chartered", "Professional Limited Liability Company", "P.L.L.C." or "PLLC". The name must be distinguishable on the record.
2. **Principal place of business** (required). A street address.
3. **Mailing address** (optional). A P.O. box is allowed.
4. **Registered agent name and Florida street address** (required). No P.O. box. The entity can't be its own agent. A business entity active in Florida can serve as agent.
5. **Registered agent signature** (required). The agent's typed name.
6. **Purpose.** Optional, except a professional LLC must give one specific professional purpose.
7. **Managers / authorized representatives** (optional). Title MGR or AR, with name and street address. Don't list members here.
8. **Effective date** (optional). Default is the filing date. It can be up to 5 business days before receipt, or up to 90 days after.
9. **Signature of an authorized representative** (required). A typed name.
10. **Correspondence name and email** (required). The acknowledgment, the certificate, and future notices go to this email.
11. **Add-ons** (optional). Certificate of status, certified copy.

### Profit corporation (s.607.0202 F.S.)
1. **Name** (required). Must contain "Corporation", "Company", "Incorporated", "Corp.", "Inc." or "Co." A P.A. uses "Chartered", "Professional Association" or "P.A."
2. **Principal place of business** (required, street address). Mailing address optional (P.O. box allowed).
3. **Registered agent name and Florida street address** (required, no P.O. box), plus the agent's typed signature (required). The agent's signature accepts the duties under s.607.0505.
4. **Purpose** (optional). "Any and all lawful business" is fine. A P.A. must give one professional purpose.
5. **Officers / directors** (optional). Entered as "Last Name, First Name, Middle Initial" with a street address. Leave Entity Name blank unless the officer is a business. A director can't be a business entity.
6. **Effective date** (optional). Same rule as the LLC.
7. **Number of authorized shares** (required). At least 1.
8. **Incorporator signature** (required). A typed name.
9. **Correspondence name and email** (required).
10. **Add-ons** (optional).

### LP / LLLP (s.620.1201 F.S.)
1. **Name** (required). An LP must contain "Limited", "Limited Partnership", "L.P." or "Ltd." An LLLP must contain "L.L.L.P.", "LLLP" or "Limited Liability Limited Partnership".
2. **Initial designated office** (required, street address). Mailing address optional (P.O. box allowed).
3. **LLLP election** (optional checkbox).
4. **Registered agent name and Florida street address** (required, no P.O. box), plus the agent's typed signature (required).
5. **General partners** (required). Name and address of each. A business partner must be active on Florida's records.
6. **Signature of each general partner** (required). Typed names.
7. **Effective date** (optional). Up to 90 days after receipt.
8. **Correspondence name and email** (required).
9. **Add-ons** (optional).

The instructions don't give character limits, the number of managers, officers or partners allowed, or how errors read on screen. Those need the live form.

## Not mapped
- LLC: the screens after the signature stop (review, payment hand-off to Tyler, final Submit).
- Profit corp: the screens after the signature stop.
- LP: the screens after the signature stop.
- Non-profit corporation and fictitious name filings (out of scope).
