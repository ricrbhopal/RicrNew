import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Videos from "../../assets/Home/placement.mp4";

import "../css/PlacementSection.css";

gsap.registerPlugin(ScrollTrigger);

const PlacementSection = () => {
  const sectionRef = useRef(null);

  const pathRef = useRef(null);

  const videoCardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const navbar = document.querySelector(".main-navbar");
    const path = pathRef.current;

    const video = videoCardRef.current;

    if (!section || !path || !video) return;

    // =========================
    // PATH LENGTH
    // =========================

    const pathLength = path.getTotalLength();

    // =========================
    // INITIAL STATE
    // =========================

    gsap.set(path, {
      strokeDasharray: pathLength,

      strokeDashoffset: pathLength,
    });

    gsap.set(video, {
      opacity: 0,

      scale: 0.7,

      y: 200,
    });

    // =========================
    // TIMELINE
    // =========================

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,

        start: "top top",

        end: "+=500",

        scrub: 1,

        pin: false,

        onEnter: () => {
          gsap.to(navbar, {
            y: -120,

            opacity: 0,

            duration: 0.4,

            ease: "power2.out",
          });
        },

        onEnterBack: () => {
          gsap.to(navbar, {
            y: -120,

            opacity: 0,

            duration: 0.4,

            ease: "power2.out",
          });
        },

        onLeave: () => {
          gsap.to(navbar, {
            y: 0,

            opacity: 1,

            duration: 0.4,

            ease: "power2.out",
          });
        },

        onLeaveBack: () => {
          gsap.to(navbar, {
            y: 0,

            opacity: 1,

            duration: 0.4,

            ease: "power2.out",
          });
        },
      },
    });

    // =========================
    // PATH DRAW
    // =========================

    tl.to(
      path,
      {
        strokeDashoffset: 0,

        ease: "none",
      },
      0,
    );

    // =========================
    // VIDEO FADE + SCALE
    // =========================

    tl.to(
      video,
      {
        opacity: 1,

        scale: 1,

        y: 0,

        ease: "power3.out",
      },
      0.2,
    );

    gsap.set(".left-text", {
      x: -300,

      opacity: 0,
    });

    gsap.set(".right-text", {
      x: 300,

      opacity: 0,
    });

    tl.to(
      ".left-text",
      {
        x: 0,

        opacity: 1,

        ease: "power3.out",
      },
      0.05,
    );

    tl.to(
      ".right-text",
      {
        x: 0,

        opacity: 1,

        ease: "power3.out",
      },
      0.12,
    );

    ScrollTrigger.normalizeScroll(true);

    return () => {
      tl.scrollTrigger?.kill();

      tl.kill();

      gsap.killTweensOf(path);

      gsap.killTweensOf(video);
    };
  }, []);

  return (
    <section ref={sectionRef} className="placement-main-wrapper main-section ">
      {/* ========================= */}
      {/* TEXT LEFT */}
      {/* ========================= */}

<div
  className="
    placement-text-wrapper
    placement-text-left
    left-text
  "
  style={{
    fontFamily: "Manrope, sans-serif",
    color: "#111",
  }}
>

  <h2 className="placement-heading">
    At RICR, placements
    aren’t about promises.
  </h2>

  <p className="placement-subtitle">
    They’re the result of what you
    <br />
    build,
    <br />
    practice,
    <br />
     and understand.
  </p>

</div>

      {/* ========================= */}
      {/* TEXT RIGHT */}
      {/* ========================= */}

<div
  className="
    placement-text-wrapper
    placement-text-right
    right-text
  "
  style={{
    fontFamily: "Manrope, sans-serif",
  }}
>

  <h3 className="placement-right-heading">
   We focus on making you interview-ready, 

  </h3>

  <p className="placement-right-subtitle">
   not just course-complete.
  </p>

</div>
      {/* ========================= */}
      {/* VIDEO */}
      {/* ========================= */}

      <div ref={videoCardRef} className="placement-video-card">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          webkit-playsinline="true"
          className="placement-video"
        >
          <source src={Videos} type="video/mp4" />
        </video>
      </div>


      {/* ========================= */}
      {/* SVG */}
      {/* ========================= */}

      <svg
        className="svg-line-wrapper"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >


        
  <defs>

    <linearGradient
      id="lineGradient"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
    >

      <stop
        offset="0%"
        stopColor="#4254ff"
        stopOpacity="1"
      />

      <stop
        offset="45%"
        stopColor="#4254ff"
        stopOpacity="1"
      />

      <stop
        offset="75%"
        stopColor="#4254ff"
        stopOpacity="0.45"
      />

      <stop
        offset="100%"
        stopColor="#2438ff"
        stopOpacity="0"
      />

    </linearGradient>

  </defs>
      

        <path
          ref={pathRef}
          d="
      M -100 20

      C 120 120, 260 260, 320 420

      C 380 600, 240 760, 80 700

      C -40 650, 20 420, 180 360

      C 420 280, 760 420, 980 720

      C 1120 900, 1320 820, 1450 620

      C 1540 500, 1660 520, 1740 700

      C 1810 860, 1780 1020, 1940 1120
    "
          className="animated-path"
        />
      </svg>
    </section>
  );
};

export default PlacementSection;
