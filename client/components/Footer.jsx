'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINKS = ['Network Status', 'API Docs', 'Privacy', 'Support']

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.footer
      ref={ref}
      className="bg-[#080e1a] w-full py-12 px-8 border-t border-[#5b4040]/15"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm uppercase tracking-widest font-medium">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.span
            className="text-lg font-bold text-[#ffb3b3]"
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            Nabad
          </motion.span>

          <div className="flex gap-6">
            {LINKS.map((label) => (
              <motion.a
                key={label}
                href="#"
                className="text-[#e3bebd]/60 transition-colors duration-200"
                whileHover={{ color: '#ff5260' }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </div>

        <p className="text-[#e3bebd]/40">
          © 2024 Nabad Kinetic Core. Pulse of Life.
        </p>
      </div>
    </motion.footer>
  )
}
