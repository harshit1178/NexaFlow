"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#features",     label: "Features"     },
  { href: "#pricing",      label: "Pricing"      },
  { href: "#testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a subtle shadow when the page has been scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when any nav link is clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_2px_24px_0_rgba(17,76,90,0.10)]"
          : "shadow-none"
      }`}
      style={{ background: "var(--bg-light)", borderBottom: "1px solid var(--mint)" }}
    >
      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        {/* Brand logo */}
        <a
          href="/"
          aria-label="NexaFlow — go to homepage"
          className="shrink-0 text-2xl font-extrabold tracking-tight transition-opacity duration-200 hover:opacity-80"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--dark-navy)",
          }}
        >
          Nexa<span style={{ color: "var(--orange)" }}>Flow</span>
        </a>

        {/* Desktop: center links */}
        <ul
          className="hidden items-center gap-8 md:flex"
          role="list"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link text-sm font-medium transition-colors duration-200"
                style={{ color: "var(--near-black)" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop: CTA button */}
        <a
          href="#"
          id="nav-cta"
          className="hidden shrink-0 rounded-lg px-5 py-2.5 text-sm font-bold
                     transition-all duration-200 hover:brightness-105 hover:shadow-md
                     md:inline-flex md:items-center md:gap-1.5"
          style={{
            background: "var(--accent-yellow)",
            color: "var(--near-black)",
          }}
        >
          Get Started
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="mt-px"
          >
            <path
              d="M2.5 7h9m-4-4.5 4.5 4.5L7.5 11.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Mobile: hamburger button */}
        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg
                     transition-colors duration-200 hover:bg-black/5 md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {/* Animated hamburger → X icon using pure CSS transforms */}
          <span
            className="block h-0.5 w-5 rounded-full transition-all duration-300 ease-in-out"
            style={{
              background: "var(--near-black)",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : undefined,
            }}
          />
          <span
            className="block h-0.5 w-5 rounded-full transition-all duration-200 ease-in-out"
            style={{
              background: "var(--near-black)",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scaleX(0)" : undefined,
            }}
          />
          <span
            className="block h-0.5 w-5 rounded-full transition-all duration-300 ease-in-out"
            style={{
              background: "var(--near-black)",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : undefined,
            }}
          />
        </button>
      </nav>

      {/* ── Mobile drop-down menu ──────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="region"
        aria-label="Mobile navigation"
        className="overflow-hidden transition-all duration-300 ease-in-out md:hidden"
        style={{
          maxHeight: menuOpen ? "280px" : "0px",
          borderTop: menuOpen ? `1px solid var(--mint)` : "none",
          background: "var(--bg-light)",
        }}
      >
        <ul className="flex flex-col px-6 py-4" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="flex items-center gap-2 border-b py-3 text-base font-medium
                           transition-colors duration-200 last:border-0"
                style={{
                  color: "var(--near-black)",
                  borderColor: "var(--mint)",
                }}
              >
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ background: "var(--orange)" }}
                  aria-hidden="true"
                />
                {link.label}
              </a>
            </li>
          ))}

          {/* Mobile CTA */}
          <li className="pt-4 pb-2">
            <a
              href="#"
              onClick={closeMenu}
              id="nav-cta-mobile"
              className="flex w-full items-center justify-center gap-2 rounded-lg
                         px-5 py-3 text-sm font-bold transition-all duration-200
                         hover:brightness-105"
              style={{
                background: "var(--accent-yellow)",
                color: "var(--near-black)",
              }}
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
