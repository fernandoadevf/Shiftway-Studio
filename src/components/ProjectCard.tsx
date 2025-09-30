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
  const [isPlaying, setIsPlaying] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isFormatSupported, setIsFormatSupported] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Detectar se é dispositivo touch
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouch)
    console.log('Touch device detectado:', isTouch)
  }, [])

  // Detectar suporte ao formato de vídeo do navegador e definir src
  useEffect(() => {
    if (!project.video) return
    const videoEl = document.createElement('video')
    const isWebm = project.video.endsWith('.webm')
    let supported = false
    if (isWebm) {
      supported = !!videoEl.canPlayType('video/webm; codecs="vp8, vorbis"') || !!videoEl.canPlayType('video/webm')
    } else {
      supported = !!videoEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') || !!videoEl.canPlayType('video/mp4')
    }
    setIsFormatSupported(!!supported)
    setHasError(false)
    if (supported) {
      setVideoUrl(project.video)
      if (videoRef.current) {
        videoRef.current.src = project.video
      }
    } else {
      setVideoUrl(null)
    }
    console.log('Formato suportado?', supported, 'arquivo:', project.video)
  }, [project.video])

  const tryPlay = () => {
    if (!videoRef.current) return
    // Mostrar animação de loading aqui se quiser
    const playPromise = videoRef.current.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Reprodução iniciada')
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log('Reprodução bloqueada/prevenida:', error)
          setIsPlaying(false)
        })
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current && videoUrl && isFormatSupported && !hasError) {
      videoRef.current.load()
      tryPlay()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  const handleVideoClick = () => {
    console.log('Clique detectado - isTouchDevice:', isTouchDevice, 'video:', videoUrl, 'isPlaying:', isPlaying)
    if (!videoUrl || !videoRef.current || !isFormatSupported || hasError) return
    const el = videoRef.current
    if (isPlaying) {
      console.log('Pausando vídeo')
      el.pause()
      setIsPlaying(false)
      return
    }
    // Iniciar fluxo: load() garante que teremos token do gesto do usuário
    el.muted = true
    el.load()
    const playPromise = el.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Reprodução iniciada (muted)')
          // Após iniciar, tentar habilitar áudio
          setTimeout(() => {
            if (!videoRef.current) return
            videoRef.current.muted = false
          }, 100)
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log('Falha ao iniciar reprodução:', error)
          setIsPlaying(false)
        })
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
                    isTouchDevice
                      ? (isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100')
                      : (isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100')
                  }`}
                  onClick={handleVideoClick}
                  onTouchStart={() => {
                    console.log('TouchStart detectado')
                    handleVideoClick()
                  }}
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Play button - mostrar apenas se formato suportado e sem erro */}
                  {(isFormatSupported && !hasError) && (
                    <div className={`absolute inset-0 flex items-center justify-center ${
                      isTouchDevice && !isPlaying ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-300`}>
                      <div className="bg-black/60 rounded-full p-4 hover:bg-black/70 transition-colors">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Video - renderizar somente quando suportado e sem erro */}
                {(isFormatSupported && !hasError) && (
                  <div className={`absolute inset-0 transition-opacity duration-300 ${
                    isTouchDevice
                      ? (isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')
                      : (isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')
                  }`}>
                    <video
                      ref={videoRef}
                      // Definimos o src via JS para garantir rejeição correta da promise quando inválido
                      playsInline
                      preload="none"
                      muted
                      loop
                      controls={false}
                      className="w-full h-full object-cover"
                      poster={project.image}
                      onError={() => {
                        console.log('Erro no vídeo (onError):', videoUrl)
                        setHasError(true)
                        setIsPlaying(false)
                      }}
                      onCanPlay={() => {
                        console.log('onCanPlay:', videoUrl)
                        setHasError(false)
                      }}
                      onLoadedData={() => {
                        console.log('onLoadedData:', videoUrl)
                      }}
                      onEnded={() => {
                        if (isTouchDevice) setIsPlaying(false)
                      }}
                      onPlay={() => {
                        console.log('onPlay: iniciou')
                        setIsPlaying(true)
                      }}
                      onPause={() => {
                        console.log('onPause: pausou')
                        setIsPlaying(false)
                      }}
                    />
                  </div>
                )}
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
