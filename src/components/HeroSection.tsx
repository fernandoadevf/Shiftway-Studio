'use client'

import { motion } from 'framer-motion'
import AnimatedVideo from './AnimatedVideo'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  }

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="min-h-screen flex items-start bg-white pt-20 sm:pt-24">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-left pl-2 sm:pl-4 md:pl-6 lg:pl-8">

          {/* Main Heading - Responsive sizes */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="mb-4 sm:mb-6"
          >
            <motion.div
              variants={textVariants}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-black leading-tight mb-1 sm:mb-2"
            >
              {t('studioTitle')}
            </motion.div>
            <motion.div
              variants={textVariants}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-black leading-tight"
            >
              {t('studioSubtitle')}
            </motion.div>
          </motion.div>

          {/* Subtitle - Responsive text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 max-w-5xl mb-6 sm:mb-8 pr-4"
          >
            {t('heroDescription')}
          </motion.p>

          {/* Animated Video */}
          <div className="mt-4 sm:mt-8">
            <AnimatedVideo />
          </div>
        </div>
      </div>
    </section>
  )
}
