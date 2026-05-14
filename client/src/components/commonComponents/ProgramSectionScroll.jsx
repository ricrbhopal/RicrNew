

// ScrollVideoSkeleton.jsx
// SVG line animation + scroll controlled video

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/ProgramScroll.css";

gsap.registerPlugin(ScrollTrigger);

const ProgramSectionScroll = ({
  videoSrc,
  end = 4000,
  overlay = false,
  children,
  className = "",
  height = "100vh",
  navbarClass = "#main-navbar",
  layout = "full",
}) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const path = pathRef.current;
    const navbar = document.querySelector(navbarClass);

    if (!section || !video || !path) return;

    let masterTl;

    const init = () => {
      // Clear old triggers for this section
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });

      // -------------------------------
      // VIDEO SETUP
      // -------------------------------
      video.pause();
      video.muted = true;
      video.playsInline = true;

      try {
        video.currentTime = 0.01;
      } catch (e) {}

      // -------------------------------
      // SVG PATH SETUP
      // -------------------------------
      const pathLength = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // -------------------------------
      // MASTER TIMELINE
      // -------------------------------
      masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${end}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onEnter: () => {
            if (navbar) {
              gsap.to(navbar, {
                y: -120,
                opacity: 0,
                duration: 0.3,
              });
            }
          },

          onEnterBack: () => {
            if (navbar) {
              gsap.to(navbar, {
                y: -120,
                opacity: 0,
                duration: 0.3,
              });
            }
          },

          onLeave: () => {
            if (navbar) {
              gsap.to(navbar, {
                y: 0,
                opacity: 1,
                duration: 0.3,
              });
            }
          },

          onLeaveBack: () => {
            if (navbar) {
              gsap.to(navbar, {
                y: 0,
                opacity: 1,
                duration: 0.3,
              });
            }
          },
        },
      });

      // -------------------------------
      // 1. SVG LINE DRAW
      // -------------------------------
      masterTl.to(
        path,
        {
          strokeDashoffset: 0,
          ease: "none",
        },
        0,
      );

      // -------------------------------
      // 2. VIDEO PLAY BY SCROLL
      // -------------------------------
      masterTl.to(
        video,
        {
          currentTime: Math.max(video.duration - 0.1, 0),
          ease: "none",
        },
        0,
      );

      // -------------------------------
      // 3. CONTENT FADE IN
      // -------------------------------
      masterTl.fromTo(
        ".split-left > *",
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
        0.1,
      );
    };

    const handleLoaded = () => requestAnimationFrame(init);

    if (video.readyState >= 1) {
      handleLoaded();
    } else {
      video.addEventListener("loadedmetadata", handleLoaded);
    }

    return () => {
      masterTl?.scrollTrigger?.kill();
      masterTl?.kill();
      video.removeEventListener("loadedmetadata", handleLoaded);

      if (navbar) {
        gsap.set(navbar, { y: 0, opacity: 1 });
      }
    };
  }, [videoSrc, end, navbarClass]);

  return (
    <section
      ref={sectionRef}
      className={`scroll-video-section ${
        layout === "split" ? "split-layout" : ""
      } ${className}`}
      style={{ height, minHeight: "100vh" }}
    >
{/* SVG Background */}
{/* SVG Background */}
<svg
  className="program-svg-line"
  viewBox="0 0 1920 1200"
  preserveAspectRatio="none"
>
  <defs>
    <linearGradient
      id="programLineGradient"
      x1="100%"
      y1="0%"
      x2="0%"
      y2="0%"
    >
      <stop offset="0%" stopColor="#4254ff" stopOpacity="1" />
      <stop offset="50%" stopColor="#6d7cff" stopOpacity="1" />
      <stop offset="100%" stopColor="#4254ff" stopOpacity="0" />
    </linearGradient>
  </defs>

  <path
    ref={pathRef}
    d="
      M 1910 0

      C 1880 180,
        1780 420,
        1600 520

      S 1220 220,
        980 420

      S 620 760,
        360 520

      S 80 180,
        -150 1150
    "
    className="program-animated-path"
  />
</svg>

      {layout === "split" ? (
        <div className="split-container">
          <div className="split-left">{children}</div>

          <div className="split-right ">
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              disablePictureInPicture
              className="scroll-video-element "
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            disablePictureInPicture
            className="scroll-video-element "
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          <div className="scroll-video-content">{children}</div>
        </>
      )}
    </section>
  );
};

export default ProgramSectionScroll;
