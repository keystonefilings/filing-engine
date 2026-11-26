# CoFile website design spec: "Glass Engine"

**Designer:** Tomás Ferreira, creative technologist (spec 06 of 10) · **Date:** Nov 26, 2026
**For:** the build team · **Covers:** cofile.app, the filing desk, client pages and the proof, the enterprise dashboard, white-label surfaces, developer docs and emails

> **The idea in one breath.** CoFile does something almost nobody has seen: a browser fills in a state's website screen by screen, checks the fee, and stops in front of the last button. Today's site describes this. Mine **plays it back**, from a real recorded rehearsal with test details, so a cautious CPA can watch the engine work before trusting it with a client. The drama lives on the public site. As the stakes rise (the desk, the client's form, the proof), the motion drains away, until the proof is the stillest page CoFile owns. **Motion goes down as consequence goes up.**

---

## 1. Who I am and how that shapes this design

I grew up in São Paulo writing shaders at night and building festival installations by day; for six years in Berlin I've built real-time 3D and live product stories, mostly interfaces where you watch an agent act step by step so you can trust it or stop it. That is CoFile's problem exactly. Three habits shape this spec:

1. **Show the real thing.** Every frame of motion comes from a real recorded rehearsal or from data the product already emits (run steps, `filing.step` events, the per-type live switch). No recording, no animation: the page shows the text log.
2. **Spectacle is an enhancement.** Every scene sits on server-rendered HTML that already carries the locked copy, the sample proof and the log. WebGL loads last and switches off first.
3. **English is my third language.** I design for 35% longer Spanish strings, for `¿` and `ñ`, and for people who read slowly because the words matter.

---

## 2. The concept: Glass Engine

The machine works behind glass, where you can see it. The glass is also a wall: you can watch, but nothing reaches the state until a person says so.

### 2.1 Three ideas

1. **Watch it run.** The public site is a viewing room. A sample proof assembles; then a recorded rehearsal plays across 13 glass panes, each a real captured screen of New Jersey's LLC form filled in with test details. The visitor's scroll moves the timeline, the engine's caret moves, and the log fills in with the locked words: "filled", "passed", "matched the proof", "matches the proof".
2. **The hold is the hero.** The climax isn't "Filed!" It's **"Pay Now: held, on purpose."** The caret decelerates and stops just short of the state's Pay Now button, and an amber ring draws around it. That ring becomes the brand mark. For a product in beta, the most honest and most memorable image is the one where it *doesn't* press the button.
3. **Motion goes down as consequence goes up.** Every surface is assigned an intensity, and a developer checks this table before adding any animation:

| Intensity | Name | Where | What moves |
|---|---|---|---|
| **4** | Theater | Home page Stage bands, the full rehearsal replay page | WebGL scenes, scroll-linked timelines, the caret, the fee lock, the hold ring |
| **3** | Instrument | Filing desk, dashboard, docs | Live data only: run strips ticking per screen, webhook events arriving. SVG and CSS, no WebGL |
| **2** | Paper | Sign-up, login, setup, intake forms, emails | Feedback only: focus, "Same as" ink-in, pending buttons, folds. ≤ 200 ms |
| **1** | Still | The proof, decision pages, Ready to pay | Nothing moves on its own. No parallax, no reveal, no autoplay |

### 2.2 Why it fits

- **The reader is cautious, not jaded.** A 58-year-old CPA has seen a thousand hero gradients, never a machine filling in the NJ portal and refusing to press Pay Now. Seeing is how they'll decide to put their name on the door.
- **The product is already visual.** The proof shows the state's own review page; the engine records screens; run steps carry screen names and times. The site needs a good player, not metaphors.
- **The beta becomes the show.** "Rehearsal" stops being a disclaimer. On the coverage board, Live is a closed ring and everything else is visibly open.
- **Developers get the same truth.** The recording behind the home page also drives the docs' webhook event replay, so the CPA and the API buyer watch the same rehearsal from two seats.

No robots, no glowing brains, no "AI" particles, no stock handshakes, no invented metrics, no 3D state maps. The only 3D object on the site is glass with a real screen inside it.

---

## 3. Brand identity

The folder tab with a check says "office supplies". I'm discarding it and drawing the mark from the product's signature moment.

### 3.1 The mark: the Held Ring

A ring that goes almost all the way around and stops short of a dot. It reads as a **C**, as a **progress ring that hasn't closed**, and as a filing that went through every screen and **held before the last button** (the dot).

**Construction on a 48 × 48 unit grid** (clock positions; 3:00 = 0°, counterclockwise positive):

| Part | Spec |
|---|---|
| Ring centerline | Circle centered at (24, 24), radius 17 |
| Stroke | 6.5 units (0.135 of the outer diameter) |
| Arc | Starts at **2:30** (15°) with a **flat cap** cut along the radius, runs **clockwise** through 6, 9 and 12, ends at **1:00** (60°) with a **round cap**. 315° of arc, 45° of gap |
| Dot | Filled circle, 6.75 units (stroke + 0.25 optical correction), centered on the ring's centerline at **1:45** (37.5°), the middle of the gap |
| Optical correction | The round cap is pushed 0.4 units along the arc so both ends read as equal weight |
| Clearance | ≈ 2 units of air either side of the dot; never under 1.6 at any size |

The flat end is where the run began; the round end is where it stopped, gently; the dot is the last button, untouched. The full construction holds down to 20 px. From 16 to 19 px use the **small-size master** (stroke 0.18 of the diameter, gap 56°, dot 1.1 × stroke). Below 16 px, no mark.

### 3.2 The icon family that grows from the mark

The ring becomes the status language, so the logo and the product speak one dialect. All glyphs are drawn on 16 and 20 px grids with the mark's proportions:

| Glyph | Drawing | Used for (product status words) |
|---|---|---|
| **Held** | The mark: 315° arc, dot in the gap | Rehearsal, Rehearsed to the payment screen, "held, on purpose" |
| **Closed** | Full ring, dot at the center | Live, Approved, Submitted to the state, Accepted by the state, Completed, EIN issued |
| **Stopped** | 315° arc ending in a short perpendicular bar; no dot | Needs correcting, Paused: state site changed, Rejected by the state, Failed, Stopped |
| **Waiting** | 180° arc, round caps | Waiting for approval, Needs information, Changes requested, On hold, Being checked, Name unavailable |
| **Mapped** | Full ring, 8 dashes | Screens recorded, rehearsal next |
| **Offered** | Full ring, 16 dots | Offered, not yet rehearsed |
| **Planned** | Hairline ring, ⅓ stroke | Planned |
| **Running** | 315° arc whose gap rotates (intensity 3 only; static at reduced motion) | Received, Queued, Filing now, Getting the state's review page, Final check |

Shape carries meaning on its own, so color never has to: for color-blind readers, grayscale prints and firms whose brand color is red.

### 3.3 Wordmark and lockups

"CoFile": one word, capital C and F, never "Cofile", "COFILE" or "Co-File". Set in **Trace Sans Medium** (commissioned, section 5); at launch, **Instrument Sans SemiBold, width 90**. Tracking −1% at display sizes, 0 below 18 px. Two drawn refinements: the **C**'s upper terminal is cut at the same angle as the mark's flat end, and the **i**'s tittle is a true circle; in the full-color lockup only, that tittle is Trace Blue.

```
 Horizontal (default)              Stacked                        Mark only
 ┌───────────────────────┐         ┌──────────┐                   ┌─────┐
 │  (◜◝·)  CoFile        │         │  (◜◝·)   │                   │(◜◝·)│
 └───────────────────────┘         │  CoFile  │                   └─────┘
 mark height = 1.32 × cap height   └──────────┘
 gap mark→word = 0.42 × mark Ø     word centered, gap = 0.3 × Ø
```

- **Clear space:** 4 × stroke on every side. **Minimum:** lockup 88 px wide; mark 20 px (16 px small master).
- **Colors:** Ink on Daylight (`#11151B` on `#F5F4EF`), Daylight on Stage (`#ECEEF2` on `#0B0E13`), or full color (dot and tittle in Trace Blue). Never on photos or gradients. Never in green, amber or red: the brand never borrows status colors.
- **Don'ts:** don't close the ring, move the dot, rotate the mark, or put it on a firm's client pages.
- **The one sanctioned animation:** on the home page's first paint only, the arc draws clockwise from the flat end in 900 ms (`ease-hold`), and the dot fades in 120 ms later: the run, in miniature. Nowhere else does the logo move.

### 3.4 The "with CoFile" co-brand mark

The locked copy promises "The only sign of us is a small 'with CoFile'." I take "small" literally.

- **Text only, no mark:** "with" regular, "CoFile" medium, always in CoFile's UI face (it reads as a credit line, not the firm's voice).
- **Size and color:** 12 px on the desk and intake pages, 13 px on the proof, 11 px in emails; `--text-3` (`#5C6370` / `#8B93A1`), never the firm's color or Trace Blue; ≥ 5:1 contrast everywhere.
- **Placement:** right end of the firm's brand bar, baseline-aligned with the firm's name. Under 400 px wide it moves to the footer after the firm's support email, so the brand bar holds only the firm.
- **Not a link** on client pages (a client is never led away from the firm); a link to cofile.app on the desk.
- **Absent** on enterprise white-label pages (`/e/…`), in the embed widget and on any tenant-branded page.
