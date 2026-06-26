import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Footer from "@/app/components/Footer";
import PricingSection from "@/app/components/PricingSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import StatsStrip from "@/app/components/StatsStrip";
import TestimonialsCarousel from "@/app/components/TestimonialsCarousel";

export const metadata: Metadata = {
  title: "NexaFlow — AI Data Automation Platform",
  description:
    "NexaFlow automates your data workflows with AI-powered pipelines. Connect, transform, and ship data faster than ever — no code required.",
};

// ─── Feature cards data lives in FeaturesSection component ───────────────────

// ─── Pricing data lives in PricingSection's PRICING_MATRIX constant ──────────
// (removed from here — no hardcoded prices anywhere in page.tsx)

// ─── Testimonials data lives in TestimonialsCarousel component ────────────────

// ─────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Main content ───────────────────────────────────────────────── */}
      <main aria-label="Main content">
        {/* ── Hero ────────────────────────────────────────────────── */}
        <Hero />

        {/* ── Stats strip (arrow-trending-up) ─────────────────────────────── */}
        <StatsStrip />

        {/* ── Features — Bento Grid ↔ Accordion with Context Lock ─────── */}
        <FeaturesSection />

        {/* ── Pricing — fully managed by PricingSection (matrix + refs) ────── */}
        <PricingSection />

        {/* ── Testimonials carousel (chevron-left/right + link-solid) ────── */}
        <TestimonialsCarousel />
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
