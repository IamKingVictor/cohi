"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function Navigation() {
  const pathname = usePathname()

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-[#0A0F1A]/70 border-b border-white/5"
    >
      <Link href="/" className="group relative z-50">
        <span className="text-2xl font-bold tracking-tighter text-white group-hover:text-[#14B8A6] transition-colors duration-300">
          cohi
        </span>
      </Link>

      <nav className="hidden md:flex gap-8">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                isActive ? "text-[#14B8A6]" : "text-white/70 hover:text-white"
              }`}
            >
              {link.name}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-[#14B8A6]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="md:hidden">
        {/* Mobile Menu Toggle would go here - simplifying for now or adding later if requested */}
        <Link href="/contact" className="text-white/70">
          Menu
        </Link>
      </div>
    </motion.header>
  )
}
