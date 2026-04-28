import React from "react";

const BuiltLargerFoundation = () => {
  return (
    <section
      className="
      relative w-[100%] mx-auto 
      mt-10 sm:mt-12 md:mt-16
      h-[420px] sm:h-[520px] md:h-[75vh] lg:h-[85vh]
      rounded-1xl overflow-hidden
      "
    >
      {/*  BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Raj Group Foundation"
      />

      {/*  DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-16 text-white">
        
        <div className="max-w-2xl">
          
          {/*  HEADING */}
          <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Built on a larger foundation
          </h1>

          {/*  STORY TEXT */}
          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed">
            RICR is not a standalone effort. <br />
            It is part of Raj Group — <br />
            a multi-vertical institution that has spent decades building not just businesses, but ecosystems in Bhopal. <br /><br />

            From real estate and education to media and technology, <br />
            Raj Group’s work has always been rooted in one idea: <br /><br />

            Build things that last. <br />
            Build things that matter.
          </p>

        </div>
      </div>
    </section>
  );
};

export default BuiltLargerFoundation;