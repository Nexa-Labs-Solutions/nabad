'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

const FEATURES = [
  {
    icon: 'bolt',
    title: 'Kinetic Matching',
    body: 'Our engine predicts donor fatigue and availability cycles to ensure optimal outreach timing.',
  },
  {
    icon: 'security',
    title: 'Secure Chain of Custody',
    body: 'Encrypted decentralized logs ensure patient privacy while maintaining 100% supply traceability.',
  },
]

export default function ImpactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [uptime, setUptime] = useState('99.990')

  useEffect(() => {
    if (!inView) return
    const controls = animate(99.9, 99.999, {
      duration: 2,
      delay: 0.5,
      ease: 'easeOut',
      onUpdate: (v) => setUptime(v.toFixed(3)),
    })
    return () => controls.stop()
  }, [inView])

  return (
    <section ref={ref} className="py-24 bg-surface-container-lowest relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — image */}
        <motion.div
          className="relative order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/15">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIKyj0iuvphW2Xyr4LliG0nckRwFu4uuY7o2aizDjLvthXBEE1MaYwn0EDIhozsJ6veyGEa7Sq-c5cbypn18YmZckm47h64mhdty_4E8FgPKnNxaP6ggHXK2UhFhiu3mKG2W2SGi-UE0G2J_tZ3ykJ_2YGVPjwySvjPyGz2rGROgu2GimyPYauZTG1EpQQ0OYFqvb6lHvFVfddwQIJFJpV4pKJnDINFL_vSj6SNkdgcsNR-7cDMUOQzgMjPb-q-y9fmLwSqC_o9bQ"
              alt="Modern medical laboratory with glowing blue interfaces"
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Floating stats badge */}
          <motion.div
            className="absolute -bottom-6 -right-6 bg-surface p-6 rounded-xl border border-outline-variant/20 shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-sm font-label text-tertiary mb-1 tracking-widest">REAL-TIME UPTIME</div>
            <div className="text-3xl font-black tabular-nums">{uptime}%</div>
          </motion.div>
        </motion.div>

        {/* Right — text */}
        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl font-black mb-8 leading-tight">
            Human-Centric Tech.
            <br />
            <span className="text-primary-container">Pulse-Rate Precision.</span>
          </h2>

          <div className="space-y-8">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                className="flex gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-10 h-10 shrink-0 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">{feat.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{feat.title}</h4>
                  <p className="text-on-surface-variant">{feat.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
