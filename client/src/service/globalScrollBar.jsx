import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

const GlobalScrollBar = () => {

  const progressRef =
    useRef(null);

  const glowRef =
    useRef(null);

  const liquidRef =
    useRef(null);

  useEffect(() => {

    if (
      "scrollRestoration" in
      window.history
    ) {

      window.history.scrollRestoration =
        "manual";
    }

    let current =
      0;

    let target =
      0;

    const lerp =
      (start, end, factor) =>
        start + (end - start) * factor;

    const animate =
      () => {

        current =
          lerp(
            current,
            target,
            0.045
          );

        const moveY =
          current * 1.9;

        const fillHeight =
          Math.max(
            current * 2.2,
            18
          );

        gsap.set(
          progressRef.current,
          {
            y: moveY,
            height:
              fillHeight,
          }
        );

        gsap.set(
          glowRef.current,
          {
            y: moveY - 10,
          }
        );

        gsap.set(
          liquidRef.current,
          {
            y:
              moveY * 0.18,
          }
        );

        requestAnimationFrame(
          animate
        );
      };

    const updateScroll =
      () => {

        const scroll =
          window.scrollY;

        const maxScroll =
          document.documentElement
            .scrollHeight -
          window.innerHeight;

        target =
          maxScroll > 0
            ? (
                scroll /
                maxScroll
              ) * 100
            : 0;
      };

    updateScroll();

    animate();

    window.addEventListener(
      "scroll",
      updateScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        updateScroll
      );

      window.removeEventListener(
        "resize",
        updateScroll
      );
    };

  }, []);

  return (

    <div
      className="
        fixed
        top-1/2
        -translate-y-1/2
        right-5

        h-[240px]
        w-[12px]

        z-[999999]

        pointer-events-none
      "
    >

      {/* TRACK */}

      <div
        className="
          relative

          h-full
          w-full

          rounded-full

          overflow-hidden

          bg-white/[0.04]

          backdrop-blur-3xl

          border
          border-white/10

          shadow-[0_0_45px_rgba(255,255,255,0.04)]

          before:absolute
          before:inset-0
          before:bg-white/[0.02]
        "
      >

        {/* LIQUID */}

        <div
          ref={liquidRef}
          className="
            absolute
            inset-0

            scale-150

            bg-gradient-to-b
            from-[#ffffff]
            via-[#aab4ff]
            to-[#5f6dff]

            opacity-40

            blur-xl
          "
        />

        {/* PROGRESS */}

        <div
          ref={progressRef}
          className="
            absolute
            top-0
            left-0

            w-full
            h-[20px]

            rounded-full

            bg-gradient-to-b
            from-[#ffffff]
            via-[#d9deff]
            to-[#7584ff]

            shadow-[0_0_50px_rgba(117,132,255,1)]

            before:absolute
            before:inset-0
            before:bg-white/30
            before:blur-sm
          "
        />

        {/* LENS GLOW */}

        <div
          ref={glowRef}
          className="
            absolute
            left-1/2
            top-0

            -translate-x-1/2

            w-12
            h-12

            rounded-full

            bg-[#dbe0ff]/80

            blur-3xl

            opacity-90

            mix-blend-screen
          "
        />

      </div>

    </div>
  );
};

export default GlobalScrollBar;