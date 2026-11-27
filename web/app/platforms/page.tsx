import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { Lines, PageHead } from "@/components/site-pages/PageHead";
import { DashedOutline, Glyph } from "@/components/ui/glyphs";
import { Lockup } from "@/components/shell/Lockup";
import { InquiryForm } from "@/components/AuthForms";
import { sendInquiry } from "@/lib/accounts";
import { platformName } from "@/lib/brand";
import "@/styles/components/platforms.css";

export function generateMetadata() {
  const name = platformName();
  return {
    title: "For platforms",
    description: `Filing companies, banks and fintechs: offer state filings inside your own product, under your own brand, with ${name} underneath.`,
  };
}

/** The dry run, as the list and the picture both show it: mono on the stage's Night, with the rehearsal's dashed edge. */
function DryRun() {
  return <code className="plat2-dry"><DashedOutline />&quot;dryRun&quot;: true</code>;
}

function Underneath() {
  return (
    <figure className="und2">
      <div className="und2-stack">
        <div className="und2-code">
          <p className="und2-kind">API request</p>
          <pre className="und2-pre"><code>
            <span className="k">curl</span> …/v1/filings \{"\n"}
            {"  "}<span className="k">-H</span> &quot;x-api-key: $COFILE_API_KEY&quot; \{"\n"}
            {"  "}<span className="k">-d</span> &apos;{"{"}{"\n"}
            {"    "}<span className="k">&quot;type&quot;</span>: &quot;formation&quot;,{"\n"}
            {"    "}<span className="k">&quot;state&quot;</span>: &quot;NJ&quot;,{"\n"}
            {"    "}<span className="k">&quot;formation&quot;</span>: {"{ … },"}{"\n"}
            {"    "}<span className="und2-dry"><Glyph kind="ghost" /><span className="und2-dry-mark"><DashedOutline /></span><span className="k">&quot;dryRun&quot;</span>: <span className="k">true</span></span>{"\n"}
            {"  "}{"}"}&apos;
          </code></pre>
        </div>
        <div className="und2-widget sheet">
          <p className="und2-kind">Embedded intake</p>
          <p className="und2-best">Best Accounting</p>
          <p className="und2-w-title">New Jersey LLC formation</p>
          <div className="und2-w-field"><span>LLC name, without the ending</span><i /></div>
          <div className="und2-w-field"><span>Ending</span><i className="is-select">LLC</i></div>
        </div>
        <div className="und2-proof sheet">
          <p className="und2-kind">Branded approval</p>
          <p className="und2-best">Best Accounting</p>
          <div className="und2-firmrule" />
          <div className="und2-p-head"><p className="und2-p-title">Two Sisters Bakery LLC</p><span className="und2-turn"><Glyph kind="turn" />Ready to approve</span></div>
          <dl className="und2-rows">
            <div><dt>Business name</dt><dd>TWO SISTERS BAKERY LLC</dd></div>
            <div><dt>Members</dt><dd>Ana Ortiz, Lucia Ortiz (50/50)</dd></div>
            <div><dt>Main business address</dt><dd>88 Grove St, Jersey City NJ 07302</dd></div>
          </dl>
          <dl className="und2-fees">
            <div><dt>Formation filing fee</dt><dd>$100.00</dd></div>
            <div><dt>NJ portal fee, by card</dt><dd>$3.50</dd></div>
            <div className="is-total"><dt>Total to the state</dt><dd>$103.50</dd></div>
          </dl>
          <span className="und2-approve">Approve for filing</span>
        </div>
      </div>
      <figcaption className="pg2-caption">Example with test details</figcaption>
    </figure>
  );
}

export default function Platforms() {
  const name = platformName();
  return (
    <SiteShell>
      <PageHead kicker="For platforms" className="plat2-head" title={<Lines lines={["Building a filing product?", `Put ${name} underneath it.`]} />}>
        <div className="plat2-row">
          <div className="plat2-copy">
            <p className="t-lede pg2-lede plat2-lede">Offer state filings inside your product under your own brand. Tell us what you file and roughly how many, and we&apos;ll help you get set up.</p>
            <div className="plat2-ctas">
              <Link className="btn2 is-action" href="#enterprise" data-brass-cta="">Talk to us</Link>
              <Link className="btn2 is-outline" href="/docs">Read the API docs</Link>
            </div>
          </div>
          <div className="plat2-pic"><Underneath /></div>
        </div>
      </PageHead>

      <section className="pg2-band is-show" id="enterprise">
        <div className="site2-in pg2-two is-top">
          <ul className="pg2-words pg2-list t-body plat2-list">
            <li>An API, with webhooks for each stage</li>
            <li>A white-label setup, with your name and support contact on the proof</li>
            <li>An embeddable widget for your own pages</li>
            <li>Your own state logins, registered agent, signers and defaults</li>
            <li>Start with <DryRun />: the run rehearses on the state&apos;s website and stops before the final submit. <Link href="/docs">Read the API docs</Link>.</li>
          </ul>
          <div className="pg2-pic plat2-order" data-brass-cta="">
            <div className="plat2-letterhead"><Lockup height={24} name={name} /></div>
            <InquiryForm action={sendInquiry} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
