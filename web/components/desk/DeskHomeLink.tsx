"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** A link to the desk's Filings (/p/<firm>), worked out from the current address, for pages that don't get the firm's slug. */
export function DeskHomeLink({ className, children }: { className?: string; children: ReactNode }) {
  const home = (usePathname() ?? "/").split("/").slice(0, 3).join("/") || "/";
  return <Link className={className} href={home}>{children}</Link>;
}
