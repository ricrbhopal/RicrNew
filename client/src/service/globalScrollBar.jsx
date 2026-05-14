import {
  useEffect,
  useRef,
} from "react";

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

    /* =====================================
       MAIN SMOOTHNESS CONTROL
       LOWER = SMOOTHER
       HIGHER = FASTER
    ===================================== */

    const lerpFactor =
      0.015;

    /* =====================================
       CUSTOM SPEED MULTIPLIER
       INCREASE FOR FASTER
    ===================================== */

    const speedMultiplier =
      2.5;

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
            lerpFactor
          );

        const moveY =
          current * 1.95;

        const fillHeight =
          Math.max(
            current * 2.3,
            24
          );

        /* =========================
           PROGRESS
        ========================= */

        if (
          progressRef.current
        ) {

          progressRef.current.style.transform =
            `translateY(${moveY}px)`;

          progressRef.current.style.height =
            `${fillHeight}px`;
        }

        /* =========================
           GLOW
        ========================= */

        if (
          glowRef.current
        ) {

          glowRef.current.style.transform =
            `translate(-50%, ${moveY - 12}px)`;
        }

        /* =========================
           LIQUID
        ========================= */

        if (
          liquidRef.current
        ) {

          liquidRef.current.style.transform =
            `translateY(${moveY * 0.22}px)`;
        }

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

        const rawProgress =
          maxScroll > 0
            ? (
                scroll /
                maxScroll
              ) * 100
            : 0;

        /* =========================
           CUSTOM SPEED
        ========================= */

        target =
          Math.min(
            rawProgress *
              speedMultiplier,
            100
          );
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