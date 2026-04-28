import React from "react";
import { MdOutlineArrowForward } from "react-icons/md";

const LearnAtRICR = () => {
  return (
    <section
      className="
      relative w-[100%] mx-auto 
      mt-[80px] sm:mt-[90px] md:mt-[110px]
      h-[450px] sm:h-[520px] md:h-[75vh] lg:h-[85vh]
      rounded-1xl overflow-hidden
      "
    >
      {/*  BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        className="absolute inset-0 w-full h-full object-cover"
        alt="RICR Learning"
      />

      {/*  PREMIUM GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-16 text-white">
        
        <div className="max-w-2xl">

          {/*  HEADLINE */}
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Most coding courses teach you syntax.
            <br />
            They don’t teach you how real products are built.
          </h1>

          {/*  SUBTEXT */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
            In real companies, development doesn’t start with code.
            <br />
            It starts with understanding problems, structuring solutions,
            and working in systems.
            <br /><br />
            That’s exactly what you learn at RICR.
          </p>

          {/*  CTA */}
          <div className="mt-7">
            <a
              href="#"
              className="
              inline-flex items-center gap-2 
              px-6 py-3 
              bg-[#125785] hover:bg-[#0f4668] 
              rounded-xl 
              text-white font-medium 
              transition duration-300 
              shadow-lg hover:shadow-xl
              "
            >
              Start Learning
              <MdOutlineArrowForward className="text-lg" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LearnAtRICR;