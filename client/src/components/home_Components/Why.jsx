import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { adminAPI }
from "../../config/api";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

gsap.registerPlugin(
  ScrollTrigger
);

const WhyRICR = () => {

  const [steps, setSteps] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const sectionRef =
    useRef(null);

  const videoRef =
    useRef(null);

  // =====================================
  // FETCH DATA
  // =====================================

  useEffect(() => {

    const fetchSteps =
      async () => {

        try {

          const res =
            await adminAPI.getWhyRICR();

          const data =
            Array.isArray(
              res.data
            )
              ? res.data
              : res.data
              ? [res.data]
              : [];

          setSteps(data);

        } catch (error) {

          console.error(
            "Error fetching WhyRICR:",
            error
          );

          setSteps([]);

        } finally {

          setLoading(false);
        }
      };

    fetchSteps();

  }, []);

  // =====================================
  // SCROLL VIDEO
  // =====================================

  useEffect(() => {

    if (!steps.length)
      return;

    const first =
      steps[0];

    if (
      first.mediaType !==
        "video" ||
      !first.mediaUrl
    ) return;

    const section =
      sectionRef.current;

    const video =
      videoRef.current;

    const navbar =
      document.querySelector(
        "#main-navbar"
      );

    if (
      !section ||
      !video
    ) return;

    let trigger;

    let tween;

    // =====================================
    // INIT
    // =====================================

    const init = () => {

      // REMOVE OLD TRIGGERS

      ScrollTrigger
        .getAll()
        .forEach((st) => {

          if (
            st.trigger ===
            section
          ) {

            st.kill();
          }
        });

      // VIDEO SETUP

      video.pause();

      try {

        video.currentTime =
          0.01;

      } catch (err) {}

      video.muted = true;

      video.playsInline =
        true;

      video.preload =
        "auto";

      // VIDEO TWEEN

      tween =
        gsap.to(video, {

          currentTime:
            Math.max(
              video.duration -
                0.1,
              0
            ),

          ease: "none",

          paused: true,
        });

      // SCROLL TRIGGER

      trigger =
        ScrollTrigger.create({

          trigger: section,

          start: "top top",

          end: "+=5000",

          pin: true,

          pinSpacing: true,

          anticipatePin: 1,

          fastScrollEnd: true,

          scrub: true,

          invalidateOnRefresh:
            true,

          refreshPriority:
            -1,

          animation: tween,

          // NAVBAR HIDE

          onEnter: () => {

            if (!navbar)
              return;

            gsap.to(
              navbar,
              {
                y: -120,

                opacity: 0,

                duration: 0.3,

                ease:
                  "power2.out",
              }
            );
          },

          onEnterBack: () => {

            if (!navbar)
              return;

            gsap.to(
              navbar,
              {
                y: -120,

                opacity: 0,

                duration: 0.3,

                ease:
                  "power2.out",
              }
            );
          },

          // NAVBAR SHOW

          onLeave: () => {

            if (!navbar)
              return;

            gsap.to(
              navbar,
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

            if (!navbar)
              return;

            gsap.to(
              navbar,
              {
                y: 0,

                opacity: 1,

                duration: 0.3,

                ease:
                  "power2.out",
              }
            );
          },
        });
    };

    // =====================================
    // VIDEO METADATA LOAD
    // =====================================

    const handleLoaded =
      () => {

        requestAnimationFrame(
          () => {

            init();
          }
        );
      };

    // =====================================
    // READY CHECK
    // =====================================

    if (
      video.readyState >= 1
    ) {

      handleLoaded();

    } else {

      video.addEventListener(
        "loadedmetadata",
        handleLoaded
      );
    }

    // =====================================
    // CLEANUP
    // =====================================

    return () => {

      if (trigger)
        trigger.kill();

      if (tween)
        tween.kill();

      video.removeEventListener(
        "loadedmetadata",
        handleLoaded
      );

      if (navbar) {

        gsap.set(
          navbar,
          {
            y: 0,

            opacity: 1,
          }
        );
      }
    };

  }, [steps]);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div
        className="
          w-full
          h-screen
          bg-black
          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            w-14
            h-14
            border-4
            border-white
            border-t-transparent
            rounded-full
            animate-spin
          "
        />

      </div>
    );
  }

  // =====================================
  // EMPTY
  // =====================================

  if (!steps.length) {

    return (

      <div
        className="
          w-full
          h-screen
          bg-black
          flex
          items-center
          justify-center
        "
      >

        <p
          className="
            text-white
            text-xl
          "
        >
          No content available
        </p>

      </div>
    );
  }

  const first =
    steps[0];

  // =====================================
  // IMAGE FALLBACK
  // =====================================

  if (
    first.mediaType !==
      "video" ||
    !first.mediaUrl
  ) {

    return (

      <section
        className="
          relative
          w-full
          h-screen
          overflow-hidden
          bg-black
        "
      >

        <img
          src={
            first.mediaUrl
          }
          alt={
            first.title ||
            "Why RICR"
          }
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-black/40
          "
        />

        <div
          className="
            relative
            h-full
            flex
            items-end
            p-6
            md:p-12
          "
        >

          <div
            className="
              max-w-3xl
            "
          >

            {first.title && (

              <h1
                className="
                  text-white
                  text-3xl
                  md:text-6xl
                  font-bold
                  leading-tight
                "
              >

                {first.title}

              </h1>
            )}

            {first.description && (

              <p
                className="
                  mt-4
                  text-white/80
                  text-base
                  md:text-xl
                  leading-relaxed
                "
              >

                {first.description}

              </p>
            )}

          </div>

        </div>

      </section>
    );
  }

  // =====================================
  // VIDEO SECTION
  // =====================================

  return (

    <section
      className="
        w-full
        pt-20
      "
    >

      <div
        ref={sectionRef}
        className="
          relative
          h-screen
          overflow-hidden
          bg-black
        "
      >

        {/* VIDEO */}

        <video
          ref={videoRef}
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          crossOrigin="anonymous"
          disablePictureInPicture
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        >

          <source
            src={
              first.mediaUrl
            }
            type="video/mp4"
          />

        </video>

        {/* OVERLAY */}

        <div
          className="
            absolute
            inset-0
        
          "
        />

        {/* CONTENT */}

        <div
          className="
            absolute
            inset-0
            flex
            items-end
            p-6
            md:p-12
            z-20
          "
        >

          {/* <div
            className="
              max-w-3xl
            "
          >

            {first.title && (

              <h1
                className="
                  text-white
                  text-3xl
                  md:text-6xl
                  font-bold
                  leading-tight
                "
              >

                {first.title}

              </h1>
            )}

            {first.description && (

              <p
                className="
                  mt-4
                  text-white/80
                  text-base
                  md:text-xl
                  leading-relaxed
                "
              >

                {first.description}

              </p>
            )}

          </div> */}

        </div>

      </div>

    </section>
  );
};

export default
  WhyRICR;