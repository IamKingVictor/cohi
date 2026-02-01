"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function FinalCTA() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/10 via-white/5 to-cyan-500/10 blur-3xl rounded-full" />
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Ready to Elevate
            <br />
            Your Brand?
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Partner with Cohi to craft a transformative brand strategy, compelling
          narrative, and high-impact campaigns that drive measurable growth.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-semibold text-lg rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
          >
            Work With Cohi
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 text-white/40 text-sm"
        >
          Or email us at{" "}
          <a
            href="mailto:hello@cohi.agency"
            className="text-white/60 hover:text-white/80 underline"
          >
            hello@cohi.agency
          </a>
        </motion.p>
      </div>

      {/* Pulsing accent */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scaleX: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  )
}
