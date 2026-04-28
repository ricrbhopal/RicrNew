import React from "react";

const steps = [
  {
    title: "Learn",
    desc: "Concepts explained simply, without unnecessary theory",
  },
  {
    title: "Practice",
    desc: "Daily coding with structured assignments",
  },
  {
    title: "Build",
    desc: "Real-world projects to strengthen your portfolio",
  },
  {
    title: "Get Placed",
    desc: "Interview prep, mock sessions, and hiring support",
  },
];

const HowItWorks = () => {
  return (
    <section
      className="
      bg-[#f5f5f7] 
      w-[100%] sm:w-[100%] md:w-[100%] 
      mx-auto 
      mt-8 sm:mt-10 md:mt-12 
      py-10 sm:py-14 md:py-20 
      px-4 sm:px-6 md:px-10 
      rounded-xl sm:rounded-2xl
      "
    >
      {/* 🔥 Heading */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
        
        <p className="text-gray-500 text-xs sm:text-sm md:text-base mb-2 tracking-wide">
          HOW IT WORKS
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
        font-semibold text-black 
        leading-tight sm:leading-snug">
          A simple process that gets results
        </h2>
      </div>

      {/* 🔥 Steps */}
      <div className="max-w-6xl mx-auto grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-4 
      gap-6 sm:gap-8 md:gap-10">

        {steps.map((step, index) => (
          <div key={index} className="relative group">

            {/* 🔥 Step Number */}
            <div className="text-4xl sm:text-5xl md:text-6xl 
            font-semibold text-gray-200 mb-3 sm:mb-4">
              {`0${index + 1}`}
            </div>

            {/* 🔥 Content */}
            <h3 className="text-base sm:text-lg md:text-xl 
            font-semibold text-black mb-2">
              {step.title}
            </h3>

            <p className="text-xs sm:text-sm md:text-base 
            text-gray-600 leading-relaxed">
              {step.desc}
            </p>

            {/* 🔥 Hover line */}
            <div className="mt-4 h-[2px] w-0 bg-black 
            group-hover:w-full transition-all duration-300"></div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default HowItWorks;