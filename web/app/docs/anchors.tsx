import { cloneElement, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";

/** An anchor id from a heading's words ("Rotating a key" → "rotating-a-key"). */
export const anchorId = (t: string) => t.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** The id for a reference group's heading, kept apart from the endpoints' own ids ("usage", "account"). */
export const groupId = (g: string) => `group-${anchorId(g)}`;

function textOf(n: ReactNode): string {
  if (typeof n === "string" || typeof n === "number") return String(n);
  if (Array.isArray(n)) return n.map(textOf).join("");
  if (isValidElement(n)) return textOf((n.props as { children?: ReactNode }).children);
  return "";
}

type El = ReactElement<{ children?: ReactNode; id?: string }>;
const walkable = (n: ReactNode): n is El => isValidElement(n) && (typeof n.type === "string" || n.type === Fragment);

/** The h2s in a guide's body, for the docs nav's "on this page" anchors. */
export function headingsOf(n: ReactNode): { id: string; label: string }[] {
  if (Array.isArray(n)) return n.flatMap(headingsOf);
  if (!walkable(n)) return [];
  if (n.type === "h2") { const label = textOf(n.props.children); return [{ id: anchorId(label), label }]; }
  return headingsOf(n.props.children);
}

/** A "#" that hangs into the margin beside an h2 on hover or focus (10C.16); the heading itself carries the meaning. */
export function HeadAnchor({ id }: { id: string }) {
  return <a className="docs2-anchor" href={`#${id}`} aria-hidden="true" tabIndex={-1}>#</a>;
}

/** A guide's body with ids and hanging anchors on its h2s. Only plain elements are walked, never components. */
export function withAnchors(n: ReactNode): ReactNode {
  if (Array.isArray(n)) return n.map(withAnchors);
  if (!walkable(n)) return n;
  const kids = n.props.children;
  if (kids === undefined || kids === null) return n;
  const mapped = Array.isArray(kids) ? kids.map(withAnchors) : [withAnchors(kids)];
  if (n.type === "h2") {
    const id = anchorId(textOf(kids));
    return cloneElement(n, { id }, <HeadAnchor id={id} />, ...mapped);
  }
  return cloneElement(n, undefined, ...mapped);
}

/** An h2 written in a page, with its id and hanging anchor. */
export function H2({ children }: { children: string }) {
  const id = anchorId(children);
  return <h2 id={id}><HeadAnchor id={id} />{children}</h2>;
}
