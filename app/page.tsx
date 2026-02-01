"use client"

import CohiWordmarkCanvas from "@/components/CohiWordmarkCanvas"
import ImageTrailCursor from "@/components/ui/ImageTrailCursor"
import BendingGallery from "@/components/ui/BendingGallery"
import ContainerScroll from "@/components/ui/ContainerScroll"

export default function Home() {
  return (
    <main className="w-full relative bg-[#050505] text-white">
      <ImageTrailCursor />

      {/* HERO SECTION - 500vh tall to drive the scroll animation */}
      <section className="h-[500vh] relative z-10">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <CohiWordmarkCanvas />
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-10">
            <p className="absolute bottom-10 text-white/40 text-sm uppercase tracking-widest animate-pulse">
              Scroll to Explore
            </p>
          </div>
        </div>
      </section>

      {/* CULTURE SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 z-20 bg-[#050505] relative">
        <h2 className="text-[12vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white to-white/20 mb-10">
          CULTURE
        </h2>
        <div className="max-w-2xl text-center text-xl md:text-2xl text-white/70 leading-relaxed font-light">
          <p>
            We build brands that move at the speed of culture. Connecting the
            dots between human emotion and digital influence.
          </p>
        </div>
      </section>

      {/* OWNS SECTION - Bending Gallery */}
      <section className="min-h-screen flex flex-col items-center py-20 bg-[#050505] border-t border-white/5 z-20 relative">
        <h2 className="text-[8vw] font-bold tracking-tighter mb-20">OWNS</h2>
        <BendingGallery />
      </section>

      {/* HUMAN SECTION - Content */}
      <section className="min-h-screen flex flex-col justify-center px-10 md:px-20 py-20 bg-[#050505] z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-[10vw] leading-none font-bold tracking-tighter mb-8">
              HUMAN
            </h2>
            <p className="text-xl text-white/60 max-w-md">
              At the core of every pixel, every interaction, and every strategy
              is a human heartbeat. We design for the people behind the screens.
            </p>
          </div>
          <div className="aspect-square relative overflow-hidden rounded-full border border-white/10 flex items-center justify-center group">
            <div className="absolute inset-0 bg-linear-to-tr from-yellow-500/20 via-green-500/20 to-cyan-500/20 opacity-50 blur-3xl group-hover:opacity-80 transition-opacity" />
            <img
              src="/sequence/frame_050.jpg"
              alt="Human Eye"
              className="w-[80%] h-[80%] object-contain rounded-full opacity-80 mix-blend-screen"
            />
          </div>
        </div>
      </section>

      {/* INFLUENCE SECTION - Container Scroll */}
      <section className="min-h-screen py-20 bg-[#050505] z-20 relative overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-white/50 mb-4">
                Case Studies
              </h1>
              <h2 className="text-[6vw] font-bold tracking-tighter text-white leading-none">
                INFLUENCE
              </h2>
            </>
          }
        >
          <div className="w-full h-full flex items-center justify-center bg-zinc-900">
            <img
              src="/sequence/frame_100.jpg"
              alt="Project Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </ContainerScroll>
      </section>

      {/* FOOTER */}
      <footer className="py-20 flex items-center justify-center border-t border-white/10 z-20 relative bg-[#050505]">
        <p className="text-white/30 text-sm">© 2026 COHI BRANDING AGENCY</p>
      </footer>
    </main>
  )
}
