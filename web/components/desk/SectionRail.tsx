"use client";

import { useEffect, useState } from "react";

type Item = { id: string; title: string; done: boolean };

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Whether a section's required answers are in; a section with none counts once anything in it is answered. */
function complete(section: HTMLElement): boolean {
  const controls = Array.from(section.querySelectorAll<Control>("input, select, textarea"))
    .filter((c) => !c.disabled && c.type !== "hidden" && c.type !== "file" && !c.closest("[hidden]"));
  // A required radio group carries aria-required on its group, not on each radio
  const required = controls.filter((c) => c.getAttribute("aria-required") === "true" || c.required || c.closest("label.auth, [role='radiogroup'][aria-required='true']"));
  const answered = (c: Control) => {
    if (c instanceof HTMLInputElement && c.type === "radio") return controls.some((o) => o instanceof HTMLInputElement && o.type === "radio" && o.name === c.name && o.checked);
    if (c instanceof HTMLInputElement && c.type === "checkbox") return c.checked;
    return c.value.trim() !== "";
  };
  if (required.length) return required.every(answered);
  return controls.some((c) => (c instanceof HTMLInputElement && (c.type === "checkbox" || c.type === "radio")) ? false : c.value.trim() !== "" && !(c instanceof HTMLSelectElement));
}

/**
 * The section rail beside the desk's own form (merged spec 10B.12.1), from 1280 px wide: the form's own section titles,
 * each a link to its section, with a circle that fills with Plate Ink once the section's required answers are in. It
 * reads the form as it stands, so sections that appear or hide with an answer come and go here too. The circles are
 * decoration; the titles carry it. The desk's form only: client pages don't get it (10B.12.3).
 */
export function SectionRail({ form }: { form: string }) {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const el = document.querySelector<HTMLFormElement>(form);
    if (!el) return;
    let frame = 0;
    const read = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const sections = Array.from(el.querySelectorAll<HTMLElement>(":scope > fieldset, :scope > details.fold"));
        setItems(sections.flatMap((s, i) => {
          if (!s.id) s.id = `section-${i + 1}`;
          if (s.hidden) return [];
          const head = s.matches("details") ? s.querySelector(":scope > summary") : s.querySelector(":scope > legend");
          const title = head?.textContent?.trim() ?? "";
          return title ? [{ id: s.id, title, done: complete(s) }] : [];
        }));
      });
    };
    read();
    el.addEventListener("input", read);
    el.addEventListener("change", read);
    const watch = new MutationObserver(read);
    watch.observe(el, { subtree: true, childList: true, attributes: true, attributeFilter: ["hidden", "disabled"] });
    return () => { cancelAnimationFrame(frame); el.removeEventListener("input", read); el.removeEventListener("change", read); watch.disconnect(); };
  }, [form]);
  if (!items.length) return null;
  return (
    <ol className="kind2-rail-list">
      {items.map((it) => (
        <li key={it.id} className={it.done ? "is-done" : undefined}>
          <span className="kind2-rail-dot" aria-hidden="true" />
          <a href={`#${it.id}`}>{it.title}</a>
        </li>
      ))}
    </ol>
  );
}
