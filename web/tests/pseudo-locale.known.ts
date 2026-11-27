/**
 * Breakages the pseudo-locale run finds today that sit in shared files (the shells, components/ui, the shared
 * stylesheets), listed so the run guards everything else meanwhile. Each is printed as "known" on every run. Remove an
 * entry when its fix lands; `where` is matched as a substring of the finding's location.
 */
export const KNOWN: { path: string; width?: 390 | 1440; kind: "overflow" | "clipped" | "overruns" | "overlap" | "button"; where: string; why: string }[] = [];
