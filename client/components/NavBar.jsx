'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const NAV_LINKS = ['How It Works', 'For Hospitals', 'For Donors', 'About']

function NabadLogo() {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer">
      <div className="relative w-8 h-8 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-[#ff5260]/60"
          animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-[#ff5260]/35"
          animate={{ scale: [1, 2.4], opacity: [0.35, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.45 }}
        />
        <motion.span
          className="material-symbols-outlined text-[#ff5260] relative z-10"
          style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}
          animate={{ scale: [1, 1.14, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          favorite
        </motion.span>
      </div>
      <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-[#ffb3b3] to-[#ff5260] bg-clip-text text-transparent">
        Nabad
      </span>
    </div>
  )
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-500 ${
        scrolled
          ? 'bg-[#0d131f]/90 shadow-xl shadow-[#080e1a]/40'
          : 'bg-[#0d131f]/50'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-center h-16 px-8 w-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-10">
          <NabadLogo />

          <div className="hidden md:flex items-center gap-6 font-medium tracking-tight">
            {NAV_LINKS.map((label) => (
              <motion.a
                key={label}
                href="#"
                className="text-[#e3bebd]/70 hover:text-[#ffb3b3] transition-colors duration-200 text-sm"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => router.push('/sign-in')}
            className="px-5 py-2 rounded-lg border border-[#ffb3b3]/25 text-[#ffb3b3] font-semibold text-sm hover:border-[#ffb3b3]/50 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            Sign In
          </motion.button>

          <motion.button
            onClick={() => router.push('/sign-up')}
            className="px-5 py-2 bg-pulse-gradient rounded-lg text-[#5b0011] font-bold text-sm glow-crimson"
            whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(255,82,96,0.45)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
