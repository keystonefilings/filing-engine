# NY Department of State: Division of Corporations On-Line Filing System (service company)

Status: MAPPED FROM THE USER'S SCREEN RECORDING (2026-11-24, five clips). The user drove the site signed in as the Keystone Filings service company; this map was written from the video frames. The site itself was never reachable from the cloud browser, and the user's Chrome kept being reset by its Techloq filter (see "Site reliability"). The recording shows each flow up to its final button (File Document or Submit); the map stops there. Real entity names, DOS IDs, people, addresses, emails, the user ID and the draw-down account number seen in the video are left out on purpose.

Base: `https://filings.dos.ny.gov/ords/r/corpanc/` (Oracle APEX; URLs carry `?session=<APEX session id>`; don't hard-code it). Formation wizard starts at `/efiling/1`, which redirects to `/efiling/2?p2_filing_type=DBC|DLLC&...`.

Legend: `*` = required. FINAL = the button that files and charges. STOP = attestation box or typed signature (the engine must have the user's own approval for these).

## Common page chrome (signed in)
- Header: "Department of State", breadcrumb "Form a Corporation or Business ▸ Division of Corporations On-Line Filing System".
- Menu: Home ▾ · Replenish DD Account · Retrieve Images · Service Company Administration ▾. Top right: User ID: <id> · Change Password · Log Out.
- Footer: Accessibility, Contact, Disclaimer, Language Access, Privacy Policy.
- Errors show as a yellow toast "1 error has occurred" plus a red line under the field.
- The browser's own autofill drop-downs appear on many fields in the video; they are Chrome, not the site.

## Screen A: Home (service company)
- "Welcome to the Department of State On-Line Filing System".
- Filing Evidence notice: status / rejection questions go to dosSCinquiries@dos.ny.gov; filing-evidence corrections and affidavits of loss to dosCorpFilingReceipt@dos.ny.gov; documents not orderable online to dos.sm.corp.NYSDeptofStateCopyUnit@dos.ny.gov.
- "On-Line Filings for Service Company Filers":
  1. Domestic Business Corporation (For Profit) and Domestic Limited Liability Company (formation, Screens B to F)
  2. Articles of Dissolution: Domestic Limited Liability Company (Screen G)
  3. Certificate of Amendment (name change only) (Screen H)
  4. Certificate of Change: By Entity (Screen I)
  5. Retrieve a Saved Transaction
- "Requests for Copy of Document(s) or Certificate of Status": Copy of Document (Screen J) · Retrieve a previously processed copy request or certificate of status (kept 3 business days) · Certificates of Status (Screen K). Red note: copies not available online go by email to the copy unit or the Customer Service Desk bin.
- Authenticate.
- E-Submission entries (Screen L): Initial Organization Filing, Amend an Existing Record, Assumed Name Filing, Assumed Name Amendment, E-Submission Dashboard.

## Screen B: Formation, filing selection
- Header "Welcome to the Department of State Online Filing System". Section "The Department of State Offers Online Filing for the Following:"
  - Certificate of Incorporation for a Domestic Business Corporation (not for professional service corporations)
  - Articles of Organization for a Domestic Limited Liability Company (not for professional service LLCs)
- Contact footer: Corporations@dos.ny.gov, 518-473-2492.

## Screen C: Proposed Entity Name
- BCL title: "Certificate of Incorporation for a Domestic Business Corporation (For Profit) - Proposed Entity Name", "CERTIFICATE OF INCORPORATION Under Section 402 of the Business Corporation Law".
- LLC title: "Articles of Organization for a Domestic Limited Liability Company - Proposed Entity Name", "Under Section 203 of the Limited Liability Company Law".
- Field: *Name (text, ? help). Link (BCL): "PLEASE READ IMPORTANT INFORMATION ABOUT CHOOSING A CORPORATION NAME…".
- Buttons: Cancel · Reset · Continue.
- Rejection seen: "The proposed entity name is unacceptable for the reason(s) listed below. Please revise…" with "Entity Indicator Evaluation: Type indicator applicable to specified entity type not found." (name without Inc./Corp. or LLC). Buttons then: Continue or Cancel.

## Screen D1: BCL main form (one long page, heading "CERTIFICATE OF INCORPORATION OF <NAME>")
| Section | Fields and options |
|---|---|
| Opening Statement (optional) | checkbox "Include following statement (not required by statute)": "I, the undersigned, a natural person of at least eighteen (18) years of age … hereby certify:" |
| Corporation Name | *Name (prefilled, read-only), English Translation (read-only) |
| Purposes | fixed standard all-purpose clause text |
| County | *County select (every NY county) |
| Shares | *Number of Shares, *Share Value select (No Par Value or par value), Tax On Shares $ (shown 0.00 for 200 no-par shares) |
| Service of Process | *Select One radio: enter SOP information, or select a Service Company. Enter: button "The Corporation" fills SOP Name "THE CORPORATION"; *SOP Name, *Address, Address 2, *City, *State (NY default), *Postal Code. Optional checkbox for the SOP email statement: E-mail, Confirm E-mail. Select: "-- Select Service Company --" list of registered service companies; a pick autofills name and address. Red disclaimer: if you select a service company, DOS gives that company your contact details, including your email. |
| Registered Agent (optional) | checkbox "Check if applicable"; *Select One: enter RA information or select a Registered Agent Company; *RA Name, *Address, Address 2, *City, *State (NY), *Postal Code |
| Effective Date (optional) | checkbox; *Select One: upon filing / on a date; Effective Date (calendar) |
| Duration Date (optional) | checkbox; perpetual / until a date; Duration Date (calendar) |
| Liability Statement (optional) | checkbox; director-liability text (BCL 719 wording) |
| Preemptive Rights Statement (optional) | checkbox; BCL 622 text |
| Incorporator | buttons "Service Company Address", "SOP Address" (autofill); *First Name, Middle Initial, *Last Name, *Address, Address 2, *City, *State, *Postal Code |
| Signature | STOP. Text: "I certify that I have read the above statements, I am authorized to sign this Certificate of Incorporation, that the above statements are true and correct … my signature typed below constitutes my signature." *Signature of Incorporator (typed). Validation: "The Name of the Incorporator and the Signature of the Incorporator must be the same." |
| Filer | buttons Service Company Address / SOP Address / Incorporator Address; *Filer Name, *Address, Address 2, *City, *State, *Postal Code |
- Buttons: < Go Back · Cancel · Save for Later · Continue >. After a failed Continue the title gains "- Filing" and the same form shows the errors.

## Screen D2: LLC main form ("Articles of Organization for a Domestic Limited Liability Company")
| Section | Fields and options |
|---|---|
| Opening Statement (optional) | checkbox (don't tick if the organizer is a business entity): "THE UNDERSIGNED, being a natural person of at least eighteen (18) years of age …" |
| LLC Name | *Name (read-only), English Translation |
| Purposes (optional) | checkbox with the "any lawful act or activity" text |
| County | *County select |
| Service of Process | same as BCL; button "The LLC" fills "THE LLC"; same service-company picker and disclaimer; optional SOP email + confirm |
| Registered Agent (optional) | checkbox, same fields as BCL |
| Management Structure (optional) | checkbox; *Select One: One or more members / A class or classes of members / One or more managers / A class or classes of managers |
| Effective Date (optional) | upon filing / on a date (calendar) |
| Dissolution Date (optional) | perpetual existence / latest date to dissolve |
| Liability Statement (optional) | indemnification text |
| Organizer | buttons Service Company Address / SOP Address; *Organizer Name, *Address (two lines), *City, *State, *Postal Code |
| Signature | STOP. "I certify that I have read the above statements, I am authorized to sign these Articles of Organization, that the above statements are true and correct to the best of my knowledge and belief and that my signature typed below constitutes my signature." *Signature (typed) |
| Filer | buttons Service Company Address / SOP Address / Organizer Address; *Filer Name, *Address (two lines), *City, *State, *Postal Code |
- Buttons: < Go Back · Cancel · Save for Later · Continue >.

## Screen E: Review (both)
- Rendered document preview: all statements, the typed signature, "<NAME>, ORGANIZER" (or incorporator) with address, and a "Filed by:" block.
- Buttons: < Go Back · Print Preview · Continue >.

## Screen F: Payment Information (both; title "… - Payment Information")
- Optional Information: Customer Reference Number (text); FEIN of the entity being formed (text, ? help).
- Additional Services checkboxes: Plain Copy ($5.00), Certified Copy ($10.00), Certificate of Existence ($25.00).
- Fee Information:
  - BCL: Certificate Filing Fee $125.00 + Tax on Shares (computed; $0.00 shown for 200 no-par shares) + extras. Seen total $165.00 with all three extras.
  - LLC: Certificate Filing Fee $200.00, Tax on Shares $0.00, Plain $5, Certified $10, Existence $25. Seen TOTAL FEE $240.00.
- E-mail Address: "Please provide an e-mail address to send the filing receipts and related documents": Distribution E-mail Address (read-only, from the service-company profile), Cc E-mail Address.
- Payment: *Select One: Credit Card / Drawdown Account. Drawdown select ("--Select One--" / "<company> - F##"), Account Balance shown. Note: card payments redirect to the processor and come back.
- Payment Authorization: STOP. Checkbox "By checking this box I authorize that the total fee listed above will be charged to my credit card or drawdown account." Refund Policy: DOS does not refund fees.
- Buttons: < Go Back · **File Document (FINAL)**. No expedite choice on this page (expedite exists only in E-Submission, Screen L).

## Screen G: Articles of Dissolution, Domestic LLC ("Certificate of Dissolution-Cancellation", Section 705 LLC Law)
1. Search: "DOS ID AND Entity Name Search": *DOS ID, *Entity Name (both must match exactly). Buttons < Go Back · Reset · Search. Error: "The entries are not an exact match and cannot be found. Please search again."
2. Form:
   - Entity Information (read-only): LLC name; former name if changed; date the articles of organization were filed.
   - Reason for Dissolution: *one of: "The vote or written consent of a majority in interest of the members" / "There are no members of the limited liability company" / "Pursuant to the dissolution date set forth in the articles of organization or operating agreement" / "The entry of a decree of judicial dissolution".
   - Attestation and Signature: STOP. *checkbox "I certify that I have read the above statements, I am authorized to sign these articles of dissolution, that the above statements are true and correct to the best of my knowledge and belief." "My typed name below constitutes my signature:" *Signature; *Capacity of Signer: Authorized person / Manager / Member.
   - Filer's Information: *Requester Name (prefilled from profile), Company if applicable, *Address (two lines), *City, *State, *Postal Code, Country (USA), *Distribution Email Address (profile), Cc Email Address.
   - Fees and Services: Domestic LLC Fee $60.00; Additional Services (if selected): Plain Copy $5.00, Certified Copy, Certificate of Status; Total Fees (seen $65.00).
   - Buttons: < Go Back · Reset · Continue >.
3. "E-DISSOLUTION PROCESSING SYSTEM" Successful Validation Request: preview image only ("may take a few minutes"), shows Entity Name, DOS ID, Transaction Number; copies retrievable at www.ecorp.dos.ny.gov with the transaction number for 3 business days. Buttons < Back · Continue >.
4. Payment: fee recap, *Drawdown Account select, Balance; Payment Authorization STOP checkbox "By checking this box I authorize the total fee listed above to be charged to my drawdown account."; Refund Policy. Buttons < Go Back · Reset · **Submit (FINAL)**.

## Screen H: Certificate of Amendment (name change only) (LLC Law s.211, BCL s.805)
1. Search: *DOS ID AND *Entity Name (exact match; same error as G).
2. Proposed Entity Name ("Certificate of Amendment (name change only) for a Domestic Limited Liability Company"): *Entity Name; buttons Check Name, RESET; result "The Entity Name is Available."; < Previous · Next >.
3. Filing Information: "…is hereby amended to read as follows: *New Name of the Company" (read-only, uppercased); Attestation and Signature STOP (same certify box, *Signature, *Capacity of Signer: Member / Manager / Authorized Person); Filer's Information (as G); Fees: Domestic LLC Fee $60.00 + Plain Copy $5 → Total $65.00. < Go Back · Reset · Continue >.
4. Preview Image: "Successful Validation Request for: <new name>", New Entity Name, Entity Name, DOS ID, Transaction Number; Display and Download section. < Back · Continue >.
5. Payment: Filing Fee $60, Plain Copy $5, Total $65; *Drawdown Account, Balance; Payment Authorization STOP; < Go Back · Reset · **Submit (FINAL)**.

## Screen I: Certificate of Change, By Entity (LLC s.211-A; BCL s.805-A; foreign LLC s.804-A)
1. Search: *DOS ID AND *Entity Name (the page says it must match DOS records; help line 518-473-2492, Mon-Fri 8:45 AM-4:30 PM).
2. Change Selection: lists the allowed changes, then "Select at least one change type" (*check all that apply): Entity County Location (Edit) · Service of Process Recipient and Mailing Address (Edit) · Service of Process Email Address (Add/Edit) · Designate Registered Agent (Add) · Registered Agent Address (Edit) · Name of Registered Agent (Edit) · Revocation of Registered Agent (Delete). Options grey out depending on whether an RA is on file. Buttons < Go Back · Reset · NEXT >.
3. Current Information and Changes (one section per ticked change):
   - Entity Information (read-only): name, former name, filing date.
   - County Change: Current County, *New County (select of every county).
   - Service of Process Name and Address Change: current SOP shown; *Name, *Mailing Address 1, Mailing Address 2, *City, *State, *Zip Code.
   - Service of Process Email Address Change: Current Email Address, *New Email Address, *Confirm Email Address.
   - Change Registered Agent Name: current shown; *Name.
   - Change Registered Agent Address: current shown; *Mailing Address1, Mailing Address2, *City, State (NY, fixed), *Zip Code.
   - Attestation and Signature STOP: certify box ("…authorized to sign these Certificate of Change…"), *Signature, *Capacity of Signer: Member / Manager / Authorized Person.
   - Filer's Information (as G).
   - Fees: Certificate of Change, Domestic LLC Fee $30.00 + Plain Copy $5 → Total $35.00. < Go Back · Reset · Continue >.
4. Preview: rendered certificate stamped "PREVIEW ONLY" ("THIRD: The change(s) effected hereby are…"). < Back · Continue >.
5. Payment (as H) → **Submit (FINAL)**.

## Screen J: Copy of Document ("Copy Request Processing System")
1. Search Entity: "DOS ID/Assumed Name ID OR Entity Name/Assumed Name Search": DOS ID, Entity Name, Assumed Name ID, Assumed Name (fill one route). < Go Back · Reset · Continue >. Red error if no entity is picked from the list.
2. Entity Filing History: Entity Information (DOS ID, name, county, date of initial filing, assumed name), table with Select checkbox, Description, Filing Date, Filing Number, Number of Pages, DOSID, Certcode (search box, Actions menu). Note: proclamations of dissolution/annulment/revocation aren't available here. Fee Description: Number of Documents Selected, Plain Copy Fee ($5.00 per document), Certified Copy Fee, Total Fee. Requester Information (prefilled; *Distribution Email, Cc Email, Confirm Email).
3. Selection confirmation: "Please review all information and click Continue to pay…".
4. Payment: Fee Information (Service Description "Copy Request", entity, DOS ID, count, fees), Drawdown Account, Payment Authorization STOP, **Submit (FINAL)**.

## Screen K: Certificates of Status ("Certificate of Status Processing System")
- Note: entities dissolved before 1/1/1985 must be requested in writing.
- Search Entity (same four fields as J); Requester information (prefilled; Distribution Email, Cc, Confirm).
- Select Certificate of Status: Short Form (current status) / Long Form (current status plus list of all documents filed). < Go Back · Reset · Continue >.
- Review page with requester details, Continue >.
- Payment: Total Fee to be charged ($25.00 seen for Short Form), *Drawdown Account, Balance, Customer Reference Number; Payment Authorization STOP ("…charged to my credit card or drawdown account"); < Go Back · Reset · **Submit (FINAL)**.

## Screen L: E-Submission (upload a ready-made PDF)
1. E-Submission Filing Selection: *Business Category (DOMESTIC / FOREIGN / a third category whose types are Non-DOS ID, Other and the name reservations), *Entity Type, *Filing Type & Section of Law. Each list loads after the one before it.
   - Domestic entity types: Benefit Corporation, Benevolent Order, Business Corporation, Condominium, Cooperative Corporation (and Worker Cooperative), Design Professional Service Corporation, Designation of the Secretary of State, General Association, Harness Horse Race Meeting Corporation, Housing Development Fund Company (Art. XI), Joint Stock Association, Limited Liability Company, Limited Partnership, Limited-Profit Housing Company (Art. 2 PHFL & BCL / & NPCL), Not-for-Profit Corporation (plus its special kinds: board of trade, community mental health, fire, HDFC, land bank, local development, militia, public cemetery, university faculty practice), Professional Service Corporation, Professional Service LLC, Religious Corporation, and more below the fold.
   - Foreign entity types: Business Corporation, Designation of the Secretary of State, General Association, LLC, LP, Not-for-Profit Corporation, Professional Service Corporation, Professional Service LLC, Religious Corporation, NY Registered Foreign LLP.
   - Third category: Non-DOS ID, Other, Reservation of Domestic/Foreign Business Corporation, LLC, LP, Not-for-Profit Corporation.
   - Filing types seen: Domestic LLC → "Articles of Organization - Limited Liability Company Law - 203", "Certificate of Assumed Name"; Professional Service LLC → "Articles of Organization - … - 1203", "Certificate of Consolidation"; Religious → "Certificate of Incorporation - Religious (Article 9) - 180", "Certificate of Consolidation"; Harness Horse Race → "Certificate of Incorporation - … - 302", "Certificate of Consolidation".
   - Buttons < Go Back · Reset · Continue >.
2. For a new entity: Proposed Entity Name ("The name of the entity is:" Name). For an existing one: "E-Submission Amendment Entity Selection" (*DOS ID or *Entity Name, Search).
3. Filing Information: Submitter Name and Address (from profile; *Email Address, CC Email Address); Customer Reference Number (optional); Document Imaging: *Upload Document (file chooser; error "File upload details not found. Please try again." if none); Additional Services: *Level Of Service: 2 HOUR $150.00 / SAME DAY $75.00 / 24 HOUR $25.00 / ROUTINE $0.00; Additional Services: Plain Copy ($5.00 per document), Certified Copy ($10.00 per document), Certificate of Status Short-Form ($25.00).
   - Fee Summary: Filing Fee (Articles of Organization LLC $200.00; Certificate of Assumed Name for an LLC $25.00), Expedited Service Fee, Plain/Certified/Status fees, Total Fees (seen $355.00 = 200 + 150 + 5; $175.00 = 25 + 150).
   - < Go Back · Reset · Continue >.
4. Payment: recap (Business Type, Filing Type, Entity Name, File Name, each fee, Total); *Drawdown Account, Balance; Payment Authorization STOP; < Go Back · Reset · **Submit (FINAL)**.

## Screen M: Replenish DD Account (fund the draw-down account)
- Drawdown Deposit: Service Company (display), *Drawdown Accounts select ("Select One" / "<company> - F##"), Account Balance, *Deposit Amount; Payment Authorization.
- Error without an account picked: toast "You need to login. Please select a drawdown account." and inline "Please select a drawdown account."
- Continues to an Elavon hosted payment page: Order Section (amount in USD), Payment Card (Visa/MC/Amex/Discover), Card Number, Expiration Date (MMYY), CVV2, "do not close your browser" note, Submit Payment. The engine never enters card data; replenishing is the user's job.

## Engine notes
- Service companies pay from the prefunded draw-down account. The account in the recording showed a $0 balance, so every Submit would fail until it is replenished. Check the balance on the payment page before submitting.
- Every filing ends with a Payment Authorization checkbox and, before that, a certify box plus typed signature (except copies, status and E-Submission, which have only the payment box). Both need the user's explicit yes per filing.
- BCL: incorporator name must equal the typed signature.
- Amendments, changes and dissolutions start with an exact DOS ID + entity name match; get both from the DOS entity search first.
- Previews and transaction numbers are kept 3 business days; after a dropped connection, check Retrieve a Saved Transaction before refiling.

## Site reliability
- From the cloud browser, filings.dos.ny.gov and apps.dos.ny.gov returned "upstream connect error … connection termination". The Fly/Steel browsers will likely hit the same; test from the deploy network.
- In the user's Chrome, four tries on 2026-11-24 were cut by the Techloq web filter ("(104) Connection reset by peer"), on `/efiling/1`, `/efiling/2` and then the signed-in home page. The recording shows the site working end to end, so the block is most likely that filter, not DOS. Whitelist filings.dos.ny.gov in Techloq for live runs from that machine.
- The adapter needs retries with backoff and must treat a reset mid-wizard as unknown state.

## Not mapped
- Retrieve a Saved Transaction, Retrieve Images, Service Company Administration, Authenticate, and the E-Submission Dashboard were not opened in the recording.
- Which screen of the dissolution flow holds the extra-copy checkboxes isn't clear in the video; only the fee lines show.
