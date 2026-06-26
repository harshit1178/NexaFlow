// StatsStrip.tsx — Server Component
// Uses arrow-trending-up icon for the growth metric stat.

import { ArrowTrendingUpIcon } from "@/app/components/Icons";

const stats = [
  {
    value: "10M+",
    label: "Records synced daily",
    Icon: ArrowTrendingUpIcon, // arrow-trending-up — growth metric
    accentBg: "rgba(255,200,1,0.15)",
  },
  {
    value: "99.97%",
    label: "Pipeline uptime SLA",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={22} height={22}>
        <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    accentBg: "rgba(17,76,90,0.10)",
  },
  {
    value: "200+",
    label: "Native connectors",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={22} height={22}>
        <path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    accentBg: "rgba(255,153,50,0.15)",
  },
  {
    value: "< 2 min",
    label: "Time to first pipeline",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={22} height={22}>
        <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    accentBg: "rgba(217,232,226,0.80)",
  },
];

export default function StatsStrip() {
  return (
    <section
      aria-label="NexaFlow platform statistics"
      className="border-y px-6 py-12"
      style={{
        background:   "white",
        borderColor:  "var(--mint)",
      }}
    >
      <ul
        className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4"
        role="list"
      >
        {stats.map((stat, i) => (
          <li
            key={i}
            className="flex flex-col items-center gap-3 text-center"
          >
            {/* Icon badge */}
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
              aria-hidden="true"
              style={{ background: stat.accentBg, color: "var(--dark-navy)" }}
            >
              {stat.Icon ? (
                <stat.Icon size={22} />
              ) : (
                stat.icon
              )}
            </span>

            {/* Metric value */}
            <p
              className="text-3xl font-extrabold leading-none"
              style={{ fontFamily: "var(--font-mono)", color: "var(--near-black)" }}
            >
              {stat.value}
            </p>

            {/* Label */}
            <p
              className="text-xs font-medium"
              style={{ color: "rgba(23,43,54,0.55)" }}
            >
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
