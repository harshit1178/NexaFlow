// Footer.tsx — Server Component (hovers are handled by pure CSS in globals.css)

const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "Features",      href: "#features" },
      { label: "Pricing",       href: "#pricing"  },
      { label: "Changelog",     href: "#"         },
      { label: "Roadmap",       href: "#"         },
      { label: "Status",        href: "#"         },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",    href: "#" },
      { label: "Blog",     href: "#" },
      { label: "Careers",  href: "#" },
      { label: "Press",    href: "#" },
      { label: "Contact",  href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy",    href: "#" },
      { label: "Terms of Service",  href: "#" },
      { label: "Cookie Policy",     href: "#" },
      { label: "DPA",               href: "#" },
    ],
  },
];

// Social icons — all SVG, no image files needed
const socialLinks = [
  {
    label: "NexaFlow on Twitter / X",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "NexaFlow on GitHub",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "NexaFlow on LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      style={{ background: "var(--near-black)", color: "var(--mint)" }}
    >
      {/* ── Main footer body ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">

          {/* ── Brand column ─── */}
          <div className="flex flex-col gap-4">
            {/* Logo — light text on dark bg (correct contrast) */}
            <a
              href="/"
              aria-label="NexaFlow — go to homepage"
              className="w-fit text-2xl font-extrabold tracking-tight transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-mono)", color: "white" }}
            >
              Nexa<span style={{ color: "var(--orange)" }}>Flow</span>
            </a>

            {/* Tagline — muted mint on near-black (readable) */}
            <p
              className="max-w-xs text-sm leading-relaxed"
              style={{ color: "rgba(217,232,226,0.60)" }}
            >
              AI-native data automation for modern engineering teams.
              Connect any source, ship anywhere — in minutes.
            </p>

            {/* Social icon row — CSS hover via .footer-social in globals.css */}
            <ul className="mt-2 flex items-center gap-3" role="list">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="footer-social flex h-9 w-9 items-center justify-center rounded-lg"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Link columns ─── */}
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={`${col.heading} links`}>
              {/* Column heading — white on near-black */}
              <h2
                className="mb-5 text-xs font-bold uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)", color: "white" }}
              >
                {col.heading}
              </h2>

              <ul className="flex flex-col gap-3" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {/* .footer-link hover handled by CSS in globals.css */}
                    <a
                      href={link.href}
                      className="footer-link text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(217,232,226,0.10)" }}
      >
        <div
          className="mx-auto flex max-w-7xl flex-col items-center justify-between
                     gap-3 px-6 py-6 sm:flex-row"
        >
          {/* Copyright — low-contrast decorative text (not primary content) */}
          <p
            className="text-xs"
            style={{ color: "rgba(217,232,226,0.35)" }}
          >
            © {currentYear} NexaFlow, Inc. All rights reserved.
          </p>

          <p
            className="text-xs"
            style={{ color: "rgba(217,232,226,0.30)" }}
          >
            Built with{" "}
            <span style={{ color: "var(--orange)" }} aria-label="love">
              ♥
            </span>{" "}
            for data teams everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
