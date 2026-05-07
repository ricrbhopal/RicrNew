import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/scrollVideo.css";

gsap.registerPlugin(ScrollTrigger);

const ScrollVideoSkeleton = ({
  videoSrc,
  end = 4000,
  overlay = false,
  children,
  className = "",
  navbarClass = ".main-navbar",
  height = "100vh",
  scrubSpeed = 0.1,
}) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let trigger;

    const setFullscreen = (val) => {
      if (val) section.classList.add("video-fullscreen");
      else section.classList.remove("video-fullscreen");
    };

    const init = () => {
      if (trigger) trigger.kill();

      video.pause();
      video.playsInline = true;
      video.muted = true;

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${end}`,
        pin: true,
        pinSpacing: true,
        scrub: scrubSpeed,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onEnter: () => {
          gsap.to(navbarClass, {
            y: -120,
            opacity: 0,
            duration: 0.3,
          });
        },

        onLeaveBack: () => {
          gsap.to(navbarClass, {
            y: 0,
            opacity: 1,
            duration: 0.3,
          });
        },

        onUpdate: (self) => {
          if (!video.duration) return;

          const progress = self.progress;

          // smooth video sync
          video.currentTime = video.duration * progress;

          // 🔥 IMPORTANT: threshold stable (no flicker)
          if (progress >= 0.92) {
            setFullscreen(true);
          } else {
            setFullscreen(false);
          }
        },
      });

      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) init();
    else video.addEventListener("loadedmetadata", init);

    return () => {
      if (trigger) trigger.kill(true);
      video.removeEventListener("loadedmetadata", init);
    };
  }, [end, scrubSpeed, navbarClass]);

  return (
    <section
      ref={sectionRef}
      className={`scroll-video-section ${className}`}
      style={{ height }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="scroll-video-element"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {overlay && <div className="scroll-video-overlay" />}

      <div className="scroll-video-content">
        {children}
      </div>
    </section>
  );
};

export default ScrollVideoSkeleton;