// ========================================
// PlacementSection.jsx (FINAL FIXED)
// ========================================

import React, {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";
import Videos from "../../assets/videos/placement.mp4";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import "../css/PlacementSection.css";

gsap.registerPlugin(
  ScrollTrigger
);

const PlacementSection = () => {

  const sectionRef =
    useRef(null);

  const pathRef =
    useRef(null);

  useEffect(() => {

    const section =
      sectionRef.current;

    const path =
      pathRef.current;

    if (!section || !path)
      return;

    // ========================================
    // PATH LENGTH
    // ========================================

    const pathLength =
      path.getTotalLength();

    // ========================================
    // INITIAL STATE
    // ========================================

    gsap.set(path, {

      strokeDasharray:
        pathLength,

      strokeDashoffset:
        pathLength,

    });

    // ========================================
    // ANIMATION
    // ========================================

    const animation =
      gsap.to(path, {

        strokeDashoffset: 0,

        ease: "none",

        scrollTrigger: {

          trigger: section,

          start: "top top",

        end: "bottom top",
          scrub: 1,

          pin: true,

          // 🔥 IMPORTANT FIX
          pinSpacing: false,

          anticipatePin: 1,

          invalidateOnRefresh:
            true,

          fastScrollEnd: true,

          // ========================================
          // NAVBAR HIDE
          // ========================================

          onEnter: () => {

            gsap.to(
              ".main-navbar",
              {

                y: -120,

                opacity: 0,

                duration: 0.3,

                ease:
                  "power2.out",

              }
            );
          },

          // ========================================
          // NAVBAR SHOW
          // ========================================

          onLeave: () => {

            gsap.to(
              ".main-navbar",
              {

                y: 0,

                opacity: 1,

                duration: 0.3,

                ease:
                  "power2.out",

              }
            );
          },

          onLeaveBack: () => {

            gsap.to(
              ".main-navbar",
              {

                y: 0,

                opacity: 1,

                duration: 0.3,

                ease:
                  "power2.out",

              }
            );
          },

        },

      });

    // ========================================
    // REFRESH
    // ========================================

    ScrollTrigger.refresh();

    // ========================================
    // CLEANUP
    // ========================================

    return () => {

      if (
        animation.scrollTrigger
      ) {

        animation.scrollTrigger.kill();
      }

      animation.kill();

      gsap.killTweensOf(path);

    };

  }, []);

  return (

    <section
      ref={sectionRef}
      className="placement-main-wrapper"
    >

      {/* SVG */}

      <svg
        className="svg-line-wrapper"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >

        <path

          ref={pathRef}

          d="
          M0,300
          C250,250 250,500 500,450
          C650,420 700,700 900,620
          C1100,520 1200,450 1350,500
          C1500,550 1600,850 1920,700
          "

          className="animated-path"
        />

      </svg>

    </section>
  );
};

export default PlacementSection;