// Replica helper: mirror entered values into attributes so DOM snapshots show what the engine entered.
document.addEventListener("input", (e) => {
  const t = e.target;
  if (t && t.tagName === "INPUT" && t.type !== "radio" && t.type !== "checkbox") t.setAttribute("value", t.value);
});
document.addEventListener("change", (e) => {
  const t = e.target;
  if (!t) return;
  if (t.tagName === "SELECT") Array.from(t.options).forEach((o) => o.toggleAttribute("selected", o.selected));
  else if (t.type === "radio" || t.type === "checkbox") document.querySelectorAll('input[name="' + t.name + '"]').forEach((r) => r.toggleAttribute("checked", r.checked));
});
