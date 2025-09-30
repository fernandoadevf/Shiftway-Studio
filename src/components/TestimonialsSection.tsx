'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface Testimonial {
  id: number
  quote: string
  author: string
  position: string
  company: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Eles realmente se preocuparam em criar algo",
    author: "Rayana Maia",
    position: "Fundadora",
    company: "Rayana Beauty"
  },
  {
    id: 2,
    quote: "Meus agendamentos de consulta aumentaram em 43%",
    author: "Luiz Augusto",
    position: "Sócio",
    company: "Hospital da Pele"
  },
  {
    id: 3,
    quote: "O resultado superou todas as nossas expectativas",
    author: "Carlos Silva",
    position: "CEO",
    company: "Tech Solutions"
  }
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentTestimonial = testimonials[activeIndex]
  const { t } = useLanguage()

  // Auto-advance testimonials every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          {/* Left Side - Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-black leading-tight">
              {t('testimonialsTitle')}
            </h2>
          </motion.div>

          {/* Right Side - Testimonial */}
          <div>
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="text-left"
            >
              {/* Quote */}
              <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal text-gray-400 mb-8 sm:mb-10 lg:mb-12 leading-relaxed">
                "{currentTestimonial.quote} <span className="text-black font-medium">{t('testimonialQuote')}</span>"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col items-start mb-8 sm:mb-10 lg:mb-12">
                <div className="text-left">
                  <div className="font-semibold text-black text-base sm:text-lg lg:text-xl">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base lg:text-lg">
                    {currentTestimonial.position}, {currentTestimonial.company}
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1 rounded-full transition-all duration-300 cursor-default ${
                      index === activeIndex 
                        ? 'bg-black w-6 sm:w-8' 
                        : 'bg-gray-300 w-6 sm:w-8 hover:bg-gray-400'
                    }`}
                    aria-label={`Ver depoimento ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
