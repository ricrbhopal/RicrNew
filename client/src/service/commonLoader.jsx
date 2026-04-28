import React, { useEffect, useState, useContext } from "react";
import { LoaderContext } from "../context/LoaderContext";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    const duration = 2000;
    const intervalTime = 40;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;

        if (next >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setLoading(false);
          }, 300);

          return 100;
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const totalBars = 40;
  const activeBars = Math.floor((progress / 100) * totalBars);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">

      <div className="relative w-[200px] h-[200px] flex items-center justify-center">

        {/* 🔥 SEGMENTS */}
        {[...Array(totalBars)].map((_, i) => {
          const angle = (360 / totalBars) * i;

          return (
            <div
              key={i}
              className="absolute w-[6px] h-[18px] rounded-full"
              style={{
                transform: `rotate(${angle}deg) translate(90px)`,

                // 🔥 SAME COLOR AS TEXT
                background: i < activeBars ? "#06b6d4" : "#1f2937",

                // 🔥 GLOW EFFECT
                boxShadow:
                  i < activeBars
                    ? "0 0 8px #06b6d4, 0 0 14px #06b6d4"
                    : "none",
              }}
            />
          );
        })}

        {/* 🔥 CENTER CIRCLE */}
        <div className="absolute w-[120px] h-[120px] bg-black rounded-full flex items-center justify-center shadow-inner">

          <span className="text-cyan-400 text-2xl font-mono font-bold">
            {Math.floor(progress)}%
          </span>

        </div>

      </div>

      {/* OPTIONAL TEXT */}
      <p className="absolute bottom-20 text-cyan-400 font-mono text-sm tracking-wide">
        Loading system...
      </p>

    </div>
  );
};

export default Loader;