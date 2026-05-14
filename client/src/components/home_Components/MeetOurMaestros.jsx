import React from "react";

import Image from "../../assets/Mentor/image.jpg";

import ScrollImageSkeleton
from "../commonComponents/mentorsSectionScroller";

import "../css/meetOurMentors.css"

const MentorsPage = () => {

  return (

    <ScrollImageSkeleton
      end={1600}
    >

      <section
        className="
          relative
          w-full
          py-10
          sm:py-14
          md:py-16
          px-4
          sm:px-6
          md:px-10
          flex
          flex-col
          items-center
          justify-center
          gap-20
        "
      >

        {/* CONTENT */}

        <div
          className="
            relative
            z-10
            w-full
            max-w-7xl
          "
        >

          {/* HEADING */}

          <div
            className="
              mb-10
              md:mb-14
            "
          >

            <h2
              className="
              
         heading
              "
            >
              Learn from people who’ve worked in the industry
            </h2>

            <p
              className="
                paragraph 
         
              "
            >
              Our mentors bring real-world experience,
              not just textbook knowledge.
            </p>

          </div>

          {/* IMAGE */}

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              shadow-lg
            "
          >

            <img
              src={Image}
              alt="Mentors"
              className="
                w-full
                h-[220px]
                sm:h-[300px]
                md:h-[420px]
                lg:h-[520px]
                xl:h-[560px]
                object-cover
                transition-transform
                duration-500
                ease-out
                hover:scale-[1.03]
                will-change-transform
              "
            />

          </div>

        </div>

      </section>

    </ScrollImageSkeleton>
  );
};

export default MentorsPage;