"use client";

/**
 * TestimonialsCarousel.tsx
 *
 * Icons used:
 *   chevron-left  → previous slide button
 *   chevron-right → next slide button
 *   link-solid    → "view profile" icon next to author name
 *
 * Animation: CSS transform translateX — zero library dependencies.
 * Transition: 350ms ease-in-out (within the 300-400ms spec).
 */

import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkSolidIcon,
} from "@/app/components/Icons";

const testimonials = [
  {
    quote:
      "NexaFlow cut our ETL maintenance time by 80%. Our data team finally has time to do actual analysis.",
    name:     "Sarah Chen",
    role:     "Head of Data · Amplitude",
    initials: "SC",
    href:     "#",
  },
  {
    quote:
      "The AI transformation layer is mind-blowing. It figured out our messy schema on the first try.",
    name:     "Marcus Rivera",
    role:     "CTO · FinScout",
    initials: "MR",
    href:     "#",
  },
  {
    quote:
      "We went from prototype to production pipeline in under an afternoon. Absolutely game-changing.",
    name:     "Priya Mehta",
    role:     "Staff Eng. · Notion",
    initials: "PM",
    href:     "#",
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  function prev() {
    setCurrent((c) => (c - 1 + total) % total);
  }

  function next() {
    setCurrent((c) => (c + 1) % total);
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="px-6 py-24"
      style={{ background: "var(--mint)" }}
    >
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <header className="mb-14 text-center">
          <h2
            id="testimonials-heading"
            className="mb-3 text-4xl font-extrabold md:text-5xl"
            style={{ color: "var(--near-black)" }}
          >
            Loved by data teams
          </h2>
          <p style={{ color: "rgba(23,43,54,0.65)" }}>
            Real results from real engineering teams.
          </p>
        </header>

        {/* Carousel track */}
        <div
          className="relative overflow-hidden rounded-2xl"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Slide strip */}
          <div
            className="flex"
            style={{
              transform:  `translateX(-${current * 100}%)`,
              transition: "transform 350ms ease-in-out",
            }}
          >
            {testimonials.map((t, i) => (
              <article
                key={t.name}
                className="min-w-full p-10 md:p-14"
                aria-hidden={i !== current}
                style={{ background: "white" }}
              >
                {/* Quote */}
                <blockquote className="mb-8">
                  <p
                    className="text-lg leading-relaxed md:text-xl"
                    style={{ color: "rgba(23,43,54,0.80)" }}
                  >
                    <span aria-hidden="true" className="mr-1 text-2xl" style={{ color: "var(--accent-yellow)" }}>"</span>
                    {t.quote}
                    <span aria-hidden="true" className="ml-1 text-2xl" style={{ color: "var(--accent-yellow)" }}>"</span>
                  </p>
                </blockquote>

                {/* Author footer */}
                <footer className="flex items-center gap-4">
                  {/* Avatar */}
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center
                               rounded-full text-sm font-bold"
                    aria-hidden="true"
                    style={{ background: "var(--dark-navy)", color: "white" }}
                  >
                    {t.initials}
                  </span>

                  <div className="flex flex-col">
                    {/* Author name + link-solid icon */}
                    <a
                      href={t.href}
                      className="flex items-center gap-1.5 text-sm font-semibold
                                 transition-opacity duration-200 hover:opacity-70"
                      aria-label={`View ${t.name}'s profile`}
                      style={{ color: "var(--near-black)" }}
                    >
                      {t.name}
                      {/* link-solid icon — "view profile" affordance */}
                      <LinkSolidIcon size={13} />
                    </a>
                    <span
                      className="text-xs"
                      style={{ color: "rgba(23,43,54,0.55)" }}
                    >
                      {t.role}
                    </span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>

        {/* Controls row: prev / dots / next */}
        <div className="mt-8 flex items-center justify-center gap-6">

          {/* ← Previous — chevron-left icon */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="carousel-nav-btn"
            style={{ color: "var(--dark-navy)", background: "white" }}
          >
            <ChevronLeftIcon size={20} />
          </button>

          {/* Slide indicators */}
          <div className="flex gap-2" role="tablist" aria-label="Testimonial slides">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setCurrent(i)}
                className="carousel-dot"
                style={{
                  background: i === current ? "var(--dark-navy)" : "rgba(17,76,90,0.20)",
                  transform:  i === current ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* → Next — chevron-right icon */}
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="carousel-nav-btn"
            style={{ color: "var(--dark-navy)", background: "white" }}
          >
            <ChevronRightIcon size={20} />
          </button>

        </div>
      </div>
    </section>
  );
}
