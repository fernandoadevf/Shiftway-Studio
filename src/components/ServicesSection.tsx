'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface Service {
  id: number
  title: string
  number: string
  items: string[]
}

const services: Service[] = [
  {
    id: 1,
    title: "Design",
    number: "(01)",
    items: [
      "UI Design",
      "UX Design", 
      "Wireframes",
      "Websites",
      "Dashboards"
    ]
  },
  {
    id: 2,
    title: "Web design",
    number: "(02)",
    items: [
      "UX/UI Design",
      "Desenvolvimento no Framer",
      "SEO",
      "CMS",
      "Manutenção e Suporte"
    ]
  },
]

export default function ServicesSection() {
  const { t } = useLanguage()
  
  return (
    <section id="servicos" className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services List */}
        <div className="divide-y divide-gray-800">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 pb-8 sm:pb-12"
          >
            <div className="flex-shrink-0 md:w-3/2">
                <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-medium text-white leading-tight">
                {t('servicesTitle')}
              </h2>
            </div>
            <div className="flex-1"></div>
          </motion.div>

          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 py-8 sm:py-12"
            >
              {/* Service Title and Number */}
              <div className="flex-shrink-0 md:w-1/10 w-full md:w-auto">
                <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-white leading-tight">
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-gray-300">{service.number}</span><br />
                  {service.title}
                </h3>
              </div>

              {/* Service Items as Pills */}
              <div className="flex-1 flex items-start pt-8 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-32">
                <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                  {service.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="border border-white text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white hover:text-black transition-colors cursor-pointer"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
