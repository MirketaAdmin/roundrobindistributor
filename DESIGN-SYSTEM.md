# Round Robin Distributor — Design System & Homepage Implementation Spec

**Status:** analysis only — derived from the supplied design references. No values here are invented; anything that could not be determined from the references is marked **Not in design** or **Estimate**.

## 0. Sources and how values were obtained

| Ref | File | Content | Scale |
|---|---|---|---|
| DS | `5.png` "RRD / Design System" (1440 wide) | Colours, type scale, spacing, radius, elevation | 1:1 |
| CTRL | `4.png` "Controls" | Buttons, badges, inputs (states) | 1:1 |
| NAV | `2.png` "Navigation" | Component-sheet nav (light / inverse) | 1:1 |
| CARDS | `3.png` "Cards" | Feature, dashboard, metric cards | 1:1 |
| CTA | `1.png` "CTA & Footer" | Component-sheet CTA and footer | 1:1 |
| HP | `6.png` = `8.png` = `9.png` homepage (1284×9180) | The page to build | 1:1 — a **1280px frame with a 2px black border** on each side |

- All homepage coordinates below are in **1280px frame space** (PNG x − 2). y is measured from the top of the page.
- Colours were sampled pixel-exact from flat fills. Text colours are the darkest pixel of a glyph; anti-aliasing only lightens, so these are the true colours.
- Font sizes come from measured cap heights and line pitch. Widths are from ink bounding boxes, ±1px.
- `design.md` was referenced in the brief but **has not been supplied**. This document stands in for it until it arrives.

### Precedence when references conflict

1. **The homepage (HP) wins** for the header, footer, and any layout or instance value (client decision).
2. **DS wins** for font family (Manrope everywhere) and for the type scale where the client confirmed it (hero headline ExtraBold 800).
3. **Unresolved conflicts** are listed in §22.

---

## 1. Global page width

| Property | Value | Source |
|---|---|---|
| Design frame width | **1280px** | HP |
| Content max-width | **1168px** | HP (x 56 → 1224) |
| Side gutter at 1280 | **56px** | HP |
| Full page height | **9180px** | HP |
| Section backgrounds | Full-bleed (edge to edge). Content is centred in the 1168 column. | HP |

There is no wider content container anywhere on the page. Every section aligns to x = 56 / 1224.

---

## 2. Header

| Property | Value |
|---|---|
| Height | **101px** (y 0–100), background `#ffffff`, no border, no shadow |
| Layout | Brand at the left of the column; nav and CTA right-aligned |
| Logo | **74×61** at (56, 20) — gear mark plus "RRD" wordmark (raster in the reference) |
| Brand gap (logo → text) | **11px** (text starts at x 141) |
| Product name | "Round Robin Distributor" — 19px / 23px, weight 600, `#0b1f3a` (cap top y 26) |
| Subtitle | Two lines: "Native Salesforce App" / "A Mirketa Product" — 13px / 17px, weight 500, `#64748b` (cap tops y 48, 65) |
| Nav items | About RRD · Features · Pricing · Support · Insights — 15px, weight 500, `#64748b`; **40px** between items; first item at x 611 |
| Nav item ink widths | 71 / 59 / 46 / 54 / 53px |
| CTA "Contact Us" | **128×35** at x 1096–1223, y 33–67; fill `#126fba`; label 15px weight 500 white; ~25px horizontal padding |
| Gap between last nav item and CTA | 40px |

**Not in the homepage design:** a user/avatar icon or a "Book a Demo" header button. Both appear only on the NAV component sheet, which the client has ruled is not to be used.

### Inverse variant (NAV sheet only — not used on the homepage)

- Background Slate `#466072`, white labels, white "Contact Us" button, "Book a Demo" primary button, round user icon.

---

## 3. Navigation behaviour

| Item | In design? |
|---|---|
| Dropdowns / mega-menu | **Not in design** — all nav items are plain links |
| Sticky header | **Not in design** (static frame; no indication either way) |
| Active / current state | **Not in design** |
| Hover | **Not in design** for nav links |
| Mobile menu / hamburger | **Not in design** (no mobile frame supplied) |

Approved targets: About RRD → Heritage section, Features → Pillars, Pricing → Pricing, Support → Contact form, Insights → Insights, Contact Us → Contact form.

---

## 4. Typography

### 4.1 Family

- **Manrope** for all text (DS "02 / Typography · Manrope"; client decision).
- Observation: the homepage export renders nav, body, chip and button text in an Inter-like face; only headings and the brand name render in Manrope. The client has ruled Manrope everywhere, so expect glyph-width differences against the PNG.

### 4.2 Scale (DS)

| Token | Size / line height | Weight |
|---|---|---|
| Hero | 56 / 64 | ExtraBold 800 |
| H1 | 48 / 58 | ExtraBold 800 |
| H2 | 40 / 48 | Bold 700 |
| H3 | 28 / 36 | Bold 700 |
| H4 | 22 / 30 | Bold 700 |
| H5 | 18 / 26 | Bold 700 |
| Body / Large | 18 / 28 | Regular 400 |
| Body / Default | 14 / 22.75 | Regular 400 |
| Body / Small | 12 / 16 | Regular 400 |
| Labels / Default | 14 / 20 | SemiBold 600 |
| Labels / Small | 12 / 16 | SemiBold 600 |
| Labels / Overline | 13 / 16 | Bold 700, uppercase, tracked |
| Captions / Default | 12 / 16 | Regular 400 |
| Captions / Small | 11 / 16.5 | Regular 400 |

### 4.3 Homepage usage (measured)

| Role | Size / line height | Weight | Colour | Where |
|---|---|---|---|---|
| Hero headline | 56 / 64 | 800 | `#071c36`; accent `#126fba` | Hero (4 lines) |
| Section H2 | 40 / 48 | 700 | `#071c36` (white on dark) | Every section |
| Section subtitle | 18 / 29 (Pricing 30, Governance 28, Heritage lead 29.5) | 400 | `#5b6b7a` | Under H2s |
| Overline / eyebrow | 13 / 16 | 700, uppercase | `#005695` | Problems, Comparison, Pricing, Insights, plan cards, pillar labels |
| Eyebrow pill text | 12 / 16 | 700, uppercase | see §6 | Live in Days, Governance, Contact |
| Card title (large) | 22 / 30 | 600 | `#071c36` | Pillar titles, plan names, insight titles, video heading, stat "5★ AppExchange" |
| Card title | 18 / 26 | 600 | `#071c36` | Problems, Governance cards, steps, videos, heritage card |
| Small card title | 16 / 22 | 600 | `#071c36` | Pillar cards |
| Card body | 14 / 22.75 (Problems), 14 / 20 (others) | 400 | `#5b6b7a` or `#476274` | Cards |
| Hero paragraph | 18 / 30 | 400 | `#5b6b7a` | Hero |
| Big stat | 40 / 48 | 700 | `#005695` | Rated 5★ stats, price "$2,000" (`#071c36`) |
| Step number | 48 / 48 | 700 | `#d0e2f1` | Live in Days |
| Table header | 12 / 16 | 700, uppercase | `#5b6b7a` (white on RRD column) | Comparison |
| Table cell | 14 / 20 | 600 | `#071c36`; RRD column `#16a36a` | Comparison |
| Pill / chip label | 12–13 / 16 | 600 | `#414751` / `#071c36` | Chips, industry pills, table pills |
| Form label | 12 / 16 | 700 | `#071c36` | Contact form |
| Input text / placeholder | 16 | 400 | `#071c36` / `#9ca3af` | Contact form |
| Footer column heading | 13 / 16 | 700, uppercase, tracked | `#071c36` | Footer |
| Footer link | 15 / 20 (28px pitch) | 400 | `#414751` | Footer |
| Footer legal | 14 / 20 | 400 | `#414751` / `#476274` | Footer |

