import React from "react";

const BuiltToSolve = () => {
  return (
    <section
      className="
      relative w-[100%] mx-auto 
      mt-10 sm:mt-12 md:mt-18
      h-[420px] sm:h-[520px] md:h-[75vh] lg:h-[85vh]
      rounded-1xl overflow-hidden
      "
    >
      {/*  BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
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
            The gap RICR was built to solve.
          </h1>

          {/*  STORY TEXT */}
          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed">
            We didn’t start with the idea of “another coding institute.” <br />
            We started with a simple question: <br /><br />

            What if students actually built something every single day? <br />
            Not one final project. <br />
            Not passive learning. <br /><br />

            But consistent, hands-on creation, <br />
            where confidence comes from doing, not watching.
          </p>

        </div>
      </div>
    </section>
  );
};

export default BuiltToSolve;