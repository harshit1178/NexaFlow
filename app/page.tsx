import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "NexaFlow — AI Data Automation Platform",
  description:
    "NexaFlow automates your data workflows with AI-powered pipelines. Connect, transform, and ship data faster than ever — no code required.",
};

// ─── Feature cards ────────────────────────────────────────────────────────
const features = [
  {
    emoji: "⚡",
    title: "Instant Pipelines",
    description:
      "Spin up AI-powered data pipelines in minutes, not months. Drag, connect, deploy.",
  },
  {
    emoji: "🔗",
    title: "Universal Connectors",
    description:
      "200+ native integrations — databases, APIs, cloud stores, and everything in between.",
  },
  {
    emoji: "🤖",
    title: "AI Transformations",
    description:
      "Let our LLM engine clean, normalize, and enrich your data automatically.",
  },
  {
    emoji: "📊",
    title: "Real-time Observability",
    description:
      "Live dashboards and alerting so you know the moment something shifts.",
  },
  {
    emoji: "🔒",
    title: "Enterprise Security",
    description:
      "SOC 2 Type II, HIPAA-ready, and end-to-end encryption baked into every pipeline.",
  },
  {
    emoji: "🌍",
    title: "Global Edge Network",
    description:
      "Process data where it lives — reduce latency and stay compliant across regions.",
  },
];

