"use client"

import Hero from "@/components/Hero"
import CohiWordmarkCanvas from "@/components/CohiWordmarkCanvas"
import ScrollytellingOverlays from "@/components/ScrollytellingOverlays"
import Testimonials from "@/components/Testimonials"
import FinalCTA from "@/components/FinalCTA"

export default function Home() {
  return (
    <main className="w-full relative bg-[#050505] text-white">
      {/* Hero Section */}
      <Hero />

      {/* Scrollytelling Section - Canvas + Overlays */}
      <section className="relative">
        {/* Canvas Layer (sticky, behind overlays) */}
        <div className="absolute inset-0 z-0">
          <div className="sticky top-0 h-screen w-full">
            <CohiWordmarkCanvas />
          </div>
        </div>

        {/* Text Overlays (foreground) */}
        <div className="relative z-10">
          <ScrollytellingOverlays />
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <footer className="py-16 flex items-center justify-center border-t border-white/5 bg-[#050505]">
        <p className="text-white/30 text-sm">
          © 2026 Cohi Branding Agency. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
