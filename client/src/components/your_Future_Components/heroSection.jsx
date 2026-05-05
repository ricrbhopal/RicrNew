import React from "react";

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="
      relative w-[100%] mx-auto 
      h-[420px] sm:h-[520px] md:h-[75vh] lg:h-[85vh]
      rounded-1xl overflow-hidden
      "
    >
      {/*  BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
        alt="Future Skills"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/*  GRADIENT OVERLAY (Premium Look) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-16 text-white">
        
        <div className="max-w-2xl">

          {/*  HEADLINE */}
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Your future won’t be decided by your degree.
            <br />
            It will be decided by what you can do.
          </h1>

          {/*  SUBTEXT */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
            Companies don’t ask what you studied.
            <br />
            They ask what you can build, solve, and understand.
          </p>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;