"use client";

/**
 * PricingControls.tsx — Client Component
 *
 * ════════════════════════════════════════════════════════════════════════════
 * ZERO RE-RENDERS GUARANTEE
 * ════════════════════════════════════════════════════════════════════════════
 *
 * There is NO useState in this file. This is intentional.
 *
 * Current billing/currency selections are stored in useRef objects. Mutating
 * a ref's .current does NOT schedule a React re-render. This component's
 * fiber is committed ONCE (on mount) and NEVER again.
 *
 * All visual feedback (toggle button active state, −20% badge colour) is
 * applied imperatively to the button DOM nodes via their own refs, using
 * direct .style.* and .setAttribute() calls — exactly the same pattern as
 * the price text updates.
 *
 * The price <span> and label <p> elements are rendered by PricingSection
 * (a Server Component). PricingControls locates them via getElementById after
 * hydration and stores pointers in a useRef<Record>. Subsequent updates are
 * pure textContent writes — zero React reconciliation.
 *
 * ─── Verification in React DevTools ────────────────────────────────────────
 * 1. ⚛️ Components → gear → "Highlight updates when components render"
 *    Toggle billing or currency → NOTHING flashes. Not the card, not this
 *    component, not any parent. Zero React renders occur.
 *
 * 2. ⚛️ Profiler → Record → toggle → Stop
 *    Flame graph shows NO commits at all for the pricing subtree.
 *    The browser paints the new price via a direct DOM mutation only.
 * ════════════════════════════════════════════════════════════════════════════
 */

import { useRef, useEffect } from "react";
import {
  PRICING_MATRIX,
  TIER_ORDER,
  computePrice,
  formatPrice,
  cadenceText,
  type BillingKey,
  type CurrencyKey,
  type TierKey,
} from "./pricingMatrix";

