import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * CoFile's licensed faces (merged spec 5.1, web/styles/fonts.css). The files are opened into public/fonts at build time
 * from a sealed bundle (scripts/licensed-fonts.mjs) and never committed as they are: the repository is public.
 * Each face is declared only when its file is there, so a build without them makes no requests that 404 and uses
 * the metric-matched fallbacks instead.
 *
 * The vertical metrics are overridden: Founders Grotesk's 2010 files put the ascent at the cap height (0.63 em,
 * descent 0.37), which sets every line high in its box; 81.5 / 18.5 centres the capitals. Miller's 1.13 / 0.31 is
 * evened to 0.95 / 0.25 the same way.
 */
const FACES: { file: string; css: string }[] = [
  {
    "file": "miller-text-400.woff2",
    "css": "@font-face { font-family: \"Miller Text\"; src: url(\"/fonts/miller-text-400.woff2\") format(\"woff2\"); font-weight: 400; font-style: normal; font-display: swap; ascent-override: 95%; descent-override: 25%; line-gap-override: 0%; }"
  },
  {
    "file": "miller-text-400-italic.woff2",
    "css": "@font-face { font-family: \"Miller Text\"; src: url(\"/fonts/miller-text-400-italic.woff2\") format(\"woff2\"); font-weight: 400; font-style: italic; font-display: swap; ascent-override: 95%; descent-override: 25%; line-gap-override: 0%; }"
  },
  {
    "file": "miller-text-600.woff2",
    "css": "@font-face { font-family: \"Miller Text\"; src: url(\"/fonts/miller-text-600.woff2\") format(\"woff2\"); font-weight: 500 700; font-style: normal; font-display: swap; ascent-override: 95%; descent-override: 25%; line-gap-override: 0%; }"
  },
  {
    "file": "founders-grotesk-400.woff2",
    "css": "@font-face { font-family: \"Founders Grotesk\"; src: url(\"/fonts/founders-grotesk-400.woff2\") format(\"woff2\"); font-weight: 400; font-style: normal; font-display: swap; ascent-override: 81.5%; descent-override: 18.5%; line-gap-override: 0%; }"
  },
  {
    "file": "founders-grotesk-400-italic.woff2",
    "css": "@font-face { font-family: \"Founders Grotesk\"; src: url(\"/fonts/founders-grotesk-400-italic.woff2\") format(\"woff2\"); font-weight: 400; font-style: italic; font-display: swap; ascent-override: 81.5%; descent-override: 18.5%; line-gap-override: 0%; }"
  },
  {
    "file": "founders-grotesk-500.woff2",
    "css": "@font-face { font-family: \"Founders Grotesk\"; src: url(\"/fonts/founders-grotesk-500.woff2\") format(\"woff2\"); font-weight: 500; font-style: normal; font-display: swap; ascent-override: 81.5%; descent-override: 18.5%; line-gap-override: 0%; }"
  },
  {
    "file": "founders-grotesk-600.woff2",
    "css": "@font-face { font-family: \"Founders Grotesk\"; src: url(\"/fonts/founders-grotesk-600.woff2\") format(\"woff2\"); font-weight: 600 700; font-style: normal; font-display: swap; ascent-override: 81.5%; descent-override: 18.5%; line-gap-override: 0%; }"
  }
];

const DIR = join(process.cwd(), "public", "fonts");

/**
 * Whether a face's file is in the site. The build records the files it found (next.config.mjs, LICENSED_FONT_FILES),
 * because a host's server functions don't carry public/ with them; outside a Next build, the folder is looked at.
 */
function presentFile(file: string): boolean {
  const listed = process.env.LICENSED_FONT_FILES;
  return listed !== undefined ? listed.split(",").includes(file) : existsSync(join(DIR, file));
}

/** The @font-face rules for the files present, and the file to preload (the working sans), if it is there. */
export function licensedFonts(): { css: string; preload?: string } {
  const present = FACES.filter((f) => presentFile(f.file));
  return {
    css: present.map((f) => f.css).join("\n"),
    preload: present.some((f) => f.file === "founders-grotesk-400.woff2") ? "/fonts/founders-grotesk-400.woff2" : undefined,
  };
}
