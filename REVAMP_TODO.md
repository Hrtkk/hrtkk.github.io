# ByteScribble Revamp — TODO

*Purpose: align bytescribble.com with the new content strategy (see plan/01_STRATEGY.md and plan/06_PLATFORM_PLAYBOOK.md in this folder). This file is self-contained — a fresh Claude session (or Hritik on a free evening) can pick it up and execute item by item. Check items off as they're done.*

**Context for a fresh session:** bytescribble.com is an Astro static blog by Hritik Kumar, currently focused on stream processing / distributed systems (Flink, Kafka, DDIA notes). Newsletter runs on Buttondown ("one long piece a month"). Nav: Blog, Projects, Playground, Scribbles, About. New direction: the site becomes the owned hub for a two-track content brand — "Deep Tech" (English: system design, architecture, AI agents, dev tutorials) and "Everyday AI" (Hinglish video content; the site hosts English companion material) — feeding a biweekly YouTube video + blog cycle, with the newsletter as the launch runway for Manaska (Hritik's adaptive learning platform). **Repo:** `/Users/khritik/my_website/hrtkk.github.io` (connect this folder to the session if not already). **Deployment (verified Jul 26, 2026):** `.github/workflows/deploy.yml` builds the **Astro project in `astro/`** and deploys `astro/dist` to GitHub Pages on push to branch **`source`**. The legacy Jekyll site at the repo root is retired (old URLs already 301-redirect via `astro.config.mjs`). A separate Cloudflare worker (`worker/`) serves `api.bytescribble.com` (playground leaderboard + chat) — not touched by this revamp. **All work happens in `astro/src/`.**

Key files: hero copy → `src/pages/index.astro` · about → `src/pages/about.astro` · newsletter copy → `src/components/Newsletter.astro` (Buttondown username `bytescribble` already configured; has a `compact` variant) · nav → `src/components/Header.astro` (Blog, Projects, Playground, Scribbles, About) · post layout → `src/pages/blog/[id].astro` · content schema → `src/content.config.ts` (blog has single `category: string`, **no tags array yet**) · footer → `src/components/Footer.astro`.

---

## 1. Positioning & copy (highest impact, do first)

- [ ] **Homepage hero** (`src/pages/index.astro`): current copy is distributed-systems-only ("Notes on distributed systems, from first principles" + Flink/Kafka intro). Broaden to the two-track positioning: *"I make complex tech simple — deep engineering for developers, practical AI for everyone."* Keep the existing voice ("starts at the constraint, not the API" is a great line — keep it in the intro paragraph); widen scope to system design + AI/agents, and mention the YouTube channel once live.
- [ ] **About page** (`src/pages/about.astro`): currently Oracle dev + stream processing only. Rewrite to cover both tracks + one line on Manaska ("I'm building an adaptive learning platform — follow the journey"). Update the "Currently" panel (it lists the stream-processing series + DDIA) to include the content/YouTube journey. Add YouTube/Instagram links next to the GitHub link once handles are live.
- [ ] **Newsletter pitch** (`src/components/Newsletter.astro`, line ~10): change "No spam. Roughly one long piece a month." → "**One diagram + one practical AI tip, every two weeks. No spam.**" (Both the default and `compact` variants share this line — one edit.)

## 2. Email capture placement

- [x] ~~Signup form at the end of every blog post~~ — **already done**: `blog/[id].astro` renders `<Newsletter compact />` before Comments. Nothing to do.
- [ ] Optional: small signup callout on the new pillar pages (section 3).
- [ ] Verify the Buttondown form works on mobile (tap targets, no horizontal scroll).

## 3. Taxonomy — align with the six pillars

The blog schema (`src/content.config.ts`) currently has a single `category: string` and **no tag pages exist**. Plan:

- [ ] Repurpose `category` as the **pillar** field, constrained to an enum: `system-design`, `software-craft`, `ai-agents`, `everyday-ai`, `learning`, `build-in-public`. (Optionally add `tags: z.array(z.string()).default([])` for finer topics like `kafka`, `flink`.)
- [ ] Re-categorize the 8 existing posts (stream processing / Kafka / CDC / replication / partitioning → `system-design`).
- [ ] Create pillar pages at `/blog/<pillar>/` (new dynamic route, e.g. `src/pages/blog/category/[category].astro` or similar) with a one-line description at top — these become the stable URLs used in video descriptions and bios.
- [ ] Link pillar pages from the blog index (`src/pages/blog/index.astro`) as filter chips or a simple list.

## 4. Navigation & structure

- [ ] Nav (`src/components/Header.astro`, `nav` array at top): keep Blog + About prominent; Projects/Playground/Scribbles can stay but shouldn't crowd the main path (Blog → post → signup).
- [ ] Add a **"Start Here"** page (`src/pages/start-here.astro`): who Hritik is, the two tracks, best 3–5 posts, newsletter signup. Add to the nav array. (New visitors from YouTube land confused without this.)
- [ ] Footer (`src/components/Footer.astro`): add YouTube + Instagram links alongside GitHub (get real URLs from Hritik — accounts were created Jul 2026).
- [ ] Housekeeping (low priority): the retired Jekyll files at repo root (`_posts/`, `_layouts/`, `_site/`, `Gemfile`, `index.markdown`, root `_config.yml`) no longer deploy — move to an `archive/` dir or delete on a branch, so future sessions don't edit the wrong site. Do NOT touch `CNAME`, `robots.txt`, `.github/`, `worker/`, `astro/`.

## 5. Video-companion readiness

- [ ] Add an optional `videoId` (YouTube) field to the blog schema; when present, `blog/[id].astro` renders a **lightweight embed at the top** (lite-youtube or a click-to-load thumbnail — protect page speed, don't ship YouTube's iframe JS on load).
- [ ] Create a companion-post starter in `_drafts` or as a template: video embed → TL;DR → full written version with diagrams → related posts (signup form already auto-renders).
- [ ] Diagrams: confirm images are optimized (WebP, lazy-loaded) since posts will be diagram-heavy.

## 6. SEO & performance

- [ ] Run PageSpeed Insights (mobile) on homepage + one post; fix anything under ~85. (Astro should already be 90+.)
- [ ] Every page has unique title + meta description; posts have OpenGraph images (auto-generated OG images per post are ideal for shares).
- [ ] Sitemap + RSS verified working; submit sitemap to Google Search Console if not already.
- [ ] Internal linking: each of the top 5 existing posts links to 2–3 related posts.

## 7. Manaska groundwork (light touch)

- [ ] Single mention on About + Start Here pages, framed as build-in-public — no landing page or pitch yet.
- [ ] Optional: a `/manaska` stub page ("Coming soon — I write devlogs here") capturing emails via the same Buttondown list with a tag, so launch-interested readers are segmentable later.

## 8. Done = 

The revamp is complete when: a stranger arriving from a YouTube video can, within two taps, understand who Hritik is, read the companion post, and join the newsletter — and every pillar has a linkable tag page.

*Estimated effort: 4–6 hours total. Items 1–3 are the 20% that gives 80% — fine to stop there in the first pass.*
