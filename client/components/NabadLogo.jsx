'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import Link from 'next/link'

/**
 * NabadLogo — single source of truth for the brand mark.
 *
 * Props:
 *   size   — 'sm' | 'md' | 'lg'  (default 'md')
 *   href   — optional link target (default '/')
 *   static — if true, disables the heartbeat animation (e.g. auth pages)
 */
export default function NabadLogo({ size = 'md', href = '/', asStatic = false }) {
  const { t } = useLanguage()

  const sizes = {
    sm: { wrap: 'w-6 h-6', icon: '14px', ring1: 1.7, ring2: 2.2, text: 'text-lg' },
    md: { wrap: 'w-8 h-8', icon: '20px', ring1: 1.9, ring2: 2.4, text: 'text-2xl' },
    lg: { wrap: 'w-10 h-10', icon: '24px', ring1: 1.9, ring2: 2.4, text: 'text-3xl' },
  }

  const s = sizes[size] || sizes.md

  const heart = asStatic ? (
    <span
      className="material-symbols-outlined text-[#ff5260] relative z-10"
      style={{ fontVariationSettings: "'FILL' 1", fontSize: s.icon }}
    >
      favorite
    </span>
  ) : (
    <>
      <motion.div
        className="absolute inset-0 rounded-full border border-[#ff5260]/60"
        animate={{ scale: [1, s.ring1], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-[#ff5260]/35"
        animate={{ scale: [1, s.ring2], opacity: [0.35, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.45 }}
      />
      <motion.span
        className="material-symbols-outlined text-[#ff5260] relative z-10"
        style={{ fontVariationSettings: "'FILL' 1", fontSize: s.icon }}
        animate={{ scale: [1, 1.14, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        favorite
      </motion.span>
    </>
  )

  const inner = (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`relative ${s.wrap} flex items-center justify-center`}>
        {heart}
      </div>
      <span
        className={`${s.text} font-black tracking-tighter bg-gradient-to-br from-white via-[#ffb3b3] to-[#ff5260] bg-clip-text text-transparent italic pr-2 overflow-visible`}
        style={{ filter: 'drop-shadow(0 0 10px rgba(255,82,96,0.3))' }}
      >
        {t.brand.name}
      </span>
    </div>
  )

  if (!href) return inner

  return (
    <Link href={href} className="cursor-pointer">
      {inner}
    </Link>
  )
}
