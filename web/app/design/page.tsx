import { notFound } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Check, ChoiceCard, FieldRow, Fold, SelectField, TextArea, TextField } from "@/components/ui/Field";
import { Chip, StageDots, StatusChip } from "@/components/ui/Chip";
import { FirmLogo, FirmRule, Letterhead, Notice, Register, Sheet } from "@/components/ui/Sheet";
import { firmVars, inkMatch } from "@/lib/design/ink";

// The component gallery (build plan, phase 0b): every core component in CoFile's look and in three firms'
// brands, for screenshot review. Not served in production unless DESIGN_GALLERY=true.
export const metadata = { title: "Components", robots: { index: false } };

const FIRMS = [
  { name: "Harbor & Pine CPA", main: "#1D4E63", second: "#2B5A47", font: "Lora, Georgia, serif" },
  { name: "Northgate Payroll", main: "#C2410C", second: null, font: "Montserrat, Arial, sans-serif" },
  { name: "Sunrise Bookkeeping", main: "#F2C200", second: null, font: "system-ui, sans-serif" },
];

const LEDGER = [
  { name: "Two Sisters Bakery LLC", who: "Ana Ortiz", email: "ana@example.com", client: true, type: "New Jersey LLC formation", status: "awaiting_approval", started: "Nov 24" },
  { name: "Redwood Roofing LLC", who: "pat@harborpine.example", client: false, type: "New York LLC formation", status: "running", started: "Nov 23" },
  { name: "Mesa Dental PC", who: "pat@harborpine.example", client: false, type: "EIN", status: "completed", started: "Nov 20" },
  { name: "Juniper Studio LLC", who: "Lucía Muñoz", email: "lucia@example.com", client: true, type: "Florida LLC formation", status: "rejected", started: "Nov 18" },
];

function Controls({ prefix }: { prefix: string }) {
  return (
    <div className="form2">
      <TextField id={`${prefix}-name`} label="Business name" help="As it should appear on the state's records." required defaultValue="Two Sisters Bakery" />
      <TextField id={`${prefix}-naics`} label="NAICS code" optional help="2 to 6 digits." />
      <TextField id={`${prefix}-email`} label="Email" type="email" error="Enter an email address, like name@example.com." defaultValue="ana@" />
      <TextField id={`${prefix}-addr`} label="Street address" filled defaultValue="88 Grove St" />
      <FieldRow n={3}>
        <TextField id={`${prefix}-city`} label="City" defaultValue="Jersey City" />
        <SelectField id={`${prefix}-state`} label="State" defaultValue="NJ"><option value="NJ">NJ</option><option value="NY">NY</option></SelectField>
        <TextField id={`${prefix}-zip`} label="ZIP code" defaultValue="07302" inputMode="numeric" />
      </FieldRow>
      <TextArea id={`${prefix}-purpose`} label="Business purpose" optional />
      <div>
        <p className="field2-label" style={{ marginBottom: 8 }}>Registered agent</p>
        <div style={{ display: "grid", gap: 12 }}>
          <ChoiceCard name={`${prefix}-agent`} defaultChecked title="Your registered agent" note="The agent saved in Setup for this state." />
          <ChoiceCard name={`${prefix}-agent`} title="Ours" note="Registered Agents, Inc., through CoFile." />
        </div>
      </div>
      <Check defaultChecked>I am the authorized representative named above.</Check>
      <Fold title="Other provisions (optional)"><TextField id={`${prefix}-prov`} label="Provisions" /></Fold>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Button type="submit">Create the proof</Button>
        <Button kind="outline">Save for later</Button>
        <Button kind="quiet">Cancel</Button>
      </div>
    </div>
  );
}

