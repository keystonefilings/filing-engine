// Browser-side inventory script. Plain JS on purpose: it is sent to the page as a string,
// so no TypeScript/esbuild transform (and no injected helpers) can break it.
(() => {
    const out = { url: location.href, title: document.title, headings: [], fields: [], prices: [] };
    const txt = (el) => (el && el.textContent ? el.textContent : "").replace(/\s+/g, " ").trim();
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return cs.display !== "none" && cs.visibility !== "hidden" && (r.width > 0 || r.height > 0 || el.type === "hidden");
    };

    out.headings = Array.from(document.querySelectorAll("h1,h2,h3,legend")).map(txt).filter(Boolean);

    const labelFor = (el) => {
      const id = el.getAttribute("id");
      if (id) {
        const l = document.querySelector(`label[for="${CSS.escape(id)}"]`);
        if (l && txt(l)) return { label: txt(l), source: "label-for" };
      }
      const wrap = el.closest("label");
      if (wrap) {
        const clone = wrap.cloneNode(true);
        clone.querySelectorAll("input,select,textarea,button").forEach((n) => n.remove());
        if (txt(clone)) return { label: txt(clone), source: "wrapping-label" };
      }
      const aria = el.getAttribute("aria-label");
      if (aria) return { label: aria.trim(), source: "aria-label" };
      const by = el.getAttribute("aria-labelledby");
      if (by) {
        const parts = by.split(/\s+/).map((i) => txt(document.getElementById(i))).filter(Boolean);
        if (parts.length) return { label: parts.join(" "), source: "aria-labelledby" };
      }
      if (el.tagName === "BUTTON" || el.type === "submit" || el.type === "button") {
        const t = txt(el) || el.value;
        if (t) return { label: t, source: "button-text" };
      }
      const ph = el.getAttribute("placeholder");
      if (ph) return { label: ph.trim(), source: "placeholder" };
      // nearest preceding text inside the same form-group-ish container
      let node = el;
      for (let depth = 0; node && depth < 4; depth++) {
        let sib = node.previousElementSibling;
        while (sib) {
          const t = txt(sib);
          if (t && !sib.querySelector("input,select,textarea")) return { label: t.slice(0, 120), source: "nearby-text" };
          sib = sib.previousElementSibling;
        }
        node = node.parentElement;
      }
      const name = el.getAttribute("name");
      return { label: name || "", source: "name" };
    };

    const requiredOf = (el, label) => {
      if (el.hasAttribute("required")) return { required: true, source: "required-attr" };
      if (el.getAttribute("aria-required") === "true") return { required: true, source: "aria-required" };
      if (/\*\s*$/.test(label) || /^\*/.test(label)) return { required: true, source: "asterisk" };
      if (/\brequired\b/i.test(label)) return { required: true, source: "label-text" };
      const group = el.closest(".form-group, .field, fieldset, .t-Form-fieldContainer, tr, li, div");
      if (group && group.querySelector(".required, .is-required, .t-Form-required, abbr[title*='equired']")) {
        return { required: true, source: "marker-element" };
      }
      return { required: false };
    };

    let n = 0;
    const seenRadioGroups = new Map();
    const controls = Array.from(document.querySelectorAll("input,select,textarea,button"));
    for (const el of controls) {
      const tag = el.tagName.toLowerCase();
      const type = (el.getAttribute("type") || (tag === "button" ? "button" : tag === "input" ? "text" : tag)).toLowerCase();
      if (type === "hidden") continue;
      const ref = `f${n++}`;
      el.setAttribute("data-ke-ref", ref);

      if (type === "radio") {
        const name = el.getAttribute("name") || ref;
        const optLabel = labelFor(el).label;
        const idx = seenRadioGroups.get(name);
        if (idx !== undefined) {
          const f = out.fields[idx];
          f.options.push({ value: el.value, label: optLabel, ref });
          if (el.checked) f.value = el.value;
          continue;
        }
        const fs = el.closest("fieldset");
        const legend = fs ? txt(fs.querySelector("legend")) : "";
        const groupLabel = legend || (() => {
          // first text block before the group container
          const container = el.closest(".radio-group, .form-group, fieldset, div");
          let sib = container ? container.previousElementSibling : null;
          while (sib) { const t = txt(sib); if (t && !sib.querySelector("input")) return t.slice(0, 120); sib = sib.previousElementSibling; }
          return name;
        })();
        const req = requiredOf(el, groupLabel);
        seenRadioGroups.set(name, out.fields.length);
        out.fields.push({
          ref, label: groupLabel, labelSource: legend ? "legend" : "nearby-text", kind: "radio", name,
          required: req.required, requiredSource: req.source,
          options: [{ value: el.value, label: optLabel, ref }],
          disabled: el.disabled, visible: visible(el),
          value: el.checked ? el.value : undefined,
        });
        continue;
      }

      const { label, source } = labelFor(el);
      const req = requiredOf(el, label);
      const kind = (() => {
        if (tag === "select") return "select";
        if (tag === "textarea") return "textarea";
        if (tag === "button" || type === "submit" || type === "button" || type === "image") return "button";
        if (["text", "email", "tel", "number", "date", "password", "checkbox", "file"].includes(type)) return type;
        if (type === "search" || type === "url") return "text";
        return "other";
      })();
      const field = {
        ref, label, labelSource: source, kind, name: el.getAttribute("name") || undefined,
        required: kind === "button" ? false : req.required, requiredSource: req.source,
        disabled: el.disabled, visible: visible(el),
      };
      if (kind === "select") {
        field.options = Array.from(el.options).map((o) => ({ value: o.value, label: txt(o) }));
        field.value = el.value;
      } else if (kind === "checkbox") {
        field.checked = el.checked;
      } else if (kind !== "button") {
        field.value = el.value;
      }
      out.fields.push(field);
    }

    // Prices: "$100.00" with the nearest row/label text.
    const priceRe = /\$\s?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;
    const priceStrip = /\$\s?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g; // separate instance: replace() resets lastIndex
    const seen = new Set();
    for (const el of Array.from(document.querySelectorAll("td,li,p,span,div,label,dd"))) {
      if (el.children.length > 3) continue;
      const t = txt(el);
      if (!t || t.length > 200 || !t.includes("$")) continue;
      let m;
      priceRe.lastIndex = 0;
      while ((m = priceRe.exec(t))) {
        const amount = Number(m[1].replace(/,/g, ""));
        const row = el.closest("tr,li,.row,.fee-line") ?? el;
        const label = txt(row).replace(priceStrip, "").replace(/\s+/g, " ").trim().slice(0, 120) || t;
        const key = `${label}|${amount}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.prices.push({ label, amountUsd: amount });
      }
    }
    return out;
})()
