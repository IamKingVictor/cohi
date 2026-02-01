"use client"

import { useAnimate } from "framer-motion"
import { useRef, useEffect } from "react"

// Placeholder images for the trail. Ideally these would be "cultural visuals".
// I'll reuse some sequence frames or placeholders if no other assets.
// Since I only have /sequence/ frames, I'll use those for now or just colors/shapes if preferred?
// User said: "subtle cultural/eye motif trail". I'll use a few specific frames from the sequence as they contain the eye/culture motifs described.
// e.g., frame 50-60 might have the eye.
const trailImages = [
  "/sequence/frame_050.jpg",
  "/sequence/frame_060.jpg",
  "/sequence/frame_070.jpg",
  "/sequence/frame_080.jpg",
  "/sequence/frame_090.jpg",
]

export default function ImageTrailCursor() {
  const [scope, animate] = useAnimate()
  const lastRenderPosition = useRef({ x: 0, y: 0 })
  const imageIndex = useRef(0)

  // Throttle distance to avoid too many images
  const DISTANCE_THRESHOLD = 100

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const distance = Math.hypot(
        clientX - lastRenderPosition.current.x,
        clientY - lastRenderPosition.current.y,
      )

      if (distance > DISTANCE_THRESHOLD) {
        lastRenderPosition.current = { x: clientX, y: clientY }
        spawnImage(clientX, clientY)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const spawnImage = (x: number, y: number) => {
    const el = document.createElement("img")
    el.src = trailImages[imageIndex.current % trailImages.length]
    el.className =
      "fixed w-24 h-24 object-cover rounded-full pointer-events-none z-50 mix-blend-difference"
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.transform = "translate(-50%, -50%) scale(0)"

    // Append to scope or body? If scope is a ref, we can append to it.
    // Better to append to body to ensure it visually floats above everything regardless of overflow.
    // But React `scope` is cleaner. Let's try appending to a container.
    // Actually, simple vanilla JS append is often smoother for high-frequency cursor trails than React state.

    if (scope.current) {
      scope.current.appendChild(el)

      // Animate
      animate(
        el,
        { scale: [0, 1, 0], opacity: [1, 1, 0] },
        { duration: 1.0, ease: "easeOut", onComplete: () => el.remove() },
      )

      imageIndex.current++
    }
  }

  return (
    <div
      ref={scope}
      className="fixed inset-0 pointer-events-none overflow-hidden z-9999"
    />
  )
}
