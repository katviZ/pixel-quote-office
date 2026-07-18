# PQM-Office · Profile + Docs Pack — RESUME STATE

**Last commit shipped:** `a405912` (Atlas PDF design, live)
**Current WIP:** Adding Profile view + 3 new client-facing docs
**Session paused at:** 95% limit, before pushing UI wiring

## ✅ Already on disk (uncommitted, unbreakable)

Backend + generators — all live in `index.html`:

1. **Enhanced `recordQuote`** — now stores `overrides`, `customLines`, `employee` per history entry (so regenerated docs use the original prices)
2. **`recomputeQuote(h)` helper** — reconstructs a full `result` from a stored history record
3. **`openPrintWindow(html)` helper** — one-line popup + auto-print (shared by all doc generators)
4. **`ATLAS_POPUP_CSS` constant** — self-contained Atlas CSS for popup docs
5. **`atlasPopup(title, spineText, pageInnerHTML)` skeleton** — one function, every doc calls it
6. **`postOfficeQuote(kind, ctx?)`** — now accepts optional `{r, h}` for regenerating from history entries; new kinds `handover_pdf` / `site_prereq_pdf` / `content_guide_pdf` supported
7. **`exportHandover(h?)`** — install-completion certificate, celebratory tone
8. **`exportSitePrereq(h?)`** — engineer-grade pre-install checklist
9. **`exportContentGuide(h?)`** — client-friendly content-creation brief

All 3 generators are **fully written, self-contained, ready to call**. They just aren't wired to any UI button yet.

## ⏳ Remaining work (fresh session tomorrow)

### Step A — Documents dropdown on header (est. 15 min)
Replace the two `⤓ Export PDF` + `📐 Structural PDF` buttons with **one** `⤓ Documents ▾` dropdown:
- 5 items: Quote PDF · Structural PDF · Handover · Site Prereq · Content Guide
- Add `[docsMenuOpen, setDocsMenuOpen]` state (was rejected due to session limit; safe to redo)
- Close-on-outside-click useEffect
- Menu items styled like the existing `headerBtn`

### Step B — Rename History → Profile (est. 10 min)
- Header button: `🕘 History` → `👤 Profile`
- Panel title: "Quote History" → "{employee}'s Profile"
- Add per-row action menu (`⋯`) with the same 5 doc items
- Each item calls its generator with the row's history record: `exportHandover(h)` etc.

### Step C — Smoke test + push (est. 10 min)
- Localhost `:8768` → generate a quote, click each of the 5 docs
- Verify Handover looks celebratory, Site Prereq looks engineer-grade, Content Guide looks friendly
- `git add . && git commit -m "..." && git push`

## Files touched
- `D:\pixel-quote-office\index.html` — all changes
- No changes needed to `engine.js`, `test.mjs`, `sw.js`, `pixel-data.xml`

## Council notes preserved from this session
- 🔨 EDIDTH's P0/P1 audit fixes shipped
- 🎨 FRIDAY's Atlas mockup shipped as the design system
- 🔮 shareable-URL sharing deferred to Phase 2 (Kathan's call)
- 🧙 doc tone locked: handover client-friendly / site prereq engineer-grade / content guide friendly-educational
- 🔥 logging locked: yes, per-doc-kind writes to Office Quotes sheet

## Bump SW cache on resume
When we ship Step A+B+C, bump `sw.js` `CACHE_VERSION` (currently `pqmo-v5`) → `pqmo-v6` so the phones pick up the new bundle.
