import React, { useState } from "react";

const programs = [
  {
    title: "Full Stack Web Development",
    desc: [
      "Build complete applications from frontend to backend",
      "Learn how websites and apps actually function",
      "Work on real-world projects with structured workflows",
      "Understand both development and system thinking",
      "You don’t just build pages. You build products.",
    ],
    image: "https://cdn-icons-png.flaticon.com/512/2721/2721269.png",
  },
  {
    title: "Data Analytics",
    desc: [
      "Turn raw data into meaningful insights",
      "Work with real datasets",
      "Learn dashboards, reporting, and decision-making",
      "Understand how businesses use data daily",
      "Not just tools. Real business thinking.",
    ],
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103658.png",
  },
  {
    title: "Data Science",
    desc: [
      "Go beyond analysis, build predictive systems",
      "Work with data models and logic",
      "Learn how companies forecast and automate decisions",
      "Apply concepts to real-world problems",
      "Learn how data drives the future.",
    ],
    image: "https://cdn-icons-png.flaticon.com/512/4149/4149655.png",
  },
];

const ProgramCards = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section className="w-[90%] mx-auto mt-14 sm:mt-16 md:mt-20">

      {/*  HEADING */}
      <div className="max-w-4xl mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-black leading-tight">
          Programs designed for real-world outcomes
        </h2>
      </div>

      {/*  GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {programs.map((program, index) => (
          <div
            key={index}
            className="perspective"
            onClick={() => handleFlip(index)}
          >
            <div
              className={`relative w-full h-[320px] transition-transform duration-500 transform-style preserve-3d ${
                flippedIndex === index ? "rotate-y-180" : ""
              } md:hover:rotate-y-180`}
            >

              {/*  FRONT */}
              <div className="absolute inset-0 bg-[#f5f5f7] rounded-2xl shadow-md p-6 backface-hidden flex flex-col items-center justify-center">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-20 h-20 mb-4"
                />
                <h3 className="text-lg font-semibold text-center">
                  {program.title}
                </h3>
              </div>

              {/*  BACK */}
              <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-6 rotate-y-180 backface-hidden overflow-y-auto">
                <h3 className="text-lg font-semibold mb-3 text-black">
                  {program.title}
                </h3>

                <ul className="space-y-2 text-sm text-gray-600">
                  {program.desc.map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/*  EXTRA CSS */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>

    </section>
  );
};

export default ProgramCards;