// ─── Pricing tiers ────────────────────────────────────────────────────────
const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever free",
    highlight: false,
    features: [
      "5 active pipelines",
      "500k events / month",
      "Community connectors",
      "Email support",
    ],
    cta: "Get started",
    ctaHref: "#",
  },
  {
    name: "Growth",
    price: "$79",
    cadence: "per month",
    highlight: true,
    features: [
      "Unlimited pipelines",
      "10M events / month",
      "200+ premium connectors",
      "AI transformations",
      "Priority support",
    ],
    cta: "Start free trial",
    ctaHref: "#",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "contact us",
    highlight: false,
    features: [
      "Everything in Growth",
      "Dedicated infrastructure",
      "SSO & SCIM",
      "SLA & compliance pack",
      "Dedicated CSM",
    ],
    cta: "Talk to sales",
    ctaHref: "#",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "NexaFlow cut our ETL maintenance time by 80%. Our data team finally has time to do actual analysis.",
    name: "Sarah Chen",
    role: "Head of Data · Amplitude",
    initials: "SC",
  },
  {
    quote:
      "The AI transformation layer is mind-blowing. It figured out our messy schema on the first try.",
    name: "Marcus Rivera",
    role: "CTO · FinScout",
    initials: "MR",
  },
  {
    quote:
      "We went from prototype to production pipeline in under an afternoon. Absolutely game-changing.",
    name: "Priya Mehta",
    role: "Staff Eng. · Notion",
    initials: "PM",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Main content ───────────────────────────────────────────────── */}
      <main>
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <Hero />

        {/* ── Features ────────────────────────────────────────────────── */}
        <section
          id="features"
          aria-labelledby="features-heading"
          className="px-6 py-24"
          style={{ background: "var(--bg-light)" }}
        >
          <div className="mx-auto max-w-7xl">
            <header className="mb-16 text-center">
              <h2
                id="features-heading"
                className="mb-4 text-4xl font-extrabold md:text-5xl"
                style={{ color: "var(--near-black)" }}
              >
                Everything your data team needs
              </h2>
              <p
                className="mx-auto max-w-xl"
                style={{ color: "rgba(23,43,54,0.65)" }}
              >
                One platform, zero infrastructure headaches. NexaFlow replaces
                your patchwork of scripts and cron jobs with intelligent,
                self-healing pipelines.
              </p>
            </header>

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {features.map((feature) => (
                <li
                  key={feature.title}
                  className="group rounded-2xl border p-8 shadow-sm
                             transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    borderColor: "var(--mint)",
                    background: "white",
                  }}
                >
                  <span
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center
                               rounded-xl text-2xl"
                    aria-hidden="true"
                    style={{ background: "var(--mint)" }}
                  >
                    {feature.emoji}
                  </span>
                  <h3
                    className="mb-2 text-lg font-bold"
                    style={{ color: "var(--near-black)" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(23,43,54,0.65)" }}
                  >
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Pricing ─────────────────────────────────────────────────── */}
        <section
          id="pricing"
          aria-labelledby="pricing-heading"
          className="px-6 py-24"
          style={{ background: "var(--near-black)" }}
        >
          <div className="mx-auto max-w-6xl">
            <header className="mb-16 text-center">
              <h2
                id="pricing-heading"
                className="mb-4 text-4xl font-extrabold md:text-5xl"
                style={{ color: "white" }}
              >
                Simple, transparent pricing
              </h2>
              <p style={{ color: "rgba(217,232,226,0.65)" }}>
                No surprise overages. Cancel any time.
              </p>
            </header>

            <ul className="grid gap-8 md:grid-cols-3" role="list">
              {pricingPlans.map((plan) => (
                <li
                  key={plan.name}
                  className="relative flex flex-col rounded-2xl p-8"
                  style={{
                    background: plan.highlight
                      ? "var(--dark-navy)"
                      : "rgba(255,255,255,0.05)",
                    outline: plan.highlight
                      ? "2px solid var(--accent-yellow)"
                      : "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  {plan.highlight && (
                    <span
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full
                                 px-4 py-1 text-xs font-bold"
                      aria-label="Recommended plan"
                      style={{
                        background: "var(--accent-yellow)",
                        color: "var(--near-black)",
                      }}
                    >
                      Most popular
                    </span>
                  )}

                  <h3
                    className="mb-2 text-xl font-bold"
                    style={{
                      color: plan.highlight ? "white" : "var(--mint)",
                    }}
                  >
                    {plan.name}
                  </h3>

                  <p
                    className="mb-1 text-5xl font-extrabold tracking-tight"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: plan.highlight
                        ? "var(--accent-yellow)"
                        : "white",
                    }}
                  >
                    {plan.price}
                  </p>
                  <p
                    className="mb-8 text-sm"
                    style={{ color: "rgba(217,232,226,0.50)" }}
                  >
                    {plan.cadence}
                  </p>

                  <ul className="mb-8 flex-1 space-y-3" role="list">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "rgba(217,232,226,0.75)" }}
                      >
                        <span
                          className="mt-0.5"
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
                    href={plan.ctaHref}
                    id={`pricing-cta-${plan.name.toLowerCase()}`}
                    className="block rounded-xl px-6 py-3 text-center text-sm font-bold
                               transition-all duration-200 hover:brightness-110"
                    style={
                      plan.highlight
                        ? {
                            background: "var(--accent-yellow)",
                            color: "var(--near-black)",
                          }
                        : {
                            background: "rgba(255,255,255,0.10)",
                            color: "white",
                          }
                    }
                  >
                    {plan.cta}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Testimonials ────────────────────────────────────────────── */}
        <section
          id="testimonials"
          aria-labelledby="testimonials-heading"
          className="px-6 py-24"
          style={{ background: "var(--mint)" }}
        >
          <div className="mx-auto max-w-6xl">
            <header className="mb-16 text-center">
              <h2
                id="testimonials-heading"
                className="mb-4 text-4xl font-extrabold md:text-5xl"
                style={{ color: "var(--near-black)" }}
              >
                Loved by data teams
              </h2>
              <p style={{ color: "rgba(23,43,54,0.65)" }}>
                Real results from real engineering teams.
              </p>
            </header>

            <ul className="grid gap-8 md:grid-cols-3" role="list">
              {testimonials.map((t) => (
                <li
                  key={t.name}
                  className="flex flex-col rounded-2xl p-8 shadow-sm"
                  style={{ background: "white" }}
                >
                  <blockquote className="mb-6 flex-1">
                    <p
                      className="text-base leading-relaxed before:content-['\u201c'] after:content-['\u201d']"
                      style={{ color: "rgba(23,43,54,0.75)" }}
                    >
                      {t.quote}
                    </p>
                  </blockquote>
                  <footer className="flex items-center gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center
                                 rounded-full text-sm font-bold"
                      aria-hidden="true"
                      style={{
                        background: "var(--dark-navy)",
                        color: "white",
                      }}
                    >
                      {t.initials}
                    </span>
                    <div>
                      <cite
                        className="block text-sm font-semibold not-italic"
                        style={{ color: "var(--near-black)" }}
                      >
                        {t.name}
                      </cite>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(23,43,54,0.55)" }}
                      >
                        {t.role}
                      </span>
                    </div>
                  </footer>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
