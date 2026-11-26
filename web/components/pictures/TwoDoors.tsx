import { ClientPagePicture } from "./ClientPagePicture";
import { DoorsStage } from "./DoorsStage";
import { FIRMS, type ExampleFirm } from "./examples";
import { MotionFigure } from "./MotionFigure";
import { Photo } from "./Photo";

export const DOORS_LABEL = "Two example firms · same page, each in its own brand";
/** Stand-in words (COPY-NEEDED, D7): the door photographs' alt text. */
const ALT: Record<ExampleFirm, string> = {
  hp: "A brass name plate engraved Harbor & Pine CPA beside a blue door",
  ng: "A steel name plate engraved Northgate Payroll beside a glass door",
};

function Door({ firm, other }: { firm: ExampleFirm; other: ExampleFirm }) {
  return (
    <div className={`pdoors-door is-${firm === "hp" ? "a" : "b"}`} role="group" aria-label={FIRMS[firm].name}>
      <Photo name={firm === "hp" ? "c01-harbor-pine-door" : "c02-northgate-door"} mobile={firm === "hp" ? "c01-harbor-pine-door-mobile" : "c02-northgate-door-mobile"} alt={ALT[firm]} className="pdoors-photo" />
      <div className="pdoors-panel">
        <ClientPagePicture firm={firm} bare />
        {/* The other firm's copy of the same page, stacked exactly over it, revealed past the wipe handle */}
        <div className="pdoors-other" aria-hidden="true"><ClientPagePicture firm={other} /></div>
      </div>
    </div>
  );
}

/**
 * Two doors, one page (L2; merged spec 9.2, 10A.2.3): Harbor & Pine's and Northgate Payroll's doors, the same client
 * page in front of each in its own brand, a caliper hairline between the two pages, and the wipe handle. The signature
 * moment (M2, 4.2 s; 2.5 s on phones) plays once per visit across the home page and For firms.
 */
export function TwoDoors({ parked }: { parked?: boolean }) {
  return (
    <MotionFigure pic="L2" ms={4200} msPhone={2500} className={["pic-doors", parked && "is-parked"].filter(Boolean).join(" ")}
      ariaLabel="The same client page under two example firms" label={DOORS_LABEL}>
      <DoorsStage parked={parked} names={[FIRMS.hp.name, FIRMS.ng.name]}>
        <div className="pdoors-strip">
          <Door firm="hp" other="ng" />
          <Door firm="ng" other="hp" />
        </div>
        <span className="pdoors-split" aria-hidden="true" />
        <span className="pdoors-caliper" aria-hidden="true" />
      </DoorsStage>
    </MotionFigure>
  );
}
