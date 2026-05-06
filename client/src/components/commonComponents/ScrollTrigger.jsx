import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollVideoSection = ({
  videoSrc,
  title,
  description,
  end = 4000,
  overlay = true,
  className = "",
  object = "cover",
}) => {

  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {

    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    video.pause();

    const setupScroll = () => {

      ScrollTrigger.create({

        trigger: section,

        // 🔥 PIN SECTION
        pin: true,

        start: "top top",

        end: `+=${end}`,

        scrub: 1,

        // 🔥 NAVBAR HIDE
        onEnter: () => {
          gsap.to(".main-navbar", {
            y: -120,
            opacity: 0,
            duration: 0.5,
          });
        },

        // 🔥 NAVBAR SHOW
        onLeave: () => {
          gsap.to(".main-navbar", {
            y: 0,
            opacity: 1,
            duration: 0.5,
          });
        },

        // 🔥 SCROLL UP
        onEnterBack: () => {
          gsap.to(".main-navbar", {
            y: -120,
            opacity: 0,
            duration: 0.5,
          });
        },

        // 🔥 TOP SHOW
        onLeaveBack: () => {
          gsap.to(".main-navbar", {
            y: 0,
            opacity: 1,
            duration: 0.5,
          });
        },

        // 🔥 VIDEO CONTROL
        onUpdate: (self) => {

          if (video.duration) {

            video.currentTime =
              video.duration * self.progress;
          }
        },
      });

    };

    video.addEventListener(
      "loadedmetadata",
      setupScroll
    );

    return () => {

      ScrollTrigger.getAll().forEach((t) =>
        t.kill()
      );

      video.removeEventListener(
        "loadedmetadata",
        setupScroll
      );
    };

  }, [end]);

  return (
    <section
      ref={sectionRef}
      className={`
        relative
        w-full
        h-screen
        overflow-hidden
        bg-white
        ${className}
      `}
    >

      {/* VIDEO */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className={`
          absolute
          inset-0
          w-full
          h-full
          ${object === "contain"
            ? "object-contain"
            : "object-cover"}
        `}
      >
        <source
          src={videoSrc}
          type="video/mp4"
        />
      </video>

      {/* OVERLAY */}
      {/* {overlay && (
        <div className="absolute inset-0 bg-black/30" />
      )} */}

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center text-white">

        <div className="text-center px-6">

          {title && (
            <h1 className="text-5xl md:text-7xl font-bold">
              {title}
            </h1>
          )}

          {description && (
            <p className="mt-6 text-xl max-w-2xl mx-auto">
              {description}
            </p>
          )}

        </div>

      </div>

    </section>
  );
};

export default ScrollVideoSection;