# CoFile website design spec: "In Register"

| | |
|---|---|
| **Designer** | Dev Raman, staff product designer |
| **Date** | Nov 26, 2026 |
| **Covers** | Every surface in the brief: public site, filing desk, service pages, client pages and the proof, enterprise dashboard, white-label and embed, developer docs, emails |
| **Copy** | Quoted from the repo and locked. Anything that needs new words is marked `[copy needed]` and listed in Appendix B |

---

## 1. Who I am and how that shapes this

I've spent eight years designing for payments and banking-as-a-service companies: design systems,
operator dashboards, and API references that are products in their own right. In that world the
screen that matters most is the confirmation before money moves, and the engineering idea that matters
most is that what the user confirmed is exactly what gets executed. You hash it, compare it, and
refuse to run if the two differ.

CoFile is that idea applied to state filings. So I work on it as a systems designer:

- **Tokens before pages.** CoFile will render thousands of firms' brands, so I design the theming
  engine, and CoFile's own look is simply the first theme that runs through it.
- **States before screens.** A filing moves through about twenty statuses. Each needs one color, glyph,
  label and next step everywhere it appears: chip, timeline, table, email, webhook.
- **One precise site, two reading depths.** The precision that makes a developer trust an API (exact
  values, copyable IDs, visible checks) is the same precision that makes a 60-year-old CPA trust a filing.

Today's paper-and-manila look is warm and well made, but it says "nice letterhead." I want CoFile to say
"this was checked."

## 2. The concept: In Register

On a multi-color press, every plate has to land in exactly the same place. When it does, the print is
**in register**: the edges line up and the job is true. When it doesn't, you see a ghost edge, slightly
off. Press operators check registration before the run and stop the press when it drifts.

That's CoFile, literally:

1. The copy already chose the printer's proof as its metaphor ("You've approved a proof before: business
   cards, letterhead, an invitation at the printer"). Registration is what the press checks *after* the
   proof is approved, so the metaphor carries through to the filing itself.
2. The product's job is keeping two things in register: **what the client approved** and **what the
   state's website shows**. The review page has to match the proof, the fee on the payment screen has to
   match the proof's fee, and if anything drifts, CoFile stops before paying.
3. To a developer, being in register is a diff with zero changes, or a hash that matches. It's the same idea in their vocabulary.

The design language follows from that:

- **The mark** is two sheets in register.
- **Layouts** pair values: approved on the left, what the state shows on the right, with a narrow
  "register gutter" between them that carries the check.
- **Motion** is things sliding into register: a ghost edge that settles and disappears.
- **The signature** is the **proof print**, a register mark generated from the approved details
  themselves, which follows the filing everywhere it goes (3.5).

None of it is decoration. Every visual device corresponds to a check the engine really performs.

## 3. Brand identity

### 3.1 The mark: "the Pair"

Two sheets of the same width, stacked, with their edges aligned. The top one is an outline (the proof)
and the bottom one is solid (the filing). Together they read as an equals sign: *matches*.

On a 24 × 24 grid:

| Part | Geometry |
|---|---|
| Top sheet | Rounded rectangle x 3 → 21, y 4 → 11, radius 2, 2-unit stroke drawn inside, no fill |
| Bottom sheet | Rounded rectangle x 3 → 21, y 13 → 20, radius 2, solid |
| Gap | 2 units, equal to the stroke, so outline and fill read as one family |
| Register notch | A 2 × 2 square cut from the bottom sheet's top-right corner (x 19 → 21, y 13 → 15). The one asymmetry: it orients the mark and stops it being a plain "=" |
| Rule | Left and right edges align exactly at every size. A half-pixel misalignment in an export is a bug |

Hinted variants: **16 px** (favicon) drops the notch and uses radius 1.5; **20–32 px** is the master;
**48 px and up** thins the stroke to 1.75/24. The mark is monochrome only: Carbon `#0F1419` on light,
Bond `#F6F6F3` on dark. Never in Proof Blue or any status color: color belongs to meaning.

### 3.2 Wordmark and lockups

"CoFile", one word with a capital C and F, set in GT Standard Medium (Section 5) and redrawn by hand:

