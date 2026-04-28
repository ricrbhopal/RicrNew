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
    <section className="py-14 md:py-20 bg-white px-4 md:px-10">

      {/* 🔥 Heading */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-black mb-4">
          A simple process that gets results
        </h2>

        <p className="text-gray-500 text-sm md:text-base max-w-md">
          HOW IT WORKS
        </p>
      </div>

      {/* 🔥 Steps */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {steps.map((step, index) => (
          <div key={index} className="relative group">

            {/* 🔥 Step Number */}
            <div className="text-5xl md:text-6xl font-semibold text-gray-200 mb-4">
              {`0${index + 1}`}
            </div>

            {/* 🔥 Content */}
            <h3 className="text-lg md:text-xl font-semibold text-black mb-2">
              {step.title}
            </h3>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {step.desc}
            </p>

            {/* 🔥 Hover line effect */}
            <div className="mt-4 h-[2px] w-0 bg-black group-hover:w-full transition-all duration-300"></div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default HowItWorks;