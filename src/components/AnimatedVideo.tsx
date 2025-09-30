'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

export default function AnimatedVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.2 && !hasPlayed && videoRef.current) {
        videoRef.current.play()
        setHasPlayed(true)
      }
    })

    return unsubscribe
  }, [scrollYProgress, hasPlayed])

  return (
    <div ref={containerRef} className="w-full py-8 sm:py-12 lg:py-16">
      <motion.video
        ref={videoRef}
        style={{ scale, opacity }}
        muted
        loop
        playsInline
        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover rounded-lg shadow-2xl"
        poster="/api/placeholder/800/450"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </motion.video>
    </div>
  )
}
