"use client";

import { useActionState, useEffect, useRef } from "react";

/**
 * useActionState for a form that keeps what the person typed. React 19 clears a form's fields
 * whenever its action finishes, so a "check the highlighted fields" answer (or a wrong password)
 * used to throw the answers away.
 *
 * The form keeps React's server action, so it posts securely even before the page's JavaScript
 * has loaded (and without JavaScript at all), never as a GET that would put a password in the
 * address. React clears the fields by calling the form's reset(), which fires a cancelable
 * "reset" event first; this hook cancels it and empties only the password fields, as usual.
 *
 * clearOnSuccess: forms that make something new (a team member, a link, a key) still start empty
 * once the server answers { ok: true }. Settings forms keep their values.
 */
export function useKeptForm<S>(
  action: (prev: Awaited<S>, fd: FormData) => S | Promise<S>,
  initial: Awaited<S>,
  opts: { clearOnSuccess?: boolean } = {},
) {
  const [state, run, pending] = useActionState(action, initial);
  const ref = useRef<HTMLFormElement>(null);
  // The state React has just rendered; the reset happens while that render is committed.
  const latest = useRef(state);
  latest.current = state;
  const clear = opts.clearOnSuccess ?? false;
  useEffect(() => {
    const form = ref.current;
    if (!form) return;
    const onReset = (e: Event) => {
      if (clear && (latest.current as { ok?: boolean } | null)?.ok === true) return;
      e.preventDefault();
      for (const el of Array.from(form.querySelectorAll<HTMLInputElement>('input[type="password"]'))) el.value = "";
    };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [clear]);
  return { state, pending, formProps: { ref, action: run } };
}
