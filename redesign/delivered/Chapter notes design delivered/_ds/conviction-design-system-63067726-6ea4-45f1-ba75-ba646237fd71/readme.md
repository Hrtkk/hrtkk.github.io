# Conviction — Design System

The component library, tokens and brand foundations behind **Conviction**, a
stock-research *terminal* for serious private investors. Conviction scores every
covered stock 0–100, grades it **A / B / C / Ignore**, and explains the verdict
across Technical, Fundamental, Combined and AI-Insights lenses — for both Indian
(NSE/BSE, ₹) and US (NASDAQ/NYSE, $) markets in one consolidated view.

> **Default theme is the dark research terminal.** A lighter "v2 refined"
> editorial palette ships as an alternate via `[data-theme="light"]`.

---

## Sources this system was built from

- **`Conviction.dc.html`** — the full interactive terminal (Dashboard, Stocks
  screener, Technical / Fundamental / Combined / AI analysis, Best Picks). The
  canonical source of layout, data model and dark visual language.
- **`Investment Design System.dc.html`** — an alternate "v2 Refined" specimen in
  a light, Geist/paper editorial style. Its palette is preserved here as the
  `[data-theme="light"]` theme.
- **`shots/01–04-conv.png`** — screenshots of the live app chrome (sidebar + topbar).

Originals are archived under `_src/` for reference. The reader is **not** assumed
to have access to these; everything needed is reproduced in this project.

---

## How the product is organised

A fixed **sidebar** (Dashboard, Stocks, Technical, Fundamental, Combined, AI
Insights, Best Picks) + a **topbar** (symbol search, All / ₹ IN / $ US market
toggle, date, alerts). The main column is a single scrollable surface that swaps
between:

- **Dashboard** — portfolio KPIs, equity curve, sector-allocation donut, holdings
  table, top movers, "what changed today" feed.
- **Stocks** — filterable coverage universe, grouped by market, with conviction
  score + tier + sentiment per row.
- **Analysis** (Technical / Fundamental / Combined / AI) — a per-stock context
  header plus deep readouts and sub-scores.
- **Best Picks** — your starred names ranked by conviction.

---

## CONTENT FUNDAMENTALS

**Voice: an analyst's desk note, not a hype machine.** Copy is plain-spoken,
evidence-led and quantified. Every claim carries a number or a source.

- **Person & address.** Second person for the user's own things ("Your starred
  names"), third person for the market. No "we think"; the system states.
- **Casing.** Sentence case for headings and buttons ("Import stocks", "Top
  movers"). UPPERCASE only for micro-labels and column heads ("UNREALIZED P&L",
  "CONVICTION"), letter-spaced `.05em`. Mono kicker is uppercase too
  ("RESEARCH TERMINAL").
- **Numbers are first-class.** Prices, %, scores, ratios, timestamps are always
  JetBrains Mono, tabular, signed (`+4.82%`, `−3.64%`), and unit-aware
  (`₹1,698.30`, `$124.30`, `₹6.14 L`, `₹2.4 Cr`, `RSI 71`, `D/E 0.44`).
- **Verdicts are explicit and reversible.** "Upgraded B→A — EPS beat +6%,
  reclaimed 200-DMA." "Downgraded to Neutral — guidance cut, soft Q1." Always the
  *why*, often the *what changed*.
- **Balanced by construction.** Every thesis pairs "Why pick this" with "Why NOT
  pick this". Risk flags are graded **Hard** (■, red) vs **Soft** (▲, amber).
- **Tone words.** bullish / bearish / neutral; conviction; structure; momentum;
  overbought; margin of safety; accumulate; trim; watchlist.
- **Hedging is disciplined, not wishy-washy.** "illustrative · not advice" sits
  under key levels. No "maybe possibly perhaps".
- **Emoji.** Sparingly and only as data: 🇮🇳 / 🇺🇸 market flags, 🚩 / 🛑 / ⚠ risk
  markers. Never decorative. Directional glyphs ▲ ▼ ✓ ✕ ■ are used as compact
  status marks.

**Example microcopy**

- Empty state: "No stocks match these filters."
- Callout: "Caution. RSI above 70 — momentum may be overextended."
- Sub-header: "Consolidated view · ₹ base currency · US holdings converted at ₹83.3/$"

---

## VISUAL FOUNDATIONS

**Overall vibe.** A calm, dense Bloomberg-adjacent terminal. Near-black canvas,
slightly-lifted panels, hairline borders, electric-blue accent, and a
green/red/amber semantic spine that maps directly to money moving.

- **Color & theme.** Dark default: canvas `#080A0F` → panels `#0E1320` /
  `#121826` → hover wells `#1E2A3C`, dividers `#1B2230`/`#283142`. Text steps
  `#E7EAF0` → `#8B94A4` → `#5A6271`. Accent blue `#3B82F6` (bright `#60A5FA`).
  Light theme is warm paper `#F4F3EF`, white cards, ink-blue `#3056C2`.
- **Directional semantics.** Bullish/gain `#10B981`, bearish/loss `#EF4444`,
  neutral `#8B94A4`, caution/overbought `#F59E0B`. These never get repurposed for
  decoration — green means up, red means down, everywhere.
- **Conviction tiers.** A = green, B = blue, C = amber, Ignore = grey; each as a
  bold mono chip on a ~14% tint of its own colour.
- **Type.** Inter for all UI (400–700); JetBrains Mono for every numeric, ticker
  and timestamp. Display headings are 22px/700 at `-0.02em`; card titles 14–15px/
  600; body 13–14px; micro-labels 10.5–11.5px uppercase. Big sub-scores are 40px
  mono.
