// src/components/home_Components/Why.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Why.jsx
 * Donut-style segmented wheel with gaps between slices, auto-cycling active slice,
 * active slice "pops out" (translates outward + scales), and right-side details.
 *
 * Drop into a Vite+React+Tailwind project with framer-motion installed.
 */

const SEGMENTS = [
  { id: 0, title: 'Fast', desc: 'High performance and low latency for fast user experiences.' },
  { id: 1, title: 'Secure', desc: 'Built with security best-practices and encrypted data flows.' },
  { id: 2, title: 'Reliable', desc: '99.9% uptime and robust fault-tolerant architecture.' },
  { id: 3, title: 'Support', desc: '24x7 support & SLA-backed response times.' },
  { id: 4, title: 'Scalable', desc: 'Grows with your needs — horizontal & vertical scaling.' },
  { id: 5, title: 'Integrations', desc: 'Easy integrations with popular tools and APIs.' },
]

// helper: degrees -> cartesian
function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  }
}

// helper: create donut segment path between startAngle and endAngle,
// with small internal gapAngle to separate slices visually.
function describeDonutSegment(cx, cy, innerR, outerR, startAngle, endAngle, gapAngle = 1) {
  // shrink angles by half gap each side
  const halfGap = gapAngle / 2
  const s = startAngle + halfGap
  const e = endAngle - halfGap

  // points
  const p1 = polarToCartesian(cx, cy, outerR, s)
  const p2 = polarToCartesian(cx, cy, outerR, e)
  const p3 = polarToCartesian(cx, cy, innerR, e)
  const p4 = polarToCartesian(cx, cy, innerR, s)

  // flags
  const largeArc = e - s <= 180 ? '0' : '1'

  // path: move to p1, arc outer to p2, line to p3, arc inner back to p4, close
  const d = [
    `M ${p1.x} ${p1.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    'Z',
  ].join(' ')
  return d
}

export default function Why() {
  const [hovered, setHovered] = useState(null) // user hover/focus
  const [autoActive, setAutoActive] = useState(0) // auto-cycling index
  const autoRef = useRef(null)
  const size = 360
  const cx = size / 2
  const cy = size / 2
  const outerR = 200
  const innerR = 98
  const count = SEGMENTS.length
  const angleStep = 360 / count
  const gapAngle = 1 // degrees gap between slices to mimic video separation

  // slices with paths
  const slices = useMemo(() => {
    return SEGMENTS.map((s, i) => {
      const start = i * angleStep
      const end = start + angleStep
      return {
        ...s,
        start,
        end,
        d: describeDonutSegment(cx, cy, innerR, outerR, start, end, gapAngle),
        midAngle: start + angleStep / 2,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  const activeIndex = hovered !== null ? hovered : autoActive
  const isPaused = hovered !== null // pause rotation while interacting

  // auto-cycle: change active slice every 2.8s when not hovered
  useEffect(() => {
    if (autoRef.current) {
      clearInterval(autoRef.current)
      autoRef.current = null
    }
    if (hovered === null) {
      autoRef.current = setInterval(() => {
        setAutoActive((prev) => (prev + 1) % count)
      }, 2800)
    }
    return () => {
      if (autoRef.current) {
        clearInterval(autoRef.current)
        autoRef.current = null
      }
    }
  }, [hovered, count])

  // palette
  const palette = [
    ['#7c3aed', '#a78bfa'],
    ['#06b6d4', '#67e8f9'],
    ['#ef4444', '#fb7185'],
    ['#f97316', '#fdba74'],
    ['#10b981', '#34d399'],
    ['#6366f1', '#8b5cf6'],
  ]

  // keyframes inline for rotation
  const rotationDuration = 50 // seconds for full rotation
  const rotationStyle = isPaused ? '' : `spin-wheel ${rotationDuration}s linear infinite`

  return (
    <section className="w-full px-6 py-12 md:py-20">
      <style>{`
        @keyframes spin-wheel {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-8">
        {/* Wheel */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative" aria-hidden="false">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className={`relative ${!isPaused ? 'will-change-transform' : ''}`}
              style={{ animation: !isPaused ? rotationStyle : 'none', overflow: 'visible' }}
              role="img"
              aria-label="Features wheel"
            >
              {/* subtle outer glow/background */}
              <defs>
                <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g transform={`translate(0,0)`}>
                {/* base ring to give depth */}
                <circle cx={cx} cy={cy} r={outerR + 8} fill="rgba(255,255,255,0.02)" />

                {slices.map((slice, idx) => {
                  const isActive = activeIndex === idx
                  const isHovered = hovered === idx
                  const [c1, c2] = palette[idx % palette.length]
                  const gid = `g${idx}`
                  // translate outward when active to create pop-out (move along midAngle direction)
                  const translateDist = isActive ? 14 : 0
                  const tx = translateDist * Math.cos(((slice.midAngle - 90) * Math.PI) / 180)
                  const ty = translateDist * Math.sin(((slice.midAngle - 90) * Math.PI) / 180)

                  return (
                    <g key={idx} transform={`translate(${tx}, ${ty})`}>
                      <defs>
                        <linearGradient id={gid} x1="0" x2="1">
                          <stop offset="0%" stopColor={c1} />
                          <stop offset="100%" stopColor={c2} />
                        </linearGradient>
                      </defs>

                      <motion.path
                        d={slice.d}
                        fill={`url(#${gid})`}
                        stroke={isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.06)'}
                        strokeWidth={isActive ? 3 : 1}
                        style={{ cursor: 'pointer', transformOrigin: `${cx}px ${cy}px` }}
                        animate={isActive ? { scale: 1.03 } : { scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(idx)}
                        onBlur={() => setHovered(null)}
                        tabIndex={0}
                        aria-label={`${slice.title} feature`}
                      />

                      {/* label on the slice (keeps readable by not translating) */}
                      {(() => {
                        const labelR = (innerR + outerR) / 2
                        const pos = polarToCartesian(cx + tx, cy + ty, labelR, slice.midAngle)
                        return (
                          <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                              fontSize: 12,
                              fill: isActive ? '#fff' : 'rgba(255,255,255,0.92)',
                              fontWeight: 700,
                              pointerEvents: 'none',
                              fontFamily:
                                'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue"',
                            }}
                          >
                            {slice.title}
                          </text>
                        )
                      })()}
                    </g>
                  )
                })}

                {/* inner circle (knob) */}
                <circle cx={cx} cy={cy} r={innerR - 8} fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.04)" />
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: 13, fill: 'white', fontWeight: 700 }}
                >
                  Features
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            {activeIndex != null ? (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="rounded-2xl p-6 bg-gradient-to-br from-white/6 to-white/3 backdrop-blur-sm border border-white/8"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${palette[activeIndex % palette.length][0]} 0%, ${palette[activeIndex % palette.length][1]} 100%)`,
                    }}
                    aria-hidden="true"
                  >
                    <span className="text-white font-bold text-sm">#{activeIndex + 1}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {SEGMENTS[activeIndex].title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-300 max-w-xl">
                      {SEGMENTS[activeIndex].desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="px-3 py-1 rounded-md bg-white/6 text-white text-sm hover:bg-white/10 transition">
                    Learn more
                  </button>
                  <button className="px-3 py-1 rounded-md border border-white/6 text-sm text-slate-200 hover:bg-white/6 transition">
                    Contact us
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24 }}
                className="rounded-2xl p-6 bg-white/3 backdrop-blur-sm border border-white/6"
              >
                <h3 className="text-lg font-semibold text-white">Hover a slice</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Move your cursor over any segment to pause the wheel and read details about that
                  feature. The wheel auto-highlights segments when idle.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
