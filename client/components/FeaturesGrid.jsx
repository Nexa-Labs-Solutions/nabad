'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    step: '01',
    icon: 'local_hospital',
    title: 'Hospital Posts a Request',
    body: 'A hospital in Saida registers an urgent blood need — specifying blood type, quantity, and urgency level. The request goes live on the Nabad network instantly.',
    cta: 'For Hospitals',
    accent: '#ff5260',
  },
  {
    step: '02',
    icon: 'travel_explore',
    title: 'Smart Donor Matching',
    body: 'Our matching engine scans nearby registered donors by blood compatibility, last donation date, and proximity — finding the right match in under 3 minutes.',
    cta: 'How It Works',
    accent: '#ffb3b3',
  },
  {
    step: '03',
    icon: 'notifications_active',
    title: 'Donors Get Alerted Instantly',
    body: 'Eligible donors receive a real-time notification with hospital details, blood type needed, and distance. One tap to confirm availability.',
    cta: 'Become a Donor',
    accent: '#00daf3',
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
      <div ref={headRef} className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
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
            How Nabad Works
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
            From Urgent Request{' '}
            <span className="text-tertiary">to Confirmed</span> Donation
          </h2>
          <p className="text-on-surface-variant text-lg">
            Three steps that connect a hospital in need with a willing donor nearby — every time.
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
            className="group bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 relative overflow-hidden cursor-default"
            variants={cardVariants}
            whileHover={{ backgroundColor: '#242a36' }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient top accent */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1"
              style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            />

            {/* Step number */}
            <span className="text-6xl font-black text-[#5b4040]/20 absolute top-6 right-6 select-none">
              {card.step}
            </span>

            {/* Icon */}
            <motion.div
              className="w-14 h-14 bg-surface-container-lowest rounded-lg flex items-center justify-center mb-8 border border-outline-variant/15"
              whileHover={{ borderColor: `${card.accent}40`, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <span
                className="material-symbols-outlined text-3xl"
                style={{ color: card.accent, fontVariationSettings: "'FILL' 1" }}
              >
                {card.icon}
              </span>
            </motion.div>

            <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">{card.body}</p>

            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
              style={{ color: card.accent }}
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
