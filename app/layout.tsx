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

export const metadata: Metadata = {
  title: "NexaFlow — AI Data Automation Platform",
  description:
    "NexaFlow automates your data workflows with AI-powered pipelines. Connect, transform, and ship data faster than ever — no code required.",
  keywords: [
    "AI automation",
    "data pipeline",
    "SaaS",
    "no-code",
    "NexaFlow",
    "data integration",
  ],
  openGraph: {
    title: "NexaFlow — AI Data Automation Platform",
    description:
      "NexaFlow automates your data workflows with AI-powered pipelines.",
    type: "website",
  },
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
