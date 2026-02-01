"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-[#050505] overflow-hidden">
      {/* Animated Wordmark */}
      <div className="relative mb-8 select-none">
        <motion.h1
          className="text-[20vw] md:text-[15vw] font-bold tracking-tighter leading-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {["c", "o", "h", "i"].map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.6, 0.05, 0.01, 0.9],
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtle glow effect */}
        <motion.div
          className="absolute inset-0 blur-3xl opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <div className="w-full h-full bg-linear-to-r from-yellow-500/20 via-white/10 to-cyan-500/20" />
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-lg md:text-xl lg:text-2xl text-white/70 font-light text-center max-w-3xl tracking-wide leading-relaxed"
      >
        Crafting Transformative Brands. Compelling Stories. Lasting Impact.
      </motion.p>

      {/* Separator line */}
      <motion.div
        className="mt-12 w-24 h-px bg-white/20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
    </section>
  )
}
