"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Footer from "@/components/Footer"
import Image from "next/image"

function ParallaxImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <div ref={ref} className={`overflow-hidden rounded-2xl ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] relative -top-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="pt-32 min-h-screen bg-transparent text-[#F1F5F9]">
      <section className="container mx-auto px-6 mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-12"
        >
          We Are <span className="text-[#14B8A6]">Cohi</span>.
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-[#94A3B8] leading-relaxed mb-8">
              Cohi is more than a branding agency. We are cultural architects.
              We decode the chaotic signals of the modern world to build brands
              that stand for something real.
            </p>
            <p className="text-lg text-[#94A3B8]/80 leading-relaxed">
              Founded on the belief that "Culture Owns Human Influence," our
              methodology combines rigorous data analysis with intuitive
              storytelling to create brands that people don't just buy from, but
              believe in.
            </p>
          </motion.div>

          <div className="h-[400px] md:h-[600px] relative w-full">
            {/* Placeholder for About Image - sticking to abstract gradient or reuse COHI.jpg if user didn't provide team photos */}
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-br from-[#14B8A6]/20 to-[#EAB308]/20" />
              {/* Simulate an image if no specific asset */}
              <ParallaxImage
                src="/COHI.jpg"
                alt="About Cohi"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-[#111827] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Our Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Culture First",
                desc: "We look at the world, not just the market.",
              },
              {
                title: "Story Driven",
                desc: "Facts tell, but stories sell. And sustain.",
              },
              {
                title: "Impact Focused",
                desc: "We measure success by cultural dents.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 border border-white/5 rounded-2xl bg-[#0A0F1A]/50 backdrop-blur-sm hover:border-[#14B8A6]/30 transition-colors"
              >
                <h3 className="text-2xl font-bold mb-4 text-[#14B8A6]">
                  {item.title}
                </h3>
                <p className="text-[#94A3B8]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
