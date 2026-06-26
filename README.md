# NexaFlow — AI Data Automation Platform

> **Frontend Battle 3.0 submission** — Premium SaaS landing page built with Next.js 14, Tailwind CSS v4, and zero animation libraries.

---

## 🚀 Live Preview

```
https://nexa-flow-mu.vercel.app/
```

---

## 🏗️ Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16 (App Router)** | Server Components, `next/font`, file-based routing |
| Language | **TypeScript 5** | Full type safety across all components |
| Styling | **Tailwind CSS v4** + **Vanilla CSS** | Responsive utilities + custom design tokens |
| Fonts | **JetBrains Mono** + **Inter** (Google Fonts via `next/font`) | Zero layout shift, self-hosted |
| Animation | **CSS `@keyframes`** + **Web Animations API (WAAPI)** | Zero library dependencies |
| Icons | **14 inline SVG components** (provided assets) | `currentColor` — no external icon library |

**Zero banned libraries** — no `framer-motion`, `radix-ui`, `@shadcn/ui`, `gsap`, or any other animation/UI framework.

---

## 🎨 Design System

All color tokens are defined as CSS custom properties in [`app/globals.css`](app/globals.css):

```css
--bg-light:      #F1F6F4  /* Arctic Powder    — light backgrounds    */
--accent-yellow: #FFC801  /* Forsythia        — primary CTA / accent */
--dark-navy:     #114C5A  /* Nocturnal Exp.   — headers / dark bg    */
--mint:          #D9E8E2  /* Mystic Mint      — borders / sections   */
--orange:        #FF9932  /* Deep Saffron     — highlights / hover   */
--near-black:    #172B36  /* Oceanic Noir     — body text / footer   */
```

**Typography:**
- `--font-mono` (JetBrains Mono) → headings, pricing numbers, logo
- `--font-sans` (Inter) → body copy, UI labels, buttons

---

## 📁 Project Structure

```
nexaflow/
├── app/
│   ├── components/
│   │   ├── Icons.tsx              # All 14 SVG assets as currentColor React components
│   │   ├── Navbar.tsx             # Sticky nav — search icon, x-mark close, mobile menu
│   │   ├── Hero.tsx               # Dark hero — staggered CSS entrance animation
│   │   ├── StatsStrip.tsx         # 4-metric stats bar — arrow-trending-up icon
│   │   ├── FeaturesSection.tsx    # Bento Grid ↔ Accordion with Context Lock
│   │   ├── PricingSection.tsx     # 3-tier pricing with billing × currency × tariff matrix
│   │   ├── PricingControls.tsx    # Monthly/Annual toggle + currency selector
│   │   ├── pricingMatrix.ts       # Pure JS pricing data — no React state
│   │   ├── TestimonialsCarousel.tsx # Sliding carousel — chevron-left/right + link-solid
│   │   └── Footer.tsx             # Multi-column footer — link icon + chevron-up-solid
│   ├── globals.css                # Design tokens, keyframes, all custom CSS classes
│   ├── layout.tsx                 # Root layout — Google Fonts, metadata, Open Graph
│   └── page.tsx                   # Page composition (Server Component)
└── public/
    ├── arrow-path.svg
    ├── arrow-trending-up.svg
    ├── chart-pie.svg
    ├── chevron-down.svg
    ├── chevron-left.svg
    ├── chevron-right.svg
    ├── chevron-up-solid.svg
    ├── chevron-up.svg
    ├── cog-8-tooth.svg
    ├── cube-16-solid.svg
    ├── link-solid.svg
    ├── link.svg
    ├── search.svg
    └── x-mark.svg
```

---

## ✨ Key Features & Architectural Decisions

### 1. Hero — CSS Entrance Animation
Five hero elements stagger in on page load using pure `@keyframes hero-fade-up`. No JS, no IntersectionObserver, no TTI impact. Total sequence completes in **480ms** (under the 500ms spec):

