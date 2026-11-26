/** The beta notice's words where a firm's client reads them: they name neither CoFile nor its address (merged spec 10B.1.8). */
export const BETA_CLIENT_TEXT = "This service is in beta. Any filing can run as a rehearsal on the state's real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time.";

export function betaOn(): boolean {
  return process.env.SITE_BETA_BANNER !== "false";
}
