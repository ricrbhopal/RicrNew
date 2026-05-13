import React, {
  useEffect,
  useRef,
} from "react";

import {
  gsap,
  ScrollTrigger,
} from "../../utils/gsapConfig";

const ScrollImageSkeleton = ({
  children,
  className = "",
  end = 1400,
}) => {

  // =====================================
  // REFS
  // =====================================

  const wrapperRef =
    useRef(null);

  const pathRef =
    useRef(null);

  // =====================================
  // EFFECT
  // =====================================

  useEffect(() => {

    if (
      !wrapperRef.current ||
      !pathRef.current
    ) return;

    const ctx =
      gsap.context(() => {

        const path =
          pathRef.current;

        const pathLength =
          path.getTotalLength();

        // =====================================
        // INITIAL STATE
        // =====================================

        gsap.set(path, {

          strokeDasharray:
            pathLength,

          strokeDashoffset:
            pathLength,
        });

        // =====================================
        // DRAW EFFECT
        // =====================================

        gsap.to(path, {

          strokeDashoffset: 0,

          ease: "none",

          scrollTrigger: {

            trigger:
              wrapperRef.current,

            start:
              "top top",

            end:
              `+=${end}`,

            scrub: 1,

            pin: false,

            pinSpacing: true,

            anticipatePin: 1,

            invalidateOnRefresh: true,
          },
        });

      }, wrapperRef);

    return () => {
      ctx.revert();
    };

  }, [end]);

  return (

    <section
      ref={wrapperRef}
      className={`
        relative
        w-full
        min-h-screen
        overflow-hidden
        bg-white
        ${className}
      `}
    >

      {/* =====================================
          SVG LINE
      ===================================== */}

      <svg
        className="
          absolute
          inset-0
          w-full
          h-full
          pointer-events-none
          z-0
        "
        viewBox="0 0 1920 1200"
        preserveAspectRatio="none"
      >

        <defs>

          <linearGradient
            id="mentorGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >

            <stop
              offset="0%"
              stopColor="#5B6CFF"
              stopOpacity="0"
            />

            <stop
              offset="50%"
              stopColor="#4254ff"
              stopOpacity="1"
            />

            <stop
              offset="100%"
              stopColor="#5B6CFF"
              stopOpacity="0"
            />

          </linearGradient>

        </defs>

        <path
          ref={pathRef}
          d="
            M 1850 40

            C 1650 250,
              1500 700,
              1250 500

            S 900 120,
              700 420

            S 380 760,
              180 520

            S -80 180,
              -180 1000
          "
          fill="none"
          stroke="url(#mentorGradient)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
          style={{
            filter:
              "drop-shadow(0 0 18px rgba(74,92,255,0.35))",
          }}
        />

      </svg>

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          w-full
          min-h-screen
        "
      >

        {children}

      </div>

    </section>
  );
};

export default ScrollImageSkeleton;