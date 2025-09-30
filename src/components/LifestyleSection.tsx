'use client'

import { motion } from 'framer-motion'

export default function LifestyleSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Being bold is a lifestyle.
          </h2>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-lg">*</span>
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
              # Being bold is a lifestyle —
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
