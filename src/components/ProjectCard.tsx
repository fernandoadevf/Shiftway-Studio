'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    category: string
    description: string
    image?: string
    video?: string
    type: string
  }
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Detectar se é mobile
  useEffect(() => {
    const checkIsMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isTouch || isSmallScreen)
      console.log('Mobile detectado:', isTouch || isSmallScreen, 'Touch:', isTouch, 'Small screen:', isSmallScreen)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current && project.video) {
      videoRef.current.play().catch(error => {
        console.log('Erro ao reproduzir vídeo:', error)
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handleVideoClick = () => {
    console.log('Clique detectado - isMobile:', isMobile, 'project.video:', project.video, 'isPlaying:', isPlaying)
    if (project.video && videoRef.current) {
      if (isPlaying) {
        console.log('Pausando vídeo')
        videoRef.current.pause()
      } else {
        console.log('Tentando reproduzir vídeo')
        // No mobile, permitir áudio
        if (isMobile) {
          videoRef.current.muted = false
        }
        videoRef.current.play().catch(error => {
          console.log('Erro ao reproduzir vídeo:', error)
        })
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 sm:gap-8 lg:gap-12 group cursor-pointer`}
    >
      {/* Project Image/Video */}
      <div className="w-full md:w-3/5 lg:w-5/3">
        <div 
          className="relative overflow-hidden rounded-lg bg-gray-100 shadow-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {project.image ? (
            project.video ? (
              <>
                {/* Cover Image with Video */}
                <div 
                  className={`aspect-[4/3] sm:aspect-[3/2] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center transition-opacity duration-300 cursor-pointer relative ${
                    isMobile ? (isPlaying ? 'opacity-0' : 'opacity-100') : (isHovered ? 'opacity-0' : 'opacity-100')
                  }`}
                  onClick={handleVideoClick}
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Play button - sempre visível em telas pequenas */}
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    isMobile && !isPlaying ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-300`}>
                    <div className="bg-black/60 rounded-full p-4 hover:bg-black/70 transition-colors">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Video */}
                <video
                  ref={videoRef}
                  muted={!isMobile}
                  loop
                  playsInline
                  preload="metadata"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    isMobile ? (isPlaying ? 'opacity-100' : 'opacity-0') : (isHovered ? 'opacity-100' : 'opacity-0')
                  }`}
                  poster={project.image}
                  onError={(e) => {
                    console.log('Erro no vídeo:', project.video, e)
                  }}
                  onLoadStart={() => {
                    console.log('Carregando vídeo:', project.video)
                  }}
                  onEnded={() => {
                    if (isMobile) {
                      setIsPlaying(false)
                    }
                  }}
                  onPlay={() => {
                    console.log('Vídeo começou a tocar')
                    setIsPlaying(true)
                  }}
                  onPause={() => {
                    console.log('Vídeo pausado')
                    setIsPlaying(false)
                  }}
                >
                  <source src={project.video} type={project.video.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                </video>
              </>
            ) : (
              /* Image only */
              <div className="aspect-[4/3] sm:aspect-[3/2] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          ) : (
            /* No image placeholder */
            <div className="aspect-[4/3] sm:aspect-[3/2] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-2">🎨</div>
                <div className="text-gray-600 text-xs sm:text-sm">Preview do Projeto</div>
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        </div>
      </div>
      
      {/* Project Info */}
      <div className="w-full md:w-2/5 lg:w-1/2 space-y-3 sm:space-y-4 lg:space-y-6">
        <div className="flex items-center space-x-2">
          <span className="text-xs sm:text-sm text-gray-500">{project.category}</span>
          <span className="text-gray-300">•</span>
          <span className="text-xs sm:text-sm text-gray-500">{project.type}</span>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-black group-hover:text-gray-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl">
          {project.description}
        </p>
      </div>
    </motion.div>
  )
}
