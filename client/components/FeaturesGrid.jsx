'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    icon: 'sync_alt',
    title: 'Real-time Matching',
    body: 'Proprietary algorithms match urgent donor types with hospital deficits in milliseconds, factoring in traffic, storage, and medical urgency.',
    cta: 'Explore Engine',
  },
  {
    icon: 'broadcast_on_home',
    title: 'Emergency Broadcast',
    body: 'One-click mass notifications to vetted donor networks. Reach thousands of potential life-savers within a 10km radius instantly.',
    cta: 'Protocols',
  },
  {
    icon: 'insights',
    title: 'Unit Analytics',
    body: 'Full supply chain visibility. Track every unit of blood from extraction to transfusion with high-fidelity cold-chain monitoring.',
    cta: 'View Specs',
  },
]

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

  return (
    <section className="py-24 max-w-screen-2xl mx-auto px-8">
      {/* Section header */}
      <div ref={headRef} className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
            Engineered for{' '}
            <span className="text-tertiary">Mission-Critical</span> Reliability
          </h2>
          <p className="text-on-surface-variant text-lg">
            Every feature is designed with a zero-failure mandate. We move blood where it's needed, seconds before it's too late.
          </p>
        </motion.div>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {['chevron_left', 'chevron_right'].map((icon) => (
            <motion.button
              key={icon}
              className="w-12 h-12 rounded-full border border-outline-variant/15 flex items-center justify-center text-on-surface-variant"
              whileHover={{ borderColor: 'rgba(255,179,179,0.4)', color: '#ffb3b3', scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <span className="material-symbols-outlined">{icon}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Cards */}
      <motion.div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={gridInView ? 'visible' : 'hidden'}
      >
        {CARDS.map((card) => (
          <motion.div
            key={card.title}
            className="group bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 relative overflow-hidden cursor-default"
            variants={cardVariants}
            whileHover={{ backgroundColor: '#242a36' }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient top accent */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-pulse-gradient"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            />

            {/* Icon */}
            <motion.div
              className="w-14 h-14 bg-surface-container-lowest rounded-lg flex items-center justify-center mb-8 border border-outline-variant/15"
              whileHover={{ borderColor: 'rgba(255,179,179,0.2)', scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <span className="material-symbols-outlined text-primary text-3xl">{card.icon}</span>
            </motion.div>

            <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">{card.body}</p>

            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest"
              whileHover={{ gap: '16px' }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {card.cta}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