- The **F** has two arms of exactly equal length (the retail lower arm is shorter), echoing the Pair's
  two sheets; arm length equals the width of the "o".
- The **o** is widened 2% so "Co" doesn't look condensed next to "File". The **i** gets a square tittle
  aligned to the F's upper arm. The **e** terminal is cut horizontal to match the F's flat arm ends.
- Tracking -10 at display sizes, 0 at 14 px and below. The cap height of C and F aligns with the top of
  the Pair's top sheet in the horizontal lockup.

Lockups: horizontal (default; gap = half the mark height), stacked (square spaces), mark only. Clear
space on every side equals the height of one sheet. Minimums: horizontal lockup 72 px wide, mark 16 px.

Don't tint the mark, put it in a container shape (except where an app platform forces one), set
"CoFile" in caps or write "Cofile", animate it outside the register motion (Section 8), or place it on a
firm's page anywhere except inside the co-brand mark.

### 3.3 The "with CoFile" co-brand mark

The only sign of CoFile on a firm's pages. It's a component, not an image, so it inherits the page theme
and always passes contrast.

| Property | Value |
|---|---|
| Content | The Pair at 12 px followed by "with CoFile" (locked copy) |
| Type | GT Standard Regular 12/16, `--cf-fg-subtle` (6.06:1 on white, 6.08:1 on dark surface) |
| Placement | Right end of the firm header on desktop, under the firm name on phones; once more in the proof's footer |
| Never | In the firm's color, larger than the firm's name, inside the embed's form area, or linked anywhere but cofile.app (new tab) |
| Minimum | 11 px text; below that, drop the mark and keep the words |

### 3.4 Usage on CoFile's own pages

The mark and Proof Blue lead on cofile.app, the docs and the dashboard. The wordmark alone (no mark) is
allowed in running text, the footer line and legal pages.

### 3.5 The signature: the proof print

The engine already binds every approval to a SHA-256 hash of the exact request (`canonicalHash` in
`src/approvals/hash.ts`). Today nobody sees that hash. I want to print it.

**The proof print** is a small register seal generated from the approved details. The same details
always give the same print, and a change of one character gives a different one. That's the moment the
copy describes: "If anything has to change later, it comes back to them to approve again."

```
        ╷ ╷╷ ╷ ╷╷╷         32 radial ticks on a ring (r 16, 48-unit grid)
     ╶╴            ╶╴        long tick (6 units) = bit 1, short (3) = bit 0
    ╶       ◯        ╴       index gap at 12 o'clock fixes orientation
     ╶╴            ╶╴        centre: empty circle r 6, stroke 1.5
        ╵ ╵╵╵ ╵ ╵╵
          4F2A·91C0          the same 32 bits as 8 hex characters, Mono
```

- **Bits** are the first 32 bits of `HMAC-SHA256(server_key, canonicalHash)`. Using an HMAC means a
  truncated hash of personal details can't be used to test guesses.
- **Color** is always `--cf-fg-default`, never the firm's or a status color. Because it's neutral, it can
  appear on white-label pages without being a CoFile logo.
- **Sizes:** 40 px on the proof, 20 px in timelines and tables, 14 px in log lines, and 64 px in emails
  as a 2× PNG.
- **Text:** the 8 characters are real text in GT Standard Mono, so screen readers read them and two
  people can compare them by eye or over the phone.

| Where | Beside which existing words |
|---|---|
| The proof | "Filing reference {id}" |
| The decision page | "Approval recorded" |
| Filing detail timeline | The "Approved" step, and each run check reading "matched the proof" or "matches the proof" |
| Rehearsal log (home, filing detail) | "Review page: matched the proof"; "Payment: $100.00 + $3.50 NJ portal fee: matches the proof" |
| Emails | "Your proof is ready to approve" and "Completed" |
| Dashboard filings table | A narrow column after Status |
| API and webhooks | A proposed `proofPrint` field on the filing and on `filing.approved`, so platforms can show the same print in their own product |

This is the one idea I'd fight for. It turns "Checked twice. Filed once." from a claim into something
you can see. The CPA reads it as a notary's embosser and the engineer reads it as a content hash. It costs
little because the hash already exists. It needs a short label before it ships (Appendix B); until then
it appears only beside the existing words above.

