import React, { useState } from "react";
import { motion } from "framer-motion";

// 🔥 DATA
const programData = [
  {
    name: "Full Stack Development",
    children: ["HTML", "JavaScript", "React", "Node"],
  },
  {
    name: "Data Science",
    children: ["Python", "ML", "DL"],
  },
  {
    name: "Data Analytics",
    children: ["Excel", "Power BI", "SQL"],
  },
];

const ProgramsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="h-screen flex items-center justify-center bg-[#e5e5e5]">
      
      {/* STACK CONTAINER */}
      <div className="relative w-[300px] h-[400px]">

        {programData.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={index}
              onClick={() =>
                setActiveIndex(isActive ? null : index)
              }

              className="absolute w-full h-[260px] rounded-2xl cursor-pointer overflow-hidden shadow-xl"

              style={{
                zIndex: programData.length - index,
              }}

              animate={{
                y: isActive ? -120 : index * 20,
                scale: isActive ? 1.05 : 1 - index * 0.05,
              }}

              transition={{ duration: 0.5 }}
            >
              {/* CARD */}
              <div className="w-full h-full bg-gradient-to-br from-lime-400 to-green-700 text-white p-6 flex flex-col justify-between">

                {/* TOP */}
                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                {/* INNER CARDS */}
                {isActive && (
                  <div className="mt-4 space-y-2">
                    {item.children.map((child, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white text-black rounded-lg px-3 py-2 text-sm"
                      >
                        {child}
                      </motion.div>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
};

export default ProgramsSection;