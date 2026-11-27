/**
 * The pseudo-locale's two halves, each run inside the page (page.evaluate): making every text longer, and finding what
 * no longer holds. Kept apart from the spec so tests/pseudo-locale-self.spec.ts can show the checks catch what they say.
 */
export interface Finding { kind: "overflow" | "clipped" | "overruns" | "overlap" | "button"; where: string; text: string }

/** Runs in the page. Returns how much longer the page's text became. */
export function lengthenEveryText(perWord: number): number {
  const ACCENT: Record<string, string> = { a: "á", e: "é", i: "í", o: "ó", u: "ú", n: "ñ", c: "ç", y: "ý", A: "Á", E: "É", I: "Í", O: "Ó", U: "Ú", N: "Ñ", C: "Ç", Y: "Ý" };
  const FILL = "éáíóúñ";
  const SKIP = "script, style, noscript, code, pre, kbd, samp, textarea, svg, [translate=no], .notranslate";
  const NEVER = /@|:\/\/|^\s*[\d\s.,:$%/+()-]*\s*$/; // emails, web addresses, figures alone
  let before = 0, after = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n as Text);
  for (const node of nodes) {
    const text = node.data;
    if (!text.trim() || !node.parentElement || node.parentElement.closest(SKIP) || NEVER.test(text)) continue;
    let i = 0;
    const longer = text.replace(/\p{L}+/gu, (word) => {
      const accented = word.replace(/[aeioucnyAEIOUCNY]/g, (ch) => ACCENT[ch] ?? ch);
      let fill = "";
      for (let k = 0; k < Math.round(word.length * perWord); k++) fill += FILL[i++ % FILL.length];
      return accented + fill;
    });
    before += text.length;
    after += longer.length;
    node.data = longer;
  }
  return before ? after / before - 1 : 0;
}