## 4. Color

### 4.1 Token architecture

| Tier | Example | Set by |
|---|---|---|
| Reference | `ref.carbon.900 = #0F1419` | Design system |
| System `--cf-*` | `--cf-fg-default`, `--cf-status-go-fg` | Design system, per mode (light, dark, high contrast) |
| Brand slot `--cf-brand-*` | `--cf-brand-solid`, `--cf-brand-text` | The theming engine (Section 11), from the firm's inputs |
| Component `--cf-c-*` | `--cf-c-button-primary-bg: var(--cf-brand-solid)` | Design system |

CoFile's pages fill the brand slot with Proof Blue and a firm's pages fill it with the firm's color.
**CoFile is tenant zero of its own theming system**: there's one code path, so every firm gets the quality
CoFile gets. Status, mode and commit tokens sit outside the brand slot, and no firm input can reach them.

### 4.2 Neutrals

| Token | Light | Dark | Use |
|---|---|---|---|
| `--cf-bg-page` | `#F6F6F3` Bond | `#0C0F13` | Page |
| `--cf-bg-surface` | `#FFFFFF` | `#13171D` | Cards, tables, the proof sheet |
| `--cf-bg-sunken` | `#EEEEE9` | `#090B0E` | Wells, table headers, code |
| `--cf-bg-raised` | `#FFFFFF` + elevation 3 | `#1A1F26` | Menus, command palette |
| `--cf-border-default` | `#DEDDD6` | `#2B323C` | Decorative hairlines |
| `--cf-border-control` | `#80858E` (3.71:1) | `#6B7480` (3.80:1) | Input and checkbox edges (passes 1.4.11) |
| `--cf-fg-default` | `#0F1419` Carbon (17.10:1 on Bond) | `#E9ECEF` (16.20:1) | Body |
| `--cf-fg-muted` | `#3D4450` (9.06:1) | `#B3BBC5` (9.27:1) | Secondary text |
| `--cf-fg-subtle` | `#5C636E` (6.06:1) | `#8E97A2` (6.08:1) | Captions, meta; never below 12 px |
| `--cf-focus` | `#1659D1` | `#8FB4FF` | 2 px ring, 2 px offset, on everything focusable |

Bond keeps a trace of warmth so long pages aren't clinical, but surfaces are pure white: the proof
should look like a clean sheet, not parchment.

### 4.3 Proof Blue

Printers mark up proofs in non-photo blue, a pencil color the camera doesn't pick up: instructions that
never reach the final print. CoFile's accent comes from that tradition, deepened to pass contrast. It's
the color of guidance and action, never of status.

| Token | Light | Dark |
|---|---|---|
| `--cf-brand-solid` / hover / active | `#1659D1` / `#0F47AD` / `#0B3A8F` (white text 6.21:1) | `#7FAAFF` / `#A3C2FF` / `#C2D6FF` (Carbon text 8.32:1) |
| `--cf-brand-text` | `#1659D1` (6.21:1 on white) | `#8FB4FF` (8.68:1) |
| `--cf-brand-tint` | `#E7EFFC` (brand text on it 5.36:1) | `#16233D` |
| `--cf-highlight` | `#CFE6F6` non-photo blue (Carbon 14.37:1) | `#1C3550` (text 10.58:1) |

`--cf-highlight` is the `<mark>`: values highlighted on the sample proof, phrases in a forwarded message
that were read into a draft, docs search hits. It always means "look here," never "this is fine."

### 4.4 Status: six tones

Today amber does too much: it covers a rehearsal's planned hold, "Waiting for approval" and "Paused:
state site changed" all at once. I split tones by who needs to do what. The brief's meanings survive (green moves a
filing forward, amber is a planned hold, red is a stop), and I add violet for "a person needs to act."

