// import React, {
//   useEffect,
//   useRef,
// } from "react";

// import gsap from "gsap";

// import {
//   ScrollTrigger,
// } from "gsap/ScrollTrigger";

// import "../css/scrollVideo.css";

// gsap.registerPlugin(
//   ScrollTrigger
// );

// const ScrollVideoSkeleton = ({
//   videoSrc,
//   end = 1000,
//   overlay = false,
//   children,
//   className = "",
//   height = "100vh",
//   navbarClass = ".main-navbar",
// }) => {

//   const sectionRef =
//     useRef(null);

//   const videoRef =
//     useRef(null);

//   useEffect(() => {

//     const section =
//       sectionRef.current;

//     const video =
//       videoRef.current;

//     const navbar =
//       document.querySelector(
//         navbarClass
//       );

//     if (!section || !video)
//       return;

//     let tween;

//     let trigger;

//     const init = () => {

//       // =====================================
//       // VIDEO SETTINGS
//       // =====================================

//       video.pause();

//       video.currentTime = 0;

//       video.muted = true;

//       video.playsInline = true;

//       video.preload =
//         "auto";

//       // =====================================
//       // VIDEO TWEEN
//       // =====================================

//       tween =
//         gsap.to(video, {
//           currentTime:
//             video.duration || 1,

//           ease: "none",

//           paused: true,
//         });

//       // =====================================
//       // SCROLLTRIGGER
//       // =====================================

//       trigger =
//         ScrollTrigger.create({
//           trigger: section,

//           start: "top top",

//           end: `+=${end}`,

//           pin: true,

//           pinSpacing: true,

//           scrub: 0.3,

//           invalidateOnRefresh: true,

//           animation: tween,

//           // =====================================
//           // NAVBAR HIDE
//           // =====================================

//           onEnter: () => {

//             if (!navbar)
//               return;

//             gsap.to(
//               navbar,
//               {
//                 y: -120,

//                 opacity: 0,

//                 duration: 0.3,

//                 ease:
//                   "power2.out",
//               }
//             );
//           },

//           onEnterBack: () => {

//             if (!navbar)
//               return;

//             gsap.to(
//               navbar,
//               {
//                 y: -120,

//                 opacity: 0,

//                 duration: 0.3,

//                 ease:
//                   "power2.out",
//               }
//             );
//           },

//           onLeave: () => {

//             if (!navbar)
//               return;

//             gsap.to(
//               navbar,
//               {
//                 y: 0,

//                 opacity: 1,

//                 duration: 0.3,

//                 ease:
//                   "power2.out",
//               }
//             );
//           },

//           onLeaveBack: () => {

//             if (!navbar)
//               return;

//             gsap.to(
//               navbar,
//               {
//                 y: 0,

//                 opacity: 1,

//                 duration: 0.3,

//                 ease:
//                   "power2.out",
//               }
//             );
//           },
//         });

//       ScrollTrigger.refresh();
//     };

//     // =====================================
//     // INIT
//     // =====================================

//     if (
//       video.readyState >= 1
//     ) {

//       init();

//     } else {

//       video.addEventListener(
//         "loadedmetadata",
//         init
//       );
//     }

//     // =====================================
//     // CLEANUP
//     // =====================================

//     return () => {

//       if (trigger)
//         trigger.kill();

//       if (tween)
//         tween.kill();

//       video.removeEventListener(
//         "loadedmetadata",
//         init
//       );
//     };

//   }, [end, navbarClass]);

//   return (

//     <section
//       ref={sectionRef}
//       className={`
//         scroll-video-section
//         ${className}
//       `}
//       style={{
//         height,
//       }}
//     >

//       {/* VIDEO */}

//       <video
//         ref={videoRef}
//         muted
//         playsInline
//         preload="auto"
//         disablePictureInPicture
//         className="
//           scroll-video-element
//           object-cover
//         "
//       >

//         <source
//           src={videoSrc}
//           type="video/mp4"
//         />

//       </video>


//       {/* CONTENT */}

//       <div
//         className="
//           scroll-video-content
//         "
//       >
//         {children}
//       </div>

//     </section>
//   );
// };

// export default
//   ScrollVideoSkeleton;
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
  end = 1000,
  overlay = false,
  children,
  className = "",
  height = "100vh",
  navbarClass = "#main-navbar",
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

    const navbar =
      document.querySelector(
        navbarClass
      );

    if (
      !section ||
      !video
    ) return;

    let tween;

    let trigger;

    // =====================================
    // INIT
    // =====================================

    const init = () => {

      // =====================================
      // REMOVE OLD TRIGGERS
      // =====================================

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

      // =====================================
      // VIDEO SETUP
      // =====================================

      video.pause();

      try {

        video.currentTime =
          0.01;

      } catch (err) {}

      video.muted = true;

      video.playsInline = true;

      video.preload =
        "auto";

      // =====================================
      // VIDEO TWEEN
      // =====================================

      tween =
        gsap.to(video, {

          currentTime:
            Math.max(
              video.duration - 0.1,
              0
            ),

          ease: "none",

          paused: true,
        });

      // =====================================
      // SCROLL TRIGGER
      // =====================================

      trigger =
        ScrollTrigger.create({

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

          // =====================================
          // NAVBAR HIDE
          // =====================================

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

          // =====================================
          // NAVBAR SHOW
          // =====================================

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

      // =====================================
      // RESET NAVBAR
      // =====================================

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

  }, [
    end,
    navbarClass,
    videoSrc,
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
        minHeight: "100vh",
      }}
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
          scroll-video-element
          object-cover
        "
      >

        <source
          src={videoSrc}
          type="video/mp4"
        />

      </video>



      {/* CONTENT */}

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