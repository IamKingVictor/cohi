"use client"

import { useEffect, useRef, useState } from "react"
import { useMotionValue, useSpring } from "framer-motion"

const FRAME_COUNT = 120 // Using first 120 frames

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

    const updateProgress = () => {
      const progress = Math.round((loadedCount / FRAME_COUNT) * 100)
      setLoadingProgress(progress)

      if (loadedCount === FRAME_COUNT) {
        setImagesLoaded(true)
      }
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      const indexStr = i.toString().padStart(3, "0")
      img.src = `/sequence/frame_${indexStr}.jpg`

      img.onload = () => {
        loadedCount++
        updateProgress()
      }

      img.onerror = () => {
        console.error(`Failed to load frame ${i}`)
        loadedCount++
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
      // 500vh section = 4 viewport heights of scrollable content
      const maxScroll = viewportHeight * 4
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)
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
      if (!img || !img.complete) return

      const canvasWidth = window.innerWidth
      const canvasHeight = window.innerHeight

      // Fill with exact background color for seamless blend
      ctx.fillStyle = "#050505"
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

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
    <div className="relative w-full h-full flex items-center justify-center bg-[#050505]">
      {/* Loading UI */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#050505]">
          <div className="mb-8">
            <div className="w-16 h-16 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
          </div>
          <div className="text-white/60 font-light tracking-widest text-sm">
            LOADING EXPERIENCE
          </div>
          <div className="mt-3 text-white/40 font-mono text-xs">
            {loadingProgress}%
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`block transition-opacity duration-500 ${
          imagesLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}