| Tone | Meaning | Glyph (never color alone) | Light fg / bg / border | Dark fg / bg / border |
|---|---|---|---|---|
| `go` | Approved, live, moving forward | Filled circle with check | `#0A6B47` / `#E2F3EA` / `#9ED2B9` (5.69:1) | `#4FCB8F` / `#10281D` / `#1E5A3E` (7.65:1) |
| `hold` | Paused on purpose; safe | Two bars | `#8A4F00` / `#FCEFD8` / `#E9B465` (5.78:1) | `#F2B65A` / `#2E2210` / `#6B4A14` (8.59:1) |
| `act` | Waiting on a person | Ring with centre dot | `#5B36C9` / `#EEE9FC` / `#C3B2F5` (6.28:1) | `#B5A0FF` / `#211A3A` / `#4A3A8A` (7.41:1) |
| `stop` | Stopped; needs correcting | Octagon | `#B42318` / `#FCE9E7` / `#F1A9A1` (5.62:1) | `#FF8B7B` / `#3A1714` / `#7A2C24` (7.03:1) |
| `progress` | The engine is working | Dot, 1.6 s pulse | `#3D4450` / `#ECEEF1` / `#C9CDD3` (8.44:1) | `#B3BBC5` / `#1E242C` / `#343C47` |
| `neutral` | Recorded, nothing to do | Small dot | as progress, no pulse | as progress |

Every label in `web/lib/status.ts` maps to one tone:

| Tone | Labels (locked) |
|---|---|
| `go` | Approved · EIN issued · Submitted to the state · Accepted by the state · Completed |
| `hold` | On hold · Paused: state site changed · Being checked |
| `act` | Waiting for approval · Needs information · Changes requested · Name unavailable |
| `stop` | Needs correcting · Rejected by the state · Failed · Stopped |
| `progress` | Getting the state's review page · Queued · Filing now · Final check |
| `neutral` | Received |

Solid variants exist only for the **commit button** and the **Live** chip (`go-solid` `#0A6B47`, white
text 6.55:1; dark `#3DBA80`, Carbon text 7.80:1) and for destructive confirmations (`stop-solid` `#B42318`,
white 6.57:1).

### 4.5 Rehearsal is a mode, not a status

Every status can occur inside a rehearsal, so it gets its own layer on top of the status system:

- **Rehearsal tag:** a dashed 1.5 px border in the hold border color, hold text, no fill, hold glyph,
  reading "Rehearsal". You can tell it from a solid hold chip at a glance and in grayscale.
- **Stage hatch:** 45° lines, 1 px every 6 px, `#E9B465` at 35% (dark `#6B4A14` at 60%), as a 6 px band
  on the left edge of any card, row or page in rehearsal. Decorative; the tag carries the meaning.
- **Held step:** in logs and timelines, "Pay Now: held, on purpose" gets the hold glyph and a dashed rule
  after it, meaning the run stopped here as planned.

### 4.6 Coverage ladder

The five coverage labels form a sequence, so I draw them as a four-segment ladder. Live is the only
filled, solid-green one, so nothing else can be mistaken for Live.

| Label (locked) | Ladder | Color |
|---|---|---|
| Planned | `◌◌◌◌` dotted | `--cf-fg-subtle` |
| Offered, not yet rehearsed | `■□□□` | `--cf-fg-muted` |
| Screens recorded, rehearsal next | `■■□□` | `--cf-fg-muted` |
| Rehearsed to the payment screen | `■■■□` | hold, the rehearsal family |
| Live | `■■■■` in a solid chip | `go-solid`, white text |

### 4.7 Code theme and contrast notes

Code ("Carbon" theme), light on `#F1F2EE` and dark on `#0A0D10`: plain `#0F1419`/`#E9ECEF`, keys
`#1659D1`/`#8FB4FF`, strings `#0A6B47`/`#7FD6A8`, numbers `#8A4F00`/`#F2B65A`, keywords `#5B36C9`/`#B5A0FF`,
comments `#646B76` (4.78:1)/`#7D8692` (5.29:1).

- Everything meets WCAG 2.2 AA; the proof and intake body text meets AAA. APCA is a second gate: Lc 75
  for proof body text, Lc 60 for button labels.
- `prefers-contrast: more` maps muted and subtle text to default, thickens borders to 2 px and removes
  hatches and tints. In forced colors, chips render as bordered text with their glyphs, and the commit
  button gets a 3 px `ButtonText` border.

