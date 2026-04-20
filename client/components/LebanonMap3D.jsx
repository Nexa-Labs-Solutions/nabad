'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useEffect, useState } from 'react'
import { FULL_LEBANON_PATH, LOCATIONS } from './map-constants'

export default function LebanonMap3D() {
  const { lang } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="relative w-full h-[480px] lg:h-[580px] flex items-center justify-center pointer-events-none select-none mt-0 lg:-mt-16">
      <div className="relative transform-gpu scale-[0.65] lg:scale-[1.1]" style={{ transform: 'perspective(1200px) rotateX(15deg) rotateY(-8deg) rotateZ(0deg)' }}>
        
        {/* SVG Definitions for Reuse */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <path id="lebanon-path" d={FULL_LEBANON_PATH} />
          </defs>
        </svg>

        {/* Shadow Layer */}
        <svg
          viewBox="0 0 10000 10000"
          className="absolute inset-0 w-full h-full opacity-30 blur-xl translate-y-12 translate-x-6 mix-blend-multiply"
        >
          <g transform="translate(0, 10240) scale(1, -1)">
             <use href="#lebanon-path" fill="#000000" />
          </g>
        </svg>

        {/* Extrusion Layers (3D Depth) */}
        {(isMobile ? [10] : [14, 10, 6, 2]).map((offset, i) => (
          <svg
            key={i}
            viewBox="0 0 10000 10000"
            className="absolute inset-0 w-full h-full"
            style={{ transform: `translateZ(-${offset}px) translateY(${offset}px)` }}
          >
            <g transform="translate(0, 10240) scale(1, -1)">
                <use
                   href="#lebanon-path"
                   fill="#3d0000"
                   stroke="#1a0000"
                   strokeWidth="20"
                />
            </g>
          </svg>
        ))}

        {/* Main Surface Layer */}
        <svg
          viewBox="0 0 10000 10000"
          className="relative w-full h-full drop-shadow-[0_0_20px_rgba(255,82,96,0.25)]"
          style={{ width: '550px', height: '550px' }}
        >
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#12091a" />
              <stop offset="50%" stopColor="#1f0a0e" />
              <stop offset="100%" stopColor="#0d0f1a" />
            </linearGradient>
            
            <pattern id="grid" x="0" y="0" width="1000" height="1000" patternUnits="userSpaceOnUse">
              <path d="M 1000 0 L 0 0 0 1000" fill="none" stroke="rgba(255,82,96,0.06)" strokeWidth="15"/>
            </pattern>

            <filter id="glow">
                <feGaussianBlur stdDeviation={isMobile ? "40" : "60"} result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>

          <g transform="translate(0, 10240) scale(1, -1)">
            {/* Base Path */}
            <use
                href="#lebanon-path"
                fill="url(#mapGradient)"
                stroke="#ff5260"
                strokeWidth="50"
                className="opacity-95"
            />
            <use
                href="#lebanon-path"
                fill="url(#grid)"
                className="opacity-30"
            />

            {/* Internal Borders / Regions Glow */}
            {!isMobile && (
              <motion.path
                  d={FULL_LEBANON_PATH}
                  fill="none"
                  stroke="#ff5260"
                  strokeWidth="30"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0.05, 0.25, 0.05] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            )}

            {LOCATIONS.map((loc, i) => (
                <g key={`${loc.name.en}-${lang}`}>
                    <motion.circle
                        cx={loc.x}
                        cy={loc.y}
                        r="300"
                        fill={loc.urgent ? "#ff5260" : "#ffb3b3"}
                        initial={{ scale: 0.4, opacity: 0.9 }}
                        animate={{ scale: [0.4, 2.8], opacity: [0.9, 0] }}
                        transition={{ duration: isMobile ? 3.5 : 2.8, repeat: Infinity, delay: i * 0.5 }}
                    />
                    
                    <circle
                        cx={loc.x}
                        cy={loc.y}
                        r="100"
                        fill={loc.urgent ? "#ff5260" : "#ffb3b3"}
                        filter="url(#glow)"
                        className="drop-shadow-[0_0_15px_rgba(255,82,96,0.8)]"
                    />

                    <g transform={`translate(${loc.x + 200}, ${loc.y}) scale(1, -1)`}>
                        <text
                            x="0"
                            y="0"
                            fill="#ffffff"
                            fontSize="220"
                            fontWeight="900"
                            className="opacity-70 select-none uppercase tracking-tighter"
                            style={{ fontFamily: lang === 'ar' ? "'IBM Plex Sans Arabic', sans-serif" : 'Inter, sans-serif', direction: lang === 'ar' ? 'rtl' : 'ltr' }}
                        >
                            {loc.name[lang]}
                        </text>
                    </g>
                </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="absolute bottom-8 right-16 translate-x-4 hidden md:block">
        <div className="backdrop-blur-2xl bg-[#080e1a]/70 px-5 py-4 rounded-2xl border border-[#ff5260]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5260] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5260]" />
            </span>
            <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Live · Saida</span>
          </div>
          <p className="text-white font-black text-base leading-none">2 urgent requests</p>
          <p className="text-[#ff5260] text-xs font-bold mt-1">O− · A+ needed now</p>
        </div>
      </div>
    </div>
  )
}