/** Runs in the page. What no longer holds once the texts are longer. */
export function findBreakage(): Finding[] {
  const out: Finding[] = [];
  const vw = document.documentElement.clientWidth;
  const label = (el: Element): string => {
    const parts: string[] = [];
    for (let e: Element | null = el; e && e !== document.body && parts.length < 3; e = e.parentElement) {
      const cls = Array.from(e.classList).filter((c) => !/^t-/.test(c)).slice(0, 2).map((c) => `.${c}`).join("");
      parts.unshift(e.id ? `#${e.id}` : `${e.tagName.toLowerCase()}${cls}`);
    }
    return parts.join(" > ");
  };
  const snippet = (el: Element) => (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 48);
  // Shown to a sighted reader: rendered (not in a closed <details>), not visually hidden (.sr-only), not parked
  // off the page (the spam trap).
  const srOnly = (el: Element) => {
    for (let e: Element | null = el; e && e !== document.body; e = e.parentElement) {
      const s = getComputedStyle(e);
      const r = e.getBoundingClientRect();
      if ((s.clip !== "auto" && s.position === "absolute") || (r.width <= 2 && r.height <= 2 && s.overflow !== "visible")) return true;
    }
    return false;
  };
  const visible = (el: Element) => {
    if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true, contentVisibilityAuto: true })) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.right > 0 && r.left < document.documentElement.scrollWidth && !srOnly(el);
  };
  const textRects = (el: Element): DOMRect[] => {
    const rects: DOMRect[] = [];
    for (const child of Array.from(el.childNodes)) {
      if (child.nodeType !== Node.TEXT_NODE || !(child as Text).data.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(child);
      for (const r of Array.from(range.getClientRects())) if (r.width > 0 && r.height > 0) rects.push(r);
    }
    return rects;
  };
  // The product pictures are compositions: a desk cropped by its frame, a page laid over another, a client page shrunk
  // to a thumbnail. Their own crops and layers are on purpose, so only the page's overflow and their buttons are
  // checked inside them (figures, role=img, decorative copies, and the firm-branded previews in .reg-firm).
  const inPicture = (el: Element) => !!el.closest("figure, [inert], [role=img], [aria-hidden=true], .reg-firm");
  const offstage = (el: Element) => !!el.closest("dialog:not([open])");
  const clipsX = (el: Element) => ["hidden", "clip", "auto", "scroll"].includes(getComputedStyle(el).overflowX);

  // overflow: the page scrolls sideways.
  window.scrollTo(100000, window.scrollY);
  const sideways = window.scrollX;
  window.scrollTo(0, window.scrollY);
  if (sideways > 0) {
    const wide: Element[] = [];
    for (const el of Array.from(document.body.querySelectorAll("*"))) {
      const r = el.getBoundingClientRect();
      if (r.right <= vw + 1 || !visible(el) || offstage(el) || getComputedStyle(el).position === "fixed") continue;
      // Inside a box that clips or scrolls sideways, it can't widen the page.
      let clipped = false;
      for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) if (clipsX(a)) { clipped = true; break; }
      if (clipped) continue;
      // Only the innermost element that sticks out: its parents stick out because of it.
      if (Array.from(el.children).some((c) => c.getBoundingClientRect().right > vw + 1)) continue;
      wide.push(el);
    }
    out.push(...wide.slice(0, 5).map((el) => ({ kind: "overflow" as const, where: label(el), text: `${snippet(el)} (to ${Math.round(el.getBoundingClientRect().right)} px of ${vw})` })));
    if (!wide.length) out.push({ kind: "overflow", where: "html", text: `the page scrolls ${sideways} px sideways` });
  }

  const all = Array.from(document.body.querySelectorAll("*")).filter((el) => visible(el) && !offstage(el));
  for (const el of all) {
    const s = getComputedStyle(el);
    const own = textRects(el);
    // clipped: a box that hides its overflow, with some of its text (outside pictures) beyond its edges, or cut short
    // by an ellipsis or a line clamp.
    const hides = (v: string) => v === "hidden" || v === "clip";
    if ((hides(s.overflowX) || hides(s.overflowY) || s.webkitLineClamp !== "none") && !inPicture(el)) {
      const box = el.getBoundingClientRect();
      const left = box.left + el.clientLeft, top = box.top + el.clientTop;
      const right = left + el.clientWidth, bottom = top + el.clientHeight;
      const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let cut: Text | null = null;
      for (let n = walk.nextNode(); n && !cut; n = walk.nextNode()) {
        const parent = (n as Text).parentElement;
        if (!(n as Text).data.trim() || !parent || inPicture(parent) || !visible(parent)) continue;
        const range = document.createRange();
        range.selectNodeContents(n);
        for (const r of Array.from(range.getClientRects())) {
          if (r.width === 0 || r.height === 0) continue;
          const outX = hides(s.overflowX) && (r.right > right + 1 || r.left < left - 1);
          const outY = hides(s.overflowY) && (r.bottom > bottom + 1 || r.top < top - 1);
          if (outX || outY) { cut = n as Text; break; }
        }
      }
      if (cut) out.push({ kind: "clipped", where: label(el), text: cut.data.trim().slice(0, 48) });
    }
    if (s.textOverflow === "ellipsis" && el.scrollWidth > el.clientWidth + 1 && !inPicture(el)) out.push({ kind: "clipped", where: label(el), text: `${snippet(el)} (ellipsis)` });
    // overruns: this element's own text runs past its right edge.
    if (own.length && s.display !== "inline" && s.display !== "contents") {
      const box = el.getBoundingClientRect();
      const right = box.right - parseFloat(s.borderRightWidth);
      const over = Math.max(...own.map((r) => r.right)) - right;
      if (over > 2 && !inPicture(el)) out.push({ kind: "overruns", where: label(el), text: `${snippet(el)} (${Math.round(over)} px past its box)` });
    }
  }

  // button: a label that no longer fits inside its button (pictures included: their buttons are drawn to be read).
  for (const el of Array.from(document.body.querySelectorAll("button, [role=button], a.btn2, .btn2, input[type=submit], input[type=button]"))) {
    if (!visible(el) || offstage(el) || !el.textContent?.trim()) continue;
    const box = el.getBoundingClientRect();
    // The label's own words: not a picture the button carries (the For firms studio's thumbnails are buttons).
    const rects: DOMRect[] = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      const pic = n.parentElement?.closest("[aria-hidden=true], [role=img]");
      if (!(n as Text).data.trim() || (pic && pic !== el && el.contains(pic))) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      rects.push(...Array.from(range.getClientRects()).filter((r) => r.width > 0 && r.height > 0));
    }
    const sticks = rects.some((r) => r.left < box.left - 1 || r.right > box.right + 1 || r.top < box.top - 1 || r.bottom > box.bottom + 1);
    const cut = el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== "visible";
    if (sticks || cut) out.push({ kind: "button", where: label(el), text: snippet(el) });
  }

  // overlap: two different texts drawn over each other, outside the pictures.
  // A line's box is the font's whole ascent and descent, much taller than its letters at display sizes, so lines of a
  // tight headline touch by their boxes: each line is trimmed to its middle 60%, roughly where the letters are.
  type Run = { el: Element; r: { top: number; bottom: number; left: number; right: number; height: number } };
  const runs: Run[] = [];
  // What a box that hides its overflow cuts off isn't drawn, so it overlaps nothing.
  const shown = (el: Element, r: DOMRect) => {
    let { left, right, top, bottom } = r;
    for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
      const s = getComputedStyle(a);
      if (s.overflowX === "visible" && s.overflowY === "visible") continue;
      const b = a.getBoundingClientRect();
      if (s.overflowX !== "visible") { left = Math.max(left, b.left); right = Math.min(right, b.right); }
      if (s.overflowY !== "visible") { top = Math.max(top, b.top); bottom = Math.min(bottom, b.bottom); }
    }
    return { left, right, top, bottom };
  };
  for (const el of all) {
    if (inPicture(el)) continue;
    const s = getComputedStyle(el);
    for (const full of textRects(el)) {
      const r = shown(el, full);
      // The element's own overflow clips its own text too.
      if (s.overflowX !== "visible") { const b = el.getBoundingClientRect(); r.left = Math.max(r.left, b.left); r.right = Math.min(r.right, b.right); }
      if (r.right - r.left < 1 || r.bottom - r.top < 1) continue;
      const h = r.bottom - r.top;
      runs.push({ el, r: { top: r.top + 0.2 * h, bottom: r.bottom - 0.2 * h, left: r.left, right: r.right, height: 0.6 * h } });
    }
  }
  runs.sort((a, b) => a.r.top - b.r.top);
  const seen = new Set<string>();
  for (let i = 0; i < runs.length; i++) {
    const a = runs[i]!;
    for (let j = i + 1; j < runs.length && runs[j]!.r.top < a.r.bottom; j++) {
      const b = runs[j]!;
      if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
      const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (w > 4 && h > 2) {
        const key = `${label(a.el)}|${label(b.el)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ kind: "overlap", where: `${label(a.el)} ⟷ ${label(b.el)}`, text: `${snippet(a.el).slice(0, 24)} / ${snippet(b.el).slice(0, 24)}` });
      }
    }
  }
  return out;
}
