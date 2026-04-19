'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function FeaturesGrid() {
  const headRef = useRef(null)
  const gridRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-80px' })
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' })
  const { t, lang } = useLanguage()

  const STEPS = [
    {
      step: '01',
      icon: 'local_hospital',
      title: t.steps[0].title,
      body: t.steps[0].body,
      cta: t.steps[0].cta,
      accent: '#ff5260',
      href: '/sign-up?role=hospital',
    },
    {
      step: '02',
      icon: 'travel_explore',
      title: t.steps[1].title,
      body: t.steps[1].body,
      cta: t.steps[1].cta,
      accent: '#ffb3b3',
      href: '/how-it-works',
    },
    {
      step: '03',
      icon: 'notifications_active',
      title: t.steps[2].title,
      body: t.steps[2].body,
      cta: t.steps[2].cta,
      accent: '#00daf3',
      href: '/sign-up',
    },
  ]

  return (
    <section className="py-24 max-w-screen-2xl mx-auto px-8 relative overflow-hidden">
      <div ref={headRef} className={`flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block text-xs font-bold text-[#ff5260] uppercase tracking-widest mb-4"
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.steps.eyebrow}
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">
            {t.steps.title}
          </h2>
          <p className="text-on-surface-variant text-lg opacity-70">
            {t.steps.subtitle}
          </p>
        </motion.div>
      </div>

      <motion.div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={gridInView ? 'visible' : 'hidden'}
      >
        {STEPS.map((card) => (
          <motion.div
            key={card.title}
            className={`group bg-[#0d131f]/40 backdrop-blur-sm p-8 rounded-2xl border border-outline-variant/10 relative overflow-hidden transition-all duration-300 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
            variants={cardVariants}
            whileHover={{ backgroundColor: '#161c2d', borderColor: `${card.accent}30` }}
          >
            <motion.div
              className={`absolute top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} w-full h-1`}
              style={{ background: `linear-gradient(${lang === 'ar' ? '-90deg' : '90deg'}, ${card.accent}, transparent)` }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            />

            <span className={`text-6xl font-black text-[#ff5260]/10 absolute top-6 ${lang === 'ar' ? 'left-6' : 'right-6'} select-none`}>
              {card.step}
            </span>

            <motion.div
              className="w-14 h-14 bg-[#080e1a] rounded-xl flex items-center justify-center mb-8 border border-outline-variant/10 group-hover:border-[#ff5260]/30 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <span
                className="material-symbols-outlined text-3xl"
                style={{ color: card.accent, fontVariationSettings: "'FILL' 1" }}
              >
                {card.icon}
              </span>
            </motion.div>

            <h3 className="text-2xl font-bold mb-4 text-[#dde2f3] tracking-tight">{card.title}</h3>
            <p className="text-[#e3bebd]/60 leading-relaxed mb-6 text-sm">{card.body}</p>

            <Link
              href={card.href}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
              style={{ color: card.accent }}
            >
              <motion.span 
                 className="flex items-center gap-2"
                 whileHover={{ gap: '12px' }}
              >
                {card.cta}
                <span className={`material-symbols-outlined text-sm ${lang === 'ar' ? 'rotate-180' : ''}`}>arrow_forward</span>
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