### 4.4 Letter spacing

- **DS:** the overline is visibly tracked; the exact value is **not determinable** from a raster (≈ +0.8–1.2px).
- **Calibrated values (approved):** these reproduce the PNG's measured widths and line breaks in Manrope.

| Element | Letter spacing |
|---|---|
| Nav | −0.3px |
| Header "Contact Us" | 0 (weight 500) |
| Hero headline | −1.2px |
| H2 | −0.8px |
| Brand name | −0.4px |

---

## 5. Brand colours (DS swatches, sampled exact)

| Token | Hex | Role |
|---|---|---|
| Primary | `#126fba` | Buttons, links, accents |
| Primary / Pressed | `#005695` | Pressed/hover button, eyebrows, icons |
| Accent | `#3fa9f5` | Decorative, input focus ring |
| Slate | `#466072` | Inverse surfaces, Contact section |
| White | `#ffffff` | |
| Surface | `#f2f9fe` | Light section fill, disabled controls |
| Ink | `#0b1f3a` | Brand name, DS text |
| Muted | `#64748b` | Nav, header subtitle, helper text |
| Border | `#d9eaf6` | Card borders, disabled borders |
| Success | `#16a36a` | Positive status, checks |
| Warning | `#f5b400` | Stars |
| Danger | `#dc2626` | Errors |

### 5.1 Additional colours used on the homepage (measured; not on the swatch sheet)

| Hex | Use |
|---|---|
| `#071c36` | Heading text; Governance section fill |
| `#5b6b7a` | Paragraph text |
| `#414751` | Strong secondary text, pill labels, footer copy |
| `#476274` | Card body (light), meta text, "Trusted across" label |
| `#a0c9ff` | Icons on navy |
| `#e7eeff` | Text on navy; industry pill fill |
| `#9ca3af` | Input placeholder |
| `#001e2e` | Text on sky pill |
| `#d0e2f1` | Step numbers |
| Problem icon tiles (fill / icon) | `#e3f2fc`/`#005695` · `#fef2f2`/`#ba1a1a` · `#fffbeb`/`#b45309` · `#faf5ff`/`#7e22ce` · `#eff6ff`/`#1d4ed8` · `#fff7ed`/`#c2410c` |
| Status badge fills (CTRL) | Info `#e3f2fc` (text `#126fba`), Draft `#f2f9fe`, Active `#e8f8f1`, Needs attention `#fff7da`, Routing error `#ffdad6` (text `#0b1f3a`) |

---

## 6. Background colours (by section)

| Section | y range | Height | Fill |
|---|---|---|---|
| Header | 0–100 | 101 | `#ffffff` |
| Hero | 101–814 | 714 | Image: soft blue gradient + arcs + photo (base ≈ `#f2f9fe`) |
| Trust bar | 815–1026 | 212 | `#ffffff` |
| Problems | 1027–1801 | 775 | `#f9f9ff` with a 1px bottom rule `#ddecf7` |
| Pillars | 1802–2909 | 1108 | `#ffffff` |
| Comparison | 2910–3627 | 718 | `#f9f9ff` |
| Governance | 3628–4522 | 895 | `#071c36` |
| Heritage | 4523–5071 | 549 | `#ffffff` |
| Live in Days | 5072–5550 | 479 | `#f2f9fe` |
| Rated 5★ | 5551–6494 | 944 | `#ffffff` |
| Pricing | 6495–7260 | 766 | `#f2f9fe` with a 1px top rule `#e3eff8` |
| Insights | 7261–8021 | 761 | `#ffffff` |
| Contact | 8022–8753 | 732 | `#466072` (Slate) |
| Footer | 8754–9180 | 426 | `#f9f9ff` |

### Surface fills

| Hex | Use |
|---|---|
| `#f5f7ff` | Trust cards |
| `#f0f3ff` | Pillar cards, testimonial, heritage card, form inputs, table header |
| `#e3f2fc` | Icon tiles, hero chips |
| `#e7eeff` | Industry pills |
| `#d6e3ff` | Comparison pills, footer badge 2 |
| `#cbe6fc` | Eyebrow pill, footer badge 1 |
| `#dee8ff` | Video thumbnails |
| `#162944` | Navy panel, band |
| `#1b2e4a` | Navy cards |
| `rgba(255,255,255,.1)` | Contact eyebrow pill (renders `#597080`) |

---

## 7. Buttons

### 7.1 Component sheet (CTRL): three types × two sizes × three states

| | Primary | Secondary (outline) | Tertiary (text) |
|---|---|---|---|
| Default | fill `#126fba`, text white | fill white, 1px `#126fba`, text `#126fba` | no fill, text `#126fba` |
| Hover / Pressed | fill `#005695` | fill `#e3f2fc`, 1px `#126fba` | fill `#e3f2fc` |
| Disabled | fill `#f2f9fe`, text `#64748b` | fill `#f2f9fe`, 1px `#d9eaf6`, text `#64748b` | fill `#f2f9fe`, text `#64748b` |

- **Size MD:** 36px tall.
- **Size LG:** 48px tall.
- **Demo width:** 220px (the sheet uses a fixed demo width; real buttons hug their label).
- **Radius:** ≈ **6px**.
- **Label:** 14px, weight 500–600.

### 7.2 Homepage instances (measured; these override 7.1 for the homepage)

| Button | Size | Style |
|---|---|---|
| Header "Contact Us" | 128×35 | Primary; label 15px / 500 |
| Hero "Book a Demo →" | 182×44 | Primary; 36px horizontal padding; 18px arrow, 6px gap; blue glow shadow |
| Hero "See Pricing" | 153×46 outer | White fill, 1px outside stroke Primary @ 30%, Primary label |
| Governance "See How RRD Works →" | 209×44 | Primary, 24px padding |
| Testimonial "View on AppExchange ↗" | 221×43 | White, subtle shadow, `#005695` label |
| Pricing "Get Started" | full card width (216)×40 | Primary |
| Pricing "See Pricing" / "Talk to Our Team" | 152×44 / 191×44 | Primary / white with 1px `#d9eaf6` |
| Contact "Book a Demo →" | 178×44 | White, `#071c36` label |
| Contact "View on AppExchange" | 252×44 | Transparent, 1px white outline, cloud icon |
| Form "Submit Inquiry ▷" | 186×44 | Fill `#005695`, blue glow shadow, send icon |

