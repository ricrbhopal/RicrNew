import React from "react";
import Image from "../../assets/Mentor/image.jpg";

const MentorsPage = () => {
  return (
    <section

    
    className="
      w-full
      mt-20
    
      overflow-hidden
      py-10 sm:py-14 md:py-16
      px-4 sm:px-6 md:px-10
      mx-auto
      justify-center
      gap-20

     md:mb-20
      items-center
      flex
      flex-col
    ">

      {/* HEADING */}
      <div className="max-w-6xl mx-auto mb-10 md:mb-14 mt-10 md:mt-20">

        <h2 className="
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          font-semibold text-[#125785]
          leading-tight
        ">
          Learn from people who’ve worked in the industry
        </h2>

        <p className="
          mt-3
          text-black font-medium
          text-sm sm:text-base md:text-lg
          max-w-2xl
          leading-relaxed
        ">
          Our mentors bring real-world experience, not just textbook knowledge.
        </p>

      </div>

      {/* IMAGE CONTAINER */}
      <div className="max-w-6xl mx-auto">

        <div className="
          relative
          w-full
          overflow-hidden
          rounded-2xl
          shadow-lg
        ">

          <img
            src={Image}
            alt="Mentors"
            className="
              w-full
              h-[220px] sm:h-[300px] md:h-[420px] lg:h-[520px] xl:h-[560px]
              object-cover
              transition-transform duration-500 ease-out
              hover:scale-[1.03]
              will-change-transform
            "
          />

        </div>

      </div>

    </section>
  );
};

export default MentorsPage;