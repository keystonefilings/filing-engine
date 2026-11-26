// Replica helper for the record filings (Screens G to K of docs/portal-maps/ny-dos-corporations.md):
// a two-entity stand-in for the DOS records, the Filer's Information block and the payment page.
// State lives in sessionStorage. Test data only; not affiliated with NY DOS.
var NYR = {
  RECORDS: {
    "1234567": {
      name: "HUDSON LEDGER LLC", filed: "01/15/2024", county: "Kings", agentOnFile: true,
      history: [
        { desc: "ARTICLES OF ORGANIZATION", date: "01/15/2024", number: "240115000123", pages: 2 },
        { desc: "CERTIFICATE OF PUBLICATION", date: "05/02/2024", number: "240502000456", pages: 3 },
        { desc: "BIENNIAL STATEMENT", date: "01/01/2026", number: "260101000789", pages: 1 },
      ],
    },
    "7654321": { name: "RIVER STONE LLC", filed: "03/03/2023", county: "Albany", agentOnFile: false, history: [] },
  },
  get: function (k, d) { try { var v = JSON.parse(sessionStorage.getItem("nyr-" + k)); return v === null ? d : v; } catch (e) { return d; } },
  set: function (k, v) { sessionStorage.setItem("nyr-" + k, JSON.stringify(v)); },
  val: function (id) { return ((document.getElementById(id) || {}).value || "").trim(); },
  entity: function () { return NYR.RECORDS[NYR.get("dosid", "")] || { name: "", history: [] }; },
  chrome: function () {
    document.write('<p>Replica of the NY Department of State On-Line Filing System for engine tests, laid out as docs/portal-maps/ny-dos-corporations.md (2026-11-24) describes it. Not affiliated with NY DOS.</p>'
      + '<div>Department of State · Form a Corporation or Business ▸ Division of Corporations On-Line Filing System</div>'
      + '<nav><a href="home.html">Home</a> · <a href="replenish.html">Replenish DD Account</a> · <a href="#">Retrieve Images</a> · <a href="#">Service Company Administration</a> · User ID: KF01 · <a href="#">Log Out</a></nav>');
  },
  /** "DOS ID AND Entity Name Search": both must match exactly. */
  searchExact: function (next) {
    var id = NYR.val("dos-id"), name = NYR.val("entity-name").toUpperCase().replace(/\s+/g, " ");
    var r = NYR.RECORDS[id];
    if (!r || r.name !== name) { document.getElementById("err").hidden = false; return; }
    NYR.set("dosid", id);
    location.href = next;
  },
  /** One of four routes; this replica answers the DOS ID route only. */
  searchRoute: function (next) {
    var id = NYR.val("dos-id");
    if (!NYR.RECORDS[id]) { document.getElementById("err").hidden = false; return; }
    NYR.set("dosid", id);
    location.href = next;
  },
  entityInfo: function () {
    var e = NYR.entity();
    document.write('<h3>Entity Information</h3><p>Entity Name: ' + e.name + '</p><p>DOS ID: ' + NYR.get("dosid", "") + '</p><p>Date of filing of the articles of organization: ' + e.filed + '</p>');
  },
  attestation: function (doc) {
    document.write('<h3>Attestation and Signature</h3>'
      + '<p><label><input type="checkbox" id="certify"> *I certify that I have read the above statements, I am authorized to sign these ' + doc + ', that the above statements are true and correct to the best of my knowledge and belief.</label></p>'
      + '<p>My typed name below constitutes my signature:</p><p><label for="sig">*Signature</label> <input id="sig" type="text"></p>'
      + '<fieldset><legend>*Capacity of Signer</legend><label><input type="radio" name="cap" value="AP"> Authorized Person</label> <label><input type="radio" name="cap" value="MGR"> Manager</label> <label><input type="radio" name="cap" value="MBR"> Member</label></fieldset>');
  },
  filer: function () {
    document.write('<h3>Filer\'s Information</h3>'
      + '<p><label for="req-name">*Requester Name</label> <input id="req-name" type="text" value="KEYSTONE FILINGS LLC"></p>'
      + '<p><label for="req-co">Company if applicable</label> <input id="req-co" type="text"></p>'
      + '<p><label for="req-addr1">*Address</label> <input id="req-addr1" type="text" value="1 MAIN ST"></p>'
      + '<p><label for="req-addr2">Address 2</label> <input id="req-addr2" type="text"></p>'
      + '<p><label for="req-city">*City</label> <input id="req-city" type="text" value="BROOKLYN"></p>'
      + '<p><label for="req-state">*State</label> <select id="req-state"><option value="NY" selected>NY</option><option value="NJ">NJ</option></select></p>'
      + '<p><label for="req-zip">*Postal Code</label> <input id="req-zip" type="text" value="11201"></p>'
      + '<p><label for="req-country">Country</label> <select id="req-country"><option value="USA" selected>USA</option></select></p>'
      + '<p><label for="dist">*Distribution Email Address</label> <input id="dist" type="email" value="filings@keystone.example" readonly></p>'
      + '<p><label for="cc">Cc Email Address</label> <input id="cc" type="email"></p>');
  },
  /** Continue on a G/H/I form: the certify box, typed signature and capacity are required. */
  attested: function () {
    if (!document.getElementById("certify").checked || !NYR.val("sig") || !document.querySelector('input[name="cap"]:checked')) {
      document.getElementById("err").textContent = "1 error has occurred: the certification, signature and capacity of signer are required"; document.getElementById("err").hidden = false; return false;
    }
    return true;
  },
  fees: function (rows, totalLabel, noTotal) {
    var total = rows.reduce(function (s, r) { return s + r[1]; }, 0);
    document.write('<table id="fees">' + rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td>$' + r[1].toFixed(2) + '</td></tr>'; }).join("")
      + (noTotal ? "" : '<tr><td>' + (totalLabel || "Total Fees") + '</td><td>$' + total.toFixed(2) + '</td></tr>') + '</table>');
  },
  payment: function (rows, authText, opts) {
    opts = opts || {};
    document.write('<h1>Payment</h1><h3>Fee Information</h3>');
    NYR.fees(rows, opts.totalLabel, opts.noTotal);
    document.write('<p><label for="dd">*Drawdown Account</label> <select id="dd"><option value="">--Select One--</option><option value="F12">KEYSTONE FILINGS LLC - F12</option></select></p><p>Balance $0.00</p>'
      + (opts.reference ? '<p><label for="ref">Customer Reference Number</label> <input id="ref" type="text"></p>' : '')
      + '<h3>Payment Authorization</h3><p><label><input type="checkbox" id="auth"> By checking this box I authorize the total fee listed above to be charged to my ' + authText + '.</label></p>'
      + '<p>Refund Policy: DOS does not refund fees.</p>'
      + '<p><button type="button" onclick="history.back()">&lt; Go Back</button> <button type="button">Reset</button> <button type="button" onclick="if (document.getElementById(\'auth\').checked) location.href=\'filed.html\'">Submit</button></p>');
  },
};
// Mirror entered values into attributes so DOM snapshots show what the engine entered.
document.addEventListener("input", function (e) { var t = e.target; if (t && t.tagName === "INPUT" && t.type !== "radio" && t.type !== "checkbox") t.setAttribute("value", t.value); });
document.addEventListener("change", function (e) {
  var t = e.target; if (!t) return;
  if (t.tagName === "SELECT") Array.from(t.options).forEach(function (o) { o.toggleAttribute("selected", o.selected); });
  else if (t.type === "checkbox") t.toggleAttribute("checked", t.checked);
  else if (t.type === "radio") document.querySelectorAll('input[name="' + t.name + '"]').forEach(function (r) { r.toggleAttribute("checked", r.checked); });
});
