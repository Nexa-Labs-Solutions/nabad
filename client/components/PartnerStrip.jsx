'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PARTNERS = [
  { label: 'HAMMOUD HOSPITAL',   cls: 'font-bold tracking-tight text-xl' },
  { label: 'LABIB MEDICAL',      cls: 'font-black italic text-xl' },
  { label: 'RED CROSS LEBANON',  cls: 'font-extralight tracking-widest text-xl' },
  { label: 'SAIDA GOV. HOSPITAL',cls: 'font-semibold text-xl' },
  { label: 'MAKASSED',           cls: 'font-mono uppercase text-xl' },
  { label: 'RIZK HOSPITAL',      cls: 'font-bold tracking-tighter text-xl' },
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
          Partner Hospitals Across South Lebanon
        </motion.h2>

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-24 w-max opacity-40 hover:opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
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