Homepage button radius reads as **6–8px**. The visual measurement is ambiguous between the two; the CTRL sheet indicates 6px.

**Hover states on homepage instances:** **Not in design** beyond the CTRL sheet. Use 7.1 by type.

---

## 8. Cards and dimensions (homepage)

| Card | Size (W×H) | Fill / border | Radius | Padding / content |
|---|---|---|---|---|
| Trust stat | 221×85 (5 across, gap 16) | `#f5f7ff`, no border | ≈14 | 12px left; icon tile 40×40 (r8, `#e3f2fc`); text 15/20 600 |
| Problem | 369×234 (row 1), 369×214 (row 2) | white, 1px `#d9eaf6` | ≈14 | 24px; tile 44×44 (r10) |
| Pillar item | 368 wide, stretches to fill its column | `#f0f3ff`, 1px `#d9eaf6` | ≈12 | 17px 16px; 16/22 title, 14/20 body |
| Comparison table | 1168×387 | white, faint shadow | 24 | Header 48, rows 56; columns 436 / 400 / 332 |
| Governance image panel | 568×431 | `#162944` | 24 | 16px; image 536×400 (r16) |
| Governance card | 276×172 / 276×192 (2×2, gaps 16 / 20) | `#1b2e4a` | 16 | 24px |
| Governance band | 1168×95 | `#162944` | 16 | 0 24px |
| Heritage card | 468×289 | `#f0f3ff`, 1px `#d9eaf6` | 24 | Logo 128×105, centred text |
| Step card | 280×228 (4 across, gap 16) | white, subtle shadow | 12 | 24px |
| Stat card | 280×148 | `#f2f9fe`, subtle shadow | 16 | 24px |
| Testimonial | 1168×190 | `#f0f3ff` | 24 | ≈36px |
| Video card | 369×306 | `#f2f9fe`; thumbnail 369×175 `#dee8ff` | 16 | 18px 20px 20px; play disc 56 white |
| Pricing plan | ≈270×297 (4 across, gap 30) | white, 1px `#d9eaf6`; featured 2px `#126fba` + shadow | ≈14 | 24px; "MOST POPULAR" pill ≈19 tall centred on the top edge |
| Insight card | ≈373×521 (3 across, gap 24) | `#f2f9fe`, soft shadow | 16 | 16px; image 340×214 (r8) |
| Contact form card | 629×611 | white, large soft shadow | 24 | 30px |
| Form notice | 569×80 | `#f2f9fe`, 1px `#d9eaf6` | 12 | Icon disc 40, `#005695` |

**CARDS component sheet** (feature / dashboard / metric cards) describes components that **are not used on the homepage**.

---

## 9. Section spacing (homepage)

These are vertical distances from the section top to the first cap/line top, and from the last element to the section bottom.

| Section | Top → first text | Last element → bottom | Notable internal gaps |
|---|---|---|---|
| Hero | 88 (headline cap) | 58 | Headline → paragraph 14; paragraph → chips 19; chips → buttons 25; buttons → note 25 |
| Trust | 36 (cards) | 35 | Cards → pills row 31 |
| Problems | 68 (eyebrow cap) | 58 | Subtitle → cards ≈38; row gap 30 |
| Pillars | 69 (H2 cap) | 60 | Subtitle → pillar labels ≈63; underline → cards 16 |
| Comparison | 68 | 62 | Subtitle → table ≈26; table → link 24 |
| Governance | 60 (pill) | 58 | Paragraph → panel 45; panel → band 43 |
| Heritage | 68 (H2 cap) | ≈65 | |
| Live in Days | 60 (pill) | 59 | H2 → cards ≈56 |
| Rated 5★ | 67 (H2 cap) | 58 | Stats → testimonial 23; testimonial → video heading ≈43 |
| Pricing | 69 (eyebrow cap) | 60 | Subtitle → plans ≈58; plans → buttons 56 |
| Insights | 62 (eyebrow cap) | 57 | H2 → cards ≈58 |
| Contact | 60 (card) | 61 | |
| Footer | 69 (logo) | ≈45 | Columns → legal row ≈64 |

**Typical rhythm:** about **60px** of vertical padding per section. DS spacing is a 4px grid from 4 to 120px; the measured values cluster on 16 / 24 / 32 / 56 / 64.

---

## 10. Container padding

| Width | Gutter |
|---|---|
| 1280 (design) | 56px each side, content 1168 |
| 1440 and wider | Content stays 1168, centred |
| Tablet / mobile | **Not in design** |

---

## 11. Grid and flex layouts

| Section | Layout |
|---|---|
| Header | Flex: brand ↔ [nav (gap 40) + CTA] |
| Hero | Copy column 560px at left. The photo occupies x 608–1280, y 227–694, flush to the right frame edge. |
| Trust | 5-column grid, gap 16. Industries row: label + 8 pills spread edge to edge (space-between, ≈29–30px apart). |
| Problems | 3 columns, gaps 31 (x) / 30 (y) |
| Pillars | 3 columns (gap 32). Each column stacks cards with a 16px gap; cards stretch so all columns end on one line (y 2849). |
| Comparison | Table, columns 436 / 400 / 332 |
| Governance | [panel 568] + gap 32 + [2×2 cards]; band below |
| Heritage | [copy ≈650] + gap ≈50 + [card 468], card vertically centred. Checklist: 2 columns, 41px row pitch; the last item spans both columns. |
| Live in Days | 4 columns, gap 16 |
| Rated 5★ | Stats 4 columns (gap 16); testimonial flex (quote ↔ button); videos 3 columns (gap 31) |
| Pricing | 4 columns, gap 30; actions centred (gap 16) |
| Insights | Header flex (heading ↔ "See all insights"); 3 columns, gap 24 |
| Contact | [copy ≈500] + gap ≈40 + [form 629]. Form grid: 2 columns (gaps 20 × 14), textarea spans both. |
| Footer | Columns 482 / 241 / 241 / rest; legal row flex space-between |

---

## 12. Border-radius values

DS lists 6, 8, 12, 16, 20, 24, 32, 48 and 999px. The intended use is 8px for controls, 12–16px for cards and 999px for pills.

| Radius | Homepage use (measured) |
|---|---|
| 6 | CTRL buttons |
| 8 | Inputs, image corners, small tiles |
| 10 | Problem icon tiles |
| 12 | Pillar cards, step cards, form notice |
| ≈14 | Trust, problem and plan cards (measures between 12 and 16) |
| 16 | Governance cards and band, stat, video and insight cards |
| 20 | Comparison RRD header (top corners) |
| 24 | Table, governance panel, heritage card, testimonial, form card |
| 999 | Chips, pills, badges, eyebrow pills |

