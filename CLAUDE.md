# FacultyOfNursingUM

Multi-page static marketing site for the **Faculty of Nursing, Universiti Malaya (FON UM)**, established 6 March 2026. Served via GitHub Pages from `main`.

Structure and section ordering follow **medicine.um.edu.my/index** (Faculty of Medicine — the reference site the user asked us to mirror), with a modern visual refresh.

## Stack

- Plain HTML per page — no build step.
- **Tailwind is NOT used**. All styling lives in `assets/site.css` (custom design system with CSS variables).
- Nav + footer are injected via `assets/site.js` (single source of truth for all pages).
- **Font Awesome 6.5.1** via cdnjs.
- **Google Fonts** — `Cormorant Garamond` (display serif), `Inter` (body sans), `Great Vibes` (script accent).
- Hosted on **GitHub Pages** (main branch).

## Page tree

```
/
├── index.html                    Home (hero carousel + explore grid + intro + community + news + events + ribbon)
│
├── about/
│   ├── index.html                About landing (overview + explore cards)
│   ├── top-management.html       VC feature card + 4 dean/deputy dean placeholders + Registrar block
│   ├── meet-our-team.html        Group photo + 8 academic + 4 admin placeholders
│   ├── vision-mission.html       Vision + Mission cards + core values + promise section
│   └── history.html              Prose intro + vertical timeline (6 milestones) + establishment letter image
│
├── study/
│   ├── index.html                Study landing (2 big program cards + why-study grid)
│   ├── undergraduate.html        Bachelor of Nursing Science + Y1-Y4 breakdown + entry reqs
│   └── postgraduate.html         4 programs (Master AP / Master Ed / MSc research / PhD) + entry reqs
│
├── department/
│   ├── index.html                Department landing (2 cards)
│   ├── medical-surgical.html     Dept 01 with prose + sidebar
│   └── community-mental-health.html  Dept 02 with prose + sidebar
│
└── others/
    ├── events.html               6 event cards (calendar-tile thumbnails)
    └── news.html                 Featured leadership dialogue + 6 news cards
```

## Shared components (via `assets/site.js`)

- **Top strip** — email, phone, social icons (FB / IG / TikTok / LinkedIn).
- **Sticky main nav** — logo lockup on left; primary links with dropdowns (Home, About, Study, Department, Others); gold "Apply Now" CTA.
- **Mobile nav** — hamburger with `<details>` accordion for each group.
- **Footer** — brand + explore + academic + connect columns; bottom row with "Fakulti Kejururawatan · Established 6 March 2026".
- **Hero carousel** — auto-advancing dot navigation + prev/next arrows. Only mounts on the home page (`document.querySelector('.hero-track')`).
- **Reveal-on-scroll** — `.reveal` class + IntersectionObserver.
- **Scrolled-state** — nav gets a shadow after 20px scroll.

`site.js` computes the correct relative `ROOT` from the page depth, so links work whether you're at `/`, `/about/`, `/study/undergraduate.html`, etc.

## Design tokens (in `assets/site.css`)

- `--um-blue`  = `#002366` (primary)
- `--um-blue-2` / `--um-blue-3` — deeper / lighter shades for gradients
- `--um-gold` = `#D4A017` (accent)
- `--um-gold-2` = `#B8860B` (darker gold for text on light backgrounds)
- `--um-gold-soft` = `#F5D488` (soft gold for text-on-blue)
- `--paper` / `--paper-2` — warm off-whites for section alternation
- `--ink` / `--ink-muted` — body / secondary text
- `--line` — subtle divider `#E5DFCF`

Typography: display headings use **Cormorant Garamond** (serif, italic accent on gold words), body uses **Inter**, script accents (Our Promise etc.) use **Great Vibes**.

## Assets

```
assets/
├── site.css                     design system + component styles
├── site.js                      nav/footer injector + carousel + reveal + mobile toggle
├── logo.jpeg                    horizontal FON+UM lockup (nav)
├── logo_um.png                  UM crest (favicon)
├── logo_um_h.png                secondary crest
├── surat-kelulusan.jpeg         official establishment letter, 9 March 2026
├── leadership-dialogue.jpeg     6 July 2026 Dean Selection dialogue photo
└── banners/                     hero carousel images (compressed from original 16-32MB PNGs
    ├── banner-1.jpg …           to ~200-400KB JPEGs at 1920px, quality 82)
    └── banner-8.jpg
```

## Key facts baked into the pages

- **Established:** 6 March 2026 (effective date on official letter).
- **Approvals:** Senate 26 Feb 2026 → Board of Directors (LPU) 5 Mar 2026 → effective 6 Mar 2026 → formal notification 9 Mar 2026.
- **Registrar:** Prof. Ir. Dr. Abdul Aziz bin Abdul Raman (signatory on the establishment letter, moderator of the 6 July 2026 Dean Selection Dialogue).
- **Vice-Chancellor:** Prof. Dr. Hasniza Hashim (quoted on home + top-management pages).
- **Vision:** "A global center of excellence in nursing scholarship, impacting healthcare delivery and society."
- **Mission:** "To advance the art and science of nursing by nurturing visionary leaders and clinical experts through transformative education, impactful research, and clinical excellence in a diverse and dynamic global environment."
- **Promise/tagline:** "Caring today, leading tomorrow."
- **Sub-tagline:** "Together, we create impact. Together, we inspire hope."
- **Two founding departments (fake per user brief):** Medical-Surgical Nursing; Community & Mental Health Nursing.

## Working on the site

- Edit `.html` directly. No install / no build.
- Local preview: `python3 -m http.server 4173` from repo root → open `http://localhost:4173/`.
- All page HTML files include the same head block (Font Awesome + Google Fonts + `site.css`) and the same body scaffolding (`<div id="site-nav">…</div>`, page content, `<div id="site-footer">…</div>`, `<script src="…/site.js">`).
- To add a new page in a section: create the file, then add its link to the appropriate `children:` array in `site.js → NAV`.
- To adjust colors globally: change CSS custom properties in `:root` at the top of `site.css`.

## Known placeholders (real content pending)

- Team names are "TBA" / "To be announced" throughout `about/top-management.html` and `about/meet-our-team.html` — waiting on real appointments.
- Contact info: `nursing@um.edu.my` and `+603 7967 XXXX` are placeholders (also flagged in the letter's original web copy).
- Event dates on `others/events.html` are illustrative — not confirmed events.
- The 3 later news items on `others/news.html` are illustrative to fill out the grid; the top three (Dean Dialogue, The Star coverage, Establishment letter) are real.
- Department heads TBA.

## Deployment

- **Direct push to `main` = live site.** No branch protection; user (thayananthkumaresan-source) has push access.
- No CI, no build step — files as committed are served directly by GitHub Pages.
