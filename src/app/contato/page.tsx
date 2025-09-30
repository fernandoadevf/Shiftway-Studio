'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContatoPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    console.log('Dados do formulário:', formData) // LOG 1
    
    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxF6Bttl3TiwGHndgxOL69pCa9gka6lWEJlg-FGV4TjRfYW6gCA2NFGwxWAt7ta46Y/exec'
      
      console.log('Enviando para:', GOOGLE_SCRIPT_URL) // LOG 2
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      console.log('Resposta:', response) // LOG 3
      
      setSubmitStatus('success')
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      })
      
      setTimeout(() => setSubmitStatus('idle'), 5000)
      
    } catch (error) {
      console.error('Erro ao enviar:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Esconder o Header principal na página de contato */
          header:not([data-contact-header]) {
            display: none !important;
          }
          /* Esconder qualquer elemento com classes do Header principal */
          .fixed.top-0.left-0.right-0.z-50.bg-white {
            display: none !important;
          }
        `
      }} />
      <div data-page="contato">
        <header className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-md border-b border-gray-800" data-contact-header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
              <span>{t('backButton')}</span>
            </Link>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white flex items-center justify-center mr-2">
                <span className="text-black font-bold text-sm">S</span>
              </div>
              <div className="text-lg font-bold text-white">
                Shiftway
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight mb-6">
              {t('contactTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              {t('contactSubtitle')}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {submitStatus === 'success' && (
              <div className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-center">
                {t('successMessage')}
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-center">
                {t('errorMessage')}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('nameLabel')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500"
                  placeholder={t('namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('emailLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500"
                  placeholder={t('emailPlaceholder')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('phoneLabel')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500"
                  placeholder={t('phonePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('companyLabel')}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500"
                  placeholder={t('companyPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                {t('messageLabel')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500 resize-none"
                placeholder={t('messagePlaceholder')}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('submittingButton') : t('submitButton')}
              </button>
            </div>
          </motion.form>
        </div>
      </section>
      </div>
    </main>
  )
}