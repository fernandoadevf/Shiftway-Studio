'use client'

import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { useLanguage } from '@/contexts/LanguageContext'

interface Project {
  id: number
  title: string
  category: string
  description: string
  image?: string
  video?: string
  type: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "V7 Darwin Landing Page",
    category: "V7 Labs",
    description: "Hero Section V7 Darwin Landing Page",
    image: "/images/v7-cover.avif",
    video: "/videos/v7-video.mp4",
    type: "Inteligência Artificial"
  },
  {
    id: 2,
    title: "Really",
    category: "Website",
    description: "Projeto Website Really",
    image: "/images/really-cover.avif",
    type: "Telecom"
  },
  {
    id: 3,
    title: "Expanded",
    category: "Landing Page",
    description: "Hero section projeto Expanded",
    image: "/images/expanded-cover.avif",
    video: "/videos/expanded-video.webm",
    type: "Educação"
  },
  {
    id: 4,
    title: "Hospital da Pele",
    category: "Website",
    description: "Mockup mobile da página inicial do Hospital da Pele Curitiba.",
    image: "/images/hospital-cover.avif",
    video: "/videos/hospital-video.mp4",
    type: "Saúde"
  }
]

export default function ProjectsSection() {
  const { t } = useLanguage()
  
  return (
    <section id="cases" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-right mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-black leading-tight max-w-4xl ml-auto">
            {t('projectsTitle')}
          </h2>
        </motion.div>

        {/* Projects Grid - Alternating Layout */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-24 mb-8 sm:mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
