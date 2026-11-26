import { STAGES, stageOf } from "@/lib/status";

/** Five dots and "Proof, step 2 of 5": where a filing is up to. Nothing for a filing that stopped. */
export function StageTrack({ status }: { status: string }) {
  const s = stageOf(status);
  if (!s) return null;
  return (
    <span className="stage" role="img" aria-label={`Step ${s.step + 1} of ${STAGES.length}: ${s.label}`}>
      <span className="stage-dots" aria-hidden="true">
        {STAGES.map((name, i) => <i key={name} className={i <= s.step ? "on" : undefined} />)}
      </span>
      <span className="small muted" aria-hidden="true">{s.label}, step {s.step + 1} of {STAGES.length}</span>
    </span>
  );
}
