import { firmContext } from "@/lib/firm";
import { listSignatures } from "@/lib/signatures";
import { SignatureForm } from "@/components/SignatureForm";
import { addSignature, removeSignature } from "./actions";

export const metadata = { title: "Signatures" };

export default async function SignaturesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { session } = await firmContext(slug);
  const { signatures, consentText } = await listSignatures(session.apiKey, session.clientCompanyId);
  const active = signatures.filter((s) => s.active);
  return (
    <div className="narrow stack">
      <h1>Saved signatures</h1>
      <p className="muted">Some New York filings are a state PDF form that has to be signed. A saved signature is kept encrypted and is placed on a form only after that filing is approved, never on a preview or test run. Nobody can download it.</p>
      {active.length ? (
        <div className="card" style={{ padding: 0 }}>
          <table>
            <thead><tr><th>Signer</th><th>Saved</th><th>Last used</th><th /></tr></thead>
            <tbody>
              {active.map((s) => (
                <tr key={s.id}>
                  <td>{s.signerName}{s.signerEmail ? <div className="small muted">{s.signerEmail}</div> : null}</td>
                  <td className="small">{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="small">{s.lastUsedAt ? new Date(s.lastUsedAt).toLocaleDateString() : "Never"}</td>
                  <td><form action={removeSignature.bind(null, slug)}><input type="hidden" name="id" value={s.id} /><button className="btn small danger" type="submit">Remove</button></form></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p className="notice">No saved signatures yet.</p>}
      <h2>Add a signature</h2>
      <SignatureForm action={addSignature.bind(null, slug)} consentText={consentText} />
    </div>
  );
}
