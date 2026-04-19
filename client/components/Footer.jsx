'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import NabadLogo from './NabadLogo'

function NabadFooterLogo() {
  const { t } = useLanguage()
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="relative w-6 h-6 flex items-center justify-center">
        <motion.div
           className="absolute inset-0 rounded-full border border-[#ff5260]/50"
           animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
           className="material-symbols-outlined text-[#ff5260] relative z-10"
           style={{ fontVariationSettings: "'FILL' 1", fontSize: '16px' }}
           animate={{ scale: [1, 1.12, 1] }}
           transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
           favorite
        </motion.span>
      </div>
      <span className="text-lg font-bold text-[#ffb3b3]">{t.brand.name}</span>
    </div>
  )
}

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const { t, lang } = useLanguage()

  const LINKS = [
    { label: t.nav.howItWorks, href: '/how-it-works' },
    { label: t.nav.hospitals, href: '/hospitals' },
    { label: t.nav.faq, href: '/faq' },
    { label: t.footer.privacy, href: '#' }
  ]

  return (
    <motion.footer
      ref={ref}
      className={`bg-[#080e1a] w-full py-12 px-8 border-t border-[#5b4040]/15 ${lang === 'ar' ? 'font-arabic' : 'font-body'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm uppercase tracking-widest font-medium ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}>
        <div className={`flex flex-col md:flex-row items-center gap-8 ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}>
          <NabadFooterLogo />

          <div className={`flex flex-wrap gap-4 justify-center ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            {LINKS.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-[#e3bebd]/60 transition-colors duration-200"
                whileHover={{ color: '#ff5260' }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>

        <p className={`text-[#e3bebd]/40 normal-case tracking-normal ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          {t.footer.copyright}
        </p>
      </div>
    </motion.footer>
  )
}
