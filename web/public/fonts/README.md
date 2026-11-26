# Licensed fonts: not in git

This folder holds CoFile's licensed fonts as WOFF2 files. They are **never committed**: this repository is public,
and committing them would publish commercial font files. `.gitignore` keeps everything here except this README.

The site loads them only when they are present (`web/lib/fonts.ts`); without them it uses the metric-matched
fallbacks in `web/styles/fonts.css`, so nothing moves.

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

Serve them on the live site only once the web licenses are confirmed
(`docs/design-specs/merged/briefs/01-font-licenses.md`). For deploys, copy them in at build time from private storage.
