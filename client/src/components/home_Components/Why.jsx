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

          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            w-14
            h-14

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






















  


// import React, {
//   useEffect,
//   useRef,
// } from "react";

// import gsap from "gsap";

// import {
//   ScrollTrigger,
// } from "gsap/ScrollTrigger";

// import "../css/whyRicr.css";

// gsap.registerPlugin(
//   ScrollTrigger
// );

// const cardsData = [
//   {
//     title:
//       "WHY DO STUDENTS\nCHOOSE RICR?",
//     bg: "#001f53",
//   },

//   {
//     title:
//       "INTERVIEW AND\nCAREER SUPPORT",
//     bg: "#1d7df2",
//   },

//   {
//     title:
//       "PLACEMENT-FOCUSED\nTRAINING",
//     bg: "#7c5cff",
//   },

//   {
//     title:
//       "REAL WORLD\nPROJECTS",
//     bg: "#0ea76b",
//   },

//   {
//     title:
//       "DAILY CODING\nPRACTICE",
//     bg: "#ff4f7b",
//   },
// ];

// const WhyRICRStackCards =
//   () => {

//     const sectionRef =
//       useRef(null);

//     const cardsRef =
//       useRef([]);

//     const pathRef =
//       useRef(null);

//     useEffect(() => {

//       const cards =
//         cardsRef.current;

//       const path =
//         pathRef.current;

//       if (
//         !cards.length ||
//         !path
//       )
//         return;

//       const ctx =
//         gsap.context(() => {

//           // =========================================
//           // SVG LINE
//           // =========================================

//           const pathLength =
//             path.getTotalLength();

//           gsap.set(path, {

//             strokeDasharray:
//               pathLength,

//             strokeDashoffset:
//               pathLength,
//           });

//           // =========================================
//           // INITIAL CARD STACK
//           // =========================================

//           cards.forEach(
//             (
//               card,
//               index
//             ) => {

//               let y = 0;

//               let scale = 1;

//               if (
//                 index === 0
//               ) {

//                 y = 0;
//                 scale = 1;
//               }

//               if (
//                 index === 1
//               ) {

//                 y = 260;
//                 scale = 0.92;
//               }

//               if (
//                 index === 2
//               ) {

//                 y = 460;
//                 scale = 0.84;
//               }

//               if (
//                 index === 3
//               ) {

//                 y = 660;
//                 scale = 0.76;
//               }

//               if (
//                 index === 4
//               ) {

//                 y = 860;
//                 scale = 0.68;
//               }

//               gsap.set(card, {

//                 y,

//                 scale,

//                 zIndex:
//                   100 -
//                   index,

//                 opacity: 1,
//               });
//             }
//           );

//           // =========================================
//           // MAIN TIMELINE
//           // =========================================

//           const tl =
//             gsap.timeline({

//               scrollTrigger: {

//                 trigger:
//                   sectionRef.current,

//                 start:
//                   "top top",

//  end: "+=2500",

//                 scrub: 1.2,

//                 pin: true,

//                 pinSpacing: true,

//                 anticipatePin: 1,

//                 invalidateOnRefresh:
//                   true,

//                 fastScrollEnd: true,
//               },
//             });

//           // =========================================
//           // CARD ANIMATION
//           // =========================================

//           cards.forEach(
//             (
//               card,
//               idx
//             ) => {

//               if (
//                 idx >=
//                 cards.length - 1
//               )
//                 return;

//               // SVG DRAW

//               tl.to(
//                 path,

//                 {

//                   strokeDashoffset:
//                     pathLength -
//                     (
//                       pathLength *
//                       (idx + 1)
//                     ) /
//                       cards.length,

//                   duration: 1,

//                   ease:
//                     "none",
//                 },

//                 idx
//               );

//               // CURRENT CARD EXIT

//               tl.to(
//                 cards[idx],

//                 {

//                   y: -500,

//                   opacity: 0,

//                   scale: 0.7,

//                   duration: 1.2,

//                   ease:
//                     "power3.inOut",
//                 },

//                 idx
//               );

//               // NEXT CARD CENTER

//               tl.to(
//                 cards[
//                   idx + 1
//                 ],

//                 {

//                   y: 0,

//                   scale: 1,

//                   duration: 1.2,

//                   ease:
//                     "power3.inOut",
//                 },

//                 idx
//               );

//               // THIRD CARD

//               if (
//                 cards[
//                   idx + 2
//                 ]
//               ) {