---

## 13. Shadows

DS names three elevations: **Subtle**, **Card** and **Raised**. Their **numeric values cannot be determined** from the raster (very low contrast).

| Element | Observed shadow (values are Estimates) |
|---|---|
| Comparison table | Faint 1–4px edge shadow |
| Step, stat and testimonial cards | Very subtle |
| Insight cards | Soft, ≈6px spread |
| Hero "Book a Demo" | Blue glow under the button (≈ `0 8 20 rgba(18,111,186,.22)`) |
| Featured plan | Soft blue |
| Form card | Large, soft |
| Submit button | Blue glow |

**Action needed:** confirm the three elevation tokens from `design.md` or the Figma file.

---

## 14. Icons

### 14.1 Lucide icons

| Location | Icon(s) | Size | Colour |
|---|---|---|---|
| Hero chips | Zap, Scale, Clock, Gauge | 14px | `#005695`, `#16a36a`, `#466072`, `#126fba` |
| Hero arrows | ArrowRight | 18px (button), 16px (link) | — |
| Trust | History, Star (filled), LockKeyhole | 20px in 40px tiles | Primary; star `#f5b400` |
| Problems | TimerOff, CalendarX, Moon, ShoppingBag | ≈22px in 44px tiles | Per tile |
| Comparison | CircleCheck | 16px | `#16a36a` |
| Governance | Eye | 20px | `#a0c9ff` |
| Heritage | BadgeCheck | 18px | `#005695` |
| Rated 5★ | ArrowUpRight; Play (filled) | — / 18px in a 56px disc | — / `#005695` |
| Insights | Clock 14px, ArrowRight | — | — |
| Contact | Rocket, ArrowRight, Cloud, Check (`#16a36a`), Zap (in disc), LockKeyhole (`#16a36a`), SendHorizontal | — | as noted |

### 14.2 Material Symbols-style icons (no Lucide equivalent)

These seven icons are visually Material Symbols Outlined:

- **Trust:** military-tech, stacked windows
- **Problems:** person-off, screen-settings
- **Governance:** precision-manufacturing, payments, psychology

They are available only as 1x raster crops from the PNG. Vector originals are needed for crisp rendering.

### 14.3 Stars

- Star ratings render as the "★" glyph in `#f5b400`: about 11–13px in the Trust bar, ≈18px on the stat card, ≈16px in the testimonial.

---

## 15. Images and dimensions

| Asset | Placement | Size | Notes |
|---|---|---|---|
| RRD logo | Header, footer | 74×61 | Gear (Slate) plus "RRD" ring/letters (blue) |
| RRD logo, large | Heritage card | 128×105 | |
| Hero photo and shapes | Hero | Photo region 672×468 (x 608–1280, y 227–694); bottom-right blue swoosh y 707–814; light arcs across the right half | Photo is a cut-out (two people at a laptop with the RRD logo; mug, plant) |
| Governance illustration | Governance panel | **536×400** (aspect 1.34) | Labels baked in: "Deterministic business rules", "Probabilistic AI black box" |
| Insight images ×3 | Insight cards | **340×214** (aspect 1.59) | Rounded 8 |
| Video thumbnails ×3 | Video cards | 369×175 | **Flat `#dee8ff` in the design — no image** |
| Avatars ×3 | Insight cards | 36px circles with initials | RP `#126fba`, AG Slate, RK navy-blue |
| Favicon | — | **Not in design** | |

Only 1x raster versions of all images exist in the references.

---

## 16. Hero section

| Property | Value |
|---|---|
| Size | 1280×714 (y 101–814) |
| Copy column | x 56, max width 560 |
| Headline | 4 lines: "Every Lead and Case / to the Right Person, / Fast, **by Rules You / Control.**" (accent from "by"). Cap tops y 189 / 253 / 317 / 381. |
| Paragraph | 4 lines at 30px pitch, cap top y 456; ends "…not per / user." |
| Chips | 2 rows of 2, 24px tall, rows y 586 and 618 (gaps 8 / 16). Padding 0 12 0 10, fill `#e3f2fc`, 13px / 600 label, 14px icon. |
| Buttons | y 667. Book a Demo 182×44, then 16px gap, then See Pricing. |
| Note link | "Rules-driven execution. AI where it pays. →" 13px / 500, `#5b6b7a`, cap top y 741 |

---

## 17. Footer

| Area | Content |
|---|---|
| Brand column (482) | Logo 74×61; name; subtitle "A Mirketa Product · Native Salesforce App", wrapping to the name's width |
| Description | 14/20 `#414751`, max ≈372 |
| Badges | "100% Salesforce Native" (`#cbe6fc`) and "AppExchange Certified" (`#d6e3ff`): 25px tall, radius ≈6, 12px / 600 |
| Column 1 (x 538) | **PRODUCT & ARCHITECTURE:** Features, How It Works, RRD vs. Native Tools, Pricing |
| Column 2 (x 779) | **SOLUTIONS & VERTICALS:** Lead / Case / Opportunity / Custom Object Distribution, Startup / Nonprofit / Enterprise Solutions |
| Column 3 (x 1020) | **COMPANY & TRUST:** About RRD, Insights, Contact, Support, Privacy Policy and T&C |
| Legal row | "© 2025 Mirketa Inc. Round Robin Distributor is a registered product of Mirketa." (left), "Rules-driven Salesforce assignment. Fair, fast, and explainable." (right) |
| Other | No divider. There is a stray 1px dot at x≈700 between the legal texts, presumed an artefact. |

---

## 18. Responsive behaviour

**Not in design.** Only the 1280px desktop frame exists, so there is no laptop, tablet or mobile frame.

What can be stated:
- Content stays 1168px wide, centred, at widths ≥ 1280.

Everything below 1280px is an implementation decision **pending mobile and tablet frames**:
- Breakpoints
- Column collapse
- Hero photo placement
- Table scrolling
- Mobile navigation

### 18.1 Implemented technical fallbacks (assumptions, not design)

These prevent overflow and keep the desktop look. They are not a mobile design, and will be replaced when tablet and mobile frames are supplied.

| Breakpoint | Fallback |
|---|---|
| ≥ 1200px | Desktop frame values apply exactly: section min-heights (Problems 775, Comparison 718, Heritage 549), fixed Governance card heights, Heritage card offset. |
| < 1200px | Hero becomes one column: copy, then the photo region (right 680×614 of the hero image) below it. |
| < 1200px | Governance, Heritage and Contact become one column. Footer columns go to 3, with the brand row full width. |
| < 1024px | Header nav collapses to a menu button; the menu panel drops below the bar (Escape and link click close it). |
| < 1024px | Trust: 3 columns. Problems, Steps, Stats and Pricing: 2 columns. Pillars, Videos: 1 column. Insights: 2 columns. |
| < 1024px | The comparison table scrolls horizontally inside its card (min width 760px). |
| < 1024px | Paragraph widths tuned to reproduce desktop line breaks are released. |
| < 640px | Side gutter 16px (32px at < 1024). Every grid goes to 1 column. |
| < 640px | H2 and hero headline sizes reduce (H2 30/38, hero 36/44). |
| < 640px | Hero and Contact buttons go full width; form fields stack. |

