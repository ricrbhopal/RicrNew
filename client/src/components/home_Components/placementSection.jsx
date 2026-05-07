import React, {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

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

    // initial hidden
    gsap.set(path, {

      strokeDasharray:
        pathLength,

      strokeDashoffset:
        pathLength,

    });

    // ========================================
    // SCROLL TRIGGER
    // ========================================

const trigger = gsap.to(path, {

  strokeDashoffset: 0,

  ease: "none",

  scrollTrigger: {

    trigger: section,

    start: "top top",

    end: "+=2000",

    scrub: true,

    pin: true,

    pinSpacing: true,

    anticipatePin: 1,

    invalidateOnRefresh: true,

    // 🔥 IMPORTANT
    toggleActions:
      "play reverse play reverse",

    // ========================================
    // NAVBAR
    // ========================================

    onEnter: () => {

      gsap.to(".main-navbar", {

        y: -120,

        opacity: 0,

        duration: 0.3,

      });
    },

    onLeave: () => {

      gsap.to(".main-navbar", {

        y: 0,

        opacity: 1,

        duration: 0.3,

      });
    },

    onLeaveBack: () => {

      gsap.to(".main-navbar", {

        y: 0,

        opacity: 1,

        duration: 0.3,

      });
    },

  },

});

    return () => {

      if (
        trigger.scrollTrigger
      ) {

        trigger.scrollTrigger.kill();
      }

      trigger.kill();
    };

  }, []);

  return (

    <section
      ref={sectionRef}
      className="placement-main-wrapper"
    >

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