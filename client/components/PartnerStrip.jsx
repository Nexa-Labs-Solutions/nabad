'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PARTNERS = [
  { label: 'METRO-HEALTH', cls: 'font-bold tracking-tighter text-2xl' },
  { label: 'VITALIS',      cls: 'font-black italic text-2xl' },
  { label: 'NEXUS_CARE',   cls: 'font-extralight tracking-widest text-2xl' },
  { label: 'MED-CORE',     cls: 'font-semibold border-b-2 border-on-surface text-2xl' },
  { label: 'BioSphere',    cls: 'font-mono uppercase text-2xl' },
]

export default function PartnerStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-12 bg-surface-container-lowest overflow-hidden border-y border-outline-variant/10"
    >
      <div className="max-w-screen-2xl mx-auto px-8">
        <motion.h2
          className="text-center font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Trusted by Global Healthcare Networks
        </motion.h2>

        {/* Marquee wrapper */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-24 w-max opacity-40 hover:opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
            {/* Duplicate for seamless loop */}
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span key={i} className={`${p.cls} shrink-0 text-on-surface`}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
