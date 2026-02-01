"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    quote:
      "Cohi transformed our brand narrative and delivered a positioning strategy that resonates deeply with our audience. Their insight is unmatched.",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "Elevate Ventures",
    logo: "🚀",
  },
  {
    quote:
      "The PR campaign Cohi crafted earned us coverage in top-tier publications and built credibility we couldn't have achieved alone.",
    name: "Marcus Chen",
    role: "Founder",
    company: "Nexus AI",
    logo: "🤖",
  },
  {
    quote:
      "Their integrated marketing approach delivered measurable ROI. We saw a 4x increase in qualified leads within three months.",
    name: "Elena Rodriguez",
    role: "CMO",
    company: "Horizon Health",
    logo: "💚",
  },
  {
    quote:
      "Cohi doesn't just execute—they think strategically. Every touchpoint was crafted with purpose and precision.",
    name: "James Park",
    role: "VP Marketing",
    company: "Quantum Labs",
    logo: "⚡",
  },
]

export default function Testimonials() {
  return (
    <section className="min-h-screen bg-[#050505] py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Trusted by Visionaries
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Leaders who partnered with Cohi to transform their brands and drive
            measurable growth.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative p-8 md:p-10 bg-white/2 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-500 hover:bg-white/4"
            >
              {/* Quote */}
              <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300">
                  {testimonial.logo}
                </div>
                <div>
                  <div className="font-semibold text-white/90">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-white/50">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/5 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 pt-12 border-t border-white/5"
        >
          <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-8">
            Partnering with ambitious brands worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            <div className="text-2xl">🚀</div>
            <div className="text-2xl">🤖</div>
            <div className="text-2xl">💚</div>
            <div className="text-2xl">⚡</div>
            <div className="text-2xl">🎯</div>
            <div className="text-2xl">✨</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
