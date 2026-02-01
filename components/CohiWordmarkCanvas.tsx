"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const FRAME_COUNT = 191 // Frames 0 to 190 = 191 frames total

export default function CohiWordmarkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const scrollProgress = useMotionValue(0)
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Preload all frames with progress tracking
  useEffect(() => {
    const imgArray: HTMLImageElement[] = []
    let loadedCount = 0
    let failedCount = 0

    const updateProgress = () => {
      const totalProcessed = loadedCount + failedCount
      const progress = Math.round((totalProcessed / FRAME_COUNT) * 100)
      setLoadingProgress(progress)

      if (totalProcessed === FRAME_COUNT) {
        setImagesLoaded(true)
      }
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      // File names are frame_000.jpg, frame_001.jpg, etc.
      // Assuming they are in /public/sequence/
      const indexStr = i.toString().padStart(3, "0")
      img.src = `/sequence/frame_${indexStr}.jpg`

      img.onload = () => {
        loadedCount++
        updateProgress()
      }

      img.onerror = () => {
        console.error(
          `Failed to load frame ${i} at /sequence/frame_${indexStr}.jpg`,
        )
        failedCount++
        updateProgress()
      }

      imgArray.push(img)
    }

    setImages(imgArray)
  }, [])

  // Update scroll progress from window scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const maxScroll = docHeight - viewportHeight

      // Specifically for the sticky section which is 500vh
      // We need to map the scroll within the sticky container's effective range to 0-1
      // However, typical scrollytelling relies on the relative scroll within the section.
      // Since this canvas is sticky for the *entire* hero section, we can assume the hero section
      // controls the 0-1 progress of the logo reveal.
      // Let's rely on the parent or window scroll if the hero is the only thing on top.
      // Given the requirement: "Hero Section Overhaul... Sticky canvas container with 500vh+ scroll height"

      // We will assume this component is placed INSIDE the sticky container,
      // but usually the scroll progress should be driven by the scroll position relative to the container.
      // For simplicity/robustness, let's look at the scroll relative to the top of the page since it's the Hero.

      const heroHeight = window.innerHeight * 5 // 500vh
      // Explicitly limit progress to the hero section's height
      const progress = Math.min(
        Math.max(scrollY / (heroHeight - window.innerHeight), 0),
        1,
      )

      scrollProgress.set(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollProgress])

  // Canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !imagesLoaded || images.length === 0) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()

    const render = () => {
      const progress = smoothProgress.get()
      const frameIndex = Math.min(
        Math.floor(progress * (FRAME_COUNT - 1)),
        FRAME_COUNT - 1,
      )

      const img = images[frameIndex]
      if (!img || !img.complete || img.naturalWidth === 0) return

      const canvasWidth = window.innerWidth
      const canvasHeight = window.innerHeight

      // Fill with exact background color for seamless blend
      // Using #0A0F1A to match new theme
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      // Calculate aspect-fit (contain) dimensions
      const imgAspect = img.width / img.height
      const canvasAspect = canvasWidth / canvasHeight

      let drawWidth, drawHeight, offsetX, offsetY

      if (canvasAspect > imgAspect) {
        // Canvas wider - fit to height
        drawHeight = canvasHeight
        drawWidth = canvasHeight * imgAspect
        offsetX = (canvasWidth - drawWidth) / 2
        offsetY = 0
      } else {
        // Canvas taller - fit to width
        drawWidth = canvasWidth
        drawHeight = canvasWidth / imgAspect
        offsetX = 0
        offsetY = (canvasHeight - drawHeight) / 2
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    }

    // Subscribe to spring updates
    const unsubscribe = smoothProgress.on("change", render)
    render() // Initial render

    // Handle resize
    const handleResize = () => {
      setCanvasSize()
      render()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      unsubscribe()
      window.removeEventListener("resize", handleResize)
    }
  }, [imagesLoaded, images, smoothProgress])

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-transparent">
      {/* Loading UI */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#0A0F1A]/90">
          <div className="mb-8">
            <div className="w-16 h-16 border-2 border-white/20 border-t-[#14B8A6] rounded-full animate-spin" />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/60 font-light tracking-widest text-sm uppercase"
          >
            Loading Experience
          </motion.div>
          <div className="mt-3 text-[#14B8A6] font-mono text-xs">
            {loadingProgress}%
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#14B8A6]"
              style={{ width: `${loadingProgress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`block w-full h-full transition-opacity duration-700 ${
          imagesLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}