export default function PricingControls() {
  // ── Current selections — useRef, NOT useState ────────────────────────────
  // Mutating .current never schedules a re-render.
  const billing  = useRef<BillingKey>("monthly");
  const currency = useRef<CurrencyKey>("USD");

  // ── Refs to price/label DOM nodes (in PricingSection server-rendered HTML) ─
  const priceEls = useRef<Record<TierKey, HTMLSpanElement      | null>>({
    starter: null, pro: null, enterprise: null,
  });
  const labelEls = useRef<Record<TierKey, HTMLParagraphElement | null>>({
    starter: null, pro: null, enterprise: null,
  });

  // ── Refs to toggle button DOM nodes (for imperative style updates) ────────
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef  = useRef<HTMLButtonElement>(null);
  const saveBadgeRef  = useRef<HTMLSpanElement>(null);

  // ─────────────────────────────────────────────────────────────────────────
  // Imperative price updater
  // Reads matrix → computes → writes textContent. No setState. No re-render.
  // ─────────────────────────────────────────────────────────────────────────
  function updatePrices(bill: BillingKey, curr: CurrencyKey): void {
    for (const tierId of TIER_ORDER) {
      const price     = computePrice(tierId, bill, curr);
      const formatted =
        PRICING_MATRIX.tiers[tierId].baseRate === 0
          ? `${PRICING_MATRIX.currencies[curr].symbol}0`
          : formatPrice(price, curr);
      const label = cadenceText(tierId, bill);

      const priceEl = priceEls.current[tierId];
      const labelEl = labelEls.current[tierId];
      if (priceEl) priceEl.textContent = formatted;
      if (labelEl) labelEl.textContent = label;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Imperative toggle UI updater
  // Applies active/inactive visual state directly to button DOM nodes.
  // No setState → no re-render triggered here either.
  // ─────────────────────────────────────────────────────────────────────────
  function updateToggleUI(bill: BillingKey): void {
    const monthly = monthlyBtnRef.current;
    const annual  = annualBtnRef.current;
    const badge   = saveBadgeRef.current;

    if (monthly) {
      monthly.style.background = bill === "monthly"
        ? "var(--accent-yellow)" : "transparent";
      monthly.style.color = bill === "monthly"
        ? "var(--near-black)" : "rgba(217,232,226,0.65)";
      monthly.setAttribute("aria-checked", bill === "monthly" ? "true" : "false");
    }
    if (annual) {
      annual.style.background = bill === "annual"
        ? "var(--accent-yellow)" : "transparent";
      annual.style.color = bill === "annual"
        ? "var(--near-black)" : "rgba(217,232,226,0.65)";
      annual.setAttribute("aria-checked", bill === "annual" ? "true" : "false");
    }
    // −20% badge: darker when annual is active (on yellow bg), orange when inactive
    if (badge) {
      badge.style.background = bill === "annual"
        ? "var(--near-black)" : "var(--orange)";
    }
  }

  // ── Mount: attach refs to server-rendered DOM, set initial prices ─────────
  useEffect(() => {
    // Price and label elements are in PricingSection (Server Component HTML)
    for (const tierId of TIER_ORDER) {
      priceEls.current[tierId] = document.getElementById(
        `price-text-${tierId}`,
      ) as HTMLSpanElement | null;
      labelEls.current[tierId] = document.getElementById(
        `billing-label-${tierId}`,
      ) as HTMLParagraphElement | null;
    }
    // Populate initial values (DOM ships empty from server — no hydration mismatch)
    updatePrices("monthly", "USD");
    updateToggleUI("monthly");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Change handlers ───────────────────────────────────────────────────────
  // Both handlers:
  //   1. Write new value to a ref (no re-render)
  //   2. Call the imperative updaters (pure DOM mutations)
  // Result: zero React renders fired on user interaction.

  function handleBillingChange(b: BillingKey): void {
    billing.current = b;
    updateToggleUI(b);
    updatePrices(b, currency.current);
  }

  function handleCurrencyChange(c: CurrencyKey): void {
    currency.current = c;
    updatePrices(billing.current, c);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Render — committed once, never re-rendered
  // Initial styles are set to "monthly active" defaults.
  // All subsequent visual changes go through updateToggleUI() above.
  // The <select> uses defaultValue (uncontrolled) — browser tracks its own
  // display value, no React state needed.
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="mb-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">

      {/* ── Billing toggle ──────────────────────────────────────────────── */}
      <div
        className="pricing-toggle flex rounded-xl p-1"
        role="group"
        aria-label="Select billing period"
      >
        {/* Monthly — initially active */}
        <button
          ref={monthlyBtnRef}
          type="button"
          role="radio"
          aria-checked="true"
          aria-label="Monthly billing"
          onClick={() => handleBillingChange("monthly")}
          className="pricing-toggle-btn rounded-lg px-5 py-2 text-sm font-semibold"
          style={{
            background: "var(--accent-yellow)",
            color:      "var(--near-black)",
            transition: "background 180ms ease-out, color 180ms ease-out",
          }}
        >
          Monthly
        </button>

        {/* Annual — initially inactive */}
        <button
          ref={annualBtnRef}
          type="button"
          role="radio"
          aria-checked="false"
          aria-label="Annual billing — save 20 percent"
          onClick={() => handleBillingChange("annual")}
          className="pricing-toggle-btn rounded-lg px-5 py-2 text-sm font-semibold"
          style={{
            background: "transparent",
            color:      "rgba(217,232,226,0.65)",
            transition: "background 180ms ease-out, color 180ms ease-out",
          }}
        >
          Annual
          <span
            ref={saveBadgeRef}
            className="ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
            aria-hidden="true"
            style={{
              background: "var(--orange)",   // initial: orange (annual not yet active)
              color:      "white",
              transition: "background 180ms ease-out",
            }}
          >
            −20%
          </span>
        </button>
      </div>

      {/* ── Currency selector (uncontrolled — no value prop) ────────────── */}
      <div className="relative">
        <label htmlFor="currency-select" className="sr-only">
          Display currency
        </label>
        <select
          id="currency-select"
          defaultValue="USD"
          onChange={(e) => handleCurrencyChange(e.target.value as CurrencyKey)}
          aria-label="Select display currency"
          className="pricing-currency-select appearance-none rounded-xl py-2 pl-4 pr-10 text-sm font-semibold"
          style={{
            background: "rgba(255,255,255,0.07)",
            border:     "1px solid rgba(255,255,255,0.12)",
            color:      "rgba(217,232,226,0.85)",
            cursor:     "pointer",
            transition: "border-color 180ms ease-out, background 180ms ease-out",
          }}
        >
          {(Object.keys(PRICING_MATRIX.currencies) as CurrencyKey[]).map((c) => (
            <option
              key={c}
              value={c}
              style={{ background: "var(--near-black)", color: "white" }}
            >
              {c} {PRICING_MATRIX.currencies[c].symbol}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs"
          aria-hidden="true"
          style={{ color: "rgba(217,232,226,0.50)" }}
        >
          ▾
        </span>
      </div>
    </div>
  );
}
