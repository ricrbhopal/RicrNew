// src/components/home_Components/Why.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGE_URLS = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1600&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80",
  "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&q=80",
];

const SEGMENTS = [
  { id: 0, title: "Fast", desc: "High performance and low latency for fast user experiences." },
  { id: 1, title: "Secure", desc: "Built with security best-practices and encrypted data flows." },
  { id: 2, title: "Reliable", desc: "99.9% uptime and robust fault-tolerant architecture." },
  { id: 3, title: "Support", desc: "24x7 support & SLA-backed response times." },
  { id: 4, title: "Scalable", desc: "Grows with your needs — horizontal & vertical scaling." },
  { id: 5, title: "Integrations", desc: "Easy integrations with popular tools and APIs." },
];

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function describeDonutSegment(cx, cy, innerR, outerR, startAngle, endAngle, gapAngle = 1.5) {
  const halfGap = gapAngle / 2;
  const s = startAngle + halfGap;
  const e = endAngle - halfGap;
  const p1 = polarToCartesian(cx, cy, outerR, s);
  const p2 = polarToCartesian(cx, cy, outerR, e);
  const p3 = polarToCartesian(cx, cy, innerR, e);
  const p4 = polarToCartesian(cx, cy, innerR, s);
  const largeArc = e - s <= 180 ? "0" : "1";
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
}

