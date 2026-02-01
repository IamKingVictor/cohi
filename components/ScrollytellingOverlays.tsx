"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ScrollytellingOverlays() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // === BEAT A: HERO INTRO (0% - 15%) ===
  // Frames 0-30: Sketches to initial formation
  // Text: "cohi" big + Tagline
  const hero_opacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0])
  const hero_scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9])

  // === BEAT B: STRATEGY (20% - 40%) ===
  // Frames 40-80: Structure forming
  const strategy_opacity = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.35, 0.4],
    [0, 1, 1, 0],
  )
  const strategy_y = useTransform(scrollYProgress, [0.2, 0.4], [50, -50])

  // === BEAT C: PR & STORY (45% - 65%) ===
  // Frames 90-130: Details filling in
  const story_opacity = useTransform(
    scrollYProgress,
    [0.45, 0.5, 0.6, 0.65],
    [0, 1, 1, 0],
  )
  const story_y = useTransform(scrollYProgress, [0.45, 0.65], [50, -50])

  // === BEAT D: CAMPAIGNS (70% - 90%) ===
  // Frames 140-190: Final Polished Gradient Logo
  const campaign_opacity = useTransform(
    scrollYProgress,
    [0.7, 0.75, 0.85, 0.9],
    [0, 1, 1, 0],
  )
  const campaign_y = useTransform(scrollYProgress, [0.7, 0.9], [50, -50])

  // Scroll Prompt
  const prompt_opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])

  return (
    <div ref={containerRef} className="h-[500vh] relative pointer-events-none">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center">
        {/* BEAT A: HERO INTRO */}
        <motion.div
          style={{ opacity: hero_opacity, scale: hero_scale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          {/* Note: The visuals are in the canvas, these are just overlays */}
          {/* We keep the text "COHI" invisible or use the canvas text? 
              User request: "Maintain ALL existing hero texts overlaid on the canvas"
              Hero text was: Title "cohi", Tagline, etc.
          */}
          <h1 className="text-[15vw] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-linear-to-b from-white to-white/0 select-none">
            {/* The canvas draws the logo, so maybe we don't duplicate the text 'cohi' exactly on top 
                unless we want a blend effect. The request said "frames show wordmark assembling".
                If we overlay text, it might clash.
                However, prompt says: "Maintain ALL existing hero texts... overlaid on the canvas".
                I will render the tagline and subtitle, but maybe keep the big 'cohi' text strictly in the canvas 
                OR overlay it perfectly. 
                Given the canvas is "assembling", overlaying a static "cohi" might look weird until the end.
                I will only show the Tagline and Subtitle for Beat A to let the Canvas be the hero title.
            */}
          </h1>

          <div className="mt-[20vh] md:mt-[30vh]">
            {" "}
            {/* Push down to avoid covering centering logo immediately if needed */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg md:text-xl lg:text-2xl font-light text-white/80 max-w-3xl tracking-wide mx-auto"
            >
              Crafting Transformative Brands.{" "}
              <span className="text-[#14B8A6]">Compelling Stories.</span>{" "}
              Lasting Impact.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8"
            >
              <button className="px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm uppercase tracking-widest hover:bg-white/10 transition-colors pointer-events-auto">
                Start Your Journey
              </button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            style={{ opacity: prompt_opacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Scroll to Reveal
            </span>
            <div className="w-px h-12 bg-linear-to-b from-white/0 via-white/40 to-white/0 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* BEAT B: STRATEGY */}
        <motion.div
          style={{ opacity: strategy_opacity, y: strategy_y }}
          className="absolute inset-0 flex items-center justify-start px-8 md:px-24"
        >
          <div className="max-w-lg text-left backdrop-blur-sm bg-[#0A0F1A]/30 p-8 rounded-2xl border border-white/5">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#F1F5F9]">
              Strategy
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed">
              We decode culture and consumer behavior to build brands that don't
              just exist, but <span className="text-[#14B8A6]">matter</span>.
            </p>
          </div>
        </motion.div>

        {/* BEAT C: PR & STORY */}
        <motion.div
          style={{ opacity: story_opacity, y: story_y }}
          className="absolute inset-0 flex items-center justify-end px-8 md:px-24"
        >
          <div className="max-w-lg text-right backdrop-blur-sm bg-[#0A0F1A]/30 p-8 rounded-2xl border border-white/5">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#F1F5F9]">
              Storytelling
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed">
              Narratives that resonate. We craft PR campaigns that turn your
              brand into a{" "}
              <span className="text-[#EAB308]">cultural conversation</span>.
            </p>
          </div>
        </motion.div>

        {/* BEAT D: CAMPAIGNS */}
        <motion.div
          style={{ opacity: campaign_opacity, y: campaign_y }}
          className="absolute inset-0 flex items-center justify-center text-center px-4"
        >
          <div className="max-w-2xl backdrop-blur-sm bg-[#0A0F1A]/30 p-10 rounded-2xl border border-white/10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#F1F5F9]">
              Impact
            </h2>
            <p className="text-xl text-[#94A3B8] mb-8">
              Integrated campaigns that drive growth and solidify your legacy.
            </p>
            <button className="pointer-events-auto px-8 py-4 bg-[#14B8A6] text-[#0A0F1A] font-bold rounded-full hover:bg-[#67E8F9] transition-all transform hover:scale-105">
              View Our Work
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
