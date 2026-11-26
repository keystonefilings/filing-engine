// Replica helper for Missouri's online LLC filing, laid out from the state's step-by-step guide
// (docs/walks/missouri-2026-11-18.md) with the provisional labels of src/adapters/mo-formation/intents.ts.
// NOT a walked page: the live site has not been reached. Test data only; not affiliated with the MO SOS.
var MO = {
  get: function (k, d) { try { var v = JSON.parse(sessionStorage.getItem("mo-" + k)); return v === null ? d : v; } catch (e) { return d; } },
  set: function (k, v) { sessionStorage.setItem("mo-" + k, JSON.stringify(v)); },
  val: function (id) { return ((document.getElementById(id) || {}).value || "").trim(); },
  header: function () { document.write('<p>Replica of the Missouri Secretary of State online business filing, from the state\'s guide, for engine tests. Not affiliated with the MO SOS.</p><nav>Dashboard · Log Out</nav>'); },
  states: '<option value="">Select</option><option value="MO">Missouri</option><option value="KS">Kansas</option><option value="IL">Illinois</option>',
  /** Next: every required field filled, else an error on the page. */
  next: function (ids, href) {
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      var ok = el && (el.type === "checkbox" ? el.checked : el.tagName === "FIELDSET" ? !!el.querySelector("input:checked") : !!el.value.trim());
      if (!ok) { document.getElementById("err").textContent = "A required field is missing."; document.getElementById("err").hidden = false; return; }
    }
    location.href = href;
  },
};
document.addEventListener("input", function (e) { var t = e.target; if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA") && t.type !== "radio" && t.type !== "checkbox") t.setAttribute("value", t.value); });
document.addEventListener("change", function (e) {
  var t = e.target; if (!t) return;
  if (t.tagName === "SELECT") Array.from(t.options).forEach(function (o) { o.toggleAttribute("selected", o.selected); });
  else if (t.type === "checkbox") t.toggleAttribute("checked", t.checked);
  else if (t.type === "radio") document.querySelectorAll('input[name="' + t.name + '"]').forEach(function (r) { r.toggleAttribute("checked", r.checked); });
});
