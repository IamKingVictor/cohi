"use client"

import { useRef, useState, useEffect } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion"
import { useLenis } from "@/components/LenisProvider"

const galleryImages = [
  "/sequence/frame_100.jpg",
  "/sequence/frame_110.jpg",
  "/sequence/frame_120.jpg",
  "/sequence/frame_130.jpg",
  "/sequence/frame_140.jpg",
  "/sequence/frame_150.jpg",
]

export default function BendingGallery() {
  const container = useRef(null)

  // We can use Lenis velocity for bending
  const { instance } = useLenis()
  const skewX = useMotionValue(0)
  const skewSpring = useSpring(skewX, { stiffness: 300, damping: 30 })

  useEffect(() => {
    if (!instance) return

    // Subscribe to Lenis scroll for high-perf velocity tracking
    const onScroll = (e: any) => {
      // e.velocity is the scroll velocity
      // sensitivity
      const skew = e.velocity * 0.25
      skewX.set(skew)
    }

    instance.on("scroll", onScroll)
    return () => {
      instance.off("scroll", onScroll)
    }
  }, [instance, skewX])

  return (
    <div ref={container} className="relative w-full py-20 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-20">
        {galleryImages.map((src, i) => (
          <GalleryItem key={i} src={src} skew={skewSpring} index={i} />
        ))}
      </div>
    </div>
  )
}

function GalleryItem({
  src,
  skew,
  index,
}: {
  src: string
  skew: any
  index: number
}) {
  return (
    <motion.div
      style={{ skewY: skew }}
      className="w-full aspect-[3/4] overflow-hidden rounded-lg bg-gray-900"
    >
      <div className="relative w-full h-full group">
        <img
          src={src}
          alt="Gallery Item"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </div>
    </motion.div>
  )
}
