/**
 * The shared motion module (merged spec 8.1, 8.9; D2). A picture's markup is its final frame. The module sets a
 * picture's "before" state only while it is out of view (or, for the hero, from a small script before first paint),
 * plays it the first time 40% of it is in view, once per visit (sessionStorage), one picture at a time, and jumps to
 * the final frame if it leaves the screen, the tab is hidden or reduced motion turns on.
 */
export const PLAYED_KEY = "cofile.played";
export const IN_VIEW = 0.4;

export function reducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasPlayed(id: string): boolean {
  try { return (JSON.parse(sessionStorage.getItem(PLAYED_KEY) ?? "[]") as string[]).includes(id); } catch { return false; }
}

export function markPlayed(id: string): void {
  try {
    const list = JSON.parse(sessionStorage.getItem(PLAYED_KEY) ?? "[]") as string[];
    if (!list.includes(id)) sessionStorage.setItem(PLAYED_KEY, JSON.stringify([...list, id]));
  } catch { /* storage blocked: it may play again on the next page */ }
}

/* One at a time (8.1): a picture that reaches 40% while another plays waits for it, unless the wait would pass
   600 ms, when the first jumps to its final frame. */
let current: { id: string; endsAt: number; finish: () => void } | null = null;

export function requestPlay(id: string, ms: number, start: () => void, finish: () => void): () => void {
  let timer = 0;
  const go = () => { current = { id, endsAt: performance.now() + ms, finish }; start(); };
  const wait = current && current.id !== id ? current.endsAt - performance.now() : 0;
  if (wait > 600) { current!.finish(); go(); }
  else if (wait > 0) timer = window.setTimeout(go, wait);
  else go();
  return () => window.clearTimeout(timer);
}

export function released(id: string): void {
  if (current?.id === id) current = null;
}

/**
 * The hero's start before first paint (9.1): set on <html> when motion is allowed, L1 hasn't played this visit and the
 * desk is in the first screen at load (its top in the upper 70% of the window), so the rows are already hidden when the page first paints. Runs right after the
 * picture's markup.
 */
export function prepaintScript(figureId: string, pic: string): string {
  return `(function(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;var p=JSON.parse(sessionStorage.getItem("${PLAYED_KEY}")||"[]");if(p.indexOf("${pic}")>=0)return;var f=document.getElementById("${figureId}");if(!f)return;var r=f.getBoundingClientRect();if(r.height>0&&r.top>=0&&r.top<innerHeight*0.7)document.documentElement.setAttribute("data-pre","${pic}")}catch(e){}})()`;
}
