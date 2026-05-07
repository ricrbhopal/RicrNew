
import React from "react";
import Image from "../../assets/Mentor/image.jpg";

const MentorsPage = () => {
  return (
    <section className="
    w-[100%] sm:w-[100%] md:w-[100%] 
    mx-auto 
   overflow-hidden 
    py-10 sm:py-14 md:py-16 
    px-4 sm:px-6 md:px-10 
    rounded-xl sm:rounded-2xl">

      {/*  Heading */}
      <div className="max-w-[90%] mx-auto mb-8 sm:mb-10 md:mb-14">
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
        font-semibold text-[#125785]
        mb-3 sm:mb-4 
        leading-tight sm:leading-snug">
          Learn from people who’ve worked in the industry
        </h2>

        <p className="text-black font-semibold 
        max-w-full sm:max-w-xl 
        text-xs sm:text-sm md:text-base 
        leading-relaxed">
          Our mentors bring real-world experience, not just textbook knowledge.
        </p>

      </div>

      {/*  BANNER IMAGE */}
      <div className="max-w-[90%] mx-auto">
        
        <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden">

          {/* IMAGE */}
          <img
            src={Image}
            alt="Mentors"
            className="
            w-full 
            h-[220px] 
            sm:h-[300px] 
            md:h-[400px] 
            lg:h-[500px] 
            xl:h-[550px] 
            object-cover 
            rounded-xl sm:rounded-2xl
            transition-transform duration-500 ease-out
            hover:scale-[1.02]
            "
          />

          {/*  Premium Overlay */}
          <div className="absolute inset-0 
          bg-gradient-to-t 
          from-black/25 
          via-black/10 
          to-transparent 
          rounded-xl sm:rounded-2xl" />

        </div>

      </div>

    </section>
  );
};

export default MentorsPage;