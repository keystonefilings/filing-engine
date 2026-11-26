"use client";

import { useEffect } from "react";
import { FIRM_NAME_KEY } from "@/lib/firm-name-carry";

/** Once sign-up has gone through, the name typed at the Close or at sign-up leaves the browser's storage (10A.9.4). */
export function ForgetFirmName() {
  useEffect(() => { try { sessionStorage.removeItem(FIRM_NAME_KEY); } catch { /* storage blocked: nothing was kept */ } }, []);
  return null;
}
