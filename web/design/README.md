# CoFile's design system in code

The merged design spec (`docs/design-specs/merged/`) as code. Phase 0 of the build plan
(`docs/design-specs/merged/BUILD-PLAN.md`).

## Files

| File | What it is |
|---|---|
| `design/tokens.json` | The one source: palette (light, dark), the example firm, faces, the type roles, space, corners, depth, motion, layout |
| `design/build-tokens.mjs` | Builds the three outputs below. `npm run tokens` writes them; `npm run tokens:check` fails if they're stale |
| `styles/tokens.css` | Generated: the palette as custom properties, dark mode, faces, space, corners, depth, motion |
| `styles/type.css` | Generated: one class per type role (`.t-display-xl`, `.t-body`, `.t-proof-value`…), fluid between 390 and 1440 px |
| `lib/design/tokens.ts` | Generated: the same values as constants, for the proof renderer, emails and canvas work |
| `styles/registers.css` | The semantic layer: `.reg-cofile` (CoFile's look), `.reg-firm` (a firm's client pages), `.reg-white` (white label), `.sheet` (paper that keeps its light inks) |
| `styles/base.css` | Links, focus rings, selection, reduced motion, inside a register only |
| `lib/design/ink.ts` | The ink match: any firm color made contrast-safe for buttons, links, washes and tints |

## Rules

- **Whose look (the Stripe model).** Everything a firm uses is in CoFile's look, the same for every firm:
  the site, sign-up, the filing desk, the proof, the dashboard, emails to the firm. Only what reaches a
  firm's clients carries the firm's branding, and nothing of CoFile appears on it.
- **Components read only semantic tokens** (`--action`, `--link`, `--surface`, `--text`…), never a
  palette token, a firm token or a hex value. The register a page sits in decides the colors.
- **Cascade layers:** `legacy, tokens, base, components, pictures, utilities`. The old stylesheet
  (`app/globals.css`) sits in `legacy`, the lowest layer, so a rebuilt page always wins
  and a page not yet rebuilt looks exactly as before (checked: 20 screenshots identical, Nov 26).
- **Fonts**: Miller Text and Founders Grotesk, from the owner's desktop files (Nov 26), subset to Latin and compressed
  to WOFF2. **The files are never committed: this repository is public.** They live in `public/fonts` on the machine
  that builds or serves the site (`public/fonts/README.md` lists them and the subset command), and
  `lib/licensed-fonts.ts` declares each face only when its file is there. Without them the site uses the metric-matched
  fallbacks in `styles/fonts.css` (`size-adjust` from the average lowercase width), so nothing moves. Miller Text
  stands in for Miller Display, and Founders Grotesk for Founders Grotesk Text; Founders Grotesk Mono is still
  missing, so mono uses the system's. Founders Grotesk's 2010 files put the ascent at the cap height, so
  `ascent-override` / `descent-override` centre its capitals in the line (Miller's the same way). Before the live site
  serves them, confirm the web licenses (`docs/design-specs/merged/briefs/01-font-licenses.md`): desktop files don't
  license web embedding.
- **The ink match** follows the spec's 3.6 with two changes its own reference values call for: a second
  color counts as distinct at ΔE OK > 0.05 (not 0.08), and "neon" means chroma over 0.20 *and* lightness
  over 0.70. Tests: `lib/design/ink.test.ts`, including 1,000 random colors.

## How each surface is built

Following the frontend-design skill (Anthropic's plugin): plan the surface from the spec, check the plan
against the brief and against the generic defaults the skill lists, build it, then critique it from
screenshots at phone and desktop sizes, light and dark, before it ships. The spec's choices win where it
pins one down; where it leaves an axis open, avoid the defaults (for example, no "A · B · C" strings of
middle dots in new interface text). One memorable thing per page; everything around it quiet.
