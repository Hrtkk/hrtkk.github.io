# Design Prompt — ByteScribble Notes (notes.bytescribble.com)

Design a complete, high-fidelity website UI for **ByteScribble Notes**, a free exam-revision site for Indian school students. Deliver desktop and mobile layouts for every page listed below. **Design mobile-first** — most students will visit on budget Android phones, often on slow networks.

## About the site

ByteScribble Notes publishes chapter-wise revision notes for CBSE students, launching with **Class 10 Science and Mathematics** and expanding to Classes 8–12. Content is AI-assisted and human-reviewed; every page carries a small, honest disclosure badge. The site is a sibling of bytescribble.com (a developer blog by the same author) — footer says "A ByteScribble project" — but has its own identity aimed at students.

Use real CBSE Class 10 chapter names in mockups, e.g.: Chemical Reactions and Equations · Light — Reflection and Refraction · Electricity · Real Numbers · Polynomials · Triangles · Quadratic Equations.

## Audience

Students aged 13–17 revising for board exams, plus some parents and teachers. They arrive from Google searches like "class 10 electricity notes" mid-study-session, often the night before a test. They want the answer fast: zero clutter between them and the notes. Reading happens in long sessions, so comfort matters more than flash.

## Brand personality

**Calm, clear, encouraging.** A patient tutor, not a coaching-institute billboard. Explicitly avoid: countdown timers, "Toppers choose us!" energy, cartoon mascots, gamification badges. The design should feel like beautifully organized notes from the smartest student in class.

- Light-first design (studying happens in daylight; also design a proper dark mode for night-before-exam sessions).
- Warm paper-like background rather than stark white; a friendly but disciplined accent palette — suggest one primary accent (teal/green family, reads as "calm and go") plus per-subject accent colors (e.g., Science vs. Maths get distinct hues used in chips and headers).
- Typography: extremely readable body font at a generous size (17–18px base on mobile), a friendly rounded-but-serious heading font, and clean math/formula rendering (design for KaTeX-style output).
- Optional shared thread with the parent brand: the same hand-drawn "scribble" underline accent used on bytescribble.com, in this site's colors.

## Pages to design

### 1. Home
- Immediate orientation: "Free chapter-wise revision notes for CBSE" + a prominent search bar ("Search a chapter or topic…").
- Class picker: large tappable cards for Class 8 / 9 / 10 / 11 / 12 (10 is live; others show a tasteful "coming soon" state).
- "Recently added notes" list.
- One-line trust strip: free forever · no signup · AI-assisted, human-reviewed.

### 2. Class page (/class-10)
- Subject cards (Science, Mathematics) with chapter counts and subject accent colors.
- Below: full chapter list per subject with completion-friendly numbering (Ch 1, Ch 2 …).

### 3. Subject page (/class-10/science)
- Chapter list as generous tappable rows: chapter number, name, estimated revision time, badges like "Formulas" / "Diagrams" where relevant.
- Sticky mini-header with class/subject breadcrumb.

### 4. Chapter notes page — THE core page, design it best
Landing target from Google; a student may spend 30+ minutes here.
- Breadcrumb (Class 10 → Science → Ch 12), chapter title, revision-time estimate, small "AI-assisted · human-reviewed · last updated" disclosure line.
- **"In 30 seconds" summary box** at top — the whole chapter in 4–5 bullets, visually distinct.
- Note content components (design each):
  - Section headings with scannable numbering
  - **Definition boxes** (term + crisp definition, quotable style)
  - **Formula boxes** (set-apart, math-rendered, with "when to use" line)
  - Labeled-diagram treatment (image + caption + key points)
  - **Solved example** blocks (problem → step-by-step → answer highlighted)
  - **Common mistakes** callout (amber/warning styling)
  - Tables for comparisons
- **Quick-revision mode**: a toggle or end-of-page section showing only the definitions, formulas, and key points as flashcard-style cards — the "night before exam" view.
- Sticky chapter table of contents (right rail desktop, collapsible on mobile).
- Prev/next chapter navigation, "back to Science" link.
- Print-friendly consideration (students print notes): mention a print stylesheet treatment.

### 5. Search results
- Results grouped by chapter, showing which section matched, with class/subject chips.

## Global elements

- Minimal header: Notes wordmark, class switcher, search, theme toggle. Mobile: search stays one tap away, always.
- Footer: class links, "A ByteScribble project" link to bytescribble.com, honest one-line about the AI-assisted process, contact.
- Empty/coming-soon states for classes and subjects not yet published — inviting, not broken-looking.
- 404 page ("This chapter isn't in the syllabus") pointing to search.

## Technical constraints

- Built in **Astro**, fully static on GitHub Pages: no backend, no login, no heavy frameworks. Search is client-side (Pagefind-style). Quick-revision toggle and theme are vanilla JS.
- Performance is critical for the audience: target < 100KB JS, fonts with system fallbacks, lazy-loaded images. Must feel instant on a mid-range phone over 3G.
- Fully responsive 360px–1440px. WCAG AA contrast, large tap targets (44px+), semantic headings, math readable by screen readers.

## Deliverable

High-fidelity mockups (HTML/CSS preferred) of all 5 pages + 404, mobile and desktop, light and dark. Include a mini style guide: color tokens (including per-subject accents), type scale, and every component (chapter row, definition box, formula box, solved example, mistake callout, flashcard, chips, search) in both themes.