export default function Gallery() {
  if (process.env.NODE_ENV === "production" && process.env.DESIGN_GALLERY !== "true") notFound();
  return (
    <Register value="cofile" as="main" className="gallery2">
      <style>{`.gallery2{padding:48px max(20px,calc((100vw - 1200px)/2));display:grid;gap:64px}.gallery2 h2{margin-bottom:24px}.g-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}.g-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr));gap:32px}.gallery2>*{min-width:0}.g-stage{display:grid;justify-items:start;min-width:180px}`}</style>
      <header style={{ display: "grid", gap: 16 }}>
        <p className="t-kicker">Design system, phase 0b</p>
        <h1 className="t-display-page">Components</h1>
        <p className="t-lede" style={{ maxWidth: "34em" }}>Every core component in CoFile&apos;s look, then in three firms&apos; brands as their clients see them.</p>
      </header>

      <section>
        <h2 className="t-display-m">Buttons</h2>
        <div style={{ display: "grid", gap: 16 }}>
          <div className="g-row"><Button size="proof">Approve, and authorize submission and payment</Button></div>
          <div className="g-row"><ButtonLink href="#">Run a free rehearsal</ButtonLink><Button kind="ink">New filing</Button><Button kind="outline">Send a client a link</Button><Button kind="quiet">See pricing</Button></div>
          <div className="g-row"><Button size="medium" kind="ink">Pay and file</Button><Button size="header" kind="outline">Run a free rehearsal</Button><Button size="small" kind="outline">Copy link</Button><Button size="small" kind="danger">Remove</Button></div>
          <div className="g-row"><Button disabled kind="outline">Clear signature</Button><Button pending>Sending…</Button></div>
        </div>
      </section>

      <section>
        <h2 className="t-display-m">Status</h2>
        <div className="g-row" style={{ marginBottom: 16 }}>
          <StatusChip status="awaiting_approval" /><StatusChip status="running" /><StatusChip status="submitted" /><StatusChip status="completed" />
          <StatusChip status="completed" quiet /><StatusChip status="blocked" /><StatusChip status="rejected" />
          <Chip tone="rehearsal">Rehearsal</Chip><Chip tone="neutral">Your plan</Chip><Chip tone="quiet" compact>Your client</Chip><Chip tone="mono">&quot;dryRun&quot;: true</Chip>
        </div>
        <div className="g-row">{["created", "awaiting_approval", "running", "submitted", "completed", "failed"].map((s) => <span key={s} className="g-stage"><StatusChip status={s} /><StageDots status={s} /></span>)}</div>
      </section>

      <section>
        <h2 className="t-display-m">Notices</h2>
        <div style={{ display: "grid", gap: 12, maxWidth: 760 }}>
          <Notice tone="turn">1 approved filing is ready to pay and needs your card&apos;s security code.</Notice>
          <Notice tone="rehearsal">Rehearsal: nothing will be filed or paid, even if you approve.</Notice>
          <Notice tone="problem" role="alert">Please fix these and submit again.</Notice>
          <Notice tone="done">Approval recorded.</Notice>
          <Notice>State fees separate. Rehearsals free.</Notice>
        </div>
      </section>

      <section>
        <h2 className="t-display-m">The filing desk&apos;s ledger</h2>
        <p style={{ marginBottom: 16 }}><FirmLogo name="Harbor & Pine CPA" /></p>
        <div className="table2-wrap">
          <table className="table2">
            <thead><tr><th>Filing</th><th>Sent by</th><th>Type</th><th>Status</th><th>Started</th></tr></thead>
            <tbody>{LEDGER.map((r) => (
              <tr key={r.name}>
                <td><a href="#">{r.name}</a></td>
                <td>{r.who}{r.client ? <> <Chip tone="quiet" compact>Your client</Chip></> : null}{r.email ? <div className="muted">{r.email}</div> : null}</td>
                <td className="muted">{r.type}</td>
                <td><StatusChip status={r.status} /><StageDots status={r.status} /></td>
                <td className="muted">{r.started}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="t-display-m">Forms, in CoFile&apos;s look</h2>
        <Sheet size="card"><Controls prefix="cf" /></Sheet>
      </section>

      <section>
        <h2 className="t-display-m">A firm&apos;s client page, three firms</h2>
        <div className="g-two">
          {FIRMS.map((f) => (
            <Register key={f.name} value="firm" firmStyle={{ ...firmVars(inkMatch(f.main, f.second)), "--font-firm": f.font }}>
              <div style={{ padding: 24 }}>
                <Sheet size="card" paper className="is-client">
                  <div style={{ display: "grid", gap: 24 }}>
                    <Letterhead name={f.name} />
                    <h3 className="t-page-title">New Jersey LLC formation</h3>
                    <Controls prefix={f.name.slice(0, 3)} />
                    <div className="g-row"><StatusChip status="awaiting_approval" /><Chip tone="rehearsal">Test</Chip></div>
                  </div>
                </Sheet>
              </div>
            </Register>
          ))}
        </div>
        <div style={{ marginTop: 32, maxWidth: 480 }}><FirmRule cofile /></div>
      </section>
    </Register>
  );
}
