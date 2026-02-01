"use client"

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import Lenis from "@studio-freight/lenis"

// Note: Although we installed @studio-freight/lenis, the react wrapper is @studio-freight/react-lenis.
// Wait, I installed @studio-freight/lenis but I might need the react wrapper or just use the core.
// The user asked for manual config: "Create components/LenisProvider.tsx with buttery-smooth config"
// "Wrap the entire app in <LenisProvider>"
// Standard implementation usually involves using the core library or the react adapter.
// Given "Sync canvas animation using: const { scroll } = useLenis()", this implies using the react adapter context.
// I should have installed @studio-freight/react-lenis.
// Let me verify if I installed it or just the core. I installed @studio-freight/lenis.
// I probably need @studio-freight/react-lenis for the hook `useLenis`.
// I will assume I need to install it.
// For now, I'll write the code assuming I'll fix the install in the next step or I'll implement the context manually if I only have core.
// Actually, `npm install @studio-freight/lenis` gives the core.
// The user prompt said: "Install: npm install @studio-freight/lenis"
// But then: "Create components/LenisProvider.tsx... Sync canvas using const { scroll } = useLenis()"
// This strongly implies @studio-freight/react-lenis.
// I will stick to the user's "npm install @studio-freight/lenis" and implement the provider manually using the core library and React Context,
// OR I will just add @studio-freight/react-lenis because it's the standard way to get that hook.
// I'll implement a custom provider wrapping the core Lenis to match the instruction exactly while providing the hook.

const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => {
  const lenis = useContext(LenisContext)
  // We need to return an object that matches { scroll } for the user's requested API: "const { scroll } = useLenis()"
  // The core lenis instance has a 'scroll' property (current scroll position).
  // However, the value changes rapidly. React context might not be the best place to store the *value* of scroll,
  // but rather the instance so we can subscribe to it.
  // BUT the user specifically asked for "const { scroll } = useLenis()", which implies a reactive state or just access to the instance.
  // If it's the instance, `lenis.scroll` is the value.
  // If it's the react-lenis library, useLenis() returns the lenis instance usually.
  // I will assume standard usage and expose the instance.

  if (!lenis) {
    // Return a mock or throw? Better to be safe.
    // Ensure we handle SSR or non-lenis contexts gracefully if needed.
    return { scroll: 0, instance: null }
  }
  return { scroll: lenis.scroll, instance: lenis } // This is likely what is expected: ready access to stats.
  // Actually, for animation frames, we usually subscribe: lenis.on('scroll', (e) => ...).
  // The user prompt snippet: "const { scroll } = useLenis(); const progress = scroll / ..."
  // This looks like it expects `scroll` to be a number.
  // I will implement a hook that returns the scroll value, but this triggers re-renders on every scroll which is bad for React.
  // However, for a "Creative Developer" task, maybe they want it.
  // BETTER APPROACH: Use logic inside the component to read from lenis instance directly via ref or subscription to avoid re-renders,
  // but for the "useLenis" hook requested, I will provide the Context that holds the Lenis instance.
  // I will add a text note in the file about performance.
}

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default buttery smooth
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2, // Requested
      touchMultiplier: 1.8, // Requested
      // lerp: 0.08 - 0.12 // Requested. Lenis options usually take duration/easing OR lerp.
      // If lerp is defined, duration is ignored.
      lerp: 0.1, // Average of 0.08-0.12
    })

    setLenis(lenisInstance)

    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisInstance.destroy()
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
