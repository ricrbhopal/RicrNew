import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/ProgramSkeleton.css";

gsap.registerPlugin(ScrollTrigger);

const ScrollVideoSkeleton = ({
  videoSrc,
  end = 1000,
  overlay = false,
  children,
  className = "",
  height = "100vh",
  navbarClass = "#main-navbar",
  layout = "full", // "full" or "split"
}) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const navbar = document.querySelector(navbarClass);
    if (!section || !video) return;

    let tween;
    let trigger;

    const init = () => {
      // Kill old triggers on this section
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });

      video.pause();
      try { video.currentTime = 0.01; } catch (err) {}
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";

      tween = gsap.to(video, {
        currentTime: Math.max(video.duration - 0.1, 0),
        ease: "none",
        paused: true,
      });

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${end}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        animation: tween,
        onEnter: () => {
          if (navbar) gsap.to(navbar, { y: -120, opacity: 0, duration: 0.3, ease: "power2.out" });
        },
        onEnterBack: () => {
          if (navbar) gsap.to(navbar, { y: -120, opacity: 0, duration: 0.3, ease: "power2.out" });
        },
        onLeave: () => {
          if (navbar) gsap.to(navbar, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
        },
        onLeaveBack: () => {
          if (navbar) gsap.to(navbar, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
        },
      });
    };

    const handleLoaded = () => requestAnimationFrame(init);
    if (video.readyState >= 1) handleLoaded();
    else video.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      if (trigger) trigger.kill();
      if (tween) tween.kill();
      video.removeEventListener("loadedmetadata", handleLoaded);
      if (navbar) gsap.set(navbar, { y: 0, opacity: 1 });
    };
  }, [end, navbarClass, videoSrc]);

  return (
    <section
      ref={sectionRef}
      className={`scroll-video-section ${layout === "split" ? "split-layout" : ""} ${className}`}
      style={{ height, minHeight: "100vh" }}
    >
      {layout === "split" ? (
        // SPLIT LAYOUT: left text (children) + right video
        <div className="split-container">
          <div className="split-left">{children}</div>
          <div className="split-right">
            <video
              ref={videoRef}
              muted
              playsInline
              webkit-playsinline="true"
              preload="auto"
              crossOrigin="anonymous"
              disablePictureInPicture
              className="scroll-video-element split-video"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            {overlay && <div className="scroll-video-overlay split-overlay"></div>}
          </div>
        </div>
      ) : (
        // FULL LAYOUT: original (video background + overlay content)
        <>
          <video
            ref={videoRef}
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            crossOrigin="anonymous"
            disablePictureInPicture
            className="scroll-video-element object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {overlay && <div className="scroll-video-overlay"></div>}
          <div className="scroll-video-content">{children}</div>
        </>
      )}
    </section>
  );
};

export default ScrollVideoSkeleton;