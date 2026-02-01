"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { useLenis } from "@/components/LenisProvider"
import { useSpring, useTransform, useMotionValue } from "framer-motion"

// Total frames based on file check (0 to 191 = 192 frames)
const FRAME_COUNT = 192

export default function CohiWordmarkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const { scroll } = useLenis() // Get current scroll position (pixels)

  // Ref to track window height for scroll calculation
  const windowHeightRef = useRef(0)

  // Motion value for smooth frame index interpolation
  // We can't use scroll directly as motionValue from lenis hook because our hook returns raw number/instance.
  // Instead, we can update a motionValue in a useEffect or useFrame loop.
  // But Lenis runs on RAF.

  // Let's us use spring for the frame index to make it super smooth even if scroll stops abruptly.
  // However, scroll-linked animations usually want to be 1:1 with scroll for precision,
  // but "buttery smooth" requests might benefit from slight spring.
  // The user asked for: "Map Lenis scroll progress (0 -> 1) -> frame index with useSpring smoothing"

  const scrollProgressMv = useMotionValue(0)
  const smoothProgress = useSpring(scrollProgressMv, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Preload images
  useEffect(() => {
    let loadedCount = 0
    const imgArray: HTMLImageElement[] = []

    // We'll load all frames. For 192 JPGs (~5MB total maybe?), this is okay for a "Wow" landing page.
    // Optimization: Could use a sprite sheet or video, but user explicitly asked for /sequence/ pre-rendered frames.

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      // Construct path: /sequence/frame_000_delay-0.042s.jpg (based on file list)
      // Need to pad index to 3 digits.
      const indexStr = i.toString().padStart(3, "0")
      // Filenames have suffixes like _delay-0.042s.jpg.
      // I need to match the exact filenames found in the list_dir output:
      // frame_000_delay-0.042s.jpg, frame_001_delay-0.041s.jpg
      // The delay suffix varies! I cannot hardcode it easily unless I rename them or have a map.
      // Or I can just try to load `frame_XXX*.jpg`? No can't do wildcard in standard HTTP load without map.
      // I MUST have the filenames.
      // Solution: I should have read the filenames into a list/array or renamed them to standard format frame_000.jpg.
      // Renaming is safer and cleaner.
      // Proceeding with assuming I will RENAME them in the terminal before this component runs/during setup.
      // I will add a step to rename all files to frame_000.jpg, frame_001.jpg etc.

      img.src = `/sequence/frame_${indexStr}.jpg`
      img.onload = () => {
        loadedCount++
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true)
        }
      }
      imgArray.push(img)
    }
    setImages(imgArray)

    // Set window height
    windowHeightRef.current = window.innerHeight
    const handleResize = () => {
      windowHeightRef.current = window.innerHeight
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update scroll progress
  useEffect(() => {
    // We need to calculate progress based on the HERO section height, not the whole page (or user specified sticky top-0 h-screen in min-h-[500vh]).
    // The hero section is 500vh. Scroll range is 400vh (500 - 100).
    const totalScroll = window.innerHeight * 4 // 500vh height means we can scroll 4 viewport heights of content?
    // Actually, if height is 500vh, scrollable distance is 500vh - 100vh = 400vh?
    // Let's assume standard behavior: progress = scroll / (totalHeight - viewportHeight) within the container.
    // But Lenis scroll is global.
    // If this is the Hero component, it takes up the first part of the page.

    // We map global scroll 0 -> totalScroll to progress 0 -> 1.
    const progress = Math.min(Math.max(scroll / totalScroll, 0), 1)
    scrollProgressMv.set(progress)
  }, [scroll, scrollProgressMv]) // 'scroll' changes every frame if using context state, but we implemented context optimizatins?
  // Wait, my useLenis implementation returns { scroll: lenis.scroll }. This will likely trigger re-renders.
  // If performance is bad, I'll optimize.

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !imagesLoaded || images.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const render = () => {
      const progress = smoothProgress.get() // 0 to 1
      const frameIndex = Math.min(
        Math.floor(progress * (FRAME_COUNT - 1)),
        FRAME_COUNT - 1,
      )

      const img = images[frameIndex]
      if (img) {
        // Draw image logic: Contain fit (as requested)
        // Calculate aspect ratios
        const imgAspect = img.width / img.height
        const canvasAspect = canvas.width / canvas.height

        let drawWidth, drawHeight, offsetX, offsetY

        if (canvasAspect > imgAspect) {
          // Canvas is wider than image -> fit height
          drawHeight = canvas.height
          drawWidth = canvas.height * imgAspect
          offsetX = (canvas.width - drawWidth) / 2
          offsetY = 0
        } else {
          // Canvas is taller than image -> fit width
          drawWidth = canvas.width
          drawHeight = canvas.width / imgAspect
          offsetX = 0
          offsetY = (canvas.height - drawHeight) / 2
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
      }
    }

    // Subscribe to smoothProgress changes or just run RAF?
    // Run on RAF to sync with Lenis/Motion
    const unsubscribe = smoothProgress.on("change", render)
    // Also strict render once loaded
    render()

    return () => unsubscribe()
  }, [imagesLoaded, images, smoothProgress])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!imagesLoaded && (
        <div className="absolute text-white/20 font-mono text-sm tracking-widest">
          LOADING SEQUENCE...
        </div>
      )}
      <canvas ref={canvasRef} className="block" />
    </div>
  )
}
