"use client";

import { useEffect } from "react";
import { clearFirmName, FIRM_NAME_EVENT, readFirmName, writeFirmName } from "@/lib/firm-name";

/**
 * Carries the firm name typed at the home page's Close into sign-up (merged spec 9.9 "Carried into sign-up"): on load,
 * if this tab holds a name and "Firm name" is empty, the field is pre-filled (not focused); typing there writes back,
 * so a visitor who returns to the home page finds the two in step. With `clear`, on the page sign-up lands on once it
 * succeeds, the key is deleted. The name reaches the server only as "Firm name" in the form the visitor submits.
 */
export function FirmNameCarry({ inputId, clear }: { inputId?: string; clear?: boolean }) {
  useEffect(() => {
    if (clear) { clearFirmName(); return; }
    const input = inputId ? document.getElementById(inputId) as HTMLInputElement | null : null;
    if (!input) return;
    const stored = readFirmName();
    if (stored && !input.value) {
      // Through the native setter, so a controlled field (React) sees the change too.
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, stored);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
    let t = 0;
    const onInput = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => { writeFirmName(input.value); window.dispatchEvent(new CustomEvent(FIRM_NAME_EVENT, { detail: input.value })); }, 300);
    };
    input.addEventListener("input", onInput);
    return () => { input.removeEventListener("input", onInput); window.clearTimeout(t); };
  }, [inputId, clear]);
  return null;
}
