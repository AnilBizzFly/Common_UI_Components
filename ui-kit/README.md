# UI Kit — 12 prototypes

Each prototype lives in its own folder with the three files kept separate:

```
NN-name/
  index.html   markup only
  style.css    all styling
  app.js       all behaviour
```

Open `index.html` (this folder) for the gallery, or any prototype's
`index.html` directly. Everything runs straight off the filesystem —
no server, no build step, no dependencies, no network calls.

| # | Folder | What it demonstrates |
|---|--------|----------------------|
| 01 | `01-command-palette` | Ctrl-K launcher, subsequence matching, keyboard nav |
| 02 | `02-dashboard`       | Area + grouped-bar charts, crosshair tooltip, table view |
| 03 | `03-ai-chat`         | Token-by-token streaming with a working stop control |
| 04 | `04-pricing`         | Billing-period switch, sliding pill, rolling prices |
| 05 | `05-kanban`          | Pointer-based drag and drop (mouse, pen and touch) |
| 06 | `06-data-table`      | Sort, search, filter, bulk select, pagination |
| 07 | `07-wizard`          | Multi-step flow with per-step validation |
| 08 | `08-toasts`          | Stacked toasts, pause on hover, drag to dismiss |
| 09 | `09-settings`        | Three-way theme switch — light / dark / system |
| 10 | `10-gallery`         | Masonry grid + keyboard lightbox, generated artwork |
| 11 | `11-date-range`      | Dual-month range picker with presets |
| 12 | `12-bottom-sheet`    | Draggable sheet, three snap points, velocity-aware |

## Design system

One token set across all twelve, declared at the top of every `style.css`:

| Role | Value |
|------|-------|
| surface | `#141b2b` → `#0e1422` |
| page | `#080c17` |
| ink / muted / dim / faint | `#e9edf8` `#8b95b3` `#5a6482` `#3c4562` |
| accent | `#7cc4ff` → `#a98bff` |
| status | `#5fe0ac` good · `#ffb057` warning · `#ff6b81` critical |

`09-settings` is the only light-capable file: light is the base and the dark
tokens are redefined under both `prefers-color-scheme` and `[data-theme]`.

### Chart colours are separate, and validated

`02-dashboard` does **not** use the accent gradient for its data series — a
decorative gradient is not a categorical palette. It uses three hues checked
against this project's chart surface (`#141b2b`):

```
--series-1 #3987e5   --series-2 #d95926   --series-3 #199e70

Lightness band      PASS    Chroma floor         PASS
CVD separation      PASS    ΔE 9.4 (deutan)
Normal-vision floor PASS    ΔE 26.5
Contrast vs surface PASS    all >= 3:1
```

Also applied there: no legend on the single-series chart (the title names it),
a legend always present on the 3-series chart, a 2px surface gap between
adjacent bars, 4px rounding on the data-end only and never at the baseline,
recessive grid lines, and a table view so the numbers are readable without
colour at all.

## Conventions

- Keyboard paths on every control: roving tabindex, arrow keys, `Enter`, `Escape`.
- `aria-*` state on switches, tabs, sort headers and dialogs.
- `prefers-reduced-motion` guards on anything that moves.
- No images: artwork is generated SVG or CSS gradients.
