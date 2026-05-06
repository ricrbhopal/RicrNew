import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GlobalScrollBar = () => {
  const [scroll, setScroll] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {

    const updateScroll = () => {

      // 🔥 GSAP SCROLL VALUE
      const maxScroll = ScrollTrigger.maxScroll(window);

      const currentScroll = window.scrollY;

      const progress =
        maxScroll > 0
          ? (currentScroll / maxScroll) * 100
          : 0;

      setScroll(progress);

      // 🔥 ACTIVE SECTION DETECTION
      const sections =
        document.querySelectorAll(".section");

      let activeSection = null;

      sections.forEach((section) => {

        const rect =
          section.getBoundingClientRect();

        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          activeSection = section;
        }
      });

      // 🔥 DARK / LIGHT
      if (activeSection) {

        setIsDark(
          activeSection.classList.contains(
            "dark-section"
          )
        );
      }
    };

    // 🔥 GSAP REFRESH
    ScrollTrigger.addEventListener(
      "refresh",
      updateScroll
    );

    window.addEventListener(
      "scroll",
      updateScroll
    );

    // INITIAL
    updateScroll();

    return () => {

      ScrollTrigger.removeEventListener(
        "refresh",
        updateScroll
      );

      window.removeEventListener(
        "scroll",
        updateScroll
      );
    };

  }, []);

  return (
    <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 h-[22%] w-[6px] z-[99999] bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/10">

      {/* 🔥 PROGRESS */}
      <div
        className={`w-full rounded-full transition-all duration-200 ${
          isDark
            ? "bg-gradient-to-b from-cyan-400 via-[#125785] to-[#0e456b]"
            : "bg-gradient-to-b from-cyan-400 via-[#125785] to-[#0e456b]"
        }`}
        style={{
          height: `${scroll}%`,
        }}
      />

      {/* 🔥 GLOW */}
      <div
        className="absolute bottom-0 left-0 w-full h-10 blur-md bg-cyan-400/50"
        style={{
          transform: `translateY(${100 - scroll}%)`,
        }}
      />
    </div>
  );
};

export default GlobalScrollBar;