- **Spacing & layout.** 4px grid. Cards pad `18×20`, grids gap `14`, page gutter
  `30`, content capped `1280px`. Fixed 228px sidebar, 58px topbar. Dense but never
  cramped — generous line-height (1.45–1.6) in prose blocks.
- **Corners & cards.** Cards are `border-radius:13px` (`--radius-xl`) with a
  single hairline border and a panel background — **no drop shadow**. Elevation is
  carried by background steps + borders, not blur. Chips 5–6px, buttons/inputs
  8–9px, pills fully rounded.
- **Borders, not shadows.** The dark UI is almost flat. Shadow appears only on
  overlays (dialogs, menus → `0 12px 40px rgba(0,0,0,.45)`) and on the active
  segment of a light-theme toggle (`0 1px 2px`).
- **Backgrounds.** Solid fills only. The lone gradients are (a) the logo mark
  (emerald→blue 135°) and (b) faint chart area-fills and the AI "Stance" panel
  (`linear-gradient(180deg, rgba(59,130,246,.08), transparent)`). No photography,
  no textures, no patterns.
- **Data-viz.** Inline SVG throughout — candlesticks (green up / red down),
  EMA overlays (blue/violet/amber), area equity curve, donut allocation,
  sparklines that auto-colour green/red by direction. A six-colour series palette
  drives multi-category charts.
- **Hover / press.** Rows lighten to `#0F1420`; nav items to `#141A26`; buttons
  brighten `filter:brightness(1.12)`; cards' borders step from `--line` to
  `--line-2`. Transitions are quick and unshowy: `0.12–0.15s cubic-bezier(.4,0,.2,1)`.
  No bounces, no large motion. Focus shows a 3px `rgba(59,130,246,.45)` ring.
- **Transparency & blur.** Used only for tint fills (tier/sentiment grounds at
  ~13–16% alpha) and chart fills. No backdrop-blur glass.
- **Imagery mood.** N/A — this is a data product. "Imagery" is charts; their mood
  is precise, two-toned (green/red), on dark.

---

## ICONOGRAPHY

- **System.** A bespoke set of **Lucide-style line icons** — 24×24 viewBox,
  `1.9px` stroke, round caps/joins, `currentColor`. Drawn inline as SVG
  (`ui_kits/terminal/Icons.jsx`); there is **no icon font and no PNG icons**.
- **Coverage.** dashboard, stocks, technical (pulse), fundamental (doc),
  combined (layers), ai (sparkle), picks/star (filled + outline), search, bell,
  user, upload, check, up, down, back.
- **Sizing.** Icons use `width/height:1em` and inherit `font-size` from context
  (16–19px in nav/topbar). Active nav icons take the bright accent `#60A5FA`;
  inactive are muted `#6B7280`.
- **Unicode-as-icon.** Directional/status glyphs are used deliberately where a
  drawn icon would be overkill: ▲ ▼ (change), ✓ ✕ (flags), ■ (hard flag),
  🚩 🛑 ⚠ (risk), 🇮🇳 🇺🇸 (market). The star uses the drawn filled/outline pair.
- **Logo.** `assets/logo-mark.svg` — a rounded square with an emerald→blue 135°
  gradient and a mono "C". Reproduce the lockup as mark + "Conviction" wordmark
  with the "RESEARCH TERMINAL" mono kicker beneath.
- **Substitutions.** None — the icon set is original to the product and shipped in
  full. If you need an icon outside the set, match Lucide at `1.9px` stroke.

---

## FONTS — substitution note

Both source files use Google-hosted webfonts. This system loads **Inter** and
**JetBrains Mono** from the Google Fonts CDN (`tokens/fonts.css`). No licensed
binaries are bundled, so the compiler registers **0 local @font-face fonts** — by
design. If you have licensed copies (or want offline/self-hosted fonts), drop the
`.woff2` files in `assets/fonts/` and replace the `@import` in `tokens/fonts.css`
with local `@font-face` rules. *(The light theme's original used Geist; it has
been consolidated onto Inter/JetBrains for one coherent type system.)*

---

## INDEX — what's in this project

**Foundations**
- `styles.css` — the single entry point consumers link (only `@import`s).
- `tokens/fonts.css` · `colors.css` · `typography.css` · `spacing.css` ·
  `radius-shadow.css` · `base.css` — all custom properties + helper classes.

**Components** (`window.ConvictionDesignSystem_630677.*`)
- `components/controls/` — **Button**, **SegmentedControl**, **SearchInput**
- `components/signals/` — **TierBadge**, **SentimentPill**, **ConvictionScore**
- `components/data/` — **MetricCard**, **Sparkline**, **DataTable**
- `components/feedback/` — **Callout**

Each ships `Name.jsx` + `Name.d.ts` + `Name.prompt.md`, with one `@dsCard` demo
HTML per directory.

**UI kit**
- `ui_kits/terminal/` — the interactive dark terminal. `index.html` wires
  `Sidebar`, `Topbar`, `DashboardScreen`, `ScreenerScreen`, `AnalysisScreen` +
  `data.js` and `Icons.jsx` into a click-through app.

**Templates** (consuming projects start here)
- `templates/stock-brief/` — **Stock Brief**, a print-ready single-stock
  one-pager (conviction verdict, KPIs, bull/bear, sector peers) that composes the
  DS components. Copy the folder and edit one data block.

**Specimen cards** (`guidelines/*.card.html`) — Colors, Type, Spacing, Brand
cards that populate the Design System tab.

**Assets**
- `assets/logo-mark.svg` — the gradient "C" mark.

**Skill**
- `SKILL.md` — makes this system usable as a downloadable Agent Skill.

---

*Generated by an automated compiler each turn: `_ds_bundle.js`, `_ds_manifest.json`
and `_adherence.oxlintrc.json` — do not edit those by hand.*
