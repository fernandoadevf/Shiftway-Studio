'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-black text-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Logo and Description */}
          <div className="mb-8">
            <div className="text-2xl font-bold mb-4">
              Shiftway
            </div>
            <h3 className="text-lg font-medium mb-4">
              {t('footerTitle')}
            </h3>
            <a 
              href="/contato" 
              className="inline-block bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {t('footerButton')}
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-sm text-gray-300">{t('footerCertified')}</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-300">
            <span>{t('footerCopyright')}</span>
            <span>UTC-3</span>
            <a href="#" className="hover:text-white transition-colors">{t('privacy')}</a>
            <div className="flex space-x-2">
              <button className="hover:text-white transition-colors">PT</button>
              <span>|</span>
              <button className="hover:text-white transition-colors">EN</button>
              <span>|</span>
              <button className="hover:text-white transition-colors">ES</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
