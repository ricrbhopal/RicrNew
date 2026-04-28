import React from "react";
import { MdOutlineArrowForward } from "react-icons/md";

const Hero = () => {
  return (
    <section
      className="
      relative w-[100%] mx-auto 
      mt-[80px] sm:mt-[90px] md:mt-[110px]
      h-[420px] sm:h-[520px] md:h-[75vh] lg:h-[85vh]
      rounded-1xl overflow-hidden
      "
    >
      {/*  BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        className="absolute inset-0 w-full h-full object-cover"
        alt="RICR Learning"
      />

      {/*  OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-16 text-white">
        
        <div className="max-w-2xl">
          
          {/*  HEADING */}
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            You don’t just learn tools.
            <br />
            You learn how real products are built.
          </h1>



        </div>
      </div>
    </section>
  );
};

export default Hero;