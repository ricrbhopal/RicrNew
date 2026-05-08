import React, {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import "../css/scrollVideo.css";

gsap.registerPlugin(
  ScrollTrigger
);

const ScrollVideoSkeleton = ({
  videoSrc,
  end = 5000,
  overlay = false,
  children,
  className = "",
  navbarClass = ".main-navbar",
  height = "100vh",
  scrubSpeed = 0.3,
}) => {

  const sectionRef =
    useRef(null);

  const videoRef =
    useRef(null);

  useEffect(() => {

    const section =
      sectionRef.current;

    const video =
      videoRef.current;

    if (!section || !video)
      return;

    let trigger;

    const init = () => {

      if (trigger)
        trigger.kill();

      video.pause();

      video.currentTime = 0;

      video.muted = true;

      video.playsInline = true;

trigger =
  ScrollTrigger.create({
    trigger: section,

    start: "top top",

    end: `+=${end}`,

    pin: true,

    pinSpacing: true,

    scrub: scrubSpeed,

    anticipatePin: 1,

    invalidateOnRefresh: true,

    fastScrollEnd: true,

    // ENTER
    onEnter: () => {

      gsap.to(
        navbarClass,
        {
          y: -120,

          opacity: 0,

          duration: 0.4,

          ease: "power2.out",
        }
      );
    },

    // ENTER BACK
    onEnterBack: () => {

      gsap.to(
        navbarClass,
        {
          y: -120,

          opacity: 0,

          duration: 0.4,

          ease: "power2.out",
        }
      );
    },

    // LEAVE
    onLeave: () => {

      gsap.to(
        navbarClass,
        {
          y: 0,

          opacity: 1,

          duration: 0.4,

          ease: "power2.out",
        }
      );
    },

    // LEAVE BACK
    onLeaveBack: () => {

      gsap.to(
        navbarClass,
        {
          y: 0,

          opacity: 1,

          duration: 0.4,

          ease: "power2.out",
        }
      );
    },

    onUpdate: (
      self
    ) => {

      if (
        !video.duration
      )
        return;

      video.currentTime =
        video.duration *
        self.progress;
    },
  });

      ScrollTrigger.refresh();
    };

    if (
      video.readyState >= 1
    ) {

      init();

    } else {

      video.addEventListener(
        "loadedmetadata",
        init
      );
    }

    return () => {

      if (trigger)
        trigger.kill(true);

      video.removeEventListener(
        "loadedmetadata",
        init
      );
    };

  }, [
    end,
    scrubSpeed,
    navbarClass,
  ]);

  return (
    <section
      ref={sectionRef}
      className={`
        scroll-video-section
        ${className}
      `}
      style={{
        height,
      }}
    >

      {/* SINGLE VIDEO */}

      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="
          scroll-video-element

          object-contain
        "
      >

        <source
          src={videoSrc}
          type="video/mp4"
        />

      </video>


      <div
        className="
          scroll-video-content
        "
      >
        {children}
      </div>

    </section>
  );
};

export default
  ScrollVideoSkeleton;