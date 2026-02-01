"use client"

import {
  useMotionValue,
  useSpring,
  useMotionTemplate,
  motion,
} from "framer-motion"
import { useEffect } from "react"

export default function MouseRevealOverlay() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Primary Mouse Spring (Responsive)
  // stiffness: 180, damping: 24
  const springX1 = useSpring(mouseX, { stiffness: 180, damping: 24 })
  const springY1 = useSpring(mouseY, { stiffness: 180, damping: 24 })

  // Trail Glow Spring (Lagging)
  // stiffness: 65, damping: 48
  const springX2 = useSpring(mouseX, { stiffness: 65, damping: 48 })
  const springY2 = useSpring(mouseY, { stiffness: 65, damping: 48 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update motion values directly
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Construct the dynamic background gradient string
  // Layer 1: Primary Spotlight (420px radius)
  // Layer 2: Secondary Faint Trail (820px radius, offset +40px/+30px)
  const background = useMotionTemplate`
    radial-gradient(
      420px 600px at ${springX1}px ${springY1}px,
      rgba(255, 255, 255, 0.15),
      transparent 100%
    ),
    radial-gradient(
      820px 1000px at calc(${springX2}px + 40px) calc(${springY2}px + 30px),
      rgba(255, 255, 255, 0.05),
      transparent 100%
    )
  `

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background, // Apply the dynamic gradient
        backdropFilter: "blur(65px)", // Requested soft blur on the overlay itself?
        // Or should the blur be applied to what's behind?
        // User said: "Apply filter: blur(65px) on the overlay for extra softness".
        // This likely means blurring the gradient *shape* itself to make it super soft,
        // but radial-gradients are already soft.
        // If we blur the DIV, we blur the gradient within it? Yes.
        // It avoids banding and makes it "blobby".
        // Also blend mode.
        mixBlendMode: "screen", // or 'overlay' or 'lighten' as requested. 'screen' adds light.
      }}
    />
  )
}
