"use client";

/**
 * FeaturesSection.tsx — Bento Grid ↔ Accordion with Context Lock
 *
 * Icons used from Icons.tsx:
 *   chevron-down  → accordion header when panel is CLOSED
 *   chevron-up    → accordion header when panel is OPEN (swapped imperatively)
 *   cog-8-tooth   → "AI Transformations" feature card
 *   cube-16-solid → "Global Edge Infrastructure" feature card
 *   chart-pie     → "Analytics & Insights" feature card
 *   arrow-path    → "Real-time Data Sync" feature card
 *
 * Context Lock:
 *   lastHoveredRef tracks the last bento card hovered on desktop.
 *   matchMedia detects the 768px crossing moment.
 *   requestAnimationFrame + openPanelAt(lastHoveredRef.current) → 350ms WAAPI.
 */

import { useRef, useEffect } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CogIcon,
  CubeIcon,
  ChartPieIcon,
  ArrowPathIcon,
} from "@/app/components/Icons";

// Inline icon components for features without a provided SVG
function IconBolt({ size = 22 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconShield({ size = 22 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

// ─── Feature data ─────────────────────────────────────────────────────────────
type Feature = {
  id:          string;
  bentoClass:  string;
  Icon:        ({ size }: { size?: number }) => React.JSX.Element;
  accentBg:    string;
  title:       string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    id:          "pipelines",
    bentoClass:  "bento-pipelines",
    Icon:        IconBolt,
    accentBg:    "rgba(255,200,1,0.18)",
    title:       "Instant Pipelines",
    description:
      "Spin up AI-powered data pipelines in minutes, not months. Drag sources, connect transforms, and deploy to production with one click — no YAML, no boilerplate.",
  },
  {
    id:          "ai",
    bentoClass:  "bento-ai",
    Icon:        (props) => <CogIcon {...props} />,       // cog-8-tooth
    accentBg:    "rgba(255,153,50,0.18)",
    title:       "AI Transformations",
    description:
      "Let our LLM engine automatically clean, normalize, deduplicate, and enrich your data. Describe the output shape in plain English — the AI writes and validates the transform logic.",
  },
  {
    id:          "sync",
    bentoClass:  "bento-connectors",
    Icon:        (props) => <ArrowPathIcon {...props} />, // arrow-path
    accentBg:    "rgba(17,76,90,0.10)",
    title:       "Real-time Data Sync",
    description:
      "Bi-directional, sub-second data sync across 200+ sources. Changes propagate the moment they happen — no polling loops, no batch delays, no drift.",
  },
  {
    id:          "analytics",
    bentoClass:  "bento-observability",
    Icon:        (props) => <ChartPieIcon {...props} />,  // chart-pie
    accentBg:    "rgba(217,232,226,0.80)",
    title:       "Analytics & Insights",
    description:
      "Live pipeline health dashboards, row-level data quality scoring, and visual breakdowns of every dimension — see exactly where data flows and where it stalls.",
  },
  {
    id:          "security",
    bentoClass:  "bento-security",
    Icon:        IconShield,
    accentBg:    "rgba(255,200,1,0.12)",
    title:       "Enterprise Security",
    description:
      "SOC 2 Type II certified, HIPAA-ready, end-to-end encryption in transit and at rest. RBAC, SSO, SCIM, and full audit logs on every plan.",
  },
  {
    id:          "infra",
    bentoClass:  "bento-infra",
    Icon:        (props) => <CubeIcon {...props} />,      // cube-16-solid
    accentBg:    "rgba(17,76,90,0.08)",
    title:       "Global Edge Infrastructure",
    description:
      "40+ PoPs. Process data where it lives — 60% lower cross-region latency and automatic data residency compliance across EU, US, and APAC.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /** Context Lock — last bento card hovered on desktop. Ref, not state. */
  const lastHoveredRef = useRef<number>(-1);
  /** Which accordion item is open (-1 = none) */
  const openIndexRef   = useRef<number>(-1);

  // Per-panel div refs (WAAPI animated)
  const panelRefs      = useRef<(HTMLDivElement   | null)[]>([]);
  // Per-header button refs (aria-expanded)
  const headerRefs     = useRef<(HTMLButtonElement | null)[]>([]);
  // Per-chevron-down spans (shown when panel closed)
  const chevronDownRefs = useRef<(HTMLSpanElement  | null)[]>([]);
  // Per-chevron-up spans (shown when panel open)
  const chevronUpRefs   = useRef<(HTMLSpanElement  | null)[]>([]);
  // Running animations
  const animRefs        = useRef<(Animation        | null)[]>([]);

  // ── Accordion API ─────────────────────────────────────────────────────────

  function closePanelAt(index: number, animate = true): void {
    const panel = panelRefs.current[index];
    const header = headerRefs.current[index];
    const dn = chevronDownRefs.current[index];
    const up = chevronUpRefs.current[index];
    if (!panel) return;

    header?.setAttribute("aria-expanded", "false");
    // Swap: show chevron-down, hide chevron-up
    if (dn) dn.style.display = "flex";
    if (up) up.style.display = "none";

    const currentH = parseFloat(getComputedStyle(panel).height) || 0;
    animRefs.current[index]?.cancel();

    if (animate && currentH > 0) {
      const anim = panel.animate(
        [{ height: `${currentH}px`, opacity: "1" },
         { height: "0px",           opacity: "0" }],
        { duration: 350, easing: "ease-in-out", fill: "forwards" },
      );
      animRefs.current[index] = anim;
    } else {
      panel.style.height  = "0px";
      panel.style.opacity = "0";
    }

    if (openIndexRef.current === index) openIndexRef.current = -1;
  }

  function openPanelAt(index: number, animate = true): void {
    if (openIndexRef.current >= 0 && openIndexRef.current !== index) {
      closePanelAt(openIndexRef.current, animate);
    }

    const panel  = panelRefs.current[index];
    const header = headerRefs.current[index];
    const dn     = chevronDownRefs.current[index];
    const up     = chevronUpRefs.current[index];
    if (!panel) return;

    openIndexRef.current = index;
    header?.setAttribute("aria-expanded", "true");
    // Swap: hide chevron-down, show chevron-up
    if (dn) dn.style.display = "none";
    if (up) up.style.display = "flex";

    panel.style.height   = "0px";
    panel.style.overflow = "hidden";
    const targetH = panel.scrollHeight;

    animRefs.current[index]?.cancel();

    if (animate) {
      const anim = panel.animate(
        [{ height: "0px",           opacity: "0" },
         { height: `${targetH}px`, opacity: "1" }],
        { duration: 350, easing: "ease-in-out", fill: "forwards" },
      );
      animRefs.current[index] = anim;
    } else {
      panel.style.height  = `${targetH}px`;
      panel.style.opacity = "1";
    }
  }

  function handleAccordionToggle(index: number): void {
    if (openIndexRef.current === index) {
      closePanelAt(index);
    } else {
      openPanelAt(index);
    }
  }

  // ── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    // Init accordion panels closed
    panelRefs.current.forEach((panel) => {
      if (panel) {
        panel.style.height   = "0px";
        panel.style.overflow = "hidden";
        panel.style.opacity  = "0";
      }
    });
    // Init chevron-up hidden (chevron-down is the default visible state)
    chevronUpRefs.current.forEach((el) => {
      if (el) el.style.display = "none";
    });

    // Entrance animation when section scrolls into view
    const section = sectionRef.current;
    if (section) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            section.classList.add("features-visible");
            io.disconnect();
          }
        },
        { threshold: 0.08 },
      );
      io.observe(section);
    }

    // ── CONTEXT LOCK ────────────────────────────────────────────────────────
    const mql = window.matchMedia("(max-width: 767px)");

    function handleBreakpoint(e: MediaQueryListEvent | MediaQueryList): void {
      if (e.matches) {
        // Desktop → Mobile: transfer last hovered card to accordion
        const target = lastHoveredRef.current >= 0 ? lastHoveredRef.current : 0;
        requestAnimationFrame(() => openPanelAt(target, true));
      } else {
        // Mobile → Desktop: close all (CSS hides accordion anyway)
        for (let i = 0; i < FEATURES.length; i++) closePanelAt(i, false);
        openIndexRef.current = -1;
      }
    }

    mql.addEventListener("change", handleBreakpoint);
    if (mql.matches) requestAnimationFrame(() => openPanelAt(0, false));

    return () => mql.removeEventListener("change", handleBreakpoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="features"
      aria-labelledby="features-heading"
      className="px-6 py-24"
      style={{ background: "var(--bg-light)" }}
    >
      <div className="mx-auto max-w-7xl">

        <header className="mb-14 text-center">
          <h2
            id="features-heading"
            className="mb-4 text-4xl font-extrabold md:text-5xl"
            style={{ color: "var(--near-black)" }}
          >
            Everything your data team needs
          </h2>
          <p
            className="mx-auto max-w-xl text-base"
            style={{ color: "rgba(23,43,54,0.65)" }}
          >
            One platform, zero infrastructure headaches. NexaFlow replaces your
            patchwork of scripts and cron jobs with intelligent, self-healing pipelines.
          </p>
        </header>

        {/* ── Bento Grid — desktop ≥768px ─── Tailwind `hidden md:grid` */}
        <div className="bento-grid hidden md:grid" role="list" aria-label="Feature highlights">
          {FEATURES.map((feat, index) => (
            <div
              key={feat.id}
              role="listitem"
              className={`bento-card ${feat.bentoClass}`}
              onMouseEnter={() => { lastHoveredRef.current = index; }}
              aria-label={feat.title}
            >
              <span
                className="feat-icon-badge mb-4"
                aria-hidden="true"
                style={{ background: feat.accentBg, color: "var(--dark-navy)" }}
              >
                <feat.Icon size={22} />
              </span>
              <h3
                className="mb-2 text-lg font-bold leading-tight"
                style={{ color: "var(--near-black)", fontFamily: "var(--font-mono)" }}
              >
                {feat.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(23,43,54,0.65)" }}
              >
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Accordion — mobile <768px ─── Tailwind `flex flex-col md:hidden` */}
        <div className="flex flex-col gap-2 md:hidden" role="list" aria-label="Feature highlights">
          {FEATURES.map((feat, index) => (
            <div key={`acc-${feat.id}`} role="listitem" className="accordion-item">

              <button
                ref={(el) => { headerRefs.current[index] = el; }}
                type="button"
                id={`feat-btn-${feat.id}`}
                aria-expanded="false"
                aria-controls={`feat-panel-${feat.id}`}
                onClick={() => handleAccordionToggle(index)}
                className="accordion-btn"
              >
                <span className="flex items-center gap-3">
                  <span
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    aria-hidden="true"
                    style={{ background: feat.accentBg, color: "var(--dark-navy)" }}
                  >
                    <feat.Icon size={16} />
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "var(--near-black)" }}>
                    {feat.title}
                  </span>
                </span>

                {/*
                  Chevron indicator: two spans, only one visible at a time.
                  - chevronDown shown → panel closed (default)
                  - chevronUp  shown → panel open
                  Swapped imperatively in openPanelAt / closePanelAt — zero useState.
                */}
                <span className="flex items-center" aria-hidden="true">
                  {/* chevron-down — closed state */}
                  <span
                    ref={(el) => { chevronDownRefs.current[index] = el; }}
                    className="accordion-chevron"
                    style={{ color: "var(--dark-navy)" }}
                  >
                    <ChevronDownIcon size={20} />
                  </span>
                  {/* chevron-up — open state (initially hidden) */}
                  <span
                    ref={(el) => { chevronUpRefs.current[index] = el; }}
                    className="accordion-chevron"
                    style={{ color: "var(--dark-navy)" }}
                  >
                    <ChevronUpIcon size={20} />
                  </span>
                </span>
              </button>

              <div
                ref={(el) => { panelRefs.current[index] = el; }}
                id={`feat-panel-${feat.id}`}
                role="region"
                aria-labelledby={`feat-btn-${feat.id}`}
                className="accordion-panel"
              >
                <p className="accordion-desc">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
