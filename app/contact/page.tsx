"use client"

import { motion } from "framer-motion"
import Footer from "@/components/Footer"

export default function ContactPage() {
  return (
    <main className="pt-32 min-h-screen bg-transparent text-[#F1F5F9] relative">
      {/* Background Image is separate via Layout/GlobalBackground */}

      <section className="container mx-auto px-6 mb-24 flex flex-col md:flex-row gap-16">
        <div className="md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-8"
          >
            Start a <br />
            <span className="text-[#14B8A6]">Conversation</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#94A3B8] mb-12 max-w-lg"
          >
            Whether you have a fully formed brief or just a burning ambition,
            let's talk about how we can build your legacy.
          </motion.p>

          <div className="space-y-6 text-[#F1F5F9]">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">
                Email
              </h3>
              <a
                href="mailto:hello@cohi.agency"
                className="text-2xl hover:text-[#14B8A6] transition-colors"
              >
                hello@cohi.agency
              </a>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">
                Office
              </h3>
              <p className="text-xl">
                123 Creative Blvd, <br />
                Los Angeles, CA 90012
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">
                Social
              </h3>
              <div className="flex gap-4">
                {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="hover:text-[#14B8A6] transition-colors underline decoration-white/20 hover:decoration-[#14B8A6] underline-offset-4"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 bg-[#111827]/50 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5">
          <form className="space-y-8">
            <div className="space-y-1">
              <label className="text-sm uppercase tracking-widest text-white/60">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-[#14B8A6] transition-colors text-lg"
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm uppercase tracking-widest text-white/60">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-[#14B8A6] transition-colors text-lg"
                placeholder="jane@example.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm uppercase tracking-widest text-white/60">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-[#14B8A6] transition-colors text-lg resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="button"
              className="w-full bg-[#F1F5F9] text-[#0A0F1A] font-bold py-4 rounded-full hover:bg-[#14B8A6] transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[50vh] w-full relative grayscale invert mt-24">
        {/* Placeholder Map - using a styled div or iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.2740434527!2d-118.69191921441545!3d34.02016130939095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0, opacity: 0.8 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute inset-0 bg-[#14B8A6]/10 pointer-events-none mix-blend-overlay"></div>
      </section>

      <Footer />
    </main>
  )
}
