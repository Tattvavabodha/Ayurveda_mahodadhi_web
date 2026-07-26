# आयुर्वेदमहोदधिः — Project Log

This document is our running project journal. It records *what we
decided, why we decided it, and what was actually built*, one dated
entry at a time. Read it top to bottom for the full history, or jump
to the latest entry to see what's new.

---

## Project overview (for quick reference)

**What this is:** a scholarly digital Ayurveda knowledge platform -
classical texts, commentaries, Sanskrit grammatical analysis, and
(eventually) AI-assisted study tools - inspired by SanskritSahitya.org.

**Core architecture (3 layers):**
1. **Knowledge Repository** — a GitHub repo of structured JSON files
   (the permanent scholarly content).
2. **Data Access Layer** — small functions (`src/lib/content/`) that
   read that content, so the website never touches raw files directly.
3. **Presentation Layer** — the Next.js + TypeScript + Tailwind CSS
   website (deployed on Vercel) that displays it all.

**Tech stack:** Next.js, TypeScript, Tailwind CSS, GitHub, Vercel, plus
a lightweight client-side search library (added when we build real
search).

**Guiding principle:** adding new content, new texts, or even new data
points (like a future "iconography" field) should require adding
*data*, never rewriting *code*.

---

## Entry: 26 July 2026 — Milestone 1: Homepage

### What we planned
- **Phase 1 - Architecture:** Agreed on the 3-layer system above, and
  confirmed the tech stack (Next.js/TypeScript/Tailwind/GitHub/Vercel),
  plus adding a client-side search library.
- **Phase 2 - Knowledge repository design:** Designed the GitHub
  folder structure (`texts/ → division/ → adhyaya/ → verses/`, one
  file per verse) and the verse JSON schema, including `padaccheda`,
  `anvaya`, `padartha`, `saralartha` (sanskrit/hindi/english),
  `padavyakaranam`, `chandas`, `audio`, and a `commentaries` array
  (built to support multiple commentaries from day one). Solved the
  "sthāna vs khaṇḍa" naming problem using a `divisionLabel` field in
  each text's `text-meta.json`.
- **Phase 3 - Website folder structure:** Planned the Next.js project
  layout, most importantly the **content-driven dynamic routing**
  pattern (`[textId]/[divisionId]/[adhyayaId]/page.tsx`) - one
  template page that automatically generates a page for *any* text
  added to the repository, with zero new code required.
- **Phase 4 - UI design:** Wireframed the homepage (hero illustration,
  title, search bar, three nav buttons, off-canvas right nav drawer,
  footer). Agreed on the parchment/ivory/maroon/copper/gold color
  palette and Noto Serif Devanagari as the primary font. Decided the
  right nav drawer should be hidden-by-default on *all* screen sizes
  (not just mobile), and that cards/buttons should have a "lifted"
  elevation look (soft warm shadow + hover-rise + subtle gold border).

### What we built
- Scaffolded the real Next.js project (`ayurveda-mahodadhi-web/`) with
  all config files (`package.json`, `tsconfig.json`,
  `tailwind.config.ts`, `next.config.js`).
- Built the homepage end-to-end:
  - `HeroSection.tsx` - manuscript background, illustration placeholder,
    site title
  - `SearchBar.tsx` - live-suggestion search input (using placeholder
    example data until real content/search index exist)
  - `PrimaryNavButtons.tsx` - the तीन बृहत्त्रयी/लघुत्रयी/अन्यग्रन्थाः cards
  - `Header.tsx` + `RightNavDrawer.tsx` - the off-canvas navigation drawer
  - `Footer.tsx` - with an auto-updating copyright year
  - `Card.tsx` - the shared "lifted" elevation component
  - `theme.ts` - central design tokens (colors, fonts)
- Added a **manuscript page texture** to the whole site background:
  a procedurally-generated (code-only, no image file) paper-grain
  effect plus a soft edge vignette.
- Embedded 7 real classical verses (provided by the project owner, from
  various samhitas) as the faint background text behind the hero
  section.
- Fixed: footer text now centered (was previously spread to opposite
  ends); confirmed Noto Serif Devanagari renders correctly in the real
  project (a chat-preview-only limitation was corrected separately).
- Delivered both a real, runnable Next.js project (zip) and an
  in-chat interactive preview.

### Open placeholders (intentional, not yet resolved)
- Hero illustration is a placeholder box - real artwork (commissioned
  or AI-generated) to be added later, by replacing one image file.
- Search bar works against a tiny hardcoded example list - real search
  indexing arrives once actual verse content exists.

### Decisions still to make
- Whether the knowledge repository (`content/`) lives inside this same
  GitHub repo, or as a separate repo linked in. (Current recommendation:
  start with one repo for simplicity; split later if needed.)

---

<!--
  TEMPLATE FOR FUTURE ENTRIES - copy this block for each new session:

  ## Entry: [DATE] — [Milestone name]

  ### What we planned
  -

  ### What we built
  -

  ### Open placeholders / follow-ups
  -
-->
