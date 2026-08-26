# 🌐 BND Website — Code Map

> Companion note for the Bucky Noh Dhol 3.0 website source. Links every file into the Obsidian
> graph (extensions kept in link targets per [[Attachment Linking Rules]]).
> **Up:** [[Website]] · [[BND-MOC]] · **Created:** 2026-07-03

## What this is
A static, multi-page marketing site for **Bucky Noh Dhol** (Madison's premier Raas-Garba
competition; current edition 3.0 — 01.23.27, Shannon Hall). Plain **HTML + CSS + JS** — no build
step, no framework. Built to be **reused year over year**. Reference designs:
adzentertainment.com, marylandmasti.com.

**Theming:** the default theme (Home, Leadership, shared chrome) is BND 3.0's **"Iconic Bollywood"**
— jewel tones (deep maroon + plum, gold + magenta accents, beige text). *No blue* on these pages
(navy read as patriotic). Each **History page carries its own year's theme** via a scoped
`<style>` block (see below).

## Run it locally
```bash
cd projects/BND/Website
python3 -m http.server 8731
# open http://localhost:8731/index.html
```

## Site map / pages
- [[projects/BND/Website/index.html|index.html]] — **Home**: hero · About · Show details · Sponsors & Partners
- [[projects/BND/Website/leadership.html|leadership.html]] — **Leadership Team**: Directors + 12-role Executive Board (current 3.0 board)
- [[projects/BND/Website/media.html|media.html]] — **Resources › Media**: BND [1.0](https://youtube.com/playlist?list=PL9rxqdfeM-K3I3iizQIkxmmhEVjsnqvH5) & [2.0](https://youtube.com/playlist?list=PL0IbC8YscBseARxyR5XM2y_LIe77MPVrv) playlists (balcony/front-row) + Google Drive photo galleries; links to the [BND YouTube channel](https://www.youtube.com/channel/UCUnD15uOIyKq6gar_QflS8g)
- [[projects/BND/Website/forms.html|forms.html]] — **Resources › Forms**: Liaisons & Event Manager Application (placeholder)
- [[projects/BND/Website/policies.html|policies.html]] — **Resources › Policies**: SAP, AOD, and Gun Violence policies (all live)
- [[projects/BND/Website/history-bnd1.html|history-bnd1.html]] — **History › BND 1.0: Dons in the 608** (Jan 25 2025): show order + placings, Chandaal mixtape, 20-person board. **Theme: mafia** — blood-red (`#430000/#540000/#650000`) + ivory + gold, Cinzel serif.
- [[projects/BND/Website/history-bnd2.html|history-bnd2.html]] — **History › BND 2.0: Raaslympus** (Jan 24 2026): show order + placings, The Labyrinth mixtape, 18-person board. **Theme: Greek gods** — navy/deep-blue (`#16244F`) + Olympian gold (`#DAAE4E`) + marble cream, Cinzel serif.
- [[projects/BND/Website/contact.html|contact.html]] — **Contact**: ADZ-style contact form (First/Last name · Email · Who's inquiring · Message) + Instagram/email links. Form posts to **FormSubmit** (emails buckynohdhol@gmail.com; honeypot spam-guard, no captcha).

## Shared assets
- [[projects/BND/Website/style.css|style.css]] — all styling; palette lives in `:root` CSS variables (the default = 3.0 Bollywood theme)
- [[projects/BND/Website/script.js|script.js]] — injects the shared nav + scroll behavior + **headshot auto-loader** (see below)
- [[projects/BND/Website/assets/img/hero-performance.png|hero-performance.png]] — hero background (performance shot)
- [[projects/BND/Website/assets/img/trophy-celebration.png|trophy-celebration.png]] — reserve image (trophy moment)
- **Board headshots** — `assets/img/board/bnd1/` (20) · `assets/img/board/bnd2/` (18); filename = member's full name kebab-cased (e.g. `khushi-kotilaine.jpg`)
- **Year logos** — [[projects/BND/Website/assets/img/logos/bnd1.jpg|bnd1.jpg]] (mafia emblem) · [[projects/BND/Website/assets/img/logos/bnd2.png|bnd2.png]] (Olympian gold coin)
- **Sponsor logos** — [[projects/BND/Website/assets/img/sponsors/msc.png|msc.png]] (Multicultural Student Center) · [[projects/BND/Website/assets/img/sponsors/asm.jpeg|asm.jpeg]] (Associated Students of Madison)
- **Partner logos** — [[projects/BND/Website/assets/img/partners/cry.jpeg|cry.jpeg]] (CRY America) · [[projects/BND/Website/assets/img/partners/saath.jpg|saath.jpg]] (Saath) · [[projects/BND/Website/assets/img/partners/ansonia.png|ansonia.png]] (Peace Corps Ansonia Project)
- **Sponsorship package** — [[projects/BND/Website/assets/docs/BND-Sponsorship-Package.pdf|BND-Sponsorship-Package.pdf]] (linked from the Home "Become a Sponsor" button)

## Headshot auto-loader (`loadHeadshots()` in script.js)
Any `.team__grid[data-photos="<dir>"]` auto-fills each member card from `<dir>/<name-slug>.<ext>`
(tries jpg → jpeg → png → webp); missing files fall back to the dashed placeholder. Per-photo
framing: add `data-photo-pos="center 25%"` to a member's `<article>` (used to center a few high heads).

## Per-year History theming
Each History page keeps the shared `style.css` but adds a scoped `<style>` block in its `<head>`
that overrides the palette variables (`--maroon`, `--plum`, `--beige`, `--gold`, `--magenta`,
`--font-display`) plus a few hardcoded backgrounds (nav, `.page-header`, `.page-body`) and the nav
logo (`.nav__brand--placeholder` background-image). To theme a **new year**: copy a History page,
drop in that year's palette + logo, and swap the roster/show-order/mixtape. Nothing else changes.

## Navigation structure
```
Home ▾        Leadership Team   Resources ▾    History ▾                    Contact
 ├ About                        ├ Media         ├ BND 1.0: Dons in the 608
 ├ Show                         ├ Forms         └ BND 2.0: Raaslympus
 └ Sponsors                     └ Policies
```
Nav is rendered once in `script.js` (`buildNav()`), driven by each page's `<body data-page="…">`.
Change the menu in that one function — all pages update.

## Contact form + email obfuscation
- `contact.html` form posts to **FormSubmit** (free, no backend). Hidden fields: `_subject`,
  `_template=table`, `_captcha=false`, plus a `_honey` honeypot. **First submission needs one-time
  activation** — FormSubmit emails buckynohdhol@gmail.com a confirmation link to click once.
- **Email is never in the static HTML.** `script.js` assembles `buckynohdhol@gmail.com` at runtime for:
  `[data-email-text]` (visible text), `[data-email-link]` (mailto, + optional `data-email-subject`),
  and `form[data-formsubmit]` (the FormSubmit action). Keeps harvesting bots from scraping the address.
- **Optional hardening:** after activation, swap the FormSubmit random alias (`formsubmit.co/el/xxxx`)
  into `script.js` so the address isn't exposed even at runtime.

## Status / to-do
- [x] Home (hero, about, show, sponsors), Leadership (3.0 roster), Resources + History pages built
- [x] Media → YouTube playlists + Drive photo galleries; Policies → SAP policy live
- [x] History 1.0 (Dons in the 608) + 2.0 (Raaslympus): show orders, mixtapes, rosters, **full headshots**, **per-year themes + logos**
- [x] Bollywood re-theme of Home/Leadership (removed patriotic navy → jewel plum/maroon, ornamental gold dividers)
- [x] Real **BND 3.0 logo** in the nav ([[projects/BND/Website/assets/img/logos/bnd3.png|bnd3.png]]) — replaced the dashed placeholder
- [ ] Headshots for the **3.0 Leadership** board (dashed placeholders now; bnd1/bnd2 done)
- [x] Finance board member on 3.0 Leadership — Vaibhav Singotam
- [ ] Forms: real Liaisons & Event Manager Application link; Media photo gallery
- [ ] **Activate FormSubmit** — submit the contact form once from the live site, click the confirmation email (then optionally swap in the random alias)
- [ ] Footer (socials, copyright)
- [ ] Deploy (host TBD)

## Related
- [[Website]] — the Directors-level page note this site belongs to
- [[BND-MOC]] · [[Directors]]

## Design upgrade layer (v3.1 — 2026-07-05)
A **craft pass** appended to the bottom of [[projects/BND/Website/style.css|style.css]] (block header
`3.1 DESIGN UPGRADE LAYER`), built with the `ui-ux-pro-max` skill. **Additive only** — it edits no base
rule and changes no HTML, so structure/content are untouched and the whole block can be deleted to revert.
It also inherits each page's own CSS variables, so the per-year History themes still theme correctly.
- **Depth system:** warm-tinted `--shadow-1/2/3` + `--glow-gold` elevation scale unified across cards.
- **Accessibility:** real `:focus-visible` gold focus ring (the base theme had none).
- **Motion:** animated gold sheen on hero/section accents, button sheen-sweep on hover, and scroll-reveal
  via CSS `animation-timeline: view()` (progressive; motion-safe — hidden state only under `no-preference`).
- **Ornament/type:** delicate gold seam atop each section band, `text-wrap: balance/pretty`, nav legibility
  scrim over the hero, gold-sheen brand hover.
- Reduced-motion is honored by the base `* { animation: none !important }` rule, which wins over this layer.
- Verified in-browser (Home + BND 1.0 pages): renders clean, no console errors, no layout breakage.
