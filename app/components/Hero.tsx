// Hero.tsx — Server component (no interactivity needed)

// ─── Logos of companies that "trust" NexaFlow ────────────────────────────
const trustBadges = [
  "Amplitude",
  "FinScout",
  "Notion",
  "Datadog",
  "Vercel",
];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden px-6 py-28 text-center sm:py-36"
      style={{ background: "var(--dark-navy)" }}
    >
      {/* ── Layered background atmosphere ───────────────────────────────── */}
      {/* Radial gradient overlay for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,153,50,0.13) 0%, transparent 70%)",
        }}
      />
      {/* Accent blob — top left */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: "var(--orange)", opacity: 0.08 }}
      />
      {/* Accent blob — bottom right */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full blur-3xl"
        style={{ background: "var(--accent-yellow)", opacity: 0.07 }}
      />
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--mint) 1px, transparent 1px), linear-gradient(90deg, var(--mint) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-4xl">
        {/* Public beta pill */}
        <p
          className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5
                     text-xs font-semibold uppercase tracking-widest"
          style={{
            borderColor: "rgba(217,232,226,0.25)",
            background: "rgba(255,255,255,0.06)",
            color: "var(--mint)",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="5" cy="5" r="4" fill="var(--accent-yellow)" />
          </svg>
          Now in public beta
        </p>

        {/* ── Main headline ─── */}
        <h1
          id="hero-heading"
          className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white
                     sm:text-6xl md:text-7xl"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Ship data pipelines
          <br />
          <span style={{ color: "var(--accent-yellow)" }}>10× faster</span>
          {" "}with AI
        </h1>

        {/* ── Sub-heading (Inter) ─── */}
        <p
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed sm:text-xl"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(217,232,226,0.82)", // --mint at 82% opacity
          }}
        >
          NexaFlow automates every step of your data workflow — ingestion,
          transformation, enrichment, and delivery. Describe what you need
          in plain English. Our AI handles the rest.
        </p>

        {/* ── CTA pair ─── */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Primary — filled accent-yellow, dark text for contrast */}
          <a
            href="#"
            id="hero-primary-cta"
            className="group relative w-full overflow-hidden rounded-xl px-8 py-4 text-base
                       font-bold transition-all duration-300 hover:shadow-[0_0_32px_0_rgba(255,200,1,0.35)]
                       sm:w-auto"
            style={{
              background: "var(--accent-yellow)",
              color: "var(--near-black)",
            }}
          >
            {/* Shimmer on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20
                         transition-transform duration-500 group-hover:translate-x-full"
            />
            <span className="relative">Start for free — no card needed →</span>
          </a>

          {/* Secondary — outline, white text */}
          <a
            href="#features"
            id="hero-secondary-cta"
            className="w-full rounded-xl border px-8 py-4 text-base font-semibold
                       transition-all duration-200 hover:bg-white/10 sm:w-auto"
            style={{
              borderColor: "rgba(255,255,255,0.22)",
              color: "white",
            }}
          >
            See how it works ↓
          </a>
        </div>

        {/* ── Social proof strip ─── */}
        <div className="mt-14">
          <p
            className="mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(217,232,226,0.45)" }}
          >
            Trusted by engineering teams at
          </p>
          <ul
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            role="list"
          >
            {trustBadges.map((name) => (
              <li
                key={name}
                className="text-sm font-bold tracking-wide transition-opacity duration-200 hover:opacity-100"
                style={{
                  color: "rgba(217,232,226,0.40)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
