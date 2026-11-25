// Server-side only: called from server actions.
import { engine, EngineError } from "./engine";

const DATA_URL = /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/;

/**
 * Sends a logo picked on a branding form (its hidden logoData / logoRemove fields) to the engine.
 * Returns a message to show when it didn't work, or null. A typed link (keepLink) wins over removal.
 */
export async function applyLogo(apiKey: string, clientCompanyId: string, fd: FormData, keepLink = false): Promise<string | null> {
  const data = String(fd.get("logoData") ?? "");
  const remove = fd.get("logoRemove") === "1";
  const path = `/v1/client-companies/${encodeURIComponent(clientCompanyId)}/logo`;
  try {
    if (data) {
      if (!DATA_URL.test(data)) return "The logo must be a PNG, JPEG or WebP picture.";
      await engine(apiKey, path, { method: "PUT", body: { data } });
    } else if (remove && !keepLink) {
      await engine(apiKey, path, { method: "DELETE" });
    }
  } catch (e) {
    if (e instanceof EngineError && e.status === 422) {
      const issue = (e.body as { issues?: { message: string }[] })?.issues?.[0]?.message;
      return issue ? `The logo wasn't saved: ${issue}.` : "The logo wasn't saved.";
    }
    return "The logo wasn't saved. Try again in a minute.";
  }
  return null;
}
