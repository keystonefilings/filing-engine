import { redirect } from "next/navigation";
import { engine, type Account, type ClientCompany, type SignInResult } from "./engine";
import { writeSession } from "./session";
import { supportEmail } from "./brand";

/**
 * After the engine accepted a sign-in (password or Google): keep the session and go to the right
 * dashboard. Enterprise people go to the enterprise dashboard, partner firms to their own.
 * Returns an error message, or redirects. Not a server action: only server code calls it.
 */
export async function finishSignIn(r: SignInResult, signedInWith: "password" | "google"): Promise<string> {
  const { user, sessionKey, expiresAt } = r;
  if (user.kind === "enterprise") {
    const account = await engine<Account>(sessionKey, "/v1/account");
    await writeSession({ kind: "tenant", apiKey: sessionKey, tenantId: user.tenantId, name: account.name, signedInWith, email: user.email });
    redirect("/dashboard");
  }
  if (!user.clientCompanyId) return "Your account is waiting for approval. We'll email you when it's ready.";
  const { clientCompany } = await engine<{ clientCompany: ClientCompany }>(sessionKey, `/v1/client-companies/${encodeURIComponent(user.clientCompanyId)}`);
  const slug = clientCompany.portal?.slug;
  if (!slug) return `Your portal isn't set up yet. Email ${supportEmail()} and we'll fix it.`;
  await writeSession({ kind: "firm", apiKey: sessionKey, tenantId: user.tenantId, clientCompanyId: user.clientCompanyId, slug, email: user.email, signedInWith, expiresAt });
  // Only partner firms (signed up themselves) have the setup guide; a firm an enterprise set up goes straight in.
  const done = clientCompany.partner?.setupDone ?? [];
  redirect(`/p/${encodeURIComponent(slug)}${clientCompany.partner && done.length < 3 ? "/setup" : ""}`);
}
