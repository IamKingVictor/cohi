"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ScrollytellingOverlays() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Beat A: 0-20% (Hero intro)
  const beatA_opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.2],
    [0, 1, 1, 0],
  )
  const beatA_y = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.2],
    [30, 0, 0, -30],
  )

  // Beat B: 25-45% (Insight-Driven Strategy)
  const beatB_opacity = useTransform(
    scrollYProgress,
    [0.25, 0.3, 0.4, 0.45],
    [0, 1, 1, 0],
  )
  const beatB_y = useTransform(
    scrollYProgress,
    [0.25, 0.3, 0.4, 0.45],
    [30, 0, 0, -30],
  )

  // Beat C: 50-70% (Narrative PR)
  const beatC_opacity = useTransform(
    scrollYProgress,
    [0.5, 0.55, 0.65, 0.7],
    [0, 1, 1, 0],
  )
  const beatC_y = useTransform(
    scrollYProgress,
    [0.5, 0.55, 0.65, 0.7],
    [30, 0, 0, -30],
  )

  // Beat D: 75-95% (Integrated Campaigns)
  const beatD_opacity = useTransform(
    scrollYProgress,
    [0.75, 0.8, 0.9, 0.95],
    [0, 1, 1, 0],
  )
  const beatD_y = useTransform(
    scrollYProgress,
    [0.75, 0.8, 0.9, 0.95],
    [30, 0, 0, -30],
  )

  // Scroll prompt fade (0-15%)
  const prompt_opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15],
    [1, 0.5, 0],
  )

  return (
    <div ref={containerRef} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen w-full pointer-events-none">
        {/* Scroll Prompt */}
        <motion.div
          style={{ opacity: prompt_opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-white/40 text-sm uppercase tracking-widest">
            Scroll to Explore the Process
          </p>
          <div className="mt-3 w-px h-12 bg-white/20 mx-auto animate-pulse" />
        </motion.div>

        {/* Beat A: Hero Intro (0-20%) - Center */}
        <motion.div
          style={{ opacity: beatA_opacity, y: beatA_y }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <h1 className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold tracking-tighter leading-none mb-6">
            cohi
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-light text-white/80 max-w-3xl tracking-wide">
            Crafting Transformative Brands Through Strategy, Story & Impact
          </p>
        </motion.div>

        {/* Beat B: Insight-Driven Strategy (25-45%) - Left */}
        <motion.div
          style={{ opacity: beatB_opacity, y: beatB_y }}
          className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24"
        >
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Insight-Driven
              <br />
              Brand Strategy
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Deep positioning, audience insights, and frameworks that create
              authentic, ownable brands.
            </p>
          </div>
        </motion.div>

        {/* Beat C: Narrative PR (50-70%) - Right */}
        <motion.div
          style={{ opacity: beatC_opacity, y: beatC_y }}
          className="absolute inset-0 flex items-center justify-end px-8 md:px-16 lg:px-24"
        >
          <div className="max-w-xl text-right">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Narrative-Driven
              <br />
              PR & Storytelling
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Compelling stories and media strategies that earn attention, build
              trust, and foster emotional connections.
            </p>
          </div>
        </motion.div>

        {/* Beat D: Marketing Campaigns (75-95%) - Center */}
        <motion.div
          style={{ opacity: beatD_opacity, y: beatD_y }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Integrated Marketing
            <br />
            Campaigns
          </h2>
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
            Bold creative execution across channels with data-driven
            amplification for measurable results.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
