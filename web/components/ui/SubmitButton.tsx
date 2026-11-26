"use client";
import { useFormStatus } from "react-dom";
import { Button, type ButtonKind, type ButtonSize } from "./Button";

/**
 * A form's submit button: while the form is sending, it keeps its pressed look and width and shows the
 * product's own pending word ("Sending…", "Saving…"). Never disabled to signal missing fields (11.1).
 */
export function SubmitButton({ children, pendingLabel, kind, size, block, phoneBlock, name, value }: {
  children: string; pendingLabel: string; kind?: ButtonKind; size?: ButtonSize; block?: boolean; phoneBlock?: boolean; name?: string; value?: string;
}) {
  const { pending } = useFormStatus();
  return <Button type="submit" kind={kind} size={size} block={block} phoneBlock={phoneBlock} name={name} value={value} pending={pending}>{pending ? pendingLabel : children}</Button>;
}
