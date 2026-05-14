import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import "../css/globalScrollBar.css";

const GlobalScrollBar = () => {

  const progressRef =
    useRef(null);

  const glowRef =
    useRef(null);

  const liquidRef =
    useRef(null);

  const rafRef =
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
      (
        start,
        end,
        factor
      ) =>
        start +
        (end - start) *
          factor;

    const animate =
      () => {

        current =
          lerp(
            current,
            target,
            0.015
          );

        const moveY =
          current * 1.95;

        const fillHeight =
          Math.max(
            current * 2.3,
            24
          );

        gsap.to(
          progressRef.current,
          {
            y: moveY,
            height:
              fillHeight,
            duration: 0.6,
            ease:
              "power3.out",
          }
        );

        gsap.to(
          glowRef.current,
          {
            y:
              moveY - 12,
            duration: 1,
            ease:
              "power4.out",
          }
        );

        gsap.to(
          liquidRef.current,
          {
            y:
              moveY * 0.22,
            duration: 1.4,
            ease:
              "sine.out",
          }
        );

        rafRef.current =
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
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      updateScroll
    );

    return () => {

      cancelAnimationFrame(
        rafRef.current
      );

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

    <div className="liquid-scrollbar">

      {/* TRACK */}

      <div className="liquid-scrollbar-track">

        {/* LIQUID BG */}

        <div
          ref={liquidRef}
          className="liquid-scrollbar-liquid"
        />

        {/* PROGRESS */}

        <div
          ref={progressRef}
          className="liquid-scrollbar-progress"
        />

        {/* GLOW */}

        <div
          ref={glowRef}
          className="liquid-scrollbar-glow"
        />

      </div>

    </div>
  );
};

export default GlobalScrollBar;