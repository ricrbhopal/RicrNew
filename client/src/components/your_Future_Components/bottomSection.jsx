import React from "react";

const outcomes = [
  {
    title: "Clarity",
    desc: "You understand how real development workflows function",
  },
  {
    title: "Structure",
    desc: "You know how to break down problems and build solutions",
  },
  {
    title: "Confidence",
    desc: "You’ve already built multiple real projects",
  },
  {
    title: "Adaptability",
    desc: "You can work across different tools, teams, and domains",
  },
];

const Section3 = () => {
  return (
    <section className="w-[90%] mx-auto mt-14 sm:mt-16 md:mt-20">

      {/*  HEADING */}
      <div className="max-w-4xl mb-10">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight">
          What our students walk away with
        </h2>
      </div>

      {/*  GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

        {outcomes.map((item, index) => (
          <div
            key={index}
            className="
            bg-[#f5f5f7]
            rounded-2xl
            p-6
            shadow-sm
            hover:shadow-lg
            transition duration-300
            group
            "
          >
            {/* TITLE */}
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">
              {item.title}
            </h3>

            {/*  DESCRIPTION */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {item.desc}
            </p>

            {/*  HOVER LINE */}
            <div className="mt-4 h-[2px] w-0 bg-[#125785] group-hover:w-full transition-all duration-300"></div>
          </div>
        ))}

      </div>

    </section>
  );
};

export default Section3;