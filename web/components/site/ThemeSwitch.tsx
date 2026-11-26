"use client";

import { useEffect, useState } from "react";
import { THEME_KEY } from "@/lib/theme";

type Theme = "device" | "light" | "dark";

/**
 * The appearance switch (merged spec 9.10): the site follows the device's setting; this overrides it on this browser
 * only (a per-viewer convenience in localStorage). lib/theme.ts's script applies it before first paint.
 */
export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("device");
  useEffect(() => {
    try { const t = localStorage.getItem(THEME_KEY); if (t === "light" || t === "dark") setTheme(t); } catch { /* storage blocked: follow the device */ }
  }, []);
  const choose = (t: Theme) => {
    setTheme(t);
    try { if (t === "device") localStorage.removeItem(THEME_KEY); else localStorage.setItem(THEME_KEY, t); } catch { /* still applies on this page */ }
    if (t === "device") delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = t;
  };
  const options: [Theme, string][] = [["device", "Device"], ["light", "Light"], ["dark", "Dark"]];
  return (
    <fieldset className="theme2">
      <legend className="theme2-label">Appearance</legend>
      <span className="theme2-options">
        {options.map(([t, label]) => (
          <label key={t}><input type="radio" name="theme2" value={t} checked={theme === t} onChange={() => choose(t)} /><span>{label}</span></label>
        ))}
      </span>
    </fieldset>
  );
}
