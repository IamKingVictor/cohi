"use client"

import { motion } from "framer-motion"
import Footer from "@/components/Footer"
import Link from "next/link"

const projects = [
  {
    title: "Dynasty Africa",
    category: "Brand Strategy & PR",
    year: "2025",
    description:
      "Redefining luxury narratives for the African diaspora through high-impact visual storytelling.",
    color: "#EAB308",
  },
  {
    title: "EcoFlow Tech",
    category: "Digital Campaign",
    year: "2024",
    description:
      "Launch campaign for the next generation of sustainable power, reaching 50M+ impressions.",
    color: "#14B8A6",
  },
  {
    title: "Urban Mode",
    category: "Identity Design",
    year: "2024",
    description:
      "A bold new identity for an urban streetwear collective rooted in Tokyo's underground scene.",
    color: "#67E8F9",
  },
]

export default function ProjectsPage() {
  return (
    <main className="pt-32 min-h-screen bg-transparent text-[#F1F5F9]">
      <section className="container mx-auto px-6 mb-24">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-6xl md:text-9xl font-bold tracking-tighter mb-16 text-white/90"
        >
          Work
        </motion.h1>

        <div className="flex flex-col gap-24">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between md:items-start gap-8">
                <div className="md:w-1/3">
                  <span className="text-sm font-mono text-[#14B8A6] mb-2 block">
                    {project.category} — {project.year}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 group-hover:text-[#14B8A6] transition-colors duration-300">
                    {project.title}
                  </h2>
                </div>
                <div className="md:w-1/3">
                  <p className="text-lg text-[#94A3B8] leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm uppercase tracking-widest hover:text-[#14B8A6] transition-colors"
                  >
                    View Case Study <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>

              {/* Decorative Gradient Hover */}
              <div
                className="absolute -inset-4 bg-linear-to-r from-transparent to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl -z-10 pointer-events-none"
                style={{ backgroundColor: project.color }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
