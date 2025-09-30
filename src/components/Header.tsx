'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Language } from '@/lib/translations'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xs sm:text-sm">S</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-black">
              Shiftway
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6">
            <button 
              onClick={() => {
                const element = document.getElementById('cases')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }} 
              className="text-gray-700 hover:text-black transition-colors text-sm lg:text-base"
            >
              {t('cases')}
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('servicos')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }} 
              className="text-gray-700 hover:text-black transition-colors text-sm lg:text-base"
            >
              {t('services')}
            </button>
            <Link 
              href="/contato" 
              className="text-gray-700 hover:text-black transition-colors flex items-center text-sm lg:text-base"
            >
              {t('contact')}
              <svg className="ml-1 w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </nav>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <button 
              onClick={() => setLanguage('pt')}
              className={`text-xs lg:text-sm font-medium px-2 py-1 rounded transition-colors ${
                language === 'pt' ? 'text-black bg-gray-100' : 'text-gray-500 hover:text-black'
              }`}
            >
              PT
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`text-xs lg:text-sm font-medium px-2 py-1 rounded transition-colors ${
                language === 'en' ? 'text-black bg-gray-100' : 'text-gray-500 hover:text-black'
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('es')}
              className={`text-xs lg:text-sm font-medium px-2 py-1 rounded transition-colors ${
                language === 'es' ? 'text-black bg-gray-100' : 'text-gray-500 hover:text-black'
              }`}
            >
              ES
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-black transition-colors p-1"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <button 
                onClick={() => {
                  const element = document.getElementById('cases')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                  setIsMenuOpen(false)
                }} 
                className="block w-full text-left px-3 py-3 text-gray-700 hover:text-black transition-colors text-base"
              >
                {t('cases')}
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('servicos')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                  setIsMenuOpen(false)
                }} 
                className="block w-full text-left px-3 py-3 text-gray-700 hover:text-black transition-colors text-base"
              >
                {t('services')}
              </button>
              <Link 
                href="/contato" 
                className="block px-3 py-3 text-gray-700 hover:text-black transition-colors text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              <div className="flex items-center space-x-4 px-3 py-3 border-t border-gray-100">
                <button 
                  onClick={() => setLanguage('pt')}
                  className={`text-sm font-medium transition-colors ${
                    language === 'pt' ? 'text-black' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  PT
                </button>
                <span className="text-gray-300">|</span>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`text-sm font-medium transition-colors ${
                    language === 'en' ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  EN
                </button>
                <span className="text-gray-300">|</span>
                <button 
                  onClick={() => setLanguage('es')}
                  className={`text-sm font-medium transition-colors ${
                    language === 'es' ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  ES
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
