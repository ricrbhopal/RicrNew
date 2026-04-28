import React from "react";

const WhereRICRFit = () => {
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
        src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
        className="absolute inset-0 w-full h-full object-cover"
        alt="RICR Ecosystem"
      />

      {/*  DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-16 text-white">
        
        <div className="max-w-2xl">
          
          {/*  HEADING */}
          <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Where RICR fits in
          </h1>

          {/*  STORY TEXT */}
          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed">
            Under the Group’s digital and technology vertical, <br />
            Raj Digital was created to focus on future-facing capabilities. <br /><br />

            RICR was born within this ecosystem, <br />
            not as a traditional institute, <br />
            but as a practical learning environment. <br /><br />

            A place where: <br /><br />

            students don’t feel left behind <br />
            non-technical learners can start from zero <br />
            and learning is directly connected to real-world outcomes
          </p>

        </div>
      </div>
    </section>
  );
};

export default WhereRICRFit;