export default function Why() {
  const [autoActive, setAutoActive] = useState(0);

  const rotRef = useRef(null);
  const rafRef = useRef(null);
  const rotationRef = useRef(0);
  const lastTriggeredRef = useRef(null);

  const size = 520;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 240;
  const innerR = 130;

  const count = SEGMENTS.length;
  const angleStep = 360 / count;
  const gapAngle = 1.5;

  const slices = useMemo(() => {
    return SEGMENTS.map((s, i) => {
      const start = i * angleStep;
      const end = start + angleStep;
      return {
        ...s,
        start,
        end,
        d: describeDonutSegment(cx, cy, innerR, outerR, start, end, gapAngle),
        midAngle: start + angleStep / 2,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const ROTATION_SPEED = 14;
  const RIGHT_THRESHOLD = 12;
  const MARKED_POSITION = 45;
  const POP_TRANSLATE = 48;
  const POP_SCALE = 1.18;

  const palette = [
    ["#7c3aed", "#a78bfa"],
    ["#06b6d4", "#67e8f9"],
    ["#ef4444", "#fb7185"],
    ["#f97316", "#fdba74"],
    ["#10b981", "#34d399"],
    ["#6366f1", "#8b5cf6"],
  ];

  // continuous rotation + detection
  useEffect(() => {
    let lastTime = 0;
    function step(time) {
      if (!lastTime) lastTime = time;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      rotationRef.current = (rotationRef.current + ROTATION_SPEED * dt) % 360;
      if (rotRef.current) {
        rotRef.current.setAttribute("transform", `rotate(${rotationRef.current} ${cx} ${cy})`);
      }

      let found = null;
      for (let i = 0; i < slices.length; i++) {
        const s = slices[i];
        let rotatedMid = (s.midAngle + rotationRef.current) % 360;
        if (rotatedMid < 0) rotatedMid += 360;
        const normalized = rotatedMid > 180 ? rotatedMid - 360 : rotatedMid;
        if (Math.abs(normalized - MARKED_POSITION) <= RIGHT_THRESHOLD) {
          found = i;
          break;
        }
      }

      if (found !== null) {
        if (lastTriggeredRef.current !== found) {
          lastTriggeredRef.current = found;
          setAutoActive(found);
        }
      } else {
        lastTriggeredRef.current = null;
      }

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slices]);

  const activeIndex = autoActive;

  // background changes with active slice (keeps the large background image)
  const backgroundStyle = {
    backgroundImage: `url(${IMAGE_URLS[activeIndex % IMAGE_URLS.length]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section className="w-full px-6 py-12 md:py-20 h-[700px]" style={backgroundStyle}>
      <div style={{  width: "100%", height: "100%" }}>
        <div className="w-full flex flex-col h-[500px] md:flex-row items-center justify-center gap-10">
          {/* LEFT: Wheel with image-filled slices */}
          <div className="w-full md:w-1/2 flex" style={{ marginLeft: "-235px" }}>
            <div className="relative" style={{ width: size, height: size }}>
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" style={{ overflow: "visible" }}>
                {/* Define image patterns for each slice */}
                <defs>
                  {IMAGE_URLS.slice(0, slices.length).map((url, i) => (
                    <pattern
                      id={`img-${i}`}
                      key={i}
                      patternUnits="userSpaceOnUse"
                      x={cx - outerR}
                      y={cy - outerR}
                      width={outerR * 2}
                      height={outerR * 2}
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <image
                        href={url}
                        x={cx - outerR}
                        y={cy - outerR}
                        width={outerR * 2}
                        height={outerR * 2}
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </pattern>
                  ))}

                  {/* optional subtle edge gradient */}
                  {palette.map(([a, b], i) => (
                    <linearGradient id={`grad-${i}`} key={`grad-${i}`} x1="0" x2="1">
                      <stop offset="0%" stopColor={a} />
                      <stop offset="100%" stopColor={b} />
                    </linearGradient>
                  ))}
                </defs>

                {/* rotating group */}
                <g ref={rotRef}>
                  <circle cx={cx} cy={cy} r={outerR + 8} fill="rgba(255,255,255,0.02)" />

                  {slices.map((slice, idx) => {
                    const isActive = activeIndex === idx;
                    const gid = `img-${idx}`;
                    const translateDist = isActive ? POP_TRANSLATE : 0;
                    const tx = translateDist * Math.cos(((slice.midAngle - 90) * Math.PI) / 180);
                    const ty = translateDist * Math.sin(((slice.midAngle - 90) * Math.PI) / 180);

                    return (
                      <g key={idx} transform={`translate(${tx}, ${ty})`}>
                        <motion.path
                          d={slice.d}
                          fill={`url(#${gid})`}
                          stroke={isActive ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.06)"}
                          strokeWidth={isActive ? 2 : 0.8}
                          style={{
                            transformOrigin: `${cx}px ${cy}px`,
                            filter: isActive ? "drop-shadow(0 10px 30px rgba(0,0,0,0.35))" : undefined,
                          }}
                          animate={isActive ? { scale: POP_SCALE } : { scale: 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        />

                        <text
                          x={polarToCartesian(cx + tx, cy + ty, (innerR + outerR) / 2, slice.midAngle).x}
                          y={polarToCartesian(cx + tx, cy + ty, (innerR + outerR) / 2, slice.midAngle).y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          style={{
                            fontSize: 12,
                            fill: isActive ? "#fff" : "rgba(255,255,255,0.95)",
                            fontWeight: 800,
                            pointerEvents: "none",
                            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                          }}
                        >
                          {slice.title}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* fixed center */}
                <circle cx={cx} cy={cy} r={innerR - 10} fill="white" stroke="rgba(0,0,0,0.06)" />
                <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 16, fill: "black", fontWeight: 700 }}>
                  Why Choose
                </text>
                <text x={cx} y={cy + 14} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 18, fill: "black", fontWeight: 700 }}>
                  RICR
                </text>
              </svg>
            </div>
          </div>

          {/* RIGHT: details (no image) */}
          <div className="w-full md:w-1/2 pr-6 md:pr-0">
            <h2 className="text-3xl font-bold text-white mb-4">Diving</h2>
            <p className="text-slate-200 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere,
              magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.
            </p>

            <div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.28 }}
                  className="rounded-2xl p-5 bg-white/95 shadow-md border"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${palette[activeIndex % palette.length][0]}, ${palette[activeIndex % palette.length][1]})`,
                      }}
                    >
                      #{activeIndex + 1}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-black">{SEGMENTS[activeIndex].title}</h3>
                      <p className="text-sm text-slate-700">{SEGMENTS[activeIndex].desc}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