//                 tl.to(
//                   cards[
//                     idx + 2
//                   ],

//                   {

//                     y: 260,

//                     scale:
//                       0.92,

//                     duration: 1.2,

//                     ease:
//                       "power3.inOut",
//                   },

//                   idx
//                 );
//               }

//               // FOURTH CARD

//               if (
//                 cards[
//                   idx + 3
//                 ]
//               ) {

//                 tl.to(
//                   cards[
//                     idx + 3
//                   ],

//                   {

//                     y: 460,

//                     scale:
//                       0.84,

//                     duration: 1.2,

//                     ease:
//                       "power3.inOut",
//                   },

//                   idx
//                 );
//               }

//               // FIFTH CARD

//               if (
//                 cards[
//                   idx + 4
//                 ]
//               ) {

//                 tl.to(
//                   cards[
//                     idx + 4
//                   ],

//                   {

//                     y: 660,

//                     scale:
//                       0.76,

//                     duration: 1.2,

//                     ease:
//                       "power3.inOut",
//                   },

//                   idx
//                 );
//               }

//             }
//           );

//           // =========================================
//           // COMPLETE SVG
//           // =========================================

//           tl.to(
//             path,

//             {

//               strokeDashoffset: 0,

//               duration: 1,

//               ease: "none",
//             },

//             cards.length - 1
//           );

//         }, sectionRef);

//       ScrollTrigger.refresh();

//       return () => {

//         ctx.revert();

//         ScrollTrigger
//           .getAll()
//           .forEach(
//             (
//               trigger
//             ) =>
//               trigger.kill()
//           );
//       };

//     }, []);

//     const setCardRef =
//       (
//         el,
//         index
//       ) => {

//         cardsRef.current[
//           index
//         ] = el;
//       };

//     return (

//       <section
//         ref={sectionRef}

//         className="
//           gsap-stack-section
//         "
//       >

//         {/* SVG */}

//         <svg
//           className="
//             gsap-stack-svg
      
  
//           "
//           viewBox="0 0 1920 1080"
//           preserveAspectRatio="none"
//         >

//           <defs>

//             <linearGradient
//               id="lineGradient"
//               x1="100%"
//               y1="0%"
//               x2="0%"
//               y2="0%"
//             >

//               <stop
//                 offset="0%"
//                 stopColor="#4254ff"
//               />

//               <stop
//                 offset="100%"
//                 stopColor="#8ea0ff"
//               />

//             </linearGradient>

//             <filter id="glow">

//               <feGaussianBlur
//                 stdDeviation="10"
                
//                 result="blur"
//               />

//               <feMerge>

//                 <feMergeNode in="blur" />

//                 <feMergeNode in="SourceGraphic" />

//               </feMerge>

//             </filter>

//           </defs>

//           <path
//             ref={pathRef}
//             className="      .animation"

//             d="
//               M 1880 0
//               C 1890 180, 1800 280, 1650 360
//               C 1500 440, 1320 340, 1360 180
//               C 1400 20, 1650 40, 1720 220
//               C 1790 420, 1540 640, 1220 660
//               C 980 670, 860 620, 720 720
//               C 580 820, 560 980, 340 1040
//               C 180 1080, 80 1040, -100 920
//             "

//             fill="none"

//             stroke="url(#lineGradient)"

//             strokeWidth="30"

//             strokeLinecap="round"

//             strokeLinejoin="round"

//             filter="url(#glow)"
//           />

//         </svg>

//         {/* CARDS */}

//         <div
//           className="
//             gsap-card-wrapper
//           "
//         >

//           {cardsData.map(
//             (
//               card,
//               index
//             ) => (

//               <div
//                 key={index}

//                 ref={(el) =>
//                   setCardRef(
//                     el,
//                     index
//                   )
//                 }

//                 className="
//                   gsap-card
//                 "

//                 style={{
//                   background:
//                     card.bg,
//                 }}
//               >

//                 {/* OVERLAY */}

//                 <div
//                   className="
//                     gsap-card-overlay
//                   "
//                 />

//                 {/* CENTER LINE */}

//                 <div
//                   className="
//                     gsap-card-line
//                   "
//                 />

//                 {/* TEXT */}

//                 <h2
//                   className="
//                     gsap-card-title
//                   "
//                 >
//                   {card.title}
//                 </h2>

//               </div>
//             )
//           )}

//         </div>

//       </section>
//     );
//   };

// export default
//   WhyRICRStackCards;