### 18.2 Home-only calibrations (scoped to their section CSS, not global tokens)

- **Paragraph widths:** these reproduce the PNG's line breaks with Manrope.

| Element | Width |
|---|---|
| Hero paragraph | 544 |
| Problems subtitle | 1140 |
| Problems card body | 311 (any width from 305 to 317 matches) |
| Pillar titles | 360 |
| Comparison subtitle | 1120 |
| Heritage lead | 640 |
| Step body | 222 |
| Testimonial quote | 740 |

- **Letter-spacing:** Trust card text −0.2px; featured plan line −0.3px.
- **Fixed Figma widths with centred labels:** Contact "Book a Demo" 178, "View on AppExchange" 252, "Submit Inquiry" 186; testimonial "View on AppExchange" 221.
- **Explicit Figma line break:** "AI Where It Pays" breaks after "…configure rules".

---

## 19. Reusable components

| Component | Variants |
|---|---|
| Button | primary / secondary / tertiary (CTRL) plus homepage white and outline-light; MD / LG; default / hover / disabled |
| Badge / pill | Tone variants (CTRL); chip with icon (hero); industry pill; table pill; eyebrow pill (sky / pressed / glass) |
| Input | Default / focus (accent 2px) / error (danger 1px + 12px red helper) / disabled (`#f2f9fe`, `#d9eaf6`) |
| Section heading | Eyebrow (text or pill) + H2 + subtitle; left or centre; light or dark |
| Brand lockup | Header (2 explicit subtitle lines) / footer (wrapping subtitle) |
| Icon tile | 40 / 44px, tinted |
| Header and footer | — |

**Input note:** the CTRL inputs are white with a 1px border, 300×44. The homepage form instead uses `#f0f3ff` fill with **no visible border**, 275×44.

---

## 20. Page-specific components

- **Hero:** copy, chip list and photo.
- **Trust bar:** stats and industries.
- **Problem cards.**
- **Pillar columns:** label, title, tone underline, stretching cards.
- **Comparison table:** highlighted RRD column.
- **Governance:** image panel, navy cards, CTA band.
- **Heritage:** checklist and partner card.
- **Step cards.**
- **Rated 5★:** stat cards, testimonial, video cards.
- **Pricing plans:** featured plan with badge, divider and footer line.
- **Insight cards:** image, meta row, author row, "Read more".
- **Contact:** CTA column and inquiry form card.

---

## 21. Animations and interactions

| Item | Status |
|---|---|
| Animations / motion | **Not in design** (static frames only) |
| Hover / pressed / disabled | Only the CTRL sheet: buttons and inputs (§7, §19) |
| Interactive elements implied | Nav links, CTAs, play buttons (video), external links (AppExchange, articles), form submit |
| Carousels, sliders, tabs, accordions | **Not in design** |

---

## 22. Conflicts and open items (need client decision or files)

1. **`design.md` not supplied.** Confirm it, or confirm this document replaces it.
2. **Fonts:** the homepage export renders body text in an Inter-like face; the client chose Manrope. Expect width differences.
3. **Text colours:** headings `#071c36` versus DS Ink `#0b1f3a`; paragraphs `#5b6b7a` versus DS Muted `#64748b`.
4. **Button radius:** CTRL ≈6px; homepage reads 6–8px. LG height is 48 on CTRL but **44** on the homepage.
5. **Inputs:** CTRL bordered white versus homepage filled `#f0f3ff`.
6. **Navigation and footer:** the NAV and CTA sheets show different variants (extra nav items, user icon, simple footer). The client ruled the homepage versions win.
7. **Elevation:** the numeric values of Subtle / Card / Raised are unknown.
8. **Overline tracking:** the numeric value is unknown.
9. **No responsive frames.**
10. **Vector and original assets:** logo (SVG), hero photo and shapes, governance illustration, 3 article images, 7 Material-style icons, favicon. Only 1x raster crops exist.
11. **Content:** the form shows "Company*" twice. Destinations for AppExchange, demo, videos, articles, Privacy / T&C and See All Insights are not in the design.

---

## 23. About Us page (`/about-us`)

**Source:** the About PNG, 1280×4314, with no frame border. Header, Contact section and Footer are the shared components; they render pixel-identical to the Home versions.

| Section | y range | Height | Fill |
|---|---|---|---|
| Hero (breadcrumb, 56/64 headline, 18/29.5 paragraph, two buttons, note link) | 101–734 | 634 | Recovered photo and shapes image |
| Who We Are (product mockup 570×412, eyebrow, H2, two 16/26 paragraphs) | 735–1270 | 536 | `#ffffff` |
| Ecosystem Heritage (three cards 375×278, r12; stats strip 1168×134, r18) | 1271–2021 | 751 | `#f2f9fe` |
| Tailored Solutions (intro column 370px; three cards 245×315, r12, photo 243×177) | 2022–2453 | 432 | `#ffffff` |
| Our Team (two portrait cards 279×347; Mirketa connection card 573×583, r20) | 2454–3155 | 702 | `#fafcff`, 2px top rule `#eff6fc` |
| Contact (shared) | 3156–3887 | 732 | Slate |
| Footer (shared) | 3888–4313 | 426 | `#f9f9ff` |

### 23.1 Page-specific values

These are scoped to the About section CSS; no global tokens changed.

**Paragraph widths reproducing Figma line breaks:**

| Element | Width (matching range) |
|---|---|
| Hero paragraph | 500 |
| Who We Are paragraphs | 535 (528–542) |
| Ecosystem subtitle | 1116 (1096–1137) |
| Ecosystem card body | 282 (280–285) |
| Solutions intro | 352 (336–369) |
| Team intro | 560 (541–572) |
| Connection card body | 460 (445–475) |

**Fixed Figma button widths:** "Explore Our Solution" 234, "Contact Our Team" 198 (200 including the outside stroke).

**Additional colours:**

| Hex | Use |
|---|---|
| `#e7eeff` | Ecosystem icon tiles |
| `#e5f1fb` | Solution card border |
| `#fafcff` | Team section |
| `#eff6fc` | Team top rule |
| `#edf4fa` | Connection card border |
| `#f2f6f9` | RRD row in the connection card |
| `#ccddea` | Connector dashes |
| `#c2cad3` | Breadcrumb separator |

**Portraits:** the role pills ("CEO & Founder", "Finance & Scale") are part of the portrait images in the design. The pill text is carried in each image's `alt` attribute.