```
Beta pill    →  delay   0ms  →  done 280ms
h1 headline  →  delay  50ms  →  done 330ms
Subheading   →  delay 100ms  →  done 380ms
CTA buttons  →  delay 150ms  →  done 430ms
Trust strip  →  delay 200ms  →  done 480ms ✓
```

### 2. Pricing — Zero `useState`, Zero Re-renders
The pricing matrix is a **plain JS object** (`pricingMatrix.ts`). All three dimensions — billing period × currency × regional tariff — are computed with a single formula:

```
finalPrice = baseRate × billingMultiplier × fxRate × (1 + tariffRate)
```

When the user changes currency or billing period, `useRef` DOM mutations update the **text node only** — no React state, no reconciliation, no component re-render.

### 3. Features — Bento Grid ↔ Accordion with Context Lock
- **Desktop (≥768px):** Asymmetric CSS Grid with `grid-template-areas` — 6 cards at 3 different sizes.
- **Mobile (<768px):** Same cards collapse to a vertical Accordion driven by WAAPI (350ms `ease-in-out`).
- **Context Lock:** `window.matchMedia("(max-width: 767px)")` detects the exact breakpoint crossing. `lastHoveredRef` tracks the last hovered desktop card. On crossing, `requestAnimationFrame` waits one paint tick, then `openPanelAt(lastHoveredRef.current)` smoothly expands the matching accordion item.
- **Chevron swap:** Both `chevron-down` and `chevron-up` live in the DOM simultaneously and are toggled imperatively — **zero `useState`**.

### 4. All 14 SVG Icons — Placed & Functional

| Icon | Used In | Purpose |
|---|---|---|
| `chevron-down` | FeaturesSection | Accordion closed state |
| `chevron-up` | FeaturesSection | Accordion open state |
| `chevron-up-solid` | Footer | Back to top button |
| `chevron-left` | TestimonialsCarousel | Previous slide |
| `chevron-right` | TestimonialsCarousel | Next slide |
| `search` | Navbar | Desktop search button |
| `x-mark` | Navbar | Mobile menu close |
| `link` | Footer | Docs/external link social icon |
| `link-solid` | TestimonialsCarousel | Author "view profile" icon |
| `cog-8-tooth` | FeaturesSection | "AI Transformations" card |
| `cube-16-solid` | FeaturesSection | "Global Edge Infrastructure" card |
| `chart-pie` | FeaturesSection | "Analytics & Insights" card |
| `arrow-path` | FeaturesSection | "Real-time Data Sync" card |
| `arrow-trending-up` | StatsStrip | "10M+ Records daily" growth metric |

### 5. Transition Timing — Strictly Enforced

| Type | Duration | Easing |
|---|---|---|
| Hover interactions | 150–200ms | `ease-out` |
| Structural / layout | 300–400ms | `ease-in-out` |
| Hero entrance | 280ms | `ease-out` |
| Bento entrance | 260ms | `ease-out` |

---

## ♿ Accessibility

- Single `<h1>` per page; all other headings follow strict hierarchy (`h2` → `h3`)
- `aria-label` on all interactive elements (buttons, carousel controls, nav links)
- `aria-expanded` + `aria-controls` / `aria-labelledby` on accordion items
- `aria-live="polite"` on carousel track for screen reader announcements
- All SVG icons are `aria-hidden="true"` with labels on their parent buttons
- Focus-visible rings use `--accent-yellow` outline — never hidden

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "16.2.9",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.9",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 📐 Responsive Breakpoints

| Viewport | Layout |
|---|---|
| `< 768px` (mobile) | Single column, accordion features, stacked CTAs |
| `768px` (tablet) | Desktop nav appears, bento grid activates |
| `≥ 1280px` (desktop) | Full 3-column bento, side-by-side CTAs |

---

*Built for Frontend Battle 3.0 — all animations, transitions, and logic hand-coded from scratch.*
