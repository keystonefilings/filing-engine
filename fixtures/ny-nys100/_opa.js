// Replica of the NYS-100 interview on NY Business Express (Oracle Policy Automation), laid out as the
// walk of 2026-11-24 describes it (docs/portal-maps/ny-nys100-unemployment.md). For tests only.
// State lives in sessionStorage; the SSN is kept masked, as nothing here needs it whole.
(() => {
  const KEY = "nys100-fixture";
  const fresh = () => ({ visited: [], values: {}, members: [], addressChoices: [], hangs: 0, profile: null, attested: false });
  const load = () => { try { return JSON.parse(sessionStorage.getItem(KEY)) || fresh(); } catch { return fresh(); } };
  let st = load();
  const save = () => sessionStorage.setItem(KEY, JSON.stringify(st));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const shown = (el) => !!el && el.getClientRects().length > 0;

  // ---- building blocks ----
  const attrs = (o) => `${o.show ? ` data-show="${esc(o.show)}"` : ""}`;
  const field = (id, label, o = {}) => `<div class="fld"${attrs(o)}><label for="${id}">${label}${o.req ? "*" : ""}</label>` +
    `<input id="${id}" name="${id}" type="${o.type || "text"}"${o.req ? " data-req" : ""}${o.max ? ` maxlength="${o.max}"` : ""}${o.value !== undefined ? ` value="${esc(o.value)}"` : ""}${o.readonly ? " readonly" : ""}${o.ph ? ` placeholder="${esc(o.ph)}"` : ""}></div>`;
  const area = (id, label, o = {}) => `<div class="fld"${attrs(o)}><label for="${id}">${label}${o.req ? "*" : ""}</label><textarea id="${id}" name="${id}"${o.req ? " data-req" : ""}></textarea></div>`;
  const opt = (o) => (Array.isArray(o) ? `<option value="${esc(o[0])}">${esc(o[1])}</option>` : `<option>${esc(o)}</option>`);
  const select = (id, label, options, o = {}) => `<div class="fld"${attrs(o)}><label for="${id}">${label}${o.req ? "*" : ""}</label>` +
    `<select id="${id}" name="${id}"${o.req ? " data-req" : ""}${o.disabled ? " disabled" : ""}>${options.map(opt).join("")}</select></div>`;
  const yn = (name, question, o = {}, choices = ["Yes", "No"]) => `<div class="q"${attrs(o)}><p class="qt">${question}*</p><div class="yn">` +
    choices.map((c) => `<button type="button" data-yn="${name}" data-v="${c}" aria-pressed="false">${c}</button>`).join("") +
    `</div><input type="hidden" id="${name}" name="${name}" data-req></div>`;
  const btns = (...labels) => `<div class="actions">${labels.map((l) => `<button type="button" data-act="${esc(l)}">${l}</button>`).join(" ")}</div>`;

  const COUNTRIES = ["United States", "Canada", "Mexico"];
  const STATES = [["", "Select"], ["NY", "New York"], ["NJ", "New Jersey"], ["PA", "Pennsylvania"], ["CT", "Connecticut"], ["CA", "California"], ["ON", "Ontario"], ["QC", "Quebec"]];
  const COUNTIES = ["", "Albany", "Bronx", "Erie", "Kings", "Monroe", "Nassau", "New York", "Queens", "Richmond", "Suffolk", "Westchester"];
  const address = (p, o = {}) => `<div class="addr" data-addr="${p}"${attrs(o)}>` +
    field(`${p}-attn`, "ATTN (C/O)", { req: o.attnReq }) +
    field(`${p}-l1`, "Address Line 1", { req: true }) + field(`${p}-l2`, "Address Line 2") + field(`${p}-city`, "City", { req: true }) +
    select(`${p}-country`, "Country", COUNTRIES, { req: true }) + select(`${p}-state`, "State/Province", STATES, { req: true }) +
    field(`${p}-zip`, o.zipLabel || "Zip Code", { req: true, show: `${p}-country=United States` }) +
    field(`${p}-zip4`, "ZIP + 4", { show: `${p}-country=United States` }) +
    field(`${p}-postal`, "Postal Code", { req: true, show: `${p}-country!=United States` }) +
    select(`${p}-county`, "County", COUNTIES, { req: o.countyReq !== false, show: `${p}-country=United States&&${p}-state=NY` }) +
    `<button type="button" data-validate="${p}">Validate Address</button></div>`;
  const addrText = (v, p) => v && v[`${p}-l1`] ? `${v[`${p}-l1`]}, ${v[`${p}-city`]} ${v[`${p}-state`]} ${v[`${p}-zip`] || v[`${p}-postal`] || ""}`.trim() : "";
  const phys = () => addrText(st.values.P5, "phys");

  const ACTIVITIES = ["", "Arts, Entertainment & Recreation", "Computer/Information Services", "Construction", "Corporate, Subsidiary Managing Office", "Educational Services",
    "Finance and Insurance", "Food Service, Drinking & Accommodations", "Health & Social Assistance", "Manufacturing", "Non store retailer", "Real Estate",
    "Rental ; Leasing Services", "Retail Trade", "Scientific/Professional & Technical Services", "Transportation", "Utilities", "Warehousing", "Wholesale trade", "Other"];
  const NAICS = [["541611", "Administrative Management and General Management Consulting Services"], ["541612", "Human Resources Consulting Services"],
    ["541618", "Other Management Consulting Services"], ["541690", "Other Scientific and Technical Consulting Services"], ["722511", "Full-Service Restaurants"]];
  const SERVICE = ACTIVITIES.filter((a) => a && a !== "Manufacturing" && a !== "Other").join("|");
  const years = Array.from({ length: 101 }, (_, i) => String(2026 - i));
  const pad = (n) => String(n).padStart(2, "0");

  const memberModal = () => `<div id="member-modal" class="modal" role="dialog" aria-label="Add Record" style="display:none"><h2 id="member-modal-title">Add Record</h2>` +
    select("m-type", "Type of Principal", ["", "Person", "Business"], { req: true }) +
    select("m-title", "Title", ["", "Member", "Managing Member"], { req: true }) +
    field("m-first", "First Name", { req: true }) + field("m-mi", "M.I.", { max: 1 }) + field("m-last", "Last Name", { req: true }) +
    select("m-suffix", "Suffix", ["", "I", "II", "III", "IV", "V", "JR", "SR"]) +
    `<div class="fld"><label for="m-dob-y">Date of Birth*</label><select id="m-dob-y" name="m-dob-y" data-req>${["YYYY", ...years].map((y, i) => `<option value="${i ? y : ""}">${y}</option>`).join("")}</select>` +
    `<select id="m-dob-m" name="m-dob-m" data-req>${["MM", ...Array.from({ length: 12 }, (_, i) => pad(i + 1))].map((m, i) => `<option value="${i ? m : ""}">${m}</option>`).join("")}</select>` +
    `<select id="m-dob-d" name="m-dob-d" data-req>${["DD", ...Array.from({ length: 31 }, (_, i) => pad(i + 1))].map((d, i) => `<option value="${i ? d : ""}">${d}</option>`).join("")}</select></div>` +
    yn("m-resident", "Is this individual a resident of the United States?") +
    `<div class="fld" data-show="m-resident=Yes"><label for="m-ssn1">SSN*</label><input id="m-ssn1" name="m-ssn1" maxlength="3" data-req> - <input id="m-ssn2" name="m-ssn2" maxlength="2" data-req aria-label="SSN middle"> - <input id="m-ssn3" name="m-ssn3" maxlength="4" data-req aria-label="SSN last four"></div>` +
    field("m-tel", "Telephone Number", { req: true }) + field("m-email", "E-mail Address") +
    field("m-own", "Ownership Percentage", { req: true }) + field("m-profit", "Profit distribution percentage, if different than ownership percentage") +
    `<h3>Residential Address</h3>` + address("mem") +
    `<div class="actions"><button type="button" id="m-save">Save and Close</button><button type="button" id="m-update" style="display:none">Update</button><button type="button" id="m-cancel">Cancel</button></div></div>`;

  // ---- the screens, in the walked order ----
  const SCREENS = {
    intro: { title: "Introduction", next: "entity", body: () => `<p>Your Business Profile is created now and reused for your other New York applications.</p>${btns("Get Started", "Exit Application")}` },
    entity: {
      title: "Entity Type", next: "ident",
      body: () => select("ent", "Type of entity or organization:", ["", "Individual (Sole Proprietor)", "Limited Liability Company", "Corporation", "Limited Liability Partnership", "Limited Partnership", "Partnership", "Government", "Trust", "Estate"], { req: true, disabled: st.profile === "existing" }) +
        `<div class="notice" data-show="ent!="><strong>Stop:</strong> Before you continue, please confirm the Business entity type you selected above. If incorrect, you will have to start a new application.</div>` +
        select("llc-sub", "Sub Type for LLC", ["", "Member Managed LLC", "Manager Managed LLC"], { req: true, show: "ent=Limited Liability Company" }) +
        select("corp-sub", "Sub Type for Corporation", ["", "S Corp", "C Corp"], { req: true, show: "ent=Corporation" }) +
        select("part-sub", "Sub Type for Partnership", ["", "Joint Venture", "Partnerships"], { req: true, show: "ent=Partnership" }) + btns("Back", "Continue", "Exit Application"),
      load: () => { if (st.profile === "existing") $("#ent").value = "Limited Liability Company"; },
    },
    ident: {
      title: "Business Identification", next: "addresses",
      body: () => field("legal", "Legal Name", { req: true }) + field("dba", "DBA or trade name") + field("fein", "Federal Employer Identification Number (EIN)", { ph: "##-#######" }) +
        `<div class="fld"><label><input type="checkbox" id="nofein" name="nofein"> I do not have a Federal Employer Identification Number (EIN)</label></div>` + btns("Back", "Save & Continue", "Exit Application"),
      check: () => {
        const v = $("#fein").value.trim();
        if (!v) return ["Federal Employer Identification Number is required", "You must have a Federal Employer Identification Number (EIN) to file an NYS100 online application."];
        const d = v.replace(/\D/g, "");
        if (!/^\d{2}-\d{7}$/.test(v)) return ["Enter the FEIN as ##-#######."];
        if (/^(\d)\1{8}$/.test(d) || d === "123456789" || d === "987654321") return ["The FEIN field cannot have all of the same numbers or equal 123456789 or 987654321."];
        return [];
      },
    },
    addresses: { title: "Business Addresses", next: "physical", body: () => `<p>There are three types of addresses: Business Physical Address(es), Additional Physical Location(s) and Mailing Address(es).</p>${btns("Back", "Next")}` },
    physical: {
      title: "Business Physical Address", next: "locations",
      body: () => `<p>If the business has no permanent place of business, enter the owner's home address.</p>` + address("phys") +
        `<div class="fld"><label><input type="checkbox" id="phys-mailing" name="phys-mailing"> This is also the mailing address</label></div>` +
        `<p data-show="phys-mailing=on">Note: all correspondence, including your license/permit, will be sent to the physical address listed.</p>` + btns("Back", "Save & Continue", "Exit Application"),
    },
    locations: { title: "Additional Physical Location(s)", next: "mailing", body: () => `<table><thead><tr><th>ADDRESS</th><th>Edit</th><th>Delete</th></tr></thead><tbody></tbody></table><p>Total Records: 0</p><p>Primary Physical Location: ${esc(phys())}</p><button type="button">Add Another Location</button>${btns("Back", "Next")}` },
    mailing: {
      title: "Mailing Address(es)", next: "contact",
      body: () => `<p>All correspondence will be sent to the mailing address.</p><table><thead><tr><th>ADDRESS</th><th>Edit</th><th>Delete</th></tr></thead><tbody></tbody></table><button type="button">Add Another Address</button>` +
        `<h3>Physical Locations that are also a Mailing Address</h3><p>${st.values.P5?.["phys-mailing"] === "on" ? esc(phys()) : "None"}</p>${btns("Back", "Save & Continue")}`,
      check: () => (st.values.P5?.["phys-mailing"] === "on" ? [] : ["You must provide a mailing address."]),
    },
    contact: {
      title: "Contact Information", next: "naics",
      body: () => field("tel", "Telephone Number", { req: true, ph: "###-###-####" }) + `<button type="button">Remove</button><button type="button">Add Another Telephone Number</button>` +
        field("mobile", "Mobile Phone Number") + field("fax", "Fax Number") + field("email", "E-mail Address") + `<button type="button">Add Another Email Address</button>` +
        field("web", "Business Website") + btns("Back", "Save & Continue"),
      check: () => (/^\d{3}-\d{3}-\d{4}$/.test($("#tel").value) ? [] : ["Enter the telephone number as ###-###-####."]),
    },
    naics: {
      title: "Industry Classification", next: "ownerintro",
      body: () => `<h3>Primary NAICS Code</h3>` + field("naics-search", "Enter NAICS to Search") + `<ul id="naics-list" role="listbox" style="display:none"></ul><input type="hidden" id="naics" name="naics" data-req><p id="naics-picked"></p>` +
        `<h3>Filter by Category</h3>` + select("sector", "Sector", ["", "54 Professional, Scientific, and Technical Services", "72 Accommodation and Food Services"]) + `<button type="button">Select</button><button type="button">Reset</button>` +
        `<fieldset class="fld"><legend>Do you have a secondary NAICS Code?*</legend><label><input type="radio" name="secondary" value="Yes" data-req> Yes</label><label><input type="radio" name="secondary" value="No"> No</label></fieldset>` + btns("Back", "Save & Continue"),
      load: () => {
        const box = $("#naics-search"), list = $("#naics-list");
        box.addEventListener("input", () => {
          const q = box.value.trim().toLowerCase();
          const hits = q.length < 3 ? [] : NAICS.filter(([c, t]) => c.startsWith(q) || t.toLowerCase().includes(q));
          list.innerHTML = hits.map(([c, t]) => `<li role="option" data-code="${c}">${c} - ${esc(t)}</li>`).join("");
          list.style.display = hits.length ? "" : "none";
        });
        list.addEventListener("click", (e) => { const li = e.target.closest("li"); if (!li) return; $("#naics").value = li.dataset.code; $("#naics-picked").textContent = `Selected: ${li.textContent}`; list.style.display = "none"; });
      },
    },
    ownerintro: { title: "Owner/Business Principal", next: "members", body: () => `<p>Enter each owner: name, title, address, phone, date of birth, SSN or FEIN, ownership percentage and profit distribution percentage.</p>${btns("Next")}` },
    members: {
      title: "Member Information", next: "ui1",
      body: () => `<table id="grid"><thead><tr><th>Title</th><th>Name</th><th>SSN</th><th>Ownership %</th><th>Address</th><th>Edit</th><th>Delete</th></tr></thead><tbody>` +
        st.members.map((m, i) => `<tr><td>${esc(m.title)}</td><td>${esc(m.name)}</td><td>${esc(m.ssn || "")}</td><td>${esc(m.own)}</td><td>${esc(m.addr)}</td><td><a href="#" data-edit="${i}">Edit</a></td><td><a href="#">Delete</a></td></tr>`).join("") +
        `</tbody></table><button type="button" id="add-member">Add A Member</button>` + memberModal() + btns("Back", "Save & Continue", "Exit Application"),
      check: () => (st.members.length ? [] : ["You must enter at least one member."]),
      load: () => membersScreen(),
    },
    ui1: { title: "Unemployment Insurance Registration", next: "ui2", body: () => `<p>Register for Unemployment Insurance, Withholding and Wage Reporting.</p>${btns("Back", "Next")}` },
    ui2: {
      title: "Business Identification", next: "liability",
      body: () => field("ern", "Employer Registration Number") + `<p>Do not enter your FEIN. New employers will be assigned one.</p>` + field("etype", "Employer Type", { value: "Business Employer", readonly: true }) + btns("Back", "Save & Continue"),
      check: () => { const v = $("#ern").value.trim(); return !v || /^\d{7}$/.test(v) ? [] : ["The Employer Registration Number has 7 digits."]; },
    },
    liability: {
      title: "Business Liability", next: "transfers",
      body: () => yn("paid300", "Have you paid (or do you expect to pay) total remuneration of $300 or more during any calendar quarter?") +
        field("began", "Select the date you began business in New York State.", { req: true, ph: "MM/DD/YYYY" }) +
        select("quarter", "Select first calendar quarter and year that you paid (or expect to pay) total remuneration of $300 or more:", ["", "January - March", "April - June", "July - September", "October - December"], { req: true }) +
        field("year", "Year", { req: true, ph: "yyyy" }) +
        yn("withhold", "Have you or will you withhold New York State Income Tax from your employees' pay?") +
        field("firstpay", "Select the date of the first payroll from which you withheld or will withhold. (mm/dd/yyyy):", { req: true, show: "withhold=Yes" }) +
        field("employees", "Total number of Employees:", { req: true }) +
        yn("nonemp", "Do persons work for you whom you do not consider to be your employees?") +
        area("services", "Describe services performed:", { req: true, show: "nonemp=Yes" }) + btns("Back", "Save & Continue"),
      check: () => ["began", "firstpay"].filter((id) => shown($(`#${id}`)) && $(`#${id}`).value && !/^\d{2}\/\d{2}\/\d{4}$/.test($(`#${id}`).value)).map(() => "Enter dates as MM/DD/YYYY."),
    },
    transfers: {
      title: "Business Transfers", next: "legal",
      body: () => yn("acquired", "Have you acquired the business of an employer liable for New York State Unemployment Insurance?") +
        `<div data-show="acquired=Yes"><h3>Acquired Employer Details</h3>` + yn("allpart", "Did you acquire All or Part?", {}, ["All", "Part"]) +
        field("acq-date", "Acquired Date", { req: true }) + field("acq-name", "Acquired Employer Legal Name", { req: true }) +
        `<h4>Acquired Employer Address</h4>` + address("acq", { zipLabel: "ZIP/Postal Code" }) +
        field("acq-reg", "Acquired Employer Registration Number", { ph: "##-#####" }) + field("acq-fein", "Acquired Employer's FEIN", { ph: "##-#######" }) +
        `<button type="button">Add New</button><button type="button">Remove</button></div>` + btns("Back", "Save & Continue"),
    },
    legal: {
      title: "Change of Legal Entity", next: "membercheck",
      body: () => yn("changed", "Has your Legal Entity changed?") +
        `<div data-show="changed=Yes">` + field("chg-date", "Date of Legal Entity Change:", { req: true }) + field("prev-reg", "Previous NYS Employer Registration Number:", { req: true }) +
        field("prev-fein", "Previous Federal Employer Identification Number:", { req: true }) + `</div>` + btns("Back", "Save & Continue"),
    },
    membercheck: {
      title: "Member Information", next: "addrcontact",
      body: () => `<p>You must enter atleast one Member for this application.</p>` + st.members.map((m) => `<div class="card"><p>${esc(m.title)}: ${esc(m.name)}</p><p>${esc(m.addr)}</p><p>${esc(m.tel)}</p><p>Ownership ${esc(m.own)}%</p></div>`).join("") +
        `<p>${st.members.length} of ${st.members.length} rows selected</p><button type="button">Add New Member Information</button>` + btns("Back", "Save & Continue"),
    },
    addrcontact: {
      title: "Address and Contact Information", next: "books",
      body: () => `<div class="grid"><h3>Mailing Address</h3><div class="fld"><label><input type="radio" name="pick-mail" value="1" data-req> ${esc(st.values.P3?.dba || st.values.P3?.legal || "")} ${esc(phys())}</label></div><button type="button">Add New Mailing Address</button></div>` +
        `<div class="grid"><h3>Email Addresses</h3><div class="fld"><label><input type="radio" name="pick-email" value="1" data-req> ${esc(st.values.P8?.email || "")}</label></div><button type="button">Add New Email Address</button></div>` +
        `<div class="grid"><h3>Telephone Numbers</h3><div class="fld"><label><input type="radio" name="pick-tel" value="1" data-req> ${esc(st.values.P8?.tel || "")}</label></div><button type="button">Add New Telephone Number</button></div>` + btns("Back", "Save & Continue"),
    },
    books: {
      title: "Address: Location of Books and Records", next: "charges",
      body: () => `<p>Physical address where your books and records can be reviewed. This address must be located in the United States.</p>` +
        select("books-pick", "Select an Address for Location of Books and Records", ["Other", phys()], { req: true }) + address("books", { countyReq: false }) + field("books-tel", "Phone Number", { req: true }) + btns("Back", "Save & Continue"),
      load: () => prefillFrom("books"),
    },
    charges: {
      title: "Address: Notice of Potential Charges", next: "agent", hangOnce: true,
      body: () => `<p>This is the address where the Notice of Potential Charges (LO400) will be sent. It is sent each time a former employee files a claim for UI benefits.</p>` +
        select("charges-pick", "Select an Address for: Notice of Potential Charges", ["Other", phys()], { req: true }) + address("charges", { countyReq: false }) + field("charges-tel", "Phone Number", { req: true }) + btns("Back", "Save & Continue"),
      load: () => prefillFrom("charges"),
    },
    agent: {
      title: "Address: Agent - C/O", next: "physloc",
      body: () => yn("toagent", "Do you want all of your mail directed to your Agent - C/O?") +
        `<p data-show="toagent=Yes">Tip: This is your agent's address. Complete this only if you want all your Unemployment Insurance mail sent here.</p>` +
        address("agent", { show: "toagent=Yes", attnReq: true, countyReq: false }) + btns("Back", "Save & Continue"),
    },
    physloc: { title: "Physical Locations", next: "physdetail", body: () => `<p>Below are Physical Locations in New York associated with the business.</p><table><thead><tr><th>Address</th></tr></thead><tbody><tr><td>${esc(phys())}</td></tr></tbody></table><p>1 of 1 rows selected</p><button type="button">Add New Physical Address(es)</button>${btns("Back", "Save & Continue")}` },
    physdetail: {
      title: "Physical Locations Details", next: "submitter",
      body: () => `<p>${esc(phys())}</p>` + field("loc-emp", "Number of employees", { req: true }) + select("activity", "Select Principal Activity", ACTIVITIES, { req: true }) +
        field("other", "If other, furnish details:", { req: true, show: "activity=Other" }) +
        field("products", "Principal Products Produced:", { req: true, show: "activity=Manufacturing" }) + field("raw", "Principal Raw Material Used:", { req: true, show: "activity=Manufacturing" }) +
        field("salespct", "Percent of Total Sales Value:", { req: true, show: "activity=Manufacturing" }) +
        field("estab", "Type of Establishment:", { req: true, show: `activity=${SERVICE}` }) + field("product", "Principal Product Sold or Service Rendered:", { req: true, show: `activity=${SERVICE}` }) +
        field("revpct", "Percent of Total Revenue:", { req: true, show: `activity=${SERVICE}` }) + btns("Back", "Save & Continue"),
    },
    submitter: {
      title: "Submitter Information", next: "ready",
      body: () => field("s-first", "First Name", { req: true }) + field("s-mi", "M. I.", { max: 1 }) + field("s-last", "Last Name", { req: true }) + field("s-pos", "Official Position", { req: true }) +
        field("s-tel", "Phone Number", { req: true }) + field("s-email", "Email", { req: true }) + area("s-comments", "Submitter Comments") +
        `<p>By pressing the submit button, I affirm that I have read the above questions and that the answers provided are true to the best of my knowledge and belief.</p>` +
        `<div class="fld"><label><input type="checkbox" id="attest" name="attest" disabled> I attest to the above</label></div>` + btns("Back", "Save & Continue") + logScript(),
      load: () => {
        const ready = () => { $("#attest").disabled = ["s-first", "s-last", "s-pos", "s-tel", "s-email"].some((id) => !$(`#${id}`).value.trim()); };
        document.addEventListener("input", ready); ready();
      },
      check: () => ($("#attest").checked ? [] : ["You must attest to the above."]),
      saved: () => { st.attested = true; },
    },
    ready: { title: "Ready to Submit", next: null, body: () => `<p>Attested: ${st.attested ? "yes" : "no"} by ${esc(st.values.A13?.["s-first"] || "")} ${esc(st.values.A13?.["s-last"] || "")}</p><button type="button">Submit</button>${logScript()}` },
  };
  const IDS = { intro: "P1", entity: "P2", ident: "P3", addresses: "P4", physical: "P5", locations: "P6", mailing: "P7", contact: "P8", naics: "P9", ownerintro: "P10", members: "P11",
    ui1: "A1", ui2: "A2", liability: "A3", transfers: "A4", legal: "A5", membercheck: "A6", addrcontact: "A7", books: "A8", charges: "A9", agent: "A10", physloc: "A11", physdetail: "A12", submitter: "A13", ready: "R" };
  function logScript() { return `<script type="application/json" id="fixture-log">${JSON.stringify(st).replace(/</g, "\\u003c")}<\/script>`; }

  // ---- behaviour ----
  function valueOf(name) {
    const els = $$(`[name="${name}"]`);
    if (!els.length) return "";
    const el = els[0];
    if (el.type === "radio") return (els.find((r) => r.checked) || {}).value || "";
    if (el.type === "checkbox") return el.checked ? "on" : "";
    return el.value;
  }
  function holds(cond) {
    return cond.split("&&").every((c) => {
      const m = /^([^!=]+)(!?=)(.*)$/.exec(c);
      const v = valueOf(m[1]);
      const any = m[3].split("|");
      return m[2] === "=" ? any.includes(v) : !any.includes(v);
    });
  }
  function refresh() { for (const el of $$("[data-show]")) el.style.display = holds(el.dataset.show) ? "" : "none"; }
  function prefillFrom(p) {
    $(`#${p}-pick`).addEventListener("change", () => {
      const v = st.values.P5 || {};
      const mine = $(`#${p}-pick`).value !== "Other";
      for (const k of ["l1", "l2", "city", "country", "state", "zip", "zip4", "county"]) { const el = $(`#${p}-${k}`); if (el) el.value = mine ? (v[`phys-${k}`] ?? el.value) : ""; }
      if (!mine) $(`#${p}-country`).value = "United States";
      $(`[data-addr="${p}"]`).dataset.validated = "0";
      refresh();
    });
  }
  function clearErrors(root) { for (const e of $$(".err, .banner", root)) e.remove(); }
  function mark(el, msg) { const box = el.closest(".fld, .q, .addr") || el; box.insertAdjacentHTML("beforeend", `<span class="err" role="alert">${msg}</span>`); }
  function requiredMissing(root) {
    let bad = 0;
    for (const el of $$("[data-req]", root)) {
      const box = el.closest(".fld, .q") || el;
      if (!shown(box)) continue;
      if (!valueOf(el.name).trim()) { mark(el, "This field is required."); bad++; }
    }
    for (const b of $$("[data-addr]", root)) if (shown(b) && b.dataset.validated !== "1") { mark($("[data-validate]", b), "You are required to validate this address."); bad++; }
    return bad;
  }
  function collect(root) {
    const out = {};
    for (const el of $$("input[name], select[name], textarea[name]", root)) {
      const box = el.closest(".fld, .q") || el;
      if (el.type !== "hidden" && !shown(box)) continue;
      if (el.type === "radio") { if (el.checked) out[el.name] = el.value; continue; }
      out[el.name] = el.type === "checkbox" ? (el.checked ? "on" : "") : el.value;
    }
    return out;
  }
  function busy(text, ms) { return new Promise((r) => { const b = $("#busy"); b.textContent = text; b.style.display = ""; setTimeout(() => { b.style.display = "none"; r(); }, ms); }); }
  function go(next) { save(); busy("Saving screen ...", 250).then(() => { $("#busy").style.display = ""; location.href = `interview.html?s=${next}`; }); }

  async function saveAndContinue(id) {
    const s = SCREENS[id];
    const main = $("#screen");
    clearErrors(main);
    const bad = requiredMissing(main);
    const msgs = bad ? [] : (s.check ? s.check() : []);
    for (const m of msgs) main.insertAdjacentHTML("afterbegin", `<div class="banner" role="alert">${m}</div>`);
    if (bad || msgs.length) return;
    if (s.hangOnce && !st.hung?.[id]) { st.hung = { ...(st.hung || {}), [id]: true }; st.hangs++; save(); await busy("Processing", 600); return; } // dropped back, no message
    st.values[IDS[id]] = collect(main);
    if (s.saved) s.saved();
    go(s.next);
  }

  // Validate Address -> Address Verification -> USE SELECTED ADDRESS
  let validating = null;
  function openVerification(p) {
    validating = p;
    const g = (k) => ($(`#${p}-${k}`) || {}).value || "";
    $("#usps-text").textContent = `${g("l1").toUpperCase()} ${g("city").toUpperCase()} ${g("state")} ${(g("zip") || g("postal")).toUpperCase()}${g("zip") && !g("zip4") ? "-0001" : ""}`;
    for (const r of $$('input[name="addr-choice"]')) r.checked = false;
    $("#addr-modal").style.display = "";
  }
  function useSelected() {
    const pick = ($$('input[name="addr-choice"]').find((r) => r.checked) || {}).value;
    if (!pick) return;
    const p = validating;
    if (pick === "usps") { const l1 = $(`#${p}-l1`); l1.value = l1.value.toUpperCase(); }
    $(`[data-addr="${p}"]`).dataset.validated = "1";
    st.addressChoices.push({ screen: currentId, block: p, choice: pick === "usps" ? "usps" : "provided" });
    save();
    $("#addr-modal").style.display = "none";
  }

  // P11 member records
  let editing = null;
  function membersScreen() {
    const m = $("#member-modal");
    const open = (i) => {
      editing = i;
      for (const el of $$("input, select", m)) { if (el.type === "button") continue; if (el.type === "hidden") el.value = ""; else if (el.tagName === "SELECT") el.selectedIndex = 0; else el.value = ""; }
      for (const b of $$("[data-yn]", m)) b.setAttribute("aria-pressed", "false");
      $("[data-addr]", m).dataset.validated = "0";
      $("#m-type").disabled = i !== null;
      if (i !== null) { const r = st.members[i]; $("#m-type").value = "Person"; $("#m-first").value = r.first; $("#m-last").value = r.last; }
      $("#member-modal-title").textContent = i === null ? "Add Record" : "Edit Record";
      $("#m-save").style.display = i === null ? "" : "none";
      $("#m-update").style.display = i === null ? "none" : "";
      m.style.display = "";
      refresh();
    };
    $("#add-member").addEventListener("click", () => open(null));
    $("#grid").addEventListener("click", (e) => { const a = e.target.closest("[data-edit]"); if (a) { e.preventDefault(); open(Number(a.dataset.edit)); } });
    $("#m-cancel").addEventListener("click", () => { m.style.display = "none"; });
    const store = () => {
      clearErrors(m);
      if (requiredMissing(m)) return;
      if (valueOf("m-resident") === "No" && $("#mem-country").value === "United States") {
        m.insertAdjacentHTML("afterbegin", `<div class="banner" role="alert">You selected no to being a US resident and provided an address in the US.</div>`); return;
      }
      const v = collect(m);
      const ssn = v["m-ssn3"] ? `***-**-${v["m-ssn3"]}` : "";
      delete v["m-ssn1"]; delete v["m-ssn2"]; delete v["m-ssn3"];
      const row = { title: v["m-title"], first: v["m-first"], last: v["m-last"], name: `${v["m-first"]}${v["m-mi"] ? ` ${v["m-mi"]}.` : ""} ${v["m-last"]}${v["m-suffix"] ? ` ${v["m-suffix"]}` : ""}`,
        ssn, own: v["m-own"], tel: v["m-tel"], addr: addrText(v, "mem"), dob: `${v["m-dob-y"]}-${v["m-dob-m"]}-${v["m-dob-d"]}`, resident: v["m-resident"], values: v };
      if (editing === null) st.members.push(row); else st.members[editing] = { ...row, edited: true };
      save();
      m.style.display = "none";
      const tb = $("#grid tbody");
      tb.innerHTML = st.members.map((r, i) => `<tr><td>${esc(r.title)}</td><td>${esc(r.name)}</td><td>${esc(r.ssn)}</td><td>${esc(r.own)}</td><td>${esc(r.addr)}</td><td><a href="#" data-edit="${i}">Edit</a></td><td><a href="#">Delete</a></td></tr>`).join("");
    };
    $("#m-save").addEventListener("click", store);
    $("#m-update").addEventListener("click", store);
  }

  let currentId = null;
  function render() {
    const id = new URLSearchParams(location.search).get("s") || "intro";
    const s = SCREENS[id];
    currentId = id;
    st.visited.push(IDS[id]);
    save();
    const main = $("#screen");
    main.style.display = "none";
    main.innerHTML = `<h1>${s.title}</h1>${s.body()}`;
    if (s.load) s.load();
    refresh();
    for (const b of $$("[data-act]", main)) {
      const a = b.dataset.act;
      if (/^(save & continue|next|continue|get started)$/i.test(a)) b.addEventListener("click", () => saveAndContinue(id));
    }
    busy("Building screen ...", 200).then(() => { main.style.display = ""; });
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-yn]");
    if (b) {
      const name = b.dataset.yn;
      $(`#${name}`).value = b.dataset.v;
      for (const x of $$(`[data-yn="${name}"]`)) x.setAttribute("aria-pressed", String(x === b));
      refresh();
      return;
    }
    const v = e.target.closest("[data-validate]");
    if (v) { openVerification(v.dataset.validate); return; }
    if (e.target.id === "use-selected") useSelected();
  });
  document.addEventListener("input", (e) => { const blk = e.target.closest && e.target.closest("[data-addr]"); if (blk) blk.dataset.validated = "0"; refresh(); });
  document.addEventListener("change", (e) => { const blk = e.target.closest && e.target.closest("[data-addr]"); if (blk) blk.dataset.validated = "0"; refresh(); });
  // Mirror entered values into attributes so DOM snapshots show what the engine entered.
  document.addEventListener("input", (e) => { const t = e.target; if (t.tagName === "INPUT" && t.type !== "radio" && t.type !== "checkbox") t.setAttribute("value", t.value); if (t.tagName === "TEXTAREA") t.textContent = t.value; });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.tagName === "SELECT") Array.from(t.options).forEach((o) => o.toggleAttribute("selected", o.selected));
    else if (t.type === "checkbox") t.toggleAttribute("checked", t.checked);
    else if (t.type === "radio") $$(`input[name="${t.name}"]`).forEach((r) => r.toggleAttribute("checked", r.checked));
  });

  window.NYS = {
    render,
    reset(profile) { st = fresh(); st.profile = profile; if (profile === "existing") st.members = [{ title: "Member", first: "Avery", last: "Rivera", name: "Avery Rivera", ssn: "***-**-6789", own: "100", tel: "518-555-0100", addr: "1 Old Rd, Albany NY 12207", values: {} }]; save(); },
    start(picked) { st.values.P0 = { business: picked }; save(); busy("Loading screen ...", 200).then(() => { location.href = "interview.html?s=intro"; }); },
  };
})();
