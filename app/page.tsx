"use client"

import CohiWordmarkCanvas from "@/components/CohiWordmarkCanvas"
import ScrollytellingOverlays from "@/components/ScrollytellingOverlays"
import Testimonials from "@/components/Testimonials"
import FinalCTA from "@/components/FinalCTA"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="w-full relative bg-transparent text-[#F1F5F9] min-h-screen">
      {/* Scrollytelling Section - Hero + Core Services */}
      {/* 500vh container is managed inside ScrollytellingOverlays/Canvas logic. 
          Actually, ScrollytellingOverlays has h-[500vh]. 
          We need to wrap Canvas in a way that it sticks for that same duration.
      */}
      <section className="relative">
        <div className="absolute inset-0 z-0 h-[500vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <CohiWordmarkCanvas />
          </div>
        </div>

        <div className="relative z-10">
          <ScrollytellingOverlays />
        </div>
      </section>

      <div className="relative z-20 bg-transparent">
        {/* Testimonials Section */}
        <Testimonials />

        {/* Final CTA */}
        <FinalCTA />

        <Footer />
      </div>
    </main>
  )
}
