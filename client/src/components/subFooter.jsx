import React from "react";
import { MdOutlineArrowForward } from "react-icons/md";

const CTASection = () => {
  return (
    <section className="w-[100%] mx-auto mt-16 sm:mt-20 md:mt-24 mb-10">

      <div className="bg-[#f5f5f7] rounded-2xl p-8 sm:p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* 🔥 LEFT CONTENT */}
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black leading-tight">
            Start Building Your Future
          </h2>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Take the first step toward real-world skills and career growth.
          </p>
        </div>

        {/* 🔥 BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">



          {/* SECONDARY */}
          <button
            className="
            px-6 py-3 
            border border-[#125785] 
            text-[#125785] 
            rounded-lg 
            font-semibold
            hover:bg-[#125785] hover:text-white
            transition-all duration-300
            "
          >
            Book a Free Demo
          </button>

        </div>

      </div>

    </section>
  );
};

export default CTASection;