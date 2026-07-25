# Design Prompt — ByteScribble main site (bytescribble.com)

Design a complete, high-fidelity website UI for **ByteScribble**, the personal engineering blog of Hritik Kumar, a software engineer who writes about distributed systems. Deliver desktop and mobile layouts for every page listed below, in both dark and light themes (dark is the default).

## About the site

ByteScribble publishes long-form technical deep-dives on stream processing (Apache Flink, Kafka), database internals (replication, partitioning, change data capture), system design, and machine-coding interview prep. Real article titles to use in the design — do not invent placeholder titles:

- The Architecture of Apache Flink
- Stream Processing: Introduction
- Change Data Capture with Debezium: PostgreSQL and Oracle
- Introduction to Apache Kafka
- Database Partitioning: Splitting Data Without Splitting Headaches
- Data Replication: Single-Leader, Multi-Leader, and Leaderless

Categories: Stream Processing, Kafka, DDIA, System Design, Machine Coding, Elasticsearch.

## Audience

Mid-level to senior software engineers, plus engineers preparing for system-design interviews. They read on desktop at work and on mobile during commutes. They notice craft: typography, code-block quality, and dark mode are table stakes for this audience.

## Brand personality

"ByteScribble" = bytes (precise, technical) + scribble (human, hand-drawn, informal). The design should hold that tension: **a rigorous editorial tech blog with one thread of hand-drawn warmth**. Think: a well-organized engineer's notebook, not a corporate dev-rel blog.

- Aesthetic direction: dark-first, editorial, generous whitespace, confident typography. Comparable vibes: Vercel's blog for restraint, overreacted.io for personality, Josh Comeau for playful details — but do not copy any of them.
- One strong accent color of your choosing (suggest something warm — amber/orange family — to stand apart from the blue every tech blog uses). Everything else near-monochrome.
- Typography: a distinctive serif or humanist sans for headings, highly readable sans for body (16–18px base), a good monospace for code and small metadata labels. Self-hostable fonts only (Google Fonts / Fontsource).
- The "scribble" motif appears sparingly: e.g., a hand-drawn underline on the logo or section headings, a scribbled arrow, a sketchy border on one element type. Sparingly — one or two touches per page, not a theme park.

## Pages to design

### 1. Home
- Compact hero: site name, one-line identity ("Notes on distributed systems, from first principles" — or propose better), and a short intro of Hritik. No giant hero banner; get to content fast.
- **Featured article** — one large card, visually dominant, manually pinned. Shows title, category, reading time, 2-line excerpt.
- **Latest articles** — 4–6 compact cards or list rows: title, category chip, date, reading time.
- **Newsletter signup** — single email field + button, one honest line ("New deep-dives in your inbox. No spam."). Powered by Buttondown.
- Footer: nav links, RSS, GitHub, LinkedIn, "© Hritik Kumar".

### 2. Blog index (/blog)
- All articles as a scannable list (list rows preferred over heavy cards), newest first.
- Category filter chips across the top + a search input. Show active-filter state.
- Each row: title, category, date, reading time, 1-line excerpt.

### 3. Article page
This page matters most — most traffic lands here from Google. Design it as the best reading experience on the site:
- Title block: category chip, title, date, reading time, author line.
- Measure ~65–75ch, comfortable line height.
- Sticky table of contents (right rail on desktop, collapsible on mobile).
- Code blocks: syntax highlighting matched to theme, language label, copy button. Show a realistic Java/SQL snippet in the mockup.
- Styled callouts (note / warning), blockquotes, tables, and image-with-caption treatments.
- End of article: prev/next links, "Related articles" (2–3), compact newsletter signup repeat.

### 4. Playground (/playground)
- Grid of game cards for small browser games (Snake, Memory, Tic-Tac-Toe). Each card: playful thumbnail area, name, one-liner, "Play" affordance.
- This page can be noticeably more playful than the rest — it's the sandbox. Design one **game page** too: canvas area centered, score, restart, back link. Works with keyboard (desktop) and touch (mobile).

### 5. About (/about)
- Photo, bio, what Hritik is currently working on / learning, contact + social links.
- Keep it warm and personal — this is the one page where the human fully outweighs the bytes.

### 6. Scribbles (/scribbles)
- A reverse-chronological short-form feed: a paragraph of thought, a photo with caption, or a link with commentary. Design the three entry types distinctly but on one shared spine (date-anchored timeline or simple stacked cards).
- No titles, no reading time — this is the anti-blog. Lightweight and diary-like.

## Global elements

- Header nav: ByteScribble wordmark/logo, Blog, Playground, Scribbles, About, theme toggle, search. Mobile: hamburger or bottom-sheet nav.
- Dark/light toggle with system-preference default. Design both themes fully — light mode must be equally considered, not an inverted afterthought.
- 404 page with a scribble-themed joke.

## Technical constraints

- Will be built in **Astro** as a fully static site on GitHub Pages: no backend, no heavy JS frameworks. Interactions must be achievable with vanilla JS/CSS (theme toggle, mobile nav, copy buttons, client-side search).
- Performance is a feature: system-ui fallbacks, no large hero images, minimal JS.
- Fully responsive 360px–1440px. Accessible: WCAG AA contrast in both themes, visible focus states, semantic headings.

## Deliverable

High-fidelity mockups (HTML/CSS preferred) of all 6 pages + 404, desktop and mobile, dark and light. Include a mini style guide page: color tokens, type scale, spacing, and every component (buttons, chips, cards, callouts, code block, form fields) in both themes.
