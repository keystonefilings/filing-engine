// Replica of NJ-REG, Online Business and Employer Registration (njportal.com/DOR/BusinessRegistration), laid
// out as the walk of 2026-11-24 describes it (docs/portal-maps/nj-reg.md). For tests only. State lives in
// sessionStorage; owner SSNs are kept masked, as nothing here needs them whole.
(() => {
  const KEY = "njreg-fixture";
  const fresh = () => ({ visited: [], values: {}, record: null, owners: [], businessOwners: [], submitted: null });
  const load = () => { try { return JSON.parse(sessionStorage.getItem(KEY)) || fresh(); } catch { return fresh(); } };
  let st = load();
  const save = () => sessionStorage.setItem(KEY, JSON.stringify(st));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const shown = (el) => !!el && el.getClientRects().length > 0;

  const show = (o) => (o.show ? ` data-show="${esc(o.show)}"` : "");
  const field = (id, label, o = {}) => `<div class="form-group"${show(o)}><label for="${id}">${label}${o.req ? " *" : ""}</label>` +
    `<input id="${id}" name="${id}" type="text"${o.req ? " data-req" : ""}${o.max ? ` maxlength="${o.max}"` : ""}${o.value !== undefined ? ` value="${esc(o.value)}"` : ""}${o.readonly ? " readonly" : ""}></div>`;
  const area = (id, label, o = {}) => `<div class="form-group"${show(o)}><label for="${id}">${label}${o.req ? " *" : ""}</label><textarea id="${id}" name="${id}" maxlength="400"${o.req ? " data-req" : ""}></textarea></div>`;
  const opt = (o) => (Array.isArray(o) ? `<option value="${esc(o[0])}">${esc(o[1])}</option>` : `<option>${esc(o)}</option>`);
  const select = (id, label, options, o = {}) => `<div class="form-group"${show(o)}><label for="${id}">${label}${o.req ? " *" : ""}</label><select id="${id}" name="${id}"${o.req ? " data-req" : ""}>${options.map(opt).join("")}</select></div>`;
  const yn = (name, question, o = {}) => `<fieldset class="form-group"${show(o)}><legend>${question}${o.opt ? "" : " *"}</legend>` +
    `<label><input type="radio" name="${name}" value="Y"${o.opt ? "" : " data-req"}> Yes</label> <label><input type="radio" name="${name}" value="N"> No</label></fieldset>`;
  const check = (id, label, o = {}) => `<div class="form-group"${show(o)}><label><input type="checkbox" id="${id}" name="${id}"${o.checked ? " checked" : ""}> ${label}</label></div>`;
  const buttons = (...l) => `<div class="form-actions">${l.map((x) => `<button type="button" class="btn" data-act="${x}">${x}</button>`).join(" ")}</div>`;

  const STATES = [["", "-- Select --"], ["NJ", "New Jersey"], ["NY", "New York"], ["PA", "Pennsylvania"], ["DE", "Delaware"], ["CA", "California"], ["FL", "Florida"], ["PR", "Puerto Rico"], ["XX", "Foreign"]];
  const TITLES = ["", "Accountant", "Chairman", "Chief Operating Officer", "Co-Owner", "CPA", "Director", "ESQ.", "General Partner", "Incorporator", "Managing Member", "MBA", "MD", "Member", "Officer", "Other", "Owner", "PhD.", "Pres.", "Public Accountant", "Sec.", "Treas.", "Trustee", "VP"];
  const COUNTY_OF = (city, zip) => (/hoboken|jersey city/i.test(city) || /^070[3-6]/.test(zip) ? "Hudson" : /newark/i.test(city) || /^071/.test(zip) ? "Essex" : null);
  const MUNICIPALITIES = { Hudson: [["0905", "Hoboken City (0905)"], ["0906", "Jersey City (0906)"]], Essex: [["0714", "Newark City (0714)"]] };
  const BUSINESS_CODES = ["2754 (Service) - Consulting Services (All Types)", "2750 (Service) - Computer Services", "5812 (Retail) - Restaurants"];
  const NAICS = ["541611 Administrative Management and General Management Consulting Services", "541612 Human Resources Consulting Services", "541690 Other Scientific and Technical Consulting Services"];
  const TAX_QS = [
    ["salesTax", "Collect NJ Sales Tax and/or pay Use Tax?"], ["exemptPurchases", "Exempt purchases for inventory or production?"],
    ["tobacco", "Sell or distribute cigarettes, tobacco or nicotine products?"], ["motorFuels", "Sales or transport of motor fuels and/or petroleum?"],
    ["petroleumStorage", "Storage of petroleum and/or hazardous chemicals?"], ["litter", "Manufacturer, wholesaler, distributor or retailer of litter-generating products?"],
    ["solidWasteFacility", "Operate a solid waste facility?"], ["solidWasteTransport", "Transport solid waste to an out-of-state site or rail transfer station?"],
    ["landfill", "Own or operate a sanitary landfill or solid waste facility in NJ?"], ["gasElectric", "Sell, store, deliver or transport natural gas or electricity in NJ?"],
    ["publicContractor", "Contractor or subcontractor to the state, public agencies, schools or casino licensees?"], ["vehicleRental", "Motor vehicle rental for 28 days or less?"],
    ["tiresVehicles", "Retail sale of new motor vehicle tires, or sell or lease motor vehicles?"], ["telecom", "Voice grade access or mobile telecommunications in NJ?"],
    ["lodging", "Hotel, motel, bed and breakfast or similar in NJ?"], ["gamesOfChance", "Legalized games of chance with any one prize over $1,000?"],
    ["millvilleDistrict", "Operating in the Sports and Entertainment District of Millville?"],
  ];
  const OTHER_TAXES = ["No other eligibility", "Alcoholic Beverage Tax", "Atlantic City Luxury Tax", "Cape May County Tourism Sales Tax", "Corporation Banking and Financial Business Tax",
    "Insurance Premiums Tax", "Landfill Closure and Contingency Tax", "Public Utility Franchise Tax", "Sanitary Landfill Tax", "Solid Waste Services Tax",
    "Transfer Inheritance and Estate Tax", "Unemployment and Disability Taxes", "Salem County Tax"];
  const singleMember = () => /single member/i.test(st.values.ownership?.ownershipType || "");
  const ownerAddress = (p) => field(`${p}Street1`, "Street Address 1", { req: true }) + field(`${p}Street2`, "Street Address 2") + field(`${p}City`, "City", { req: true }) +
    select(`${p}State`, "State", STATES, { req: true }) + field(`${p}Zip`, "Zip Code", { req: true, max: 5 }) + field(`${p}ZipPlus`, "Zip Code Extension", { max: 4 });
  const autocomplete = (id, label, list) => `<div class="form-group"><label for="${id}">${label} *</label><input id="${id}" name="${id}" type="text" data-ac="${id}" data-req autocomplete="off">` +
    `<ul class="ui-autocomplete" role="listbox" id="${id}-list" style="display:none"></ul><input type="hidden" id="${id}-picked" name="${id}-picked" data-req-picked="${id}"></div>`;
  const log = () => `<script type="application/json" id="fixture-log">${JSON.stringify(st).replace(/</g, "\\u003c")}<\/script>`;

  const SCREENS = {
    first: {
      title: "Start Registration", next: "details",
      body: () => `<p>All corporations, LLC's and limited partnerships must register using their New Jersey Business Entity ID and EIN.</p><fieldset class="form-group"><legend>Select one: *</legend>` +
        ["Register a Business Entity (For-Profit Corporations, Non-Profit Corporations, Limited Partnerships, Limited Liability Companies and Limited Liability Partnerships)",
          "Register a General Partnership or Proprietorship", "Register as an Individual contracting with a NJ State or Local Government Agency",
          "Register a non-New Jersey Business Entity with employees residing in New Jersey", "Register as an Individual solely for Transient Accommodations",
          "Register as Remote Seller only", "Register as a Domestic/Household Employer"].map((l, i) => `<label><input type="radio" name="regType" value="${i + 1}"${i ? "" : " checked"}> ${l}</label><br>`).join("") +
        `</fieldset>${buttons("Continue")}`,
    },
    details: {
      title: "Business Identification", next: "data",
      body: () => field("EntityId", "Entity ID", { req: true }) + `<a href="#">Need Entity ID?</a>` + field("Ein", "EIN", { req: true, max: 9 }) +
        `<p>EIN is a nine-digit long Employer ID Number assigned by IRS. It cannot be assigned or provided by the State.</p>${buttons("Continue", "Back", "Cancel")}`,
      check: () => {
        if ($("#EntityId").value.trim() !== "0450123456" || $("#Ein").value.trim() !== "861236789") return ["The Entity ID and EIN entered do not match our records."];
        st.record = { name: "BLUE HARBOR CONSULTING, LLC", begin: "01/15/2026", street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030", tradeNames: ["BLUE HARBOR"] };
        return [];
      },
    },
    data: {
      title: "Business Data", next: "address",
      body: () => field("BusinessName", "Business Name", { value: st.record.name, readonly: true }) + field("BeginDate", "Beginning Date for this Business in New Jersey", { value: st.record.begin, readonly: true, req: true }) +
        yn("YearRound", "Will this be a year round business?") +
        select("TradeName", "Trade Name (\"Doing Business As\" Name, if applicable)", [["", "-- Select one for Trade name to be displayed on Business Registration Certificate --"], ...st.record.tradeNames]) + buttons("Continue", "Back", "Cancel"),
    },
    address: {
      title: "Business Address", next: "ownership",
      body: () => `<p>Main Business Address can be a US or International address. <a href="#">Enter an International Address.</a></p><h3>Main Business Address</h3>` +
        field("Street1", "Street Address 1", { req: true, value: st.record.street1 }) + field("Street2", "Street Address 2") +
        select("State", "State", STATES, { req: true }) + field("City", "City", { req: true, value: st.record.city }) +
        select("County", "County", [["", "-- Select --"]], { req: true }) + select("Municipality", "Municipality", [["", "-- Select --"]], { req: true }) +
        field("Zip", "Zip Code", { req: true, max: 5, value: st.record.zip }) + field("ZipPlus", "Zip Code Extension", { max: 4 }) +
        `<h3>Mailing Address</h3>` + field("AttentionTo", "Attention To", { req: true }) + check("MailingDifferent", "Mailing Address is different from Business Location") +
        `<div data-show="MailingDifferent=on">` + field("MStreet1", "Street Address 1", { req: true }) + field("MStreet2", "Street Address 2") + field("MCity", "City", { req: true }) +
        select("MState", "State", STATES, { req: true }) + field("MZip", "Zip", { req: true }) + `</div>` + buttons("Continue", "Back", "Cancel"),
      load: () => {
        $("#State").value = st.record.state;
        const counties = () => {
          const c = COUNTY_OF($("#City").value, $("#Zip").value);
          const keep = $("#County").value;
          $("#County").innerHTML = [["", "-- Select --"], ...(c ? [[c, c]] : [])].map(opt).join("");
          if (keep === c) $("#County").value = keep; else munis();
        };
        const munis = () => {
          const keep = $("#Municipality").value;
          const list = MUNICIPALITIES[$("#County").value] || [];
          $("#Municipality").innerHTML = [["", "-- Select --"], ...list].map(opt).join("");
          if (list.some(([v]) => v === keep)) $("#Municipality").value = keep;
        };
        let t;
        const later = () => { clearTimeout(t); t = setTimeout(counties, 300); };
        for (const id of ["City", "Zip", "Street1"]) $(`#${id}`).addEventListener("input", later);
        $("#County").addEventListener("change", () => setTimeout(munis, 300));
        counties();
      },
    },
    ownership: {
      title: "Ownership Type", next: "owners",
      body: () => select("OwnershipType", "Ownership Type", ["", "Ltd. Liability Co. (1065 Filer)", "Ltd. Liability Co. (1120 Filer)", "Ltd. Liability Co. - Single Member"], { req: true }) +
        select("FiscalMonth", "Last Month of Fiscal Year", ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]) +
        yn("Subsidiary", "Is this business a subsidiary of another corporation?") +
        `<h3>S Corporation or QSSS Section</h3><fieldset class="form-group"><legend>Has your business entity been approved as a Federal S Corporation, QSSS, or neither? *</legend>` +
        `<label><input type="radio" name="SCorp" value="S" data-req> Federal S Corporation</label> <label><input type="radio" name="SCorp" value="Q"> QSSS (Qualified Subchapter S Subsidiary)</label> <label><input type="radio" name="SCorp" value="N"> Neither</label></fieldset>` +
        `<p>If you do not have your Federal S Corporation or QSSS acceptance letter, choose 'Neither'</p>` + buttons("Continue", "Cancel"),
      load: () => {
        $("#OwnershipType").addEventListener("change", () => {
          const single = /single member/i.test($("#OwnershipType").value);
          for (const r of $$('input[name="SCorp"]')) if (r.value !== "N") { r.disabled = single; if (single) r.checked = false; }
          if (single) $('input[name="SCorp"][value="N"]').checked = true;
        });
      },
    },
    owners: {
      title: "Owner Details", next: "classification",
      body: () => `<p class="alert">You must have a minimum of 1 owner/partner/responsible officer listed. You may list up to ${singleMember() ? 1 : 10} maximum. Please note that the EIN of the Business Owner cannot be same as that of the Registering Business.</p>` +
        `<table id="owners"><thead><tr><th>Name</th><th>Title</th><th>Percentage of Ownership</th><th>Actions</th></tr></thead><tbody></tbody></table>` +
        `<button type="button" class="btn" id="add-ind">Add Individual Owner</button> <button type="button" class="btn" id="add-bus">Add Business Owner</button>` +
        `<div class="modal" id="ind" role="dialog" style="display:none"><h3>Add Individual Owner</h3>` + field("FirstName", "First Name", { req: true }) + field("MiddleInitial", "Middle Initial", { max: 1 }) +
        field("LastName", "Last Name", { req: true }) + select("Title", "Title", TITLES, { req: true }) + field("Ssn", "Social Security Number", { req: true, max: 11 }) +
        field("Percent", "Percent of Ownership", { req: true }) + ownerAddress("I") + `<button type="button" class="btn" data-save="ind">Save</button> <button type="button" class="btn" data-close="ind">Close</button></div>` +
        `<div class="modal" id="bus" role="dialog" style="display:none"><h3>Add Business Owner</h3>` + field("BusName", "Business Name", { req: true }) + field("BusEin", "Employer Identification Number", { req: true, max: 9 }) +
        field("BusPercent", "Percent of Ownership", { req: true }) + ownerAddress("B") + `<button type="button" class="btn" data-save="bus">Save</button> <button type="button" class="btn" data-close="bus">Close</button></div>` +
        buttons("Continue", "Back", "Cancel"),
      check: () => {
        const n = st.owners.length + st.businessOwners.length;
        return n < 1 ? ["You must have a minimum of 1 owner/partner/responsible officer listed."] : n > (singleMember() ? 1 : 10) ? ["Too many owners for this ownership type."] : [];
      },
      load: () => ownersScreen(),
    },
    classification: {
      title: "Business Classification", next: "tax",
      body: () => `<p>The answers are for State and Federal statistical classification.</p>` + autocomplete("BusinessCode", "New Jersey Business Code", BUSINESS_CODES) + `<a href="#">Find Business Code</a>` +
        area("PrincipalProduct", "Principal Product or Service", { req: true }) + area("TypeOfActivity", "Type of Activity", { req: true }) +
        field("Sic", "Standard Industrial Code") + `<a href="#">Find SIC Code</a>` + autocomplete("Naics", "NAICS Code", NAICS) + `<a href="#">Find NAICS Code</a>` +
        field("Workers", "Number of Workers in New Jersey", { req: true }) + buttons("Continue", "Cancel"),
      load: () => {
        for (const [id, list] of [["BusinessCode", BUSINESS_CODES], ["Naics", NAICS]]) {
          const box = $(`#${id}`), ul = $(`#${id}-list`);
          box.addEventListener("input", () => {
            const q = box.value.trim().toLowerCase();
            $(`#${id}-picked`).value = "";
            const hits = q.length < 2 ? [] : list.filter((l) => l.toLowerCase().includes(q));
            ul.innerHTML = hits.map((h) => `<li role="option" class="ui-menu-item">${esc(h)}</li>`).join("");
            ul.style.display = hits.length ? "" : "none";
          });
          ul.addEventListener("click", (e) => { const li = e.target.closest("li"); if (!li) return; const code = /^\d+/.exec(li.textContent)[0]; box.value = code; box.setAttribute("value", code); $(`#${id}-picked`).value = code; ul.style.display = "none"; });
        }
      },
      check: () => ["BusinessCode", "Naics"].filter((id) => !$(`#${id}-picked`).value).map((id) => `Pick a ${id === "Naics" ? "NAICS code" : "business code"} from the list.`),
    },
    tax: {
      title: "Employment Activities", next: "activities",
      body: () => yn("Acquired", "Acquired substantially all the assets, trade/business and/or employees of any previous employing units?") +
        yn("OutsideNj", "Paying wages, salaries or commissions to NJ residents working outside NJ?") + yn("Pension", "Payer of pension or annuity income to NJ residents?") +
        yn("Facilities", "More than one employing facility in NJ?") + yn("PayingWages", "Paying wages, salaries, or commissions to employees working in NJ within the next 6 months?") +
        `<div data-show="PayingWages=Y">` + field("FirstWage", "Date of first wage or salary payment", { req: true }) + field("FirstHire", "Date of hiring first New Jersey employee") +
        field("Over1000", "Date cumulative gross payroll exceeds $1,000", { req: true }) + yn("Agricultural", "Is your employment agricultural?") + yn("Household", "Is your employment household?") +
        field("Household1000", "Date when gross cash wages totaled $1,000 or more", { req: true, show: "Household=Y" }) +
        yn("Futa", "Subject to FUTA in the current or preceding calendar year?") + field("FutaYear", "Indicate year you were subject to FUTA", { req: true, show: "Futa=Y" }) +
        yn("Exempt", "Claims exemption from liability under the NJ Unemployment Compensation Law?") + area("ExemptReason", "Explain why this employing unit claims exemption", { req: true, show: "Exempt=Y" }) +
        yn("Peo", "Is the company a PEO (Employee Leasing Company)?") + `</div>` + buttons("Continue", "Cancel"),
      check: () => ["FirstWage", "FirstHire", "Over1000", "Household1000"].filter((id) => shown($(`#${id}`)) && $(`#${id}`).value && !/^\d{2}\/\d{2}\/\d{4}$/.test($(`#${id}`).value)).map(() => "Enter dates as mm/dd/yyyy."),
    },
    activities: {
      title: "Taxable Business Activities", next: "contact",
      body: () => TAX_QS.map(([k, q]) => yn(k, q) + (k === "salesTax" ? field("FirstSale", "Exact Date you expect to make the first sale", { req: true, show: "salesTax=Y" }) + yn("MultiSales", "More than one location in NJ that collects NJ Sales Tax?", { show: "salesTax=Y" }) : "")).join("") +
        `<fieldset class="form-group"><legend>Eligibility for any other New Jersey State Tax *</legend>${OTHER_TAXES.map((t, i) => `<label><input type="checkbox" name="Other${i}"> ${t}</label><br>`).join("")}</fieldset>` + buttons("Continue", "Back", "Cancel"),
      check: () => ($$('input[name^="Other"]').some((c) => c.checked) ? [] : ["Choose at least one under Eligibility for any other New Jersey State Tax."]),
    },
    contact: {
      title: "Contact Information", next: "review",
      body: () => field("ContactName", "Contact Name", { req: true }) + select("ContactTitle", "Title", TITLES, { req: true }) + field("Email", "Email Address", { req: true }) + field("ConfirmEmail", "Confirm Email Address") +
        field("DayPhone", "Daytime Phone", { req: true }) + field("DayExt", "Ext") + field("EveningPhone", "Evening Phone") + field("EveningExt", "Ext") + buttons("Continue", "Cancel"),
      check: () => ($("#ConfirmEmail").value && $("#ConfirmEmail").value !== $("#Email").value ? ["The email addresses do not match."] : []),
    },
    review: {
      title: "Review", next: "complete",
      body: () => {
        const v = st.values;
        const ein = (v.details?.Ein || "").slice(-3);
        return `<p>Review all entered information below. If changes need to be made, click the appropriate 'Edit' button.</p>` +
          `<h3>Business Information</h3><p>${esc(st.record.name)}</p><p>Entity ID: ${esc(v.details?.EntityId)}</p><p>EIN: ###-###-${esc(ein)}</p><p>Trade name: ${esc(v.data?.TradeName || "None")}</p>` +
          `<p>Location: ${esc(v.address?.Street1)}, ${esc(v.address?.City)}, ${esc(v.address?.State)} ${esc(v.address?.Zip)}; County: ${esc(v.address?.County)}; Municipality: ${esc(v.address?.Municipality)}</p><button type="button" class="btn">Edit</button>` +
          `<h3>Ownership Information</h3><p>${esc(v.ownership?.OwnershipType)}</p>${st.owners.map((o) => `<p>${esc(o.name)}, ${esc(o.title)}, ${esc(o.ssn)}, ${esc(o.percent)}%</p>`).join("")}<button type="button" class="btn">Edit</button>` +
          `<h3>Business Classification</h3><p>${esc(v.classification?.BusinessCode)} ${esc(v.classification?.Naics)}</p><button type="button" class="btn">Edit</button>` +
          `<h3>Employment Activities</h3><p>Paying wages in NJ within 6 months: ${esc(v.tax?.PayingWages)}</p><button type="button" class="btn">Edit</button>` +
          check("EmploymentConfirm", "I confirm the 'Yes/No' answers above accurately reflect my employment activities and that I am obligated to report under the New Jersey payroll tax laws. I understand that I will be required to submit New Jersey payroll tax filings for activities that show a 'Yes.' *") +
          `<h3>Taxable Business Activities</h3><p>Sales tax: ${esc(v.activities?.salesTax)}</p><button type="button" class="btn">Edit</button>` +
          check("TaxConfirm", "I confirm the 'Yes/No' answers above accurately reflect my business activities that are subject to New Jersey taxes and that I am obligated to file under the New Jersey tax laws. *") +
          `<h3>Contact Information</h3><p>${esc(v.contact?.ContactName)}</p><button type="button" class="btn">Edit</button>` +
          `<h3>Signature</h3>` + check("Gov2Go", "Get free Text/Email Notifications for your State Tax returns and payments through Gov2Go.", { checked: true }) +
          check("Perjury", "I declare, under penalty of perjury, that to the best of my knowledge and belief, all the information provided in this registration is true, correct, and complete. *") +
          field("AuthorizedName", "Name of Authorized Representative", { req: true }) + buttons("Complete Registration", "Cancel") +
          `<p id="review-state"></p>` + log();
      },
      // The boxes' state as text (a masked screen's DOM snapshot drops the checked attributes).
      load: () => {
        const show = () => { $("#review-state").textContent = `boxes: employment=${$("#EmploymentConfirm").checked} tax=${$("#TaxConfirm").checked} perjury=${$("#Perjury").checked} gov2go=${$("#Gov2Go").checked} name=${$("#AuthorizedName").value ? "typed" : "blank"}`; };
        document.addEventListener("change", show); document.addEventListener("input", show); show();
      },
      check: () => ["EmploymentConfirm", "TaxConfirm", "Perjury"].filter((id) => !$(`#${id}`).checked).map((id) => `${id} must be checked.`),
      saved: () => { st.submitted = { employment: $("#EmploymentConfirm").checked, tax: $("#TaxConfirm").checked, perjury: $("#Perjury").checked, gov2go: $("#Gov2Go").checked, name: $("#AuthorizedName").value }; },
    },
    complete: { title: "Registration Complete", next: null, body: () => `<p>Thank you. Your registration is complete.</p><p>Confirmation Number: NJREG-000123</p>${log()}` },
  };

  function valueOf(name) {
    const els = $$(`[name="${name}"]`);
    if (!els.length) return "";
    if (els[0].type === "radio") return (els.find((r) => r.checked) || {}).value || "";
    if (els[0].type === "checkbox") return els[0].checked ? "on" : "";
    return els[0].value;
  }
  function refresh() {
    for (const el of $$("[data-show]")) {
      const [k, v] = el.dataset.show.split("=");
      el.style.display = valueOf(k) === v ? "" : "none";
    }
  }
  function errorsIn(root) {
    for (const e of $$(".field-validation-error, .validation-summary-errors", root)) e.remove();
    let bad = 0;
    for (const el of $$("[data-req]", root)) {
      const box = el.closest(".form-group") || el;
      if (!shown(box)) continue;
      if (!valueOf(el.name).trim()) { box.insertAdjacentHTML("beforeend", `<span class="field-validation-error">Required</span>`); bad++; }
    }
    return bad;
  }
  function collect(root) {
    const out = {};
    for (const el of $$("input[name], select[name], textarea[name]", root)) {
      if (el.type !== "hidden" && !shown(el.closest(".form-group") || el)) continue;
      if (el.closest(".modal")) continue;
      if (el.type === "radio") { if (el.checked) out[el.name] = el.value; continue; }
      out[el.name] = el.type === "checkbox" ? (el.checked ? "on" : "") : el.value;
    }
    return out;
  }
  function next(id) {
    const s = SCREENS[id];
    const main = $("#content");
    if (errorsIn(main)) return;
    const msgs = s.check ? s.check() : [];
    if (msgs.length) { main.insertAdjacentHTML("afterbegin", `<div class="validation-summary-errors">${msgs.map(esc).join("<br>")}</div>`); return; }
    st.values[id] = collect(main);
    if (s.saved) s.saved();
    save();
    location.href = `step.html?s=${s.next}`;
  }

  function ownersScreen() {
    const rows = () => {
      $("#owners tbody").innerHTML = [...st.owners.map((o) => [o.name, o.title, o.percent]), ...st.businessOwners.map((b) => [b.name, "Business Owner", b.percent])]
        .map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td><a href="#">Edit</a> <a href="#">Delete</a></td></tr>`).join("");
    };
    rows();
    const open = (id) => { const m = $(`#${id}`); for (const el of $$("input, select", m)) el.value = ""; for (const e of $$(".field-validation-error", m)) e.remove(); m.style.display = ""; };
    $("#add-ind").addEventListener("click", () => open("ind"));
    $("#add-bus").addEventListener("click", () => open("bus"));
    document.addEventListener("click", (e) => {
      const close = e.target.closest("[data-close]");
      if (close) { $(`#${close.dataset.close}`).style.display = "none"; return; }
      const s = e.target.closest("[data-save]");
      if (!s) return;
      const m = $(`#${s.dataset.save}`);
      if (errorsIn(m)) return;
      const g = (id) => $(`#${id}`).value.trim();
      if (s.dataset.save === "ind") {
        const d = g("Ssn").replace(/\D/g, "");
        if (d.length !== 9) { $("#Ssn").closest(".form-group").insertAdjacentHTML("beforeend", `<span class="field-validation-error">Enter 9 digits</span>`); return; }
        st.owners.push({ name: [g("FirstName"), g("MiddleInitial"), g("LastName")].filter(Boolean).join(" "), title: g("Title"), ssn: `***-**-${d.slice(5)}`, percent: g("Percent"),
          address: `${g("IStreet1")}, ${g("ICity")}, ${g("IState")} ${g("IZip")}${g("IZipPlus") ? `-${g("IZipPlus")}` : ""}` });
      } else {
        if (g("BusEin").replace(/\D/g, "") === (st.values.details?.Ein || "")) { $("#BusEin").closest(".form-group").insertAdjacentHTML("beforeend", `<span class="field-validation-error">The EIN of the Business Owner cannot be same as that of the Registering Business.</span>`); return; }
        st.businessOwners.push({ name: g("BusName"), ein: g("BusEin"), percent: g("BusPercent"), address: `${g("BStreet1")}, ${g("BCity")}, ${g("BState")} ${g("BZip")}` });
      }
      save();
      m.style.display = "none";
      rows();
    });
  }

  function render() {
    const id = new URLSearchParams(location.search).get("s") || "first";
    const s = SCREENS[id];
    st.visited.push(id);
    save();
    $("#content").innerHTML = `<h1>${s.title}</h1>${s.body()}`;
    if (s.load) s.load();
    refresh();
    for (const b of $$("[data-act]")) if (/^(continue|complete registration)$/i.test(b.dataset.act)) b.addEventListener("click", () => next(id));
  }

  document.addEventListener("change", refresh);
  document.addEventListener("input", refresh);
  // Mirror entered values into attributes so DOM snapshots show what the engine entered.
  document.addEventListener("input", (e) => { const t = e.target; if (t.tagName === "INPUT" && t.type !== "radio" && t.type !== "checkbox") t.setAttribute("value", t.value); if (t.tagName === "TEXTAREA") t.textContent = t.value; });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.tagName === "SELECT") Array.from(t.options).forEach((o) => o.toggleAttribute("selected", o.selected));
    else if (t.type === "checkbox") t.toggleAttribute("checked", t.checked);
    else if (t.type === "radio") $$(`input[name="${t.name}"]`).forEach((r) => r.toggleAttribute("checked", r.checked));
  });

  window.NJREG = { render, reset() { st = fresh(); save(); } };
})();