### 23.2 Assets

All About assets are 1x raster crops from the PNG, in `src/assets/about/`. Re-create them with `python -I scripts/extract-about-assets.py <about.png>`.

### 23.3 Responsive fallbacks (assumptions — no About tablet/mobile frames)

| Breakpoint | Fallback |
|---|---|
| < 1200 | Hero: copy, then the photo region (right 700×560 of the hero image) below. |
| < 1200 | Who We Are, Solutions and Team become one column. |
| < 1024 | Ecosystem cards: 1 column. Stats: 2×2. |
| < 768 | Solution cards: 1 column. |
| < 640 | Team cards and connection points: 1 column; hero headline 36/44; hero buttons full width. |
| All | Desktop-calibrated paragraph widths are released below 1200 or 1024. |

---

## 24. Contact Us page (`/contact-us`)

**Source:** the Contact PNG, 1280×2549, with no frame border. Header and Footer are shared and render identically. The content sits on one vertical gradient, from `#f2f9fe` easing to `#f9f9ff` by about 1440px, then flat.

| Section | y range | Height | Content |
|---|---|---|---|
| Hero | 101–680 | 580 | Breadcrumb; centred one-line 56/64 headline ("Round Robin" in Primary); centred 18/28.5 paragraph (680 max); three channel cards 373×226 (gap 26, r14) with 44px `#e3f2fc` tiles and `mailto:` email rows |
| Consult | 681–1397 | 717 | See below |
| FAQ | 1398–2122 | 725 | See below |
| Footer (shared) | 2123–2548 | 426 | — |

**Consult section:**

| Part | Size and details |
|---|---|
| Copy column | 540px: H2 40/48, 18/30 paragraph |
| Enterprise card | 540×211, r12. 36px `#dee8ff` shield tile; two 242×61 `#f0f3ff` stat tiles, value 18/22 bold (`#005695` and `#16a36a`) |
| Sandbox card | 540×194. Diagonal `#015a8b` → `#1370b9`; white 254×39 button, r6 |
| Form card | 592×626, r24. Shared InquiryForm, with 31px above the submit row (16px on Home) |

**FAQ section:**

| Part | Details |
|---|---|
| Heading | Centred eyebrow, H2 and 16/24 subtitle |
| Layout | Two independent 572px columns, gap 24; items gap 25, r14 |
| Text | Questions 18/26 weight 500; answers 16/24.5 `#414751` |
| Chevron disc | 32px `#e7eeff`, 23px from the top. 16px from the right when open, 24px when closed, as drawn |

### 24.1 Page-specific values

These are scoped to the Contact section CSS.

| Element | Width (matching range) |
|---|---|
| FAQ question, closed items | 474 (473–474) |
| FAQ question, open items | 486 (477–495) |
| FAQ answers | 500 (500–501) |
| Hero paragraph | 680 |
| Sandbox body | 492, with the explicit Figma break before "access." |

The first question also has the explicit Figma break after "Lightning".

### 24.2 Content and behaviour notes

- **FAQ answers:** the design shows answers only for the two expanded items. The other four questions render with a disabled toggle (`aria-disabled`, "Answer not supplied yet") until the client supplies answer text in `src/data/contact.js`.
- **Accordion:** open items collapse and re-expand by click or keyboard.
- **Channel emails:** these appear in the design, so they are real `mailto:` links.
- **"Explore AppExchange Listing":** disabled until `EXTERNAL_LINKS.appExchange` is set.
- **Header and footer links:** the header "Contact Us" and footer "Contact" now open `/contact-us`. "Support" still targets the Home inquiry form (client-confirmed).

### 24.3 Assets

Eight single-colour icons are in `src/assets/contact/`, with alpha recovered so they're transparent:

- trending-up, terminal, hub
- shield
- card arrow, external link
- chevron up, chevron down

Re-create them with `python -I scripts/extract-contact-assets.py <contact.png>`. The breadcrumb uses the shared home icon from `src/assets/about/`.

### 24.4 Responsive fallbacks (assumptions — no Contact tablet/mobile frames)

| Breakpoint | Fallback |
|---|---|
| < 1200 | Consult becomes one column: copy, then the form; both max 640. |
| < 1024 | Channel cards and FAQ columns become 1 column; FAQ question widths are released. |
| < 640 | Headline 36/44; consult H2 30/38; stat tiles stack; Sandbox button full width; form card padding 20. |

---

## 25. Insights page (`/insights`)

**Source:** the Insights PNG, 1280×2251, with no frame border. Header and Footer are shared and render identically.

| Section | y range | Height | Content |
|---|---|---|---|
| Hero | 101–547 | 447 | `#f2f9fe`. Breadcrumb; centred one-line 56/64 headline ("Salesforce Assignment." in Primary); 18/28 subtitle; filter card (see below) |
| Article list | 548–1824 | 1277 | White. Shared `ArticleCard` grid (the Home Insights card), 3 columns, gap 24 / row gap 51; pagination centred 49px below the grid |
| Footer (shared) | 1825–2250 | 426 | — |

**Filter card:** 1168×146, r20, padding 23/24/27, white.

| Part | Details |
|---|---|
| Search field | 47px tall, `#f0f3ff`, r10, with the search glyph and the "⌘ K" hint image |
| "Sort:" | 13px/600 `#5b6b7a` |
| Select | 224×45 |
| Chips | 33px; widths pinned to Figma on desktop: 130 / 172 / 205 / 227 / 184, gap 4 |
| Active chip | `#005695` with a white-20% count pill |
| Other chips | `#f0f3ff` with 13px/600 `#414751` labels |

**Pagination:**

| Part | Details |
|---|---|
| Page buttons | 40px circles, gap 4; current page in Primary |
| Ellipsis | 28px slot |
| Prev / next | 26×31 outlined pills, set 8px out from the page buttons |

### 25.1 Behaviour (client decision: match the design, functional UI)

- **Listing:** renders exactly as drawn: the three known articles shown twice, an "All Insights 18" count, and pagination "1 2 3 … 12". These come from `LISTING` in `src/data/insights.js` (`placeholder: true`).
- **Pagination:** pages other than the current one, and prev/next, are `aria-disabled` until real articles exist.
- **Search:** live filtering on title, excerpt, category and author. ⌘K / Ctrl+K focuses it.
- **Chips:** filter by topic. While a filter or search is active, pagination is hidden; if nothing matches, "No insights match your search." is shown.
- **Sort:** only "Recent" appears in the design.
- **Article-to-chip mapping (`ARTICLE_TOPICS`) is an assumption pending confirmation:**
  - "Workload Balance" → Workload & Rep Balancing
  - "Best Practice Guide" → Implementation Guides
  - "RevOps Architecture" → no chip
- **Header and footer links:** "Insights" in the header and footer, and Home's "See all insights", now open `/insights`.

### 25.2 Assets

