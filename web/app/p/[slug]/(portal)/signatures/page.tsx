import { Vignette } from "@/components/Vignette";
import "@/styles/components/desk-work.css";
import { firmContext } from "@/lib/firm";
import { listSignatures } from "@/lib/signatures";
import { SignatureForm } from "@/components/SignatureForm";
import { Notice } from "@/components/ui/Sheet";
import { addSignature, removeSignature } from "./actions";

export const metadata = { title: "Signatures" };

const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

/**
 * Saved signatures (merged spec 10B.16): a narrow page. The ledger of who has a signature saved (never the images:
 * nobody can download one), or the fountain pen over a Plain slip; then "Add a signature" with its form and pad, whose
 * "Save signature" is the page's one Brass button.
 */
export default async function SignaturesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { session } = await firmContext(slug);
  const { signatures, consentText } = await listSignatures(session.apiKey, session.clientCompanyId);
  const active = signatures.filter((s) => s.active);
  return (
    <div className="sigs2">
      <h1>Saved signatures</h1>
      <p className="dw-lede">Some New York filings are a state PDF form that has to be signed. A saved signature is kept encrypted and is placed on a form only after that filing is approved, never on a preview or test run. Nobody can download it.</p>
      {active.length ? (
        <div className="dw-ledger sigs2-list">
          <table>
            <thead><tr><th scope="col">Signer</th><th scope="col">Saved</th><th scope="col">Last used</th><td /></tr></thead>
            <tbody>
              {active.map((s) => (
                <tr key={s.id}>
                  <td className="sigs2-who"><span className="sigs2-name">{s.signerName}</span>{s.signerEmail ? <span className="sigs2-email">{s.signerEmail}</span> : null}</td>
                  <td className="dw-date" data-label="Saved"><time dateTime={s.createdAt}>{DAY.format(new Date(s.createdAt))}</time></td>
                  <td className="dw-date" data-label="Last used">{s.lastUsedAt ? <time dateTime={s.lastUsedAt}>{DAY.format(new Date(s.lastUsedAt))}</time> : "Never"}</td>
                  <td className="sigs2-act"><form action={removeSignature.bind(null, slug)}><input type="hidden" name="id" value={s.id} /><button className="btn small danger" type="submit">Remove</button></form></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="dw-empty">
          <Vignette name="v06-fountain-pen" size={120} />
          <Notice>No saved signatures yet.</Notice>
        </div>
      )}
      <h2 className="sigs2-add">Add a signature</h2>
      <SignatureForm action={addSignature.bind(null, slug)} consentText={consentText} />
    </div>
  );
}
