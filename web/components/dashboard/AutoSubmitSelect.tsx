"use client";

import type { ReactNode } from "react";

/** A select that submits its form when it changes (10C.5); the form's own button stays for everyone without JavaScript. */
export function AutoSubmitSelect({ name, defaultValue, label, children }: { name: string; defaultValue: string; label: string; children: ReactNode }) {
  return (
    <select name={name} defaultValue={defaultValue} aria-label={label} onChange={(e) => e.currentTarget.form?.requestSubmit()}>
      {children}
    </select>
  );
}
