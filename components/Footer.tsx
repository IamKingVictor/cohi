"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-[#0A0F1A] relative z-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl font-bold tracking-tighter text-white">
            cohi
          </span>
          <p className="text-white/40 text-sm">
            Culture. Owns. Human. Influence.
          </p>
        </div>

        <nav className="flex gap-8 text-sm text-white/60">
          <Link
            href="/about"
            className="hover:text-[#14B8A6] transition-colors"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="hover:text-[#14B8A6] transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#14B8A6] transition-colors"
          >
            Contact
          </Link>
        </nav>

        <p className="text-white/30 text-xs text-center md:text-right">
          © {new Date().getFullYear()} Cohi Branding Agency. <br />
          All rights reserved.
        </p>
      </div>
    </footer>
  )
}
