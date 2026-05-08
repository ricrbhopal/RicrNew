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

  end: "+=800",

  scrub: 1,

  pin: false,
}
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
      0
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
      0.2
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
    <section
      ref={sectionRef}
      className="placement-main-wrapper main-section "
    >
      {/* ========================= */}
      {/* TEXT LEFT */}
      {/* ========================= */}

      <div
        className="
          placement-text-wrapper
          placement-text-left
        "
        style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: "700",
          color: "#111",
        }}
      >
        At RICR, placements aren’t about promises.
        <br />
        They’re the result of what you build,
        practice, and understand.
      </div>

      {/* ========================= */}
      {/* TEXT RIGHT */}
      {/* ========================= */}

      <div
        className="
          placement-text-wrapper
          placement-text-right
          placement-text-small
        "
        style={{
          fontFamily: "Manrope, sans-serif",
        }}
      >
        We focus on making you interview-ready,
        <br />
        not just course-complete.
      </div>

      {/* ========================= */}
      {/* VIDEO */}
      {/* ========================= */}

      <div
        ref={videoCardRef}
        className="placement-video-card"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
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