Glyphs are in `src/assets/insights/`. Re-create them with `python -I scripts/extract-insights-assets.py <insights.png>`.

| Asset | Treatment |
|---|---|
| Search glyph, select chevron, pager chevrons | Alpha recovered (transparent) |
| Four multi-colour category glyphs, "⌘ K" hint | Cropped with their own surface colour |

Article images are the shared Home crops.

### 25.3 Responsive fallbacks (assumptions — no Insights tablet/mobile frames)

| Breakpoint | Fallback |
|---|---|
| < 1200 | Chip widths are released. |
| < 1024 | Search takes the full row; Sort wraps below. Cards: 2 columns. |
| < 640 | Cards: 1 column; headline 36/44; Sort and select full width; the "⌘ K" hint is hidden. |

## 26. Article detail page (`/insights/lead-assignment-rules-vs-round-robin-distributor`)

**Source:** the article PNG, 1280×4397, with no frame border. Header and Footer are shared and render identically. The route slug is derived from the drawn title (no URL was supplied) and awaits confirmation.

| Section | y range | Height | Content |
|---|---|---|---|
| Article area | 101–3243 | 3143 | Vertical gradient `#f2f9fe` → `#f9f9ff` by ~2000px. Breadcrumb "Home / Insights"; 770px article column (x56) + 26px gap + 372px sidebar |
| FAQ (shared) | 3244–3970 | 727 | The Contact FAQ, on white, content 2px lower (padding-top 62) |
| Footer (shared) | 3971–4396 | 426 | — |

**Article card:** 770×2915 at y201, 1px `#e4eaf1`, r16, white; padding 37 / 8 / 36 / 37 (content runs x94–817).

| Part | Details |
|---|---|
| Tags | 26px pills: "COMPARATIVE ARCHITECTURE" (12/700 uppercase `#005695` on `#eff6ff`, border `#bfdbfe`), "Salesforce Native Evaluation" (12/600 `#047857` on `#ecfdf5`) |
| Read time | 13px `#64748b` with a 16px clock, right-aligned |
| H1 | 40/49.5, 800, Heading; "7 Critical Gaps" in `#005695` |
| Hero image | 695×449, r12 |
| Author row | 52px avatar (2px outside the column), name 16/600, role 13px `#64748b`; Save 75×37 and Share 37×37 outlined buttons (gap 7); 1px divider below |
| Intro | 18/29.7 `#476274`, tracking 0.2px |
| H2 | 24/32, 700, tracking −0.3px |
| Paragraphs | 16/26 `#476274`, tracking 0.2px, 24px apart; inline bold `#414751`, italic as drawn |
| Numbered H3 | 20/28, 700; 31×32 `#005695` badge (r6, gap 13), vertically centred on one- and two-line titles |
| Figure | 695px, 1px `#e2e8f0`, r12; 693×293 image; 36px `#f8fafc` caption bar (12px `#475569` caption, `#005695` "Live Salesforce Component") |
| Divider | 1px after gap 3 |

**Line breaks:** the frame's text uses hard breaks plus narrow boxes, which leaves orphaned words ("are", "web", "his", "PTO" …). Manrope sets narrower than the frame's face, so every drawn break is encoded as `\n` in `src/data/article.js` (`white-space: pre-line`); below 1200px the text reflows normally.

**Feedback bar:** 770×71, r16. "Was this architecture guide helpful?" 13/700 (tracking −0.45px); Yes / No 31px outlined buttons (`aria-pressed`, page-only — no feedback endpoint); hashtags 24px `#f1f5f9` chips, 12px `#64748b`.

**Sidebar (x852, 372px):**

| Card | Details |
|---|---|
| Latest Blogs | y201–1121, r16, padding 0/14/28. 51px header (book glyph, 16/600 title, 12/700 "View all ›" → `/insights`) with a 1px divider. Featured card 342px `#f2f9fe` r12 (309×215 image r8, meta row, 22/30 semibold title — the Omni-Channel article). Five list rows on a 90px pitch: 48px thumbs, 13/16 bold titles clipped at 146px (two drawn lines), 12px meta |
| Inquiry form | y1149–1797, r16, padding 16/15/17. 20/28 `#002f5a` title; 12/16 subtitle (max 290). Shared `InquiryForm` in a compact variant (`.inquiry--compact`): 81px notice, 165×45 inputs (gap 13/12), 78px textarea, 129×44 two-line submit. The sixth field is **Salesforce Edition** (optional) |
| Sandbox | y1824–2016, r12, `#015a8b` → `#1370b9` at 135°; Contact copy without the hard break (body max 290); 254×39 white CTA (AppExchange URL pending → `aria-disabled`) |

### 26.1 Behaviour and open items

- **Save** toggles a pressed state; **Share** uses the Web Share API, else copies the URL (status line under the buttons).
- **Latest Blogs:** titles are clipped in the design; only the visible text is reproduced. Full titles, URLs and the two missing thumbnails are pending, so items render `aria-disabled` (the featured card uses `ARTICLE_LINKS`, also null).
- No page links to this article yet: the Insights cards point to `ARTICLE_LINKS`, which are null until the client supplies article URLs.
- Inquiry submissions post to Salesforce Web-to-Lead like every other inquiry form (see README); "Salesforce Edition" has no Web-to-Lead field and is not submitted.

### 26.2 Assets

In `src/assets/article/`. Re-create them with `python -I scripts/extract-article-assets.py <article.png>`.

| Asset | Treatment |
|---|---|
| Hero, figure, featured image, 3 thumbnails, author avatar | Cropped (lossless WebP); rounding re-applied in CSS |
| Clock ×2, bookmark, share, book, chevron, thumbs up/down | Alpha recovered (transparent) |

The notice bolt, lock and send icons come from the shared inquiry form (lucide); the external-link glyph is the Contact crop.

### 26.3 Responsive fallbacks (assumptions — no article tablet/mobile frames)

| Breakpoint | Fallback |
|---|---|
| < 1200 | Single column (article, then sidebar), max 770 centred; drawn line breaks released |
| < 768 | Feedback bar stacks; hashtags wrap |
| < 640 | Card padding 24/20; headline 30/38; author actions on their own row; figure caption stacks |


## 27. Privacy Policy & T&C page (`/privacy-policy-and-terms`)

**Source:** the legal PNG, 1280×4744, with no frame border. The route slug was chosen by us (no URL was supplied) and awaits confirmation. The footer's "Privacy Policy and T&C" link now opens this page.

| Section | y range | Height | Content |
|---|---|---|---|
| Legal area | 101–3585 | 3485 | Vertical gradient `#f2f9fe` → `#f9f9ff` by ~2500px. Hero, then a 365px Document Index card (x56) beside a 766px content column (x458) |
| Contact (shared) | 3586–4317 | 732 | The shared `ContactSection` (identical to Home / About) |
| Footer (shared) | 4318–4743 | 426 | — |

**Hero:**

