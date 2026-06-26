import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

// ─── JetBrains Mono — monospaced, technical feel ─────────────────────────
// Used for: headers, pricing numbers, nav logo
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// ─── Inter — clean humanist sans-serif ────────────────────────────────────
// Used for: body text, UI elements, labels, captions
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// ─── metadataBase is required for Next.js to resolve absolute OG image URLs ─
// Without it Next.js emits a warning and social-sharing previews break.
export const metadata: Metadata = {
  metadataBase: new URL("https://nexaflow.io"),

  // ── Primary tags ────────────────────────────────────────────────────────
  title: {
    default: "NexaFlow — AI Data Automation Platform",
    // Pages can override: title: { template: "%s | NexaFlow" }
    template: "%s | NexaFlow",
  },
  description:
    "NexaFlow automates every step of your data workflow — ingestion, transformation, enrichment, and delivery. No-code AI pipelines for modern engineering teams.",
  keywords: [
    "AI data automation",
    "data pipeline platform",
    "no-code ETL",
    "data integration SaaS",
    "AI workflow automation",
    "NexaFlow",
    "data engineering tool",
    "LLM data transformation",
  ],

  // ── Canonical & robots ─────────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ──────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: "https://nexaflow.io",
    siteName: "NexaFlow",
    title: "NexaFlow — AI Data Automation Platform",
    description:
      "Ship data pipelines 10× faster with AI. NexaFlow connects any source, applies AI transformations, and delivers clean data — in minutes, not months.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",           // 1200×630 — add to /public when ready
        width: 1200,
        height: 630,
        alt: "NexaFlow dashboard showing an AI-powered data pipeline connecting multiple data sources",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X card ───────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@nexaflow",
    creator: "@nexaflow",
    title: "NexaFlow — AI Data Automation Platform",
    description:
      "Ship data pipelines 10× faster with AI. No-code data workflows for modern engineering teams.",
    images: [
      {
        url: "/og-image.png",
        alt: "NexaFlow dashboard showing an AI-powered data pipeline",
      },
    ],
  },

  // ── App / PWA hints ────────────────────────────────────────────────────
  applicationName: "NexaFlow",
  authors: [{ name: "NexaFlow, Inc.", url: "https://nexaflow.io" }],
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
