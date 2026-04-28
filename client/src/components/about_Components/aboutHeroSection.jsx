import React from "react";
import { MdOutlineArrowForward } from "react-icons/md";

const Hero = () => {
  return (
    <section
      className="
      relative w-[100%] mx-auto 
      mt-[80px] sm:mt-[90px] md:mt-[110px]
      h-[420px] sm:h-[520px] md:h-[75vh] lg:h-[85vh]
      overflow-hidden
      "
    >
      {/*  BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/*  OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-16 text-white">
        
        <div className="max-w-2xl">
          
          {/*  HEADING */}
          <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Most students don’t fail because they’re not capable.
          </h1>

          {/*  SUBTEXT (MULTI LINE STORY) */}
          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed space-y-1">
            They fail because they never get to build. <br />
            They attend classes. <br />
            They watch tutorials. <br />
            They complete courses. <br /><br />

            And still… when it’s time for an interview, <br />
            they don’t know what to do. <br /><br />

            Not because they didn’t try. <br />
            But because they were never taught how to apply.
          </p>

          {/*  BUTTON */}
          {/* <div className="mt-6">
            <a
              href="#"
              className="
              px-5 py-2.5 sm:px-6 sm:py-3 
              bg-[#125785] rounded-lg 
              flex items-center gap-2 w-fit
              font-medium hover:bg-[#0f4668] transition
              "
            >
              Start Building
              <MdOutlineArrowForward />
            </a>
          </div> */}

        </div>
      </div>
    </section>
  );
};

export default Hero;