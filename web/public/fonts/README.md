# Licensed fonts: not in git

This folder holds CoFile's licensed fonts as WOFF2 files. They are **never committed as they are**: this repository is
public, and committing them would publish commercial font files. `.gitignore` keeps everything here except this README.

They travel in git sealed instead: `web/design/licensed-fonts.sealed` is the seven files encrypted with AES-256-GCM,
and its key is only in the deployment's settings (`LICENSED_FONTS_KEY` on Vercel, production and preview). `npm run
build` opens the bundle into this folder before `next build` (`web/scripts/licensed-fonts.mjs`), and the build records
which faces it found (`next.config.mjs`), so the site declares exactly those (`web/lib/licensed-fonts.ts`). Without the
key (CI, a fork, a local build) the site uses the metric-matched fallbacks in `web/styles/fonts.css`, so nothing moves.
A key that doesn't open the bundle stops the build.

To change the fonts: put the new files here, then `LICENSED_FONTS_KEY=<the key> node scripts/licensed-fonts.mjs pack`
from `web/` and commit the new bundle. To change the key: `node scripts/licensed-fonts.mjs key`, pack with the new key,
and update `LICENSED_FONTS_KEY` in Vercel before the next deploy.

Expected files (subset to Latin, Spanish included, with fontTools):

| File | Source |
|---|---|
| `miller-text-400.woff2` | Miller Text Roman |
| `miller-text-400-italic.woff2` | Miller Text Italic |
| `miller-text-600.woff2` | Miller Text SemiBold |
| `founders-grotesk-400.woff2` | Founders Grotesk Regular |
| `founders-grotesk-400-italic.woff2` | Founders Grotesk Regular Italic |
| `founders-grotesk-500.woff2` | Founders Grotesk Medium |
| `founders-grotesk-600.woff2` | Founders Grotesk Semibold |

Subset command, for each file:

```
pyftsubset "<source>" --flavor=woff2 --layout-features='*' --output-file=<name>.woff2 \
  --unicodes="U+0000-024F,U+02B0-02FF,U+0300-036F,U+1E00-1EFF,U+2000-206F,U+20A0-20CF,U+2100-215F,U+2190-21FF,U+2212,U+2215,U+25A0-25FF,U+FB01-FB02"
```

The owner holds the web licenses (Nov 26, `docs/design-specs/merged/DECISIONS.md`).
