import React from "react";

const HeroSection = () => {
  return (
    <section
      className="
      relative w-[100%] mx-auto 
      mt-[80px] sm:mt-[90px] md:mt-[110px]
      h-[350px] sm:h-[450px] md:h-[70vh] lg:h-[80vh]
      rounded-1xl overflow-hidden
      "
    >
      {/*  BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        alt="Learning from people"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/*  OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center px-5 text-white text-center">
        
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight max-w-2xl">
          You don’t learn from courses.
          <br />
          You learn from people.
        </h1>

      </div>
    </section>
  );
};

export default HeroSection;