| Part | Details |
|---|---|
| Breadcrumb | "Home / Privacy Policy and T&C" |
| H1 | 40/48, 700, tracking −1px |
| Subtitle | 18/29 `#476274`, tracking 0.24px, hard break before "governing" |
| Meta strip | 48px white (r12), 14px; bold labels, 18px glyphs, 5px `#c1c7d3` dots |
| Trust cards | 4 × 280×68 (gap 16, r12); 40px `#e3f2fc` tiles (r8); 14/600 title, 12/600 subtitle |

**Document Index (365×654, r16, padding 25/24/31):** 18/600 title; "24 Articles" `#e7eeff` pill; 36px `#f0f3ff` search (14px); 13/700 uppercase `#005695` group label with shield glyph; twelve 14/20 entries, 18px apart.

**Content cards (white, r16, padding 32):** 33px apart (32px below each part intro), 41px between Part I and Part II.

| Part | Details |
|---|---|
| Part intro | "Part I" pill `#e3f2fc` / `#005695`, "Part II" pill `#cbe6fc` / `#4d687a`; 13/700 uppercase label; 40/48 title; 16/26 body |
| Section head | 22/30, 600 title; "SEC. x.x" code 11/700 `#005695`, tracking 2px. **Figma sets these codes in a monospace face; Manrope is used (client rule: Manrope only).** |
| Body | 16/26 `#476274`, tracking 0.2px |
| Callout | `#f2f9fe`, r12; 25px verified glyph; 14/20 `#071c36` |
| Guarantee tiles | 3 columns, gap 17, `#f0f3ff` r12; 210 / 210 / 206px tall as drawn; red/green glyphs; 14/20 text |
| Footnote | 14/23.5 |
| Licence tiles | 2 columns, gap 16 |

**Line breaks:** as on the article page, every drawn break is encoded as `\n` in `src/data/legal.js` (`white-space: pre-line` at ≥1200px; normal reflow below).

### 27.1 Behaviour and open items

- **Index:** entries 01, 02 and 04 jump to their sections (smooth scroll, URL hash updated). The other nine have no section in the design and render `aria-disabled` until their text is supplied. The search box filters the index entries; "No matching articles." is shown when nothing matches.
- **Coverage:** the design shows Privacy sections 01, 02 and 04 only (no 03, 05–12), and Terms sections T-1 to T-4. The badge reads "24 Articles". The missing text is pending from the client.
- **Contact section:** behaves exactly as on Home / About (form UI only; AppExchange and demo URLs pending).

### 27.2 Assets

In `src/assets/legal/`. Re-create them with `python -I scripts/extract-legal-assets.py <legal.png>`. All 13 glyphs (meta ×3, trust ×4, search, shield, callout, guarantee ×3) are alpha-recovered transparent PNGs at drawn size.

### 27.3 Responsive fallbacks (assumptions — no legal tablet/mobile frames)

| Breakpoint | Fallback |
|---|---|
| < 1200 | Single column (index above the content); trust cards 2 columns; drawn line breaks released; tile heights released |
| < 768 | Guarantee and licence tiles stack |
| < 640 | Headlines 30/38; meta strip stacks; trust cards 1 column; card padding 24/20; section code under the title |

## 28. Support page (`/support`)

**Source:** the Support PNG, 1280×3351. Header, the shared Contact section and the Footer render as on the other pages. The route was chosen by us; the header/footer "Support" links still go to the Home inquiry form (client decision) until the client says otherwise.

| Section | y range | Height | Content |
|---|---|---|---|
| Hero | 101–718 | 618 | `#f2f9fe`. Breadcrumb; centred two-line 56/64 headline (800, tracking −1.9px); 18/28 subtitle (tracking 0.27px); three 373×241 cards (gap 25, r16, padding 24): 44px `#e7eeff` tile, 18px tag pill ("Guide"/"Knowledge" `#cbe6fc`/`#005695`, "Diagnostics" `#fff0ef`/`#ba1a1a`), 20/28 title, 14/20 `#414751` copy, 14/700 `#005695` link |
| Topics | 719–2191 | 1473 | White. Three categories: glyph + 28/34 semibold title + 14px subtitle; 74px `#f7f9fe` accordion rows (r12) on an 82px pitch; 18/26 500 questions; 16/24 `#414751` answer |
| Contact (shared) | 2192–2923 | 732 | — |
| Footer (shared) | 2924–3349 | 426 | — |

### 28.1 Behaviour and open items

- Card links smooth-scroll to their category and set the URL hash.
- Only "Adding multiple values in a criteria field?" has an answer in the design; the other 11 questions are `aria-disabled` until their answers are supplied (same pattern as the Contact FAQ).

### 28.2 Assets

In `src/assets/support/`, re-created with `python -I scripts/extract-support-assets.py <support.png>`: three tile glyphs, three heading glyphs and the accordion chevrons, all alpha-recovered transparent PNGs.

### 28.3 Responsive fallbacks (assumptions — no Support tablet/mobile frames)

| Breakpoint | Fallback |
|---|---|
| < 1024 | Cards stack (1 column) |
| < 640 | Headline 36/44; subtitle 16/26; category titles 24/30; accordion padding 16/20 |

## 29. Interaction, motion and sticky header (site-wide)

**Sticky header:** `position: sticky; top: 0; z-index: 100`. It stays in the document flow, so there is no layout shift and the resting design is pixel-identical to the frames. A hairline shadow (`0 1px 0` + `0 4px 12px`, ~5% ink) fades in over 200ms once the page scrolls. `--header-height` (101 / 80 below 1024 / 72 below 640) drives `scroll-padding-top`, so every anchor lands just below the bar. The mobile menu drops below the sticky bar and scrolls internally if it is taller than the screen.

**No active-page styling:** no frame shows one. The current page link carries `aria-current="page"` for assistive technology only.

**Hover (src/styles/interactions.css):** colour, border or shadow changes only, never size or position. 150–250ms (`--ease-ui` 180ms). All effects sit under `@media (hover: hover)`.

| Element | Hover |
|---|---|
| Buttons | Existing variant fills; trailing arrow/send icon nudges 2px |
| Nav, footer and text links | Colour to Primary / Pressed; trailing arrow nudges 2px |
| Pricing plans, insight cards, support cards, video cards, featured blog | Minimal elevation (`0 6px 18px` ~8% ink); no cursor change, because the cards are not links |
| Accordions with an answer | Question text to Pressed |
| Inputs | Border to `--rrd-border` |
| Video play button (when a URL exists) | Surface fill (replaces a scale effect) |
| Disabled destinations (`aria-disabled`, URL pending) | Designed look kept, no hover reaction, `not-allowed` cursor, "Link not configured yet" tooltip |

**Motion policy:** no entrance, scroll-triggered, text or background animation. `prefers-reduced-motion: reduce` turns off all transitions and smooth scrolling, and JS scrolling (`scrollToId`, logo-to-top) jumps instantly.
