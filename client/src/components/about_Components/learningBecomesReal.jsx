import React from "react";

const LearningBecomesReal = () => {
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
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        className="absolute inset-0 w-full h-full object-cover"
        alt="RICR Learning"
      />

      {/*  DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-16 text-white">
        
        <div className="max-w-2xl">
          
          {/*  HEADING */}
          <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            RICR is where learning becomes real.
          </h1>

          {/*  STORY TEXT */}
          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed">
            Every concept leads to output. <br />
            Every session leads to something built. <br /><br />

            Because in the real world, <br />
            skills aren’t tested by what you know, <br />
            they’re tested by what you can create.
          </p>

        </div>
      </div>
    </section>
  );
};

export default LearningBecomesReal;