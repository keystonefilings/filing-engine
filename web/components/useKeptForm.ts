"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";

/**
 * useActionState for a form that keeps what the person typed. React 19 clears a form's fields
 * whenever its `action` finishes, so a "check the highlighted fields" answer (or a wrong
 * password) used to throw the answers away. Submitting through onSubmit instead keeps them.
 *
 * clearOnSuccess: forms that make something new (a team member, a link, a key) still start
 * empty again once the server answers { ok: true }. Settings forms keep their values.
 */
export function useKeptForm<S>(
  action: (prev: Awaited<S>, fd: FormData) => S | Promise<S>,
  initial: Awaited<S>,
  opts: { clearOnSuccess?: boolean } = {},
) {
  const [state, run, pending] = useActionState(action, initial);
  const ref = useRef<HTMLFormElement>(null);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The button that was pressed, so a form with several submit buttons still says which one.
    const submitter = (e.nativeEvent as SubmitEvent).submitter;
    const fd = submitter ? new FormData(e.currentTarget, submitter) : new FormData(e.currentTarget);
    startTransition(() => run(fd));
  };
  const clear = opts.clearOnSuccess ?? false;
  useEffect(() => {
    if (clear && (state as { ok?: boolean } | null)?.ok === true) ref.current?.reset();
  }, [state, clear]);
  return { state, pending, formProps: { ref, onSubmit } };
}
