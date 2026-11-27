"use server";

import type { IntakeResult } from "@/components/IntakeForm";
import type { SetupState } from "@/app/p/[slug]/(portal)/setup/actions";

// The QA gallery's forms are pictures of the real ones: sending does nothing.

export async function galleryIntake(_fd: FormData): Promise<IntakeResult> {
  return { ok: false, issues: [] };
}

export async function galleryBranding(_prev: SetupState, _fd: FormData): Promise<SetupState> {
  return null;
}
