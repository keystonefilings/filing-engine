import "@/styles/components/button.css";
import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonKind = "action" | "ink" | "outline" | "quiet" | "danger";
export type ButtonSize = "proof" | "large" | "medium" | "header" | "small";

interface Common {
  kind?: ButtonKind;
  size?: ButtonSize;
  /** Full width on every screen; `phoneBlock` only on phones (every page's main action, 11.1). */
  block?: boolean;
  phoneBlock?: boolean;
  /** Inside a marketing picture: the same look, inert (11.0). */
  picture?: boolean;
  className?: string;
  children: ReactNode;
}

function classes({ kind = "action", size = "large", block, phoneBlock, picture, className }: Omit<Common, "children">) {
  return ["btn2", `is-${kind}`, size !== "large" && `is-${size}`, block && "is-block", phoneBlock && "is-phone-block", picture && "is-picture", className]
    .filter(Boolean).join(" ");
}

/**
 * A button (merged spec 11.1). `action` is the register's one main action: Brass in CoFile's look, the
 * firm's fill on its client pages. At most one per screen in CoFile's look; repeats are `ink`.
 */
export function Button(props: Common & { type?: "button" | "submit" | "reset"; name?: string; value?: string; disabled?: boolean; pending?: boolean; formAction?: string | ((fd: FormData) => void) }) {
  const { type = "button", name, value, disabled, pending, children, formAction } = props;
  if (props.picture) return <span className={classes(props)}>{children}</span>;
  return (
    <button
      type={type}
      name={name}
      value={value}
      className={classes(props)}
      aria-disabled={disabled || pending ? true : undefined}
      aria-busy={pending ? true : undefined}
      disabled={disabled}
      formAction={formAction as never}
    >
      {children}
    </button>
  );
}

/** A link that looks like a button. */
export function ButtonLink(props: Common & { href: string }) {
  if (props.picture) return <span className={classes(props)}>{props.children}</span>;
  return <Link href={props.href} className={classes(props)}>{props.children}</Link>;
}
