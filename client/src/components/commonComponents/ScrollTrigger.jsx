import React, {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import { ScrollTrigger }
from "gsap/ScrollTrigger";

gsap.registerPlugin(
  ScrollTrigger
);

const ScrollVideoSkeleton = ({

  // 🔥 REQUIRED
  videoSrc,

  // 🔥 OPTIONAL
  title = "",

  description = "",

  // 🔥 SCROLL LENGTH
  end = 4000,

  // 🔥 VIDEO STYLE
  object = "cover",

  // 🔥 OVERLAY
  overlay = false,

  // 🔥 CUSTOM CONTENT
  children,

  // 🔥 EXTRA CLASS
  className = "",

  // 🔥 NAVBAR
  navbarClass =
    ".main-navbar",

  // 🔥 HEIGHT
  height = "100vh",

}) => {

  const sectionRef =
    useRef(null);

  const videoRef =
    useRef(null);

  useEffect(() => {

    const video =
      videoRef.current;

    const section =
      sectionRef.current;

    if (
      !video ||
      !section
    )
      return;

    video.pause();

    let trigger;

    const setupScroll = () => {

      trigger =
        ScrollTrigger.create({

          trigger: section,

          // 🔥 PIN SECTION
          pin: true,

          pinSpacing: true,

          start: "top top",

          end: `+=${end}`,

          scrub: 1,

          invalidateOnRefresh:
            true,

          // 🔥 NAVBAR HIDE
          onEnter: () => {

            gsap.to(
              navbarClass,
              {
                y: -120,
                opacity: 0,
                duration: 0.5,
              }
            );
          },

          // 🔥 NAVBAR SHOW
          onLeave: () => {

            gsap.to(
              navbarClass,
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
              }
            );
          },

          // 🔥 SCROLL UP
          onEnterBack: () => {

            gsap.to(
              navbarClass,
              {
                y: -120,
                opacity: 0,
                duration: 0.5,
              }
            );
          },

          // 🔥 TOP SHOW
          onLeaveBack: () => {

            gsap.to(
              navbarClass,
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
              }
            );
          },

          // 🔥 VIDEO CONTROL
          onUpdate: (
            self
          ) => {

            if (
              video.duration
            ) {

              video.currentTime =
                video.duration *
                self.progress;
            }
          },
        });

      ScrollTrigger.refresh();
    };

    video.addEventListener(
      "loadedmetadata",
      setupScroll
    );

    return () => {

      if (trigger) {
        trigger.kill();
      }

      video.removeEventListener(
        "loadedmetadata",
        setupScroll
      );
    };

  }, [
    end,
    navbarClass,
  ]);

  return (

    <section
      ref={sectionRef}
      className={`
        relative
        w-full
        overflow-hidden
        bg-white
        ${className}
      `}
      style={{
        height,
      }}
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
          ${
            object ===
            "contain"
              ? "object-contain"
              : "object-cover"
          }
        `}
      >

        <source
          src={videoSrc}
          type="video/mp4"
        />

      </video>

      {/* OVERLAY */}
      {overlay && (

        <div
          className="
            absolute
            inset-0
            bg-black/30
            z-10
          "
        />

      )}

      {/* CONTENT */}
      <div
        className="
          relative
          z-20
          h-full
          flex
          items-center
          justify-center
          text-white
        "
      >

        {children ? (

          children

        ) : (

          <div
            className="
              text-center
              px-6
            "
          >

            {title && (

              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  md:text-7xl
                  font-bold
                "
              >

                {title}

              </h1>

            )}

            {description && (

              <p
                className="
                  mt-6
                  text-lg
                  sm:text-xl
                  max-w-2xl
                  mx-auto
                "
              >

                {description}

              </p>

            )}

          </div>

        )}

      </div>

    </section>
  );
};

export default ScrollVideoSkeleton;