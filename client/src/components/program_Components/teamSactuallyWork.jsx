import React from "react";

const TeamsActuallyWork = () => {
  return (
    <section
      className="
      relative w-[100%] mx-auto 
      mt-12 sm:mt-16 md:mt-20
      h-[300px] sm:h-[400px] md:h-[70vh] lg:h-[80vh]
      rounded-1xl overflow-hidden
      "
    >
      {/*  VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>

      {/*  OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-16 text-white">
        
        <div className="max-w-2xl">

          {/*  HEADING */}
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            How do real tech teams actually work?
          </h2>

          {/*  OPTIONAL SUBTEXT */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200">
            See how real-world development happens — beyond just writing code.
          </p>

        </div>

      </div>
    </section>
  );
};

export default TeamsActuallyWork;