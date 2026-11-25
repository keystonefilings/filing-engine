import { portalText } from "../domain/portal-intake.js";
import type { StepContext } from "./types.js";

/**
 * Who gets the state's copies by email (V28, V31). The state sends its copies to the email on the
 * filing account; where it also offers a CC field (NY DOS online filing and E-Submission), the
 * engine puts there, in order:
 *  1. the address the filing's own intake form gave (intake.portal.ccEmail);
 *  2. the firm's copy address (client.copyEmail, V31), or for a partner firm filing on the
 *     platform's state accounts its contact email, so the CPA (not the end client) gets the copy;
 *  3. the subscriber's copy address (tenant.copyEmail, V31).
 */
export function copyCc(ctx: Pick<StepContext, "filing" | "client" | "tenant">): string | undefined {
  const fromIntake = portalText(ctx.filing.request, "ccEmail");
  if (fromIntake) return fromIntake;
  const c = ctx.client as { copyEmail?: string; partner?: { contactEmail?: string } };
  if (c.copyEmail) return c.copyEmail;
  if (c.partner?.contactEmail) return c.partner.contactEmail;
  return (ctx.tenant as { copyEmail?: string }).copyEmail;
}
