'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { useLanguage } from '../context/LanguageContext'
import NabadLogo from './NabadLogo'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { lang, toggleLanguage, t } = useLanguage()

  const NAV_LINKS = [
    { label: t.nav.howItWorks, href: '/how-it-works' },
    { label: t.nav.hospitals, href: '/hospitals' },
    { label: t.nav.faq, href: '/faq' },
    { label: t.nav.about, href: '/about' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || mobileMenuOpen
            ? 'bg-[#0d131f]/95 backdrop-blur-xl shadow-xl border-b border-white/5'
            : 'bg-transparent backdrop-blur-none'
          }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex justify-between items-center h-20 px-6 lg:px-8 w-full max-w-screen-2xl mx-auto">
          <div className={`flex items-center gap-6 lg:gap-10 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-4 lg:gap-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              <NabadLogo />
              {pathname !== '/' && pathname !== '/dashboard' && (
                <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-[1px] h-6 bg-white/10 hidden sm:block" />
                  <motion.span 
                    key={pathname}
                    initial={{ opacity: 0, x: lang === 'ar' ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] lg:text-xs font-black text-[#ff5260] uppercase tracking-[0.2em] hidden sm:block whitespace-nowrap"
                  >
                    {NAV_LINKS.find(l => l.href === pathname)?.label}
                  </motion.span>
                </div>
              )}
            </div>

            <div className={`hidden lg:flex items-center gap-8 font-medium tracking-tight ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`transition-all duration-300 text-sm whitespace-nowrap font-bold uppercase tracking-wider ${
                      isActive ? 'text-[#ff5260]' : 'text-[#e3bebd]/60 hover:text-[#ff5260]'
                    }`}
                  >
                    <motion.span 
                      whileHover={{ y: -1 }} 
                      className={`inline-block ${isActive ? 'scale-105 transition-transform' : ''}`}
                    >
                      {label}
                    </motion.span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className="h-[2px] bg-[#ff5260] mt-0.5 rounded-full"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* Language Toggle (Always visible) */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff5260]/40 transition-all group"
            >
              <span className="material-symbols-outlined text-[#ffb3b3]/60 group-hover:text-[#ff5260] text-xl transition-colors">language</span>
              <span className="text-[10px] font-black text-[#ffb3b3]/40 ml-1 group-hover:text-[#ff5260] uppercase transition-colors">
                {lang === 'en' ? 'AR' : 'EN'}
              </span>
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <SignedOut>
                <motion.button
                  onClick={() => router.push('/sign-in')}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-[#ffb3b3]/80 font-bold text-sm hover:bg-white/5 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.nav.signIn}
                </motion.button>

                <motion.button
                  onClick={() => router.push('/sign-up')}
                  className="px-6 py-2.5 bg-pulse-gradient rounded-xl text-[#5b0011] font-black text-sm glow-crimson"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.nav.register}
                </motion.button>
              </SignedOut>

              <SignedIn>
                <motion.button
                  onClick={() => router.push('/dashboard')}
                  className="px-5 py-2.5 rounded-xl border border-[#ff5260]/30 bg-[#ff5260]/5 text-[#ff5260] font-bold text-sm hover:bg-[#ff5260]/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.nav.dashboard}
                </motion.button>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10"
            >
              <span className="material-symbols-outlined text-white">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <motion.div
           initial={false}
           animate={mobileMenuOpen ? "open" : "closed"}
           variants={{
             open: { height: 'auto', opacity: 1, display: 'block' },
             closed: { height: 0, opacity: 0, transitionEnd: { display: 'none' } }
           }}
           className="lg:hidden w-full bg-[#0d131f] border-b border-white/5 overflow-hidden"
        >
          <div className="flex flex-col gap-1 p-6">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link 
                  key={label}
                  href={href}
                  className={`py-4 text-lg font-bold border-b border-white/5 last:border-0 transition-colors ${
                    isActive ? 'text-[#ff5260]' : 'text-white/70 hover:text-[#ff5260]'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
            <div className="flex flex-col gap-3 mt-6 sm:hidden">
              <button 
                 onClick={() => router.push('/sign-in')}
                 className="w-full py-4 rounded-xl border border-white/10 text-white font-bold"
              >
                {t.nav.signIn}
              </button>
              <button 
                 onClick={() => router.push('/sign-up')}
                 className="w-full py-4 bg-pulse-gradient rounded-xl text-[#5b0011] font-black"
              >
                {t.nav.register}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
}

