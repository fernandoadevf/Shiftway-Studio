'use client'

import { motion } from 'framer-motion'
import { Globe } from "@/components/ui/globe"
import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CTASection() {
  const { t } = useLanguage()
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        // Redireciona para a página de contato
        window.location.href = '/contato'
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  return (
    <section className="relative flex items-center justify-center bg-white overflow-visible py-4 sm:py-6 lg:py-8 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative flex items-center justify-center h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
          {/* Globe - Behind */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute flex items-start justify-center w-full -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 xl:-mt-24 h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[440px]"
            style={{ 
              top: 0
            }}
          >
            <Globe className="top-0" />
          </motion.div>

          {/* Text Content - On top of Globe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center z-10 relative px-4 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 xl:-mt-24"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-medium text-black leading-tight mb-4 sm:mb-6">
              {t('ctaTitle')}
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 font-bold">
              {t('ctaSubtitle')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}