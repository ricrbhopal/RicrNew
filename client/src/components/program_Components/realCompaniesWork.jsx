import React from "react";
import { MdOutlineArrowForward } from "react-icons/md";

const CTASection = () => {
  return (
    <section
      className="
      w-[100%] mx-auto 
      mt-16 sm:mt-20 md:mt-24
      bg-gradient-to-br from-[#f5f5f7] to-[#e9eef3]
      rounded-2xl
      py-12 sm:py-16 md:py-20
      px-5 sm:px-8 md:px-16
      text-center
      "
    >
      {/*  HEADLINE */}
      <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight">
        Anyone can learn coding.
        <br />
        Very few learn how to work in tech.
      </h2>

      {/*  SUBTEXT */}
      <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        That difference is what sets RICR apart.
        <br />
        Start learning the way real companies work.
      </p>

      {/*  BUTTONS */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">

        {/* PRIMARY */}
        <a
          href="#"
          className="
          flex items-center gap-2
          px-6 py-3
          bg-[#125785] hover:bg-[#0f4668]
          text-white font-medium
          rounded-xl
          transition duration-300
          shadow-md hover:shadow-lg
          "
        >
          Explore Programs
          <MdOutlineArrowForward />
        </a>

        {/* SECONDARY */}
        <a
          href="#"
          className="
          px-6 py-3
          border border-[#125785]
          text-[#125785]
          rounded-xl
          font-medium
          hover:bg-[#125785] hover:text-white
          transition duration-300
          "
        >
          Book a Free Demo
        </a>

      </div>
    </section>
  );
};

export default CTASection;