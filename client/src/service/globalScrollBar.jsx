// import {
//   useEffect,
//   useRef,
// } from "react";

// import gsap from "gsap";

// import {
//   ScrollTrigger,
// } from "gsap/ScrollTrigger";

// import Lenis from "@studio-freight/lenis";

// gsap.registerPlugin(
//   ScrollTrigger
// );

// const GlobalScrollBar = () => {

//   const progressRef =
//     useRef(null);

//   const glowRef =
//     useRef(null);

//   useEffect(() => {

//     // =====================================
//     // LENIS
//     // =====================================

//     const lenis =
//       new Lenis({
//         duration: 0.45,

//         smoothWheel: true,

//         smoothTouch: false,

//         wheelMultiplier: 1.3,

//         lerp: 0.18,
//       });

//     // =====================================
//     // RAF
//     // =====================================

//     const raf = (
//       time
//     ) => {

//       lenis.raf(time);

//       requestAnimationFrame(
//         raf
//       );
//     };

//     requestAnimationFrame(
//       raf
//     );

//     // =====================================
//     // UPDATE
//     // =====================================

//     lenis.on(
//       "scroll",
//       ({ scroll }) => {

//         const maxScroll =
//           document.documentElement
//             .scrollHeight -
//           window.innerHeight;

//         const progress =
//           maxScroll > 0
//             ? (
//                 scroll /
//                 maxScroll
//               ) * 100
//             : 0;

//         // =====================================
//         // PROGRESS
//         // =====================================

//         if (
//           progressRef.current
//         ) {

//           progressRef.current.style.height =
//             `${progress}%`;
//         }

//         // =====================================
//         // GLOW
//         // =====================================

//         if (
//           glowRef.current
//         ) {

//           glowRef.current.style.transform =
//             `translateY(${progress}%)`;
//         }

//         // =====================================
//         // GSAP UPDATE
//         // =====================================

//         ScrollTrigger.update();
//       }
//     );

//     // =====================================
//     // CLEANUP
//     // =====================================

//     return () => {

//       lenis.destroy();
//     };

//   }, []);

//   return (

//     <div
//       className="
//         fixed
//         right-6
//         md:right-8
//         top-1/2
//         -translate-y-1/2
//         h-[22%]
//         w-[6px]
//         z-[99999]
//         bg-white/10
//         backdrop-blur-md
//         rounded-full
//         overflow-hidden
//         border
//         border-white/10
//       "
//     >

//       {/* PROGRESS */}

//       <div
//         ref={progressRef}
//         className="
//           absolute
//           top-0
//           left-0
//           w-full
//           h-0
//           rounded-full
//           bg-gradient-to-b
//           from-cyan-400
//           via-[#125785]
//           to-[#0e456b]
//         "
//       />

//       {/* GLOW */}

//       <div
//         ref={glowRef}
//         className="
//           absolute
//           top-0
//           left-0
//           w-full
//           h-10
//           blur-md
//           bg-cyan-400/50
//           pointer-events-none
//         "
//       />

//     </div>
//   );
// };

// export default
//   GlobalScrollBar;


import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

gsap.registerPlugin(
  ScrollTrigger
);

const GlobalScrollBar = () => {

  const progressRef =
    useRef(null);

  const glowRef =
    useRef(null);

  useEffect(() => {

    // =====================================
    // DISABLE SCROLL RESTORATION
    // =====================================

    if (
      "scrollRestoration" in
      window.history
    ) {

      window.history.scrollRestoration =
        "manual";
    }

    // =====================================
    // UPDATE FUNCTION
    // =====================================

    const updateScrollBar =
      () => {

        const scroll =
          window.scrollY;

        const maxScroll =
          document.documentElement
            .scrollHeight -
          window.innerHeight;

        const progress =
          maxScroll > 0
            ? (
                scroll /
                maxScroll
              ) * 100
            : 0;

        // =====================================
        // PROGRESS HEIGHT
        // =====================================

        if (
          progressRef.current
        ) {

          progressRef.current.style.height =
            `${progress}%`;
        }

        // =====================================
        // GLOW POSITION
        // =====================================

        if (
          glowRef.current
        ) {

          glowRef.current.style.transform =
            `translateY(${progress}%)`;
        }

        // =====================================
        // GSAP UPDATE
        // =====================================

        ScrollTrigger.update();
      };

    // =====================================
    // INITIAL UPDATE
    // =====================================

    updateScrollBar();

    // =====================================
    // EVENTS
    // =====================================

    window.addEventListener(
      "scroll",
      updateScrollBar
    );

    window.addEventListener(
      "resize",
      updateScrollBar
    );

    // =====================================
    // CLEANUP
    // =====================================

    return () => {

      window.removeEventListener(
        "scroll",
        updateScrollBar
      );

      window.removeEventListener(
        "resize",
        updateScrollBar
      );
    };

  }, []);

  return (

    <div
      className="
        fixed
        right-6
        md:right-8
        top-1/2
        -translate-y-1/2
        h-[22%]
        w-[6px]
        z-[99999]
        bg-white/10
        backdrop-blur-md
        rounded-full
        overflow-hidden
        border
        border-white/10
      "
    >

      {/* PROGRESS */}

      <div
        ref={progressRef}
        className="
          absolute
          top-0
          left-0
          w-full
          h-0
          rounded-full
          bg-gradient-to-b
          from-cyan-400
          via-[#125785]
          to-[#0e456b]
        "
      />

      {/* GLOW */}

      <div
        ref={glowRef}
        className="
          absolute
          top-0
          left-0
          w-full
          h-10
          blur-md
          bg-cyan-400/50
          pointer-events-none
        "
      />

    </div>
  );
};

export default
  GlobalScrollBar;