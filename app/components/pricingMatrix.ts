/**
 * pricingMatrix.ts — pure data/logic, no React
 *
 * Single source of truth imported by both:
 *   PricingSection.tsx  (Server Component — renders card shells)
 *   PricingControls.tsx (Client Component — handles interactivity)
 *
 * Formula: finalPrice = baseRate × billingMultiplier × currencyRate × (1 + tariffRate)
 */

// ─── Matrix ────────────────────────────────────────────────────────────────────
export const PRICING_MATRIX = {
  tiers: {
    starter: {
      name:      "Starter",
      baseRate:  0,
      tagline:   "For solo builders getting their first pipelines running.",
      highlight: false,
      features:  [
        "5 active pipelines",
        "500k events / month",
        "Community connectors",
        "Basic pipeline monitoring",
        "Email support",
      ],
      cta: "Get started free",
    },
    pro: {
      name:      "Pro",
      baseRate:  79,          // USD per billing-period unit
      tagline:   "For growing teams that need scale and AI automation.",
      highlight: true,
      features:  [
        "Unlimited pipelines",
        "10M events / month",
        "200+ premium connectors",
        "AI transformations",
        "Advanced observability",
        "Priority support",
      ],
      cta: "Start free trial",
    },
    enterprise: {
      name:      "Enterprise",
      baseRate:  299,         // USD per billing-period unit — starting rate
      tagline:   "For large orgs with compliance, SLAs, and dedicated infra.",
      highlight: false,
      features:  [
        "Everything in Pro",
        "Dedicated infrastructure",
        "SSO & SCIM provisioning",
        "SLA & compliance pack",
        "Custom connectors",
        "Dedicated CSM",
      ],
      cta: "Talk to sales",
    },
  },

  /**
   * Billing multipliers
   *   monthly : 1       → displayed as "per month"
   *   annual  : 12×0.8  → displayed as "per year, billed annually" (20% off)
   */
  billing: {
    monthly: 1,
    annual:  12 * 0.8,   // = 9.6
  },

  /**
   * Currency — TWO independent variables per region:
   *   rate   : FX rate against USD base (pure exchange arithmetic)
   *   tariff : Regional processing adjustment, completely separate from FX
   *            INR 0%  — domestic market, no international processing fee
   *            USD 5%  — international payment processing surcharge
   *            EUR 7%  — VAT-inclusive regional adjustment
   */
  currencies: {
    USD: { symbol: "$", label: "USD — US Dollar",    rate: 1,     tariff: 0.05 },
    INR: { symbol: "₹", label: "INR — Indian Rupee", rate: 83.5,  tariff: 0.00 },
    EUR: { symbol: "€", label: "EUR — Euro",          rate: 0.92,  tariff: 0.07 },
  },
} as const;

// ─── Derived types ─────────────────────────────────────────────────────────────
export type BillingKey  = keyof typeof PRICING_MATRIX.billing;
export type CurrencyKey = keyof typeof PRICING_MATRIX.currencies;
export type TierKey     = keyof typeof PRICING_MATRIX.tiers;

export const TIER_ORDER: TierKey[] = ["starter", "pro", "enterprise"];

// ─── Pure helpers ──────────────────────────────────────────────────────────────

/** finalPrice = baseRate × billingMultiplier × currencyRate × (1 + tariffRate) */
export function computePrice(
  tierId:   TierKey,
  billing:  BillingKey,
  currency: CurrencyKey,
): number {
  const { baseRate }      = PRICING_MATRIX.tiers[tierId];
  const billingMultiplier = PRICING_MATRIX.billing[billing];
  const { rate, tariff }  = PRICING_MATRIX.currencies[currency];
  return baseRate * billingMultiplier * rate * (1 + tariff);
}

/** Locale-aware price formatter — respects INR lakh/crore grouping. */
export function formatPrice(amount: number, currency: CurrencyKey): string {
  const { symbol } = PRICING_MATRIX.currencies[currency];
  if (amount === 0) return `${symbol}0`;
  const locale = currency === "INR" ? "en-IN" : "en-US";
  return `${symbol}${Math.round(amount).toLocaleString(locale)}`;
}

/** Sub-label below the price number. */
export function cadenceText(tierId: TierKey, billing: BillingKey): string {
  if (PRICING_MATRIX.tiers[tierId].baseRate === 0) return "forever free";
  return billing === "monthly" ? "per month" : "per year, billed annually";
}
