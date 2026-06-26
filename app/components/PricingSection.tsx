/**
 * PricingSection.tsx — Server Component
 *
 * NO "use client" directive. This file is a React Server Component.
 * It is rendered once on the server, sent as static HTML, and after
 * hydration it is NEVER part of any client re-render cycle.
 *
 * Architecture:
 *   PricingSection  (Server Component — static HTML shell)
 *     ├── <header>  (static)
 *     ├── <PricingControls />  (Client Component — the ONLY client subtree)
 *     │     Holds zero useState. Uses useRef for selections + imperative DOM writes.
 *     └── <ul> × 3 PricingCard  (static server HTML — no client fiber exists)
 *           ├── <span id="price-text-{tierId}">   ← empty, populated by PricingControls
 *           └── <p    id="billing-label-{tierId}"> ← empty, populated by PricingControls
 *
 * What happens on currency/billing toggle:
 *   1. PricingControls.handleBillingChange / handleCurrencyChange fires
 *   2. billing.current / currency.current updated (useRef — no re-render)
 *   3. updateToggleUI() → button style and aria-checked written imperatively
 *   4. updatePrices()   → price span textContent written via getElementById ref
 *   5. React reconciler is never invoked. Zero commits. Zero renders.
 *
 * React DevTools verification:
 *   "Highlight updates" → NOTHING flashes at all on toggle.
 *   Profiler flame graph → NO commits for the pricing tree.
 */

import PricingControls from "./PricingControls";
import { PRICING_MATRIX, TIER_ORDER, type TierKey } from "./pricingMatrix";

// ─── Static card — Server Component, rendered once ────────────────────────────
function PricingCard({ tierId }: { tierId: TierKey }) {
  const tier        = PRICING_MATRIX.tiers[tierId];
  const isHighlight = tier.highlight;

  return (
    <li
      className="relative flex flex-col rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: isHighlight ? "var(--dark-navy)" : "rgba(255,255,255,0.05)",
        outline:    isHighlight
          ? "2px solid var(--accent-yellow)"
          : "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {isHighlight && (
        <span
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold"
          role="img"
          aria-label="Recommended plan"
          style={{ background: "var(--accent-yellow)", color: "var(--near-black)" }}
        >
          Most popular
        </span>
      )}

      <h3
        className="mb-1 text-xl font-bold"
        style={{
          fontFamily: "var(--font-mono)",
          color: isHighlight ? "white" : "var(--mint)",
        }}
      >
        {tier.name}
      </h3>

      <p
        className="mb-6 text-xs leading-relaxed"
        style={{ color: "rgba(217,232,226,0.50)" }}
      >
        {tier.tagline}
      </p>

      {/*
        ── Price text node ──────────────────────────────────────────────────
        ZERO JSX children. textContent is owned entirely by PricingControls.
        id="price-text-{tierId}" lets PricingControls locate this element via
        document.getElementById after hydration.
        suppressHydrationWarning silences React's mismatch warning since the
        server sends an empty node and the client writes the initial price.
        aria-live="polite" ensures screen readers announce price changes.
        ──────────────────────────────────────────────────────────────────── */}
      <span
        id={`price-text-${tierId}`}
        className="text-5xl font-extrabold tracking-tight tabular-nums"
        style={{
          fontFamily: "var(--font-mono)",
          color:      isHighlight ? "var(--accent-yellow)" : "white",
          minWidth:   "5ch",
          display:    "inline-block",
        }}
        aria-live="polite"
        aria-atomic="true"
        aria-label={`${tier.name} plan price`}
        suppressHydrationWarning
      />

      {/*
        ── Billing cadence label ────────────────────────────────────────────
        ZERO JSX children. Written imperatively by PricingControls alongside
        the price. suppressHydrationWarning for same reason as above.
        ──────────────────────────────────────────────────────────────────── */}
      <p
        id={`billing-label-${tierId}`}
        className="mb-8 mt-1 text-sm"
        style={{ color: "rgba(217,232,226,0.45)" }}
        suppressHydrationWarning
      />

      <ul className="mb-8 flex-1 space-y-3" role="list">
        {tier.features.map((feat) => (
          <li
            key={feat}
            className="flex items-start gap-2 text-sm"
            style={{ color: "rgba(217,232,226,0.75)" }}
          >
            <span
              className="mt-0.5 shrink-0"
              aria-hidden="true"
              style={{ color: "var(--accent-yellow)" }}
            >
              ✓
            </span>
            {feat}
          </li>
        ))}
      </ul>

      <a
        href="#"
        id={`pricing-cta-${tierId}`}
        aria-label={`${tier.cta} — ${tier.name} plan`}
        className="block rounded-xl px-6 py-3 text-center text-sm font-bold
                   transition-all duration-200 hover:brightness-110"
        style={
          isHighlight
            ? { background: "var(--accent-yellow)", color: "var(--near-black)" }
            : { background: "rgba(255,255,255,0.10)", color: "white" }
        }
      >
        {tier.cta}
      </a>
    </li>
  );
}

// ─── Section shell ────────────────────────────────────────────────────────────
export default function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="px-6 py-24"
      style={{ background: "var(--near-black)" }}
    >
      <div className="mx-auto max-w-6xl">

        <header className="mb-10 text-center">
          <h2
            id="pricing-heading"
            className="mb-4 text-4xl font-extrabold md:text-5xl"
            style={{ color: "white" }}
          >
            Simple, transparent pricing
          </h2>
          <p style={{ color: "rgba(217,232,226,0.65)" }}>
            No surprise overages. Downgrade or cancel any time.
          </p>
        </header>

        {/*
          PricingControls is the ONLY client component in the pricing section.
          It holds zero useState and commits only once (on mount).
          All subsequent interaction is pure DOM mutation — no React involvement.
        */}
        <PricingControls />

        {/* Cards — server-rendered static HTML, never touched by the reconciler */}
        <ul className="grid gap-8 md:grid-cols-3" role="list">
          {TIER_ORDER.map((tierId) => (
            <PricingCard key={tierId} tierId={tierId} />
          ))}
        </ul>

        <p
          className="mt-8 text-center text-xs"
          style={{ color: "rgba(217,232,226,0.30)" }}
        >
          Prices include regional processing tariffs (INR: 0%, USD: +5%, EUR: +7% VAT-inclusive).{" "}
          Annual total billed as a single payment. Enterprise prices are starting rates.
        </p>
      </div>
    </section>
  );
}
